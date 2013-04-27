/*jshint indent: 2, maxlen: 80, strict: true*/

(function () {
  'use strict';
  var ns = window.ENIGMA;

  ns.Reflector = function (label, right, rightObj) {
    label = label || 'B';

    if (!right) {
      return new ns.Reflector.ReflectorB();
    }

    rightObj = rightObj || null;

    this.getLabel = function () {
      return label;
    }.bind(this);

    this.getMapping = function () {
      return right;
    }.bind(this);

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

    this.traceLeft = function (letter, path) {
      var letterOut = right[letter];

      path.push({
        obj: this,
        ringRight: letter,
        objRight: letter,
        objLeft: letterOut,
        ringLeft: letterOut
      });

      return rightObj.traceRight(letterOut, path);
    }.bind(this);
  };

  ns.Reflector.withLabel = function (label) {
    if (label === 'B') {
      return new ns.Reflector.ReflectorB();

    } else if (label === 'C') {
      return new ns.Reflector.ReflectorC();

    } else {
      return null;
    }
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
      return new ns.Reflector('B', reflectorB, rightObj);
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
      return new ns.Reflector('C', reflectorC, rightObj);
    };
  }());
}());
