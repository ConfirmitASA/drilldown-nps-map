/**
 * Created by AlexanderKo on 12.12.2016.
 */

window.onload = function () {
    m(h);
	drawMap(h, 'container');
	//let map = new DrillDownMap(hierarchy, containerID, data, options);
}

let h = [
    {
        "text": "Global",
        "subcells": [
            {
                "text": "APAC",
                "isGlobal": true,
                "subcells": [
                    {
                        "text": "APAC%20Growth%20Markets",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "Korea",
                                "mapID": "KR",
                                "isGlobal": true
                            },
                            {
                                "text": "Taiwan",
                                "mapID": "TW",
                                "isGlobal": true
                            },
                            {
                                "text": "Malaysia",
                                "mapID": "MY",
                                "isGlobal": true
                            },
                            {
                                "text": "Philippines",
                                "mapID": "PH",
                                "isGlobal": true
                            },
                            {
                                "text": "Singapore",
                                "mapID": "SG",
                                "isGlobal": true
                            },
                            {
                                "text": "Thailand",
                                "mapID": "TH",
                                "isGlobal": true
                            }
                        ]
                    },
                    {
                        "text": "ANZ",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "Australia",
                                "mapID": "AU",
                                "isGlobal": true
                            },
                            {
                                "text": "New%20Zealand",
                                "mapID": "NZ",
                                "isGlobal": true
                            }
                        ]
                    },
                    {
                        "text": "Greater%20China",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "China",
                                "mapID": "CN",
                                "isGlobal": true
                            },
                            {
                                "text": "Hong%20Kong",
                                "isGlobal": true
                            }
                        ]
                    },
                    {
                        "text": "Japan",
                        "mapID": "JP",
                        "isGlobal": true
                    }
                ]
            },
            {
                "text": "EMEA",
                "isGlobal": true,
                "subcells": [
                    {
                        "text": "Northern%20Europe",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "United%20Kingdom",
                                "mapID": "GB",
                                "isGlobal": true
                            },
                            {
                                "text": "Scandinavia",
                                "isGlobal": true,
                                "subcells": [
                                    {
                                        "text": "Denmark",
                                        "mapID": "DK",
                                        "isGlobal": true
                                    },
                                    {
                                        "text": "Norway",
                                        "mapID": "NO",
                                        "isGlobal": true
                                    },
                                    {
                                        "text": "Sweden",
                                        "mapID": "SE",
                                        "isGlobal": true
                                    }
                                ]
                            },
                            {
                                "text": "Ireland",
                                "mapID": "IE",
                                "isGlobal": true
                            }
                        ]
                    },
                    {
                        "text": "Central%20Europe",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "Benelux",
                                "isGlobal": true,
                                "subcells": [
                                    {
                                        "text": "Belgium",
                                        "mapID": "BE",
                                        "isGlobal": true,
                                        "subcells": [
                                            {
                                                "text": "Belgium%20(Dutch)",
                                                "isGlobal": false
                                            },
                                            {
                                                "text": "Belgium%20(French)",
                                                "isGlobal": false
                                            }
                                        ]
                                    },
                                    {
                                        "text": "Netherlands",
                                        "mapID": "NL",
                                        "isGlobal": true
                                    }
                                ]
                            },
                            {
                                "text": "Eastern%20Europe",
                                "isGlobal": true,
                                "subcells": [
                                    {
                                        "text": "Czech%20Republic",
                                        "mapID": "CZ",
                                        "isGlobal": true
                                    },
                                    {
                                        "text": "Hungary",
                                        "mapID": "HU",
                                        "isGlobal": true
                                    },
                                    {
                                        "text": "Poland",
                                        "mapID": "PL",
                                        "isGlobal": true
                                    }
                                ]
                            },
                            {
                                "text": "Austria",
                                "mapID": "AT",
                                "isGlobal": true
                            },
                            {
                                "text": "Germany",
                                "mapID": "DE",
                                "isGlobal": true
                            },
                            {
                                "text": "Switzerland",
                                "mapID": "CH",
                                "isGlobal": true
                            }
                        ]
                    },
                    {
                        "text": "Southern%20Europe",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "France",
                                "mapID": "FR",
                                "isGlobal": true
                            },
                            {
                                "text": "Iberia",
                                "isGlobal": true,
                                "subcells": [
                                    {
                                        "text": "Portugal",
                                        "mapID": "PT",
                                        "isGlobal": true
                                    },
                                    {
                                        "text": "Spain",
                                        "mapID": "ES",
                                        "isGlobal": true
                                    }
                                ]
                            },
                            {
                                "text": "Italy",
                                "mapID": "IT",
                                "isGlobal": true
                            }
                        ]
                    },
                    {
                        "text": "Emerging%20Markets",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "South%20Africa",
                                "isGlobal": true
                            },
                            {
                                "text": "UK%20Exports",
                                "isGlobal": true
                            },
                            {
                                "text": "Chile",
                                "isGlobal": true
                            },
                            {
                                "text": "Distributors",
                                "isGlobal": true
                            }
                        ]
                    }
                ]
            },
            {
                "text": "North%20America",
                "isGlobal": true,
                "subcells": [
                    {
                        "text": "United%20States",
                        "isGlobal": true,
                        "mapID":"US",
                        "subcells": [
                            {
                                "text": "Eastern%20Region",
                                "isGlobal": false,
                                "subcells": [
                                    {
                                        "text": "Greenville%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Mobile%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Raleigh%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Atlanta%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Orlando-Tampa%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Southern%20Florida%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Huntsville%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Indianapolis%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Louisville%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Milwaukee%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Chicago%20",
                                        "isGlobal": false
                                    }
                                ]
                            },
                            {
                                "text": "Central%20Region",
                                "isGlobal": false,
                                "subcells": [
                                    {
                                        "text": "Fort%20Worth%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Dallas%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Houston%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Austin%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Tulsa%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Omaha%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "St.%20Louis%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Minneapolis%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Kansas%20City%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Cedar%20Rapids%20",
                                        "isGlobal": false
                                    }
                                ]
                            },
                            {
                                "text": "National%20Sales",
                                "isGlobal": false,
                                "subcells": [
                                    {
                                        "text": "NSC%20",
                                        "isGlobal": false
                                    }
                                ]
                            },
                            {
                                "text": "Northeastern%20Region",
                                "isGlobal": false,
                                "subcells": [
                                    {
                                        "text": "Rochester%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Detroit%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Columbus%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Cleveland%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Pittsburgh%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Cheshire%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Philadelphia%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Northern%20New%20Jersey%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Boston%20Nashua%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Baltimore%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Virginia%20Beach%20",
                                        "isGlobal": false
                                    }
                                ]
                            },
                            {
                                "text": "Western%20Region",
                                "isGlobal": false,
                                "subcells": [
                                    {
                                        "text": "Orange%20County-Simi%20Valley%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "San%20Jose%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Salt%20Lake%20City%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Portland%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Seattle%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "San%20Diego%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Sacramento%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Phoenix%20",
                                        "isGlobal": false
                                    },
                                    {
                                        "text": "Denver%20",
                                        "isGlobal": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "text": "Canada",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "Canada",
                                "mapID": "CA",
                                "isGlobal": true
                            }
                        ]
                    },
                    {
                        "text": "Mexico",
                        "isGlobal": true,
                        "subcells": [
                            {
                                "text": "Mexico",
                                "mapID": "MX",
                                "isGlobal": true
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

function createCustomGeoJSON(world, countriesID, mapName) {
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
        features:[]};
    geojson.title = mapName;
    if (typeof countriesID === 'string'){
        world.features.forEach(feature => {
            if (feature.id === countriesID) {
                geojson.features.push(feature);
            }
        })
    } else if (countriesID instanceof Array){
        countriesID.forEach(id => {
            world.features.forEach(feature => {
                if (feature.id === id) {
                    geojson.features.push(feature);
                }
            })
        });
    } else {
        console.log(typeof countriesID);
        throw new Error("Countries IDs is missing");
    }
    return geojson;
}

function m(h, parent = null) {
    h.forEach(el => {
        el.parent = parent;
        if (el.subcells) {
            m(el.subcells, el);
        }
        if(el.parent && el.mapID){
            if(!el.parent.mapID)
                el.parent.mapID = [];
            el.parent.mapID = el.parent.mapID.concat(el.mapID);
        }
    });
}
function getSeriesData(el){
    console.log(el);
    if (typeof el.mapID === 'string') {
        return [{
            'drilldown': el.text,
            'code': el.mapID,
            'value': el.mapID.length
        }]
    } else if (el.mapID instanceof Array){
        return el.mapID.map(function (id) {
            return {
                'drilldown': el.text,
                'code': id,
                'value': el.mapID.length
            }
        });
    } else {
        throw new Error("Data element is corrupted");
    }
}
function composeSeries(obj, series = []){
    obj.subcells.forEach( el => {
        if (el.mapID) {
            let s = {
                name: el.text,
                tooltip: {
                    pointFormat: 'NPS : {point.value}'
                },
                parent: el.parent.text,
                mapData: Highcharts.geojson(createCustomGeoJSON(Highcharts.maps['custom/world'], el.mapID, el.text)),
                joinBy: ['hc-a2', 'code'],
                data: getSeriesData(el)
            };
            series.push(s);
        }
    });
    return series;
}

function composeSeries1(el){
    if (el.mapID) {
        let s = {
            name: el.text,
            tooltip: {
                pointFormat: 'NPS : {point.value}'
            },
            parent: el.parent.text,
            mapData: Highcharts.geojson(createCustomGeoJSON(Highcharts.maps['custom/world'], el.mapID, el.text)),
            joinBy: ['hc-a2', 'code'],
            data: getSeriesData(el)
        };
        return s;
    }
}

function drawMap(hierarchy, containerID){
    let curLVL = hierarchy[0];
    Highcharts.mapChart( containerID, {
        lang: {
            drillUpText: 'Back to {series.parent}'
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
        colorAxis:{
            dataClasses:[{
                from: 7,
                to: 100,
                color: '#8bc34a',
                name: 'Promoter'
            },{
                from: 3,
                to: 7,
                color: '#ffc107',
                name: 'Passive'
            },{
                from: 0,
                to: 3,
                color: '#f44336',
                name: 'Detractor'
            }]
        },
        chart:{
          events: {
              drilldown: function(e){
                  let chart = this;
                  curLVL = curLVL.subcells.filter( el => el.text == e.point.series.name)[0];
                  if (curLVL.subcells){
                      curLVL.subcells.forEach( el => {
                          chart.addSingleSeriesAsDrilldown(e.point, composeSeries1(el));
                      });
                      chart.applyDrilldown();
                  } else {
                      chart.addSeriesAsDrilldown(e.point, composeSeries1(curLVL));
                  }
              },
              drillupall: function(e){
                  curLVL = curLVL.parent;
              }
          }
        },
        series: composeSeries(hierarchy[0],[{
            mapData: Highcharts.maps["custom/world"]
        }])
    });
}