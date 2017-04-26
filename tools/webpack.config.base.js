var packageJSON = require('../package.json');
var name = packageJSON["name"];

module.exports = {
  entry: {
    "drilldown-nps-map.bundle":"./src/main.js",
    "constructor.bundle": "./src/constructor/maps-constructor.js"
  },
  output: {
    path: "./dist",
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: [],
  },
  resolve: {
    extensions: [
      '',
      '.js',
    ],
  },
};
