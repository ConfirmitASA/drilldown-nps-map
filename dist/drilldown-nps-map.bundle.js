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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYTYwNmU1MDk1ZWMxYjAxM2Q2OCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItcmVwb3J0YWwtYmFzZS9zcmMvcmVwb3J0YWwtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvdGFibGUtZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvYWdncmVnYXRlZC10YWJsZS1yb3ctbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvYWdncmVnYXRlZC10YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ItYXN5bmMtaGllcmFyY2h5LXRhYmxlL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy9zb3J0LW9yZGVyLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy9zb3J0LXRhYmxlLmpzIiwid2VicGFjazovLy8uL34vci1zb3J0LXRhYmxlL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1jb2x1bW5zL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1jb2x1bW5zL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwid2VicGFjazovLy8uL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJpbGxkb3duTWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXAtaGllcmFyY2h5LmpzIiwid2VicGFjazovLy8uL34vci1hZ2dyZWdhdGVkLXRhYmxlL3NyYy9hZ2dyZWdhdGVkLXRhYmxlLmNzcyIsIndlYnBhY2s6Ly8vLi9+L3Itc29ydC10YWJsZS9zcmMvc29ydC10YWJsZS1zdHlsZXMuY3NzIiwid2VicGFjazovLy8uL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci1zdHlsZXMuY3NzIiwid2VicGFjazovLy8uL3NyYy9kcmlsbGRvd24tbWFwLmNzcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJSZXBvcnRhbCIsIm1peGluIiwiRHJpbGxkb3duTWFwIiwiUmVwb3J0YWxCYXNlIiwidGFyZ2V0Iiwic291cmNlIiwiaSIsImxldmVsIiwiYXJncyIsImxlbmd0aCIsIkFycmF5IiwiaXNBcnJheSIsImNvbnNvbGUiLCJhcHBseSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsIl9sb2dnZXIiLCJuYW1lIiwiZXZlbnQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50Iiwic3RyIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwicmVwbGFjZSIsIlVSTCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiRXJyb3IiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsImUiLCJzZW5kIiwidmFyaWFibGUiLCJxdWVyeSIsImxvY2F0aW9uIiwic2VhcmNoIiwic3Vic3RyaW5nIiwidmFycyIsInNwbGl0IiwicGFpciIsInRvTG93ZXJDYXNlIiwiVGFibGVEYXRhIiwibXVsdGlkaW1lbnNpb25hbCIsImJsb2NrcyIsInBhcmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWQiLCJmb3JFYWNoIiwiYmxvY2tDZWxsIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2VsbCIsInJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJpc051bWJlciIsInRleHRDb250ZW50IiwidHJpbSIsIm9wdGlvbnMiLCJleGNsdWRlQmxvY2siLCJleGNsdWRlQ29sdW1ucyIsImV4Y2x1ZGVSb3dzIiwiZGlyZWN0aW9uIiwiZGF0YSIsInRhZ05hbWUiLCJyb3dzIiwidGVtcEFycmF5IiwidW5kZWZpbmVkIiwic3BsaWNlIiwic29ydCIsImEiLCJiIiwicmV2ZXJzZSIsInJvdyIsImNvbnRhaW5zIiwicHVzaCIsImNlbGxzIiwiY2hpbGRyZW4iLCJ0ZW1wX2V4Y2x1ZGVDb2x1bW5zIiwiaW5kZXgiLCJyb3dTcGFuIiwicHJlcGFyZURhdGFDZWxsIiwicmVhbEluZGV4IiwiVHlwZUVycm9yIiwiQWdncmVnYXRlZFRhYmxlUm93TWV0YSIsIm5hbWVDZWxsIiwiYmxvY2siLCJmaXJzdEluQmxvY2siLCJzdHlsZXMiLCJyZXF1aXJlIiwiYWdncmVnYXRlZFRhYmxlQ1NTIiwiQWdncmVnYXRlZFRhYmxlIiwicm93aGVhZGVyQ29sdW1uSW5kZXgiLCJkZWZhdWx0SGVhZGVyUm93IiwiZGF0YVN0cmlwRGlyZWN0aW9uIiwic29ydGluZyIsImZsb2F0aW5nSGVhZGVyIiwicmVmU291cmNlIiwiaGVhZGVyIiwiY29uc3RydWN0b3IiLCJkZXRlY3RNdWx0aWRpbWVuc2lvbmFsIiwiZ2V0RGF0YSIsInJlb3JkZXJGdW5jdGlvbiIsInJlb3JkZXJSb3dzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbHVtbnMiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJkaW1lbnNpb25hbERhdGFJdGVyYXRvciIsImRhdGFEaW1lbnNpb24iLCJyZXBvc2l0aW9uQmxvY2tDZWxsIiwiYXBwZW5kQ2hpbGQiLCJpdGVtIiwicXVlcnlTZWxlY3RvciIsIml0ZW1zIiwiYmxvY2tSb3dJdGVtIiwiZmlsdGVyIiwiYmxvY2tSb3ciLCJpbmRleE9mIiwibmV3Rmlyc3RSb3ciLCJpbnNlcnRCZWZvcmUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInJlbW92ZSIsImNhbGxiYWNrIiwiZGltZW5zaW9uIiwiQXN5bmNIaWVyYXJjaHlUYWJsZSIsImhpZXJhcmNoeUlEIiwiaGllcmFyY2h5Q29udHJvbElEIiwicGFnZVN0YXRlSUQiLCJsYW5ndWFnZUNvZGUiLCJwYXRoIiwib3JpZ2luIiwiZ2V0UXVlcnlWYXJpYWJsZSIsImVuY29kZSIsIklzUHJldmlldyIsIkhpZXJhcmNoeUNvbnRyb2xJZCIsImhpZXJhcmNoeUl0ZW1DaGlsZHJlbiIsInByb21pc2VSZXF1ZXN0Iiwiam9pbiIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZSIsInBhcmVudElEIiwidGFibGVJRCIsIk5vZGVJZCIsIlRleHQiLCJ0YWJsZVJlc3VsdCIsImhvc3QiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwidGFibGUiLCJleGNsdWRlZFJvd3MiLCJ0b0VuY29kZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN0cmluZ2lmeSIsIlNvcnRPcmRlciIsInNvcnRDYWxsYmFjayIsImRlZmF1bHRTb3J0aW5nIiwic29ydENhbGxiYWNrU2NvcGUiLCJzb3J0T3JkZXIiLCJyZWZDZWxsIiwib2JqIiwiZ2V0Q2VsbCIsImNvbHVtbiIsImNsYXNzTmFtZSIsIlNvcnRUYWJsZSIsImluY2x1ZGVkIiwiZXhjbHVkZWQiLCJfc29ydEV2ZW50IiwibmV3RXZlbnQiLCJzb3J0YWJsZUNvbHVtbnMiLCJkZWZpbmVTb3J0YWJsZUNvbHVtbnMiLCJzcmMiLCJsaXN0ZW5Gb3JTb3J0IiwiZ2V0SGVhZGVyIiwic28iLCJzb3J0RGltZW5zaW9uIiwiZGlzcGF0Y2hFdmVudCIsInNvcnRhYmxlIiwiZGVsZWdhdGVkVGFyZ2V0IiwiY2xpY2tlZENvbHVtbiIsImdldEluZGV4IiwiZ2V0RGlyZWN0aW9uIiwic29ydGVyIiwibGVzc2VyIiwicmVnZXgiLCJ0ZXN0IiwidGVtcEVsMSIsInRlbXBFbDIiLCJUYWJsZUNvbHVtbnMiLCJ0aGVhZCIsInJlZlRoZWFkIiwiY29tcHV0ZUNvbHVtbnMiLCJkZWZhdWx0SGVhZGVyUm93SW5kZXgiLCJoZWFkZXJSb3dzIiwiaGVhZGVyUm93SW5kZXgiLCJnZXREZWZhdWx0SGVhZGVyUm93Iiwicm93c0xlbmd0aCIsImFic3RyIiwiciIsImF1Z21lbnRJbmRleCIsInJzIiwicm93QSIsImNvbFNwYW4iLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiayIsInRoZWFkQ2VsbHMiLCJnZXRIZWFkZXJDZWxscyIsInJlZlRoZWFkQ2VsbHMiLCJyZWFsQ29sdW1uSW5kZXgiLCJ0aXRsZSIsIlRhYmxlRmxvYXRpbmdIZWFkZXJTdHlsZSIsIlRhYmxlRmxvYXRpbmdIZWFkZXIiLCJ3cmFwVGFibGUiLCJjbG9uZUhlYWRlciIsInZpc2libGUiLCJfbWV0YSIsImxhc3RTY3JvbGxZIiwic291cmNlVEhFQUQiLCJ0aWNraW5nIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZXNpemVGaXhlZCIsInNjcm9sbEZpeGVkIiwicmVxdWVzdFRpY2siLCJfcmVzaXplQ2FsbGJhY2siLCJiaW5kIiwicGFnZVlPZmZzZXQiLCJfc2Nyb2xsQ2FsbGJhY2siLCJ0YWJsZU9mZnNldFRvcCIsIm9mZnNldFRvcCIsInRhYmxlT2Zmc2V0Qm90dG9tIiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJkaXNwbGF5Iiwid3JhcHBlciIsImNsb25lTm9kZSIsImNoaWxkIiwibm9kZU5hbWUiLCJyZW1vdmVDaGlsZCIsImluaXRpYWxIZWFkZXIiLCJjbG9uZWRIZWFkZXIiLCJoZWFkZXJXaWR0aCIsIm9mZnNldFdpZHRoIiwid2lkdGhzIiwiYyIsIndpZHRoIiwiY2FsY09mZnNldEhlaWdodCIsIm9mZnNldCIsInNldFZpc2liaWxpdHkiLCJ0b3AiLCJjb25maWciLCJkZWNsYXJlR2xvYmFscyIsImluaXRpYWxNYXAiLCJ2YWx1ZUNvbHVtbiIsImZ1bGxQYXJlbnRMZXZlbEluZm8iLCJjb2xvckZuIiwidmFsdWUiLCJwYWdlU3RhdGVJZCIsImxvYWRpbmdUZXh0IiwidHlwZUNoZWNrIiwiZmxhdEhpZXJhcmNoeSIsImhpZXJhcmNoeSIsIm5vcm1hbHMiLCJub3JtYWxzU2VwYXJhdG9yIiwicGFyc2VUYWJsZURhdGEiLCJkcmF3TWFwIiwiZGVmYXVsdHMiLCJtaXhlZE9wdGlvbnMiLCJrZXkiLCJvcHRzIiwiSGlnaGNoYXJ0cyIsIm1hcHMiLCJyb3doZWFkZXJzIiwibG9jYWxOYW1lIiwiY29udGFpbmVySUQiLCJtYXBwb2ludENhbGxiYWNrIiwiY2IiLCJyaCIsImFnZ3JlZ2F0ZWRUYWJsZSIsInJvd0hlYWRlciIsIl9kYXRhIiwiZGF0YUl0ZW0iLCJjdXJMVkwiLCJtYXBDaGFydCIsIm1hcENvbmZpZyIsImdlbmVyYXRlVG9vbHRpcFJvdyIsImxhYmVsIiwic3ViY2VsbHMiLCJlbCIsInRleHQiLCJzZXJpZXMiLCJzdWJjZWxsIiwibWFwSUQiLCJzZXJpZXNJdGVtIiwiY29tcG9zZVNlcmllcyIsImRyaWxsZG93biIsImNvZGUiLCJnZXRQcmltYXJ5VmFsdWUiLCJtYXBEYXRhIiwiY2hhcnQiLCJtYXBUcmFuc2Zvcm1zIiwicG9zIiwiZnJvbUxhdExvblRvUG9pbnQiLCJsYXQiLCJjb29yZGluYXRlcyIsImxvbiIsInR5cGUiLCJtYXJrZXIiLCJsaW5lQ29sb3IiLCJsaW5lV2lkdGgiLCJyYWRpdXMiLCJzeW1ib2wiLCJjb2xvciIsImNvbXB1dGVDb2xvciIsIngiLCJ5Iiwic2VsZiIsImV2ZW50cyIsImNsaWNrIiwiZ2VvanNvbiIsImNyZWF0ZUN1c3RvbUdlb0pTT04iLCJkYXRhTGFiZWxzIiwiZW5hYmxlZCIsImZvcm1hdHRlciIsInBvaW50IiwidG9vbHRpcCIsInBvaW50Rm9ybWF0IiwiZ2V0VG9vbHRpcCIsImFsbEFyZWFzIiwicGFyZW50Iiwiam9pbkJ5IiwiZ2V0U2VyaWVzRGF0YSIsImdldENvb3JkaW5hdGVTZXJpZXMiLCJtYXBOYW1lIiwibG9hZE1hcCIsImFkZFNlcmllcyIsImFkZFNpbmdsZVNlcmllc0FzRHJpbGxkb3duIiwiYXBwbHlEcmlsbGRvd24iLCJhZGRTZXJpZXNBc0RyaWxsZG93biIsIlRoaXMiLCJsYW5nIiwiZHJpbGxVcFRleHQiLCJsZWdlbmQiLCJwbG90T3B0aW9ucyIsInN0YXRlcyIsIm5vcm1hbCIsImFuaW1hdGlvbiIsIm1vdXNlT3ZlciIsInNldFN0YXRlIiwibW91c2VPdXQiLCJtYXBOYXZpZ2F0aW9uIiwiYnV0dG9ucyIsInpvb21JbiIsInZlcnRpY2FsQWxpZ24iLCJ6b29tT3V0Iiwic3VidGl0bGUiLCJhbGlnbiIsImZsb2F0aW5nIiwiZHJpbGxVcEJ1dHRvbiIsInBvc2l0aW9uIiwicmVsYXRpdmVUbyIsImdldExldmVsQnlOYW1lIiwic2hvd0xvYWRpbmciLCJjaGlsZFRhYmxlIiwibHZsIiwidXBkYXRlTWFwIiwidXBkYXRlIiwiaGlkZUxvYWRpbmciLCJkcmlsbHVwYWxsIiwiaW5pdGlhbGl6ZU1hcCIsInNob3dJbkxlZ2VuZCIsImZldGNoQ2hpbGRUYWJsZSIsInBhcmVudExldmVsIiwiY3VycmVudExldmVsIiwiY291bnRyaWVzTGlzdCIsInZlcnNpb24iLCJjb3B5cmlnaHQiLCJjb3B5cmlnaHRTaG9ydCIsImNvcHlyaWdodFVybCIsImNycyIsInByb3BlcnRpZXMiLCJkZWZhdWx0Iiwic2NhbGUiLCJqc29ucmVzIiwianNvbm1hcmdpblgiLCJqc29ubWFyZ2luWSIsInhvZmZzZXQiLCJ5b2Zmc2V0IiwiZmVhdHVyZXMiLCJnZXRGZWF0dXJlcyIsImZlYXR1cmUiLCJqUXVlcnkiLCJnZXRTY3JpcHQiLCJlcnJvciIsIk1hcEhpZXJhcmNoeSIsImNvbXBvc2VUcmVlSGllcmFyY2h5IiwiY29tcG9zZUZsYXRIaWVyYXJjaHkiLCJhZGRNYXBJRHNUb0hpZXJhcmNoeUxldmVsIiwib3JwaGFuSXRlbXMiLCJub3JtYWxpemUiLCJfaXRlbUhhc1BhcmVudCIsIl9hc3NpZ25QYXJlbnRUb0l0ZW0iLCJzaG91bGROb3JtYWxpemUiLCJwYXJzZXIiLCJzdHJpbmdBcnJheSIsInZhbCIsIm51bWJlckFycmF5Iiwic3RyaW5nIiwibnVtYmVyIiwiYm9vbGVhbiIsImluaGVyaXRNYXBOYW1lIiwiYnViYmxlTWFwSWQiLCJwYXJlbnRIYXNNYXBOYW1lIiwiY29uY2F0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLFFBQU9DLFFBQVAsR0FBa0JELE9BQU9DLFFBQVAsSUFBbUIsRUFBckM7QUFDQSx5QkFBYUMsS0FBYixDQUFtQkYsT0FBT0MsUUFBMUIsRUFBbUM7QUFDakNFLHVDQURpQztBQUVqQ0M7QUFGaUMsRUFBbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0NMTUEsWTs7Ozs7Ozs7O0FBRUo7Ozs7Ozs7Ozs7OzsyQkFZYUMsTSxFQUFRQyxNLEVBQVE7QUFDM0IsWUFBSyxJQUFJQyxDQUFULElBQWNELE1BQWQsRUFBc0I7QUFDcEJELGdCQUFPRSxDQUFQLElBQVlELE9BQU9DLENBQVAsQ0FBWjtBQUNEO0FBQ0QsY0FBT0YsTUFBUDtBQUNEOzs7NkJBRWNHLEssRUFBT0MsSSxFQUFNO0FBQzFCO0FBQ0EsV0FBSUEsS0FBS0MsTUFBTCxLQUFnQixDQUFoQixJQUFxQkMsTUFBTUMsT0FBTixDQUFjSCxLQUFLLENBQUwsQ0FBZCxDQUF6QixFQUFpRDtBQUMvQ0EsZ0JBQU9BLEtBQUssQ0FBTCxDQUFQO0FBQ0Q7QUFDRDtBQUNBLGVBQU9ELEtBQVA7QUFDRSxjQUFLLEtBQUw7QUFDQSxjQUFLLE1BQUw7QUFDQSxjQUFLLE9BQUw7QUFDRUssbUJBQVFMLEtBQVIsRUFBZU0sS0FB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Q0FBWSxLQUFLOEQsT0FBakIsRUFBMEI3USxNQUExQixHQUFtQyxDQUExQztBQUNEOzs7Ozs7bUJBMUdrQmlaLFk7Ozs7Ozs7QUNIckIsMEM7Ozs7OztBQ0FBLDBDOzs7Ozs7QUNBQSwwQzs7Ozs7OztBQ0FBLDBDIiwiZmlsZSI6ImRyaWxsZG93bi1ucHMtbWFwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWE2MDZlNTA5NWVjMWIwMTNkNjgiLCJcbmltcG9ydCBEcmlsbGRvd25NYXAgZnJvbSBcIi4vRHJpbGxkb3duTWFwXCI7XG5pbXBvcnQgUmVwb3J0YWxCYXNlIGZyb20gXCJyLXJlcG9ydGFsLWJhc2VcIjtcblxud2luZG93LlJlcG9ydGFsID0gd2luZG93LlJlcG9ydGFsIHx8IHt9O1xuUmVwb3J0YWxCYXNlLm1peGluKHdpbmRvdy5SZXBvcnRhbCx7XG4gIERyaWxsZG93bk1hcCxcbiAgUmVwb3J0YWxCYXNlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgRHJpbGxkb3duTWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImNsYXNzIFJlcG9ydGFsQmFzZSB7XG5cbiAgLyoqXG4gICAqIENvcGllcyBwcm9wcyBmcm9tIGEgc291cmNlIG9iamVjdCB0byBhIHRhcmdldCBvYmplY3QuXG4gICAqXG4gICAqIE5vdGUsIHRoaXMgbWV0aG9kIHVzZXMgYSBzaW1wbGUgYGZvci4uLmluYCBzdHJhdGVneSBmb3IgZW51bWVyYXRpbmdcbiAgICogcHJvcGVydGllcy4gIFRvIGVuc3VyZSBvbmx5IGBvd25Qcm9wZXJ0aWVzYCBhcmUgY29waWVkIGZyb20gc291cmNlXG4gICAqIHRvIHRhcmdldCBhbmQgdGhhdCBhY2Nlc3NvciBpbXBsZW1lbnRhdGlvbnMgYXJlIGNvcGllZCwgdXNlIGBleHRlbmRgLlxuICAgKlxuICAgKiBAbWV0aG9kIG1peGluXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgU291cmNlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAgICogQHJldHVybiB7T2JqZWN0fSBUYXJnZXQgb2JqZWN0IHRoYXQgd2FzIHBhc3NlZCBhcyBmaXJzdCBhcmd1bWVudC5cbiAgICovXG4gIHN0YXRpYyBtaXhpbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGZvciAodmFyIGkgaW4gc291cmNlKSB7XG4gICAgICB0YXJnZXRbaV0gPSBzb3VyY2VbaV07XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBzdGF0aWMgX2xvZ2dlcihsZXZlbCwgYXJncykge1xuICAgIC8vIGFjY2VwdCBbJ2ZvbycsICdiYXInXSBhbmQgW1snZm9vJywgJ2JhciddXVxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICBhcmdzID0gYXJnc1swXTtcbiAgICB9XG4gICAgLy8gb25seSBhY2NlcHQgbG9nZ2luZyBmdW5jdGlvbnNcbiAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgIGNhc2UgJ2xvZyc6XG4gICAgICBjYXNlICd3YXJuJzpcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgY29uc29sZVtsZXZlbF0uYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfbG9nKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICB0aGlzLl9sb2dnZXIoJ2xvZycsIGFyZ3MpO1xuICB9XG5cbiAgc3RhdGljIF93YXJuKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICB0aGlzLl9sb2dnZXIoJ3dhcm4nLCBhcmdzKTtcbiAgfVxuXG4gIHN0YXRpYyBfZXJyb3IoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIHRoaXMuX2xvZ2dlcignZXJyb3InLCBhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmFtZWQgZXZlbnQgd2l0aCBgbmFtZWBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBuYW1lIG9mIHRoZSBldmVudFxuICAgKiBAcmV0dXJuIHtFdmVudH0gUmV0dXJucyBhIGNyZWF0ZWQgZXZlbnRcbiAgICogKi9cbiAgc3RhdGljIG5ld0V2ZW50KG5hbWUpe1xuICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGV2ZW50LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlKTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICAvKipcbiAgICogSW5zcGVjdHMgaWYgdGhlIGN1cnJlbnQgc3RyaW5nIG1pZ2h0IGJlIGNvbnZlcnRlZCB0byBudW1iZXIgYW5kIHJlbmRlcnMgaXQgYXMgbnVtYmVyLiBJZiBzdHJpbmcgbGVuZ3RoIGlzIDAsIHJldHVybnMgYG51bGxgLiBJZiBub25lIGFwcGxpZXMgcmV0dXJucyB0aGUgc3RyaW5nIGFzIGlzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIC0gdmFsdWUgb2YgdGhlIGNlbGwgaWYgbm90IEhUTUwgY29udGVudHNcbiAgICogQHJldHVybiB7TnVtYmVyfG51bGx8U3RyaW5nfVxuICAgKiAqL1xuICBzdGF0aWMgaXNOdW1iZXIoc3RyKXtcbiAgICBpZighaXNOYU4ocGFyc2VGbG9hdChzdHIpKSl7XG4gICAgICBzdHIgPSBzdHIucmVwbGFjZSgvLC9pLCcnKTsvLyByZW1vdmUgdW5uZWNlc3NhcnkgY29tbWEgYXMgYSBkZWxpbWl0ZXIgZm9yIHRob3VzYW5kcyBmcm9tIGRhdGEuXG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xuICAgIH0gZWxzZSBpZihzdHIubGVuZ3RoPT0wKXtyZXR1cm4gbnVsbH0gZWxzZSB7cmV0dXJuIHN0cn1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gWEhSIHdyYXBwZWQgaW4gYSBQcm9taXNlXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gVVJMIC0gdXJsIHRvIHNlbmQgYSBgR0VUYCByZXF1ZXN0IHRvXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgYSB0aGVuLWFibGUgcHJvbWlzZSB3aXRoIGBYTUxIdHRwUmVxdWVzdC5yZXNwb25zZVRleHRgXG4gICAqICovXG4gIHN0YXRpYyBwcm9taXNlUmVxdWVzdChVUkwpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignR0VUJywgVVJMLCB0cnVlKTtcbiAgICAgIHhoci5vbmxvYWQgPSBlPT57eGhyLnN0YXR1cyA9PSAyMDA/cmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTpyZWplY3QoRXJyb3IoYCR7eGhyLnN0YXR1c306ICR7eGhyLnN0YXR1c1RleHR9YCkpO31cbiAgICAgIHhoci5vbmVycm9yID0gZT0+e3JlamVjdChlKX1cbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHZhcmlhYmxlIGxpc3RlZCBpbiBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtIHshU3RyaW5nfSB2YXJpYWJsZSAtIHZhcmlhYmxlIG5hbWUgdG8gZ2V0IHZhbHVlIGZvclxuICAgKiBAcGFyYW0ge1N0cmluZz19IFtxdWVyeT13aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKV0gLSB0aGUgcXVlcnkgc3RyaW5nIHRvIHNlYXJjaCB2YXJpYWJsZSBmb3IgaW5cbiAgICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm5zIHZhbHVlIGZvciB0aGUgdmFyaWFibGVcbiAgICogKi9cbiAgc3RhdGljIGdldFF1ZXJ5VmFyaWFibGUodmFyaWFibGUscXVlcnk9d2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpe1xuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuICAgIGZvciAodmFyIGk9MDtpPHZhcnMubGVuZ3RoO2krKykge1xuICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgIGlmKChwYWlyWzBdKS50b0xvd2VyQ2FzZSgpID09IHZhcmlhYmxlLnRvTG93ZXJDYXNlKCkpe3JldHVybiBwYWlyWzFdO31cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0YWxCYXNlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItcmVwb3J0YWwtYmFzZS9zcmMvcmVwb3J0YWwtYmFzZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDIxLjA5LjIwMTYuXHJcbiAqL1xyXG5pbXBvcnQgUmVwb3J0YWxCYXNlIGZyb20gXCJyLXJlcG9ydGFsLWJhc2VcIjtcclxuLy9pbXBvcnQgVGFibGVEYXRhUm93TWV0YSBmcm9tIFwiLi9UYWJsZURhdGFSb3dNZXRhXCI7XHJcblxyXG4vKipcclxuICogQSBiYXNlIGNsYXNzIGZvciBzdHJpcHBpbmcgZGF0YSBmcm9tIEhUTUwgdGFibGVzXHJcbiAqICovXHJcbmNsYXNzIFRhYmxlRGF0YSB7XHJcbiAgLyoqXHJcbiAgICogRGV0ZWN0cyBpZiB0aGUgZGF0YXNldCBpcyBtdWx0aS1kaW1lbnRpb25hbCBhbmQgc2V0cyBjbGFzc2VzIG9uIGl0ZW1zOiBhIHJvd3NwYW5uaW5nIGNlbGwgZ2V0cyBhIGAuYmxvY2tDZWxsYCBhbmQgdGhlIHJvdyBjb250YWluaW5nIGl0IGEgYC5maXJzdEluQmxvY2tgXHJcbiAgICogX19Eb2Vzbid0IHdvcmsgd2l0aCBgSG9yaXpvbnRhbCBQZXJjZW50c2AgZW5hYmxlZCFfX1xyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gc291cmNlIC0gc291cmNlIHRhYmxlXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyBpZiB0aGUgZGF0YSBpbiB0YWJsZSBpcyBtdWx0aS1kaW1lbnRpb25hbFxyXG4gICAqICovXHJcbiAgc3RhdGljIGRldGVjdE11bHRpZGltZW5zaW9uYWwoc291cmNlKXtcclxuICAgIGxldCBtdWx0aWRpbWVuc2lvbmFsID0gZmFsc2U7XHJcbiAgICBsZXQgYmxvY2tzID0gc291cmNlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChgdGFibGUjJHtzb3VyY2UuaWR9PnRib2R5PnRyPnRkOm50aC1jaGlsZCgxKVtyb3dzcGFuXWApO1xyXG4gICAgaWYoYmxvY2tzLmxlbmd0aD4wKXtcclxuICAgICAgbXVsdGlkaW1lbnNpb25hbCA9IHRydWU7XHJcbiAgICAgIFtdLnNsaWNlLmNhbGwoYmxvY2tzKS5mb3JFYWNoKGJsb2NrQ2VsbD0+e1xyXG4gICAgICAgIGJsb2NrQ2VsbC5jbGFzc0xpc3QuYWRkKCdibG9ja0NlbGwnKTtcclxuICAgICAgICBibG9ja0NlbGwucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdmaXJzdEluQmxvY2snKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbXVsdGlkaW1lbnNpb25hbFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0cmFjdHMgZGF0YSBmcm9tIGEgZ2l2ZW4gY2VsbC4gT3ZlcnJpZGUgaW4gYW4gaW5oZXJpdGVkIGNsYXNzIGlmIHlvdSBuZWVkIHRvIGFkZCBhbnkgbWV0YWRhdGEgdG8gaXQuXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVDZWxsRWxlbWVudH0gY2VsbCAtIGNlbGwgZWxlbWVudCB0byBoYXZlIGRhdGEgc3RyaXBwZWQgb2ZmIGl0XHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVDZWxsRWxlbWVudH0gcm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGl0J3MgaW5cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUNlbGxFbGVtZW50fSBjb2x1bW5JbmRleCAtIGluZGV4IG9mIHRoZSBjb2x1bW4gaXQncyBpblxyXG4gICAqIEByZXR1cm5zIHs/U3RyaW5nfD9OdW1iZXJ9IFJldHVybnMgYSBgU3RyaW5nYCwgYSBgTnVtYmVyYCBvciBhIGBudWxsYCAoaWYgZGF0YSBpcyBhYnNlbnQgaW4gdGhlIGNlbGwgb3IgaXRzIHRleHQgY29udGVudCBib2lscyBkb3duIHRvIGFuIGVtcHR5IHN0cmluZyAtIGkuZS4gdGhlcmUgYXJlIG5vIGNoYXJhY3RlcnMgaW4gdGhlIGNlbGwsIG9ubHkgSFRNTCB0YWdzKVxyXG4gICAqICovXHJcbiAgc3RhdGljIHByZXBhcmVEYXRhQ2VsbChjZWxsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpe1xyXG4gICByZXR1cm4gUmVwb3J0YWxCYXNlLmlzTnVtYmVyKGNlbGwudGV4dENvbnRlbnQudHJpbSgpKTtcclxuICAgIC8qcmV0dXJuIHtcclxuICAgICAgICBjZWxsLFxyXG4gICAgICAgIGRhdGE6IFJlcG9ydGFsQmFzZS5pc051bWJlcihjZWxsLnRleHRDb250ZW50LnRyaW0oKSksXHJcbiAgICAgICAgcm93SW5kZXgsXHJcbiAgICAgICAgY29sdW1uSW5kZXhcclxuICAgICAgfSovXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHVuaXZlcnNhbCBkYXRhLWV4dHJhY3Rpb24gZnVuY3Rpb24uIEl0IHN0cmlwcyBkYXRhIGZyb20gYSB0YWJsZSdzIGJvZHkuIERhdGEgY2FuIGJlIHN0cmlwcGVkIGJ5IHJvd3MgKGhvcml6b250YWxseSkgb3IgYnkgY29sdW1ucyAodmVydGljYWxseSkgd2hpY2ggaXMgY29udHJvbGxlZCBieSBgZGlyZWN0aW9uYC4gSXQgYWNjb3VudHMgZm9yIGEgc3Bhbm5pbmcgYmxvY2sgY2VsbCBhbmQgbWF5IGV4Y2x1ZGUgaXQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHRvIGNvbmZpZ3VyZSB0aGUgd2F5IGRhdGEgaXMgc3RyaXBwZWQgb2ZmIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgdGhhdCB3aWxsIGJlIGFuIGlucHV0IGZvciBkYXRhIHN0cmlwcGluZ1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nPX0gb3B0aW9ucy5kaXJlY3Rpb249J3JvdycgLSBkaXJlY3Rpb24gaW4gd2hpY2ggZGF0YSBzdHJpcHBpbmcgd2lsbCBvY2N1cjogYHJvd2Agc3RyaXBzIGFjcm9zcyByb3dzIGFuZCBwcmVzZW50cyBhbiBhcnJheSB3aGVyZSBlYWNoIGFycmF5IGl0ZW0gaXMgYW4gYXJyYXkgb2YgY2VsbCB2YWx1ZXMuIGBjb2x1bW5gIHN0cmlwcyB2YWx1ZXMgdmVydGljYWx5IGluIGEgY29sdW1uLCB0aGUgcmVzdWx0aW5nIGFycmF5IHdpbGwgY29udGFpbiBhcnJheXMgKHBlciBjb2x1bW4pIHdpdGggdmFsdWVzIHJlc2VtYmxpbmcgbm9ybWFsaXplZCBkYXRhIGZvciBjZWxscyBpbiB0aGUgY29sdW1uXHJcbiAgICogQHBhcmFtIHtCb29sZWFuPX0gW29wdGlvbnMuZXhjbHVkZUJsb2NrPXRydWVdIC0gaWYgdGFibGUgY29udGFpbnMgYmxvY2sgY2VsbHMgdGhhdCByb3dzcGFuIGFjcm9zcyBzZXZlcmFsIHJvd3MsIHdlIG1pZ2h0IG5lZWQgdG8gZXhjbHVkZSB0aG9zZSBmcm9tIGFjdHVhbCBkYXRhXHJcbiAgICogQHBhcmFtIHtBcnJheXxOdW1iZXJ9IFtvcHRpb25zLmV4Y2x1ZGVDb2x1bW5zXSAtIGlmIHRhYmxlIGNvbnRhaW5zIGNvbHVtbnMgdGhhdCBhcmUgbm90IHRvIGJlIGluIGRhdGEsIHRoZW4gcGFzcyBhIHNpbmdsZSBpbmRleCBvciBhbiBhcnJheSBvZiBjZWxsIGluZGljZXMgKDAtYmFzZWQpLiBZb3UgbmVlZCB0byBjb3VudCBjb2x1bW5zIG5vdCBieSBoZWFkZXJzIGJ1dCBieSB0aGUgY2VsbHMgaW4gcm93cy5cclxuICAgKiBAcGFyYW0ge0FycmF5fE51bWJlcn0gW29wdGlvbnMuZXhjbHVkZVJvd3NdIC0gaWYgdGFibGUgY29udGFpbnMgcm93cyB0aGF0IGFyZSBub3QgdG8gYmUgaW4gZGF0YSwgdGhlbiBwYXNzIGEgc2luZ2xlIGluZGV4IG9yIGFuIGFycmF5IG9mIHJvdyBpbmRpY2VzICgwLWJhc2VkKS4gWW91IG5lZWQgdG8gY291bnQgb25seSByb3dzIHRoYXQgY29udGFpbiBkYXRhLCBub3QgdGhlIHRhYmxlLWhlYWRlciByb3dzLlxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbj19IG9wdGlvbnMubXVsdGlkaW1lbnNpb25hbD1mYWxzZSAtIHdoZXRoZXIgdGhlIHRhYmxlIGhhcyBhZ2dyZWdhdGluZyBjZWxscyB0aGF0IGFnZ3JlZ2F0ZSByb3doZWFkZXJzLiBSZXN1bHQgb2Yge0BsaW5rIFRhYmxlRGF0YSNkZXRlY3RNdWx0aWRpbWVuc2lvbmFsfSBtYXkgYmUgcGFzc2VkIGhlcmUgdG8gYXV0b21hdGljYWxseSBjYWxjdWxhdGUgaWYgaXQgaGFzIGFnZ3JlZ2F0aW5nIGNlbGxzLlxyXG4gICAqIEByZXR1cm5zIHtBcnJheX0gcmV0dXJucyBkYXRhIGFycmF5LlxyXG4gICAqICovXHJcbiAgc3RhdGljIGdldERhdGEob3B0aW9ucyl7XHJcbiAgICBsZXQge3NvdXJjZSxleGNsdWRlQmxvY2s9dHJ1ZSxleGNsdWRlQ29sdW1ucyxleGNsdWRlUm93cyxkaXJlY3Rpb249J3JvdycsbXVsdGlkaW1lbnNpb25hbD1mYWxzZX09b3B0aW9ucztcclxuICAgIGxldCBkYXRhID0gW107XHJcbiAgICBpZihzb3VyY2UgJiYgc291cmNlLnRhZ05hbWUgPT0gJ1RBQkxFJyl7XHJcbiAgICAgIGxldCByb3dzID0gW10uc2xpY2UuY2FsbChzb3VyY2UucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKGB0YWJsZSMke3NvdXJjZS5pZH0+dGJvZHk+dHJgKSk7XHJcbiAgICAgIGlmKHJvd3MubGVuZ3RoPjApe1xyXG4gICAgICAgIGxldCB0ZW1wQXJyYXk9W107XHJcbiAgICAgICAgLy8gYWNjb3VudCBmb3IgYSBuZWdhdGl2ZSByb3cgbnVtYmVyIChgLTFgKSBtZWFuaW5nIGxhc3Qgcm93XHJcbiAgICAgICAgaWYodHlwZW9mIGV4Y2x1ZGVSb3dzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBpZih0eXBlb2YgZXhjbHVkZVJvd3MgPT0gJ251bWJlcicpe1xyXG4gICAgICAgICAgICAvLyBmb3Igbm9uLWJsb2NrIHJvd3MgaW4gbXVsdGlkaW1lbnNpb25hbFxyXG4gICAgICAgICAgICBpZihleGNsdWRlUm93czwwKXsgLy8gYWNjb3VudCBmb3IgYSBuZWdhdGl2ZSBjb2x1bW4gbnVtYmVyIChlLmcuYC0xYCkgbWVhbmluZyBsYXN0IGNvbHVtblxyXG4gICAgICAgICAgICAgIGV4Y2x1ZGVSb3dzPSByb3dzLmxlbmd0aCtleGNsdWRlUm93cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dzLnNwbGljZShleGNsdWRlUm93cywxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZXhjbHVkZVJvd3MpKXtcclxuICAgICAgICAgICAgZXhjbHVkZVJvd3Muc29ydCgoYSxiKT0+e3JldHVybiBhPmI/MTotMX0pLnJldmVyc2UoKTsgLy9zb3J0IHRvIHNwbGljZSBmcm9tIHRoZSBlbmQgb2YgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIGV4Y2x1ZGVSb3dzLmZvckVhY2goaT0+e1xyXG4gICAgICAgICAgICAgIGlmKGk+PTApe1xyXG4gICAgICAgICAgICAgICAgcm93cy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcm93cy5zcGxpY2Uocm93cy5sZW5ndGgraSwxKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm93cy5mb3JFYWNoKChyb3cscm93SW5kZXgpPT57XHJcbiAgICAgICAgICBpZihtdWx0aWRpbWVuc2lvbmFsKXtcclxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgYHRlbXBBcnJheWAgaXMgbm90IGVtcHR5IGFuZCBwdXNoIGl0IHRvIHRoZSBgZGF0YWAgYXJyYXksIGJlY2F1c2Ugd2UndmUgZW5jb3VudGVyZWQgYSBuZXcgYmxvY2ssIHNvIHRoZSBvbGQgYmxvY2sgaGFzIHRvIGJlIHB1c2hlZCB0byBkYXRhLiBUaGVuIHdlIG5lZWQgdG8gY3JlYXRlIGEgbmV3IGJsb2NrIGFycmF5IGFuZCBwdXNoIHRoZXJlXHJcbiAgICAgICAgICAgIGlmKHJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpcnN0SW5CbG9jaycpKXtcclxuICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHRlbXBBcnJheSkgJiYgdGVtcEFycmF5Lmxlbmd0aD4wKXtkYXRhLnB1c2godGVtcEFycmF5KTt9XHJcbiAgICAgICAgICAgICAgdGVtcEFycmF5ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGlyZWN0aW9uPT0ncm93JyAmJiAhQXJyYXkuaXNBcnJheSh0ZW1wQXJyYXlbdGVtcEFycmF5Lmxlbmd0aF0pKSB7IC8vIGlmIGEgcm93IGluIGFuIGFycmF5IGRvZXNuJ3QgZXhpc3QgY3JlYXRlIGl0XHJcbiAgICAgICAgICAgIHRlbXBBcnJheVt0ZW1wQXJyYXkubGVuZ3RoXSA9IFtdO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGNhbGN1bGF0ZSB3aGljaCBjZWxscyB0byBleGNsdWRlXHJcbiAgICAgICAgICBsZXQgY2VsbHMgPSBbXS5zbGljZS5jYWxsKHJvdy5jaGlsZHJlbik7XHJcbiAgICAgICAgICBsZXQgdGVtcF9leGNsdWRlQ29sdW1ucyA9IGV4Y2x1ZGVDb2x1bW5zO1xyXG4gICAgICAgICAgaWYodHlwZW9mIHRlbXBfZXhjbHVkZUNvbHVtbnMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodHlwZW9mIHRlbXBfZXhjbHVkZUNvbHVtbnMgPT0gJ251bWJlcicpe1xyXG4gICAgICAgICAgICAgIC8vIGZvciBub24tYmxvY2sgcm93cyBpbiBtdWx0aWRpbWVuc2lvbmFsXHJcbiAgICAgICAgICAgICAgaWYobXVsdGlkaW1lbnNpb25hbCAmJiAhcm93LmNsYXNzTGlzdC5jb250YWlucygnZmlyc3RJbkJsb2NrJykgJiYgIXRlbXBfZXhjbHVkZUNvbHVtbnM8MCl7XHJcbiAgICAgICAgICAgICAgICB0ZW1wX2V4Y2x1ZGVDb2x1bW5zPXRlbXBfZXhjbHVkZUNvbHVtbnMrMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYodGVtcF9leGNsdWRlQ29sdW1uczwwKXsgLy8gYWNjb3VudCBmb3IgYSBuZWdhdGl2ZSBjb2x1bW4gbnVtYmVyIChlLmcuYC0xYCkgbWVhbmluZyBsYXN0IGNvbHVtblxyXG4gICAgICAgICAgICAgICAgdGVtcF9leGNsdWRlQ29sdW1ucz0gY2VsbHMubGVuZ3RoK3RlbXBfZXhjbHVkZUNvbHVtbnM7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNlbGxzLnNwbGljZSh0ZW1wX2V4Y2x1ZGVDb2x1bW5zLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodGVtcF9leGNsdWRlQ29sdW1ucykpe1xyXG4gICAgICAgICAgICAgIHRlbXBfZXhjbHVkZUNvbHVtbnMuc29ydCgoYSxiKT0+e3JldHVybiBhPmI/MTotMX0pLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICB0ZW1wX2V4Y2x1ZGVDb2x1bW5zLmZvckVhY2goaT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoaT49MCl7XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxzLnNwbGljZShtdWx0aWRpbWVuc2lvbmFsICYmICFyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaXJzdEluQmxvY2snKT9pKzE6aSwxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxzLnNwbGljZShjZWxscy5sZW5ndGgraSwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB3ZSB3YW50IHRvIHJ1biB0aGlzIGV2ZXJ5IHJvdyBiZWNhdXNlIG51bWJlciBvZiBjZWxscyBpbiBlYWNoIHJvdyBtYXkgZGlmZmVyIGFuZCB3ZSB3YW50IHRvIGV4Y2x1ZGUgdGhlIGxhc3Qgb25lXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGlyZWN0aW9uID09ICdzdHJpbmcnICYmIGRpcmVjdGlvbiA9PSAncm93JykgeyAvL2lmIHdlIHN0cmlwIGRhdGEgaG9yaXpvbnRhbGx5IGJ5IHJvd1xyXG4gICAgICAgICAgICAgIGlmKCEobXVsdGlkaW1lbnNpb25hbCAmJiBleGNsdWRlQmxvY2sgJiYgY2VsbC5yb3dTcGFuPjEpKXsgLy8gaWYgaXQncyBhIGJsb2NrIGNlbGwgd2UnZCBleGNsdWRlIGl0IGZyb20gZGF0YVxyXG4gICAgICAgICAgICAgICAgdGVtcEFycmF5W3RlbXBBcnJheS5sZW5ndGgtMV0ucHVzaCh0aGlzLnByZXBhcmVEYXRhQ2VsbChjZWxsLHJvd0luZGV4LGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkaXJlY3Rpb24gPT0gJ3N0cmluZycgJiYgZGlyZWN0aW9uID09ICdjb2x1bW4nKSB7IC8vaWYgd2Ugc3RyaXAgZGF0YSB2ZXJ0aWNhbGx5IGJ5IGNvbHVtblxyXG4gICAgICAgICAgICAgIGxldCByZWFsSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBpZighKG11bHRpZGltZW5zaW9uYWwgJiYgZXhjbHVkZUJsb2NrICYmIGNlbGwucm93U3Bhbj4xKSl7IC8vZXhjbHVkZSBibG9jayBjZWxsXHJcbiAgICAgICAgICAgICAgICByZWFsSW5kZXggKz0gIXJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpcnN0SW5CbG9jaycpPyAwIDogLTE7IC8vIG9mZnNldCBjZWxsIHRoYXQgZm9sbG93cyBibG9jayBjZWxsIG9uZSBwb3NpdGlvbiBiYWNrXHJcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGVtcEFycmF5W3JlYWxJbmRleF0pKSB7IC8vY3JlYXRlIGNvbHVtbiBhcnJheSBmb3IgY3VycmVudCBjb2x1bW4gaWYgbm90IGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgICB0ZW1wQXJyYXlbcmVhbEluZGV4XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGVtcEFycmF5W3JlYWxJbmRleF0ucHVzaCh0aGlzLnByZXBhcmVEYXRhQ2VsbChjZWxsLHJvd0luZGV4LHJlYWxJbmRleCkpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkaXJlY3Rpb24gaGFzIHRvYmUgYSBTdHJpbmc9PWByb3cgfCBjb2x1bW5gLCBub3QgYSAke2RpcmVjdGlvbn0nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3dlIG5lZWQgdG8gcHVzaCB0aGUgbGFzdCBibG9jayBBcnJheSBiZWNhdXNlIHRoZXJlJ2xsIGJlIG5vIGAuZmlyc3RJbkJsb2NrYCBhbnltb3JlIHRvIGRvIHRoYXRcclxuICAgICAgICBpZihtdWx0aWRpbWVuc2lvbmFsICYmIEFycmF5LmlzQXJyYXkodGVtcEFycmF5KSAmJiB0ZW1wQXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgZGF0YS5wdXNoKHRlbXBBcnJheSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGF0YSA9IHRlbXBBcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB0YWJsZSMke3NvdXJjZS5pZH0ncyBib2R5IG11c3QgY29udGFpbiByb3dzYCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NvdXJjZSBtdXN0IGJlIGRlZmluZWQgYW5kIGJlIGEgdGFibGUnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxlRGF0YVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItYWdncmVnYXRlZC10YWJsZS9zcmMvdGFibGUtZGF0YS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDE3LjA4LjIwMTYuXHJcbiAqL1xyXG4vKipcclxuICogQHByb3BlcnR5IHtIVE1MVGFibGVSb3dFbGVtZW50fSByb3cgLSByZWZlcmVuY2UgdG8gdGhlIGA8dHI+YCBlbGVtZW50XHJcbiAqIEBwcm9wZXJ0eSB7P1N0cmluZ30gaWQgLSBpbnRlcm5hbCBSZXBvcnRhbCBpZCBmb3IgdGhlIHJvd2hlYWRlciBpbiB0aGUgcm93XHJcbiAqIEBwcm9wZXJ0eSB7IUhUTUxUYWJsZUNlbGxFbGVtZW50fSBuYW1lQ2VsbCAtIHJlZmVyZW5jZSB0byB0aGUgYDx0ZD5gIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgcm93aGVhZGVyIGxhYmVsL25hbWVcclxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtuYW1lPW5hbWVDZWxsLnRleHRDb250ZW50XSAtIGxhYmVsIG9mIHRoZSByb3doZWFkZXIuXHJcbiAqIEBwcm9wZXJ0eSB7P09iamVjdH0gW2Jsb2NrPW51bGxdIC0gdGhlIGJsb2NrIHRoZSByb3cgYmVsb25ncyB0b1xyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGZpcnN0SW5CbG9jayAtIHRoaXMgYHJvd2AgaXMgZmlyc3QgaW4gdGhlIGBibG9ja2AsIHdoaWNoIG1lYW5zIGl0IGNvbnRhaW5zIHRoZSBmaXJzdCBjZWxsIGFzIGEgYmxvY2sgY2VsbFxyXG4gKiAqL1xyXG5jbGFzcyBBZ2dyZWdhdGVkVGFibGVSb3dNZXRhIHtcclxuICAvKipcclxuICAgKiBCdWlsZHMgYSBwcm90b3R5cGUgZm9yIGVhY2ggcm93IG9mIGFuIEFnZ3JlZ2F0ZWQgVGFibGVcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZVJvd0VsZW1lbnR9IHJvdyAtIHJlZmVyZW5jZSB0byB0aGUgYDx0cj5gIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gez9TdHJpbmd9IGlkIC0gaW50ZXJuYWwgUmVwb3J0YWwgaWQgZm9yIHRoZSByb3doZWFkZXIgaW4gdGhlIHJvd1xyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUNlbGxFbGVtZW50fSBuYW1lQ2VsbCAtIHJlZmVyZW5jZSB0byB0aGUgYDx0ZD5gIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgcm93aGVhZGVyIGxhYmVsL25hbWVcclxuICAgKiBAcGFyYW0ge1N0cmluZz19IFtuYW1lPW5hbWVDZWxsLnRleHRDb250ZW50XSAtIGxhYmVsIG9mIHRoZSByb3doZWFkZXIuXHJcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBbYmxvY2s9bnVsbF0gLSB0aGUgYmxvY2sgdGhlIHJvdyBiZWxvbmdzIHRvXHJcbiAgICogKi9cclxuICBjb25zdHJ1Y3Rvcih7cm93LCBpZD1udWxsLCBuYW1lQ2VsbCwgbmFtZSwgYmxvY2s9bnVsbH09e30pe1xyXG4gICAgLyoqKiBAcHJvcGVydHkge0hUTUxUYWJsZVJvd0VsZW1lbnR9IHJvdyAtIHJlZmVyZW5jZSB0byB0aGUgYDx0cj5gIGVsZW1lbnQqL1xyXG4gICAgdGhpcy5yb3cgPSByb3c7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLm5hbWVDZWxsID0gbmFtZUNlbGw7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lIHx8IG5hbWVDZWxsLnRleHRDb250ZW50LnRyaW0oKTtcclxuICAgIHRoaXMuYmxvY2sgPSBibG9jaztcclxuICAgIHRoaXMuZmlyc3RJbkJsb2NrID0gYmxvY2shPW51bGwgJiYgdGhpcy5yb3cucm93SW5kZXggPT09IHRoaXMuYmxvY2suY2VsbC5wYXJlbnROb2RlLnJvd0luZGV4O1xyXG4gIH1cclxuICAvKmdldCBmaXJzdEluQmxvY2soKXtcclxuICAgIHJldHVybiB0aGlzLl9maXJzdEluQmxvY2s7XHJcbiAgfVxyXG4gIHNldCBmaXJzdEluQmxvY2sodmFsKXtcclxuICAgIHRoaXMuX2ZpcnN0SW5CbG9jayA9IHZhbDtcclxuICAgIHZhbD90aGlzLnJvdy5jbGFzc0xpc3QuYWRkKCdmaXJzdEluQmxvY2snKTp0aGlzLnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdmaXJzdEluQmxvY2snKTtcclxuICB9Ki9cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBZ2dyZWdhdGVkVGFibGVSb3dNZXRhXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1hZ2dyZWdhdGVkLXRhYmxlL3NyYy9hZ2dyZWdhdGVkLXRhYmxlLXJvdy1tZXRhLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMjcuMDkuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgVGFibGVEYXRhIGZyb20gJy4vdGFibGUtZGF0YSc7XHJcbmltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xyXG5pbXBvcnQgVGFibGVDb2x1bW5zIGZyb20gXCJyLXRhYmxlLWNvbHVtbnNcIjtcclxuaW1wb3J0IFNvcnRUYWJsZSBmcm9tIFwici1zb3J0LXRhYmxlL3NyYy9zb3J0LXRhYmxlXCI7XHJcbmltcG9ydCBUYWJsZUZsb2F0aW5nSGVhZGVyIGZyb20gXCJyLXRhYmxlLWZsb2F0aW5nLWhlYWRlci9zcmMvdGFibGUtZmxvYXRpbmctaGVhZGVyXCI7XHJcblxyXG5sZXQgc3R5bGVzID0gcmVxdWlyZSgnci1zb3J0LXRhYmxlL3NyYy9zb3J0LXRhYmxlLXN0eWxlcy5jc3MnKTtcclxubGV0IGFnZ3JlZ2F0ZWRUYWJsZUNTUyA9IHJlcXVpcmUoJy4vYWdncmVnYXRlZC10YWJsZS5jc3MnKTtcclxuXHJcbi8qKlxyXG4gKiBBIGJhc2UgY2xhc3MgZm9yIGFnZ3JlZ2F0ZWQgdGFibGVzLiBNdWx0aWRpbWVuc2lvbmFsIHByb3BlcnR5IG9mIGRhdGEgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkLCB0aHVzIHJlbW92ZWQgZnJvbSBwYXJhbXMuXHJcbiAqIEBleHRlbmRzIFRhYmxlRGF0YVxyXG4gKiAqL1xyXG5jbGFzcyBBZ2dyZWdhdGVkVGFibGUgZXh0ZW5kcyBUYWJsZURhdGEge1xyXG4gIC8qXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHRvIGNvbmZpZ3VyZSB0aGUgd2F5IGRhdGEgaXMgc3RyaXBwZWQgb2ZmIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgdGhhdCB3aWxsIGJlIGFuIGlucHV0IGZvciBkYXRhIHN0cmlwcGluZ1xyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gW29wdGlvbnMucmVmU291cmNlXSAtIGEgcmVmZXJlbmNlIHRvIGEgZmxvYXRpbmcgaGVhZGVyLCBpZiBhbnlcclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucm93aGVhZGVyQ29sdW1uSW5kZXg9MF0gLSAwLWJhc2VkIGluZGV4IG9mIHRoZSBjb2x1bW4gdGhhdCB3ZSBuZWVkIHRvIGNoZWNrIGFnYWluc3QgdG8gc2VlIGlmIGl0J3MgYSBtdWx0aWRpbWVudGlvbmFsIHRhYmxlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0PX0gW29wdGlvbnMuZGVmYXVsdEhlYWRlclJvdz0tMV0gLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGhhdmUgc29ydGluZyBlbmFibGVkIGZvciBjb2x1bW5zLiBJZiBgLTFgIHRoZW4gbGFzdCByb3cuXHJcbiAgICogQHBhcmFtIHtTdHJpbmc9fSBvcHRpb25zLmRhdGFTdHJpcERpcmVjdGlvbj0ncm93JyAtIGRpcmVjdGlvbiBpbiB3aGljaCBkYXRhIHN0cmlwcGluZyB3aWxsIG9jY3VyOiBgcm93YCBzdHJpcHMgYWNyb3NzIHJvd3MgYW5kIHByZXNlbnRzIGFuIGFycmF5IHdoZXJlIGVhY2ggYXJyYXkgaXRlbSBpcyBhbiBhcnJheSBvZiBjZWxsIHZhbHVlcy4gYGNvbHVtbmAgc3RyaXBzIHZhbHVlcyB2ZXJ0aWNhbHkgaW4gYSBjb2x1bW4sIHRoZSByZXN1bHRpbmcgYXJyYXkgd2lsbCBjb250YWluIGFycmF5cyAocGVyIGNvbHVtbikgd2l0aCB2YWx1ZXMgcmVzZW1ibGluZyBub3JtYWxpemVkIGRhdGEgZm9yIGNlbGxzIGluIHRoZSBjb2x1bW5cclxuICAgKiBAcGFyYW0ge0Jvb2xlYW49fSBbb3B0aW9ucy5leGNsdWRlQmxvY2s9dHJ1ZV0gLSBpZiB0YWJsZSBjb250YWlucyBibG9jayBjZWxscyB0aGF0IHJvd3NwYW4gYWNyb3NzIHNldmVyYWwgcm93cywgd2UgbWlnaHQgbmVlZCB0byBleGNsdWRlIHRob3NlIGZyb20gYWN0dWFsIGRhdGFcclxuICAgKiBAcGFyYW0ge0FycmF5fE51bWJlcn0gW29wdGlvbnMuZXhjbHVkZUNvbHVtbnNdIC0gaWYgdGFibGUgY29udGFpbnMgY29sdW1ucyB0aGF0IGFyZSBub3QgdG8gYmUgaW4gZGF0YSwgdGhlbiBwYXNzIGEgc2luZ2xlIGluZGV4IG9yIGFuIGFycmF5IG9mIGNlbGwgaW5kaWNlcyAoMC1iYXNlZCkuIFlvdSBuZWVkIHRvIGNvdW50IGNvbHVtbnMgbm90IGJ5IGhlYWRlcnMgYnV0IGJ5IHRoZSBjZWxscyBpbiByb3dzLlxyXG4gICAqIEBwYXJhbSB7QXJyYXl8TnVtYmVyfSBbb3B0aW9ucy5leGNsdWRlUm93c10gLSBpZiB0YWJsZSBjb250YWlucyByb3dzIHRoYXQgYXJlIG5vdCB0byBiZSBpbiBkYXRhLCB0aGVuIHBhc3MgYSBzaW5nbGUgaW5kZXggb3IgYW4gYXJyYXkgb2Ygcm93IGluZGljZXMgKDAtYmFzZWQpLiBZb3UgbmVlZCB0byBjb3VudCBvbmx5IHJvd3MgdGhhdCBjb250YWluIGRhdGEsIG5vdCB0aGUgdGFibGUtaGVhZGVyIHJvd3MuXHJcbiAgICogQHBhcmFtIHtTb3J0VGFibGV9IG9wdGlvbnMuc29ydGluZyAtIHNvcnRpbmcgb3B0aW9ucywgc2VlIHtAbGluayBTb3J0VGFibGV9LiBJZiB5b3Ugd2FudCB0byBsZWF2ZSBhbGwgb3B0aW9ucyBkZWZhdWx0IGJ1dCBlbmFibGUgc29ydGluZywgcGFzcyBhbiBlbXB0eSBvYmplY3QoYC4uLCBzb3J0aW5nOnt9YCksIG9yIHNvcnRpbmcgd29uJ3QgYmUgYXBwbGllZC5cclxuICAgKiBAcGFyYW0ge1NvcnRUYWJsZX0gb3B0aW9ucy5mbG9hdGluZ0hlYWRlciAtIGZsb2F0aW5nIGhlYWRlciwgc2VlIHtAbGluayBTb3J0VGFibGV9LiBJZiB5b3Ugd2FudCB0byBsZWF2ZSBhbGwgb3B0aW9ucyBkZWZhdWx0IGJ1dCBlbmFibGUgc29ydGluZywgcGFzcyBhbiBlbXB0eSBvYmplY3QoYC4uLCBzb3J0aW5nOnt9YCksIG9yIHNvcnRpbmcgd29uJ3QgYmUgYXBwbGllZC5cclxuICAgKiAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xyXG4gICAgbGV0IHtcclxuICAgICAgc291cmNlLFxyXG4gICAgICByb3doZWFkZXJDb2x1bW5JbmRleCxkZWZhdWx0SGVhZGVyUm93LGRhdGFTdHJpcERpcmVjdGlvbixleGNsdWRlQmxvY2ssZXhjbHVkZUNvbHVtbnMsZXhjbHVkZVJvd3MsXHJcbiAgICAgIHNvcnRpbmcsXHJcbiAgICAgIGZsb2F0aW5nSGVhZGVyXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVGhlIHNvdXJjZSB0YWJsZVxyXG4gICAgICogIEB0eXBlIHtIVE1MVGFibGVFbGVtZW50fVxyXG4gICAgICogIEBtZW1iZXJPZiBBZ2dyZWdhdGVkVGFibGVcclxuICAgICAqICAqL1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICBsZXQgcmVmU291cmNlO1xyXG4gICAgaWYoZmxvYXRpbmdIZWFkZXIgJiYgdHlwZW9mIGZsb2F0aW5nSGVhZGVyPT0nb2JqZWN0Jyl7XHJcbiAgICAgIHRoaXMuZmxvYXRpbmdIZWFkZXIgPSBuZXcgVGFibGVGbG9hdGluZ0hlYWRlcihzb3VyY2UpO1xyXG4gICAgICAvKipcclxuICAgICAgICogIFRoZSBmbG9hdGluZyBoZWFkZXJcclxuICAgICAgICogIEB0eXBlIHtIVE1MVGFibGVFbGVtZW50fVxyXG4gICAgICAgKiAgQG1lbWJlck9mIEFnZ3JlZ2F0ZWRUYWJsZVxyXG4gICAgICAgKiAgKi9cclxuICAgICAgdGhpcy5yZWZTb3VyY2UgPSByZWZTb3VyY2UgPSB0aGlzLmZsb2F0aW5nSGVhZGVyLmhlYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBXaGV0aGVyIGRhdGEgaXMgbW9ub2RpbWVuc2lvbmFsIG9yIG11bHRpZGltZW5zaW9uYWxcclxuICAgICAqICBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAqICBAbWVtYmVyT2YgQWdncmVnYXRlZFRhYmxlXHJcbiAgICAgKiAgKi9cclxuXHJcbiAgICB0aGlzLm11bHRpZGltZW5zaW9uYWwgPSB0aGlzLmNvbnN0cnVjdG9yLmRldGVjdE11bHRpZGltZW5zaW9uYWwoc291cmNlKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBkYXRhIEFycmF5XHJcbiAgICAgKiAgQHR5cGUge0FycmF5Ljx7Y2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudCwgZGF0YTo/U3RyaW5nfD9OdW1iZXIsIGNvbHVtbkluZGV4Ok51bWJlcn0+fVxyXG4gICAgICogIEBtZW1iZXJPZiBBZ2dyZWdhdGVkVGFibGVcclxuICAgICAqICAqL1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXREYXRhKHtzb3VyY2UscmVmU291cmNlLGRlZmF1bHRIZWFkZXJSb3csZXhjbHVkZUJsb2NrLGV4Y2x1ZGVDb2x1bW5zLGV4Y2x1ZGVSb3dzLGRpcmVjdGlvbjpkYXRhU3RyaXBEaXJlY3Rpb24sbXVsdGlkaW1lbnNpb25hbDogdGhpcy5tdWx0aWRpbWVuc2lvbmFsfSk7XHJcblxyXG5cclxuICAgIGlmKHNvcnRpbmcgJiYgdHlwZW9mIHNvcnRpbmcgPT0gJ29iamVjdCcpe1xyXG4gICAgICBsZXQgcmVvcmRlckZ1bmN0aW9uID0gZT0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnJlb3JkZXJSb3dzKHRoaXMuZGF0YSx0aGlzLnNvdXJjZSx0aGlzLm11bHRpZGltZW5zaW9uYWwpXHJcbiAgICAgIH07XHJcbiAgICAgIFtzb3VyY2UscmVmU291cmNlXS5mb3JFYWNoKHRhcmdldD0+e1xyXG4gICAgICAgIGlmKHRhcmdldCl7XHJcbiAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigncmVwb3J0YWwtdGFibGUtc29ydCcsIHJlb3JkZXJGdW5jdGlvbilcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc29ydGluZy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgIHNvcnRpbmcucmVmU291cmNlID0gcmVmU291cmNlO1xyXG4gICAgICBzb3J0aW5nLmRlZmF1bHRIZWFkZXJSb3cgPSBkZWZhdWx0SGVhZGVyUm93O1xyXG4gICAgICBzb3J0aW5nLmRhdGE9dGhpcy5kYXRhO1xyXG4gICAgICBzb3J0aW5nLm11bHRpZGltZW5zaW9uYWwgPSB0aGlzLm11bHRpZGltZW5zaW9uYWw7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogIHNvcnRpbmcgb2JqZWN0LiBTZWUge0BsaW5rIFNvcnRUYWJsZX1cclxuICAgICAgICogIEB0eXBlIHtTb3J0VGFibGV9XHJcbiAgICAgICAqICBAbWVtYmVyT2YgQWdncmVnYXRlZFRhYmxlXHJcbiAgICAgICAqICAqL1xyXG4gICAgICB0aGlzLnNvcnRpbmcgPSBuZXcgU29ydFRhYmxlKHNvcnRpbmcpO1xyXG5cclxuICAgICAgLy8gYWRkIGxpc3RlbmVyIHRvIGRvIHJlb3JkZXJpbmcgb24gc29ydGluZ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGFibGUgY29sdW1ucyBhcnJheVxyXG4gICAgICogQHR5cGUge0FycmF5Ljx7aW5kZXg6TnVtYmVyLCB0aXRsZTpTdHJpbmcsIGNvbFNwYW46TnVtYmVyLCBjZWxsOiBIVE1MVGFibGVDZWxsRWxlbWVudCwgP3JlZkNlbGw6SFRNTFRhYmxlQ2VsbEVsZW1lbnR9Pn1cclxuICAgICAqIEBtZW1iZXJPZiBBZ2dyZWdhdGVkVGFibGVcclxuICAgICAqICovXHJcbiAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLnNvcnRpbmcgJiYgdGhpcy5zb3J0aW5nLmNvbHVtbnM/IHRoaXMuc29ydGluZy5jb2x1bW5zIDogbmV3IFRhYmxlQ29sdW1ucyh7c291cmNlLHJlZlNvdXJjZSxkZWZhdWx0SGVhZGVyUm93fSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0cmFjdHMgZGF0YSBmcm9tIGEgZ2l2ZW4gY2VsbC4gT3ZlcnJpZGUgaW4gYW4gaW5oZXJpdGVkIGNsYXNzIGlmIHlvdSBuZWVkIHRvIGFkZCBhbnkgbWV0YWRhdGEgdG8gaXQuXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVDZWxsRWxlbWVudH0gY2VsbCAtIGNlbGwgZWxlbWVudCB0byBoYXZlIGRhdGEgc3RyaXBwZWQgb2ZmIGl0XHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVDZWxsRWxlbWVudH0gcm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGl0J3MgaW5cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUNlbGxFbGVtZW50fSBjb2x1bW5JbmRleCAtIGluZGV4IG9mIHRoZSBjb2x1bW4gaXQncyBpblxyXG4gICAqIEByZXR1cm5zIHt7Y2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudCwgP2RhdGE6U3RyaW5nfE51bWJlciwgY29sdW1uSW5kZXg6TnVtYmVyfX0gUmV0dXJucyBhbiBvYmplY3QgYHtjZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50LCBkYXRhOj9TdHJpbmd8P051bWJlciwgY29sdW1uSW5kZXg6TnVtYmVyfWAgKGlmIGRhdGEgaXMgYWJzZW50IGluIHRoZSBjZWxsIG9yIGl0cyB0ZXh0IGNvbnRlbnQgYm9pbHMgZG93biB0byBhbiBlbXB0eSBzdHJpbmcgLSBpLmUuIHRoZXJlIGFyZSBubyBjaGFyYWN0ZXJzIGluIHRoZSBjZWxsLCBvbmx5IEhUTUwgdGFncykgaXQgcmV0dXJucyBudWxsIGluIGBkYXRhYFxyXG4gICAqIEBvdmVycmlkZVxyXG4gICAqICovXHJcbiAgc3RhdGljIHByZXBhcmVEYXRhQ2VsbChjZWxsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2VsbCxcclxuICAgICAgZGF0YTogUmVwb3J0YWxCYXNlLmlzTnVtYmVyKGNlbGwudGV4dENvbnRlbnQudHJpbSgpKSxcclxuICAgICAgY29sdW1uSW5kZXgsXHJcbiAgICAgIHJvd0luZGV4XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGNhcmUgb2YgcmVwb3NpdGlvbmluZyByb3dzIGluIHRoZSB0YWJsZSB0byBtYXRjaCB0aGUgYGRhdGFgIGFycmF5IGluIHRoZSB3YXkgaXQgd2FzIHNvcnRlZCBhbmQgaWYgdGhlIGRhdGEgaXMgc2VwYXJhdGVkIGludG8gYmxvY2tzLCB0aGVuIG1vdmUgdGhlIGJsb2NrIHBpZWNlIHRvIHRoZSBmaXJzdCByb3cgaW4gZWFjaCBkYXRhIGJsb2NrLlxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSBmdWxsIHNvcnRlZCBkYXRhc2V0LiBJbnN0YW5jZSBvZiB7QGxpbmsgVGFibGVEYXRhI2dldERhdGF9XHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGVcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG11bHRpZGltZW5zaW9uYWxcclxuICAgKiAqL1xyXG4gIHN0YXRpYyByZW9yZGVyUm93cyhkYXRhLHNvdXJjZSxtdWx0aWRpbWVuc2lvbmFsKXtcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIEFnZ3JlZ2F0ZWRUYWJsZS5kaW1lbnNpb25hbERhdGFJdGVyYXRvcihkYXRhLG11bHRpZGltZW5zaW9uYWwsKGRhdGFEaW1lbnNpb24pPT57XHJcbiAgICAgIGlmKG11bHRpZGltZW5zaW9uYWwpe0FnZ3JlZ2F0ZWRUYWJsZS5yZXBvc2l0aW9uQmxvY2tDZWxsKGRhdGFEaW1lbnNpb24pfSAvLyBpZiBtdWx0aWRpbWVuc2lvbmFsIHJlcG9zaXRpb24gYWdncmVnYXRpbmcgYmxvY2sgY2VsbCB0byB0aGUgdG9wbW9zdCByb3cgaW4gc29ydGVkIGFycmF5XHJcbiAgICAgIGRhdGFEaW1lbnNpb24uZm9yRWFjaChpdGVtPT57ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaXRlbVswXS5jZWxsLnBhcmVudE5vZGUpfSk7IC8vIGFkZCByb3cgdG8gZnJhZ21lbnQgaW4gdGhlIGFycmF5IG9yZGVyLCB0aGlzIGRvZXNuJ3QgYWNjb3VudCBmb3IgY29sdW1uIHN0cmlwcGVkIGRhdGEgeWV0XHJcbiAgICB9KTtcclxuICAgIHNvdXJjZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmVwb3NpdGlvbnMgdGhlIHJvd3NwYW5uaW5nIGJsb2NrIGNlbGwgZnJvbSB0aGUgaW5pdGlhbCByb3cgdG8gdGhlIG5ldyBzb3J0ZWQgcm93XHJcbiAgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgLSBkaW1lbnNpb24gb2YgZGF0YVxyXG4gICAqICovXHJcbiAgc3RhdGljIHJlcG9zaXRpb25CbG9ja0NlbGwoaXRlbXMpe1xyXG4gICAgbGV0IGJsb2NrUm93SXRlbSA9IGl0ZW1zLmZpbHRlcihpdGVtPT5pdGVtWzBdLmNlbGwucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpcnN0SW5CbG9jaycpKVswXTtcclxuICAgIGxldCBibG9ja1JvdyA9IGJsb2NrUm93SXRlbVswXS5jZWxsLnBhcmVudE5vZGU7XHJcbiAgICBpZihpdGVtcy5pbmRleE9mKGJsb2NrUm93SXRlbSkhPTApey8vIGlmIGJsb2NrIHJvdyBpc24ndCBmaXJzdCBpbiBkaW1lbnNpb25cclxuICAgICAgbGV0IG5ld0ZpcnN0Um93ID0gaXRlbXNbMF1bMF0uY2VsbC5wYXJlbnROb2RlO1xyXG4gICAgICBuZXdGaXJzdFJvdy5pbnNlcnRCZWZvcmUoYmxvY2tSb3cucXVlcnlTZWxlY3RvcignLmJsb2NrQ2VsbCcpLG5ld0ZpcnN0Um93LmZpcnN0RWxlbWVudENoaWxkKTsvLyBtb3ZlIGJsb2NrIGNlbGxcclxuICAgICAgbmV3Rmlyc3RSb3cuY2xhc3NMaXN0LmFkZCgnZmlyc3RJbkJsb2NrJyk7XHJcbiAgICAgIGJsb2NrUm93LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpcnN0SW5CbG9jaycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogYWxsb3dzIHRvIHBlcmZvcm0gYWN0aW9uIG9uIGRhdGEgYmFzZWQgb24gaXRzIG11bHRpZGltZW5zaW9uYWxpdHlcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gZnVsbCBkYXRhc2V0LiBJbnN0YW5jZSBvZiB7QGxpbmsgVGFibGVEYXRhI2dldERhdGF9XHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBtdWx0aWRpbWVuc2lvbmFsXHJcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGNhbGxiYWNrIC0gYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiBhIGRpbWVuc2lvbiBvZiBkYXRhLiBDYWxsYmFjayBpcyBjYWxsZWQgd2l0aCB0d28gYXR0cmlidXRlczogYGRpbWVuc2lvbmAgLSB0aGUgY3VycmVudCBpdGVyYXRpb24gb2YgZGF0YSBhbmQgYGluZGV4YCAob3B0aW9uYWwpIGlmIGl0J3MgbXVsdGlkaW1lbnNpb25hbFxyXG4gICAqICovXHJcbiAgc3RhdGljIGRpbWVuc2lvbmFsRGF0YUl0ZXJhdG9yKGRhdGEsbXVsdGlkaW1lbnNpb25hbCxjYWxsYmFjayl7XHJcbiAgICBpZighY2FsbGJhY2sgfHwgdHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpe3Rocm93IG5ldyBUeXBlRXJyb3IoJ2BjYWxsYmFja2AgbXVzdCBiZSBwYXNzZWQgYW5kIGJlIGEgZnVuY3Rpb24nKX1cclxuICAgIGlmKCFtdWx0aWRpbWVuc2lvbmFsKXtcclxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpXHJcbiAgICB9IGVsc2UgeyAvLyBpZiBhcnJheSBoYXMgbmVzdGVkIGFycmF5IGJsb2Nrc1xyXG4gICAgICBkYXRhLmZvckVhY2goKGRpbWVuc2lvbixpbmRleCk9PntcclxuICAgICAgICBjYWxsYmFjayhkaW1lbnNpb24saW5kZXgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWdncmVnYXRlZFRhYmxlXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci1hZ2dyZWdhdGVkLXRhYmxlL3NyYy9hZ2dyZWdhdGVkLXRhYmxlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMDcuMDkuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgVGFibGVEYXRhIGZyb20gXCIuL3RhYmxlLWRhdGFcIjtcclxuaW1wb3J0IEFnZ3JlZ2F0ZWRUYWJsZSBmcm9tIFwiLi9hZ2dyZWdhdGVkLXRhYmxlXCI7XHJcbmltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xyXG5pbXBvcnQgQWdncmVnYXRlZFRhYmxlUm93TWV0YSBmcm9tIFwiLi9hZ2dyZWdhdGVkLXRhYmxlLXJvdy1tZXRhXCI7XHJcblxyXG5cclxud2luZG93LlJlcG9ydGFsID0gd2luZG93LlJlcG9ydGFsIHx8IHt9O1xyXG5SZXBvcnRhbEJhc2UubWl4aW4od2luZG93LlJlcG9ydGFsLHtcclxuICBUYWJsZURhdGEsXHJcbiAgQWdncmVnYXRlZFRhYmxlLFxyXG4gIEFnZ3JlZ2F0ZWRUYWJsZVJvd01ldGFcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZ2dyZWdhdGVkVGFibGVcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9yLWFnZ3JlZ2F0ZWQtdGFibGUvc3JjL21haW4uanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBJdmFuUCBvbiAxNS4xMi4yMDE2LlxyXG4gKi9cclxuaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcblxyXG4vKipcclxuICogQSBjbGFzcyB0aGF0IHByb3ZpZGVzIHV0aWxpdHkgc3RhdGljIG1ldGhvZHMgdG8gbG9hZCBjaGlsZHJlbiBvZiBhIGxldmVsIG9mIGhpZXJlcmFjaHkgYW5kIGEgdGFibGUgcGVyIGEgZ2l2ZW4gaWRcclxuICogKi9cclxuY2xhc3MgQXN5bmNIaWVyYXJjaHlUYWJsZXtcclxuICAvKipcclxuICAgKiBRdWVyaWVzIGlmIGVhY2ggcm93IG1pZ2h0IGNvbnRhaW4gY2hpbGQgcm93cyBieSBxdWVyaW5nIGhpZXJhcmNoeSBmb3IgbmV4dCBsZXZlbFxyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gaWQgLSByb3doZWFkZXIgaWQgZm9yIGN1cnJlbnQgcm93XHJcbiAgICogQHBhcmFtIHshTnVtYmVyfSBoaWVyYXJjaHlJRCAtIGlkIG9mIEhpZXJhcmNoeSBpbiBUYWJsZSBEZXNpZ25lclxyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gaGllcmFyY2h5Q29udHJvbElEIC0gaWQgb2YgdGhlIFJlcG9ydGFsIEhpZXJhcmNoeSBDb21wb25lbnQgaW5zdGFuY2Ugb24gdGhlIHBhZ2VcclxuICAgKiBAcGFyYW0geyFTdHJpbmd9IHBhZ2VTdGF0ZUlEIC0gUmVwb3J0YWwgc3RhdGUgaWRcclxuICAgKiBAcGFyYW0ge051bWJlcj19IGxhbmd1YWdlQ29kZT05IC0gTGFuZ3VhZ2UgY29kZSAoYWNjb3JkaW5nIHRvIENvbmZpcm1pdCB0YWJsZSBvZiBsYW5ndWFnZSBjb2Rlcykgb2YgdGhlIGxhbmd1YWdlIHRoZSBoaWVyYXJjaHkgaXMgZ29pbmcgdG8gYmUgc3RyZWFtZWQgaW4gYXQgdGhlIHBhZ2UgbG9hZFxyXG4gICAqIEByZXR1cm5zIHtBcnJheX0gYXJyYXkgb2YgY2hpbGQgbm9kZXMgb2YgdGhlIGBpZGAgaW4gaGllcmFyY2h5XHJcbiAgICogKi9cclxuICBzdGF0aWMgZmV0Y2hDaGlsZEhpZXJhcmNoeShpZCxoaWVyYXJjaHlJRCxoaWVyYXJjaHlDb250cm9sSUQscGFnZVN0YXRlSUQsbGFuZ3VhZ2VDb2RlPTkpe1xyXG4gICAgbGV0IHBhdGggPSBbXHJcbiAgICAgIGxvY2F0aW9uLm9yaWdpbixcclxuICAgICAgJ3JlcG9ydGFsJyxcclxuICAgICAgJ0hpZXJhcmNoeScsXHJcbiAgICAgIFJlcG9ydGFsQmFzZS5nZXRRdWVyeVZhcmlhYmxlKCdSZXBvcnRJZCcpLFxyXG4gICAgICBoaWVyYXJjaHlJRCxcclxuICAgICAgbGFuZ3VhZ2VDb2RlLFxyXG4gICAgICAnR2V0Q2hpbGROb2RlcydcclxuICAgIF07XHJcblxyXG4gICAgbGV0IHF1ZXJ5PVtcclxuICAgICAgYG5vZGVJZD0ke2lkfWAsXHJcbiAgICAgIGBpbmZvPSR7QXN5bmNIaWVyYXJjaHlUYWJsZS5lbmNvZGUoe1xyXG4gICAgICAgIElzUHJldmlldzpSZXBvcnRhbEJhc2UuZ2V0UXVlcnlWYXJpYWJsZSgnUHJldmlldycpPT09J3RydWUnLFxyXG4gICAgICAgIEhpZXJhcmNoeUNvbnRyb2xJZDpoaWVyYXJjaHlDb250cm9sSURcclxuICAgICAgfSl9YCxcclxuICAgICAgJ2lzUmVwQmFzZT1mYWxzZScsXHJcbiAgICAgICdwYXJhbWV0ZXI9JyxcclxuICAgICAgYFBhZ2VTdGF0ZUlkPSR7cGFnZVN0YXRlSUR9YFxyXG4gICAgXTtcclxuXHJcbiAgICBsZXQgaGllcmFyY2h5SXRlbUNoaWxkcmVuID0gUmVwb3J0YWxCYXNlLnByb21pc2VSZXF1ZXN0KFtwYXRoLmpvaW4oJy8nKSwnPycscXVlcnkuam9pbignJicpXS5qb2luKCcnKSk7XHJcbiAgICByZXR1cm4gaGllcmFyY2h5SXRlbUNoaWxkcmVuLnRoZW4ocmVzcG9uc2U9PntyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UpKX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyByb3cgbm9kZXMgdGhhdCBhcmUgY2hpbGQgdG8gdGhlIHBhcmVudCByb3cjYGlkYFxyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gaWQgLSByb3doZWFkZXIgaWQgZm9yIGN1cnJlbnQgcm93XHJcbiAgICogQHBhcmFtIHs/U3RyaW5nfSBwYXJlbnRJRCAtIHJvd2hlYWRlciBpZCBmb3IgcGFyZW50IHJvd1xyXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gdGFibGVJRCAtIFJlcG9ydGFsIEFnZ3JlZ2F0ZWQgVGFibGUgQ29tcG9uZW50IGlkXHJcbiAgICogQHBhcmFtIHshU3RyaW5nfSBwYWdlU3RhdGVJRCAtIFJlcG9ydGFsIHN0YXRlIGlkXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyBhIHRoZW5hYmxlIHByb21pc2Ugd2hpY2ggcmVzdWx0IGlzIGFuIGBIVE1MVGFibGVFbGVtZW50YCB3aXRoIHJvd3MgdGhhdCBhcmUgY2hpbGRyZW4gdG8gdGhlIHJvdyNgaWRgXHJcbiAgICogKi9cclxuICBzdGF0aWMgZmV0Y2hDaGlsZFRhYmxlKGlkLCBwYXJlbnRJRCwgdGFibGVJRCxwYWdlU3RhdGVJRCl7XHJcbiAgICBwYXJlbnRJRCA9IHBhcmVudElEIT1udWxsP3BhcmVudElEOmlkO1xyXG4gICAgbGV0IHBhdGggPSBbXHJcbiAgICAgIGxvY2F0aW9uLm9yaWdpbixcclxuICAgICAgJ3JlcG9ydGFsJyxcclxuICAgICAgJ1JlcG9ydCcsXHJcbiAgICAgIFJlcG9ydGFsQmFzZS5nZXRRdWVyeVZhcmlhYmxlKCdSZXBvcnRJZCcpLFxyXG4gICAgICAnQ29tcG9uZW50JyxcclxuICAgICAgdGFibGVJRFxyXG4gICAgXTtcclxuICAgIGxldCBxdWVyeT1bXHJcbiAgICAgIGBQYWdlSWQ9JHtSZXBvcnRhbEJhc2UuZ2V0UXVlcnlWYXJpYWJsZSgnUGFnZUlkJyl9YCxcclxuICAgICAgYFByZXZpZXc9JHtSZXBvcnRhbEJhc2UuZ2V0UXVlcnlWYXJpYWJsZSgnUHJldmlldycpfWAsXHJcbiAgICAgIGBQYWdlU3RhdGVJZD0ke3BhZ2VTdGF0ZUlEfWAsXHJcbiAgICAgIGBwYWdlRmlsdGVycz0ke0FzeW5jSGllcmFyY2h5VGFibGUuZW5jb2RlKHt9KX1gLFxyXG4gICAgICBgY3VzdG9tRmlsdGVycz0ke0FzeW5jSGllcmFyY2h5VGFibGUuZW5jb2RlKHt9KX1gLFxyXG4gICAgICBgcGVyc05vZGVzPSR7QXN5bmNIaWVyYXJjaHlUYWJsZS5lbmNvZGUoW3tOb2RlSWQ6aWQsVGV4dDpudWxsfV0pfWAsIC8vIGNoaWxkIG5vZGUgaWRcclxuICAgICAgYG9yaWdOb2Rlcz0ke0FzeW5jSGllcmFyY2h5VGFibGUuZW5jb2RlKFt7Tm9kZUlkOnBhcmVudElELFRleHQ6bnVsbH1dKX1gIC8vIHBhcmVudCBub2RlIGlkXHJcbiAgICBdO1xyXG4gICAgbGV0IHRhYmxlUmVzdWx0ID0gUmVwb3J0YWxCYXNlLnByb21pc2VSZXF1ZXN0KFtwYXRoLmpvaW4oJy8nKSwnPycscXVlcnkuam9pbignJicpXS5qb2luKCcnKSk7XHJcbiAgICByZXR1cm4gdGFibGVSZXN1bHQudGhlbihyZXNwb25zZT0+e1xyXG4gICAgICBsZXQgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgaG9zdC5pbm5lckhUTUwgPSByZXNwb25zZTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShob3N0LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlJykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdHJpcHMgcm93cyBmcm9tIHRoZSB0YWJsZSByZWNlaXZlZFxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gdGFibGUgLSBBZ2dyZWdhdGVkIHRhYmxlIGVsZW1lbnRcclxuICAgKiBAcGFyYW0ge0FycmF5fSBleGNsdWRlZFJvd3MgLSByb3dzIGV4Y2x1ZGVkIGZyb20gaW5zZXJ0aW9uXHJcbiAgICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2Ygcm93cyB7SFRNTFRhYmxlUm93RWxlbWVudH1cclxuICAgKiAqL1xyXG4gIHN0YXRpYyBzdHJpcFJvd3NGcm9tUmVzcG9uc2VUYWJsZSh0YWJsZSxleGNsdWRlZFJvd3Mpe1xyXG4gICAgbGV0IHJvd3MgPSBbXS5zbGljZS5jYWxsKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5PnRyJykpO1xyXG4gICAgaWYoZXhjbHVkZWRSb3dzICYmIGV4Y2x1ZGVkUm93cy5sZW5ndGg+MCl7XHJcbiAgICAgIGV4Y2x1ZGVkUm93cy5yZXZlcnNlKCkuZm9yRWFjaChpbmRleD0+e1xyXG4gICAgICAgIHJvd3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm93cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERvZXMgYEpTT04uc3RyaW5naWZ5YCBhbmQgYGVuY29kZVVSSUNvbXBvbmVudGAgb2YgYW55dGhpbmcgcGFzc2VkIHRvIGJlIGFkZGVkIHRvIHRoZSBxdWVyeSBzdHJpbmdcclxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8QXJyYXl9IHRvRW5jb2RlIC0gcGllY2UgdG8gYmUgVVJMZW5jb2RlZFxyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYW4gZW5jb2RlZCBzdHJpbmdcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBlbmNvZGUodG9FbmNvZGUpe1xyXG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0b0VuY29kZSkpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzeW5jSGllcmFyY2h5VGFibGU7XHJcblxyXG5cclxud2luZG93LlJlcG9ydGFsID0gd2luZG93LlJlcG9ydGFsIHx8IHt9O1xyXG5SZXBvcnRhbEJhc2UubWl4aW4od2luZG93LlJlcG9ydGFsLHtcclxuICBBc3luY0hpZXJhcmNoeVRhYmxlXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItYXN5bmMtaGllcmFyY2h5LXRhYmxlL3NyYy9tYWluLmpzIiwiY2xhc3MgU29ydE9yZGVyIHtcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgYHNvcnRPcmRlcmAgYXJyYXlcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNvbHVtbnMgLSBhbiBhcnJheSBvZiBjb2x1bW5zIGZyb20ge0BsaW5rIFRhYmxlQ29sdW1uc31cclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNvcnRDYWxsYmFjayAtIGZ1bmN0aW9uIHRoYXQgcGVyZm9ybXMgc29ydGluZyBiYXNlZCBvbiB0aGUgYHNvcnRPcmRlcmBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5zb3J0Q2FsbGJhY2tTY29wZSAtIHNjb3BlIGluIHdoaWNoIHNvcnQgY2FsbGJhY2sgbmVlZHMgdG8gYmUgZXhlY3V0ZWRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuZGVmYXVsdFNvcnRpbmddIC0gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IHNwZWNpZnkgZGVmYXVsdCBzb3J0aW5nXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGVmYXVsdFNvcnRpbmcuY29sdW1uIC0gY29sdW1uIGluZGV4XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZGVmYXVsdFNvcnRpbmcuZGlyZWN0aW9uIC0gc29ydCBkaXJlY3Rpb24gKGBhc2NgfGBkZXNjYClcclxuICAgKiBAcmV0dXJuIHtBcnJheX1cclxuICAgKiAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xyXG4gICAgbGV0IHtjb2x1bW5zLCBzb3J0Q2FsbGJhY2ssIGRlZmF1bHRTb3J0aW5nPVtdLCBzb3J0Q2FsbGJhY2tTY29wZT10aGlzfSA9IG9wdGlvbnM7XHJcblxyXG4gICAgdGhpcy5zb3J0T3JkZXIgPSBbXTtcclxuICAgIGlmKHR5cGVvZiBjb2x1bW5zICE9IHVuZGVmaW5lZCAmJiBjb2x1bW5zICE9IG51bGwpe1xyXG4gICAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU29ydE9yZGVyOiBjb2x1bW5zIG11c3QgYmUgc3BlY2lmaWVkJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNvcnQgPSAoKT0+e1xyXG4gICAgICBpZihzb3J0Q2FsbGJhY2sgJiYgdHlwZW9mIHNvcnRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgc29ydENhbGxiYWNrLmNhbGwoc29ydENhbGxiYWNrU2NvcGUsdGhpcylcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmKGRlZmF1bHRTb3J0aW5nLmxlbmd0aD4wKXtcclxuICAgICAgZGVmYXVsdFNvcnRpbmcuZm9yRWFjaChpdGVtPT50aGlzLmFkZChpdGVtKSk7XHJcbiAgICAgIHRoaXMuc29ydCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGEgYGNlbGxgIGZyb20gdGhlIHRhYmxlIGFuZCBhIHJlZmVyZW5jZSBjZWxsIChgcmVmQ2VsbGApIGZyb20gdGhlIGZsb2F0aW5nIGhlYWRlciBpZiBhbnlcclxuICAgKiBAcGFyYW0geyFOdW1iZXJ9IGNvbHVtbkluZGV4IC0gaW5kZXggb2YgdGhlIGNvbHVtbiBmcm9tIHRoZSBhcnJheSBvZiBjb2x1bW5zIGZyb20ge0BsaW5rIFRhYmxlQ29sdW1uc31cclxuICAgKiBAcmV0dXJuIHt7Y2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudCwgcmVmQ2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudH19XHJcbiAgICogKi9cclxuICBnZXRDZWxsKGNvbHVtbkluZGV4KXtcclxuICAgIGlmKHR5cGVvZiBjb2x1bW5JbmRleCAhPSAndW5kZWZpbmVkJyAmJiBjb2x1bW5JbmRleCE9bnVsbCl7XHJcbiAgICAgIGxldCBjZWxscyA9IFtdO1xyXG4gICAgICBpZih0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLmNlbGwpe2NlbGxzLnB1c2godGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XS5jZWxsKX1cclxuICAgICAgaWYodGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XS5yZWZDZWxsKXtjZWxscy5wdXNoKHRoaXMuY29sdW1uc1tjb2x1bW5JbmRleF0ucmVmQ2VsbCl9XHJcbiAgICAgIHJldHVybiBjZWxscztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbHVtbkluZGV4IHBhcmFtZXRlciBzaG91bGQgbm90IGJlIG51bGwnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYW5vdGhlciBjb2x1bW4gdG8gYmUgc29ydGVkXHJcbiAgICogQHBhcmFtIHshT2JqZWN0fSBvYmogLSBvYmplY3QgZGVzY3JpYmluZyBzb3J0aW5nXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9iai5jb2x1bW4gLSBjb2x1bW4gaW5kZXhcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gb2JqLmRpcmVjdGlvbiAtIHNvcnQgZGlyZWN0aW9uIChgYXNjYHxgZGVzY2ApXHJcbiAgICogKi9cclxuXHJcbiAgYWRkIChvYmope1xyXG4gICAgdGhpcy5nZXRDZWxsKG9iai5jb2x1bW4pLmZvckVhY2goY2VsbD0+e1xyXG4gICAgICAvL2lmKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc29ydGVkJykpeyAvLyB0aGlzIGNvbHVtbiBpcyBub3Qgc29ydGVkLCB0aGVyZSBtaWdodCBiZSBvdGhlcnMgdGhhdCBhcmUuXHJcbiAgICAgICAgWydzb3J0ZWQnLG9iai5kaXJlY3Rpb25dLmZvckVhY2goY2xhc3NOYW1lPT5jZWxsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgICAgIC8vfSBlbHNlIHsgLy9zd2FwcyBzb3J0aW5nIGZyb20gYXNjIHRvIGRlc2NcclxuICAgICAgLy8gIFsnYXNjJywnZGVzYyddLmZvckVhY2goY2xhc3NOYW1lPT5jZWxsLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKSk7XHJcbiAgICAgIC8vfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNvcnRPcmRlci5wdXNoKG9iaik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgY29sdW1uIGZyb20gYHNvcnRPcmRlcmBcclxuICAgKiBAcGFyYW0ge051bWJlcn0gY29sdW1uIC0gY29sdW1uIGluZGV4IGFzIHJlZmVyZW5jZSB0byB0aGUgaXRlbSB0byBiZSByZW1vdmVkLlxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIGluZGV4IG9mIGl0ZW0gaW4gYHNvcnRPcmRlcmAgYXJyYXkgdG8gYmUgcmVtb3ZlZFxyXG4gICAqICovXHJcbiAgcmVtb3ZlIChjb2x1bW4saW5kZXgpe1xyXG4gICAgWydzb3J0ZWQnLCdhc2MnLCdkZXNjJ10uZm9yRWFjaChjbGFzc05hbWU9PntcclxuICAgICAgdGhpcy5nZXRDZWxsKGNvbHVtbikuZm9yRWFjaChjZWxsPT5jZWxsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSlcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zb3J0T3JkZXIuc3BsaWNlKGluZGV4LDEpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcGxhY2VzIGFsbCBpdGVtcyBpbiBgc29ydE9yZGVyYFxyXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gb2JqIC0gb2JqZWN0IGRlc2NyaWJpbmcgc29ydGluZ1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvYmouY29sdW1uIC0gY29sdW1uIGluZGV4XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9iai5kaXJlY3Rpb24gLSBzb3J0IGRpcmVjdGlvbiAoYGFzY2B8YGRlc2NgKVxyXG4gICAqICovXHJcbiAgcmVwbGFjZSAob2JqKXtcclxuICAgIGlmKHRoaXMuc29ydE9yZGVyLmxlbmd0aD4wKXtcclxuICAgICAgdGhpcy5zb3J0T3JkZXIuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICB0aGlzLnJlbW92ZShpdGVtLmNvbHVtbixpbmRleCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZGQob2JqKTtcclxuICAgIHRoaXMuc29ydCgpO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU29ydE9yZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3Itc29ydC10YWJsZS9zcmMvc29ydC1vcmRlci5qcyIsImltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xyXG5pbXBvcnQgVGFibGVDb2x1bW5zIGZyb20gXCIuL3RhYmxlLWNvbHVtbnNcIjtcclxuaW1wb3J0IFNvcnRPcmRlciBmcm9tIFwiLi9zb3J0LW9yZGVyXCI7XHJcblxyXG4vKipcclxuICogRXZlbnQgcmVwb3J0aW5nIHRoYXQgYSB0YWJsZSBoYXMgYmVlbiBzb3J0ZWRcclxuICogQGV2ZW50IFNvcnRUYWJsZX5yZXBvcnRhbC10YWJsZS1zb3J0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE1ha2VzIGEgdGFibGUgc29ydGFibGUsIGdpdmVzIEFQSSBmb3Igc29ydGluZy4gSXQgc29ydHMgYGRhdGFgIGFycmF5LCBidXQgZG9lc24ndCBtb3ZlIHJvd3MgaW4gdGhlIGBzb3VyY2VgIHRhYmxlLCBiZWNhdXNlIG9mIGRpZmZlcmVuY2VzIGluIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiA+IE5vdGU6IEl0J3MgaW1wb3J0YW50IHRoYXQgZXZlcnkgQXJyYXkgaXRlbSB0aGF0IGlzIGdvaW5nIHRvIGJlIHNvcnRhYmxlIHdhcyBlaXRoZXIgYSBgU3RyaW5nYCwgYSBgTnVtYmVyYCwgYSBgbnVsbGAsIG9yIGFuIGBPYmplY3RgIHRoYXQgY29udGFpbmVkIGBkYXRhYCBwcm9wZXJ0eSAod2hpY2ggd2FzIG9mIHRoZSBwcmV2aW91c2x5IG5hbWVkIHR5cGVzKVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgcGFzc2VkIHRvIGNvbmZpZ3VyZSB0aGUgU29ydGluZ1xyXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IG9wdGlvbnMuc291cmNlIC0gc291cmNlIHRhYmxlIHNvcnRpbmcgd2lsbCBiZSBhcHBsaWVkIHRvXHJcbiAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gW29wdGlvbnMucmVmU291cmNlXSAtIHRoZSBmbG9hdGluZyBoZWFkZXIgaWYgYW55LCB3aWxsIHJlZmxlY3QgYW5kIHRyaWdnZXIgc29ydGluZyBvbiBoZWFkZXIgd2hlbiBzY3JvbGxlZC5cclxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlZmF1bHRIZWFkZXJSb3c9LTFdIC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBoYXZlIHNvcnRpbmcgZW5hYmxlZCBmb3IgY29sdW1ucy4gSWYgYC0xYCB0aGVuIGxhc3Qgcm93LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5pbmNsdWRlZF0gLSBBcnJheSBvZiBjb2x1bW4gaW5kaWNlcyAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgaGF2ZSBzb3J0aW5nIGVuYWJsZWQuIElmIG5vdCBzcGVjaWZpZWQsIGFsbCBjb2x1bW5zIHdpbGwgYmUgc29ydGFibGUuIE9wdGlvbmFsbHkgYGV4Y2x1ZGVkYCBjYW4gYmUgc3BlY2lmaWVkIGluc3RlYWQgYXMgYSBzaG9ydGhhbmQgdG8gcGFzcyBvbmx5IGluZGljZXMgb2YgY29sdW1ucyB0byBiZSBleGNsdWRlZCBmcm9tIHNvcnRpbmcsIGFzc3VtbmluZyB0aGF0IG90aGVycyB3aWxsIGJlIG1hZGUgc29ydGFibGUuIEl0J3MgaW1wb3J0YW50IHRvIGNvdW50IHRoZSBjb2x1bW4gaW5kZXggaW4gdGhlIGRlZmF1bHRIZWFkZXJSb3dcclxuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuZXhjbHVkZWRdIC0gQXJyYXkgb2YgY29sdW1uIGluZGljZXMgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGJlIGV4Y2x1ZGVkIGZyb20gc29ydGluZy4gQ2FuIGJlIHVzZWQgYXMgYSBzaG9ydGhhbmQgaW5zdGVhZCBvZiBgaW5jbHVkZWRgLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuZGVmYXVsdFNvcnRpbmddIC0gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IHNwZWNpZnkgZGVmYXVsdCBzb3J0aW5nXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRlZmF1bHRTb3J0aW5nLmNvbHVtbiAtIGNvbHVtbiBpbmRleFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5kZWZhdWx0U29ydGluZy5kaXJlY3Rpb24gLSBzb3J0IGRpcmVjdGlvbiAoYGFzY2B8YGRlc2NgKVxyXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmRhdGEgLSBkYXRhIHdpdGggaW5mb3JtYXRpb24gZm9yIHJvd3MgdG8gYmUgc29ydGVkXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubXVsdGlkaW1lbnNpb25hbD1mYWxzZV0gLSBpZiBgZGF0YWAgaXMgc2luZ2xlLWRpbWVuc2lvbmFsIChjb250YWlucyByb3dzIHdpdGggZGF0YSB0byBiZSBzb3J0ZWQgYXMgaW1tZWRpYXRlIGFycmF5IGl0ZW1zOiBgZGF0YSBbcm93SXRlbS4uLl1gKSwgdGhlbiBpdCBpcyBgZmFsc2VgLiBJZiBpdCBoYXMgYmxvY2tzIG9mIGRhdGEgYXMgaXRlbXMgKGVhY2ggYmxvY2sgY29udGFpbmluZyBhbiBhcnJheSBvZiByb3dzIHRvIGJlIHNvcnRlZDogZGF0YSBbYmxvY2sgW3Jvd0l0ZW0uLi5dLi4uXSksIHRoZW4gc2V0IGl0IHRvIGB0cnVlYC4gQ3VycmVudGx5IGl0IHN1cHBvcnRzIG9ubHkgYSB0d28tbGV2ZWwgYWdncmVnYXRpb24gbWF4IChkYXRhLT5ibG9jay0+cm93SXRlbSkuXHJcbiAqIEBwcm9wIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGVcclxuICogQHByb3Age0FycmF5fSBkYXRhIC0gZGF0YSBhcnJheSB0byBiZSBzb3J0ZWRcclxuICogQHByb3Age0Jvb2xlYW59IG11bHRpZGltZW5zaW9uYWwgLSBpZiBgZGF0YWAgaXMgbW9uby1kaW1lbnNpb25hbCAoY29udGFpbnMgcm93cyB3aXRoIGRhdGEgdG8gYmUgc29ydGVkIGFzIGltbWVkaWF0ZSBhcnJheSBpdGVtczogYGRhdGEgW3Jvd0l0ZW0uLi5dYCksIHRoZW4gaXQgaXMgYGZhbHNlYC4gSWYgaXQgaGFzIGJsb2NrcyBvZiBkYXRhIGFzIGl0ZW1zIChlYWNoIGJsb2NrIGNvbnRhaW5pbmcgYW4gYXJyYXkgb2Ygcm93cyB0byBiZSBzb3J0ZWQ6IGRhdGEgW2Jsb2NrIFtyb3dJdGVtLi4uXS4uLl0pLCB0aGVuIHNldCBpdCB0byBgdHJ1ZWAuIEN1cnJlbnRseSBpdCBzdXBwb3J0cyBvbmx5IGEgdHdvLWxldmVsIGFnZ3JlZ2F0aW9uIG1heCAoZGF0YS0+YmxvY2stPnJvd0l0ZW0pLlxyXG4gKiBAcHJvcCB7U29ydE9yZGVyfSBzb3J0T3JkZXIgLSBpbnN0YW5jZSBvZiB7QGxpbmsgU29ydE9yZGVyfVxyXG4gKiBAcHJvcCB7VGFibGVDb2x1bW5zfSBjb2x1bW5zIC0gaW5zdGFuY2Ugb2Yge0BsaW5rIFRhYmxlQ29sdW1uc30gd2l0aCBhIG1vZGlmaWVkIHByb3RvdHlwZSAoYWRkZWQgYHNvcnRhYmxlOnRydWVgIGFuZCBgLnNvcnRhYmxlYCB0byBzb3J0YWJsZSBjb2x1bW5zKVxyXG4gKiBAY2xhc3MgU29ydFRhYmxlXHJcbiAqICovXHJcbmNsYXNzIFNvcnRUYWJsZSB7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKlxyXG4gICAqICAqL1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuICAgIGxldCB7c291cmNlLHJlZlNvdXJjZSxkZWZhdWx0SGVhZGVyUm93PS0xLGluY2x1ZGVkLGV4Y2x1ZGVkLGRlZmF1bHRTb3J0aW5nPVtdLGRhdGE9W10sbXVsdGlkaW1lbnNpb25hbD1mYWxzZX09b3B0aW9ucztcclxuICAgIHRoaXMuX3NvcnRFdmVudCA9IFJlcG9ydGFsQmFzZS5uZXdFdmVudCgncmVwb3J0YWwtdGFibGUtc29ydCcpO1xyXG5cclxuICAgICAgaWYoc291cmNlKXtcclxuICAgICAgICB0aGlzLnNvdXJjZT1zb3VyY2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgc291cmNlYCB0YWJsZSBpcyBub3Qgc3BlY2lmaWVkIGZvciBTb3J0VGFibGUnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICB0aGlzLm11bHRpZGltZW5zaW9uYWwgPSBtdWx0aWRpbWVuc2lvbmFsO1xyXG5cclxuICAgICAgLy9sZXQgdGFibGVDb2x1bW5zPSBuZXcgVGFibGVDb2x1bW5zKHtzb3VyY2UsIHJlZlNvdXJjZSwgZGVmYXVsdEhlYWRlclJvd30pO1xyXG4gICAgICBsZXQgc29ydGFibGVDb2x1bW5zPVNvcnRUYWJsZS5kZWZpbmVTb3J0YWJsZUNvbHVtbnMobmV3IFRhYmxlQ29sdW1ucyh7c291cmNlLCByZWZTb3VyY2UsIGRlZmF1bHRIZWFkZXJSb3d9KSwgaW5jbHVkZWQsIGV4Y2x1ZGVkKTtcclxuICAgICAgdGhpcy5jb2x1bW5zID0gc29ydGFibGVDb2x1bW5zO1xyXG4gICAgICAvLyBzZXR1cCBzb3J0IG9yZGVyIGFuZCBkbyBpbml0aWFsIGRlZmF1bHQgc29ydGluZ1xyXG4gICAgICB0aGlzLnNvcnRPcmRlciA9IHtzb3J0T3JkZXI6W119ID0gbmV3IFNvcnRPcmRlcih7Y29sdW1uczpzb3J0YWJsZUNvbHVtbnMsIHNvcnRDYWxsYmFjazp0aGlzLnNvcnQsIHNvcnRDYWxsYmFja1Njb3BlOnRoaXMsIGRlZmF1bHRTb3J0aW5nfSk7XHJcbiAgICAgIFtzb3VyY2UscmVmU291cmNlXS5mb3JFYWNoKHNyYz0+e2lmKHNyYyl7U29ydFRhYmxlLmxpc3RlbkZvclNvcnQoVGFibGVDb2x1bW5zLmdldEhlYWRlcihzcmMpLHNvcnRhYmxlQ29sdW1ucywgdGhpcy5zb3J0T3JkZXIpfX0pOy8vIHNldCB1cCBsaXN0ZW5lcnMgZm9yIGhlYWRlcnNcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRoZSB0YWJsZSBjb2x1bW5zIGFycmF5IGFnYWluc3QgdGhlIGBpbmNsdWRlZGAvYGV4Y2x1ZGVkYCBjb2x1bW5zIGFycmF5cyBhbmQgYWRkcyBhIGBzb3J0YWJsZTp0cnVlYCBwcm9wZXJ0eSBhbmQgYSBgLnNvcnRhYmxlYCBjbGFzcyB0byB0aGUgc29ydGFibGUgb25lc1xyXG4gICAqIEBwYXJhbSB7VGFibGVDb2x1bW5zfSBjb2x1bW5zIC0gYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFRhYmxlQ29sdW1uc31cclxuICAgKiBAcGFyYW0ge0FycmF5fSBbaW5jbHVkZWRdIC0gYXJyYXkgb2YgaW5jbHVkZWQgY29sdW1ucyBpbmRpY2VzXHJcbiAgICogQHBhcmFtIHtBcnJheX0gW2V4Y2x1ZGVkXSAtIGFycmF5IG9mIGV4Y2x1ZGVkIGNvbHVtbnMgaW5kaWNlc1xyXG4gICAqICovXHJcbiAgc3RhdGljIGRlZmluZVNvcnRhYmxlQ29sdW1ucyhjb2x1bW5zLCBpbmNsdWRlZCwgZXhjbHVkZWQpe1xyXG4gICAgbGV0IHNvcnRhYmxlQ29sdW1ucyA9IFtdLnNsaWNlLmNhbGwoY29sdW1ucyk7XHJcbiAgICBzb3J0YWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLGluZGV4KT0+e1xyXG4gICAgICBsZXQgc29ydGFibGU9KCghaW5jbHVkZWQgJiYgIWV4Y2x1ZGVkKSB8fCAoaW5jbHVkZWQgJiYgaW5jbHVkZWQuaW5kZXhPZihpbmRleCkhPS0xKSB8fCAoZXhjbHVkZWQgJiYgZXhjbHVkZWQuaW5kZXhPZihpbmRleCk9PS0xKSk7XHJcbiAgICAgIGlmKHNvcnRhYmxlKXtcclxuICAgICAgICBjb2x1bW4uY2VsbC5jbGFzc0xpc3QuYWRkKCdzb3J0YWJsZScpO1xyXG4gICAgICAgIGlmKGNvbHVtbi5yZWZDZWxsKXtjb2x1bW4ucmVmQ2VsbC5jbGFzc0xpc3QuYWRkKCdzb3J0YWJsZScpO31cclxuICAgICAgICBjb2x1bW4uc29ydGFibGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzb3J0YWJsZUNvbHVtbnNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldHMgdXAgbGlzdGVuZXJzIGZvciBjb2x1bW4gaGVhZGVycyBhdmFpbGFibGUgZm9yIGNsaWNrXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZGVsZWdhdGVkVGFyZ2V0IC0gZWxlbWVudCB0aGF0IHdpbGwgcmVjZWl2ZSBjbGlja3MgYW5kIHNlZSBpZiB0aGV5IGFyZSB2YWxpZCwgYHRoZWFkYCBpcyByZWNvbW1lbmRlZCB0byBib2lsIGRvd24gdG8gaGVhZGVyIGNsaWNrcyBvbmx5XHJcbiAgICogQHBhcmFtIHtUYWJsZUNvbHVtbnN9IGNvbHVtbnMgLSBhcnJheSBvZiB0YWJsZSBjb2x1bW5zIGZyb20ge0BsaW5rIFNvcnRUYWJsZSNkZWZpbmVTb3J0YWJsZUNvbHVtbnN9XHJcbiAgICogQHBhcmFtIHtTb3J0T3JkZXJ9IHNvcnRPcmRlciAtIGluc3RhbmNlIG9mIHtAbGluayBTb3J0T3JkZXJ9XHJcbiAgICogQGxpc3RlbnMgY2xpY2tcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBsaXN0ZW5Gb3JTb3J0KGRlbGVnYXRlZFRhcmdldCwgY29sdW1ucywgc29ydE9yZGVyKXtcclxuICAgIGRlbGVnYXRlZFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZT0+e1xyXG4gICAgICAvLyBpZiBpdCdzIGEgdGFibGUgY2VsbCwgaXMgaW4gY29sdW1ucyBhcnJheSBhbmQgaXMgc29ydGFibGVcclxuICAgICAgbGV0IGNsaWNrZWRDb2x1bW47XHJcbiAgICAgIGZvcihsZXQgaT0wO2k8Y29sdW1ucy5sZW5ndGg7aSsrKXtcclxuICAgICAgICBpZihlLnRhcmdldD09Y29sdW1uc1tpXS5jZWxsIHx8IGUudGFyZ2V0PT1jb2x1bW5zW2ldLnJlZkNlbGwpe1xyXG4gICAgICAgICAgY2xpY2tlZENvbHVtbj0gY29sdW1uc1tpXTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKChlLnRhcmdldC50YWdOYW1lID09ICdURCcgfHwgZS50YXJnZXQudGFnTmFtZSA9PSAnVEgnKSAmJiBjbGlja2VkQ29sdW1uLnNvcnRhYmxlKXtcclxuICAgICAgICBzb3J0T3JkZXIucmVwbGFjZSh7Y29sdW1uOmNvbHVtbnMuaW5kZXhPZihjbGlja2VkQ29sdW1uKSwgZGlyZWN0aW9uOiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FzYycpPydkZXNjJzonYXNjJ30pO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIGNoYW5uZWxpbmcgb2Ygc29ydGluZyBiYXNlZCBvbiB3aGV0aGVyIGB0aGlzLmRhdGFgIGlzIGBtdWx0aWRpbWVuc2lvbmFsYFxyXG4gICAqIEBwYXJhbSB7U29ydE9yZGVyfSBzb3J0T3JkZXIgLSBpbnN0YW5jZSBvZiB7QGxpbmsgU29ydE9yZGVyfSBwYXNzZWQgYnkgdGhlIHtAbGluayBTb3J0T3JkZXIjc29ydH0gb24gaW5pdGlhbCBzb3J0XHJcbiAgICogQGZpcmVzIFNvcnRUYWJsZX5yZXBvcnRhbC10YWJsZS1zb3J0XHJcbiAgICogKi9cclxuICBzb3J0KHNvcnRPcmRlcil7XHJcbiAgICBsZXQgc28gPSBzb3J0T3JkZXIuc29ydE9yZGVyIHx8IHRoaXMuc29ydE9yZGVyLnNvcnRPcmRlcixcclxuICAgICAgY29sdW1ucyA9IHRoaXMuY29sdW1ucztcclxuICAgIGlmKHNvICYmIHNvLmxlbmd0aD4wKXtcclxuICAgICAgaWYoIXRoaXMubXVsdGlkaW1lbnNpb25hbCl7XHJcbiAgICAgICAgU29ydFRhYmxlLnNvcnREaW1lbnNpb24odGhpcy5kYXRhLCBjb2x1bW5zLCBzbyk7XHJcbiAgICAgIH0gZWxzZSB7IC8vIGlmIGFycmF5IGhhcyBuZXN0ZWQgYXJyYXkgYmxvY2tzXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goZGltZW5zaW9uPT57XHJcbiAgICAgICAgICBTb3J0VGFibGUuc29ydERpbWVuc2lvbihkaW1lbnNpb24sIHRoaXMuY29sdW1ucywgc28pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbHVtbnNbc29bMF0uY29sdW1uXS5jZWxsLmRpc3BhdGNoRXZlbnQodGhpcy5fc29ydEV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogU3BsaXRzIHNvcnRpbmcgaW50byBvbmUtY29sdW1uIG9yIHR3by1jb2x1bW4uIFRoZSBwcmVjZWRlbmNlIG9mIGNvbHVtbnMgaW4gYHNvcnRPcmRlcmAgaXMgdGhlIGZhY3RvciBkZWZpbmluZyBzb3J0IHByaW9yaXR5XHJcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YSAtIGFycmF5IGNvbnRhaW5pbmcgcm93IGl0ZW1zIHRvIGJlIHNvcnRlZFxyXG4gICAqIEBwYXJhbSB7VGFibGVDb2x1bW5zfSBjb2x1bW5zIC0gYXJyYXkgb2YgdGFibGUgY29sdW1ucyBmcm9tIHtAbGluayBTb3J0VGFibGUjZGVmaW5lU29ydGFibGVDb2x1bW5zfVxyXG4gICAqIEBwYXJhbSB7U29ydE9yZGVyfSBzb3J0T3JkZXIgLSBpbnN0YW5jZSBvZiB7QGxpbmsgU29ydE9yZGVyfVxyXG4gICAqICovXHJcbiAgc3RhdGljIHNvcnREaW1lbnNpb24oZGF0YSxjb2x1bW5zLHNvcnRPcmRlcil7XHJcbiAgICBsZXQgZ2V0SW5kZXggPSAoaSk9PntyZXR1cm4gY29sdW1uc1tzb3J0T3JkZXJbaV0uY29sdW1uXS5pbmRleH07XHJcbiAgICBsZXQgZ2V0RGlyZWN0aW9uPShpKT0+e3JldHVybiBzb3J0T3JkZXJbaV0uZGlyZWN0aW9uID09PSAnZGVzYycgPyAtMSA6IDF9O1xyXG4gICAgLy8gVE9ETzogYWRkIHBvc3NpYmlsaXR5IHRvIHNvcnQgdGhlIGRhdGEgdGhhdCB3YXMgc3RyaXBwZWQgYnkgY29sdW1uLlxyXG4gICAgZGF0YS5zb3J0KChhLCBiKT0+eyAvLyBzb3J0IHJvd3NcclxuICAgICAgaWYoc29ydE9yZGVyLmxlbmd0aD09MSl7IC8vc29ydCBvbmUgY29sdW1uIG9ubHlcclxuICAgICAgICByZXR1cm4gU29ydFRhYmxlLnNvcnRlciggYVtnZXRJbmRleCgwKV0sIGJbZ2V0SW5kZXgoMCldLCBnZXREaXJlY3Rpb24oMCkgKVxyXG4gICAgICB9IGVsc2UgeyAvL3NvcnQgYWdhaW5zdCB0d28gY29sdW1uc1xyXG4gICAgICAgIHJldHVybiBTb3J0VGFibGUuc29ydGVyKCBhW2dldEluZGV4KDApXSwgYltnZXRJbmRleCgwKV0sIGdldERpcmVjdGlvbigwKSApIHx8IFNvcnRUYWJsZS5zb3J0ZXIoIGFbZ2V0SW5kZXgoMSldLCBiW2dldEluZGV4KDEpXSwgZ2V0RGlyZWN0aW9uKDEpIClcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0aGF0IHBlcmZvcm1zIGNhc2UgaW5zZW5zaXRpdmUgc29ydGluZyBpbiB0aGUgYXJyYXkuIEl0IGNhbiBkaXN0aW5ndWlzaCBiZXR3ZWVuIG51bWJlcnMsIG51bWJlcnMgYXMgc3RyaW5ncywgSFRNTCBhbmQgcGxhaW4gc3RyaW5nc1xyXG4gICAqICovXHJcbiAgc3RhdGljIHNvcnRlcihhLGIsbGVzc2VyKXtcclxuICAgIGxldCByZWdleCA9IC9bPD5dL2c7XHJcbiAgICBpZihyZWdleC50ZXN0KGEpIHx8IHJlZ2V4LnRlc3QoYikpeyAvLyBpZiB3ZSBuZWVkIHRvIHNvcnQgZWxlbWVudHMgdGhhdCBoYXZlIEhUTUwgbGlrZSBsaW5rc1xyXG4gICAgICBsZXQgdGVtcEVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgdGVtcEVsMS5pbm5lckhUTUwgPSBhO1xyXG4gICAgICBhPXRlbXBFbDEudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgICBsZXQgdGVtcEVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgdGVtcEVsMi5pbm5lckhUTUwgPSBiO1xyXG4gICAgICBiPXRlbXBFbDIudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgaWYodHlwZW9mIGE9PSdvYmplY3QnICYmIHR5cGVvZiBhLmRhdGEgIT0gdW5kZWZpbmVkKXthPWEuZGF0YX1cclxuICAgIGlmKHR5cGVvZiBiPT0nb2JqZWN0JyAmJiB0eXBlb2YgYi5kYXRhICE9IHVuZGVmaW5lZCl7Yj1iLmRhdGF9XHJcbiAgICBpZighaXNOYU4oYSkgJiYgIWlzTmFOKGIpKXsgLy90aGV5IG1pZ2h0IGJlIG51bWJlcnMgb3IgbnVsbFxyXG4gICAgICBpZihhPT09bnVsbCl7cmV0dXJuIDF9IGVsc2UgaWYgKGI9PT1udWxsKXtyZXR1cm4gLTF9XHJcbiAgICAgIHJldHVybiBhIDwgIGIgPyBsZXNzZXIgOiAgYSA+ICBiID8gLWxlc3NlciA6IDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKCFpc05hTihwYXJzZUZsb2F0KGEpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChiKSkpeyAvLyB0aGV5IG1pZ2h0IGJlIG51bWJlciBzdHJpbmdzXHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEpIDwgIHBhcnNlRmxvYXQoYikgPyBsZXNzZXIgOiAgcGFyc2VGbG9hdChhKSA+ICBwYXJzZUZsb2F0KGIpID8gLWxlc3NlciA6IDA7XHJcbiAgICB9IGVsc2UgeyAvL3RoZXkgbWlnaHQgYmUgc2ltcGxlIHN0cmluZ3NcclxuICAgICAgcmV0dXJuIGEudG9Mb3dlckNhc2UoKSA8IGIudG9Mb3dlckNhc2UoKSA/IGxlc3NlciA6IGEudG9Mb3dlckNhc2UoKSA+IGIudG9Mb3dlckNhc2UoKSA/IC1sZXNzZXIgOiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNvcnRUYWJsZVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3Itc29ydC10YWJsZS9zcmMvc29ydC10YWJsZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDA5LjA5LjIwMTYuXHJcbiAqL1xyXG5cclxuY2xhc3MgVGFibGVDb2x1bW5ze1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBjb3JyZXNwb25kaW5nIHRvIHRoZSBjZWxscyBvZiBgZGVmYXVsdEhlYWRlclJvd2AsIHRoYXQgY29udGFpbiBgc29ydGFibGVgIHByb3BlcnR5LCBkZW5vdGluZyB0aGUgY29sdW1uIGlzIHNvcnRhYmxlLFxyXG4gICAqIGBpbmRleGAgb2YgdGhlIGNvbHVtbiBhbmQgcmVmZXJlbmNlIHRvIHRoZSBgY2VsbGAuIEFkZHMgYC5zb3J0YWJsZWAgdG8gYSBzb3J0YWJsZSBjZWxsXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHBhc3NlZCB0byBjb25maWd1cmUgdGhlIFNvcnRpbmdcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IG9wdGlvbnMuc291cmNlIC0gc291cmNlIHRhYmxlIHNvcnRpbmcgd2lsbCBiZSBhcHBsaWVkIHRvXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBvcHRpb25zLnJlZlNvdXJjZSAtIGZsb2F0aW5nIGhlYWRlciBpZiBhbnlcclxuICAgKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IFtvcHRpb25zLmRlZmF1bHRIZWFkZXJSb3c9LTFdIC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBoYXZlIHNvcnRpbmcgZW5hYmxlZCBmb3IgY29sdW1ucy4gSWYgYC0xYCB0aGVuIGxhc3Qgcm93LlxyXG4gICAqIEByZXR1cm4ge3tpbmRleDpOdW1iZXIsIHRpdGxlOlN0cmluZywgY29sU3BhbjpOdW1iZXIsIGNlbGw6IEhUTUxUYWJsZUNlbGxFbGVtZW50LCA/cmVmQ2VsbDpIVE1MVGFibGVDZWxsRWxlbWVudH19IC0gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IGhhdmUgdGhpcyBzdHJ1Y3R1cmVcclxuICAgKiAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xyXG4gICAgbGV0IHtzb3VyY2UscmVmU291cmNlLGRlZmF1bHRIZWFkZXJSb3c9LTF9ID0gb3B0aW9ucztcclxuICAgIGxldCB0aGVhZCxyZWZUaGVhZDtcclxuICAgIGlmKHNvdXJjZSl7dGhlYWQ9VGFibGVDb2x1bW5zLmdldEhlYWRlcihzb3VyY2UpfSBlbHNlIHt0aHJvdyBuZXcgVHlwZUVycm9yKCdgc291cmNlYCB0YWJsZSBpcyBub3Qgc3BlY2lmaWVkLCBjYW5ub3QgY3JlYXRlIFRhYmxlQ29sdW1ucycpfVxyXG4gICAgaWYocmVmU291cmNlKXtyZWZUaGVhZD1UYWJsZUNvbHVtbnMuZ2V0SGVhZGVyKHJlZlNvdXJjZSl9XHJcbiAgICByZXR1cm4gVGFibGVDb2x1bW5zLmNvbXB1dGVDb2x1bW5zKHRoZWFkLHJlZlRoZWFkLGRlZmF1bHRIZWFkZXJSb3cpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGhlYWRlclxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gc291cmNlIC0gc291cmNlIHRhYmxlIGhlYWRlcnMgYXJlIGNyZWF0ZWQgZm9yXHJcbiAgICogKi9cclxuICBzdGF0aWMgZ2V0SGVhZGVyKHNvdXJjZSl7XHJcbiAgICBpZihzb3VyY2UgJiYgc291cmNlLnRhZ05hbWUgPT0gJ1RBQkxFJyl7XHJcbiAgICAgIGxldCBoZWFkZXIgPSBzb3VyY2UucXVlcnlTZWxlY3RvcihcInRoZWFkXCIpO1xyXG4gICAgICBpZihoZWFkZXIgJiYgaGVhZGVyLmNoaWxkcmVuLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgc291cmNlYCB0YWJsZSBoYXMgbm8gaGVhZGVyIG9yIHJvd3MnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYHNvdXJjZWAgaXMgbm90IHNwZWNpZmllZCBvciBpcyBub3QgYSB0YWJsZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyBkZWZhdWx0SGVhZGVyUm93IGZvciBhIHBhc3NlZCBgdGhlYWRgXHJcbiAgICogQHBhcmFtIHshSFRNTFRhYmxlRWxlbWVudH0gdGhlYWQgLSBzb3VyY2UgdGFibGUgaGVhZGVyXHJcbiAgICogQHBhcmFtIHshTnVtYmVyfSBkZWZhdWx0SGVhZGVyUm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGJlIGNvbnNpZGVyZWQgZGVmYXVsdCB0byBoYXZlIGFjdGlvbnMgZXhlY3V0ZWQgdXBvbi5cclxuICAgKiBAcmV0dXJuIHt7aW5kZXg6TnVtYmVyLCByb3c6IEhUTUxUYWJsZVJvd0VsZW1lbnR9fVxyXG4gICAqICovXHJcbiAgc3RhdGljIGdldERlZmF1bHRIZWFkZXJSb3codGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KXtcclxuICAgIC8vIGNhbGN1bGF0ZSBkZWZhdWx0IGhlYWRlciByb3dcclxuICAgIGxldCBoZWFkZXJSb3dzID0gdGhlYWQuY2hpbGRyZW4sXHJcbiAgICAgIGhlYWRlclJvd0luZGV4ID0gZGVmYXVsdEhlYWRlclJvd0luZGV4PT0tMSA/IGhlYWRlclJvd3MubGVuZ3RoICsgZGVmYXVsdEhlYWRlclJvd0luZGV4IDogZGVmYXVsdEhlYWRlclJvd0luZGV4O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5kZXg6aGVhZGVyUm93SW5kZXgsXHJcbiAgICAgIHJvdzpoZWFkZXJSb3dzLml0ZW0oaGVhZGVyUm93SW5kZXgpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhbiBhcnJheSBvZiBoZWFkZXIgY2VsbCBub2RlcyBmcm9tIGRlZmF1bHQgaGVhZGVyIHJvd1xyXG4gICAqIEBwYXJhbSB7P0hUTUxUYWJsZUVsZW1lbnR9IHRoZWFkIC0gc291cmNlIHRhYmxlIGhlYWRlclxyXG4gICAqIEBwYXJhbSB7IU51bWJlcn0gZGVmYXVsdEhlYWRlclJvd0luZGV4IC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBiZSBjb25zaWRlcmVkIGRlZmF1bHQgdG8gaGF2ZSBhY3Rpb25zIGV4ZWN1dGVkIHVwb24uXHJcbiAgICogQHJldHVybiB7P0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGhlYWRlciBjZWxsIG5vZGVzIG9yIG51bGwgaWYgYHRoZWFkYCBpcyBub3Qgc3BlY2lmaWVkXHJcbiAgICogKi9cclxuICBzdGF0aWMgZ2V0SGVhZGVyQ2VsbHModGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KXtcclxuICAgIGlmKHRoZWFkKXtcclxuICAgICAgaWYoZGVmYXVsdEhlYWRlclJvd0luZGV4IT1udWxsKXtcclxuICAgICAgICBsZXQgZGVmYXVsdEhlYWRlclJvdyA9IFRhYmxlQ29sdW1ucy5nZXREZWZhdWx0SGVhZGVyUm93KHRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCk7XHJcbiAgICAgICAgbGV0IGhlYWRlclJvd3MgPSB0aGVhZC5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgcm93c0xlbmd0aCA9IGhlYWRlclJvd3MubGVuZ3RoO1xyXG4gICAgICAgIGxldCBhYnN0ciA9IHt9O1xyXG4gICAgICAgIGZvcihsZXQgcj0wO3I8cm93c0xlbmd0aDtyKyspe1xyXG4gICAgICAgICAgbGV0IHJvdyA9IGhlYWRlclJvd3MuaXRlbShyKTtcclxuICAgICAgICAgIGxldCBhdWdtZW50SW5kZXg9MDsgLy8gaW5kZXggdGhhdCB3aWxsIGFjY291bnQgZm9yIGNvbFNwYW4gb2YgdXBwZXIgcm93cycgY2VsbHNcclxuICAgICAgICAgIFtdLnNsaWNlLmNhbGwocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLGluZGV4KT0+eyAvL2l0ZXJhdGUgdGhyb3VnaCBjZWxsc1xyXG4gICAgICAgICAgICBmb3IobGV0IHJzPTA7IHJzPD1jZWxsLnJvd1NwYW4tMTtycysrKXsgLy9zcHJlYWQgY2VsbCBhY3Jvc3MgaXRzIHJvd3NwYW5cclxuICAgICAgICAgICAgICBsZXQgcm93QSA9IGFic3RyW3IrcnNdID0gYWJzdHJbcityc10gfHwge307IC8vY3JlYXRlIHJvdyBpZiBub3QgZXhpc3RzXHJcbiAgICAgICAgICAgICAgaWYoIXJvd0FbYXVnbWVudEluZGV4XSl7IC8vaW5zZXJ0IGNlbGwgaW50byBzbG90IGlmIG5vdCBmaWxsZWRcclxuICAgICAgICAgICAgICAgIHJvd0FbYXVnbWVudEluZGV4XT1jZWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7IC8vaWYgZmlsbGVkIGxvb2sgZm9yIHRoZSBuZXh0IGVtcHR5IGJlY2F1c2Ugcm93c3Bhbm5lZCBjb2x1bW5zIGZpbGwgdGhlbSBpbiBhIGxpbmVhciB3YXlcclxuICAgICAgICAgICAgICAgIGxldCBpPTA7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSh0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgaWYoIXJvd0FbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0FbaV09Y2VsbDtcclxuICAgICAgICAgICAgICAgICAgICBhdWdtZW50SW5kZXg9aTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGF1Z21lbnRJbmRleCs9Y2VsbC5jb2xTcGFuO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGFic3RyW2RlZmF1bHRIZWFkZXJSb3cuaW5kZXhdKS5tYXAoayA9PiBhYnN0cltkZWZhdWx0SGVhZGVyUm93LmluZGV4XVtrXSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUYWJsZUNvbHVtbnMuZ2V0SGVhZGVyQ2VsbHM6IGRlZmF1bHRIZWFkZXJSb3dJbmRleCBpcyBub3Qgc3BlY2lmaWVkIG9yIGlzIG5vdCBhIE51bWJlcicpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGNvbHVtbnMgZnJvbSB0aGUgdGFibGVcclxuICAgKiBAcGFyYW0geyFIVE1MVGFibGVFbGVtZW50fSB0aGVhZCAtIHNvdXJjZSB0YWJsZSBoZWFkZXJcclxuICAgKiBAcGFyYW0geyFIVE1MVGFibGVFbGVtZW50fSByZWZUaGVhZCAtIHJlZmVyZW5jZSB0YWJsZSBoZWFkZXIgZnJvbSBmbG9hdGluZyBoZWFkZXIgaWYgYW55XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlZmF1bHRIZWFkZXJSb3dJbmRleCAtIGluZGV4IG9mIHRoZSByb3cgaW4gYHRoZWFkYCAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgYmUgY29uc2lkZXJlZCBkZWZhdWx0IHRvIGhhdmUgYWN0aW9ucyBleGVjdXRlZCB1cG9uLlxyXG4gICAqIEByZXR1cm4gez9BcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBoZWFkZXIgY2VsbCBub2RlcyBvciBudWxsIGlmIGB0aGVhZGAgaXMgbm90IHNwZWNpZmllZFxyXG4gICAqICovXHJcbiAgc3RhdGljIGNvbXB1dGVDb2x1bW5zKHRoZWFkLHJlZlRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCl7XHJcbiAgICBsZXQgdGhlYWRDZWxscyA9IFRhYmxlQ29sdW1ucy5nZXRIZWFkZXJDZWxscyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpO1xyXG4gICAgbGV0IHJlZlRoZWFkQ2VsbHMgPSBUYWJsZUNvbHVtbnMuZ2V0SGVhZGVyQ2VsbHMocmVmVGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KTtcclxuICAgIGxldCByZWFsQ29sdW1uSW5kZXg9MDtcclxuICAgIHJldHVybiB0aGVhZENlbGxzLm1hcCgoY2VsbCxpbmRleCk9PntcclxuICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBpbmRleDogcmVhbENvbHVtbkluZGV4LFxyXG4gICAgICAgIHRpdGxlOiBjZWxsLnRleHRDb250ZW50LFxyXG4gICAgICAgIGNlbGwsXHJcbiAgICAgICAgY29sU3BhbjpjZWxsLmNvbFNwYW5cclxuICAgICAgfTtcclxuICAgICAgaWYocmVmVGhlYWRDZWxscyE9bnVsbCl7b2JqLnJlZkNlbGwgPSByZWZUaGVhZENlbGxzW2luZGV4XX1cclxuICAgICAgLy8gd2UgbmVlZCB0byBpbmNyZW1lbnQgdGhlIGNvbHNwYW4gb25seSBmb3IgY29sdW1ucyB0aGF0IGZvbGxvdyByb3doZWFkZXIgYmVjYXVzZSB0aGUgYmxvY2sgaXMgbm90IGluIGRhdGEuXHJcbiAgICAgIHJlYWxDb2x1bW5JbmRleD0gcmVhbENvbHVtbkluZGV4PjA/KHJlYWxDb2x1bW5JbmRleCArIGNlbGwuY29sU3Bhbik6cmVhbENvbHVtbkluZGV4KzE7XHJcbiAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVGFibGVDb2x1bW5zO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3Itc29ydC10YWJsZS9zcmMvdGFibGUtY29sdW1ucy5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEl2YW5QIG9uIDA3LjA5LjIwMTYuXHJcbiAqL1xyXG5pbXBvcnQgVGFibGVDb2x1bW5zIGZyb20gXCIuL3RhYmxlLWNvbHVtbnNcIjtcclxuaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcblxyXG53aW5kb3cuUmVwb3J0YWwgPSB3aW5kb3cuUmVwb3J0YWwgfHwge307XHJcblJlcG9ydGFsQmFzZS5taXhpbih3aW5kb3cuUmVwb3J0YWwse1xyXG4gIFRhYmxlQ29sdW1ucyxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbnM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci10YWJsZS1jb2x1bW5zL3NyYy9tYWluLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSXZhblAgb24gMDkuMDkuMjAxNi5cclxuICovXHJcblxyXG5jbGFzcyBUYWJsZUNvbHVtbnN7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvYmplY3RzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNlbGxzIG9mIGBkZWZhdWx0SGVhZGVyUm93YC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgcGFzc2VkIHRvIGNvbmZpZ3VyZSB0aGUgU29ydGluZ1xyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBzb3VyY2UgdGFibGUgc29ydGluZyB3aWxsIGJlIGFwcGxpZWQgdG9cclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IG9wdGlvbnMucmVmU291cmNlIC0gZmxvYXRpbmcgaGVhZGVyIGlmIGFueVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gW29wdGlvbnMuZGVmYXVsdEhlYWRlclJvdz0tMV0gLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGhhdmUgc29ydGluZyBlbmFibGVkIGZvciBjb2x1bW5zLiBJZiBgLTFgIHRoZW4gbGFzdCByb3cuXHJcbiAgICogQHJldHVybiB7e2luZGV4Ok51bWJlciwgdGl0bGU6U3RyaW5nLCBjb2xTcGFuOk51bWJlciwgY2VsbDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQsID9yZWZDZWxsOkhUTUxUYWJsZUNlbGxFbGVtZW50fX0gLSBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgaGF2ZSB0aGlzIHN0cnVjdHVyZVxyXG4gICAqICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucyl7XHJcbiAgICBsZXQge3NvdXJjZSxyZWZTb3VyY2UsZGVmYXVsdEhlYWRlclJvdz0tMX0gPSBvcHRpb25zO1xyXG4gICAgbGV0IHRoZWFkLHJlZlRoZWFkO1xyXG4gICAgaWYoc291cmNlKXt0aGVhZD1UYWJsZUNvbHVtbnMuZ2V0SGVhZGVyKHNvdXJjZSl9IGVsc2Uge3Rocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIHRhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIGNhbm5vdCBjcmVhdGUgVGFibGVDb2x1bW5zJyl9XHJcbiAgICBpZihyZWZTb3VyY2Upe3JlZlRoZWFkPVRhYmxlQ29sdW1ucy5nZXRIZWFkZXIocmVmU291cmNlKX1cclxuICAgIHJldHVybiBUYWJsZUNvbHVtbnMuY29tcHV0ZUNvbHVtbnModGhlYWQscmVmVGhlYWQsZGVmYXVsdEhlYWRlclJvdyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGEgaGVhZGVyXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGUgaGVhZGVycyBhcmUgY3JlYXRlZCBmb3JcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBnZXRIZWFkZXIoc291cmNlKXtcclxuICAgIGlmKHNvdXJjZSAmJiBzb3VyY2UudGFnTmFtZSA9PSAnVEFCTEUnKXtcclxuICAgICAgbGV0IGhlYWRlciA9IHNvdXJjZS5xdWVyeVNlbGVjdG9yKFwidGhlYWRcIik7XHJcbiAgICAgIGlmKGhlYWRlciAmJiBoZWFkZXIuY2hpbGRyZW4ubGVuZ3RoPjApIHtcclxuICAgICAgICByZXR1cm4gaGVhZGVyO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIHRhYmxlIGhhcyBubyBoZWFkZXIgb3Igcm93cycpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgc291cmNlYCBpcyBub3Qgc3BlY2lmaWVkIG9yIGlzIG5vdCBhIHRhYmxlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGVzIGRlZmF1bHRIZWFkZXJSb3cgZm9yIGEgcGFzc2VkIGB0aGVhZGBcclxuICAgKiBAcGFyYW0geyFIVE1MVGFibGVFbGVtZW50fSB0aGVhZCAtIHNvdXJjZSB0YWJsZSBoZWFkZXJcclxuICAgKiBAcGFyYW0geyFOdW1iZXJ9IGRlZmF1bHRIZWFkZXJSb3dJbmRleCAtIGluZGV4IG9mIHRoZSByb3cgaW4gYHRoZWFkYCAoaW5jcmVtZW50ZWQgZnJvbSAwKSB0aGF0IHdpbGwgYmUgY29uc2lkZXJlZCBkZWZhdWx0IHRvIGhhdmUgYWN0aW9ucyBleGVjdXRlZCB1cG9uLlxyXG4gICAqIEByZXR1cm4ge3tpbmRleDpOdW1iZXIsIHJvdzogSFRNTFRhYmxlUm93RWxlbWVudH19XHJcbiAgICogKi9cclxuICBzdGF0aWMgZ2V0RGVmYXVsdEhlYWRlclJvdyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpe1xyXG4gICAgLy8gY2FsY3VsYXRlIGRlZmF1bHQgaGVhZGVyIHJvd1xyXG4gICAgbGV0IGhlYWRlclJvd3MgPSB0aGVhZC5jaGlsZHJlbixcclxuICAgICAgaGVhZGVyUm93SW5kZXggPSBkZWZhdWx0SGVhZGVyUm93SW5kZXg9PS0xID8gaGVhZGVyUm93cy5sZW5ndGggKyBkZWZhdWx0SGVhZGVyUm93SW5kZXggOiBkZWZhdWx0SGVhZGVyUm93SW5kZXg7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbmRleDpoZWFkZXJSb3dJbmRleCxcclxuICAgICAgcm93OmhlYWRlclJvd3MuaXRlbShoZWFkZXJSb3dJbmRleClcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGhlYWRlciBjZWxsIG5vZGVzIGZyb20gZGVmYXVsdCBoZWFkZXIgcm93XHJcbiAgICogQHBhcmFtIHs/SFRNTFRhYmxlRWxlbWVudH0gdGhlYWQgLSBzb3VyY2UgdGFibGUgaGVhZGVyXHJcbiAgICogQHBhcmFtIHshTnVtYmVyfSBkZWZhdWx0SGVhZGVyUm93SW5kZXggLSBpbmRleCBvZiB0aGUgcm93IGluIGB0aGVhZGAgKGluY3JlbWVudGVkIGZyb20gMCkgdGhhdCB3aWxsIGJlIGNvbnNpZGVyZWQgZGVmYXVsdCB0byBoYXZlIGFjdGlvbnMgZXhlY3V0ZWQgdXBvbi5cclxuICAgKiBAcmV0dXJuIHs/QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgaGVhZGVyIGNlbGwgbm9kZXMgb3IgbnVsbCBpZiBgdGhlYWRgIGlzIG5vdCBzcGVjaWZpZWRcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBnZXRIZWFkZXJDZWxscyh0aGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpe1xyXG4gICAgaWYodGhlYWQpe1xyXG4gICAgICBpZihkZWZhdWx0SGVhZGVyUm93SW5kZXghPW51bGwpe1xyXG4gICAgICAgIGxldCBkZWZhdWx0SGVhZGVyUm93ID0gVGFibGVDb2x1bW5zLmdldERlZmF1bHRIZWFkZXJSb3codGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KTtcclxuICAgICAgICBsZXQgaGVhZGVyUm93cyA9IHRoZWFkLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCByb3dzTGVuZ3RoID0gaGVhZGVyUm93cy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGFic3RyID0ge307XHJcbiAgICAgICAgZm9yKGxldCByPTA7cjxyb3dzTGVuZ3RoO3IrKyl7XHJcbiAgICAgICAgICBsZXQgcm93ID0gaGVhZGVyUm93cy5pdGVtKHIpO1xyXG4gICAgICAgICAgbGV0IGF1Z21lbnRJbmRleD0wOyAvLyBpbmRleCB0aGF0IHdpbGwgYWNjb3VudCBmb3IgY29sU3BhbiBvZiB1cHBlciByb3dzJyBjZWxsc1xyXG4gICAgICAgICAgW10uc2xpY2UuY2FsbChyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsaW5kZXgpPT57IC8vaXRlcmF0ZSB0aHJvdWdoIGNlbGxzXHJcbiAgICAgICAgICAgIGZvcihsZXQgcnM9MDsgcnM8PWNlbGwucm93U3Bhbi0xO3JzKyspeyAvL3NwcmVhZCBjZWxsIGFjcm9zcyBpdHMgcm93c3BhblxyXG4gICAgICAgICAgICAgIGxldCByb3dBID0gYWJzdHJbcityc10gPSBhYnN0cltyK3JzXSB8fCB7fTsgLy9jcmVhdGUgcm93IGlmIG5vdCBleGlzdHNcclxuICAgICAgICAgICAgICBpZighcm93QVthdWdtZW50SW5kZXhdKXsgLy9pbnNlcnQgY2VsbCBpbnRvIHNsb3QgaWYgbm90IGZpbGxlZFxyXG4gICAgICAgICAgICAgICAgcm93QVthdWdtZW50SW5kZXhdPWNlbGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHsgLy9pZiBmaWxsZWQgbG9vayBmb3IgdGhlIG5leHQgZW1wdHkgYmVjYXVzZSByb3dzcGFubmVkIGNvbHVtbnMgZmlsbCB0aGVtIGluIGEgbGluZWFyIHdheVxyXG4gICAgICAgICAgICAgICAgbGV0IGk9MDtcclxuICAgICAgICAgICAgICAgIHdoaWxlKHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICBpZighcm93QVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QVtpXT1jZWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1Z21lbnRJbmRleD1pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXVnbWVudEluZGV4Kz1jZWxsLmNvbFNwYW47XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYWJzdHJbZGVmYXVsdEhlYWRlclJvdy5pbmRleF0pLm1hcChrID0+IGFic3RyW2RlZmF1bHRIZWFkZXJSb3cuaW5kZXhdW2tdKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RhYmxlQ29sdW1ucy5nZXRIZWFkZXJDZWxsczogZGVmYXVsdEhlYWRlclJvd0luZGV4IGlzIG5vdCBzcGVjaWZpZWQgb3IgaXMgbm90IGEgTnVtYmVyJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYW4gYXJyYXkgb2YgY29sdW1ucyBmcm9tIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUVsZW1lbnR9IHRoZWFkIC0gc291cmNlIHRhYmxlIGhlYWRlclxyXG4gICAqIEBwYXJhbSB7IUhUTUxUYWJsZUVsZW1lbnR9IHJlZlRoZWFkIC0gcmVmZXJlbmNlIHRhYmxlIGhlYWRlciBmcm9tIGZsb2F0aW5nIGhlYWRlciBpZiBhbnlcclxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVmYXVsdEhlYWRlclJvd0luZGV4IC0gaW5kZXggb2YgdGhlIHJvdyBpbiBgdGhlYWRgIChpbmNyZW1lbnRlZCBmcm9tIDApIHRoYXQgd2lsbCBiZSBjb25zaWRlcmVkIGRlZmF1bHQgdG8gaGF2ZSBhY3Rpb25zIGV4ZWN1dGVkIHVwb24uXHJcbiAgICogQHJldHVybiB7P0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGhlYWRlciBjZWxsIG5vZGVzIG9yIG51bGwgaWYgYHRoZWFkYCBpcyBub3Qgc3BlY2lmaWVkXHJcbiAgICogKi9cclxuICBzdGF0aWMgY29tcHV0ZUNvbHVtbnModGhlYWQscmVmVGhlYWQsZGVmYXVsdEhlYWRlclJvd0luZGV4KXtcclxuICAgIGxldCB0aGVhZENlbGxzID0gVGFibGVDb2x1bW5zLmdldEhlYWRlckNlbGxzKHRoZWFkLGRlZmF1bHRIZWFkZXJSb3dJbmRleCk7XHJcbiAgICBsZXQgcmVmVGhlYWRDZWxscyA9IFRhYmxlQ29sdW1ucy5nZXRIZWFkZXJDZWxscyhyZWZUaGVhZCxkZWZhdWx0SGVhZGVyUm93SW5kZXgpO1xyXG4gICAgbGV0IHJlYWxDb2x1bW5JbmRleD0wO1xyXG4gICAgcmV0dXJuIHRoZWFkQ2VsbHMubWFwKChjZWxsLGluZGV4KT0+e1xyXG4gICAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIGluZGV4OiByZWFsQ29sdW1uSW5kZXgsXHJcbiAgICAgICAgdGl0bGU6IGNlbGwudGV4dENvbnRlbnQsXHJcbiAgICAgICAgY2VsbCxcclxuICAgICAgICBjb2xTcGFuOmNlbGwuY29sU3BhblxyXG4gICAgICB9O1xyXG4gICAgICBpZihyZWZUaGVhZENlbGxzIT1udWxsKXtvYmoucmVmQ2VsbCA9IHJlZlRoZWFkQ2VsbHNbaW5kZXhdfVxyXG4gICAgICAvLyB3ZSBuZWVkIHRvIGluY3JlbWVudCB0aGUgY29sc3BhbiBvbmx5IGZvciBjb2x1bW5zIHRoYXQgZm9sbG93IHJvd2hlYWRlciBiZWNhdXNlIHRoZSBibG9jayBpcyBub3QgaW4gZGF0YS5cclxuICAgICAgcmVhbENvbHVtbkluZGV4PSByZWFsQ29sdW1uSW5kZXg+MD8ocmVhbENvbHVtbkluZGV4ICsgY2VsbC5jb2xTcGFuKTpyZWFsQ29sdW1uSW5kZXgrMTtcclxuICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbnM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vci10YWJsZS1jb2x1bW5zL3NyYy90YWJsZS1jb2x1bW5zLmpzIiwiaW1wb3J0IFJlcG9ydGFsQmFzZSBmcm9tIFwici1yZXBvcnRhbC1iYXNlXCI7XHJcblxyXG52YXIgVGFibGVGbG9hdGluZ0hlYWRlclN0eWxlID0gcmVxdWlyZSgnLi90YWJsZS1mbG9hdGluZy1oZWFkZXItc3R5bGVzLmNzcycpO1xyXG5cclxuLyoqXHJcbiAqIEZpeGVkSGVhZGVyIGNsYXNzIGVuYWJsZXMgYSBmaXhlZCBoZWFkZXIgYXBwZWFyIG9uIHRhYmxlcyB0aGF0IGhhdmUgYC5yZXBvcnRhbC1maXhlZC1oZWFkZXJgIGNsYXNzIHdoZW4gdGhlIHRhYmxlIGhlYWRlciBpcyBzY3JvbGxlZCB1bmRlciBhZGRyZXNzIGJhci5cclxuICovXHJcbmNsYXNzIFRhYmxlRmxvYXRpbmdIZWFkZXIge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gc291cmNlIC0gc291cmNlIHRhYmxlIHRoYXQgbmVlZHMgYSBjbG9uZWQgaGVhZGVyXHJcbiAgICogKi9cclxuICBjb25zdHJ1Y3Rvcihzb3VyY2Upe1xyXG4gICAgaWYodHlwZW9mIHNvdXJjZSA9PSB1bmRlZmluZWQgfHwgc291cmNlLnRhZ05hbWUgIT0gJ1RBQkxFJyl7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Bzb3VyY2VgIG11c3QgYmUgZGVmaW5lZCBhbmQgbXVzdCBiZSBhIHRhYmxlJylcclxuICAgIH1cclxuXHJcbiAgICBUYWJsZUZsb2F0aW5nSGVhZGVyLndyYXBUYWJsZShzb3VyY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFRoZSBjbG9uZWQgZmxvYXRpbmcgaGVhZGVyIHdpdGhvdXQgVEJPRFlcclxuICAgICAqICBAdHlwZSB7SFRNTFRhYmxlRWxlbWVudH1cclxuICAgICAqICBAbWVtYmVyT2YgVGFibGVGbG9hdGluZ0hlYWRlclxyXG4gICAgICogICovXHJcbiAgICB0aGlzLmhlYWRlciAgPSBUYWJsZUZsb2F0aW5nSGVhZGVyLmNsb25lSGVhZGVyKHNvdXJjZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVGhlIHNvdXJjZSB0YWJsZVxyXG4gICAgICogIEB0eXBlIHtIVE1MVGFibGVFbGVtZW50fVxyXG4gICAgICogIEBtZW1iZXJPZiBUYWJsZUZsb2F0aW5nSGVhZGVyXHJcbiAgICAgKiAgKi9cclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiAgVmlzaWJpbGl0eSBzdGF0dXMgb2YgdGhlIHRhYmxlXHJcbiAgICAgKiAgQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgKiAgQG1lbWJlck9mIFRhYmxlRmxvYXRpbmdIZWFkZXJcclxuICAgICAqICAqL1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fbWV0YSA9IHtcclxuICAgICAgbGFzdFNjcm9sbFk6MCxcclxuICAgICAgc291cmNlVEhFQUQ6IHNvdXJjZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCcpLFxyXG4gICAgICB0aWNraW5nOmZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcblxyXG4gICAgdGhpcy5yZXNpemVGaXhlZCgpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpPT50aGlzLnJlc2l6ZUZpeGVkLmNhbGwodGhpcyksIGZhbHNlKTsgLy8gYXR0YWNoIGEgcmVzaXplIGxpc3RlbmVyIHRvIHJlc2l6ZSB0aGUgaGVhZGVyXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKT0+dGhpcy5zY3JvbGxGaXhlZC5jYWxsKHRoaXMpLCBmYWxzZSk7IC8vIGF0dGFjaCBhIHJlc2l6ZSBsaXN0ZW5lciB0byByZXNpemUgdGhlIGhlYWRlclxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FsY3VsYXRlcyBvZmZzZXQgaGVpZ2h0IG9mIHRoZSB0YWJsZVxyXG4gICAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gc291cmNlIC0gc291cmNlIHRhYmxlXHJcbiAgICogKi9cclxuICBzdGF0aWMgY2FsY09mZnNldEhlaWdodChzb3VyY2Upe1xyXG4gICAgdGhpcy5fbWV0YS50YWJsZU9mZnNldFRvcCA9IHNvdXJjZS5wYXJlbnROb2RlLm9mZnNldFRvcDtcclxuICAgIHRoaXMuX21ldGEudGFibGVPZmZzZXRCb3R0b20gPSBzb3VyY2UucGFyZW50Tm9kZS5vZmZzZXRUb3AgKyBzb3VyY2Uub2Zmc2V0SGVpZ2h0IC0gdGhpcy5fbWV0YS5zb3VyY2VUSEVBRC5vZmZzZXRIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFdmVudCByZXBvcnRpbmcgdGhhdCBhIGhlYWRlciBpcyB2aXNpYmxlXHJcbiAgICogQGV2ZW50IFRhYmxlRmxvYXRpbmdIZWFkZXJ+cmVwb3J0YWwtZml4ZWQtaGVhZGVyLXZpc2libGVcclxuICAgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgcmVwb3J0aW5nIHRoYXQgYSBoZWFkZXIgaXMgaGlkZGVuXHJcbiAgICogQGV2ZW50IFRhYmxlRmxvYXRpbmdIZWFkZXJ+cmVwb3J0YWwtZml4ZWQtaGVhZGVyLWhpZGRlblxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBzZXRzIHZpc2liaWxpdHkgb2YgdGhlIHRhYmxlXHJcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2UgdGFibGVcclxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IGhlYWRlciAtIGNsb25lZCB0YWJsZSB3aXRoIGhlYWRlciBvbmx5XHJcbiAgICogQHBhcmFtIHtCb29sZWFufSB2aXNpYmxlIC0gdmlzaWJpbGl0eSBzdGF0dXNcclxuICAgKiBAZmlyZXMgVGFibGVGbG9hdGluZ0hlYWRlcn5yZXBvcnRhbC1maXhlZC1oZWFkZXItdmlzaWJsZVxyXG4gICAqIEBmaXJlcyBUYWJsZUZsb2F0aW5nSGVhZGVyfnJlcG9ydGFsLWZpeGVkLWhlYWRlci12aXNpYmxlXHJcbiAgICogKi9cclxuICBzdGF0aWMgc2V0VmlzaWJpbGl0eShzb3VyY2UsIGhlYWRlciwgdmlzaWJsZSl7XHJcbiAgICBpZih2aXNpYmxlKXtcclxuICAgICAgaGVhZGVyLnN0eWxlLmRpc3BsYXk9J3RhYmxlJztcclxuICAgICAgc291cmNlLmRpc3BhdGNoRXZlbnQoUmVwb3J0YWxCYXNlLm5ld0V2ZW50KCdyZXBvcnRhbC1maXhlZC1oZWFkZXItdmlzaWJsZScpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhlYWRlci5zdHlsZS5kaXNwbGF5PSdub25lJztcclxuICAgICAgc291cmNlLmRpc3BhdGNoRXZlbnQoUmVwb3J0YWxCYXNlLm5ld0V2ZW50KCdyZXBvcnRhbC1maXhlZC1oZWFkZXItaGlkZGVuJykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogd3JhcHMgdGhlIGBzb3VyY2VgIHRhYmxlIGludG8gYSBgZGl2LmFnZ3JlZ2F0ZWRUYWJsZUNvbnRhaW5lcmBcclxuICAgKiAqL1xyXG4gIHN0YXRpYyB3cmFwVGFibGUoc291cmNlKXtcclxuICAgIGxldCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2FnZ3JlZ2F0ZWRUYWJsZUNvbnRhaW5lcicpO1xyXG4gICAgc291cmNlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjbG9uZXMgaGVhZGVyIG9mIGBzb3VyY2VgIHRhYmxlIGFuZCBhcHBlbmRzIHRvIHdyYXBwZXJcclxuICAgKiAqL1xyXG4gIHN0YXRpYyBjbG9uZUhlYWRlcihzb3VyY2Upe1xyXG4gICAgbGV0IGhlYWRlciA9IHNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnZml4ZWQnKTtcclxuICAgIHNvdXJjZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICBbXS5zbGljZS5jYWxsKGhlYWRlci5jaGlsZHJlbikuZm9yRWFjaChjaGlsZD0+e1xyXG4gICAgICBpZihjaGlsZC5ub2RlTmFtZT09J1RCT0RZJyl7XHJcbiAgICAgICAgaGVhZGVyLnJlbW92ZUNoaWxkKGNoaWxkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaGVhZGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZnVuY3Rpb24gdGhhdCBwb2xscyB0aGUgY2FsbGJhY2tcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRoYXQncyBnb2luZyB0byBiZSBwYXNzZWQgdG8gYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgZm9yIGV4ZWN1dGlvblxyXG4gICAqICovXHJcbiAgcmVxdWVzdFRpY2soY2FsbGJhY2spe1xyXG4gICAgaWYoIXRoaXMuX21ldGEudGlja2luZykge1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xyXG4gICAgICB0aGlzLl9tZXRhLnRpY2tpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIF9yZXNpemVDYWxsYmFjaygpe1xyXG4gICAgbGV0IGluaXRpYWxIZWFkZXIgPSB0aGlzLl9tZXRhLnNvdXJjZVRIRUFELnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyPionKSxcclxuICAgICAgY2xvbmVkSGVhZGVyID0gdGhpcy5oZWFkZXIucXVlcnlTZWxlY3RvckFsbCgndGhlYWQ+dHI+KicpLFxyXG4gICAgICBoZWFkZXJXaWR0aCA9IHRoaXMuc291cmNlLm9mZnNldFdpZHRoICsgJ3B4JyxcclxuICAgICAgd2lkdGhzPVtdO1xyXG4gICAgLy8gZG8gcmVmbG93XHJcbiAgICBmb3IobGV0IGk9MDtpPGluaXRpYWxIZWFkZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgIHdpZHRocy5wdXNoKGluaXRpYWxIZWFkZXJbaV0ub2Zmc2V0V2lkdGgpO1xyXG4gICAgfVxyXG4gICAgLy9kbyByZXBhaW50XHJcbiAgICBmb3IobGV0IGM9MDtjPGNsb25lZEhlYWRlci5sZW5ndGg7YysrKXtcclxuICAgICAgY2xvbmVkSGVhZGVyW2NdLnN0eWxlLndpZHRoID0gd2lkdGhzW2NdICsgJ3B4JztcclxuICAgIH1cclxuICAgIHRoaXMuaGVhZGVyLnN0eWxlLndpZHRoID0gaGVhZGVyV2lkdGg7XHJcblxyXG4gICAgVGFibGVGbG9hdGluZ0hlYWRlci5jYWxjT2Zmc2V0SGVpZ2h0LmNhbGwodGhpcyx0aGlzLnNvdXJjZSk7IC8vcmVjYWxjIGhlaWdodCBvZiB0aGUgdGFibGUgYWZ0ZXIgcmVmbG93XHJcbiAgICB0aGlzLl9tZXRhLnRpY2tpbmc9ZmFsc2U7XHJcbiAgICB0aGlzLnNjcm9sbEZpeGVkKCk7IC8vIHRvIGNvbXBlbnNhdGUgdG9wIG9mZnNldCBpbiBjYXNlIGFmdGVyIHJlc2l6ZSB0aGUgdGFibGUgaXMgbGVzcyBpbiBoZWlnaHQgYW5kIHRvcCBoYXMgY2hhbmdlZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyB3aWR0aHMgZm9yIGFsbCBjb2x1bW5zIGluIHRoZSBmaXhlZCBoZWFkZXIgYmFzZWQgb24gdGhlIGBzb3VyY2VgXHJcbiAgICogKi9cclxuICByZXNpemVGaXhlZCgpe1xyXG4gICAgdGhpcy5yZXF1ZXN0VGljayhUYWJsZUZsb2F0aW5nSGVhZGVyLl9yZXNpemVDYWxsYmFjay5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcblxyXG4gIHN0YXRpYyBfc2Nyb2xsQ2FsbGJhY2soKXtcclxuICAgIGxldCBvZmZzZXQgPSB0aGlzLl9tZXRhLmxhc3RTY3JvbGxZLFxyXG4gICAgICB0YWJsZU9mZnNldFRvcCA9IHRoaXMuX21ldGEudGFibGVPZmZzZXRUb3AsXHJcbiAgICAgIHRhYmxlT2Zmc2V0Qm90dG9tID0gdGhpcy5fbWV0YS50YWJsZU9mZnNldEJvdHRvbTtcclxuICAgIGlmKChvZmZzZXQgPCB0YWJsZU9mZnNldFRvcCB8fCBvZmZzZXQgPiB0YWJsZU9mZnNldEJvdHRvbSkgJiYgdGhpcy52aXNpYmxlKXtcclxuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIFRhYmxlRmxvYXRpbmdIZWFkZXIuc2V0VmlzaWJpbGl0eSh0aGlzLnNvdXJjZSx0aGlzLmhlYWRlcixmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKG9mZnNldCA+PSB0YWJsZU9mZnNldFRvcCAmJiBvZmZzZXQgPD0gdGFibGVPZmZzZXRCb3R0b20pe1xyXG4gICAgICB0aGlzLmhlYWRlci5zdHlsZS50b3A9b2Zmc2V0LXRhYmxlT2Zmc2V0VG9wKydweCc7XHJcbiAgICAgIGlmKCF0aGlzLnZpc2libGUpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIFRhYmxlRmxvYXRpbmdIZWFkZXIuc2V0VmlzaWJpbGl0eSh0aGlzLnNvdXJjZSx0aGlzLmhlYWRlcix0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fbWV0YS50aWNraW5nPWZhbHNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BsYXlzIGEgZml4ZWQgaGVhZGVyIHdoZW4gdGhlIHRhYmxlIGhlYWRlciBpcyBzY3JvbGxlZCBvZmYgdGhlIHNjcmVlblxyXG4gICAqICovXHJcbiAgc2Nyb2xsRml4ZWQoKSB7XHJcbiAgICAgIHRoaXMuX21ldGEubGFzdFNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgIHRoaXMucmVxdWVzdFRpY2soVGFibGVGbG9hdGluZ0hlYWRlci5fc2Nyb2xsQ2FsbGJhY2suYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFibGVGbG9hdGluZ0hlYWRlcjtcclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3ItdGFibGUtZmxvYXRpbmctaGVhZGVyL3NyYy90YWJsZS1mbG9hdGluZy1oZWFkZXIuanMiLCJyZXF1aXJlKFwiLi9kcmlsbGRvd24tbWFwLmNzc1wiKTtcbmltcG9ydCBBc3luY0hpZXJhcmNoeVRhYmxlIGZyb20gXCJyLWFzeW5jLWhpZXJhcmNoeS10YWJsZVwiO1xuaW1wb3J0IE1hcEhpZXJhcmNoeSBmcm9tIFwiLi9tYXAtaGllcmFyY2h5XCI7XG5pbXBvcnQgQWdncmVnYXRlZFRhYmxlIGZyb20gXCJyLWFnZ3JlZ2F0ZWQtdGFibGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJpbGxkb3duTWFwIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkcmlsbGRvd24gbWFwLiBJdCB1c2VzIGEgY29sb3IgZnVuY3Rpb24gYGNvbG9yRm5gIHRoYXQgYWxsb3dzIGNvbG9yY29kZSBjb3VudHJpZXNcbiAgICogYGNvbG9yRm5gIGFjY2VwdHMgdHdvIGF0dHJpYnV0ZXM6IGB2YWx1ZWAgYW5kIGB0YXJnZXRgIGFuZCBtdXN0IHJldHVybiBhIGNvbG9yIHN0cmluZyBiYXNlZCBvbiB0aG9zZSB0d28gYXR0cmlidXRlcy5cbiAgICogTWFrZSBzdXJlIGhpZXJhcmNoeSBoYXMgYHRhcmdldGAgbG9hZGVkIGZyb20gREJEZXNpZ25lciB0YWJsZSBpbnRvIGVhY2ggaGllcmFyY2h5IGxldmVsLCBvdGhlcndpc2UgYSBkZWZhdWx0IGNvbmZpZyBgZGF0YUNsYXNzZXNgIHRha2VzIHByZWNlZGVuY2Ugb24gdmFsdWVcbiAgICogRXhhbXBsZTpcbiAgICpcbiAgICogICAge1xuICAgKiAgICAvL3NvbWUgY29uc3RydWN0b3IgY29uZmlndXJhdGlvbiBhYm92ZVxuICAgKiAgICAgIGNvbG9yRm46IGZ1bmN0aW9uKHZhbHVlLHRhcmdldCl7XG4gICAqICAgICAgICByZXR1cm4gKHZhbHVlIT1udWxsICYmIHRhcmdldCE9bnVsbCk/ICh2YWx1ZSAtIHRhcmdldCA+PSAwKSA/IFwiIzE4QkM5Q1wiIDogKCh2YWx1ZSA+PSAwLjkqdGFyZ2V0KSA/IFwiI0ZGNDkwMFwiIDogXCIjRTQ1MzM1XCIpIDogdW5kZWZpbmVkO1xuICAgKiAgICAgIH1cbiAgICogICAgIC8vc29tZSBjb25zdHJ1Y3RvciBjb25maWd1cmF0aW9uIGJlbG93XG4gICAqICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSBjb25maWcuc291cmNlIC0gYSBzb3VyY2UgZHJpbGxkb3duIHRhYmxlIHRoYXQgY29udGFpbnMgdGhlIGluaXRpYWwgc2V0IG9mIGRhdGEod2l0aCByZWZlcmVuY2UgZ3JvdXAgZW5hYmxlZCBhbmQgMSBjaGlsZCBsZXZlbClcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy50YWJsZUlEIC0gaWQgb2YgdGhlIGBzb3VyY2VgIHRhYmxlIHRoYXQgaXMgdGhlIGluaXRpYWwgc291cmNlIG9mIGRhdGEgKGZyb20gcmVwb3J0YWwgYmFja2VuZClcbiAgICogQHBhcmFtIHtBcnJheX0gY29uZmlnLnJvd2hlYWRlcnMgLSBhIHJvd2hlYWRlcnMgYXJyYXkgZm9yIHRoZSBsb2FkZWQgdGFibGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZy5mbGF0SGllcmFyY2h5IC0gYSBoaWVyYXJjaGljYWwgb2JqZWN0IGZvciBhIG1hcCB0byBiZSBidWlsdCB1cG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLmluaXRpYWxNYXA9XCJjdXN0b20vd29ybGQtaGlnaHJlczJcIl0gLSB0aGUgaW5pdGlhbCBtYXAgb2JqZWN0IHRoYXQncyBnb2luZyB0byBiZSBsb2FkZWQgdG8gaW5pdGlhbGlzZSB0aGUgbWFwXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcuY29udGFpbmVySUQgLSBpZCBvZiB0aGUgY29udGFpbmVyIHRoZSBtYXAgd2lsbCBiZSBkcmF3biB0b1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maWcubWFwcG9pbnRDYWxsYmFjayAtIGV4ZWN1dGVkIHdoZW4gYSBtYXBwb2ludCAoY2l0eSkgaXMgY2xpY2tlZFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maWcuY29sb3JGbiAtIEEgZnVuY3Rpb24gdGhhdCBhbGxvd3MgY3VzdG9tIGNvbG9yIGNvZGluZyBjb21wdXRhdGlvbiBiYXNlZCBvbiB2YWx1ZSBhbmQgdGFyZ2V0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy52YWx1ZUNvbHVtbj0xXSAtIFplcm8tYmFzZWQgY29sdW1uIGluZGV4IHRoYXQgY29udGFpbnMgcHJpbWFyeSB2YWx1ZSB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIG1hcCBjb2xvcmluZy5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbY29uZmlnLmZ1bGxQYXJlbnRMZXZlbEluZm89dHJ1ZV0gLSBEaXNwbGF5IGZ1bGwgaW5mbyBvZiB0aGUgcGFyZW50IGxldmVsIGluIHJpZ2h0IHBhcnQgb2YgdGhlIG1hcCwgcmF0aGVyIHRoYW4gdGhlIHBhcmVudCBsZXZlbCBuYW1lIGFuZCB0aGUgcHJpbWFyeSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbmZpZy5wYWdlU3RhdGVJZD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjUGFnZVN0YXRlSWQnKS52YWx1ZV0gLSBQYWdlU3RhdGVJZFxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnLm5vcm1hbHMgLSBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBuYW1lcyBvZiBjb2x1bW5zIHRha2VuIGZyb20gREJEZXNpZ25lclRhYmxlIGFuZCB2YWx1ZXMgLSB0aGVpciBzdHJpbmcgdHlwZXM6IGBzdHJpbmdgLCBgbnVtYmVyYCwgYGJvb2xlYW5gLCBgc3RyaW5nQXJyYXlgLCBgbnVtYmVyQXJyYXlgXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLm5vcm1hbHNTZXBhcmF0b3I9JywnXSAtIGRlbGltaXRlciBiZXR3ZWVuIHZhbHVlcyBpbiBgc3RyaW5nQXJyYXlgIChgdXMtY2EsIHVzLXR4LCB1cy13eWApIGFuZCBgbnVtYmVyQXJyYXlgIChgLTMxLjg2LDE2LjM4YCkuIFRoZXkgYXJlIHNlcnZlZCBhcyBhIGRlbGltaXRlci1zZXBhcmF0ZWQgc3RyaW5nIGFuZCB0aGUgZGVsaW1pdGVyIGlzIGAsYCBieSBkZWZhdWx0LiBJZiB5b3UgdXNlIGFub3RoZXIgb25lLCBtYWtlIHN1cmUgeW91IHNwZWNpZnkgaXQgaGVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5vcHRpb25zPXt9XSAtIG9wdGlvbnMgcGFzc2VkIHRvIEhpZ2hNYXAgdG8gcmVzdHlsZS9yZWNvbmZpZ3VyZSBpdFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5sb2FkaW5nVGV4dD0gJ2ZldGNoaW5nIGRhdGEnXSAtIHRleHQgdG8gc2hvdyB3aGVuIGxvYWRpbmcgYW5vdGhlciBsZXZlbFxuICAgKiAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgIHRoaXMuZGVjbGFyZUdsb2JhbHMoY29uZmlnLCB7XG4gICAgICBpbml0aWFsTWFwOiAnY3VzdG9tL3dvcmxkLWhpZ2hyZXMyJyxcbiAgICAgIHZhbHVlQ29sdW1uOiAxLFxuICAgICAgZnVsbFBhcmVudExldmVsSW5mbzogdHJ1ZSxcbiAgICAgIGNvbG9yRm46IGZ1bmN0aW9uICh2YWx1ZSwgdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCA/IHZhbHVlID49IDgwID8gJyM0Y2FmNTAnIDogKCh2YWx1ZSA8IDgwICYmIHZhbHVlID49IDYwICkgPyAnI2ZmYzEwNycgOiAnI2ZmNTcyMicpIDogJ2JsdWUnO1xuICAgICAgfSxcbiAgICAgIHBhZ2VTdGF0ZUlkOiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1BhZ2VTdGF0ZUlkJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjUGFnZVN0YXRlSWQnKS52YWx1ZSA6IG51bGwpLFxuICAgICAgbG9hZGluZ1RleHQ6ICdmZXRjaGluZyBkYXRhJyxcbiAgICAgIG9wdGlvbnM6IHt9LFxuICAgIH0sIHRoaXMudHlwZUNoZWNrKGNvbmZpZykpO1xuXG4gICAgY29uc3Qge2hpZXJhcmNoeSxmbGF0SGllcmFyY2h5fSA9IG5ldyBNYXBIaWVyYXJjaHkoe1xuICAgICAgZmxhdEhpZXJhcmNoeTp0aGlzLmZsYXRIaWVyYXJjaHksXG4gICAgICBoaWVyYXJjaHk6dGhpcy5oaWVyYXJjaHksXG4gICAgICBub3JtYWxzOnRoaXMubm9ybWFscyxcbiAgICAgIG5vcm1hbHNTZXBhcmF0b3I6dGhpcy5ub3JtYWxzU2VwYXJhdG9yXG4gICAgfSk7XG5cbiAgICB0aGlzLmZsYXRIaWVyYXJjaHkgPSBmbGF0SGllcmFyY2h5O1xuICAgIHRoaXMuaGllcmFyY2h5ID0gaGllcmFyY2h5O1xuXG4gICAgdGhpcy5wYXJzZVRhYmxlRGF0YSgpO1xuXG4gICAgdGhpcy5kcmF3TWFwKCk7XG4gIH1cblxuICBkZWNsYXJlR2xvYmFscyhjb25maWcsIGRlZmF1bHRzID0ge30sIHR5cGVDaGVjayA9IHt9KSB7XG4gICAgY29uc3QgbWl4ZWRPcHRpb25zID0gey4uLmNvbmZpZywgLi4uZGVmYXVsdHN9O1xuICAgIE9iamVjdC5rZXlzKG1peGVkT3B0aW9ucykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKHR5cGVDaGVja1trZXldICYmIHR5cGVvZiB0eXBlQ2hlY2tba2V5XSA9PT0gJ2Z1bmN0aW9uJykgdHlwZUNoZWNrW2tleV0obWl4ZWRPcHRpb25zW2tleV0pO1xuICAgICAgdGhpc1trZXldID0gbWl4ZWRPcHRpb25zW2tleV07XG4gICAgfSlcbiAgfVxuXG4gIHR5cGVDaGVjayhvcHRzKSB7XG4gICAgaWYgKHR5cGVvZiBIaWdoY2hhcnRzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdIaWdoY2hhcnRzIG11c3QgYmUgZGVjbGFyZWQuIFByb2JhYmx5IHRoZXkgYXJlIG1pc3NpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIEhpZ2hjaGFydHMubWFwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSGlnaE1hcHMgbXVzdCBiZSBsb2FkZWQuIFByb2JhYmx5IHRoZXkgYXJlIG1pc3NpbmcnKVxuICAgIH1cbiAgICBpZiAoIShvcHRzLnJvd2hlYWRlcnMgJiYgb3B0cy5yb3doZWFkZXJzICE9PSBudWxsICYmIG9wdHMucm93aGVhZGVycy5sZW5ndGggPiAwKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignXCJyb3doZWFkZXJzXCIgYXJyYXkgbXVzdCBiZSBwcmVzZW50IHRvIHBhcnNlIGRhdGEnKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzb3VyY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEob3B0cy5zb3VyY2UgJiYgb3B0cy5zb3VyY2UubG9jYWxOYW1lID09PSAndGFibGUnKSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvdXJjZSB0YWJsZSBtdXN0IGJlIHNwZWNpZmllZCcpXG4gICAgICB9LFxuICAgICAgY29udGFpbmVySUQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEob3B0cy5jb250YWluZXJJRCAmJiB0eXBlb2Ygb3B0cy5jb250YWluZXJJRCA9PT0gJ3N0cmluZycpKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY29udGFpbmVySUQgbXVzdCBiZSBhIHN0cmluZyB3aXRob3V0IGEgbGVhZGluZyAjIGNoYXJhY3RlciBidXQgaXQgaXMgJyArIHR5cGVvZiBvcHRzLmNvbnRhaW5lcklEKVxuICAgICAgfSxcbiAgICAgIHRhYmxlSUQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEob3B0cy50YWJsZUlEICYmIHR5cGVvZiBvcHRzLnRhYmxlSUQgPT09ICdzdHJpbmcnKSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RhYmxlSUQgbXVzdCBiZSBhIHN0cmluZyBidXQgaXQgaXMgJyArIHR5cGVvZiBvcHRzLnRhYmxlSUQpXG4gICAgICB9LFxuICAgICAgbWFwcG9pbnRDYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjYiA9IG9wdHMubWFwcG9pbnRDYWxsYmFjaztcbiAgICAgICAgaWYgKGNiICYmIGNiICE9PSBudWxsICYmIHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hcHBvaW50Q2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICAgIH0sXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0YWJsZSBwYXNzZWQgdG8gaXQgYW5kIGFkZHMgZGF0YSB0byBgLl9kYXRhYCBpbiBgaGllcmFyY2h5YFxuICAgKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IG9wdGlvbnMuc291cmNlIC0gc291cmNlIHRhYmxlIGZvciBkYXRhXG4gICAqIEBwYXJhbSB7TnVtYmVyfEFycmF5fSBvcHRpb25zLmV4Y2x1ZGVSb3dzIC0gcm93cyB0byBiZSBleGNsdWRlZCBmcm9tIHBhcnNpbmdcbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5yb3doZWFkZXJzIC0gYXJyYXkgb2YgYHNvdXJjZWAgcm93aGVhZGVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5mbGF0SGllcmFyY2h5IC0gZmxhdCBoaWVyYXJjaHkgb2JqZWN0XG4gICAqICovXG4gIHBhcnNlVGFibGVEYXRhKG9wdGlvbnM9e30pIHtcbiAgICBjb25zdCB7XG4gICAgICBzb3VyY2UgPSB0aGlzLnNvdXJjZSxcbiAgICAgIGV4Y2x1ZGVSb3dzID0gdGhpcy5leGNsdWRlUm93cyxcbiAgICAgIHJvd2hlYWRlcnMgPSB0aGlzLnJvd2hlYWRlcnMubWFwKHJoID0+IHJoWzBdKSxcbiAgICAgIGV4Y2x1ZGVDb2x1bW5zID0gdGhpcy5leGNsdWRlQ29sdW1ucyxcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIGNvbnN0IGFnZ3JlZ2F0ZWRUYWJsZSA9IG5ldyBBZ2dyZWdhdGVkVGFibGUoe3NvdXJjZSwgZXhjbHVkZUNvbHVtbnMsIGV4Y2x1ZGVSb3dzfSk7XG4gICAgcm93aGVhZGVycy5mb3JFYWNoKChyb3dIZWFkZXIsIGkpID0+IHtcbiAgICAgIGlmICghdGhpcy5mbGF0SGllcmFyY2h5W3Jvd0hlYWRlcl0uX2RhdGEpIHtcbiAgICAgICAgdGhpcy5mbGF0SGllcmFyY2h5W3Jvd0hlYWRlcl0uX2RhdGEgPSBhZ2dyZWdhdGVkVGFibGUuZGF0YVtpXS5tYXAoKGRhdGFJdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogZGF0YUl0ZW0uZGF0YSxcbiAgICAgICAgICAgIHRpdGxlOiBpbmRleCAhPT0gMCA/IGFnZ3JlZ2F0ZWRUYWJsZS5jb2x1bW5zW2luZGV4XS50aXRsZSA6IFwiUmVnaW9uXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRyYXdNYXAoKSB7XG4gICAgdGhpcy5jdXJMVkwgPSB0aGlzLmZsYXRIaWVyYXJjaHlbdGhpcy5yb3doZWFkZXJzWzBdXTtcbiAgICBIaWdoY2hhcnRzLm1hcENoYXJ0KHRoaXMuY29udGFpbmVySUQsIHsuLi50aGlzLm1hcENvbmZpZywgLi4udGhpcy5vcHRpb25zfSk7XG4gIH1cblxuICBnZXQgbWFwQ29uZmlnKCkge1xuICAgIGNvbnN0IFRoaXMgPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICBsYW5nOiB7XG4gICAgICAgIGRyaWxsVXBUZXh0OiAnPCB0byB7c2VyaWVzLnBhcmVudH0nXG4gICAgICB9LFxuICAgICAgdG9vbHRpcDoge1xuICAgICAgICBwb2ludEZvcm1hdDogVGhpcy5nZXRUb29sdGlwKClcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0ZXh0OiAnJ1xuICAgICAgfSxcbiAgICAgIGxlZ2VuZDoge1xuICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICB9LFxuICAgICAgcGxvdE9wdGlvbnM6IHtcbiAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgc3RhdGVzOiB7XG4gICAgICAgICAgICBub3JtYWw6IHtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9pbnQ6IHtcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICBtb3VzZU92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllcy5kYXRhLmZvckVhY2goZWwgPT4gZWwuc2V0U3RhdGUoXCJob3ZlclwiKSlcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbW91c2VPdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllcy5kYXRhLmZvckVhY2goZWwgPT4gZWwuc2V0U3RhdGUoKSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1hcE5hdmlnYXRpb246IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgIHpvb21Jbjoge1xuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogXCJib3R0b21cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgem9vbU91dDoge1xuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogXCJib3R0b21cIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN1YnRpdGxlOiB7XG4gICAgICAgIGFsaWduOiAncmlnaHQnLFxuICAgICAgICBmbG9hdGluZzogdHJ1ZSxcbiAgICAgICAgdGV4dDogVGhpcy5zdWJ0aXRsZSxcbiAgICAgIH0sXG4gICAgICBkcmlsbGRvd246IHtcbiAgICAgICAgZHJpbGxVcEJ1dHRvbjoge1xuICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWxhdGl2ZVRvOiAnc3BhY2luZ0JveCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoYXJ0OiB7XG4gICAgICAgIGV2ZW50czoge1xuICAgICAgICAgIGRyaWxsZG93bjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIC8vdGhpcyA9PSBjaGFydCByZWZlcmVuY2U7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKENpcmN1bGFySlNPTi5wYXJzZShDaXJjdWxhckpTT04uc3RyaW5naWZ5KGUucG9pbnQpKSk7XG4gICAgICAgICAgICBsZXQgY2hhcnQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIFRoaXMuY3VyTFZMID0gVGhpcy5nZXRMZXZlbEJ5TmFtZShlLnBvaW50LnNlcmllcy5uYW1lKTtcbiAgICAgICAgICAgIGxldCBjdXJMVkwgPSBUaGlzLmN1ckxWTDtcbiAgICAgICAgICAgIGlmIChjdXJMVkwpIHtcbiAgICAgICAgICAgICAgY2hhcnQuc2hvd0xvYWRpbmcoVGhpcy5sb2FkaW5nVGV4dCk7XG4gICAgICAgICAgICAgIGxldCB0YWJsZSA9IFRoaXMuY2hpbGRUYWJsZS50aGVuKHRhYmxlID0+IHtcbiAgICAgICAgICAgICAgICAvLyBwYXJzZSBkYXRhIGxvYWRlZCBmcm9tIHRhYmxlXG4gICAgICAgICAgICAgICAgVGhpcy5wYXJzZVRhYmxlRGF0YSh7XG4gICAgICAgICAgICAgICAgICBzb3VyY2U6IHRhYmxlLFxuICAgICAgICAgICAgICAgICAgZXhjbHVkZVJvd3M6IDAsXG4gICAgICAgICAgICAgICAgICByb3doZWFkZXJzOiBjdXJMVkwuc3ViY2VsbHMubWFwKGx2bCA9PiBsdmwuaWQpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFRoaXMudXBkYXRlTWFwKGN1ckxWTCwgY2hhcnQsIGUpO1xuICAgICAgICAgICAgICAgIGNoYXJ0LnN1YnRpdGxlLnVwZGF0ZSh7dGV4dDogVGhpcy5zdWJ0aXRsZX0pO1xuICAgICAgICAgICAgICAgIGNoYXJ0LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZHJpbGx1cGFsbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIFRoaXMuY3VyTFZMID0gVGhpcy5jdXJMVkwucGFyZW50O1xuICAgICAgICAgICAgaWYgKFRoaXMuY3VyTFZMKSB7XG4gICAgICAgICAgICAgIGUudGFyZ2V0LnN1YnRpdGxlLnVwZGF0ZSh7dGV4dDogVGhpcy5zdWJ0aXRsZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlcmllczogVGhpcy5pbml0aWFsaXplTWFwKFt7XG4gICAgICAgIHNob3dJbkxlZ2VuZDogZmFsc2UsXG4gICAgICAgIG1hcERhdGE6IEhpZ2hjaGFydHMubWFwc1tUaGlzLmluaXRpYWxNYXBdXG4gICAgICB9XSlcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGNoaWxkVGFibGUoKSB7XG4gICAgcmV0dXJuIEFzeW5jSGllcmFyY2h5VGFibGUuZmV0Y2hDaGlsZFRhYmxlKHRoaXMuY3VyTFZMLmlkLCB0aGlzLmN1ckxWTC5wYXJlbnQgPyB0aGlzLmN1ckxWTC5wYXJlbnQuaWQgOiBudWxsLCB0aGlzLnRhYmxlSUQsIHRoaXMucGFnZVN0YXRlSWQpXG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgc2VyaWFsaXplZCBkYXRhc2V0IGZvciBhIHRvb2x0aXBcbiAgICogKi9cbiAgZ2V0VG9vbHRpcCgpIHtcbiAgICBsZXQgZGF0YSA9IHRoaXMuY3VyTFZMLl9kYXRhO1xuICAgIHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMuZ2VuZXJhdGVUb29sdGlwUm93KGl0ZW0udGl0bGUsIGB7cG9pbnQuZGF0YS4ke2luZGV4fS52YWx1ZX1gKSkuam9pbihcIjxiciAvPlwiKVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBjaGFydCBzdWJ0aXRsZSByZXR1cm5pbmcgcmVnaW9uIGFuZCBtYWluIHZhbHVlIG9mIGZ1bGwgaW5mbyBiYXNlZCBvbiBgZnVsbFBhcmVudExldmVsSW5mb2BcbiAgICogKi9cbiAgZ2V0IHN1YnRpdGxlKCkge1xuICAgIGlmICh0aGlzLmZ1bGxQYXJlbnRMZXZlbEluZm8pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1ckxWTC5fZGF0YS5tYXAoaXRlbSA9PiB0aGlzLmdlbmVyYXRlVG9vbHRpcFJvdyhpdGVtLnRpdGxlLCBpdGVtLnZhbHVlKSkuam9pbignPGJyIC8+JylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50TGV2ZWwgPSB0aGlzLmN1ckxWTC5fZGF0YVswXSxcbiAgICAgICAgY3VycmVudExldmVsID0gdGhpcy5jdXJMVkwuX2RhdGFbdGhpcy52YWx1ZUNvbHVtbl07XG5cbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVUb29sdGlwUm93KHBhcmVudExldmVsLnRpdGxlLCBwYXJlbnRMZXZlbC52YWx1ZSksXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVUb29sdGlwUm93KGN1cnJlbnRMZXZlbC50aXRsZSwgY3VycmVudExldmVsLnZhbHVlKVxuICAgICAgXS5qb2luKCc8YnIgLz4nKVxuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlVG9vbHRpcFJvdyhsYWJlbCwgdmFsdWUpIHtcbiAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwidG9vbHRpcC1sZXZlbC1sYWJlbFwiPicgKyBsYWJlbCArICc6IDwvc3Bhbj48c3BhbiBjbGFzcz1cInRvb2x0aXAtbGV2ZWwtdmFsdWVcIj4nICsgdmFsdWUgKyAnPC9zcGFuPidcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgc3ViY2VsbCBieSB0ZXh0IHJhdGhlciB0aGFuIGJ5IGlkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gbmFtZSBvZiB0aGUgc3ViY2VsbCB3ZSdyZSBsb29raW5nIGZvclxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGEgc3ViY2VsbCB3aGljaCBoYXMgdGhhdCBuYW1lXG4gICAqICovXG4gIGdldExldmVsQnlOYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJMVkwuc3ViY2VsbHMuZmlsdGVyKGVsID0+IGVsLnRleHQgPT09IG5hbWUpWzBdO1xuICB9XG5cblxuICAvKipcbiAgICogQ3JlYXRlcyBjdXN0b20gZ2VvSlNPTiBmaWxlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtYXBEYXRhIC0gaW5pdGlhbCBtYXBcbiAgICogQHBhcmFtIHtBcnJheX1jb3VudHJpZXNMaXN0IC0gbGlzdCBvZiBjb3VudHJpZXMgSURzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXBOYW1lXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqICovXG4gIHN0YXRpYyBjcmVhdGVDdXN0b21HZW9KU09OKG1hcERhdGEsIGNvdW50cmllc0xpc3QsIG1hcE5hbWUpIHtcbiAgICBsZXQgZ2VvanNvbiA9IHtcbiAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgdmVyc2lvbjogXCIwLjEuMFwiLFxuICAgICAgdHlwZTogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgICAgY29weXJpZ2h0OiBcIkNvcHlyaWdodCAoYykgMjAxNSBIaWdoc29mdCBBUywgQmFzZWQgb24gZGF0YSBmcm9tIE5hdHVyYWwgRWFydGhcIixcbiAgICAgIGNvcHlyaWdodFNob3J0OiBcIk5hdHVyYWwgRWFydGhcIixcbiAgICAgIGNvcHlyaWdodFVybDogXCJodHRwOi8vd3d3Lm5hdHVyYWxlYXJ0aGRhdGEuY29tXCIsXG4gICAgICBjcnM6IHtcbiAgICAgICAgdHlwZTogXCJuYW1lXCIsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBuYW1lOiBcInVybjpvZ2M6ZGVmOmNyczpFUFNHOjU0MDAzXCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiaGMtdHJhbnNmb3JtXCI6IHtcbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNyczogXCIrcHJvaj1taWxsICtsYXRfMD0wICtsb25fMD0wICt4XzA9MCAreV8wPTAgK1JfQSArZGF0dW09V0dTODQgK3VuaXRzPW0gK25vX2RlZnNcIixcbiAgICAgICAgICBzY2FsZTogMS43MjE4Mjc4MTY1NGUtMDUsXG4gICAgICAgICAganNvbnJlczogMTUuNSxcbiAgICAgICAgICBqc29ubWFyZ2luWDogLTk5OSxcbiAgICAgICAgICBqc29ubWFyZ2luWTogOTg1MS4wLFxuICAgICAgICAgIHhvZmZzZXQ6IC0xOTQ5NTM1Ni4zNjkzLFxuICAgICAgICAgIHlvZmZzZXQ6IDEyNjM1OTA4LjE5ODJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZlYXR1cmVzOiBEcmlsbGRvd25NYXAuZ2V0RmVhdHVyZXMoY291bnRyaWVzTGlzdCwgbWFwRGF0YSlcbiAgICB9O1xuXG4gICAgZ2VvanNvbi50aXRsZSA9IG1hcE5hbWU7XG4gICAgcmV0dXJuIGdlb2pzb247XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFycmF5IG9mIGZlYXR1cmVzIGZyb20gZ2VvSlNPTiBmaWxlXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBjb3VudHJpZXNMaXN0IC0gY291bnRyaWVzIElEc1xuICAgKiBAcGFyYW0ge09iamVjdH0gbWFwRGF0YSAtIHlvdXIgaW5pdGlhbCBtYXBcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBmb3IgZ2VvanNvbiBmZWF0dXJlcyBjb21wYXJpbmdcbiAgICogQHJldHVybnMge0FycmF5fSBmZWF0dXJlcyBsaXN0XG4gICAqICovXG4gIHN0YXRpYyBnZXRGZWF0dXJlcyhjb3VudHJpZXNMaXN0LCBtYXBEYXRhLCBrZXkgPSBcImhjLWtleVwiKSB7XG4gICAgaWYgKHR5cGVvZiBjb3VudHJpZXNMaXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG1hcERhdGEuZmVhdHVyZXMuZmlsdGVyKGZlYXR1cmUgPT4gZmVhdHVyZS5wcm9wZXJ0aWVzW2tleV0gPT09IGNvdW50cmllc0xpc3QpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb3VudHJpZXNMaXN0KSkge1xuICAgICAgcmV0dXJuIG1hcERhdGEuZmVhdHVyZXMuZmlsdGVyKGZlYXR1cmUgPT4gY291bnRyaWVzTGlzdC5pbmRleE9mKGZlYXR1cmUucHJvcGVydGllc1trZXldKSAhPT0gLTEpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCBzZXJpZXMgZm9yIHRoZSBmaXJzdCB0aW1lIG1hcCBpbml0aWFsaXphdGlvblxuICAgKiBAcGFyYW0ge0FycmF5fSBbc2VyaWVzPVtdXSAtIHNlcmllc1xuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqICovXG4gIGluaXRpYWxpemVNYXAoc2VyaWVzID0gW10pIHtcbiAgICB0aGlzLmN1ckxWTC5zdWJjZWxscy5mb3JFYWNoKHN1YmNlbGwgPT4ge1xuICAgICAgaWYgKHN1YmNlbGwubWFwSUQpIHtcbiAgICAgICAgbGV0IHNlcmllc0l0ZW0gPSB0aGlzLmNvbXBvc2VTZXJpZXMoc3ViY2VsbCk7XG4gICAgICAgIHNlcmllcy5wdXNoKHNlcmllc0l0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzZXJpZXM7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBtYXAgZnJvbSBIaWdoTWFwcyBtYXAgY29sbGVjdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc291cmNlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKiAqL1xuICBzdGF0aWMgbG9hZE1hcChzb3VyY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5e1xuICAgICAgICBqUXVlcnkuZ2V0U2NyaXB0KCdodHRwczovL2NvZGUuaGlnaGNoYXJ0cy5jb20vbWFwZGF0YS8nICsgc291cmNlICsgJy5qcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXNvbHZlKEhpZ2hjaGFydHMubWFwc1tzb3VyY2VdKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoKGVycm9yKXtcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1haW4gdmFsdWUgdGhhdCB0aGUgY2hhcnQgaXMgYnVpbHQgb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGxldmVsIC0gbGV2ZWwgdW5kZXIgZXhhbWluYXRpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlQ29sdW1uIC0gWmVyby1iYXNlZCBjb2x1bW4gaW5kZXggdGhhdCBjb250YWlucyBwcmltYXJ5IHZhbHVlIHdoaWNoIHdpbGwgYmUgdXNlZCBmb3IgbWFwIGNvbG9yaW5nXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgcHJpbWFyeSB2YWx1ZVxuICAgKiAqL1xuICBzdGF0aWMgZ2V0UHJpbWFyeVZhbHVlKGxldmVsLCB2YWx1ZUNvbHVtbikge1xuICAgIHJldHVybiBsZXZlbC5fZGF0YVt2YWx1ZUNvbHVtbl0udmFsdWU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc2luZ2xlIHNlcmllcyBkYXRhIGZvciBIaWdoTWFwIHNlcmllcyBvcHRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGxldmVsIC0gYSBsZXZlbCBpbiBoaWVyYXJjaHlcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICogKi9cbiAgZ2V0U2VyaWVzRGF0YShsZXZlbCkge1xuICAgIGxldCBkcmlsbGRvd24gPSBsZXZlbC5zdWJjZWxscyA/IGxldmVsLnRleHQgOiBudWxsO1xuICAgIGlmICh0eXBlb2YgbGV2ZWwubWFwSUQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gW3tcbiAgICAgICAgZHJpbGxkb3duOiBkcmlsbGRvd24sXG4gICAgICAgIGNvZGU6IGxldmVsLm1hcElELFxuICAgICAgICB2YWx1ZTogRHJpbGxkb3duTWFwLmdldFByaW1hcnlWYWx1ZShsZXZlbCwgdGhpcy52YWx1ZUNvbHVtbiksXG4gICAgICAgIGRhdGE6IGxldmVsLl9kYXRhLFxuICAgICAgfV1cbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobGV2ZWwubWFwSUQpKSB7XG4gICAgICByZXR1cm4gbGV2ZWwubWFwSUQubWFwKG1hcElEID0+IHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRyaWxsZG93bjogZHJpbGxkb3duLFxuICAgICAgICAgIGNvZGU6IG1hcElELFxuICAgICAgICAgIHZhbHVlOiBEcmlsbGRvd25NYXAuZ2V0UHJpbWFyeVZhbHVlKGxldmVsLCB0aGlzLnZhbHVlQ29sdW1uKSxcbiAgICAgICAgICBkYXRhOiBsZXZlbC5fZGF0YSxcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkRhdGEgZWxlbWVudCBpcyBjb3JydXB0ZWRcIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGBjb2xvckZuYCBwYXNzZWQgYnkgdXNlciB0byBjb21wdXRlIGNvbG9yIGJ5IHBhc3NpbmcgYHZhbHVlYCBhbmQgYHRhcmdldGAgdG8gaXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29sb3JGbiAtIGNvbG9yIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIHZhbHVlIHRvIHRlc3RcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRhcmdldCAtIHRhcmdldCBmb3IgdGhlIGxldmVsXG4gICAqICovXG4gIHN0YXRpYyBjb21wdXRlQ29sb3IoY29sb3JGbiwgdmFsdWUsIHRhcmdldCkge1xuICAgIGlmIChjb2xvckZuKSB7XG4gICAgICByZXR1cm4gY29sb3JGbih2YWx1ZSwgdGFyZ2V0KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHNpbmdsZSBtYXBwb2ludCBzZXJpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHN1YmNlbGwgLSBhIHNpbmdsZSBoaWVyYXJjaHkgZWxlbWVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gbWFwRGF0YVxuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhcnQgLSByZWZlcmVuY2UgdG8gY2hhcnQgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlcmllcyBmb3IgbWFwIHBvaW50c1xuICAgKiAqL1xuICBnZXRDb29yZGluYXRlU2VyaWVzKHN1YmNlbGwsIG1hcERhdGEsIGNoYXJ0KSB7XG4gICAgY2hhcnQubWFwVHJhbnNmb3JtcyA9IG1hcERhdGEgPyBtYXBEYXRhW1wiaGMtdHJhbnNmb3JtXCJdIDogSGlnaGNoYXJ0cy5tYXBzW1wiY3VzdG9tL3dvcmxkLWhpZ2hyZXMyXCJdW1wiaGMtdHJhbnNmb3JtXCJdO1xuICAgIGxldCBwb3MgPSBjaGFydC5mcm9tTGF0TG9uVG9Qb2ludCh7bGF0OiBzdWJjZWxsLmNvb3JkaW5hdGVzWzBdLCBsb246IHN1YmNlbGwuY29vcmRpbmF0ZXNbMV19KTtcbiAgICBsZXQgY29uZmlnID0ge1xuICAgICAgdHlwZTogXCJtYXBwb2ludFwiLFxuICAgICAgbmFtZTogc3ViY2VsbC50ZXh0LFxuICAgICAgbWFya2VyOiB7XG4gICAgICAgIGxpbmVDb2xvcjogXCJibGFja1wiLFxuICAgICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICAgIHJhZGl1czogNCxcbiAgICAgICAgc3ltYm9sOiBcImNpcmNsZVwiLFxuICAgICAgfSxcbiAgICAgIGRhdGE6IFt7XG4gICAgICAgIGNvbG9yOiBEcmlsbGRvd25NYXAuY29tcHV0ZUNvbG9yKHRoaXMuY29sb3JGbiwgRHJpbGxkb3duTWFwLmdldFByaW1hcnlWYWx1ZShzdWJjZWxsLCB0aGlzLnZhbHVlQ29sdW1uKSwgc3ViY2VsbC50YXJnZXQpLFxuICAgICAgICBuYW1lOiBzdWJjZWxsLnRleHQsXG4gICAgICAgIHZhbHVlOiBzdWJjZWxsLnZhbHVlLFxuICAgICAgICB4OiBwb3MueCxcbiAgICAgICAgeTogcG9zLnlcbiAgICAgIH1dXG4gICAgfTtcbiAgICBpZiAodGhpcy5tYXBwb2ludENhbGxiYWNrKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBjb25maWcuZXZlbnRzID0ge1xuICAgICAgICBjbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBzZWxmLm1hcHBvaW50Q2FsbGJhY2suY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHNpbmdsZSBzZXJpZXMgaXRlbSBmb3IgSGlnaG1hcHMgc2VyaWVzIG9wdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gc3ViY2VsbCAtIGEgc3ViY2VsbFxuICAgKiBAcGFyYW0ge09iamVjdH0gbWFwRGF0YVxuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhcnQgLSByZWZlcmVuY2UgdG8gY2hhcnQgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgc2VyaWVzXG4gICAqICovXG4gIGNvbXBvc2VTZXJpZXMoc3ViY2VsbCwgbWFwRGF0YSwgY2hhcnQpIHtcbiAgICBpZiAoIXN1YmNlbGwuY29vcmRpbmF0ZXMpIHtcbiAgICAgIG1hcERhdGEgPSBtYXBEYXRhID8gSGlnaGNoYXJ0cy5nZW9qc29uKERyaWxsZG93bk1hcC5jcmVhdGVDdXN0b21HZW9KU09OKG1hcERhdGEsIHN1YmNlbGwubWFwSUQsIHN1YmNlbGwudGV4dCkpIDogSGlnaGNoYXJ0cy5nZW9qc29uKERyaWxsZG93bk1hcC5jcmVhdGVDdXN0b21HZW9KU09OKEhpZ2hjaGFydHMubWFwc1snY3VzdG9tL3dvcmxkLWhpZ2hyZXMyJ10sIHN1YmNlbGwubWFwSUQsIHN1YmNlbGwudGV4dCkpO1xuICAgICAgaWYgKHN1YmNlbGwubWFwSUQpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHN1YmNlbGwudGFyZ2V0O1xuICAgICAgICBpZiAoIXRhcmdldCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICB0YXJnZXQgPSB0aGlzLmhpZXJhcmNoeVswXS50YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBzdWJjZWxsLnRleHQsXG4gICAgICAgICAgZGF0YUxhYmVsczoge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zZXJpZXMuZGF0YVswXVtcImhjLWtleVwiXSA9PT0gdGhpcy5wb2ludFtcImhjLWtleVwiXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJpZXMubmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgICAgcG9pbnRGb3JtYXQ6IHRoaXMuZ2V0VG9vbHRpcCgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb2xvcjogRHJpbGxkb3duTWFwLmNvbXB1dGVDb2xvcih0aGlzLmNvbG9yRm4sIERyaWxsZG93bk1hcC5nZXRQcmltYXJ5VmFsdWUoc3ViY2VsbCwgdGhpcy52YWx1ZUNvbHVtbiksIHRhcmdldCksXG4gICAgICAgICAgYWxsQXJlYXM6IGZhbHNlLFxuICAgICAgICAgIHBhcmVudDogc3ViY2VsbC5wYXJlbnQudGV4dCxcbiAgICAgICAgICBtYXBEYXRhLFxuICAgICAgICAgIGpvaW5CeTogWydoYy1rZXknLCAnY29kZSddLFxuICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0U2VyaWVzRGF0YShzdWJjZWxsKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRDb29yZGluYXRlU2VyaWVzKHN1YmNlbGwsIG1hcERhdGEsIGNoYXJ0KVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgeW91ciBtYXAgdmlldyBhZnRlciBkcmlsbGRvd24gY2xpY2tcbiAgICogQHBhcmFtIHtPYmplY3R9IGN1ckxWTFxuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhcnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgLSBkcmlsbGRvd24gZXZlbnQgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgY3VyTFZMXG4gICAqICovXG4gIHVwZGF0ZU1hcChjdXJMVkwsIGNoYXJ0LCBlKSB7XG4gICAgaWYgKGN1ckxWTCAmJiBjdXJMVkwubWFwTmFtZSkgey8vIGlmIHdlIGhhdmUgYW5vdGhlciBtYXAgdG8gbG9hZFxuICAgICAgbGV0IG1hcCA9IERyaWxsZG93bk1hcC5sb2FkTWFwKGN1ckxWTC5tYXBOYW1lKTtcbiAgICAgIG1hcC50aGVuKG1hcERhdGEgPT4ge1xuICAgICAgICB0aGlzLmFkZFNlcmllcyhjdXJMVkwsIGNoYXJ0LCBlLCBtYXBEYXRhKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjdXJMVkwgJiYgIWN1ckxWTC5tYXBOYW1lKSB7XG4gICAgICB0aGlzLmFkZFNlcmllcyhjdXJMVkwsIGNoYXJ0LCBlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29tcG9zZXMgYSBzZXJpZXMgZm9yIHlvdXIgSGlnaE1hcHMgb3B0aW9ucyBjb25maWdcbiAgICogQHBhcmFtIHtPYmplY3R9IGN1ckxWTFxuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhcnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgLSBkcmlsbGRvd24gZXZlbnQgb2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtYXBEYXRhIC0gbWFwRGF0YSBnZW9KU09OXG4gICAqICovXG4gIGFkZFNlcmllcyhjdXJMVkwsIGNoYXJ0LCBlLCBtYXBEYXRhKSB7XG4gICAgaWYgKGN1ckxWTC5zdWJjZWxscykgeyAvLyBpZiBpdCdzIGFuIGVuZCBwb2ludFxuICAgICAgaWYgKGN1ckxWTC5zdWJjZWxsc1swXS5jb29yZGluYXRlcykge1xuICAgICAgICBsZXQgc2VyaWVzSXRlbSA9IHRoaXMuY29tcG9zZVNlcmllcyhjdXJMVkwsIG1hcERhdGEsIGNoYXJ0KTtcbiAgICAgICAgc2VyaWVzSXRlbS5kYXRhLmZvckVhY2goZGF0YUl0ZW0gPT4ge1xuICAgICAgICAgIGRhdGFJdGVtLmRyaWxsZG93biA9IG51bGw7XG4gICAgICAgICAgZGF0YUl0ZW0udmFsdWUgPSBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICBjaGFydC5hZGRTaW5nbGVTZXJpZXNBc0RyaWxsZG93bihlLnBvaW50LCBzZXJpZXNJdGVtKTtcbiAgICAgIH1cbiAgICAgIGN1ckxWTC5zdWJjZWxscy5mb3JFYWNoKHN1YmNlbGwgPT4ge1xuICAgICAgICBpZiAoIXN1YmNlbGwubWFwSUQgJiYgIXN1YmNlbGwuY29vcmRpbmF0ZXMpIHJldHVybjtcbiAgICAgICAgbGV0IHNlcmllc0l0ZW0gPSB0aGlzLmNvbXBvc2VTZXJpZXMoc3ViY2VsbCwgbWFwRGF0YSwgY2hhcnQpO1xuICAgICAgICBjaGFydC5hZGRTaW5nbGVTZXJpZXNBc0RyaWxsZG93bihlLnBvaW50LCBzZXJpZXNJdGVtKTtcbiAgICAgIH0pO1xuICAgICAgY2hhcnQuYXBwbHlEcmlsbGRvd24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHNlcmllc0l0ZW0gPSB0aGlzLmNvbXBvc2VTZXJpZXMoY3VyTFZMLCBtYXBEYXRhLCBjaGFydCk7XG4gICAgICBzZXJpZXNJdGVtLmRhdGEubWFwKGRhdGFJdGVtID0+IHtcbiAgICAgICAgZGF0YUl0ZW0uZHJpbGxkb3duID0gbnVsbDtcbiAgICAgICAgZGF0YUl0ZW0udmFsdWUgPSBudWxsXG4gICAgICB9KTtcbiAgICAgIGNoYXJ0LmFkZFNlcmllc0FzRHJpbGxkb3duKGUucG9pbnQsIHNlcmllc0l0ZW0pO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0RyaWxsZG93bk1hcC5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBJdmFuUCBvbiAyNi4xMi4yMDE2LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBIaWVyYXJjaHkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLmRlY2xhcmVHbG9iYWxzKGNvbmZpZyx7XG4gICAgICAgIG5vcm1hbHM6IHt9LFxuICAgICAgICBub3JtYWxzU2VwYXJhdG9yOiAnLCcsXG4gICAgICB9LFxuICAgICAgdGhpcy50eXBlQ2hlY2soY29uZmlnKVxuICAgICk7XG5cbiAgICBpZih0aGlzLmZsYXRIaWVyYXJjaHkgJiYgIXRoaXMuaGllcmFyY2h5KXtcbiAgICAgIHRoaXMuaGllcmFyY2h5PXRoaXMuY29tcG9zZVRyZWVIaWVyYXJjaHkoKTtcbiAgICB9IGVsc2UgaWYoIXRoaXMuZmxhdEhpZXJhcmNoeSAmJiB0aGlzLmhpZXJhcmNoeSl7XG4gICAgICB0aGlzLmZsYXRIaWVyYXJjaHkgPSB0aGlzLmNvbXBvc2VGbGF0SGllcmFyY2h5KClcbiAgICB9XG4gICAgdGhpcy5hZGRNYXBJRHNUb0hpZXJhcmNoeUxldmVsKCk7XG4gICAgcmV0dXJuIHtoaWVyYXJjaHk6dGhpcy5oaWVyYXJjaHksIGZsYXRIaWVyYXJjaHk6dGhpcy5mbGF0SGllcmFyY2h5fVxuICB9XG5cbiAgZGVjbGFyZUdsb2JhbHMoY29uZmlnLCBkZWZhdWx0cyA9IHt9LCB0eXBlQ2hlY2sgPSB7fSkge1xuICAgIGNvbnN0IG1peGVkT3B0aW9ucyA9IHsuLi5jb25maWcsIC4uLmRlZmF1bHRzfTtcbiAgICBPYmplY3Qua2V5cyhtaXhlZE9wdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0eXBlQ2hlY2tba2V5XSAmJiB0eXBlb2YgdHlwZUNoZWNrW2tleV0gPT09ICdmdW5jdGlvbicpIHR5cGVDaGVja1trZXldKG1peGVkT3B0aW9uc1trZXldKTtcbiAgICAgIHRoaXNba2V5XSA9IG1peGVkT3B0aW9uc1trZXldO1xuICAgIH0pXG4gIH1cblxuICB0eXBlQ2hlY2sob3B0cyl7XG4gICAgaWYob3B0cy5mbGF0SGllcmFyY2h5KXtcbiAgICAgIGlmKHR5cGVvZiBvcHRzLmZsYXRIaWVyYXJjaHkgIT09ICdvYmplY3QnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImZsYXRIaWVyYXJjaHlcIiBtdXN0IGJlIGFuIE9iamVjdCBidXQgaXQgaXMgYSAnKyB0eXBlb2Ygb3B0cy5mbGF0SGllcmFyY2h5KTtcbiAgICAgIGlmKE9iamVjdC5rZXlzKG9wdHMuZmxhdEhpZXJhcmNoeSkubGVuZ3RoPT09MCkgY29uc29sZS5lcnJvcignZmxhdEhpZXJhcmNoeSBoYXMgbm8gbm9kZXMgaW4gaXQnKTtcbiAgICB9XG5cbiAgICBpZihvcHRzLmhpZXJhcmNoeSl7XG4gICAgICBpZighQXJyYXkuaXNBcnJheShvcHRzLmhpZXJhcmNoeSkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiaGllcmFyY2h5XCIgbXVzdCBiZSBhbiBBcnJheSBidXQgaXQgaXMgYSAnKyB0eXBlb2Ygb3B0cy5oaWVyYXJjaHkpO1xuICAgICAgaWYob3B0cy5oaWVyYXJjaHkubGVuZ3RoPT09MCkgY29uc29sZS5lcnJvcignaGllcmFyY2h5IGhhcyBubyBub2RlcyBpbiBpdCcpO1xuICAgIH1cblxuICAgIGlmKCFvcHRzLmZsYXRIaWVyYXJjaHkgJiYgIW9wdHMuaGllcmFyY2h5KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdlaXRoZXIgXCJmbGF0SGllcmFyY2h5XCIgb3IgXCJoaWVyYXJjaHlcIiBtdXN0IGJlIHBhc3NlZCBmb3IgbWFwIHRvIHdvcmsnKTtcblxuICAgIHJldHVybiB7XG4gICAgICBub3JtYWxzU2VwYXJhdG9yOiBmdW5jdGlvbigpe2lmKHR5cGVvZiBvcHRzLm5vcm1hbHNTZXBhcmF0b3IgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcIm5vcm1hbHNTZXBhcmF0b3JcIiBtdXN0IGJlIGFuIFN0cmluZyBidXQgaXQgaXMgYSAnKyB0eXBlb2Ygb3B0cy5ub3JtYWxzU2VwYXJhdG9yKX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGhpZXJhcmNoeSBhcnJheSBieSBhc3NpZ25pbmcgcGFyZW50LWNoaWxkIHJlbGF0aW9ucyBhbmQgcmV0dXJuaW5nIHRob3NlIHRoYXQgZG9uJ3QgaGF2ZSBhIHBhcmVudFxuICAgKiAqL1xuICBjb21wb3NlVHJlZUhpZXJhcmNoeSgpIHtcbiAgICBsZXQgb3JwaGFuSXRlbXMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5mbGF0SGllcmFyY2h5KSB7XG4gICAgICBsZXQgaXRlbSA9IHRoaXMuZmxhdEhpZXJhcmNoeVtrZXldO1xuICAgICAgdGhpcy5ub3JtYWxpemUoaXRlbSk7XG4gICAgICBpZiAodGhpcy5faXRlbUhhc1BhcmVudChpdGVtKSkge1xuICAgICAgICB0aGlzLl9hc3NpZ25QYXJlbnRUb0l0ZW0oaXRlbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcnBoYW5JdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3JwaGFuSXRlbXNcbiAgfVxuXG4gIC8qKlxuICAgKiBub3JtYWxpemVzIGEgc3RyaW5nIHZhbHVlIHRvIGEgY2VydGFpbiBmb3JtYXQuXG4gICAqIC0gYGFycmF5U3RyaW5nYCAtIG5vcm1hbGl6ZXMgY29tbWEtc2VwYXJhdGVkIGl0ZW1zIHRvIGFuIEFycmF5IG9mIFN0cmluZ3MsIGkuZSBcImhhaGFcIiwgXCJsYWxhXCIgd291bGQgYmUgW1wiaGFoYVwiLCBcImxhbGFcIl1cbiAgICogLSBgYXJyYXlOdW1iZXJgIC0gbm9ybWFsaXplcyBjb21tYS1zZXBhcmF0ZWQgaXRlbXMgdG8gYW4gQXJyYXkgb2YgRmxvYXRzLCBpLmUgXCItMTMuNDFcIiwgXCI0OC42NlwiIHdvdWxkIGJlIFstMTMuNDEsIDQ4LjY2XVxuICAgKiAtIGBzdHJpbmdgIC0gcmV0dXJucyB0aGUgc3RyaW5nIGFzIGlzXG4gICAqIC0gYG51bWJlcmAgLSBwYXJzZXMgdGhlIHN0cmluZyBhcyBhIEZsb2F0XG4gICAqIC0gYGJvb2xlYW5gIC0gcGFyc2VzIHRoZSBzdHJpbmcgYXMgYSBCb29sZWFuLCBjYXNlIGluc2Vuc2l0aXZlXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gaXRlbSB0byBtYXRjaCBjb250ZW50cyBhZ2FpbnN0IGBub3JtYWxzYFxuICAgKiAqL1xuICBub3JtYWxpemUoaXRlbSkge1xuICAgIGlmICh0aGlzLnNob3VsZE5vcm1hbGl6ZSkge1xuICAgICAgbGV0IHBhcnNlciA9IHtcbiAgICAgICAgc3RyaW5nQXJyYXk6IHZhbCA9PiB2YWwuc3BsaXQodGhpcy5ub3JtYWxzU2VwYXJhdG9yKSxcbiAgICAgICAgbnVtYmVyQXJyYXk6IHZhbCA9PiB2YWwuc3BsaXQodGhpcy5ub3JtYWxzU2VwYXJhdG9yKS5tYXAoaSA9PiBwYXJzZUZsb2F0KGkpKSxcbiAgICAgICAgc3RyaW5nOiB2YWwgPT4gdmFsLnRyaW0oKSxcbiAgICAgICAgbnVtYmVyOiB2YWwgPT4gdmFsICE9PSBudWxsICYmICFpc05hTihwYXJzZUZsb2F0KHZhbCkpID8gcGFyc2VGbG9hdCh2YWwpIDogbnVsbCxcbiAgICAgICAgYm9vbGVhbjogdmFsID0+IHZhbC50b0xvd2VyQ2FzZSgpID09PSBcInRydWVcIiB8fCB2YWwgPT09IFwiMVwiXG4gICAgICB9O1xuXG4gICAgICBmb3IgKGxldCBub3JtYWwgaW4gdGhpcy5ub3JtYWxzKSB7XG4gICAgICAgIGlmIChpdGVtW25vcm1hbF0pIHsvLyBwcm9wZXJ0eSBleGlzdHMgaW4gb2JqZWN0XG4gICAgICAgICAgaWYgKGl0ZW1bbm9ybWFsXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpdGVtW25vcm1hbF0gPSBwYXJzZXJbdGhpcy5ub3JtYWxzW25vcm1hbF1dKGl0ZW1bbm9ybWFsXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGl0ZW1bbm9ybWFsXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pdGVtSGFzUGFyZW50KGl0ZW0pe1xuICAgIHJldHVybiBpdGVtLnBhcmVudCAmJiBpdGVtLnBhcmVudCAhPT0gbnVsbCAmJiBpdGVtLnBhcmVudC5sZW5ndGggPiAwXG4gIH1cblxuICBfYXNzaWduUGFyZW50VG9JdGVtKGl0ZW0pe1xuICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5mbGF0SGllcmFyY2h5W2l0ZW0ucGFyZW50XTtcbiAgICBpdGVtLnBhcmVudC5zdWJjZWxscyA9IGl0ZW0ucGFyZW50LnN1YmNlbGxzIHx8IFtdO1xuICAgIGl0ZW0ucGFyZW50LnN1YmNlbGxzLnB1c2goaXRlbSk7XG4gIH1cblxuICBnZXQgc2hvdWxkTm9ybWFsaXplKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm5vcm1hbHMpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBjb21wb3NlRmxhdEhpZXJhcmNoeSgpIHtcbiAgICBsZXQgZmxhdEhpZXJhcmNoeSA9IHt9O1xuICAgIGNvbnN0IHNob3VsZE5vcm1hbGl6ZSA9IHRoaXMuc2hvdWxkTm9ybWFsaXplO1xuICAgIHRoaXMuaGllcmFyY2h5LmZvckVhY2goXG4gICAgICBpdGVtID0+IHtcbiAgICAgICAgaWYgKHNob3VsZE5vcm1hbGl6ZSkgdGhpcy5ub3JtYWxpemUoaXRlbSk7XG4gICAgICAgIGZsYXRIaWVyYXJjaHlbaXRlbS5pZF0gPSBpdGVtO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIGZsYXRIaWVyYXJjaHk7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgaW5pdGlhbCBoaWVyYXJjaHlcbiAgICogQHBhcmFtIGhpZXJhcmNoeVxuICAgKiBAcGFyYW0gcGFyZW50IC0gaGllcmFyY2h5IGxldmVsIHBhcmVudFxuICAgKi9cbiAgYWRkTWFwSURzVG9IaWVyYXJjaHlMZXZlbChoaWVyYXJjaHk9dGhpcy5oaWVyYXJjaHksIHBhcmVudCA9IG51bGwpIHtcbiAgICBoaWVyYXJjaHkuZm9yRWFjaChzdWJjZWxsID0+IHtcbiAgICAgIHRoaXMuaW5oZXJpdE1hcE5hbWUoc3ViY2VsbCk7XG4gICAgICBpZiAoc3ViY2VsbC5zdWJjZWxscykge1xuICAgICAgICB0aGlzLmFkZE1hcElEc1RvSGllcmFyY2h5TGV2ZWwoc3ViY2VsbC5zdWJjZWxscywgc3ViY2VsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1YmJsZU1hcElkKHN1YmNlbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5oZXJpdE1hcE5hbWUoaXRlbSl7XG4gICAgaWYgKHRoaXMucGFyZW50SGFzTWFwTmFtZShpdGVtKSkge1xuICAgICAgaXRlbS5tYXBOYW1lID0gaXRlbS5wYXJlbnQubWFwTmFtZTtcbiAgICB9XG4gIH1cblxuICBidWJibGVNYXBJZChpdGVtKXtcbiAgICBpZiAoaXRlbS5wYXJlbnQgJiYgaXRlbS5tYXBJRCAmJiAhaXRlbS5wYXJlbnQubWFwTmFtZSkge1xuICAgICAgaWYgKCFpdGVtLnBhcmVudC5tYXBJRCkgaXRlbS5wYXJlbnQubWFwSUQgPSBbXTtcbiAgICAgIGl0ZW0ucGFyZW50Lm1hcElEID0gaXRlbS5wYXJlbnQubWFwSUQuY29uY2F0KGl0ZW0ubWFwSUQpO1xuICAgIH1cbiAgfVxuXG4gIHBhcmVudEhhc01hcE5hbWUoaXRlbSl7XG4gICAgcmV0dXJuIGl0ZW0ucGFyZW50ICYmIGl0ZW0ucGFyZW50ICE9PSBudWxsICYmIGl0ZW0ucGFyZW50Lm1hcE5hbWVcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC1oaWVyYXJjaHkuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yLWFnZ3JlZ2F0ZWQtdGFibGUvc3JjL2FnZ3JlZ2F0ZWQtdGFibGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yLXNvcnQtdGFibGUvc3JjL3NvcnQtdGFibGUtc3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vci10YWJsZS1mbG9hdGluZy1oZWFkZXIvc3JjL3RhYmxlLWZsb2F0aW5nLWhlYWRlci1zdHlsZXMuY3NzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RyaWxsZG93bi1tYXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9