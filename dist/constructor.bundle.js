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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _rReportalBase = __webpack_require__(1);
	
	var _rReportalBase2 = _interopRequireDefault(_rReportalBase);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by IvanP on 30.12.2016.
	 */
	__webpack_require__(18);
	
	var MapsConstructor = function () {
	  function MapsConstructor() {
	    var _this = this;
	
	    _classCallCheck(this, MapsConstructor);
	
	    return _rReportalBase2.default.promiseRequest("maps.json").then(function (cfg) {
	      _this.config = JSON.parse(cfg);
	      _this.hm = _this.constructor.stubHighcharts();
	      _this.mapsSelector = document.querySelector("#mapsSectionSelector");
	      _this.mapsList = document.querySelector("#mapsList");
	      _this.countriesList = document.querySelector("#countriesList");
	      _this.countriesFilter = document.querySelector("#countriesFilter");
	      _this.mapsFilter = document.querySelector("#mapsFilter");
	      _this.processMap = _this.processMap.bind(_this);
	      document.querySelector('#btn-getIDs').addEventListener('click', function (e) {
	        MapsConstructor.copyIDsToClipboard(e, 'IDsStorage');
	      });
	      _this.createMapSwitcher();
	      _this.initFiltering();
	    });
	  }
	
	  _createClass(MapsConstructor, [{
	    key: "initFiltering",
	
	
	    /**
	     * Sets up simple filtering matching all matches on keystroke and clear
	     * */
	    value: function initFiltering() {
	      var filters = [this.countriesFilter, this.mapsFilter];
	      var targets = [this.countriesList, this.mapsList];
	      filters.forEach(function (filter, index) {
	        filter.addEventListener('input', function (e) {
	          var value = e.target.value;
	          var target = targets[index];
	          if (target.nodeName == "TABLE") {
	            [].slice.call(target.querySelectorAll("tbody>tr>td:nth-child(1)")).forEach(function (el) {
	              var parent = el.parentNode;
	              if (el.textContent.toLowerCase().indexOf(value.toLowerCase()) > -1) {
	                parent.style.display = "table-row";
	              } else {
	                parent.style.display = "none";
	              }
	            });
	          }
	          if (target.nodeName == "UL") {
	            [].slice.call(target.querySelectorAll("li")).forEach(function (el) {
	              if (el.textContent.toLowerCase().indexOf(value.toLowerCase()) > -1) {
	                el.style.display = "block";
	              } else {
	                el.style.display = "none";
	              }
	            });
	          }
	        });
	      });
	    }
	  }, {
	    key: "createMapSwitcher",
	
	
	    /**
	     * creates a dropdown that switches maps
	     *
	     */
	    value: function createMapSwitcher() {
	      var _this2 = this;
	
	      var select = document.querySelector("#mapsSectionSelector");
	      this.config.forEach(function (section, index) {
	        var option = document.createElement('option');
	        option.value = index;
	        option.textContent = section.title;
	        _this2.mapsSelector.appendChild(option);
	      });
	      this.mapsSelector.addEventListener('change', function (e) {
	        _this2.loadMapsSection(select.value);
	      });
	      this.loadMapsSection(0);
	    }
	
	    /**
	     * loads a map section
	     * */
	
	  }, {
	    key: "loadMapsSection",
	    value: function loadMapsSection(sectionIndex) {
	      var _this3 = this;
	
	      this.currentSection = this.config[sectionIndex];
	      this.clearMapsList();
	      this.currentSection.maps.forEach(function (map, i) {
	        var li = MapsConstructor.createElement('li');
	        li.appendChild(_this3.createRadio(i, map.title));
	        li.appendChild(_this3.createLink(i, 'demo'));
	        _this3.mapsList.appendChild(li);
	      });
	    }
	  }, {
	    key: "createRadio",
	    value: function createRadio(index, label) {
	      var radio = document.createElement('input');
	      radio.type = "radio";
	      radio.name = "map";
	      radio.value = index;
	      var l = this.constructor.createElement('label', label);
	      l.insertBefore(radio, l.firstChild);
	      radio.addEventListener('change', this.processMap);
	      return l;
	    }
	  }, {
	    key: "createLink",
	    value: function createLink(index, property) {
	      var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "_blank";
	
	      var prop = this.currentSection.maps[index][property],
	          link = MapsConstructor.createElement('a', prop.title);
	      link.href = prop.href;
	      link.target = target;
	      return link;
	    }
	
	    /**
	     * Copies selected countries IDs
	     * @param e - click event
	     */
	
	  }, {
	    key: "displayMultiselect",
	    value: function displayMultiselect(multiselect) {
	      multiselect.style.display = 'block';
	      multiselect.querySelector('#multiSelectCheckbox').checked = false;
	      multiselect.querySelectorAll('button').forEach(function (btn) {
	        return btn.style.display = 'none';
	      });
	      multiselect.querySelector('#multiSelectCheckbox').addEventListener('change', function () {
	        if (this.checked) {
	          multiselect.querySelectorAll('button').forEach(function (btn) {
	            return btn.style.display = 'inline-block';
	          });
	          document.querySelectorAll('#countriesList tbody tr').forEach(function (tr) {
	            tr.querySelector("input[type='checkbox']").style.display = 'table-cell';
	          });
	        } else {
	          multiselect.querySelectorAll('button').forEach(function (btn) {
	            return btn.style.display = 'none';
	          });
	          document.querySelectorAll('#countriesList tbody tr').forEach(function (tr) {
	            tr.querySelector("input[type='checkbox']").style.display = 'none';
	          });
	        }
	      });
	    }
	  }, {
	    key: "processMap",
	    value: function processMap(e) {
	      var _this4 = this;
	
	      var map = this.currentSection.maps[e.target.value];
	      var oMap = this.fakeXHR(map.js.href);
	      oMap.then(function (mapJSON) {
	        _this4.clearCountriesList();
	        _this4.constructor.updateCodebox(_this4.constructor.getMapID(map.js.href));
	        _this4.buildCountriesList(mapJSON);
	        document.querySelector('#btn-deselect').onclick = function () {
	          document.querySelectorAll('#countriesList tbody tr').forEach(function (tr) {
	            tr.querySelector("input[type='checkbox']").checked = false;
	          });
	        };
	        _this4.displayMultiselect(document.querySelector('#multiSelect'));
	      });
	    }
	
	    /**
	     * Shows tooltip when, when text is copied to clipboard
	     * @param e
	     * @param text
	     */
	
	  }, {
	    key: "buildCountriesList",
	    value: function buildCountriesList(map) {
	      var df = document.createDocumentFragment();
	      map.features.forEach(function (feature) {
	        var p = feature.properties,
	            row = MapsConstructor.createElement('tr');
	        df.appendChild(row);
	        var cb = document.createElement('input');
	        cb.type = 'checkbox';
	        cb.value = p['hc-key'];
	        cb.style.display = 'none';
	        row.appendChild(MapsConstructor.createElement('td', p['name']));
	        row.firstChild.insertBefore(cb, row.firstChild.firstChild);
	        var key = MapsConstructor.createElement('td', p['hc-key']);
	        row.appendChild(key);
	        key.addEventListener('click', MapsConstructor.copyTextEventHandler);
	        row.appendChild(MapsConstructor.createElement('td', p['subregion']));
	        row.appendChild(MapsConstructor.createElement('td', p['region-wb']));
	      });
	      this.countriesList.querySelector('tbody').appendChild(df);
	    }
	  }, {
	    key: "clearCountriesList",
	    value: function clearCountriesList() {
	      this.countriesList.querySelector('tbody').innerHTML = '';
	    }
	  }, {
	    key: "fakeXHR",
	    value: function fakeXHR(url) {
	      var _this5 = this;
	
	      var mapID = this.constructor.getMapID(url),
	          hm = this.hm;
	      return new Promise(function (resolve, reject) {
	        if (!_this5.hm[mapID]) {
	          var _getContents = function _getContents(e) {
	            script.removeEventListener('load', _getContents);
	            head.removeChild(script);
	            resolve(hm[mapID]);
	          };
	
	          var script = document.createElement('script'),
	              head = document.querySelector('head');
	          script.addEventListener('load', _getContents);
	
	          script.src = url;
	          head.appendChild(script);
	        } else {
	          resolve(hm[mapID]);
	        }
	      });
	    }
	  }, {
	    key: "clearMapsList",
	    value: function clearMapsList() {
	      var _this6 = this;
	
	      if (this.mapsList.children.length > 0) {
	        [].slice.call(this.mapsList.querySelectorAll('input[type=radio]')).forEach(function (cb) {
	          return cb.removeEventListener('change', _this6.processMap);
	        });
	        this.mapsList.innerHTML = '';
	      }
	    }
	  }], [{
	    key: "stubHighcharts",
	    value: function stubHighcharts() {
	      if (!window.Highcharts) {
	        window.Highcharts = { maps: {} };
	      } else if (!window.Highcharts.maps) {
	        window.Highcharts.maps = {};
	      }
	      return window.Highcharts.maps;
	    }
	  }, {
	    key: "copyIDsToClipboard",
	    value: function copyIDsToClipboard(e) {
	      var ids = [];
	      document.querySelectorAll('#countriesList tbody tr').forEach(function (tr) {
	        var cb = tr.querySelector("input[type='checkbox']");
	        if (cb.checked) {
	          ids.push(cb.value);
	        }
	      });
	      if (ids.length < 1) return;
	      var t = document.querySelector('#IDsStorage');
	      t.value = ids.join();
	      t.style.display = "block";
	      MapsConstructor.copyTextEventHandler(e, 'IDsStorage');
	      t.style.display = "none";
	    }
	  }, {
	    key: "showTooltip",
	    value: function showTooltip(e, text) {
	      var tooltip = document.createElement('div');
	      tooltip.innerHTML = text;
	      tooltip.id = 'tooltip';
	      document.body.appendChild(tooltip);
	      tooltip.style.left = e.pageX - 10 + 'px';
	      tooltip.style.top = e.pageY + 15 + 'px';
	      tooltip.style.opacity = 1;
	      setTimeout(function () {
	        tooltip.style.opacity = 0;
	        tooltip.remove();
	      }, 500);
	    }
	
	    /**
	     * Copies text to clipboard
	     * @param event
	     * @param id
	     */
	
	  }, {
	    key: "copyTextEventHandler",
	    value: function copyTextEventHandler(event, id) {
	      var range = document.createRange();
	      var node = void 0;
	      window.getSelection().removeAllRanges();
	      if (id) {
	        node = document.getElementById(id);
	      } else {
	        node = event.target;
	      }
	      range.selectNode(node);
	      window.getSelection().addRange(range);
	      try {
	        var successful = document.execCommand('copy');
	        var msg = successful ? 'successful' : 'unsuccessful';
	        if (msg) {
	          MapsConstructor.showTooltip(event, "Copied to clipboard!");
	        } else {
	          MapsConstructor.showTooltip(event, "Copy failed!");
	        }
	      } catch (err) {
	        console.log(err);
	      }
	      window.getSelection().removeAllRanges();
	    }
	  }, {
	    key: "updateCodebox",
	    value: function updateCodebox(mapID) {
	      var codebox = document.querySelector('.codebox');
	      codebox.innerHTML = "mapName: <span>" + mapID + "</span>";
	      codebox.querySelector('span').addEventListener('click', MapsConstructor.copyTextEventHandler);
	    }
	  }, {
	    key: "createElement",
	    value: function createElement(tag, text) {
	      var el = document.createElement(tag);
	      if (text) {
	        el.textContent = text;
	      }
	      return el;
	    }
	  }, {
	    key: "getMapID",
	    value: function getMapID(href) {
	      return href.split("mapdata/")[1].split('.')[0];
	    }
	  }]);
	
	  return MapsConstructor;
	}();
	
	exports.default = MapsConstructor;
	
	
	window.Reportal = window.Reportal || {};
	_rReportalBase2.default.mixin(window.Reportal, {
	  MapsConstructor: MapsConstructor
	});
	module.exports = exports["default"];

