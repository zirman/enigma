/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

(function () {
  'use strict';
  var ns = window.ENIGMA;

  ns.Plugboard = function (left, leftObj) {
    leftObj = leftObj || null;

    var right;

    var makeReverseMap = function () {
      right = {};

      for (var key in left) {

        if (left.hasOwnProperty(key)) {
          right[left[key]] = key;
        }
      }
    };

    this.clearAll = function () {
      left = {
        'a': 'a',
        'b': 'b',
        'c': 'c',
        'd': 'd',
        'e': 'e',
        'f': 'f',
        'g': 'g',
        'h': 'h',
        'i': 'i',
        'j': 'j',
        'k': 'k',
        'l': 'l',
        'm': 'm',
        'n': 'n',
        'o': 'o',
        'p': 'p',
        'q': 'q',
        'r': 'r',
        's': 's',
        't': 't',
        'u': 'u',
        'v': 'v',
        'w': 'w',
        'x': 'x',
        'y': 'y',
        'z': 'z'
      };

      makeReverseMap();
    };

    if (left) {
      // should probably check to make sure that mapping is valid here
      makeReverseMap();

    } else {
      this.clearAll();
    }

    this.setLetterSwap = function (letter1, letter2) {
      console.assert(letter1 !== letter2);
      console.assert(left[letter1] === letter1);
      console.assert(left[letter2] === letter2);
      left[letter1] = letter2;
      left[letter2] = letter1;
      right[letter1] = letter2;
      right[letter2] = letter1;
    };

    this.clearLetterSwap = function (letter1, letter2) {
      console.assert(letter1 !== letter2);
      console.assert(left[letter1] === letter2);
      console.assert(left[letter2] === letter1);
      left[letter1] = letter1;
      left[letter2] = letter2;
      right[letter1] = letter1;
      right[letter2] = letter2;
    };

    this.setLeftObj = function (newLeftObj) {
      leftObj = newLeftObj;
    }.bind(this);

    this.goingLeft = function (letter) {
      return leftObj.goingLeft(left[letter]);
    }.bind(this);

    this.goingRight = function (letter) {
      return right[letter];
    }.bind(this);
  };
}());
