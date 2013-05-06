/*jshint indent: 2, maxlen: 80, strict: true */

/*globals ENIGMA, $*/

/**
 * Immediate function that has controller logic.
 */
(function () {
  'use strict';

  /**
   * Private variables.
   * @private
   */
  var whiteSpace = /\s/;
  var alphabetic = /[a-zA-Z]/;
  var notAlphaSpace = /[^\sa-zA-Z]+|/g;

  var enigmaMachine = new ENIGMA.EnigmaMachine();
  var enigmaStateStack = [];
  var clearText = '';
  var cipherText = '';
  var ui = null;
  var persona = null;
  var emailHash = null;
  var username = null;

  ENIGMA.controller = {};

  ENIGMA.controller.login = function () {
    navigator.id.request();
  };

  ENIGMA.controller.logout = function () {
    navigator.id.logout();
  };

  ENIGMA.controller.getEnigmaMachine = function () {
    return enigmaMachine;
  };

  ENIGMA.controller.getEnigmaStateStack = function () {
    return enigmaStateStack;
  };

  ENIGMA.controller.getClearText = function () {
    return clearText;
  };

  ENIGMA.controller.getCipherText = function () {
    return cipherText;
  };

  /**
   * Validates the current settings in the hash tag and updates the user
   * interface.  If the settings are invalid, they are replaced.  Clears
   * clearTextField, cipherTextField and enigmaStateStack.
   */
  ENIGMA.controller.validateHashAndUpdateUI = function () {
    var hashSettings = window.location.hash.slice(1);
    enigmaMachine.setAllSettings(hashSettings);
    var validHashSettings = enigmaMachine.getAllSettings();

    // change hash to valid version and return, we will be back

    if (validHashSettings !== hashSettings) {
      window.location.hash = '#' + validHashSettings;
      return;
    }

    enigmaStateStack = [hashSettings];

    // empty all text fields

    clearText = '';
    cipherText = '';
    ui.clearTextField.val(clearText);
    ui.cipherTextField.val(cipherText);

    // update user interface

    ui.reflectorDropdown.text(enigmaMachine.getReflector().getLabel());

    var leftRotor = enigmaMachine.getLeftRotor();
    var middleRotor = enigmaMachine.getMiddleRotor();
    var rightRotor = enigmaMachine.getRightRotor();

    ui.leftRotorDropdown.text(leftRotor.getLabel());
    ui.middleRotorDropdown.text(middleRotor.getLabel());
    ui.rightRotorDropdown.text(rightRotor.getLabel());

    ui.leftRotorRingSettingField.val(leftRotor.getRingSetting());
    ui.middleRotorRingSettingField.val(middleRotor.getRingSetting());
    ui.rightRotorRingSettingField.val(rightRotor.getRingSetting());

    ui.leftRotorGroundSettingField.val(leftRotor.getGroundSetting());
    ui.middleRotorGroundSettingField.val(middleRotor.getGroundSetting());
    ui.rightRotorGroundSettingField.val(rightRotor.getGroundSetting());

    var plugboardMapping = enigmaMachine.getPlugboard().getMapping();
    ui.plugboardAField.val(plugboardMapping.A);
    ui.plugboardBField.val(plugboardMapping.B);
    ui.plugboardCField.val(plugboardMapping.C);
    ui.plugboardDField.val(plugboardMapping.D);
    ui.plugboardEField.val(plugboardMapping.E);
    ui.plugboardFField.val(plugboardMapping.F);
    ui.plugboardGField.val(plugboardMapping.G);
    ui.plugboardHField.val(plugboardMapping.H);
    ui.plugboardIField.val(plugboardMapping.I);
    ui.plugboardJField.val(plugboardMapping.J);
    ui.plugboardKField.val(plugboardMapping.K);
    ui.plugboardLField.val(plugboardMapping.L);
    ui.plugboardMField.val(plugboardMapping.M);
    ui.plugboardNField.val(plugboardMapping.N);
    ui.plugboardOField.val(plugboardMapping.O);
    ui.plugboardPField.val(plugboardMapping.P);
    ui.plugboardQField.val(plugboardMapping.Q);
    ui.plugboardRField.val(plugboardMapping.R);
    ui.plugboardSField.val(plugboardMapping.S);
    ui.plugboardTField.val(plugboardMapping.T);
    ui.plugboardUField.val(plugboardMapping.U);
    ui.plugboardVField.val(plugboardMapping.V);
    ui.plugboardWField.val(plugboardMapping.W);
    ui.plugboardXField.val(plugboardMapping.X);
    ui.plugboardYField.val(plugboardMapping.Y);
    ui.plugboardZField.val(plugboardMapping.Z);
  };

  /**
   * Changes the reflector configuration to match label and updates hash tag.
   * Triggers 'hashchange' event that calls validateHashAndUpdateUI().
   * @param {string} label Label of reflector to set.
   */
  ENIGMA.controller.setReflectorDropdown = function (label) {
    var reflector = enigmaMachine.getReflector();

    if (reflector.getLabel() !== label) {
      enigmaMachine.setAllSettings(enigmaStateStack[0]);
      enigmaMachine.swapReflector(ENIGMA.Reflector.withLabel(label));
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }
  };

  /**
   * Creates a rotor pulldown handler for the getRotor method.  The handler
   * changes the rotor configuration to match the event target text.
   * @param {function} getRotor Function that returns the current rotor in
   * the enigma machine.
   */
  var getRotorDropdownHandler = function (getRotor) {
    return function(label) {
      var rotor = getRotor();

      if (rotor.getLabel() !== label) {
        enigmaMachine.setAllSettings(enigmaStateStack[0]);
        enigmaMachine.swapRotor(rotor, ENIGMA.Rotor.withLabel(label));
        window.location.hash = '#' + enigmaMachine.getAllSettings();
      }
    };
  };

  ENIGMA.controller.setLeftRotorDropdown = getRotorDropdownHandler(
    enigmaMachine.getLeftRotor
  );

  ENIGMA.controller.setMiddleRotorDropdown = getRotorDropdownHandler(
    enigmaMachine.getMiddleRotor
  );

  ENIGMA.controller.setRightRotorDropdown = getRotorDropdownHandler(
    enigmaMachine.getRightRotor
  );

  /**
   * Creates a rotor pulldown handler for the getRotor method.  The handler
   * changes the rotor configuration to match the event target text.
   * @param {function} getRotor Function that returns the current rotor in
   * the enigma machine.
   */
  var getPlugboardFieldHandler = function (letter) {
    return function (character) {
      if (alphabetic.test(character)) {
        character = character.toUpperCase();
        enigmaMachine.setAllSettings(enigmaStateStack[0]);
        var plugboard = enigmaMachine.getPlugboard();

        if (plugboard.getMapping()[letter] !== character) {
          plugboard.clearLetter(letter);
          plugboard.clearLetter(character);

          if (letter !== character) {
            plugboard.setLetterSwap(letter, character);
          }

          window.location.hash = '#' + enigmaMachine.getAllSettings();
        }
      }
    };
  };

  ENIGMA.controller.setPlugboardAField = getPlugboardFieldHandler('A');
  ENIGMA.controller.setPlugboardBField = getPlugboardFieldHandler('B');
  ENIGMA.controller.setPlugboardCField = getPlugboardFieldHandler('C');
  ENIGMA.controller.setPlugboardDField = getPlugboardFieldHandler('D');
  ENIGMA.controller.setPlugboardEField = getPlugboardFieldHandler('E');
  ENIGMA.controller.setPlugboardFField = getPlugboardFieldHandler('F');
  ENIGMA.controller.setPlugboardGField = getPlugboardFieldHandler('G');
  ENIGMA.controller.setPlugboardHField = getPlugboardFieldHandler('H');
  ENIGMA.controller.setPlugboardIField = getPlugboardFieldHandler('I');
  ENIGMA.controller.setPlugboardJField = getPlugboardFieldHandler('J');
  ENIGMA.controller.setPlugboardKField = getPlugboardFieldHandler('K');
  ENIGMA.controller.setPlugboardLField = getPlugboardFieldHandler('L');
  ENIGMA.controller.setPlugboardMField = getPlugboardFieldHandler('M');
  ENIGMA.controller.setPlugboardNField = getPlugboardFieldHandler('N');
  ENIGMA.controller.setPlugboardOField = getPlugboardFieldHandler('O');
  ENIGMA.controller.setPlugboardPField = getPlugboardFieldHandler('P');
  ENIGMA.controller.setPlugboardQField = getPlugboardFieldHandler('Q');
  ENIGMA.controller.setPlugboardRField = getPlugboardFieldHandler('R');
  ENIGMA.controller.setPlugboardSField = getPlugboardFieldHandler('S');
  ENIGMA.controller.setPlugboardTField = getPlugboardFieldHandler('T');
  ENIGMA.controller.setPlugboardUField = getPlugboardFieldHandler('U');
  ENIGMA.controller.setPlugboardVField = getPlugboardFieldHandler('V');
  ENIGMA.controller.setPlugboardWField = getPlugboardFieldHandler('W');
  ENIGMA.controller.setPlugboardXField = getPlugboardFieldHandler('X');
  ENIGMA.controller.setPlugboardYField = getPlugboardFieldHandler('Y');
  ENIGMA.controller.setPlugboardZField = getPlugboardFieldHandler('Z');

  /**
   * Changes the left rotor ring configuration to character and updates hash
   * tag.  Triggers 'hashchange' event that calls validateHashAndUpdateUI().
   * @param {string} character
   */
  ENIGMA.controller.setLeftRotorRingSetting = function (character) {
    if (alphabetic.test(character)) {
      enigmaMachine.setAllSettings(enigmaStateStack[0]);
      enigmaMachine.getLeftRotor().setRingSetting(character);
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }
  };

  /**
   * Changes the middle rotor ring setting to character and updates
   * hash tag.  Triggers 'hashchange' event that calls
   * validateHashAndUpdateUI().
   * @param {string} character
   */
  ENIGMA.controller.setMiddleRotorRingSetting = function (character) {
    if (alphabetic.test(character)) {
      enigmaMachine.setAllSettings(enigmaStateStack[0]);
      enigmaMachine.getMiddleRotor().setRingSetting(character);
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }
  };

  /**
   * Changes the right rotor ring setting to character and updates hash
   * tag.  Triggers 'hashchange' event that calls validateHashAndUpdateUI().
   * @param {string} character
   */
  ENIGMA.controller.setRightRotorRingSetting = function (character) {
    if (alphabetic.test(character)) {
      enigmaMachine.setAllSettings(enigmaStateStack[0]);
      enigmaMachine.getRightRotor().setRingSetting(character);
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }
  };

  /**
   * Changes the left rotor ground setting to character and updates hash
   * tag.  Triggers 'hashchange' event that calls validateHashAndUpdateUI().
   * @param {string} character
   */
  ENIGMA.controller.setLeftRotorGroundSetting = function (character) {
    if (alphabetic.test(character)) {
      enigmaMachine.setAllSettings(enigmaStateStack[0]);
      enigmaMachine.getLeftRotor().setGroundSetting(character);
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }
  };

  /**
   * Changes the middle rotor ground setting to character and updates hash
   * tag.  Triggers 'hashchange' event that calls validateHashAndUpdateUI().
   * @param {string} character
   */
  ENIGMA.controller.setMiddleRotorGroundSetting = function (character) {
    if (alphabetic.test(character)) {
      enigmaMachine.setAllSettings(enigmaStateStack[0]);
      enigmaMachine.getMiddleRotor().setGroundSetting(character);
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }
  };

  /**
   * Changes the right rotor ground setting to character and updates hash
   * tag.  Triggers 'hashchange' event that calls validateHashAndUpdateUI().
   * @param {string} character
   */
  ENIGMA.controller.setRightRotorGroundSetting = function (character) {
    if (alphabetic.test(character)) {
      enigmaMachine.setAllSettings(enigmaStateStack[0]);
      enigmaMachine.getRightRotor().setGroundSetting(character);
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }
  };

  /**
   * Randomizes configuration of enigma machine and updates hash tag.
   * Triggers 'hashchange' event that calls validateHashAndUpdateUI().
   */
  ENIGMA.controller.randomizeSettings = function () {
    enigmaMachine.swapReflector(ENIGMA.Reflector.getRandomly());

    enigmaMachine.swapRotor(enigmaMachine.getLeftRotor(),
      ENIGMA.Rotor.getRandomly());

    enigmaMachine.swapRotor(enigmaMachine.getMiddleRotor(),
      ENIGMA.Rotor.getRandomly());

    enigmaMachine.swapRotor(enigmaMachine.getRightRotor(),
      ENIGMA.Rotor.getRandomly());

    enigmaMachine.swapRotor(enigmaMachine.getRightRotor(),
      ENIGMA.Rotor.getRandomly());

    enigmaMachine.getLeftRotor().randomize();
    enigmaMachine.getMiddleRotor().randomize();
    enigmaMachine.getRightRotor().randomize();

    enigmaMachine.getPlugboard().randomize();

    window.location.hash = '#' + enigmaMachine.getAllSettings();
  };

  /**
   * Sends enigma settings to server.
   */
  ENIGMA.controller.sendSettings = function () {
    ENIGMA.chatClient.sendSettings(enigmaStateStack[0]);
  };

  /**
   * Types character on enigma machine and updates clearText string and
   * cipherText string.  White space is passed through unchanged and
   * non-alphabetic characters are ignored. Updates user interface.
   * @param {string} character
   */
  ENIGMA.controller.typeKey = function (character) {
    // pass through whitespace
    if (whiteSpace.test(character)) {
      clearText += character;
      cipherText += character;
      ui.clearTextField.val(clearText);
      ui.cipherTextField.val(cipherText);

    // encrypt alphabetic characters
    } else if (alphabetic.test(character)) {
      clearText += character.toLowerCase();
      cipherText += enigmaMachine.encipherLetter(character);
      enigmaStateStack.push(enigmaMachine.getAllSettings());

      ui.leftRotorGroundSettingField.val(
        enigmaMachine.getLeftRotor().getGroundSetting()
      );

      ui.middleRotorGroundSettingField.val(
        enigmaMachine.getMiddleRotor().getGroundSetting()
      );

      ui.rightRotorGroundSettingField.val(
        enigmaMachine.getRightRotor().getGroundSetting()
      );

      ui.clearTextField.val(clearText);
      ui.cipherTextField.val(cipherText);

    // handle backspace
    } else if (event.keyCode === 8) {

      if (clearText.length > 0) {

        // if last character was not a white space we need to reconfigure
        // enigma to last setting used and update UI.
        if (!whiteSpace.test(clearText.slice(-1))) {
          enigmaStateStack.pop();

          enigmaMachine.setAllSettings(
            enigmaStateStack[enigmaStateStack.length - 1]
          );

          ui.leftRotorGroundSettingField.val(
            enigmaMachine.getLeftRotor().getGroundSetting()
          );

          ui.middleRotorGroundSettingField.val(
            enigmaMachine.getMiddleRotor().getGroundSetting()
          );

          ui.rightRotorGroundSettingField.val(
            enigmaMachine.getRightRotor().getGroundSetting()
          );
        }

        // remove last character from text fields
        clearText = clearText.slice(0, -1);
        cipherText = cipherText.slice(0, -1);
        ui.clearTextField.val(clearText);
        ui.cipherTextField.val(cipherText);
      }
    }
  };

  /**
   * Enciphers newClearText and sets clearText and cipherText.  White space
   * is passed through unchanged and non-alphabetic characters are ignored.
   * Updates user interface.
   * @param {string} newClearText
   */
  ENIGMA.controller.setClearText = function (newClearText) {
    enigmaMachine.setAllSettings(enigmaStateStack[0]);
    enigmaStateStack.splice(1);
    clearText = newClearText.replace(notAlphaSpace, '').toLowerCase();
    cipherText = '';

    for (var i = 0; i < clearText.length; i += 1) {

      if (whiteSpace.test(clearText[i])) {
        cipherText += clearText[i];

      } else {
        cipherText += enigmaMachine.encipherLetter(clearText[i]);
        enigmaStateStack.push(enigmaMachine.getAllSettings());
      }
    }

    ui.clearTextField.val(clearText);
    ui.cipherTextField.val(cipherText);

    ui.leftRotorGroundSettingField.val(
      enigmaMachine.getLeftRotor().getGroundSetting()
    );

    ui.middleRotorGroundSettingField.val(
      enigmaMachine.getMiddleRotor().getGroundSetting()
    );

    ui.rightRotorGroundSettingField.val(
      enigmaMachine.getRightRotor().getGroundSetting()
    );
  };

  ENIGMA.controller.sendClearText = function () {
    ENIGMA.chatClient.sendClearText(clearText);
    enigmaStateStack.splice(1);
    enigmaMachine.setAllSettings(enigmaStateStack[0]);
    clearText = '';
    cipherText = '';

    ui.leftRotorGroundSettingField.val(
      enigmaMachine.getLeftRotor().getGroundSetting()
    );

    ui.middleRotorGroundSettingField.val(
      enigmaMachine.getMiddleRotor().getGroundSetting()
    );

    ui.rightRotorGroundSettingField.val(
      enigmaMachine.getRightRotor().getGroundSetting()
    );

    ui.clearTextField.val(clearText);
    ui.cipherTextField.val(cipherText);
  };

  ENIGMA.controller.sendCipherText = function () {
    ENIGMA.chatClient.sendCipherText(cipherText);
    enigmaStateStack.splice(1);
    enigmaMachine.setAllSettings(enigmaStateStack[0]);
    clearText = '';
    cipherText = '';

    ui.leftRotorGroundSettingField.val(
      enigmaMachine.getLeftRotor().getGroundSetting()
    );

    ui.middleRotorGroundSettingField.val(
      enigmaMachine.getMiddleRotor().getGroundSetting()
    );

    ui.rightRotorGroundSettingField.val(
      enigmaMachine.getRightRotor().getGroundSetting()
    );

    ui.clearTextField.val(clearText);
    ui.cipherTextField.val(cipherText);
  };

  ENIGMA.controller.setUI = function (newUI) {
    ui = newUI;
  };

  // initialize should be called when after DOM is loaded and ui property has
  // been set

  ENIGMA.controller.initialize = function () {
    $(window).bind('hashchange', ENIGMA.controller.validateHashAndUpdateUI);

    // read initial enigma settings from hash tag or initialize hash tag

    if (window.location.hash.length > 1) {
      ENIGMA.controller.validateHashAndUpdateUI();

    // otherwise set hash tag to default enigma settings
    } else {
      // this will trigger event to call validateHashAndUpdateUI()
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }

    // connect to chat server and setup network event handlers

    // initialize persona event handlers

    navigator.id.watch({
      loggedInUser: null,

      onlogin: function (assertion) {
        ENIGMA.chatClient.sendAssertion(assertion);
      },
      onlogout: function() {
        persona = null;
        emailHash = null;
        username = null;

        // hide user menu and show login button
        ui.login.show();
        ui.userPulldown.hide();
        ui.gravatarImg.hide();

        ENIGMA.chatClient.sendLogout();
      }
    });

    var setPersona = function (json) {
      persona = json.persona;
      emailHash = json.emailHash;
      var nameMatch = persona.email.match(/^([^@]*)@/);
      username = nameMatch ? nameMatch[1] : '';

      // hide login button and show user menu
      ui.login.hide();
      ui.username.text(username);
      ui.userPulldown.show();

      // load gravatar image if not loaded and display when download complete
      var src = 'http://www.gravatar.com/avatar/' + emailHash + '?s=36';

      if (ui.gravatarImg.attr('src') !== src) {
        ui.gravatarImg.attr('src', src);

        ui.gravatarImg.load(function () {
          ui.gravatarImg.show();
        });

      } else {
        ui.gravatarImg.show();
      }
    };

    ENIGMA.chatClient.connect({
      onopen: function () {
        ui.chatWindow.append(
          '<p><span class="chatStatus">connected</span></p>'
        );
      },

      onerror: function (error) {
        ui.chatWindow.append('<p>error ' + error + '</p>');
      },

      onmessage: function (json) {

        if (json.persona) {
          setPersona(json);
        }

        if (json.authenticationFailed) {
          navigator.id.logout();
        }

        if (json.server) {
          ui.chatWindow.append('<p><span class="server">' + json.server +
            '</span></p>');
        }

        if (json.clearText) {
          ui.chatWindow.append('<p>' + json.from +
            ': <span class="clearText">' + json.clearText + '</span></p>');
        }

        if (json.cipherText) {

          if (json.settings) {
            ui.chatWindow.append('<p><a href="#' + json.settings + '">' +
              json.from + '</a>: <span class="cipherText">' + json.cipherText +
              '</span></p>');

          } else {
            ui.chatWindow.append('<p>' + json.from +
              ': <span class="cipherText">' + json.cipherText + '</span></p>');
          }

        } else if (json.settings) {
          ui.chatWindow.append('<p><a href="#' + json.settings + '">' +
            json.from + '&apos;s settings</a></p>');
        }
      },

      onclose: function () {
        ui.chatWindow.append(
          '<p><span class="chatStatus">disconnected</span></p>');
      }
    });
  };
}());
