/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

/*globals ENIGMA, $*/

(function () {
  'use strict';

  ENIGMA.EnigmaView = function () {
    var canvas = document.createElement('canvas');
    var controller = document.getElementById('controller');
    var leftRotorWindow = 'A';
    var middleRotorWindow = 'A';
    var rightRotorWindow = 'A';
    var clearText = '';
    var cipherText = '';

    var keyStateObj = {
      'A': false,
      'B': false,
      'C': false,
      'D': false,
      'E': false,
      'F': false,
      'G': false,
      'H': false,
      'I': false,
      'J': false,
      'K': false,
      'L': false,
      'M': false,
      'N': false,
      'O': false,
      'P': false,
      'Q': false,
      'R': false,
      'S': false,
      'T': false,
      'U': false,
      'V': false,
      'W': false,
      'X': false,
      'Y': false,
      'Z': false
    };

    var keyLightedObj = {
      'A': true,
      'B': true,
      'C': true,
      'D': true,
      'E': true,
      'F': true,
      'G': true,
      'H': true,
      'I': true,
      'J': true,
      'K': true,
      'L': true,
      'M': true,
      'N': true,
      'O': true,
      'P': true,
      'Q': true,
      'R': true,
      'S': true,
      'T': true,
      'U': true,
      'V': true,
      'W': true,
      'X': true,
      'Y': true,
      'Z': true
    };

    this.getCanvas = function(){
      return canvas;
    };

    var keyDownHandler = function (e) {
      controller.keyboardEvent(e);
    };

    this.setCanvas = function(newCanvas){
      canvas = newCanvas;
      $(canvas).keydown(keyDownHandler);
    };

    this.getController = function(){
        return controller;
      };

    this.setController = function(newController){
      controller = newController;
    };

    this.getLeftRotorWindow = function(){
      return leftRotorWindow;
    };

    this.setLeftRotorWindow = function(newLeftRotorWindow){
      leftRotorWindow = newLeftRotorWindow;
    };

    this.getMiddleRotorWindow = function(){
      return middleRotorWindow;
    };

    this.setMiddleRotorWindow = function(newMiddleRotorWindow){
      middleRotorWindow = newMiddleRotorWindow;
    };

    this.getRightRotorWindow = function(){
      return rightRotorWindow;
    };

    this.setRightRotorWindow = function(newRightRotorWindow){
      rightRotorWindow = newRightRotorWindow;
    };

    this.getClearText = function(){
      return clearText;
    };

    this.setClearText = function(newClearText){
      clearText = newClearText;
    };

    this.getCipherText = function(){
      return cipherText;
    };

    this.setCipherText = function(newCipherText){
      cipherText = newCipherText;
    };

    this.getKeyState = function(letter){
      return keyStateObj[letter];
    };

    this.setKeyState = function(letter, newKeyState){
      keyStateObj[letter] = newKeyState;
    };

    this.getLightedState = function(lightLetter){
      return keyLightedObj[lightLetter];
    };

    this.setLightedState = function(lightLetter, newLightedState){
      keyLightedObj[lightLetter] = newLightedState;
    };

  };
}());
