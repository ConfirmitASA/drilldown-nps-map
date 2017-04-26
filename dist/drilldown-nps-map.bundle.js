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
	
	    var _ref = new _mapHierarchy2.default({
	      flatHierarchy: this.flatHierarchy,
	      hierarchy: this.hierarchy,
	      normals: this.normals,
	      normalsSeparator: this.normalsSeparator
	    }),
	        hierarchy = _ref.hierarchy,
	        flatHierarchy = _ref.flatHierarchy;
	
	    this.flatHierarchy = flatHierarchy;
	    this.hierarchy = hierarchy;
	
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
	    key: "fetchChildData",
	
	
	    /**
	     * This function fetches childTable and parses its data by appending it to `._data` in `hierarchy` nodes.
	     * You may override this method but make sure you execute a callback passed as its parameter
	     * */
	    value: function fetchChildData(callback) {
	      var _this3 = this;
	
	      var _curLVL = this.curLVL,
	          id = _curLVL.id,
	          parent = _curLVL.parent,
	          subcells = _curLVL.subcells;
	
	      return _rAsyncHierarchyTable2.default.fetchChildTable(id, parent ? parent.id : null, this.tableID, this.pageStateId).then(function (table) {
	        // parse data loaded from table
	        _this3.parseTableData({
	          source: table,
	          excludeRows: 0,
	          rowheaders: subcells.map(function (lvl) {
	            return lvl.id;
	          })
	        });
	        callback && typeof callback === 'function' && callback();
	      });
	    }
	
	    /**
	     * Generates a serialized dataset for a tooltip
	     * */
	
	  }, {
	    key: "getTooltip",
	    value: function getTooltip() {
	      var _this4 = this;
	
	      var data = this.curLVL._data;
	      return data.map(function (item, index) {
	        return _this4.generateTooltipRow(item.title, "{point.data." + index + ".value}");
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
	     * @param {Array} [series=[]] - series
	     * @returns {Array}
	     * */
	    value: function initializeMap() {
	      var _this5 = this;
	
	      var series = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	      this.curLVL.subcells.forEach(function (subcell) {
	        if (subcell.mapID) {
	          var seriesItem = _this5.composeSeries(subcell);
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
	      var _this6 = this;
	
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
	            value: DrilldownMap.getPrimaryValue(level, _this6.valueColumn),
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
	      var _this7 = this;
	
	      if (curLVL && curLVL.mapName) {
	        // if we have another map to load
	        var map = DrilldownMap.loadMap(curLVL.mapName);
	        map.then(function (mapData) {
	          _this7.addSeries(curLVL, chart, e, mapData);
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
	      var _this8 = this;
	
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
	          var seriesItem = _this8.composeSeries(subcell, mapData, chart);
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
	                This.fetchChildData(function () {
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
	    key: "subtitle",
	    get: function get() {
	      var _this9 = this;
	
	      if (this.fullParentLevelInfo) {
	        return this.curLVL._data.map(function (item) {
	          return _this9.generateTooltipRow(item.title, item.value);
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
	        try {
	          jQuery.getScript('https://code.highcharts.com/mapdata/' + source + '.js', function () {
	            resolve(Highcharts.maps[source]);
	          });
	        } catch (error) {
	          reject(error);
	        }
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by IvanP on 26.12.2016.
	 */
	var MapHierarchy = function () {
	  function MapHierarchy(config) {
	    _classCallCheck(this, MapHierarchy);
	
	    this.declareGlobals(config, {
	      normals: {},
	      normalsSeparator: ','
	    }, this.typeCheck(config));
	
	    if (this.flatHierarchy && !this.hierarchy) {
	      this.hierarchy = this.composeTreeHierarchy();
	    } else if (!this.flatHierarchy && this.hierarchy) {
	      this.flatHierarchy = this.composeFlatHierarchy();
	    }
	    this.addMapIDsToHierarchyLevel();
	    return { hierarchy: this.hierarchy, flatHierarchy: this.flatHierarchy };
	  }
	
	  _createClass(MapHierarchy, [{
	    key: 'declareGlobals',
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
	    key: 'typeCheck',
	    value: function typeCheck(opts) {
	      if (opts.flatHierarchy) {
	        if (_typeof(opts.flatHierarchy) !== 'object') throw new TypeError('"flatHierarchy" must be an Object but it is a ' + _typeof(opts.flatHierarchy));
	        if (Object.keys(opts.flatHierarchy).length === 0) console.error('flatHierarchy has no nodes in it');
	      }
	
	      if (opts.hierarchy) {
	        if (!Array.isArray(opts.hierarchy)) throw new TypeError('"hierarchy" must be an Array but it is a ' + _typeof(opts.hierarchy));
	        if (opts.hierarchy.length === 0) console.error('hierarchy has no nodes in it');
	      }
	
	      if (!opts.flatHierarchy && !opts.hierarchy) throw new Error('either "flatHierarchy" or "hierarchy" must be passed for map to work');
	
	      return {
	        normalsSeparator: function normalsSeparator() {
	          if (typeof opts.normalsSeparator !== 'string') throw new TypeError('"normalsSeparator" must be an String but it is a ' + _typeof(opts.normalsSeparator));
	        }
	      };
	    }
	
	    /**
	     * Processes hierarchy array by assigning parent-child relations and returning those that don't have a parent
	     * */
	
	  }, {
	    key: 'composeTreeHierarchy',
	    value: function composeTreeHierarchy() {
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
	    key: 'normalize',
	    value: function normalize(item) {
	      var _this2 = this;
	
	      if (this.shouldNormalize) {
	        var parser = {
	          stringArray: function stringArray(val) {
	            return val.split(_this2.normalsSeparator);
	          },
	          numberArray: function numberArray(val) {
	            return val.split(_this2.normalsSeparator).map(function (i) {
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
	    key: '_itemHasParent',
	    value: function _itemHasParent(item) {
	      return item.parent && item.parent !== null && item.parent.length > 0;
	    }
	  }, {
	    key: '_assignParentToItem',
	    value: function _assignParentToItem(item) {
	      item.parent = this.flatHierarchy[item.parent];
	      item.parent.subcells = item.parent.subcells || [];
	      item.parent.subcells.push(item);
	    }
	  }, {
	    key: 'composeFlatHierarchy',
	    value: function composeFlatHierarchy() {
	      var _this3 = this;
	
	      var flatHierarchy = {};
	      var shouldNormalize = this.shouldNormalize;
	      this.hierarchy.forEach(function (item) {
	        if (shouldNormalize) _this3.normalize(item);
	        flatHierarchy[item.id] = item;
	      });
	      return flatHierarchy;
	    }
	
	    /**
	     * Updates initial hierarchy
	     * @param hierarchy
	     * @param parent - hierarchy level parent
	     */
	
	  }, {
	    key: 'addMapIDsToHierarchyLevel',
	    value: function addMapIDsToHierarchyLevel() {
	      var _this4 = this;
	
	      var hierarchy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.hierarchy;
	      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	      hierarchy.forEach(function (subcell) {
	        _this4.inheritMapName(subcell);
	        if (subcell.subcells) {
	          _this4.addMapIDsToHierarchyLevel(subcell.subcells, subcell);
	        }
	        _this4.bubbleMapId(subcell);
	      });
	    }
	  }, {
	    key: 'inheritMapName',
	    value: function inheritMapName(item) {
	      if (this.parentHasMapName(item)) {
	        item.mapName = item.parent.mapName;
	      }
	    }
	  }, {
	    key: 'bubbleMapId',
	    value: function bubbleMapId(item) {
	      if (item.parent && item.mapID && !item.parent.mapName) {
	        if (!item.parent.mapID) item.parent.mapID = [];
	        item.parent.mapID = item.parent.mapID.concat(item.mapID);
	      }
	    }
	  }, {
	    key: 'parentHasMapName',
	    value: function parentHasMapName(item) {
	      return item.parent && item.parent !== null && item.parent.mapName;
	    }
	  }, {
	    key: 'shouldNormalize',
	    get: function get() {
	      return Object.keys(this.normals).length > 0;
	    }
	  }]);
	
	  return MapHierarchy;
	}();
	
	exports.default = MapHierarchy;
	module.exports = exports['default'];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkZmQ3ZTY5MWYxYTQzMGIxMjI2YiIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItcmVwb3J0YWwtYmFzZS9zcmMvcmVwb3J0YWwtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvdGFibGUtZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvYWdncmVnYXRlZC10YWJsZS1yb3ctbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvYWdncmVnYXRlZC10YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYXN5bmMtaGllcmFyY2h5LXRhYmxlL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy9zb3J0LW9yZGVyLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy9zb3J0LXRhYmxlLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1jb2x1bW5zL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1jb2x1bW5zL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJpbGxkb3duTWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXAtaGllcmFyY2h5LmpzIiwid2VicGFjazovLy8uL34vci1hZ2dyZWdhdGVkLXRhYmxlL3NyYy9hZ2dyZWdhdGVkLXRhYmxlLmNzcyIsIndlYnBhY2s6Ly8vLi9+L3Itc29ydC10YWJsZS9zcmMvc29ydC10YWJsZS1zdHlsZXMuY3NzIiwid2VicGFjazovLy8uL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci1zdHlsZXMuY3NzIiwid2VicGFjazovLy8uL3NyYy9kcmlsbGRvd24tbWFwLmNzcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJSZXBvcnRhbCIsIm1peGluIiwiRHJpbGxkb3duTWFwIiwiUmVwb3J0YWxCYXNlIiwidGFyZ2V0Iiwic291cmNlIiwiaSIsImxldmVsIiwiYXJncyIsImxlbmd0aCIsIkFycmF5IiwiaXNBcnJheSIsImNvbnNvbGUiLCJhcHBseSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsIl9sb2dnZXIiLCJuYW1lIiwiZXZlbnQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50Iiwic3RyIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwicmVwbGFjZSIsIlVSTCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiRXJyb3IiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsImUiLCJzZW5kIiwidmFyaWFibGUiLCJxdWVyeSIsImxvY2F0aW9uIiwic2VhcmNoIiwic3Vic3RyaW5nIiwidmFycyIsInNwbGl0IiwicGFpciIsInRvTG93ZXJDYXNlIiwiVGFibGVEYXRhIiwibXVsdGlkaW1lbnNpb25hbCIsImJsb2NrcyIsInBhcmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWQiLCJmb3JFYWNoIiwiYmxvY2tDZWxsIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2VsbCIsInJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJpc051bWJlciIsInRleHRDb250ZW50IiwidHJpbSIsIm9wdGlvbnMiLCJleGNsdWRlQmxvY2siLCJleGNsdWRlQ29sdW1ucyIsImV4Y2x1ZGVSb3dzIiwiZGlyZWN0aW9uIiwiZGF0YSIsInRhZ05hbWUiLCJyb3dzIiwidGVtcEFycmF5IiwidW5kZWZpbmVkIiwic3BsaWNlIiwic29ydCIsImEiLCJiIiwicmV2ZXJzZSIsInJvdyIsImNvbnRhaW5zIiwicHVzaCIsImNlbGxzIiwiY2hpbGRyZW4iLCJ0ZW1wX2V4Y2x1ZGVDb2x1bW5zIiwiaW5kZXgiLCJyb3dTcGFuIiwicHJlcGFyZURhdGFDZWxsIiwicmVhbEluZGV4IiwiVHlwZUVycm9yIiwiQWdncmVnYXRlZFRhYmxlUm93TWV0YSIsIm5hbWVDZWxsIiwiYmxvY2siLCJmaXJzdEluQmxvY2siLCJzdHlsZXMiLCJyZXF1aXJlIiwiYWdncmVnYXRlZFRhYmxlQ1NTIiwiQWdncmVnYXRlZFRhYmxlIiwicm93aGVhZGVyQ29sdW1uSW5kZXgiLCJkZWZhdWx0SGVhZGVyUm93IiwiZGF0YVN0cmlwRGlyZWN0aW9uIiwic29ydGluZyIsImZsb2F0aW5nSGVhZGVyIiwicmVmU291cmNlIiwiaGVhZGVyIiwiY29uc3RydWN0b3IiLCJkZXRlY3RNdWx0aWRpbWVuc2lvbmFsIiwiZ2V0RGF0YSIsInJlb3JkZXJGdW5jdGlvbiIsInJlb3JkZXJSb3dzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbHVtbnMiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJkaW1lbnNpb25hbERhdGFJdGVyYXRvciIsImRhdGFEaW1lbnNpb24iLCJyZXBvc2l0aW9uQmxvY2tDZWxsIiwiYXBwZW5kQ2hpbGQiLCJpdGVtIiwicXVlcnlTZWxlY3RvciIsIml0ZW1zIiwiYmxvY2tSb3dJdGVtIiwiZmlsdGVyIiwiYmxvY2tSb3ciLCJpbmRleE9mIiwibmV3Rmlyc3RSb3ciLCJpbnNlcnRCZWZvcmUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInJlbW92ZSIsImNhbGxiYWNrIiwiZGltZW5zaW9uIiwiQXN5bmNIaWVyYXJjaHlUYWJsZSIsImhpZXJhcmNoeUlEIiwiaGllcmFyY2h5Q29udHJvbElEIiwicGFnZVN0YXRlSUQiLCJsYW5ndWFnZUNvZGUiLCJwYXRoIiwib3JpZ2luIiwiZ2V0UXVlcnlWYXJpYWJsZSIsImVuY29kZSIsIklzUHJldmlldyIsIkhpZXJhcmNoeUNvbnRyb2xJZCIsImhpZXJhcmNoeUl0ZW1DaGlsZHJlbiIsInByb21pc2VSZXF1ZXN0Iiwiam9pbiIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZSIsInBhcmVudElEIiwidGFibGVJRCIsIk5vZGVJZCIsIlRleHQiLCJ0YWJsZVJlc3VsdCIsImhvc3QiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwidGFibGUiLCJleGNsdWRlZFJvd3MiLCJ0b0VuY29kZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN0cmluZ2lmeSIsIlNvcnRPcmRlciIsInNvcnRDYWxsYmFjayIsImRlZmF1bHRTb3J0aW5nIiwic29ydENhbGxiYWNrU2NvcGUiLCJzb3J0T3JkZXIiLCJyZWZDZWxsIiwib2JqIiwiZ2V0Q2VsbCIsImNvbHVtbiIsImNsYXNzTmFtZSIsIlNvcnRUYWJsZSIsImluY2x1ZGVkIiwiZXhjbHVkZWQiLCJfc29ydEV2ZW50IiwibmV3RXZlbnQiLCJzb3J0YWJsZUNvbHVtbnMiLCJkZWZpbmVTb3J0YWJsZUNvbHVtbnMiLCJzcmMiLCJsaXN0ZW5Gb3JTb3J0IiwiZ2V0SGVhZGVyIiwic28iLCJzb3J0RGltZW5zaW9uIiwiZGlzcGF0Y2hFdmVudCIsInNvcnRhYmxlIiwiZGVsZWdhdGVkVGFyZ2V0IiwiY2xpY2tlZENvbHVtbiIsImdldEluZGV4IiwiZ2V0RGlyZWN0aW9uIiwic29ydGVyIiwibGVzc2VyIiwicmVnZXgiLCJ0ZXN0IiwidGVtcEVsMSIsInRlbXBFbDIiLCJUYWJsZUNvbHVtbnMiLCJ0aGVhZCIsInJlZlRoZWFkIiwiY29tcHV0ZUNvbHVtbnMiLCJkZWZhdWx0SGVhZGVyUm93SW5kZXgiLCJoZWFkZXJSb3dzIiwiaGVhZGVyUm93SW5kZXgiLCJnZXREZWZhdWx0SGVhZGVyUm93Iiwicm93c0xlbmd0aCIsImFic3RyIiwiciIsImF1Z21lbnRJbmRleCIsInJzIiwicm93QSIsImNvbFNwYW4iLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiayIsInRoZWFkQ2VsbHMiLCJnZXRIZWFkZXJDZWxscyIsInJlZlRoZWFkQ2VsbHMiLCJyZWFsQ29sdW1uSW5kZXgiLCJ0aXRsZSIsIlRhYmxlRmxvYXRpbmdIZWFkZXJTdHlsZSIsIlRhYmxlRmxvYXRpbmdIZWFkZXIiLCJ3cmFwVGFibGUiLCJjbG9uZUhlYWRlciIsInZpc2libGUiLCJfbWV0YSIsImxhc3RTY3JvbGxZIiwic291cmNlVEhFQUQiLCJ0aWNraW5nIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZXNpemVGaXhlZCIsInNjcm9sbEZpeGVkIiwicmVxdWVzdFRpY2siLCJfcmVzaXplQ2FsbGJhY2siLCJiaW5kIiwicGFnZVlPZmZzZXQiLCJfc2Nyb2xsQ2FsbGJhY2siLCJ0YWJsZU9mZnNldFRvcCIsIm9mZnNldFRvcCIsInRhYmxlT2Zmc2V0Qm90dG9tIiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJkaXNwbGF5Iiwid3JhcHBlciIsImNsb25lTm9kZSIsImNoaWxkIiwibm9kZU5hbWUiLCJyZW1vdmVDaGlsZCIsImluaXRpYWxIZWFkZXIiLCJjbG9uZWRIZWFkZXIiLCJoZWFkZXJXaWR0aCIsIm9mZnNldFdpZHRoIiwid2lkdGhzIiwiYyIsIndpZHRoIiwiY2FsY09mZnNldEhlaWdodCIsIm9mZnNldCIsInNldFZpc2liaWxpdHkiLCJ0b3AiLCJjb25maWciLCJkZWNsYXJlR2xvYmFscyIsImluaXRpYWxNYXAiLCJ2YWx1ZUNvbHVtbiIsImZ1bGxQYXJlbnRMZXZlbEluZm8iLCJjb2xvckZuIiwidmFsdWUiLCJwYWdlU3RhdGVJZCIsImxvYWRpbmdUZXh0IiwidHlwZUNoZWNrIiwiZmxhdEhpZXJhcmNoeSIsImhpZXJhcmNoeSIsIm5vcm1hbHMiLCJub3JtYWxzU2VwYXJhdG9yIiwicGFyc2VUYWJsZURhdGEiLCJkcmF3TWFwIiwiZGVmYXVsdHMiLCJtaXhlZE9wdGlvbnMiLCJrZXkiLCJvcHRzIiwiSGlnaGNoYXJ0cyIsIm1hcHMiLCJyb3doZWFkZXJzIiwibG9jYWxOYW1lIiwiY29udGFpbmVySUQiLCJtYXBwb2ludENhbGxiYWNrIiwiY2IiLCJyaCIsImFnZ3JlZ2F0ZWRUYWJsZSIsInJvd0hlYWRlciIsIl9kYXRhIiwiZGF0YUl0ZW0iLCJjdXJMVkwiLCJtYXBDaGFydCIsIm1hcENvbmZpZyIsInBhcmVudCIsInN1YmNlbGxzIiwiZmV0Y2hDaGlsZFRhYmxlIiwibHZsIiwiZ2VuZXJhdGVUb29sdGlwUm93IiwibGFiZWwiLCJlbCIsInRleHQiLCJzZXJpZXMiLCJzdWJjZWxsIiwibWFwSUQiLCJzZXJpZXNJdGVtIiwiY29tcG9zZVNlcmllcyIsImRyaWxsZG93biIsImNvZGUiLCJnZXRQcmltYXJ5VmFsdWUiLCJtYXBEYXRhIiwiY2hhcnQiLCJtYXBUcmFuc2Zvcm1zIiwicG9zIiwiZnJvbUxhdExvblRvUG9pbnQiLCJsYXQiLCJjb29yZGluYXRlcyIsImxvbiIsInR5cGUiLCJtYXJrZXIiLCJsaW5lQ29sb3IiLCJsaW5lV2lkdGgiLCJyYWRpdXMiLCJzeW1ib2wiLCJjb2xvciIsImNvbXB1dGVDb2xvciIsIngiLCJ5Iiwic2VsZiIsImV2ZW50cyIsImNsaWNrIiwiZ2VvanNvbiIsImNyZWF0ZUN1c3RvbUdlb0pTT04iLCJkYXRhTGFiZWxzIiwiZW5hYmxlZCIsImZvcm1hdHRlciIsInBvaW50IiwidG9vbHRpcCIsInBvaW50Rm9ybWF0IiwiZ2V0VG9vbHRpcCIsImFsbEFyZWFzIiwiam9pbkJ5IiwiZ2V0U2VyaWVzRGF0YSIsImdldENvb3JkaW5hdGVTZXJpZXMiLCJtYXBOYW1lIiwibG9hZE1hcCIsImFkZFNlcmllcyIsImFkZFNpbmdsZVNlcmllc0FzRHJpbGxkb3duIiwiYXBwbHlEcmlsbGRvd24iLCJhZGRTZXJpZXNBc0RyaWxsZG93biIsIlRoaXMiLCJsYW5nIiwiZHJpbGxVcFRleHQiLCJsZWdlbmQiLCJwbG90T3B0aW9ucyIsInN0YXRlcyIsIm5vcm1hbCIsImFuaW1hdGlvbiIsIm1vdXNlT3ZlciIsInNldFN0YXRlIiwibW91c2VPdXQiLCJtYXBOYXZpZ2F0aW9uIiwiYnV0dG9ucyIsInpvb21JbiIsInZlcnRpY2FsQWxpZ24iLCJ6b29tT3V0Iiwic3VidGl0bGUiLCJhbGlnbiIsImZsb2F0aW5nIiwiZHJpbGxVcEJ1dHRvbiIsInBvc2l0aW9uIiwicmVsYXRpdmVUbyIsImdldExldmVsQnlOYW1lIiwic2hvd0xvYWRpbmciLCJmZXRjaENoaWxkRGF0YSIsInVwZGF0ZU1hcCIsInVwZGF0ZSIsImhpZGVMb2FkaW5nIiwiZHJpbGx1cGFsbCIsImluaXRpYWxpemVNYXAiLCJzaG93SW5MZWdlbmQiLCJwYXJlbnRMZXZlbCIsImN1cnJlbnRMZXZlbCIsImNvdW50cmllc0xpc3QiLCJ2ZXJzaW9uIiwiY29weXJpZ2h0IiwiY29weXJpZ2h0U2hvcnQiLCJjb3B5cmlnaHRVcmwiLCJjcnMiLCJwcm9wZXJ0aWVzIiwiZGVmYXVsdCIsInNjYWxlIiwianNvbnJlcyIsImpzb25tYXJnaW5YIiwianNvbm1hcmdpblkiLCJ4b2Zmc2V0IiwieW9mZnNldCIsImZlYXR1cmVzIiwiZ2V0RmVhdHVyZXMiLCJmZWF0dXJlIiwialF1ZXJ5IiwiZ2V0U2NyaXB0IiwiZXJyb3IiLCJNYXBIaWVyYXJjaHkiLCJjb21wb3NlVHJlZUhpZXJhcmNoeSIsImNvbXBvc2VGbGF0SGllcmFyY2h5IiwiYWRkTWFwSURzVG9IaWVyYXJjaHlMZXZlbCIsIm9ycGhhbkl0ZW1zIiwibm9ybWFsaXplIiwiX2l0ZW1IYXNQYXJlbnQiLCJfYXNzaWduUGFyZW50VG9JdGVtIiwic2hvdWxkTm9ybWFsaXplIiwicGFyc2VyIiwic3RyaW5nQXJyYXkiLCJ2YWwiLCJudW1iZXJBcnJheSIsInN0cmluZyIsIm51bWJlciIsImJvb2xlYW4iLCJpbmhlcml0TWFwTmFtZSIsImJ1YmJsZU1hcElkIiwicGFyZW50SGFzTWFwTmFtZSIsImNvbmNhdCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckNBOzs7O0FBQ0E7Ozs7OztBQUVBQSxRQUFPQyxRQUFQLEdBQWtCRCxPQUFPQyxRQUFQLElBQW1CLEVBQXJDO0FBQ0EseUJBQWFDLEtBQWIsQ0FBbUJGLE9BQU9DLFFBQTFCLEVBQW1DO0FBQ2pDRSx1Q0FEaUM7QUFFakNDO0FBRmlDLEVBQW5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDTE1BLFk7Ozs7Ozs7OztBQUVKOzs7Ozs7Ozs7Ozs7MkJBWWFDLE0sRUFBUUMsTSxFQUFRO0FBQzNCLFlBQUssSUFBSUMsQ0FBVCxJQUFjRCxNQUFkLEVBQXNCO0FBQ3BCRCxnQkFBT0UsQ0FBUCxJQUFZRCxPQUFPQyxDQUFQLENBQVo7QUFDRDtBQUNELGNBQU9GLE1BQVA7QUFDRDs7OzZCQUVjRyxLLEVBQU9DLEksRUFBTTtBQUMxQjtBQUNBLFdBQUlBLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBaEIsSUFBcUJDLE1BQU1DLE9BQU4sQ0FBY0gsS0FBSyxDQUFMLENBQWQsQ0FBekIsRUFBaUQ7QUFDL0NBLGdCQUFPQSxLQUFLLENBQUwsQ0FBUDtBQUNEO0FBQ0Q7QUFDQSxlQUFPRCxLQUFQO0FBQ0UsY0FBSyxLQUFMO0FBQ0EsY0FBSyxNQUFMO0FBQ0EsY0FBSyxPQUFMO0FBQ0VLLG1CQUFRTCxLQUFSLEVBQWVN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LElBQWVuTCxLQUFLbUwsTUFBTCxLQUFnQixJQUEvQixJQUF1Q25MLEtBQUttTCxNQUFMLENBQVlrRCxPQUExRDtBQUNEOzs7eUJBN0NxQjtBQUNwQixjQUFPeEksT0FBT0MsSUFBUCxDQUFZLEtBQUs4RCxPQUFqQixFQUEwQjdRLE1BQTFCLEdBQW1DLENBQTFDO0FBQ0Q7Ozs7OzttQkExR2tCaVosWTs7Ozs7OztBQ0hyQiwwQzs7Ozs7O0FDQUEsMEM7Ozs7OztBQ0FBLDBDOzs7Ozs7O0FDQUEsMEMiLCJmaWxlIjoiZHJpbGxkb3duLW5wcy1tYXAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkZmQ3ZTY5MWYxYTQzMGIxMjI2YiIsIlxuaW1wb3J0IERyaWxsZG93bk1hcCBmcm9tIFwiLi9EcmlsbGRvd25NYXBcIjtcbmltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xuXG53aW5kb3cuUmVwb3J0YWwgPSB3aW5kb3cuUmVwb3J0YWwgfHwge307XG5SZXBvcnRhbEJhc2UubWl4aW4od2luZG93LlJlcG9ydGFsLHtcbiAgRHJpbGxkb3duTWFwLFxuICBSZXBvcnRhbEJhc2Vcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBEcmlsbGRvd25NYXBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiY2xhc3MgUmVwb3J0YWxCYXNlIHtcblxuICAvKipcbiAgICogQ29waWVzIHByb3BzIGZyb20gYSBzb3VyY2Ugb2JqZWN0IHRvIGEgdGFyZ2V0IG9iamVjdC5cbiAgICpcbiAgICogTm90ZSwgdGhpcyBtZXRob2QgdXNlcyBhIHNpbXBsZSBgZm9yLi4uaW5gIHN0cmF0ZWd5IGZvciBlbnVtZXJhdGluZ1xuICAgKiBwcm9wZXJ0aWVzLiAgVG8gZW5zdXJlIG9ubHkgYG93blByb3BlcnRpZXNgIGFyZSBjb3BpZWQgZnJvbSBzb3VyY2VcbiAgICogdG8gdGFyZ2V0IGFuZCB0aGF0IGFjY2Vzc29yIGltcGxlbWVudGF0aW9ucyBhcmUgY29waWVkLCB1c2UgYGV4dGVuZGAuXG4gICAqXG4gICAqIEBtZXRob2QgbWl4aW5cbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFRhcmdldCBvYmplY3QgdGhhdCB3YXMgcGFzc2VkIGFzIGZpcnN0IGFyZ3VtZW50LlxuICAgKi9cbiAgc3RhdGljIG1peGluKHRhcmdldCwgc291cmNlKSB7XG4gICAgZm9yICh2YXIgaSBpbiBzb3VyY2UpIHtcbiAgICAgIHRhcmdldFtpXSA9IHNvdXJjZVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHN0YXRpYyBfbG9nZ2VyKGxldmVsLCBhcmdzKSB7XG4gICAgLy8gYWNjZXB0IFsnZm9vJywgJ2JhciddIGFuZCBbWydmb28nLCAnYmFyJ11dXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgIH1cbiAgICAvLyBvbmx5IGFjY2VwdCBsb2dnaW5nIGZ1bmN0aW9uc1xuICAgIHN3aXRjaChsZXZlbCkge1xuICAgICAgY2FzZSAnbG9nJzpcbiAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICBjb25zb2xlW2xldmVsXS5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIF9sb2coKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIHRoaXMuX2xvZ2dlcignbG9nJywgYXJncyk7XG4gIH1cblxuICBzdGF0aWMgX3dhcm4oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIHRoaXMuX2xvZ2dlcignd2FybicsIGFyZ3MpO1xuICB9XG5cbiAgc3RhdGljIF9lcnJvcigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgdGhpcy5fbG9nZ2VyKCdlcnJvcicsIGFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuYW1lZCBldmVudCB3aXRoIGBuYW1lYFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEByZXR1cm4ge0V2ZW50fSBSZXR1cm5zIGEgY3JlYXRlZCBldmVudFxuICAgKiAqL1xuICBzdGF0aWMgbmV3RXZlbnQobmFtZSl7XG4gICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZlbnQuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUpO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNwZWN0cyBpZiB0aGUgY3VycmVudCBzdHJpbmcgbWlnaHQgYmUgY29udmVydGVkIHRvIG51bWJlciBhbmQgcmVuZGVycyBpdCBhcyBudW1iZXIuIElmIHN0cmluZyBsZW5ndGggaXMgMCwgcmV0dXJucyBgbnVsbGAuIElmIG5vbmUgYXBwbGllcyByZXR1cm5zIHRoZSBzdHJpbmcgYXMgaXMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgLSB2YWx1ZSBvZiB0aGUgY2VsbCBpZiBub3QgSFRNTCBjb250ZW50c1xuICAgKiBAcmV0dXJuIHtOdW1iZXJ8bnVsbHxTdHJpbmd9XG4gICAqICovXG4gIHN0YXRpYyBpc051bWJlcihzdHIpe1xuICAgIGlmKCFpc05hTihwYXJzZUZsb2F0KHN0cikpKXtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8sL2ksJycpOy8vIHJlbW92ZSB1bm5lY2Vzc2FyeSBjb21tYSBhcyBhIGRlbGltaXRlciBmb3IgdGhvdXNhbmRzIGZyb20gZGF0YS5cbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG4gICAgfSBlbHNlIGlmKHN0ci5sZW5ndGg9PTApe3JldHVybiBudWxsfSBlbHNlIHtyZXR1cm4gc3RyfVxuICB9XG5cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBYSFIgd3JhcHBlZCBpbiBhIFByb21pc2VcbiAgICogQHBhcmFtIHshU3RyaW5nfSBVUkwgLSB1cmwgdG8gc2VuZCBhIGBHRVRgIHJlcXVlc3QgdG9cbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyBhIHRoZW4tYWJsZSBwcm9taXNlIHdpdGggYFhNTEh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dGBcbiAgICogKi9cbiAgc3RhdGljIHByb21pc2VSZXF1ZXN0KFVSTCl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKCdHRVQnLCBVUkwsIHRydWUpO1xuICAgICAgeGhyLm9ubG9hZCA9IGU9Pnt4aHIuc3RhdHVzID09IDIwMD9yZXNvbHZlKHhoci5yZXNwb25zZVRleHQpOnJlamVjdChFcnJvcihgJHt4aHIuc3RhdHVzfTogJHt4aHIuc3RhdHVzVGV4dH1gKSk7fVxuICAgICAgeGhyLm9uZXJyb3IgPSBlPT57cmVqZWN0KGUpfVxuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgdmFyaWFibGUgbGlzdGVkIGluIHF1ZXJ5IHN0cmluZ1xuICAgKiBAcGFyYW0geyFTdHJpbmd9IHZhcmlhYmxlIC0gdmFyaWFibGUgbmFtZSB0byBnZXQgdmFsdWUgZm9yXG4gICAqIEBwYXJhbSB7U3RyaW5nPX0gW3F1ZXJ5PXdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpXSAtIHRoZSBxdWVyeSBzdHJpbmcgdG8gc2VhcmNoIHZhcmlhYmxlIGZvciBpblxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybnMgdmFsdWUgZm9yIHRoZSB2YXJpYWJsZVxuICAgKiAqL1xuICBzdGF0aWMgZ2V0UXVlcnlWYXJpYWJsZSh2YXJpYWJsZSxxdWVyeT13aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKSl7XG4gICAgdmFyIHZhcnMgPSBxdWVyeS5zcGxpdChcIiZcIik7XG4gICAgZm9yICh2YXIgaT0wO2k8dmFycy5sZW5ndGg7aSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgaWYoKHBhaXJbMF0pLnRvTG93ZXJDYXNlKCkgPT0gdmFyaWFibGUudG9Mb3dlckNhc2UoKSl7cmV0dXJuIHBhaXJbMV07fVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBSZXBvcnRhbEJhc2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1yZXBvcnRhbC1iYXNlL3NyYy9yZXBvcnRhbC1iYXNlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMjEuMDkuMjAxNi5cclxuICovXHJcbmltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xyXG4vL2ltcG9ydCBUYWJsZURhdGFSb3dNZXRhIGZyb20gXCIuL1RhYmxlRGF0YVJvd01ldGFcIjtcclxuXHJcbi8qKlxyXG4gKiBBIGJhc2UgY2xhc3MgZm9yIHN0cmlwcGluZyBkYXRhIGZyb20gSFRNTCB0YWJsZXNcclxuICogKi9cclxuY2xhc3MgVGFibGVEYXRhIHtcclxuICAvKipcclxuICAgKiBEZXRlY3RzIGlmIHRoZSBkYXRhc2V0IGlzIG11bHRpLWRpbWVudGlvbmFsIGFuZCBzZXRzIGNsYXNzZXMgb24gaXRlbXM6IGEgcm93c3Bhbm5pbmcgY2VsbCBnZXRzIGEgYC5ibG9ja0NlbGxgIGFuZCB0aGUgcm93IGNvbnRhaW5pbmcgaXQgYSBgLmZpcnN0SW5CbG9ja2BcclxuICAgKiBfX0RvZXNuJ3Qgd29yayB3aXRoIGBIb3Jpem9udGFsIFBlcmNlbnRzYCBlbmFibGVkIV9fXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGVcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIGlmIHRoZSBkYXRhIGluIHRhYmxlIGlzIG11bHRpLWRpbWVudGlvbmFsXHJcbiAgICogKi9cclxuICBzdGF0aWMgZGV0ZWN0TXVsdGlkaW1lbnNpb25hbChzb3VyY2Upe1xyXG4gICAgbGV0IG11bHRpZGltZW5zaW9uYWwgPSBmYWxzZTtcclxuICAgIGxldCBibG9ja3MgPSBzb3VyY2UucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKGB0YWJsZSMke3NvdXJjZS5pZH0+dGJvZHk+dHI+dGQ6bnRoLWNoaWxkKDEpW3Jvd3NwYW5dYCk7XHJcbiAgICBpZihibG9ja3MubGVuZ3RoPjApe1xyXG4gICAgICBtdWx0aWRpbWVuc2lvbmFsID0gdHJ1ZTtcclxuICAgICAgW10uc2xpY2UuY2FsbChibG9ja3MpLmZvckVhY2goYmxvY2tDZWxsPT57XHJcbiAgICAgICAgYmxvY2tDZWxsLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrQ2VsbCcpO1xyXG4gICAgICAgIGJsb2NrQ2VsbC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2ZpcnN0SW5CbG9jaycpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtdWx0aWRpbWVuc2lvbmFsXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHRyYWN0cyBkYXRhIGZyb20gYSBnaXZlbiBjZWxsLiBPdmVycmlkZSBpbiBhbiBpbmhlcml0ZWQgY2xhc3MgaWYgeW91IG5lZWQgdG8gYWRkIGFueSBtZXRhZGF0YSB0byBpdC5cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUNlbGxFbGVtZW50fSBjZWxsIC0gY2VsbCBlbGVtZW50IHRvIGhhdmUgZGF0YSBzdHJpcHBlZCBvZmYgaXRcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUNlbGxFbGVtZW50fSByb3dJbmRleCAtIGluZGV4IG9mIHRoZSByb3cgaXQncyBpblxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlQ2VsbEVsZW1lbnR9IGNvbHVtbkluZGV4IC0gaW5kZXggb2YgdGhlIGNvbHVtbiBpdCdzIGluXHJcbiAgICogQHJldHVybnMgez9TdHJpbmd8P051bWJlcn0gUmV0dXJucyBhIGBTdHJpbmdgLCBhIGBOdW1iZXJgIG9yIGEgYG51bGxgIChpZiBkYXRhIGlzIGFic2VudCBpbiB0aGUgY2VsbCBvciBpdHMgdGV4dCBjb250ZW50IGJvaWxzIGRvd24gdG8gYW4gZW1wdHkgc3RyaW5nIC0gaS5lLiB0aGVyZSBhcmUgbm8gY2hhcmFjdGVycyBpbiB0aGUgY2VsbCwgb25seSBIVE1MIHRhZ3MpXHJcbiAgICogKi9cclxuICBzdGF0aWMgcHJlcGFyZURhdGFDZWxsKGNlbGwsIHJvd0luZGV4LCBjb2x1bW5JbmRleCl7XHJcbiAgIHJldHVybiBSZXBvcnRhbEJhc2UuaXNOdW1iZXIoY2VsbC50ZXh0Q29udGVudC50cmltKCkpO1xyXG4gICAgLypyZXR1cm4ge1xyXG4gICAgICAgIGNlbGwsXHJcbiAgICAgICAgZGF0YTogUmVwb3J0YWxCYXNlLmlzTnVtYmVyKGNlbGwudGV4dENvbnRlbnQudHJpbSgpKSxcclxuICAgICAgICByb3dJbmRleCxcclxuICAgICAgICBjb2x1bW5JbmRleFxyXG4gICAgICB9Ki9cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgdW5pdmVyc2FsIGRhdGEtZXh0cmFjdGlvbiBmdW5jdGlvbi4gSXQgc3RyaXBzIGRhdGEgZnJvbSBhIHRhYmxlJ3MgYm9keS4gRGF0YSBjYW4gYmUgc3RyaXBwZWQgYnkgcm93cyAoaG9yaXpvbnRhbGx5KSBvciBieSBjb2x1bW5zICh2ZXJ0aWNhbGx5KSB3aGljaCBpcyBjb250cm9sbGVkIGJ5IGBkaXJlY3Rpb25gLiBJdCBhY2NvdW50cyBmb3IgYSBzcGFubmluZyBibG9jayBjZWxsIGFuZCBtYXkgZXhjbHVkZSBpdC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgdG8gY29uZmlndXJlIHRoZSB3YXkgZGF0YSBpcyBzdHJpcHBlZCBvZmYgdGhlIHRhYmxlXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBvcHRpb25zLnNvdXJjZSAtIHNvdXJjZSB0YWJsZSB0aGF0IHdpbGwgYmUgYW4gaW5wdXQgZm9yIGRhdGEgc3RyaXBwaW5nXHJcbiAgICogQHBhcmFtIHtTdHJpbmc9fSBvcHRpb25zLmRpcmVjdGlvbj0ncm93JyAtIGRpcmVjdGlvbiBpbiB3aGljaCBkYXRhIHN0cmlwcGluZyB3aWxsIG9jY3VyOiBgcm93YCBzdHJpcHMgYWNyb3NzIHJvd3MgYW5kIHByZXNlbnRzIGFuIGFycmF5IHdoZXJlIGVhY2ggYXJyYXkgaXRlbSBpcyBhbiBhcnJheSBvZiBjZWxsIHZhbHVlcy4gYGNvbHVtbmAgc3RyaXBzIHZhbHVlcyB2ZXJ0aWNhbHkgaW4gYSBjb2x1bW4sIHRoZSByZXN1bHRpbmcgYXJyYXkgd2lsbCBjb250YWluIGFycmF5cyAocGVyIGNvbHVtbikgd2l0aCB2YWx1ZXMgcmVzZW1ibGluZyBub3JtYWxpemVkIGRhdGEgZm9yIGNlbGxzIGluIHRoZSBjb2x1bW5cclxuICAgKiBAcGFyYW0ge0Jvb2xlYW49fSBbb3B0aW9ucy5leGNsdWRlQmxvY2s9dHJ1ZV0gLSBpZiB0YWJsZSBjb250YWlucyBibG9jayBjZWxscyB0aGF0IHJvd3NwYW4gYWNyb3NzIHNldmVyYWwgcm93cywgd2UgbWlnaHQgbmVlZCB0byBleGNsdWRlIHRob3NlIGZyb20gYWN0dWFsIGRhdGFcclxuICAgKiBAcGFyYW0ge0FycmF5fE51bWJlcn0gW29wdGlvbnMuZXhjbHVkZUNvbHVtbnNdIC0gaWYgdGFibGUgY29udGFpbnMgY29sdW1ucyB0aGF0IGFyZSBub3QgdG8gYmUgaW4gZGF0YSwgdGhlbiBwYXNzIGEgc2luZ2xlIGluZGV4IG9yIGFuIGFycmF5IG9mIGNlbGwgaW5kaWNlcyAoMC1iYXNlZCkuIFlvdSBuZWVkIHRvIGNvdW50IGNvbHVtbnMgbm90IGJ5IGhlYWRlcnMgYnV0IGJ5IHRoZSBjZWxscyBpbiByb3dzLlxyXG4gICAqIEBwYXJhbSB7QXJyYXl8TnVtYmVyfSBbb3B0aW9ucy5leGNsdWRlUm93c10gLSBpZiB0YWJsZSBjb250YWlucyByb3dzIHRoYXQgYXJlIG5vdCB0byBiZSBpbiBkYXRhLCB0aGVuIHBhc3MgYSBzaW5nbGUgaW5kZXggb3IgYW4gYXJyYXkgb2Ygcm93IGluZGljZXMgKDAtYmFzZWQpLiBZb3UgbmVlZCB0byBjb3VudCBvbmx5IHJvd3MgdGhhdCBjb250YWluIGRhdGEsIG5vdCB0aGUgdGFibGUtaGVhZGVyIHJvd3MuXHJcbiAgICogQHBhcmFtIHtCb29sZWFuPX0gb3B0aW9ucy5tdWx0aWRpbWVuc2lvbmFsPWZhbHNlIC0gd2hldGhlciB0aGUgdGFibGUgaGFzIGFnZ3JlZ2F0aW5nIGNlbGxzIHRoYXQgYWdncmVnYXRlIHJvd2hlYWRlcnMuIFJlc3VsdCBvZiB7QGxpbmsgVGFibGVEYXRhI2RldGVjdE11bHRpZGltZW5zaW9uYWx9IG1heSBiZSBwYXNzZWQgaGVyZSB0byBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZSBpZiBpdCBoYXMgYWdncmVnYXRpbmcgY2VsbHMuXHJcbiAgICogQHJldHVybnMge0FycmF5fSByZXR1cm5zIGRhdGEgYXJyYXkuXHJcbiAgICogKi9cclxuICBzdGF0aWMgZ2V0RGF0YShvcHRpb25zKXtcclxuICAgIGxldCB7c291cmNlLGV4Y2x1ZGVCbG9jaz10cnVlLGV4Y2x1ZGVDb2x1bW5zLGV4Y2x1ZGVSb3dzLGRpcmVjdGlvbj0ncm93JyxtdWx0aWRpbWVuc2lvbmFsPWZhbHNlfT1vcHRpb25zO1xyXG4gICAgbGV0IGRhdGEgPSBbXTtcclxuICAgIGlmKHNvdXJjZSAmJiBzb3VyY2UudGFnTmFtZSA9PSAnVEFCTEUnKXtcclxuICAgICAgbGV0IHJvd3MgPSBbXS5zbGljZS5jYWxsKHNvdXJjZS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoYHRhYmxlIyR7c291cmNlLmlkfT50Ym9keT50cmApKTtcclxuICAgICAgaWYocm93cy5sZW5ndGg+MCl7XHJcbiAgICAgICAgbGV0IHRlbXBBcnJheT1bXTtcclxuICAgICAgICAvLyBhY2NvdW50IGZvciBhIG5lZ2F0aXZlIHJvdyBudW1iZXIgKGAtMWApIG1lYW5pbmcgbGFzdCByb3dcclxuICAgICAgICBpZih0eXBlb2YgZXhjbHVkZVJvd3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIGlmKHR5cGVvZiBleGNsdWRlUm93cyA9PSAnbnVtYmVyJyl7XHJcbiAgICAgICAgICAgIC8vIGZvciBub24tYmxvY2sgcm93cyBpbiBtdWx0aWRpbWVuc2lvbmFsXHJcbiAgICAgICAgICAgIGlmKGV4Y2x1ZGVSb3dzPDApeyAvLyBhY2NvdW50IGZvciBhIG5lZ2F0aXZlIGNvbHVtbiBudW1iZXIgKGUuZy5gLTFgKSBtZWFuaW5nIGxhc3QgY29sdW1uXHJcbiAgICAgICAgICAgICAgZXhjbHVkZVJvd3M9IHJvd3MubGVuZ3RoK2V4Y2x1ZGVSb3dzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd3Muc3BsaWNlKGV4Y2x1ZGVSb3dzLDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShleGNsdWRlUm93cykpe1xyXG4gICAgICAgICAgICBleGNsdWRlUm93cy5zb3J0KChhLGIpPT57cmV0dXJuIGE+Yj8xOi0xfSkucmV2ZXJzZSgpOyAvL3NvcnQgdG8gc3BsaWNlIGZyb20gdGhlIGVuZCBvZiB0aGUgYXJyYXlcclxuICAgICAgICAgICAgZXhjbHVkZVJvd3MuZm9yRWFjaChpPT57XHJcbiAgICAgICAgICAgICAgaWYoaT49MCl7XHJcbiAgICAgICAgICAgICAgICByb3dzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLnNwbGljZShyb3dzLmxlbmd0aCtpLDEpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByb3dzLmZvckVhY2goKHJvdyxyb3dJbmRleCk9PntcclxuICAgICAgICAgIGlmKG11bHRpZGltZW5zaW9uYWwpe1xyXG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRoZSBgdGVtcEFycmF5YCBpcyBub3QgZW1wdHkgYW5kIHB1c2ggaXQgdG8gdGhlIGBkYXRhYCBhcnJheSwgYmVjYXVzZSB3ZSd2ZSBlbmNvdW50ZXJlZCBhIG5ldyBibG9jaywgc28gdGhlIG9sZCBibG9jayBoYXMgdG8gYmUgcHVzaGVkIHRvIGRhdGEuIFRoZW4gd2UgbmVlZCB0byBjcmVhdGUgYSBuZXcgYmxvY2sgYXJyYXkgYW5kIHB1c2ggdGhlcmVcclxuICAgICAgICAgICAgaWYocm93LmNsYXNzTGlzdC5jb250YWlucygnZmlyc3RJbkJsb2NrJykpe1xyXG4gICAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodGVtcEFycmF5KSAmJiB0ZW1wQXJyYXkubGVuZ3RoPjApe2RhdGEucHVzaCh0ZW1wQXJyYXkpO31cclxuICAgICAgICAgICAgICB0ZW1wQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkaXJlY3Rpb249PSdyb3cnICYmICFBcnJheS5pc0FycmF5KHRlbXBBcnJheVt0ZW1wQXJyYXkubGVuZ3RoXSkpIHsgLy8gaWYgYSByb3cgaW4gYW4gYXJyYXkgZG9lc24ndCBleGlzdCBjcmVhdGUgaXRcclxuICAgICAgICAgICAgdGVtcEFycmF5W3RlbXBBcnJheS5sZW5ndGhdID0gW107XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gY2FsY3VsYXRlIHdoaWNoIGNlbGxzIHRvIGV4Y2x1ZGVcclxuICAgICAgICAgIGxldCBjZWxscyA9IFtdLnNsaWNlLmNhbGwocm93LmNoaWxkcmVuKTtcclxuICAgICAgICAgIGxldCB0ZW1wX2V4Y2x1ZGVDb2x1bW5zID0gZXhjbHVkZUNvbHVtbnM7XHJcbiAgICAgICAgICBpZih0eXBlb2YgdGVtcF9leGNsdWRlQ29sdW1ucyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgdGVtcF9leGNsdWRlQ29sdW1ucyA9PSAnbnVtYmVyJyl7XHJcbiAgICAgICAgICAgICAgLy8gZm9yIG5vbi1ibG9jayByb3dzIGluIG11bHRpZGltZW5zaW9uYWxcclxuICAgICAgICAgICAgICBpZihtdWx0aWRpbWVuc2lvbmFsICYmICFyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaXJzdEluQmxvY2snKSAmJiAhdGVtcF9leGNsdWRlQ29sdW1uczwwKXtcclxuICAgICAgICAgICAgICAgIHRlbXBfZXhjbHVkZUNvbHVtbnM9dGVtcF9leGNsdWRlQ29sdW1ucysxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZih0ZW1wX2V4Y2x1ZGVDb2x1bW5zPDApeyAvLyBhY2NvdW50IGZvciBhIG5lZ2F0aXZlIGNvbHVtbiBudW1iZXIgKGUuZy5gLTFgKSBtZWFuaW5nIGxhc3QgY29sdW1uXHJcbiAgICAgICAgICAgICAgICB0ZW1wX2V4Y2x1ZGVDb2x1bW5zPSBjZWxscy5sZW5ndGgrdGVtcF9leGNsdWRlQ29sdW1ucztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2VsbHMuc3BsaWNlKHRlbXBfZXhjbHVkZUNvbHVtbnMsMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0ZW1wX2V4Y2x1ZGVDb2x1bW5zKSl7XHJcbiAgICAgICAgICAgICAgdGVtcF9leGNsdWRlQ29sdW1ucy5zb3J0KChhLGIpPT57cmV0dXJuIGE+Yj8xOi0xfSkucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgIHRlbXBfZXhjbHVkZUNvbHVtbnMuZm9yRWFjaChpPT57XHJcbiAgICAgICAgICAgICAgICBpZihpPj0wKXtcclxuICAgICAgICAgICAgICAgICAgY2VsbHMuc3BsaWNlKG11bHRpZGltZW5zaW9uYWwgJiYgIXJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpcnN0SW5CbG9jaycpP2krMTppLDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2VsbHMuc3BsaWNlKGNlbGxzLmxlbmd0aCtpLDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHdlIHdhbnQgdG8gcnVuIHRoaXMgZXZlcnkgcm93IGJlY2F1c2UgbnVtYmVyIG9mIGNlbGxzIGluIGVhY2ggcm93IG1heSBkaWZmZXIgYW5kIHdlIHdhbnQgdG8gZXhjbHVkZSB0aGUgbGFzdCBvbmVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkaXJlY3Rpb24gPT0gJ3N0cmluZycgJiYgZGlyZWN0aW9uID09ICdyb3cnKSB7IC8vaWYgd2Ugc3RyaXAgZGF0YSBob3Jpem9udGFsbHkgYnkgcm93XHJcbiAgICAgICAgICAgICAgaWYoIShtdWx0aWRpbWVuc2lvbmFsICYmIGV4Y2x1ZGVCbG9jayAmJiBjZWxsLnJvd1NwYW4+MSkpeyAvLyBpZiBpdCdzIGEgYmxvY2sgY2VsbCB3ZSdkIGV4Y2x1ZGUgaXQgZnJvbSBkYXRhXHJcbiAgICAgICAgICAgICAgICB0ZW1wQXJyYXlbdGVtcEFycmF5Lmxlbmd0aC0xXS5wdXNoKHRoaXMucHJlcGFyZURhdGFDZWxsKGNlbGwscm93SW5kZXgsaW5kZXgpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRpcmVjdGlvbiA9PSAnc3RyaW5nJyAmJiBkaXJlY3Rpb24gPT0gJ2NvbHVtbicpIHsgLy9pZiB3ZSBzdHJpcCBkYXRhIHZlcnRpY2FsbHkgYnkgY29sdW1uXHJcbiAgICAgICAgICAgICAgbGV0IHJlYWxJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGlmKCEobXVsdGlkaW1lbnNpb25hbCAmJiBleGNsdWRlQmxvY2sgJiYgY2VsbC5yb3dTcGFuPjEpKXsgLy9leGNsdWRlIGJsb2NrIGNlbGxcclxuICAgICAgICAgICAgICAgIHJlYWxJbmRleCArPSAhcm93LmNsYXNzTGlzdC5jb250YWlucygnZmlyc3RJbkJsb2NrJyk/IDAgOiAtMTsgLy8gb2Zmc2V0IGNlbGwgdGhhdCBmb2xsb3dzIGJsb2NrIGNlbGwgb25lIHBvc2l0aW9uIGJhY2tcclxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0ZW1wQXJyYXlbcmVhbEluZGV4XSkpIHsgLy9jcmVhdGUgY29sdW1uIGFycmF5IGZvciBjdXJyZW50IGNvbHVtbiBpZiBub3QgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICAgIHRlbXBBcnJheVtyZWFsSW5kZXhdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZW1wQXJyYXlbcmVhbEluZGV4XS5wdXNoKHRoaXMucHJlcGFyZURhdGFDZWxsKGNlbGwscm93SW5kZXgscmVhbEluZGV4KSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RpcmVjdGlvbiBoYXMgdG9iZSBhIFN0cmluZz09YHJvdyB8IGNvbHVtbmAsIG5vdCBhICR7ZGlyZWN0aW9ufScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vd2UgbmVlZCB0byBwdXNoIHRoZSBsYXN0IGJsb2NrIEFycmF5IGJlY2F1c2UgdGhlcmUnbGwgYmUgbm8gYC5maXJzdEluQmxvY2tgIGFueW1vcmUgdG8gZG8gdGhhdFxyXG4gICAgICAgIGlmKG11bHRpZGltZW5zaW9uYWwgJiYgQXJyYXkuaXNBcnJheSh0ZW1wQXJyYXkpICYmIHRlbXBBcnJheS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICBkYXRhLnB1c2godGVtcEFycmF5KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXRhID0gdGVtcEFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHRhYmxlIyR7c291cmNlLmlkfSdzIGJvZHkgbXVzdCBjb250YWluIHJvd3NgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc291cmNlIG11c3QgYmUgZGVmaW5lZCBhbmQgYmUgYSB0YWJsZScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFibGVEYXRhXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1hZ2dyZWdhdGVkLXRhYmxlL3NyYy90YWJsZS1kYXRhLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMTcuMDguMjAxNi5cclxuICovXHJcbi8qKlxyXG4gKiBAcHJvcGVydHkge0hUTUxUYWJsZVJvd0VsZW1lbnR9IHJvdyAtIHJlZmVyZW5jZSB0byB0aGUgYDx0cj5gIGVsZW1lbnRcclxuICogQHByb3BlcnR5IHs/U3RyaW5nfSBpZCAtIGludGVybmFsIFJlcG9ydGFsIGlkIGZvciB0aGUgcm93aGVhZGVyIGluIHRoZSByb3dcclxuICogQHByb3BlcnR5IHshSFRNTFRhYmxlQ2VsbEVsZW1lbnR9IG5hbWVDZWxsIC0gcmVmZXJlbmNlIHRvIHRoZSBgPHRkPmAgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSByb3doZWFkZXIgbGFiZWwvbmFtZVxyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW25hbWU9bmFtZUNlbGwudGV4dENvbnRlbnRdIC0gbGFiZWwgb2YgdGhlIHJvd2hlYWRlci5cclxuICogQHByb3BlcnR5IHs/T2JqZWN0fSBbYmxvY2s9bnVsbF0gLSB0aGUgYmxvY2sgdGhlIHJvdyBiZWxvbmdzIHRvXHJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZmlyc3RJbkJsb2NrIC0gdGhpcyBgcm93YCBpcyBmaXJzdCBpbiB0aGUgYGJsb2NrYCwgd2hpY2ggbWVhbnMgaXQgY29udGFpbnMgdGhlIGZpcnN0IGNlbGwgYXMgYSBibG9jayBjZWxsXHJcbiAqICovXHJcbmNsYXNzIEFnZ3JlZ2F0ZWRUYWJsZVJvd01ldGEge1xyXG4gIC8qKlxyXG4gICAqIEJ1aWxkcyBhIHByb3RvdHlwZSBmb3IgZWFjaCByb3cgb2YgYW4gQWdncmVnYXRlZCBUYWJsZVxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlUm93RWxlbWVudH0gcm93IC0gcmVmZXJlbmNlIHRvIHRoZSBgPHRyPmAgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7P1N0cmluZ30gaWQgLSBpbnRlcm5hbCBSZXBvcnRhbCBpZCBmb3IgdGhlIHJvd2hlYWRlciBpbiB0aGUgcm93XHJcbiAgICogQHBhcmFtIHshSFRNTFRhYmxlQ2VsbEVsZW1lbnR9IG5hbWVDZWxsIC0gcmVmZXJlbmNlIHRvIHRoZSBgPHRkPmAgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSByb3doZWFkZXIgbGFiZWwvbmFtZVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nPX0gW25hbWU9bmFtZUNlbGwudGV4dENvbnRlbnRdIC0gbGFiZWwgb2YgdGhlIHJvd2hlYWRlci5cclxuICAgKiBAcGFyYW0gez9PYmplY3R9IFtibG9jaz1udWxsXSAtIHRoZSBibG9jayB0aGUgcm93IGJlbG9uZ3MgdG9cclxuICAgKiAqL1xyXG4gIGNvbnN0cnVjdG9yKHtyb3csIGlkPW51bGwsIG5hbWVDZWxsLCBuYW1lLCBibG9jaz1udWxsfT17fSl7XHJcbiAgICAvKioqIEBwcm9wZXJ0eSB7SFRNTFRhYmxlUm93RWxlbWVudH0gcm93IC0gcmVmZXJlbmNlIHRvIHRoZSBgPHRyPmAgZWxlbWVudCovXHJcbiAgICB0aGlzLnJvdyA9IHJvdztcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMubmFtZUNlbGwgPSBuYW1lQ2VsbDtcclxuICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgbmFtZUNlbGwudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgdGhpcy5ibG9jayA9IGJsb2NrO1xyXG4gICAgdGhpcy5maXJzdEluQmxvY2sgPSBibG9jayE9bnVsbCAmJiB0aGlzLnJvdy5yb3dJbmRleCA9PT0gdGhpcy5ibG9jay5jZWxsLnBhcmVudE5vZGUucm93SW5kZXg7XHJcbiAgfVxyXG4gIC8qZ2V0IGZpcnN0SW5CbG9jaygpe1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0SW5CbG9jaztcclxuICB9XHJcbiAgc2V0IGZpcnN0SW5CbG9jayh2YWwpe1xyXG4gICAgdGhpcy5fZmlyc3RJbkJsb2NrID0gdmFsO1xyXG4gICAgdmFsP3RoaXMucm93LmNsYXNzTGlzdC5hZGQoJ2ZpcnN0SW5CbG9jaycpOnRoaXMucm93LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpcnN0SW5CbG9jaycpO1xyXG4gIH0qL1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFnZ3JlZ2F0ZWRUYWJsZVJvd01ldGFcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9yLWFnZ3JlZ2F0ZWQtdGFibGUvc3JjL2FnZ3JlZ2F0ZWQtdGFibGUtcm93LW1ldGEuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBJdmFuUCBvbiAyNy4wOS4yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBUYWJsZURhdGEgZnJvbSAnLi90YWJsZS1kYXRhJztcclxuaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcbmltcG9ydCBUYWJsZUNvbHVtbnMgZnJvbSBcInItdGFibGUtY29sdW1uc1wiO1xyXG5pbXBvcnQgU29ydFRhYmxlIGZyb20gXCJyLXNvcnQtdGFibGUvc3JjL3NvcnQtdGFibGVcIjtcclxuaW1wb3J0IFRhYmxlRmxvYXRpbmdIZWFkZXIgZnJvbSBcInItdGFibGUtZmxvYXRpbmctaGVhZGVyL3NyYy90YWJsZS1mbG9hdGluZy1oZWFkZXJcIjtcclxuXHJcbmxldCBzdHlsZXMgPSByZXF1aXJlKCdyLXNvcnQtdGFibGUvc3JjL3NvcnQtdGFibGUtc3R5bGVzLmNzcycpO1xyXG5sZXQgYWdncmVnYXRlZFRhYmxlQ1NTID0gcmVxdWlyZSgnLi9hZ2dyZWdhdGVkLXRhYmxlLmNzcycpO1xyXG5cclxuLyoqXHJcbiAqIEEgYmFzZSBjbGFzcyBmb3IgYWdncmVnYXRlZCB0YWJsZXMuIE11bHRpZGltZW5zaW9uYWwgcHJvcGVydHkgb2YgZGF0YSBpcyBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQsIHRodXMgcmVtb3ZlZCBmcm9tIHBhcmFtcy5cclxuICogQGV4dGVuZHMgVGFibGVEYXRhXHJcbiAqICovXHJcbmNsYXNzIEFnZ3JlZ2F0ZWRUYWJsZSBleHRlbmRzIFRhYmxlRGF0YSB7XHJcbiAgLypcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgdG8gY29uZmlndXJlIHRoZSB3YXkgZGF0YSBpcyBzdHJpcHBlZCBvZmYgdGhlIHRhYmxlXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBvcHRpb25zLnNvdXJjZSAtIHNvdXJjZSB0YWJsZSB0aGF0IHdpbGwgYmUgYW4gaW5wdXQgZm9yIGRhdGEgc3RyaXBwaW5nXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBbb3B0aW9ucy5yZWZTb3VyY2VdIC0gYSByZWZlcmVuY2UgdG8gYSBmbG9hdGluZyBoZWFkZXIsIGlmIGFueVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yb3doZWFkZXJDb2x1bW5JbmRleD0wXSAtIDAtYmFzZWQgaW5kZXggb2YgdGhlIGNvbHVtbiB0aGF0IHdlIG5lZWQgdG8gY2hlY2sgYWdhaW5zdCB0byBzZWUgaWYgaXQncyBhIG11bHRpZGltZW50aW9uYWwgdGFibGVcclxuICAgKiBAcGFyYW0ge051bWJlcnxPYmplY3Q9fSBbb3B0aW9ucy5kZWZhdWx0SGVhZGVyUm93PS0xXSAtIGluZGV4IG9mIHRoZSByb3cgaW4gYHRoZWFkYCAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgaGF2ZSBzb3J0aW5nIGVuYWJsZWQgZm9yIGNvbHVtbnMuIElmIGAtMWAgdGhlbiBsYXN0IHJvdy5cclxuICAgKiBAcGFyYW0ge1N0cmluZz19IG9wdGlvbnMuZGF0YVN0cmlwRGlyZWN0aW9uPSdyb3cnIC0gZGlyZWN0aW9uIGluIHdoaWNoIGRhdGEgc3RyaXBwaW5nIHdpbGwgb2NjdXI6IGByb3dgIHN0cmlwcyBhY3Jvc3Mgcm93cyBhbmQgcHJlc2VudHMgYW4gYXJyYXkgd2hlcmUgZWFjaCBhcnJheSBpdGVtIGlzIGFuIGFycmF5IG9mIGNlbGwgdmFsdWVzLiBgY29sdW1uYCBzdHJpcHMgdmFsdWVzIHZlcnRpY2FseSBpbiBhIGNvbHVtbiwgdGhlIHJlc3VsdGluZyBhcnJheSB3aWxsIGNvbnRhaW4gYXJyYXlzIChwZXIgY29sdW1uKSB3aXRoIHZhbHVlcyByZXNlbWJsaW5nIG5vcm1hbGl6ZWQgZGF0YSBmb3IgY2VsbHMgaW4gdGhlIGNvbHVtblxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbj19IFtvcHRpb25zLmV4Y2x1ZGVCbG9jaz10cnVlXSAtIGlmIHRhYmxlIGNvbnRhaW5zIGJsb2NrIGNlbGxzIHRoYXQgcm93c3BhbiBhY3Jvc3Mgc2V2ZXJhbCByb3dzLCB3ZSBtaWdodCBuZWVkIHRvIGV4Y2x1ZGUgdGhvc2UgZnJvbSBhY3R1YWwgZGF0YVxyXG4gICAqIEBwYXJhbSB7QXJyYXl8TnVtYmVyfSBbb3B0aW9ucy5leGNsdWRlQ29sdW1uc10gLSBpZiB0YWJsZSBjb250YWlucyBjb2x1bW5zIHRoYXQgYXJlIG5vdCB0byBiZSBpbiBkYXRhLCB0aGVuIHBhc3MgYSBzaW5nbGUgaW5kZXggb3IgYW4gYXJyYXkgb2YgY2VsbCBpbmRpY2VzICgwLWJhc2VkKS4gWW91IG5lZWQgdG8gY291bnQgY29sdW1ucyBub3QgYnkgaGVhZGVycyBidXQgYnkgdGhlIGNlbGxzIGluIHJvd3MuXHJcbiAgICogQHBhcmFtIHtBcnJheXxOdW1iZXJ9IFtvcHRpb25zLmV4Y2x1ZGVSb3dzXSAtIGlmIHRhYmxlIGNvbnRhaW5zIHJvd3MgdGhhdCBhcmUgbm90IHRvIGJlIGluIGRhdGEsIHRoZW4gcGFzcyBhIHNpbmdsZSBpbmRleCBvciBhbiBhcnJheSBvZiByb3cgaW5kaWNlcyAoMC1iYXNlZCkuIFlvdSBuZWVkIHRvIGNvdW50IG9ubHkgcm93cyB0aGF0IGNvbnRhaW4gZGF0YSwgbm90IHRoZSB0YWJsZS1oZWFkZXIgcm93cy5cclxuICAgKiBAcGFyYW0ge1NvcnRUYWJsZX0gb3B0aW9ucy5zb3J0aW5nIC0gc29ydGluZyBvcHRpb25zLCBzZWUge0BsaW5rIFNvcnRUYWJsZX0uIElmIHlvdSB3YW50IHRvIGxlYXZlIGFsbCBvcHRpb25zIGRlZmF1bHQgYnV0IGVuYWJsZSBzb3J0aW5nLCBwYXNzIGFuIGVtcHR5IG9iamVjdChgLi4sIHNvcnRpbmc6e31gKSwgb3Igc29ydGluZyB3b24ndCBiZSBhcHBsaWVkLlxyXG4gICAqIEBwYXJhbSB7U29ydFRhYmxlfSBvcHRpb25zLmZsb2F0aW5nSGVhZGVyIC0gZmxvYXRpbmcgaGVhZGVyLCBzZWUge0BsaW5rIFNvcnRUYWJsZX0uIElmIHlvdSB3YW50IHRvIGxlYXZlIGFsbCBvcHRpb25zIGRlZmF1bHQgYnV0IGVuYWJsZSBzb3J0aW5nLCBwYXNzIGFuIGVtcHR5IG9iamVjdChgLi4sIHNvcnRpbmc6e31gKSwgb3Igc29ydGluZyB3b24ndCBiZSBhcHBsaWVkLlxyXG4gICAqICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucyl7XHJcbiAgICBsZXQge1xyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJvd2hlYWRlckNvbHVtbkluZGV4LGRlZmF1bHRIZWFkZXJSb3csZGF0YVN0cmlwRGlyZWN0aW9uLGV4Y2x1ZGVCbG9jayxleGNsdWRlQ29sdW1ucyxleGNsdWRlUm93cyxcclxuICAgICAgc29ydGluZyxcclxuICAgICAgZmxvYXRpbmdIZWFkZXJcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBUaGUgc291cmNlIHRhYmxlXHJcbiAgICAgKiAgQHR5cGUge0hUTUxUYWJsZUVsZW1lbnR9XHJcbiAgICAgKiAgQG1lbWJlck9mIEFnZ3JlZ2F0ZWRUYWJsZVxyXG4gICAgICogICovXHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIGxldCByZWZTb3VyY2U7XHJcbiAgICBpZihmbG9hdGluZ0hlYWRlciAmJiB0eXBlb2YgZmxvYXRpbmdIZWFkZXI9PSdvYmplY3QnKXtcclxuICAgICAgdGhpcy5mbG9hdGluZ0hlYWRlciA9IG5ldyBUYWJsZUZsb2F0aW5nSGVhZGVyKHNvdXJjZSk7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiAgVGhlIGZsb2F0aW5nIGhlYWRlclxyXG4gICAgICAgKiAgQHR5cGUge0hUTUxUYWJsZUVsZW1lbnR9XHJcbiAgICAgICAqICBAbWVtYmVyT2YgQWdncmVnYXRlZFRhYmxlXHJcbiAgICAgICAqICAqL1xyXG4gICAgICB0aGlzLnJlZlNvdXJjZSA9IHJlZlNvdXJjZSA9IHRoaXMuZmxvYXRpbmdIZWFkZXIuaGVhZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFdoZXRoZXIgZGF0YSBpcyBtb25vZGltZW5zaW9uYWwgb3IgbXVsdGlkaW1lbnNpb25hbFxyXG4gICAgICogIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICogIEBtZW1iZXJPZiBBZ2dyZWdhdGVkVGFibGVcclxuICAgICAqICAqL1xyXG5cclxuICAgIHRoaXMubXVsdGlkaW1lbnNpb25hbCA9IHRoaXMuY29uc3RydWN0b3IuZGV0ZWN0TXVsdGlkaW1lbnNpb25hbChzb3VyY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIGRhdGEgQXJyYXlcclxuICAgICAqICBAdHlwZSB7QXJyYXkuPHtjZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50LCBkYXRhOj9TdHJpbmd8P051bWJlciwgY29sdW1uSW5kZXg6TnVtYmVyfT59XHJcbiAgICAgKiAgQG1lbWJlck9mIEFnZ3JlZ2F0ZWRUYWJsZVxyXG4gICAgICogICovXHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmNvbnN0cnVjdG9yLmdldERhdGEoe3NvdXJjZSxyZWZTb3VyY2UsZGVmYXVsdEhlYWRlclJvdyxleGNsdWRlQmxvY2ssZXhjbHVkZUNvbHVtbnMsZXhjbHVkZVJvd3MsZGlyZWN0aW9uOmRhdGFTdHJpcERpcmVjdGlvbixtdWx0aWRpbWVuc2lvbmFsOiB0aGlzLm11bHRpZGltZW5zaW9uYWx9KTtcclxuXHJcblxyXG4gICAgaWYoc29ydGluZyAmJiB0eXBlb2Ygc29ydGluZyA9PSAnb2JqZWN0Jyl7XHJcbiAgICAgIGxldCByZW9yZGVyRnVuY3Rpb24gPSBlPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IucmVvcmRlclJvd3ModGhpcy5kYXRhLHRoaXMuc291cmNlLHRoaXMubXVsdGlkaW1lbnNpb25hbClcclxuICAgICAgfTtcclxuICAgICAgW3NvdXJjZSxyZWZTb3VyY2VdLmZvckVhY2godGFyZ2V0PT57XHJcbiAgICAgICAgaWYodGFyZ2V0KXtcclxuICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdyZXBvcnRhbC10YWJsZS1zb3J0JywgcmVvcmRlckZ1bmN0aW9uKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzb3J0aW5nLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgc29ydGluZy5yZWZTb3VyY2UgPSByZWZTb3VyY2U7XHJcbiAgICAgIHNvcnRpbmcuZGVmYXVsdEhlYWRlclJvdyA9IGRlZmF1bHRIZWFkZXJSb3c7XHJcbiAgICAgIHNvcnRpbmcuZGF0YT10aGlzLmRhdGE7XHJcbiAgICAgIHNvcnRpbmcubXVsdGlkaW1lbnNpb25hbCA9IHRoaXMubXVsdGlkaW1lbnNpb25hbDtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiAgc29ydGluZyBvYmplY3QuIFNlZSB7QGxpbmsgU29ydFRhYmxlfVxyXG4gICAgICAgKiAgQHR5cGUge1NvcnRUYWJsZX1cclxuICAgICAgICogIEBtZW1iZXJPZiBBZ2dyZWdhdGVkVGFibGVcclxuICAgICAgICogICovXHJcbiAgICAgIHRoaXMuc29ydGluZyA9IG5ldyBTb3J0VGFibGUoc29ydGluZyk7XHJcblxyXG4gICAgICAvLyBhZGQgbGlzdGVuZXIgdG8gZG8gcmVvcmRlcmluZyBvbiBzb3J0aW5nXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0YWJsZSBjb2x1bW5zIGFycmF5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHtpbmRleDpOdW1iZXIsIHRpdGxlOlN0cmluZywgY29sU3BhbjpOdW1iZXIsIGNlbGw6IEhUTUxUYWJsZUNlbGxFbGVtZW50LCA/cmVmQ2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudH0+fVxyXG4gICAgICogQG1lbWJlck9mIEFnZ3JlZ2F0ZWRUYWJsZVxyXG4gICAgICogKi9cclxuICAgIHRoaXMuY29sdW1ucyA9IHRoaXMuc29ydGluZyAmJiB0aGlzLnNvcnRpbmcuY29sdW1ucz8gdGhpcy5zb3J0aW5nLmNvbHVtbnMgOiBuZXcgVGFibGVDb2x1bW5zKHtzb3VyY2UscmVmU291cmNlLGRlZmF1bHRIZWFkZXJSb3d9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBFeHRyYWN0cyBkYXRhIGZyb20gYSBnaXZlbiBjZWxsLiBPdmVycmlkZSBpbiBhbiBpbmhlcml0ZWQgY2xhc3MgaWYgeW91IG5lZWQgdG8gYWRkIGFueSBtZXRhZGF0YSB0byBpdC5cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUNlbGxFbGVtZW50fSBjZWxsIC0gY2VsbCBlbGVtZW50IHRvIGhhdmUgZGF0YSBzdHJpcHBlZCBvZmYgaXRcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUNlbGxFbGVtZW50fSByb3dJbmRleCAtIGluZGV4IG9mIHRoZSByb3cgaXQncyBpblxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlQ2VsbEVsZW1lbnR9IGNvbHVtbkluZGV4IC0gaW5kZXggb2YgdGhlIGNvbHVtbiBpdCdzIGluXHJcbiAgICogQHJldHVybnMge3tjZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50LCA/ZGF0YTpTdHJpbmd8TnVtYmVyLCBjb2x1bW5JbmRleDpOdW1iZXJ9fSBSZXR1cm5zIGFuIG9iamVjdCBge2NlbGw6SFRNTFRhYmxlQ2VsbEVsZW1lbnQsIGRhdGE6P1N0cmluZ3w/TnVtYmVyLCBjb2x1bW5JbmRleDpOdW1iZXJ9YCAoaWYgZGF0YSBpcyBhYnNlbnQgaW4gdGhlIGNlbGwgb3IgaXRzIHRleHQgY29udGVudCBib2lscyBkb3duIHRvIGFuIGVtcHR5IHN0cmluZyAtIGkuZS4gdGhlcmUgYXJlIG5vIGNoYXJhY3RlcnMgaW4gdGhlIGNlbGwsIG9ubHkgSFRNTCB0YWdzKSBpdCByZXR1cm5zIG51bGwgaW4gYGRhdGFgXHJcbiAgICogQG92ZXJyaWRlXHJcbiAgICogKi9cclxuICBzdGF0aWMgcHJlcGFyZURhdGFDZWxsKGNlbGwsIHJvd0luZGV4LCBjb2x1bW5JbmRleCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjZWxsLFxyXG4gICAgICBkYXRhOiBSZXBvcnRhbEJhc2UuaXNOdW1iZXIoY2VsbC50ZXh0Q29udGVudC50cmltKCkpLFxyXG4gICAgICBjb2x1bW5JbmRleCxcclxuICAgICAgcm93SW5kZXhcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgY2FyZSBvZiByZXBvc2l0aW9uaW5nIHJvd3MgaW4gdGhlIHRhYmxlIHRvIG1hdGNoIHRoZSBgZGF0YWAgYXJyYXkgaW4gdGhlIHdheSBpdCB3YXMgc29ydGVkIGFuZCBpZiB0aGUgZGF0YSBpcyBzZXBhcmF0ZWQgaW50byBibG9ja3MsIHRoZW4gbW92ZSB0aGUgYmxvY2sgcGllY2UgdG8gdGhlIGZpcnN0IHJvdyBpbiBlYWNoIGRhdGEgYmxvY2suXHJcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YSAtIGZ1bGwgc29ydGVkIGRhdGFzZXQuIEluc3RhbmNlIG9mIHtAbGluayBUYWJsZURhdGEjZ2V0RGF0YX1cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IHNvdXJjZSAtIHNvdXJjZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbXVsdGlkaW1lbnNpb25hbFxyXG4gICAqICovXHJcbiAgc3RhdGljIHJlb3JkZXJSb3dzKGRhdGEsc291cmNlLG11bHRpZGltZW5zaW9uYWwpe1xyXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgQWdncmVnYXRlZFRhYmxlLmRpbWVuc2lvbmFsRGF0YUl0ZXJhdG9yKGRhdGEsbXVsdGlkaW1lbnNpb25hbCwoZGF0YURpbWVuc2lvbik9PntcclxuICAgICAgaWYobXVsdGlkaW1lbnNpb25hbCl7QWdncmVnYXRlZFRhYmxlLnJlcG9zaXRpb25CbG9ja0NlbGwoZGF0YURpbWVuc2lvbil9IC8vIGlmIG11bHRpZGltZW5zaW9uYWwgcmVwb3NpdGlvbiBhZ2dyZWdhdGluZyBibG9jayBjZWxsIHRvIHRoZSB0b3Btb3N0IHJvdyBpbiBzb3J0ZWQgYXJyYXlcclxuICAgICAgZGF0YURpbWVuc2lvbi5mb3JFYWNoKGl0ZW09PntmcmFnbWVudC5hcHBlbmRDaGlsZChpdGVtWzBdLmNlbGwucGFyZW50Tm9kZSl9KTsgLy8gYWRkIHJvdyB0byBmcmFnbWVudCBpbiB0aGUgYXJyYXkgb3JkZXIsIHRoaXMgZG9lc24ndCBhY2NvdW50IGZvciBjb2x1bW4gc3RyaXBwZWQgZGF0YSB5ZXRcclxuICAgIH0pO1xyXG4gICAgc291cmNlLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5JykuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBSZXBvc2l0aW9ucyB0aGUgcm93c3Bhbm5pbmcgYmxvY2sgY2VsbCBmcm9tIHRoZSBpbml0aWFsIHJvdyB0byB0aGUgbmV3IHNvcnRlZCByb3dcclxuICAgKiBAcGFyYW0ge0FycmF5fSBpdGVtcyAtIGRpbWVuc2lvbiBvZiBkYXRhXHJcbiAgICogKi9cclxuICBzdGF0aWMgcmVwb3NpdGlvbkJsb2NrQ2VsbChpdGVtcyl7XHJcbiAgICBsZXQgYmxvY2tSb3dJdGVtID0gaXRlbXMuZmlsdGVyKGl0ZW09Pml0ZW1bMF0uY2VsbC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnZmlyc3RJbkJsb2NrJykpWzBdO1xyXG4gICAgbGV0IGJsb2NrUm93ID0gYmxvY2tSb3dJdGVtWzBdLmNlbGwucGFyZW50Tm9kZTtcclxuICAgIGlmKGl0ZW1zLmluZGV4T2YoYmxvY2tSb3dJdGVtKSE9MCl7Ly8gaWYgYmxvY2sgcm93IGlzbid0IGZpcnN0IGluIGRpbWVuc2lvblxyXG4gICAgICBsZXQgbmV3Rmlyc3RSb3cgPSBpdGVtc1swXVswXS5jZWxsLnBhcmVudE5vZGU7XHJcbiAgICAgIG5ld0ZpcnN0Um93Lmluc2VydEJlZm9yZShibG9ja1Jvdy5xdWVyeVNlbGVjdG9yKCcuYmxvY2tDZWxsJyksbmV3Rmlyc3RSb3cuZmlyc3RFbGVtZW50Q2hpbGQpOy8vIG1vdmUgYmxvY2sgY2VsbFxyXG4gICAgICBuZXdGaXJzdFJvdy5jbGFzc0xpc3QuYWRkKCdmaXJzdEluQmxvY2snKTtcclxuICAgICAgYmxvY2tSb3cuY2xhc3NMaXN0LnJlbW92ZSgnZmlyc3RJbkJsb2NrJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhbGxvd3MgdG8gcGVyZm9ybSBhY3Rpb24gb24gZGF0YSBiYXNlZCBvbiBpdHMgbXVsdGlkaW1lbnNpb25hbGl0eVxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSBmdWxsIGRhdGFzZXQuIEluc3RhbmNlIG9mIHtAbGluayBUYWJsZURhdGEjZ2V0RGF0YX1cclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG11bHRpZGltZW5zaW9uYWxcclxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gY2FsbGJhY2sgLSBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIGEgZGltZW5zaW9uIG9mIGRhdGEuIENhbGxiYWNrIGlzIGNhbGxlZCB3aXRoIHR3byBhdHRyaWJ1dGVzOiBgZGltZW5zaW9uYCAtIHRoZSBjdXJyZW50IGl0ZXJhdGlvbiBvZiBkYXRhIGFuZCBgaW5kZXhgIChvcHRpb25hbCkgaWYgaXQncyBtdWx0aWRpbWVuc2lvbmFsXHJcbiAgICogKi9cclxuICBzdGF0aWMgZGltZW5zaW9uYWxEYXRhSXRlcmF0b3IoZGF0YSxtdWx0aWRpbWVuc2lvbmFsLGNhbGxiYWNrKXtcclxuICAgIGlmKCFjYWxsYmFjayB8fCB0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJyl7dGhyb3cgbmV3IFR5cGVFcnJvcignYGNhbGxiYWNrYCBtdXN0IGJlIHBhc3NlZCBhbmQgYmUgYSBmdW5jdGlvbicpfVxyXG4gICAgaWYoIW11bHRpZGltZW5zaW9uYWwpe1xyXG4gICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSlcclxuICAgIH0gZWxzZSB7IC8vIGlmIGFycmF5IGhhcyBuZXN0ZWQgYXJyYXkgYmxvY2tzXHJcbiAgICAgIGRhdGEuZm9yRWFjaCgoZGltZW5zaW9uLGluZGV4KT0+e1xyXG4gICAgICAgIGNhbGxiYWNrKGRpbWVuc2lvbixpbmRleCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZ2dyZWdhdGVkVGFibGVcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9yLWFnZ3JlZ2F0ZWQtdGFibGUvc3JjL2FnZ3JlZ2F0ZWQtdGFibGUuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBJdmFuUCBvbiAwNy4wOS4yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBUYWJsZURhdGEgZnJvbSBcIi4vdGFibGUtZGF0YVwiO1xyXG5pbXBvcnQgQWdncmVnYXRlZFRhYmxlIGZyb20gXCIuL2FnZ3JlZ2F0ZWQtdGFibGVcIjtcclxuaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcbmltcG9ydCBBZ2dyZWdhdGVkVGFibGVSb3dNZXRhIGZyb20gXCIuL2FnZ3JlZ2F0ZWQtdGFibGUtcm93LW1ldGFcIjtcclxuXHJcblxyXG53aW5kb3cuUmVwb3J0YWwgPSB3aW5kb3cuUmVwb3J0YWwgfHwge307XHJcblJlcG9ydGFsQmFzZS5taXhpbih3aW5kb3cuUmVwb3J0YWwse1xyXG4gIFRhYmxlRGF0YSxcclxuICBBZ2dyZWdhdGVkVGFibGUsXHJcbiAgQWdncmVnYXRlZFRhYmxlUm93TWV0YVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFnZ3JlZ2F0ZWRUYWJsZVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvbWFpbi5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDE1LjEyLjIwMTYuXHJcbiAqL1xyXG5pbXBvcnQgUmVwb3J0YWxCYXNlIGZyb20gXCJyLXJlcG9ydGFsLWJhc2VcIjtcclxuXHJcbi8qKlxyXG4gKiBBIGNsYXNzIHRoYXQgcHJvdmlkZXMgdXRpbGl0eSBzdGF0aWMgbWV0aG9kcyB0byBsb2FkIGNoaWxkcmVuIG9mIGEgbGV2ZWwgb2YgaGllcmVyYWNoeSBhbmQgYSB0YWJsZSBwZXIgYSBnaXZlbiBpZFxyXG4gKiAqL1xyXG5jbGFzcyBBc3luY0hpZXJhcmNoeVRhYmxle1xyXG4gIC8qKlxyXG4gICAqIFF1ZXJpZXMgaWYgZWFjaCByb3cgbWlnaHQgY29udGFpbiBjaGlsZCByb3dzIGJ5IHF1ZXJpbmcgaGllcmFyY2h5IGZvciBuZXh0IGxldmVsXHJcbiAgICogQHBhcmFtIHshU3RyaW5nfSBpZCAtIHJvd2hlYWRlciBpZCBmb3IgY3VycmVudCByb3dcclxuICAgKiBAcGFyYW0geyFOdW1iZXJ9IGhpZXJhcmNoeUlEIC0gaWQgb2YgSGllcmFyY2h5IGluIFRhYmxlIERlc2lnbmVyXHJcbiAgICogQHBhcmFtIHshU3RyaW5nfSBoaWVyYXJjaHlDb250cm9sSUQgLSBpZCBvZiB0aGUgUmVwb3J0YWwgSGllcmFyY2h5IENvbXBvbmVudCBpbnN0YW5jZSBvbiB0aGUgcGFnZVxyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gcGFnZVN0YXRlSUQgLSBSZXBvcnRhbCBzdGF0ZSBpZFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyPX0gbGFuZ3VhZ2VDb2RlPTkgLSBMYW5ndWFnZSBjb2RlIChhY2NvcmRpbmcgdG8gQ29uZmlybWl0IHRhYmxlIG9mIGxhbmd1YWdlIGNvZGVzKSBvZiB0aGUgbGFuZ3VhZ2UgdGhlIGhpZXJhcmNoeSBpcyBnb2luZyB0byBiZSBzdHJlYW1lZCBpbiBhdCB0aGUgcGFnZSBsb2FkXHJcbiAgICogQHJldHVybnMge0FycmF5fSBhcnJheSBvZiBjaGlsZCBub2RlcyBvZiB0aGUgYGlkYCBpbiBoaWVyYXJjaHlcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBmZXRjaENoaWxkSGllcmFyY2h5KGlkLGhpZXJhcmNoeUlELGhpZXJhcmNoeUNvbnRyb2xJRCxwYWdlU3RhdGVJRCxsYW5ndWFnZUNvZGU9OSl7XHJcbiAgICBsZXQgcGF0aCA9IFtcclxuICAgICAgbG9jYXRpb24ub3JpZ2luLFxyXG4gICAgICAncmVwb3J0YWwnLFxyXG4gICAgICAnSGllcmFyY2h5JyxcclxuICAgICAgUmVwb3J0YWxCYXNlLmdldFF1ZXJ5VmFyaWFibGUoJ1JlcG9ydElkJyksXHJcbiAgICAgIGhpZXJhcmNoeUlELFxyXG4gICAgICBsYW5ndWFnZUNvZGUsXHJcbiAgICAgICdHZXRDaGlsZE5vZGVzJ1xyXG4gICAgXTtcclxuXHJcbiAgICBsZXQgcXVlcnk9W1xyXG4gICAgICBgbm9kZUlkPSR7aWR9YCxcclxuICAgICAgYGluZm89JHtBc3luY0hpZXJhcmNoeVRhYmxlLmVuY29kZSh7XHJcbiAgICAgICAgSXNQcmV2aWV3OlJlcG9ydGFsQmFzZS5nZXRRdWVyeVZhcmlhYmxlKCdQcmV2aWV3Jyk9PT0ndHJ1ZScsXHJcbiAgICAgICAgSGllcmFyY2h5Q29udHJvbElkOmhpZXJhcmNoeUNvbnRyb2xJRFxyXG4gICAgICB9KX1gLFxyXG4gICAgICAnaXNSZXBCYXNlPWZhbHNlJyxcclxuICAgICAgJ3BhcmFtZXRlcj0nLFxyXG4gICAgICBgUGFnZVN0YXRlSWQ9JHtwYWdlU3RhdGVJRH1gXHJcbiAgICBdO1xyXG5cclxuICAgIGxldCBoaWVyYXJjaHlJdGVtQ2hpbGRyZW4gPSBSZXBvcnRhbEJhc2UucHJvbWlzZVJlcXVlc3QoW3BhdGguam9pbignLycpLCc/JyxxdWVyeS5qb2luKCcmJyldLmpvaW4oJycpKTtcclxuICAgIHJldHVybiBoaWVyYXJjaHlJdGVtQ2hpbGRyZW4udGhlbihyZXNwb25zZT0+e3JldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZSkpfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHJvdyBub2RlcyB0aGF0IGFyZSBjaGlsZCB0byB0aGUgcGFyZW50IHJvdyNgaWRgXHJcbiAgICogQHBhcmFtIHshU3RyaW5nfSBpZCAtIHJvd2hlYWRlciBpZCBmb3IgY3VycmVudCByb3dcclxuICAgKiBAcGFyYW0gez9TdHJpbmd9IHBhcmVudElEIC0gcm93aGVhZGVyIGlkIGZvciBwYXJlbnQgcm93XHJcbiAgICogQHBhcmFtIHshU3RyaW5nfSB0YWJsZUlEIC0gUmVwb3J0YWwgQWdncmVnYXRlZCBUYWJsZSBDb21wb25lbnQgaWRcclxuICAgKiBAcGFyYW0geyFTdHJpbmd9IHBhZ2VTdGF0ZUlEIC0gUmVwb3J0YWwgc3RhdGUgaWRcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXR1cm5zIGEgdGhlbmFibGUgcHJvbWlzZSB3aGljaCByZXN1bHQgaXMgYW4gYEhUTUxUYWJsZUVsZW1lbnRgIHdpdGggcm93cyB0aGF0IGFyZSBjaGlsZHJlbiB0byB0aGUgcm93I2BpZGBcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBmZXRjaENoaWxkVGFibGUoaWQsIHBhcmVudElELCB0YWJsZUlELHBhZ2VTdGF0ZUlEKXtcclxuICAgIHBhcmVudElEID0gcGFyZW50SUQhPW51bGw/cGFyZW50SUQ6aWQ7XHJcbiAgICBsZXQgcGF0aCA9IFtcclxuICAgICAgbG9jYXRpb24ub3JpZ2luLFxyXG4gICAgICAncmVwb3J0YWwnLFxyXG4gICAgICAnUmVwb3J0JyxcclxuICAgICAgUmVwb3J0YWxCYXNlLmdldFF1ZXJ5VmFyaWFibGUoJ1JlcG9ydElkJyksXHJcbiAgICAgICdDb21wb25lbnQnLFxyXG4gICAgICB0YWJsZUlEXHJcbiAgICBdO1xyXG4gICAgbGV0IHF1ZXJ5PVtcclxuICAgICAgYFBhZ2VJZD0ke1JlcG9ydGFsQmFzZS5nZXRRdWVyeVZhcmlhYmxlKCdQYWdlSWQnKX1gLFxyXG4gICAgICBgUHJldmlldz0ke1JlcG9ydGFsQmFzZS5nZXRRdWVyeVZhcmlhYmxlKCdQcmV2aWV3Jyl9YCxcclxuICAgICAgYFBhZ2VTdGF0ZUlkPSR7cGFnZVN0YXRlSUR9YCxcclxuICAgICAgYHBhZ2VGaWx0ZXJzPSR7QXN5bmNIaWVyYXJjaHlUYWJsZS5lbmNvZGUoe30pfWAsXHJcbiAgICAgIGBjdXN0b21GaWx0ZXJzPSR7QXN5bmNIaWVyYXJjaHlUYWJsZS5lbmNvZGUoe30pfWAsXHJcbiAgICAgIGBwZXJzTm9kZXM9JHtBc3luY0hpZXJhcmNoeVRhYmxlLmVuY29kZShbe05vZGVJZDppZCxUZXh0Om51bGx9XSl9YCwgLy8gY2hpbGQgbm9kZSBpZFxyXG4gICAgICBgb3JpZ05vZGVzPSR7QXN5bmNIaWVyYXJjaHlUYWJsZS5lbmNvZGUoW3tOb2RlSWQ6cGFyZW50SUQsVGV4dDpudWxsfV0pfWAgLy8gcGFyZW50IG5vZGUgaWRcclxuICAgIF07XHJcbiAgICBsZXQgdGFibGVSZXN1bHQgPSBSZXBvcnRhbEJhc2UucHJvbWlzZVJlcXVlc3QoW3BhdGguam9pbignLycpLCc/JyxxdWVyeS5qb2luKCcmJyldLmpvaW4oJycpKTtcclxuICAgIHJldHVybiB0YWJsZVJlc3VsdC50aGVuKHJlc3BvbnNlPT57XHJcbiAgICAgIGxldCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBob3N0LmlubmVySFRNTCA9IHJlc3BvbnNlO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhvc3QucXVlcnlTZWxlY3RvcigndGFibGUnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0cmlwcyByb3dzIGZyb20gdGhlIHRhYmxlIHJlY2VpdmVkXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSB0YWJsZSAtIEFnZ3JlZ2F0ZWQgdGFibGUgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGV4Y2x1ZGVkUm93cyAtIHJvd3MgZXhjbHVkZWQgZnJvbSBpbnNlcnRpb25cclxuICAgKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiByb3dzIHtIVE1MVGFibGVSb3dFbGVtZW50fVxyXG4gICAqICovXHJcbiAgc3RhdGljIHN0cmlwUm93c0Zyb21SZXNwb25zZVRhYmxlKHRhYmxlLGV4Y2x1ZGVkUm93cyl7XHJcbiAgICBsZXQgcm93cyA9IFtdLnNsaWNlLmNhbGwodGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHk+dHInKSk7XHJcbiAgICBpZihleGNsdWRlZFJvd3MgJiYgZXhjbHVkZWRSb3dzLmxlbmd0aD4wKXtcclxuICAgICAgZXhjbHVkZWRSb3dzLnJldmVyc2UoKS5mb3JFYWNoKGluZGV4PT57XHJcbiAgICAgICAgcm93cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByb3dzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRG9lcyBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgZW5jb2RlVVJJQ29tcG9uZW50YCBvZiBhbnl0aGluZyBwYXNzZWQgdG8gYmUgYWRkZWQgdG8gdGhlIHF1ZXJ5IHN0cmluZ1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxBcnJheX0gdG9FbmNvZGUgLSBwaWVjZSB0byBiZSBVUkxlbmNvZGVkXHJcbiAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhbiBlbmNvZGVkIHN0cmluZ1xyXG4gICAqICovXHJcbiAgc3RhdGljIGVuY29kZSh0b0VuY29kZSl7XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRvRW5jb2RlKSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXN5bmNIaWVyYXJjaHlUYWJsZTtcclxuXHJcblxyXG53aW5kb3cuUmVwb3J0YWwgPSB3aW5kb3cuUmVwb3J0YWwgfHwge307XHJcblJlcG9ydGFsQmFzZS5taXhpbih3aW5kb3cuUmVwb3J0YWwse1xyXG4gIEFzeW5jSGllcmFyY2h5VGFibGVcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1hc3luYy1oaWVyYXJjaHktdGFibGUvc3JjL21haW4uanMiLCJjbGFzcyBTb3J0T3JkZXIge1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBgc29ydE9yZGVyYCBhcnJheVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gY29uZmlndXJhdGlvbiBvcHRpb25zXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY29sdW1ucyAtIGFuIGFycmF5IG9mIGNvbHVtbnMgZnJvbSB7QGxpbmsgVGFibGVDb2x1bW5zfVxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc29ydENhbGxiYWNrIC0gZnVuY3Rpb24gdGhhdCBwZXJmb3JtcyBzb3J0aW5nIGJhc2VkIG9uIHRoZSBgc29ydE9yZGVyYFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnNvcnRDYWxsYmFja1Njb3BlIC0gc2NvcGUgaW4gd2hpY2ggc29ydCBjYWxsYmFjayBuZWVkcyB0byBiZSBleGVjdXRlZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5kZWZhdWx0U29ydGluZ10gLSBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgc3BlY2lmeSBkZWZhdWx0IHNvcnRpbmdcclxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kZWZhdWx0U29ydGluZy5jb2x1bW4gLSBjb2x1bW4gaW5kZXhcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5kZWZhdWx0U29ydGluZy5kaXJlY3Rpb24gLSBzb3J0IGRpcmVjdGlvbiAoYGFzY2B8YGRlc2NgKVxyXG4gICAqIEByZXR1cm4ge0FycmF5fVxyXG4gICAqICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucyl7XHJcbiAgICBsZXQge2NvbHVtbnMsIHNvcnRDYWxsYmFjaywgZGVmYXVsdFNvcnRpbmc9W10sIHNvcnRDYWxsYmFja1Njb3BlPXRoaXN9ID0gb3B0aW9ucztcclxuXHJcbiAgICB0aGlzLnNvcnRPcmRlciA9IFtdO1xyXG4gICAgaWYodHlwZW9mIGNvbHVtbnMgIT0gdW5kZWZpbmVkICYmIGNvbHVtbnMgIT0gbnVsbCl7XHJcbiAgICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTb3J0T3JkZXI6IGNvbHVtbnMgbXVzdCBiZSBzcGVjaWZpZWQnKTtcclxuICAgIH1cclxuICAgIHRoaXMuc29ydCA9ICgpPT57XHJcbiAgICAgIGlmKHNvcnRDYWxsYmFjayAmJiB0eXBlb2Ygc29ydENhbGxiYWNrID09PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICBzb3J0Q2FsbGJhY2suY2FsbChzb3J0Q2FsbGJhY2tTY29wZSx0aGlzKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWYoZGVmYXVsdFNvcnRpbmcubGVuZ3RoPjApe1xyXG4gICAgICBkZWZhdWx0U29ydGluZy5mb3JFYWNoKGl0ZW09PnRoaXMuYWRkKGl0ZW0pKTtcclxuICAgICAgdGhpcy5zb3J0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYSBgY2VsbGAgZnJvbSB0aGUgdGFibGUgYW5kIGEgcmVmZXJlbmNlIGNlbGwgKGByZWZDZWxsYCkgZnJvbSB0aGUgZmxvYXRpbmcgaGVhZGVyIGlmIGFueVxyXG4gICAqIEBwYXJhbSB7IU51bWJlcn0gY29sdW1uSW5kZXggLSBpbmRleCBvZiB0aGUgY29sdW1uIGZyb20gdGhlIGFycmF5IG9mIGNvbHVtbnMgZnJvbSB7QGxpbmsgVGFibGVDb2x1bW5zfVxyXG4gICAqIEByZXR1cm4ge3tjZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50LCByZWZDZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50fX1cclxuICAgKiAqL1xyXG4gIGdldENlbGwoY29sdW1uSW5kZXgpe1xyXG4gICAgaWYodHlwZW9mIGNvbHVtbkluZGV4ICE9ICd1bmRlZmluZWQnICYmIGNvbHVtbkluZGV4IT1udWxsKXtcclxuICAgICAgbGV0IGNlbGxzID0gW107XHJcbiAgICAgIGlmKHRoaXMuY29sdW1uc1tjb2x1bW5JbmRleF0uY2VsbCl7Y2VsbHMucHVzaCh0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLmNlbGwpfVxyXG4gICAgICBpZih0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLnJlZkNlbGwpe2NlbGxzLnB1c2godGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XS5yZWZDZWxsKX1cclxuICAgICAgcmV0dXJuIGNlbGxzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29sdW1uSW5kZXggcGFyYW1ldGVyIHNob3VsZCBub3QgYmUgbnVsbCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhbm90aGVyIGNvbHVtbiB0byBiZSBzb3J0ZWRcclxuICAgKiBAcGFyYW0geyFPYmplY3R9IG9iaiAtIG9iamVjdCBkZXNjcmliaW5nIHNvcnRpbmdcclxuICAgKiBAcGFyYW0ge051bWJlcn0gb2JqLmNvbHVtbiAtIGNvbHVtbiBpbmRleFxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvYmouZGlyZWN0aW9uIC0gc29ydCBkaXJlY3Rpb24gKGBhc2NgfGBkZXNjYClcclxuICAgKiAqL1xyXG5cclxuICBhZGQgKG9iail7XHJcbiAgICB0aGlzLmdldENlbGwob2JqLmNvbHVtbikuZm9yRWFjaChjZWxsPT57XHJcbiAgICAgIC8vaWYoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3J0ZWQnKSl7IC8vIHRoaXMgY29sdW1uIGlzIG5vdCBzb3J0ZWQsIHRoZXJlIG1pZ2h0IGJlIG90aGVycyB0aGF0IGFyZS5cclxuICAgICAgICBbJ3NvcnRlZCcsb2JqLmRpcmVjdGlvbl0uZm9yRWFjaChjbGFzc05hbWU9PmNlbGwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKTtcclxuICAgICAgLy99IGVsc2UgeyAvL3N3YXBzIHNvcnRpbmcgZnJvbSBhc2MgdG8gZGVzY1xyXG4gICAgICAvLyAgWydhc2MnLCdkZXNjJ10uZm9yRWFjaChjbGFzc05hbWU9PmNlbGwuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpKTtcclxuICAgICAgLy99XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc29ydE9yZGVyLnB1c2gob2JqKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSBjb2x1bW4gZnJvbSBgc29ydE9yZGVyYFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb2x1bW4gLSBjb2x1bW4gaW5kZXggYXMgcmVmZXJlbmNlIHRvIHRoZSBpdGVtIHRvIGJlIHJlbW92ZWQuXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgaXRlbSBpbiBgc29ydE9yZGVyYCBhcnJheSB0byBiZSByZW1vdmVkXHJcbiAgICogKi9cclxuICByZW1vdmUgKGNvbHVtbixpbmRleCl7XHJcbiAgICBbJ3NvcnRlZCcsJ2FzYycsJ2Rlc2MnXS5mb3JFYWNoKGNsYXNzTmFtZT0+e1xyXG4gICAgICB0aGlzLmdldENlbGwoY29sdW1uKS5mb3JFYWNoKGNlbGw9PmNlbGwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpKVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNvcnRPcmRlci5zcGxpY2UoaW5kZXgsMSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVwbGFjZXMgYWxsIGl0ZW1zIGluIGBzb3J0T3JkZXJgXHJcbiAgICogQHBhcmFtIHshT2JqZWN0fSBvYmogLSBvYmplY3QgZGVzY3JpYmluZyBzb3J0aW5nXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9iai5jb2x1bW4gLSBjb2x1bW4gaW5kZXhcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gb2JqLmRpcmVjdGlvbiAtIHNvcnQgZGlyZWN0aW9uIChgYXNjYHxgZGVzY2ApXHJcbiAgICogKi9cclxuICByZXBsYWNlIChvYmope1xyXG4gICAgaWYodGhpcy5zb3J0T3JkZXIubGVuZ3RoPjApe1xyXG4gICAgICB0aGlzLnNvcnRPcmRlci5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKGl0ZW0uY29sdW1uLGluZGV4KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFkZChvYmopO1xyXG4gICAgdGhpcy5zb3J0KCk7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBTb3J0T3JkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1zb3J0LXRhYmxlL3NyYy9zb3J0LW9yZGVyLmpzIiwiaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcbmltcG9ydCBUYWJsZUNvbHVtbnMgZnJvbSBcIi4vdGFibGUtY29sdW1uc1wiO1xyXG5pbXBvcnQgU29ydE9yZGVyIGZyb20gXCIuL3NvcnQtb3JkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBFdmVudCByZXBvcnRpbmcgdGhhdCBhIHRhYmxlIGhhcyBiZWVuIHNvcnRlZFxyXG4gKiBAZXZlbnQgU29ydFRhYmxlfnJlcG9ydGFsLXRhYmxlLXNvcnRcclxuICovXHJcblxyXG4vKipcclxuICogTWFrZXMgYSB0YWJsZSBzb3J0YWJsZSwgZ2l2ZXMgQVBJIGZvciBzb3J0aW5nLiBJdCBzb3J0cyBgZGF0YWAgYXJyYXksIGJ1dCBkb2Vzbid0IG1vdmUgcm93cyBpbiB0aGUgYHNvdXJjZWAgdGFibGUsIGJlY2F1c2Ugb2YgZGlmZmVyZW5jZXMgaW4gaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqID4gTm90ZTogSXQncyBpbXBvcnRhbnQgdGhhdCBldmVyeSBBcnJheSBpdGVtIHRoYXQgaXMgZ29pbmcgdG8gYmUgc29ydGFibGUgd2FzIGVpdGhlciBhIGBTdHJpbmdgLCBhIGBOdW1iZXJgLCBhIGBudWxsYCwgb3IgYW4gYE9iamVjdGAgdGhhdCBjb250YWluZWQgYGRhdGFgIHByb3BlcnR5ICh3aGljaCB3YXMgb2YgdGhlIHByZXZpb3VzbHkgbmFtZWQgdHlwZXMpXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBwYXNzZWQgdG8gY29uZmlndXJlIHRoZSBTb3J0aW5nXHJcbiAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgc29ydGluZyB3aWxsIGJlIGFwcGxpZWQgdG9cclxuICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBbb3B0aW9ucy5yZWZTb3VyY2VdIC0gdGhlIGZsb2F0aW5nIGhlYWRlciBpZiBhbnksIHdpbGwgcmVmbGVjdCBhbmQgdHJpZ2dlciBzb3J0aW5nIG9uIGhlYWRlciB3aGVuIHNjcm9sbGVkLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVmYXVsdEhlYWRlclJvdz0tMV0gLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGhhdmUgc29ydGluZyBlbmFibGVkIGZvciBjb2x1bW5zLiBJZiBgLTFgIHRoZW4gbGFzdCByb3cuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmluY2x1ZGVkXSAtIEFycmF5IG9mIGNvbHVtbiBpbmRpY2VzIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBoYXZlIHNvcnRpbmcgZW5hYmxlZC4gSWYgbm90IHNwZWNpZmllZCwgYWxsIGNvbHVtbnMgd2lsbCBiZSBzb3J0YWJsZS4gT3B0aW9uYWxseSBgZXhjbHVkZWRgIGNhbiBiZSBzcGVjaWZpZWQgaW5zdGVhZCBhcyBhIHNob3J0aGFuZCB0byBwYXNzIG9ubHkgaW5kaWNlcyBvZiBjb2x1bW5zIHRvIGJlIGV4Y2x1ZGVkIGZyb20gc29ydGluZywgYXNzdW1uaW5nIHRoYXQgb3RoZXJzIHdpbGwgYmUgbWFkZSBzb3J0YWJsZS4gSXQncyBpbXBvcnRhbnQgdG8gY291bnQgdGhlIGNvbHVtbiBpbmRleCBpbiB0aGUgZGVmYXVsdEhlYWRlclJvd1xyXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5leGNsdWRlZF0gLSBBcnJheSBvZiBjb2x1bW4gaW5kaWNlcyAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgYmUgZXhjbHVkZWQgZnJvbSBzb3J0aW5nLiBDYW4gYmUgdXNlZCBhcyBhIHNob3J0aGFuZCBpbnN0ZWFkIG9mIGBpbmNsdWRlZGAuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5kZWZhdWx0U29ydGluZ10gLSBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgc3BlY2lmeSBkZWZhdWx0IHNvcnRpbmdcclxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGVmYXVsdFNvcnRpbmcuY29sdW1uIC0gY29sdW1uIGluZGV4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmRlZmF1bHRTb3J0aW5nLmRpcmVjdGlvbiAtIHNvcnQgZGlyZWN0aW9uIChgYXNjYHxgZGVzY2ApXHJcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuZGF0YSAtIGRhdGEgd2l0aCBpbmZvcm1hdGlvbiBmb3Igcm93cyB0byBiZSBzb3J0ZWRcclxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tdWx0aWRpbWVuc2lvbmFsPWZhbHNlXSAtIGlmIGBkYXRhYCBpcyBzaW5nbGUtZGltZW5zaW9uYWwgKGNvbnRhaW5zIHJvd3Mgd2l0aCBkYXRhIHRvIGJlIHNvcnRlZCBhcyBpbW1lZGlhdGUgYXJyYXkgaXRlbXM6IGBkYXRhIFtyb3dJdGVtLi4uXWApLCB0aGVuIGl0IGlzIGBmYWxzZWAuIElmIGl0IGhhcyBibG9ja3Mgb2YgZGF0YSBhcyBpdGVtcyAoZWFjaCBibG9jayBjb250YWluaW5nIGFuIGFycmF5IG9mIHJvd3MgdG8gYmUgc29ydGVkOiBkYXRhIFtibG9jayBbcm93SXRlbS4uLl0uLi5dKSwgdGhlbiBzZXQgaXQgdG8gYHRydWVgLiBDdXJyZW50bHkgaXQgc3VwcG9ydHMgb25seSBhIHR3by1sZXZlbCBhZ2dyZWdhdGlvbiBtYXggKGRhdGEtPmJsb2NrLT5yb3dJdGVtKS5cclxuICogQHByb3Age0hUTUxUYWJsZUVsZW1lbnR9IHNvdXJjZSAtIHNvdXJjZSB0YWJsZVxyXG4gKiBAcHJvcCB7QXJyYXl9IGRhdGEgLSBkYXRhIGFycmF5IHRvIGJlIHNvcnRlZFxyXG4gKiBAcHJvcCB7Qm9vbGVhbn0gbXVsdGlkaW1lbnNpb25hbCAtIGlmIGBkYXRhYCBpcyBtb25vLWRpbWVuc2lvbmFsIChjb250YWlucyByb3dzIHdpdGggZGF0YSB0byBiZSBzb3J0ZWQgYXMgaW1tZWRpYXRlIGFycmF5IGl0ZW1zOiBgZGF0YSBbcm93SXRlbS4uLl1gKSwgdGhlbiBpdCBpcyBgZmFsc2VgLiBJZiBpdCBoYXMgYmxvY2tzIG9mIGRhdGEgYXMgaXRlbXMgKGVhY2ggYmxvY2sgY29udGFpbmluZyBhbiBhcnJheSBvZiByb3dzIHRvIGJlIHNvcnRlZDogZGF0YSBbYmxvY2sgW3Jvd0l0ZW0uLi5dLi4uXSksIHRoZW4gc2V0IGl0IHRvIGB0cnVlYC4gQ3VycmVudGx5IGl0IHN1cHBvcnRzIG9ubHkgYSB0d28tbGV2ZWwgYWdncmVnYXRpb24gbWF4IChkYXRhLT5ibG9jay0+cm93SXRlbSkuXHJcbiAqIEBwcm9wIHtTb3J0T3JkZXJ9IHNvcnRPcmRlciAtIGluc3RhbmNlIG9mIHtAbGluayBTb3J0T3JkZXJ9XHJcbiAqIEBwcm9wIHtUYWJsZUNvbHVtbnN9IGNvbHVtbnMgLSBpbnN0YW5jZSBvZiB7QGxpbmsgVGFibGVDb2x1bW5zfSB3aXRoIGEgbW9kaWZpZWQgcHJvdG90eXBlIChhZGRlZCBgc29ydGFibGU6dHJ1ZWAgYW5kIGAuc29ydGFibGVgIHRvIHNvcnRhYmxlIGNvbHVtbnMpXHJcbiAqIEBjbGFzcyBTb3J0VGFibGVcclxuICogKi9cclxuY2xhc3MgU29ydFRhYmxlIHtcclxuICAvKipcclxuICAgKlxyXG4gICAqXHJcbiAgICogICovXHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xyXG4gICAgbGV0IHtzb3VyY2UscmVmU291cmNlLGRlZmF1bHRIZWFkZXJSb3c9LTEsaW5jbHVkZWQsZXhjbHVkZWQsZGVmYXVsdFNvcnRpbmc9W10sZGF0YT1bXSxtdWx0aWRpbWVuc2lvbmFsPWZhbHNlfT1vcHRpb25zO1xyXG4gICAgdGhpcy5fc29ydEV2ZW50ID0gUmVwb3J0YWxCYXNlLm5ld0V2ZW50KCdyZXBvcnRhbC10YWJsZS1zb3J0Jyk7XHJcblxyXG4gICAgICBpZihzb3VyY2Upe1xyXG4gICAgICAgIHRoaXMuc291cmNlPXNvdXJjZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bzb3VyY2VgIHRhYmxlIGlzIG5vdCBzcGVjaWZpZWQgZm9yIFNvcnRUYWJsZScpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgIHRoaXMubXVsdGlkaW1lbnNpb25hbCA9IG11bHRpZGltZW5zaW9uYWw7XHJcblxyXG4gICAgICAvL2xldCB0YWJsZUNvbHVtbnM9IG5ldyBUYWJsZUNvbHVtbnMoe3NvdXJjZSwgcmVmU291cmNlLCBkZWZhdWx0SGVhZGVyUm93fSk7XHJcbiAgICAgIGxldCBzb3J0YWJsZUNvbHVtbnM9U29ydFRhYmxlLmRlZmluZVNvcnRhYmxlQ29sdW1ucyhuZXcgVGFibGVDb2x1bW5zKHtzb3VyY2UsIHJlZlNvdXJjZSwgZGVmYXVsdEhlYWRlclJvd30pLCBpbmNsdWRlZCwgZXhjbHVkZWQpO1xyXG4gICAgICB0aGlzLmNvbHVtbnMgPSBzb3J0YWJsZUNvbHVtbnM7XHJcbiAgICAgIC8vIHNldHVwIHNvcnQgb3JkZXIgYW5kIGRvIGluaXRpYWwgZGVmYXVsdCBzb3J0aW5nXHJcbiAgICAgIHRoaXMuc29ydE9yZGVyID0ge3NvcnRPcmRlcjpbXX0gPSBuZXcgU29ydE9yZGVyKHtjb2x1bW5zOnNvcnRhYmxlQ29sdW1ucywgc29ydENhbGxiYWNrOnRoaXMuc29ydCwgc29ydENhbGxiYWNrU2NvcGU6dGhpcywgZGVmYXVsdFNvcnRpbmd9KTtcclxuICAgICAgW3NvdXJjZSxyZWZTb3VyY2VdLmZvckVhY2goc3JjPT57aWYoc3JjKXtTb3J0VGFibGUubGlzdGVuRm9yU29ydChUYWJsZUNvbHVtbnMuZ2V0SGVhZGVyKHNyYyksc29ydGFibGVDb2x1bW5zLCB0aGlzLnNvcnRPcmRlcil9fSk7Ly8gc2V0IHVwIGxpc3RlbmVycyBmb3IgaGVhZGVyc1xyXG5cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgdGhlIHRhYmxlIGNvbHVtbnMgYXJyYXkgYWdhaW5zdCB0aGUgYGluY2x1ZGVkYC9gZXhjbHVkZWRgIGNvbHVtbnMgYXJyYXlzIGFuZCBhZGRzIGEgYHNvcnRhYmxlOnRydWVgIHByb3BlcnR5IGFuZCBhIGAuc29ydGFibGVgIGNsYXNzIHRvIHRoZSBzb3J0YWJsZSBvbmVzXHJcbiAgICogQHBhcmFtIHtUYWJsZUNvbHVtbnN9IGNvbHVtbnMgLSBhbiBpbnN0YW5jZSBvZiB7QGxpbmsgVGFibGVDb2x1bW5zfVxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IFtpbmNsdWRlZF0gLSBhcnJheSBvZiBpbmNsdWRlZCBjb2x1bW5zIGluZGljZXNcclxuICAgKiBAcGFyYW0ge0FycmF5fSBbZXhjbHVkZWRdIC0gYXJyYXkgb2YgZXhjbHVkZWQgY29sdW1ucyBpbmRpY2VzXHJcbiAgICogKi9cclxuICBzdGF0aWMgZGVmaW5lU29ydGFibGVDb2x1bW5zKGNvbHVtbnMsIGluY2x1ZGVkLCBleGNsdWRlZCl7XHJcbiAgICBsZXQgc29ydGFibGVDb2x1bW5zID0gW10uc2xpY2UuY2FsbChjb2x1bW5zKTtcclxuICAgIHNvcnRhYmxlQ29sdW1ucy5mb3JFYWNoKChjb2x1bW4saW5kZXgpPT57XHJcbiAgICAgIGxldCBzb3J0YWJsZT0oKCFpbmNsdWRlZCAmJiAhZXhjbHVkZWQpIHx8IChpbmNsdWRlZCAmJiBpbmNsdWRlZC5pbmRleE9mKGluZGV4KSE9LTEpIHx8IChleGNsdWRlZCAmJiBleGNsdWRlZC5pbmRleE9mKGluZGV4KT09LTEpKTtcclxuICAgICAgaWYoc29ydGFibGUpe1xyXG4gICAgICAgIGNvbHVtbi5jZWxsLmNsYXNzTGlzdC5hZGQoJ3NvcnRhYmxlJyk7XHJcbiAgICAgICAgaWYoY29sdW1uLnJlZkNlbGwpe2NvbHVtbi5yZWZDZWxsLmNsYXNzTGlzdC5hZGQoJ3NvcnRhYmxlJyk7fVxyXG4gICAgICAgIGNvbHVtbi5zb3J0YWJsZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNvcnRhYmxlQ29sdW1uc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0cyB1cCBsaXN0ZW5lcnMgZm9yIGNvbHVtbiBoZWFkZXJzIGF2YWlsYWJsZSBmb3IgY2xpY2tcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkZWxlZ2F0ZWRUYXJnZXQgLSBlbGVtZW50IHRoYXQgd2lsbCByZWNlaXZlIGNsaWNrcyBhbmQgc2VlIGlmIHRoZXkgYXJlIHZhbGlkLCBgdGhlYWRgIGlzIHJlY29tbWVuZGVkIHRvIGJvaWwgZG93biB0byBoZWFkZXIgY2xpY2tzIG9ubHlcclxuICAgKiBAcGFyYW0ge1RhYmxlQ29sdW1uc30gY29sdW1ucyAtIGFycmF5IG9mIHRhYmxlIGNvbHVtbnMgZnJvbSB7QGxpbmsgU29ydFRhYmxlI2RlZmluZVNvcnRhYmxlQ29sdW1uc31cclxuICAgKiBAcGFyYW0ge1NvcnRPcmRlcn0gc29ydE9yZGVyIC0gaW5zdGFuY2Ugb2Yge0BsaW5rIFNvcnRPcmRlcn1cclxuICAgKiBAbGlzdGVucyBjbGlja1xyXG4gICAqICovXHJcbiAgc3RhdGljIGxpc3RlbkZvclNvcnQoZGVsZWdhdGVkVGFyZ2V0LCBjb2x1bW5zLCBzb3J0T3JkZXIpe1xyXG4gICAgZGVsZWdhdGVkVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlPT57XHJcbiAgICAgIC8vIGlmIGl0J3MgYSB0YWJsZSBjZWxsLCBpcyBpbiBjb2x1bW5zIGFycmF5IGFuZCBpcyBzb3J0YWJsZVxyXG4gICAgICBsZXQgY2xpY2tlZENvbHVtbjtcclxuICAgICAgZm9yKGxldCBpPTA7aTxjb2x1bW5zLmxlbmd0aDtpKyspe1xyXG4gICAgICAgIGlmKGUudGFyZ2V0PT1jb2x1bW5zW2ldLmNlbGwgfHwgZS50YXJnZXQ9PWNvbHVtbnNbaV0ucmVmQ2VsbCl7XHJcbiAgICAgICAgICBjbGlja2VkQ29sdW1uPSBjb2x1bW5zW2ldOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYoKGUudGFyZ2V0LnRhZ05hbWUgPT0gJ1REJyB8fCBlLnRhcmdldC50YWdOYW1lID09ICdUSCcpICYmIGNsaWNrZWRDb2x1bW4uc29ydGFibGUpe1xyXG4gICAgICAgIHNvcnRPcmRlci5yZXBsYWNlKHtjb2x1bW46Y29sdW1ucy5pbmRleE9mKGNsaWNrZWRDb2x1bW4pLCBkaXJlY3Rpb246IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXNjJyk/J2Rlc2MnOidhc2MnfSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybXMgY2hhbm5lbGluZyBvZiBzb3J0aW5nIGJhc2VkIG9uIHdoZXRoZXIgYHRoaXMuZGF0YWAgaXMgYG11bHRpZGltZW5zaW9uYWxgXHJcbiAgICogQHBhcmFtIHtTb3J0T3JkZXJ9IHNvcnRPcmRlciAtIGluc3RhbmNlIG9mIHtAbGluayBTb3J0T3JkZXJ9IHBhc3NlZCBieSB0aGUge0BsaW5rIFNvcnRPcmRlciNzb3J0fSBvbiBpbml0aWFsIHNvcnRcclxuICAgKiBAZmlyZXMgU29ydFRhYmxlfnJlcG9ydGFsLXRhYmxlLXNvcnRcclxuICAgKiAqL1xyXG4gIHNvcnQoc29ydE9yZGVyKXtcclxuICAgIGxldCBzbyA9IHNvcnRPcmRlci5zb3J0T3JkZXIgfHwgdGhpcy5zb3J0T3JkZXIuc29ydE9yZGVyLFxyXG4gICAgICBjb2x1bW5zID0gdGhpcy5jb2x1bW5zO1xyXG4gICAgaWYoc28gJiYgc28ubGVuZ3RoPjApe1xyXG4gICAgICBpZighdGhpcy5tdWx0aWRpbWVuc2lvbmFsKXtcclxuICAgICAgICBTb3J0VGFibGUuc29ydERpbWVuc2lvbih0aGlzLmRhdGEsIGNvbHVtbnMsIHNvKTtcclxuICAgICAgfSBlbHNlIHsgLy8gaWYgYXJyYXkgaGFzIG5lc3RlZCBhcnJheSBibG9ja3NcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaChkaW1lbnNpb249PntcclxuICAgICAgICAgIFNvcnRUYWJsZS5zb3J0RGltZW5zaW9uKGRpbWVuc2lvbiwgdGhpcy5jb2x1bW5zLCBzbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgY29sdW1uc1tzb1swXS5jb2x1bW5dLmNlbGwuZGlzcGF0Y2hFdmVudCh0aGlzLl9zb3J0RXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBTcGxpdHMgc29ydGluZyBpbnRvIG9uZS1jb2x1bW4gb3IgdHdvLWNvbHVtbi4gVGhlIHByZWNlZGVuY2Ugb2YgY29sdW1ucyBpbiBgc29ydE9yZGVyYCBpcyB0aGUgZmFjdG9yIGRlZmluaW5nIHNvcnQgcHJpb3JpdHlcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gYXJyYXkgY29udGFpbmluZyByb3cgaXRlbXMgdG8gYmUgc29ydGVkXHJcbiAgICogQHBhcmFtIHtUYWJsZUNvbHVtbnN9IGNvbHVtbnMgLSBhcnJheSBvZiB0YWJsZSBjb2x1bW5zIGZyb20ge0BsaW5rIFNvcnRUYWJsZSNkZWZpbmVTb3J0YWJsZUNvbHVtbnN9XHJcbiAgICogQHBhcmFtIHtTb3J0T3JkZXJ9IHNvcnRPcmRlciAtIGluc3RhbmNlIG9mIHtAbGluayBTb3J0T3JkZXJ9XHJcbiAgICogKi9cclxuICBzdGF0aWMgc29ydERpbWVuc2lvbihkYXRhLGNvbHVtbnMsc29ydE9yZGVyKXtcclxuICAgIGxldCBnZXRJbmRleCA9IChpKT0+e3JldHVybiBjb2x1bW5zW3NvcnRPcmRlcltpXS5jb2x1bW5dLmluZGV4fTtcclxuICAgIGxldCBnZXREaXJlY3Rpb249KGkpPT57cmV0dXJuIHNvcnRPcmRlcltpXS5kaXJlY3Rpb24gPT09ICdkZXNjJyA/IC0xIDogMX07XHJcbiAgICAvLyBUT0RPOiBhZGQgcG9zc2liaWxpdHkgdG8gc29ydCB0aGUgZGF0YSB0aGF0IHdhcyBzdHJpcHBlZCBieSBjb2x1bW4uXHJcbiAgICBkYXRhLnNvcnQoKGEsIGIpPT57IC8vIHNvcnQgcm93c1xyXG4gICAgICBpZihzb3J0T3JkZXIubGVuZ3RoPT0xKXsgLy9zb3J0IG9uZSBjb2x1bW4gb25seVxyXG4gICAgICAgIHJldHVybiBTb3J0VGFibGUuc29ydGVyKCBhW2dldEluZGV4KDApXSwgYltnZXRJbmRleCgwKV0sIGdldERpcmVjdGlvbigwKSApXHJcbiAgICAgIH0gZWxzZSB7IC8vc29ydCBhZ2FpbnN0IHR3byBjb2x1bW5zXHJcbiAgICAgICAgcmV0dXJuIFNvcnRUYWJsZS5zb3J0ZXIoIGFbZ2V0SW5kZXgoMCldLCBiW2dldEluZGV4KDApXSwgZ2V0RGlyZWN0aW9uKDApICkgfHwgU29ydFRhYmxlLnNvcnRlciggYVtnZXRJbmRleCgxKV0sIGJbZ2V0SW5kZXgoMSldLCBnZXREaXJlY3Rpb24oMSkgKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHRoYXQgcGVyZm9ybXMgY2FzZSBpbnNlbnNpdGl2ZSBzb3J0aW5nIGluIHRoZSBhcnJheS4gSXQgY2FuIGRpc3Rpbmd1aXNoIGJldHdlZW4gbnVtYmVycywgbnVtYmVycyBhcyBzdHJpbmdzLCBIVE1MIGFuZCBwbGFpbiBzdHJpbmdzXHJcbiAgICogKi9cclxuICBzdGF0aWMgc29ydGVyKGEsYixsZXNzZXIpe1xyXG4gICAgbGV0IHJlZ2V4ID0gL1s8Pl0vZztcclxuICAgIGlmKHJlZ2V4LnRlc3QoYSkgfHwgcmVnZXgudGVzdChiKSl7IC8vIGlmIHdlIG5lZWQgdG8gc29ydCBlbGVtZW50cyB0aGF0IGhhdmUgSFRNTCBsaWtlIGxpbmtzXHJcbiAgICAgIGxldCB0ZW1wRWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyB0ZW1wRWwxLmlubmVySFRNTCA9IGE7XHJcbiAgICAgIGE9dGVtcEVsMS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgIGxldCB0ZW1wRWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyB0ZW1wRWwyLmlubmVySFRNTCA9IGI7XHJcbiAgICAgIGI9dGVtcEVsMi50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICB9XHJcbiAgICBpZih0eXBlb2YgYT09J29iamVjdCcgJiYgdHlwZW9mIGEuZGF0YSAhPSB1bmRlZmluZWQpe2E9YS5kYXRhfVxyXG4gICAgaWYodHlwZW9mIGI9PSdvYmplY3QnICYmIHR5cGVvZiBiLmRhdGEgIT0gdW5kZWZpbmVkKXtiPWIuZGF0YX1cclxuICAgIGlmKCFpc05hTihhKSAmJiAhaXNOYU4oYikpeyAvL3RoZXkgbWlnaHQgYmUgbnVtYmVycyBvciBudWxsXHJcbiAgICAgIGlmKGE9PT1udWxsKXtyZXR1cm4gMX0gZWxzZSBpZiAoYj09PW51bGwpe3JldHVybiAtMX1cclxuICAgICAgcmV0dXJuIGEgPCAgYiA/IGxlc3NlciA6ICBhID4gIGIgPyAtbGVzc2VyIDogMDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoIWlzTmFOKHBhcnNlRmxvYXQoYSkpICYmICFpc05hTihwYXJzZUZsb2F0KGIpKSl7IC8vIHRoZXkgbWlnaHQgYmUgbnVtYmVyIHN0cmluZ3NcclxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoYSkgPCAgcGFyc2VGbG9hdChiKSA/IGxlc3NlciA6ICBwYXJzZUZsb2F0KGEpID4gIHBhcnNlRmxvYXQoYikgPyAtbGVzc2VyIDogMDtcclxuICAgIH0gZWxzZSB7IC8vdGhleSBtaWdodCBiZSBzaW1wbGUgc3RyaW5nc1xyXG4gICAgICByZXR1cm4gYS50b0xvd2VyQ2FzZSgpIDwgYi50b0xvd2VyQ2FzZSgpID8gbGVzc2VyIDogYS50b0xvd2VyQ2FzZSgpID4gYi50b0xvd2VyQ2FzZSgpID8gLWxlc3NlciA6IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU29ydFRhYmxlXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1zb3J0LXRhYmxlL3NyYy9zb3J0LXRhYmxlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMDkuMDkuMjAxNi5cclxuICovXHJcblxyXG5jbGFzcyBUYWJsZUNvbHVtbnN7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvYmplY3RzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNlbGxzIG9mIGBkZWZhdWx0SGVhZGVyUm93YCwgdGhhdCBjb250YWluIGBzb3J0YWJsZWAgcHJvcGVydHksIGRlbm90aW5nIHRoZSBjb2x1bW4gaXMgc29ydGFibGUsXHJcbiAgICogYGluZGV4YCBvZiB0aGUgY29sdW1uIGFuZCByZWZlcmVuY2UgdG8gdGhlIGBjZWxsYC4gQWRkcyBgLnNvcnRhYmxlYCB0byBhIHNvcnRhYmxlIGNlbGxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgcGFzc2VkIHRvIGNvbmZpZ3VyZSB0aGUgU29ydGluZ1xyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgc29ydGluZyB3aWxsIGJlIGFwcGxpZWQgdG9cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IG9wdGlvbnMucmVmU291cmNlIC0gZmxvYXRpbmcgaGVhZGVyIGlmIGFueVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gW29wdGlvbnMuZGVmYXVsdEhlYWRlclJvdz0tMV0gLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGhhdmUgc29ydGluZyBlbmFibGVkIGZvciBjb2x1bW5zLiBJZiBgLTFgIHRoZW4gbGFzdCByb3cuXHJcbiAgICogQHJldHVybiB7e2luZGV4Ok51bWJlciwgdGl0bGU6U3RyaW5nLCBjb2xTcGFuOk51bWJlciwgY2VsbDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQsID9yZWZDZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50fX0gLSBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgaGF2ZSB0aGlzIHN0cnVjdHVyZVxyXG4gICAqICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucyl7XHJcbiAgICBsZXQge3NvdXJjZSxyZWZTb3VyY2UsZGVmYXVsdEhlYWRlclJvdz0tMX0gPSBvcHRpb25zO1xyXG4gICAgbGV0IHRoZWFkLHJlZlRoZWFkO1xyXG4gICAgaWYoc291cmNlKXt0aGVhZD1UYWJsZUNvbHVtbnMuZ2V0SGVhZGVyKHNvdXJjZSl9IGVsc2Uge3Rocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIHRhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIGNhbm5vdCBjcmVhdGUgVGFibGVDb2x1bW5zJyl9XHJcbiAgICBpZihyZWZTb3VyY2Upe3JlZlRoZWFkPVRhYmxlQ29sdW1ucy5nZXRIZWFkZXIocmVmU291cmNlKX1cclxuICAgIHJldHVybiBUYWJsZUNvbHVtbnMuY29tcHV0ZUNvbHVtbnModGhlYWQscmVmVGhlYWQsZGVmYXVsdEhlYWRlclJvdyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGEgaGVhZGVyXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGUgaGVhZGVycyBhcmUgY3JlYXRlZCBmb3JcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBnZXRIZWFkZXIoc291cmNlKXtcclxuICAgIGlmKHNvdXJjZSAmJiBzb3VyY2UudGFnTmFtZSA9PSAnVEFCTEUnKXtcclxuICAgICAgbGV0IGhlYWRlciA9IHNvdXJjZS5xdWVyeVNlbGVjdG9yKFwidGhlYWRcIik7XHJcbiAgICAgIGlmKGhlYWRlciAmJiBoZWFkZXIuY2hpbGRyZW4ubGVuZ3RoPjApIHtcclxuICAgICAgICByZXR1cm4gaGVhZGVyO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIHRhYmxlIGhhcyBubyBoZWFkZXIgb3Igcm93cycpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgc291cmNlYCBpcyBub3Qgc3BlY2lmaWVkIG9yIGlzIG5vdCBhIHRhYmxlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGVzIGRlZmF1bHRIZWFkZXJSb3cgZm9yIGEgcGFzc2VkIGB0aGVhZGBcclxuICAgKiBAcGFyYW0geyFIVE1MVGFibGVFbGVtZW50fSB0aGVhZCAtIHNvdXJjZSB0YWJsZSBoZWFkZXJcclxuICAgKiBAcGFyYW0geyFOdW1iZXJ9IGRlZmF1bHRIZWFkZXJSb3dJbmRleCAtIGluZGV4IG9mIHRoZSByb3cgaW4gYHRoZWFkYCAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgYmUgY29uc2lkZXJlZCBkZWZhdWx0IHRvIGhhdmUgYWN0aW9ucyBleGVjdXRlZCB1cG9uLlxyXG4gICAqIEByZXR1cm4ge3tpbmRleDpOdW1iZXIsIHJvdzogSFRNTFRhYmxlUm93RWxlbWVudH19XHJcbiAgICogKi9cclxuICBzdGF0aWMgZ2V0RGVmYXVsdEhlYWRlclJvdyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpe1xyXG4gICAgLy8gY2FsY3VsYXRlIGRlZmF1bHQgaGVhZGVyIHJvd1xyXG4gICAgbGV0IGhlYWRlclJvd3MgPSB0aGVhZC5jaGlsZHJlbixcclxuICAgICAgaGVhZGVyUm93SW5kZXggPSBkZWZhdWx0SGVhZGVyUm93SW5kZXg9PS0xID8gaGVhZGVyUm93cy5sZW5ndGggKyBkZWZhdWx0SGVhZGVyUm93SW5kZXggOiBkZWZhdWx0SGVhZGVyUm93SW5kZXg7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbmRleDpoZWFkZXJSb3dJbmRleCxcclxuICAgICAgcm93OmhlYWRlclJvd3MuaXRlbShoZWFkZXJSb3dJbmRleClcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGhlYWRlciBjZWxsIG5vZGVzIGZyb20gZGVmYXVsdCBoZWFkZXIgcm93XHJcbiAgICogQHBhcmFtIHs/SFRNTFRhYmxlRWxlbWVudH0gdGhlYWQgLSBzb3VyY2UgdGFibGUgaGVhZGVyXHJcbiAgICogQHBhcmFtIHshTnVtYmVyfSBkZWZhdWx0SGVhZGVyUm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGJlIGNvbnNpZGVyZWQgZGVmYXVsdCB0byBoYXZlIGFjdGlvbnMgZXhlY3V0ZWQgdXBvbi5cclxuICAgKiBAcmV0dXJuIHs/QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgaGVhZGVyIGNlbGwgbm9kZXMgb3IgbnVsbCBpZiBgdGhlYWRgIGlzIG5vdCBzcGVjaWZpZWRcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBnZXRIZWFkZXJDZWxscyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpe1xyXG4gICAgaWYodGhlYWQpe1xyXG4gICAgICBpZihkZWZhdWx0SGVhZGVyUm93SW5kZXghPW51bGwpe1xyXG4gICAgICAgIGxldCBkZWZhdWx0SGVhZGVyUm93ID0gVGFibGVDb2x1bW5zLmdldERlZmF1bHRIZWFkZXJSb3codGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KTtcclxuICAgICAgICBsZXQgaGVhZGVyUm93cyA9IHRoZWFkLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCByb3dzTGVuZ3RoID0gaGVhZGVyUm93cy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGFic3RyID0ge307XHJcbiAgICAgICAgZm9yKGxldCByPTA7cjxyb3dzTGVuZ3RoO3IrKyl7XHJcbiAgICAgICAgICBsZXQgcm93ID0gaGVhZGVyUm93cy5pdGVtKHIpO1xyXG4gICAgICAgICAgbGV0IGF1Z21lbnRJbmRleD0wOyAvLyBpbmRleCB0aGF0IHdpbGwgYWNjb3VudCBmb3IgY29sU3BhbiBvZiB1cHBlciByb3dzJyBjZWxsc1xyXG4gICAgICAgICAgW10uc2xpY2UuY2FsbChyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsaW5kZXgpPT57IC8vaXRlcmF0ZSB0aHJvdWdoIGNlbGxzXHJcbiAgICAgICAgICAgIGZvcihsZXQgcnM9MDsgcnM8PWNlbGwucm93U3Bhbi0xO3JzKyspeyAvL3NwcmVhZCBjZWxsIGFjcm9zcyBpdHMgcm93c3BhblxyXG4gICAgICAgICAgICAgIGxldCByb3dBID0gYWJzdHJbcityc10gPSBhYnN0cltyK3JzXSB8fCB7fTsgLy9jcmVhdGUgcm93IGlmIG5vdCBleGlzdHNcclxuICAgICAgICAgICAgICBpZighcm93QVthdWdtZW50SW5kZXhdKXsgLy9pbnNlcnQgY2VsbCBpbnRvIHNsb3QgaWYgbm90IGZpbGxlZFxyXG4gICAgICAgICAgICAgICAgcm93QVthdWdtZW50SW5kZXhdPWNlbGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHsgLy9pZiBmaWxsZWQgbG9vayBmb3IgdGhlIG5leHQgZW1wdHkgYmVjYXVzZSByb3dzcGFubmVkIGNvbHVtbnMgZmlsbCB0aGVtIGluIGEgbGluZWFyIHdheVxyXG4gICAgICAgICAgICAgICAgbGV0IGk9MDtcclxuICAgICAgICAgICAgICAgIHdoaWxlKHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICBpZighcm93QVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QVtpXT1jZWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1Z21lbnRJbmRleD1pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXVnbWVudEluZGV4Kz1jZWxsLmNvbFNwYW47XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYWJzdHJbZGVmYXVsdEhlYWRlclJvdy5pbmRleF0pLm1hcChrID0+IGFic3RyW2RlZmF1bHRIZWFkZXJSb3cuaW5kZXhdW2tdKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RhYmxlQ29sdW1ucy5nZXRIZWFkZXJDZWxsczogZGVmYXVsdEhlYWRlclJvd0luZGV4IGlzIG5vdCBzcGVjaWZpZWQgb3IgaXMgbm90IGEgTnVtYmVyJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYW4gYXJyYXkgb2YgY29sdW1ucyBmcm9tIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUVsZW1lbnR9IHRoZWFkIC0gc291cmNlIHRhYmxlIGhlYWRlclxyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUVsZW1lbnR9IHJlZlRoZWFkIC0gcmVmZXJlbmNlIHRhYmxlIGhlYWRlciBmcm9tIGZsb2F0aW5nIGhlYWRlciBpZiBhbnlcclxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVmYXVsdEhlYWRlclJvd0luZGV4IC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBiZSBjb25zaWRlcmVkIGRlZmF1bHQgdG8gaGF2ZSBhY3Rpb25zIGV4ZWN1dGVkIHVwb24uXHJcbiAgICogQHJldHVybiB7P0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGhlYWRlciBjZWxsIG5vZGVzIG9yIG51bGwgaWYgYHRoZWFkYCBpcyBub3Qgc3BlY2lmaWVkXHJcbiAgICogKi9cclxuICBzdGF0aWMgY29tcHV0ZUNvbHVtbnModGhlYWQscmVmVGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KXtcclxuICAgIGxldCB0aGVhZENlbGxzID0gVGFibGVDb2x1bW5zLmdldEhlYWRlckNlbGxzKHRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCk7XHJcbiAgICBsZXQgcmVmVGhlYWRDZWxscyA9IFRhYmxlQ29sdW1ucy5nZXRIZWFkZXJDZWxscyhyZWZUaGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpO1xyXG4gICAgbGV0IHJlYWxDb2x1bW5JbmRleD0wO1xyXG4gICAgcmV0dXJuIHRoZWFkQ2VsbHMubWFwKChjZWxsLGluZGV4KT0+e1xyXG4gICAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIGluZGV4OiByZWFsQ29sdW1uSW5kZXgsXHJcbiAgICAgICAgdGl0bGU6IGNlbGwudGV4dENvbnRlbnQsXHJcbiAgICAgICAgY2VsbCxcclxuICAgICAgICBjb2xTcGFuOmNlbGwuY29sU3BhblxyXG4gICAgICB9O1xyXG4gICAgICBpZihyZWZUaGVhZENlbGxzIT1udWxsKXtvYmoucmVmQ2VsbCA9IHJlZlRoZWFkQ2VsbHNbaW5kZXhdfVxyXG4gICAgICAvLyB3ZSBuZWVkIHRvIGluY3JlbWVudCB0aGUgY29sc3BhbiBvbmx5IGZvciBjb2x1bW5zIHRoYXQgZm9sbG93IHJvd2hlYWRlciBiZWNhdXNlIHRoZSBibG9jayBpcyBub3QgaW4gZGF0YS5cclxuICAgICAgcmVhbENvbHVtbkluZGV4PSByZWFsQ29sdW1uSW5kZXg+MD8ocmVhbENvbHVtbkluZGV4ICsgY2VsbC5jb2xTcGFuKTpyZWFsQ29sdW1uSW5kZXgrMTtcclxuICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbnM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1zb3J0LXRhYmxlL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMDcuMDkuMjAxNi5cclxuICovXHJcbmltcG9ydCBUYWJsZUNvbHVtbnMgZnJvbSBcIi4vdGFibGUtY29sdW1uc1wiO1xyXG5pbXBvcnQgUmVwb3J0YWxCYXNlIGZyb20gXCJyLXJlcG9ydGFsLWJhc2VcIjtcclxuXHJcbndpbmRvdy5SZXBvcnRhbCA9IHdpbmRvdy5SZXBvcnRhbCB8fCB7fTtcclxuUmVwb3J0YWxCYXNlLm1peGluKHdpbmRvdy5SZXBvcnRhbCx7XHJcbiAgVGFibGVDb2x1bW5zLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxlQ29sdW1ucztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9yLXRhYmxlLWNvbHVtbnMvc3JjL21haW4uanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBJdmFuUCBvbiAwOS4wOS4yMDE2LlxyXG4gKi9cclxuXHJcbmNsYXNzIFRhYmxlQ29sdW1uc3tcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIG9iamVjdHMgY29ycmVzcG9uZGluZyB0byB0aGUgY2VsbHMgb2YgYGRlZmF1bHRIZWFkZXJSb3dgLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBwYXNzZWQgdG8gY29uZmlndXJlIHRoZSBTb3J0aW5nXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBvcHRpb25zLnNvdXJjZSAtIHNvdXJjZSB0YWJsZSBzb3J0aW5nIHdpbGwgYmUgYXBwbGllZCB0b1xyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5yZWZTb3VyY2UgLSBmbG9hdGluZyBoZWFkZXIgaWYgYW55XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBbb3B0aW9ucy5kZWZhdWx0SGVhZGVyUm93PS0xXSAtIGluZGV4IG9mIHRoZSByb3cgaW4gYHRoZWFkYCAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgaGF2ZSBzb3J0aW5nIGVuYWJsZWQgZm9yIGNvbHVtbnMuIElmIGAtMWAgdGhlbiBsYXN0IHJvdy5cclxuICAgKiBAcmV0dXJuIHt7aW5kZXg6TnVtYmVyLCB0aXRsZTpTdHJpbmcsIGNvbFNwYW46TnVtYmVyLCBjZWxsOiBIVE1MVGFibGVDZWxsRWxlbWVudCwgP3JlZkNlbGw6SFRNTFRhYmxlQ2VsbEVsZW1lbnR9fSAtIGFuIGFycmF5IG9mIG9iamVjdHMgdGhhdCBoYXZlIHRoaXMgc3RydWN0dXJlXHJcbiAgICogKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuICAgIGxldCB7c291cmNlLHJlZlNvdXJjZSxkZWZhdWx0SGVhZGVyUm93PS0xfSA9IG9wdGlvbnM7XHJcbiAgICBsZXQgdGhlYWQscmVmVGhlYWQ7XHJcbiAgICBpZihzb3VyY2Upe3RoZWFkPVRhYmxlQ29sdW1ucy5nZXRIZWFkZXIoc291cmNlKX0gZWxzZSB7dGhyb3cgbmV3IFR5cGVFcnJvcignYHNvdXJjZWAgdGFibGUgaXMgbm90IHNwZWNpZmllZCwgY2Fubm90IGNyZWF0ZSBUYWJsZUNvbHVtbnMnKX1cclxuICAgIGlmKHJlZlNvdXJjZSl7cmVmVGhlYWQ9VGFibGVDb2x1bW5zLmdldEhlYWRlcihyZWZTb3VyY2UpfVxyXG4gICAgcmV0dXJuIFRhYmxlQ29sdW1ucy5jb21wdXRlQ29sdW1ucyh0aGVhZCxyZWZUaGVhZCxkZWZhdWx0SGVhZGVyUm93KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYSBoZWFkZXJcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IHNvdXJjZSAtIHNvdXJjZSB0YWJsZSBoZWFkZXJzIGFyZSBjcmVhdGVkIGZvclxyXG4gICAqICovXHJcbiAgc3RhdGljIGdldEhlYWRlcihzb3VyY2Upe1xyXG4gICAgaWYoc291cmNlICYmIHNvdXJjZS50YWdOYW1lID09ICdUQUJMRScpe1xyXG4gICAgICBsZXQgaGVhZGVyID0gc291cmNlLnF1ZXJ5U2VsZWN0b3IoXCJ0aGVhZFwiKTtcclxuICAgICAgaWYoaGVhZGVyICYmIGhlYWRlci5jaGlsZHJlbi5sZW5ndGg+MCkge1xyXG4gICAgICAgIHJldHVybiBoZWFkZXI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYHNvdXJjZWAgdGFibGUgaGFzIG5vIGhlYWRlciBvciByb3dzJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIGlzIG5vdCBzcGVjaWZpZWQgb3IgaXMgbm90IGEgdGFibGUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgZGVmYXVsdEhlYWRlclJvdyBmb3IgYSBwYXNzZWQgYHRoZWFkYFxyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUVsZW1lbnR9IHRoZWFkIC0gc291cmNlIHRhYmxlIGhlYWRlclxyXG4gICAqIEBwYXJhbSB7IU51bWJlcn0gZGVmYXVsdEhlYWRlclJvd0luZGV4IC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBiZSBjb25zaWRlcmVkIGRlZmF1bHQgdG8gaGF2ZSBhY3Rpb25zIGV4ZWN1dGVkIHVwb24uXHJcbiAgICogQHJldHVybiB7e2luZGV4Ok51bWJlciwgcm93OiBIVE1MVGFibGVSb3dFbGVtZW50fX1cclxuICAgKiAqL1xyXG4gIHN0YXRpYyBnZXREZWZhdWx0SGVhZGVyUm93KHRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCl7XHJcbiAgICAvLyBjYWxjdWxhdGUgZGVmYXVsdCBoZWFkZXIgcm93XHJcbiAgICBsZXQgaGVhZGVyUm93cyA9IHRoZWFkLmNoaWxkcmVuLFxyXG4gICAgICBoZWFkZXJSb3dJbmRleCA9IGRlZmF1bHRIZWFkZXJSb3dJbmRleD09LTEgPyBoZWFkZXJSb3dzLmxlbmd0aCArIGRlZmF1bHRIZWFkZXJSb3dJbmRleCA6IGRlZmF1bHRIZWFkZXJSb3dJbmRleDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGluZGV4OmhlYWRlclJvd0luZGV4LFxyXG4gICAgICByb3c6aGVhZGVyUm93cy5pdGVtKGhlYWRlclJvd0luZGV4KVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYW4gYXJyYXkgb2YgaGVhZGVyIGNlbGwgbm9kZXMgZnJvbSBkZWZhdWx0IGhlYWRlciByb3dcclxuICAgKiBAcGFyYW0gez9IVE1MVGFibGVFbGVtZW50fSB0aGVhZCAtIHNvdXJjZSB0YWJsZSBoZWFkZXJcclxuICAgKiBAcGFyYW0geyFOdW1iZXJ9IGRlZmF1bHRIZWFkZXJSb3dJbmRleCAtIGluZGV4IG9mIHRoZSByb3cgaW4gYHRoZWFkYCAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgYmUgY29uc2lkZXJlZCBkZWZhdWx0IHRvIGhhdmUgYWN0aW9ucyBleGVjdXRlZCB1cG9uLlxyXG4gICAqIEByZXR1cm4gez9BcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBoZWFkZXIgY2VsbCBub2RlcyBvciBudWxsIGlmIGB0aGVhZGAgaXMgbm90IHNwZWNpZmllZFxyXG4gICAqICovXHJcbiAgc3RhdGljIGdldEhlYWRlckNlbGxzKHRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCl7XHJcbiAgICBpZih0aGVhZCl7XHJcbiAgICAgIGlmKGRlZmF1bHRIZWFkZXJSb3dJbmRleCE9bnVsbCl7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRIZWFkZXJSb3cgPSBUYWJsZUNvbHVtbnMuZ2V0RGVmYXVsdEhlYWRlclJvdyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpO1xyXG4gICAgICAgIGxldCBoZWFkZXJSb3dzID0gdGhlYWQuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IHJvd3NMZW5ndGggPSBoZWFkZXJSb3dzLmxlbmd0aDtcclxuICAgICAgICBsZXQgYWJzdHIgPSB7fTtcclxuICAgICAgICBmb3IobGV0IHI9MDtyPHJvd3NMZW5ndGg7cisrKXtcclxuICAgICAgICAgIGxldCByb3cgPSBoZWFkZXJSb3dzLml0ZW0ocik7XHJcbiAgICAgICAgICBsZXQgYXVnbWVudEluZGV4PTA7IC8vIGluZGV4IHRoYXQgd2lsbCBhY2NvdW50IGZvciBjb2xTcGFuIG9mIHVwcGVyIHJvd3MnIGNlbGxzXHJcbiAgICAgICAgICBbXS5zbGljZS5jYWxsKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCxpbmRleCk9PnsgLy9pdGVyYXRlIHRocm91Z2ggY2VsbHNcclxuICAgICAgICAgICAgZm9yKGxldCBycz0wOyByczw9Y2VsbC5yb3dTcGFuLTE7cnMrKyl7IC8vc3ByZWFkIGNlbGwgYWNyb3NzIGl0cyByb3dzcGFuXHJcbiAgICAgICAgICAgICAgbGV0IHJvd0EgPSBhYnN0cltyK3JzXSA9IGFic3RyW3IrcnNdIHx8IHt9OyAvL2NyZWF0ZSByb3cgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgICAgICAgIGlmKCFyb3dBW2F1Z21lbnRJbmRleF0peyAvL2luc2VydCBjZWxsIGludG8gc2xvdCBpZiBub3QgZmlsbGVkXHJcbiAgICAgICAgICAgICAgICByb3dBW2F1Z21lbnRJbmRleF09Y2VsbDtcclxuICAgICAgICAgICAgICB9IGVsc2UgeyAvL2lmIGZpbGxlZCBsb29rIGZvciB0aGUgbmV4dCBlbXB0eSBiZWNhdXNlIHJvd3NwYW5uZWQgY29sdW1ucyBmaWxsIHRoZW0gaW4gYSBsaW5lYXIgd2F5XHJcbiAgICAgICAgICAgICAgICBsZXQgaT0wO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUodHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgIGlmKCFyb3dBW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICByb3dBW2ldPWNlbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYXVnbWVudEluZGV4PWk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhdWdtZW50SW5kZXgrPWNlbGwuY29sU3BhbjtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhYnN0cltkZWZhdWx0SGVhZGVyUm93LmluZGV4XSkubWFwKGsgPT4gYWJzdHJbZGVmYXVsdEhlYWRlclJvdy5pbmRleF1ba10pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGFibGVDb2x1bW5zLmdldEhlYWRlckNlbGxzOiBkZWZhdWx0SGVhZGVyUm93SW5kZXggaXMgbm90IHNwZWNpZmllZCBvciBpcyBub3QgYSBOdW1iZXInKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhbiBhcnJheSBvZiBjb2x1bW5zIGZyb20gdGhlIHRhYmxlXHJcbiAgICogQHBhcmFtIHshSFRNTFRhYmxlRWxlbWVudH0gdGhlYWQgLSBzb3VyY2UgdGFibGUgaGVhZGVyXHJcbiAgICogQHBhcmFtIHshSFRNTFRhYmxlRWxlbWVudH0gcmVmVGhlYWQgLSByZWZlcmVuY2UgdGFibGUgaGVhZGVyIGZyb20gZmxvYXRpbmcgaGVhZGVyIGlmIGFueVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWZhdWx0SGVhZGVyUm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGJlIGNvbnNpZGVyZWQgZGVmYXVsdCB0byBoYXZlIGFjdGlvbnMgZXhlY3V0ZWQgdXBvbi5cclxuICAgKiBAcmV0dXJuIHs/QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgaGVhZGVyIGNlbGwgbm9kZXMgb3IgbnVsbCBpZiBgdGhlYWRgIGlzIG5vdCBzcGVjaWZpZWRcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBjb21wdXRlQ29sdW1ucyh0aGVhZCxyZWZUaGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpe1xyXG4gICAgbGV0IHRoZWFkQ2VsbHMgPSBUYWJsZUNvbHVtbnMuZ2V0SGVhZGVyQ2VsbHModGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KTtcclxuICAgIGxldCByZWZUaGVhZENlbGxzID0gVGFibGVDb2x1bW5zLmdldEhlYWRlckNlbGxzKHJlZlRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCk7XHJcbiAgICBsZXQgcmVhbENvbHVtbkluZGV4PTA7XHJcbiAgICByZXR1cm4gdGhlYWRDZWxscy5tYXAoKGNlbGwsaW5kZXgpPT57XHJcbiAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgaW5kZXg6IHJlYWxDb2x1bW5JbmRleCxcclxuICAgICAgICB0aXRsZTogY2VsbC50ZXh0Q29udGVudCxcclxuICAgICAgICBjZWxsLFxyXG4gICAgICAgIGNvbFNwYW46Y2VsbC5jb2xTcGFuXHJcbiAgICAgIH07XHJcbiAgICAgIGlmKHJlZlRoZWFkQ2VsbHMhPW51bGwpe29iai5yZWZDZWxsID0gcmVmVGhlYWRDZWxsc1tpbmRleF19XHJcbiAgICAgIC8vIHdlIG5lZWQgdG8gaW5jcmVtZW50IHRoZSBjb2xzcGFuIG9ubHkgZm9yIGNvbHVtbnMgdGhhdCBmb2xsb3cgcm93aGVhZGVyIGJlY2F1c2UgdGhlIGJsb2NrIGlzIG5vdCBpbiBkYXRhLlxyXG4gICAgICByZWFsQ29sdW1uSW5kZXg9IHJlYWxDb2x1bW5JbmRleD4wPyhyZWFsQ29sdW1uSW5kZXggKyBjZWxsLmNvbFNwYW4pOnJlYWxDb2x1bW5JbmRleCsxO1xyXG4gICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxlQ29sdW1ucztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9yLXRhYmxlLWNvbHVtbnMvc3JjL3RhYmxlLWNvbHVtbnMuanMiLCJpbXBvcnQgUmVwb3J0YWxCYXNlIGZyb20gXCJyLXJlcG9ydGFsLWJhc2VcIjtcclxuXHJcbnZhciBUYWJsZUZsb2F0aW5nSGVhZGVyU3R5bGUgPSByZXF1aXJlKCcuL3RhYmxlLWZsb2F0aW5nLWhlYWRlci1zdHlsZXMuY3NzJyk7XHJcblxyXG4vKipcclxuICogRml4ZWRIZWFkZXIgY2xhc3MgZW5hYmxlcyBhIGZpeGVkIGhlYWRlciBhcHBlYXIgb24gdGFibGVzIHRoYXQgaGF2ZSBgLnJlcG9ydGFsLWZpeGVkLWhlYWRlcmAgY2xhc3Mgd2hlbiB0aGUgdGFibGUgaGVhZGVyIGlzIHNjcm9sbGVkIHVuZGVyIGFkZHJlc3MgYmFyLlxyXG4gKi9cclxuY2xhc3MgVGFibGVGbG9hdGluZ0hlYWRlciB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGUgdGhhdCBuZWVkcyBhIGNsb25lZCBoZWFkZXJcclxuICAgKiAqL1xyXG4gIGNvbnN0cnVjdG9yKHNvdXJjZSl7XHJcbiAgICBpZih0eXBlb2Ygc291cmNlID09IHVuZGVmaW5lZCB8fCBzb3VyY2UudGFnTmFtZSAhPSAnVEFCTEUnKXtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYHNvdXJjZWAgbXVzdCBiZSBkZWZpbmVkIGFuZCBtdXN0IGJlIGEgdGFibGUnKVxyXG4gICAgfVxyXG5cclxuICAgIFRhYmxlRmxvYXRpbmdIZWFkZXIud3JhcFRhYmxlKHNvdXJjZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVGhlIGNsb25lZCBmbG9hdGluZyBoZWFkZXIgd2l0aG91dCBUQk9EWVxyXG4gICAgICogIEB0eXBlIHtIVE1MVGFibGVFbGVtZW50fVxyXG4gICAgICogIEBtZW1iZXJPZiBUYWJsZUZsb2F0aW5nSGVhZGVyXHJcbiAgICAgKiAgKi9cclxuICAgIHRoaXMuaGVhZGVyICA9IFRhYmxlRmxvYXRpbmdIZWFkZXIuY2xvbmVIZWFkZXIoc291cmNlKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBUaGUgc291cmNlIHRhYmxlXHJcbiAgICAgKiAgQHR5cGUge0hUTUxUYWJsZUVsZW1lbnR9XHJcbiAgICAgKiAgQG1lbWJlck9mIFRhYmxlRmxvYXRpbmdIZWFkZXJcclxuICAgICAqICAqL1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAvKipcclxuICAgICAqICBWaXNpYmlsaXR5IHN0YXR1cyBvZiB0aGUgdGFibGVcclxuICAgICAqICBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAqICBAbWVtYmVyT2YgVGFibGVGbG9hdGluZ0hlYWRlclxyXG4gICAgICogICovXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9tZXRhID0ge1xyXG4gICAgICBsYXN0U2Nyb2xsWTowLFxyXG4gICAgICBzb3VyY2VUSEVBRDogc291cmNlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkJyksXHJcbiAgICAgIHRpY2tpbmc6ZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuXHJcbiAgICB0aGlzLnJlc2l6ZUZpeGVkKCk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCk9PnRoaXMucmVzaXplRml4ZWQuY2FsbCh0aGlzKSwgZmFsc2UpOyAvLyBhdHRhY2ggYSByZXNpemUgbGlzdGVuZXIgdG8gcmVzaXplIHRoZSBoZWFkZXJcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpPT50aGlzLnNjcm9sbEZpeGVkLmNhbGwodGhpcyksIGZhbHNlKTsgLy8gYXR0YWNoIGEgcmVzaXplIGxpc3RlbmVyIHRvIHJlc2l6ZSB0aGUgaGVhZGVyXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjYWxjdWxhdGVzIG9mZnNldCBoZWlnaHQgb2YgdGhlIHRhYmxlXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGVcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBjYWxjT2Zmc2V0SGVpZ2h0KHNvdXJjZSl7XHJcbiAgICB0aGlzLl9tZXRhLnRhYmxlT2Zmc2V0VG9wID0gc291cmNlLnBhcmVudE5vZGUub2Zmc2V0VG9wO1xyXG4gICAgdGhpcy5fbWV0YS50YWJsZU9mZnNldEJvdHRvbSA9IHNvdXJjZS5wYXJlbnROb2RlLm9mZnNldFRvcCArIHNvdXJjZS5vZmZzZXRIZWlnaHQgLSB0aGlzLl9tZXRhLnNvdXJjZVRIRUFELm9mZnNldEhlaWdodDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IHJlcG9ydGluZyB0aGF0IGEgaGVhZGVyIGlzIHZpc2libGVcclxuICAgKiBAZXZlbnQgVGFibGVGbG9hdGluZ0hlYWRlcn5yZXBvcnRhbC1maXhlZC1oZWFkZXItdmlzaWJsZVxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCByZXBvcnRpbmcgdGhhdCBhIGhlYWRlciBpcyBoaWRkZW5cclxuICAgKiBAZXZlbnQgVGFibGVGbG9hdGluZ0hlYWRlcn5yZXBvcnRhbC1maXhlZC1oZWFkZXItaGlkZGVuXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIHNldHMgdmlzaWJpbGl0eSBvZiB0aGUgdGFibGVcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IHNvdXJjZSAtIHNvdXJjZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gaGVhZGVyIC0gY2xvbmVkIHRhYmxlIHdpdGggaGVhZGVyIG9ubHlcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZpc2libGUgLSB2aXNpYmlsaXR5IHN0YXR1c1xyXG4gICAqIEBmaXJlcyBUYWJsZUZsb2F0aW5nSGVhZGVyfnJlcG9ydGFsLWZpeGVkLWhlYWRlci12aXNpYmxlXHJcbiAgICogQGZpcmVzIFRhYmxlRmxvYXRpbmdIZWFkZXJ+cmVwb3J0YWwtZml4ZWQtaGVhZGVyLXZpc2libGVcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBzZXRWaXNpYmlsaXR5KHNvdXJjZSwgaGVhZGVyLCB2aXNpYmxlKXtcclxuICAgIGlmKHZpc2libGUpe1xyXG4gICAgICBoZWFkZXIuc3R5bGUuZGlzcGxheT0ndGFibGUnO1xyXG4gICAgICBzb3VyY2UuZGlzcGF0Y2hFdmVudChSZXBvcnRhbEJhc2UubmV3RXZlbnQoJ3JlcG9ydGFsLWZpeGVkLWhlYWRlci12aXNpYmxlJykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGVhZGVyLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICBzb3VyY2UuZGlzcGF0Y2hFdmVudChSZXBvcnRhbEJhc2UubmV3RXZlbnQoJ3JlcG9ydGFsLWZpeGVkLWhlYWRlci1oaWRkZW4nKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB3cmFwcyB0aGUgYHNvdXJjZWAgdGFibGUgaW50byBhIGBkaXYuYWdncmVnYXRlZFRhYmxlQ29udGFpbmVyYFxyXG4gICAqICovXHJcbiAgc3RhdGljIHdyYXBUYWJsZShzb3VyY2Upe1xyXG4gICAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnYWdncmVnYXRlZFRhYmxlQ29udGFpbmVyJyk7XHJcbiAgICBzb3VyY2UucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc291cmNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNsb25lcyBoZWFkZXIgb2YgYHNvdXJjZWAgdGFibGUgYW5kIGFwcGVuZHMgdG8gd3JhcHBlclxyXG4gICAqICovXHJcbiAgc3RhdGljIGNsb25lSGVhZGVyKHNvdXJjZSl7XHJcbiAgICBsZXQgaGVhZGVyID0gc291cmNlLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdmaXhlZCcpO1xyXG4gICAgc291cmNlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIFtdLnNsaWNlLmNhbGwoaGVhZGVyLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkPT57XHJcbiAgICAgIGlmKGNoaWxkLm5vZGVOYW1lPT0nVEJPRFknKXtcclxuICAgICAgICBoZWFkZXIucmVtb3ZlQ2hpbGQoY2hpbGQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoZWFkZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBmdW5jdGlvbiB0aGF0IHBvbGxzIHRoZSBjYWxsYmFja1xyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdGhhdCdzIGdvaW5nIHRvIGJlIHBhc3NlZCB0byBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBmb3IgZXhlY3V0aW9uXHJcbiAgICogKi9cclxuICByZXF1ZXN0VGljayhjYWxsYmFjayl7XHJcbiAgICBpZighdGhpcy5fbWV0YS50aWNraW5nKSB7XHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk7XHJcbiAgICAgIHRoaXMuX21ldGEudGlja2luZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgX3Jlc2l6ZUNhbGxiYWNrKCl7XHJcbiAgICBsZXQgaW5pdGlhbEhlYWRlciA9IHRoaXMuX21ldGEuc291cmNlVEhFQUQucXVlcnlTZWxlY3RvckFsbCgndHI+KicpLFxyXG4gICAgICBjbG9uZWRIZWFkZXIgPSB0aGlzLmhlYWRlci5xdWVyeVNlbGVjdG9yQWxsKCd0aGVhZD50cj4qJyksXHJcbiAgICAgIGhlYWRlcldpZHRoID0gdGhpcy5zb3VyY2Uub2Zmc2V0V2lkdGggKyAncHgnLFxyXG4gICAgICB3aWR0aHM9W107XHJcbiAgICAvLyBkbyByZWZsb3dcclxuICAgIGZvcihsZXQgaT0wO2k8aW5pdGlhbEhlYWRlci5sZW5ndGg7aSsrKXtcclxuICAgICAgd2lkdGhzLnB1c2goaW5pdGlhbEhlYWRlcltpXS5vZmZzZXRXaWR0aCk7XHJcbiAgICB9XHJcbiAgICAvL2RvIHJlcGFpbnRcclxuICAgIGZvcihsZXQgYz0wO2M8Y2xvbmVkSGVhZGVyLmxlbmd0aDtjKyspe1xyXG4gICAgICBjbG9uZWRIZWFkZXJbY10uc3R5bGUud2lkdGggPSB3aWR0aHNbY10gKyAncHgnO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuc3R5bGUud2lkdGggPSBoZWFkZXJXaWR0aDtcclxuXHJcbiAgICBUYWJsZUZsb2F0aW5nSGVhZGVyLmNhbGNPZmZzZXRIZWlnaHQuY2FsbCh0aGlzLHRoaXMuc291cmNlKTsgLy9yZWNhbGMgaGVpZ2h0IG9mIHRoZSB0YWJsZSBhZnRlciByZWZsb3dcclxuICAgIHRoaXMuX21ldGEudGlja2luZz1mYWxzZTtcclxuICAgIHRoaXMuc2Nyb2xsRml4ZWQoKTsgLy8gdG8gY29tcGVuc2F0ZSB0b3Agb2Zmc2V0IGluIGNhc2UgYWZ0ZXIgcmVzaXplIHRoZSB0YWJsZSBpcyBsZXNzIGluIGhlaWdodCBhbmQgdG9wIGhhcyBjaGFuZ2VkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGVzIHdpZHRocyBmb3IgYWxsIGNvbHVtbnMgaW4gdGhlIGZpeGVkIGhlYWRlciBiYXNlZCBvbiB0aGUgYHNvdXJjZWBcclxuICAgKiAqL1xyXG4gIHJlc2l6ZUZpeGVkKCl7XHJcbiAgICB0aGlzLnJlcXVlc3RUaWNrKFRhYmxlRmxvYXRpbmdIZWFkZXIuX3Jlc2l6ZUNhbGxiYWNrLmJpbmQodGhpcykpXHJcbiAgfVxyXG5cclxuXHJcbiAgc3RhdGljIF9zY3JvbGxDYWxsYmFjaygpe1xyXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuX21ldGEubGFzdFNjcm9sbFksXHJcbiAgICAgIHRhYmxlT2Zmc2V0VG9wID0gdGhpcy5fbWV0YS50YWJsZU9mZnNldFRvcCxcclxuICAgICAgdGFibGVPZmZzZXRCb3R0b20gPSB0aGlzLl9tZXRhLnRhYmxlT2Zmc2V0Qm90dG9tO1xyXG4gICAgaWYoKG9mZnNldCA8IHRhYmxlT2Zmc2V0VG9wIHx8IG9mZnNldCA+IHRhYmxlT2Zmc2V0Qm90dG9tKSAmJiB0aGlzLnZpc2libGUpe1xyXG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgVGFibGVGbG9hdGluZ0hlYWRlci5zZXRWaXNpYmlsaXR5KHRoaXMuc291cmNlLHRoaXMuaGVhZGVyLGZhbHNlKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYob2Zmc2V0ID49IHRhYmxlT2Zmc2V0VG9wICYmIG9mZnNldCA8PSB0YWJsZU9mZnNldEJvdHRvbSl7XHJcbiAgICAgIHRoaXMuaGVhZGVyLnN0eWxlLnRvcD1vZmZzZXQtdGFibGVPZmZzZXRUb3ArJ3B4JztcclxuICAgICAgaWYoIXRoaXMudmlzaWJsZSl7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgVGFibGVGbG9hdGluZ0hlYWRlci5zZXRWaXNpYmlsaXR5KHRoaXMuc291cmNlLHRoaXMuaGVhZGVyLHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9tZXRhLnRpY2tpbmc9ZmFsc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcGxheXMgYSBmaXhlZCBoZWFkZXIgd2hlbiB0aGUgdGFibGUgaGVhZGVyIGlzIHNjcm9sbGVkIG9mZiB0aGUgc2NyZWVuXHJcbiAgICogKi9cclxuICBzY3JvbGxGaXhlZCgpIHtcclxuICAgICAgdGhpcy5fbWV0YS5sYXN0U2Nyb2xsWSA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgdGhpcy5yZXF1ZXN0VGljayhUYWJsZUZsb2F0aW5nSGVhZGVyLl9zY3JvbGxDYWxsYmFjay5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYWJsZUZsb2F0aW5nSGVhZGVyO1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci5qcyIsInJlcXVpcmUoXCIuL2RyaWxsZG93bi1tYXAuY3NzXCIpO1xuaW1wb3J0IEFzeW5jSGllcmFyY2h5VGFibGUgZnJvbSBcInItYXN5bmMtaGllcmFyY2h5LXRhYmxlXCI7XG5pbXBvcnQgTWFwSGllcmFyY2h5IGZyb20gXCIuL21hcC1oaWVyYXJjaHlcIjtcbmltcG9ydCBBZ2dyZWdhdGVkVGFibGUgZnJvbSBcInItYWdncmVnYXRlZC10YWJsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmlsbGRvd25NYXAge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIGRyaWxsZG93biBtYXAuIEl0IHVzZXMgYSBjb2xvciBmdW5jdGlvbiBgY29sb3JGbmAgdGhhdCBhbGxvd3MgY29sb3Jjb2RlIGNvdW50cmllc1xuICAgKiBgY29sb3JGbmAgYWNjZXB0cyB0d28gYXR0cmlidXRlczogYHZhbHVlYCBhbmQgYHRhcmdldGAgYW5kIG11c3QgcmV0dXJuIGEgY29sb3Igc3RyaW5nIGJhc2VkIG9uIHRob3NlIHR3byBhdHRyaWJ1dGVzLlxuICAgKiBNYWtlIHN1cmUgaGllcmFyY2h5IGhhcyBgdGFyZ2V0YCBsb2FkZWQgZnJvbSBEQkRlc2lnbmVyIHRhYmxlIGludG8gZWFjaCBoaWVyYXJjaHkgbGV2ZWwsIG90aGVyd2lzZSBhIGRlZmF1bHQgY29uZmlnIGBkYXRhQ2xhc3Nlc2AgdGFrZXMgcHJlY2VkZW5jZSBvbiB2YWx1ZVxuICAgKiBFeGFtcGxlOlxuICAgKlxuICAgKiAgICB7XG4gICAqICAgIC8vc29tZSBjb25zdHJ1Y3RvciBjb25maWd1cmF0aW9uIGFib3ZlXG4gICAqICAgICAgY29sb3JGbjogZnVuY3Rpb24odmFsdWUsdGFyZ2V0KXtcbiAgICogICAgICAgIHJldHVybiAodmFsdWUhPW51bGwgJiYgdGFyZ2V0IT1udWxsKT8gKHZhbHVlIC0gdGFyZ2V0ID49IDApID8gXCIjMThCQzlDXCIgOiAoKHZhbHVlID49IDAuOSp0YXJnZXQpID8gXCIjRkY0OTAwXCIgOiBcIiNFNDUzMzVcIikgOiB1bmRlZmluZWQ7XG4gICAqICAgICAgfVxuICAgKiAgICAgLy9zb21lIGNvbnN0cnVjdG9yIGNvbmZpZ3VyYXRpb24gYmVsb3dcbiAgICogICAgfVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IGNvbmZpZy5zb3VyY2UgLSBhIHNvdXJjZSBkcmlsbGRvd24gdGFibGUgdGhhdCBjb250YWlucyB0aGUgaW5pdGlhbCBzZXQgb2YgZGF0YSh3aXRoIHJlZmVyZW5jZSBncm91cCBlbmFibGVkIGFuZCAxIGNoaWxkIGxldmVsKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLnRhYmxlSUQgLSBpZCBvZiB0aGUgYHNvdXJjZWAgdGFibGUgdGhhdCBpcyB0aGUgaW5pdGlhbCBzb3VyY2Ugb2YgZGF0YSAoZnJvbSByZXBvcnRhbCBiYWNrZW5kKVxuICAgKiBAcGFyYW0ge0FycmF5fSBjb25maWcucm93aGVhZGVycyAtIGEgcm93aGVhZGVycyBhcnJheSBmb3IgdGhlIGxvYWRlZCB0YWJsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnLmZsYXRIaWVyYXJjaHkgLSBhIGhpZXJhcmNoaWNhbCBvYmplY3QgZm9yIGEgbWFwIHRvIGJlIGJ1aWx0IHVwb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcuaW5pdGlhbE1hcD1cImN1c3RvbS93b3JsZC1oaWdocmVzMlwiXSAtIHRoZSBpbml0aWFsIG1hcCBvYmplY3QgdGhhdCdzIGdvaW5nIHRvIGJlIGxvYWRlZCB0byBpbml0aWFsaXNlIHRoZSBtYXBcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5jb250YWluZXJJRCAtIGlkIG9mIHRoZSBjb250YWluZXIgdGhlIG1hcCB3aWxsIGJlIGRyYXduIHRvXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpZy5tYXBwb2ludENhbGxiYWNrIC0gZXhlY3V0ZWQgd2hlbiBhIG1hcHBvaW50IChjaXR5KSBpcyBjbGlja2VkXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpZy5jb2xvckZuIC0gQSBmdW5jdGlvbiB0aGF0IGFsbG93cyBjdXN0b20gY29sb3IgY29kaW5nIGNvbXB1dGF0aW9uIGJhc2VkIG9uIHZhbHVlIGFuZCB0YXJnZXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLnZhbHVlQ29sdW1uPTFdIC0gWmVyby1iYXNlZCBjb2x1bW4gaW5kZXggdGhhdCBjb250YWlucyBwcmltYXJ5IHZhbHVlIHdoaWNoIHdpbGwgYmUgdXNlZCBmb3IgbWFwIGNvbG9yaW5nLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjb25maWcuZnVsbFBhcmVudExldmVsSW5mbz10cnVlXSAtIERpc3BsYXkgZnVsbCBpbmZvIG9mIHRoZSBwYXJlbnQgbGV2ZWwgaW4gcmlnaHQgcGFydCBvZiB0aGUgbWFwLCByYXRoZXIgdGhhbiB0aGUgcGFyZW50IGxldmVsIG5hbWUgYW5kIHRoZSBwcmltYXJ5IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLnBhZ2VTdGF0ZUlkPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNQYWdlU3RhdGVJZCcpLnZhbHVlXSAtIFBhZ2VTdGF0ZUlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcubm9ybWFscyAtIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIG5hbWVzIG9mIGNvbHVtbnMgdGFrZW4gZnJvbSBEQkRlc2lnbmVyVGFibGUgYW5kIHZhbHVlcyAtIHRoZWlyIHN0cmluZyB0eXBlczogYHN0cmluZ2AsIGBudW1iZXJgLCBgYm9vbGVhbmAsIGBzdHJpbmdBcnJheWAsIGBudW1iZXJBcnJheWBcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcubm9ybWFsc1NlcGFyYXRvcj0nLCddIC0gZGVsaW1pdGVyIGJldHdlZW4gdmFsdWVzIGluIGBzdHJpbmdBcnJheWAgKGB1cy1jYSwgdXMtdHgsIHVzLXd5YCkgYW5kIGBudW1iZXJBcnJheWAgKGAtMzEuODYsMTYuMzhgKS4gVGhleSBhcmUgc2VydmVkIGFzIGEgZGVsaW1pdGVyLXNlcGFyYXRlZCBzdHJpbmcgYW5kIHRoZSBkZWxpbWl0ZXIgaXMgYCxgIGJ5IGRlZmF1bHQuIElmIHlvdSB1c2UgYW5vdGhlciBvbmUsIG1ha2Ugc3VyZSB5b3Ugc3BlY2lmeSBpdCBoZXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLm9wdGlvbnM9e31dIC0gb3B0aW9ucyBwYXNzZWQgdG8gSGlnaE1hcCB0byByZXN0eWxlL3JlY29uZmlndXJlIGl0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLmxvYWRpbmdUZXh0PSAnZmV0Y2hpbmcgZGF0YSddIC0gdGV4dCB0byBzaG93IHdoZW4gbG9hZGluZyBhbm90aGVyIGxldmVsXG4gICAqICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XG4gICAgdGhpcy5kZWNsYXJlR2xvYmFscyhjb25maWcsIHtcbiAgICAgIGluaXRpYWxNYXA6ICdjdXN0b20vd29ybGQtaGlnaHJlczInLFxuICAgICAgdmFsdWVDb2x1bW46IDEsXG4gICAgICBmdWxsUGFyZW50TGV2ZWxJbmZvOiB0cnVlLFxuICAgICAgY29sb3JGbjogZnVuY3Rpb24gKHZhbHVlLCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsID8gdmFsdWUgPj0gODAgPyAnIzRjYWY1MCcgOiAoKHZhbHVlIDwgODAgJiYgdmFsdWUgPj0gNjAgKSA/ICcjZmZjMTA3JyA6ICcjZmY1NzIyJykgOiAnYmx1ZSc7XG4gICAgICB9LFxuICAgICAgcGFnZVN0YXRlSWQ6IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjUGFnZVN0YXRlSWQnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNQYWdlU3RhdGVJZCcpLnZhbHVlIDogbnVsbCksXG4gICAgICBsb2FkaW5nVGV4dDogJ2ZldGNoaW5nIGRhdGEnLFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfSwgdGhpcy50eXBlQ2hlY2soY29uZmlnKSk7XG5cbiAgICBjb25zdCB7aGllcmFyY2h5LGZsYXRIaWVyYXJjaHl9ID0gbmV3IE1hcEhpZXJhcmNoeSh7XG4gICAgICBmbGF0SGllcmFyY2h5OnRoaXMuZmxhdEhpZXJhcmNoeSxcbiAgICAgIGhpZXJhcmNoeTp0aGlzLmhpZXJhcmNoeSxcbiAgICAgIG5vcm1hbHM6dGhpcy5ub3JtYWxzLFxuICAgICAgbm9ybWFsc1NlcGFyYXRvcjp0aGlzLm5vcm1hbHNTZXBhcmF0b3JcbiAgICB9KTtcblxuICAgIHRoaXMuZmxhdEhpZXJhcmNoeSA9IGZsYXRIaWVyYXJjaHk7XG4gICAgdGhpcy5oaWVyYXJjaHkgPSBoaWVyYXJjaHk7XG5cbiAgICB0aGlzLnBhcnNlVGFibGVEYXRhKCk7XG5cbiAgICB0aGlzLmRyYXdNYXAoKTtcbiAgfVxuXG4gIGRlY2xhcmVHbG9iYWxzKGNvbmZpZywgZGVmYXVsdHMgPSB7fSwgdHlwZUNoZWNrID0ge30pIHtcbiAgICBjb25zdCBtaXhlZE9wdGlvbnMgPSB7Li4uY29uZmlnLCAuLi5kZWZhdWx0c307XG4gICAgT2JqZWN0LmtleXMobWl4ZWRPcHRpb25zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAodHlwZUNoZWNrW2tleV0gJiYgdHlwZW9mIHR5cGVDaGVja1trZXldID09PSAnZnVuY3Rpb24nKSB0eXBlQ2hlY2tba2V5XShtaXhlZE9wdGlvbnNba2V5XSk7XG4gICAgICB0aGlzW2tleV0gPSBtaXhlZE9wdGlvbnNba2V5XTtcbiAgICB9KVxuICB9XG5cbiAgdHlwZUNoZWNrKG9wdHMpIHtcbiAgICBpZiAodHlwZW9mIEhpZ2hjaGFydHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hpZ2hjaGFydHMgbXVzdCBiZSBkZWNsYXJlZC4gUHJvYmFibHkgdGhleSBhcmUgbWlzc2luZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgSGlnaGNoYXJ0cy5tYXBzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdIaWdoTWFwcyBtdXN0IGJlIGxvYWRlZC4gUHJvYmFibHkgdGhleSBhcmUgbWlzc2luZycpXG4gICAgfVxuICAgIGlmICghKG9wdHMucm93aGVhZGVycyAmJiBvcHRzLnJvd2hlYWRlcnMgIT09IG51bGwgJiYgb3B0cy5yb3doZWFkZXJzLmxlbmd0aCA+IDApKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcInJvd2hlYWRlcnNcIiBhcnJheSBtdXN0IGJlIHByZXNlbnQgdG8gcGFyc2UgZGF0YScpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNvdXJjZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIShvcHRzLnNvdXJjZSAmJiBvcHRzLnNvdXJjZS5sb2NhbE5hbWUgPT09ICd0YWJsZScpKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc291cmNlIHRhYmxlIG11c3QgYmUgc3BlY2lmaWVkJylcbiAgICAgIH0sXG4gICAgICBjb250YWluZXJJRDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIShvcHRzLmNvbnRhaW5lcklEICYmIHR5cGVvZiBvcHRzLmNvbnRhaW5lcklEID09PSAnc3RyaW5nJykpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb250YWluZXJJRCBtdXN0IGJlIGEgc3RyaW5nIHdpdGhvdXQgYSBsZWFkaW5nICMgY2hhcmFjdGVyIGJ1dCBpdCBpcyAnICsgdHlwZW9mIG9wdHMuY29udGFpbmVySUQpXG4gICAgICB9LFxuICAgICAgdGFibGVJRDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIShvcHRzLnRhYmxlSUQgJiYgdHlwZW9mIG9wdHMudGFibGVJRCA9PT0gJ3N0cmluZycpKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGFibGVJRCBtdXN0IGJlIGEgc3RyaW5nIGJ1dCBpdCBpcyAnICsgdHlwZW9mIG9wdHMudGFibGVJRClcbiAgICAgIH0sXG4gICAgICBtYXBwb2ludENhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNiID0gb3B0cy5tYXBwb2ludENhbGxiYWNrO1xuICAgICAgICBpZiAoY2IgJiYgY2IgIT09IG51bGwgJiYgdHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWFwcG9pbnRDYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgICAgfSxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRhYmxlIHBhc3NlZCB0byBpdCBhbmQgYWRkcyBkYXRhIHRvIGAuX2RhdGFgIGluIGBoaWVyYXJjaHlgXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgZm9yIGRhdGFcbiAgICogQHBhcmFtIHtOdW1iZXJ8QXJyYXl9IG9wdGlvbnMuZXhjbHVkZVJvd3MgLSByb3dzIHRvIGJlIGV4Y2x1ZGVkIGZyb20gcGFyc2luZ1xuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnJvd2hlYWRlcnMgLSBhcnJheSBvZiBgc291cmNlYCByb3doZWFkZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmZsYXRIaWVyYXJjaHkgLSBmbGF0IGhpZXJhcmNoeSBvYmplY3RcbiAgICogKi9cbiAgcGFyc2VUYWJsZURhdGEob3B0aW9ucz17fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNvdXJjZSA9IHRoaXMuc291cmNlLFxuICAgICAgZXhjbHVkZVJvd3MgPSB0aGlzLmV4Y2x1ZGVSb3dzLFxuICAgICAgcm93aGVhZGVycyA9IHRoaXMucm93aGVhZGVycy5tYXAocmggPT4gcmhbMF0pLFxuICAgICAgZXhjbHVkZUNvbHVtbnMgPSB0aGlzLmV4Y2x1ZGVDb2x1bW5zLFxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgY29uc3QgYWdncmVnYXRlZFRhYmxlID0gbmV3IEFnZ3JlZ2F0ZWRUYWJsZSh7c291cmNlLCBleGNsdWRlQ29sdW1ucywgZXhjbHVkZVJvd3N9KTtcbiAgICByb3doZWFkZXJzLmZvckVhY2goKHJvd0hlYWRlciwgaSkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZsYXRIaWVyYXJjaHlbcm93SGVhZGVyXS5fZGF0YSkge1xuICAgICAgICB0aGlzLmZsYXRIaWVyYXJjaHlbcm93SGVhZGVyXS5fZGF0YSA9IGFnZ3JlZ2F0ZWRUYWJsZS5kYXRhW2ldLm1hcCgoZGF0YUl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBkYXRhSXRlbS5kYXRhLFxuICAgICAgICAgICAgdGl0bGU6IGluZGV4ICE9PSAwID8gYWdncmVnYXRlZFRhYmxlLmNvbHVtbnNbaW5kZXhdLnRpdGxlIDogXCJSZWdpb25cIlxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZHJhd01hcCgpIHtcbiAgICB0aGlzLmN1ckxWTCA9IHRoaXMuZmxhdEhpZXJhcmNoeVt0aGlzLnJvd2hlYWRlcnNbMF1dO1xuICAgIEhpZ2hjaGFydHMubWFwQ2hhcnQodGhpcy5jb250YWluZXJJRCwgey4uLnRoaXMubWFwQ29uZmlnLCAuLi50aGlzLm9wdGlvbnN9KTtcbiAgfVxuXG4gIGdldCBtYXBDb25maWcoKSB7XG4gICAgY29uc3QgVGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhbmc6IHtcbiAgICAgICAgZHJpbGxVcFRleHQ6ICc8IHRvIHtzZXJpZXMucGFyZW50fSdcbiAgICAgIH0sXG4gICAgICB0b29sdGlwOiB7XG4gICAgICAgIHBvaW50Rm9ybWF0OiBUaGlzLmdldFRvb2x0aXAoKVxuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHRleHQ6ICcnXG4gICAgICB9LFxuICAgICAgbGVnZW5kOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBwbG90T3B0aW9uczoge1xuICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICBzdGF0ZXM6IHtcbiAgICAgICAgICAgIG5vcm1hbDoge1xuICAgICAgICAgICAgICBhbmltYXRpb246IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb2ludDoge1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgIG1vdXNlT3ZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWVzLmRhdGEuZm9yRWFjaChlbCA9PiBlbC5zZXRTdGF0ZShcImhvdmVyXCIpKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBtb3VzZU91dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWVzLmRhdGEuZm9yRWFjaChlbCA9PiBlbC5zZXRTdGF0ZSgpKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWFwTmF2aWdhdGlvbjoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgem9vbUluOiB7XG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB6b29tT3V0OiB7XG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3VidGl0bGU6IHtcbiAgICAgICAgYWxpZ246ICdyaWdodCcsXG4gICAgICAgIGZsb2F0aW5nOiB0cnVlLFxuICAgICAgICB0ZXh0OiBUaGlzLnN1YnRpdGxlLFxuICAgICAgfSxcbiAgICAgIGRyaWxsZG93bjoge1xuICAgICAgICBkcmlsbFVwQnV0dG9uOiB7XG4gICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgIGFsaWduOiBcImxlZnRcIixcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbGF0aXZlVG86ICdzcGFjaW5nQm94J1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hhcnQ6IHtcbiAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgZHJpbGxkb3duOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy90aGlzID09IGNoYXJ0IHJlZmVyZW5jZTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coQ2lyY3VsYXJKU09OLnBhcnNlKENpcmN1bGFySlNPTi5zdHJpbmdpZnkoZS5wb2ludCkpKTtcbiAgICAgICAgICAgIGxldCBjaGFydCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgVGhpcy5jdXJMVkwgPSBUaGlzLmdldExldmVsQnlOYW1lKGUucG9pbnQuc2VyaWVzLm5hbWUpO1xuICAgICAgICAgICAgbGV0IGN1ckxWTCA9IFRoaXMuY3VyTFZMO1xuICAgICAgICAgICAgaWYgKGN1ckxWTCkge1xuICAgICAgICAgICAgICBjaGFydC5zaG93TG9hZGluZyhUaGlzLmxvYWRpbmdUZXh0KTtcbiAgICAgICAgICAgICAgVGhpcy5mZXRjaENoaWxkRGF0YSgoKT0+e1xuICAgICAgICAgICAgICAgIFRoaXMudXBkYXRlTWFwKGN1ckxWTCwgY2hhcnQsIGUpO1xuICAgICAgICAgICAgICAgIGNoYXJ0LnN1YnRpdGxlLnVwZGF0ZSh7dGV4dDogVGhpcy5zdWJ0aXRsZX0pO1xuICAgICAgICAgICAgICAgIGNoYXJ0LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkcmlsbHVwYWxsOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgVGhpcy5jdXJMVkwgPSBUaGlzLmN1ckxWTC5wYXJlbnQ7XG4gICAgICAgICAgICBpZiAoVGhpcy5jdXJMVkwpIHtcbiAgICAgICAgICAgICAgZS50YXJnZXQuc3VidGl0bGUudXBkYXRlKHt0ZXh0OiBUaGlzLnN1YnRpdGxlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2VyaWVzOiBUaGlzLmluaXRpYWxpemVNYXAoW3tcbiAgICAgICAgc2hvd0luTGVnZW5kOiBmYWxzZSxcbiAgICAgICAgbWFwRGF0YTogSGlnaGNoYXJ0cy5tYXBzW1RoaXMuaW5pdGlhbE1hcF1cbiAgICAgIH1dKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBmZXRjaGVzIGNoaWxkVGFibGUgYW5kIHBhcnNlcyBpdHMgZGF0YSBieSBhcHBlbmRpbmcgaXQgdG8gYC5fZGF0YWAgaW4gYGhpZXJhcmNoeWAgbm9kZXMuXG4gICAqIFlvdSBtYXkgb3ZlcnJpZGUgdGhpcyBtZXRob2QgYnV0IG1ha2Ugc3VyZSB5b3UgZXhlY3V0ZSBhIGNhbGxiYWNrIHBhc3NlZCBhcyBpdHMgcGFyYW1ldGVyXG4gICAqICovXG4gIGZldGNoQ2hpbGREYXRhKGNhbGxiYWNrKSB7XG4gICAgY29uc3Qge2lkLHBhcmVudCxzdWJjZWxsc30gPSB0aGlzLmN1ckxWTDtcbiAgICByZXR1cm4gQXN5bmNIaWVyYXJjaHlUYWJsZS5mZXRjaENoaWxkVGFibGUoaWQsIHBhcmVudCA/IHBhcmVudC5pZCA6IG51bGwsIHRoaXMudGFibGVJRCwgdGhpcy5wYWdlU3RhdGVJZClcbiAgICAgIC50aGVuKHRhYmxlID0+IHtcbiAgICAgIC8vIHBhcnNlIGRhdGEgbG9hZGVkIGZyb20gdGFibGVcbiAgICAgIHRoaXMucGFyc2VUYWJsZURhdGEoe1xuICAgICAgICBzb3VyY2U6IHRhYmxlLFxuICAgICAgICBleGNsdWRlUm93czogMCxcbiAgICAgICAgcm93aGVhZGVyczogc3ViY2VsbHMubWFwKGx2bCA9PiBsdmwuaWQpLFxuICAgICAgfSk7XG4gICAgICBjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2s9PT0nZnVuY3Rpb24nICYmIGNhbGxiYWNrKClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHNlcmlhbGl6ZWQgZGF0YXNldCBmb3IgYSB0b29sdGlwXG4gICAqICovXG4gIGdldFRvb2x0aXAoKSB7XG4gICAgbGV0IGRhdGEgPSB0aGlzLmN1ckxWTC5fZGF0YTtcbiAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB0aGlzLmdlbmVyYXRlVG9vbHRpcFJvdyhpdGVtLnRpdGxlLCBge3BvaW50LmRhdGEuJHtpbmRleH0udmFsdWV9YCkpLmpvaW4oXCI8YnIgLz5cIilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgY2hhcnQgc3VidGl0bGUgcmV0dXJuaW5nIHJlZ2lvbiBhbmQgbWFpbiB2YWx1ZSBvZiBmdWxsIGluZm8gYmFzZWQgb24gYGZ1bGxQYXJlbnRMZXZlbEluZm9gXG4gICAqICovXG4gIGdldCBzdWJ0aXRsZSgpIHtcbiAgICBpZiAodGhpcy5mdWxsUGFyZW50TGV2ZWxJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJMVkwuX2RhdGEubWFwKGl0ZW0gPT4gdGhpcy5nZW5lcmF0ZVRvb2x0aXBSb3coaXRlbS50aXRsZSwgaXRlbS52YWx1ZSkpLmpvaW4oJzxiciAvPicpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudExldmVsID0gdGhpcy5jdXJMVkwuX2RhdGFbMF0sXG4gICAgICAgIGN1cnJlbnRMZXZlbCA9IHRoaXMuY3VyTFZMLl9kYXRhW3RoaXMudmFsdWVDb2x1bW5dO1xuXG4gICAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLmdlbmVyYXRlVG9vbHRpcFJvdyhwYXJlbnRMZXZlbC50aXRsZSwgcGFyZW50TGV2ZWwudmFsdWUpLFxuICAgICAgICB0aGlzLmdlbmVyYXRlVG9vbHRpcFJvdyhjdXJyZW50TGV2ZWwudGl0bGUsIGN1cnJlbnRMZXZlbC52YWx1ZSlcbiAgICAgIF0uam9pbignPGJyIC8+JylcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVRvb2x0aXBSb3cobGFiZWwsIHZhbHVlKSB7XG4gICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGV2ZWwtbGFiZWxcIj4nICsgbGFiZWwgKyAnOiA8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxldmVsLXZhbHVlXCI+JyArIHZhbHVlICsgJzwvc3Bhbj4nXG4gIH1cblxuICAvKipcbiAgICogZ2V0IHN1YmNlbGwgYnkgdGV4dCByYXRoZXIgdGhhbiBieSBpZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhlIHN1YmNlbGwgd2UncmUgbG9va2luZyBmb3JcbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhIHN1YmNlbGwgd2hpY2ggaGFzIHRoYXQgbmFtZVxuICAgKiAqL1xuICBnZXRMZXZlbEJ5TmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VyTFZMLnN1YmNlbGxzLmZpbHRlcihlbCA9PiBlbC50ZXh0ID09PSBuYW1lKVswXTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgY3VzdG9tIGdlb0pTT04gZmlsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbWFwRGF0YSAtIGluaXRpYWwgbWFwXG4gICAqIEBwYXJhbSB7QXJyYXl9Y291bnRyaWVzTGlzdCAtIGxpc3Qgb2YgY291bnRyaWVzIElEc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWFwTmFtZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiAqL1xuICBzdGF0aWMgY3JlYXRlQ3VzdG9tR2VvSlNPTihtYXBEYXRhLCBjb3VudHJpZXNMaXN0LCBtYXBOYW1lKSB7XG4gICAgbGV0IGdlb2pzb24gPSB7XG4gICAgICB0aXRsZTogXCJcIixcbiAgICAgIHZlcnNpb246IFwiMC4xLjBcIixcbiAgICAgIHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICAgIGNvcHlyaWdodDogXCJDb3B5cmlnaHQgKGMpIDIwMTUgSGlnaHNvZnQgQVMsIEJhc2VkIG9uIGRhdGEgZnJvbSBOYXR1cmFsIEVhcnRoXCIsXG4gICAgICBjb3B5cmlnaHRTaG9ydDogXCJOYXR1cmFsIEVhcnRoXCIsXG4gICAgICBjb3B5cmlnaHRVcmw6IFwiaHR0cDovL3d3dy5uYXR1cmFsZWFydGhkYXRhLmNvbVwiLFxuICAgICAgY3JzOiB7XG4gICAgICAgIHR5cGU6IFwibmFtZVwiLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgbmFtZTogXCJ1cm46b2djOmRlZjpjcnM6RVBTRzo1NDAwM1wiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImhjLXRyYW5zZm9ybVwiOiB7XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjcnM6IFwiK3Byb2o9bWlsbCArbGF0XzA9MCArbG9uXzA9MCAreF8wPTAgK3lfMD0wICtSX0EgK2RhdHVtPVdHUzg0ICt1bml0cz1tICtub19kZWZzXCIsXG4gICAgICAgICAgc2NhbGU6IDEuNzIxODI3ODE2NTRlLTA1LFxuICAgICAgICAgIGpzb25yZXM6IDE1LjUsXG4gICAgICAgICAganNvbm1hcmdpblg6IC05OTksXG4gICAgICAgICAganNvbm1hcmdpblk6IDk4NTEuMCxcbiAgICAgICAgICB4b2Zmc2V0OiAtMTk0OTUzNTYuMzY5MyxcbiAgICAgICAgICB5b2Zmc2V0OiAxMjYzNTkwOC4xOTgyXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmZWF0dXJlczogRHJpbGxkb3duTWFwLmdldEZlYXR1cmVzKGNvdW50cmllc0xpc3QsIG1hcERhdGEpXG4gICAgfTtcblxuICAgIGdlb2pzb24udGl0bGUgPSBtYXBOYW1lO1xuICAgIHJldHVybiBnZW9qc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhcnJheSBvZiBmZWF0dXJlcyBmcm9tIGdlb0pTT04gZmlsZVxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gY291bnRyaWVzTGlzdCAtIGNvdW50cmllcyBJRHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hcERhdGEgLSB5b3VyIGluaXRpYWwgbWFwXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgZm9yIGdlb2pzb24gZmVhdHVyZXMgY29tcGFyaW5nXG4gICAqIEByZXR1cm5zIHtBcnJheX0gZmVhdHVyZXMgbGlzdFxuICAgKiAqL1xuICBzdGF0aWMgZ2V0RmVhdHVyZXMoY291bnRyaWVzTGlzdCwgbWFwRGF0YSwga2V5ID0gXCJoYy1rZXlcIikge1xuICAgIGlmICh0eXBlb2YgY291bnRyaWVzTGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtYXBEYXRhLmZlYXR1cmVzLmZpbHRlcihmZWF0dXJlID0+IGZlYXR1cmUucHJvcGVydGllc1trZXldID09PSBjb3VudHJpZXNMaXN0KTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY291bnRyaWVzTGlzdCkpIHtcbiAgICAgIHJldHVybiBtYXBEYXRhLmZlYXR1cmVzLmZpbHRlcihmZWF0dXJlID0+IGNvdW50cmllc0xpc3QuaW5kZXhPZihmZWF0dXJlLnByb3BlcnRpZXNba2V5XSkgIT09IC0xKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgc2VyaWVzIGZvciB0aGUgZmlyc3QgdGltZSBtYXAgaW5pdGlhbGl6YXRpb25cbiAgICogQHBhcmFtIHtBcnJheX0gW3Nlcmllcz1bXV0gLSBzZXJpZXNcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKiAqL1xuICBpbml0aWFsaXplTWFwKHNlcmllcyA9IFtdKSB7XG4gICAgdGhpcy5jdXJMVkwuc3ViY2VsbHMuZm9yRWFjaChzdWJjZWxsID0+IHtcbiAgICAgIGlmIChzdWJjZWxsLm1hcElEKSB7XG4gICAgICAgIGxldCBzZXJpZXNJdGVtID0gdGhpcy5jb21wb3NlU2VyaWVzKHN1YmNlbGwpO1xuICAgICAgICBzZXJpZXMucHVzaChzZXJpZXNJdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc2VyaWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgbWFwIGZyb20gSGlnaE1hcHMgbWFwIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNvdXJjZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICogKi9cbiAgc3RhdGljIGxvYWRNYXAoc291cmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeXtcbiAgICAgICAgalF1ZXJ5LmdldFNjcmlwdCgnaHR0cHM6Ly9jb2RlLmhpZ2hjaGFydHMuY29tL21hcGRhdGEvJyArIHNvdXJjZSArICcuanMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVzb2x2ZShIaWdoY2hhcnRzLm1hcHNbc291cmNlXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaChlcnJvcil7XG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtYWluIHZhbHVlIHRoYXQgdGhlIGNoYXJ0IGlzIGJ1aWx0IG9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsZXZlbCAtIGxldmVsIHVuZGVyIGV4YW1pbmF0aW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZUNvbHVtbiAtIFplcm8tYmFzZWQgY29sdW1uIGluZGV4IHRoYXQgY29udGFpbnMgcHJpbWFyeSB2YWx1ZSB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIG1hcCBjb2xvcmluZ1xuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHByaW1hcnkgdmFsdWVcbiAgICogKi9cbiAgc3RhdGljIGdldFByaW1hcnlWYWx1ZShsZXZlbCwgdmFsdWVDb2x1bW4pIHtcbiAgICByZXR1cm4gbGV2ZWwuX2RhdGFbdmFsdWVDb2x1bW5dLnZhbHVlO1xuICB9XG5cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHNpbmdsZSBzZXJpZXMgZGF0YSBmb3IgSGlnaE1hcCBzZXJpZXMgb3B0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsZXZlbCAtIGEgbGV2ZWwgaW4gaGllcmFyY2h5XG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqICovXG4gIGdldFNlcmllc0RhdGEobGV2ZWwpIHtcbiAgICBsZXQgZHJpbGxkb3duID0gbGV2ZWwuc3ViY2VsbHMgPyBsZXZlbC50ZXh0IDogbnVsbDtcbiAgICBpZiAodHlwZW9mIGxldmVsLm1hcElEID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIFt7XG4gICAgICAgIGRyaWxsZG93bjogZHJpbGxkb3duLFxuICAgICAgICBjb2RlOiBsZXZlbC5tYXBJRCxcbiAgICAgICAgdmFsdWU6IERyaWxsZG93bk1hcC5nZXRQcmltYXJ5VmFsdWUobGV2ZWwsIHRoaXMudmFsdWVDb2x1bW4pLFxuICAgICAgICBkYXRhOiBsZXZlbC5fZGF0YSxcbiAgICAgIH1dXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGxldmVsLm1hcElEKSkge1xuICAgICAgcmV0dXJuIGxldmVsLm1hcElELm1hcChtYXBJRCA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkcmlsbGRvd246IGRyaWxsZG93bixcbiAgICAgICAgICBjb2RlOiBtYXBJRCxcbiAgICAgICAgICB2YWx1ZTogRHJpbGxkb3duTWFwLmdldFByaW1hcnlWYWx1ZShsZXZlbCwgdGhpcy52YWx1ZUNvbHVtbiksXG4gICAgICAgICAgZGF0YTogbGV2ZWwuX2RhdGEsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEYXRhIGVsZW1lbnQgaXMgY29ycnVwdGVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBgY29sb3JGbmAgcGFzc2VkIGJ5IHVzZXIgdG8gY29tcHV0ZSBjb2xvciBieSBwYXNzaW5nIGB2YWx1ZWAgYW5kIGB0YXJnZXRgIHRvIGl0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbG9yRm4gLSBjb2xvciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSB2YWx1ZSB0byB0ZXN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0YXJnZXQgLSB0YXJnZXQgZm9yIHRoZSBsZXZlbFxuICAgKiAqL1xuICBzdGF0aWMgY29tcHV0ZUNvbG9yKGNvbG9yRm4sIHZhbHVlLCB0YXJnZXQpIHtcbiAgICBpZiAoY29sb3JGbikge1xuICAgICAgcmV0dXJuIGNvbG9yRm4odmFsdWUsIHRhcmdldClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzaW5nbGUgbWFwcG9pbnQgc2VyaWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdWJjZWxsIC0gYSBzaW5nbGUgaGllcmFyY2h5IGVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hcERhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYXJ0IC0gcmVmZXJlbmNlIHRvIGNoYXJ0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXJpZXMgZm9yIG1hcCBwb2ludHNcbiAgICogKi9cbiAgZ2V0Q29vcmRpbmF0ZVNlcmllcyhzdWJjZWxsLCBtYXBEYXRhLCBjaGFydCkge1xuICAgIGNoYXJ0Lm1hcFRyYW5zZm9ybXMgPSBtYXBEYXRhID8gbWFwRGF0YVtcImhjLXRyYW5zZm9ybVwiXSA6IEhpZ2hjaGFydHMubWFwc1tcImN1c3RvbS93b3JsZC1oaWdocmVzMlwiXVtcImhjLXRyYW5zZm9ybVwiXTtcbiAgICBsZXQgcG9zID0gY2hhcnQuZnJvbUxhdExvblRvUG9pbnQoe2xhdDogc3ViY2VsbC5jb29yZGluYXRlc1swXSwgbG9uOiBzdWJjZWxsLmNvb3JkaW5hdGVzWzFdfSk7XG4gICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgIHR5cGU6IFwibWFwcG9pbnRcIixcbiAgICAgIG5hbWU6IHN1YmNlbGwudGV4dCxcbiAgICAgIG1hcmtlcjoge1xuICAgICAgICBsaW5lQ29sb3I6IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoOiAxLFxuICAgICAgICByYWRpdXM6IDQsXG4gICAgICAgIHN5bWJvbDogXCJjaXJjbGVcIixcbiAgICAgIH0sXG4gICAgICBkYXRhOiBbe1xuICAgICAgICBjb2xvcjogRHJpbGxkb3duTWFwLmNvbXB1dGVDb2xvcih0aGlzLmNvbG9yRm4sIERyaWxsZG93bk1hcC5nZXRQcmltYXJ5VmFsdWUoc3ViY2VsbCwgdGhpcy52YWx1ZUNvbHVtbiksIHN1YmNlbGwudGFyZ2V0KSxcbiAgICAgICAgbmFtZTogc3ViY2VsbC50ZXh0LFxuICAgICAgICB2YWx1ZTogc3ViY2VsbC52YWx1ZSxcbiAgICAgICAgeDogcG9zLngsXG4gICAgICAgIHk6IHBvcy55XG4gICAgICB9XVxuICAgIH07XG4gICAgaWYgKHRoaXMubWFwcG9pbnRDYWxsYmFjaykge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgY29uZmlnLmV2ZW50cyA9IHtcbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2VsZi5tYXBwb2ludENhbGxiYWNrLmNhbGwodGhpcywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBzaW5nbGUgc2VyaWVzIGl0ZW0gZm9yIEhpZ2htYXBzIHNlcmllcyBvcHRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IHN1YmNlbGwgLSBhIHN1YmNlbGxcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hcERhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYXJ0IC0gcmVmZXJlbmNlIHRvIGNoYXJ0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHNlcmllc1xuICAgKiAqL1xuICBjb21wb3NlU2VyaWVzKHN1YmNlbGwsIG1hcERhdGEsIGNoYXJ0KSB7XG4gICAgaWYgKCFzdWJjZWxsLmNvb3JkaW5hdGVzKSB7XG4gICAgICBtYXBEYXRhID0gbWFwRGF0YSA/IEhpZ2hjaGFydHMuZ2VvanNvbihEcmlsbGRvd25NYXAuY3JlYXRlQ3VzdG9tR2VvSlNPTihtYXBEYXRhLCBzdWJjZWxsLm1hcElELCBzdWJjZWxsLnRleHQpKSA6IEhpZ2hjaGFydHMuZ2VvanNvbihEcmlsbGRvd25NYXAuY3JlYXRlQ3VzdG9tR2VvSlNPTihIaWdoY2hhcnRzLm1hcHNbJ2N1c3RvbS93b3JsZC1oaWdocmVzMiddLCBzdWJjZWxsLm1hcElELCBzdWJjZWxsLnRleHQpKTtcbiAgICAgIGlmIChzdWJjZWxsLm1hcElEKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBzdWJjZWxsLnRhcmdldDtcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gdGhpcy5oaWVyYXJjaHlbMF0udGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogc3ViY2VsbC50ZXh0LFxuICAgICAgICAgIGRhdGFMYWJlbHM6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzLmRhdGFbMF1bXCJoYy1rZXlcIl0gPT09IHRoaXMucG9pbnRbXCJoYy1rZXlcIl0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWVzLm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgIHBvaW50Rm9ybWF0OiB0aGlzLmdldFRvb2x0aXAoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29sb3I6IERyaWxsZG93bk1hcC5jb21wdXRlQ29sb3IodGhpcy5jb2xvckZuLCBEcmlsbGRvd25NYXAuZ2V0UHJpbWFyeVZhbHVlKHN1YmNlbGwsIHRoaXMudmFsdWVDb2x1bW4pLCB0YXJnZXQpLFxuICAgICAgICAgIGFsbEFyZWFzOiBmYWxzZSxcbiAgICAgICAgICBwYXJlbnQ6IHN1YmNlbGwucGFyZW50LnRleHQsXG4gICAgICAgICAgbWFwRGF0YSxcbiAgICAgICAgICBqb2luQnk6IFsnaGMta2V5JywgJ2NvZGUnXSxcbiAgICAgICAgICBkYXRhOiB0aGlzLmdldFNlcmllc0RhdGEoc3ViY2VsbClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29vcmRpbmF0ZVNlcmllcyhzdWJjZWxsLCBtYXBEYXRhLCBjaGFydClcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHlvdXIgbWFwIHZpZXcgYWZ0ZXIgZHJpbGxkb3duIGNsaWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdXJMVkxcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYXJ0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIC0gZHJpbGxkb3duIGV2ZW50IG9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGN1ckxWTFxuICAgKiAqL1xuICB1cGRhdGVNYXAoY3VyTFZMLCBjaGFydCwgZSkge1xuICAgIGlmIChjdXJMVkwgJiYgY3VyTFZMLm1hcE5hbWUpIHsvLyBpZiB3ZSBoYXZlIGFub3RoZXIgbWFwIHRvIGxvYWRcbiAgICAgIGxldCBtYXAgPSBEcmlsbGRvd25NYXAubG9hZE1hcChjdXJMVkwubWFwTmFtZSk7XG4gICAgICBtYXAudGhlbihtYXBEYXRhID0+IHtcbiAgICAgICAgdGhpcy5hZGRTZXJpZXMoY3VyTFZMLCBjaGFydCwgZSwgbWFwRGF0YSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY3VyTFZMICYmICFjdXJMVkwubWFwTmFtZSkge1xuICAgICAgdGhpcy5hZGRTZXJpZXMoY3VyTFZMLCBjaGFydCwgZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBvc2VzIGEgc2VyaWVzIGZvciB5b3VyIEhpZ2hNYXBzIG9wdGlvbnMgY29uZmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdXJMVkxcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYXJ0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIC0gZHJpbGxkb3duIGV2ZW50IG9iamVjdFxuICAgKiBAcGFyYW0ge09iamVjdH0gbWFwRGF0YSAtIG1hcERhdGEgZ2VvSlNPTlxuICAgKiAqL1xuICBhZGRTZXJpZXMoY3VyTFZMLCBjaGFydCwgZSwgbWFwRGF0YSkge1xuICAgIGlmIChjdXJMVkwuc3ViY2VsbHMpIHsgLy8gaWYgaXQncyBhbiBlbmQgcG9pbnRcbiAgICAgIGlmIChjdXJMVkwuc3ViY2VsbHNbMF0uY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgbGV0IHNlcmllc0l0ZW0gPSB0aGlzLmNvbXBvc2VTZXJpZXMoY3VyTFZMLCBtYXBEYXRhLCBjaGFydCk7XG4gICAgICAgIHNlcmllc0l0ZW0uZGF0YS5mb3JFYWNoKGRhdGFJdGVtID0+IHtcbiAgICAgICAgICBkYXRhSXRlbS5kcmlsbGRvd24gPSBudWxsO1xuICAgICAgICAgIGRhdGFJdGVtLnZhbHVlID0gbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgY2hhcnQuYWRkU2luZ2xlU2VyaWVzQXNEcmlsbGRvd24oZS5wb2ludCwgc2VyaWVzSXRlbSk7XG4gICAgICB9XG4gICAgICBjdXJMVkwuc3ViY2VsbHMuZm9yRWFjaChzdWJjZWxsID0+IHtcbiAgICAgICAgaWYgKCFzdWJjZWxsLm1hcElEICYmICFzdWJjZWxsLmNvb3JkaW5hdGVzKSByZXR1cm47XG4gICAgICAgIGxldCBzZXJpZXNJdGVtID0gdGhpcy5jb21wb3NlU2VyaWVzKHN1YmNlbGwsIG1hcERhdGEsIGNoYXJ0KTtcbiAgICAgICAgY2hhcnQuYWRkU2luZ2xlU2VyaWVzQXNEcmlsbGRvd24oZS5wb2ludCwgc2VyaWVzSXRlbSk7XG4gICAgICB9KTtcbiAgICAgIGNoYXJ0LmFwcGx5RHJpbGxkb3duKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzZXJpZXNJdGVtID0gdGhpcy5jb21wb3NlU2VyaWVzKGN1ckxWTCwgbWFwRGF0YSwgY2hhcnQpO1xuICAgICAgc2VyaWVzSXRlbS5kYXRhLm1hcChkYXRhSXRlbSA9PiB7XG4gICAgICAgIGRhdGFJdGVtLmRyaWxsZG93biA9IG51bGw7XG4gICAgICAgIGRhdGFJdGVtLnZhbHVlID0gbnVsbFxuICAgICAgfSk7XG4gICAgICBjaGFydC5hZGRTZXJpZXNBc0RyaWxsZG93bihlLnBvaW50LCBzZXJpZXNJdGVtKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9EcmlsbGRvd25NYXAuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMjYuMTIuMjAxNi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwSGllcmFyY2h5IHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgdGhpcy5kZWNsYXJlR2xvYmFscyhjb25maWcse1xuICAgICAgICBub3JtYWxzOiB7fSxcbiAgICAgICAgbm9ybWFsc1NlcGFyYXRvcjogJywnLFxuICAgICAgfSxcbiAgICAgIHRoaXMudHlwZUNoZWNrKGNvbmZpZylcbiAgICApO1xuXG4gICAgaWYodGhpcy5mbGF0SGllcmFyY2h5ICYmICF0aGlzLmhpZXJhcmNoeSl7XG4gICAgICB0aGlzLmhpZXJhcmNoeT10aGlzLmNvbXBvc2VUcmVlSGllcmFyY2h5KCk7XG4gICAgfSBlbHNlIGlmKCF0aGlzLmZsYXRIaWVyYXJjaHkgJiYgdGhpcy5oaWVyYXJjaHkpe1xuICAgICAgdGhpcy5mbGF0SGllcmFyY2h5ID0gdGhpcy5jb21wb3NlRmxhdEhpZXJhcmNoeSgpXG4gICAgfVxuICAgIHRoaXMuYWRkTWFwSURzVG9IaWVyYXJjaHlMZXZlbCgpO1xuICAgIHJldHVybiB7aGllcmFyY2h5OnRoaXMuaGllcmFyY2h5LCBmbGF0SGllcmFyY2h5OnRoaXMuZmxhdEhpZXJhcmNoeX1cbiAgfVxuXG4gIGRlY2xhcmVHbG9iYWxzKGNvbmZpZywgZGVmYXVsdHMgPSB7fSwgdHlwZUNoZWNrID0ge30pIHtcbiAgICBjb25zdCBtaXhlZE9wdGlvbnMgPSB7Li4uY29uZmlnLCAuLi5kZWZhdWx0c307XG4gICAgT2JqZWN0LmtleXMobWl4ZWRPcHRpb25zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAodHlwZUNoZWNrW2tleV0gJiYgdHlwZW9mIHR5cGVDaGVja1trZXldID09PSAnZnVuY3Rpb24nKSB0eXBlQ2hlY2tba2V5XShtaXhlZE9wdGlvbnNba2V5XSk7XG4gICAgICB0aGlzW2tleV0gPSBtaXhlZE9wdGlvbnNba2V5XTtcbiAgICB9KVxuICB9XG5cbiAgdHlwZUNoZWNrKG9wdHMpe1xuICAgIGlmKG9wdHMuZmxhdEhpZXJhcmNoeSl7XG4gICAgICBpZih0eXBlb2Ygb3B0cy5mbGF0SGllcmFyY2h5ICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJmbGF0SGllcmFyY2h5XCIgbXVzdCBiZSBhbiBPYmplY3QgYnV0IGl0IGlzIGEgJysgdHlwZW9mIG9wdHMuZmxhdEhpZXJhcmNoeSk7XG4gICAgICBpZihPYmplY3Qua2V5cyhvcHRzLmZsYXRIaWVyYXJjaHkpLmxlbmd0aD09PTApIGNvbnNvbGUuZXJyb3IoJ2ZsYXRIaWVyYXJjaHkgaGFzIG5vIG5vZGVzIGluIGl0Jyk7XG4gICAgfVxuXG4gICAgaWYob3B0cy5oaWVyYXJjaHkpe1xuICAgICAgaWYoIUFycmF5LmlzQXJyYXkob3B0cy5oaWVyYXJjaHkpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImhpZXJhcmNoeVwiIG11c3QgYmUgYW4gQXJyYXkgYnV0IGl0IGlzIGEgJysgdHlwZW9mIG9wdHMuaGllcmFyY2h5KTtcbiAgICAgIGlmKG9wdHMuaGllcmFyY2h5Lmxlbmd0aD09PTApIGNvbnNvbGUuZXJyb3IoJ2hpZXJhcmNoeSBoYXMgbm8gbm9kZXMgaW4gaXQnKTtcbiAgICB9XG5cbiAgICBpZighb3B0cy5mbGF0SGllcmFyY2h5ICYmICFvcHRzLmhpZXJhcmNoeSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignZWl0aGVyIFwiZmxhdEhpZXJhcmNoeVwiIG9yIFwiaGllcmFyY2h5XCIgbXVzdCBiZSBwYXNzZWQgZm9yIG1hcCB0byB3b3JrJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbm9ybWFsc1NlcGFyYXRvcjogZnVuY3Rpb24oKXtpZih0eXBlb2Ygb3B0cy5ub3JtYWxzU2VwYXJhdG9yICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJub3JtYWxzU2VwYXJhdG9yXCIgbXVzdCBiZSBhbiBTdHJpbmcgYnV0IGl0IGlzIGEgJysgdHlwZW9mIG9wdHMubm9ybWFsc1NlcGFyYXRvcil9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBoaWVyYXJjaHkgYXJyYXkgYnkgYXNzaWduaW5nIHBhcmVudC1jaGlsZCByZWxhdGlvbnMgYW5kIHJldHVybmluZyB0aG9zZSB0aGF0IGRvbid0IGhhdmUgYSBwYXJlbnRcbiAgICogKi9cbiAgY29tcG9zZVRyZWVIaWVyYXJjaHkoKSB7XG4gICAgbGV0IG9ycGhhbkl0ZW1zID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMuZmxhdEhpZXJhcmNoeSkge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZsYXRIaWVyYXJjaHlba2V5XTtcbiAgICAgIHRoaXMubm9ybWFsaXplKGl0ZW0pO1xuICAgICAgaWYgKHRoaXMuX2l0ZW1IYXNQYXJlbnQoaXRlbSkpIHtcbiAgICAgICAgdGhpcy5fYXNzaWduUGFyZW50VG9JdGVtKGl0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JwaGFuSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9ycGhhbkl0ZW1zXG4gIH1cblxuICAvKipcbiAgICogbm9ybWFsaXplcyBhIHN0cmluZyB2YWx1ZSB0byBhIGNlcnRhaW4gZm9ybWF0LlxuICAgKiAtIGBhcnJheVN0cmluZ2AgLSBub3JtYWxpemVzIGNvbW1hLXNlcGFyYXRlZCBpdGVtcyB0byBhbiBBcnJheSBvZiBTdHJpbmdzLCBpLmUgXCJoYWhhXCIsIFwibGFsYVwiIHdvdWxkIGJlIFtcImhhaGFcIiwgXCJsYWxhXCJdXG4gICAqIC0gYGFycmF5TnVtYmVyYCAtIG5vcm1hbGl6ZXMgY29tbWEtc2VwYXJhdGVkIGl0ZW1zIHRvIGFuIEFycmF5IG9mIEZsb2F0cywgaS5lIFwiLTEzLjQxXCIsIFwiNDguNjZcIiB3b3VsZCBiZSBbLTEzLjQxLCA0OC42Nl1cbiAgICogLSBgc3RyaW5nYCAtIHJldHVybnMgdGhlIHN0cmluZyBhcyBpc1xuICAgKiAtIGBudW1iZXJgIC0gcGFyc2VzIHRoZSBzdHJpbmcgYXMgYSBGbG9hdFxuICAgKiAtIGBib29sZWFuYCAtIHBhcnNlcyB0aGUgc3RyaW5nIGFzIGEgQm9vbGVhbiwgY2FzZSBpbnNlbnNpdGl2ZVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIGl0ZW0gdG8gbWF0Y2ggY29udGVudHMgYWdhaW5zdCBgbm9ybWFsc2BcbiAgICogKi9cbiAgbm9ybWFsaXplKGl0ZW0pIHtcbiAgICBpZiAodGhpcy5zaG91bGROb3JtYWxpemUpIHtcbiAgICAgIGxldCBwYXJzZXIgPSB7XG4gICAgICAgIHN0cmluZ0FycmF5OiB2YWwgPT4gdmFsLnNwbGl0KHRoaXMubm9ybWFsc1NlcGFyYXRvciksXG4gICAgICAgIG51bWJlckFycmF5OiB2YWwgPT4gdmFsLnNwbGl0KHRoaXMubm9ybWFsc1NlcGFyYXRvcikubWFwKGkgPT4gcGFyc2VGbG9hdChpKSksXG4gICAgICAgIHN0cmluZzogdmFsID0+IHZhbC50cmltKCksXG4gICAgICAgIG51bWJlcjogdmFsID0+IHZhbCAhPT0gbnVsbCAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSA/IHBhcnNlRmxvYXQodmFsKSA6IG51bGwsXG4gICAgICAgIGJvb2xlYW46IHZhbCA9PiB2YWwudG9Mb3dlckNhc2UoKSA9PT0gXCJ0cnVlXCIgfHwgdmFsID09PSBcIjFcIlxuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgbm9ybWFsIGluIHRoaXMubm9ybWFscykge1xuICAgICAgICBpZiAoaXRlbVtub3JtYWxdKSB7Ly8gcHJvcGVydHkgZXhpc3RzIGluIG9iamVjdFxuICAgICAgICAgIGlmIChpdGVtW25vcm1hbF0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaXRlbVtub3JtYWxdID0gcGFyc2VyW3RoaXMubm9ybWFsc1tub3JtYWxdXShpdGVtW25vcm1hbF0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtW25vcm1hbF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaXRlbUhhc1BhcmVudChpdGVtKXtcbiAgICByZXR1cm4gaXRlbS5wYXJlbnQgJiYgaXRlbS5wYXJlbnQgIT09IG51bGwgJiYgaXRlbS5wYXJlbnQubGVuZ3RoID4gMFxuICB9XG5cbiAgX2Fzc2lnblBhcmVudFRvSXRlbShpdGVtKXtcbiAgICBpdGVtLnBhcmVudCA9IHRoaXMuZmxhdEhpZXJhcmNoeVtpdGVtLnBhcmVudF07XG4gICAgaXRlbS5wYXJlbnQuc3ViY2VsbHMgPSBpdGVtLnBhcmVudC5zdWJjZWxscyB8fCBbXTtcbiAgICBpdGVtLnBhcmVudC5zdWJjZWxscy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgZ2V0IHNob3VsZE5vcm1hbGl6ZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5ub3JtYWxzKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgY29tcG9zZUZsYXRIaWVyYXJjaHkoKSB7XG4gICAgbGV0IGZsYXRIaWVyYXJjaHkgPSB7fTtcbiAgICBjb25zdCBzaG91bGROb3JtYWxpemUgPSB0aGlzLnNob3VsZE5vcm1hbGl6ZTtcbiAgICB0aGlzLmhpZXJhcmNoeS5mb3JFYWNoKFxuICAgICAgaXRlbSA9PiB7XG4gICAgICAgIGlmIChzaG91bGROb3JtYWxpemUpIHRoaXMubm9ybWFsaXplKGl0ZW0pO1xuICAgICAgICBmbGF0SGllcmFyY2h5W2l0ZW0uaWRdID0gaXRlbTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBmbGF0SGllcmFyY2h5O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgaW5pdGlhbCBoaWVyYXJjaHlcbiAgICogQHBhcmFtIGhpZXJhcmNoeVxuICAgKiBAcGFyYW0gcGFyZW50IC0gaGllcmFyY2h5IGxldmVsIHBhcmVudFxuICAgKi9cbiAgYWRkTWFwSURzVG9IaWVyYXJjaHlMZXZlbChoaWVyYXJjaHk9dGhpcy5oaWVyYXJjaHksIHBhcmVudCA9IG51bGwpIHtcbiAgICBoaWVyYXJjaHkuZm9yRWFjaChzdWJjZWxsID0+IHtcbiAgICAgIHRoaXMuaW5oZXJpdE1hcE5hbWUoc3ViY2VsbCk7XG4gICAgICBpZiAoc3ViY2VsbC5zdWJjZWxscykge1xuICAgICAgICB0aGlzLmFkZE1hcElEc1RvSGllcmFyY2h5TGV2ZWwoc3ViY2VsbC5zdWJjZWxscywgc3ViY2VsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1YmJsZU1hcElkKHN1YmNlbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5oZXJpdE1hcE5hbWUoaXRlbSl7XG4gICAgaWYgKHRoaXMucGFyZW50SGFzTWFwTmFtZShpdGVtKSkge1xuICAgICAgaXRlbS5tYXBOYW1lID0gaXRlbS5wYXJlbnQubWFwTmFtZTtcbiAgICB9XG4gIH1cblxuICBidWJibGVNYXBJZChpdGVtKXtcbiAgICBpZiAoaXRlbS5wYXJlbnQgJiYgaXRlbS5tYXBJRCAmJiAhaXRlbS5wYXJlbnQubWFwTmFtZSkge1xuICAgICAgaWYgKCFpdGVtLnBhcmVudC5tYXBJRCkgaXRlbS5wYXJlbnQubWFwSUQgPSBbXTtcbiAgICAgIGl0ZW0ucGFyZW50Lm1hcElEID0gaXRlbS5wYXJlbnQubWFwSUQuY29uY2F0KGl0ZW0ubWFwSUQpO1xuICAgIH1cbiAgfVxuXG4gIHBhcmVudEhhc01hcE5hbWUoaXRlbSl7XG4gICAgcmV0dXJuIGl0ZW0ucGFyZW50ICYmIGl0ZW0ucGFyZW50ICE9PSBudWxsICYmIGl0ZW0ucGFyZW50Lm1hcE5hbWVcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC1oaWVyYXJjaHkuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yLWFnZ3JlZ2F0ZWQtdGFibGUvc3JjL2FnZ3JlZ2F0ZWQtdGFibGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yLXNvcnQtdGFibGUvc3JjL3NvcnQtdGFibGUtc3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci1zdHlsZXMuY3NzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RyaWxsZG93bi1tYXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9