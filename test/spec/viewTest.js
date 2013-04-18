/*jshint indent: 2*/

/*global describe, it, ENIGMA, expect, KeyboardEvent, beforeEach */
(function () {
  'use strict';

  describe('ENIGMA.EnigmaView', function () {

    it('should respond to EnigmaView', function () {
      expect(ENIGMA).to.respondTo('EnigmaView');
    });

    var enigmaView = new ENIGMA.EnigmaView();

    describe('#getCanvas()', function () {

      it('should respond to getCanvas', function () {
        expect(enigmaView).to.respondTo('getCanvas');
      });

      it('should return a canvas object', function () {
        expect(typeof enigmaView.getCanvas()).to.not.equal('undefined');
      });
    });

    describe('#setCanvas()', function () {

      it('should respond to setCanvas', function () {
        expect(enigmaView).to.respondTo('setCanvas');
      });

      it('should set canvas', function () {
        var canvas = document.createElement('canvas');
        enigmaView.setCanvas(canvas);
        expect(enigmaView.getCanvas()).to.equal(canvas);
      });
    });

    describe('#getController()', function () {

      it('should respond to getController', function () {
        expect(enigmaView).to.respondTo('getController');
      });

      it('should return an object', function () {
        expect(typeof enigmaView.getController()).to.equal('object');
      });
    });

    describe('#setController()', function () {

      it('should respond to setController', function () {
        expect(enigmaView).to.respondTo('setController');
      });

      it('should set controller', function () {
        var controller = {};
        enigmaView.setController(controller);
        expect(enigmaView.getController()).to.equal(controller);
      });
    });

    describe('#getLeftRotorWindow()', function () {

      it('should respond to getLeftRotorWindow', function () {
        expect(enigmaView).to.respondTo('getLeftRotorWindow');
      });

      it('should return a string', function () {
        expect(enigmaView.getLeftRotorWindow()).to.be.a('string');
      });

      it('should have length 1', function () {
        expect(enigmaView.getLeftRotorWindow()).to.have.length(1);
      });
    });

    describe('#setLeftRotorWindow()', function () {

      it('should respond to setLeftRotorWindow', function () {
        expect(enigmaView).to.respondTo('setLeftRotorWindow');
      });

      it('should set left rotor', function () {
        enigmaView.setLeftRotorWindow('k');
        expect(enigmaView.getLeftRotorWindow()).to.equal('k');

        enigmaView.setLeftRotorWindow('m');
        expect(enigmaView.getLeftRotorWindow()).to.equal('m');

        enigmaView.setLeftRotorWindow('f');
        expect(enigmaView.getLeftRotorWindow()).to.equal('f');

        enigmaView.setLeftRotorWindow('d');
        expect(enigmaView.getLeftRotorWindow()).to.equal('d');

        enigmaView.setLeftRotorWindow('m');
        expect(enigmaView.getLeftRotorWindow()).to.equal('m');
      });
    });

    describe('#getMiddleRotorWindow()', function () {

      it('should respond to getMiddleRotorWindow', function () {
        expect(enigmaView).to.respondTo('getMiddleRotorWindow');
      });

      it('should return a string', function () {
        expect(enigmaView.getMiddleRotorWindow()).to.be.a('string');
      });

      it('should have length 1', function () {
        expect(enigmaView.getMiddleRotorWindow()).to.have.length(1);
      });
    });

    describe('#setMiddleRotorWindow()', function () {

      it('should respond to setMiddleRotorWindow', function () {
        expect(enigmaView).to.respondTo('setMiddleRotorWindow');
      });

      it('should set left rotor', function () {
        enigmaView.setMiddleRotorWindow('k');
        expect(enigmaView.getMiddleRotorWindow()).to.equal('k');

        enigmaView.setMiddleRotorWindow('m');
        expect(enigmaView.getMiddleRotorWindow()).to.equal('m');

        enigmaView.setMiddleRotorWindow('f');
        expect(enigmaView.getMiddleRotorWindow()).to.equal('f');

        enigmaView.setMiddleRotorWindow('d');
        expect(enigmaView.getMiddleRotorWindow()).to.equal('d');

        enigmaView.setMiddleRotorWindow('m');
        expect(enigmaView.getMiddleRotorWindow()).to.equal('m');
      });
    });

    describe('#getRightRotorWindow()', function () {

      it('should respond to getRightRotorWindow', function () {
        expect(enigmaView).to.respondTo('getRightRotorWindow');
      });

      it('should return a string', function () {
        expect(enigmaView.getRightRotorWindow()).to.be.a('string');
      });

      it('should have length 1', function () {
        expect(enigmaView.getRightRotorWindow()).to.have.length(1);
      });
    });

    describe('#setRightRotorWindow()', function () {

      it('should respond to setRightRotorWindow', function () {
        expect(enigmaView).to.respondTo('setRightRotorWindow');
      });

      it('should set left rotor', function () {
        enigmaView.setRightRotorWindow('k');
        expect(enigmaView.getRightRotorWindow()).to.equal('k');

        enigmaView.setRightRotorWindow('m');
        expect(enigmaView.getRightRotorWindow()).to.equal('m');

        enigmaView.setRightRotorWindow('f');
        expect(enigmaView.getRightRotorWindow()).to.equal('f');

        enigmaView.setRightRotorWindow('d');
        expect(enigmaView.getRightRotorWindow()).to.equal('d');

        enigmaView.setRightRotorWindow('m');
        expect(enigmaView.getRightRotorWindow()).to.equal('m');
      });
    });

    describe('#getClearText()', function () {

      it('should respond to getClearText', function () {
        expect(enigmaView).to.respondTo('getClearText');
      });

      it('should return a string', function () {
        expect(enigmaView.getClearText()).to.be.a('string');
      });
    });

    describe('#setClearText()', function () {

      it('should respond to setClearText', function () {
        expect(enigmaView).to.respondTo('setClearText');
      });

      it('should set value of getClearText', function () {
        var clearText = 'clear text';
        enigmaView.setClearText(clearText);
        expect(enigmaView.getClearText()).to.equal(clearText);
      });
    });

    describe('#getCipherText()', function () {

      it('should respond to getCipherText', function () {
        expect(enigmaView).to.respondTo('getCipherText');
      });

      it('should return a string', function () {
        expect(enigmaView.getCipherText()).to.be.a('string');
      });
    });

    describe('#setCipherText()', function () {

      it('should respond to setCipherText', function () {
        expect(enigmaView).to.respondTo('setCipherText');
      });

      it('should set value of getCipherText', function () {
        var cipherText = 'cipher text';
        enigmaView.setCipherText(cipherText);
        expect(enigmaView.getCipherText()).to.equal(cipherText);
      });
    });

    describe('#getKeyState()', function () {

      it('should respond to getKeyState', function () {
        expect(enigmaView).to.respondTo('getKeyState');
      });

      it('should return a boolean for every letter', function () {
        expect(enigmaView.getKeyState('a')).to.be.a('boolean');
        expect(enigmaView.getKeyState('b')).to.be.a('boolean');
        expect(enigmaView.getKeyState('c')).to.be.a('boolean');
        expect(enigmaView.getKeyState('d')).to.be.a('boolean');
        expect(enigmaView.getKeyState('e')).to.be.a('boolean');
        expect(enigmaView.getKeyState('f')).to.be.a('boolean');
        expect(enigmaView.getKeyState('g')).to.be.a('boolean');
        expect(enigmaView.getKeyState('h')).to.be.a('boolean');
        expect(enigmaView.getKeyState('i')).to.be.a('boolean');
        expect(enigmaView.getKeyState('j')).to.be.a('boolean');
        expect(enigmaView.getKeyState('k')).to.be.a('boolean');
        expect(enigmaView.getKeyState('l')).to.be.a('boolean');
        expect(enigmaView.getKeyState('m')).to.be.a('boolean');
        expect(enigmaView.getKeyState('n')).to.be.a('boolean');
        expect(enigmaView.getKeyState('o')).to.be.a('boolean');
        expect(enigmaView.getKeyState('p')).to.be.a('boolean');
        expect(enigmaView.getKeyState('q')).to.be.a('boolean');
        expect(enigmaView.getKeyState('r')).to.be.a('boolean');
        expect(enigmaView.getKeyState('s')).to.be.a('boolean');
        expect(enigmaView.getKeyState('t')).to.be.a('boolean');
        expect(enigmaView.getKeyState('u')).to.be.a('boolean');
        expect(enigmaView.getKeyState('v')).to.be.a('boolean');
        expect(enigmaView.getKeyState('w')).to.be.a('boolean');
        expect(enigmaView.getKeyState('x')).to.be.a('boolean');
        expect(enigmaView.getKeyState('y')).to.be.a('boolean');
        expect(enigmaView.getKeyState('z')).to.be.a('boolean');
      });
    });

    describe('#setKeyState()', function () {

      it('should respond to setKeyState', function () {
        expect(enigmaView).to.respondTo('setKeyState');
      });

      it('should have every letter as key to a boolean', function () {
        enigmaView.setKeyState('k', true);
        expect(enigmaView.getKeyState('k')).to.equal(true);
        enigmaView.setKeyState('k', false);
        expect(enigmaView.getKeyState('k')).to.equal(false);

        enigmaView.setKeyState('m', true);
        expect(enigmaView.getKeyState('m')).to.equal(true);
        enigmaView.setKeyState('m', false);
        expect(enigmaView.getKeyState('m')).to.equal(false);

        enigmaView.setKeyState('f', true);
        expect(enigmaView.getKeyState('f')).to.equal(true);
        enigmaView.setKeyState('f', false);
        expect(enigmaView.getKeyState('f')).to.equal(false);

        enigmaView.setKeyState('d', true);
        expect(enigmaView.getKeyState('d')).to.equal(true);
        enigmaView.setKeyState('d', false);
        expect(enigmaView.getKeyState('d')).to.equal(false);

        enigmaView.setKeyState('m', true);
        expect(enigmaView.getKeyState('m')).to.equal(true);
        enigmaView.setKeyState('m', false);
        expect(enigmaView.getKeyState('m')).to.equal(false);
      });
    });

    describe('#getLightedState()', function () {

      it('should respond to getLightedState', function () {
        expect(enigmaView).to.respondTo('getLightedState');
      });

      it('should return a boolean for every letter', function () {
        expect(enigmaView.getLightedState('a')).to.be.a('boolean');
        expect(enigmaView.getLightedState('b')).to.be.a('boolean');
        expect(enigmaView.getLightedState('c')).to.be.a('boolean');
        expect(enigmaView.getLightedState('d')).to.be.a('boolean');
        expect(enigmaView.getLightedState('e')).to.be.a('boolean');
        expect(enigmaView.getLightedState('f')).to.be.a('boolean');
        expect(enigmaView.getLightedState('g')).to.be.a('boolean');
        expect(enigmaView.getLightedState('h')).to.be.a('boolean');
        expect(enigmaView.getLightedState('i')).to.be.a('boolean');
        expect(enigmaView.getLightedState('j')).to.be.a('boolean');
        expect(enigmaView.getLightedState('k')).to.be.a('boolean');
        expect(enigmaView.getLightedState('l')).to.be.a('boolean');
        expect(enigmaView.getLightedState('m')).to.be.a('boolean');
        expect(enigmaView.getLightedState('n')).to.be.a('boolean');
        expect(enigmaView.getLightedState('o')).to.be.a('boolean');
        expect(enigmaView.getLightedState('p')).to.be.a('boolean');
        expect(enigmaView.getLightedState('q')).to.be.a('boolean');
        expect(enigmaView.getLightedState('r')).to.be.a('boolean');
        expect(enigmaView.getLightedState('s')).to.be.a('boolean');
        expect(enigmaView.getLightedState('t')).to.be.a('boolean');
        expect(enigmaView.getLightedState('u')).to.be.a('boolean');
        expect(enigmaView.getLightedState('v')).to.be.a('boolean');
        expect(enigmaView.getLightedState('w')).to.be.a('boolean');
        expect(enigmaView.getLightedState('x')).to.be.a('boolean');
        expect(enigmaView.getLightedState('y')).to.be.a('boolean');
        expect(enigmaView.getLightedState('z')).to.be.a('boolean');
      });
    });

    describe('#setLightedState()', function () {

      it('should setLightedState', function () {
        expect(enigmaView).to.respondTo('setLightedState');
      });

      it('should have every letter as key to a boolean', function () {
        enigmaView.setLightedState('k', true);
        expect(enigmaView.getLightedState('k')).to.equal(true);
        enigmaView.setLightedState('k', false);
        expect(enigmaView.getLightedState('k')).to.equal(false);

        enigmaView.setLightedState('m', true);
        expect(enigmaView.getLightedState('m')).to.equal(true);
        enigmaView.setLightedState('m', false);
        expect(enigmaView.getLightedState('m')).to.equal(false);

        enigmaView.setLightedState('f', true);
        expect(enigmaView.getLightedState('f')).to.equal(true);
        enigmaView.setLightedState('f', false);
        expect(enigmaView.getLightedState('f')).to.equal(false);

        enigmaView.setLightedState('d', true);
        expect(enigmaView.getLightedState('d')).to.equal(true);
        enigmaView.setLightedState('d', false);
        expect(enigmaView.getLightedState('d')).to.equal(false);

        enigmaView.setLightedState('m', true);
        expect(enigmaView.getLightedState('m')).to.equal(true);
        enigmaView.setLightedState('m', false);
        expect(enigmaView.getLightedState('m')).to.equal(false);
      });
    });

    describe('Event Handling', function () {
      var dispatchedEvent;

      beforeEach(function () {
        enigmaView.setController({
          keyboardEvent: function (event) {
            dispatchedEvent = event;
          }
        });

        dispatchedEvent = null;
      });

      var canvas = document.createElement('canvas');
      enigmaView.setCanvas(canvas);

      it('should handle keyboard event "k"', function () {
        dispatchKeyboardEvent(canvas, 'k');
        expect(dispatchedEvent).to.not.be.a('null');
      });

      it('should handle keyboard events "m"', function () {
        dispatchKeyboardEvent(canvas, 'm');
        expect(dispatchedEvent).to.not.be.a('null');
      });

      it('should handle keyboard event "f"', function () {
        dispatchKeyboardEvent(canvas, 'f');
        expect(dispatchedEvent).to.not.be.a('null');
      });

      it('should handle keyboard events "d"', function () {
        dispatchKeyboardEvent(canvas, 'd');
        expect(dispatchedEvent).to.not.be.a('null');
      });

      it('should handle keyboard event "m"', function () {
        dispatchKeyboardEvent(canvas, 'm');
        expect(dispatchedEvent).to.not.be.a('null');
      });

      it('should handle keyboard event " "', function () {
        dispatchKeyboardEvent(canvas, ' ');
        expect(dispatchedEvent).to.not.be.a('null');
      });

      it('should handle keyboard event "+"', function () {
        dispatchKeyboardEvent(canvas, '+');
        expect(dispatchedEvent).to.not.be.a('null');

      });
    });
  });

  function dispatchKeyboardEvent(element, key) {
    var e = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: key,
      char: key,
      shiftKey: key === key.toUpperCase()
    });

    element.dispatchEvent(e);
    return e;
  }
})();
