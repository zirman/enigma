/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

/*globals ENIGMA*/

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

    this.getAllSettings = function () {
      var reflectorConfig = reflector.getLabel();

      var rotorConfig = leftRotor.getLabel() + '-' + middleRotor.getLabel() +
        '-' + rightRotor.getLabel();

      var ringSettings =
        leftRotor.getRingSetting() +
        middleRotor.getRingSetting() +
        rightRotor.getRingSetting();

      var groundSettings =
        leftRotor.getGroundSetting() +
        middleRotor.getGroundSetting() +
        rightRotor.getGroundSetting();

      var plugboardMapping = plugboard.getMapping();
      var plugboardSettings = '';
      var alreadySwapped = [];

      for (var key in plugboardMapping) {

        if (plugboardMapping.hasOwnProperty(key)) {

          if (plugboardMapping[key] !== key &&
              alreadySwapped.indexOf(key) === -1) {

            plugboardSettings += '-' + key + plugboardMapping[key];
            alreadySwapped.push(plugboardMapping[key]);
          }
        }
      }

      return reflectorConfig + '-' + rotorConfig + '-' + ringSettings + '-' +
        groundSettings + plugboardSettings;
    };

    this.setAllSettings = function (settings) {
      var items = settings.split('-');
      var reflectorLabel = items[0];
      var leftRotorLabel = items[1];
      var middleRotorLabel = items[2];
      var rightRotorLabel = items[3];
      var ringSettings = items[4];
      var groundSettings = items[5];
      var plugboardSettings = items.slice(6);

      // swap reflector
      if (reflector.getLabel() !== reflectorLabel) {
        this.swapReflector(ENIGMA.Reflector.withLabel(reflectorLabel));
      }

      // swap rotors
      if (leftRotor.getLabel() !== leftRotorLabel) {
        this.swapRotor(leftRotor, ENIGMA.Rotor.withLabel(leftRotorLabel));
      }

      if (middleRotor.getLabel() !== middleRotorLabel) {
        this.swapRotor(middleRotor, ENIGMA.Rotor.withLabel(middleRotorLabel));
      }

      if (rightRotor.getLabel() !== rightRotorLabel) {
        this.swapRotor(rightRotor, ENIGMA.Rotor.withLabel(rightRotorLabel));
      }

      // set ring settings
      if (leftRotor.setRingSetting(ringSettings[0])) {
        leftRotor.setRingSetting(ringSettings[0]);
      }

      if (middleRotor.setRingSetting(ringSettings[1])) {
        middleRotor.setRingSetting(ringSettings[1]);
      }

      if (rightRotor.setRingSetting(ringSettings[2])) {
        rightRotor.setRingSetting(ringSettings[2]);
      }

      // set ground settings
      if (leftRotor.setGroundSetting(groundSettings[0])) {
        leftRotor.setRingSetting(groundSettings[0]);
      }

      if (middleRotor.setGroundSetting(groundSettings[1])) {
        middleRotor.setRingSetting(groundSettings[1]);
      }

      if (rightRotor.setGroundSetting(groundSettings[2])) {
        rightRotor.setRingSetting(groundSettings[2]);
      }

      // set plugboard settings
      plugboard.clearAll();
      var plugboardMapping = plugboard.getMapping();

      plugboardSettings.forEach(function (swap) {

        // if already set
        if (plugboardMapping[swap[0]] === swap[1]) {
          return;
        }

        // if letter was swapped with a different letter, clear it
        if (plugboardMapping[swap[0]] !== swap[0]) {
          plugboard.clearLetterSwap(swap[0], plugboardMapping[swap[0]]);
        }

        plugboard.setLetterSwap(swap[0], swap[1]);
      });
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
      newReflector.setRightObj(leftRotor);
      leftRotor.setLeftObj(newReflector);
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
