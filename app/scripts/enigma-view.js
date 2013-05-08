/*jshint indent: 2, maxlen: 80, strict: true*/

/*globals ENIGMA*/

(function () {
  'use strict';

  var aCharCode = 'A'.charCodeAt(0);

  var plugboardX = 1053;
  var plugboardY = 117;
  var reflectorX = 117;
  var reflectorY = 117;
  var leftRotorX = 351;
  var leftRotorY = 117;
  var middleRotorX = 585;
  var middleRotorY = 117;
  var rightRotorX = 819;
  var rightRotorY = 117;
  var outer = 80;
  var inner = 60;

  var enigmaMachine = null;
  var canvas = null;
  var context = null;

  ENIGMA.view = {};

  /**
   * Performs a Caesar shift on a capitalized single character string.
   * @param {string} letter Capitalized single character string that is Caesar
   * shifted.
   * @param {string} shift Capitalized single character string that is the key
   * for the Ceasar shift.
   * @returns {string} Single character string of Ceasar shift cipher text.
   */
  var shiftRightLetter = function (letter, shift) {
    var l = letter.toUpperCase().charCodeAt(0) - aCharCode;
    var s = shift.toUpperCase().charCodeAt(0) - aCharCode;
    return String.fromCharCode(((l + s) % 26) + aCharCode);
  };

  ENIGMA.view.setCanvas = function (newCanvas) {
    canvas = newCanvas;
    context = canvas.getContext('2d');
  };

  ENIGMA.view.setEnigmaMachine = function (newEnigmaMachine) {
    enigmaMachine = newEnigmaMachine;
  };

  ENIGMA.view.drawEnigmaMachine = function () {
    context.fillStyle = '#999';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawReflector(enigmaMachine.getReflector(), reflectorX, reflectorY);
    drawRotor(enigmaMachine.getLeftRotor(), leftRotorX, leftRotorY);
    drawRotor(enigmaMachine.getMiddleRotor(), middleRotorX, middleRotorY);
    drawRotor(enigmaMachine.getRightRotor(), rightRotorX, rightRotorY);
    drawPlugboard(enigmaMachine.getPlugboard(), plugboardX, plugboardY);
  };

  ENIGMA.view.drawPath = function (path) {
    context.save();

    context.beginPath();

    drawLineToArc(plugboardX, plugboardY, outer + 5, path[0].ringRight);
    drawLineToArc(plugboardX, plugboardY, outer + 5, path[0].ringLeft);

    drawLineToArc(rightRotorX, rightRotorY, outer + 5, path[1].ringRight);
    drawLineToArc(rightRotorX, rightRotorY, inner + 5, path[1].ringLeft);

    drawLineToArc(middleRotorX, middleRotorY, outer + 5, path[2].ringRight);
    drawLineToArc(middleRotorX, middleRotorY, inner + 5, path[2].ringLeft);

    drawLineToArc(leftRotorX, leftRotorY, outer + 5, path[3].ringRight);
    drawLineToArc(leftRotorX, leftRotorY, inner + 5, path[3].ringLeft);

    drawLineToArc(reflectorX, reflectorY, outer + 5, path[4].ringRight);
    drawLineToArc(reflectorX, reflectorY, outer + 5, path[4].ringLeft);

    context.strokeStyle = '#0e0';
    context.stroke();
    context.beginPath();

    drawLineToArc(reflectorX, reflectorY, outer + 5, path[4].ringLeft);

    drawLineToArc(leftRotorX, leftRotorY, inner + 5, path[5].ringLeft);
    drawLineToArc(leftRotorX, leftRotorY, outer + 5, path[5].ringRight);

    drawLineToArc(middleRotorX, middleRotorY, inner + 5, path[6].ringLeft);
    drawLineToArc(middleRotorX, middleRotorY, outer + 5, path[6].ringRight);

    drawLineToArc(rightRotorX, rightRotorY, inner + 5, path[7].ringLeft);
    drawLineToArc(rightRotorX, rightRotorY, outer + 5, path[7].ringRight);

    drawLineToArc(plugboardX, plugboardY, outer + 5, path[8].ringLeft);
    drawLineToArc(plugboardX, plugboardY, outer + 5, path[8].ringRight);

    context.strokeStyle = '#e00';
    context.stroke();
    context.restore();
  };

  var drawTextRing = function (radius) {
    context.font = 'italic 12pt Calibri';
    context.textAlign = 'center';

    var charCode = ('A').charCodeAt(0);

    for (var i = 0; i < 26; i += 1) {
      context.save();
      context.rotate((Math.PI / 13) * i);
      context.translate(0, -radius);
      context.fillText(String.fromCharCode(charCode), 0, 0);
      context.restore();
      charCode += 1;
    }
  };

  var drawNumberRing = function (radius) {
    context.font = 'italic 12pt Calibri';
    context.textAlign = 'center';

    var charCode = ('A').charCodeAt(0);

    for (var i = 0; i < 26; i += 1) {
      context.save();
      context.rotate((Math.PI / 13) * i);
      context.translate(0, -radius);
      context.fillText(i, 0, 0);
      context.restore();
      charCode += 1;
    }
  };

  var drawMapping = function (outer, inner, mapping, shift) {
    context.save();

    for (var key in mapping) {

      if (mapping.hasOwnProperty(key)) {
        var letterFrom = shiftRightLetter(key, shift);
        var letterTo = shiftRightLetter(mapping[key], shift);

        var rads = (Math.PI / 13) * (letterFrom.charCodeAt(0) - aCharCode);

        var sin = Math.sin(rads);
        var cos = Math.cos(rads);
        context.beginPath();
        context.moveTo(sin * outer, -(cos * outer));
        rads = (Math.PI / 13) * (letterTo.charCodeAt(0) - aCharCode);

        sin = Math.sin(rads);
        cos = Math.cos(rads);
        context.lineTo(sin * inner, -(cos * inner));
        context.strokeStyle = '#ddd';
        context.stroke();
      }
    }

    context.restore();
  };

  var drawSimpleMapping = function (outer, mapping) {
    context.save();

    for (var key in mapping) {

      if (mapping.hasOwnProperty(key)) {
        var letterFrom = key;
        var letterTo = mapping[key];

        var rads = (Math.PI / 13) * (letterFrom.charCodeAt(0) - aCharCode);

        var sin = Math.sin(rads);
        var cos = Math.cos(rads);
        context.beginPath();
        context.moveTo(sin * outer, -(cos * outer));
        rads = (Math.PI / 13) * (letterTo.charCodeAt(0) - aCharCode);

        sin = Math.sin(rads);
        cos = Math.cos(rads);
        context.lineTo(sin * outer, -(cos * outer));
        context.strokeStyle = '#ddd';
        context.stroke();
      }
    }

    context.restore();
  };

  var drawArrow = function () {
    context.moveTo(0, 0);
    context.lineTo(10, 10);
    context.lineTo(0, -10);
    context.lineTo(-10, 10);
    context.closePath();
  };

  var drawRotor = function (rotor, x, y) {
    var windowSetting = rotor.getGroundSetting();
    context.save();
    context.translate(x, y);

    context.fillStyle = '#ddd';
    drawNumberRing(outer + 20);

    // draw window
    context.beginPath();
    context.rect(-10, -15 - outer, 20, 20);
    context.strokeStyle = 'black';
    context.stroke();

    context.rotate((-Math.PI / 13) * (windowSetting.charCodeAt(0) -
      aCharCode));

    // draw label
    context.save();
    context.fillStyle = '#666';
    context.font = 'bold 70pt Calibri';
    context.textAlign = 'center';
    context.translate(0, 35);
    context.fillText(rotor.getLabel(), 0, 0);
    context.restore();

    // draw notches
    var notches = rotor.getNotches();

    for (var i = 0; i < notches.length; i += 1) {
      // draw notch
      context.save();
      context.rotate((Math.PI / 13) * (notches[i].charCodeAt(0) - aCharCode));
      context.translate(0, 10 - outer);
      context.beginPath();
      drawArrow();
      context.fillStyle = '#d40';
      context.fill();
      context.restore();
    }

    // draw mapping
    drawMapping(outer + 5, inner + 5, rotor.getMapping(),
      rotor.getRingSetting());

    // draw text rings
    context.fillStyle = 'black';
    drawTextRing(inner);
    drawTextRing(outer);

    context.restore();
  }.bind(this);

  var drawReflector = function (reflector, x, y) {
    context.save();
    context.translate(x, y);

    context.fillStyle = '#ddd';
    drawNumberRing(outer + 20);

    // draw label
    context.save();
    context.fillStyle = '#666';
    context.font = 'bold 70pt Calibri';
    context.textAlign = 'center';
    context.translate(0, 35);
    context.fillText(reflector.getLabel(), 0, 0);
    context.restore();

    // draw mapping
    drawSimpleMapping(outer + 5, reflector.getMapping());

    // draw text ring
    context.fillStyle = '#000';
    drawTextRing(outer);

    context.restore();
  };

  var drawPlugboard = function (plugboard, x, y) {
    context.save();
    context.translate(x, y);

    context.fillStyle = '#ddd';
    drawNumberRing(outer + 20);

    context.save();
    context.fillStyle = '#666';
    context.font = 'bold 70pt Calibri';
    context.textAlign = 'center';
    context.translate(0, 35);
    context.fillText('PB', 0, 0);
    context.restore();

    // draw mapping
    drawSimpleMapping(outer + 5, plugboard.getMapping());

    // draw text ring
    context.fillStyle = '#000';
    drawTextRing(outer);

    context.restore();
  };

  var drawLineToArc = function (x, y, radius, letter) {
    var rads = (Math.PI / 13) * (letter.charCodeAt(0) - aCharCode);

    var sin = Math.sin(rads);
    var cos = Math.cos(rads);
    context.lineTo(x + (sin * radius), y - (cos * radius));
  };
}());
