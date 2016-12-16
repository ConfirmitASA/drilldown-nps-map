class DrilldownMap {
  constructor({hierarchy, containerID, dataClasses = [{
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
  }], options}={}){
    if(typeof Highcharts == undefined){throw new Error('Highcharts must be declared. Probably they are missing')};
    if(typeof Highcharts.maps == undefined){throw new Error('HighMaps must be loaded. Probably they are missing')};
    this.constructor.addMapIDsToHierarchyLevel(hierarchy);
    this.constructor.drawMap(hierarchy, containerID, dataClasses);
  }

  static createCustomGeoJSON(sourceMap, countriesList, mapName) {
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
      features:[]
    };
    geojson.title = mapName;
    if (typeof countriesList === 'string'){
      sourceMap.features.forEach(feature => {
        if (feature.id === countriesList) {
          geojson.features.push(feature);
        }
      })
    } else if (Array.isArray(countriesList)){
      countriesList.forEach(id => {
        sourceMap.features.forEach(feature => {
          if (feature.id === id) {
            geojson.features.push(feature);
          }
        })
      });
    } else {
      console.log(typeof countriesID);
      throw new Error("Countries list probably missing or has corrupted data");
    }
    return geojson;
  }

  static addMapIDsToHierarchyLevel(hierarchy, parent = null) {
    hierarchy.forEach(el => {
      el.parent = parent;
      if (el.subcells) {
        DrilldownMap.addMapIDsToHierarchyLevel(el.subcells, el);
      }
      if(el.parent && el.mapID){
        if(!el.parent.mapID)
          el.parent.mapID = [];
        el.parent.mapID = el.parent.mapID.concat(el.mapID);
      }
    });
  }

  static loadMap(source){
    let map = new Promise((resolve,reject)=>{
      $.getScript('https://code.highcharts.com/mapdata/' + source + '.js', function () {
        resolve(Highcharts.geojson(Highcharts.maps[source])) ;
      });
    });
    return map;
  }

  static getSeriesData(el){
    let drilldown = el.text;
    if (typeof el.mapID === 'string') {
      return [{
        'code': el.mapID,
        'value': 65
      }]
    } else if (Array.isArray(el.mapID)){
      return el.mapID.map(function (id) {
        return {
          'drilldown': drilldown,
          'code': id,
          'value': 81
        }
      });
    } else {
      throw new Error("Data element is corrupted");
    }
  }

  static initMap(obj, series = []){
    obj.subcells.forEach( el => {
      if (el.mapID) {
        series.push(DrilldownMap.composeSeries(el));
      }
    });
    return series;
  }

  static composeSeries(el,mapData){
    mapData = mapData || Highcharts.geojson(DrilldownMap.createCustomGeoJSON(Highcharts.maps['custom/world'], el.mapID, el.text));
    if (el.mapID) {
      let s = {
        name: el.text,
        tooltip: {
          pointFormat: 'NPS : {point.value}'
        },
        parent: el.parent.text,
        mapData,
        joinBy: ['hc-a2', 'code'],
        data: DrilldownMap.getSeriesData(el)
      };
      return s;
    }
  }

  static updateMap(curLVL, chart, e){
    curLVL = curLVL.subcells.filter( el => el.text == e.point.series.name)[0];
    if(curLVL && curLVL.map){// if we have another map to load
      let map = DrilldownMap.loadMap(curLVL.map);
      map.then(mapData=>{
        DrilldownMap.addSeries(curLVL,chart,e,mapData)
      });
    } else if(curLVL && !curLVL.map){
      DrilldownMap.addSeries(curLVL,chart,e);
    }
    return curLVL;
  }

  static addSeries(curLVL,chart,e,mapData){
    if (curLVL.map){
      let a = DrilldownMap.composeSeries(curLVL,mapData);
      chart.addSeriesAsDrilldown(e.point, a);
      return;
    }
    if (curLVL.subcells) {
      curLVL.subcells.forEach(el => {
        let a = DrilldownMap.composeSeries(el,mapData);
        chart.addSingleSeriesAsDrilldown(e.point, a);
      });
      chart.applyDrilldown();
    } else {
      let a = DrilldownMap.composeSeries(curLVL,mapData);
      chart.addSeriesAsDrilldown(e.point, a);
    }
  }

  static drawMap(hierarchy, containerID, dataClasses){
    let curLVL = hierarchy[0];
    Highcharts.mapChart( containerID, {
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
      colorAxis: {
        dataClasses
      },
        mapNavigation: {
        enabled: true,
      },
      chart:{
        events: {
          drilldown: function(e){
            let chart = this;
            curLVL = DrilldownMap.updateMap(curLVL, chart, e);
          },
          drillupall: function(e){
            curLVL = curLVL.parent;
          }
        }
      },
      series: DrilldownMap.initMap(curLVL,[{
        mapData: Highcharts.maps["custom/world"]
      }])
    });
  }
}

export default DrilldownMap;