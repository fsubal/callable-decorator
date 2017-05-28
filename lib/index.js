"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SYMBOL_CALL = exports.SYMBOL_CALL = Symbol();

var callable = exports.callable = function callable() {
  return function (Class) {
    return function () {
      function _class() {
        var _constructor, _Object$assign, _mutatorMap;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        var instance = new (Function.prototype.bind.apply(Class, [null].concat(params)))();

        var fnc = instance[SYMBOL_CALL];
        if (!fnc) {
          throw Error("No method [SYMBOL_CALL]() is defined in class: " + Class.name);
        }

        fnc.prototype = Object.assign(fnc.prototype, Class.prototype, (_Object$assign = {}, _defineProperty(_Object$assign, Symbol.hasInstance, function (instance) {
          return instance instanceof Class;
        }), _constructor = "constructor", _mutatorMap = {}, _mutatorMap[_constructor] = _mutatorMap[_constructor] || {}, _mutatorMap[_constructor].get = function () {
          return Class.constructor;
        }, _defineEnumerableProperties(_Object$assign, _mutatorMap), _Object$assign));

        return Object.assign(fnc, instance);
      }

      return _class;
    }();
  };
};