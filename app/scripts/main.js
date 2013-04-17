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




    this.getEnigmaMachine = function () {
      return enigmaMachine;
    };

    this.getEnigmaView = function () {
      return enigmaView;
    };

    this.keyboardEvent = function () {

    };

    this.setEnigmaView = function (newEnigmaView) {
      enigmaView = newEnigmaView;
    };
  };
}());
