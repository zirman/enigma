/*jshint
indent: 2,
es5: false,
esnext: false,
bitwise: false,
camelcase: false,
curly: false,
eqeqeq: false,
immed: false,
latedef: false,
newcap: false,
noarg: false,
regexp: false,
undef: false,
unused: false,
strict: false,
trailing: false,
smarttabs: false,
evil: false,
regexdash: false,
wsh: false,
trailing: false,
sub: false
*/

/*global describe, it, ENIGMA, expect, assert, KeyboardEvent, beforeEach */
(function () {
  'use strict';

  describe('ENIGMA.Rotor', function () {
    var Rotor = ENIGMA.Rotor;

    it('should respond to Rotor', function () {
      expect(ENIGMA).to.respondTo('Rotor');
    });

    var rotor = new Rotor();

    describe('#getLabel()', function () {

      it('should respond to getLabel', function () {
        expect(rotor).to.respondTo('getLabel');
      });
    });

    describe('#getMapping()', function () {

      it('should respond to getMapping', function () {
        expect(rotor).to.respondTo('getMapping');
      });

      it('should return an object', function () {
        expect(rotor.getMapping()).to.be.a('object');
      });

      it('should have', function () {
        expect(rotor.getMapping()).to.contain.keys(
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z'
        );
      });
    });

    describe('#getNotches()', function () {

      it('should respond to getNotches', function () {
        expect(rotor).to.respondTo('getNotches');
      });
    });

    describe('#getRingSetting()', function () {

      it('should respond to getRingSetting', function () {
        expect(rotor).to.respondTo('getRingSetting');
      });
    });

    describe('#setRingSetting()', function () {

      it('should respond to setRingSetting', function () {
        expect(rotor).to.respondTo('setRingSetting');
      });
    });

    describe('#getGroundSetting()', function () {

      it('should respond to getGroundSetting', function () {
        expect(rotor).to.respondTo('getGroundSetting');
      });
    });

    describe('#setGroundSetting()', function () {

      it('should respond to setGroundSetting', function () {
        expect(rotor).to.respondTo('setGroundSetting');
      });
    });

    describe('#getLeftObj()', function () {

      it('should respond to getLeftObj', function () {
        expect(rotor).to.respondTo('getLeftObj');
      });
    });

    describe('#setLeftObj()', function () {

      it('should respond to setLeftObj', function () {
        expect(rotor).to.respondTo('setLeftObj');
      });
    });

    describe('#getRightObj()', function () {

      it('should respond to getRightObj', function () {
        expect(rotor).to.respondTo('getRightObj');
      });
    });

    describe('#setRightObj()', function () {

      it('should respond to setRightObj', function () {
        expect(rotor).to.respondTo('setRightObj');
      });
    });

    describe('#goingLeft()', function () {

      it('should respond to goingLeft', function () {
        expect(rotor).to.respondTo('goingLeft');
      });
    });

    describe('#goingRight()', function () {

      it('should respond to goingRight', function () {
        expect(rotor).to.respondTo('goingRight');
      });
    });

    describe('#traceLeft()', function () {

      it('should respond to traceLeft', function () {
        expect(rotor).to.respondTo('traceLeft');
      });
    });

    describe('#traceRight()', function () {

      it('should respond to traceRight', function () {
        expect(rotor).to.respondTo('traceRight');
      });
    });

    describe('#isOnNotch()', function () {

      it('should respond to isOnNotch', function () {
        expect(rotor).to.respondTo('isOnNotch');
      });


      it('should return a boolean', function () {
        expect(rotor.isOnNotch()).to.be.a('boolean');
      });
    });

    describe('#advanceGroundSetting()', function () {

      it('should respond to advanceGroundSetting', function () {
        expect(rotor).to.respondTo('advanceGroundSetting');
      });
    });
  });

  describe('ENIGMA.Reflector', function () {
    var Reflector = ENIGMA.Reflector;

    it('should respond to Reflector', function () {
      expect(ENIGMA).to.respondTo('Reflector');
    });

    var reflector = new Reflector();

    describe('#getLabel()', function () {

      it('should respond to getLabel', function () {
        expect(reflector).to.respondTo('getLabel');
      });

      it('should return a string', function () {
        expect(reflector.getLabel()).to.be.a('string');
      });
    });

    describe('#getMapping()', function () {

      it('should respond to getMapping', function () {
        expect(reflector.getMapping, 'function');
      });

      it('should return an object', function () {
        expect(reflector.getMapping()).to.be.a('object');
      });

      it('should have', function () {
        expect(reflector.getMapping()).to.contain.keys(
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z'
        );
      });
    });

    describe('#getRightObj()', function () {

      it('should respond to getRightObj', function () {
        expect(reflector).to.respondTo('getRightObj');
      });

      it('should return an object', function () {
        expect(typeof reflector.getRightObj()).to.equal('object');
      });
    });

    describe('#setRightObj()', function () {

      it('should set rightObj', function () {
        var rightObj = {};
        reflector.setRightObj(rightObj);
        expect(reflector.getRightObj()).to.equal(rightObj);
      });
    });

    describe('#traceLeft()', function () {

      it('should should respond to traceleft', function () {
        expect(reflector).to.respondTo('traceLeft');
      });
    });
  });

  describe('ENIGMA.Plugboard', function () {
    var Plugboard = ENIGMA.Plugboard;

    it('should respond to Plugboard', function () {
      expect(ENIGMA).to.respondTo('Plugboard');
    });

    var plugboard = new Plugboard();

    describe('#clearAll()', function () {

      it('should respond to clearAll', function () {
        expect(plugboard).to.respondTo('clearAll');
      });
    });

    describe('#getMapping()', function () {

      it('should respond to getMapping', function () {
        expect(plugboard).to.respondTo('getMapping');
      });

      it('should return an object', function () {
        expect(plugboard.getMapping()).to.be.a('object');
      });

      it('should have', function () {
        expect(plugboard.getMapping()).to.contain.keys(
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z'
        );
      });
    });

    describe('#setLetterSwap()', function () {

      it('should respond to setLetterSwap', function () {
        expect(plugboard).to.respondTo('setLetterSwap');
      });
    });

    describe('#clearLetterSwap()', function () {

      it('should respond to clearLetterSwap', function () {
        expect(plugboard).to.respondTo('clearLetterSwap');
      });
    });

    describe('#getLeftObj()', function () {

      it('should respond to getLeftObj', function () {
        expect(plugboard).to.respondTo('getLeftObj');
      });

      it('should return an object', function () {
        expect(typeof plugboard.getLeftObj()).to.equal('object');
      });
    });

    describe('#setLeftObj()', function () {

      it('should respond to setLeftObj', function () {
        expect(plugboard).to.respondTo('setLeftObj');
      });

      it('should set leftObj', function () {
        var leftObj = {};
        plugboard.setLeftObj(leftObj);
        expect(plugboard.getLeftObj()).to.equal(leftObj);
      });
    });

    describe('#goingLeft()', function () {

      it('should respond to goingLeft', function () {
        expect(plugboard).to.respondTo('goingLeft');
      });
    });

    describe('#goingRight()', function () {

      it('should respond to goingRight', function () {
        expect(plugboard).to.respondTo('goingRight');
      });
    });

    describe('#traceLeft()', function () {

      it('should respond to traceLeft', function () {
        expect(plugboard).to.respondTo('traceLeft');
      });
    });

    describe('#traceRight()', function () {

      it('should respond to traceRight', function () {
        expect(plugboard).to.respondTo('traceRight');
      });
    });
  });

  describe('ENIGMA.EnigmaMachine', function () {
    var EnigmaMachine = ENIGMA.EnigmaMachine;

    it('should respond to EnigmaMachine', function () {
      expect(ENIGMA).to.respondTo('EnigmaMachine');
    });

    var enigmaMachine = new EnigmaMachine();

    describe('#getPlugboard()', function () {

      it('should respond to getPlugboard', function () {
        expect(enigmaMachine).to.respondTo('getPlugboard');
      });

      it('should return an object', function () {
        expect(enigmaMachine.getPlugboard()).to.be.a('object');
      });

      it('should return a plugboard', function () {
        expect(enigmaMachine.getPlugboard().constructor).to.equal(ENIGMA.Plugboard);
      });
    });

    describe('#getLeftRotor()', function () {

      it('should respond to getLeftRotor', function () {
        expect(enigmaMachine).to.respondTo('getLeftRotor');
      });

      it('should return an object', function () {
        expect(enigmaMachine.getLeftRotor()).to.be.a('object');
      });

      it('should return a rotor', function () {
        expect(enigmaMachine.getLeftRotor().constructor).to.equal(ENIGMA.Rotor);
      });
    });

    describe('#getMiddleRotor()', function () {

      it('should respond to getMiddleRotor', function () {
        expect(enigmaMachine).to.respondTo('getMiddleRotor');
      });

      it('should return an object', function () {
        expect(enigmaMachine.getMiddleRotor()).to.be.a('object');
      });

      it('should return a rotor', function () {
        expect(enigmaMachine.getMiddleRotor().constructor).to.equal(ENIGMA.Rotor);
      });
    });

    describe('#getRightRotor()', function () {

      it('should respond to getRightRotor', function () {
        expect(enigmaMachine).to.respondTo('getRightRotor');
      });

      it('should return an object', function () {
        expect(enigmaMachine.getRightRotor()).to.be.a('object');
      });

      it('should return a rotor', function () {
        expect(enigmaMachine.getRightRotor().constructor).to.equal(ENIGMA.Rotor);
      });
    });

    describe('#getReflector()', function () {

      it('should respond to getReflector', function () {
        expect(enigmaMachine).to.respondTo('getReflector');
      });

      it('should return an object', function () {
        expect(enigmaMachine.getReflector()).to.be.a('object');
      });

      it('should return a rotor', function () {
        expect(enigmaMachine.getReflector().constructor).to.equal(ENIGMA.Reflector);
      });
    });

    describe('#swapReflector()', function () {

      it('should respond to swapReflector', function () {
        expect(enigmaMachine).to.respondTo('swapReflector');
      });
    });

    describe('#encipherLetter()', function () {

      it('should respond to encipherLetter', function () {
        expect(enigmaMachine).to.respondTo('encipherLetter');
      });
    });

    describe('#traceLetter()', function () {

      it('should respond to traceLetter', function () {
        expect(enigmaMachine).to.respondTo('traceLetter');
      });
    });

    describe('#encipherString()', function () {

      it('should respond to encipherString', function () {
        expect(enigmaMachine).to.respondTo('encipherString');
      });

      enigmaMachine.swapReflector(new ENIGMA.Reflector.ReflectorB());

      var rotor = new ENIGMA.Rotor.Rotor1();
      rotor.setRingSetting('a');
      enigmaMachine.swapRotor(enigmaMachine.getLeftRotor(), rotor);

      rotor = new ENIGMA.Rotor.Rotor2();
      rotor.setRingSetting('a');
      enigmaMachine.swapRotor(enigmaMachine.getMiddleRotor(), rotor);

      rotor = new ENIGMA.Rotor.Rotor3();
      rotor.setRingSetting('a');
      enigmaMachine.swapRotor(enigmaMachine.getRightRotor(), rotor);

      enigmaMachine.getPlugboard().clearAll();

      beforeEach(function () {
        enigmaMachine.getLeftRotor().setGroundSetting('a');
        enigmaMachine.getMiddleRotor().setGroundSetting('a');
        enigmaMachine.getRightRotor().setGroundSetting('a');
      });

      it('should encipher "the quick brown fox jumps over the lazy dog" as "opc illaz fxlqt dnl gglek dizo kqk gxie zkd"', function () {
        expect(enigmaMachine.encipherString('the quick brown fox jumps over the lazy dog')).to.equal('opc illaz fxlqt dnl gglek dizo kqk gxie zkd');
      });

      it('should decipher "pixwhlifpvfhecgdyiovybvwgxlkpughtxukswhotprogzjkezybfhmdmzzjmzzetovctlvfyaeobtyqvdwukzpxjkhvvufeldabnnxzvdcqzymkpvsvmxwoltaybqphxocpbzjkasklceqnqwyynegfsqzjupmttjnbhhjwvhmtwwwhjonasiljqhyuotbtmqgqfgmalxrdlcahaebcaectmfjqadmfewtjnouiqngfhoykeznsddozdvtwdkmvpmavavgrdtzailwpzxntyxysalrmitcbtcswilcjzdoosptpfyyrlshgrupsyscvnokwzjdwzqpixbqyyjbgjthxuhinrratnoztnlqmpaiglgthrpvfuokllmzxpdhmhlwrouyxicwxtdqlcksyaxegfojqnpblwlvdqwxhaqykzosjgznnrq" as "Lorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nam liber te conscient to factor tum poen legum odioque civiuda"', function () {

        expect(enigmaMachine.encipherString('pixwhlifpvfhecgdyiovybvwgxlkpughtxukswhotprogzjkezybfhmdmzzjmzzetovctlvfyaeobtyqvdwukzpxjkhvvufeldabnnxzvdcqzymkpvsvmxwoltaybqphxocpbzjkasklceqnqwyynegfsqzjupmttjnbhhjwvhmtwwwhjonasiljqhyuotbtmqgqfgmalxrdlcahaebcaectmfjqadmfewtjnouiqngfhoykeznsddozdvtwdkmvpmavavgrdtzailwpzxntyxysalrmitcbtcswilcjzdoosptpfyyrlshgrupsyscvnokwzjdwzqpixbqyyjbgjthxuhinrratnoztnlqmpaiglgthrpvfuokllmzxpdhmhlwrouyxicwxtdqlcksyaxegfojqnpblwlvdqwxhaqykzosjgznnrq')).to.equal(
          'loremipsumdolorsiterelitlametconsectetaurcilliumadipisicingpecuseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliquautenimadminimveniamquisnostrudexercitationullamcolaborisnisiutaliquipexeacommodoconsequatduisauteiruredolorinreprehenderitinvoluptatevelitessecillumdoloreeufugiatnullapariaturexcepteursintoccaecatcupidatatnonproidentsuntinculpaquiofficiadeseruntmollitanimidestlaborumnamliberteconscienttofactortumpoenlegumodioqueciviuda');
      });

      it('should encipher "a" with reflector b rotor 1, 2 and 3, ring setting "aaa" ground setting "qev" as "l" and get final ground setting of "rfw"', function () {
        enigmaMachine.getLeftRotor().setGroundSetting('q');
        enigmaMachine.getMiddleRotor().setGroundSetting('e');
        enigmaMachine.getRightRotor().setGroundSetting('v');

        expect(enigmaMachine.encipherString('a')).to.equal('l');
        expect(enigmaMachine.getLeftRotor().getGroundSetting()).to.equal('r');
        expect(enigmaMachine.getMiddleRotor().getGroundSetting()).to.equal('f');
        expect(enigmaMachine.getRightRotor().getGroundSetting()).to.equal('w');
      });
    });
  });

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
        expect(enigmaView.getCanvas()).to.be.a('object');
        expect(enigmaView.getCanvas().constructor).to.equal(HTMLCanvasElement);
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
      var dispatched;

      enigmaView.setController({
        keyboardEvent: function () {
          dispatched = true;
        }
      });

      beforeEach(function () {
        dispatched = false;
      });

      var canvas = document.createElement('canvas');
      enigmaView.setCanvas(canvas);

      it('should handle keyboard event "k"', function () {
        dispatchKeyboardEvent(canvas, 'a');
        expect(dispatched).to.equal(true);
      });

      it('should handle keyboard events "m"', function () {
        dispatchKeyboardEvent(canvas, 'm');
        expect(dispatched).to.equal(true);
      });

      it('should handle keyboard event "f"', function () {
        dispatchKeyboardEvent(canvas, 'f');
        expect(dispatched).to.equal(true);
      });

      it('should handle keyboard events "d"', function () {
        dispatchKeyboardEvent(canvas, 'd');
        expect(dispatched).to.equal(true);
      });

      it('should handle keyboard event "m"', function () {
        dispatchKeyboardEvent(canvas, 'm');
        expect(dispatched).to.equal(true);
      });

      it('should handle keyboard event " "', function () {
        dispatchKeyboardEvent(canvas, ' ');
        expect(dispatched).to.equal(true);
      });

      it('should handle keyboard event "+"', function () {
        dispatchKeyboardEvent(canvas, '+');
        expect(dispatched).to.equal(true);
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
  }
})();
