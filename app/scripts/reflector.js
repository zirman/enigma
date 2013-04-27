/*jshint indent: 2, maxlen: 80, strict: true*/

/*globals ENIGMA*/

(function () {
  'use strict';

  ENIGMA.Reflector = function (label, right, rightObj) {
    label = label || 'B';

    if (!right) {
      return new ENIGMA.Reflector.ReflectorB();
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

  ENIGMA.Reflector.withLabel = function (label) {
    if (label === 'B') {
      return new ENIGMA.Reflector.ReflectorB();

    } else if (label === 'C') {
      return new ENIGMA.Reflector.ReflectorC();

    } else {
      return null;
    }
  };

  ENIGMA.Reflector.getRandomly = function () {

    switch (Math.floor(Math.random() * 2)) {
    case 0:
      return new ENIGMA.Reflector.ReflectorB();

    case 1:
      return new ENIGMA.Reflector.ReflectorC();

    default:
      return null;
    }
  };

  ENIGMA.Reflector.ReflectorB = (function (rightObj) {
    var reflectorB = {
      'A': 'Y',
      'B': 'R',
      'C': 'U',
      'D': 'H',
      'E': 'Q',
      'F': 'S',
      'G': 'L',
      'H': 'D',
      'I': 'P',
      'J': 'X',
      'K': 'N',
      'L': 'G',
      'M': 'O',
      'N': 'K',
      'O': 'M',
      'P': 'I',
      'Q': 'E',
      'R': 'B',
      'S': 'F',
      'T': 'Z',
      'U': 'C',
      'V': 'W',
      'W': 'V',
      'X': 'J',
      'Y': 'A',
      'Z': 'T'
    };

    return function () {
      return new ENIGMA.Reflector('B', reflectorB, rightObj);
    };
  }());

  ENIGMA.Reflector.ReflectorC = (function (rightObj) {
    var reflectorC = {
      'A': 'F',
      'B': 'V',
      'C': 'P',
      'D': 'J',
      'E': 'I',
      'F': 'A',
      'G': 'O',
      'H': 'Y',
      'I': 'E',
      'J': 'D',
      'K': 'R',
      'L': 'Z',
      'M': 'X',
      'N': 'W',
      'O': 'G',
      'P': 'C',
      'Q': 'T',
      'R': 'K',
      'S': 'U',
      'T': 'Q',
      'U': 'S',
      'V': 'B',
      'W': 'N',
      'X': 'M',
      'Y': 'H',
      'Z': 'L'
    };

    return function () {
      return new ENIGMA.Reflector('C', reflectorC, rightObj);
    };
  }());
}());
