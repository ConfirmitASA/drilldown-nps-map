import ReportalBase from "r-reportal-base";
class DrilldownMap {
  constructor({hierarchy, containerID, mappointCallback, dataClasses = [{
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

    let config = ReportalBase.mixin(options, {colorAxis:{dataClasses}});
    if(typeof Highcharts == undefined){throw new Error('Highcharts must be declared. Probably they are missing')};
    if(typeof Highcharts.maps == undefined){throw new Error('HighMaps must be loaded. Probably they are missing')};

    this.constructor.addMapIDsToHierarchyLevel(hierarchy);
    this.drawMap(hierarchy, containerID, config);
  }

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

  static getFeatures(countriesList,mapData,key="hc-key"){
    if (typeof countriesList === 'string'){
      return mapData.features.filter(feature => feature.properties[key] === countriesList);
    } else if (Array.isArray(countriesList)){
      return mapData.features.filter(feature => countriesList.indexOf(feature.properties[key])!=-1);
    }
  }


  /**
   * @param {Object} curLVL - current level in hierarchy
   * @param {Array} [series=[]] - series
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

  static loadMap(source){
    return new Promise((resolve,reject)=>{
      jQuery.getScript('https://code.highcharts.com/mapdata/' + source + '.js', function () {
        resolve(Highcharts.maps[source]);
      });
    });
  }

  /**
   * @param {Object} level - a level in hierarchy
   * */
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
  static getColor(val){
    if (val < 60)
      return '#f44336';
    else if (val < 80)
      return '#ffc107';
    else
      return '#8bc34a';
  }

  /**
   * Returns series for map points
   * */
  getCoordinateSeries(subcell,mapData,chart){
    chart.mapTransforms = mapData ?  mapData["hc-transform"] : Highcharts.maps["custom/world-highres2"]["hc-transform"];
    let pos = chart.fromLatLonToPoint({ lat: subcell.coordinates[0], lon: subcell.coordinates[1] });
    let config = {
      type: "mappoint", // or mapbubble
      name: subcell.text,
      marker: {
        lineColor: "black",
        lineWidth: 1,
        radius: 4,
        symbol: "circle",
      },
      data: [{
        color: DrilldownMap.getColor(subcell.value),
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

   addSeries(curLVL,chart,e,mapData){
    if (curLVL.subcells && curLVL.isGlobal) {
      if(!curLVL.subcells[0].isGlobal){
        let a = this.composeSeries(curLVL,mapData, chart);
        a.data.map(el => {el.drilldown = null, el.value = null});
        chart.addSingleSeriesAsDrilldown(e.point, a);
      }
      curLVL.subcells.forEach(el => {
        if(!el.mapID && !el.coordinates)
          return;
        let a = this.composeSeries(el,mapData, chart);
        chart.addSingleSeriesAsDrilldown(e.point, a);
      });
      chart.applyDrilldown();
    } else {
      let a = this.composeSeries(curLVL, mapData, chart);
      a.data.map(el => {el.drilldown = null, el.value = null});
      chart.addSeriesAsDrilldown(e.point, a);
    }
  }

  drawMap(hierarchy, containerID, options){
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
        text: `Current level: ${curLVL.text}`
      },
      chart:{
        events: {
          drilldown: function(e){
            console.log(e);
            let chart = e.target;
            curLVL = self.updateMap(curLVL, chart, e);
            chart.subtitle.update({text: `Current region: ${curLVL.text}<br> Region NPS: ${curLVL.value}`});
          },
          drillupall: function(e){
            curLVL = curLVL.parent;
            this.subtitle.update({text: `Current level: ${curLVL.text}`});
          }
        }
      },
      series: this.initMap(curLVL,[{
        mapData: Highcharts.maps["custom/world-highres2"]
      }])
    };
    config = ReportalBase.mixin(config,options);
    Highcharts.mapChart( containerID, config);
  }

  drilldown(e){

  }
}

export default DrilldownMap;
