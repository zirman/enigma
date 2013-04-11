/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

(function () {
  'use strict';

  var ns = window.ENIGMA;

  // returns the next consecutive letter, 'z' goes to 'a'
  ns.nextLetter = (function () {
    var a = ('a').charCodeAt(0);

    return function (letter) {
      var l = letter.toLowerCase().charCodeAt(0) + 1;
      return String.fromCharCode(((l - a) % 26) + a);
    };
  }());

  // ceasar shifts letter to right
  ns.shiftRightLetter = (function () {
    var a = ('a').charCodeAt(0);

    return function (letter, shift) {
      var l = letter.toLowerCase().charCodeAt(0) - a;
      var s = shift.toLowerCase().charCodeAt(0) - a;
      return String.fromCharCode(((l + s) % 26) + a);
    };
  }());

  // ceasar shifts letter to left
  ns.shiftLeftLetter = (function () {
    var a = ('a').charCodeAt(0);

    return function (letter, shift) {
      var l = letter.toLowerCase().charCodeAt(0) - a;
      var s = shift.toLowerCase().charCodeAt(0) - a;
      return String.fromCharCode(((l + 26 - s) % 26) + a);
    };
  }());

  ns.EnigmaMachine = function () {
    // create all plugboard, rotors and reflector
    var reflector = new ns.Reflector.ReflectorB();
    var leftRotor = new ns.Rotor.Rotor1();
    var middleRotor = new ns.Rotor.Rotor2();
    var rightRotor = new ns.Rotor.Rotor3();
    var plugboard = new ns.Plugboard();

    // 'wire up' the reflectors, rotors and plugboard
    reflector.setRightObj(leftRotor);

    leftRotor.setLeftObj(reflector);
    leftRotor.setRightObj(middleRotor);

    middleRotor.setLeftObj(leftRotor);
    middleRotor.setRightObj(rightRotor);

    rightRotor.setLeftObj(middleRotor);
    rightRotor.setRightObj(plugboard);

    plugboard.setLeftObj(rightRotor);

    this.getPlugboard = function () {
      return plugboard;
    }.bind(this);

    this.getLeftRotor = function () {
      return leftRotor;
    }.bind(this);

    this.getMiddleRotor = function () {
      return middleRotor;
    }.bind(this);

    this.getRightRotor = function () {
      return rightRotor;
    }.bind(this);

    this.getReflector = function () {
      return reflector;
    }.bind(this);

    // takes oldRotor and replaces it with newRotor
    // example usage:
    // enigmaMachine.swapRotor(enigmaMachine.getLeftRotor(), rotor7);
    // this puts rotor 7 into the left rotor slot
    this.swapRotor = function (oldRotor, newRotor) {
      console.assert(oldRotor === leftRotor || oldRotor === middleRotor ||
        oldRotor === rightRotor);

      console.assert(newRotor !== leftRotor && newRotor !== middleRotor &&
        newRotor !== rightRotor);

      newRotor.setLeftObj(oldRotor.getLeftObj());
      newRotor.setRightObj(oldRotor.getRightObj());
      newRotor.getLeftObj().setRightObj(newRotor);
      newRotor.getRightObj().setLeftObj(newRotor);

      if (leftRotor === oldRotor) {
        leftRotor = newRotor;

      } else if (middleRotor === oldRotor) {
        middleRotor = newRotor;

      } else if (rightRotor === oldRotor) {
        rightRotor = newRotor;
      }
    }.bind(this);

    // swaps reflector out with newReflector
    // example usage:
    // enigmaMachine.swapReflector(refelctorC);
    // this puts reflectorC into the reflector slot
    this.swapReflector = function (newReflector) {
      newReflector.setRightObj(reflector.getRightObj());
      reflector = newReflector;
    }.bind(this);

    // enciphers a single character
    // only the first character of the string is enciphered and returned
    // non a-z characters are passed through in lower case
    this.encipherLetter = (function () {
      var a = ('a').charCodeAt(0);
      var z = ('z').charCodeAt(0);

      return function (letter) {
        var lowerCase = letter.toLowerCase();
        var charCode = lowerCase.charCodeAt(0);

        // passthrough characters that are not a-z
        if (charCode < a || charCode > z) {
          return lowerCase;
        }

        middleRotor.doubleStep();
        rightRotor.singleStep();
        return plugboard.goingLeft(lowerCase);
      }.bind(this);
    }());

    // enciphers a string
    // non a-z characters are passed through in lower case
    this.encipherString = function (cleartext) {
      var ciphertext = '';

      for (var i = 0; i < cleartext.length; i += 1) {
        ciphertext += this.encipherLetter(cleartext.charAt(i));
        /*console.log(leftRotor.getWindowSetting() +
          middleRotor.getWindowSetting() + rightRotor.getWindowSetting() + ' ' +
          cleartext.charAt(i) + '->' + ciphertext.charAt(i));*/
      }

      return ciphertext;
    }.bind(this);
  };
}());
