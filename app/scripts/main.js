/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

/*globals ENIGMA, $*/

(function () {
  'use strict';

  $(document).ready(function () {
    var enigmaMachine = new ENIGMA.EnigmaMachine();
    var clearText = '';
    var cipherText = '';

    var whiteSpace = /\s/;
    var alphabetic = /[a-zA-Z]/;

    var chatWindow = $('#chatWindow');

    var leftRotorDropdown = $('#leftRotorDropdown');
    var middleRotorDropdown = $('#middleRotorDropdown');
    var rightRotorDropdown = $('#rightRotorDropdown');

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

    var enigmaStateStack;

    // this function reads and validates the current #hash tag and updates
    // the user interface
    var validateHashSettings = function () {
      var hashSettings = window.location.hash.slice(1);
      enigmaMachine.setAllSettings(hashSettings);
      var validHashSettings = enigmaMachine.getAllSettings();

      if (validHashSettings !== hashSettings) {
        //window.history.back();
        window.location.hash = '#' + validHashSettings;
      }

      enigmaStateStack = [window.location.hash];

      // update user interface

      $('#reflectorDropdown').text(enigmaMachine.getReflector().getLabel());

      var leftRotor = enigmaMachine.getLeftRotor();
      var middleRotor = enigmaMachine.getMiddleRotor();
      var rightRotor = enigmaMachine.getRightRotor();

      leftRotorDropdown.text(leftRotor.getLabel());
      middleRotorDropdown.text(middleRotor.getLabel());
      rightRotorDropdown.text(rightRotor.getLabel());

      leftRotorRingSettingField.val(leftRotor.getRingSetting());
      middleRotorRingSettingField.val(middleRotor.getRingSetting());
      rightRotorRingSettingField.val(rightRotor.getRingSetting());

      leftRotorGroundSettingField.val(leftRotor.getGroundSetting());
      middleRotorGroundSettingField.val(middleRotor.getGroundSetting());
      rightRotorGroundSettingField.val(rightRotor.getGroundSetting());

      var plugboardMapping = enigmaMachine.getPlugboard().getMapping();
      plugboardAField.val(plugboardMapping.A);
      plugboardBField.val(plugboardMapping.B);
      plugboardCField.val(plugboardMapping.C);
      plugboardDField.val(plugboardMapping.D);
      plugboardEField.val(plugboardMapping.E);
      plugboardFField.val(plugboardMapping.F);
      plugboardGField.val(plugboardMapping.G);
      plugboardHField.val(plugboardMapping.H);
      plugboardIField.val(plugboardMapping.I);
      plugboardJField.val(plugboardMapping.J);
      plugboardKField.val(plugboardMapping.K);
      plugboardLField.val(plugboardMapping.L);
      plugboardMField.val(plugboardMapping.M);
      plugboardNField.val(plugboardMapping.N);
      plugboardOField.val(plugboardMapping.O);
      plugboardPField.val(plugboardMapping.P);
      plugboardQField.val(plugboardMapping.Q);
      plugboardRField.val(plugboardMapping.R);
      plugboardSField.val(plugboardMapping.S);
      plugboardTField.val(plugboardMapping.T);
      plugboardUField.val(plugboardMapping.U);
      plugboardVField.val(plugboardMapping.V);
      plugboardWField.val(plugboardMapping.W);
      plugboardXField.val(plugboardMapping.X);
      plugboardYField.val(plugboardMapping.Y);
      plugboardZField.val(plugboardMapping.Z);
    };

    //-------------------------------
    // setup initial enigma settings
    //-------------------------------

    if (window.location.hash.length > 1) {
      validateHashSettings();

    // otherwise set hash tag to default enigma settings
    } else {
      // this will trigger event to call validateHashSettings
      window.location.hash = '#' + enigmaMachine.getAllSettings();
    }

    //----------------------
    // setup event handlers
    //----------------------

    var updateHashTag = function () {
      window.location.hash = '#' + enigmaMachine.getAllSettings();
      enigmaStateStack = [window.location.hash];
      clearTextField.val(clearText = '');
      cipherTextField.val(cipherText = '');
    };

    $('.reflectorItem').click(function () {
      var label = $(event.target).text();
      var reflector = enigmaMachine.getReflector();

      if (reflector.getLabel() !== label) {
        enigmaMachine.setAllSettings(window.location.hash.slice(1));
        enigmaMachine.swapReflector(ENIGMA.Reflector.withLabel(label));
        updateHashTag();
      }
    });

    var rotorPulldownHandler = function (getRotor) {

      return function(event) {
        var label = $(event.target).text();
        var rotor = getRotor();

        if (rotor.getLabel() !== label) {
          enigmaMachine.setAllSettings(window.location.hash.slice(1));
          enigmaMachine.swapRotor(rotor, ENIGMA.Rotor.withLabel(label));
          updateHashTag();
        }
      };
    };

    $('.leftRotorItem').click(rotorPulldownHandler(enigmaMachine.getLeftRotor));

    $('.middleRotorItem').click(rotorPulldownHandler(
      enigmaMachine.getMiddleRotor));

    $('.rightRotorItem').click(rotorPulldownHandler(
      enigmaMachine.getRightRotor));

    var plugboardFieldHandler = function (letter) {

      return function (event) {
        event.preventDefault();
        var character = String.fromCharCode(event.keyCode);

        if (alphabetic.test(character)) {
          enigmaMachine.setAllSettings(window.location.hash.slice(1));
          var plugboard = enigmaMachine.getPlugboard();
          plugboard.clearLetter(letter);
          plugboard.setLetterSwap(letter, character);
          updateHashTag();
        }
      };
    };

    plugboardAField.keydown(plugboardFieldHandler('A'));
    plugboardBField.keydown(plugboardFieldHandler('B'));
    plugboardCField.keydown(plugboardFieldHandler('C'));
    plugboardDField.keydown(plugboardFieldHandler('D'));
    plugboardEField.keydown(plugboardFieldHandler('E'));
    plugboardFField.keydown(plugboardFieldHandler('F'));
    plugboardGField.keydown(plugboardFieldHandler('G'));
    plugboardHField.keydown(plugboardFieldHandler('H'));
    plugboardIField.keydown(plugboardFieldHandler('I'));
    plugboardJField.keydown(plugboardFieldHandler('J'));
    plugboardKField.keydown(plugboardFieldHandler('K'));
    plugboardLField.keydown(plugboardFieldHandler('L'));
    plugboardMField.keydown(plugboardFieldHandler('M'));
    plugboardNField.keydown(plugboardFieldHandler('N'));
    plugboardOField.keydown(plugboardFieldHandler('O'));
    plugboardPField.keydown(plugboardFieldHandler('P'));
    plugboardQField.keydown(plugboardFieldHandler('Q'));
    plugboardRField.keydown(plugboardFieldHandler('R'));
    plugboardSField.keydown(plugboardFieldHandler('S'));
    plugboardTField.keydown(plugboardFieldHandler('T'));
    plugboardUField.keydown(plugboardFieldHandler('U'));
    plugboardVField.keydown(plugboardFieldHandler('V'));
    plugboardWField.keydown(plugboardFieldHandler('W'));
    plugboardXField.keydown(plugboardFieldHandler('X'));
    plugboardYField.keydown(plugboardFieldHandler('Y'));
    plugboardZField.keydown(plugboardFieldHandler('Z'));

    leftRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.setAllSettings(window.location.hash.slice(1));
        enigmaMachine.getLeftRotor().setRingSetting(character);
        updateHashTag();
      }
    });

    middleRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.setAllSettings(window.location.hash.slice(1));
        enigmaMachine.getMiddleRotor().setRingSetting(character);
        updateHashTag();
      }
    });

    rightRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.setAllSettings(window.location.hash.slice(1));
        enigmaMachine.getRightRotor().setRingSetting(character);
        updateHashTag();
      }
    });

    leftRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.setAllSettings(window.location.hash.slice(1));
        enigmaMachine.getLeftRotor().setGroundSetting(character);
        updateHashTag();
      }
    });

    middleRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.setAllSettings(window.location.hash.slice(1));
        enigmaMachine.getMiddleRotor().setGroundSetting(character);
        updateHashTag();
      }
    });

    rightRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      var character = String.fromCharCode(event.keyCode);

      if (alphabetic.test(character)) {
        enigmaMachine.setAllSettings(window.location.hash.slice(1));
        enigmaMachine.getRightRotor().setGroundSetting(character);
        updateHashTag();
      }
    });

    randomizeSettingsButton.click(function() {
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

      updateHashTag();
    });

    sendSettingsButton.click(function() {
      ENIGMA.chatClient.sendSettings(window.location.hash.slice(1));
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
        cipherText += enigmaMachine.encipherLetter(character);
        enigmaStateStack.push('#' + enigmaMachine.getAllSettings());

        leftRotorGroundSettingField.val(
          enigmaMachine.getLeftRotor().getGroundSetting()
        );

        middleRotorGroundSettingField.val(
          enigmaMachine.getMiddleRotor().getGroundSetting()
        );

        rightRotorGroundSettingField.val(
          enigmaMachine.getRightRotor().getGroundSetting()
        );

        clearTextField.val(clearText);
        cipherTextField.val(cipherText);

      // handle backspace
      } else if (event.keyCode === 8) {

        if (clearText.length > 0) {

          if (!whiteSpace.test(clearText.slice(-1))) {
            enigmaStateStack.pop();
            enigmaMachine.setAllSettings(enigmaStateStack[enigmaStateStack.
              length - 1].slice(1));

            leftRotorGroundSettingField.val(
              enigmaMachine.getLeftRotor().getGroundSetting()
            );

            middleRotorGroundSettingField.val(
              enigmaMachine.getMiddleRotor().getGroundSetting()
            );

            rightRotorGroundSettingField.val(
              enigmaMachine.getRightRotor().getGroundSetting()
            );
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
      enigmaStateStack = [window.location.hash];
      enigmaMachine.setAllSettings(window.location.hash.slice(1));

      leftRotorGroundSettingField.val(
        enigmaMachine.getLeftRotor().getGroundSetting()
      );

      middleRotorGroundSettingField.val(
        enigmaMachine.getMiddleRotor().getGroundSetting()
      );

      rightRotorGroundSettingField.val(
        enigmaMachine.getRightRotor().getGroundSetting()
      );

      clearTextField.val(clearText = '');
      cipherTextField.val(cipherText = '');
    });

    $('#sendCipherTextButton').click(function () {
      ENIGMA.chatClient.sendCipherText(cipherText);

      enigmaStateStack = [window.location.hash];
      enigmaMachine.setAllSettings(window.location.hash.slice(1));

      leftRotorGroundSettingField.val(
        enigmaMachine.getLeftRotor().getGroundSetting()
      );

      middleRotorGroundSettingField.val(
        enigmaMachine.getMiddleRotor().getGroundSetting()
      );

      rightRotorGroundSettingField.val(
        enigmaMachine.getRightRotor().getGroundSetting()
      );

      clearTextField.val(clearText = '');
      cipherTextField.val(cipherText = '');
    });

    // connect to chat server and setup event handlers
    ENIGMA.chatClient.connect({

      onopen: function () {
        chatWindow.append('<p><span class="chatStatus">connected</span></p>');
      },

      onerror: function (error) {
        chatWindow.append('<p>error ' + error + '</p>');
      },

      onmessage: function (json) {

        if (json.server) {
          chatWindow.append('<p><span class="server">' + json.server +
            '</span></p>');
        }

        if (json.clearText) {
          chatWindow.append('<p>' + json.from + ': <span class="clearText">' +
            json.clearText + '</span></p>');
        }

        if (json.cipherText) {

          if (json.settings) {
            chatWindow.append('<p><a href="#' + json.settings + '">' +
              json.from + '</a>: <span class="cipherText">' + json.cipherText +
              '</span></p>');

          } else {
            chatWindow.append('<p>' + json.from +
              ': <span class="cipherText">' + json.cipherText + '</span></p>');
          }

        } else if (json.settings) {
          chatWindow.append('<p><a href="#' + json.settings + '">' + json.from +
            '\'s settings</a></p>');
        }
      },

      onclose: function () {
        chatWindow.append(
          '<p><span class="chatStatus">disconnected</span></p>');
      }
    });
  });
}());
