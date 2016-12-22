import ReportalBase from "r-reportal-base";

class DrilldownMap {
  /**
   * Creates a drilldown map
   * @param {Object} hierarchy - a hierarchical object for a map to be built upon
   * @param {String} containerID - id of the container the map will be drawn to
   * @param {Function} mappointCallback - executed when a mappoint (city) is clicked
   * @param {Array.<{from:Number, to:Number, color:String, name:String}>} dataClasses - color bands for conditional formatting
   * @param {Object} options - options passed to HighMap to restyle/configure it
   * */
  constructor({hierarchy, initMap="custom/world-highres2", containerID, mappointCallback, dataClasses = [{
    from: 80,
    to: 100,
    color: '#8bc34a',
    name: 'Promoter'
  },{
    from: 60,
    to: 80,
    color: '#ffc107',
    name: 'Passive'
  },{
    from: 0,
    to: 60,
    color: '#f44336',
    name: 'Detractor'
  }], options={}}={}){

    if(mappointCallback) {
      if (typeof mappointCallback == 'function') {
        this.mappointCallback = mappointCallback
      } else {
        throw new TypeError("mappointCallback must be a function")
      }
    }
    let config = this.config = ReportalBase.mixin(options, {colorAxis:{dataClasses}});
    if(typeof Highcharts == undefined){throw new Error('Highcharts must be declared. Probably they are missing')};
    if(typeof Highcharts.maps == undefined){throw new Error('HighMaps must be loaded. Probably they are missing')};
    this.constructor.addMapIDsToHierarchyLevel(hierarchy);
    //
    this.drawMap(hierarchy, containerID, initMap, config);
  }

  /**
   * Creates custom geoJSON file
   * @param {Object} mapData - initial map
   * @param {Array}countriesList - list of countries IDs
   * @param {String} mapName
   * @returns {Object}
   */
  static createCustomGeoJSON(mapData, countriesList, mapName) {
    let geojson = {
      title:"",
      version:"0.1.0",
      type:"FeatureCollection",
      copyright:"Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth",
      copyrightShort:"Natural Earth",
      copyrightUrl:"http://www.naturalearthdata.com",
      crs:{
        type:"name",
        properties:{
          name:"urn:ogc:def:crs:EPSG:54003"
        }
      },
      "hc-transform":{
        default:{
          crs:"+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +datum=WGS84 +units=m +no_defs",
          scale:1.72182781654e-05,
          jsonres:15.5,
          jsonmarginX:-999,
          jsonmarginY:9851.0,
          xoffset:-19495356.3693,
          yoffset:12635908.1982
        }
      },
      features: DrilldownMap.getFeatures(countriesList,mapData)//[[]]
    };

    geojson.title = mapName;
    return geojson;
  }

  /**
   * Get array of features from geoJSON file
   * @param {Array | String}countriesList - countries IDs
   * @param {Object} mapData - your initial map
   * @param {String} key for geojson features comparing
   * @returns {Array} features list
   */
  static getFeatures(countriesList,mapData,key="hc-key"){
    if (typeof countriesList === 'string'){
      return mapData.features.filter(feature => feature.properties[key] === countriesList);
    } else if (Array.isArray(countriesList)){
      return mapData.features.filter(feature => countriesList.indexOf(feature.properties[key])!=-1);
    }
  }


  /**
   * Get series for the first time map initialization
   * @param {Object} curLVL - current level in hierarchy
   * @param {Array} [series=[]] - series
   * @returns {Array}
   * */
   initMap(curLVL, series = []){
    curLVL.subcells.forEach( subcell => {
      if (subcell.mapID) {
        let seriesItem = this.composeSeries(subcell);
        series.push(seriesItem);
      }
    });
    return series;
  }

  /**
   * Updates initial hierarchy
   * @param hierarchy
   * @param parent - hierarchy level parent
   */
  static addMapIDsToHierarchyLevel(hierarchy, parent = null) {
    hierarchy.forEach(subcell => {
      subcell.parent = parent;
      subcell.value = Math.random()*100;
      if(subcell.parent && subcell.parent!=null && subcell.parent.map){
        subcell.map = subcell.parent.map;
      }
      if (subcell.subcells) {
        DrilldownMap.addMapIDsToHierarchyLevel(subcell.subcells, subcell);
      }
      if(subcell.parent && subcell.mapID && !subcell.parent.map){
        if(!subcell.parent.mapID)
          subcell.parent.mapID = [];
        subcell.parent.mapID = subcell.parent.mapID.concat(subcell.mapID);
      }
    });
  }

  /**
   * Load map from HighMaps map collection
   * @param source
   * @returns {Promise}
   */
  static loadMap(source){
    return new Promise((resolve,reject)=>{
      jQuery.getScript('https://code.highcharts.com/mapdata/' + source + '.js', function () {
        resolve(Highcharts.maps[source]);
      });
    });
  }

  /**
   * Creates a single series data for HighMap series option
   * @param {Object} level - a level in hierarchy
   * @returns {Obejct}
   */
  static getSeriesData(level){
    let drilldown = level.subcells ? level.text : null;
    if (typeof level.mapID === 'string') {
      return [{
        'drilldown': drilldown,
        'code': level.mapID,
        'value': level.value
      }]
    } else if (Array.isArray(level.mapID)){
      return level.mapID.map(id=> {
        return {
          'drilldown': drilldown,
          'code': id,
          'value': level.value
        }
      });
    } else {
      throw new Error("Data element is corrupted");
    }
  }

