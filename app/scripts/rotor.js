/*jshint indent: 2, maxlen: 80, strict: true*/

/*globals ENIGMA*/

/**
 * Immediate function that instantiates Rotor class.
 */
(function () {
  'use strict';

  /**
   * Private variables.
   * @private
   */
  var aCharCode = 'A'.charCodeAt(0);

  /**
   * Returns a randomized capital letter in a single character string.
   * @returns {string} Random capitalized letter.
   */
  var randomLetter = function () {
    return String.fromCharCode(aCharCode + Math.floor(Math.random() * 26));
  };

  /**
   * Takes a capitalized single character string and returns the next
   * consecutive letter of the alphabet.  'Z' wraps to 'A'.
   * @param {string} letter
   * @returns {string} Single character string  is the next letter of the
   * alphabet.
   */
  var nextLetter = function (letter) {
    var l = letter.toUpperCase().charCodeAt(0) + 1;
    return String.fromCharCode(((l - aCharCode) % 26) + aCharCode);
  };

  /**
   * Performs a Caesar shift on a capitalized single character string.
   * @param {string} letter Capitalized single character string that is Caesar
   * shifted.
   * @param {string} shift Capitalized single character string that is the key
   * for the Ceasar shift.
   * @returns {string} Single character string of Ceasar shift cipher text.
   */
  var shiftRightLetter = function (letter, shift) {
    var l = letter.toUpperCase().charCodeAt(0) - aCharCode;
    var s = shift.toUpperCase().charCodeAt(0) - aCharCode;
    return String.fromCharCode(((l + s) % 26) + aCharCode);
  };

  /**
   * Performs a reverse Caesar shift on a capitalized single character string.
   * @param {string} letter Capitalized single character string that is Caesar
   * shifted.
   * @param {string} shift Capitalized single character string that is the key
   * for the reverse Ceasar shift.
   * @returns {string} Single character string of reverse Ceasar shift.
   */
  var shiftLeftLetter = function (letter, shift) {
    var l = letter.toUpperCase().charCodeAt(0) - aCharCode;
    var s = shift.toUpperCase().charCodeAt(0) - aCharCode;
    return String.fromCharCode(((l + 26 - s) % 26) + aCharCode);
  };

  /**
   * Creates a Enigma Machine rotor object.
   * @class
   * @classdesc Simulates a rotor object of a German Enigma Machine.
   *
   * @property {string} label            - Label for this rotor.
   * @property {object} left             - Letter transposition of this rotor
   * when going to the left.
   * @property {string} notches          - Ground setting when the enigma
   * machine rotates this rotor.  Can contain multiple letters.
   * @property {string} ringSetting      - Ring setting for this rotor.
   * @property {string} groundSetting    - Current ground setting for this
   * rotor.
   * @property {Rotor|Reflector} leftObj - Object connected to the left of this
   * rotor.
   * @property {Rotor|Plugboard} rightObj - Object connected to the right of
   * this rotor.
   *
   * @constructor
   * @param {string} [label=I] label property.
   * @param {string} [left] left property.
   * @param {string} [notches] notches property.
   * @param {string} [ringSetting] Initial ringSetting property.
   * @param {string} [groundSetting] Initial groundSetting property.
   * @param {Rotor|Reflector} [leftObj] Initial leftObj property.
   * @param {Rotor|Plugboard} [rightObj] Initial rightObj property.
   *
   * @return {Rotor} Instantiated rotor object.
   */
  ENIGMA.Rotor = function (label, left, notches, ringSetting, groundSetting,
    leftObj, rightObj) {

    if (!left) {
      return new ENIGMA.Rotor.Rotor1();
    }


    notches = notches || 'Q';
    ringSetting = ringSetting || 'A';
    groundSetting = groundSetting || 'A';
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

    /**
     * Returns this rotor's label property.
     * @return {string} label
     */
    this.getLabel = function () {
      return label;
    }.bind(this);

    /**
     * Returns this rotor's left property.
     * @return {object} left
     */
    this.getMapping = function () {
      return left;
    }.bind(this);

    /**
     * Returns this rotor's notches property.
     * @return {string} notches
     */
    this.getNotches = function () {
      return notches;
    }.bind(this);

    /**
     * Returns this rotor's ringSetting property.
     * @return {string} ringSetting
     */
    this.getRingSetting = function () {
      return ringSetting;
    }.bind(this);

    /**
     * Sets this rotor's ringSetting property.
     * @param {string} newRingSetting
     */
    this.setRingSetting = function (newRingSetting) {
      ringSetting = newRingSetting.toUpperCase();
    }.bind(this);

    /**
     * Returns this rotor's groundSetting property.
     * @return {string} groundSetting
     */
    this.getGroundSetting = function () {
      return groundSetting;
    }.bind(this);

    /**
     * Sets this rotor's groundSetting property.
     * @param {string} newGroundSetting
     */
    this.setGroundSetting = function (newGroundSetting) {
      groundSetting = newGroundSetting.toUpperCase();
    }.bind(this);

    /**
     * Sets this rotor's groundSetting property.
     * @param {string} newGroundSetting
     */
    this.getLeftObj = function () {
      return leftObj;
    }.bind(this);

    /**
     * Sets this rotor's leftObj property.
     * @param {string} newLeftObj
     */
    this.setLeftObj = function (newLeftObj) {
      leftObj = newLeftObj;
    }.bind(this);

    this.getRightObj = function () {
      return rightObj;
    }.bind(this);

    /**
     * Sets this rotor's rightObj property.
     * @param {string} newRightObj
     */
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
    }.bind(this);

    this.advanceGroundSetting = function () {
      groundSetting = nextLetter(groundSetting);
    }.bind(this);

    this.randomize = function () {
      this.setRingSetting(randomLetter());
      this.setGroundSetting(randomLetter());
    }.bind(this);
  };

  ENIGMA.Rotor.withLabel = function (label) {
    if (label === 'I') {
      return new ENIGMA.Rotor.Rotor1();

    } else if (label === 'II') {
      return new ENIGMA.Rotor.Rotor2();

    } else if (label === 'III') {
      return new ENIGMA.Rotor.Rotor3();

    } else if (label === 'IV') {
      return new ENIGMA.Rotor.Rotor4();

    } else if (label === 'V') {
      return new ENIGMA.Rotor.Rotor5();

    } else if (label === 'VI') {
      return new ENIGMA.Rotor.Rotor6();

    } else if (label === 'VII') {
      return new ENIGMA.Rotor.Rotor7();

    } else if (label === 'VIII') {
      return new ENIGMA.Rotor.Rotor8();

    } else {
      return null;
    }
  };

  ENIGMA.Rotor.getRandomly = function () {

    switch (Math.floor(Math.random() * 8)) {
    case 0:
      return new ENIGMA.Rotor.Rotor1();

    case 1:
      return new ENIGMA.Rotor.Rotor2();

    case 2:
      return new ENIGMA.Rotor.Rotor3();

    case 3:
      return new ENIGMA.Rotor.Rotor4();

    case 4:
      return new ENIGMA.Rotor.Rotor5();

    case 5:
      return new ENIGMA.Rotor.Rotor6();

    case 6:
      return new ENIGMA.Rotor.Rotor7();

    case 7:
      return new ENIGMA.Rotor.Rotor8();

    default:
      return null;
    }
  };

  ENIGMA.Rotor.Rotor1 = (function (ringSetting, groundSetting, rightObject,
    leftObject) {

    var rotor1 = {
      'A': 'E',
      'B': 'K',
      'C': 'M',
      'D': 'F',
      'E': 'L',
      'F': 'G',
      'G': 'D',
      'H': 'Q',
      'I': 'V',
      'J': 'Z',
      'K': 'N',
      'L': 'T',
      'M': 'O',
      'N': 'W',
      'O': 'Y',
      'P': 'H',
      'Q': 'X',
      'R': 'U',
      'S': 'S',
      'T': 'P',
      'U': 'A',
      'V': 'I',
      'W': 'B',
      'X': 'R',
      'Y': 'C',
      'Z': 'J'
    };

    var notches = 'Q';

    return function () {
      return new ENIGMA.Rotor('I', rotor1, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ENIGMA.Rotor.Rotor2 = (function (ringSetting, groundSetting, rightObject,
    leftObject) {

    var rotor2 = {
      'A': 'A',
      'B': 'J',
      'C': 'D',
      'D': 'K',
      'E': 'S',
      'F': 'I',
      'G': 'R',
      'H': 'U',
      'I': 'X',
      'J': 'B',
      'K': 'L',
      'L': 'H',
      'M': 'W',
      'N': 'T',
      'O': 'M',
      'P': 'C',
      'Q': 'Q',
      'R': 'G',
      'S': 'Z',
      'T': 'N',
      'U': 'P',
      'V': 'Y',
      'W': 'F',
      'X': 'V',
      'Y': 'O',
      'Z': 'E'
    };

    var notches = 'E';

    return function () {
      return new ENIGMA.Rotor('II', rotor2, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ENIGMA.Rotor.Rotor3 = (function (ringSetting, groundSetting, rightObject,
    leftObject) {

    var rotor3 = {
      'A': 'B',
      'B': 'D',
      'C': 'F',
      'D': 'H',
      'E': 'J',
      'F': 'L',
      'G': 'C',
      'H': 'P',
      'I': 'R',
      'J': 'T',
      'K': 'X',
      'L': 'V',
      'M': 'Z',
      'N': 'N',
      'O': 'Y',
      'P': 'E',
      'Q': 'I',
      'R': 'W',
      'S': 'G',
      'T': 'A',
      'U': 'K',
      'V': 'M',
      'W': 'U',
      'X': 'S',
      'Y': 'Q',
      'Z': 'O'
    };

    var notches = 'V';

    return function () {
      return new ENIGMA.Rotor('III', rotor3, notches, ringSetting,
        groundSetting, rightObject, leftObject);
    };
  }());

  ENIGMA.Rotor.Rotor4 = (function (ringSetting, groundSetting, rightObject,
    leftObject) {

    var rotor4 = {
      'A': 'E',
      'B': 'S',
      'C': 'O',
      'D': 'V',
      'E': 'P',
      'F': 'Z',
      'G': 'J',
      'H': 'A',
      'I': 'Y',
      'J': 'Q',
      'K': 'U',
      'L': 'I',
      'M': 'R',
      'N': 'H',
      'O': 'X',
      'P': 'L',
      'Q': 'N',
      'R': 'F',
      'S': 'T',
      'T': 'G',
      'U': 'K',
      'V': 'D',
      'W': 'C',
      'X': 'M',
      'Y': 'W',
      'Z': 'B'
    };

    var notches = 'J';

    return function () {
      return new ENIGMA.Rotor('IV', rotor4, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ENIGMA.Rotor.Rotor5 = (function (ringSetting, groundSetting, rightObject,
    leftObject) {

    var rotor5 = {
      'A': 'V',
      'B': 'Z',
      'C': 'B',
      'D': 'R',
      'E': 'G',
      'F': 'I',
      'G': 'T',
      'H': 'Y',
      'I': 'U',
      'J': 'P',
      'K': 'S',
      'L': 'D',
      'M': 'N',
      'N': 'H',
      'O': 'L',
      'P': 'X',
      'Q': 'A',
      'R': 'W',
      'S': 'M',
      'T': 'J',
      'U': 'Q',
      'V': 'O',
      'W': 'F',
      'X': 'E',
      'Y': 'C',
      'Z': 'K'
    };

    var notches = 'Z';

    return function () {
      return new ENIGMA.Rotor('V', rotor5, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ENIGMA.Rotor.Rotor6 = (function (ringSetting, groundSetting, rightObject,
    leftObject) {

    var rotor6 = {
      'A': 'J',
      'B': 'P',
      'C': 'G',
      'D': 'V',
      'E': 'O',
      'F': 'U',
      'G': 'M',
      'H': 'F',
      'I': 'Y',
      'J': 'Q',
      'K': 'B',
      'L': 'E',
      'M': 'N',
      'N': 'H',
      'O': 'Z',
      'P': 'R',
      'Q': 'D',
      'R': 'K',
      'S': 'A',
      'T': 'S',
      'U': 'X',
      'V': 'L',
      'W': 'I',
      'X': 'C',
      'Y': 'T',
      'Z': 'W'
    };

    var notches = 'ZM';

    return function () {
      return new ENIGMA.Rotor('VI', rotor6, notches, ringSetting, groundSetting,
        rightObject, leftObject);
    };
  }());

  ENIGMA.Rotor.Rotor7 = (function (ringSetting, groundSetting, rightObject,
    leftObject) {

    var rotor7 = {
      'A': 'N',
      'B': 'Z',
      'C': 'J',
      'D': 'H',
      'E': 'G',
      'F': 'R',
      'G': 'C',
      'H': 'X',
      'I': 'M',
      'J': 'Y',
      'K': 'S',
      'L': 'W',
      'M': 'B',
      'N': 'O',
      'O': 'U',
      'P': 'F',
      'Q': 'A',
      'R': 'I',
      'S': 'V',
      'T': 'L',
      'U': 'P',
      'V': 'E',
      'W': 'K',
      'X': 'Q',
      'Y': 'D',
      'Z': 'T'
    };

    var notches = 'ZM';

    return function () {
      return new ENIGMA.Rotor('VII', rotor7, notches, ringSetting,
        groundSetting, rightObject, leftObject);
    };
  }());

  ENIGMA.Rotor.Rotor8 = (function (ringSetting, groundSetting, rightObject,
    leftObject) {

    var rotor8 = {
      'A': 'F',
      'B': 'K',
      'C': 'Q',
      'D': 'H',
      'E': 'T',
      'F': 'L',
      'G': 'X',
      'H': 'O',
      'I': 'C',
      'J': 'B',
      'K': 'J',
      'L': 'S',
      'M': 'P',
      'N': 'D',
      'O': 'Z',
      'P': 'R',
      'Q': 'A',
      'R': 'M',
      'S': 'E',
      'T': 'W',
      'U': 'N',
      'V': 'I',
      'W': 'U',
      'X': 'Y',
      'Y': 'G',
      'Z': 'V'
    };

    var notches = 'ZM';

    return function () {
      return new ENIGMA.Rotor('VIII', rotor8, notches, ringSetting,
        groundSetting, rightObject, leftObject);
    };
  }());
}());
