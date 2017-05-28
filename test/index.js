/** $ mocha --compilers js:babel-core/register */

import assert from 'assert';
import { callable, SYMBOL_CALL } from 'callable-decorator';

@callable
class Decorated {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  [SYMBOL_CALL]() {
    return 50;
  }
}

const anotherDecorator = () => Class => class {
  doSomething() {
    return 100;
  }
}

describe('decorated class', () => {
  context('before instanciated', () => {
    it('is newable', () => assert.doesNotThrow(
      () => new Decorated(),
      TypeError
    ));

    it('can be extended', () => assert.doesNotThrow(
      class Extended extends Decorated {},
      TypeError
    ));

    it('can be passed to another decorator', () => {
      @anotherDecorator
      class Decorated {}

      const instance = new Decorated();
      assert(instance.doSomething() === 100);
    });
  });

  context('after instanciated', () => {
    it('is instanceof original class', () => assert(new Decorated() instanceof Decorated));
    it('passes arguments', () => {
      const instance = new Decorated(1, 2);
      assert(instance.b === 2);
    });
    it('invokes correctly [SYMBOL_CALL]', () => {
      const instance = new Decorated(1, 2);
      assert(instance() === 50);
    });
  });
});
