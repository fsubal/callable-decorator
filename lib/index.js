"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SYMBOL_CALL = exports.SYMBOL_CALL = Symbol();

var callable = exports.callable = function callable(Class) {
  return function () {
    function _class() {
      _classCallCheck(this, _class);

      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      var instance = new (Function.prototype.bind.apply(Class, [null].concat(params)))();

      var fnc = instance[SYMBOL_CALL];
      if (!fnc) {
        throw Error("No method [SYMBOL_CALL]() is defined in class: " + Class.name);
      }

      var newInstance = Object.assign(fnc, instance);
      Object.setPrototypeOf(newInstance, Class.prototype);

      return newInstance;
    }

    return _class;
  }();
};