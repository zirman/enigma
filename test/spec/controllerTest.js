/*jshint indent: 2, unused: false*/

/*global describe, it, $, ENIGMA, expect, KeyboardEvent, beforeEach*/

(function () {
  'use strict';

  describe('ENIGMA', function () {
    it('global ENIGMA should have "controller" module', function () {
      expect(ENIGMA).to.have.property('controller');
    });

    ENIGMA.controller.setUI({
      chatWindow: $(document.createElement('div')),

      reflectorDropdown: $(document.createElement('div')),
      reflectorItems: $(document.createElement('div')),

      leftRotorDropdown: $(document.createElement('div')),
      leftRotorItems: $(document.createElement('div')),

      middleRotorDropdown: $(document.createElement('div')),
      middleRotorItems: $(document.createElement('div')),

      rightRotorDropdown: $(document.createElement('div')),
      rightRotorItems: $(document.createElement('div')),

      leftRotorRingSettingField: $(document.createElement('div')),
      middleRotorRingSettingField: $(document.createElement('div')),
      rightRotorRingSettingField: $(document.createElement('div')),

      leftRotorGroundSettingField: $(document.createElement('div')),
      middleRotorGroundSettingField: $(document.createElement('div')),
      rightRotorGroundSettingField: $(document.createElement('div')),

      randomizeSettingsButton: $(document.createElement('div')),
      sendSettingsButton: $(document.createElement('div')),

      plugboardAField: $(document.createElement('div')),
      plugboardBField: $(document.createElement('div')),
      plugboardCField: $(document.createElement('div')),
      plugboardDField: $(document.createElement('div')),
      plugboardEField: $(document.createElement('div')),
      plugboardFField: $(document.createElement('div')),
      plugboardGField: $(document.createElement('div')),
      plugboardHField: $(document.createElement('div')),
      plugboardIField: $(document.createElement('div')),
      plugboardJField: $(document.createElement('div')),
      plugboardKField: $(document.createElement('div')),
      plugboardLField: $(document.createElement('div')),
      plugboardMField: $(document.createElement('div')),
      plugboardNField: $(document.createElement('div')),
      plugboardOField: $(document.createElement('div')),
      plugboardPField: $(document.createElement('div')),
      plugboardQField: $(document.createElement('div')),
      plugboardRField: $(document.createElement('div')),
      plugboardSField: $(document.createElement('div')),
      plugboardTField: $(document.createElement('div')),
      plugboardUField: $(document.createElement('div')),
      plugboardVField: $(document.createElement('div')),
      plugboardWField: $(document.createElement('div')),
      plugboardXField: $(document.createElement('div')),
      plugboardYField: $(document.createElement('div')),
      plugboardZField: $(document.createElement('div')),

      clearTextField: $(document.createElement('div')),
      sendClearTextButton: $(document.createElement('div')),

      cipherTextField: $(document.createElement('div')),
      sendCipherTextButton: $(document.createElement('div'))
    });

    describe('#getEnigmaMachine()', function () {

      it('should respond to getEnigmaMachine', function () {
        expect(ENIGMA.controller).to.respondTo('getEnigmaMachine');
      });

      it('should return an EnigmaMachine', function () {
        expect(ENIGMA.controller.getEnigmaMachine()).to.be.an.instanceOf(ENIGMA.EnigmaMachine);
      });
    });
  });
})();
