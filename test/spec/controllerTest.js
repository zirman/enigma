/*jshint indent: 2, unused: false*/

/*global describe, it, ENIGMA, expect, KeyboardEvent, beforeEach*/
(function () {
  'use strict';

  describe('ENIGMA.EnigmaController', function () {

    it('should respond to EnigmaController', function () {
      expect(ENIGMA).to.respondTo('EnigmaController');
    });

    var enigmaController = new ENIGMA.EnigmaController();

    describe('#getEnigmaMachine()', function () {

      it('should respond to getEnigmaMachine', function () {
        expect(enigmaController).to.respondTo('getEnigmaMachine');
      });

      it('should return an EnigmaMachine', function () {
        expect(enigmaController.getEnigmaMachine()).to.be.an.instanceOf(ENIGMA.EnigmaMachine);
      });
    });

    describe('#getEnigmaView()', function () {

      it('should respond to getEnigmaView', function () {
        expect(enigmaController).to.respondTo('getEnigmaView');
      });

      it('should return an EnigmaView', function () {
        //expect(enigmaController.getEnigmaView()).to.be.an.instanceOf(ENIGMA.EnigmaView);
      });
    });

    describe('#setEnigmaView()', function () {

      it('should respond to setEnigmaView', function () {
        expect(enigmaController).to.respondTo('setEnigmaView');
      });

      it('should set enigmaView', function () {
        var enigmaView = new ENIGMA.EnigmaView();
        enigmaController.setEnigmaView(enigmaView);
        expect(enigmaController.getEnigmaView()).to.equal(enigmaView);
      });
    });

    describe('#keyboardEvent()', function () {

      it('should respond to keyboardEvent', function () {
        expect(enigmaController).to.respondTo('keyboardEvent');
      });

      var lightedState;
      var keyState;

      enigmaController.setEnigmaView({

        getLightedState: function (letter) {
          return lightedState[letter];
        },

        setLightedState: function (letter, lighted) {
          lightedState[letter] = lighted;
        },

        getKeyState: function (letter) {
          return keyState[letter];
        },

        setKeyState: function (letter, depressed) {
          keyState[letter] = depressed;
        }
      });

      beforeEach(function () {

        var getClearState = function () {
          return {
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
        };

        lightedState = getClearState();
        keyState = getClearState();
      });

      var makeKeyboardEvent = function (key) {

        return new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: key,
          char: key,
          shiftKey: key === key.toUpperCase()
        });
      };

      it('should update EnigmaMachine when receiving a keyboardEvent', function () {

        var keyboardEventEnigmaMachine = function (key) {
          var enigmaMachine = new ENIGMA.EnigmaMachine();
          var model = enigmaController.getEnigmaMachine();
          enigmaMachine.getLeftRotor().setGroundSetting(model.getLeftRotor().getGroundSetting());
          enigmaMachine.getMiddleRotor().setGroundSetting(model.getMiddleRotor().getGroundSetting());
          enigmaMachine.getRightRotor().setGroundSetting(model.getRightRotor().getGroundSetting());
          enigmaMachine.encipherLetter(key);
          enigmaController.keyboardEvent(makeKeyboardEvent(key));
          expect(model.getLeftRotor().getGroundSetting()).to.equal(enigmaMachine.getLeftRotor().getGroundSetting());
          expect(model.getMiddleRotor().getGroundSetting()).to.equal(enigmaMachine.getMiddleRotor().getGroundSetting());
          expect(model.getRightRotor().getGroundSetting()).to.equal(enigmaMachine.getRightRotor().getGroundSetting());
        };

        keyboardEventEnigmaMachine('a');
        keyboardEventEnigmaMachine('b');
        keyboardEventEnigmaMachine('c');
        keyboardEventEnigmaMachine('d');
        keyboardEventEnigmaMachine('e');
        keyboardEventEnigmaMachine('f');
        keyboardEventEnigmaMachine('g');
      });

      it('should update EnigmaView when receiving a keyboardEvent', function () {
        var clearText = '';
        var cipherText = '';

        var enigmaView = {
          getClearText: function () {
            return clearText;
          },
          setClearText: function (newClearText) {
            clearText= newClearText;
          },
          getCipherText: function () {
            return cipherText;
          },
          setCipherText: function (newCipherText) {
            cipherText = newCipherText;
          }
        };

        enigmaController.setEnigmaView(enigmaView);

        var keyboardEventEnigmaView = function (letter) {
          var enigmaMachine = new ENIGMA.EnigmaMachine();
          var model = enigmaController.getEnigmaMachine();
          enigmaMachine.getLeftRotor().setGroundSetting(model.getLeftRotor().getGroundSetting());
          enigmaMachine.getMiddleRotor().setGroundSetting(model.getMiddleRotor().getGroundSetting());
          enigmaMachine.getRightRotor().setGroundSetting(model.getRightRotor().getGroundSetting());

          var oldClearText = enigmaController.getEnigmaView().getClearText();
          var oldCipherText = enigmaController.getEnigmaView().getCipherText();

          var clearLetter = letter;
          var cipherLetter = enigmaMachine.encipherLetter(letter);

          enigmaController.keyboardEvent(makeKeyboardEvent(letter));

          expect(enigmaController.getEnigmaView().getClearText()).to.equal(oldClearText + clearLetter);
          expect(enigmaController.getEnigmaView().getCipherText()).to.equal(oldCipherText + cipherLetter);
        };

        keyboardEventEnigmaView('a');
        keyboardEventEnigmaView('b');
        keyboardEventEnigmaView('c');
        keyboardEventEnigmaView('d');
        keyboardEventEnigmaView('e');
        keyboardEventEnigmaView('f');
        keyboardEventEnigmaView('g');
      });
    });
  });
})();
