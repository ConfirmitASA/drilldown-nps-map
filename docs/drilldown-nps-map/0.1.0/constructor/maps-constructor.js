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
      document.querySelector('#btn-getIDs').addEventListener('click', function(e){
        MapsConstructor.copyIDsToClipboard(e, 'IDsStorage');
      });
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
            if(el.textContent.toLowerCase().indexOf(value.toLowerCase())>-1){
              parent.style.display="table-row";
            } else {
              parent.style.display="none";
            }
          })
        }
        if(target.nodeName=="UL"){
          [].slice.call(target.querySelectorAll("li")).forEach(el=>{
            if(el.textContent.toLowerCase().indexOf(value.toLowerCase())>-1){
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

  /**
   * Copies selected countries IDs
   * @param e - click event
   */
  static copyIDsToClipboard(e){
    let ids = [];
    document.querySelectorAll('#countriesList tbody tr').forEach(tr => {
      let cb = tr.querySelector("input[type='checkbox']");
      if(cb.checked){
        ids.push(cb.value);
      }
    });
    if(ids.length < 1)
      return;
    let t = document.querySelector('#IDsStorage');
    t.value = JSON.stringify(ids);
    t.style.display = "block";
    MapsConstructor.copyTextEventHandler(e, 'IDsStorage');
    t.style.display = "none";
  }

  displayMultiselect(multiselect){
    multiselect.style.display = 'block';
    multiselect.querySelector('#multiSelectCheckbox').checked = false;
    multiselect.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
    multiselect.querySelector('#multiSelectCheckbox').addEventListener('change', function () {
      if(this.checked){
        multiselect.querySelectorAll('button').forEach(btn => btn.style.display = 'inline-block');
        document.querySelectorAll('#countriesList tbody tr').forEach(tr => {
          tr.querySelector("input[type='checkbox']").style.display = 'table-cell';
        });
      } else {
        multiselect.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
        document.querySelectorAll('#countriesList tbody tr').forEach(tr => {
          tr.querySelector("input[type='checkbox']").style.display = 'none';
        });
      }
    });
  }

  processMap(e){
    let map = this.currentSection.maps[e.target.value];
    let oMap = this.fakeXHR(map.js.href);
    oMap.then(mapJSON=>{
      this.clearCountriesList();
      this.constructor.updateCodebox(this.constructor.getMapID(map.js.href));
      this.buildCountriesList(mapJSON);
      document.querySelector('#btn-deselect').onclick = function () {
        document.querySelectorAll('#countriesList tbody tr').forEach(tr => {
          tr.querySelector("input[type='checkbox']").checked = false;
        });
      };
      this.displayMultiselect(document.querySelector('#multiSelect'));
    });
  }

  /**
   * Shows tooltip when, when text is copied to clipboard
   * @param e
   * @param text
   */
  static showTooltip(e, text){
    let tooltip = document.createElement('div');
    tooltip.innerHTML = text;
    tooltip.id = 'tooltip';
    document.body.appendChild(tooltip);
    tooltip.style.left = e.pageX - 10 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
    tooltip.style.opacity = 1;
    setTimeout(function(){
      tooltip.style.opacity = 0;
      tooltip.remove();
    }, 500)

  }

  /**
   * Copies text to clipboard
   * @param event
   * @param id
   */
  static copyTextEventHandler(event, id){
    let range = document.createRange();
    let node;
    window.getSelection().removeAllRanges();
    if (id) {
      node = document.getElementById(id);
    }else{
      node = event.target;
    }
    range.selectNode(node);
    window.getSelection().addRange(range);
    try {
      let successful = document.execCommand('copy');
      let msg = successful ? 'successful' : 'unsuccessful';
      if (msg) {
        MapsConstructor.showTooltip(event, "Copied to clipboard!");
      } else {
        MapsConstructor.showTooltip(event, "Copy failed!");
      }
    } catch(err) {
      console.log(err);
    }
    window.getSelection().removeAllRanges();
  }

  static updateCodebox(mapID) {
    let codebox = document.querySelector('.codebox');
    codebox.innerHTML = `mapName: <span>${mapID}</span>`;
    codebox.querySelector('span').addEventListener('click', MapsConstructor.copyTextEventHandler);
  }

  buildCountriesList(map){
    let df = document.createDocumentFragment();
    map.features.forEach(feature=>{
      let p = feature.properties,
          row = MapsConstructor.createElement('tr');
      df.appendChild(row);
      let cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = p['hc-key'];
      cb.style.display = 'none';
      row.appendChild(MapsConstructor.createElement('td',p['name']));
      row.firstChild.insertBefore(cb,row.firstChild.firstChild);
      let key = MapsConstructor.createElement('td',p['hc-key'])
      row.appendChild(key);
      key.addEventListener('click', MapsConstructor.copyTextEventHandler);
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
