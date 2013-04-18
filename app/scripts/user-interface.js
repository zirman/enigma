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
    var leftRotorWindow = 'a';
    var middleRotorWindow = 'a';
    var rightRotorWindow = 'a';
    var clearText = '';
    var cipherText = '';

    var keyStateObj = {
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

    var keyLightedObj = {
      'a': true,
      'b': true,
      'c': true,
      'd': true,
      'e': true,
      'f': true,
      'g': true,
      'h': true,
      'i': true,
      'j': true,
      'k': true,
      'l': true,
      'm': true,
      'n': true,
      'o': true,
      'p': true,
      'q': true,
      'r': true,
      's': true,
      't': true,
      'u': true,
      'v': true,
      'w': true,
      'x': true,
      'y': true,
      'z': true
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
