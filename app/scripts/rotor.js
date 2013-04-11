/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

(function () {
  'use strict';
  var ns = window.ENIGMA;

  ns.Rotor = function (left, notches, ringSetting, windowSetting, leftObj,
    rightObj) {

    if (!left) {
      return new ns.Rotor.Rotor1();
    }

    notches = notches || 'q';
    ringSetting = ringSetting || 'a';
    windowSetting = windowSetting || 'a';
    leftObj = leftObj || null;
    rightObj = rightObj || null;

    // create a reverse map
    var right = {};

    (function () {
      for (var key in left) {

        if (left.hasOwnProperty(key)) {
          right[left[key]] = key;
        }
      }
    }());

    this.getRingSetting = function () {
      return ringSetting;
    }.bind(this);

    this.setRingSetting = function (newRingSetting) {
      ringSetting = newRingSetting;
    }.bind(this);

    this.getWindowSetting = function () {
      return windowSetting;
    }.bind(this);

    this.setWindowSetting = function (newWindowSetting) {
      windowSetting = newWindowSetting;
    }.bind(this);

    this.getLeftObj = function () {
      return leftObj;
    }.bind(this);

    this.setLeftObj = function (newLeftObj) {
      leftObj = newLeftObj;
    }.bind(this);

    this.getRightObj = function () {
      return rightObj;
    }.bind(this);

    this.setRightObj = function (newRightObj) {
      rightObj = newRightObj;
    }.bind(this);

    this.goingLeft = function (letter) {
      var shift = ns.shiftLeftLetter(windowSetting, ringSetting);
      var rightSideLetter = ns.shiftRightLetter(letter, shift);
      var leftSideLetter = left[rightSideLetter];
      var out = ns.shiftLeftLetter(leftSideLetter, shift);
      return leftObj.goingLeft(out);
    }.bind(this);

    this.goingRight = function (letter) {
      var shift = ns.shiftLeftLetter(windowSetting, ringSetting);
      var leftSideLetter = ns.shiftRightLetter(letter, shift);
      var rightSideLetter = right[leftSideLetter];
      var out = ns.shiftLeftLetter(rightSideLetter, shift);
      return rightObj.goingRight(out);
    }.bind(this);

    this.singleStep = function () {

      if (notches.indexOf(windowSetting) !== -1) {
        leftObj.singleStep();
      }

      windowSetting = ns.nextLetter(windowSetting);
    }.bind(this);

    this.doubleStep = function () {

      if (notches.indexOf(windowSetting) !== -1) {
        this.singleStep();
      }
    };
  };

  ns.Rotor.Rotor1 = (function (ringSetting, windowSetting, rightObject,
    leftObject) {

    var rotor1 = {
      'a': 'e',
      'b': 'k',
      'c': 'm',
      'd': 'f',
      'e': 'l',
      'f': 'g',
      'g': 'd',
      'h': 'q',
      'i': 'v',
      'j': 'z',
      'k': 'n',
      'l': 't',
      'm': 'o',
      'n': 'w',
      'o': 'y',
      'p': 'h',
      'q': 'x',
      'r': 'u',
      's': 's',
      't': 'p',
      'u': 'a',
      'v': 'i',
      'w': 'b',
      'x': 'r',
      'y': 'c',
      'z': 'j'
    };

    var notches = 'q';

    return function () {
      return new ns.Rotor(rotor1, notches, ringSetting, windowSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor2 = (function (ringSetting, windowSetting, rightObject,
    leftObject) {

    var rotor2 = {
      'a': 'a',
      'b': 'j',
      'c': 'd',
      'd': 'k',
      'e': 's',
      'f': 'i',
      'g': 'r',
      'h': 'u',
      'i': 'x',
      'j': 'b',
      'k': 'l',
      'l': 'h',
      'm': 'w',
      'n': 't',
      'o': 'm',
      'p': 'c',
      'q': 'q',
      'r': 'g',
      's': 'z',
      't': 'n',
      'u': 'p',
      'v': 'y',
      'w': 'f',
      'x': 'v',
      'y': 'o',
      'z': 'e'
    };

    var notches = 'e';

    return function () {
      return new ns.Rotor(rotor2, notches, ringSetting, windowSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor3 = (function (ringSetting, windowSetting, rightObject,
    leftObject) {

    var rotor3 = {
      'a': 'b',
      'b': 'd',
      'c': 'f',
      'd': 'h',
      'e': 'j',
      'f': 'l',
      'g': 'c',
      'h': 'p',
      'i': 'r',
      'j': 't',
      'k': 'x',
      'l': 'v',
      'm': 'z',
      'n': 'n',
      'o': 'y',
      'p': 'e',
      'q': 'i',
      'r': 'w',
      's': 'g',
      't': 'a',
      'u': 'k',
      'v': 'm',
      'w': 'u',
      'x': 's',
      'y': 'q',
      'z': 'o'
    };

    var notches = 'v';

    return function () {
      return new ns.Rotor(rotor3, notches, ringSetting, windowSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor4 = (function (ringSetting, windowSetting, rightObject,
    leftObject) {

    var rotor4 = {
      'a': 'e',
      'b': 's',
      'c': 'o',
      'd': 'v',
      'e': 'p',
      'f': 'z',
      'g': 'j',
      'h': 'a',
      'i': 'y',
      'j': 'q',
      'k': 'u',
      'l': 'i',
      'm': 'r',
      'n': 'h',
      'o': 'x',
      'p': 'l',
      'q': 'n',
      'r': 'f',
      's': 't',
      't': 'g',
      'u': 'k',
      'v': 'd',
      'w': 'c',
      'x': 'm',
      'y': 'w',
      'z': 'b'
    };

    var notches = 'j';

    return function () {
      return new ns.Rotor(rotor4, notches, ringSetting, windowSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor5 = (function (ringSetting, windowSetting, rightObject,
    leftObject) {

    var rotor5 = {
      'a': 'v',
      'b': 'z',
      'c': 'b',
      'd': 'r',
      'e': 'g',
      'f': 'i',
      'g': 't',
      'h': 'y',
      'i': 'u',
      'j': 'p',
      'k': 's',
      'l': 'd',
      'm': 'n',
      'n': 'h',
      'o': 'l',
      'p': 'x',
      'q': 'a',
      'r': 'w',
      's': 'm',
      't': 'j',
      'u': 'q',
      'v': 'o',
      'w': 'f',
      'x': 'e',
      'y': 'c',
      'z': 'k'
    };

    var notches = 'z';

    return function () {
      return new ns.Rotor(rotor5, notches, ringSetting, windowSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor6 = (function (ringSetting, windowSetting, rightObject,
    leftObject) {

    var rotor6 = {
      'a': 'j',
      'b': 'p',
      'c': 'g',
      'd': 'v',
      'e': 'o',
      'f': 'u',
      'g': 'm',
      'h': 'f',
      'i': 'y',
      'j': 'q',
      'k': 'b',
      'l': 'e',
      'm': 'n',
      'n': 'h',
      'o': 'z',
      'p': 'r',
      'q': 'd',
      'r': 'k',
      's': 'a',
      't': 's',
      'u': 'x',
      'v': 'l',
      'w': 'i',
      'x': 'c',
      'y': 't',
      'z': 'w'
    };

    var notches = 'zm';

    return function () {
      return new ns.Rotor(rotor6, notches, ringSetting, windowSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor7 = (function (ringSetting, windowSetting, rightObject,
    leftObject) {

    var rotor7 = {
      'a': 'n',
      'b': 'z',
      'c': 'j',
      'd': 'h',
      'e': 'g',
      'f': 'r',
      'g': 'c',
      'h': 'x',
      'i': 'm',
      'j': 'y',
      'k': 's',
      'l': 'w',
      'm': 'b',
      'n': 'o',
      'o': 'u',
      'p': 'f',
      'q': 'a',
      'r': 'i',
      's': 'v',
      't': 'l',
      'u': 'p',
      'v': 'e',
      'w': 'k',
      'x': 'q',
      'y': 'd',
      'z': 't'
    };

    var notches = 'zm';

    return function () {
      return new ns.Rotor(rotor7, notches, ringSetting, windowSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor8 = (function (ringSetting, windowSetting, rightObject,
    leftObject) {

    var rotor8 = {
      'a': 'f',
      'b': 'k',
      'c': 'q',
      'd': 'h',
      'e': 't',
      'f': 'l',
      'g': 'x',
      'h': 'o',
      'i': 'c',
      'j': 'b',
      'k': 'j',
      'l': 's',
      'm': 'p',
      'n': 'd',
      'o': 'z',
      'p': 'r',
      'q': 'a',
      'r': 'm',
      's': 'e',
      't': 'w',
      'u': 'n',
      'v': 'i',
      'w': 'u',
      'x': 'y',
      'y': 'g',
      'z': 'v'
    };

    var notches = 'zm';

    return function () {
      return new ns.Rotor(rotor8, notches, ringSetting, windowSetting,
        rightObject, leftObject);
    };
  }());
}());
