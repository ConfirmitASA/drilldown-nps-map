## Map Page Parser

Map Page Parser is a utility function that helps strip off maps information from [Highcharts Maps site](http://code.highcharts.com/mapdata/) and download it as JSON file.
To do so, 
1. open [`map-page-parser.min.js`](https://raw.githubusercontent.com/ConfirmitASA/drilldown-nps-map/master/src/constructor/map-page-parser.min.js), 
2. copy its contents
3. open [Highcharts Maps site](http://code.highcharts.com/mapdata/) in Chrome and press `F12` on keyboard to open `Chrome Devtools > Console`
4. paste the code copied in step#2 into Console and press "Enter"

The `maps.json` will be immediately downloaded. Then you may place it into the `docs/drilldown-nps-map/[version]/constructor/` and `src/constructor/` folder replacing the previous version of `maps.json`, push the changes to GitHub  and commit docs again.
This way you'll update the constructor maps list.
