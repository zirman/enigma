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

    // set reflector items' click event handler

    ui.reflectorItems.click(function (event) {
      event.preventDefault();
      controller.setReflectorDropdown($(event.target).text());
    });

    // set rotor items' click event handlers

    ui.leftRotorItems.click(function (event) {
      event.preventDefault();
      controller.setLeftRotorDropdown($(event.target).text());
    });

    ui.middleRotorItems.click(function (event) {
      event.preventDefault();
      controller.setMiddleRotorDropdown($(event.target).text());
    });

    ui.rightRotorItems.click(function (event) {
      event.preventDefault();
      controller.setRightRotorDropdown($(event.target).text());
    });

    // set plugboard field keydown event handlers

    ui.plugboardAField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardAField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardBField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardBField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardCField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardCField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardDField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardDField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardEField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardEField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardFField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardFField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardGField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardGField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardHField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardHField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardIField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardIField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardJField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardJField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardKField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardKField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardLField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardLField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardMField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardMField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardNField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardNField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardOField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardOField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardPField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardPField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardQField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardQField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardRField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardRField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardSField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardSField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardTField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardTField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardUField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardUField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardVField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardVField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardWField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardWField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardXField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardXField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardYField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardYField(String.fromCharCode(event.keyCode));
    });

    ui.plugboardZField.keydown(function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setPlugboardZField(String.fromCharCode(event.keyCode));
    });

    // set rotor ring setting keydown event handlers

    ui.leftRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setLeftRotorRingSetting(String.fromCharCode(event.keyCode));
    });

    ui.middleRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setMiddleRotorRingSetting(String.fromCharCode(event.keyCode));
    });

    ui.rightRotorRingSettingField.keydown(function(event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setRightRotorRingSetting(String.fromCharCode(event.keyCode));
    });

    // set rotor ground setting keydown event handlers

    ui.leftRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setLeftRotorGroundSetting(String.fromCharCode(event.keyCode));
    });

    ui.middleRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      event.stopPropagation();

      controller.setMiddleRotorGroundSetting(
        String.fromCharCode(event.keyCode)
      );
    });

    ui.rightRotorGroundSettingField.keydown(function(event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setRightRotorGroundSetting(String.fromCharCode(event.keyCode));
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

    // set clear text field keydown event handler

    ui.clearTextField.keydown(function(event) {
      event.preventDefault();
      event.stopPropagation();
      controller.typeKey(String.fromCharCode(event.keyCode));
    });

    // set clear text field input event handler

    ui.clearTextField.bind('input', function (event) {
      event.preventDefault();
      event.stopPropagation();
      controller.setClearText(ui.clearTextField.val());
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
