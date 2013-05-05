/*jshint indent: 2, maxlen: 80, strict: true*/

/*globals ENIGMA*/

/**
 * Immediate function that instaniates Reflector class.
 */
(function () {
  'use strict';

  /**
   * Creates an Enigma Machine reflector object.
   * @class
   * @classdescription Simulates a reflector object of a German Enigma Machine.
   * @property {string} Label     - lable for this reflector
   * @property {object} right     - letter substitution of this reflector when
   * going to the right.
   * @property {rotor} rightObj   - object connected to the left of this
   * reflector.
   *
   * @constructor
   * @param {string} [label=I] label property.
   * @param {string} [right] right property.
   * @property {rotor} [rightObj] Initial rightObj proberty.
   *
   * @return {reflector} Instantiated reflector object.
   */
  ENIGMA.Reflector = function (label, right, rightObj) {
    label = label || 'B';

    if (!right) {
      return new ENIGMA.Reflector.ReflectorB();
    }

    rightObj = rightObj || null;

    /**
     * Returns this reflector's label property.
     * @return {string} label.
     */
    this.getLabel = function () {
      return label;
    }.bind(this);

    /**
     * Returns this reflector's right property.
     * @return {object} right.
     */
    this.getMapping = function () {
      return right;
    }.bind(this);

    /**
     * Returns this reflector's rightObj property.
     * @return {Rotor} rightObj.
     */
    this.getRightObj = function () {
      return rightObj;
    }.bind(this);

    /**
     * Sets this reflector's rightObj property.
     * @param {Rotor} newRightObj
     */
    this.setRightObj = function (newRightObj) {
      rightObj = newRightObj;
    }.bind(this);

    /**
     * Return letter substitution when passing letter to the rightObj.
     * @param {string} letter
     * @return {string} Substituted letter.
     */
    this.goingLeft = function (letter) {
      return rightObj.goingRight(right[letter]);
    }.bind(this);

    /**
     * Traces the path a letter takes through the enigma machine when
     * passing a letter to the rightObj.
     * @param {string} letter.
     * @param {array} path contains path information.
     * @return {string} Substituted letter.
     */
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

  /**
   * Returns a new reflector with label.
   * @param {string} label the label of the reflector to return.
   * @return {reflector} Instantiated reflector.
   */
  ENIGMA.Reflector.withLabel = function (label) {
    if (label === 'B') {
      return new ENIGMA.Reflector.ReflectorB();

    } else if (label === 'C') {
      return new ENIGMA.Reflector.ReflectorC();

    } else {
      return null;
    }
  };

  /**
   * Returns a randomly generated new reflector.
   * @return {reflector} Instantiated reflector.
   */
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

  /**
   * Returns a reflector that configures to the German "B" reflector
   * specifications.
   * @return {reflector} Instantiated rotor.
   */
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

  /**
   * Returns a reflector that configures to the German "C" reflector
   * specifications.
   * @return {reflector} Instantiated rotor.
   */
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
