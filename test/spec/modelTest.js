/*jshint indent: 2*/

/*global describe, it, ENIGMA, expect, beforeEach */
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

      it('should have keys for every letter of alphabet', function () {
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

      it('should have keys for every letter of alphabet', function () {
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

      it('should have keys for every letter of alphabet', function () {
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
})();