/***/ },

/***/ 1:
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

/***/ 18:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ })
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDEyZmMyOTg3ZWEwYTI4NDgwMGFiPzVhMDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0cnVjdG9yL21hcHMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yLXJlcG9ydGFsLWJhc2Uvc3JjL3JlcG9ydGFsLWJhc2UuanM/ZGEzNSIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RydWN0b3Ivc3R5bGVzLmNzcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiTWFwc0NvbnN0cnVjdG9yIiwicHJvbWlzZVJlcXVlc3QiLCJ0aGVuIiwiY29uZmlnIiwiSlNPTiIsInBhcnNlIiwiY2ZnIiwiaG0iLCJjb25zdHJ1Y3RvciIsInN0dWJIaWdoY2hhcnRzIiwibWFwc1NlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWFwc0xpc3QiLCJjb3VudHJpZXNMaXN0IiwiY291bnRyaWVzRmlsdGVyIiwibWFwc0ZpbHRlciIsInByb2Nlc3NNYXAiLCJiaW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjb3B5SURzVG9DbGlwYm9hcmQiLCJjcmVhdGVNYXBTd2l0Y2hlciIsImluaXRGaWx0ZXJpbmciLCJmaWx0ZXJzIiwidGFyZ2V0cyIsImZvckVhY2giLCJmaWx0ZXIiLCJpbmRleCIsInZhbHVlIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFyZW50IiwiZWwiLCJwYXJlbnROb2RlIiwidGV4dENvbnRlbnQiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJzdHlsZSIsImRpc3BsYXkiLCJzZWxlY3QiLCJzZWN0aW9uIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsInRpdGxlIiwiYXBwZW5kQ2hpbGQiLCJsb2FkTWFwc1NlY3Rpb24iLCJzZWN0aW9uSW5kZXgiLCJjdXJyZW50U2VjdGlvbiIsImNsZWFyTWFwc0xpc3QiLCJtYXBzIiwibWFwIiwiaSIsImxpIiwiY3JlYXRlUmFkaW8iLCJjcmVhdGVMaW5rIiwibGFiZWwiLCJyYWRpbyIsInR5cGUiLCJuYW1lIiwibCIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJwcm9wZXJ0eSIsInByb3AiLCJsaW5rIiwiaHJlZiIsIm11bHRpc2VsZWN0IiwiY2hlY2tlZCIsImJ0biIsInRyIiwib01hcCIsImZha2VYSFIiLCJqcyIsImNsZWFyQ291bnRyaWVzTGlzdCIsInVwZGF0ZUNvZGVib3giLCJnZXRNYXBJRCIsImJ1aWxkQ291bnRyaWVzTGlzdCIsIm1hcEpTT04iLCJvbmNsaWNrIiwiZGlzcGxheU11bHRpc2VsZWN0IiwiZGYiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiZmVhdHVyZXMiLCJwIiwiZmVhdHVyZSIsInByb3BlcnRpZXMiLCJyb3ciLCJjYiIsImtleSIsImNvcHlUZXh0RXZlbnRIYW5kbGVyIiwiaW5uZXJIVE1MIiwidXJsIiwibWFwSUQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldENvbnRlbnRzIiwic2NyaXB0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhlYWQiLCJyZW1vdmVDaGlsZCIsInNyYyIsImNoaWxkcmVuIiwibGVuZ3RoIiwid2luZG93IiwiSGlnaGNoYXJ0cyIsImlkcyIsInB1c2giLCJ0Iiwiam9pbiIsInRleHQiLCJ0b29sdGlwIiwiaWQiLCJib2R5IiwibGVmdCIsInBhZ2VYIiwidG9wIiwicGFnZVkiLCJvcGFjaXR5Iiwic2V0VGltZW91dCIsInJlbW92ZSIsImV2ZW50IiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsIm5vZGUiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJnZXRFbGVtZW50QnlJZCIsInNlbGVjdE5vZGUiLCJhZGRSYW5nZSIsInN1Y2Nlc3NmdWwiLCJleGVjQ29tbWFuZCIsIm1zZyIsInNob3dUb29sdGlwIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImNvZGVib3giLCJ0YWciLCJzcGxpdCIsIlJlcG9ydGFsIiwibWl4aW4iLCJSZXBvcnRhbEJhc2UiLCJzb3VyY2UiLCJsZXZlbCIsImFyZ3MiLCJBcnJheSIsImlzQXJyYXkiLCJhcHBseSIsInByb3RvdHlwZSIsImFyZ3VtZW50cyIsIl9sb2dnZXIiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsInN0ciIsImlzTmFOIiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJVUkwiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJvbmxvYWQiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJFcnJvciIsInN0YXR1c1RleHQiLCJvbmVycm9yIiwic2VuZCIsInZhcmlhYmxlIiwicXVlcnkiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0cmluZyIsInZhcnMiLCJwYWlyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7Ozs7Ozs7O0FBSkE7OztBQUdBLG9CQUFBQSxDQUFRLEVBQVI7O0tBR01DLGU7QUFDSiw4QkFBYTtBQUFBOztBQUFBOztBQUNYLFlBQU8sd0JBQWFDLGNBQWIsQ0FBNEIsV0FBNUIsRUFBeUNDLElBQXpDLENBQThDLGVBQUs7QUFDeEQsYUFBS0MsTUFBTCxHQUFjQyxLQUFLQyxLQUFMLENBQVdDLEdBQVgsQ0FBZDtBQUNBLGFBQUtDLEVBQUwsR0FBVSxNQUFLQyxXQUFMLENBQWlCQyxjQUFqQixFQUFWO0FBQ0EsYUFBS0MsWUFBTCxHQUFvQkMsU0FB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LENBQWlDLENBQWpDLENBQW9DOztBQUN6RSxXQUFJQyxPQUFPSixNQUFNL0IsS0FBTixDQUFZLEdBQVosQ0FBWDtBQUNBLFlBQUssSUFBSXhGLElBQUUsQ0FBWCxFQUFhQSxJQUFFMkgsS0FBS3ZFLE1BQXBCLEVBQTJCcEQsR0FBM0IsRUFBZ0M7QUFDOUIsYUFBSTRILE9BQU9ELEtBQUszSCxDQUFMLEVBQVF3RixLQUFSLENBQWMsR0FBZCxDQUFYO0FBQ0EsYUFBSW9DLEtBQUssQ0FBTCxDQUFELENBQVU1SSxXQUFWLE1BQTJCc0ksU0FBU3RJLFdBQVQsRUFBOUIsRUFBcUQ7QUFBQyxrQkFBTzRJLEtBQUssQ0FBTCxDQUFQO0FBQWdCO0FBQ3ZFO0FBQ0QsY0FBTyxJQUFQO0FBQ0Q7Ozs7OzttQkFHWWpDLFk7Ozs7Ozs7O0FDMUdmLDBDIiwiZmlsZSI6ImNvbnN0cnVjdG9yLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTJmYzI5ODdlYTBhMjg0ODAwYWIiLCIvKipcclxuICogQ3JlYXRlZCBieSBJdmFuUCBvbiAzMC4xMi4yMDE2LlxyXG4gKi9cclxucmVxdWlyZSgnLi9zdHlsZXMuY3NzJyk7XHJcbmltcG9ydCBSZXBvcnRhbEJhc2UgZnJvbSBcInItcmVwb3J0YWwtYmFzZVwiO1xyXG5cclxuY2xhc3MgTWFwc0NvbnN0cnVjdG9ye1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICByZXR1cm4gUmVwb3J0YWxCYXNlLnByb21pc2VSZXF1ZXN0KFwibWFwcy5qc29uXCIpLnRoZW4oY2ZnPT57XHJcbiAgICAgIHRoaXMuY29uZmlnID0gSlNPTi5wYXJzZShjZmcpO1xyXG4gICAgICB0aGlzLmhtID0gdGhpcy5jb25zdHJ1Y3Rvci5zdHViSGlnaGNoYXJ0cygpO1xyXG4gICAgICB0aGlzLm1hcHNTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwc1NlY3Rpb25TZWxlY3RvclwiKTtcclxuICAgICAgdGhpcy5tYXBzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwc0xpc3RcIik7XHJcbiAgICAgIHRoaXMuY291bnRyaWVzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyaWVzTGlzdFwiKTtcclxuICAgICAgdGhpcy5jb3VudHJpZXNGaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cmllc0ZpbHRlclwiKTtcclxuICAgICAgdGhpcy5tYXBzRmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXBzRmlsdGVyXCIpO1xyXG4gICAgICB0aGlzLnByb2Nlc3NNYXAgPSB0aGlzLnByb2Nlc3NNYXAuYmluZCh0aGlzKTtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1nZXRJRHMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIE1hcHNDb25zdHJ1Y3Rvci5jb3B5SURzVG9DbGlwYm9hcmQoZSwgJ0lEc1N0b3JhZ2UnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuY3JlYXRlTWFwU3dpdGNoZXIoKTtcclxuICAgICAgdGhpcy5pbml0RmlsdGVyaW5nKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdHViSGlnaGNoYXJ0cygpe1xyXG4gICAgaWYoIXdpbmRvdy5IaWdoY2hhcnRzKXtcclxuICAgICAgd2luZG93LkhpZ2hjaGFydHMgPSB7bWFwczp7fX07XHJcbiAgICB9IGVsc2UgaWYoIXdpbmRvdy5IaWdoY2hhcnRzLm1hcHMpe3dpbmRvdy5IaWdoY2hhcnRzLm1hcHM9e319XHJcbiAgICByZXR1cm4gd2luZG93LkhpZ2hjaGFydHMubWFwc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB1cCBzaW1wbGUgZmlsdGVyaW5nIG1hdGNoaW5nIGFsbCBtYXRjaGVzIG9uIGtleXN0cm9rZSBhbmQgY2xlYXJcclxuICAgKiAqL1xyXG4gIGluaXRGaWx0ZXJpbmcoKXtcclxuICAgIGxldCBmaWx0ZXJzID0gW3RoaXMuY291bnRyaWVzRmlsdGVyLHRoaXMubWFwc0ZpbHRlcl07XHJcbiAgICBsZXQgdGFyZ2V0cyA9IFt0aGlzLmNvdW50cmllc0xpc3QsIHRoaXMubWFwc0xpc3RdO1xyXG4gICAgZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsaW5kZXgpPT57XHJcbiAgICAgIGZpbHRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsZT0+e1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0YXJnZXRzW2luZGV4XTtcclxuICAgICAgICBpZih0YXJnZXQubm9kZU5hbWU9PVwiVEFCTEVcIil7XHJcbiAgICAgICAgICBbXS5zbGljZS5jYWxsKHRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKFwidGJvZHk+dHI+dGQ6bnRoLWNoaWxkKDEpXCIpKS5mb3JFYWNoKGVsPT57XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBpZihlbC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsdWUudG9Mb3dlckNhc2UoKSk+LTEpe1xyXG4gICAgICAgICAgICAgIHBhcmVudC5zdHlsZS5kaXNwbGF5PVwidGFibGUtcm93XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRhcmdldC5ub2RlTmFtZT09XCJVTFwiKXtcclxuICAgICAgICAgIFtdLnNsaWNlLmNhbGwodGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKSkuZm9yRWFjaChlbD0+e1xyXG4gICAgICAgICAgICBpZihlbC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsdWUudG9Mb3dlckNhc2UoKSk+LTEpe1xyXG4gICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGVzIGEgZHJvcGRvd24gdGhhdCBzd2l0Y2hlcyBtYXBzXHJcbiAgICpcclxuICAgKi9cclxuICBjcmVhdGVNYXBTd2l0Y2hlcigpe1xyXG4gICAgbGV0IHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwc1NlY3Rpb25TZWxlY3RvclwiKTtcclxuICAgIHRoaXMuY29uZmlnLmZvckVhY2goKHNlY3Rpb24saW5kZXgpPT57XHJcbiAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgb3B0aW9uLnZhbHVlID0gaW5kZXg7XHJcbiAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHNlY3Rpb24udGl0bGU7XHJcbiAgICAgIHRoaXMubWFwc1NlbGVjdG9yLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFwc1NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsZT0+e1xyXG4gICAgICB0aGlzLmxvYWRNYXBzU2VjdGlvbihzZWxlY3QudmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmxvYWRNYXBzU2VjdGlvbigwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxvYWRzIGEgbWFwIHNlY3Rpb25cclxuICAgKiAqL1xyXG4gIGxvYWRNYXBzU2VjdGlvbihzZWN0aW9uSW5kZXgpe1xyXG4gICAgdGhpcy5jdXJyZW50U2VjdGlvbiA9IHRoaXMuY29uZmlnW3NlY3Rpb25JbmRleF07XHJcbiAgICB0aGlzLmNsZWFyTWFwc0xpc3QoKTtcclxuICAgIHRoaXMuY3VycmVudFNlY3Rpb24ubWFwcy5mb3JFYWNoKChtYXAsaSk9PntcclxuICAgICAgbGV0IGxpID0gTWFwc0NvbnN0cnVjdG9yLmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgIGxpLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlUmFkaW8oaSxtYXAudGl0bGUpKTtcclxuICAgICAgbGkuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVMaW5rKGksJ2RlbW8nKSk7XHJcbiAgICAgIHRoaXMubWFwc0xpc3QuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuICBjcmVhdGVSYWRpbyhpbmRleCxsYWJlbCl7XHJcbiAgICBsZXQgcmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgcmFkaW8udHlwZSA9IFwicmFkaW9cIjtcclxuICAgIHJhZGlvLm5hbWUgPSBcIm1hcFwiO1xyXG4gICAgcmFkaW8udmFsdWUgPSBpbmRleDtcclxuICAgIGxldCBsID0gdGhpcy5jb25zdHJ1Y3Rvci5jcmVhdGVFbGVtZW50KCdsYWJlbCcsbGFiZWwpO1xyXG4gICAgbC5pbnNlcnRCZWZvcmUocmFkaW8sbC5maXJzdENoaWxkKTtcclxuICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsdGhpcy5wcm9jZXNzTWFwKTtcclxuICAgIHJldHVybiBsXHJcbiAgfVxyXG5cclxuICBjcmVhdGVMaW5rKGluZGV4LCBwcm9wZXJ0eSwgdGFyZ2V0PVwiX2JsYW5rXCIpe1xyXG4gICAgbGV0IHByb3AgPSB0aGlzLmN1cnJlbnRTZWN0aW9uLm1hcHNbaW5kZXhdW3Byb3BlcnR5XSxcclxuICAgICAgICBsaW5rID0gTWFwc0NvbnN0cnVjdG9yLmNyZWF0ZUVsZW1lbnQoJ2EnLHByb3AudGl0bGUpO1xyXG4gICAgbGluay5ocmVmID0gcHJvcC5ocmVmO1xyXG4gICAgbGluay50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICByZXR1cm4gbGlua1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29waWVzIHNlbGVjdGVkIGNvdW50cmllcyBJRHNcclxuICAgKiBAcGFyYW0gZSAtIGNsaWNrIGV2ZW50XHJcbiAgICovXHJcbiAgc3RhdGljIGNvcHlJRHNUb0NsaXBib2FyZChlKXtcclxuICAgIGxldCBpZHMgPSBbXTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb3VudHJpZXNMaXN0IHRib2R5IHRyJykuZm9yRWFjaCh0ciA9PiB7XHJcbiAgICAgIGxldCBjYiA9IHRyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpO1xyXG4gICAgICBpZihjYi5jaGVja2VkKXtcclxuICAgICAgICBpZHMucHVzaChjYi52YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYoaWRzLmxlbmd0aCA8IDEpXHJcbiAgICAgIHJldHVybjtcclxuICAgIGxldCB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0lEc1N0b3JhZ2UnKTtcclxuICAgIHQudmFsdWUgPSBpZHMuam9pbigpO1xyXG4gICAgdC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgTWFwc0NvbnN0cnVjdG9yLmNvcHlUZXh0RXZlbnRIYW5kbGVyKGUsICdJRHNTdG9yYWdlJyk7XHJcbiAgICB0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlNdWx0aXNlbGVjdChtdWx0aXNlbGVjdCl7XHJcbiAgICBtdWx0aXNlbGVjdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIG11bHRpc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJyNtdWx0aVNlbGVjdENoZWNrYm94JykuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgbXVsdGlzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykuZm9yRWFjaChidG4gPT4gYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgbXVsdGlzZWxlY3QucXVlcnlTZWxlY3RvcignI211bHRpU2VsZWN0Q2hlY2tib3gnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmKHRoaXMuY2hlY2tlZCl7XHJcbiAgICAgICAgbXVsdGlzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykuZm9yRWFjaChidG4gPT4gYnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvdW50cmllc0xpc3QgdGJvZHkgdHInKS5mb3JFYWNoKHRyID0+IHtcclxuICAgICAgICAgIHRyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpLnN0eWxlLmRpc3BsYXkgPSAndGFibGUtY2VsbCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbXVsdGlzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykuZm9yRWFjaChidG4gPT4gYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb3VudHJpZXNMaXN0IHRib2R5IHRyJykuZm9yRWFjaCh0ciA9PiB7XHJcbiAgICAgICAgICB0ci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb2Nlc3NNYXAoZSl7XHJcbiAgICBsZXQgbWFwID0gdGhpcy5jdXJyZW50U2VjdGlvbi5tYXBzW2UudGFyZ2V0LnZhbHVlXTtcclxuICAgIGxldCBvTWFwID0gdGhpcy5mYWtlWEhSKG1hcC5qcy5ocmVmKTtcclxuICAgIG9NYXAudGhlbihtYXBKU09OPT57XHJcbiAgICAgIHRoaXMuY2xlYXJDb3VudHJpZXNMaXN0KCk7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IudXBkYXRlQ29kZWJveCh0aGlzLmNvbnN0cnVjdG9yLmdldE1hcElEKG1hcC5qcy5ocmVmKSk7XHJcbiAgICAgIHRoaXMuYnVpbGRDb3VudHJpZXNMaXN0KG1hcEpTT04pO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWRlc2VsZWN0Jykub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY291bnRyaWVzTGlzdCB0Ym9keSB0cicpLmZvckVhY2godHIgPT4ge1xyXG4gICAgICAgICAgdHIucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9J2NoZWNrYm94J11cIikuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmRpc3BsYXlNdWx0aXNlbGVjdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbXVsdGlTZWxlY3QnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRvb2x0aXAgd2hlbiwgd2hlbiB0ZXh0IGlzIGNvcGllZCB0byBjbGlwYm9hcmRcclxuICAgKiBAcGFyYW0gZVxyXG4gICAqIEBwYXJhbSB0ZXh0XHJcbiAgICovXHJcbiAgc3RhdGljIHNob3dUb29sdGlwKGUsIHRleHQpe1xyXG4gICAgbGV0IHRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRvb2x0aXAuaW5uZXJIVE1MID0gdGV4dDtcclxuICAgIHRvb2x0aXAuaWQgPSAndG9vbHRpcCc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRvb2x0aXApO1xyXG4gICAgdG9vbHRpcC5zdHlsZS5sZWZ0ID0gZS5wYWdlWCAtIDEwICsgJ3B4JztcclxuICAgIHRvb2x0aXAuc3R5bGUudG9wID0gZS5wYWdlWSArIDE1ICsgJ3B4JztcclxuICAgIHRvb2x0aXAuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRvb2x0aXAuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgIHRvb2x0aXAucmVtb3ZlKCk7XHJcbiAgICB9LCA1MDApXHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29waWVzIHRleHQgdG8gY2xpcGJvYXJkXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICovXHJcbiAgc3RhdGljIGNvcHlUZXh0RXZlbnRIYW5kbGVyKGV2ZW50LCBpZCl7XHJcbiAgICBsZXQgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgbGV0IG5vZGU7XHJcbiAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBub2RlID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZShub2RlKTtcclxuICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hZGRSYW5nZShyYW5nZSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgc3VjY2Vzc2Z1bCA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgICAgIGxldCBtc2cgPSBzdWNjZXNzZnVsID8gJ3N1Y2Nlc3NmdWwnIDogJ3Vuc3VjY2Vzc2Z1bCc7XHJcbiAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICBNYXBzQ29uc3RydWN0b3Iuc2hvd1Rvb2x0aXAoZXZlbnQsIFwiQ29waWVkIHRvIGNsaXBib2FyZCFcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgTWFwc0NvbnN0cnVjdG9yLnNob3dUb29sdGlwKGV2ZW50LCBcIkNvcHkgZmFpbGVkIVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVDb2RlYm94KG1hcElEKSB7XHJcbiAgICBsZXQgY29kZWJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2RlYm94Jyk7XHJcbiAgICBjb2RlYm94LmlubmVySFRNTCA9IGBtYXBOYW1lOiA8c3Bhbj4ke21hcElEfTwvc3Bhbj5gO1xyXG4gICAgY29kZWJveC5xdWVyeVNlbGVjdG9yKCdzcGFuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBNYXBzQ29uc3RydWN0b3IuY29weVRleHRFdmVudEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRDb3VudHJpZXNMaXN0KG1hcCl7XHJcbiAgICBsZXQgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBtYXAuZmVhdHVyZXMuZm9yRWFjaChmZWF0dXJlPT57XHJcbiAgICAgIGxldCBwID0gZmVhdHVyZS5wcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgcm93ID0gTWFwc0NvbnN0cnVjdG9yLmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcbiAgICAgIGRmLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICAgIGxldCBjYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIGNiLnR5cGUgPSAnY2hlY2tib3gnO1xyXG4gICAgICBjYi52YWx1ZSA9IHBbJ2hjLWtleSddO1xyXG4gICAgICBjYi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICByb3cuYXBwZW5kQ2hpbGQoTWFwc0NvbnN0cnVjdG9yLmNyZWF0ZUVsZW1lbnQoJ3RkJyxwWyduYW1lJ10pKTtcclxuICAgICAgcm93LmZpcnN0Q2hpbGQuaW5zZXJ0QmVmb3JlKGNiLHJvdy5maXJzdENoaWxkLmZpcnN0Q2hpbGQpO1xyXG4gICAgICBsZXQga2V5ID0gTWFwc0NvbnN0cnVjdG9yLmNyZWF0ZUVsZW1lbnQoJ3RkJyxwWydoYy1rZXknXSlcclxuICAgICAgcm93LmFwcGVuZENoaWxkKGtleSk7XHJcbiAgICAgIGtleS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIE1hcHNDb25zdHJ1Y3Rvci5jb3B5VGV4dEV2ZW50SGFuZGxlcik7XHJcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChNYXBzQ29uc3RydWN0b3IuY3JlYXRlRWxlbWVudCgndGQnLHBbJ3N1YnJlZ2lvbiddKSk7XHJcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChNYXBzQ29uc3RydWN0b3IuY3JlYXRlRWxlbWVudCgndGQnLHBbJ3JlZ2lvbi13YiddKSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY291bnRyaWVzTGlzdC5xdWVyeVNlbGVjdG9yKCd0Ym9keScpLmFwcGVuZENoaWxkKGRmKTtcclxuICB9XHJcblxyXG4gIGNsZWFyQ291bnRyaWVzTGlzdCgpe1xyXG4gICAgdGhpcy5jb3VudHJpZXNMaXN0LnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5JykuaW5uZXJIVE1MID0gJyc7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlRWxlbWVudCh0YWcsdGV4dCl7XHJcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcbiAgICBpZih0ZXh0KXtcclxuICAgICAgZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0TWFwSUQoaHJlZil7XHJcbiAgICByZXR1cm4gaHJlZi5zcGxpdChcIm1hcGRhdGEvXCIpWzFdLnNwbGl0KCcuJylbMF07XHJcbiAgfVxyXG5cclxuICBmYWtlWEhSKHVybCl7XHJcbiAgICBsZXQgbWFwSUQgPSB0aGlzLmNvbnN0cnVjdG9yLmdldE1hcElEKHVybCksXHJcbiAgICAgICAgaG09dGhpcy5obTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgIGlmKCF0aGlzLmhtW21hcElEXSl7XHJcbiAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxyXG4gICAgICAgICAgICBoZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xyXG4gICAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJyxnZXRDb250ZW50cyk7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Q29udGVudHMoZSl7XHJcbiAgICAgICAgICBzY3JpcHQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsZ2V0Q29udGVudHMpO1xyXG4gICAgICAgICAgaGVhZC5yZW1vdmVDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgcmVzb2x2ZShobVttYXBJRF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY3JpcHQuc3JjID0gdXJsO1xyXG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKGhtW21hcElEXSlcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbGVhck1hcHNMaXN0KCl7XHJcbiAgICBpZih0aGlzLm1hcHNMaXN0LmNoaWxkcmVuLmxlbmd0aD4wKXtcclxuICAgICAgW10uc2xpY2UuY2FsbCh0aGlzLm1hcHNMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmFkaW9dJykpLmZvckVhY2goY2I9PmNiLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsdGhpcy5wcm9jZXNzTWFwKSk7XHJcbiAgICAgIHRoaXMubWFwc0xpc3QuaW5uZXJIVE1MPScnO1xyXG5cclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTWFwc0NvbnN0cnVjdG9yXHJcblxyXG53aW5kb3cuUmVwb3J0YWwgPSB3aW5kb3cuUmVwb3J0YWwgfHwge307XHJcblJlcG9ydGFsQmFzZS5taXhpbih3aW5kb3cuUmVwb3J0YWwse1xyXG4gIE1hcHNDb25zdHJ1Y3RvclxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0cnVjdG9yL21hcHMtY29uc3RydWN0b3IuanMiLCJjbGFzcyBSZXBvcnRhbEJhc2Uge1xuXG4gIC8qKlxuICAgKiBDb3BpZXMgcHJvcHMgZnJvbSBhIHNvdXJjZSBvYmplY3QgdG8gYSB0YXJnZXQgb2JqZWN0LlxuICAgKlxuICAgKiBOb3RlLCB0aGlzIG1ldGhvZCB1c2VzIGEgc2ltcGxlIGBmb3IuLi5pbmAgc3RyYXRlZ3kgZm9yIGVudW1lcmF0aW5nXG4gICAqIHByb3BlcnRpZXMuICBUbyBlbnN1cmUgb25seSBgb3duUHJvcGVydGllc2AgYXJlIGNvcGllZCBmcm9tIHNvdXJjZVxuICAgKiB0byB0YXJnZXQgYW5kIHRoYXQgYWNjZXNzb3IgaW1wbGVtZW50YXRpb25zIGFyZSBjb3BpZWQsIHVzZSBgZXh0ZW5kYC5cbiAgICpcbiAgICogQG1ldGhvZCBtaXhpblxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFNvdXJjZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gICAqIEByZXR1cm4ge09iamVjdH0gVGFyZ2V0IG9iamVjdCB0aGF0IHdhcyBwYXNzZWQgYXMgZmlyc3QgYXJndW1lbnQuXG4gICAqL1xuICBzdGF0aWMgbWl4aW4odGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBmb3IgKHZhciBpIGluIHNvdXJjZSkge1xuICAgICAgdGFyZ2V0W2ldID0gc291cmNlW2ldO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgc3RhdGljIF9sb2dnZXIobGV2ZWwsIGFyZ3MpIHtcbiAgICAvLyBhY2NlcHQgWydmb28nLCAnYmFyJ10gYW5kIFtbJ2ZvbycsICdiYXInXV1cbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgfVxuICAgIC8vIG9ubHkgYWNjZXB0IGxvZ2dpbmcgZnVuY3Rpb25zXG4gICAgc3dpdGNoKGxldmVsKSB7XG4gICAgICBjYXNlICdsb2cnOlxuICAgICAgY2FzZSAnd2Fybic6XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIGNvbnNvbGVbbGV2ZWxdLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX2xvZygpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgdGhpcy5fbG9nZ2VyKCdsb2cnLCBhcmdzKTtcbiAgfVxuXG4gIHN0YXRpYyBfd2FybigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgdGhpcy5fbG9nZ2VyKCd3YXJuJywgYXJncyk7XG4gIH1cblxuICBzdGF0aWMgX2Vycm9yKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICB0aGlzLl9sb2dnZXIoJ2Vycm9yJywgYXJncyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5hbWVkIGV2ZW50IHdpdGggYG5hbWVgXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gbmFtZSBvZiB0aGUgZXZlbnRcbiAgICogQHJldHVybiB7RXZlbnR9IFJldHVybnMgYSBjcmVhdGVkIGV2ZW50XG4gICAqICovXG4gIHN0YXRpYyBuZXdFdmVudChuYW1lKXtcbiAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldmVudC5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3BlY3RzIGlmIHRoZSBjdXJyZW50IHN0cmluZyBtaWdodCBiZSBjb252ZXJ0ZWQgdG8gbnVtYmVyIGFuZCByZW5kZXJzIGl0IGFzIG51bWJlci4gSWYgc3RyaW5nIGxlbmd0aCBpcyAwLCByZXR1cm5zIGBudWxsYC4gSWYgbm9uZSBhcHBsaWVzIHJldHVybnMgdGhlIHN0cmluZyBhcyBpcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciAtIHZhbHVlIG9mIHRoZSBjZWxsIGlmIG5vdCBIVE1MIGNvbnRlbnRzXG4gICAqIEByZXR1cm4ge051bWJlcnxudWxsfFN0cmluZ31cbiAgICogKi9cbiAgc3RhdGljIGlzTnVtYmVyKHN0cil7XG4gICAgaWYoIWlzTmFOKHBhcnNlRmxvYXQoc3RyKSkpe1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLywvaSwnJyk7Ly8gcmVtb3ZlIHVubmVjZXNzYXJ5IGNvbW1hIGFzIGEgZGVsaW1pdGVyIGZvciB0aG91c2FuZHMgZnJvbSBkYXRhLlxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyKTtcbiAgICB9IGVsc2UgaWYoc3RyLmxlbmd0aD09MCl7cmV0dXJuIG51bGx9IGVsc2Uge3JldHVybiBzdHJ9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIFhIUiB3cmFwcGVkIGluIGEgUHJvbWlzZVxuICAgKiBAcGFyYW0geyFTdHJpbmd9IFVSTCAtIHVybCB0byBzZW5kIGEgYEdFVGAgcmVxdWVzdCB0b1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXR1cm5zIGEgdGhlbi1hYmxlIHByb21pc2Ugd2l0aCBgWE1MSHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0YFxuICAgKiAqL1xuICBzdGF0aWMgcHJvbWlzZVJlcXVlc3QoVVJMKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLm9wZW4oJ0dFVCcsIFVSTCwgdHJ1ZSk7XG4gICAgICB4aHIub25sb2FkID0gZT0+e3hoci5zdGF0dXMgPT0gMjAwP3Jlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk6cmVqZWN0KEVycm9yKGAke3hoci5zdGF0dXN9OiAke3hoci5zdGF0dXNUZXh0fWApKTt9XG4gICAgICB4aHIub25lcnJvciA9IGU9PntyZWplY3QoZSl9XG4gICAgICB4aHIuc2VuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSB2YXJpYWJsZSBsaXN0ZWQgaW4gcXVlcnkgc3RyaW5nXG4gICAqIEBwYXJhbSB7IVN0cmluZ30gdmFyaWFibGUgLSB2YXJpYWJsZSBuYW1lIHRvIGdldCB2YWx1ZSBmb3JcbiAgICogQHBhcmFtIHtTdHJpbmc9fSBbcXVlcnk9d2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSldIC0gdGhlIHF1ZXJ5IHN0cmluZyB0byBzZWFyY2ggdmFyaWFibGUgZm9yIGluXG4gICAqIEByZXR1cm4ge1N0cmluZ30gUmV0dXJucyB2YWx1ZSBmb3IgdGhlIHZhcmlhYmxlXG4gICAqICovXG4gIHN0YXRpYyBnZXRRdWVyeVZhcmlhYmxlKHZhcmlhYmxlLHF1ZXJ5PXdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpKXtcbiAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpPTA7aTx2YXJzLmxlbmd0aDtpKyspIHtcbiAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICBpZigocGFpclswXSkudG9Mb3dlckNhc2UoKSA9PSB2YXJpYWJsZS50b0xvd2VyQ2FzZSgpKXtyZXR1cm4gcGFpclsxXTt9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IFJlcG9ydGFsQmFzZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9yLXJlcG9ydGFsLWJhc2Uvc3JjL3JlcG9ydGFsLWJhc2UuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbnN0cnVjdG9yL3N0eWxlcy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=