/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

(function () {
  'use strict';
  var ns = window.ENIGMA;

  ns.Reflector = function (right, rightObj) {

    if (!right) {
      return new ns.ReflectorB();
    }

    rightObj = rightObj || null;

    this.getRightObj = function () {
      return rightObj;
    }.bind(this);

    this.setRightObj = function (newRightObj) {
      rightObj = newRightObj;
    }.bind(this);

    // this 'reflects' the signal
    this.goingLeft = function (letter) {
      return rightObj.goingRight(right[letter]);
    }.bind(this);

    this.singleStep = function () {
    }.bind(this);
  };

  ns.Reflector.ReflectorB = (function (rightObj) {
    var reflectorB = {
      'a': 'y',
      'b': 'r',
      'c': 'u',
      'd': 'h',
      'e': 'q',
      'f': 's',
      'g': 'l',
      'h': 'd',
      'i': 'p',
      'j': 'x',
      'k': 'n',
      'l': 'g',
      'm': 'o',
      'n': 'k',
      'o': 'm',
      'p': 'i',
      'q': 'e',
      'r': 'b',
      's': 'f',
      't': 'z',
      'u': 'c',
      'v': 'w',
      'w': 'v',
      'x': 'j',
      'y': 'a',
      'z': 't'
    };

    return function () {
      return new ns.Reflector(reflectorB, rightObj);
    };
  }());

  ns.Reflector.ReflectorC = (function (rightObj) {
    var reflectorC = {
      'a': 'f',
      'b': 'v',
      'c': 'p',
      'd': 'j',
      'e': 'i',
      'f': 'a',
      'g': 'o',
      'h': 'y',
      'i': 'e',
      'j': 'd',
      'k': 'r',
      'l': 'z',
      'm': 'x',
      'n': 'w',
      'o': 'g',
      'p': 'c',
      'q': 't',
      'r': 'k',
      's': 'u',
      't': 'q',
      'u': 's',
      'v': 'b',
      'w': 'n',
      'x': 'm',
      'y': 'h',
      'z': 'l'
    };

    return function () {
      return new ns.Reflector(reflectorC, rightObj);
    };
  }());
}());
