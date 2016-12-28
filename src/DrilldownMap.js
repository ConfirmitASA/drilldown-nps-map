require("./drilldown-map.css");
import ReportalBase from "r-reportal-base";
import AsyncHierarchyTable from "r-async-hierarchy-table";
import MapHierarchy from "./map-hierarchy";
import AggregatedTable from "r-aggregated-table";

var CircularJSON=function(e,t){function l(e,t,o){var u=[],f=[e],l=[e],c=[o?n:"[Circular]"],h=e,p=1,d;return function(e,v){return t&&(v=t.call(this,e,v)),e!==""&&(h!==this&&(d=p-a.call(f,this)-1,p-=d,f.splice(p,f.length),u.splice(p-1,u.length),h=this),typeof v=="object"&&v?(a.call(f,v)<0&&f.push(h=v),p=f.length,d=a.call(l,v),d<0?(d=l.push(v)-1,o?(u.push((""+e).replace(s,r)),c[d]=n+u.join(n)):c[d]=c[0]):v=c[d]):typeof v=="string"&&o&&(v=v.replace(r,i).replace(n,r))),v}}function c(e,t){for(;var r=0,i=t.length;r<i;e=e[t[r++].replace(o,n)]);return e}function h(e){return function(t,s){var o=typeof s=="string";return o&&s.charAt(0)===n?new f(s.slice(1)):(t===""&&(s=v(s,s,{})),o&&(s=s.replace(u,"$1"+n).replace(i,r)),e?e.call(this,t,s):s)}}function p(e,t,n){for(var r=0,i=t.length;r<i;r++)t[r]=v(e,t[r],n);return t}function d(e,t,n){for(var r in t)t.hasOwnProperty(r)&&(t[r]=v(e,t[r],n));return t}function v(e,t,r){return t instanceof Array?p(e,t,r):t instanceof f?t.length?r.hasOwnProperty(t)?r[t]:r[t]=c(e,t.split(n)):e:t instanceof Object?d(e,t,r):t}function m(t,n,r,i){return e.stringify(t,l(t,n,!i),r)}function g(t,n){return e.parse(t,h(n))}var n="~",r="\\x"+("0"+n.charCodeAt(0).toString(16)).slice(-2),i="\\"+r,s=new t(r,"g"),o=new t(i,"g"),u=new t("(?:^|([^\\\\]))"+i),a=[].indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},f=String;return{stringify:m,parse:g}}(JSON,RegExp);

