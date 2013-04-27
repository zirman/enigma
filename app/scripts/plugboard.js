/*jshint indent: 2, maxlen: 80, strict: true*/

/*globals ENIGMA*/

(function () {
  'use strict';

  ENIGMA.Plugboard = function (left, leftObj) {
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

    this.getMapping = function () {
      return left;
    }.bind(this);

    this.setLetterSwap = function (letter1, letter2) {
      console.assert(letter1 !== letter2);
      console.assert(left[letter1] === letter1);
      console.assert(left[letter2] === letter2);
      left[letter1] = letter2;
      left[letter2] = letter1;
      right[letter1] = letter2;
      right[letter2] = letter1;
    }.bind(this);

    this.clearLetter = function (letter) {
      var to = left[letter];
      left[to] = to;
      left[letter] = letter;
      right[to] = to;
      right[letter] = letter;
    }.bind(this);

    this.getLeftObj = function () {
      return leftObj;
    }.bind(this);

    this.setLeftObj = function (newLeftObj) {
      leftObj = newLeftObj;
    }.bind(this);

    this.goingLeft = function (letter) {
      return leftObj.goingLeft(left[letter]);
    }.bind(this);

    this.goingRight = function (letter) {
      return right[letter];
    }.bind(this);

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
