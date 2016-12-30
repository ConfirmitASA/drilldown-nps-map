/**
 * Created by IvanP on 30.12.2016.
 */
require('./styles.css');
import ReportalBase from "r-reportal-base";

class MapsConstructor{
  constructor(){
    return ReportalBase.promiseRequest("maps.json").then(cfg=>{
      this.config = JSON.parse(cfg);
      this.hm = this.constructor.stubHighcharts();
      this.mapsSelector = document.querySelector("#mapsSectionSelector");
      this.mapsList = document.querySelector("#mapsList");
      this.countriesList = document.querySelector("#countriesList");
      this.countriesFilter = document.querySelector("#countriesFilter");
      this.mapsFilter = document.querySelector("#mapsFilter");
      this.processMap = this.processMap.bind(this);

      this.createMapSwitcher();
      this.initFiltering();
    });
  }

  static stubHighcharts(){
    if(!window.Highcharts){
      window.Highcharts = {maps:{}};
    } else if(!window.Highcharts.maps){window.Highcharts.maps={}}
    return window.Highcharts.maps
  }

  /**
   * Sets up simple filtering matching all matches on keystroke and clear
   * */
  initFiltering(){
    let filters = [this.countriesFilter,this.mapsFilter];
    let targets = [this.countriesList, this.mapsList];
    filters.forEach((filter,index)=>{
      filter.addEventListener('input',e=>{
        let value = e.target.value;
        let target = targets[index];
        if(target.nodeName=="TABLE"){
          [].slice.call(target.querySelectorAll("tbody>tr>td:nth-child(1)")).forEach(el=>{
            let parent = el.parentNode;
            if(el.textContent.toLowerCase().indexOf(value)>-1){
              parent.style.display="table-row";
            } else {
              parent.style.display="none";
            }
          })
        }
        if(target.nodeName=="UL"){
          [].slice.call(target.querySelectorAll("li")).forEach(el=>{
            if(el.textContent.toLowerCase().indexOf(value)>-1){
              el.style.display="block";
            } else {
              el.style.display="none";
            }
          })
        }
      })
    })
  };

  /**
   * creates a dropdown that switches maps
   *
   */
  createMapSwitcher(){
    let select = document.querySelector("#mapsSectionSelector");
    this.config.forEach((section,index)=>{
      let option = document.createElement('option');
      option.value = index;
      option.textContent = section.title;
      this.mapsSelector.appendChild(option);
    });
    this.mapsSelector.addEventListener('change',e=>{
      this.loadMapsSection(select.value);
    });
    this.loadMapsSection(0);
  }

  /**
   * loads a map section
   * */
  loadMapsSection(sectionIndex){
    this.currentSection = this.config[sectionIndex];
    this.clearMapsList();
    this.currentSection.maps.forEach((map,i)=>{
      let li = MapsConstructor.createElement('li');
      li.appendChild(this.createRadio(i,map.title));
      li.appendChild(this.createLink(i,'demo'));
      this.mapsList.appendChild(li);
    })
  }


  createRadio(index,label){
    let radio = document.createElement('input');
    radio.type = "radio";
    radio.name = "map";
    radio.value = index;
    let l = this.constructor.createElement('label',label);
    l.insertBefore(radio,l.firstChild);
    radio.addEventListener('change',this.processMap);
    return l
  }

  createLink(index, property, target="_blank"){
    let prop = this.currentSection.maps[index][property],
        link = MapsConstructor.createElement('a',prop.title);
    link.href = prop.href;
    link.target = target;
    return link
  }

  processMap(e){
    let map = this.currentSection.maps[e.target.value];
    let oMap = this.fakeXHR(map.js.href);
    oMap.then(mapJSON=>{
      this.clearCountriesList();
      this.constructor.updateCodebox(this.constructor.getMapID(map.js.href));
      this.buildCountriesList(mapJSON)
    });
  }

  static updateCodebox(mapID) {
    document.querySelector('.codebox').innerHTML = `mapID: ${mapID}`;
  }

  buildCountriesList(map){
    let df = document.createDocumentFragment();

    map.features.forEach(feature=>{
      let p = feature.properties,
          row = MapsConstructor.createElement('tr');
      df.appendChild(row);
      row.appendChild(MapsConstructor.createElement('td',p['name']));
      row.appendChild(MapsConstructor.createElement('td',p['hc-key']));
      row.appendChild(MapsConstructor.createElement('td',p['subregion']));
      row.appendChild(MapsConstructor.createElement('td',p['region-wb']));
    });
    this.countriesList.querySelector('tbody').appendChild(df);
  }

  clearCountriesList(){
    this.countriesList.querySelector('tbody').innerHTML = '';
  }

  static createElement(tag,text){
    let el = document.createElement(tag);
    if(text){
      el.textContent = text;
    }
    return el
  }
  static getMapID(href){
    return href.split("mapdata/")[1].split('.')[0];
  }

  fakeXHR(url){
    let mapID = this.constructor.getMapID(url),
      hm=this.hm;
    return new Promise((resolve,reject)=>{
      if(!this.hm[mapID]){
        let script = document.createElement('script'),
            head = document.querySelector('head');
        script.addEventListener('load',getContents);
        function getContents(e){
          script.removeEventListener('load',getContents);
          head.removeChild(script);
          resolve(hm[mapID]);
        }
        script.src = url;
        head.appendChild(script);
      } else {
        resolve(hm[mapID])
      }
    });
  }

  clearMapsList(){
    if(this.mapsList.children.length>0){
      [].slice.call(this.mapsList.querySelectorAll('input[type=radio]')).forEach(cb=>cb.removeEventListener('change',this.processMap));
      this.mapsList.innerHTML='';

    }
  }
}
export default MapsConstructor

window.Reportal = window.Reportal || {};
ReportalBase.mixin(window.Reportal,{
  MapsConstructor
});