  /**
   * Pick a color for mappoint
   * @param val
   * @param dataClasses
   * @returns {String} point color
   */
  static getColor(val, dataClasses){
    let color;
    dataClasses.forEach(dataClass =>{
      if(val >= dataClass.from && val < dataClass.to) {
        color = dataClass.color;
      }
    });
    return color;
  }

  /**
   * Create a single mappoint series
   * @param {Object} subcell
   * @param {Object} mapData
   * @param {Object} chart
   * @returns {Object} series for map points
   * */
  getCoordinateSeries(subcell,mapData,chart){
    chart.mapTransforms = mapData ?  mapData["hc-transform"] : Highcharts.maps["custom/world-highres2"]["hc-transform"];
    let pos = chart.fromLatLonToPoint({ lat: subcell.coordinates[0], lon: subcell.coordinates[1] });
    let config = {
      type: "mappoint", // or "mapbubble,
      name: subcell.text,
      marker: {
        lineColor: "black",
        lineWidth: 1,
        radius: 4,
        symbol: "circle",
      },
      data: [{
        color: DrilldownMap.getColor(subcell.value, this.config.colorAxis.dataClasses),
        name: subcell.text,
        value: subcell.value,
        x: pos.x,
        y: pos.y
      }]
    };
    if(this.mappointCallback){
      config.events = {
        click: this.mappointCallback
      }
    }
    return config
  }

  /**
   * Creates a single series for Highmaps series option
   * @param subcell
   * @param mapData
   * @param chart
   * @returns {Object}
   */
  composeSeries(subcell,mapData,chart){
    if(!subcell.coordinates) {
      mapData = mapData ? Highcharts.geojson(DrilldownMap.createCustomGeoJSON(mapData, subcell.mapID, subcell.text)) : Highcharts.geojson(DrilldownMap.createCustomGeoJSON(Highcharts.maps['custom/world-highres2'], subcell.mapID, subcell.text));
      if (subcell.mapID) {
        return {
          name: subcell.text,
          tooltip: {
            pointFormat: 'NPS : {point.value}'
          },
          allAreas: false,
          parent: subcell.parent.text,
          mapData,
          joinBy: ['hc-key', 'code'],
          data: DrilldownMap.getSeriesData(subcell),
        };
      }
    } else {return this.getCoordinateSeries(subcell,mapData,chart)}
  }

  /**
   * Updates your map view after drilldown click
   * @param {Object} curLVL
   * @param {Object} chart
   * @param {Object} e - drilldown event object
   * @returns {Object} Returns curLVL
   */
  updateMap(curLVL, chart, e){
    curLVL = curLVL.subcells.filter( el => el.text == e.point.series.name)[0];
    if(curLVL && curLVL.map){// if we have another map to load
      let map = DrilldownMap.loadMap(curLVL.map);
      map.then(mapData=>{
        this.addSeries(curLVL,chart,e,mapData)
      });
    } else if(curLVL && !curLVL.map){
      this.addSeries(curLVL,chart,e);
    }
    return curLVL;
  }

  /**
   * Composes a series for your HighMaps options config
   * @param {Object} curLVL
   * @param {Object} chart
   * @param {Object} e - drilldown event object
   * @param {Object} mapData - mapData geoJSON
   */
   addSeries(curLVL,chart,e,mapData){
    if (curLVL.subcells && curLVL.isGlobal) { // if it's an end point
      if(curLVL.subcells[0].coordinates){
        let seriesItem = this.composeSeries(curLVL,mapData, chart);
        seriesItem.data.forEach(dataItem => {
          dataItem.drilldown = null;
          dataItem.value = null
        });
        chart.addSingleSeriesAsDrilldown(e.point, seriesItem);
      }
      curLVL.subcells.forEach(subcell => {
        if(!subcell.mapID && !subcell.coordinates) return;

        let seriesItem = this.composeSeries(subcell,mapData, chart);
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

  /**
   * @param hierarchy
   * @param containerID
   * @param options
   */
  drawMap(hierarchy, containerID, initMap, options){
    let curLVL = hierarchy[0];
    let self = this;
    let config = {
      lang: {
        drillUpText: 'Back to {series.parent}'
      },
      tooltip: {
        pointFormat: 'NPS : {point.value}'
      },
      title: {
        text: 'Drilldown map'
      },
      legend: {
        enabled: false
      },
      mapNavigation: {
        enabled: true,
      },
      subtitle:{
        align: 'right',
        text: `Current level: ${curLVL.text} <br> Region NPS: ${curLVL.value}`
      },
      chart:{
        events: {
          drilldown: function(e){
            //TODO: add data promise;
            let chart = e.target;
            curLVL = self.updateMap(curLVL, chart, e);
            chart.subtitle.update({text: `Current region: ${curLVL.text}<br> Region NPS: ${curLVL.value}`});
          },
          drillupall: function(e){
            curLVL = curLVL.parent;
            if (curLVL)
              chart.subtitle.update({text: `Current level: ${curLVL.text} <br> Region NPS: ${curLVL.value}`});
          }
        }
      },
      series: this.initMap(curLVL,[{
        mapData: Highcharts.maps[initMap]
      }])
    };
    config = ReportalBase.mixin(config,options);
    Highcharts.mapChart( containerID, config);
  }
}

export default DrilldownMap;
