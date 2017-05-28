import assert from 'assert';
import { callable, SYMBOL_CALL } from '../src';

/** define */
@callable
class Decorated {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  c() {
    return 1000;
  }

  [SYMBOL_CALL]() {
    return 50;
  }
}

const anotherDecorator = Class => class {
  constructor(...params) {
    const _Class = (...rest) => new Class(...rest);
    _Class.prototype = Class.prototype;
    return _Class;
  }

  doSomething() {
    return 100;
  }
}

@anotherDecorator
@callable
class MoreDecorated {
  [SYMBOL_CALL]() {
    return 50;
  }
}

/** run tests */
describe('decorated class', () => {
  context('before instanciated', () => {
    it('is newable', () => {
      assert.doesNotThrow(() => new Decorated(), TypeError);
    });

    it('can be extended', () => {
      class Extended extends Decorated {};
      assert.doesNotThrow(() => new Extended(), TypeError);
    });

    it('can be passed to another decorator', () => {
      assert.doesNotThrow(() => new MoreDecorated(), TypeError);
    });
  });

  context('after instanciated', () => {
    /** TODO */
    it.skip('is `instanceof` original class', () => {
      const instance = new Decorated();
      assert(instance instanceof Decorated);
    });

    it('passes arguments', () => {
      const instance = new Decorated(1, 2);
      assert(instance.b === 2);
    });

    it('invokes correctly [SYMBOL_CALL]', () => {
      const instance = new Decorated(1, 2);
      assert(instance() === 50);
    });

    it('invokes other methods', () => {
      const instance = new Decorated(1, 2);
      assert(instance.c() === 1000);
    });
  });
});
