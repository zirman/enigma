/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

(function () {
  'use strict';

  var ns = window.ENIGMA;

  ns.EnigmaMachine = function () {
    // create all plugboard, rotors and reflector
    var reflector = new ns.Reflector.ReflectorB();
    var leftRotor = new ns.Rotor.Rotor1();
    var middleRotor = new ns.Rotor.Rotor2();
    var rightRotor = new ns.Rotor.Rotor3();
    var plugboard = new ns.Plugboard();
    var aCharCode = ('a').charCodeAt(0);
    var zCharCode = ('z').charCodeAt(0);

    // 'wire up' the reflectors, rotors and plugboard
    reflector.setRightObj(leftRotor);

    leftRotor.setLeftObj(reflector);
    leftRotor.setRightObj(middleRotor);

    middleRotor.setLeftObj(leftRotor);
    middleRotor.setRightObj(rightRotor);

    rightRotor.setLeftObj(middleRotor);
    rightRotor.setRightObj(plugboard);

    plugboard.setLeftObj(rightRotor);

    var advanceRotors = function () {
      if (middleRotor.isOnNotch()) {
        leftRotor.advanceGroundSetting();
      }

      // this is dub step
      if (rightRotor.isOnNotch() || middleRotor.isOnNotch()) {
        middleRotor.advanceGroundSetting();
      }

      rightRotor.advanceGroundSetting();
    };

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
    this.encipherLetter = function (letter) {
      var lowerCase = letter.toLowerCase();
      var charCode = lowerCase.charCodeAt(0);

      // passthrough characters that are not a-z
      if (charCode < aCharCode || charCode > zCharCode) {
        return lowerCase;
      }

      advanceRotors();

      return plugboard.goingLeft(lowerCase);
    }.bind(this);

    this.traceLetter = function (letter) {
      var lowerCase = letter.toLowerCase();
      var charCode = lowerCase.charCodeAt(0);

      // passthrough characters that are not a-z
      if (charCode < aCharCode || charCode > zCharCode) {
        return {};
      }

      advanceRotors();
      var path = [];

      return {
        letterIn: lowerCase,
        letterOut: plugboard.traceLeft(lowerCase, path),
        path: path
      };
    }.bind(this);

    // enciphers a string
    // non a-z characters are passed through in lower case
    this.encipherString = function (cleartext) {
      var ciphertext = '';

      for (var i = 0; i < cleartext.length; i += 1) {
        ciphertext += this.encipherLetter(cleartext.charAt(i));
        console.log(leftRotor.getGroundSetting() +
          middleRotor.getGroundSetting() + rightRotor.getGroundSetting() + ' ' +
          cleartext.charAt(i) + '->' + ciphertext.charAt(i));
      }

      return ciphertext;
    }.bind(this);
  };
}());
