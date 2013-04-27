/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

/*globals ENIGMA, $*/

(function () {
  'use strict';

  var EnigmaController;
  EnigmaController = ENIGMA.EnigmaController = {};

  var enigmaMachine = new ENIGMA.EnigmaMachine();
  var enigmaView = new ENIGMA.EnigmaView();

  var clearText = '';
  var cipherText = '';

  EnigmaController.clearAll = function () {
    clearText = '';
    cipherText = '';
    enigmaView.setClearText(clearText);
    enigmaView.setCipherText(cipherText);
  };

  EnigmaController.keyboardEvent = function (event) {
    var keyCode = event.key.charCodeAt(0);

    if (keyCode >= 'a'.charCodeAt(0) || keyCode <= 'z'.charCodeAt(0)) {
      clearText += event.key;
      cipherText += enigmaMachine.encipherLetter(event.key);
      enigmaView.setClearText(clearText);
      enigmaView.setCipherText(cipherText);
    }
  };

  EnigmaController.getEnigmaMachine = function () {
    return enigmaMachine;
  };

  EnigmaController.setEnigmaMachine = function (newEnigmaMachine) {
    enigmaMachine = newEnigmaMachine;
  };

  EnigmaController.getEnigmaView = function () {
    return enigmaView;
  };

  EnigmaController.setEnigmaView = function (newEnigmaView) {
    enigmaView = newEnigmaView;
  };

  $(document).ready(function () {
    var whiteSpace = /\s/;
    var alphabetic = /[a-zA-Z]/;

    var chatWindow = $('#chatWindow');

    var leftRotorRingSettingField = $('#leftRotorRingSettingField');
    var middleRotorRingSettingField = $('#middleRotorRingSettingField');
    var rightRotorRingSettingField = $('#rightRotorRingSettingField');

    var leftRotorGroundSettingField = $('#leftRotorGroundSettingField');
    var middleRotorGroundSettingField = $('#middleRotorGroundSettingField');
    var rightRotorGroundSettingField = $('#rightRotorGroundSettingField');

    var randomizeSettingsButton = $('#randomizeSettingsButton');
    var sendSettingsButton = $('#sendSettingsButton');

    var plugboardAField = $('#plugboardAField');
    var plugboardBField = $('#plugboardBField');
    var plugboardCField = $('#plugboardCField');
    var plugboardDField = $('#plugboardDField');
    var plugboardEField = $('#plugboardEField');
    var plugboardFField = $('#plugboardFField');
    var plugboardGField = $('#plugboardGField');
    var plugboardHField = $('#plugboardHField');
    var plugboardIField = $('#plugboardIField');
    var plugboardJField = $('#plugboardJField');
    var plugboardKField = $('#plugboardKField');
    var plugboardLField = $('#plugboardLField');
    var plugboardMField = $('#plugboardMField');
    var plugboardNField = $('#plugboardNField');
    var plugboardOField = $('#plugboardOField');
    var plugboardPField = $('#plugboardPField');
    var plugboardQField = $('#plugboardQField');
    var plugboardRField = $('#plugboardRField');
    var plugboardSField = $('#plugboardSField');
    var plugboardTField = $('#plugboardTField');
    var plugboardUField = $('#plugboardUField');
    var plugboardVField = $('#plugboardVField');
    var plugboardWField = $('#plugboardWField');
    var plugboardXField = $('#plugboardXField');
    var plugboardYField = $('#plugboardYField');
    var plugboardZField = $('#plugboardZField');

    var clearTextField = $('#clearTextField');
    var cipherTextField = $('#cipherTextField');

    var hashStack = [];

    var validateHashSettings = function () {
      var hashSettings = window.location.hash.slice(1);
      enigmaMachine.setAllSettings(hashSettings);
      var allSettings = enigmaMachine.getAllSettings();

      if (allSettings !== hashSettings) {
        hashStack.pop();
        window.location.hash = '#' + allSettings;
        hashStack.push(window.location.hash);
      }

      // update user interface

      leftRotorRingSettingField.val(
        enigmaMachine.getLeftRotor().getRingSetting().toUpperCase()
      );

      middleRotorRingSettingField.val(
        enigmaMachine.getMiddleRotor().getRingSetting().toUpperCase()
      );

      rightRotorRingSettingField.val(
        enigmaMachine.getRightRotor().getRingSetting().toUpperCase()
      );

      leftRotorGroundSettingField.val(
        enigmaMachine.getLeftRotor().getGroundSetting().toUpperCase()
      );

      middleRotorGroundSettingField.val(
        enigmaMachine.getMiddleRotor().getGroundSetting().toUpperCase()
      );

      rightRotorGroundSettingField.val(
        enigmaMachine.getRightRotor().getGroundSetting().toUpperCase()
      );

      var plugboardMapping = enigmaMachine.getPlugboard().getMapping();
      plugboardAField.val(plugboardMapping.a.toUpperCase());
      plugboardBField.val(plugboardMapping.b.toUpperCase());
      plugboardCField.val(plugboardMapping.c.toUpperCase());
      plugboardDField.val(plugboardMapping.d.toUpperCase());
      plugboardEField.val(plugboardMapping.e.toUpperCase());
      plugboardFField.val(plugboardMapping.f.toUpperCase());
      plugboardGField.val(plugboardMapping.g.toUpperCase());
      plugboardHField.val(plugboardMapping.h.toUpperCase());
      plugboardIField.val(plugboardMapping.i.toUpperCase());
      plugboardJField.val(plugboardMapping.j.toUpperCase());
      plugboardKField.val(plugboardMapping.k.toUpperCase());
      plugboardLField.val(plugboardMapping.l.toUpperCase());
      plugboardMField.val(plugboardMapping.m.toUpperCase());
      plugboardNField.val(plugboardMapping.n.toUpperCase());
      plugboardOField.val(plugboardMapping.o.toUpperCase());
      plugboardPField.val(plugboardMapping.p.toUpperCase());
      plugboardQField.val(plugboardMapping.q.toUpperCase());
      plugboardRField.val(plugboardMapping.r.toUpperCase());
      plugboardSField.val(plugboardMapping.s.toUpperCase());
      plugboardTField.val(plugboardMapping.t.toUpperCase());
      plugboardUField.val(plugboardMapping.u.toUpperCase());
      plugboardVField.val(plugboardMapping.v.toUpperCase());
      plugboardWField.val(plugboardMapping.w.toUpperCase());
      plugboardXField.val(plugboardMapping.x.toUpperCase());
      plugboardYField.val(plugboardMapping.y.toUpperCase());
      plugboardZField.val(plugboardMapping.z.toUpperCase());
    };

    // get hash settings if they exist
    if (window.location.hash.length > 1) {
      hashStack.push(window.location.hash);
      validateHashSettings();

    // otherwise set hash settings to current enigma settings
    } else {
      window.location.hash = '#' + enigmaMachine.getAllSettings();
      hashStack.push(window.location.hash);
    }

    leftRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.getLeftRotor().setRingSetting(character.toLowerCase());
        window.location.hash = '#' + enigmaMachine.getAllSettings();
        hashStack = [window.location.hash];
        clearTextField.val(clearText = '');
        cipherTextField.val(cipherText = '');
      }
    });

    middleRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.getMiddleRotor().setRingSetting(character.toLowerCase());
        window.location.hash = '#' + enigmaMachine.getAllSettings();
        hashStack = [window.location.hash];
        clearTextField.val(clearText = '');
        cipherTextField.val(cipherText = '');
      }
    });

    rightRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.getRightRotor().setRingSetting(character.toLowerCase());
        window.location.hash = '#' + enigmaMachine.getAllSettings();
        hashStack = [window.location.hash];
        clearTextField.val(clearText = '');
        cipherTextField.val(cipherText = '');
      }
    });

    leftRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.getLeftRotor().setGroundSetting(character.toLowerCase());
        window.location.hash = '#' + enigmaMachine.getAllSettings();
        hashStack = [window.location.hash];
        clearTextField.val(clearText = '');
        cipherTextField.val(cipherText = '');
      }
    });

    middleRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.getMiddleRotor().setGroundSetting(character.
          toLowerCase());

        window.location.hash = '#' + enigmaMachine.getAllSettings();
        hashStack = [window.location.hash];
        clearTextField.val(clearText = '');
        cipherTextField.val(cipherText = '');
      }
    });

    rightRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.getRightRotor().setGroundSetting(character.toLowerCase());
        window.location.hash = '#' + enigmaMachine.getAllSettings();
        hashStack = [window.location.hash];
        clearTextField.val(clearText = '');
        cipherTextField.val(cipherText = '');
      }
    });

    randomizeSettingsButton.click(function(event) {
      console.log(event);
    });

    sendSettingsButton.click(function(event) {
      console.log(event);
    });

    clearTextField.keydown(function(event) {
      var character = String.fromCharCode(event.keyCode);

      event.preventDefault();

      // pass through whitespace
      if (whiteSpace.test(character)) {
        clearText += character;
        cipherText += character;
        clearTextField.val(clearText);
        cipherTextField.val(cipherText);

      // encrypt alphabetic characters
      } else if (alphabetic.test(character)) {
        clearText += character.toLowerCase();
        cipherText += enigmaMachine.encipherLetter(character).toUpperCase();
        window.location.hash = '#' + enigmaMachine.getAllSettings();
        hashStack.push(window.location.hash);
        clearTextField.val(clearText);
        cipherTextField.val(cipherText);

      // handle backspace
      } else if (event.keyCode === 8) {

        if (clearText.length > 0) {

          // go back one in history which updates hash and enigma state
          if (!whiteSpace.test(clearText.slice(-1))) {
            hashStack.pop();
            window.location.hash = hashStack[hashStack.length - 1];
          }

          // remove last character
          clearText = clearText.slice(0, -1);
          cipherText = cipherText.slice(0, -1);
          clearTextField.val(clearText);
          cipherTextField.val(cipherText);
        }
      }
    });

    $(window).bind('hashchange', validateHashSettings);

    $('#sendClearTextButton').click(function () {
      ENIGMA.chatClient.sendClearText(clearText);
      window.location.hash = hashStack[0];
      hashStack = [hashStack[0]];
      clearTextField.val(clearText = '');
      cipherTextField.val(cipherText = '');
    });

    $('#sendCipherTextButton').click(function () {
      ENIGMA.chatClient.sendCipherText(cipherText);
      window.location.hash = hashStack[0];
      hashStack = [hashStack[0]];
      clearTextField.val(clearText = '');
      cipherTextField.val(cipherText = '');
    });

    $('.reflectorItem').click(function () {
      var label = $(event.target).text();
      var reflector = enigmaMachine.getReflector();

      if (reflector.getLabel() !== label) {
        enigmaMachine.swapReflector(ENIGMA.Reflector.withLabel(label));
        window.location.hash = '#' + enigmaMachine.getAllSettings();
        hashStack = [window.location.hash];
        $('#reflectorDropdown').text(label);
        clearTextField.val(clearText = '');
        cipherTextField.val(cipherText = '');
      }
    });

    var getRotorPulldownHandler = function (dropdown, getter) {

      return function(event) {
        var label = $(event.target).text();
        var rotor = getter();

        if (rotor.getLabel() !== label) {
          enigmaMachine.swapRotor(rotor, ENIGMA.Rotor.withLabel(label));
          window.location.hash = '#' + enigmaMachine.getAllSettings();
          hashStack = [window.location.hash];
          dropdown.text(label);
          clearTextField.val(clearText = '');
          cipherTextField.val(cipherText = '');
        }
      };
    };

    $('.leftRotorItem').click(getRotorPulldownHandler($('#leftRotorDropdown'),
      enigmaMachine.getLeftRotor));

    $('.middleRotorItem').click(getRotorPulldownHandler(
      $('#middleRotorDropdown'), enigmaMachine.getMiddleRotor));

    $('.rightRotorItem').click(getRotorPulldownHandler($('#rightRotorDropdown'),
      enigmaMachine.getRightRotor));

    // connect to chat server and setup event handlers
    ENIGMA.chatClient.connect({

      onopen: function () {
        chatWindow.append('<p>connected</p>');
      },

      onerror: function (error) {
        chatWindow.append('<p>error ' + error + '</p>');
      },

      onmessage: function (json) {
        console.log(json);

        if (json.server) {
          chatWindow.append('<p><span class="server">' + json.server +
            '</span></p>');
        }

        if (json.clearText) {
          chatWindow.append('<p>' + json.from + ': <span class="clearText">' +
            json.clearText.toLowerCase() + '</span></p>');
        }

        if (json.cipherText) {
          chatWindow.append('<p>' + json.from + ': <span class="cipherText">' +
            json.cipherText.toUpperCase() + '</span></p>');
        }
      },

      onclose: function () {
        chatWindow.append('<p>disconnected</p>');
      }
    });
  });
}());
