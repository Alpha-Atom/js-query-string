"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {

  _defaults: {
    "warn_on_invalid": false
  },

  convert: function convert(data, options) {
    if (options === undefined) {
      options = {};
    }
    options = this._merge_options(this._defaults, options);
    if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === 'object') {
      var result = "?";
      Object.keys(data).map(function (query_key) {
        var query_data = data[query_key];
        var query_data_processed = void 0;
        if (query_data === null) {
          if (options.warn_on_invalid) {
            console.warn("Attempted to convert null to query string!");
          }
        } else if (typeof query_data === 'number') {
          query_data_processed = query_data.toString();
        } else if (query_data instanceof RegExp) {
          query_data_processed = query_data.toString();
        } else if (typeof query_data === 'string') {
          query_data_processed = query_data;
        } else if (typeof query_data === 'boolean') {
          query_data_processed = query_data.toString();
        } else if ((typeof query_data === "undefined" ? "undefined" : _typeof(query_data)) === 'object') {
          query_data_processed = JSON.stringify(query_data);
        } else if (typeof query_data === 'undefined') {
          if (options.warn_on_invalid) {
            console.warn("Attempted to convert undefined to query string!");
          }
        } else {
          if (options.warn_on_invalid) {
            console.warn("Attempted to convert function or symbol to query string!");
          }
        }
        if (query_data_processed !== undefined) {
          var append = query_key + "=" + encodeURIComponent(query_data_processed) + "&";
          result += append;
        }
      });
      return result === "?" ? "" : result.substring(0, result.length - 1);
    } else {
      if (options.warn_on_invalid) {
        console.warn("Attempted to convert non-object to query string!");
      }
      return "";
    }
  },

  _merge_options: function _merge_options(obj1, obj2) {
    var obj3 = {};
    Object.keys(obj1).map(function (attrname) {
      obj3[attrname] = obj1[attrname];
    });
    Object.keys(obj2).map(function (attrname) {
      obj3[attrname] = obj2[attrname];
    });
    return obj3;
  }
};