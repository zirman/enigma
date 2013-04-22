/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

/*globals ENIGMA*/

(function () {
  'use strict';

  ENIGMA.EnigmaController = function () {
    var enigmaMachine;
    enigmaMachine = new ENIGMA.EnigmaMachine();

    var enigmaView;
    enigmaView = new ENIGMA.EnigmaView();

    var plainText = '';
    var cipherText = '';

    enigmaView = {
      getPlainText: function () {
        return plainText;
      },
      setPlainText: function (plainText) {
        plainText = new ENIGMA.EnigmaView.newPlainText();
      },
      getCipherText: function () {
        return cipherText;
      },
      setCipherText: function (cipherText) {
        cipherText = new ENIGMA.EnigmaView.newCipherText();
      }
    };



    var leftRotor;
    var middleRotor;
    var rightRotor;
    var groundSetting;

    this.keyboardEvent = function (event) {
      var keyCode = event.key.charCodeAt(0);

      if (keyCode >= 'a'.charCodeAt(0) || keyCode <= 'z'.charCodeAt(0)) {
        enigmaMachine.encipherLetter(event.key);
      }
    };

    var keys = {
      'a': false,
      'b': false,
      'c': false,
      'd': false,
      'e': false,
      'f': false,
      'g': false,
      'h': false,
      'i': false,
      'j': false,
      'k': false,
      'l': false,
      'm': false,
      'n': false,
      'o': false,
      'p': false,
      'q': false,
      'r': false,
      's': false,
      't': false,
      'u': false,
      'v': false,
      'w': false,
      'x': false,
      'y': false,
      'z': false
    };

    this.getEnigmaMachine = function () {
      return enigmaMachine;
    };

    this.getEnigmaView = function () {
      return enigmaView;
    };

    this.setEnigmaView = function (newEnigmaView) {
      enigmaView = newEnigmaView;
    };

    this.getLeftRotor = function () {
      return leftRotor;
    };

    this.getMiddleRotor = function () {
      return middleRotor;
    };

    this.getRightRotor = function () {
      return rightRotor;
    };

    this.getGroundSetting = function () {
      return groundSetting;
    };

    this.setGroundSetting = function (newGroundSetting) {
      groundSetting = newGroundSetting;
    };

  };
}());