class DrilldownMap extends MapHierarchy {
  /**
   * Creates a drilldown map
   * @param {Object} hierarchy - a hierarchical object for a map to be built upon
   * @param {String} containerID - id of the container the map will be drawn to
   * @param {Function} mappointCallback - executed when a mappoint (city) is clicked
   * @param {Array.<{from:Number, to:Number, color:String, name:String}>} dataClasses - color bands for conditional formatting
   * @param {Object} options - options passed to HighMap to restyle/configure it
   * @param {Function} colorFn - A function that allows custom color coding computation based on value and target.
   * `colorFn` accepts two attributes: `value` and `target` and must return a color string based on those two attributes.
   * Make sure hierarchy has `target` loaded from DBDesigner table into each hierarchy level, otherwise a default config `dataClasses` takes precedence on value
   * Example:
   *
   * ``` javascript
   *    {
   *    //some constructor configuration above
   *      colorFn: function(value,target){
   *        return (value!=null && target!=null)? (value - target >= 0) ? "#18BC9C" : ((value >= 0.9*target) ? "#FF4900" : "#E45335") : undefined;
   *      }
   *     //some constructor configuration below
   *    }
   * ```
   * @param {Number} [valueColumn=1] - Zero-based column index that contains primary value which will be used for map coloring
   * */
  constructor({
    source,rowheaders, // initial table
    hierarchy, initMap="custom/world-highres2", containerID, mappointCallback,
    excludeColumns, excludeRows, valueColumn=1,
    colorFn=function(value,target){
       return value!=null? value >= 80 ? "#4caf50" : ((value <80 && value>=60 ) ? "#ffc107" : "#ff5722") : "blue";
    },
    hierarchyID,hierarchyControlID,pageStateId,languageCode=9,tableID,
    normals,normalsSeparator, dataClasses = [{
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
    super(hierarchy,normals,normalsSeparator);

    this.constructor.parseTableData({source,excludeRows,excludeColumns,rowheaders:rowheaders.map(rh=>rh[0]),flatHierarchy:this.flatHierarchy});
    if(colorFn && typeof colorFn == "function"){
      this.colorFn = colorFn;
    }
    this.valueColumn = valueColumn;
    this.hierarchyID= hierarchyID;
    this.hierarchyControlID= hierarchyControlID;
    this.pageStateId=pageStateId;
    this.languageCode=languageCode;
    this.tableID = tableID;

    if(mappointCallback && mappointCallback!=null) {
      if (typeof mappointCallback == 'function') {
        this.mappointCallback = mappointCallback
      } else {
        throw new TypeError("mappointCallback must be a function")
      }
    }
    let config = this.config = ReportalBase.mixin(options, {/*colorAxis:{dataClasses}*/});
    if(typeof Highcharts == undefined){throw new Error('Highcharts must be declared. Probably they are missing')}
    if(typeof Highcharts.maps == undefined){throw new Error('HighMaps must be loaded. Probably they are missing')}
    //
    this.drawMap(rowheaders, containerID, initMap, config);
  }

  static parseTableData({source,excludeRows,excludeColumns,rowheaders, flatHierarchy}={}){
    let AT = new AggregatedTable({
      source,
      excludeColumns,excludeRows
    });
    if(rowheaders && rowheaders!=null && rowheaders.length>0){
      rowheaders.forEach((rh,i)=>{
        if(!flatHierarchy[rh]._data){
          flatHierarchy[rh]._data=AT.data[i].map((dataItem,index)=>{
            return{
              value: dataItem.data,
              title: index!=0?AT.columns[index].title:"Region"
            }
          })
        }
      })
    } else {
      throw new Error('rowheaders must be present to parse data');
    }
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

  static getPrimaryValue(level,valueColumn){
    return level._data[valueColumn].value;
  }


  /**
   * Creates a single series data for HighMap series option
   * @param {Object} level - a level in hierarchy
   * @returns {Object}
   */
  getSeriesData(level){
    let drilldown = level.subcells ? level.text : null;
    if (typeof level.mapID === 'string') {
      return [{
        drilldown: drilldown,
        code: level.mapID,
        value: DrilldownMap.getPrimaryValue(level,this.valueColumn),
        data: level._data,
        //color: DrilldownMap.computeColor(this.colorFn,DrilldownMap.getPrimaryValue(level,this.valueColumn),level.target)
      }]
    } else if (Array.isArray(level.mapID)){
      return level.mapID.map(mapID=> {

        return {
          drilldown: drilldown,
          code: mapID,
          value: DrilldownMap.getPrimaryValue(level,this.valueColumn),
          data: level._data,
          //color: DrilldownMap.computeColor(this.colorFn,DrilldownMap.getPrimaryValue(level,this.valueColumn),level.target)
        }
      });
    } else {
      throw new Error("Data element is corrupted");
    }
  }

  /**
   * Executes `colorFn` passed by user to compute color by passing `value` and `target` to it
   * */
  static computeColor(colorFn, value, target){
    if(colorFn){
      return colorFn(value, target)
    } else {
      return undefined
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
   * Creates a single series item for Highmaps series option
   * @param {Object} subcell - a subcell
   * @param mapData
   * @param chart
   * @returns {Object} Returns series
   */
  composeSeries(subcell,mapData,chart){
    if(!subcell.coordinates) {
      mapData = mapData ? Highcharts.geojson(DrilldownMap.createCustomGeoJSON(mapData, subcell.mapID, subcell.text)) : Highcharts.geojson(DrilldownMap.createCustomGeoJSON(Highcharts.maps['custom/world-highres2'], subcell.mapID, subcell.text));
      if (subcell.mapID) {
        let target = subcell.target;
        if(!target || target == null){
          target = this.hierarchy[0].target;
        }
        return {
          name: subcell.text,
          dataLabels: {
            enabled: true,
            formatter: function(){
              if (this.series.data[0].name == this.point.name)
                return this.series.name
            }
          },
          /*tooltip: {
           pointFormat: 'NPS : {point.value}'
           },*/
          color:DrilldownMap.computeColor(this.colorFn,DrilldownMap.getPrimaryValue(subcell,this.valueColumn),target),
          allAreas: false,
          parent: subcell.parent.text,
          mapData,
          joinBy: ['hc-key', 'code'],
          data: this.getSeriesData(subcell)
        };
      }
    } else {return this.getCoordinateSeries(subcell,mapData,chart)}
  }

  /**
   * get subcell by text rather than by id
   * @param {Object} curLVL - current level
   * @param {String} name - name of the subcell we're looking for
   * @returns {Object} Returns a subcell which has that name
   * */
  static getLevelByName(curLVL,name){
    return curLVL.subcells.filter(el => el.text == name)[0];
  }

  /**
   * Updates your map view after drilldown click
   * @param {Object} curLVL
   * @param {Object} chart
   * @param {Object} e - drilldown event object
   * @returns {Object} Returns curLVL
   */
  updateMap(curLVL, chart, e){
    //curLVL = curLVL.subcells.filter( el => el.text == e.point.series.name)[0];
    if(curLVL && curLVL.mapName){// if we have another map to load
      let map = DrilldownMap.loadMap(curLVL.mapName);
      map.then(mapData=>{
        this.addSeries(curLVL,chart,e,mapData)
      });
    } else if(curLVL && !curLVL.mapName){
      this.addSeries(curLVL,chart,e);
    }
    //return curLVL;
  }

  /**
   * Composes a series for your HighMaps options config
   * @param {Object} curLVL
   * @param {Object} chart
   * @param {Object} e - drilldown event object
   * @param {Object} mapData - mapData geoJSON
   */
  addSeries(curLVL,chart,e,mapData){
    if (curLVL.subcells){ // if it's an end point
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
   * Generates chart subtitle returning region and main value
   * */
  get subtitle(){
    //return `${this.curLVL._data[0].title}: ${this.curLVL._data[0].value}<br> ${this.curLVL._data[this.valueColumn].title}: ${this.curLVL._data[this.valueColumn].value}`
    return this.curLVL._data.map((item)=>{
      return `<span class="tooltip-level-label">${item.title}:</span><span class="tooltip-level-value"> ${item.value}</span>`
    }).join("<br />")
  }

  /**
   * Generates a serialized dataset for a tooltip
   * */
  getTooltip(){
    let data = this.curLVL._data;
    return data.map((item,index)=>`<span class="tooltip-level-label">${item.title}:</span><span class="tooltip-level-value"> {point.data.${index}.value}</span>`).join("<br />")
  }

  /**
   * @param hierarchy
   * @param containerID
   * @param options
   */
  drawMap(rowheaders, containerID, initMap, options){
    this.curLVL = this.flatHierarchy[rowheaders[0]];
    let self = this;
    let config = {
      lang: {
        drillUpText: '< to {series.parent}'
      },
      tooltip: {
        pointFormat: self.getTooltip()
      },
      title: {
        text: ''
      },
      legend: {
        enabled: true
      },
      plotOptions:{
        series: {
          states:{
            normal: {
              animation: false
            }
          },
          point: {
            events: {
              mouseOver: function(e){
                this.series.data.forEach(
                  el => el.setState("hover")
                )
              },
              mouseOut: function(e){
                this.series.data.forEach(
                  el => el.setState()
                )
              }
            }
          }
        }
      },
      mapNavigation: {
        enabled: true,
        buttons:{
          zoomIn:{
            verticalAlign:"bottom"
          },
          zoomOut:{
            verticalAlign:"bottom"
          }
        }
      },
      subtitle:{
        align: 'right',
        text: self.subtitle,
        floating:true
      },
      drilldown:{
        drillUpButton: {
          position:{
            align:"left",
            y:0
          },
          relativeTo:'spacingBox'
        }
      },
      chart:{
        events: {
          drilldown: function(e){
            //this == chart reference;
            console.log(CircularJSON.parse(CircularJSON.stringify(e.point)));
            let chart = e.target;
            self.curLVL = DrilldownMap.getLevelByName(self.curLVL,e.point.series.name);
            let curLVL = self.curLVL;
            if(curLVL){
              chart.showLoading('fetching data');
              let table = AsyncHierarchyTable.fetchChildTable(curLVL.id, curLVL.parent?curLVL.parent.id:null, self.tableID, self.pageStateId)
                .then(table=>{
                  // parse data loaded from table
                  DrilldownMap.parseTableData({
                    source:table,
                    excludeRows:0,
                    rowheaders:curLVL.subcells.map(lvl=>lvl.id),
                    flatHierarchy:self.flatHierarchy
                  });
                  self.updateMap(curLVL, chart, e);
                  chart.subtitle.update({text: self.subtitle});
                  chart.hideLoading();
                });
            }
          },
          drillupall: function(e){
            self.curLVL = self.curLVL.parent;
            if (self.curLVL){
              e.target.subtitle.update({text: self.subtitle});
            }
          }
        }
      },
      series: self.initMap(self.curLVL,[{
        showInLegend:false,
        mapData: Highcharts.maps[initMap]
      }])
    };

    config = ReportalBase.mixin(config,options);
    Highcharts.mapChart( containerID, config);
  }
}

export default DrilldownMap;
