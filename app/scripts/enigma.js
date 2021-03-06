/*jshint indent: 2, maxlen: 80, strict: true*/

/*globals ENIGMA*/


/**
 * Immediate function that instantiates Enigma class.
 */
(function () {
  'use strict';

  var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  /**
   * Creates the Enigma machine container.
   * @class
   * @classdesc Create the Enigma interface and the machine object.
   *
   * @property {Rotor} reflector                    -  Object wiring the rotor
   * to reflector.
   * @property {Reflector|MiddleRotor} leftRotor    -  Object wiring the middle
   * rotor and the reflector.
   * @property {Rotor} middleRotor                  -  Object wiring the left
   * and right rotor.
   * @property {Rotor|Plugboard} rightRotor         -  Object wiring the middle
   * and the plugboard.
   * @property {Rotor} plugboard                    -  Object wiring the right
   * rotor
   */
  ENIGMA.EnigmaMachine = function () {
    // create all plugboard, rotors and reflector
    var reflector = new ENIGMA.Reflector.ReflectorB();
    var leftRotor = new ENIGMA.Rotor.Rotor1();
    var middleRotor = new ENIGMA.Rotor.Rotor2();
    var rightRotor = new ENIGMA.Rotor.Rotor3();
    var plugboard = new ENIGMA.Plugboard();
    var aCharCode = 'A'.charCodeAt(0);
    var zCharCode = 'Z'.charCodeAt(0);

    // 'wire up' the reflectors, rotors and plugboard
    reflector.setRightObj(leftRotor);

    leftRotor.setLeftObj(reflector);
    leftRotor.setRightObj(middleRotor);

    middleRotor.setLeftObj(leftRotor);
    middleRotor.setRightObj(rightRotor);

    rightRotor.setLeftObj(middleRotor);
    rightRotor.setRightObj(plugboard);

    plugboard.setLeftObj(rightRotor);

    /**
     * @namespace
     * @property {object} middleRotor      - Middle text field in the ground
     * setting
     * @property {object} leftRotor        - Left text field in the ground
     * setting
     * @property {object} rightRotor       - Right text field in the ground
     * setting
     * If the middleRotor has made a full cycle, the leftRotor will rotate one
     * letter.
     * If the rightRotor has made a full cycle, the middleRotor will rotate one
     * letter; or if the middleRotor has advanced one letter from the rightRotor
     * already the middleRotor will rotate one letter again.
     * The rightRotor will cycle through the letters with each key stroke from
     * the user.
     */
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

    /**
     * Returns the configuration for the reflector setting, rotors setting,
     * ring setting, ground setting, and plugboard setting; which will display
     * in the users browser.
     * @return {string} Gather reflector, rotor, ring, ground, and plugboard
     * settings and displays in the browser.
     * @property {object} middleRotor      - Middle text field in the ground
     * setting
     * @property {object} leftRotor        - Left text field in the ground
     * setting
     * @property {object} rightRotor       - Right text field in the ground
     * setting
     * @property {Rotor} plugboard         -  Object wiring the right rotor
     */
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

      alphabet.forEach(function (from) {
        var to = plugboardMapping[from];

        if (to.charCodeAt(0) > from.charCodeAt(0)) {
          plugboardSettings += '-' + from + to;
        }
      });

      return reflectorConfig + '-' + rotorConfig + '-' + ringSettings + '-' +
        groundSettings + plugboardSettings;
    };

    /**
     * Sets the Enigma Machine's settings property.
     * @param {Reflector|Rotor|Ring|Ground|Plugboard} settings
     */
    this.setAllSettings = function (settings) {
      var items = settings.toUpperCase().split('-');
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

      plugboardSettings.forEach(function (swap) {
        plugboard.clearLetter(swap[0]);
        plugboard.clearLetter(swap[1]);
        plugboard.setLetterSwap(swap[0], swap[1]);
      });
    };

    /**
     * Returns this plugboard property.
     * @return {object} plugboard
     */
    this.getPlugboard = function () {
      return plugboard;
    }.bind(this);

    /**
     * Return this leftRotor property.
     * @return {object} leftRotor
     */
    this.getLeftRotor = function () {
      return leftRotor;
    }.bind(this);

    /**
     * Return this middleRotor property.
     * @return {object} middleRotor
     */
    this.getMiddleRotor = function () {
      return middleRotor;
    }.bind(this);

    /**
     * Return this rightRotor property.
     * @return {object} rightRotor
     */
    this.getRightRotor = function () {
      return rightRotor;
    }.bind(this);

    /**
     * Return this Reflector property.
     * @return {object} Reflector
     */
    this.getReflector = function () {
      return reflector;
    }.bind(this);

    /**
     * takes oldRotor and replaces it with newRotor
     * example usage:
     * enigmaMachine.swapRotor(enigmaMachine.getLeftRotor(), rotor7);
     * this puts rotor 7 into the left rotor slot
     * @param {object} oldRotor
     * @param {object} newRotor
     */
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

    /**
     * swaps reflector out with newReflector
     * example usage:
     * enigmaMachine.swapReflector(refelctorC);
     * this puts reflectorC into the reflector slot
     * @param {object} newReflector
     */
    this.swapReflector = function (newReflector) {
      newReflector.setRightObj(leftRotor);
      leftRotor.setLeftObj(newReflector);
      reflector = newReflector;
    }.bind(this);

    /**
     * enciphers a single character
     * only the first character of the string is enciphered and returned
     * non a-z characters are passed through in lower case
     * @param {string} letter
     * @return {string} Upper case letter
     */
    this.encipherLetter = function (letter) {
      var upperCase = letter.toUpperCase();
      var charCode = upperCase.charCodeAt(0);

      // passthrough characters that are not a-z
      if (charCode < aCharCode || charCode > zCharCode) {
        return upperCase;
      }

      advanceRotors();

      return plugboard.goingLeft(upperCase);
    }.bind(this);

    /**
     * Traces a single character
     * only the first character of the string is enciphered and returned
     * non a-z characters are passed through in lower case
     * @param {string} letter
     * @return {string} Upper case letter
     */
    this.traceLetter = function (letter) {
      var upperCase = letter.toUpperCase();
      var charCode = upperCase.charCodeAt(0);

      // passthrough characters that are not a-z
      if (charCode < aCharCode || charCode > zCharCode) {
        return {};
      }

      advanceRotors();
      var path = [];

      return {
        letterIn: upperCase,
        letterOut: plugboard.traceLeft(upperCase, path),
        path: path
      };
    }.bind(this);

    /**
     * enciphers a string
     * non a-z characters are passed through in lower case
     * @param {string} cleartext
     * @return {string} Encipher string
     */
    this.encipherString = function (cleartext) {
      var ciphertext = '';

      for (var i = 0; i < cleartext.length; i += 1) {
        ciphertext += this.encipherLetter(cleartext.charAt(i));
      }

      return ciphertext;
    }.bind(this);
  };
}());
