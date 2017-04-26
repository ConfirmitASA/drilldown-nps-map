(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _DrilldownMap = __webpack_require__(13);
	
	var _DrilldownMap2 = _interopRequireDefault(_DrilldownMap);
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Reportal = window.Reportal || {};
	_rReportalBase2.default.mixin(window.Reportal, {
	  DrilldownMap: _DrilldownMap2.default,
	  ReportalBase: _rReportalBase2.default
	});
	
	exports.default = _DrilldownMap2.default;
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ReportalBase = function () {
	  function ReportalBase() {
	    _classCallCheck(this, ReportalBase);
	  }
	
	  _createClass(ReportalBase, null, [{
	    key: 'mixin',
	
	
	    /**
	     * Copies props from a source object to a target object.
	     *
	     * Note, this method uses a simple `for...in` strategy for enumerating
	     * properties.  To ensure only `ownProperties` are copied from source
	     * to target and that accessor implementations are copied, use `extend`.
	     *
	     * @method mixin
	     * @param {Object} target Target object to copy properties to.
	     * @param {Object} source Source object to copy properties from.
	     * @return {Object} Target object that was passed as first argument.
	     */
	    value: function mixin(target, source) {
	      for (var i in source) {
	        target[i] = source[i];
	      }
	      return target;
	    }
	  }, {
	    key: '_logger',
	    value: function _logger(level, args) {
	      // accept ['foo', 'bar'] and [['foo', 'bar']]
	      if (args.length === 1 && Array.isArray(args[0])) {
	        args = args[0];
	      }
	      // only accept logging functions
	      switch (level) {
	        case 'log':
	        case 'warn':
	        case 'error':
	          console[level].apply(console, args);
	          break;
	      }
	    }
	  }, {
	    key: '_log',
	    value: function _log() {
	      var args = Array.prototype.slice.call(arguments, 0);
	      this._logger('log', args);
	    }
	  }, {
	    key: '_warn',
	    value: function _warn() {
	      var args = Array.prototype.slice.call(arguments, 0);
	      this._logger('warn', args);
	    }
	  }, {
	    key: '_error',
	    value: function _error() {
	      var args = Array.prototype.slice.call(arguments, 0);
	      this._logger('error', args);
	    }
	
	    /**
	     * Creates a named event with `name`
	     * @param {String} name - name of the event
	     * @return {Event} Returns a created event
	     * */
	
	  }, {
	    key: 'newEvent',
	    value: function newEvent(name) {
	      var event = document.createEvent('Event');
	      event.initEvent(name, true, true);
	      return event;
	    }
	
	    /**
	     * Inspects if the current string might be converted to number and renders it as number. If string length is 0, returns `null`. If none applies returns the string as is.
	     * @param {String} str - value of the cell if not HTML contents
	     * @return {Number|null|String}
	     * */
	
	  }, {
	    key: 'isNumber',
	    value: function isNumber(str) {
	      if (!isNaN(parseFloat(str))) {
	        str = str.replace(/,/i, ''); // remove unnecessary comma as a delimiter for thousands from data.
	        return parseFloat(str);
	      } else if (str.length == 0) {
	        return null;
	      } else {
	        return str;
	      }
	    }
	
	    /**
	     * Creates an XHR wrapped in a Promise
	     * @param {!String} URL - url to send a `GET` request to
	     * @return {Promise} Returns a then-able promise with `XMLHttpRequest.responseText`
	     * */
	
	  }, {
	    key: 'promiseRequest',
	    value: function promiseRequest(URL) {
	      return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', URL, true);
	        xhr.onload = function (e) {
	          xhr.status == 200 ? resolve(xhr.responseText) : reject(Error(xhr.status + ': ' + xhr.statusText));
	        };
	        xhr.onerror = function (e) {
	          reject(e);
	        };
	        xhr.send();
	      });
	    }
	
	    /**
	     * Gets a variable listed in query string
	     * @param {!String} variable - variable name to get value for
	     * @param {String=} [query=window.location.search.substring(1)] - the query string to search variable for in
	     * @return {String} Returns value for the variable
	     * */
	
	  }, {
	    key: 'getQueryVariable',
	    value: function getQueryVariable(variable) {
	      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.search.substring(1);
	
	      var vars = query.split("&");
	      for (var i = 0; i < vars.length; i++) {
	        var pair = vars[i].split("=");
	        if (pair[0].toLowerCase() == variable.toLowerCase()) {
	          return pair[1];
	        }
	      }
	      return null;
	    }
	  }]);
	
	  return ReportalBase;
	}();
	
	exports.default = ReportalBase;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by IvanP on 21.09.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//import TableDataRowMeta from "./TableDataRowMeta";
	
	/**
	 * A base class for stripping data from HTML tables
	 * */
	var TableData = function () {
	  function TableData() {
	    _classCallCheck(this, TableData);
	  }
	
	  _createClass(TableData, null, [{
	    key: 'detectMultidimensional',
	
	    /**
	     * Detects if the dataset is multi-dimentional and sets classes on items: a rowspanning cell gets a `.blockCell` and the row containing it a `.firstInBlock`
	     * __Doesn't work with `Horizontal Percents` enabled!__
	     * @param {HTMLTableElement} source - source table
	     * @return {Boolean} Returns if the data in table is multi-dimentional
	     * */
	    value: function detectMultidimensional(source) {
	      var multidimensional = false;
	      var blocks = source.parentNode.querySelectorAll('table#' + source.id + '>tbody>tr>td:nth-child(1)[rowspan]');
	      if (blocks.length > 0) {
	        multidimensional = true;
	        [].slice.call(blocks).forEach(function (blockCell) {
	          blockCell.classList.add('blockCell');
	          blockCell.parentNode.classList.add('firstInBlock');
	        });
	      }
	      return multidimensional;
	    }
	
	    /**
	     * Extracts data from a given cell. Override in an inherited class if you need to add any metadata to it.
	     * @param {HTMLTableCellElement} cell - cell element to have data stripped off it
	     * @param {HTMLTableCellElement} rowIndex - index of the row it's in
	     * @param {HTMLTableCellElement} columnIndex - index of the column it's in
	     * @returns {?String|?Number} Returns a `String`, a `Number` or a `null` (if data is absent in the cell or its text content boils down to an empty string - i.e. there are no characters in the cell, only HTML tags)
	     * */
	
	  }, {
	    key: 'prepareDataCell',
	    value: function prepareDataCell(cell, rowIndex, columnIndex) {
	      return _rReportalBase2.default.isNumber(cell.textContent.trim());
	      /*return {
	          cell,
	          data: ReportalBase.isNumber(cell.textContent.trim()),
	          rowIndex,
	          columnIndex
	        }*/
	    }
	
	    /**
	     * A universal data-extraction function. It strips data from a table's body. Data can be stripped by rows (horizontally) or by columns (vertically) which is controlled by `direction`. It accounts for a spanning block cell and may exclude it.
	     * @param {Object} options - options to configure the way data is stripped off the table
	     * @param {HTMLTableElement} options.source - source table that will be an input for data stripping
	     * @param {String=} options.direction='row' - direction in which data stripping will occur: `row` strips across rows and presents an array where each array item is an array of cell values. `column` strips values verticaly in a column, the resulting array will contain arrays (per column) with values resembling normalized data for cells in the column
	     * @param {Boolean=} [options.excludeBlock=true] - if table contains block cells that rowspan across several rows, we might need to exclude those from actual data
	     * @param {Array|Number} [options.excludeColumns] - if table contains columns that are not to be in data, then pass a single index or an array of cell indices (0-based). You need to count columns not by headers but by the cells in rows.
	     * @param {Array|Number} [options.excludeRows] - if table contains rows that are not to be in data, then pass a single index or an array of row indices (0-based). You need to count only rows that contain data, not the table-header rows.
	     * @param {Boolean=} options.multidimensional=false - whether the table has aggregating cells that aggregate rowheaders. Result of {@link TableData#detectMultidimensional} may be passed here to automatically calculate if it has aggregating cells.
	     * @returns {Array} returns data array.
	     * */
	
	  }, {
	    key: 'getData',
	    value: function getData(options) {
	      var _this = this;
	
	      var source = options.source,
	          _options$excludeBlock = options.excludeBlock,
	          excludeBlock = _options$excludeBlock === undefined ? true : _options$excludeBlock,
	          excludeColumns = options.excludeColumns,
	          excludeRows = options.excludeRows,
	          _options$direction = options.direction,
	          direction = _options$direction === undefined ? 'row' : _options$direction,
	          _options$multidimensi = options.multidimensional,
	          multidimensional = _options$multidimensi === undefined ? false : _options$multidimensi;
	
	      var data = [];
	      if (source && source.tagName == 'TABLE') {
	        var rows = [].slice.call(source.parentNode.querySelectorAll('table#' + source.id + '>tbody>tr'));
	        if (rows.length > 0) {
	          var tempArray = [];
	          // account for a negative row number (`-1`) meaning last row
	          if ((typeof excludeRows === 'undefined' ? 'undefined' : _typeof(excludeRows)) != undefined) {
	            if (typeof excludeRows == 'number') {
	              // for non-block rows in multidimensional
	              if (excludeRows < 0) {
	                // account for a negative column number (e.g.`-1`) meaning last column
	                excludeRows = rows.length + excludeRows;
	              }
	              rows.splice(excludeRows, 1);
	            }
	            if (Array.isArray(excludeRows)) {
	              excludeRows.sort(function (a, b) {
	                return a > b ? 1 : -1;
	              }).reverse(); //sort to splice from the end of the array
	              excludeRows.forEach(function (i) {
	                if (i >= 0) {
	                  rows.splice(i, 1);
	                } else {
	                  rows.splice(rows.length + i, 1);
	                }
	              });
	            }
	          }
	          rows.forEach(function (row, rowIndex) {
	            if (multidimensional) {
	              // we need to check if the `tempArray` is not empty and push it to the `data` array, because we've encountered a new block, so the old block has to be pushed to data. Then we need to create a new block array and push there
	              if (row.classList.contains('firstInBlock')) {
	                if (Array.isArray(tempArray) && tempArray.length > 0) {
	                  data.push(tempArray);
	                }
	                tempArray = [];
	              }
	            }
	
	            if (direction == 'row' && !Array.isArray(tempArray[tempArray.length])) {
	              // if a row in an array doesn't exist create it
	              tempArray[tempArray.length] = [];
	            }
	
	            // calculate which cells to exclude
	            var cells = [].slice.call(row.children);
	            var temp_excludeColumns = excludeColumns;
	            if ((typeof temp_excludeColumns === 'undefined' ? 'undefined' : _typeof(temp_excludeColumns)) != undefined) {
	              if (typeof temp_excludeColumns == 'number') {
	                // for non-block rows in multidimensional
	                if (multidimensional && !row.classList.contains('firstInBlock') && !temp_excludeColumns < 0) {
	                  temp_excludeColumns = temp_excludeColumns + 1;
	                }
	                if (temp_excludeColumns < 0) {
	                  // account for a negative column number (e.g.`-1`) meaning last column
	                  temp_excludeColumns = cells.length + temp_excludeColumns;
	                }
	                cells.splice(temp_excludeColumns, 1);
	              }
	              if (Array.isArray(temp_excludeColumns)) {
	                temp_excludeColumns.sort(function (a, b) {
	                  return a > b ? 1 : -1;
	                }).reverse();
	                temp_excludeColumns.forEach(function (i) {
	                  if (i >= 0) {
	                    cells.splice(multidimensional && !row.classList.contains('firstInBlock') ? i + 1 : i, 1);
	                  } else {
	                    cells.splice(cells.length + i, 1);
	                  }
	                });
	              }
	            }
	
	            cells.forEach(function (cell, index) {
	
	              // we want to run this every row because number of cells in each row may differ and we want to exclude the last one
	              if (typeof direction == 'string' && direction == 'row') {
	                //if we strip data horizontally by row
	                if (!(multidimensional && excludeBlock && cell.rowSpan > 1)) {
	                  // if it's a block cell we'd exclude it from data
	                  tempArray[tempArray.length - 1].push(_this.prepareDataCell(cell, rowIndex, index));
	                }
	              } else if (typeof direction == 'string' && direction == 'column') {
	                //if we strip data vertically by column
	                var realIndex = index;
	                if (!(multidimensional && excludeBlock && cell.rowSpan > 1)) {
	                  //exclude block cell
	                  realIndex += !row.classList.contains('firstInBlock') ? 0 : -1; // offset cell that follows block cell one position back
	                  if (!Array.isArray(tempArray[realIndex])) {
	                    //create column array for current column if not available
	                    tempArray[realIndex] = [];
	                  }
	                  tempArray[realIndex].push(_this.prepareDataCell(cell, rowIndex, realIndex));
	                }
	              } else {
	                throw new TypeError('direction has tobe a String==`row | column`, not a ${direction}');
	              }
	            });
	          });
	          //we need to push the last block Array because there'll be no `.firstInBlock` anymore to do that
	          if (multidimensional && Array.isArray(tempArray) && tempArray.length > 0) {
	            data.push(tempArray);
	          } else {
	            data = tempArray;
	          }
	        } else {
	          throw new Error('table#' + source.id + '\'s body must contain rows');
	        }
	      } else {
	        throw new TypeError('source must be defined and be a table');
	      }
	      return data;
	    }
	  }]);
	
	  return TableData;
	}();
	
	exports.default = TableData;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by IvanP on 17.08.2016.
	 */
	/**
	 * @property {HTMLTableRowElement} row - reference to the `<tr>` element
	 * @property {?String} id - internal Reportal id for the rowheader in the row
	 * @property {!HTMLTableCellElement} nameCell - reference to the `<td>` element that contains the rowheader label/name
	 * @property {String} [name=nameCell.textContent] - label of the rowheader.
	 * @property {?Object} [block=null] - the block the row belongs to
	 * @property {Boolean} firstInBlock - this `row` is first in the `block`, which means it contains the first cell as a block cell
	 * */
	var AggregatedTableRowMeta =
	/**
	 * Builds a prototype for each row of an Aggregated Table
	 * @param {HTMLTableRowElement} row - reference to the `<tr>` element
	 * @param {?String} id - internal Reportal id for the rowheader in the row
	 * @param {!HTMLTableCellElement} nameCell - reference to the `<td>` element that contains the rowheader label/name
	 * @param {String=} [name=nameCell.textContent] - label of the rowheader.
	 * @param {?Object} [block=null] - the block the row belongs to
	 * */
	function AggregatedTableRowMeta() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      row = _ref.row,
	      _ref$id = _ref.id,
	      id = _ref$id === undefined ? null : _ref$id,
	      nameCell = _ref.nameCell,
	      name = _ref.name,
	      _ref$block = _ref.block,
	      block = _ref$block === undefined ? null : _ref$block;
	
	  _classCallCheck(this, AggregatedTableRowMeta);
	
	  /*** @property {HTMLTableRowElement} row - reference to the `<tr>` element*/
	  this.row = row;
	  this.id = id;
	  this.nameCell = nameCell;
	  this.name = name || nameCell.textContent.trim();
	  this.block = block;
	  this.firstInBlock = block != null && this.row.rowIndex === this.block.cell.parentNode.rowIndex;
	}
	/*get firstInBlock(){
	  return this._firstInBlock;
	}
	set firstInBlock(val){
	  this._firstInBlock = val;
	  val?this.row.classList.add('firstInBlock'):this.row.classList.remove('firstInBlock');
	}*/
	;
	
	exports.default = AggregatedTableRowMeta;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tableData = __webpack_require__(2);
	
	var _tableData2 = _interopRequireDefault(_tableData);
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	var _rTableColumns = __webpack_require__(10);
	
	var _rTableColumns2 = _interopRequireDefault(_rTableColumns);
	
	var _sortTable = __webpack_require__(8);
	
	var _sortTable2 = _interopRequireDefault(_sortTable);
	
	var _tableFloatingHeader = __webpack_require__(12);
	
	var _tableFloatingHeader2 = _interopRequireDefault(_tableFloatingHeader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by IvanP on 27.09.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var styles = __webpack_require__(16);
	var aggregatedTableCSS = __webpack_require__(15);
	
	/**
	 * A base class for aggregated tables. Multidimensional property of data is automatically calculated, thus removed from params.
	 * @extends TableData
	 * */
	
	var AggregatedTable = function (_TableData) {
	  _inherits(AggregatedTable, _TableData);
	
	  /*
	   * @param {Object} options - options to configure the way data is stripped off the table
	   * @param {HTMLTableElement} options.source - source table that will be an input for data stripping
	   * @param {HTMLTableElement} [options.refSource] - a reference to a floating header, if any
	   * @param {Number} [options.rowheaderColumnIndex=0] - 0-based index of the column that we need to check against to see if it's a multidimentional table
	   * @param {Number|Object=} [options.defaultHeaderRow=-1] - index of the row in `thead` (incremented from 0) that will have sorting enabled for columns. If `-1` then last row.
	   * @param {String=} options.dataStripDirection='row' - direction in which data stripping will occur: `row` strips across rows and presents an array where each array item is an array of cell values. `column` strips values verticaly in a column, the resulting array will contain arrays (per column) with values resembling normalized data for cells in the column
	   * @param {Boolean=} [options.excludeBlock=true] - if table contains block cells that rowspan across several rows, we might need to exclude those from actual data
	   * @param {Array|Number} [options.excludeColumns] - if table contains columns that are not to be in data, then pass a single index or an array of cell indices (0-based). You need to count columns not by headers but by the cells in rows.
	   * @param {Array|Number} [options.excludeRows] - if table contains rows that are not to be in data, then pass a single index or an array of row indices (0-based). You need to count only rows that contain data, not the table-header rows.
	   * @param {SortTable} options.sorting - sorting options, see {@link SortTable}. If you want to leave all options default but enable sorting, pass an empty object(`.., sorting:{}`), or sorting won't be applied.
	   * @param {SortTable} options.floatingHeader - floating header, see {@link SortTable}. If you want to leave all options default but enable sorting, pass an empty object(`.., sorting:{}`), or sorting won't be applied.
	   * */
	  function AggregatedTable(options) {
	    _classCallCheck(this, AggregatedTable);
	
	    var source = options.source,
	        rowheaderColumnIndex = options.rowheaderColumnIndex,
	        defaultHeaderRow = options.defaultHeaderRow,
	        dataStripDirection = options.dataStripDirection,
	        excludeBlock = options.excludeBlock,
	        excludeColumns = options.excludeColumns,
	        excludeRows = options.excludeRows,
	        sorting = options.sorting,
	        floatingHeader = options.floatingHeader;
	
	    /**
	     *  The source table
	     *  @type {HTMLTableElement}
	     *  @memberOf AggregatedTable
	     *  */
	    var _this = _possibleConstructorReturn(this, (AggregatedTable.__proto__ || Object.getPrototypeOf(AggregatedTable)).call(this));
	
	    _this.source = source;
	    var refSource = void 0;
	    if (floatingHeader && (typeof floatingHeader === "undefined" ? "undefined" : _typeof(floatingHeader)) == 'object') {
	      _this.floatingHeader = new _tableFloatingHeader2.default(source);
	      /**
	       *  The floating header
	       *  @type {HTMLTableElement}
	       *  @memberOf AggregatedTable
	       *  */
	      _this.refSource = refSource = _this.floatingHeader.header;
	    }
	
	    /**
	     *  Whether data is monodimensional or multidimensional
	     *  @type {Boolean}
	     *  @memberOf AggregatedTable
	     *  */
	
	    _this.multidimensional = _this.constructor.detectMultidimensional(source);
	
	    /**
	     *  data Array
	     *  @type {Array.<{cell:HTMLTableCellElement, data:?String|?Number, columnIndex:Number}>}
	     *  @memberOf AggregatedTable
	     *  */
	    _this.data = _this.constructor.getData({ source: source, refSource: refSource, defaultHeaderRow: defaultHeaderRow, excludeBlock: excludeBlock, excludeColumns: excludeColumns, excludeRows: excludeRows, direction: dataStripDirection, multidimensional: _this.multidimensional });
	
	    if (sorting && (typeof sorting === "undefined" ? "undefined" : _typeof(sorting)) == 'object') {
	      var reorderFunction = function reorderFunction(e) {
	        return _this.constructor.reorderRows(_this.data, _this.source, _this.multidimensional);
	      };
	      [source, refSource].forEach(function (target) {
	        if (target) {
	          target.addEventListener('reportal-table-sort', reorderFunction);
	        }
	      });
	
	      sorting.source = source;
	      sorting.refSource = refSource;
	      sorting.defaultHeaderRow = defaultHeaderRow;
	      sorting.data = _this.data;
	      sorting.multidimensional = _this.multidimensional;
	
	      /**
	       *  sorting object. See {@link SortTable}
	       *  @type {SortTable}
	       *  @memberOf AggregatedTable
	       *  */
	      _this.sorting = new _sortTable2.default(sorting);
	
	      // add listener to do reordering on sorting
	    }
	
	    /**
	     * table columns array
	     * @type {Array.<{index:Number, title:String, colSpan:Number, cell: HTMLTableCellElement, ?refCell:HTMLTableCellElement}>}
	     * @memberOf AggregatedTable
	     * */
	    _this.columns = _this.sorting && _this.sorting.columns ? _this.sorting.columns : new _rTableColumns2.default({ source: source, refSource: refSource, defaultHeaderRow: defaultHeaderRow });
	    return _this;
	  }
	
	  /**
	   * Extracts data from a given cell. Override in an inherited class if you need to add any metadata to it.
	   * @param {HTMLTableCellElement} cell - cell element to have data stripped off it
	   * @param {HTMLTableCellElement} rowIndex - index of the row it's in
	   * @param {HTMLTableCellElement} columnIndex - index of the column it's in
	   * @returns {{cell:HTMLTableCellElement, ?data:String|Number, columnIndex:Number}} Returns an object `{cell:HTMLTableCellElement, data:?String|?Number, columnIndex:Number}` (if data is absent in the cell or its text content boils down to an empty string - i.e. there are no characters in the cell, only HTML tags) it returns null in `data`
	   * @override
	   * */
	
	
	  _createClass(AggregatedTable, null, [{
	    key: "prepareDataCell",
	    value: function prepareDataCell(cell, rowIndex, columnIndex) {
	      return {
	        cell: cell,
	        data: _rReportalBase2.default.isNumber(cell.textContent.trim()),
	        columnIndex: columnIndex,
	        rowIndex: rowIndex
	      };
	    }
	
	    /**
	     * This function takes care of repositioning rows in the table to match the `data` array in the way it was sorted and if the data is separated into blocks, then move the block piece to the first row in each data block.
	     * @param {Array} data - full sorted dataset. Instance of {@link TableData#getData}
	     * @param {HTMLTableElement} source - source table
	     * @param {Boolean} multidimensional
	     * */
	
	  }, {
	    key: "reorderRows",
	    value: function reorderRows(data, source, multidimensional) {
	      var fragment = document.createDocumentFragment();
	      AggregatedTable.dimensionalDataIterator(data, multidimensional, function (dataDimension) {
	        if (multidimensional) {
	          AggregatedTable.repositionBlockCell(dataDimension);
	        } // if multidimensional reposition aggregating block cell to the topmost row in sorted array
	        dataDimension.forEach(function (item) {
	          fragment.appendChild(item[0].cell.parentNode);
	        }); // add row to fragment in the array order, this doesn't account for column stripped data yet
	      });
	      source.querySelector('tbody').appendChild(fragment);
	    }
	
	    /*
	     * Repositions the rowspanning block cell from the initial row to the new sorted row
	     * @param {Array} items - dimension of data
	     * */
	
	  }, {
	    key: "repositionBlockCell",
	    value: function repositionBlockCell(items) {
	      var blockRowItem = items.filter(function (item) {
	        return item[0].cell.parentNode.classList.contains('firstInBlock');
	      })[0];
	      var blockRow = blockRowItem[0].cell.parentNode;
	      if (items.indexOf(blockRowItem) != 0) {
	        // if block row isn't first in dimension
	        var newFirstRow = items[0][0].cell.parentNode;
	        newFirstRow.insertBefore(blockRow.querySelector('.blockCell'), newFirstRow.firstElementChild); // move block cell
	        newFirstRow.classList.add('firstInBlock');
	        blockRow.classList.remove('firstInBlock');
	      }
	    }
	
	    /**
	     * allows to perform action on data based on its multidimensionality
	     * @param {Array} data - full dataset. Instance of {@link TableData#getData}
	     * @param {Boolean} multidimensional
	     * @param {!Function} callback - a function to be executed on a dimension of data. Callback is called with two attributes: `dimension` - the current iteration of data and `index` (optional) if it's multidimensional
	     * */
	
	  }, {
	    key: "dimensionalDataIterator",
	    value: function dimensionalDataIterator(data, multidimensional, callback) {
	      if (!callback || typeof callback != 'function') {
	        throw new TypeError('`callback` must be passed and be a function');
	      }
	      if (!multidimensional) {
	        return callback(data);
	      } else {
	        // if array has nested array blocks
	        data.forEach(function (dimension, index) {
	          callback(dimension, index);
	        });
	      }
	    }
	  }]);
	
	  return AggregatedTable;
	}(_tableData2.default);
	
	exports.default = AggregatedTable;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _tableData = __webpack_require__(2);
	
	var _tableData2 = _interopRequireDefault(_tableData);
	
	var _aggregatedTable = __webpack_require__(4);
	
	var _aggregatedTable2 = _interopRequireDefault(_aggregatedTable);
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	var _aggregatedTableRowMeta = __webpack_require__(3);
	
	var _aggregatedTableRowMeta2 = _interopRequireDefault(_aggregatedTableRowMeta);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by IvanP on 07.09.2016.
	 */
	
	window.Reportal = window.Reportal || {};
	_rReportalBase2.default.mixin(window.Reportal, {
	  TableData: _tableData2.default,
	  AggregatedTable: _aggregatedTable2.default,
	  AggregatedTableRowMeta: _aggregatedTableRowMeta2.default
	});
	
	exports.default = _aggregatedTable2.default;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by IvanP on 15.12.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A class that provides utility static methods to load children of a level of hiererachy and a table per a given id
	 * */
	var AsyncHierarchyTable = function () {
	  function AsyncHierarchyTable() {
	    _classCallCheck(this, AsyncHierarchyTable);
	  }
	
	  _createClass(AsyncHierarchyTable, null, [{
	    key: 'fetchChildHierarchy',
	
	    /**
	     * Queries if each row might contain child rows by quering hierarchy for next level
	     * @param {!String} id - rowheader id for current row
	     * @param {!Number} hierarchyID - id of Hierarchy in Table Designer
	     * @param {!String} hierarchyControlID - id of the Reportal Hierarchy Component instance on the page
	     * @param {!String} pageStateID - Reportal state id
	     * @param {Number=} languageCode=9 - Language code (according to Confirmit table of language codes) of the language the hierarchy is going to be streamed in at the page load
	     * @returns {Array} array of child nodes of the `id` in hierarchy
	     * */
	    value: function fetchChildHierarchy(id, hierarchyID, hierarchyControlID, pageStateID) {
	      var languageCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 9;
	
	      var path = [location.origin, 'reportal', 'Hierarchy', _rReportalBase2.default.getQueryVariable('ReportId'), hierarchyID, languageCode, 'GetChildNodes'];
	
	      var query = ['nodeId=' + id, 'info=' + AsyncHierarchyTable.encode({
	        IsPreview: _rReportalBase2.default.getQueryVariable('Preview') === 'true',
	        HierarchyControlId: hierarchyControlID
	      }), 'isRepBase=false', 'parameter=', 'PageStateId=' + pageStateID];
	
	      var hierarchyItemChildren = _rReportalBase2.default.promiseRequest([path.join('/'), '?', query.join('&')].join(''));
	      return hierarchyItemChildren.then(function (response) {
	        return Promise.resolve(JSON.parse(response));
	      });
	    }
	
	    /**
	     * Gets row nodes that are child to the parent row#`id`
	     * @param {!String} id - rowheader id for current row
	     * @param {?String} parentID - rowheader id for parent row
	     * @param {!String} tableID - Reportal Aggregated Table Component id
	     * @param {!String} pageStateID - Reportal state id
	     * @return {Promise} Returns a thenable promise which result is an `HTMLTableElement` with rows that are children to the row#`id`
	     * */
	
	  }, {
	    key: 'fetchChildTable',
	    value: function fetchChildTable(id, parentID, tableID, pageStateID) {
	      parentID = parentID != null ? parentID : id;
	      var path = [location.origin, 'reportal', 'Report', _rReportalBase2.default.getQueryVariable('ReportId'), 'Component', tableID];
	      var query = ['PageId=' + _rReportalBase2.default.getQueryVariable('PageId'), 'Preview=' + _rReportalBase2.default.getQueryVariable('Preview'), 'PageStateId=' + pageStateID, 'pageFilters=' + AsyncHierarchyTable.encode({}), 'customFilters=' + AsyncHierarchyTable.encode({}), 'persNodes=' + AsyncHierarchyTable.encode([{ NodeId: id, Text: null }]), // child node id
	      'origNodes=' + AsyncHierarchyTable.encode([{ NodeId: parentID, Text: null }]) // parent node id
	      ];
	      var tableResult = _rReportalBase2.default.promiseRequest([path.join('/'), '?', query.join('&')].join(''));
	      return tableResult.then(function (response) {
	        var host = document.createElement('span');
	        host.innerHTML = response;
	        return Promise.resolve(host.querySelector('table'));
	      });
	    }
	
	    /**
	     * Strips rows from the table received
	     * @param {HTMLTableElement} table - Aggregated table element
	     * @param {Array} excludedRows - rows excluded from insertion
	     * @return {Array} Returns an array of rows {HTMLTableRowElement}
	     * */
	
	  }, {
	    key: 'stripRowsFromResponseTable',
	    value: function stripRowsFromResponseTable(table, excludedRows) {
	      var rows = [].slice.call(table.querySelectorAll('tbody>tr'));
	      if (excludedRows && excludedRows.length > 0) {
	        excludedRows.reverse().forEach(function (index) {
	          rows.splice(index, 1);
	        });
	      }
	      return rows;
	    }
	
	    /**
	     * Does `JSON.stringify` and `encodeURIComponent` of anything passed to be added to the query string
	     * @param {String|Object|Array} toEncode - piece to be URLencoded
	     * @returns {String} Returns an encoded string
	     * */
	
	  }, {
	    key: 'encode',
	    value: function encode(toEncode) {
	      return encodeURIComponent(JSON.stringify(toEncode));
	    }
	  }]);
	
	  return AsyncHierarchyTable;
	}();
	
	exports.default = AsyncHierarchyTable;
	
	
	window.Reportal = window.Reportal || {};
	_rReportalBase2.default.mixin(window.Reportal, {
	  AsyncHierarchyTable: AsyncHierarchyTable
	});
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SortOrder = function () {
	  /**
	   * Creates a `sortOrder` array
	   * @param {Object} options - configuration options
	   * @param {Object} options.columns - an array of columns from {@link TableColumns}
	   * @param {Function} options.sortCallback - function that performs sorting based on the `sortOrder`
	   * @param {Object} options.sortCallbackScope - scope in which sort callback needs to be executed
	   * @param {Object} [options.defaultSorting] - an array of objects that specify default sorting
	   * @param {Number} options.defaultSorting.column - column index
	   * @param {String} options.defaultSorting.direction - sort direction (`asc`|`desc`)
	   * @return {Array}
	   * */
	  function SortOrder(options) {
	    var _this = this;
	
	    _classCallCheck(this, SortOrder);
	
	    var columns = options.columns,
	        sortCallback = options.sortCallback,
	        _options$defaultSorti = options.defaultSorting,
	        defaultSorting = _options$defaultSorti === undefined ? [] : _options$defaultSorti,
	        _options$sortCallback = options.sortCallbackScope,
	        sortCallbackScope = _options$sortCallback === undefined ? this : _options$sortCallback;
	
	
	    this.sortOrder = [];
	    if ((typeof columns === 'undefined' ? 'undefined' : _typeof(columns)) != undefined && columns != null) {
	      this.columns = columns;
	    } else {
	      throw new TypeError('SortOrder: columns must be specified');
	    }
	    this.sort = function () {
	      if (sortCallback && typeof sortCallback === 'function') {
	        sortCallback.call(sortCallbackScope, _this);
	      }
	    };
	    if (defaultSorting.length > 0) {
	      defaultSorting.forEach(function (item) {
	        return _this.add(item);
	      });
	      this.sort();
	    }
	  }
	
	  /**
	   * Returns an array containing a `cell` from the table and a reference cell (`refCell`) from the floating header if any
	   * @param {!Number} columnIndex - index of the column from the array of columns from {@link TableColumns}
	   * @return {{cell:HTMLTableCellElement, refCell:HTMLTableCellElement}}
	   * */
	
	
	  _createClass(SortOrder, [{
	    key: 'getCell',
	    value: function getCell(columnIndex) {
	      if (typeof columnIndex != 'undefined' && columnIndex != null) {
	        var cells = [];
	        if (this.columns[columnIndex].cell) {
	          cells.push(this.columns[columnIndex].cell);
	        }
	        if (this.columns[columnIndex].refCell) {
	          cells.push(this.columns[columnIndex].refCell);
	        }
	        return cells;
	      } else {
	        throw new TypeError('columnIndex parameter should not be null');
	      }
	    }
	
	    /**
	     * Adds another column to be sorted
	     * @param {!Object} obj - object describing sorting
	     * @param {Number} obj.column - column index
	     * @param {String} obj.direction - sort direction (`asc`|`desc`)
	     * */
	
	  }, {
	    key: 'add',
	    value: function add(obj) {
	      this.getCell(obj.column).forEach(function (cell) {
	        //if(!cell.classList.contains('sorted')){ // this column is not sorted, there might be others that are.
	        ['sorted', obj.direction].forEach(function (className) {
	          return cell.classList.add(className);
	        });
	        //} else { //swaps sorting from asc to desc
	        //  ['asc','desc'].forEach(className=>cell.classList.toggle(className));
	        //}
	      });
	      this.sortOrder.push(obj);
	    }
	
	    /**
	     * Removes a column from `sortOrder`
	     * @param {Number} column - column index as reference to the item to be removed.
	     * @param {Number} index - index of item in `sortOrder` array to be removed
	     * */
	
	  }, {
	    key: 'remove',
	    value: function remove(column, index) {
	      var _this2 = this;
	
	      ['sorted', 'asc', 'desc'].forEach(function (className) {
	        _this2.getCell(column).forEach(function (cell) {
	          return cell.classList.remove(className);
	        });
	      });
	      this.sortOrder.splice(index, 1);
	    }
	  }, {
	    key: 'replace',
	
	
	    /**
	     * Replaces all items in `sortOrder`
	     * @param {!Object} obj - object describing sorting
	     * @param {Number} obj.column - column index
	     * @param {String} obj.direction - sort direction (`asc`|`desc`)
	     * */
	    value: function replace(obj) {
	      var _this3 = this;
	
	      if (this.sortOrder.length > 0) {
	        this.sortOrder.forEach(function (item, index) {
	          _this3.remove(item.column, index);
	        });
	      }
	      this.add(obj);
	      this.sort();
	    }
	  }]);
	
	  return SortOrder;
	}();
	
	exports.default = SortOrder;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	var _tableColumns = __webpack_require__(9);
	
	var _tableColumns2 = _interopRequireDefault(_tableColumns);
	
	var _sortOrder = __webpack_require__(7);
	
	var _sortOrder2 = _interopRequireDefault(_sortOrder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Event reporting that a table has been sorted
	 * @event SortTable~reportal-table-sort
	 */
	
	/**
	 * Makes a table sortable, gives API for sorting. It sorts `data` array, but doesn't move rows in the `source` table, because of differences in implementation.
	 *
	 * > Note: It's important that every Array item that is going to be sortable was either a `String`, a `Number`, a `null`, or an `Object` that contained `data` property (which was of the previously named types)
	 *
	 * @param {Object} options - options passed to configure the Sorting
	 * @param {HTMLTableElement} options.source - source table sorting will be applied to
	 * @param {HTMLTableElement} [options.refSource] - the floating header if any, will reflect and trigger sorting on header when scrolled.
	 * @param {Number} [options.defaultHeaderRow=-1] - index of the row in `thead` (incremented from 0) that will have sorting enabled for columns. If `-1` then last row.
	 * @param {Array} [options.included] - Array of column indices (incremented from 0) that will have sorting enabled. If not specified, all columns will be sortable. Optionally `excluded` can be specified instead as a shorthand to pass only indices of columns to be excluded from sorting, assumning that others will be made sortable. It's important to count the column index in the defaultHeaderRow
	 * @param {Array} [options.excluded] - Array of column indices (incremented from 0) that will be excluded from sorting. Can be used as a shorthand instead of `included`.
	 * @param {Object} [options.defaultSorting] - an array of objects that specify default sorting
	 * @param {Number} options.defaultSorting.column - column index
	 * @param {String} options.defaultSorting.direction - sort direction (`asc`|`desc`)
	 * @param {Array} options.data - data with information for rows to be sorted
	 * @param {Boolean} [options.multidimensional=false] - if `data` is single-dimensional (contains rows with data to be sorted as immediate array items: `data [rowItem...]`), then it is `false`. If it has blocks of data as items (each block containing an array of rows to be sorted: data [block [rowItem...]...]), then set it to `true`. Currently it supports only a two-level aggregation max (data->block->rowItem).
	 * @prop {HTMLTableElement} source - source table
	 * @prop {Array} data - data array to be sorted
	 * @prop {Boolean} multidimensional - if `data` is mono-dimensional (contains rows with data to be sorted as immediate array items: `data [rowItem...]`), then it is `false`. If it has blocks of data as items (each block containing an array of rows to be sorted: data [block [rowItem...]...]), then set it to `true`. Currently it supports only a two-level aggregation max (data->block->rowItem).
	 * @prop {SortOrder} sortOrder - instance of {@link SortOrder}
	 * @prop {TableColumns} columns - instance of {@link TableColumns} with a modified prototype (added `sortable:true` and `.sortable` to sortable columns)
	 * @class SortTable
	 * */
	var SortTable = function () {
	  /**
	   *
	   *
	   *  */
	
	  function SortTable(options) {
	    var _ref,
	        _ref$sortOrder,
	        _this = this;
	
	    _classCallCheck(this, SortTable);
	
	    var source = options.source,
	        refSource = options.refSource,
	        _options$defaultHeade = options.defaultHeaderRow,
	        defaultHeaderRow = _options$defaultHeade === undefined ? -1 : _options$defaultHeade,
	        included = options.included,
	        excluded = options.excluded,
	        _options$defaultSorti = options.defaultSorting,
	        defaultSorting = _options$defaultSorti === undefined ? [] : _options$defaultSorti,
	        _options$data = options.data,
	        data = _options$data === undefined ? [] : _options$data,
	        _options$multidimensi = options.multidimensional,
	        multidimensional = _options$multidimensi === undefined ? false : _options$multidimensi;
	
	    this._sortEvent = _rReportalBase2.default.newEvent('reportal-table-sort');
	
	    if (source) {
	      this.source = source;
	    } else {
	      throw new Error('`source` table is not specified for SortTable');
	    }
	    this.data = data;
	    this.multidimensional = multidimensional;
	
	    //let tableColumns= new TableColumns({source, refSource, defaultHeaderRow});
	    var sortableColumns = SortTable.defineSortableColumns(new _tableColumns2.default({ source: source, refSource: refSource, defaultHeaderRow: defaultHeaderRow }), included, excluded);
	    this.columns = sortableColumns;
	    // setup sort order and do initial default sorting
	    this.sortOrder = (_ref = new _sortOrder2.default({ columns: sortableColumns, sortCallback: this.sort, sortCallbackScope: this, defaultSorting: defaultSorting }), _ref$sortOrder = _toArray(_ref.sortOrder), _ref);
	    [source, refSource].forEach(function (src) {
	      if (src) {
	        SortTable.listenForSort(_tableColumns2.default.getHeader(src), sortableColumns, _this.sortOrder);
	      }
	    }); // set up listeners for headers
	  }
	
	  /**
	   * Checks the table columns array against the `included`/`excluded` columns arrays and adds a `sortable:true` property and a `.sortable` class to the sortable ones
	   * @param {TableColumns} columns - an instance of {@link TableColumns}
	   * @param {Array} [included] - array of included columns indices
	   * @param {Array} [excluded] - array of excluded columns indices
	   * */
	
	
	  _createClass(SortTable, [{
	    key: "sort",
	
	
	    /**
	     * Performs channeling of sorting based on whether `this.data` is `multidimensional`
	     * @param {SortOrder} sortOrder - instance of {@link SortOrder} passed by the {@link SortOrder#sort} on initial sort
	     * @fires SortTable~reportal-table-sort
	     * */
	    value: function sort(sortOrder) {
	      var _this2 = this;
	
	      var so = sortOrder.sortOrder || this.sortOrder.sortOrder,
	          columns = this.columns;
	      if (so && so.length > 0) {
	        if (!this.multidimensional) {
	          SortTable.sortDimension(this.data, columns, so);
	        } else {
	          // if array has nested array blocks
	          this.data.forEach(function (dimension) {
	            SortTable.sortDimension(dimension, _this2.columns, so);
	          });
	        }
	        columns[so[0].column].cell.dispatchEvent(this._sortEvent);
	      }
	    }
	    /**
	     * Splits sorting into one-column or two-column. The precedence of columns in `sortOrder` is the factor defining sort priority
	     * @param {Array} data - array containing row items to be sorted
	     * @param {TableColumns} columns - array of table columns from {@link SortTable#defineSortableColumns}
	     * @param {SortOrder} sortOrder - instance of {@link SortOrder}
	     * */
	
	  }], [{
	    key: "defineSortableColumns",
	    value: function defineSortableColumns(columns, included, excluded) {
	      var sortableColumns = [].slice.call(columns);
	      sortableColumns.forEach(function (column, index) {
	        var sortable = !included && !excluded || included && included.indexOf(index) != -1 || excluded && excluded.indexOf(index) == -1;
	        if (sortable) {
	          column.cell.classList.add('sortable');
	          if (column.refCell) {
	            column.refCell.classList.add('sortable');
	          }
	          column.sortable = true;
	        }
	      });
	      return sortableColumns;
	    }
	
	    /**
	     * sets up listeners for column headers available for click
	     * @param {HTMLElement} delegatedTarget - element that will receive clicks and see if they are valid, `thead` is recommended to boil down to header clicks only
	     * @param {TableColumns} columns - array of table columns from {@link SortTable#defineSortableColumns}
	     * @param {SortOrder} sortOrder - instance of {@link SortOrder}
	     * @listens click
	     * */
	
	  }, {
	    key: "listenForSort",
	    value: function listenForSort(delegatedTarget, columns, sortOrder) {
	      delegatedTarget.addEventListener('click', function (e) {
	        // if it's a table cell, is in columns array and is sortable
	        var clickedColumn = void 0;
	        for (var i = 0; i < columns.length; i++) {
	          if (e.target == columns[i].cell || e.target == columns[i].refCell) {
	            clickedColumn = columns[i];break;
	          }
	        }
	        if ((e.target.tagName == 'TD' || e.target.tagName == 'TH') && clickedColumn.sortable) {
	          sortOrder.replace({ column: columns.indexOf(clickedColumn), direction: e.target.classList.contains('asc') ? 'desc' : 'asc' });
	        }
	      });
	    }
	  }, {
	    key: "sortDimension",
	    value: function sortDimension(data, columns, sortOrder) {
	      var getIndex = function getIndex(i) {
	        return columns[sortOrder[i].column].index;
	      };
	      var getDirection = function getDirection(i) {
	        return sortOrder[i].direction === 'desc' ? -1 : 1;
	      };
	      // TODO: add possibility to sort the data that was stripped by column.
	      data.sort(function (a, b) {
	        // sort rows
	        if (sortOrder.length == 1) {
	          //sort one column only
	          return SortTable.sorter(a[getIndex(0)], b[getIndex(0)], getDirection(0));
	        } else {
	          //sort against two columns
	          return SortTable.sorter(a[getIndex(0)], b[getIndex(0)], getDirection(0)) || SortTable.sorter(a[getIndex(1)], b[getIndex(1)], getDirection(1));
	        }
	      });
	    }
	
	    /**
	     * Function that performs case insensitive sorting in the array. It can distinguish between numbers, numbers as strings, HTML and plain strings
	     * */
	
	  }, {
	    key: "sorter",
	    value: function sorter(a, b, lesser) {
	      var regex = /[<>]/g;
	      if (regex.test(a) || regex.test(b)) {
	        // if we need to sort elements that have HTML like links
	        var tempEl1 = document.createElement('span');tempEl1.innerHTML = a;
	        a = tempEl1.textContent.trim();
	        var tempEl2 = document.createElement('span');tempEl2.innerHTML = b;
	        b = tempEl2.textContent.trim();
	      }
	      if ((typeof a === "undefined" ? "undefined" : _typeof(a)) == 'object' && _typeof(a.data) != undefined) {
	        a = a.data;
	      }
	      if ((typeof b === "undefined" ? "undefined" : _typeof(b)) == 'object' && _typeof(b.data) != undefined) {
	        b = b.data;
	      }
	      if (!isNaN(a) && !isNaN(b)) {
	        //they might be numbers or null
	        if (a === null) {
	          return 1;
	        } else if (b === null) {
	          return -1;
	        }
	        return a < b ? lesser : a > b ? -lesser : 0;
	      } else if (!isNaN(parseFloat(a)) && !isNaN(parseFloat(b))) {
	        // they might be number strings
	        return parseFloat(a) < parseFloat(b) ? lesser : parseFloat(a) > parseFloat(b) ? -lesser : 0;
	      } else {
	        //they might be simple strings
	        return a.toLowerCase() < b.toLowerCase() ? lesser : a.toLowerCase() > b.toLowerCase() ? -lesser : 0;
	      }
	    }
	  }]);
	
	  return SortTable;
	}();
	
	exports.default = SortTable;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by IvanP on 09.09.2016.
	 */
	
	var TableColumns = function () {
	  /**
	   * Creates an array of objects corresponding to the cells of `defaultHeaderRow`, that contain `sortable` property, denoting the column is sortable,
	   * `index` of the column and reference to the `cell`. Adds `.sortable` to a sortable cell
	   * @param {Object} options - options passed to configure the Sorting
	   * @param {HTMLTableElement} options.source - source table sorting will be applied to
	   * @param {HTMLTableElement} options.refSource - floating header if any
	   * @param {Number|Object} [options.defaultHeaderRow=-1] - index of the row in `thead` (incremented from 0) that will have sorting enabled for columns. If `-1` then last row.
	   * @return {{index:Number, title:String, colSpan:Number, cell: HTMLTableCellElement, ?refCell:HTMLTableCellElement}} - an array of objects that have this structure
	   * */
	  function TableColumns(options) {
	    _classCallCheck(this, TableColumns);
	
	    var source = options.source,
	        refSource = options.refSource,
	        _options$defaultHeade = options.defaultHeaderRow,
	        defaultHeaderRow = _options$defaultHeade === undefined ? -1 : _options$defaultHeade;
	
	    var thead = void 0,
	        refThead = void 0;
	    if (source) {
	      thead = TableColumns.getHeader(source);
	    } else {
	      throw new TypeError('`source` table is not specified, cannot create TableColumns');
	    }
	    if (refSource) {
	      refThead = TableColumns.getHeader(refSource);
	    }
	    return TableColumns.computeColumns(thead, refThead, defaultHeaderRow);
	  }
	
	  /**
	   * Gets a header
	   * @param {HTMLTableElement} source - source table headers are created for
	   * */
	
	
	  _createClass(TableColumns, null, [{
	    key: 'getHeader',
	    value: function getHeader(source) {
	      if (source && source.tagName == 'TABLE') {
	        var header = source.querySelector("thead");
	        if (header && header.children.length > 0) {
	          return header;
	        } else {
	          throw new TypeError('`source` table has no header or rows');
	        }
	      } else {
	        throw new TypeError('`source` is not specified or is not a table');
	      }
	    }
	
	    /**
	     * Calculates defaultHeaderRow for a passed `thead`
	     * @param {!HTMLTableElement} thead - source table header
	     * @param {!Number} defaultHeaderRowIndex - index of the row in `thead` (incremented from 0) that will be considered default to have actions executed upon.
	     * @return {{index:Number, row: HTMLTableRowElement}}
	     * */
	
	  }, {
	    key: 'getDefaultHeaderRow',
	    value: function getDefaultHeaderRow(thead, defaultHeaderRowIndex) {
	      // calculate default header row
	      var headerRows = thead.children,
	          headerRowIndex = defaultHeaderRowIndex == -1 ? headerRows.length + defaultHeaderRowIndex : defaultHeaderRowIndex;
	      return {
	        index: headerRowIndex,
	        row: headerRows.item(headerRowIndex)
	      };
	    }
	
	    /**
	     * Gets an array of header cell nodes from default header row
	     * @param {?HTMLTableElement} thead - source table header
	     * @param {!Number} defaultHeaderRowIndex - index of the row in `thead` (incremented from 0) that will be considered default to have actions executed upon.
	     * @return {?Array} Returns an array of header cell nodes or null if `thead` is not specified
	     * */
	
	  }, {
	    key: 'getHeaderCells',
	    value: function getHeaderCells(thead, defaultHeaderRowIndex) {
	      if (thead) {
	        if (defaultHeaderRowIndex != null) {
	          var _ret = function () {
	            var defaultHeaderRow = TableColumns.getDefaultHeaderRow(thead, defaultHeaderRowIndex);
	            var headerRows = thead.children;
	            var rowsLength = headerRows.length;
	            var abstr = {};
	
	            var _loop = function _loop(r) {
	              var row = headerRows.item(r);
	              var augmentIndex = 0; // index that will account for colSpan of upper rows' cells
	              [].slice.call(row.children).forEach(function (cell, index) {
	                //iterate through cells
	                for (var rs = 0; rs <= cell.rowSpan - 1; rs++) {
	                  //spread cell across its rowspan
	                  var rowA = abstr[r + rs] = abstr[r + rs] || {}; //create row if not exists
	                  if (!rowA[augmentIndex]) {
	                    //insert cell into slot if not filled
	                    rowA[augmentIndex] = cell;
	                  } else {
	                    //if filled look for the next empty because rowspanned columns fill them in a linear way
	                    var i = 0;
	                    while (true) {
	                      if (!rowA[i]) {
	                        rowA[i] = cell;
	                        augmentIndex = i;
	                        break;
	                      }
	                      i++;
	                    }
	                  }
	                }
	                augmentIndex += cell.colSpan;
	              });
	            };
	
	            for (var r = 0; r < rowsLength; r++) {
	              _loop(r);
	            }
	            return {
	              v: Object.keys(abstr[defaultHeaderRow.index]).map(function (k) {
	                return abstr[defaultHeaderRow.index][k];
	              })
	            };
	          }();
	
	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } else {
	          throw new TypeError('TableColumns.getHeaderCells: defaultHeaderRowIndex is not specified or is not a Number');
	        }
	      }
	      return null;
	    }
	
	    /**
	     * Gets an array of columns from the table
	     * @param {!HTMLTableElement} thead - source table header
	     * @param {!HTMLTableElement} refThead - reference table header from floating header if any
	     * @param {Number} defaultHeaderRowIndex - index of the row in `thead` (incremented from 0) that will be considered default to have actions executed upon.
	     * @return {?Array} Returns an array of header cell nodes or null if `thead` is not specified
	     * */
	
	  }, {
	    key: 'computeColumns',
	    value: function computeColumns(thead, refThead, defaultHeaderRowIndex) {
	      var theadCells = TableColumns.getHeaderCells(thead, defaultHeaderRowIndex);
	      var refTheadCells = TableColumns.getHeaderCells(refThead, defaultHeaderRowIndex);
	      var realColumnIndex = 0;
	      return theadCells.map(function (cell, index) {
	        var obj = {
	          index: realColumnIndex,
	          title: cell.textContent,
	          cell: cell,
	          colSpan: cell.colSpan
	        };
	        if (refTheadCells != null) {
	          obj.refCell = refTheadCells[index];
	        }
	        // we need to increment the colspan only for columns that follow rowheader because the block is not in data.
	        realColumnIndex = realColumnIndex > 0 ? realColumnIndex + cell.colSpan : realColumnIndex + 1;
	        return obj;
	      });
	    }
	  }]);
	
	  return TableColumns;
	}();
	
	exports.default = TableColumns;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _tableColumns = __webpack_require__(11);
	
	var _tableColumns2 = _interopRequireDefault(_tableColumns);
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by IvanP on 07.09.2016.
	 */
	window.Reportal = window.Reportal || {};
	_rReportalBase2.default.mixin(window.Reportal, {
	  TableColumns: _tableColumns2.default
	});
	
	exports.default = _tableColumns2.default;
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by IvanP on 09.09.2016.
	 */
	
	var TableColumns = function () {
	  /**
	   * Creates an array of objects corresponding to the cells of `defaultHeaderRow`.
	   * @param {Object} options - options passed to configure the Sorting
	   * @param {HTMLTableElement} options.source - source table sorting will be applied to
	   * @param {HTMLTableElement} options.refSource - floating header if any
	   * @param {Number|Object} [options.defaultHeaderRow=-1] - index of the row in `thead` (incremented from 0) that will have sorting enabled for columns. If `-1` then last row.
	   * @return {{index:Number, title:String, colSpan:Number, cell: HTMLTableCellElement, ?refCell:HTMLTableCellElement}} - an array of objects that have this structure
	   * */
	  function TableColumns(options) {
	    _classCallCheck(this, TableColumns);
	
	    var source = options.source,
	        refSource = options.refSource,
	        _options$defaultHeade = options.defaultHeaderRow,
	        defaultHeaderRow = _options$defaultHeade === undefined ? -1 : _options$defaultHeade;
	
	    var thead = void 0,
	        refThead = void 0;
	    if (source) {
	      thead = TableColumns.getHeader(source);
	    } else {
	      throw new TypeError('`source` table is not specified, cannot create TableColumns');
	    }
	    if (refSource) {
	      refThead = TableColumns.getHeader(refSource);
	    }
	    return TableColumns.computeColumns(thead, refThead, defaultHeaderRow);
	  }
	
	  /**
	   * Gets a header
	   * @param {HTMLTableElement} source - source table headers are created for
	   * */
	
	
	  _createClass(TableColumns, null, [{
	    key: 'getHeader',
	    value: function getHeader(source) {
	      if (source && source.tagName == 'TABLE') {
	        var header = source.querySelector("thead");
	        if (header && header.children.length > 0) {
	          return header;
	        } else {
	          throw new TypeError('`source` table has no header or rows');
	        }
	      } else {
	        throw new TypeError('`source` is not specified or is not a table');
	      }
	    }
	
	    /**
	     * Calculates defaultHeaderRow for a passed `thead`
	     * @param {!HTMLTableElement} thead - source table header
	     * @param {!Number} defaultHeaderRowIndex - index of the row in `thead` (incremented from 0) that will be considered default to have actions executed upon.
	     * @return {{index:Number, row: HTMLTableRowElement}}
	     * */
	
	  }, {
	    key: 'getDefaultHeaderRow',
	    value: function getDefaultHeaderRow(thead, defaultHeaderRowIndex) {
	      // calculate default header row
	      var headerRows = thead.children,
	          headerRowIndex = defaultHeaderRowIndex == -1 ? headerRows.length + defaultHeaderRowIndex : defaultHeaderRowIndex;
	      return {
	        index: headerRowIndex,
	        row: headerRows.item(headerRowIndex)
	      };
	    }
	
	    /**
	     * Gets an array of header cell nodes from default header row
	     * @param {?HTMLTableElement} thead - source table header
	     * @param {!Number} defaultHeaderRowIndex - index of the row in `thead` (incremented from 0) that will be considered default to have actions executed upon.
	     * @return {?Array} Returns an array of header cell nodes or null if `thead` is not specified
	     * */
	
	  }, {
	    key: 'getHeaderCells',
	    value: function getHeaderCells(thead, defaultHeaderRowIndex) {
	      if (thead) {
	        if (defaultHeaderRowIndex != null) {
	          var _ret = function () {
	            var defaultHeaderRow = TableColumns.getDefaultHeaderRow(thead, defaultHeaderRowIndex);
	            var headerRows = thead.children;
	            var rowsLength = headerRows.length;
	            var abstr = {};
	
	            var _loop = function _loop(r) {
	              var row = headerRows.item(r);
	              var augmentIndex = 0; // index that will account for colSpan of upper rows' cells
	              [].slice.call(row.children).forEach(function (cell, index) {
	                //iterate through cells
	                for (var rs = 0; rs <= cell.rowSpan - 1; rs++) {
	                  //spread cell across its rowspan
	                  var rowA = abstr[r + rs] = abstr[r + rs] || {}; //create row if not exists
	                  if (!rowA[augmentIndex]) {
	                    //insert cell into slot if not filled
	                    rowA[augmentIndex] = cell;
	                  } else {
	                    //if filled look for the next empty because rowspanned columns fill them in a linear way
	                    var i = 0;
	                    while (true) {
	                      if (!rowA[i]) {
	                        rowA[i] = cell;
	                        augmentIndex = i;
	                        break;
	                      }
	                      i++;
	                    }
	                  }
	                }
	                augmentIndex += cell.colSpan;
	              });
	            };
	
	            for (var r = 0; r < rowsLength; r++) {
	              _loop(r);
	            }
	            return {
	              v: Object.keys(abstr[defaultHeaderRow.index]).map(function (k) {
	                return abstr[defaultHeaderRow.index][k];
	              })
	            };
	          }();
	
	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } else {
	          throw new TypeError('TableColumns.getHeaderCells: defaultHeaderRowIndex is not specified or is not a Number');
	        }
	      }
	      return null;
	    }
	
	    /**
	     * Gets an array of columns from the table
	     * @param {!HTMLTableElement} thead - source table header
	     * @param {!HTMLTableElement} refThead - reference table header from floating header if any
	     * @param {Number} defaultHeaderRowIndex - index of the row in `thead` (incremented from 0) that will be considered default to have actions executed upon.
	     * @return {?Array} Returns an array of header cell nodes or null if `thead` is not specified
	     * */
	
	  }, {
	    key: 'computeColumns',
	    value: function computeColumns(thead, refThead, defaultHeaderRowIndex) {
	      var theadCells = TableColumns.getHeaderCells(thead, defaultHeaderRowIndex);
	      var refTheadCells = TableColumns.getHeaderCells(refThead, defaultHeaderRowIndex);
	      var realColumnIndex = 0;
	      return theadCells.map(function (cell, index) {
	        var obj = {
	          index: realColumnIndex,
	          title: cell.textContent,
	          cell: cell,
	          colSpan: cell.colSpan
	        };
	        if (refTheadCells != null) {
	          obj.refCell = refTheadCells[index];
	        }
	        // we need to increment the colspan only for columns that follow rowheader because the block is not in data.
	        realColumnIndex = realColumnIndex > 0 ? realColumnIndex + cell.colSpan : realColumnIndex + 1;
	        return obj;
	      });
	    }
	  }]);
	
	  return TableColumns;
	}();
	
	exports.default = TableColumns;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TableFloatingHeaderStyle = __webpack_require__(17);
	
	/**
	 * FixedHeader class enables a fixed header appear on tables that have `.reportal-fixed-header` class when the table header is scrolled under address bar.
	 */
	
	var TableFloatingHeader = function () {
	  /**
	   * @param {HTMLTableElement} source - source table that needs a cloned header
	   * */
	  function TableFloatingHeader(source) {
	    var _this = this;
	
	    _classCallCheck(this, TableFloatingHeader);
	
	    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) == undefined || source.tagName != 'TABLE') {
	      throw new TypeError('`source` must be defined and must be a table');
	    }
	
	    TableFloatingHeader.wrapTable(source);
	
	    /**
	     *  The cloned floating header without TBODY
	     *  @type {HTMLTableElement}
	     *  @memberOf TableFloatingHeader
	     *  */
	    this.header = TableFloatingHeader.cloneHeader(source);
	
	    /**
	     *  The source table
	     *  @type {HTMLTableElement}
	     *  @memberOf TableFloatingHeader
	     *  */
	    this.source = source;
	    /**
	     *  Visibility status of the table
	     *  @type {Boolean}
	     *  @memberOf TableFloatingHeader
	     *  */
	    this.visible = false;
	
	    this._meta = {
	      lastScrollY: 0,
	      sourceTHEAD: source.querySelector('thead'),
	      ticking: false
	    };
	
	    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	    this.resizeFixed();
	
	    window.addEventListener("resize", function () {
	      return _this.resizeFixed.call(_this);
	    }, false); // attach a resize listener to resize the header
	    window.addEventListener("scroll", function () {
	      return _this.scrollFixed.call(_this);
	    }, false); // attach a resize listener to resize the header
	  }
	
	  /**
	   * calculates offset height of the table
	   * @param {HTMLTableElement} source - source table
	   * */
	
	
	  _createClass(TableFloatingHeader, [{
	    key: 'requestTick',
	
	
	    /**
	     * function that polls the callback
	     * @param {Function} callback - function that's going to be passed to `requestAnimationFrame` for execution
	     * */
	    value: function requestTick(callback) {
	      if (!this._meta.ticking) {
	        requestAnimationFrame(callback);
	        this._meta.ticking = true;
	      }
	    }
	  }, {
	    key: 'resizeFixed',
	
	
	    /**
	     * Calculates widths for all columns in the fixed header based on the `source`
	     * */
	    value: function resizeFixed() {
	      this.requestTick(TableFloatingHeader._resizeCallback.bind(this));
	    }
	  }, {
	    key: 'scrollFixed',
	
	
	    /**
	     * Displays a fixed header when the table header is scrolled off the screen
	     * */
	    value: function scrollFixed() {
	      this._meta.lastScrollY = window.pageYOffset;
	      this.requestTick(TableFloatingHeader._scrollCallback.bind(this));
	    }
	  }], [{
	    key: 'calcOffsetHeight',
	    value: function calcOffsetHeight(source) {
	      this._meta.tableOffsetTop = source.parentNode.offsetTop;
	      this._meta.tableOffsetBottom = source.parentNode.offsetTop + source.offsetHeight - this._meta.sourceTHEAD.offsetHeight;
	    }
	
	    /**
	     * Event reporting that a header is visible
	     * @event TableFloatingHeader~reportal-fixed-header-visible
	     */
	
	    /**
	     * Event reporting that a header is hidden
	     * @event TableFloatingHeader~reportal-fixed-header-hidden
	     */
	
	    /**
	     * sets visibility of the table
	     * @param {HTMLTableElement} source - source table
	     * @param {HTMLTableElement} header - cloned table with header only
	     * @param {Boolean} visible - visibility status
	     * @fires TableFloatingHeader~reportal-fixed-header-visible
	     * @fires TableFloatingHeader~reportal-fixed-header-visible
	     * */
	
	  }, {
	    key: 'setVisibility',
	    value: function setVisibility(source, header, visible) {
	      if (visible) {
	        header.style.display = 'table';
	        source.dispatchEvent(_rReportalBase2.default.newEvent('reportal-fixed-header-visible'));
	      } else {
	        header.style.display = 'none';
	        source.dispatchEvent(_rReportalBase2.default.newEvent('reportal-fixed-header-hidden'));
	      }
	    }
	
	    /**
	     * wraps the `source` table into a `div.aggregatedTableContainer`
	     * */
	
	  }, {
	    key: 'wrapTable',
	    value: function wrapTable(source) {
	      var wrapper = document.createElement('div');
	      wrapper.classList.add('aggregatedTableContainer');
	      source.parentNode.appendChild(wrapper);
	      wrapper.appendChild(source);
	    }
	
	    /**
	     * clones header of `source` table and appends to wrapper
	     * */
	
	  }, {
	    key: 'cloneHeader',
	    value: function cloneHeader(source) {
	      var header = source.cloneNode(true);
	      header.classList.add('fixed');
	      source.parentNode.appendChild(header);
	      [].slice.call(header.children).forEach(function (child) {
	        if (child.nodeName == 'TBODY') {
	          header.removeChild(child);
	        }
	      });
	      return header;
	    }
	  }, {
	    key: '_resizeCallback',
	    value: function _resizeCallback() {
	      var initialHeader = this._meta.sourceTHEAD.querySelectorAll('tr>*'),
	          clonedHeader = this.header.querySelectorAll('thead>tr>*'),
	          headerWidth = this.source.offsetWidth + 'px',
	          widths = [];
	      // do reflow
	      for (var i = 0; i < initialHeader.length; i++) {
	        widths.push(initialHeader[i].offsetWidth);
	      }
	      //do repaint
	      for (var c = 0; c < clonedHeader.length; c++) {
	        clonedHeader[c].style.width = widths[c] + 'px';
	      }
	      this.header.style.width = headerWidth;
	
	      TableFloatingHeader.calcOffsetHeight.call(this, this.source); //recalc height of the table after reflow
	      this._meta.ticking = false;
	      this.scrollFixed(); // to compensate top offset in case after resize the table is less in height and top has changed
	    }
	  }, {
	    key: '_scrollCallback',
	    value: function _scrollCallback() {
	      var offset = this._meta.lastScrollY,
	          tableOffsetTop = this._meta.tableOffsetTop,
	          tableOffsetBottom = this._meta.tableOffsetBottom;
	      if ((offset < tableOffsetTop || offset > tableOffsetBottom) && this.visible) {
	        this.visible = false;
	        TableFloatingHeader.setVisibility(this.source, this.header, false);
	      } else if (offset >= tableOffsetTop && offset <= tableOffsetBottom) {
	        this.header.style.top = offset - tableOffsetTop + 'px';
	        if (!this.visible) {
	          this.visible = true;
	          TableFloatingHeader.setVisibility(this.source, this.header, true);
	        }
	      }
	      this._meta.ticking = false;
	    }
	  }]);
	
	  return TableFloatingHeader;
	}();
	
	exports.default = TableFloatingHeader;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	var _rAsyncHierarchyTable = __webpack_require__(6);
	
	var _rAsyncHierarchyTable2 = _interopRequireDefault(_rAsyncHierarchyTable);
	
	var _mapHierarchy = __webpack_require__(14);
	
	var _mapHierarchy2 = _interopRequireDefault(_mapHierarchy);
	
	var _rAggregatedTable = __webpack_require__(5);
	
	var _rAggregatedTable2 = _interopRequireDefault(_rAggregatedTable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(19);
	
	var DrilldownMap = function () {
	  /**
	   * Creates a drilldown map. It uses a color function `colorFn` that allows colorcode countries
	   * `colorFn` accepts two attributes: `value` and `target` and must return a color string based on those two attributes.
	   * Make sure hierarchy has `target` loaded from DBDesigner table into each hierarchy level, otherwise a default config `dataClasses` takes precedence on value
	   * Example:
	   *
	   *    {
	   *    //some constructor configuration above
	   *      colorFn: function(value,target){
	   *        return (value!=null && target!=null)? (value - target >= 0) ? "#18BC9C" : ((value >= 0.9*target) ? "#FF4900" : "#E45335") : undefined;
	   *      }
	   *     //some constructor configuration below
	   *    }
	   *
	   * @param {HTMLTableElement} config.source - a source drilldown table that contains the initial set of data(with reference group enabled and 1 child level)
	   * @param {String} config.tableID - id of the `source` table that is the initial source of data (from reportal backend)
	   * @param {Array} config.rowheaders - a rowheaders array for the loaded table
	   * @param {Object} config.flatHierarchy - a hierarchical object for a map to be built upon
	   * @param {String} [config.initialMap="custom/world-highres2"] - the initial map object that's going to be loaded to initialise the map
	   * @param {String} config.containerID - id of the container the map will be drawn to
	   * @param {Function} config.mappointCallback - executed when a mappoint (city) is clicked
	   * @param {Function} config.colorFn - A function that allows custom color coding computation based on value and target.
	   * @param {Number} [config.valueColumn=1] - Zero-based column index that contains primary value which will be used for map coloring.
	   * @param {Boolean} [config.fullParentLevelInfo=true] - Display full info of the parent level in right part of the map, rather than the parent level name and the primary value
	   * @param {String} [config.pageStateId=document.querySelector('#PageStateId').value] - PageStateId
	   * @param {Object} config.normals - an object where the keys are the names of columns taken from DBDesignerTable and values - their string types: `string`, `number`, `boolean`, `stringArray`, `numberArray`
	   * @param {String} [config.normalsSeparator=','] - delimiter between values in `stringArray` (`us-ca, us-tx, us-wy`) and `numberArray` (`-31.86,16.38`). They are served as a delimiter-separated string and the delimiter is `,` by default. If you use another one, make sure you specify it here
	   * @param {Object} [config.options={}] - options passed to HighMap to restyle/reconfigure it
	   * @param {Object} [config.loadingText= 'fetching data'] - text to show when loading another level
	   * */
	  function DrilldownMap() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, DrilldownMap);
	
	    var flatHierarchy = config.flatHierarchy,
	        normals = config.normals,
	        normalsSeparator = config.normalsSeparator;
	
	
	    this.declareGlobals(config, {
	      initialMap: 'custom/world-highres2',
	      valueColumn: 1,
	      fullParentLevelInfo: true,
	      colorFn: function colorFn(value, target) {
	        return value !== null ? value >= 80 ? '#4caf50' : value < 80 && value >= 60 ? '#ffc107' : '#ff5722' : 'blue';
	      },
	      pageStateId: document.querySelector('#PageStateId') ? document.querySelector('#PageStateId').value : null,
	      loadingText: 'fetching data',
	      options: {}
	    }, this.typeCheck(config));
	
	    this.hierarchy = new _mapHierarchy2.default(flatHierarchy, normals, normalsSeparator);
	
	    this.parseTableData();
	
	    this.drawMap();
	  }
	
	  _createClass(DrilldownMap, [{
	    key: "declareGlobals",
	    value: function declareGlobals(config) {
	      var _this = this;
	
	      var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var typeCheck = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	      var mixedOptions = _extends({}, config, defaults);
	      Object.keys(mixedOptions).forEach(function (key) {
	        if (typeCheck[key] && typeof typeCheck[key] === 'function') typeCheck[key](mixedOptions[key]);
	        _this[key] = mixedOptions[key];
	      });
	    }
	  }, {
	    key: "typeCheck",
	    value: function typeCheck(opts) {
	      if (typeof Highcharts === 'undefined') {
	        throw new Error('Highcharts must be declared. Probably they are missing');
	      }
	      if (typeof Highcharts.maps === 'undefined') {
	        throw new Error('HighMaps must be loaded. Probably they are missing');
	      }
	      if (!(opts.rowheaders && opts.rowheaders !== null && opts.rowheaders.length > 0)) throw new Error('"rowheaders" array must be present to parse data');
	
	      return {
	        source: function source() {
	          if (!(opts.source && opts.source.localName === 'table')) throw new Error('source table must be specified');
	        },
	        containerID: function containerID() {
	          if (!(opts.containerID && typeof opts.containerID === 'string')) throw new Error('containerID must be a string without a leading # character but it is ' + _typeof(opts.containerID));
	        },
	        tableID: function tableID() {
	          if (!(opts.tableID && typeof opts.tableID === 'string')) throw new Error('tableID must be a string but it is ' + _typeof(opts.tableID));
	        },
	        mappointCallback: function mappointCallback() {
	          var cb = opts.mappointCallback;
	          if (cb && cb !== null && typeof cb !== 'function') throw new Error('mappointCallback must be a function');
	        }
	      };
	    }
	
	    /**
	     * Parses table passed to it and adds data to `._data` in `hierarchy`
	     * @param {HTMLTableElement} options.source - source table for data
	     * @param {Number|Array} options.excludeRows - rows to be excluded from parsing
	     * @param {Array} options.rowheaders - array of `source` rowheaders
	     * @param {Object} options.flatHierarchy - flat hierarchy object
	     * */
	
	  }, {
	    key: "parseTableData",
	    value: function parseTableData() {
	      var _this2 = this;
	
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var _options$source = options.source,
	          source = _options$source === undefined ? this.source : _options$source,
	          _options$excludeRows = options.excludeRows,
	          excludeRows = _options$excludeRows === undefined ? this.excludeRows : _options$excludeRows,
	          _options$rowheaders = options.rowheaders,
	          rowheaders = _options$rowheaders === undefined ? this.rowheaders.map(function (rh) {
	        return rh[0];
	      }) : _options$rowheaders,
	          _options$excludeColum = options.excludeColumns,
	          excludeColumns = _options$excludeColum === undefined ? this.excludeColumns : _options$excludeColum;
	
	
	      var aggregatedTable = new _rAggregatedTable2.default({ source: source, excludeColumns: excludeColumns, excludeRows: excludeRows });
	      rowheaders.forEach(function (rowHeader, i) {
	        if (!_this2.flatHierarchy[rowHeader]._data) {
	          _this2.flatHierarchy[rowHeader]._data = aggregatedTable.data[i].map(function (dataItem, index) {
	            return {
	              value: dataItem.data,
	              title: index !== 0 ? aggregatedTable.columns[index].title : "Region"
	            };
	          });
	        }
	      });
	    }
	  }, {
	    key: "drawMap",
	    value: function drawMap() {
	      this.curLVL = this.flatHierarchy[this.rowheaders[0]];
	      Highcharts.mapChart(this.containerID, _extends({}, this.mapConfig, this.options));
	    }
	  }, {
	    key: "getTooltip",
	
	
	    /**
	     * Generates a serialized dataset for a tooltip
	     * */
	    value: function getTooltip() {
	      var _this3 = this;
	
	      var data = this.curLVL._data;
	      return data.map(function (item, index) {
	        return _this3.generateTooltipRow(item.title, "{point.data." + index + ".value}");
	      }).join("<br />");
	    }
	
	    /**
	     * Generates chart subtitle returning region and main value of full info based on `fullParentLevelInfo`
	     * */
	
	  }, {
	    key: "generateTooltipRow",
	    value: function generateTooltipRow(label, value) {
	      return '<span class="tooltip-level-label">' + label + ': </span><span class="tooltip-level-value">' + value + '</span>';
	    }
	
	    /**
	     * get subcell by text rather than by id
	     * @param {String} name - name of the subcell we're looking for
	     * @returns {Object} Returns a subcell which has that name
	     * */
	
	  }, {
	    key: "getLevelByName",
	    value: function getLevelByName(name) {
	      return this.curLVL.subcells.filter(function (el) {
	        return el.text === name;
	      })[0];
	    }
	
	    /**
	     * Creates custom geoJSON file
	     * @param {Object} mapData - initial map
	     * @param {Array}countriesList - list of countries IDs
	     * @param {String} mapName
	     * @returns {Object}
	     * */
	
	  }, {
	    key: "initializeMap",
	
	
	    /**
	     * Get series for the first time map initialization
	     * @param {Object} curLVL - current level in hierarchy
	     * @param {Array} [series=[]] - series
	     * @returns {Array}
	     * */
	    value: function initializeMap() {
	      var _this4 = this;
	
	      var series = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	      this.curLVL.subcells.forEach(function (subcell) {
	        if (subcell.mapID) {
	          var seriesItem = _this4.composeSeries(subcell);
	          series.push(seriesItem);
	        }
	      });
	      return series;
	    }
	
	    /**
	     * Load map from HighMaps map collection
	     * @param {String} source
	     * @returns {Promise}
	     * */
	
	  }, {
	    key: "getSeriesData",
	
	
	    /**
	     * Creates a single series data for HighMap series option
	     * @param {Object} level - a level in hierarchy
	     * @returns {Object}
	     * */
	    value: function getSeriesData(level) {
	      var _this5 = this;
	
	      var drilldown = level.subcells ? level.text : null;
	      if (typeof level.mapID === 'string') {
	        return [{
	          drilldown: drilldown,
	          code: level.mapID,
	          value: DrilldownMap.getPrimaryValue(level, this.valueColumn),
	          data: level._data
	        }];
	      } else if (Array.isArray(level.mapID)) {
	        return level.mapID.map(function (mapID) {
	
	          return {
	            drilldown: drilldown,
	            code: mapID,
	            value: DrilldownMap.getPrimaryValue(level, _this5.valueColumn),
	            data: level._data
	          };
	        });
	      } else {
	        throw new Error("Data element is corrupted");
	      }
	    }
	
	    /**
	     * Executes `colorFn` passed by user to compute color by passing `value` and `target` to it
	     * @param {Function} colorFn - color function
	     * @param {Number} value - value to test
	     * @param {Number} target - target for the level
	     * */
	
	  }, {
	    key: "getCoordinateSeries",
	
	
	    /**
	     * Create a single mappoint series
	     * @param {Object} subcell - a single hierarchy element
	     * @param {Object} mapData
	     * @param {Object} chart - reference to chart object
	     * @returns {Object} series for map points
	     * */
	    value: function getCoordinateSeries(subcell, mapData, chart) {
	      chart.mapTransforms = mapData ? mapData["hc-transform"] : Highcharts.maps["custom/world-highres2"]["hc-transform"];
	      var pos = chart.fromLatLonToPoint({ lat: subcell.coordinates[0], lon: subcell.coordinates[1] });
	      var config = {
	        type: "mappoint",
	        name: subcell.text,
	        marker: {
	          lineColor: "black",
	          lineWidth: 1,
	          radius: 4,
	          symbol: "circle"
	        },
	        data: [{
	          color: DrilldownMap.computeColor(this.colorFn, DrilldownMap.getPrimaryValue(subcell, this.valueColumn), subcell.target),
	          name: subcell.text,
	          value: subcell.value,
	          x: pos.x,
	          y: pos.y
	        }]
	      };
	      if (this.mappointCallback) {
	        var self = this;
	        config.events = {
	          click: function click(e) {
	            self.mappointCallback.call(this, e);
	          }
	        };
	      }
	      return config;
	    }
	
	    /**
	     * Creates a single series item for Highmaps series option
	     * @param {Object} subcell - a subcell
	     * @param {Object} mapData
	     * @param {Object} chart - reference to chart object
	     * @returns {Object} Returns series
	     * */
	
	  }, {
	    key: "composeSeries",
	    value: function composeSeries(subcell, mapData, chart) {
	      if (!subcell.coordinates) {
	        mapData = mapData ? Highcharts.geojson(DrilldownMap.createCustomGeoJSON(mapData, subcell.mapID, subcell.text)) : Highcharts.geojson(DrilldownMap.createCustomGeoJSON(Highcharts.maps['custom/world-highres2'], subcell.mapID, subcell.text));
	        if (subcell.mapID) {
	          var target = subcell.target;
	          if (!target || target === null) {
	            target = this.hierarchy[0].target;
	          }
	          return {
	            name: subcell.text,
	            dataLabels: {
	              enabled: true,
	              formatter: function formatter() {
	                if (this.series.data[0]["hc-key"] === this.point["hc-key"]) return this.series.name;
	              }
	            },
	            tooltip: {
	              pointFormat: this.getTooltip()
	            },
	            color: DrilldownMap.computeColor(this.colorFn, DrilldownMap.getPrimaryValue(subcell, this.valueColumn), target),
	            allAreas: false,
	            parent: subcell.parent.text,
	            mapData: mapData,
	            joinBy: ['hc-key', 'code'],
	            data: this.getSeriesData(subcell)
	          };
	        }
	      } else {
	        return this.getCoordinateSeries(subcell, mapData, chart);
	      }
	    }
	
	    /**
	     * Updates your map view after drilldown click
	     * @param {Object} curLVL
	     * @param {Object} chart
	     * @param {Object} e - drilldown event object
	     * @returns {Object} Returns curLVL
	     * */
	
	  }, {
	    key: "updateMap",
	    value: function updateMap(curLVL, chart, e) {
	      var _this6 = this;
	
	      if (curLVL && curLVL.mapName) {
	        // if we have another map to load
	        var map = DrilldownMap.loadMap(curLVL.mapName);
	        map.then(function (mapData) {
	          _this6.addSeries(curLVL, chart, e, mapData);
	        });
	      } else if (curLVL && !curLVL.mapName) {
	        this.addSeries(curLVL, chart, e);
	      }
	    }
	
	    /**
	     * Composes a series for your HighMaps options config
	     * @param {Object} curLVL
	     * @param {Object} chart
	     * @param {Object} e - drilldown event object
	     * @param {Object} mapData - mapData geoJSON
	     * */
	
	  }, {
	    key: "addSeries",
	    value: function addSeries(curLVL, chart, e, mapData) {
	      var _this7 = this;
	
	      if (curLVL.subcells) {
	        // if it's an end point
	        if (curLVL.subcells[0].coordinates) {
	          var seriesItem = this.composeSeries(curLVL, mapData, chart);
	          seriesItem.data.forEach(function (dataItem) {
	            dataItem.drilldown = null;
	            dataItem.value = null;
	          });
	          chart.addSingleSeriesAsDrilldown(e.point, seriesItem);
	        }
	        curLVL.subcells.forEach(function (subcell) {
	          if (!subcell.mapID && !subcell.coordinates) return;
	          var seriesItem = _this7.composeSeries(subcell, mapData, chart);
	          chart.addSingleSeriesAsDrilldown(e.point, seriesItem);
	        });
	        chart.applyDrilldown();
	      } else {
	        var _seriesItem = this.composeSeries(curLVL, mapData, chart);
	        _seriesItem.data.map(function (dataItem) {
	          dataItem.drilldown = null;
	          dataItem.value = null;
	        });
	        chart.addSeriesAsDrilldown(e.point, _seriesItem);
	      }
	    }
	  }, {
	    key: "mapConfig",
	    get: function get() {
	      var This = this;
	      return {
	        lang: {
	          drillUpText: '< to {series.parent}'
	        },
	        tooltip: {
	          pointFormat: This.getTooltip()
	        },
	        title: {
	          text: ''
	        },
	        legend: {
	          enabled: true
	        },
	        plotOptions: {
	          series: {
	            states: {
	              normal: {
	                animation: false
	              }
	            },
	            point: {
	              events: {
	                mouseOver: function mouseOver() {
	                  this.series.data.forEach(function (el) {
	                    return el.setState("hover");
	                  });
	                },
	                mouseOut: function mouseOut() {
	                  this.series.data.forEach(function (el) {
	                    return el.setState();
	                  });
	                }
	              }
	            }
	          }
	        },
	        mapNavigation: {
	          enabled: true,
	          buttons: {
	            zoomIn: {
	              verticalAlign: "bottom"
	            },
	            zoomOut: {
	              verticalAlign: "bottom"
	            }
	          }
	        },
	        subtitle: {
	          align: 'right',
	          floating: true,
	          text: This.subtitle
	        },
	        drilldown: {
	          drillUpButton: {
	            position: {
	              align: "left",
	              y: 0
	            },
	            relativeTo: 'spacingBox'
	          }
	        },
	        chart: {
	          events: {
	            drilldown: function drilldown(e) {
	              //this == chart reference;
	              //console.log(CircularJSON.parse(CircularJSON.stringify(e.point)));
	              var chart = e.target;
	              This.curLVL = This.getLevelByName(e.point.series.name);
	              var curLVL = This.curLVL;
	              if (curLVL) {
	                chart.showLoading(This.loadingText);
	                var table = This.childTable.then(function (table) {
	                  // parse data loaded from table
	                  This.parseTableData({
	                    source: table,
	                    excludeRows: 0,
	                    rowheaders: curLVL.subcells.map(function (lvl) {
	                      return lvl.id;
	                    })
	                  });
	                  This.updateMap(curLVL, chart, e);
	                  chart.subtitle.update({ text: This.subtitle });
	                  chart.hideLoading();
	                });
	              }
	            },
	            drillupall: function drillupall(e) {
	              This.curLVL = This.curLVL.parent;
	              if (This.curLVL) {
	                e.target.subtitle.update({ text: This.subtitle });
	              }
	            }
	          }
	        },
	        series: This.initializeMap([{
	          showInLegend: false,
	          mapData: Highcharts.maps[This.initialMap]
	        }])
	      };
	    }
	  }, {
	    key: "childTable",
	    get: function get() {
	      return _rAsyncHierarchyTable2.default.fetchChildTable(this.curLVL.id, this.curLVL.parent ? this.curLVL.parent.id : null, this.tableID, this.pageStateId);
	    }
	  }, {
	    key: "subtitle",
	    get: function get() {
	      var _this8 = this;
	
	      if (this.fullParentLevelInfo) {
	        return this.curLVL._data.map(function (item) {
	          return _this8.generateTooltipRow(item.title, item.value);
	        }).join('<br />');
	      } else {
	        var parentLevel = this.curLVL._data[0],
	            currentLevel = this.curLVL._data[this.valueColumn];
	
	        return [this.generateTooltipRow(parentLevel.title, parentLevel.value), this.generateTooltipRow(currentLevel.title, currentLevel.value)].join('<br />');
	      }
	    }
	  }], [{
	    key: "createCustomGeoJSON",
	    value: function createCustomGeoJSON(mapData, countriesList, mapName) {
	      var geojson = {
	        title: "",
	        version: "0.1.0",
	        type: "FeatureCollection",
	        copyright: "Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth",
	        copyrightShort: "Natural Earth",
	        copyrightUrl: "http://www.naturalearthdata.com",
	        crs: {
	          type: "name",
	          properties: {
	            name: "urn:ogc:def:crs:EPSG:54003"
	          }
	        },
	        "hc-transform": {
	          default: {
	            crs: "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +datum=WGS84 +units=m +no_defs",
	            scale: 1.72182781654e-05,
	            jsonres: 15.5,
	            jsonmarginX: -999,
	            jsonmarginY: 9851.0,
	            xoffset: -19495356.3693,
	            yoffset: 12635908.1982
	          }
	        },
	        features: DrilldownMap.getFeatures(countriesList, mapData)
	      };
	
	      geojson.title = mapName;
	      return geojson;
	    }
	
	    /**
	     * Get array of features from geoJSON file
	     * @param {Array|String} countriesList - countries IDs
	     * @param {Object} mapData - your initial map
	     * @param {String} key for geojson features comparing
	     * @returns {Array} features list
	     * */
	
	  }, {
	    key: "getFeatures",
	    value: function getFeatures(countriesList, mapData) {
	      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "hc-key";
	
	      if (typeof countriesList === 'string') {
	        return mapData.features.filter(function (feature) {
	          return feature.properties[key] === countriesList;
	        });
	      } else if (Array.isArray(countriesList)) {
	        return mapData.features.filter(function (feature) {
	          return countriesList.indexOf(feature.properties[key]) !== -1;
	        });
	      }
	    }
	  }, {
	    key: "loadMap",
	    value: function loadMap(source) {
	      return new Promise(function (resolve, reject) {
	        jQuery.getScript('https://code.highcharts.com/mapdata/' + source + '.js', function () {
	          resolve(Highcharts.maps[source]);
	        });
	      });
	    }
	
	    /**
	     * Gets the main value that the chart is built on
	     * @param {Object} level - level under examination
	     * @param {Number} valueColumn - Zero-based column index that contains primary value which will be used for map coloring
	     * @returns {Number} Returns primary value
	     * */
	
	  }, {
	    key: "getPrimaryValue",
	    value: function getPrimaryValue(level, valueColumn) {
	      return level._data[valueColumn].value;
	    }
	  }, {
	    key: "computeColor",
	    value: function computeColor(colorFn, value, target) {
	      if (colorFn) {
	        return colorFn(value, target);
	      } else {
	        return undefined;
	      }
	    }
	  }]);
	
	  return DrilldownMap;
	}();
	
	exports.default = DrilldownMap;
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by IvanP on 26.12.2016.
	 */
	var MapHierarchy = function () {
	  function MapHierarchy(flatHierarchy) {
	    var normals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var normalsSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
	
	    _classCallCheck(this, MapHierarchy);
	
	    this.flatHierarchy = flatHierarchy;
	    this.normals = normals;
	    this.normalsSeparator = normalsSeparator;
	    this.hierarchy = this.processHierarchy();
	    this.addMapIDsToHierarchyLevel();
	    return this.hierarchy;
	  }
	
	  /**
	   * Processes hierarchy array by assigning parent-child relations and returning those that don't have a parent
	   * */
	
	
	  _createClass(MapHierarchy, [{
	    key: "processHierarchy",
	    value: function processHierarchy() {
	      var orphanItems = [];
	      for (var key in this.flatHierarchy) {
	        var item = this.flatHierarchy[key];
	        this.normalize(item);
	        if (this._itemHasParent(item)) {
	          this._assignParentToItem(item);
	        } else {
	          orphanItems.push(item);
	        }
	      }
	      return orphanItems;
	    }
	
	    /**
	     * normalizes a string value to a certain format.
	     * - `arrayString` - normalizes comma-separated items to an Array of Strings, i.e "haha", "lala" would be ["haha", "lala"]
	     * - `arrayNumber` - normalizes comma-separated items to an Array of Floats, i.e "-13.41", "48.66" would be [-13.41, 48.66]
	     * - `string` - returns the string as is
	     * - `number` - parses the string as a Float
	     * - `boolean` - parses the string as a Boolean, case insensitive
	     *
	     * @param {Object} item - item to match contents against `normals`
	     * */
	
	  }, {
	    key: "normalize",
	    value: function normalize(item) {
	      var _this = this;
	
	      if (this.shouldNormalize) {
	        var parser = {
	          stringArray: function stringArray(val) {
	            return val.split(_this.normalsSeparator);
	          },
	          numberArray: function numberArray(val) {
	            return val.split(_this.normalsSeparator).map(function (i) {
	              return parseFloat(i);
	            });
	          },
	          string: function string(val) {
	            return val.trim();
	          },
	          number: function number(val) {
	            return val !== null && !isNaN(parseFloat(val)) ? parseFloat(val) : null;
	          },
	          boolean: function boolean(val) {
	            return val.toLowerCase() === "true" || val === "1";
	          }
	        };
	
	        for (var normal in this.normals) {
	          if (item[normal]) {
	            // property exists in object
	            if (item[normal].length > 0) {
	              item[normal] = parser[this.normals[normal]](item[normal]);
	            } else {
	              delete item[normal];
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: "_itemHasParent",
	    value: function _itemHasParent(item) {
	      return item.parent && item.parent !== null && item.parent.length > 0;
	    }
	  }, {
	    key: "_assignParentToItem",
	    value: function _assignParentToItem(item) {
	      item.parent = this.flatHierarchy[item.parent];
	      item.parent.subcells = item.parent.subcells || [];
	      item.parent.subcells.push(item);
	    }
	  }, {
	    key: "addMapIDsToHierarchyLevel",
	
	
	    /**
	     * Updates initial hierarchy
	     * @param hierarchy
	     * @param parent - hierarchy level parent
	     */
	    value: function addMapIDsToHierarchyLevel() {
	      var _this2 = this;
	
	      var hierarchy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.hierarchy;
	      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	      hierarchy.forEach(function (subcell) {
	        _this2.inheritMapName(subcell);
	        if (subcell.subcells) {
	          _this2.addMapIDsToHierarchyLevel(subcell.subcells, subcell);
	        }
	        _this2.bubbleMapId(subcell);
	      });
	    }
	  }, {
	    key: "inheritMapName",
	    value: function inheritMapName(item) {
	      if (this.parentHasMapName(item)) {
	        item.mapName = item.parent.mapName;
	      }
	    }
	  }, {
	    key: "bubbleMapId",
	    value: function bubbleMapId(item) {
	      if (item.parent && item.mapID && !item.parent.mapName) {
	        if (!item.parent.mapID) item.parent.mapID = [];
	        item.parent.mapID = item.parent.mapID.concat(item.mapID);
	      }
	    }
	  }, {
	    key: "parentHasMapName",
	    value: function parentHasMapName(item) {
	      return item.parent && item.parent !== null && item.parent.mapName;
	    }
	  }, {
	    key: "shouldNormalize",
	    get: function get() {
	      return Object.keys(this.normals).length > 0;
	    }
	  }], [{
	    key: "composeFlatHierarchy",
	    value: function composeFlatHierarchy(hierarchy, normals) {
	      var o = {};
	      var toNormalize = normals.keys().length > 0;
	      hierarchy.forEach(function (item) {
	        if (toNormalize) MapHierarchy.normalize(item, normals);
	        o[item.id] = item;
	      });
	      return o;
	    }
	  }]);
	
	  return MapHierarchy;
	}();
	
	exports.default = MapHierarchy;
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ODdhYTE0NWM2M2ZjNTAzNDZjOSIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItcmVwb3J0YWwtYmFzZS9zcmMvcmVwb3J0YWwtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvdGFibGUtZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvYWdncmVnYXRlZC10YWJsZS1yb3ctbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvYWdncmVnYXRlZC10YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYXN5bmMtaGllcmFyY2h5LXRhYmxlL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy9zb3J0LW9yZGVyLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy9zb3J0LXRhYmxlLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1jb2x1bW5zL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1jb2x1bW5zL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJpbGxkb3duTWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXAtaGllcmFyY2h5LmpzIiwid2VicGFjazovLy8uL34vci1hZ2dyZWdhdGVkLXRhYmxlL3NyYy9hZ2dyZWdhdGVkLXRhYmxlLmNzcyIsIndlYnBhY2s6Ly8vLi9+L3Itc29ydC10YWJsZS9zcmMvc29ydC10YWJsZS1zdHlsZXMuY3NzIiwid2VicGFjazovLy8uL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci1zdHlsZXMuY3NzIiwid2VicGFjazovLy8uL3NyYy9kcmlsbGRvd24tbWFwLmNzcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJSZXBvcnRhbCIsIm1peGluIiwiRHJpbGxkb3duTWFwIiwiUmVwb3J0YWxCYXNlIiwidGFyZ2V0Iiwic291cmNlIiwiaSIsImxldmVsIiwiYXJncyIsImxlbmd0aCIsIkFycmF5IiwiaXNBcnJheSIsImNvbnNvbGUiLCJhcHBseSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsIl9sb2dnZXIiLCJuYW1lIiwiZXZlbnQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50Iiwic3RyIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwicmVwbGFjZSIsIlVSTCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiRXJyb3IiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsImUiLCJzZW5kIiwidmFyaWFibGUiLCJxdWVyeSIsImxvY2F0aW9uIiwic2VhcmNoIiwic3Vic3RyaW5nIiwidmFycyIsInNwbGl0IiwicGFpciIsInRvTG93ZXJDYXNlIiwiVGFibGVEYXRhIiwibXVsdGlkaW1lbnNpb25hbCIsImJsb2NrcyIsInBhcmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWQiLCJmb3JFYWNoIiwiYmxvY2tDZWxsIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2VsbCIsInJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJpc051bWJlciIsInRleHRDb250ZW50IiwidHJpbSIsIm9wdGlvbnMiLCJleGNsdWRlQmxvY2siLCJleGNsdWRlQ29sdW1ucyIsImV4Y2x1ZGVSb3dzIiwiZGlyZWN0aW9uIiwiZGF0YSIsInRhZ05hbWUiLCJyb3dzIiwidGVtcEFycmF5IiwidW5kZWZpbmVkIiwic3BsaWNlIiwic29ydCIsImEiLCJiIiwicmV2ZXJzZSIsInJvdyIsImNvbnRhaW5zIiwicHVzaCIsImNlbGxzIiwiY2hpbGRyZW4iLCJ0ZW1wX2V4Y2x1ZGVDb2x1bW5zIiwiaW5kZXgiLCJyb3dTcGFuIiwicHJlcGFyZURhdGFDZWxsIiwicmVhbEluZGV4IiwiVHlwZUVycm9yIiwiQWdncmVnYXRlZFRhYmxlUm93TWV0YSIsIm5hbWVDZWxsIiwiYmxvY2siLCJmaXJzdEluQmxvY2siLCJzdHlsZXMiLCJyZXF1aXJlIiwiYWdncmVnYXRlZFRhYmxlQ1NTIiwiQWdncmVnYXRlZFRhYmxlIiwicm93aGVhZGVyQ29sdW1uSW5kZXgiLCJkZWZhdWx0SGVhZGVyUm93IiwiZGF0YVN0cmlwRGlyZWN0aW9uIiwic29ydGluZyIsImZsb2F0aW5nSGVhZGVyIiwicmVmU291cmNlIiwiaGVhZGVyIiwiY29uc3RydWN0b3IiLCJkZXRlY3RNdWx0aWRpbWVuc2lvbmFsIiwiZ2V0RGF0YSIsInJlb3JkZXJGdW5jdGlvbiIsInJlb3JkZXJSb3dzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbHVtbnMiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJkaW1lbnNpb25hbERhdGFJdGVyYXRvciIsImRhdGFEaW1lbnNpb24iLCJyZXBvc2l0aW9uQmxvY2tDZWxsIiwiYXBwZW5kQ2hpbGQiLCJpdGVtIiwicXVlcnlTZWxlY3RvciIsIml0ZW1zIiwiYmxvY2tSb3dJdGVtIiwiZmlsdGVyIiwiYmxvY2tSb3ciLCJpbmRleE9mIiwibmV3Rmlyc3RSb3ciLCJpbnNlcnRCZWZvcmUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInJlbW92ZSIsImNhbGxiYWNrIiwiZGltZW5zaW9uIiwiQXN5bmNIaWVyYXJjaHlUYWJsZSIsImhpZXJhcmNoeUlEIiwiaGllcmFyY2h5Q29udHJvbElEIiwicGFnZVN0YXRlSUQiLCJsYW5ndWFnZUNvZGUiLCJwYXRoIiwib3JpZ2luIiwiZ2V0UXVlcnlWYXJpYWJsZSIsImVuY29kZSIsIklzUHJldmlldyIsIkhpZXJhcmNoeUNvbnRyb2xJZCIsImhpZXJhcmNoeUl0ZW1DaGlsZHJlbiIsInByb21pc2VSZXF1ZXN0Iiwiam9pbiIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZSIsInBhcmVudElEIiwidGFibGVJRCIsIk5vZGVJZCIsIlRleHQiLCJ0YWJsZVJlc3VsdCIsImhvc3QiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwidGFibGUiLCJleGNsdWRlZFJvd3MiLCJ0b0VuY29kZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN0cmluZ2lmeSIsIlNvcnRPcmRlciIsInNvcnRDYWxsYmFjayIsImRlZmF1bHRTb3J0aW5nIiwic29ydENhbGxiYWNrU2NvcGUiLCJzb3J0T3JkZXIiLCJyZWZDZWxsIiwib2JqIiwiZ2V0Q2VsbCIsImNvbHVtbiIsImNsYXNzTmFtZSIsIlNvcnRUYWJsZSIsImluY2x1ZGVkIiwiZXhjbHVkZWQiLCJfc29ydEV2ZW50IiwibmV3RXZlbnQiLCJzb3J0YWJsZUNvbHVtbnMiLCJkZWZpbmVTb3J0YWJsZUNvbHVtbnMiLCJzcmMiLCJsaXN0ZW5Gb3JTb3J0IiwiZ2V0SGVhZGVyIiwic28iLCJzb3J0RGltZW5zaW9uIiwiZGlzcGF0Y2hFdmVudCIsInNvcnRhYmxlIiwiZGVsZWdhdGVkVGFyZ2V0IiwiY2xpY2tlZENvbHVtbiIsImdldEluZGV4IiwiZ2V0RGlyZWN0aW9uIiwic29ydGVyIiwibGVzc2VyIiwicmVnZXgiLCJ0ZXN0IiwidGVtcEVsMSIsInRlbXBFbDIiLCJUYWJsZUNvbHVtbnMiLCJ0aGVhZCIsInJlZlRoZWFkIiwiY29tcHV0ZUNvbHVtbnMiLCJkZWZhdWx0SGVhZGVyUm93SW5kZXgiLCJoZWFkZXJSb3dzIiwiaGVhZGVyUm93SW5kZXgiLCJnZXREZWZhdWx0SGVhZGVyUm93Iiwicm93c0xlbmd0aCIsImFic3RyIiwiciIsImF1Z21lbnRJbmRleCIsInJzIiwicm93QSIsImNvbFNwYW4iLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiayIsInRoZWFkQ2VsbHMiLCJnZXRIZWFkZXJDZWxscyIsInJlZlRoZWFkQ2VsbHMiLCJyZWFsQ29sdW1uSW5kZXgiLCJ0aXRsZSIsIlRhYmxlRmxvYXRpbmdIZWFkZXJTdHlsZSIsIlRhYmxlRmxvYXRpbmdIZWFkZXIiLCJ3cmFwVGFibGUiLCJjbG9uZUhlYWRlciIsInZpc2libGUiLCJfbWV0YSIsImxhc3RTY3JvbGxZIiwic291cmNlVEhFQUQiLCJ0aWNraW5nIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZXNpemVGaXhlZCIsInNjcm9sbEZpeGVkIiwicmVxdWVzdFRpY2siLCJfcmVzaXplQ2FsbGJhY2siLCJiaW5kIiwicGFnZVlPZmZzZXQiLCJfc2Nyb2xsQ2FsbGJhY2siLCJ0YWJsZU9mZnNldFRvcCIsIm9mZnNldFRvcCIsInRhYmxlT2Zmc2V0Qm90dG9tIiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJkaXNwbGF5Iiwid3JhcHBlciIsImNsb25lTm9kZSIsImNoaWxkIiwibm9kZU5hbWUiLCJyZW1vdmVDaGlsZCIsImluaXRpYWxIZWFkZXIiLCJjbG9uZWRIZWFkZXIiLCJoZWFkZXJXaWR0aCIsIm9mZnNldFdpZHRoIiwid2lkdGhzIiwiYyIsIndpZHRoIiwiY2FsY09mZnNldEhlaWdodCIsIm9mZnNldCIsInNldFZpc2liaWxpdHkiLCJ0b3AiLCJjb25maWciLCJmbGF0SGllcmFyY2h5Iiwibm9ybWFscyIsIm5vcm1hbHNTZXBhcmF0b3IiLCJkZWNsYXJlR2xvYmFscyIsImluaXRpYWxNYXAiLCJ2YWx1ZUNvbHVtbiIsImZ1bGxQYXJlbnRMZXZlbEluZm8iLCJjb2xvckZuIiwidmFsdWUiLCJwYWdlU3RhdGVJZCIsImxvYWRpbmdUZXh0IiwidHlwZUNoZWNrIiwiaGllcmFyY2h5IiwicGFyc2VUYWJsZURhdGEiLCJkcmF3TWFwIiwiZGVmYXVsdHMiLCJtaXhlZE9wdGlvbnMiLCJrZXkiLCJvcHRzIiwiSGlnaGNoYXJ0cyIsIm1hcHMiLCJyb3doZWFkZXJzIiwibG9jYWxOYW1lIiwiY29udGFpbmVySUQiLCJtYXBwb2ludENhbGxiYWNrIiwiY2IiLCJyaCIsImFnZ3JlZ2F0ZWRUYWJsZSIsInJvd0hlYWRlciIsIl9kYXRhIiwiZGF0YUl0ZW0iLCJjdXJMVkwiLCJtYXBDaGFydCIsIm1hcENvbmZpZyIsImdlbmVyYXRlVG9vbHRpcFJvdyIsImxhYmVsIiwic3ViY2VsbHMiLCJlbCIsInRleHQiLCJzZXJpZXMiLCJzdWJjZWxsIiwibWFwSUQiLCJzZXJpZXNJdGVtIiwiY29tcG9zZVNlcmllcyIsImRyaWxsZG93biIsImNvZGUiLCJnZXRQcmltYXJ5VmFsdWUiLCJtYXBEYXRhIiwiY2hhcnQiLCJtYXBUcmFuc2Zvcm1zIiwicG9zIiwiZnJvbUxhdExvblRvUG9pbnQiLCJsYXQiLCJjb29yZGluYXRlcyIsImxvbiIsInR5cGUiLCJtYXJrZXIiLCJsaW5lQ29sb3IiLCJsaW5lV2lkdGgiLCJyYWRpdXMiLCJzeW1ib2wiLCJjb2xvciIsImNvbXB1dGVDb2xvciIsIngiLCJ5Iiwic2VsZiIsImV2ZW50cyIsImNsaWNrIiwiZ2VvanNvbiIsImNyZWF0ZUN1c3RvbUdlb0pTT04iLCJkYXRhTGFiZWxzIiwiZW5hYmxlZCIsImZvcm1hdHRlciIsInBvaW50IiwidG9vbHRpcCIsInBvaW50Rm9ybWF0IiwiZ2V0VG9vbHRpcCIsImFsbEFyZWFzIiwicGFyZW50Iiwiam9pbkJ5IiwiZ2V0U2VyaWVzRGF0YSIsImdldENvb3JkaW5hdGVTZXJpZXMiLCJtYXBOYW1lIiwibG9hZE1hcCIsImFkZFNlcmllcyIsImFkZFNpbmdsZVNlcmllc0FzRHJpbGxkb3duIiwiYXBwbHlEcmlsbGRvd24iLCJhZGRTZXJpZXNBc0RyaWxsZG93biIsIlRoaXMiLCJsYW5nIiwiZHJpbGxVcFRleHQiLCJsZWdlbmQiLCJwbG90T3B0aW9ucyIsInN0YXRlcyIsIm5vcm1hbCIsImFuaW1hdGlvbiIsIm1vdXNlT3ZlciIsInNldFN0YXRlIiwibW91c2VPdXQiLCJtYXBOYXZpZ2F0aW9uIiwiYnV0dG9ucyIsInpvb21JbiIsInZlcnRpY2FsQWxpZ24iLCJ6b29tT3V0Iiwic3VidGl0bGUiLCJhbGlnbiIsImZsb2F0aW5nIiwiZHJpbGxVcEJ1dHRvbiIsInBvc2l0aW9uIiwicmVsYXRpdmVUbyIsImdldExldmVsQnlOYW1lIiwic2hvd0xvYWRpbmciLCJjaGlsZFRhYmxlIiwibHZsIiwidXBkYXRlTWFwIiwidXBkYXRlIiwiaGlkZUxvYWRpbmciLCJkcmlsbHVwYWxsIiwiaW5pdGlhbGl6ZU1hcCIsInNob3dJbkxlZ2VuZCIsImZldGNoQ2hpbGRUYWJsZSIsInBhcmVudExldmVsIiwiY3VycmVudExldmVsIiwiY291bnRyaWVzTGlzdCIsInZlcnNpb24iLCJjb3B5cmlnaHQiLCJjb3B5cmlnaHRTaG9ydCIsImNvcHlyaWdodFVybCIsImNycyIsInByb3BlcnRpZXMiLCJkZWZhdWx0Iiwic2NhbGUiLCJqc29ucmVzIiwianNvbm1hcmdpblgiLCJqc29ubWFyZ2luWSIsInhvZmZzZXQiLCJ5b2Zmc2V0IiwiZmVhdHVyZXMiLCJnZXRGZWF0dXJlcyIsImZlYXR1cmUiLCJqUXVlcnkiLCJnZXRTY3JpcHQiLCJNYXBIaWVyYXJjaHkiLCJwcm9jZXNzSGllcmFyY2h5IiwiYWRkTWFwSURzVG9IaWVyYXJjaHlMZXZlbCIsIm9ycGhhbkl0ZW1zIiwibm9ybWFsaXplIiwiX2l0ZW1IYXNQYXJlbnQiLCJfYXNzaWduUGFyZW50VG9JdGVtIiwic2hvdWxkTm9ybWFsaXplIiwicGFyc2VyIiwic3RyaW5nQXJyYXkiLCJ2YWwiLCJudW1iZXJBcnJheSIsInN0cmluZyIsIm51bWJlciIsImJvb2xlYW4iLCJpbmhlcml0TWFwTmFtZSIsImJ1YmJsZU1hcElkIiwicGFyZW50SGFzTWFwTmFtZSIsImNvbmNhdCIsIm8iLCJ0b05vcm1hbGl6ZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckNBOzs7O0FBQ0E7Ozs7OztBQUVBQSxRQUFPQyxRQUFQLEdBQWtCRCxPQUFPQyxRQUFQLElBQW1CLEVBQXJDO0FBQ0EseUJBQWFDLEtBQWIsQ0FBbUJGLE9BQU9DLFFBQTFCLEVBQW1DO0FBQ2pDRSx1Q0FEaUM7QUFFakNDO0FBRmlDLEVBQW5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDTE1BLFk7Ozs7Ozs7OztBQUVKOzs7Ozs7Ozs7Ozs7MkJBWWFDLE0sRUFBUUMsTSxFQUFRO0FBQzNCLFlBQUssSUFBSUMsQ0FBVCxJQUFjRCxNQUFkLEVBQXNCO0FBQ3BCRCxnQkFBT0UsQ0FBUCxJQUFZRCxPQUFPQyxDQUFQLENBQVo7QUFDRDtBQUNELGNBQU9GLE1BQVA7QUFDRDs7OzZCQUVjRyxLLEVBQU9DLEksRUFBTTtBQUMxQjtBQUNBLFdBQUlBLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBaEIsSUFBcUJDLE1BQU1DLE9BQU4sQ0FBY0gsS0FBSyxDQUFMLENBQWQsQ0FBekIsRUFBaUQ7QUFDL0NBLGdCQUFPQSxLQUFLLENBQUwsQ0FBUDtBQUNEO0FBQ0Q7QUFDQSxlQUFPRCxLQUFQO0FBQ0UsY0FBSyxLQUFMO0FBQ0EsY0FBSyxNQUFMO0FBQ0EsY0FBSyxPQUFMO0FBQ0VLLG1CQUFRTCxLQUFSLEVBQWVNLEtBQWYsQ0FBcUJELE9BQXJCLEVB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QUFvQjFMLEtBQUsrTixNQUFMLENBQVlyQyxLQUFaLENBQWtCdUgsTUFBbEIsQ0FBeUJqVCxLQUFLMEwsS0FBOUIsQ0FBcEI7QUFDRDtBQUNGOzs7c0NBRWdCMUwsSSxFQUFLO0FBQ3BCLGNBQU9BLEtBQUsrTixNQUFMLElBQWUvTixLQUFLK04sTUFBTCxLQUFnQixJQUEvQixJQUF1Qy9OLEtBQUsrTixNQUFMLENBQVlJLE9BQTFEO0FBQ0Q7Ozt5QkEvQ3FCO0FBQ3BCLGNBQU90SSxPQUFPQyxJQUFQLENBQVksS0FBS29ELE9BQWpCLEVBQTBCblEsTUFBMUIsR0FBbUMsQ0FBMUM7QUFDRDs7OzBDQUUyQjhRLFMsRUFBV1gsTyxFQUFTO0FBQzlDLFdBQUlnSyxJQUFJLEVBQVI7QUFDQSxXQUFJQyxjQUFjakssUUFBUXBELElBQVIsR0FBZS9NLE1BQWYsR0FBd0IsQ0FBMUM7QUFDQThRLGlCQUFVN04sT0FBVixDQUNFLGdCQUFRO0FBQ04sYUFBSW1YLFdBQUosRUFBaUJwQixhQUFhSSxTQUFiLENBQXVCblMsSUFBdkIsRUFBNkJrSixPQUE3QjtBQUNqQmdLLFdBQUVsVCxLQUFLakUsRUFBUCxJQUFhaUUsSUFBYjtBQUNELFFBSkg7QUFLQSxjQUFPa1QsQ0FBUDtBQUNEOzs7Ozs7bUJBbEZrQm5CLFk7Ozs7Ozs7QUNIckIsMEM7Ozs7OztBQ0FBLDBDOzs7Ozs7QUNBQSwwQzs7Ozs7OztBQ0FBLDBDIiwiZmlsZSI6ImRyaWxsZG93bi1ucHMtbWFwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODg3YWExNDVjNjNmYzUwMzQ2YzkiLCJcbmltcG9ydCBEcmlsbGRvd25NYXAgZnJvbSBcIi4vRHJpbGxkb3duTWFwXCI7XG5pbXBvcnQgUmVwb3J0YWxCYXNlIGZyb20gXCJyLXJlcG9ydGFsLWJhc2VcIjtcblxud2luZG93LlJlcG9ydGFsID0gd2luZG93LlJlcG9ydGFsIHx8IHt9O1xuUmVwb3J0YWxCYXNlLm1peGluKHdpbmRvdy5SZXBvcnRhbCx7XG4gIERyaWxsZG93bk1hcCxcbiAgUmVwb3J0YWxCYXNlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgRHJpbGxkb3duTWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImNsYXNzIFJlcG9ydGFsQmFzZSB7XG5cbiAgLyoqXG4gICAqIENvcGllcyBwcm9wcyBmcm9tIGEgc291cmNlIG9iamVjdCB0byBhIHRhcmdldCBvYmplY3QuXG4gICAqXG4gICAqIE5vdGUsIHRoaXMgbWV0aG9kIHVzZXMgYSBzaW1wbGUgYGZvci4uLmluYCBzdHJhdGVneSBmb3IgZW51bWVyYXRpbmdcbiAgICogcHJvcGVydGllcy4gIFRvIGVuc3VyZSBvbmx5IGBvd25Qcm9wZXJ0aWVzYCBhcmUgY29waWVkIGZyb20gc291cmNlXG4gICAqIHRvIHRhcmdldCBhbmQgdGhhdCBhY2Nlc3NvciBpbXBsZW1lbnRhdGlvbnMgYXJlIGNvcGllZCwgdXNlIGBleHRlbmRgLlxuICAgKlxuICAgKiBAbWV0aG9kIG1peGluXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgU291cmNlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAgICogQHJldHVybiB7T2JqZWN0fSBUYXJnZXQgb2JqZWN0IHRoYXQgd2FzIHBhc3NlZCBhcyBmaXJzdCBhcmd1bWVudC5cbiAgICovXG4gIHN0YXRpYyBtaXhpbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGZvciAodmFyIGkgaW4gc291cmNlKSB7XG4gICAgICB0YXJnZXRbaV0gPSBzb3VyY2VbaV07XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBzdGF0aWMgX2xvZ2dlcihsZXZlbCwgYXJncykge1xuICAgIC8vIGFjY2VwdCBbJ2ZvbycsICdiYXInXSBhbmQgW1snZm9vJywgJ2JhciddXVxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICBhcmdzID0gYXJnc1swXTtcbiAgICB9XG4gICAgLy8gb25seSBhY2NlcHQgbG9nZ2luZyBmdW5jdGlvbnNcbiAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgIGNhc2UgJ2xvZyc6XG4gICAgICBjYXNlICd3YXJuJzpcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgY29uc29sZVtsZXZlbF0uYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfbG9nKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICB0aGlzLl9sb2dnZXIoJ2xvZycsIGFyZ3MpO1xuICB9XG5cbiAgc3RhdGljIF93YXJuKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICB0aGlzLl9sb2dnZXIoJ3dhcm4nLCBhcmdzKTtcbiAgfVxuXG4gIHN0YXRpYyBfZXJyb3IoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIHRoaXMuX2xvZ2dlcignZXJyb3InLCBhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmFtZWQgZXZlbnQgd2l0aCBgbmFtZWBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBuYW1lIG9mIHRoZSBldmVudFxuICAgKiBAcmV0dXJuIHtFdmVudH0gUmV0dXJucyBhIGNyZWF0ZWQgZXZlbnRcbiAgICogKi9cbiAgc3RhdGljIG5ld0V2ZW50KG5hbWUpe1xuICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGV2ZW50LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlKTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICAvKipcbiAgICogSW5zcGVjdHMgaWYgdGhlIGN1cnJlbnQgc3RyaW5nIG1pZ2h0IGJlIGNvbnZlcnRlZCB0byBudW1iZXIgYW5kIHJlbmRlcnMgaXQgYXMgbnVtYmVyLiBJZiBzdHJpbmcgbGVuZ3RoIGlzIDAsIHJldHVybnMgYG51bGxgLiBJZiBub25lIGFwcGxpZXMgcmV0dXJucyB0aGUgc3RyaW5nIGFzIGlzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIC0gdmFsdWUgb2YgdGhlIGNlbGwgaWYgbm90IEhUTUwgY29udGVudHNcbiAgICogQHJldHVybiB7TnVtYmVyfG51bGx8U3RyaW5nfVxuICAgKiAqL1xuICBzdGF0aWMgaXNOdW1iZXIoc3RyKXtcbiAgICBpZighaXNOYU4ocGFyc2VGbG9hdChzdHIpKSl7XG4gICAgICBzdHIgPSBzdHIucmVwbGFjZSgvLC9pLCcnKTsvLyByZW1vdmUgdW5uZWNlc3NhcnkgY29tbWEgYXMgYSBkZWxpbWl0ZXIgZm9yIHRob3VzYW5kcyBmcm9tIGRhdGEuXG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xuICAgIH0gZWxzZSBpZihzdHIubGVuZ3RoPT0wKXtyZXR1cm4gbnVsbH0gZWxzZSB7cmV0dXJuIHN0cn1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gWEhSIHdyYXBwZWQgaW4gYSBQcm9taXNlXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gVVJMIC0gdXJsIHRvIHNlbmQgYSBgR0VUYCByZXF1ZXN0IHRvXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgYSB0aGVuLWFibGUgcHJvbWlzZSB3aXRoIGBYTUxIdHRwUmVxdWVzdC5yZXNwb25zZVRleHRgXG4gICAqICovXG4gIHN0YXRpYyBwcm9taXNlUmVxdWVzdChVUkwpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignR0VUJywgVVJMLCB0cnVlKTtcbiAgICAgIHhoci5vbmxvYWQgPSBlPT57eGhyLnN0YXR1cyA9PSAyMDA/cmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTpyZWplY3QoRXJyb3IoYCR7eGhyLnN0YXR1c306ICR7eGhyLnN0YXR1c1RleHR9YCkpO31cbiAgICAgIHhoci5vbmVycm9yID0gZT0+e3JlamVjdChlKX1cbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHZhcmlhYmxlIGxpc3RlZCBpbiBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtIHshU3RyaW5nfSB2YXJpYWJsZSAtIHZhcmlhYmxlIG5hbWUgdG8gZ2V0IHZhbHVlIGZvclxuICAgKiBAcGFyYW0ge1N0cmluZz19IFtxdWVyeT13aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKV0gLSB0aGUgcXVlcnkgc3RyaW5nIHRvIHNlYXJjaCB2YXJpYWJsZSBmb3IgaW5cbiAgICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm5zIHZhbHVlIGZvciB0aGUgdmFyaWFibGVcbiAgICogKi9cbiAgc3RhdGljIGdldFF1ZXJ5VmFyaWFibGUodmFyaWFibGUscXVlcnk9d2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpe1xuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuICAgIGZvciAodmFyIGk9MDtpPHZhcnMubGVuZ3RoO2krKykge1xuICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgIGlmKChwYWlyWzBdKS50b0xvd2VyQ2FzZSgpID09IHZhcmlhYmxlLnRvTG93ZXJDYXNlKCkpe3JldHVybiBwYWlyWzFdO31cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0YWxCYXNlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItcmVwb3J0YWwtYmFzZS9zcmMvcmVwb3J0YWwtYmFzZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDIxLjA5LjIwMTYuXHJcbiAqL1xyXG5pbXBvcnQgUmVwb3J0YWxCYXNlIGZyb20gXCJyLXJlcG9ydGFsLWJhc2VcIjtcclxuLy9pbXBvcnQgVGFibGVEYXRhUm93TWV0YSBmcm9tIFwiLi9UYWJsZURhdGFSb3dNZXRhXCI7XHJcblxyXG4vKipcclxuICogQSBiYXNlIGNsYXNzIGZvciBzdHJpcHBpbmcgZGF0YSBmcm9tIEhUTUwgdGFibGVzXHJcbiAqICovXHJcbmNsYXNzIFRhYmxlRGF0YSB7XHJcbiAgLyoqXHJcbiAgICogRGV0ZWN0cyBpZiB0aGUgZGF0YXNldCBpcyBtdWx0aS1kaW1lbnRpb25hbCBhbmQgc2V0cyBjbGFzc2VzIG9uIGl0ZW1zOiBhIHJvd3NwYW5uaW5nIGNlbGwgZ2V0cyBhIGAuYmxvY2tDZWxsYCBhbmQgdGhlIHJvdyBjb250YWluaW5nIGl0IGEgYC5maXJzdEluQmxvY2tgXHJcbiAgICogX19Eb2Vzbid0IHdvcmsgd2l0aCBgSG9yaXpvbnRhbCBQZXJjZW50c2AgZW5hYmxlZCFfX1xyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gc291cmNlIC0gc291cmNlIHRhYmxlXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyBpZiB0aGUgZGF0YSBpbiB0YWJsZSBpcyBtdWx0aS1kaW1lbnRpb25hbFxyXG4gICAqICovXHJcbiAgc3RhdGljIGRldGVjdE11bHRpZGltZW5zaW9uYWwoc291cmNlKXtcclxuICAgIGxldCBtdWx0aWRpbWVuc2lvbmFsID0gZmFsc2U7XHJcbiAgICBsZXQgYmxvY2tzID0gc291cmNlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChgdGFibGUjJHtzb3VyY2UuaWR9PnRib2R5PnRyPnRkOm50aC1jaGlsZCgxKVtyb3dzcGFuXWApO1xyXG4gICAgaWYoYmxvY2tzLmxlbmd0aD4wKXtcclxuICAgICAgbXVsdGlkaW1lbnNpb25hbCA9IHRydWU7XHJcbiAgICAgIFtdLnNsaWNlLmNhbGwoYmxvY2tzKS5mb3JFYWNoKGJsb2NrQ2VsbD0+e1xyXG4gICAgICAgIGJsb2NrQ2VsbC5jbGFzc0xpc3QuYWRkKCdibG9ja0NlbGwnKTtcclxuICAgICAgICBibG9ja0NlbGwucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdmaXJzdEluQmxvY2snKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbXVsdGlkaW1lbnNpb25hbFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0cmFjdHMgZGF0YSBmcm9tIGEgZ2l2ZW4gY2VsbC4gT3ZlcnJpZGUgaW4gYW4gaW5oZXJpdGVkIGNsYXNzIGlmIHlvdSBuZWVkIHRvIGFkZCBhbnkgbWV0YWRhdGEgdG8gaXQuXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVDZWxsRWxlbWVudH0gY2VsbCAtIGNlbGwgZWxlbWVudCB0byBoYXZlIGRhdGEgc3RyaXBwZWQgb2ZmIGl0XHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVDZWxsRWxlbWVudH0gcm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGl0J3MgaW5cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUNlbGxFbGVtZW50fSBjb2x1bW5JbmRleCAtIGluZGV4IG9mIHRoZSBjb2x1bW4gaXQncyBpblxyXG4gICAqIEByZXR1cm5zIHs/U3RyaW5nfD9OdW1iZXJ9IFJldHVybnMgYSBgU3RyaW5nYCwgYSBgTnVtYmVyYCBvciBhIGBudWxsYCAoaWYgZGF0YSBpcyBhYnNlbnQgaW4gdGhlIGNlbGwgb3IgaXRzIHRleHQgY29udGVudCBib2lscyBkb3duIHRvIGFuIGVtcHR5IHN0cmluZyAtIGkuZS4gdGhlcmUgYXJlIG5vIGNoYXJhY3RlcnMgaW4gdGhlIGNlbGwsIG9ubHkgSFRNTCB0YWdzKVxyXG4gICAqICovXHJcbiAgc3RhdGljIHByZXBhcmVEYXRhQ2VsbChjZWxsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpe1xyXG4gICByZXR1cm4gUmVwb3J0YWxCYXNlLmlzTnVtYmVyKGNlbGwudGV4dENvbnRlbnQudHJpbSgpKTtcclxuICAgIC8qcmV0dXJuIHtcclxuICAgICAgICBjZWxsLFxyXG4gICAgICAgIGRhdGE6IFJlcG9ydGFsQmFzZS5pc051bWJlcihjZWxsLnRleHRDb250ZW50LnRyaW0oKSksXHJcbiAgICAgICAgcm93SW5kZXgsXHJcbiAgICAgICAgY29sdW1uSW5kZXhcclxuICAgICAgfSovXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHVuaXZlcnNhbCBkYXRhLWV4dHJhY3Rpb24gZnVuY3Rpb24uIEl0IHN0cmlwcyBkYXRhIGZyb20gYSB0YWJsZSdzIGJvZHkuIERhdGEgY2FuIGJlIHN0cmlwcGVkIGJ5IHJvd3MgKGhvcml6b250YWxseSkgb3IgYnkgY29sdW1ucyAodmVydGljYWxseSkgd2hpY2ggaXMgY29udHJvbGxlZCBieSBgZGlyZWN0aW9uYC4gSXQgYWNjb3VudHMgZm9yIGEgc3Bhbm5pbmcgYmxvY2sgY2VsbCBhbmQgbWF5IGV4Y2x1ZGUgaXQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHRvIGNvbmZpZ3VyZSB0aGUgd2F5IGRhdGEgaXMgc3RyaXBwZWQgb2ZmIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgdGhhdCB3aWxsIGJlIGFuIGlucHV0IGZvciBkYXRhIHN0cmlwcGluZ1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nPX0gb3B0aW9ucy5kaXJlY3Rpb249J3JvdycgLSBkaXJlY3Rpb24gaW4gd2hpY2ggZGF0YSBzdHJpcHBpbmcgd2lsbCBvY2N1cjogYHJvd2Agc3RyaXBzIGFjcm9zcyByb3dzIGFuZCBwcmVzZW50cyBhbiBhcnJheSB3aGVyZSBlYWNoIGFycmF5IGl0ZW0gaXMgYW4gYXJyYXkgb2YgY2VsbCB2YWx1ZXMuIGBjb2x1bW5gIHN0cmlwcyB2YWx1ZXMgdmVydGljYWx5IGluIGEgY29sdW1uLCB0aGUgcmVzdWx0aW5nIGFycmF5IHdpbGwgY29udGFpbiBhcnJheXMgKHBlciBjb2x1bW4pIHdpdGggdmFsdWVzIHJlc2VtYmxpbmcgbm9ybWFsaXplZCBkYXRhIGZvciBjZWxscyBpbiB0aGUgY29sdW1uXHJcbiAgICogQHBhcmFtIHtCb29sZWFuPX0gW29wdGlvbnMuZXhjbHVkZUJsb2NrPXRydWVdIC0gaWYgdGFibGUgY29udGFpbnMgYmxvY2sgY2VsbHMgdGhhdCByb3dzcGFuIGFjcm9zcyBzZXZlcmFsIHJvd3MsIHdlIG1pZ2h0IG5lZWQgdG8gZXhjbHVkZSB0aG9zZSBmcm9tIGFjdHVhbCBkYXRhXHJcbiAgICogQHBhcmFtIHtBcnJheXxOdW1iZXJ9IFtvcHRpb25zLmV4Y2x1ZGVDb2x1bW5zXSAtIGlmIHRhYmxlIGNvbnRhaW5zIGNvbHVtbnMgdGhhdCBhcmUgbm90IHRvIGJlIGluIGRhdGEsIHRoZW4gcGFzcyBhIHNpbmdsZSBpbmRleCBvciBhbiBhcnJheSBvZiBjZWxsIGluZGljZXMgKDAtYmFzZWQpLiBZb3UgbmVlZCB0byBjb3VudCBjb2x1bW5zIG5vdCBieSBoZWFkZXJzIGJ1dCBieSB0aGUgY2VsbHMgaW4gcm93cy5cclxuICAgKiBAcGFyYW0ge0FycmF5fE51bWJlcn0gW29wdGlvbnMuZXhjbHVkZVJvd3NdIC0gaWYgdGFibGUgY29udGFpbnMgcm93cyB0aGF0IGFyZSBub3QgdG8gYmUgaW4gZGF0YSwgdGhlbiBwYXNzIGEgc2luZ2xlIGluZGV4IG9yIGFuIGFycmF5IG9mIHJvdyBpbmRpY2VzICgwLWJhc2VkKS4gWW91IG5lZWQgdG8gY291bnQgb25seSByb3dzIHRoYXQgY29udGFpbiBkYXRhLCBub3QgdGhlIHRhYmxlLWhlYWRlciByb3dzLlxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbj19IG9wdGlvbnMubXVsdGlkaW1lbnNpb25hbD1mYWxzZSAtIHdoZXRoZXIgdGhlIHRhYmxlIGhhcyBhZ2dyZWdhdGluZyBjZWxscyB0aGF0IGFnZ3JlZ2F0ZSByb3doZWFkZXJzLiBSZXN1bHQgb2Yge0BsaW5rIFRhYmxlRGF0YSNkZXRlY3RNdWx0aWRpbWVuc2lvbmFsfSBtYXkgYmUgcGFzc2VkIGhlcmUgdG8gYXV0b21hdGljYWxseSBjYWxjdWxhdGUgaWYgaXQgaGFzIGFnZ3JlZ2F0aW5nIGNlbGxzLlxyXG4gICAqIEByZXR1cm5zIHtBcnJheX0gcmV0dXJucyBkYXRhIGFycmF5LlxyXG4gICAqICovXHJcbiAgc3RhdGljIGdldERhdGEob3B0aW9ucyl7XHJcbiAgICBsZXQge3NvdXJjZSxleGNsdWRlQmxvY2s9dHJ1ZSxleGNsdWRlQ29sdW1ucyxleGNsdWRlUm93cyxkaXJlY3Rpb249J3JvdycsbXVsdGlkaW1lbnNpb25hbD1mYWxzZX09b3B0aW9ucztcclxuICAgIGxldCBkYXRhID0gW107XHJcbiAgICBpZihzb3VyY2UgJiYgc291cmNlLnRhZ05hbWUgPT0gJ1RBQkxFJyl7XHJcbiAgICAgIGxldCByb3dzID0gW10uc2xpY2UuY2FsbChzb3VyY2UucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKGB0YWJsZSMke3NvdXJjZS5pZH0+dGJvZHk+dHJgKSk7XHJcbiAgICAgIGlmKHJvd3MubGVuZ3RoPjApe1xyXG4gICAgICAgIGxldCB0ZW1wQXJyYXk9W107XHJcbiAgICAgICAgLy8gYWNjb3VudCBmb3IgYSBuZWdhdGl2ZSByb3cgbnVtYmVyIChgLTFgKSBtZWFuaW5nIGxhc3Qgcm93XHJcbiAgICAgICAgaWYodHlwZW9mIGV4Y2x1ZGVSb3dzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBpZih0eXBlb2YgZXhjbHVkZVJvd3MgPT0gJ251bWJlcicpe1xyXG4gICAgICAgICAgICAvLyBmb3Igbm9uLWJsb2NrIHJvd3MgaW4gbXVsdGlkaW1lbnNpb25hbFxyXG4gICAgICAgICAgICBpZihleGNsdWRlUm93czwwKXsgLy8gYWNjb3VudCBmb3IgYSBuZWdhdGl2ZSBjb2x1bW4gbnVtYmVyIChlLmcuYC0xYCkgbWVhbmluZyBsYXN0IGNvbHVtblxyXG4gICAgICAgICAgICAgIGV4Y2x1ZGVSb3dzPSByb3dzLmxlbmd0aCtleGNsdWRlUm93cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dzLnNwbGljZShleGNsdWRlUm93cywxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZXhjbHVkZVJvd3MpKXtcclxuICAgICAgICAgICAgZXhjbHVkZVJvd3Muc29ydCgoYSxiKT0+e3JldHVybiBhPmI/MTotMX0pLnJldmVyc2UoKTsgLy9zb3J0IHRvIHNwbGljZSBmcm9tIHRoZSBlbmQgb2YgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIGV4Y2x1ZGVSb3dzLmZvckVhY2goaT0+e1xyXG4gICAgICAgICAgICAgIGlmKGk+PTApe1xyXG4gICAgICAgICAgICAgICAgcm93cy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcm93cy5zcGxpY2Uocm93cy5sZW5ndGgraSwxKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm93cy5mb3JFYWNoKChyb3cscm93SW5kZXgpPT57XHJcbiAgICAgICAgICBpZihtdWx0aWRpbWVuc2lvbmFsKXtcclxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgYHRlbXBBcnJheWAgaXMgbm90IGVtcHR5IGFuZCBwdXNoIGl0IHRvIHRoZSBgZGF0YWAgYXJyYXksIGJlY2F1c2Ugd2UndmUgZW5jb3VudGVyZWQgYSBuZXcgYmxvY2ssIHNvIHRoZSBvbGQgYmxvY2sgaGFzIHRvIGJlIHB1c2hlZCB0byBkYXRhLiBUaGVuIHdlIG5lZWQgdG8gY3JlYXRlIGEgbmV3IGJsb2NrIGFycmF5IGFuZCBwdXNoIHRoZXJlXHJcbiAgICAgICAgICAgIGlmKHJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpcnN0SW5CbG9jaycpKXtcclxuICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHRlbXBBcnJheSkgJiYgdGVtcEFycmF5Lmxlbmd0aD4wKXtkYXRhLnB1c2godGVtcEFycmF5KTt9XHJcbiAgICAgICAgICAgICAgdGVtcEFycmF5ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGlyZWN0aW9uPT0ncm93JyAmJiAhQXJyYXkuaXNBcnJheSh0ZW1wQXJyYXlbdGVtcEFycmF5Lmxlbmd0aF0pKSB7IC8vIGlmIGEgcm93IGluIGFuIGFycmF5IGRvZXNuJ3QgZXhpc3QgY3JlYXRlIGl0XHJcbiAgICAgICAgICAgIHRlbXBBcnJheVt0ZW1wQXJyYXkubGVuZ3RoXSA9IFtdO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGNhbGN1bGF0ZSB3aGljaCBjZWxscyB0byBleGNsdWRlXHJcbiAgICAgICAgICBsZXQgY2VsbHMgPSBbXS5zbGljZS5jYWxsKHJvdy5jaGlsZHJlbik7XHJcbiAgICAgICAgICBsZXQgdGVtcF9leGNsdWRlQ29sdW1ucyA9IGV4Y2x1ZGVDb2x1bW5zO1xyXG4gICAgICAgICAgaWYodHlwZW9mIHRlbXBfZXhjbHVkZUNvbHVtbnMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodHlwZW9mIHRlbXBfZXhjbHVkZUNvbHVtbnMgPT0gJ251bWJlcicpe1xyXG4gICAgICAgICAgICAgIC8vIGZvciBub24tYmxvY2sgcm93cyBpbiBtdWx0aWRpbWVuc2lvbmFsXHJcbiAgICAgICAgICAgICAgaWYobXVsdGlkaW1lbnNpb25hbCAmJiAhcm93LmNsYXNzTGlzdC5jb250YWlucygnZmlyc3RJbkJsb2NrJykgJiYgIXRlbXBfZXhjbHVkZUNvbHVtbnM8MCl7XHJcbiAgICAgICAgICAgICAgICB0ZW1wX2V4Y2x1ZGVDb2x1bW5zPXRlbXBfZXhjbHVkZUNvbHVtbnMrMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYodGVtcF9leGNsdWRlQ29sdW1uczwwKXsgLy8gYWNjb3VudCBmb3IgYSBuZWdhdGl2ZSBjb2x1bW4gbnVtYmVyIChlLmcuYC0xYCkgbWVhbmluZyBsYXN0IGNvbHVtblxyXG4gICAgICAgICAgICAgICAgdGVtcF9leGNsdWRlQ29sdW1ucz0gY2VsbHMubGVuZ3RoK3RlbXBfZXhjbHVkZUNvbHVtbnM7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNlbGxzLnNwbGljZSh0ZW1wX2V4Y2x1ZGVDb2x1bW5zLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodGVtcF9leGNsdWRlQ29sdW1ucykpe1xyXG4gICAgICAgICAgICAgIHRlbXBfZXhjbHVkZUNvbHVtbnMuc29ydCgoYSxiKT0+e3JldHVybiBhPmI/MTotMX0pLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICB0ZW1wX2V4Y2x1ZGVDb2x1bW5zLmZvckVhY2goaT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoaT49MCl7XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxzLnNwbGljZShtdWx0aWRpbWVuc2lvbmFsICYmICFyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaXJzdEluQmxvY2snKT9pKzE6aSwxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxzLnNwbGljZShjZWxscy5sZW5ndGgraSwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB3ZSB3YW50IHRvIHJ1biB0aGlzIGV2ZXJ5IHJvdyBiZWNhdXNlIG51bWJlciBvZiBjZWxscyBpbiBlYWNoIHJvdyBtYXkgZGlmZmVyIGFuZCB3ZSB3YW50IHRvIGV4Y2x1ZGUgdGhlIGxhc3Qgb25lXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGlyZWN0aW9uID09ICdzdHJpbmcnICYmIGRpcmVjdGlvbiA9PSAncm93JykgeyAvL2lmIHdlIHN0cmlwIGRhdGEgaG9yaXpvbnRhbGx5IGJ5IHJvd1xyXG4gICAgICAgICAgICAgIGlmKCEobXVsdGlkaW1lbnNpb25hbCAmJiBleGNsdWRlQmxvY2sgJiYgY2VsbC5yb3dTcGFuPjEpKXsgLy8gaWYgaXQncyBhIGJsb2NrIGNlbGwgd2UnZCBleGNsdWRlIGl0IGZyb20gZGF0YVxyXG4gICAgICAgICAgICAgICAgdGVtcEFycmF5W3RlbXBBcnJheS5sZW5ndGgtMV0ucHVzaCh0aGlzLnByZXBhcmVEYXRhQ2VsbChjZWxsLHJvd0luZGV4LGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkaXJlY3Rpb24gPT0gJ3N0cmluZycgJiYgZGlyZWN0aW9uID09ICdjb2x1bW4nKSB7IC8vaWYgd2Ugc3RyaXAgZGF0YSB2ZXJ0aWNhbGx5IGJ5IGNvbHVtblxyXG4gICAgICAgICAgICAgIGxldCByZWFsSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBpZighKG11bHRpZGltZW5zaW9uYWwgJiYgZXhjbHVkZUJsb2NrICYmIGNlbGwucm93U3Bhbj4xKSl7IC8vZXhjbHVkZSBibG9jayBjZWxsXHJcbiAgICAgICAgICAgICAgICByZWFsSW5kZXggKz0gIXJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpcnN0SW5CbG9jaycpPyAwIDogLTE7IC8vIG9mZnNldCBjZWxsIHRoYXQgZm9sbG93cyBibG9jayBjZWxsIG9uZSBwb3NpdGlvbiBiYWNrXHJcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGVtcEFycmF5W3JlYWxJbmRleF0pKSB7IC8vY3JlYXRlIGNvbHVtbiBhcnJheSBmb3IgY3VycmVudCBjb2x1bW4gaWYgbm90IGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgICB0ZW1wQXJyYXlbcmVhbEluZGV4XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGVtcEFycmF5W3JlYWxJbmRleF0ucHVzaCh0aGlzLnByZXBhcmVEYXRhQ2VsbChjZWxsLHJvd0luZGV4LHJlYWxJbmRleCkpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkaXJlY3Rpb24gaGFzIHRvYmUgYSBTdHJpbmc9PWByb3cgfCBjb2x1bW5gLCBub3QgYSAke2RpcmVjdGlvbn0nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3dlIG5lZWQgdG8gcHVzaCB0aGUgbGFzdCBibG9jayBBcnJheSBiZWNhdXNlIHRoZXJlJ2xsIGJlIG5vIGAuZmlyc3RJbkJsb2NrYCBhbnltb3JlIHRvIGRvIHRoYXRcclxuICAgICAgICBpZihtdWx0aWRpbWVuc2lvbmFsICYmIEFycmF5LmlzQXJyYXkodGVtcEFycmF5KSAmJiB0ZW1wQXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgZGF0YS5wdXNoKHRlbXBBcnJheSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGF0YSA9IHRlbXBBcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB0YWJsZSMke3NvdXJjZS5pZH0ncyBib2R5IG11c3QgY29udGFpbiByb3dzYCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NvdXJjZSBtdXN0IGJlIGRlZmluZWQgYW5kIGJlIGEgdGFibGUnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxlRGF0YVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvdGFibGUtZGF0YS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDE3LjA4LjIwMTYuXHJcbiAqL1xyXG4vKipcclxuICogQHByb3BlcnR5IHtIVE1MVGFibGVSb3dFbGVtZW50fSByb3cgLSByZWZlcmVuY2UgdG8gdGhlIGA8dHI+YCBlbGVtZW50XHJcbiAqIEBwcm9wZXJ0eSB7P1N0cmluZ30gaWQgLSBpbnRlcm5hbCBSZXBvcnRhbCBpZCBmb3IgdGhlIHJvd2hlYWRlciBpbiB0aGUgcm93XHJcbiAqIEBwcm9wZXJ0eSB7IUhUTUxUYWJsZUNlbGxFbGVtZW50fSBuYW1lQ2VsbCAtIHJlZmVyZW5jZSB0byB0aGUgYDx0ZD5gIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgcm93aGVhZGVyIGxhYmVsL25hbWVcclxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtuYW1lPW5hbWVDZWxsLnRleHRDb250ZW50XSAtIGxhYmVsIG9mIHRoZSByb3doZWFkZXIuXHJcbiAqIEBwcm9wZXJ0eSB7P09iamVjdH0gW2Jsb2NrPW51bGxdIC0gdGhlIGJsb2NrIHRoZSByb3cgYmVsb25ncyB0b1xyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGZpcnN0SW5CbG9jayAtIHRoaXMgYHJvd2AgaXMgZmlyc3QgaW4gdGhlIGBibG9ja2AsIHdoaWNoIG1lYW5zIGl0IGNvbnRhaW5zIHRoZSBmaXJzdCBjZWxsIGFzIGEgYmxvY2sgY2VsbFxyXG4gKiAqL1xyXG5jbGFzcyBBZ2dyZWdhdGVkVGFibGVSb3dNZXRhIHtcclxuICAvKipcclxuICAgKiBCdWlsZHMgYSBwcm90b3R5cGUgZm9yIGVhY2ggcm93IG9mIGFuIEFnZ3JlZ2F0ZWQgVGFibGVcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZVJvd0VsZW1lbnR9IHJvdyAtIHJlZmVyZW5jZSB0byB0aGUgYDx0cj5gIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gez9TdHJpbmd9IGlkIC0gaW50ZXJuYWwgUmVwb3J0YWwgaWQgZm9yIHRoZSByb3doZWFkZXIgaW4gdGhlIHJvd1xyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUNlbGxFbGVtZW50fSBuYW1lQ2VsbCAtIHJlZmVyZW5jZSB0byB0aGUgYDx0ZD5gIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgcm93aGVhZGVyIGxhYmVsL25hbWVcclxuICAgKiBAcGFyYW0ge1N0cmluZz19IFtuYW1lPW5hbWVDZWxsLnRleHRDb250ZW50XSAtIGxhYmVsIG9mIHRoZSByb3doZWFkZXIuXHJcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBbYmxvY2s9bnVsbF0gLSB0aGUgYmxvY2sgdGhlIHJvdyBiZWxvbmdzIHRvXHJcbiAgICogKi9cclxuICBjb25zdHJ1Y3Rvcih7cm93LCBpZD1udWxsLCBuYW1lQ2VsbCwgbmFtZSwgYmxvY2s9bnVsbH09e30pe1xyXG4gICAgLyoqKiBAcHJvcGVydHkge0hUTUxUYWJsZVJvd0VsZW1lbnR9IHJvdyAtIHJlZmVyZW5jZSB0byB0aGUgYDx0cj5gIGVsZW1lbnQqL1xyXG4gICAgdGhpcy5yb3cgPSByb3c7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLm5hbWVDZWxsID0gbmFtZUNlbGw7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lIHx8IG5hbWVDZWxsLnRleHRDb250ZW50LnRyaW0oKTtcclxuICAgIHRoaXMuYmxvY2sgPSBibG9jaztcclxuICAgIHRoaXMuZmlyc3RJbkJsb2NrID0gYmxvY2shPW51bGwgJiYgdGhpcy5yb3cucm93SW5kZXggPT09IHRoaXMuYmxvY2suY2VsbC5wYXJlbnROb2RlLnJvd0luZGV4O1xyXG4gIH1cclxuICAvKmdldCBmaXJzdEluQmxvY2soKXtcclxuICAgIHJldHVybiB0aGlzLl9maXJzdEluQmxvY2s7XHJcbiAgfVxyXG4gIHNldCBmaXJzdEluQmxvY2sodmFsKXtcclxuICAgIHRoaXMuX2ZpcnN0SW5CbG9jayA9IHZhbDtcclxuICAgIHZhbD90aGlzLnJvdy5jbGFzc0xpc3QuYWRkKCdmaXJzdEluQmxvY2snKTp0aGlzLnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdmaXJzdEluQmxvY2snKTtcclxuICB9Ki9cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBZ2dyZWdhdGVkVGFibGVSb3dNZXRhXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1hZ2dyZWdhdGVkLXRhYmxlL3NyYy9hZ2dyZWdhdGVkLXRhYmxlLXJvdy1tZXRhLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMjcuMDkuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgVGFibGVEYXRhIGZyb20gJy4vdGFibGUtZGF0YSc7XHJcbmltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xyXG5pbXBvcnQgVGFibGVDb2x1bW5zIGZyb20gXCJyLXRhYmxlLWNvbHVtbnNcIjtcclxuaW1wb3J0IFNvcnRUYWJsZSBmcm9tIFwici1zb3J0LXRhYmxlL3NyYy9zb3J0LXRhYmxlXCI7XHJcbmltcG9ydCBUYWJsZUZsb2F0aW5nSGVhZGVyIGZyb20gXCJyLXRhYmxlLWZsb2F0aW5nLWhlYWRlci9zcmMvdGFibGUtZmxvYXRpbmctaGVhZGVyXCI7XHJcblxyXG5sZXQgc3R5bGVzID0gcmVxdWlyZSgnci1zb3J0LXRhYmxlL3NyYy9zb3J0LXRhYmxlLXN0eWxlcy5jc3MnKTtcclxubGV0IGFnZ3JlZ2F0ZWRUYWJsZUNTUyA9IHJlcXVpcmUoJy4vYWdncmVnYXRlZC10YWJsZS5jc3MnKTtcclxuXHJcbi8qKlxyXG4gKiBBIGJhc2UgY2xhc3MgZm9yIGFnZ3JlZ2F0ZWQgdGFibGVzLiBNdWx0aWRpbWVuc2lvbmFsIHByb3BlcnR5IG9mIGRhdGEgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkLCB0aHVzIHJlbW92ZWQgZnJvbSBwYXJhbXMuXHJcbiAqIEBleHRlbmRzIFRhYmxlRGF0YVxyXG4gKiAqL1xyXG5jbGFzcyBBZ2dyZWdhdGVkVGFibGUgZXh0ZW5kcyBUYWJsZURhdGEge1xyXG4gIC8qXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHRvIGNvbmZpZ3VyZSB0aGUgd2F5IGRhdGEgaXMgc3RyaXBwZWQgb2ZmIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgdGhhdCB3aWxsIGJlIGFuIGlucHV0IGZvciBkYXRhIHN0cmlwcGluZ1xyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gW29wdGlvbnMucmVmU291cmNlXSAtIGEgcmVmZXJlbmNlIHRvIGEgZmxvYXRpbmcgaGVhZGVyLCBpZiBhbnlcclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucm93aGVhZGVyQ29sdW1uSW5kZXg9MF0gLSAwLWJhc2VkIGluZGV4IG9mIHRoZSBjb2x1bW4gdGhhdCB3ZSBuZWVkIHRvIGNoZWNrIGFnYWluc3QgdG8gc2VlIGlmIGl0J3MgYSBtdWx0aWRpbWVudGlvbmFsIHRhYmxlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0PX0gW29wdGlvbnMuZGVmYXVsdEhlYWRlclJvdz0tMV0gLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGhhdmUgc29ydGluZyBlbmFibGVkIGZvciBjb2x1bW5zLiBJZiBgLTFgIHRoZW4gbGFzdCByb3cuXHJcbiAgICogQHBhcmFtIHtTdHJpbmc9fSBvcHRpb25zLmRhdGFTdHJpcERpcmVjdGlvbj0ncm93JyAtIGRpcmVjdGlvbiBpbiB3aGljaCBkYXRhIHN0cmlwcGluZyB3aWxsIG9jY3VyOiBgcm93YCBzdHJpcHMgYWNyb3NzIHJvd3MgYW5kIHByZXNlbnRzIGFuIGFycmF5IHdoZXJlIGVhY2ggYXJyYXkgaXRlbSBpcyBhbiBhcnJheSBvZiBjZWxsIHZhbHVlcy4gYGNvbHVtbmAgc3RyaXBzIHZhbHVlcyB2ZXJ0aWNhbHkgaW4gYSBjb2x1bW4sIHRoZSByZXN1bHRpbmcgYXJyYXkgd2lsbCBjb250YWluIGFycmF5cyAocGVyIGNvbHVtbikgd2l0aCB2YWx1ZXMgcmVzZW1ibGluZyBub3JtYWxpemVkIGRhdGEgZm9yIGNlbGxzIGluIHRoZSBjb2x1bW5cclxuICAgKiBAcGFyYW0ge0Jvb2xlYW49fSBbb3B0aW9ucy5leGNsdWRlQmxvY2s9dHJ1ZV0gLSBpZiB0YWJsZSBjb250YWlucyBibG9jayBjZWxscyB0aGF0IHJvd3NwYW4gYWNyb3NzIHNldmVyYWwgcm93cywgd2UgbWlnaHQgbmVlZCB0byBleGNsdWRlIHRob3NlIGZyb20gYWN0dWFsIGRhdGFcclxuICAgKiBAcGFyYW0ge0FycmF5fE51bWJlcn0gW29wdGlvbnMuZXhjbHVkZUNvbHVtbnNdIC0gaWYgdGFibGUgY29udGFpbnMgY29sdW1ucyB0aGF0IGFyZSBub3QgdG8gYmUgaW4gZGF0YSwgdGhlbiBwYXNzIGEgc2luZ2xlIGluZGV4IG9yIGFuIGFycmF5IG9mIGNlbGwgaW5kaWNlcyAoMC1iYXNlZCkuIFlvdSBuZWVkIHRvIGNvdW50IGNvbHVtbnMgbm90IGJ5IGhlYWRlcnMgYnV0IGJ5IHRoZSBjZWxscyBpbiByb3dzLlxyXG4gICAqIEBwYXJhbSB7QXJyYXl8TnVtYmVyfSBbb3B0aW9ucy5leGNsdWRlUm93c10gLSBpZiB0YWJsZSBjb250YWlucyByb3dzIHRoYXQgYXJlIG5vdCB0byBiZSBpbiBkYXRhLCB0aGVuIHBhc3MgYSBzaW5nbGUgaW5kZXggb3IgYW4gYXJyYXkgb2Ygcm93IGluZGljZXMgKDAtYmFzZWQpLiBZb3UgbmVlZCB0byBjb3VudCBvbmx5IHJvd3MgdGhhdCBjb250YWluIGRhdGEsIG5vdCB0aGUgdGFibGUtaGVhZGVyIHJvd3MuXHJcbiAgICogQHBhcmFtIHtTb3J0VGFibGV9IG9wdGlvbnMuc29ydGluZyAtIHNvcnRpbmcgb3B0aW9ucywgc2VlIHtAbGluayBTb3J0VGFibGV9LiBJZiB5b3Ugd2FudCB0byBsZWF2ZSBhbGwgb3B0aW9ucyBkZWZhdWx0IGJ1dCBlbmFibGUgc29ydGluZywgcGFzcyBhbiBlbXB0eSBvYmplY3QoYC4uLCBzb3J0aW5nOnt9YCksIG9yIHNvcnRpbmcgd29uJ3QgYmUgYXBwbGllZC5cclxuICAgKiBAcGFyYW0ge1NvcnRUYWJsZX0gb3B0aW9ucy5mbG9hdGluZ0hlYWRlciAtIGZsb2F0aW5nIGhlYWRlciwgc2VlIHtAbGluayBTb3J0VGFibGV9LiBJZiB5b3Ugd2FudCB0byBsZWF2ZSBhbGwgb3B0aW9ucyBkZWZhdWx0IGJ1dCBlbmFibGUgc29ydGluZywgcGFzcyBhbiBlbXB0eSBvYmplY3QoYC4uLCBzb3J0aW5nOnt9YCksIG9yIHNvcnRpbmcgd29uJ3QgYmUgYXBwbGllZC5cclxuICAgKiAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xyXG4gICAgbGV0IHtcclxuICAgICAgc291cmNlLFxyXG4gICAgICByb3doZWFkZXJDb2x1bW5JbmRleCxkZWZhdWx0SGVhZGVyUm93LGRhdGFTdHJpcERpcmVjdGlvbixleGNsdWRlQmxvY2ssZXhjbHVkZUNvbHVtbnMsZXhjbHVkZVJvd3MsXHJcbiAgICAgIHNvcnRpbmcsXHJcbiAgICAgIGZsb2F0aW5nSGVhZGVyXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVGhlIHNvdXJjZSB0YWJsZVxyXG4gICAgICogIEB0eXBlIHtIVE1MVGFibGVFbGVtZW50fVxyXG4gICAgICogIEBtZW1iZXJPZiBBZ2dyZWdhdGVkVGFibGVcclxuICAgICAqICAqL1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICBsZXQgcmVmU291cmNlO1xyXG4gICAgaWYoZmxvYXRpbmdIZWFkZXIgJiYgdHlwZW9mIGZsb2F0aW5nSGVhZGVyPT0nb2JqZWN0Jyl7XHJcbiAgICAgIHRoaXMuZmxvYXRpbmdIZWFkZXIgPSBuZXcgVGFibGVGbG9hdGluZ0hlYWRlcihzb3VyY2UpO1xyXG4gICAgICAvKipcclxuICAgICAgICogIFRoZSBmbG9hdGluZyBoZWFkZXJcclxuICAgICAgICogIEB0eXBlIHtIVE1MVGFibGVFbGVtZW50fVxyXG4gICAgICAgKiAgQG1lbWJlck9mIEFnZ3JlZ2F0ZWRUYWJsZVxyXG4gICAgICAgKiAgKi9cclxuICAgICAgdGhpcy5yZWZTb3VyY2UgPSByZWZTb3VyY2UgPSB0aGlzLmZsb2F0aW5nSGVhZGVyLmhlYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBXaGV0aGVyIGRhdGEgaXMgbW9ub2RpbWVuc2lvbmFsIG9yIG11bHRpZGltZW5zaW9uYWxcclxuICAgICAqICBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAqICBAbWVtYmVyT2YgQWdncmVnYXRlZFRhYmxlXHJcbiAgICAgKiAgKi9cclxuXHJcbiAgICB0aGlzLm11bHRpZGltZW5zaW9uYWwgPSB0aGlzLmNvbnN0cnVjdG9yLmRldGVjdE11bHRpZGltZW5zaW9uYWwoc291cmNlKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBkYXRhIEFycmF5XHJcbiAgICAgKiAgQHR5cGUge0FycmF5Ljx7Y2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudCwgZGF0YTo/U3RyaW5nfD9OdW1iZXIsIGNvbHVtbkluZGV4Ok51bWJlcn0+fVxyXG4gICAgICogIEBtZW1iZXJPZiBBZ2dyZWdhdGVkVGFibGVcclxuICAgICAqICAqL1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXREYXRhKHtzb3VyY2UscmVmU291cmNlLGRlZmF1bHRIZWFkZXJSb3csZXhjbHVkZUJsb2NrLGV4Y2x1ZGVDb2x1bW5zLGV4Y2x1ZGVSb3dzLGRpcmVjdGlvbjpkYXRhU3RyaXBEaXJlY3Rpb24sbXVsdGlkaW1lbnNpb25hbDogdGhpcy5tdWx0aWRpbWVuc2lvbmFsfSk7XHJcblxyXG5cclxuICAgIGlmKHNvcnRpbmcgJiYgdHlwZW9mIHNvcnRpbmcgPT0gJ29iamVjdCcpe1xyXG4gICAgICBsZXQgcmVvcmRlckZ1bmN0aW9uID0gZT0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnJlb3JkZXJSb3dzKHRoaXMuZGF0YSx0aGlzLnNvdXJjZSx0aGlzLm11bHRpZGltZW5zaW9uYWwpXHJcbiAgICAgIH07XHJcbiAgICAgIFtzb3VyY2UscmVmU291cmNlXS5mb3JFYWNoKHRhcmdldD0+e1xyXG4gICAgICAgIGlmKHRhcmdldCl7XHJcbiAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigncmVwb3J0YWwtdGFibGUtc29ydCcsIHJlb3JkZXJGdW5jdGlvbilcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc29ydGluZy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgIHNvcnRpbmcucmVmU291cmNlID0gcmVmU291cmNlO1xyXG4gICAgICBzb3J0aW5nLmRlZmF1bHRIZWFkZXJSb3cgPSBkZWZhdWx0SGVhZGVyUm93O1xyXG4gICAgICBzb3J0aW5nLmRhdGE9dGhpcy5kYXRhO1xyXG4gICAgICBzb3J0aW5nLm11bHRpZGltZW5zaW9uYWwgPSB0aGlzLm11bHRpZGltZW5zaW9uYWw7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogIHNvcnRpbmcgb2JqZWN0LiBTZWUge0BsaW5rIFNvcnRUYWJsZX1cclxuICAgICAgICogIEB0eXBlIHtTb3J0VGFibGV9XHJcbiAgICAgICAqICBAbWVtYmVyT2YgQWdncmVnYXRlZFRhYmxlXHJcbiAgICAgICAqICAqL1xyXG4gICAgICB0aGlzLnNvcnRpbmcgPSBuZXcgU29ydFRhYmxlKHNvcnRpbmcpO1xyXG5cclxuICAgICAgLy8gYWRkIGxpc3RlbmVyIHRvIGRvIHJlb3JkZXJpbmcgb24gc29ydGluZ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGFibGUgY29sdW1ucyBhcnJheVxyXG4gICAgICogQHR5cGUge0FycmF5Ljx7aW5kZXg6TnVtYmVyLCB0aXRsZTpTdHJpbmcsIGNvbFNwYW46TnVtYmVyLCBjZWxsOiBIVE1MVGFibGVDZWxsRWxlbWVudCwgP3JlZkNlbGw6SFRNTFRhYmxlQ2VsbEVsZW1lbnR9Pn1cclxuICAgICAqIEBtZW1iZXJPZiBBZ2dyZWdhdGVkVGFibGVcclxuICAgICAqICovXHJcbiAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLnNvcnRpbmcgJiYgdGhpcy5zb3J0aW5nLmNvbHVtbnM/IHRoaXMuc29ydGluZy5jb2x1bW5zIDogbmV3IFRhYmxlQ29sdW1ucyh7c291cmNlLHJlZlNvdXJjZSxkZWZhdWx0SGVhZGVyUm93fSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0cmFjdHMgZGF0YSBmcm9tIGEgZ2l2ZW4gY2VsbC4gT3ZlcnJpZGUgaW4gYW4gaW5oZXJpdGVkIGNsYXNzIGlmIHlvdSBuZWVkIHRvIGFkZCBhbnkgbWV0YWRhdGEgdG8gaXQuXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVDZWxsRWxlbWVudH0gY2VsbCAtIGNlbGwgZWxlbWVudCB0byBoYXZlIGRhdGEgc3RyaXBwZWQgb2ZmIGl0XHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVDZWxsRWxlbWVudH0gcm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGl0J3MgaW5cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUNlbGxFbGVtZW50fSBjb2x1bW5JbmRleCAtIGluZGV4IG9mIHRoZSBjb2x1bW4gaXQncyBpblxyXG4gICAqIEByZXR1cm5zIHt7Y2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudCwgP2RhdGE6U3RyaW5nfE51bWJlciwgY29sdW1uSW5kZXg6TnVtYmVyfX0gUmV0dXJucyBhbiBvYmplY3QgYHtjZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50LCBkYXRhOj9TdHJpbmd8P051bWJlciwgY29sdW1uSW5kZXg6TnVtYmVyfWAgKGlmIGRhdGEgaXMgYWJzZW50IGluIHRoZSBjZWxsIG9yIGl0cyB0ZXh0IGNvbnRlbnQgYm9pbHMgZG93biB0byBhbiBlbXB0eSBzdHJpbmcgLSBpLmUuIHRoZXJlIGFyZSBubyBjaGFyYWN0ZXJzIGluIHRoZSBjZWxsLCBvbmx5IEhUTUwgdGFncykgaXQgcmV0dXJucyBudWxsIGluIGBkYXRhYFxyXG4gICAqIEBvdmVycmlkZVxyXG4gICAqICovXHJcbiAgc3RhdGljIHByZXBhcmVEYXRhQ2VsbChjZWxsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2VsbCxcclxuICAgICAgZGF0YTogUmVwb3J0YWxCYXNlLmlzTnVtYmVyKGNlbGwudGV4dENvbnRlbnQudHJpbSgpKSxcclxuICAgICAgY29sdW1uSW5kZXgsXHJcbiAgICAgIHJvd0luZGV4XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGNhcmUgb2YgcmVwb3NpdGlvbmluZyByb3dzIGluIHRoZSB0YWJsZSB0byBtYXRjaCB0aGUgYGRhdGFgIGFycmF5IGluIHRoZSB3YXkgaXQgd2FzIHNvcnRlZCBhbmQgaWYgdGhlIGRhdGEgaXMgc2VwYXJhdGVkIGludG8gYmxvY2tzLCB0aGVuIG1vdmUgdGhlIGJsb2NrIHBpZWNlIHRvIHRoZSBmaXJzdCByb3cgaW4gZWFjaCBkYXRhIGJsb2NrLlxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSBmdWxsIHNvcnRlZCBkYXRhc2V0LiBJbnN0YW5jZSBvZiB7QGxpbmsgVGFibGVEYXRhI2dldERhdGF9XHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGVcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG11bHRpZGltZW5zaW9uYWxcclxuICAgKiAqL1xyXG4gIHN0YXRpYyByZW9yZGVyUm93cyhkYXRhLHNvdXJjZSxtdWx0aWRpbWVuc2lvbmFsKXtcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIEFnZ3JlZ2F0ZWRUYWJsZS5kaW1lbnNpb25hbERhdGFJdGVyYXRvcihkYXRhLG11bHRpZGltZW5zaW9uYWwsKGRhdGFEaW1lbnNpb24pPT57XHJcbiAgICAgIGlmKG11bHRpZGltZW5zaW9uYWwpe0FnZ3JlZ2F0ZWRUYWJsZS5yZXBvc2l0aW9uQmxvY2tDZWxsKGRhdGFEaW1lbnNpb24pfSAvLyBpZiBtdWx0aWRpbWVuc2lvbmFsIHJlcG9zaXRpb24gYWdncmVnYXRpbmcgYmxvY2sgY2VsbCB0byB0aGUgdG9wbW9zdCByb3cgaW4gc29ydGVkIGFycmF5XHJcbiAgICAgIGRhdGFEaW1lbnNpb24uZm9yRWFjaChpdGVtPT57ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaXRlbVswXS5jZWxsLnBhcmVudE5vZGUpfSk7IC8vIGFkZCByb3cgdG8gZnJhZ21lbnQgaW4gdGhlIGFycmF5IG9yZGVyLCB0aGlzIGRvZXNuJ3QgYWNjb3VudCBmb3IgY29sdW1uIHN0cmlwcGVkIGRhdGEgeWV0XHJcbiAgICB9KTtcclxuICAgIHNvdXJjZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmVwb3NpdGlvbnMgdGhlIHJvd3NwYW5uaW5nIGJsb2NrIGNlbGwgZnJvbSB0aGUgaW5pdGlhbCByb3cgdG8gdGhlIG5ldyBzb3J0ZWQgcm93XHJcbiAgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgLSBkaW1lbnNpb24gb2YgZGF0YVxyXG4gICAqICovXHJcbiAgc3RhdGljIHJlcG9zaXRpb25CbG9ja0NlbGwoaXRlbXMpe1xyXG4gICAgbGV0IGJsb2NrUm93SXRlbSA9IGl0ZW1zLmZpbHRlcihpdGVtPT5pdGVtWzBdLmNlbGwucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpcnN0SW5CbG9jaycpKVswXTtcclxuICAgIGxldCBibG9ja1JvdyA9IGJsb2NrUm93SXRlbVswXS5jZWxsLnBhcmVudE5vZGU7XHJcbiAgICBpZihpdGVtcy5pbmRleE9mKGJsb2NrUm93SXRlbSkhPTApey8vIGlmIGJsb2NrIHJvdyBpc24ndCBmaXJzdCBpbiBkaW1lbnNpb25cclxuICAgICAgbGV0IG5ld0ZpcnN0Um93ID0gaXRlbXNbMF1bMF0uY2VsbC5wYXJlbnROb2RlO1xyXG4gICAgICBuZXdGaXJzdFJvdy5pbnNlcnRCZWZvcmUoYmxvY2tSb3cucXVlcnlTZWxlY3RvcignLmJsb2NrQ2VsbCcpLG5ld0ZpcnN0Um93LmZpcnN0RWxlbWVudENoaWxkKTsvLyBtb3ZlIGJsb2NrIGNlbGxcclxuICAgICAgbmV3Rmlyc3RSb3cuY2xhc3NMaXN0LmFkZCgnZmlyc3RJbkJsb2NrJyk7XHJcbiAgICAgIGJsb2NrUm93LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpcnN0SW5CbG9jaycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogYWxsb3dzIHRvIHBlcmZvcm0gYWN0aW9uIG9uIGRhdGEgYmFzZWQgb24gaXRzIG11bHRpZGltZW5zaW9uYWxpdHlcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gZnVsbCBkYXRhc2V0LiBJbnN0YW5jZSBvZiB7QGxpbmsgVGFibGVEYXRhI2dldERhdGF9XHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBtdWx0aWRpbWVuc2lvbmFsXHJcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGNhbGxiYWNrIC0gYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiBhIGRpbWVuc2lvbiBvZiBkYXRhLiBDYWxsYmFjayBpcyBjYWxsZWQgd2l0aCB0d28gYXR0cmlidXRlczogYGRpbWVuc2lvbmAgLSB0aGUgY3VycmVudCBpdGVyYXRpb24gb2YgZGF0YSBhbmQgYGluZGV4YCAob3B0aW9uYWwpIGlmIGl0J3MgbXVsdGlkaW1lbnNpb25hbFxyXG4gICAqICovXHJcbiAgc3RhdGljIGRpbWVuc2lvbmFsRGF0YUl0ZXJhdG9yKGRhdGEsbXVsdGlkaW1lbnNpb25hbCxjYWxsYmFjayl7XHJcbiAgICBpZighY2FsbGJhY2sgfHwgdHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpe3Rocm93IG5ldyBUeXBlRXJyb3IoJ2BjYWxsYmFja2AgbXVzdCBiZSBwYXNzZWQgYW5kIGJlIGEgZnVuY3Rpb24nKX1cclxuICAgIGlmKCFtdWx0aWRpbWVuc2lvbmFsKXtcclxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpXHJcbiAgICB9IGVsc2UgeyAvLyBpZiBhcnJheSBoYXMgbmVzdGVkIGFycmF5IGJsb2Nrc1xyXG4gICAgICBkYXRhLmZvckVhY2goKGRpbWVuc2lvbixpbmRleCk9PntcclxuICAgICAgICBjYWxsYmFjayhkaW1lbnNpb24saW5kZXgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWdncmVnYXRlZFRhYmxlXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1hZ2dyZWdhdGVkLXRhYmxlL3NyYy9hZ2dyZWdhdGVkLXRhYmxlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMDcuMDkuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgVGFibGVEYXRhIGZyb20gXCIuL3RhYmxlLWRhdGFcIjtcclxuaW1wb3J0IEFnZ3JlZ2F0ZWRUYWJsZSBmcm9tIFwiLi9hZ2dyZWdhdGVkLXRhYmxlXCI7XHJcbmltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xyXG5pbXBvcnQgQWdncmVnYXRlZFRhYmxlUm93TWV0YSBmcm9tIFwiLi9hZ2dyZWdhdGVkLXRhYmxlLXJvdy1tZXRhXCI7XHJcblxyXG5cclxud2luZG93LlJlcG9ydGFsID0gd2luZG93LlJlcG9ydGFsIHx8IHt9O1xyXG5SZXBvcnRhbEJhc2UubWl4aW4od2luZG93LlJlcG9ydGFsLHtcclxuICBUYWJsZURhdGEsXHJcbiAgQWdncmVnYXRlZFRhYmxlLFxyXG4gIEFnZ3JlZ2F0ZWRUYWJsZVJvd01ldGFcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZ2dyZWdhdGVkVGFibGVcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9yLWFnZ3JlZ2F0ZWQtdGFibGUvc3JjL21haW4uanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBJdmFuUCBvbiAxNS4xMi4yMDE2LlxyXG4gKi9cclxuaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcblxyXG4vKipcclxuICogQSBjbGFzcyB0aGF0IHByb3ZpZGVzIHV0aWxpdHkgc3RhdGljIG1ldGhvZHMgdG8gbG9hZCBjaGlsZHJlbiBvZiBhIGxldmVsIG9mIGhpZXJlcmFjaHkgYW5kIGEgdGFibGUgcGVyIGEgZ2l2ZW4gaWRcclxuICogKi9cclxuY2xhc3MgQXN5bmNIaWVyYXJjaHlUYWJsZXtcclxuICAvKipcclxuICAgKiBRdWVyaWVzIGlmIGVhY2ggcm93IG1pZ2h0IGNvbnRhaW4gY2hpbGQgcm93cyBieSBxdWVyaW5nIGhpZXJhcmNoeSBmb3IgbmV4dCBsZXZlbFxyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gaWQgLSByb3doZWFkZXIgaWQgZm9yIGN1cnJlbnQgcm93XHJcbiAgICogQHBhcmFtIHshTnVtYmVyfSBoaWVyYXJjaHlJRCAtIGlkIG9mIEhpZXJhcmNoeSBpbiBUYWJsZSBEZXNpZ25lclxyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gaGllcmFyY2h5Q29udHJvbElEIC0gaWQgb2YgdGhlIFJlcG9ydGFsIEhpZXJhcmNoeSBDb21wb25lbnQgaW5zdGFuY2Ugb24gdGhlIHBhZ2VcclxuICAgKiBAcGFyYW0geyFTdHJpbmd9IHBhZ2VTdGF0ZUlEIC0gUmVwb3J0YWwgc3RhdGUgaWRcclxuICAgKiBAcGFyYW0ge051bWJlcj19IGxhbmd1YWdlQ29kZT05IC0gTGFuZ3VhZ2UgY29kZSAoYWNjb3JkaW5nIHRvIENvbmZpcm1pdCB0YWJsZSBvZiBsYW5ndWFnZSBjb2Rlcykgb2YgdGhlIGxhbmd1YWdlIHRoZSBoaWVyYXJjaHkgaXMgZ29pbmcgdG8gYmUgc3RyZWFtZWQgaW4gYXQgdGhlIHBhZ2UgbG9hZFxyXG4gICAqIEByZXR1cm5zIHtBcnJheX0gYXJyYXkgb2YgY2hpbGQgbm9kZXMgb2YgdGhlIGBpZGAgaW4gaGllcmFyY2h5XHJcbiAgICogKi9cclxuICBzdGF0aWMgZmV0Y2hDaGlsZEhpZXJhcmNoeShpZCxoaWVyYXJjaHlJRCxoaWVyYXJjaHlDb250cm9sSUQscGFnZVN0YXRlSUQsbGFuZ3VhZ2VDb2RlPTkpe1xyXG4gICAgbGV0IHBhdGggPSBbXHJcbiAgICAgIGxvY2F0aW9uLm9yaWdpbixcclxuICAgICAgJ3JlcG9ydGFsJyxcclxuICAgICAgJ0hpZXJhcmNoeScsXHJcbiAgICAgIFJlcG9ydGFsQmFzZS5nZXRRdWVyeVZhcmlhYmxlKCdSZXBvcnRJZCcpLFxyXG4gICAgICBoaWVyYXJjaHlJRCxcclxuICAgICAgbGFuZ3VhZ2VDb2RlLFxyXG4gICAgICAnR2V0Q2hpbGROb2RlcydcclxuICAgIF07XHJcblxyXG4gICAgbGV0IHF1ZXJ5PVtcclxuICAgICAgYG5vZGVJZD0ke2lkfWAsXHJcbiAgICAgIGBpbmZvPSR7QXN5bmNIaWVyYXJjaHlUYWJsZS5lbmNvZGUoe1xyXG4gICAgICAgIElzUHJldmlldzpSZXBvcnRhbEJhc2UuZ2V0UXVlcnlWYXJpYWJsZSgnUHJldmlldycpPT09J3RydWUnLFxyXG4gICAgICAgIEhpZXJhcmNoeUNvbnRyb2xJZDpoaWVyYXJjaHlDb250cm9sSURcclxuICAgICAgfSl9YCxcclxuICAgICAgJ2lzUmVwQmFzZT1mYWxzZScsXHJcbiAgICAgICdwYXJhbWV0ZXI9JyxcclxuICAgICAgYFBhZ2VTdGF0ZUlkPSR7cGFnZVN0YXRlSUR9YFxyXG4gICAgXTtcclxuXHJcbiAgICBsZXQgaGllcmFyY2h5SXRlbUNoaWxkcmVuID0gUmVwb3J0YWxCYXNlLnByb21pc2VSZXF1ZXN0KFtwYXRoLmpvaW4oJy8nKSwnPycscXVlcnkuam9pbignJicpXS5qb2luKCcnKSk7XHJcbiAgICByZXR1cm4gaGllcmFyY2h5SXRlbUNoaWxkcmVuLnRoZW4ocmVzcG9uc2U9PntyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UpKX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyByb3cgbm9kZXMgdGhhdCBhcmUgY2hpbGQgdG8gdGhlIHBhcmVudCByb3cjYGlkYFxyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gaWQgLSByb3doZWFkZXIgaWQgZm9yIGN1cnJlbnQgcm93XHJcbiAgICogQHBhcmFtIHs/U3RyaW5nfSBwYXJlbnRJRCAtIHJvd2hlYWRlciBpZCBmb3IgcGFyZW50IHJvd1xyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gdGFibGVJRCAtIFJlcG9ydGFsIEFnZ3JlZ2F0ZWQgVGFibGUgQ29tcG9uZW50IGlkXHJcbiAgICogQHBhcmFtIHshU3RyaW5nfSBwYWdlU3RhdGVJRCAtIFJlcG9ydGFsIHN0YXRlIGlkXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyBhIHRoZW5hYmxlIHByb21pc2Ugd2hpY2ggcmVzdWx0IGlzIGFuIGBIVE1MVGFibGVFbGVtZW50YCB3aXRoIHJvd3MgdGhhdCBhcmUgY2hpbGRyZW4gdG8gdGhlIHJvdyNgaWRgXHJcbiAgICogKi9cclxuICBzdGF0aWMgZmV0Y2hDaGlsZFRhYmxlKGlkLCBwYXJlbnRJRCwgdGFibGVJRCxwYWdlU3RhdGVJRCl7XHJcbiAgICBwYXJlbnRJRCA9IHBhcmVudElEIT1udWxsP3BhcmVudElEOmlkO1xyXG4gICAgbGV0IHBhdGggPSBbXHJcbiAgICAgIGxvY2F0aW9uLm9yaWdpbixcclxuICAgICAgJ3JlcG9ydGFsJyxcclxuICAgICAgJ1JlcG9ydCcsXHJcbiAgICAgIFJlcG9ydGFsQmFzZS5nZXRRdWVyeVZhcmlhYmxlKCdSZXBvcnRJZCcpLFxyXG4gICAgICAnQ29tcG9uZW50JyxcclxuICAgICAgdGFibGVJRFxyXG4gICAgXTtcclxuICAgIGxldCBxdWVyeT1bXHJcbiAgICAgIGBQYWdlSWQ9JHtSZXBvcnRhbEJhc2UuZ2V0UXVlcnlWYXJpYWJsZSgnUGFnZUlkJyl9YCxcclxuICAgICAgYFByZXZpZXc9JHtSZXBvcnRhbEJhc2UuZ2V0UXVlcnlWYXJpYWJsZSgnUHJldmlldycpfWAsXHJcbiAgICAgIGBQYWdlU3RhdGVJZD0ke3BhZ2VTdGF0ZUlEfWAsXHJcbiAgICAgIGBwYWdlRmlsdGVycz0ke0FzeW5jSGllcmFyY2h5VGFibGUuZW5jb2RlKHt9KX1gLFxyXG4gICAgICBgY3VzdG9tRmlsdGVycz0ke0FzeW5jSGllcmFyY2h5VGFibGUuZW5jb2RlKHt9KX1gLFxyXG4gICAgICBgcGVyc05vZGVzPSR7QXN5bmNIaWVyYXJjaHlUYWJsZS5lbmNvZGUoW3tOb2RlSWQ6aWQsVGV4dDpudWxsfV0pfWAsIC8vIGNoaWxkIG5vZGUgaWRcclxuICAgICAgYG9yaWdOb2Rlcz0ke0FzeW5jSGllcmFyY2h5VGFibGUuZW5jb2RlKFt7Tm9kZUlkOnBhcmVudElELFRleHQ6bnVsbH1dKX1gIC8vIHBhcmVudCBub2RlIGlkXHJcbiAgICBdO1xyXG4gICAgbGV0IHRhYmxlUmVzdWx0ID0gUmVwb3J0YWxCYXNlLnByb21pc2VSZXF1ZXN0KFtwYXRoLmpvaW4oJy8nKSwnPycscXVlcnkuam9pbignJicpXS5qb2luKCcnKSk7XHJcbiAgICByZXR1cm4gdGFibGVSZXN1bHQudGhlbihyZXNwb25zZT0+e1xyXG4gICAgICBsZXQgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgaG9zdC5pbm5lckhUTUwgPSByZXNwb25zZTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShob3N0LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlJykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdHJpcHMgcm93cyBmcm9tIHRoZSB0YWJsZSByZWNlaXZlZFxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gdGFibGUgLSBBZ2dyZWdhdGVkIHRhYmxlIGVsZW1lbnRcclxuICAgKiBAcGFyYW0ge0FycmF5fSBleGNsdWRlZFJvd3MgLSByb3dzIGV4Y2x1ZGVkIGZyb20gaW5zZXJ0aW9uXHJcbiAgICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2Ygcm93cyB7SFRNTFRhYmxlUm93RWxlbWVudH1cclxuICAgKiAqL1xyXG4gIHN0YXRpYyBzdHJpcFJvd3NGcm9tUmVzcG9uc2VUYWJsZSh0YWJsZSxleGNsdWRlZFJvd3Mpe1xyXG4gICAgbGV0IHJvd3MgPSBbXS5zbGljZS5jYWxsKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5PnRyJykpO1xyXG4gICAgaWYoZXhjbHVkZWRSb3dzICYmIGV4Y2x1ZGVkUm93cy5sZW5ndGg+MCl7XHJcbiAgICAgIGV4Y2x1ZGVkUm93cy5yZXZlcnNlKCkuZm9yRWFjaChpbmRleD0+e1xyXG4gICAgICAgIHJvd3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm93cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERvZXMgYEpTT04uc3RyaW5naWZ5YCBhbmQgYGVuY29kZVVSSUNvbXBvbmVudGAgb2YgYW55dGhpbmcgcGFzc2VkIHRvIGJlIGFkZGVkIHRvIHRoZSBxdWVyeSBzdHJpbmdcclxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8QXJyYXl9IHRvRW5jb2RlIC0gcGllY2UgdG8gYmUgVVJMZW5jb2RlZFxyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYW4gZW5jb2RlZCBzdHJpbmdcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBlbmNvZGUodG9FbmNvZGUpe1xyXG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0b0VuY29kZSkpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzeW5jSGllcmFyY2h5VGFibGU7XHJcblxyXG5cclxud2luZG93LlJlcG9ydGFsID0gd2luZG93LlJlcG9ydGFsIHx8IHt9O1xyXG5SZXBvcnRhbEJhc2UubWl4aW4od2luZG93LlJlcG9ydGFsLHtcclxuICBBc3luY0hpZXJhcmNoeVRhYmxlXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItYXN5bmMtaGllcmFyY2h5LXRhYmxlL3NyYy9tYWluLmpzIiwiY2xhc3MgU29ydE9yZGVyIHtcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgYHNvcnRPcmRlcmAgYXJyYXlcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNvbHVtbnMgLSBhbiBhcnJheSBvZiBjb2x1bW5zIGZyb20ge0BsaW5rIFRhYmxlQ29sdW1uc31cclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNvcnRDYWxsYmFjayAtIGZ1bmN0aW9uIHRoYXQgcGVyZm9ybXMgc29ydGluZyBiYXNlZCBvbiB0aGUgYHNvcnRPcmRlcmBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5zb3J0Q2FsbGJhY2tTY29wZSAtIHNjb3BlIGluIHdoaWNoIHNvcnQgY2FsbGJhY2sgbmVlZHMgdG8gYmUgZXhlY3V0ZWRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuZGVmYXVsdFNvcnRpbmddIC0gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IHNwZWNpZnkgZGVmYXVsdCBzb3J0aW5nXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGVmYXVsdFNvcnRpbmcuY29sdW1uIC0gY29sdW1uIGluZGV4XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZGVmYXVsdFNvcnRpbmcuZGlyZWN0aW9uIC0gc29ydCBkaXJlY3Rpb24gKGBhc2NgfGBkZXNjYClcclxuICAgKiBAcmV0dXJuIHtBcnJheX1cclxuICAgKiAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xyXG4gICAgbGV0IHtjb2x1bW5zLCBzb3J0Q2FsbGJhY2ssIGRlZmF1bHRTb3J0aW5nPVtdLCBzb3J0Q2FsbGJhY2tTY29wZT10aGlzfSA9IG9wdGlvbnM7XHJcblxyXG4gICAgdGhpcy5zb3J0T3JkZXIgPSBbXTtcclxuICAgIGlmKHR5cGVvZiBjb2x1bW5zICE9IHVuZGVmaW5lZCAmJiBjb2x1bW5zICE9IG51bGwpe1xyXG4gICAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU29ydE9yZGVyOiBjb2x1bW5zIG11c3QgYmUgc3BlY2lmaWVkJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNvcnQgPSAoKT0+e1xyXG4gICAgICBpZihzb3J0Q2FsbGJhY2sgJiYgdHlwZW9mIHNvcnRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgc29ydENhbGxiYWNrLmNhbGwoc29ydENhbGxiYWNrU2NvcGUsdGhpcylcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmKGRlZmF1bHRTb3J0aW5nLmxlbmd0aD4wKXtcclxuICAgICAgZGVmYXVsdFNvcnRpbmcuZm9yRWFjaChpdGVtPT50aGlzLmFkZChpdGVtKSk7XHJcbiAgICAgIHRoaXMuc29ydCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGEgYGNlbGxgIGZyb20gdGhlIHRhYmxlIGFuZCBhIHJlZmVyZW5jZSBjZWxsIChgcmVmQ2VsbGApIGZyb20gdGhlIGZsb2F0aW5nIGhlYWRlciBpZiBhbnlcclxuICAgKiBAcGFyYW0geyFOdW1iZXJ9IGNvbHVtbkluZGV4IC0gaW5kZXggb2YgdGhlIGNvbHVtbiBmcm9tIHRoZSBhcnJheSBvZiBjb2x1bW5zIGZyb20ge0BsaW5rIFRhYmxlQ29sdW1uc31cclxuICAgKiBAcmV0dXJuIHt7Y2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudCwgcmVmQ2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudH19XHJcbiAgICogKi9cclxuICBnZXRDZWxsKGNvbHVtbkluZGV4KXtcclxuICAgIGlmKHR5cGVvZiBjb2x1bW5JbmRleCAhPSAndW5kZWZpbmVkJyAmJiBjb2x1bW5JbmRleCE9bnVsbCl7XHJcbiAgICAgIGxldCBjZWxscyA9IFtdO1xyXG4gICAgICBpZih0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLmNlbGwpe2NlbGxzLnB1c2godGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XS5jZWxsKX1cclxuICAgICAgaWYodGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XS5yZWZDZWxsKXtjZWxscy5wdXNoKHRoaXMuY29sdW1uc1tjb2x1bW5JbmRleF0ucmVmQ2VsbCl9XHJcbiAgICAgIHJldHVybiBjZWxscztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbHVtbkluZGV4IHBhcmFtZXRlciBzaG91bGQgbm90IGJlIG51bGwnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYW5vdGhlciBjb2x1bW4gdG8gYmUgc29ydGVkXHJcbiAgICogQHBhcmFtIHshT2JqZWN0fSBvYmogLSBvYmplY3QgZGVzY3JpYmluZyBzb3J0aW5nXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9iai5jb2x1bW4gLSBjb2x1bW4gaW5kZXhcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gb2JqLmRpcmVjdGlvbiAtIHNvcnQgZGlyZWN0aW9uIChgYXNjYHxgZGVzY2ApXHJcbiAgICogKi9cclxuXHJcbiAgYWRkIChvYmope1xyXG4gICAgdGhpcy5nZXRDZWxsKG9iai5jb2x1bW4pLmZvckVhY2goY2VsbD0+e1xyXG4gICAgICAvL2lmKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc29ydGVkJykpeyAvLyB0aGlzIGNvbHVtbiBpcyBub3Qgc29ydGVkLCB0aGVyZSBtaWdodCBiZSBvdGhlcnMgdGhhdCBhcmUuXHJcbiAgICAgICAgWydzb3J0ZWQnLG9iai5kaXJlY3Rpb25dLmZvckVhY2goY2xhc3NOYW1lPT5jZWxsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgICAgIC8vfSBlbHNlIHsgLy9zd2FwcyBzb3J0aW5nIGZyb20gYXNjIHRvIGRlc2NcclxuICAgICAgLy8gIFsnYXNjJywnZGVzYyddLmZvckVhY2goY2xhc3NOYW1lPT5jZWxsLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKSk7XHJcbiAgICAgIC8vfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNvcnRPcmRlci5wdXNoKG9iaik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgY29sdW1uIGZyb20gYHNvcnRPcmRlcmBcclxuICAgKiBAcGFyYW0ge051bWJlcn0gY29sdW1uIC0gY29sdW1uIGluZGV4IGFzIHJlZmVyZW5jZSB0byB0aGUgaXRlbSB0byBiZSByZW1vdmVkLlxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIGluZGV4IG9mIGl0ZW0gaW4gYHNvcnRPcmRlcmAgYXJyYXkgdG8gYmUgcmVtb3ZlZFxyXG4gICAqICovXHJcbiAgcmVtb3ZlIChjb2x1bW4saW5kZXgpe1xyXG4gICAgWydzb3J0ZWQnLCdhc2MnLCdkZXNjJ10uZm9yRWFjaChjbGFzc05hbWU9PntcclxuICAgICAgdGhpcy5nZXRDZWxsKGNvbHVtbikuZm9yRWFjaChjZWxsPT5jZWxsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSlcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zb3J0T3JkZXIuc3BsaWNlKGluZGV4LDEpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcGxhY2VzIGFsbCBpdGVtcyBpbiBgc29ydE9yZGVyYFxyXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gb2JqIC0gb2JqZWN0IGRlc2NyaWJpbmcgc29ydGluZ1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvYmouY29sdW1uIC0gY29sdW1uIGluZGV4XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9iai5kaXJlY3Rpb24gLSBzb3J0IGRpcmVjdGlvbiAoYGFzY2B8YGRlc2NgKVxyXG4gICAqICovXHJcbiAgcmVwbGFjZSAob2JqKXtcclxuICAgIGlmKHRoaXMuc29ydE9yZGVyLmxlbmd0aD4wKXtcclxuICAgICAgdGhpcy5zb3J0T3JkZXIuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICB0aGlzLnJlbW92ZShpdGVtLmNvbHVtbixpbmRleCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZGQob2JqKTtcclxuICAgIHRoaXMuc29ydCgpO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU29ydE9yZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3Itc29ydC10YWJsZS9zcmMvc29ydC1vcmRlci5qcyIsImltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xyXG5pbXBvcnQgVGFibGVDb2x1bW5zIGZyb20gXCIuL3RhYmxlLWNvbHVtbnNcIjtcclxuaW1wb3J0IFNvcnRPcmRlciBmcm9tIFwiLi9zb3J0LW9yZGVyXCI7XHJcblxyXG4vKipcclxuICogRXZlbnQgcmVwb3J0aW5nIHRoYXQgYSB0YWJsZSBoYXMgYmVlbiBzb3J0ZWRcclxuICogQGV2ZW50IFNvcnRUYWJsZX5yZXBvcnRhbC10YWJsZS1zb3J0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE1ha2VzIGEgdGFibGUgc29ydGFibGUsIGdpdmVzIEFQSSBmb3Igc29ydGluZy4gSXQgc29ydHMgYGRhdGFgIGFycmF5LCBidXQgZG9lc24ndCBtb3ZlIHJvd3MgaW4gdGhlIGBzb3VyY2VgIHRhYmxlLCBiZWNhdXNlIG9mIGRpZmZlcmVuY2VzIGluIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiA+IE5vdGU6IEl0J3MgaW1wb3J0YW50IHRoYXQgZXZlcnkgQXJyYXkgaXRlbSB0aGF0IGlzIGdvaW5nIHRvIGJlIHNvcnRhYmxlIHdhcyBlaXRoZXIgYSBgU3RyaW5nYCwgYSBgTnVtYmVyYCwgYSBgbnVsbGAsIG9yIGFuIGBPYmplY3RgIHRoYXQgY29udGFpbmVkIGBkYXRhYCBwcm9wZXJ0eSAod2hpY2ggd2FzIG9mIHRoZSBwcmV2aW91c2x5IG5hbWVkIHR5cGVzKVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgcGFzc2VkIHRvIGNvbmZpZ3VyZSB0aGUgU29ydGluZ1xyXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IG9wdGlvbnMuc291cmNlIC0gc291cmNlIHRhYmxlIHNvcnRpbmcgd2lsbCBiZSBhcHBsaWVkIHRvXHJcbiAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gW29wdGlvbnMucmVmU291cmNlXSAtIHRoZSBmbG9hdGluZyBoZWFkZXIgaWYgYW55LCB3aWxsIHJlZmxlY3QgYW5kIHRyaWdnZXIgc29ydGluZyBvbiBoZWFkZXIgd2hlbiBzY3JvbGxlZC5cclxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlZmF1bHRIZWFkZXJSb3c9LTFdIC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBoYXZlIHNvcnRpbmcgZW5hYmxlZCBmb3IgY29sdW1ucy4gSWYgYC0xYCB0aGVuIGxhc3Qgcm93LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5pbmNsdWRlZF0gLSBBcnJheSBvZiBjb2x1bW4gaW5kaWNlcyAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgaGF2ZSBzb3J0aW5nIGVuYWJsZWQuIElmIG5vdCBzcGVjaWZpZWQsIGFsbCBjb2x1bW5zIHdpbGwgYmUgc29ydGFibGUuIE9wdGlvbmFsbHkgYGV4Y2x1ZGVkYCBjYW4gYmUgc3BlY2lmaWVkIGluc3RlYWQgYXMgYSBzaG9ydGhhbmQgdG8gcGFzcyBvbmx5IGluZGljZXMgb2YgY29sdW1ucyB0byBiZSBleGNsdWRlZCBmcm9tIHNvcnRpbmcsIGFzc3VtbmluZyB0aGF0IG90aGVycyB3aWxsIGJlIG1hZGUgc29ydGFibGUuIEl0J3MgaW1wb3J0YW50IHRvIGNvdW50IHRoZSBjb2x1bW4gaW5kZXggaW4gdGhlIGRlZmF1bHRIZWFkZXJSb3dcclxuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuZXhjbHVkZWRdIC0gQXJyYXkgb2YgY29sdW1uIGluZGljZXMgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGJlIGV4Y2x1ZGVkIGZyb20gc29ydGluZy4gQ2FuIGJlIHVzZWQgYXMgYSBzaG9ydGhhbmQgaW5zdGVhZCBvZiBgaW5jbHVkZWRgLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuZGVmYXVsdFNvcnRpbmddIC0gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IHNwZWNpZnkgZGVmYXVsdCBzb3J0aW5nXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRlZmF1bHRTb3J0aW5nLmNvbHVtbiAtIGNvbHVtbiBpbmRleFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5kZWZhdWx0U29ydGluZy5kaXJlY3Rpb24gLSBzb3J0IGRpcmVjdGlvbiAoYGFzY2B8YGRlc2NgKVxyXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmRhdGEgLSBkYXRhIHdpdGggaW5mb3JtYXRpb24gZm9yIHJvd3MgdG8gYmUgc29ydGVkXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubXVsdGlkaW1lbnNpb25hbD1mYWxzZV0gLSBpZiBgZGF0YWAgaXMgc2luZ2xlLWRpbWVuc2lvbmFsIChjb250YWlucyByb3dzIHdpdGggZGF0YSB0byBiZSBzb3J0ZWQgYXMgaW1tZWRpYXRlIGFycmF5IGl0ZW1zOiBgZGF0YSBbcm93SXRlbS4uLl1gKSwgdGhlbiBpdCBpcyBgZmFsc2VgLiBJZiBpdCBoYXMgYmxvY2tzIG9mIGRhdGEgYXMgaXRlbXMgKGVhY2ggYmxvY2sgY29udGFpbmluZyBhbiBhcnJheSBvZiByb3dzIHRvIGJlIHNvcnRlZDogZGF0YSBbYmxvY2sgW3Jvd0l0ZW0uLi5dLi4uXSksIHRoZW4gc2V0IGl0IHRvIGB0cnVlYC4gQ3VycmVudGx5IGl0IHN1cHBvcnRzIG9ubHkgYSB0d28tbGV2ZWwgYWdncmVnYXRpb24gbWF4IChkYXRhLT5ibG9jay0+cm93SXRlbSkuXHJcbiAqIEBwcm9wIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGVcclxuICogQHByb3Age0FycmF5fSBkYXRhIC0gZGF0YSBhcnJheSB0byBiZSBzb3J0ZWRcclxuICogQHByb3Age0Jvb2xlYW59IG11bHRpZGltZW5zaW9uYWwgLSBpZiBgZGF0YWAgaXMgbW9uby1kaW1lbnNpb25hbCAoY29udGFpbnMgcm93cyB3aXRoIGRhdGEgdG8gYmUgc29ydGVkIGFzIGltbWVkaWF0ZSBhcnJheSBpdGVtczogYGRhdGEgW3Jvd0l0ZW0uLi5dYCksIHRoZW4gaXQgaXMgYGZhbHNlYC4gSWYgaXQgaGFzIGJsb2NrcyBvZiBkYXRhIGFzIGl0ZW1zIChlYWNoIGJsb2NrIGNvbnRhaW5pbmcgYW4gYXJyYXkgb2Ygcm93cyB0byBiZSBzb3J0ZWQ6IGRhdGEgW2Jsb2NrIFtyb3dJdGVtLi4uXS4uLl0pLCB0aGVuIHNldCBpdCB0byBgdHJ1ZWAuIEN1cnJlbnRseSBpdCBzdXBwb3J0cyBvbmx5IGEgdHdvLWxldmVsIGFnZ3JlZ2F0aW9uIG1heCAoZGF0YS0+YmxvY2stPnJvd0l0ZW0pLlxyXG4gKiBAcHJvcCB7U29ydE9yZGVyfSBzb3J0T3JkZXIgLSBpbnN0YW5jZSBvZiB7QGxpbmsgU29ydE9yZGVyfVxyXG4gKiBAcHJvcCB7VGFibGVDb2x1bW5zfSBjb2x1bW5zIC0gaW5zdGFuY2Ugb2Yge0BsaW5rIFRhYmxlQ29sdW1uc30gd2l0aCBhIG1vZGlmaWVkIHByb3RvdHlwZSAoYWRkZWQgYHNvcnRhYmxlOnRydWVgIGFuZCBgLnNvcnRhYmxlYCB0byBzb3J0YWJsZSBjb2x1bW5zKVxyXG4gKiBAY2xhc3MgU29ydFRhYmxlXHJcbiAqICovXHJcbmNsYXNzIFNvcnRUYWJsZSB7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKlxyXG4gICAqICAqL1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuICAgIGxldCB7c291cmNlLHJlZlNvdXJjZSxkZWZhdWx0SGVhZGVyUm93PS0xLGluY2x1ZGVkLGV4Y2x1ZGVkLGRlZmF1bHRTb3J0aW5nPVtdLGRhdGE9W10sbXVsdGlkaW1lbnNpb25hbD1mYWxzZX09b3B0aW9ucztcclxuICAgIHRoaXMuX3NvcnRFdmVudCA9IFJlcG9ydGFsQmFzZS5uZXdFdmVudCgncmVwb3J0YWwtdGFibGUtc29ydCcpO1xyXG5cclxuICAgICAgaWYoc291cmNlKXtcclxuICAgICAgICB0aGlzLnNvdXJjZT1zb3VyY2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgc291cmNlYCB0YWJsZSBpcyBub3Qgc3BlY2lmaWVkIGZvciBTb3J0VGFibGUnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICB0aGlzLm11bHRpZGltZW5zaW9uYWwgPSBtdWx0aWRpbWVuc2lvbmFsO1xyXG5cclxuICAgICAgLy9sZXQgdGFibGVDb2x1bW5zPSBuZXcgVGFibGVDb2x1bW5zKHtzb3VyY2UsIHJlZlNvdXJjZSwgZGVmYXVsdEhlYWRlclJvd30pO1xyXG4gICAgICBsZXQgc29ydGFibGVDb2x1bW5zPVNvcnRUYWJsZS5kZWZpbmVTb3J0YWJsZUNvbHVtbnMobmV3IFRhYmxlQ29sdW1ucyh7c291cmNlLCByZWZTb3VyY2UsIGRlZmF1bHRIZWFkZXJSb3d9KSwgaW5jbHVkZWQsIGV4Y2x1ZGVkKTtcclxuICAgICAgdGhpcy5jb2x1bW5zID0gc29ydGFibGVDb2x1bW5zO1xyXG4gICAgICAvLyBzZXR1cCBzb3J0IG9yZGVyIGFuZCBkbyBpbml0aWFsIGRlZmF1bHQgc29ydGluZ1xyXG4gICAgICB0aGlzLnNvcnRPcmRlciA9IHtzb3J0T3JkZXI6W119ID0gbmV3IFNvcnRPcmRlcih7Y29sdW1uczpzb3J0YWJsZUNvbHVtbnMsIHNvcnRDYWxsYmFjazp0aGlzLnNvcnQsIHNvcnRDYWxsYmFja1Njb3BlOnRoaXMsIGRlZmF1bHRTb3J0aW5nfSk7XHJcbiAgICAgIFtzb3VyY2UscmVmU291cmNlXS5mb3JFYWNoKHNyYz0+e2lmKHNyYyl7U29ydFRhYmxlLmxpc3RlbkZvclNvcnQoVGFibGVDb2x1bW5zLmdldEhlYWRlcihzcmMpLHNvcnRhYmxlQ29sdW1ucywgdGhpcy5zb3J0T3JkZXIpfX0pOy8vIHNldCB1cCBsaXN0ZW5lcnMgZm9yIGhlYWRlcnNcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRoZSB0YWJsZSBjb2x1bW5zIGFycmF5IGFnYWluc3QgdGhlIGBpbmNsdWRlZGAvYGV4Y2x1ZGVkYCBjb2x1bW5zIGFycmF5cyBhbmQgYWRkcyBhIGBzb3J0YWJsZTp0cnVlYCBwcm9wZXJ0eSBhbmQgYSBgLnNvcnRhYmxlYCBjbGFzcyB0byB0aGUgc29ydGFibGUgb25lc1xyXG4gICAqIEBwYXJhbSB7VGFibGVDb2x1bW5zfSBjb2x1bW5zIC0gYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFRhYmxlQ29sdW1uc31cclxuICAgKiBAcGFyYW0ge0FycmF5fSBbaW5jbHVkZWRdIC0gYXJyYXkgb2YgaW5jbHVkZWQgY29sdW1ucyBpbmRpY2VzXHJcbiAgICogQHBhcmFtIHtBcnJheX0gW2V4Y2x1ZGVkXSAtIGFycmF5IG9mIGV4Y2x1ZGVkIGNvbHVtbnMgaW5kaWNlc1xyXG4gICAqICovXHJcbiAgc3RhdGljIGRlZmluZVNvcnRhYmxlQ29sdW1ucyhjb2x1bW5zLCBpbmNsdWRlZCwgZXhjbHVkZWQpe1xyXG4gICAgbGV0IHNvcnRhYmxlQ29sdW1ucyA9IFtdLnNsaWNlLmNhbGwoY29sdW1ucyk7XHJcbiAgICBzb3J0YWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLGluZGV4KT0+e1xyXG4gICAgICBsZXQgc29ydGFibGU9KCghaW5jbHVkZWQgJiYgIWV4Y2x1ZGVkKSB8fCAoaW5jbHVkZWQgJiYgaW5jbHVkZWQuaW5kZXhPZihpbmRleCkhPS0xKSB8fCAoZXhjbHVkZWQgJiYgZXhjbHVkZWQuaW5kZXhPZihpbmRleCk9PS0xKSk7XHJcbiAgICAgIGlmKHNvcnRhYmxlKXtcclxuICAgICAgICBjb2x1bW4uY2VsbC5jbGFzc0xpc3QuYWRkKCdzb3J0YWJsZScpO1xyXG4gICAgICAgIGlmKGNvbHVtbi5yZWZDZWxsKXtjb2x1bW4ucmVmQ2VsbC5jbGFzc0xpc3QuYWRkKCdzb3J0YWJsZScpO31cclxuICAgICAgICBjb2x1bW4uc29ydGFibGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzb3J0YWJsZUNvbHVtbnNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldHMgdXAgbGlzdGVuZXJzIGZvciBjb2x1bW4gaGVhZGVycyBhdmFpbGFibGUgZm9yIGNsaWNrXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZGVsZWdhdGVkVGFyZ2V0IC0gZWxlbWVudCB0aGF0IHdpbGwgcmVjZWl2ZSBjbGlja3MgYW5kIHNlZSBpZiB0aGV5IGFyZSB2YWxpZCwgYHRoZWFkYCBpcyByZWNvbW1lbmRlZCB0byBib2lsIGRvd24gdG8gaGVhZGVyIGNsaWNrcyBvbmx5XHJcbiAgICogQHBhcmFtIHtUYWJsZUNvbHVtbnN9IGNvbHVtbnMgLSBhcnJheSBvZiB0YWJsZSBjb2x1bW5zIGZyb20ge0BsaW5rIFNvcnRUYWJsZSNkZWZpbmVTb3J0YWJsZUNvbHVtbnN9XHJcbiAgICogQHBhcmFtIHtTb3J0T3JkZXJ9IHNvcnRPcmRlciAtIGluc3RhbmNlIG9mIHtAbGluayBTb3J0T3JkZXJ9XHJcbiAgICogQGxpc3RlbnMgY2xpY2tcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBsaXN0ZW5Gb3JTb3J0KGRlbGVnYXRlZFRhcmdldCwgY29sdW1ucywgc29ydE9yZGVyKXtcclxuICAgIGRlbGVnYXRlZFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZT0+e1xyXG4gICAgICAvLyBpZiBpdCdzIGEgdGFibGUgY2VsbCwgaXMgaW4gY29sdW1ucyBhcnJheSBhbmQgaXMgc29ydGFibGVcclxuICAgICAgbGV0IGNsaWNrZWRDb2x1bW47XHJcbiAgICAgIGZvcihsZXQgaT0wO2k8Y29sdW1ucy5sZW5ndGg7aSsrKXtcclxuICAgICAgICBpZihlLnRhcmdldD09Y29sdW1uc1tpXS5jZWxsIHx8IGUudGFyZ2V0PT1jb2x1bW5zW2ldLnJlZkNlbGwpe1xyXG4gICAgICAgICAgY2xpY2tlZENvbHVtbj0gY29sdW1uc1tpXTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKChlLnRhcmdldC50YWdOYW1lID09ICdURCcgfHwgZS50YXJnZXQudGFnTmFtZSA9PSAnVEgnKSAmJiBjbGlja2VkQ29sdW1uLnNvcnRhYmxlKXtcclxuICAgICAgICBzb3J0T3JkZXIucmVwbGFjZSh7Y29sdW1uOmNvbHVtbnMuaW5kZXhPZihjbGlja2VkQ29sdW1uKSwgZGlyZWN0aW9uOiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FzYycpPydkZXNjJzonYXNjJ30pO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIGNoYW5uZWxpbmcgb2Ygc29ydGluZyBiYXNlZCBvbiB3aGV0aGVyIGB0aGlzLmRhdGFgIGlzIGBtdWx0aWRpbWVuc2lvbmFsYFxyXG4gICAqIEBwYXJhbSB7U29ydE9yZGVyfSBzb3J0T3JkZXIgLSBpbnN0YW5jZSBvZiB7QGxpbmsgU29ydE9yZGVyfSBwYXNzZWQgYnkgdGhlIHtAbGluayBTb3J0T3JkZXIjc29ydH0gb24gaW5pdGlhbCBzb3J0XHJcbiAgICogQGZpcmVzIFNvcnRUYWJsZX5yZXBvcnRhbC10YWJsZS1zb3J0XHJcbiAgICogKi9cclxuICBzb3J0KHNvcnRPcmRlcil7XHJcbiAgICBsZXQgc28gPSBzb3J0T3JkZXIuc29ydE9yZGVyIHx8IHRoaXMuc29ydE9yZGVyLnNvcnRPcmRlcixcclxuICAgICAgY29sdW1ucyA9IHRoaXMuY29sdW1ucztcclxuICAgIGlmKHNvICYmIHNvLmxlbmd0aD4wKXtcclxuICAgICAgaWYoIXRoaXMubXVsdGlkaW1lbnNpb25hbCl7XHJcbiAgICAgICAgU29ydFRhYmxlLnNvcnREaW1lbnNpb24odGhpcy5kYXRhLCBjb2x1bW5zLCBzbyk7XHJcbiAgICAgIH0gZWxzZSB7IC8vIGlmIGFycmF5IGhhcyBuZXN0ZWQgYXJyYXkgYmxvY2tzXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goZGltZW5zaW9uPT57XHJcbiAgICAgICAgICBTb3J0VGFibGUuc29ydERpbWVuc2lvbihkaW1lbnNpb24sIHRoaXMuY29sdW1ucywgc28pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbHVtbnNbc29bMF0uY29sdW1uXS5jZWxsLmRpc3BhdGNoRXZlbnQodGhpcy5fc29ydEV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogU3BsaXRzIHNvcnRpbmcgaW50byBvbmUtY29sdW1uIG9yIHR3by1jb2x1bW4uIFRoZSBwcmVjZWRlbmNlIG9mIGNvbHVtbnMgaW4gYHNvcnRPcmRlcmAgaXMgdGhlIGZhY3RvciBkZWZpbmluZyBzb3J0IHByaW9yaXR5XHJcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YSAtIGFycmF5IGNvbnRhaW5pbmcgcm93IGl0ZW1zIHRvIGJlIHNvcnRlZFxyXG4gICAqIEBwYXJhbSB7VGFibGVDb2x1bW5zfSBjb2x1bW5zIC0gYXJyYXkgb2YgdGFibGUgY29sdW1ucyBmcm9tIHtAbGluayBTb3J0VGFibGUjZGVmaW5lU29ydGFibGVDb2x1bW5zfVxyXG4gICAqIEBwYXJhbSB7U29ydE9yZGVyfSBzb3J0T3JkZXIgLSBpbnN0YW5jZSBvZiB7QGxpbmsgU29ydE9yZGVyfVxyXG4gICAqICovXHJcbiAgc3RhdGljIHNvcnREaW1lbnNpb24oZGF0YSxjb2x1bW5zLHNvcnRPcmRlcil7XHJcbiAgICBsZXQgZ2V0SW5kZXggPSAoaSk9PntyZXR1cm4gY29sdW1uc1tzb3J0T3JkZXJbaV0uY29sdW1uXS5pbmRleH07XHJcbiAgICBsZXQgZ2V0RGlyZWN0aW9uPShpKT0+e3JldHVybiBzb3J0T3JkZXJbaV0uZGlyZWN0aW9uID09PSAnZGVzYycgPyAtMSA6IDF9O1xyXG4gICAgLy8gVE9ETzogYWRkIHBvc3NpYmlsaXR5IHRvIHNvcnQgdGhlIGRhdGEgdGhhdCB3YXMgc3RyaXBwZWQgYnkgY29sdW1uLlxyXG4gICAgZGF0YS5zb3J0KChhLCBiKT0+eyAvLyBzb3J0IHJvd3NcclxuICAgICAgaWYoc29ydE9yZGVyLmxlbmd0aD09MSl7IC8vc29ydCBvbmUgY29sdW1uIG9ubHlcclxuICAgICAgICByZXR1cm4gU29ydFRhYmxlLnNvcnRlciggYVtnZXRJbmRleCgwKV0sIGJbZ2V0SW5kZXgoMCldLCBnZXREaXJlY3Rpb24oMCkgKVxyXG4gICAgICB9IGVsc2UgeyAvL3NvcnQgYWdhaW5zdCB0d28gY29sdW1uc1xyXG4gICAgICAgIHJldHVybiBTb3J0VGFibGUuc29ydGVyKCBhW2dldEluZGV4KDApXSwgYltnZXRJbmRleCgwKV0sIGdldERpcmVjdGlvbigwKSApIHx8IFNvcnRUYWJsZS5zb3J0ZXIoIGFbZ2V0SW5kZXgoMSldLCBiW2dldEluZGV4KDEpXSwgZ2V0RGlyZWN0aW9uKDEpIClcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0aGF0IHBlcmZvcm1zIGNhc2UgaW5zZW5zaXRpdmUgc29ydGluZyBpbiB0aGUgYXJyYXkuIEl0IGNhbiBkaXN0aW5ndWlzaCBiZXR3ZWVuIG51bWJlcnMsIG51bWJlcnMgYXMgc3RyaW5ncywgSFRNTCBhbmQgcGxhaW4gc3RyaW5nc1xyXG4gICAqICovXHJcbiAgc3RhdGljIHNvcnRlcihhLGIsbGVzc2VyKXtcclxuICAgIGxldCByZWdleCA9IC9bPD5dL2c7XHJcbiAgICBpZihyZWdleC50ZXN0KGEpIHx8IHJlZ2V4LnRlc3QoYikpeyAvLyBpZiB3ZSBuZWVkIHRvIHNvcnQgZWxlbWVudHMgdGhhdCBoYXZlIEhUTUwgbGlrZSBsaW5rc1xyXG4gICAgICBsZXQgdGVtcEVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgdGVtcEVsMS5pbm5lckhUTUwgPSBhO1xyXG4gICAgICBhPXRlbXBFbDEudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgICBsZXQgdGVtcEVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgdGVtcEVsMi5pbm5lckhUTUwgPSBiO1xyXG4gICAgICBiPXRlbXBFbDIudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgaWYodHlwZW9mIGE9PSdvYmplY3QnICYmIHR5cGVvZiBhLmRhdGEgIT0gdW5kZWZpbmVkKXthPWEuZGF0YX1cclxuICAgIGlmKHR5cGVvZiBiPT0nb2JqZWN0JyAmJiB0eXBlb2YgYi5kYXRhICE9IHVuZGVmaW5lZCl7Yj1iLmRhdGF9XHJcbiAgICBpZighaXNOYU4oYSkgJiYgIWlzTmFOKGIpKXsgLy90aGV5IG1pZ2h0IGJlIG51bWJlcnMgb3IgbnVsbFxyXG4gICAgICBpZihhPT09bnVsbCl7cmV0dXJuIDF9IGVsc2UgaWYgKGI9PT1udWxsKXtyZXR1cm4gLTF9XHJcbiAgICAgIHJldHVybiBhIDwgIGIgPyBsZXNzZXIgOiAgYSA+ICBiID8gLWxlc3NlciA6IDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKCFpc05hTihwYXJzZUZsb2F0KGEpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChiKSkpeyAvLyB0aGV5IG1pZ2h0IGJlIG51bWJlciBzdHJpbmdzXHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEpIDwgIHBhcnNlRmxvYXQoYikgPyBsZXNzZXIgOiAgcGFyc2VGbG9hdChhKSA+ICBwYXJzZUZsb2F0KGIpID8gLWxlc3NlciA6IDA7XHJcbiAgICB9IGVsc2UgeyAvL3RoZXkgbWlnaHQgYmUgc2ltcGxlIHN0cmluZ3NcclxuICAgICAgcmV0dXJuIGEudG9Mb3dlckNhc2UoKSA8IGIudG9Mb3dlckNhc2UoKSA/IGxlc3NlciA6IGEudG9Mb3dlckNhc2UoKSA+IGIudG9Mb3dlckNhc2UoKSA/IC1sZXNzZXIgOiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNvcnRUYWJsZVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3Itc29ydC10YWJsZS9zcmMvc29ydC10YWJsZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDA5LjA5LjIwMTYuXHJcbiAqL1xyXG5cclxuY2xhc3MgVGFibGVDb2x1bW5ze1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBjb3JyZXNwb25kaW5nIHRvIHRoZSBjZWxscyBvZiBgZGVmYXVsdEhlYWRlclJvd2AsIHRoYXQgY29udGFpbiBgc29ydGFibGVgIHByb3BlcnR5LCBkZW5vdGluZyB0aGUgY29sdW1uIGlzIHNvcnRhYmxlLFxyXG4gICAqIGBpbmRleGAgb2YgdGhlIGNvbHVtbiBhbmQgcmVmZXJlbmNlIHRvIHRoZSBgY2VsbGAuIEFkZHMgYC5zb3J0YWJsZWAgdG8gYSBzb3J0YWJsZSBjZWxsXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHBhc3NlZCB0byBjb25maWd1cmUgdGhlIFNvcnRpbmdcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IG9wdGlvbnMuc291cmNlIC0gc291cmNlIHRhYmxlIHNvcnRpbmcgd2lsbCBiZSBhcHBsaWVkIHRvXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBvcHRpb25zLnJlZlNvdXJjZSAtIGZsb2F0aW5nIGhlYWRlciBpZiBhbnlcclxuICAgKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IFtvcHRpb25zLmRlZmF1bHRIZWFkZXJSb3c9LTFdIC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBoYXZlIHNvcnRpbmcgZW5hYmxlZCBmb3IgY29sdW1ucy4gSWYgYC0xYCB0aGVuIGxhc3Qgcm93LlxyXG4gICAqIEByZXR1cm4ge3tpbmRleDpOdW1iZXIsIHRpdGxlOlN0cmluZywgY29sU3BhbjpOdW1iZXIsIGNlbGw6IEhUTUxUYWJsZUNlbGxFbGVtZW50LCA/cmVmQ2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudH19IC0gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IGhhdmUgdGhpcyBzdHJ1Y3R1cmVcclxuICAgKiAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xyXG4gICAgbGV0IHtzb3VyY2UscmVmU291cmNlLGRlZmF1bHRIZWFkZXJSb3c9LTF9ID0gb3B0aW9ucztcclxuICAgIGxldCB0aGVhZCxyZWZUaGVhZDtcclxuICAgIGlmKHNvdXJjZSl7dGhlYWQ9VGFibGVDb2x1bW5zLmdldEhlYWRlcihzb3VyY2UpfSBlbHNlIHt0aHJvdyBuZXcgVHlwZUVycm9yKCdgc291cmNlYCB0YWJsZSBpcyBub3Qgc3BlY2lmaWVkLCBjYW5ub3QgY3JlYXRlIFRhYmxlQ29sdW1ucycpfVxyXG4gICAgaWYocmVmU291cmNlKXtyZWZUaGVhZD1UYWJsZUNvbHVtbnMuZ2V0SGVhZGVyKHJlZlNvdXJjZSl9XHJcbiAgICByZXR1cm4gVGFibGVDb2x1bW5zLmNvbXB1dGVDb2x1bW5zKHRoZWFkLHJlZlRoZWFkLGRlZmF1bHRIZWFkZXJSb3cpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGhlYWRlclxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gc291cmNlIC0gc291cmNlIHRhYmxlIGhlYWRlcnMgYXJlIGNyZWF0ZWQgZm9yXHJcbiAgICogKi9cclxuICBzdGF0aWMgZ2V0SGVhZGVyKHNvdXJjZSl7XHJcbiAgICBpZihzb3VyY2UgJiYgc291cmNlLnRhZ05hbWUgPT0gJ1RBQkxFJyl7XHJcbiAgICAgIGxldCBoZWFkZXIgPSBzb3VyY2UucXVlcnlTZWxlY3RvcihcInRoZWFkXCIpO1xyXG4gICAgICBpZihoZWFkZXIgJiYgaGVhZGVyLmNoaWxkcmVuLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgc291cmNlYCB0YWJsZSBoYXMgbm8gaGVhZGVyIG9yIHJvd3MnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYHNvdXJjZWAgaXMgbm90IHNwZWNpZmllZCBvciBpcyBub3QgYSB0YWJsZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyBkZWZhdWx0SGVhZGVyUm93IGZvciBhIHBhc3NlZCBgdGhlYWRgXHJcbiAgICogQHBhcmFtIHshSFRNTFRhYmxlRWxlbWVudH0gdGhlYWQgLSBzb3VyY2UgdGFibGUgaGVhZGVyXHJcbiAgICogQHBhcmFtIHshTnVtYmVyfSBkZWZhdWx0SGVhZGVyUm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGJlIGNvbnNpZGVyZWQgZGVmYXVsdCB0byBoYXZlIGFjdGlvbnMgZXhlY3V0ZWQgdXBvbi5cclxuICAgKiBAcmV0dXJuIHt7aW5kZXg6TnVtYmVyLCByb3c6IEhUTUxUYWJsZVJvd0VsZW1lbnR9fVxyXG4gICAqICovXHJcbiAgc3RhdGljIGdldERlZmF1bHRIZWFkZXJSb3codGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KXtcclxuICAgIC8vIGNhbGN1bGF0ZSBkZWZhdWx0IGhlYWRlciByb3dcclxuICAgIGxldCBoZWFkZXJSb3dzID0gdGhlYWQuY2hpbGRyZW4sXHJcbiAgICAgIGhlYWRlclJvd0luZGV4ID0gZGVmYXVsdEhlYWRlclJvd0luZGV4PT0tMSA/IGhlYWRlclJvd3MubGVuZ3RoICsgZGVmYXVsdEhlYWRlclJvd0luZGV4IDogZGVmYXVsdEhlYWRlclJvd0luZGV4O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5kZXg6aGVhZGVyUm93SW5kZXgsXHJcbiAgICAgIHJvdzpoZWFkZXJSb3dzLml0ZW0oaGVhZGVyUm93SW5kZXgpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhbiBhcnJheSBvZiBoZWFkZXIgY2VsbCBub2RlcyBmcm9tIGRlZmF1bHQgaGVhZGVyIHJvd1xyXG4gICAqIEBwYXJhbSB7P0hUTUxUYWJsZUVsZW1lbnR9IHRoZWFkIC0gc291cmNlIHRhYmxlIGhlYWRlclxyXG4gICAqIEBwYXJhbSB7IU51bWJlcn0gZGVmYXVsdEhlYWRlclJvd0luZGV4IC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBiZSBjb25zaWRlcmVkIGRlZmF1bHQgdG8gaGF2ZSBhY3Rpb25zIGV4ZWN1dGVkIHVwb24uXHJcbiAgICogQHJldHVybiB7P0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGhlYWRlciBjZWxsIG5vZGVzIG9yIG51bGwgaWYgYHRoZWFkYCBpcyBub3Qgc3BlY2lmaWVkXHJcbiAgICogKi9cclxuICBzdGF0aWMgZ2V0SGVhZGVyQ2VsbHModGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KXtcclxuICAgIGlmKHRoZWFkKXtcclxuICAgICAgaWYoZGVmYXVsdEhlYWRlclJvd0luZGV4IT1udWxsKXtcclxuICAgICAgICBsZXQgZGVmYXVsdEhlYWRlclJvdyA9IFRhYmxlQ29sdW1ucy5nZXREZWZhdWx0SGVhZGVyUm93KHRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCk7XHJcbiAgICAgICAgbGV0IGhlYWRlclJvd3MgPSB0aGVhZC5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgcm93c0xlbmd0aCA9IGhlYWRlclJvd3MubGVuZ3RoO1xyXG4gICAgICAgIGxldCBhYnN0ciA9IHt9O1xyXG4gICAgICAgIGZvcihsZXQgcj0wO3I8cm93c0xlbmd0aDtyKyspe1xyXG4gICAgICAgICAgbGV0IHJvdyA9IGhlYWRlclJvd3MuaXRlbShyKTtcclxuICAgICAgICAgIGxldCBhdWdtZW50SW5kZXg9MDsgLy8gaW5kZXggdGhhdCB3aWxsIGFjY291bnQgZm9yIGNvbFNwYW4gb2YgdXBwZXIgcm93cycgY2VsbHNcclxuICAgICAgICAgIFtdLnNsaWNlLmNhbGwocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLGluZGV4KT0+eyAvL2l0ZXJhdGUgdGhyb3VnaCBjZWxsc1xyXG4gICAgICAgICAgICBmb3IobGV0IHJzPTA7IHJzPD1jZWxsLnJvd1NwYW4tMTtycysrKXsgLy9zcHJlYWQgY2VsbCBhY3Jvc3MgaXRzIHJvd3NwYW5cclxuICAgICAgICAgICAgICBsZXQgcm93QSA9IGFic3RyW3IrcnNdID0gYWJzdHJbcityc10gfHwge307IC8vY3JlYXRlIHJvdyBpZiBub3QgZXhpc3RzXHJcbiAgICAgICAgICAgICAgaWYoIXJvd0FbYXVnbWVudEluZGV4XSl7IC8vaW5zZXJ0IGNlbGwgaW50byBzbG90IGlmIG5vdCBmaWxsZWRcclxuICAgICAgICAgICAgICAgIHJvd0FbYXVnbWVudEluZGV4XT1jZWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7IC8vaWYgZmlsbGVkIGxvb2sgZm9yIHRoZSBuZXh0IGVtcHR5IGJlY2F1c2Ugcm93c3Bhbm5lZCBjb2x1bW5zIGZpbGwgdGhlbSBpbiBhIGxpbmVhciB3YXlcclxuICAgICAgICAgICAgICAgIGxldCBpPTA7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSh0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgaWYoIXJvd0FbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0FbaV09Y2VsbDtcclxuICAgICAgICAgICAgICAgICAgICBhdWdtZW50SW5kZXg9aTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGF1Z21lbnRJbmRleCs9Y2VsbC5jb2xTcGFuO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGFic3RyW2RlZmF1bHRIZWFkZXJSb3cuaW5kZXhdKS5tYXAoayA9PiBhYnN0cltkZWZhdWx0SGVhZGVyUm93LmluZGV4XVtrXSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUYWJsZUNvbHVtbnMuZ2V0SGVhZGVyQ2VsbHM6IGRlZmF1bHRIZWFkZXJSb3dJbmRleCBpcyBub3Qgc3BlY2lmaWVkIG9yIGlzIG5vdCBhIE51bWJlcicpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGNvbHVtbnMgZnJvbSB0aGUgdGFibGVcclxuICAgKiBAcGFyYW0geyFIVE1MVGFibGVFbGVtZW50fSB0aGVhZCAtIHNvdXJjZSB0YWJsZSBoZWFkZXJcclxuICAgKiBAcGFyYW0geyFIVE1MVGFibGVFbGVtZW50fSByZWZUaGVhZCAtIHJlZmVyZW5jZSB0YWJsZSBoZWFkZXIgZnJvbSBmbG9hdGluZyBoZWFkZXIgaWYgYW55XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlZmF1bHRIZWFkZXJSb3dJbmRleCAtIGluZGV4IG9mIHRoZSByb3cgaW4gYHRoZWFkYCAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgYmUgY29uc2lkZXJlZCBkZWZhdWx0IHRvIGhhdmUgYWN0aW9ucyBleGVjdXRlZCB1cG9uLlxyXG4gICAqIEByZXR1cm4gez9BcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBoZWFkZXIgY2VsbCBub2RlcyBvciBudWxsIGlmIGB0aGVhZGAgaXMgbm90IHNwZWNpZmllZFxyXG4gICAqICovXHJcbiAgc3RhdGljIGNvbXB1dGVDb2x1bW5zKHRoZWFkLHJlZlRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCl7XHJcbiAgICBsZXQgdGhlYWRDZWxscyA9IFRhYmxlQ29sdW1ucy5nZXRIZWFkZXJDZWxscyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpO1xyXG4gICAgbGV0IHJlZlRoZWFkQ2VsbHMgPSBUYWJsZUNvbHVtbnMuZ2V0SGVhZGVyQ2VsbHMocmVmVGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KTtcclxuICAgIGxldCByZWFsQ29sdW1uSW5kZXg9MDtcclxuICAgIHJldHVybiB0aGVhZENlbGxzLm1hcCgoY2VsbCxpbmRleCk9PntcclxuICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBpbmRleDogcmVhbENvbHVtbkluZGV4LFxyXG4gICAgICAgIHRpdGxlOiBjZWxsLnRleHRDb250ZW50LFxyXG4gICAgICAgIGNlbGwsXHJcbiAgICAgICAgY29sU3BhbjpjZWxsLmNvbFNwYW5cclxuICAgICAgfTtcclxuICAgICAgaWYocmVmVGhlYWRDZWxscyE9bnVsbCl7b2JqLnJlZkNlbGwgPSByZWZUaGVhZENlbGxzW2luZGV4XX1cclxuICAgICAgLy8gd2UgbmVlZCB0byBpbmNyZW1lbnQgdGhlIGNvbHNwYW4gb25seSBmb3IgY29sdW1ucyB0aGF0IGZvbGxvdyByb3doZWFkZXIgYmVjYXVzZSB0aGUgYmxvY2sgaXMgbm90IGluIGRhdGEuXHJcbiAgICAgIHJlYWxDb2x1bW5JbmRleD0gcmVhbENvbHVtbkluZGV4PjA/KHJlYWxDb2x1bW5JbmRleCArIGNlbGwuY29sU3Bhbik6cmVhbENvbHVtbkluZGV4KzE7XHJcbiAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVGFibGVDb2x1bW5zO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3Itc29ydC10YWJsZS9zcmMvdGFibGUtY29sdW1ucy5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDA3LjA5LjIwMTYuXHJcbiAqL1xyXG5pbXBvcnQgVGFibGVDb2x1bW5zIGZyb20gXCIuL3RhYmxlLWNvbHVtbnNcIjtcclxuaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcblxyXG53aW5kb3cuUmVwb3J0YWwgPSB3aW5kb3cuUmVwb3J0YWwgfHwge307XHJcblJlcG9ydGFsQmFzZS5taXhpbih3aW5kb3cuUmVwb3J0YWwse1xyXG4gIFRhYmxlQ29sdW1ucyxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbnM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci10YWJsZS1jb2x1bW5zL3NyYy9tYWluLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMDkuMDkuMjAxNi5cclxuICovXHJcblxyXG5jbGFzcyBUYWJsZUNvbHVtbnN7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvYmplY3RzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNlbGxzIG9mIGBkZWZhdWx0SGVhZGVyUm93YC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgcGFzc2VkIHRvIGNvbmZpZ3VyZSB0aGUgU29ydGluZ1xyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgc29ydGluZyB3aWxsIGJlIGFwcGxpZWQgdG9cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IG9wdGlvbnMucmVmU291cmNlIC0gZmxvYXRpbmcgaGVhZGVyIGlmIGFueVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gW29wdGlvbnMuZGVmYXVsdEhlYWRlclJvdz0tMV0gLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGhhdmUgc29ydGluZyBlbmFibGVkIGZvciBjb2x1bW5zLiBJZiBgLTFgIHRoZW4gbGFzdCByb3cuXHJcbiAgICogQHJldHVybiB7e2luZGV4Ok51bWJlciwgdGl0bGU6U3RyaW5nLCBjb2xTcGFuOk51bWJlciwgY2VsbDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQsID9yZWZDZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50fX0gLSBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgaGF2ZSB0aGlzIHN0cnVjdHVyZVxyXG4gICAqICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucyl7XHJcbiAgICBsZXQge3NvdXJjZSxyZWZTb3VyY2UsZGVmYXVsdEhlYWRlclJvdz0tMX0gPSBvcHRpb25zO1xyXG4gICAgbGV0IHRoZWFkLHJlZlRoZWFkO1xyXG4gICAgaWYoc291cmNlKXt0aGVhZD1UYWJsZUNvbHVtbnMuZ2V0SGVhZGVyKHNvdXJjZSl9IGVsc2Uge3Rocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIHRhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIGNhbm5vdCBjcmVhdGUgVGFibGVDb2x1bW5zJyl9XHJcbiAgICBpZihyZWZTb3VyY2Upe3JlZlRoZWFkPVRhYmxlQ29sdW1ucy5nZXRIZWFkZXIocmVmU291cmNlKX1cclxuICAgIHJldHVybiBUYWJsZUNvbHVtbnMuY29tcHV0ZUNvbHVtbnModGhlYWQscmVmVGhlYWQsZGVmYXVsdEhlYWRlclJvdyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGEgaGVhZGVyXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGUgaGVhZGVycyBhcmUgY3JlYXRlZCBmb3JcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBnZXRIZWFkZXIoc291cmNlKXtcclxuICAgIGlmKHNvdXJjZSAmJiBzb3VyY2UudGFnTmFtZSA9PSAnVEFCTEUnKXtcclxuICAgICAgbGV0IGhlYWRlciA9IHNvdXJjZS5xdWVyeVNlbGVjdG9yKFwidGhlYWRcIik7XHJcbiAgICAgIGlmKGhlYWRlciAmJiBoZWFkZXIuY2hpbGRyZW4ubGVuZ3RoPjApIHtcclxuICAgICAgICByZXR1cm4gaGVhZGVyO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIHRhYmxlIGhhcyBubyBoZWFkZXIgb3Igcm93cycpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgc291cmNlYCBpcyBub3Qgc3BlY2lmaWVkIG9yIGlzIG5vdCBhIHRhYmxlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGVzIGRlZmF1bHRIZWFkZXJSb3cgZm9yIGEgcGFzc2VkIGB0aGVhZGBcclxuICAgKiBAcGFyYW0geyFIVE1MVGFibGVFbGVtZW50fSB0aGVhZCAtIHNvdXJjZSB0YWJsZSBoZWFkZXJcclxuICAgKiBAcGFyYW0geyFOdW1iZXJ9IGRlZmF1bHRIZWFkZXJSb3dJbmRleCAtIGluZGV4IG9mIHRoZSByb3cgaW4gYHRoZWFkYCAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgYmUgY29uc2lkZXJlZCBkZWZhdWx0IHRvIGhhdmUgYWN0aW9ucyBleGVjdXRlZCB1cG9uLlxyXG4gICAqIEByZXR1cm4ge3tpbmRleDpOdW1iZXIsIHJvdzogSFRNTFRhYmxlUm93RWxlbWVudH19XHJcbiAgICogKi9cclxuICBzdGF0aWMgZ2V0RGVmYXVsdEhlYWRlclJvdyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpe1xyXG4gICAgLy8gY2FsY3VsYXRlIGRlZmF1bHQgaGVhZGVyIHJvd1xyXG4gICAgbGV0IGhlYWRlclJvd3MgPSB0aGVhZC5jaGlsZHJlbixcclxuICAgICAgaGVhZGVyUm93SW5kZXggPSBkZWZhdWx0SGVhZGVyUm93SW5kZXg9PS0xID8gaGVhZGVyUm93cy5sZW5ndGggKyBkZWZhdWx0SGVhZGVyUm93SW5kZXggOiBkZWZhdWx0SGVhZGVyUm93SW5kZXg7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbmRleDpoZWFkZXJSb3dJbmRleCxcclxuICAgICAgcm93OmhlYWRlclJvd3MuaXRlbShoZWFkZXJSb3dJbmRleClcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGhlYWRlciBjZWxsIG5vZGVzIGZyb20gZGVmYXVsdCBoZWFkZXIgcm93XHJcbiAgICogQHBhcmFtIHs/SFRNTFRhYmxlRWxlbWVudH0gdGhlYWQgLSBzb3VyY2UgdGFibGUgaGVhZGVyXHJcbiAgICogQHBhcmFtIHshTnVtYmVyfSBkZWZhdWx0SGVhZGVyUm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGJlIGNvbnNpZGVyZWQgZGVmYXVsdCB0byBoYXZlIGFjdGlvbnMgZXhlY3V0ZWQgdXBvbi5cclxuICAgKiBAcmV0dXJuIHs/QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgaGVhZGVyIGNlbGwgbm9kZXMgb3IgbnVsbCBpZiBgdGhlYWRgIGlzIG5vdCBzcGVjaWZpZWRcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBnZXRIZWFkZXJDZWxscyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpe1xyXG4gICAgaWYodGhlYWQpe1xyXG4gICAgICBpZihkZWZhdWx0SGVhZGVyUm93SW5kZXghPW51bGwpe1xyXG4gICAgICAgIGxldCBkZWZhdWx0SGVhZGVyUm93ID0gVGFibGVDb2x1bW5zLmdldERlZmF1bHRIZWFkZXJSb3codGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KTtcclxuICAgICAgICBsZXQgaGVhZGVyUm93cyA9IHRoZWFkLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCByb3dzTGVuZ3RoID0gaGVhZGVyUm93cy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGFic3RyID0ge307XHJcbiAgICAgICAgZm9yKGxldCByPTA7cjxyb3dzTGVuZ3RoO3IrKyl7XHJcbiAgICAgICAgICBsZXQgcm93ID0gaGVhZGVyUm93cy5pdGVtKHIpO1xyXG4gICAgICAgICAgbGV0IGF1Z21lbnRJbmRleD0wOyAvLyBpbmRleCB0aGF0IHdpbGwgYWNjb3VudCBmb3IgY29sU3BhbiBvZiB1cHBlciByb3dzJyBjZWxsc1xyXG4gICAgICAgICAgW10uc2xpY2UuY2FsbChyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsaW5kZXgpPT57IC8vaXRlcmF0ZSB0aHJvdWdoIGNlbGxzXHJcbiAgICAgICAgICAgIGZvcihsZXQgcnM9MDsgcnM8PWNlbGwucm93U3Bhbi0xO3JzKyspeyAvL3NwcmVhZCBjZWxsIGFjcm9zcyBpdHMgcm93c3BhblxyXG4gICAgICAgICAgICAgIGxldCByb3dBID0gYWJzdHJbcityc10gPSBhYnN0cltyK3JzXSB8fCB7fTsgLy9jcmVhdGUgcm93IGlmIG5vdCBleGlzdHNcclxuICAgICAgICAgICAgICBpZighcm93QVthdWdtZW50SW5kZXhdKXsgLy9pbnNlcnQgY2VsbCBpbnRvIHNsb3QgaWYgbm90IGZpbGxlZFxyXG4gICAgICAgICAgICAgICAgcm93QVthdWdtZW50SW5kZXhdPWNlbGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHsgLy9pZiBmaWxsZWQgbG9vayBmb3IgdGhlIG5leHQgZW1wdHkgYmVjYXVzZSByb3dzcGFubmVkIGNvbHVtbnMgZmlsbCB0aGVtIGluIGEgbGluZWFyIHdheVxyXG4gICAgICAgICAgICAgICAgbGV0IGk9MDtcclxuICAgICAgICAgICAgICAgIHdoaWxlKHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICBpZighcm93QVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QVtpXT1jZWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1Z21lbnRJbmRleD1pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXVnbWVudEluZGV4Kz1jZWxsLmNvbFNwYW47XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYWJzdHJbZGVmYXVsdEhlYWRlclJvdy5pbmRleF0pLm1hcChrID0+IGFic3RyW2RlZmF1bHRIZWFkZXJSb3cuaW5kZXhdW2tdKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RhYmxlQ29sdW1ucy5nZXRIZWFkZXJDZWxsczogZGVmYXVsdEhlYWRlclJvd0luZGV4IGlzIG5vdCBzcGVjaWZpZWQgb3IgaXMgbm90IGEgTnVtYmVyJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYW4gYXJyYXkgb2YgY29sdW1ucyBmcm9tIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUVsZW1lbnR9IHRoZWFkIC0gc291cmNlIHRhYmxlIGhlYWRlclxyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUVsZW1lbnR9IHJlZlRoZWFkIC0gcmVmZXJlbmNlIHRhYmxlIGhlYWRlciBmcm9tIGZsb2F0aW5nIGhlYWRlciBpZiBhbnlcclxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVmYXVsdEhlYWRlclJvd0luZGV4IC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBiZSBjb25zaWRlcmVkIGRlZmF1bHQgdG8gaGF2ZSBhY3Rpb25zIGV4ZWN1dGVkIHVwb24uXHJcbiAgICogQHJldHVybiB7P0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGhlYWRlciBjZWxsIG5vZGVzIG9yIG51bGwgaWYgYHRoZWFkYCBpcyBub3Qgc3BlY2lmaWVkXHJcbiAgICogKi9cclxuICBzdGF0aWMgY29tcHV0ZUNvbHVtbnModGhlYWQscmVmVGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KXtcclxuICAgIGxldCB0aGVhZENlbGxzID0gVGFibGVDb2x1bW5zLmdldEhlYWRlckNlbGxzKHRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCk7XHJcbiAgICBsZXQgcmVmVGhlYWRDZWxscyA9IFRhYmxlQ29sdW1ucy5nZXRIZWFkZXJDZWxscyhyZWZUaGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpO1xyXG4gICAgbGV0IHJlYWxDb2x1bW5JbmRleD0wO1xyXG4gICAgcmV0dXJuIHRoZWFkQ2VsbHMubWFwKChjZWxsLGluZGV4KT0+e1xyXG4gICAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIGluZGV4OiByZWFsQ29sdW1uSW5kZXgsXHJcbiAgICAgICAgdGl0bGU6IGNlbGwudGV4dENvbnRlbnQsXHJcbiAgICAgICAgY2VsbCxcclxuICAgICAgICBjb2xTcGFuOmNlbGwuY29sU3BhblxyXG4gICAgICB9O1xyXG4gICAgICBpZihyZWZUaGVhZENlbGxzIT1udWxsKXtvYmoucmVmQ2VsbCA9IHJlZlRoZWFkQ2VsbHNbaW5kZXhdfVxyXG4gICAgICAvLyB3ZSBuZWVkIHRvIGluY3JlbWVudCB0aGUgY29sc3BhbiBvbmx5IGZvciBjb2x1bW5zIHRoYXQgZm9sbG93IHJvd2hlYWRlciBiZWNhdXNlIHRoZSBibG9jayBpcyBub3QgaW4gZGF0YS5cclxuICAgICAgcmVhbENvbHVtbkluZGV4PSByZWFsQ29sdW1uSW5kZXg+MD8ocmVhbENvbHVtbkluZGV4ICsgY2VsbC5jb2xTcGFuKTpyZWFsQ29sdW1uSW5kZXgrMTtcclxuICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbnM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci10YWJsZS1jb2x1bW5zL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwiaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcblxyXG52YXIgVGFibGVGbG9hdGluZ0hlYWRlclN0eWxlID0gcmVxdWlyZSgnLi90YWJsZS1mbG9hdGluZy1oZWFkZXItc3R5bGVzLmNzcycpO1xyXG5cclxuLyoqXHJcbiAqIEZpeGVkSGVhZGVyIGNsYXNzIGVuYWJsZXMgYSBmaXhlZCBoZWFkZXIgYXBwZWFyIG9uIHRhYmxlcyB0aGF0IGhhdmUgYC5yZXBvcnRhbC1maXhlZC1oZWFkZXJgIGNsYXNzIHdoZW4gdGhlIHRhYmxlIGhlYWRlciBpcyBzY3JvbGxlZCB1bmRlciBhZGRyZXNzIGJhci5cclxuICovXHJcbmNsYXNzIFRhYmxlRmxvYXRpbmdIZWFkZXIge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gc291cmNlIC0gc291cmNlIHRhYmxlIHRoYXQgbmVlZHMgYSBjbG9uZWQgaGVhZGVyXHJcbiAgICogKi9cclxuICBjb25zdHJ1Y3Rvcihzb3VyY2Upe1xyXG4gICAgaWYodHlwZW9mIHNvdXJjZSA9PSB1bmRlZmluZWQgfHwgc291cmNlLnRhZ05hbWUgIT0gJ1RBQkxFJyl7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIG11c3QgYmUgZGVmaW5lZCBhbmQgbXVzdCBiZSBhIHRhYmxlJylcclxuICAgIH1cclxuXHJcbiAgICBUYWJsZUZsb2F0aW5nSGVhZGVyLndyYXBUYWJsZShzb3VyY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFRoZSBjbG9uZWQgZmxvYXRpbmcgaGVhZGVyIHdpdGhvdXQgVEJPRFlcclxuICAgICAqICBAdHlwZSB7SFRNTFRhYmxlRWxlbWVudH1cclxuICAgICAqICBAbWVtYmVyT2YgVGFibGVGbG9hdGluZ0hlYWRlclxyXG4gICAgICogICovXHJcbiAgICB0aGlzLmhlYWRlciAgPSBUYWJsZUZsb2F0aW5nSGVhZGVyLmNsb25lSGVhZGVyKHNvdXJjZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVGhlIHNvdXJjZSB0YWJsZVxyXG4gICAgICogIEB0eXBlIHtIVE1MVGFibGVFbGVtZW50fVxyXG4gICAgICogIEBtZW1iZXJPZiBUYWJsZUZsb2F0aW5nSGVhZGVyXHJcbiAgICAgKiAgKi9cclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiAgVmlzaWJpbGl0eSBzdGF0dXMgb2YgdGhlIHRhYmxlXHJcbiAgICAgKiAgQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgKiAgQG1lbWJlck9mIFRhYmxlRmxvYXRpbmdIZWFkZXJcclxuICAgICAqICAqL1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fbWV0YSA9IHtcclxuICAgICAgbGFzdFNjcm9sbFk6MCxcclxuICAgICAgc291cmNlVEhFQUQ6IHNvdXJjZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCcpLFxyXG4gICAgICB0aWNraW5nOmZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcblxyXG4gICAgdGhpcy5yZXNpemVGaXhlZCgpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpPT50aGlzLnJlc2l6ZUZpeGVkLmNhbGwodGhpcyksIGZhbHNlKTsgLy8gYXR0YWNoIGEgcmVzaXplIGxpc3RlbmVyIHRvIHJlc2l6ZSB0aGUgaGVhZGVyXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKT0+dGhpcy5zY3JvbGxGaXhlZC5jYWxsKHRoaXMpLCBmYWxzZSk7IC8vIGF0dGFjaCBhIHJlc2l6ZSBsaXN0ZW5lciB0byByZXNpemUgdGhlIGhlYWRlclxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FsY3VsYXRlcyBvZmZzZXQgaGVpZ2h0IG9mIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gc291cmNlIC0gc291cmNlIHRhYmxlXHJcbiAgICogKi9cclxuICBzdGF0aWMgY2FsY09mZnNldEhlaWdodChzb3VyY2Upe1xyXG4gICAgdGhpcy5fbWV0YS50YWJsZU9mZnNldFRvcCA9IHNvdXJjZS5wYXJlbnROb2RlLm9mZnNldFRvcDtcclxuICAgIHRoaXMuX21ldGEudGFibGVPZmZzZXRCb3R0b20gPSBzb3VyY2UucGFyZW50Tm9kZS5vZmZzZXRUb3AgKyBzb3VyY2Uub2Zmc2V0SGVpZ2h0IC0gdGhpcy5fbWV0YS5zb3VyY2VUSEVBRC5vZmZzZXRIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFdmVudCByZXBvcnRpbmcgdGhhdCBhIGhlYWRlciBpcyB2aXNpYmxlXHJcbiAgICogQGV2ZW50IFRhYmxlRmxvYXRpbmdIZWFkZXJ+cmVwb3J0YWwtZml4ZWQtaGVhZGVyLXZpc2libGVcclxuICAgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgcmVwb3J0aW5nIHRoYXQgYSBoZWFkZXIgaXMgaGlkZGVuXHJcbiAgICogQGV2ZW50IFRhYmxlRmxvYXRpbmdIZWFkZXJ+cmVwb3J0YWwtZml4ZWQtaGVhZGVyLWhpZGRlblxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBzZXRzIHZpc2liaWxpdHkgb2YgdGhlIHRhYmxlXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGVcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IGhlYWRlciAtIGNsb25lZCB0YWJsZSB3aXRoIGhlYWRlciBvbmx5XHJcbiAgICogQHBhcmFtIHtCb29sZWFufSB2aXNpYmxlIC0gdmlzaWJpbGl0eSBzdGF0dXNcclxuICAgKiBAZmlyZXMgVGFibGVGbG9hdGluZ0hlYWRlcn5yZXBvcnRhbC1maXhlZC1oZWFkZXItdmlzaWJsZVxyXG4gICAqIEBmaXJlcyBUYWJsZUZsb2F0aW5nSGVhZGVyfnJlcG9ydGFsLWZpeGVkLWhlYWRlci12aXNpYmxlXHJcbiAgICogKi9cclxuICBzdGF0aWMgc2V0VmlzaWJpbGl0eShzb3VyY2UsIGhlYWRlciwgdmlzaWJsZSl7XHJcbiAgICBpZih2aXNpYmxlKXtcclxuICAgICAgaGVhZGVyLnN0eWxlLmRpc3BsYXk9J3RhYmxlJztcclxuICAgICAgc291cmNlLmRpc3BhdGNoRXZlbnQoUmVwb3J0YWxCYXNlLm5ld0V2ZW50KCdyZXBvcnRhbC1maXhlZC1oZWFkZXItdmlzaWJsZScpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhlYWRlci5zdHlsZS5kaXNwbGF5PSdub25lJztcclxuICAgICAgc291cmNlLmRpc3BhdGNoRXZlbnQoUmVwb3J0YWxCYXNlLm5ld0V2ZW50KCdyZXBvcnRhbC1maXhlZC1oZWFkZXItaGlkZGVuJykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogd3JhcHMgdGhlIGBzb3VyY2VgIHRhYmxlIGludG8gYSBgZGl2LmFnZ3JlZ2F0ZWRUYWJsZUNvbnRhaW5lcmBcclxuICAgKiAqL1xyXG4gIHN0YXRpYyB3cmFwVGFibGUoc291cmNlKXtcclxuICAgIGxldCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2FnZ3JlZ2F0ZWRUYWJsZUNvbnRhaW5lcicpO1xyXG4gICAgc291cmNlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjbG9uZXMgaGVhZGVyIG9mIGBzb3VyY2VgIHRhYmxlIGFuZCBhcHBlbmRzIHRvIHdyYXBwZXJcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBjbG9uZUhlYWRlcihzb3VyY2Upe1xyXG4gICAgbGV0IGhlYWRlciA9IHNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnZml4ZWQnKTtcclxuICAgIHNvdXJjZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICBbXS5zbGljZS5jYWxsKGhlYWRlci5jaGlsZHJlbikuZm9yRWFjaChjaGlsZD0+e1xyXG4gICAgICBpZihjaGlsZC5ub2RlTmFtZT09J1RCT0RZJyl7XHJcbiAgICAgICAgaGVhZGVyLnJlbW92ZUNoaWxkKGNoaWxkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaGVhZGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZnVuY3Rpb24gdGhhdCBwb2xscyB0aGUgY2FsbGJhY2tcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRoYXQncyBnb2luZyB0byBiZSBwYXNzZWQgdG8gYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgZm9yIGV4ZWN1dGlvblxyXG4gICAqICovXHJcbiAgcmVxdWVzdFRpY2soY2FsbGJhY2spe1xyXG4gICAgaWYoIXRoaXMuX21ldGEudGlja2luZykge1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xyXG4gICAgICB0aGlzLl9tZXRhLnRpY2tpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIF9yZXNpemVDYWxsYmFjaygpe1xyXG4gICAgbGV0IGluaXRpYWxIZWFkZXIgPSB0aGlzLl9tZXRhLnNvdXJjZVRIRUFELnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyPionKSxcclxuICAgICAgY2xvbmVkSGVhZGVyID0gdGhpcy5oZWFkZXIucXVlcnlTZWxlY3RvckFsbCgndGhlYWQ+dHI+KicpLFxyXG4gICAgICBoZWFkZXJXaWR0aCA9IHRoaXMuc291cmNlLm9mZnNldFdpZHRoICsgJ3B4JyxcclxuICAgICAgd2lkdGhzPVtdO1xyXG4gICAgLy8gZG8gcmVmbG93XHJcbiAgICBmb3IobGV0IGk9MDtpPGluaXRpYWxIZWFkZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgIHdpZHRocy5wdXNoKGluaXRpYWxIZWFkZXJbaV0ub2Zmc2V0V2lkdGgpO1xyXG4gICAgfVxyXG4gICAgLy9kbyByZXBhaW50XHJcbiAgICBmb3IobGV0IGM9MDtjPGNsb25lZEhlYWRlci5sZW5ndGg7YysrKXtcclxuICAgICAgY2xvbmVkSGVhZGVyW2NdLnN0eWxlLndpZHRoID0gd2lkdGhzW2NdICsgJ3B4JztcclxuICAgIH1cclxuICAgIHRoaXMuaGVhZGVyLnN0eWxlLndpZHRoID0gaGVhZGVyV2lkdGg7XHJcblxyXG4gICAgVGFibGVGbG9hdGluZ0hlYWRlci5jYWxjT2Zmc2V0SGVpZ2h0LmNhbGwodGhpcyx0aGlzLnNvdXJjZSk7IC8vcmVjYWxjIGhlaWdodCBvZiB0aGUgdGFibGUgYWZ0ZXIgcmVmbG93XHJcbiAgICB0aGlzLl9tZXRhLnRpY2tpbmc9ZmFsc2U7XHJcbiAgICB0aGlzLnNjcm9sbEZpeGVkKCk7IC8vIHRvIGNvbXBlbnNhdGUgdG9wIG9mZnNldCBpbiBjYXNlIGFmdGVyIHJlc2l6ZSB0aGUgdGFibGUgaXMgbGVzcyBpbiBoZWlnaHQgYW5kIHRvcCBoYXMgY2hhbmdlZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyB3aWR0aHMgZm9yIGFsbCBjb2x1bW5zIGluIHRoZSBmaXhlZCBoZWFkZXIgYmFzZWQgb24gdGhlIGBzb3VyY2VgXHJcbiAgICogKi9cclxuICByZXNpemVGaXhlZCgpe1xyXG4gICAgdGhpcy5yZXF1ZXN0VGljayhUYWJsZUZsb2F0aW5nSGVhZGVyLl9yZXNpemVDYWxsYmFjay5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcblxyXG4gIHN0YXRpYyBfc2Nyb2xsQ2FsbGJhY2soKXtcclxuICAgIGxldCBvZmZzZXQgPSB0aGlzLl9tZXRhLmxhc3RTY3JvbGxZLFxyXG4gICAgICB0YWJsZU9mZnNldFRvcCA9IHRoaXMuX21ldGEudGFibGVPZmZzZXRUb3AsXHJcbiAgICAgIHRhYmxlT2Zmc2V0Qm90dG9tID0gdGhpcy5fbWV0YS50YWJsZU9mZnNldEJvdHRvbTtcclxuICAgIGlmKChvZmZzZXQgPCB0YWJsZU9mZnNldFRvcCB8fCBvZmZzZXQgPiB0YWJsZU9mZnNldEJvdHRvbSkgJiYgdGhpcy52aXNpYmxlKXtcclxuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIFRhYmxlRmxvYXRpbmdIZWFkZXIuc2V0VmlzaWJpbGl0eSh0aGlzLnNvdXJjZSx0aGlzLmhlYWRlcixmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKG9mZnNldCA+PSB0YWJsZU9mZnNldFRvcCAmJiBvZmZzZXQgPD0gdGFibGVPZmZzZXRCb3R0b20pe1xyXG4gICAgICB0aGlzLmhlYWRlci5zdHlsZS50b3A9b2Zmc2V0LXRhYmxlT2Zmc2V0VG9wKydweCc7XHJcbiAgICAgIGlmKCF0aGlzLnZpc2libGUpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIFRhYmxlRmxvYXRpbmdIZWFkZXIuc2V0VmlzaWJpbGl0eSh0aGlzLnNvdXJjZSx0aGlzLmhlYWRlcix0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fbWV0YS50aWNraW5nPWZhbHNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BsYXlzIGEgZml4ZWQgaGVhZGVyIHdoZW4gdGhlIHRhYmxlIGhlYWRlciBpcyBzY3JvbGxlZCBvZmYgdGhlIHNjcmVlblxyXG4gICAqICovXHJcbiAgc2Nyb2xsRml4ZWQoKSB7XHJcbiAgICAgIHRoaXMuX21ldGEubGFzdFNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgIHRoaXMucmVxdWVzdFRpY2soVGFibGVGbG9hdGluZ0hlYWRlci5fc2Nyb2xsQ2FsbGJhY2suYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFibGVGbG9hdGluZ0hlYWRlcjtcclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItdGFibGUtZmxvYXRpbmctaGVhZGVyL3NyYy90YWJsZS1mbG9hdGluZy1oZWFkZXIuanMiLCJyZXF1aXJlKFwiLi9kcmlsbGRvd24tbWFwLmNzc1wiKTtcbmltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xuaW1wb3J0IEFzeW5jSGllcmFyY2h5VGFibGUgZnJvbSBcInItYXN5bmMtaGllcmFyY2h5LXRhYmxlXCI7XG5pbXBvcnQgTWFwSGllcmFyY2h5IGZyb20gXCIuL21hcC1oaWVyYXJjaHlcIjtcbmltcG9ydCBBZ2dyZWdhdGVkVGFibGUgZnJvbSBcInItYWdncmVnYXRlZC10YWJsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmlsbGRvd25NYXAge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIGRyaWxsZG93biBtYXAuIEl0IHVzZXMgYSBjb2xvciBmdW5jdGlvbiBgY29sb3JGbmAgdGhhdCBhbGxvd3MgY29sb3Jjb2RlIGNvdW50cmllc1xuICAgKiBgY29sb3JGbmAgYWNjZXB0cyB0d28gYXR0cmlidXRlczogYHZhbHVlYCBhbmQgYHRhcmdldGAgYW5kIG11c3QgcmV0dXJuIGEgY29sb3Igc3RyaW5nIGJhc2VkIG9uIHRob3NlIHR3byBhdHRyaWJ1dGVzLlxuICAgKiBNYWtlIHN1cmUgaGllcmFyY2h5IGhhcyBgdGFyZ2V0YCBsb2FkZWQgZnJvbSBEQkRlc2lnbmVyIHRhYmxlIGludG8gZWFjaCBoaWVyYXJjaHkgbGV2ZWwsIG90aGVyd2lzZSBhIGRlZmF1bHQgY29uZmlnIGBkYXRhQ2xhc3Nlc2AgdGFrZXMgcHJlY2VkZW5jZSBvbiB2YWx1ZVxuICAgKiBFeGFtcGxlOlxuICAgKlxuICAgKiAgICB7XG4gICAqICAgIC8vc29tZSBjb25zdHJ1Y3RvciBjb25maWd1cmF0aW9uIGFib3ZlXG4gICAqICAgICAgY29sb3JGbjogZnVuY3Rpb24odmFsdWUsdGFyZ2V0KXtcbiAgICogICAgICAgIHJldHVybiAodmFsdWUhPW51bGwgJiYgdGFyZ2V0IT1udWxsKT8gKHZhbHVlIC0gdGFyZ2V0ID49IDApID8gXCIjMThCQzlDXCIgOiAoKHZhbHVlID49IDAuOSp0YXJnZXQpID8gXCIjRkY0OTAwXCIgOiBcIiNFNDUzMzVcIikgOiB1bmRlZmluZWQ7XG4gICAqICAgICAgfVxuICAgKiAgICAgLy9zb21lIGNvbnN0cnVjdG9yIGNvbmZpZ3VyYXRpb24gYmVsb3dcbiAgICogICAgfVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IGNvbmZpZy5zb3VyY2UgLSBhIHNvdXJjZSBkcmlsbGRvd24gdGFibGUgdGhhdCBjb250YWlucyB0aGUgaW5pdGlhbCBzZXQgb2YgZGF0YSh3aXRoIHJlZmVyZW5jZSBncm91cCBlbmFibGVkIGFuZCAxIGNoaWxkIGxldmVsKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLnRhYmxlSUQgLSBpZCBvZiB0aGUgYHNvdXJjZWAgdGFibGUgdGhhdCBpcyB0aGUgaW5pdGlhbCBzb3VyY2Ugb2YgZGF0YSAoZnJvbSByZXBvcnRhbCBiYWNrZW5kKVxuICAgKiBAcGFyYW0ge0FycmF5fSBjb25maWcucm93aGVhZGVycyAtIGEgcm93aGVhZGVycyBhcnJheSBmb3IgdGhlIGxvYWRlZCB0YWJsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnLmZsYXRIaWVyYXJjaHkgLSBhIGhpZXJhcmNoaWNhbCBvYmplY3QgZm9yIGEgbWFwIHRvIGJlIGJ1aWx0IHVwb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcuaW5pdGlhbE1hcD1cImN1c3RvbS93b3JsZC1oaWdocmVzMlwiXSAtIHRoZSBpbml0aWFsIG1hcCBvYmplY3QgdGhhdCdzIGdvaW5nIHRvIGJlIGxvYWRlZCB0byBpbml0aWFsaXNlIHRoZSBtYXBcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5jb250YWluZXJJRCAtIGlkIG9mIHRoZSBjb250YWluZXIgdGhlIG1hcCB3aWxsIGJlIGRyYXduIHRvXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpZy5tYXBwb2ludENhbGxiYWNrIC0gZXhlY3V0ZWQgd2hlbiBhIG1hcHBvaW50IChjaXR5KSBpcyBjbGlja2VkXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpZy5jb2xvckZuIC0gQSBmdW5jdGlvbiB0aGF0IGFsbG93cyBjdXN0b20gY29sb3IgY29kaW5nIGNvbXB1dGF0aW9uIGJhc2VkIG9uIHZhbHVlIGFuZCB0YXJnZXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLnZhbHVlQ29sdW1uPTFdIC0gWmVyby1iYXNlZCBjb2x1bW4gaW5kZXggdGhhdCBjb250YWlucyBwcmltYXJ5IHZhbHVlIHdoaWNoIHdpbGwgYmUgdXNlZCBmb3IgbWFwIGNvbG9yaW5nLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjb25maWcuZnVsbFBhcmVudExldmVsSW5mbz10cnVlXSAtIERpc3BsYXkgZnVsbCBpbmZvIG9mIHRoZSBwYXJlbnQgbGV2ZWwgaW4gcmlnaHQgcGFydCBvZiB0aGUgbWFwLCByYXRoZXIgdGhhbiB0aGUgcGFyZW50IGxldmVsIG5hbWUgYW5kIHRoZSBwcmltYXJ5IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLnBhZ2VTdGF0ZUlkPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNQYWdlU3RhdGVJZCcpLnZhbHVlXSAtIFBhZ2VTdGF0ZUlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcubm9ybWFscyAtIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIG5hbWVzIG9mIGNvbHVtbnMgdGFrZW4gZnJvbSBEQkRlc2lnbmVyVGFibGUgYW5kIHZhbHVlcyAtIHRoZWlyIHN0cmluZyB0eXBlczogYHN0cmluZ2AsIGBudW1iZXJgLCBgYm9vbGVhbmAsIGBzdHJpbmdBcnJheWAsIGBudW1iZXJBcnJheWBcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcubm9ybWFsc1NlcGFyYXRvcj0nLCddIC0gZGVsaW1pdGVyIGJldHdlZW4gdmFsdWVzIGluIGBzdHJpbmdBcnJheWAgKGB1cy1jYSwgdXMtdHgsIHVzLXd5YCkgYW5kIGBudW1iZXJBcnJheWAgKGAtMzEuODYsMTYuMzhgKS4gVGhleSBhcmUgc2VydmVkIGFzIGEgZGVsaW1pdGVyLXNlcGFyYXRlZCBzdHJpbmcgYW5kIHRoZSBkZWxpbWl0ZXIgaXMgYCxgIGJ5IGRlZmF1bHQuIElmIHlvdSB1c2UgYW5vdGhlciBvbmUsIG1ha2Ugc3VyZSB5b3Ugc3BlY2lmeSBpdCBoZXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLm9wdGlvbnM9e31dIC0gb3B0aW9ucyBwYXNzZWQgdG8gSGlnaE1hcCB0byByZXN0eWxlL3JlY29uZmlndXJlIGl0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLmxvYWRpbmdUZXh0PSAnZmV0Y2hpbmcgZGF0YSddIC0gdGV4dCB0byBzaG93IHdoZW4gbG9hZGluZyBhbm90aGVyIGxldmVsXG4gICAqICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZmxhdEhpZXJhcmNoeSxcbiAgICAgIG5vcm1hbHMsXG4gICAgICBub3JtYWxzU2VwYXJhdG9yLFxuICAgIH0gPSBjb25maWc7XG5cbiAgICB0aGlzLmRlY2xhcmVHbG9iYWxzKGNvbmZpZywge1xuICAgICAgaW5pdGlhbE1hcDogJ2N1c3RvbS93b3JsZC1oaWdocmVzMicsXG4gICAgICB2YWx1ZUNvbHVtbjogMSxcbiAgICAgIGZ1bGxQYXJlbnRMZXZlbEluZm86IHRydWUsXG4gICAgICBjb2xvckZuOiBmdW5jdGlvbiAodmFsdWUsIHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgPyB2YWx1ZSA+PSA4MCA/ICcjNGNhZjUwJyA6ICgodmFsdWUgPCA4MCAmJiB2YWx1ZSA+PSA2MCApID8gJyNmZmMxMDcnIDogJyNmZjU3MjInKSA6ICdibHVlJztcbiAgICAgIH0sXG4gICAgICBwYWdlU3RhdGVJZDogKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNQYWdlU3RhdGVJZCcpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1BhZ2VTdGF0ZUlkJykudmFsdWUgOiBudWxsKSxcbiAgICAgIGxvYWRpbmdUZXh0OiAnZmV0Y2hpbmcgZGF0YScsXG4gICAgICBvcHRpb25zOiB7fSxcbiAgICB9LCB0aGlzLnR5cGVDaGVjayhjb25maWcpKTtcblxuICAgIHRoaXMuaGllcmFyY2h5ID0gbmV3IE1hcEhpZXJhcmNoeShmbGF0SGllcmFyY2h5LCBub3JtYWxzLCBub3JtYWxzU2VwYXJhdG9yKTtcblxuICAgIHRoaXMucGFyc2VUYWJsZURhdGEoKTtcblxuICAgIHRoaXMuZHJhd01hcCgpO1xuICB9XG5cbiAgZGVjbGFyZUdsb2JhbHMoY29uZmlnLCBkZWZhdWx0cyA9IHt9LCB0eXBlQ2hlY2sgPSB7fSkge1xuICAgIGNvbnN0IG1peGVkT3B0aW9ucyA9IHsuLi5jb25maWcsIC4uLmRlZmF1bHRzfTtcbiAgICBPYmplY3Qua2V5cyhtaXhlZE9wdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0eXBlQ2hlY2tba2V5XSAmJiB0eXBlb2YgdHlwZUNoZWNrW2tleV0gPT09ICdmdW5jdGlvbicpIHR5cGVDaGVja1trZXldKG1peGVkT3B0aW9uc1trZXldKTtcbiAgICAgIHRoaXNba2V5XSA9IG1peGVkT3B0aW9uc1trZXldO1xuICAgIH0pXG4gIH1cblxuICB0eXBlQ2hlY2sob3B0cykge1xuICAgIGlmICh0eXBlb2YgSGlnaGNoYXJ0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSGlnaGNoYXJ0cyBtdXN0IGJlIGRlY2xhcmVkLiBQcm9iYWJseSB0aGV5IGFyZSBtaXNzaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBIaWdoY2hhcnRzLm1hcHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hpZ2hNYXBzIG11c3QgYmUgbG9hZGVkLiBQcm9iYWJseSB0aGV5IGFyZSBtaXNzaW5nJylcbiAgICB9XG4gICAgaWYgKCEob3B0cy5yb3doZWFkZXJzICYmIG9wdHMucm93aGVhZGVycyAhPT0gbnVsbCAmJiBvcHRzLnJvd2hlYWRlcnMubGVuZ3RoID4gMCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wicm93aGVhZGVyc1wiIGFycmF5IG11c3QgYmUgcHJlc2VudCB0byBwYXJzZSBkYXRhJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc291cmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghKG9wdHMuc291cmNlICYmIG9wdHMuc291cmNlLmxvY2FsTmFtZSA9PT0gJ3RhYmxlJykpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzb3VyY2UgdGFibGUgbXVzdCBiZSBzcGVjaWZpZWQnKVxuICAgICAgfSxcbiAgICAgIGNvbnRhaW5lcklEOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghKG9wdHMuY29udGFpbmVySUQgJiYgdHlwZW9mIG9wdHMuY29udGFpbmVySUQgPT09ICdzdHJpbmcnKSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbnRhaW5lcklEIG11c3QgYmUgYSBzdHJpbmcgd2l0aG91dCBhIGxlYWRpbmcgIyBjaGFyYWN0ZXIgYnV0IGl0IGlzICcgKyB0eXBlb2Ygb3B0cy5jb250YWluZXJJRClcbiAgICAgIH0sXG4gICAgICB0YWJsZUlEOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghKG9wdHMudGFibGVJRCAmJiB0eXBlb2Ygb3B0cy50YWJsZUlEID09PSAnc3RyaW5nJykpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0YWJsZUlEIG11c3QgYmUgYSBzdHJpbmcgYnV0IGl0IGlzICcgKyB0eXBlb2Ygb3B0cy50YWJsZUlEKVxuICAgICAgfSxcbiAgICAgIG1hcHBvaW50Q2FsbGJhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgY2IgPSBvcHRzLm1hcHBvaW50Q2FsbGJhY2s7XG4gICAgICAgIGlmIChjYiAmJiBjYiAhPT0gbnVsbCAmJiB0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXBwb2ludENhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgICB9LFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGFibGUgcGFzc2VkIHRvIGl0IGFuZCBhZGRzIGRhdGEgdG8gYC5fZGF0YWAgaW4gYGhpZXJhcmNoeWBcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBvcHRpb25zLnNvdXJjZSAtIHNvdXJjZSB0YWJsZSBmb3IgZGF0YVxuICAgKiBAcGFyYW0ge051bWJlcnxBcnJheX0gb3B0aW9ucy5leGNsdWRlUm93cyAtIHJvd3MgdG8gYmUgZXhjbHVkZWQgZnJvbSBwYXJzaW5nXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucm93aGVhZGVycyAtIGFycmF5IG9mIGBzb3VyY2VgIHJvd2hlYWRlcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuZmxhdEhpZXJhcmNoeSAtIGZsYXQgaGllcmFyY2h5IG9iamVjdFxuICAgKiAqL1xuICBwYXJzZVRhYmxlRGF0YShvcHRpb25zPXt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgc291cmNlID0gdGhpcy5zb3VyY2UsXG4gICAgICBleGNsdWRlUm93cyA9IHRoaXMuZXhjbHVkZVJvd3MsXG4gICAgICByb3doZWFkZXJzID0gdGhpcy5yb3doZWFkZXJzLm1hcChyaCA9PiByaFswXSksXG4gICAgICBleGNsdWRlQ29sdW1ucyA9IHRoaXMuZXhjbHVkZUNvbHVtbnMsXG4gICAgfSA9IG9wdGlvbnM7XG5cbiAgICBjb25zdCBhZ2dyZWdhdGVkVGFibGUgPSBuZXcgQWdncmVnYXRlZFRhYmxlKHtzb3VyY2UsIGV4Y2x1ZGVDb2x1bW5zLCBleGNsdWRlUm93c30pO1xuICAgIHJvd2hlYWRlcnMuZm9yRWFjaCgocm93SGVhZGVyLCBpKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZmxhdEhpZXJhcmNoeVtyb3dIZWFkZXJdLl9kYXRhKSB7XG4gICAgICAgIHRoaXMuZmxhdEhpZXJhcmNoeVtyb3dIZWFkZXJdLl9kYXRhID0gYWdncmVnYXRlZFRhYmxlLmRhdGFbaV0ubWFwKChkYXRhSXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IGRhdGFJdGVtLmRhdGEsXG4gICAgICAgICAgICB0aXRsZTogaW5kZXggIT09IDAgPyBhZ2dyZWdhdGVkVGFibGUuY29sdW1uc1tpbmRleF0udGl0bGUgOiBcIlJlZ2lvblwiXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBkcmF3TWFwKCkge1xuICAgIHRoaXMuY3VyTFZMID0gdGhpcy5mbGF0SGllcmFyY2h5W3RoaXMucm93aGVhZGVyc1swXV07XG4gICAgSGlnaGNoYXJ0cy5tYXBDaGFydCh0aGlzLmNvbnRhaW5lcklELCB7Li4udGhpcy5tYXBDb25maWcsIC4uLnRoaXMub3B0aW9uc30pO1xuICB9XG5cbiAgZ2V0IG1hcENvbmZpZygpIHtcbiAgICBjb25zdCBUaGlzID0gdGhpcztcbiAgICByZXR1cm4ge1xuICAgICAgbGFuZzoge1xuICAgICAgICBkcmlsbFVwVGV4dDogJzwgdG8ge3Nlcmllcy5wYXJlbnR9J1xuICAgICAgfSxcbiAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgcG9pbnRGb3JtYXQ6IFRoaXMuZ2V0VG9vbHRpcCgpXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdGV4dDogJydcbiAgICAgIH0sXG4gICAgICBsZWdlbmQ6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHBsb3RPcHRpb25zOiB7XG4gICAgICAgIHNlcmllczoge1xuICAgICAgICAgIHN0YXRlczoge1xuICAgICAgICAgICAgbm9ybWFsOiB7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvaW50OiB7XG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgbW91c2VPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZXMuZGF0YS5mb3JFYWNoKGVsID0+IGVsLnNldFN0YXRlKFwiaG92ZXJcIikpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG1vdXNlT3V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZXMuZGF0YS5mb3JFYWNoKGVsID0+IGVsLnNldFN0YXRlKCkpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXBOYXZpZ2F0aW9uOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICB6b29tSW46IHtcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IFwiYm90dG9tXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHpvb21PdXQ6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IFwiYm90dG9tXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdWJ0aXRsZToge1xuICAgICAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgZmxvYXRpbmc6IHRydWUsXG4gICAgICAgIHRleHQ6IFRoaXMuc3VidGl0bGUsXG4gICAgICB9LFxuICAgICAgZHJpbGxkb3duOiB7XG4gICAgICAgIGRyaWxsVXBCdXR0b246IHtcbiAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgYWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVsYXRpdmVUbzogJ3NwYWNpbmdCb3gnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGFydDoge1xuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICBkcmlsbGRvd246IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvL3RoaXMgPT0gY2hhcnQgcmVmZXJlbmNlO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhDaXJjdWxhckpTT04ucGFyc2UoQ2lyY3VsYXJKU09OLnN0cmluZ2lmeShlLnBvaW50KSkpO1xuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBUaGlzLmN1ckxWTCA9IFRoaXMuZ2V0TGV2ZWxCeU5hbWUoZS5wb2ludC5zZXJpZXMubmFtZSk7XG4gICAgICAgICAgICBsZXQgY3VyTFZMID0gVGhpcy5jdXJMVkw7XG4gICAgICAgICAgICBpZiAoY3VyTFZMKSB7XG4gICAgICAgICAgICAgIGNoYXJ0LnNob3dMb2FkaW5nKFRoaXMubG9hZGluZ1RleHQpO1xuICAgICAgICAgICAgICBsZXQgdGFibGUgPSBUaGlzLmNoaWxkVGFibGUudGhlbih0YWJsZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcGFyc2UgZGF0YSBsb2FkZWQgZnJvbSB0YWJsZVxuICAgICAgICAgICAgICAgIFRoaXMucGFyc2VUYWJsZURhdGEoe1xuICAgICAgICAgICAgICAgICAgc291cmNlOiB0YWJsZSxcbiAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVSb3dzOiAwLFxuICAgICAgICAgICAgICAgICAgcm93aGVhZGVyczogY3VyTFZMLnN1YmNlbGxzLm1hcChsdmwgPT4gbHZsLmlkKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBUaGlzLnVwZGF0ZU1hcChjdXJMVkwsIGNoYXJ0LCBlKTtcbiAgICAgICAgICAgICAgICBjaGFydC5zdWJ0aXRsZS51cGRhdGUoe3RleHQ6IFRoaXMuc3VidGl0bGV9KTtcbiAgICAgICAgICAgICAgICBjaGFydC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRyaWxsdXBhbGw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBUaGlzLmN1ckxWTCA9IFRoaXMuY3VyTFZMLnBhcmVudDtcbiAgICAgICAgICAgIGlmIChUaGlzLmN1ckxWTCkge1xuICAgICAgICAgICAgICBlLnRhcmdldC5zdWJ0aXRsZS51cGRhdGUoe3RleHQ6IFRoaXMuc3VidGl0bGV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXJpZXM6IFRoaXMuaW5pdGlhbGl6ZU1hcChbe1xuICAgICAgICBzaG93SW5MZWdlbmQ6IGZhbHNlLFxuICAgICAgICBtYXBEYXRhOiBIaWdoY2hhcnRzLm1hcHNbVGhpcy5pbml0aWFsTWFwXVxuICAgICAgfV0pXG4gICAgfTtcbiAgfVxuXG4gIGdldCBjaGlsZFRhYmxlKCkge1xuICAgIHJldHVybiBBc3luY0hpZXJhcmNoeVRhYmxlLmZldGNoQ2hpbGRUYWJsZSh0aGlzLmN1ckxWTC5pZCwgdGhpcy5jdXJMVkwucGFyZW50ID8gdGhpcy5jdXJMVkwucGFyZW50LmlkIDogbnVsbCwgdGhpcy50YWJsZUlELCB0aGlzLnBhZ2VTdGF0ZUlkKVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHNlcmlhbGl6ZWQgZGF0YXNldCBmb3IgYSB0b29sdGlwXG4gICAqICovXG4gIGdldFRvb2x0aXAoKSB7XG4gICAgbGV0IGRhdGEgPSB0aGlzLmN1ckxWTC5fZGF0YTtcbiAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB0aGlzLmdlbmVyYXRlVG9vbHRpcFJvdyhpdGVtLnRpdGxlLCBge3BvaW50LmRhdGEuJHtpbmRleH0udmFsdWV9YCkpLmpvaW4oXCI8YnIgLz5cIilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgY2hhcnQgc3VidGl0bGUgcmV0dXJuaW5nIHJlZ2lvbiBhbmQgbWFpbiB2YWx1ZSBvZiBmdWxsIGluZm8gYmFzZWQgb24gYGZ1bGxQYXJlbnRMZXZlbEluZm9gXG4gICAqICovXG4gIGdldCBzdWJ0aXRsZSgpIHtcbiAgICBpZiAodGhpcy5mdWxsUGFyZW50TGV2ZWxJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJMVkwuX2RhdGEubWFwKGl0ZW0gPT4gdGhpcy5nZW5lcmF0ZVRvb2x0aXBSb3coaXRlbS50aXRsZSwgaXRlbS52YWx1ZSkpLmpvaW4oJzxiciAvPicpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudExldmVsID0gdGhpcy5jdXJMVkwuX2RhdGFbMF0sXG4gICAgICAgIGN1cnJlbnRMZXZlbCA9IHRoaXMuY3VyTFZMLl9kYXRhW3RoaXMudmFsdWVDb2x1bW5dO1xuXG4gICAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLmdlbmVyYXRlVG9vbHRpcFJvdyhwYXJlbnRMZXZlbC50aXRsZSwgcGFyZW50TGV2ZWwudmFsdWUpLFxuICAgICAgICB0aGlzLmdlbmVyYXRlVG9vbHRpcFJvdyhjdXJyZW50TGV2ZWwudGl0bGUsIGN1cnJlbnRMZXZlbC52YWx1ZSlcbiAgICAgIF0uam9pbignPGJyIC8+JylcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVRvb2x0aXBSb3cobGFiZWwsIHZhbHVlKSB7XG4gICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGV2ZWwtbGFiZWxcIj4nICsgbGFiZWwgKyAnOiA8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxldmVsLXZhbHVlXCI+JyArIHZhbHVlICsgJzwvc3Bhbj4nXG4gIH1cblxuICAvKipcbiAgICogZ2V0IHN1YmNlbGwgYnkgdGV4dCByYXRoZXIgdGhhbiBieSBpZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhlIHN1YmNlbGwgd2UncmUgbG9va2luZyBmb3JcbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhIHN1YmNlbGwgd2hpY2ggaGFzIHRoYXQgbmFtZVxuICAgKiAqL1xuICBnZXRMZXZlbEJ5TmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VyTFZMLnN1YmNlbGxzLmZpbHRlcihlbCA9PiBlbC50ZXh0ID09PSBuYW1lKVswXTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgY3VzdG9tIGdlb0pTT04gZmlsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbWFwRGF0YSAtIGluaXRpYWwgbWFwXG4gICAqIEBwYXJhbSB7QXJyYXl9Y291bnRyaWVzTGlzdCAtIGxpc3Qgb2YgY291bnRyaWVzIElEc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWFwTmFtZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiAqL1xuICBzdGF0aWMgY3JlYXRlQ3VzdG9tR2VvSlNPTihtYXBEYXRhLCBjb3VudHJpZXNMaXN0LCBtYXBOYW1lKSB7XG4gICAgbGV0IGdlb2pzb24gPSB7XG4gICAgICB0aXRsZTogXCJcIixcbiAgICAgIHZlcnNpb246IFwiMC4xLjBcIixcbiAgICAgIHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICAgIGNvcHlyaWdodDogXCJDb3B5cmlnaHQgKGMpIDIwMTUgSGlnaHNvZnQgQVMsIEJhc2VkIG9uIGRhdGEgZnJvbSBOYXR1cmFsIEVhcnRoXCIsXG4gICAgICBjb3B5cmlnaHRTaG9ydDogXCJOYXR1cmFsIEVhcnRoXCIsXG4gICAgICBjb3B5cmlnaHRVcmw6IFwiaHR0cDovL3d3dy5uYXR1cmFsZWFydGhkYXRhLmNvbVwiLFxuICAgICAgY3JzOiB7XG4gICAgICAgIHR5cGU6IFwibmFtZVwiLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgbmFtZTogXCJ1cm46b2djOmRlZjpjcnM6RVBTRzo1NDAwM1wiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImhjLXRyYW5zZm9ybVwiOiB7XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjcnM6IFwiK3Byb2o9bWlsbCArbGF0XzA9MCArbG9uXzA9MCAreF8wPTAgK3lfMD0wICtSX0EgK2RhdHVtPVdHUzg0ICt1bml0cz1tICtub19kZWZzXCIsXG4gICAgICAgICAgc2NhbGU6IDEuNzIxODI3ODE2NTRlLTA1LFxuICAgICAgICAgIGpzb25yZXM6IDE1LjUsXG4gICAgICAgICAganNvbm1hcmdpblg6IC05OTksXG4gICAgICAgICAganNvbm1hcmdpblk6IDk4NTEuMCxcbiAgICAgICAgICB4b2Zmc2V0OiAtMTk0OTUzNTYuMzY5MyxcbiAgICAgICAgICB5b2Zmc2V0OiAxMjYzNTkwOC4xOTgyXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmZWF0dXJlczogRHJpbGxkb3duTWFwLmdldEZlYXR1cmVzKGNvdW50cmllc0xpc3QsIG1hcERhdGEpXG4gICAgfTtcblxuICAgIGdlb2pzb24udGl0bGUgPSBtYXBOYW1lO1xuICAgIHJldHVybiBnZW9qc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhcnJheSBvZiBmZWF0dXJlcyBmcm9tIGdlb0pTT04gZmlsZVxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gY291bnRyaWVzTGlzdCAtIGNvdW50cmllcyBJRHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hcERhdGEgLSB5b3VyIGluaXRpYWwgbWFwXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgZm9yIGdlb2pzb24gZmVhdHVyZXMgY29tcGFyaW5nXG4gICAqIEByZXR1cm5zIHtBcnJheX0gZmVhdHVyZXMgbGlzdFxuICAgKiAqL1xuICBzdGF0aWMgZ2V0RmVhdHVyZXMoY291bnRyaWVzTGlzdCwgbWFwRGF0YSwga2V5ID0gXCJoYy1rZXlcIikge1xuICAgIGlmICh0eXBlb2YgY291bnRyaWVzTGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtYXBEYXRhLmZlYXR1cmVzLmZpbHRlcihmZWF0dXJlID0+IGZlYXR1cmUucHJvcGVydGllc1trZXldID09PSBjb3VudHJpZXNMaXN0KTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY291bnRyaWVzTGlzdCkpIHtcbiAgICAgIHJldHVybiBtYXBEYXRhLmZlYXR1cmVzLmZpbHRlcihmZWF0dXJlID0+IGNvdW50cmllc0xpc3QuaW5kZXhPZihmZWF0dXJlLnByb3BlcnRpZXNba2V5XSkgIT09IC0xKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgc2VyaWVzIGZvciB0aGUgZmlyc3QgdGltZSBtYXAgaW5pdGlhbGl6YXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGN1ckxWTCAtIGN1cnJlbnQgbGV2ZWwgaW4gaGllcmFyY2h5XG4gICAqIEBwYXJhbSB7QXJyYXl9IFtzZXJpZXM9W11dIC0gc2VyaWVzXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICogKi9cbiAgaW5pdGlhbGl6ZU1hcChzZXJpZXMgPSBbXSkge1xuICAgIHRoaXMuY3VyTFZMLnN1YmNlbGxzLmZvckVhY2goc3ViY2VsbCA9PiB7XG4gICAgICBpZiAoc3ViY2VsbC5tYXBJRCkge1xuICAgICAgICBsZXQgc2VyaWVzSXRlbSA9IHRoaXMuY29tcG9zZVNlcmllcyhzdWJjZWxsKTtcbiAgICAgICAgc2VyaWVzLnB1c2goc2VyaWVzSXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlcmllcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIG1hcCBmcm9tIEhpZ2hNYXBzIG1hcCBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzb3VyY2VcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqICovXG4gIHN0YXRpYyBsb2FkTWFwKHNvdXJjZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBqUXVlcnkuZ2V0U2NyaXB0KCdodHRwczovL2NvZGUuaGlnaGNoYXJ0cy5jb20vbWFwZGF0YS8nICsgc291cmNlICsgJy5qcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzb2x2ZShIaWdoY2hhcnRzLm1hcHNbc291cmNlXSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtYWluIHZhbHVlIHRoYXQgdGhlIGNoYXJ0IGlzIGJ1aWx0IG9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsZXZlbCAtIGxldmVsIHVuZGVyIGV4YW1pbmF0aW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZUNvbHVtbiAtIFplcm8tYmFzZWQgY29sdW1uIGluZGV4IHRoYXQgY29udGFpbnMgcHJpbWFyeSB2YWx1ZSB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIG1hcCBjb2xvcmluZ1xuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHByaW1hcnkgdmFsdWVcbiAgICogKi9cbiAgc3RhdGljIGdldFByaW1hcnlWYWx1ZShsZXZlbCwgdmFsdWVDb2x1bW4pIHtcbiAgICByZXR1cm4gbGV2ZWwuX2RhdGFbdmFsdWVDb2x1bW5dLnZhbHVlO1xuICB9XG5cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHNpbmdsZSBzZXJpZXMgZGF0YSBmb3IgSGlnaE1hcCBzZXJpZXMgb3B0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsZXZlbCAtIGEgbGV2ZWwgaW4gaGllcmFyY2h5XG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqICovXG4gIGdldFNlcmllc0RhdGEobGV2ZWwpIHtcbiAgICBsZXQgZHJpbGxkb3duID0gbGV2ZWwuc3ViY2VsbHMgPyBsZXZlbC50ZXh0IDogbnVsbDtcbiAgICBpZiAodHlwZW9mIGxldmVsLm1hcElEID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIFt7XG4gICAgICAgIGRyaWxsZG93bjogZHJpbGxkb3duLFxuICAgICAgICBjb2RlOiBsZXZlbC5tYXBJRCxcbiAgICAgICAgdmFsdWU6IERyaWxsZG93bk1hcC5nZXRQcmltYXJ5VmFsdWUobGV2ZWwsIHRoaXMudmFsdWVDb2x1bW4pLFxuICAgICAgICBkYXRhOiBsZXZlbC5fZGF0YSxcbiAgICAgIH1dXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGxldmVsLm1hcElEKSkge1xuICAgICAgcmV0dXJuIGxldmVsLm1hcElELm1hcChtYXBJRCA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkcmlsbGRvd246IGRyaWxsZG93bixcbiAgICAgICAgICBjb2RlOiBtYXBJRCxcbiAgICAgICAgICB2YWx1ZTogRHJpbGxkb3duTWFwLmdldFByaW1hcnlWYWx1ZShsZXZlbCwgdGhpcy52YWx1ZUNvbHVtbiksXG4gICAgICAgICAgZGF0YTogbGV2ZWwuX2RhdGEsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEYXRhIGVsZW1lbnQgaXMgY29ycnVwdGVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBgY29sb3JGbmAgcGFzc2VkIGJ5IHVzZXIgdG8gY29tcHV0ZSBjb2xvciBieSBwYXNzaW5nIGB2YWx1ZWAgYW5kIGB0YXJnZXRgIHRvIGl0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbG9yRm4gLSBjb2xvciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSB2YWx1ZSB0byB0ZXN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0YXJnZXQgLSB0YXJnZXQgZm9yIHRoZSBsZXZlbFxuICAgKiAqL1xuICBzdGF0aWMgY29tcHV0ZUNvbG9yKGNvbG9yRm4sIHZhbHVlLCB0YXJnZXQpIHtcbiAgICBpZiAoY29sb3JGbikge1xuICAgICAgcmV0dXJuIGNvbG9yRm4odmFsdWUsIHRhcmdldClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzaW5nbGUgbWFwcG9pbnQgc2VyaWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdWJjZWxsIC0gYSBzaW5nbGUgaGllcmFyY2h5IGVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hcERhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYXJ0IC0gcmVmZXJlbmNlIHRvIGNoYXJ0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXJpZXMgZm9yIG1hcCBwb2ludHNcbiAgICogKi9cbiAgZ2V0Q29vcmRpbmF0ZVNlcmllcyhzdWJjZWxsLCBtYXBEYXRhLCBjaGFydCkge1xuICAgIGNoYXJ0Lm1hcFRyYW5zZm9ybXMgPSBtYXBEYXRhID8gbWFwRGF0YVtcImhjLXRyYW5zZm9ybVwiXSA6IEhpZ2hjaGFydHMubWFwc1tcImN1c3RvbS93b3JsZC1oaWdocmVzMlwiXVtcImhjLXRyYW5zZm9ybVwiXTtcbiAgICBsZXQgcG9zID0gY2hhcnQuZnJvbUxhdExvblRvUG9pbnQoe2xhdDogc3ViY2VsbC5jb29yZGluYXRlc1swXSwgbG9uOiBzdWJjZWxsLmNvb3JkaW5hdGVzWzFdfSk7XG4gICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgIHR5cGU6IFwibWFwcG9pbnRcIixcbiAgICAgIG5hbWU6IHN1YmNlbGwudGV4dCxcbiAgICAgIG1hcmtlcjoge1xuICAgICAgICBsaW5lQ29sb3I6IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoOiAxLFxuICAgICAgICByYWRpdXM6IDQsXG4gICAgICAgIHN5bWJvbDogXCJjaXJjbGVcIixcbiAgICAgIH0sXG4gICAgICBkYXRhOiBbe1xuICAgICAgICBjb2xvcjogRHJpbGxkb3duTWFwLmNvbXB1dGVDb2xvcih0aGlzLmNvbG9yRm4sIERyaWxsZG93bk1hcC5nZXRQcmltYXJ5VmFsdWUoc3ViY2VsbCwgdGhpcy52YWx1ZUNvbHVtbiksIHN1YmNlbGwudGFyZ2V0KSxcbiAgICAgICAgbmFtZTogc3ViY2VsbC50ZXh0LFxuICAgICAgICB2YWx1ZTogc3ViY2VsbC52YWx1ZSxcbiAgICAgICAgeDogcG9zLngsXG4gICAgICAgIHk6IHBvcy55XG4gICAgICB9XVxuICAgIH07XG4gICAgaWYgKHRoaXMubWFwcG9pbnRDYWxsYmFjaykge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgY29uZmlnLmV2ZW50cyA9IHtcbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2VsZi5tYXBwb2ludENhbGxiYWNrLmNhbGwodGhpcywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBzaW5nbGUgc2VyaWVzIGl0ZW0gZm9yIEhpZ2htYXBzIHNlcmllcyBvcHRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IHN1YmNlbGwgLSBhIHN1YmNlbGxcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hcERhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYXJ0IC0gcmVmZXJlbmNlIHRvIGNoYXJ0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHNlcmllc1xuICAgKiAqL1xuICBjb21wb3NlU2VyaWVzKHN1YmNlbGwsIG1hcERhdGEsIGNoYXJ0KSB7XG4gICAgaWYgKCFzdWJjZWxsLmNvb3JkaW5hdGVzKSB7XG4gICAgICBtYXBEYXRhID0gbWFwRGF0YSA/IEhpZ2hjaGFydHMuZ2VvanNvbihEcmlsbGRvd25NYXAuY3JlYXRlQ3VzdG9tR2VvSlNPTihtYXBEYXRhLCBzdWJjZWxsLm1hcElELCBzdWJjZWxsLnRleHQpKSA6IEhpZ2hjaGFydHMuZ2VvanNvbihEcmlsbGRvd25NYXAuY3JlYXRlQ3VzdG9tR2VvSlNPTihIaWdoY2hhcnRzLm1hcHNbJ2N1c3RvbS93b3JsZC1oaWdocmVzMiddLCBzdWJjZWxsLm1hcElELCBzdWJjZWxsLnRleHQpKTtcbiAgICAgIGlmIChzdWJjZWxsLm1hcElEKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBzdWJjZWxsLnRhcmdldDtcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gdGhpcy5oaWVyYXJjaHlbMF0udGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogc3ViY2VsbC50ZXh0LFxuICAgICAgICAgIGRhdGFMYWJlbHM6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzLmRhdGFbMF1bXCJoYy1rZXlcIl0gPT09IHRoaXMucG9pbnRbXCJoYy1rZXlcIl0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWVzLm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgIHBvaW50Rm9ybWF0OiB0aGlzLmdldFRvb2x0aXAoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29sb3I6IERyaWxsZG93bk1hcC5jb21wdXRlQ29sb3IodGhpcy5jb2xvckZuLCBEcmlsbGRvd25NYXAuZ2V0UHJpbWFyeVZhbHVlKHN1YmNlbGwsIHRoaXMudmFsdWVDb2x1bW4pLCB0YXJnZXQpLFxuICAgICAgICAgIGFsbEFyZWFzOiBmYWxzZSxcbiAgICAgICAgICBwYXJlbnQ6IHN1YmNlbGwucGFyZW50LnRleHQsXG4gICAgICAgICAgbWFwRGF0YSxcbiAgICAgICAgICBqb2luQnk6IFsnaGMta2V5JywgJ2NvZGUnXSxcbiAgICAgICAgICBkYXRhOiB0aGlzLmdldFNlcmllc0RhdGEoc3ViY2VsbClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29vcmRpbmF0ZVNlcmllcyhzdWJjZWxsLCBtYXBEYXRhLCBjaGFydClcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHlvdXIgbWFwIHZpZXcgYWZ0ZXIgZHJpbGxkb3duIGNsaWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdXJMVkxcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYXJ0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIC0gZHJpbGxkb3duIGV2ZW50IG9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGN1ckxWTFxuICAgKiAqL1xuICB1cGRhdGVNYXAoY3VyTFZMLCBjaGFydCwgZSkge1xuICAgIGlmIChjdXJMVkwgJiYgY3VyTFZMLm1hcE5hbWUpIHsvLyBpZiB3ZSBoYXZlIGFub3RoZXIgbWFwIHRvIGxvYWRcbiAgICAgIGxldCBtYXAgPSBEcmlsbGRvd25NYXAubG9hZE1hcChjdXJMVkwubWFwTmFtZSk7XG4gICAgICBtYXAudGhlbihtYXBEYXRhID0+IHtcbiAgICAgICAgdGhpcy5hZGRTZXJpZXMoY3VyTFZMLCBjaGFydCwgZSwgbWFwRGF0YSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY3VyTFZMICYmICFjdXJMVkwubWFwTmFtZSkge1xuICAgICAgdGhpcy5hZGRTZXJpZXMoY3VyTFZMLCBjaGFydCwgZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBvc2VzIGEgc2VyaWVzIGZvciB5b3VyIEhpZ2hNYXBzIG9wdGlvbnMgY29uZmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdXJMVkxcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYXJ0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIC0gZHJpbGxkb3duIGV2ZW50IG9iamVjdFxuICAgKiBAcGFyYW0ge09iamVjdH0gbWFwRGF0YSAtIG1hcERhdGEgZ2VvSlNPTlxuICAgKiAqL1xuICBhZGRTZXJpZXMoY3VyTFZMLCBjaGFydCwgZSwgbWFwRGF0YSkge1xuICAgIGlmIChjdXJMVkwuc3ViY2VsbHMpIHsgLy8gaWYgaXQncyBhbiBlbmQgcG9pbnRcbiAgICAgIGlmIChjdXJMVkwuc3ViY2VsbHNbMF0uY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgbGV0IHNlcmllc0l0ZW0gPSB0aGlzLmNvbXBvc2VTZXJpZXMoY3VyTFZMLCBtYXBEYXRhLCBjaGFydCk7XG4gICAgICAgIHNlcmllc0l0ZW0uZGF0YS5mb3JFYWNoKGRhdGFJdGVtID0+IHtcbiAgICAgICAgICBkYXRhSXRlbS5kcmlsbGRvd24gPSBudWxsO1xuICAgICAgICAgIGRhdGFJdGVtLnZhbHVlID0gbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgY2hhcnQuYWRkU2luZ2xlU2VyaWVzQXNEcmlsbGRvd24oZS5wb2ludCwgc2VyaWVzSXRlbSk7XG4gICAgICB9XG4gICAgICBjdXJMVkwuc3ViY2VsbHMuZm9yRWFjaChzdWJjZWxsID0+IHtcbiAgICAgICAgaWYgKCFzdWJjZWxsLm1hcElEICYmICFzdWJjZWxsLmNvb3JkaW5hdGVzKSByZXR1cm47XG4gICAgICAgIGxldCBzZXJpZXNJdGVtID0gdGhpcy5jb21wb3NlU2VyaWVzKHN1YmNlbGwsIG1hcERhdGEsIGNoYXJ0KTtcbiAgICAgICAgY2hhcnQuYWRkU2luZ2xlU2VyaWVzQXNEcmlsbGRvd24oZS5wb2ludCwgc2VyaWVzSXRlbSk7XG4gICAgICB9KTtcbiAgICAgIGNoYXJ0LmFwcGx5RHJpbGxkb3duKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzZXJpZXNJdGVtID0gdGhpcy5jb21wb3NlU2VyaWVzKGN1ckxWTCwgbWFwRGF0YSwgY2hhcnQpO1xuICAgICAgc2VyaWVzSXRlbS5kYXRhLm1hcChkYXRhSXRlbSA9PiB7XG4gICAgICAgIGRhdGFJdGVtLmRyaWxsZG93biA9IG51bGw7XG4gICAgICAgIGRhdGFJdGVtLnZhbHVlID0gbnVsbFxuICAgICAgfSk7XG4gICAgICBjaGFydC5hZGRTZXJpZXNBc0RyaWxsZG93bihlLnBvaW50LCBzZXJpZXNJdGVtKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9EcmlsbGRvd25NYXAuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMjYuMTIuMjAxNi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwSGllcmFyY2h5IHtcbiAgY29uc3RydWN0b3IoZmxhdEhpZXJhcmNoeSwgbm9ybWFscyA9IHt9LCBub3JtYWxzU2VwYXJhdG9yID0gJywnKSB7XG4gICAgdGhpcy5mbGF0SGllcmFyY2h5ID0gZmxhdEhpZXJhcmNoeTtcbiAgICB0aGlzLm5vcm1hbHMgPSBub3JtYWxzO1xuICAgIHRoaXMubm9ybWFsc1NlcGFyYXRvciA9IG5vcm1hbHNTZXBhcmF0b3I7XG4gICAgdGhpcy5oaWVyYXJjaHkgPSB0aGlzLnByb2Nlc3NIaWVyYXJjaHkoKTtcbiAgICB0aGlzLmFkZE1hcElEc1RvSGllcmFyY2h5TGV2ZWwoKTtcbiAgICByZXR1cm4gdGhpcy5oaWVyYXJjaHlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgaGllcmFyY2h5IGFycmF5IGJ5IGFzc2lnbmluZyBwYXJlbnQtY2hpbGQgcmVsYXRpb25zIGFuZCByZXR1cm5pbmcgdGhvc2UgdGhhdCBkb24ndCBoYXZlIGEgcGFyZW50XG4gICAqICovXG4gIHByb2Nlc3NIaWVyYXJjaHkoKSB7XG4gICAgbGV0IG9ycGhhbkl0ZW1zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMuZmxhdEhpZXJhcmNoeSkge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZsYXRIaWVyYXJjaHlba2V5XTtcbiAgICAgIHRoaXMubm9ybWFsaXplKGl0ZW0pO1xuICAgICAgaWYgKHRoaXMuX2l0ZW1IYXNQYXJlbnQoaXRlbSkpIHtcbiAgICAgICAgdGhpcy5fYXNzaWduUGFyZW50VG9JdGVtKGl0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JwaGFuSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9ycGhhbkl0ZW1zXG4gIH1cblxuICAvKipcbiAgICogbm9ybWFsaXplcyBhIHN0cmluZyB2YWx1ZSB0byBhIGNlcnRhaW4gZm9ybWF0LlxuICAgKiAtIGBhcnJheVN0cmluZ2AgLSBub3JtYWxpemVzIGNvbW1hLXNlcGFyYXRlZCBpdGVtcyB0byBhbiBBcnJheSBvZiBTdHJpbmdzLCBpLmUgXCJoYWhhXCIsIFwibGFsYVwiIHdvdWxkIGJlIFtcImhhaGFcIiwgXCJsYWxhXCJdXG4gICAqIC0gYGFycmF5TnVtYmVyYCAtIG5vcm1hbGl6ZXMgY29tbWEtc2VwYXJhdGVkIGl0ZW1zIHRvIGFuIEFycmF5IG9mIEZsb2F0cywgaS5lIFwiLTEzLjQxXCIsIFwiNDguNjZcIiB3b3VsZCBiZSBbLTEzLjQxLCA0OC42Nl1cbiAgICogLSBgc3RyaW5nYCAtIHJldHVybnMgdGhlIHN0cmluZyBhcyBpc1xuICAgKiAtIGBudW1iZXJgIC0gcGFyc2VzIHRoZSBzdHJpbmcgYXMgYSBGbG9hdFxuICAgKiAtIGBib29sZWFuYCAtIHBhcnNlcyB0aGUgc3RyaW5nIGFzIGEgQm9vbGVhbiwgY2FzZSBpbnNlbnNpdGl2ZVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIGl0ZW0gdG8gbWF0Y2ggY29udGVudHMgYWdhaW5zdCBgbm9ybWFsc2BcbiAgICogKi9cbiAgbm9ybWFsaXplKGl0ZW0pIHtcbiAgICBpZiAodGhpcy5zaG91bGROb3JtYWxpemUpIHtcbiAgICAgIGxldCBwYXJzZXIgPSB7XG4gICAgICAgIHN0cmluZ0FycmF5OiB2YWwgPT4gdmFsLnNwbGl0KHRoaXMubm9ybWFsc1NlcGFyYXRvciksXG4gICAgICAgIG51bWJlckFycmF5OiB2YWwgPT4gdmFsLnNwbGl0KHRoaXMubm9ybWFsc1NlcGFyYXRvcikubWFwKGkgPT4gcGFyc2VGbG9hdChpKSksXG4gICAgICAgIHN0cmluZzogdmFsID0+IHZhbC50cmltKCksXG4gICAgICAgIG51bWJlcjogdmFsID0+IHZhbCAhPT0gbnVsbCAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSA/IHBhcnNlRmxvYXQodmFsKSA6IG51bGwsXG4gICAgICAgIGJvb2xlYW46IHZhbCA9PiB2YWwudG9Mb3dlckNhc2UoKSA9PT0gXCJ0cnVlXCIgfHwgdmFsID09PSBcIjFcIlxuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgbm9ybWFsIGluIHRoaXMubm9ybWFscykge1xuICAgICAgICBpZiAoaXRlbVtub3JtYWxdKSB7Ly8gcHJvcGVydHkgZXhpc3RzIGluIG9iamVjdFxuICAgICAgICAgIGlmIChpdGVtW25vcm1hbF0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaXRlbVtub3JtYWxdID0gcGFyc2VyW3RoaXMubm9ybWFsc1tub3JtYWxdXShpdGVtW25vcm1hbF0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtW25vcm1hbF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaXRlbUhhc1BhcmVudChpdGVtKXtcbiAgICByZXR1cm4gaXRlbS5wYXJlbnQgJiYgaXRlbS5wYXJlbnQgIT09IG51bGwgJiYgaXRlbS5wYXJlbnQubGVuZ3RoID4gMFxuICB9XG5cbiAgX2Fzc2lnblBhcmVudFRvSXRlbShpdGVtKXtcbiAgICBpdGVtLnBhcmVudCA9IHRoaXMuZmxhdEhpZXJhcmNoeVtpdGVtLnBhcmVudF07XG4gICAgaXRlbS5wYXJlbnQuc3ViY2VsbHMgPSBpdGVtLnBhcmVudC5zdWJjZWxscyB8fCBbXTtcbiAgICBpdGVtLnBhcmVudC5zdWJjZWxscy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgZ2V0IHNob3VsZE5vcm1hbGl6ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5ub3JtYWxzKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgc3RhdGljIGNvbXBvc2VGbGF0SGllcmFyY2h5KGhpZXJhcmNoeSwgbm9ybWFscykge1xuICAgIGxldCBvID0ge307XG4gICAgbGV0IHRvTm9ybWFsaXplID0gbm9ybWFscy5rZXlzKCkubGVuZ3RoID4gMDtcbiAgICBoaWVyYXJjaHkuZm9yRWFjaChcbiAgICAgIGl0ZW0gPT4ge1xuICAgICAgICBpZiAodG9Ob3JtYWxpemUpIE1hcEhpZXJhcmNoeS5ub3JtYWxpemUoaXRlbSwgbm9ybWFscyk7XG4gICAgICAgIG9baXRlbS5pZF0gPSBpdGVtO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIG87XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgaW5pdGlhbCBoaWVyYXJjaHlcbiAgICogQHBhcmFtIGhpZXJhcmNoeVxuICAgKiBAcGFyYW0gcGFyZW50IC0gaGllcmFyY2h5IGxldmVsIHBhcmVudFxuICAgKi9cbiAgYWRkTWFwSURzVG9IaWVyYXJjaHlMZXZlbChoaWVyYXJjaHk9dGhpcy5oaWVyYXJjaHksIHBhcmVudCA9IG51bGwpIHtcbiAgICBoaWVyYXJjaHkuZm9yRWFjaChzdWJjZWxsID0+IHtcbiAgICAgIHRoaXMuaW5oZXJpdE1hcE5hbWUoc3ViY2VsbCk7XG4gICAgICBpZiAoc3ViY2VsbC5zdWJjZWxscykge1xuICAgICAgICB0aGlzLmFkZE1hcElEc1RvSGllcmFyY2h5TGV2ZWwoc3ViY2VsbC5zdWJjZWxscywgc3ViY2VsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1YmJsZU1hcElkKHN1YmNlbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5oZXJpdE1hcE5hbWUoaXRlbSl7XG4gICAgaWYgKHRoaXMucGFyZW50SGFzTWFwTmFtZShpdGVtKSkge1xuICAgICAgaXRlbS5tYXBOYW1lID0gaXRlbS5wYXJlbnQubWFwTmFtZTtcbiAgICB9XG4gIH1cblxuICBidWJibGVNYXBJZChpdGVtKXtcbiAgICBpZiAoaXRlbS5wYXJlbnQgJiYgaXRlbS5tYXBJRCAmJiAhaXRlbS5wYXJlbnQubWFwTmFtZSkge1xuICAgICAgaWYgKCFpdGVtLnBhcmVudC5tYXBJRCkgaXRlbS5wYXJlbnQubWFwSUQgPSBbXTtcbiAgICAgIGl0ZW0ucGFyZW50Lm1hcElEID0gaXRlbS5wYXJlbnQubWFwSUQuY29uY2F0KGl0ZW0ubWFwSUQpO1xuICAgIH1cbiAgfVxuXG4gIHBhcmVudEhhc01hcE5hbWUoaXRlbSl7XG4gICAgcmV0dXJuIGl0ZW0ucGFyZW50ICYmIGl0ZW0ucGFyZW50ICE9PSBudWxsICYmIGl0ZW0ucGFyZW50Lm1hcE5hbWVcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC1oaWVyYXJjaHkuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yLWFnZ3JlZ2F0ZWQtdGFibGUvc3JjL2FnZ3JlZ2F0ZWQtdGFibGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yLXNvcnQtdGFibGUvc3JjL3NvcnQtdGFibGUtc3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci1zdHlsZXMuY3NzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RyaWxsZG93bi1tYXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9