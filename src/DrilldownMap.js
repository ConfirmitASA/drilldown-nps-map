require("./drilldown-map.css");
import AsyncHierarchyTable from "r-async-hierarchy-table";
import MapHierarchy from "./map-hierarchy";
import AggregatedTable from "r-aggregated-table";

export default class DrilldownMap {
  /**
   * Creates a drilldown map. It uses a color function `colorFn` that allows colorcode countries
   * `colorFn` accepts two attributes: `value` and `target` and must return a color string based on those two attributes.
   * Make sure hierarchy has `target` loaded from DBDesigner table into each hierarchy level, otherwise a default config `dataClasses` takes precedence on value
   * Example:
   *
   *    {
   *    //some constructor configuration above
   *      colorFn: function(value,target){
   *        return (value!=null && target!=null)? (value - target >= 0) ? "#18BC9C" : ((value >= 0.9*target) ? "#FF4900" : "#E45335") : undefined;
   *      }
   *     //some constructor configuration below
   *    }
   *
   * @param {HTMLTableElement} config.source - a source drilldown table that contains the initial set of data(with reference group enabled and 1 child level)
   * @param {String} config.tableID - id of the `source` table that is the initial source of data (from reportal backend)
   * @param {Array} config.rowheaders - a rowheaders array for the loaded table
   * @param {Object} config.flatHierarchy - a hierarchical object for a map to be built upon
   * @param {String} [config.initialMap="custom/world-highres2"] - the initial map object that's going to be loaded to initialise the map
   * @param {String} config.containerID - id of the container the map will be drawn to
   * @param {Function} config.mappointCallback - executed when a mappoint (city) is clicked
   * @param {Function} config.colorFn - A function that allows custom color coding computation based on value and target.
   * @param {Number} [config.valueColumn=1] - Zero-based column index that contains primary value which will be used for map coloring.
   * @param {Boolean} [config.fullParentLevelInfo=true] - Display full info of the parent level in right part of the map, rather than the parent level name and the primary value
   * @param {String} [config.pageStateId=document.querySelector('#PageStateId').value] - PageStateId
   * @param {Object} config.normals - an object where the keys are the names of columns taken from DBDesignerTable and values - their string types: `string`, `number`, `boolean`, `stringArray`, `numberArray`
   * @param {String} [config.normalsSeparator=','] - delimiter between values in `stringArray` (`us-ca, us-tx, us-wy`) and `numberArray` (`-31.86,16.38`). They are served as a delimiter-separated string and the delimiter is `,` by default. If you use another one, make sure you specify it here
   * @param {Object} [config.options={}] - options passed to HighMap to restyle/reconfigure it
   * @param {Object} [config.loadingText= 'fetching data'] - text to show when loading another level
   * */
  constructor(config = {}) {
    this.declareGlobals(config, {
      initialMap: 'custom/world-highres2',
      valueColumn: 1,
      fullParentLevelInfo: true,
      colorFn: function (value, target) {
        return value !== null ? value >= 80 ? '#4caf50' : ((value < 80 && value >= 60 ) ? '#ffc107' : '#ff5722') : 'blue';
      },
      pageStateId: (document.querySelector('#PageStateId') ? document.querySelector('#PageStateId').value : null),
      loadingText: 'fetching data',
      options: {},
    }, this.typeCheck(config));

    const {hierarchy,flatHierarchy} = new MapHierarchy({
      flatHierarchy:this.flatHierarchy,
      hierarchy:this.hierarchy,
      normals:this.normals,
      normalsSeparator:this.normalsSeparator
    });

    this.flatHierarchy = flatHierarchy;
    this.hierarchy = hierarchy;

    this.parseTableData();

    this.drawMap();
  }

  declareGlobals(config, defaults = {}, typeCheck = {}) {
    const mixedOptions = {...config, ...defaults};
    Object.keys(mixedOptions).forEach(key => {
      if (typeCheck[key] && typeof typeCheck[key] === 'function') typeCheck[key](mixedOptions[key]);
      this[key] = mixedOptions[key];
    })
  }

  typeCheck(opts) {
    if (typeof Highcharts === 'undefined') {
      throw new Error('Highcharts must be declared. Probably they are missing')
    }
    if (typeof Highcharts.maps === 'undefined') {
      throw new Error('HighMaps must be loaded. Probably they are missing')
    }
    if (!(opts.rowheaders && opts.rowheaders !== null && opts.rowheaders.length > 0))
      throw new Error('"rowheaders" array must be present to parse data');

    return {
      source: function () {
        if (!(opts.source && opts.source.localName === 'table'))
          throw new Error('source table must be specified')
      },
      containerID: function () {
        if (!(opts.containerID && typeof opts.containerID === 'string'))
          throw new Error('containerID must be a string without a leading # character but it is ' + typeof opts.containerID)
      },
      tableID: function () {
        if (!(opts.tableID && typeof opts.tableID === 'string'))
          throw new Error('tableID must be a string but it is ' + typeof opts.tableID)
      },
      mappointCallback: function () {
        const cb = opts.mappointCallback;
        if (cb && cb !== null && typeof cb !== 'function')
          throw new Error('mappointCallback must be a function')
      },
    }
  }

