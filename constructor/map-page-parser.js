/**
 * Created by IvanP on 30.12.2016.
 */
(function(console){

  console.save = function(data, filename){

    if(!data) {
      console.error('Console.save: No data')
      return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
      data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
      e    = document.createEvent('MouseEvents'),
      a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console);
( function parser(document){
  var maps=[];
  var mapSections = [].slice.call(document.querySelectorAll('.container>h4'));
  if(mapSections && mapSections.length>0){
    mapSections.forEach(function(head){
      var mapSection = {title: head.textContent.trim()};
      maps.push(mapSection);
      mapSection.maps=[];
      var ul = head.nextElementSibling;
      if(ul && ul.nodeName=="UL"){
        [].slice.call(ul.children).forEach(function(li){
          var map={};
          mapSection.maps.push(map);
          [].slice.call(li.children).forEach(function(link){
            if(link.nodeName!="SPAN"){
              map[link.className.toLowerCase()] = {href:link.href,title:link.textContent};
              li.removeChild(link);
            }
          });
          map.title = li.textContent.trim();
        })
      }
    })
  }
  console.save(maps,'maps.json');
})(document);
