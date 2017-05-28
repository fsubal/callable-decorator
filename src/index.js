export const SYMBOL_CALL = Symbol();

export const callable = () => Class => class {
  constructor(...params) {
    const instance = new Class(...params);

    const fnc = instance[SYMBOL_CALL];
    if (!fnc) {
      throw Error(`No method [SYMBOL_CALL]() is defined in class: ${Class.name}`);
    }

    fnc.prototype = Object.assign(fnc.prototype, Class.prototype, {
      [Symbol.hasInstance](instance) {
        return instance instanceof Class;
      },
      get constructor() {
        return Class.constructor;
      }
    });

    return Object.assign(fnc, instance);
  }
};