  /**
   * Parses table passed to it and adds data to `._data` in `hierarchy`
   * @param {HTMLTableElement} options.source - source table for data
   * @param {Number|Array} options.excludeRows - rows to be excluded from parsing
   * @param {Array} options.rowheaders - array of `source` rowheaders
   * @param {Object} options.flatHierarchy - flat hierarchy object
   * */
  parseTableData(options={}) {
    const {
      source = this.source,
      excludeRows = this.excludeRows,
      rowheaders = this.rowheaders.map(rh => rh[0]),
      excludeColumns = this.excludeColumns,
    } = options;

    const aggregatedTable = new AggregatedTable({source, excludeColumns, excludeRows});
    rowheaders.forEach((rowHeader, i) => {
      if (!this.flatHierarchy[rowHeader]._data) {
        this.flatHierarchy[rowHeader]._data = aggregatedTable.data[i].map((dataItem, index) => {
          return {
            value: dataItem.data,
            title: index !== 0 ? aggregatedTable.columns[index].title : "Region"
          }
        })
      }
    })
  }

  drawMap() {
    this.curLVL = this.flatHierarchy[this.rowheaders[0]];
    Highcharts.mapChart(this.containerID, {...this.mapConfig, ...this.options});
  }

  get mapConfig() {
    const This = this;
    return {
      lang: {
        drillUpText: '< to {series.parent}'
      },
      tooltip: {
        pointFormat: This.getTooltip()
      },
      title: {
        text: ''
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        series: {
          states: {
            normal: {
              animation: false
            }
          },
          point: {
            events: {
              mouseOver: function () {
                this.series.data.forEach(el => el.setState("hover"))
              },
              mouseOut: function () {
                this.series.data.forEach(el => el.setState())
              }
            }
          }
        }
      },
      mapNavigation: {
        enabled: true,
        buttons: {
          zoomIn: {
            verticalAlign: "bottom"
          },
          zoomOut: {
            verticalAlign: "bottom"
          }
        }
      },
      subtitle: {
        align: 'right',
        floating: true,
        text: This.subtitle,
      },
      drilldown: {
        drillUpButton: {
          position: {
            align: "left",
            y: 0
          },
          relativeTo: 'spacingBox'
        }
      },
      chart: {
        events: {
          drilldown: function (e) {
            //this == chart reference;
            //console.log(CircularJSON.parse(CircularJSON.stringify(e.point)));
            let chart = e.target;
            This.curLVL = This.getLevelByName(e.point.series.name);
            let curLVL = This.curLVL;
            if (curLVL) {
              chart.showLoading(This.loadingText);
              This.fetchChildData(()=>{
                This.updateMap(curLVL, chart, e);
                chart.subtitle.update({text: This.subtitle});
                chart.hideLoading();
              })
            }
          },
          drillupall: function (e) {
            This.curLVL = This.curLVL.parent;
            if (This.curLVL) {
              e.target.subtitle.update({text: This.subtitle});
            }
          }
        }
      },
      series: This.initializeMap([{
        showInLegend: false,
        mapData: Highcharts.maps[This.initialMap]
      }])
    };
  }

  /**
   * This function fetches childTable and parses its data by appending it to `._data` in `hierarchy` nodes.
   * You may override this method but make sure you execute a callback passed as its parameter
   * */
  fetchChildData(callback) {
    const {id,parent,subcells} = this.curLVL;
    return AsyncHierarchyTable.fetchChildTable(id, parent ? parent.id : null, this.tableID, this.pageStateId)
      .then(table => {
      // parse data loaded from table
      this.parseTableData({
        source: table,
        excludeRows: 0,
        rowheaders: subcells.map(lvl => lvl.id),
      });
      callback && typeof callback==='function' && callback()
    })
  }

  /**
   * Generates a serialized dataset for a tooltip
   * */
  getTooltip() {
    let data = this.curLVL._data;
    return data.map((item, index) => this.generateTooltipRow(item.title, `{point.data.${index}.value}`)).join("<br />")
  }

