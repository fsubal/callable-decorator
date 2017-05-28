# callable-decorator

Makes any ES class instance callable as function, allowing you to set magic method `[SYMBOL_CALL]`.

# Usage

```
yarn add callable-decorator
```

# Test

```
yarn build
yarn test
```

# Difference from `digital-flowers/classy-decorator`

[digital-flowers/classy-decorator](https://github.com/digital-flowers/classy-decorator/) allows you to make class constructor callable without `new`, while `callable-decorator` makes already instanciated object callable as function.

## Q. Is instance of the decorated class really `instanceof` original class?

Yes and no. Look at `/test/index.js`.

```
@callable
class A {
  [SYMBOL_CALL]() {
    return 10;
  }
}

// 🙆
console.log(new A instanceof A) // true
class B extends A {  } // does not throw error.

// 🤔 
console.log(new A) // function() { return 10; }, not class instance
```

## Q. Would you add the feature like `classy-decorator` to this library ?

No.

