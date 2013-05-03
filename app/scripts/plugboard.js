/*jshint indent: 2, maxlen: 80, strict: true*/

/*globals ENIGMA*/

/**
 * Immediate function that instantiates Plugboard class.
 */
(function () {
  'use strict';

  /**
   * Creates an Enigma Machine plugboard object.
   * @class
   * @classdesc Simulates a plugboard object for the German Enigma Machine.
   *
   * @property {object} left - Letter substitution of this letter when
   *   moving to the left.
   * @property {Rotor} leftObj - Object connected to the left of
   *   this rotor.
   *
   * @constructor
   * @param {string} [left] - Left property.
   * @param {string} [leftObj] - Initial leftObj property.
   */
  ENIGMA.Plugboard = function (left, leftObj) {
    leftObj = leftObj || null;

    /**
     * Private variables
     * @private
     */
    var right;

    /**
     * Creates reverse mapping back to plugboard.
     */
    var makeReverseMap = function () {
      right = {};

      for (var key in left) {

        if (left.hasOwnProperty(key)) {
          right[left[key]] = key;
        }
      }
    };

    /**
     * Removes all letter substitutions.
     */
    this.clearAll = function () {
      left = {
        'A': 'A',
        'B': 'B',
        'C': 'C',
        'D': 'D',
        'E': 'E',
        'F': 'F',
        'G': 'G',
        'H': 'H',
        'I': 'I',
        'J': 'J',
        'K': 'K',
        'L': 'L',
        'M': 'M',
        'N': 'N',
        'O': 'O',
        'P': 'P',
        'Q': 'Q',
        'R': 'R',
        'S': 'S',
        'T': 'T',
        'U': 'U',
        'V': 'V',
        'W': 'W',
        'X': 'X',
        'Y': 'Y',
        'Z': 'Z'
      };

      makeReverseMap();
    }.bind(this);

    if (left) {
      // should probably check to make sure that mapping is valid here
      makeReverseMap();

    } else {
      this.clearAll();
    }

    /**
     * Gets this plugboard's mapping for the letter substitution.
     * @return {object} left
     **/
    this.getMapping = function () {
      return left;
    }.bind(this);

    /**
     * Swaps letters in plugboard.
     * @param {string} letter1 - The first letter going to be swapped.
     * @param {string} letter2 - The second letter going to be swapped.
     */
    this.setLetterSwap = function (letter1, letter2) {
      console.assert(letter1 !== letter2);
      console.assert(left[letter1] === letter1);
      console.assert(left[letter2] === letter2);
      left[letter1] = letter2;
      left[letter2] = letter1;
      right[letter1] = letter2;
      right[letter2] = letter1;
    }.bind(this);

    /**
     * Clears letter pressed to the left and the right
     * @param {string} letter
     */
    this.clearLetter = function (letter) {
      var to = left[letter];
      left[to] = to;
      left[letter] = letter;
      right[to] = to;
      right[letter] = letter;
    }.bind(this);

    /**
     * Gets the leftObj property.
     * @return {Rotor} leftObj
     */
    this.getLeftObj = function () {
      return leftObj;
    }.bind(this);

    /**
     * Sets this leftObj property to the newLeftObj.
     * @param {Rotor} newLeftObj
     */
    this.setLeftObj = function (newLeftObj) {
      leftObj = newLeftObj;
    }.bind(this);

    /**
     * Takes the substitution and passes to the left object.
     * @param {string} letter
     * @return {string} Substituted letter.
     */
    this.goingLeft = function (letter) {
      return leftObj.goingLeft(left[letter]);
    }.bind(this);

    /**
     * Returns the final substitution back through to the left object.
     * @param {string} letter
     * @return {string} Substituted letter.
     */
    this.goingRight = function (letter) {
      return right[letter];
    }.bind(this);

    /**
     * Traces the path a letter takes through the enigma machine when passing
     * letter to the rotor.
     * @param {string} letter
     * @param {array} path Contains path information.
     * @return {string} Substituted letter.
     */
    this.traceLeft = function (letter, path) {
      var letterOut = left[letter];

      path.push({
        obj: this,
        ringRight: letter,
        objRight: letter,
        objLeft: letterOut,
        ringLeft: letterOut
      });

      return leftObj.traceLeft(letterOut, path);
    }.bind(this);

    /**
     * Traces the path a letter takes through the enigma machine when passing
     * letter to the right.
     * @param {string} letter
     * @param {array} path Contains path information.
     * @return {string} Substituted letter.
     */
    this.traceRight = function (letter, path) {
      var letterOut = right[letter];

      path.push({
        obj: this,
        ringRight: letterOut,
        objRight: letterOut,
        objLeft: letter,
        ringLeft: letter
      });

      return letterOut;
    }.bind(this);

    /**
     * Randomizes plugboard configurations.
     */
    this.randomize = function () {
      var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
        'Z'];

      this.clearAll();

      while (alphabet.length > 0) {
        var index = Math.floor(Math.random() * (alphabet.length - 1)) + 1;

        this.setLetterSwap(
          alphabet[0],
          alphabet[index]
        );

        alphabet.splice(index, 1);
        alphabet.splice(0, 1);
      }
    }.bind(this);
  };
}());