  /**
   * Generates chart subtitle returning region and main value of full info based on `fullParentLevelInfo`
   * */
  get subtitle() {
    if (this.fullParentLevelInfo) {
      return this.curLVL._data.map(item => this.generateTooltipRow(item.title, item.value)).join('<br />')
    } else {
      const parentLevel = this.curLVL._data[0],
        currentLevel = this.curLVL._data[this.valueColumn];

      return [
        this.generateTooltipRow(parentLevel.title, parentLevel.value),
        this.generateTooltipRow(currentLevel.title, currentLevel.value)
      ].join('<br />')
    }
  }

  generateTooltipRow(label, value) {
    return '<span class="tooltip-level-label">' + label + ': </span><span class="tooltip-level-value">' + value + '</span>'
  }

  /**
   * get subcell by text rather than by id
   * @param {String} name - name of the subcell we're looking for
   * @returns {Object} Returns a subcell which has that name
   * */
  getLevelByName(name) {
    return this.curLVL.subcells.filter(el => el.text === name)[0];
  }


  /**
   * Creates custom geoJSON file
   * @param {Object} mapData - initial map
   * @param {Array}countriesList - list of countries IDs
   * @param {String} mapName
   * @returns {Object}
   * */
  static createCustomGeoJSON(mapData, countriesList, mapName) {
    let geojson = {
      title: "",
      version: "0.1.0",
      type: "FeatureCollection",
      copyright: "Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth",
      copyrightShort: "Natural Earth",
      copyrightUrl: "http://www.naturalearthdata.com",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:EPSG:54003"
        }
      },
      "hc-transform": {
        default: {
          crs: "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +datum=WGS84 +units=m +no_defs",
          scale: 1.72182781654e-05,
          jsonres: 15.5,
          jsonmarginX: -999,
          jsonmarginY: 9851.0,
          xoffset: -19495356.3693,
          yoffset: 12635908.1982
        }
      },
      features: DrilldownMap.getFeatures(countriesList, mapData)
    };

    geojson.title = mapName;
    return geojson;
  }

  /**
   * Get array of features from geoJSON file
   * @param {Array|String} countriesList - countries IDs
   * @param {Object} mapData - your initial map
   * @param {String} key for geojson features comparing
   * @returns {Array} features list
   * */
  static getFeatures(countriesList, mapData, key = "hc-key") {
    if (typeof countriesList === 'string') {
      return mapData.features.filter(feature => feature.properties[key] === countriesList);
    } else if (Array.isArray(countriesList)) {
      return mapData.features.filter(feature => countriesList.indexOf(feature.properties[key]) !== -1);
    }
  }


  /**
   * Get series for the first time map initialization
   * @param {Array} [series=[]] - series
   * @returns {Array}
   * */
  initializeMap(series = []) {
    this.curLVL.subcells.forEach(subcell => {
      if (subcell.mapID) {
        let seriesItem = this.composeSeries(subcell);
        series.push(seriesItem);
      }
    });
    return series;
  }

  /**
   * Load map from HighMaps map collection
   * @param {String} source
   * @returns {Promise}
   * */
  static loadMap(source) {
    return new Promise((resolve, reject) => {
      try{
        jQuery.getScript('https://code.highcharts.com/mapdata/' + source + '.js', function () {
          resolve(Highcharts.maps[source]);
        });
      } catch(error){
        reject(error)
      }
    });
  }

  /**
   * Gets the main value that the chart is built on
   * @param {Object} level - level under examination
   * @param {Number} valueColumn - Zero-based column index that contains primary value which will be used for map coloring
   * @returns {Number} Returns primary value
   * */
  static getPrimaryValue(level, valueColumn) {
    return level._data[valueColumn].value;
  }


  /**
   * Creates a single series data for HighMap series option
   * @param {Object} level - a level in hierarchy
   * @returns {Object}
   * */
  getSeriesData(level) {
    let drilldown = level.subcells ? level.text : null;
    if (typeof level.mapID === 'string') {
      return [{
        drilldown: drilldown,
        code: level.mapID,
        value: DrilldownMap.getPrimaryValue(level, this.valueColumn),
        data: level._data,
      }]
    } else if (Array.isArray(level.mapID)) {
      return level.mapID.map(mapID => {

        return {
          drilldown: drilldown,
          code: mapID,
          value: DrilldownMap.getPrimaryValue(level, this.valueColumn),
          data: level._data,
        }
      });
    } else {
      throw new Error("Data element is corrupted");
    }
  }

  /**
   * Executes `colorFn` passed by user to compute color by passing `value` and `target` to it
   * @param {Function} colorFn - color function
   * @param {Number} value - value to test
   * @param {Number} target - target for the level
   * */
  static computeColor(colorFn, value, target) {
    if (colorFn) {
      return colorFn(value, target)
    } else {
      return undefined
    }
  }

  /**
   * Create a single mappoint series
   * @param {Object} subcell - a single hierarchy element
   * @param {Object} mapData
   * @param {Object} chart - reference to chart object
   * @returns {Object} series for map points
   * */
  getCoordinateSeries(subcell, mapData, chart) {
    chart.mapTransforms = mapData ? mapData["hc-transform"] : Highcharts.maps["custom/world-highres2"]["hc-transform"];
    let pos = chart.fromLatLonToPoint({lat: subcell.coordinates[0], lon: subcell.coordinates[1]});
    let config = {
      type: "mappoint",
      name: subcell.text,
      marker: {
        lineColor: "black",
        lineWidth: 1,
        radius: 4,
        symbol: "circle",
      },
      data: [{
        color: DrilldownMap.computeColor(this.colorFn, DrilldownMap.getPrimaryValue(subcell, this.valueColumn), subcell.target),
        name: subcell.text,
        value: subcell.value,
        x: pos.x,
        y: pos.y
      }]
    };
    if (this.mappointCallback) {
      let self = this;
      config.events = {
        click: function (e) {
          self.mappointCallback.call(this, e);
        }
      }
    }
    return config
  }

  /**
   * Creates a single series item for Highmaps series option
   * @param {Object} subcell - a subcell
   * @param {Object} mapData
   * @param {Object} chart - reference to chart object
   * @returns {Object} Returns series
   * */
  composeSeries(subcell, mapData, chart) {
    if (!subcell.coordinates) {
      mapData = mapData ? Highcharts.geojson(DrilldownMap.createCustomGeoJSON(mapData, subcell.mapID, subcell.text)) : Highcharts.geojson(DrilldownMap.createCustomGeoJSON(Highcharts.maps['custom/world-highres2'], subcell.mapID, subcell.text));
      if (subcell.mapID) {
        let target = subcell.target;
        if (!target || target === null) {
          target = this.hierarchy[0].target;
        }
        return {
          name: subcell.text,
          dataLabels: {
            enabled: true,
            formatter: function () {
              if (this.series.data[0]["hc-key"] === this.point["hc-key"])
                return this.series.name
            }
          },
          tooltip: {
            pointFormat: this.getTooltip()
          },
          color: DrilldownMap.computeColor(this.colorFn, DrilldownMap.getPrimaryValue(subcell, this.valueColumn), target),
          allAreas: false,
          parent: subcell.parent.text,
          mapData,
          joinBy: ['hc-key', 'code'],
          data: this.getSeriesData(subcell)
        };
      }
    } else {
      return this.getCoordinateSeries(subcell, mapData, chart)
    }
  }


  /**
   * Updates your map view after drilldown click
   * @param {Object} curLVL
   * @param {Object} chart
   * @param {Object} e - drilldown event object
   * @returns {Object} Returns curLVL
   * */
  updateMap(curLVL, chart, e) {
    if (curLVL && curLVL.mapName) {// if we have another map to load
      let map = DrilldownMap.loadMap(curLVL.mapName);
      map.then(mapData => {
        this.addSeries(curLVL, chart, e, mapData)
      });
    } else if (curLVL && !curLVL.mapName) {
      this.addSeries(curLVL, chart, e);
    }
  }

  /**
   * Composes a series for your HighMaps options config
   * @param {Object} curLVL
   * @param {Object} chart
   * @param {Object} e - drilldown event object
   * @param {Object} mapData - mapData geoJSON
   * */
  addSeries(curLVL, chart, e, mapData) {
    if (curLVL.subcells) { // if it's an end point
      if (curLVL.subcells[0].coordinates) {
        let seriesItem = this.composeSeries(curLVL, mapData, chart);
        seriesItem.data.forEach(dataItem => {
          dataItem.drilldown = null;
          dataItem.value = null
        });
        chart.addSingleSeriesAsDrilldown(e.point, seriesItem);
      }
      curLVL.subcells.forEach(subcell => {
        if (!subcell.mapID && !subcell.coordinates) return;
        let seriesItem = this.composeSeries(subcell, mapData, chart);
        chart.addSingleSeriesAsDrilldown(e.point, seriesItem);
      });
      chart.applyDrilldown();
    } else {
      let seriesItem = this.composeSeries(curLVL, mapData, chart);
      seriesItem.data.map(dataItem => {
        dataItem.drilldown = null;
        dataItem.value = null
      });
      chart.addSeriesAsDrilldown(e.point, seriesItem);
    }
  }
}
