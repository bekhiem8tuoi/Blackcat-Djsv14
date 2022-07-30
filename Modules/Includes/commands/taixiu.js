(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.diceUtils = {}));
}(this, (function (exports) { 
  'use strict';

  var isMultiplier = (str) => {
    if (typeof str === 'string') {
      return /[xX*]{1}[\d]{1,}/.test(str);
    }
    return false;
  };

  var isFudge = (sides) => (!!((sides && sides.toString().toUpperCase() === 'F')));

  var isDropLowest = (mod) => !!(mod && mod.toString().toUpperCase() === '-L');

  var isSuccessCount = (mod) => !!(mod && /[<>]{1}[\d]{1,}/.test(mod));

  var parseDieNotation = (diceString) => {
    if (typeof diceString !== 'string') {
      throw new Error('parseDieNotation phải được gọi với một chuỗi ký hiệu xúc xắc');
    }

    const parts = diceString.toLowerCase().split('d');
    const count = parseInt(parts[0], 10) || 1;
    const sides = isFudge(parts[1]) ? 'F' : parseInt(parts[1], 10);
    let mod = 0;
    const result = {
      count,
      sides,
    };

    if (Number.isNaN(Number(parts[1]))) {
      const modifierMatch = /[+\-xX*<>]{1}[\dlL]{1,}/;
      const matchResult = parts[1].match(modifierMatch);
      if (matchResult) {
        if (isMultiplier(matchResult[0])) {
          result.multiply = true;
          mod = parseInt(matchResult[0].substring(1), 10);
        } else if (isDropLowest(matchResult[0])) {
          mod = 0;
          result.dropLow = true;
        } else if (isSuccessCount(matchResult[0])) {
          const highOrLow = matchResult[0].charAt(0);
          result.success = highOrLow === '>' ? 1 : -1;
          mod = parseInt(matchResult[0].substring(1), 10);
        } else {
          mod = parseInt(matchResult[0], 10);
        }
      }
    }
    result.mod = mod;

    return result;
  };

  var rollDie = (sides, randFn = Math.random) => {
    if (!isFudge(sides) && !Number.isInteger(sides)) {
      throw new Error('rollDie phải được gọi với một số nguyên hoặc F');
    }

    if (isFudge(sides)) {
      return Math.floor(randFn() * 2.999) - 1;
    }

    return Math.floor(randFn() * (sides - 0.001)) + 1;
  };

  const getTotal = (results, options) => {
    const {
      mod, multiply, dropLow, success,
    } = options;
    let resultCopy = [...results];
    let total = 0;

    if (dropLow) {
      (resultCopy = resultCopy.sort((a, b) => a - b)).shift();
    }

    if (success) {
      resultCopy.forEach((v) => {
        if ((success < 0 && v <= mod) || (success > 0 && v >= mod)) {
          total += 1;
        }
      });
    } else {
      resultCopy.forEach((v) => {
        total += v;
      });

      if (multiply) {
        total *= mod;
      } else if (mod) {
        total += mod;
      }
    }

    return total;
  };


  var index = (diceString, randFn = Math.random) => {
    const {
      count, sides, mod, multiply, dropLow, success,
    } = parseDieNotation(diceString);
    const results = [];

    for (let i = 0; i < count; i += 1) {
      const currentResult = rollDie(sides, randFn);
      results.push(currentResult);
    }

    return {
      results,
      total: getTotal(results, {
        mod, multiply, dropLow, success,
      }),
    };
  };

  exports.parseDieNotation = parseDieNotation;
  exports.roll = index;
  exports.rollDie = rollDie;

  Object.defineProperty(exports, '__esModule', { value: true });

}))); 