/*jshint indent: 2, maxlen: 80, strict: true*/

(function () {
  'use strict';

  var debug = false;
  var socket;
  var chatClient = window.ENIGMA.chatClient = {};

  chatClient.connect = function (delegate) {
    socket = new WebSocket('ws://' + location.host, ['enigmaChat']);

    if (debug) {
      console.log('WebSocket: Connecting...');
    }

    socket.onopen = function () {

      if (debug) {
        console.log('WebSocket: Opened');
      }

      if (delegate && typeof delegate.onopen === 'function') {
        delegate.onopen();
      }
    }.bind(chatClient);

    socket.onerror = function (error) {

      if (debug) {
        console.log('WebSocket: Error ' + error);
      }

      clearInterval(keepAliveInterval);

      if (delegate && typeof delegate.onerror === 'function') {
        delegate.onerror();
      }
    }.bind(chatClient);

    socket.onmessage = function (event) {

      if (debug) {
        console.log('WebSocket: Received Message');
      }

      if (delegate && typeof delegate.onmessage === 'function') {
        delegate.onmessage(JSON.parse(event.data));
      }
    }.bind(chatClient);

    socket.onclose = function () {
      clearInterval(keepAliveInterval);

      if (delegate && typeof delegate.onclose === 'function') {
        delegate.onclose();
      }
    }.bind(chatClient);

    socket.onerror = function (error) {

      if (typeof delegate.onerror === 'function') {
        delegate.onerror(error);
      }
    }.bind(chatClient);

    chatClient.sendAssertion = function (assertion) {

      socket.send(JSON.stringify({
        assertion: assertion
      }));
    }.bind(chatClient);

    chatClient.sendLogout = function () {

      socket.send(JSON.stringify({
        logout: true
      }));
    }.bind(chatClient);

    chatClient.sendClearText = function (clearText) {

      socket.send(JSON.stringify({
        clearText: clearText
      }));
    }.bind(chatClient);

    chatClient.sendCipherText = function (cipherText, settings) {
      var json = {
        cipherText: cipherText
      };

      if (settings) {
        json.settings = settings;
      }

      socket.send(JSON.stringify(json));
    }.bind(chatClient);

    chatClient.sendSettings = function (settings) {
      var json = {
        settings: settings
      };

      socket.send(JSON.stringify(json));
    }.bind(chatClient);

    var keepAliveInterval = setInterval(function () {
      socket.send('');
    }, 60000);
  }.bind(chatClient);
}());
