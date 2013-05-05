/*jshint indent: 2, maxlen: 80, strict: true */

/*globals ENIGMA, $*/

/**
 * Immediate function that creates all event handlers and controller logic and
 * contains the model.
 */
(function () {
  'use strict';

  $(document).ready(function () {
    var ui = {
      login: $('#login'),

      userPulldown: $('#userPulldown'),
      username: $('#username'),
      logout: $('#logout'),

      gravatarImg: $('#gravatarImg'),

      chatWindow: $('#chatWindow'),

      reflectorDropdown: $('#reflectorDropdown'),
      reflectorItems: $('.reflectorItem'),

      leftRotorDropdown: $('#leftRotorDropdown'),
      leftRotorItems: $('.leftRotorItem'),

      middleRotorDropdown: $('#middleRotorDropdown'),
      middleRotorItems: $('.middleRotorItem'),

      rightRotorDropdown: $('#rightRotorDropdown'),
      rightRotorItems: $('.rightRotorItem'),

      leftRotorRingSettingField: $('#leftRotorRingSettingField'),
      middleRotorRingSettingField: $('#middleRotorRingSettingField'),
      rightRotorRingSettingField: $('#rightRotorRingSettingField'),

      leftRotorGroundSettingField: $('#leftRotorGroundSettingField'),
      middleRotorGroundSettingField: $('#middleRotorGroundSettingField'),
      rightRotorGroundSettingField: $('#rightRotorGroundSettingField'),

      randomizeSettingsButton: $('#randomizeSettingsButton'),
      sendSettingsButton: $('#sendSettingsButton'),

      plugboardAField: $('#plugboardAField'),
      plugboardBField: $('#plugboardBField'),
      plugboardCField: $('#plugboardCField'),
      plugboardDField: $('#plugboardDField'),
      plugboardEField: $('#plugboardEField'),
      plugboardFField: $('#plugboardFField'),
      plugboardGField: $('#plugboardGField'),
      plugboardHField: $('#plugboardHField'),
      plugboardIField: $('#plugboardIField'),
      plugboardJField: $('#plugboardJField'),
      plugboardKField: $('#plugboardKField'),
      plugboardLField: $('#plugboardLField'),
      plugboardMField: $('#plugboardMField'),
      plugboardNField: $('#plugboardNField'),
      plugboardOField: $('#plugboardOField'),
      plugboardPField: $('#plugboardPField'),
      plugboardQField: $('#plugboardQField'),
      plugboardRField: $('#plugboardRField'),
      plugboardSField: $('#plugboardSField'),
      plugboardTField: $('#plugboardTField'),
      plugboardUField: $('#plugboardUField'),
      plugboardVField: $('#plugboardVField'),
      plugboardWField: $('#plugboardWField'),
      plugboardXField: $('#plugboardXField'),
      plugboardYField: $('#plugboardYField'),
      plugboardZField: $('#plugboardZField'),

      clearTextField: $('#clearTextField'),
      sendClearTextButton: $('#sendClearTextButton'),

      cipherTextField: $('#cipherTextField'),
      sendCipherTextButton: $('#sendCipherTextButton')
    };

    //----------------------
    // setup event handlers
    //----------------------

    var controller = ENIGMA.controller;
    controller.setUI(ui);
    controller.initialize(ui);

    // set login event handler

    ui.login.click(function () {
      event.preventDefault();
      controller.login();
    });

    // set logout event handler

    ui.logout.click(function () {
      event.preventDefault();
      controller.logout();
    });

    // set reflector items' click event handler

    ui.reflectorItems.click(function (event) {
      event.preventDefault();
      controller.setReflectorDropdown($(this).text());
    });

    // set rotor items' click event handlers

    ui.leftRotorItems.click(function (event) {
      event.preventDefault();
      controller.setLeftRotorDropdown($(this).text());
    });

    ui.middleRotorItems.click(function (event) {
      event.preventDefault();
      controller.setMiddleRotorDropdown($(this).text());
    });

    ui.rightRotorItems.click(function (event) {
      event.preventDefault();
      controller.setRightRotorDropdown($(this).text());
    });

    // set rotor ring setting keydown and input event handlers

    var focusEventHandler = function () {
      this.select();
      return false;
    };

    var mouseupEventHandler = function () {
      return false;
    };

    var keydownEventHandler = function() {
      var character = String.fromCharCode(event.keyCode).toUpperCase();

      if (/[A-Z]/.test(character)) {
        var field = $(this);
        field.val(character);
        field.select();
      }

      return false;
    };

    var inputEventHandler = function () {
      var target = $(this);
      var matches = /([A-Z])/.exec(target.val().toUpperCase());
      var character;

      if (matches.length < 2) {
        character = 'A';

      } else {
        character = matches[1];
      }

      target.val(character);
      target.select();
      return false;
    };

    var singleTextField = function (textField) {
      textField.focus(focusEventHandler);
      textField.mouseup(mouseupEventHandler);
      textField.keydown(keydownEventHandler);
      textField.bind('input', inputEventHandler);
    };

    singleTextField(ui.leftRotorRingSettingField);

    ui.leftRotorRingSettingField.focusout(function () {
      controller.setLeftRotorRingSetting($(this).val());
      return false;
    });

    singleTextField(ui.middleRotorRingSettingField);

    ui.middleRotorRingSettingField.focusout(function () {
      controller.setMiddleRotorRingSetting($(this).val());
      return false;
    });

    singleTextField(ui.rightRotorRingSettingField);

    ui.rightRotorRingSettingField.focusout(function () {
      controller.setRightRotorRingSetting($(this).val());
      return false;
    });

    // set rotor ground setting focusout and input event handlers

    singleTextField(ui.leftRotorGroundSettingField);

    ui.leftRotorGroundSettingField.focusout(function () {
      controller.setLeftRotorGroundSetting($(this).val());
      return false;
    });

    singleTextField(ui.middleRotorGroundSettingField);

    ui.middleRotorGroundSettingField.focusout(function () {
      controller.setMiddleRotorGroundSetting($(this).val());
      return false;
    });

    singleTextField(ui.rightRotorGroundSettingField);

    ui.rightRotorGroundSettingField.focusout(function () {
      controller.setRightRotorGroundSetting($(this).val());
      return false;
    });

    // set randomize button click event handler

    ui.randomizeSettingsButton.click(function() {
      event.preventDefault();
      controller.randomizeSettings();
    });

    // set send button click event handler

    ui.sendSettingsButton.click(function() {
      event.preventDefault();
      controller.sendSettings();
    });

    // set plugboard field keydown event handlers

    singleTextField(ui.plugboardAField);

    ui.plugboardAField.focusout(function () {
      controller.setPlugboardAField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardBField);

    ui.plugboardBField.focusout(function () {
      controller.setPlugboardBField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardCField);

    ui.plugboardCField.focusout(function () {
      controller.setPlugboardCField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardDField);

    ui.plugboardDField.focusout(function () {
      controller.setPlugboardDField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardEField);

    ui.plugboardEField.focusout(function () {
      controller.setPlugboardEField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardFField);

    ui.plugboardFField.focusout(function () {
      controller.setPlugboardFField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardGField);

    ui.plugboardGField.focusout(function () {
      controller.setPlugboardGField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardHField);

    ui.plugboardHField.focusout(function () {
      controller.setPlugboardHField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardIField);

    ui.plugboardIField.focusout(function () {
      controller.setPlugboardIField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardJField);

    ui.plugboardJField.focusout(function () {
      controller.setPlugboardJField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardKField);

    ui.plugboardKField.focusout(function () {
      controller.setPlugboardKField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardLField);

    ui.plugboardLField.focusout(function () {
      controller.setPlugboardLField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardMField);

    ui.plugboardMField.focusout(function () {
      controller.setPlugboardMField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardNField);

    ui.plugboardNField.focusout(function () {
      controller.setPlugboardNField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardOField);

    ui.plugboardOField.focusout(function () {
      controller.setPlugboardOField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardPField);

    ui.plugboardPField.focusout(function () {
      controller.setPlugboardPField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardQField);

    ui.plugboardQField.focusout(function () {
      controller.setPlugboardQField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardRField);

    ui.plugboardRField.focusout(function () {
      controller.setPlugboardRField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardSField);

    ui.plugboardSField.focusout(function () {
      controller.setPlugboardSField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardTField);

    ui.plugboardTField.focusout(function () {
      controller.setPlugboardTField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardUField);

    ui.plugboardUField.focusout(function () {
      controller.setPlugboardUField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardVField);

    ui.plugboardVField.focusout(function () {
      controller.setPlugboardVField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardWField);

    ui.plugboardWField.focusout(function () {
      controller.setPlugboardWField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardXField);

    ui.plugboardXField.focusout(function () {
      controller.setPlugboardXField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardYField);

    ui.plugboardYField.focusout(function () {
      controller.setPlugboardYField($(this).val());
      return false;
    });

    singleTextField(ui.plugboardZField);

    ui.plugboardZField.focusout(function () {
      controller.setPlugboardZField($(this).val());
      return false;
    });

    // set clear text field keydown event handler

    ui.clearTextField.keydown(function(event) {
      controller.typeKey(String.fromCharCode(event.keyCode));
      return false;
    });

    // set clear text field input event handler

    ui.clearTextField.bind('input', function () {
      controller.setClearText(ui.clearTextField.val());
      return false;
    });

    // set send clear text button click event handler

    ui.sendClearTextButton.click(function (event) {
      event.preventDefault();
      controller.sendClearText();
    });

    // set send cipher text button click event handler

    ui.sendCipherTextButton.click(function (event) {
      event.preventDefault();
      controller.sendCipherText();
    });
  });
}());
