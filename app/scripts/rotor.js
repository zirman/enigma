/*jshint indent: 2, maxlen: 80, strict: true*/

(function () {
  'use strict';
  var ns = window.ENIGMA;
  var aCharCode = ('a').charCodeAt(0);

  // returns the next consecutive letter, 'z' goes to 'a'
  var nextLetter = function (letter) {
    var l = letter.toLowerCase().charCodeAt(0) + 1;
    return String.fromCharCode(((l - aCharCode) % 26) + aCharCode);
  };

  // ceasar shifts letter to right
  var shiftRightLetter = function (letter, shift) {
    var l = letter.toLowerCase().charCodeAt(0) - aCharCode;
    var s = shift.toLowerCase().charCodeAt(0) - aCharCode;
    return String.fromCharCode(((l + s) % 26) + aCharCode);
  };

  // ceasar shifts letter to left
  var shiftLeftLetter = function (letter, shift) {
    var l = letter.toLowerCase().charCodeAt(0) - aCharCode;
    var s = shift.toLowerCase().charCodeAt(0) - aCharCode;
    return String.fromCharCode(((l + 26 - s) % 26) + aCharCode);
  };

  ns.Rotor = function (label, left, notches, ringSetting, groundSetting,
    leftObj, rightObj) {

    if (!left) {
      return new ns.Rotor.Rotor1();
    }

    notches = notches || 'q';
    ringSetting = ringSetting || 'a';
    groundSetting = groundSetting || 'a';
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

    this.getLabel = function () {
      return label;
    }.bind(this);

    this.getMapping = function () {
      return left;
    }.bind(this);

    this.getNotches = function () {
      return notches;
    }.bind(this);

    this.getRingSetting = function () {
      return ringSetting;
    }.bind(this);

    this.setRingSetting = function (newRingSetting) {
      ringSetting = newRingSetting;
    }.bind(this);

    this.getGroundSetting = function () {
      return groundSetting;
    }.bind(this);

    this.setGroundSetting = function (newGroundSetting) {
      groundSetting = newGroundSetting;
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
      var shift = shiftLeftLetter(groundSetting, ringSetting);
      var rightSideLetter = shiftRightLetter(letter, shift);
      var leftSideLetter = left[rightSideLetter];
      var out = shiftLeftLetter(leftSideLetter, shift);
      return leftObj.goingLeft(out);
    }.bind(this);

    this.goingRight = function (letter) {
      var shift = shiftLeftLetter(groundSetting, ringSetting);
      var leftSideLetter = shiftRightLetter(letter, shift);
      var rightSideLetter = right[leftSideLetter];
      var out = shiftLeftLetter(rightSideLetter, shift);
      return rightObj.goingRight(out);
    }.bind(this);

    this.traceLeft = function (letter, path) {
      var shift = shiftLeftLetter(groundSetting, ringSetting);
      var objRight = shiftRightLetter(letter, shift);
      var objLeft = left[objRight];
      var letterOut = shiftLeftLetter(objLeft, shift);

      path.push({
        obj: this,
        ringRight: letter,
        objRight: objRight,
        objLeft: objLeft,
        ringLeft: letterOut
      });

      return leftObj.traceLeft(letterOut, path);
    }.bind(this);

    this.traceRight = function (letter, path) {
      var shift = shiftLeftLetter(groundSetting, ringSetting);
      var objLeft = shiftRightLetter(letter, shift);
      var objRight = right[objLeft];
      var letterOut = shiftLeftLetter(objRight, shift);

      path.push({
        obj: this,
        ringRight: letterOut,
        objRight: objRight,
        objLeft: objLeft,
        ringLeft: letter
      });

      return rightObj.traceRight(letterOut, path);
    }.bind(this);

    this.isOnNotch = function () {
      return notches.indexOf(groundSetting) !== -1;
    };

    this.advanceGroundSetting = function () {
      groundSetting = nextLetter(groundSetting);
    }.bind(this);

    /*
    this.step = function () {

      if (notches.indexOf(groundSetting) !== -1) {
        leftObj.singleStep();
      }

      groundSetting = nextLetter(groundSetting);
    }.bind(this);

    this.dubStep = function () {

      if (notches.indexOf(groundSetting) !== -1) {
        this.singleStep();
      }
    }.bind(this);
    */
  };

  ns.Rotor.withLabel = function (label) {
    if (label === 'I') {
      return new ns.Rotor.Rotor1();

    } else if (label === 'II') {
      return new ns.Rotor.Rotor2();

    } else if (label === 'III') {
      return new ns.Rotor.Rotor3();

    } else if (label === 'IV') {
      return new ns.Rotor.Rotor4();

    } else if (label === 'V') {
      return new ns.Rotor.Rotor5();

    } else if (label === 'VI') {
      return new ns.Rotor.Rotor6();

    } else if (label === 'VII') {
      return new ns.Rotor.Rotor7();

    } else if (label === 'VIII') {
      return new ns.Rotor.Rotor8();

    } else {
      return null;
    }
  };

  ns.Rotor.Rotor1 = (function (ringSetting, groundSetting, rightObject,
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
      return new ns.Rotor('I', rotor1, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor2 = (function (ringSetting, groundSetting, rightObject,
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
      return new ns.Rotor('II', rotor2, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor3 = (function (ringSetting, groundSetting, rightObject,
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
      return new ns.Rotor('III', rotor3, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor4 = (function (ringSetting, groundSetting, rightObject,
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
      return new ns.Rotor('IV', rotor4, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor5 = (function (ringSetting, groundSetting, rightObject,
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
      return new ns.Rotor('V', rotor5, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor6 = (function (ringSetting, groundSetting, rightObject,
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
      return new ns.Rotor('VI', rotor6, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor7 = (function (ringSetting, groundSetting, rightObject,
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
      return new ns.Rotor('VII', rotor7, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ns.Rotor.Rotor8 = (function (ringSetting, groundSetting, rightObject,
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
      return new ns.Rotor('VIII', rotor8, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());
}());
