/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

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
    };

    socket.onerror = function (error) {

      if (debug) {
        console.log('WebSocket: Error ' + error);
      }

      clearInterval(keepAliveInterval);

      if (delegate && typeof delegate.onerror === 'function') {
        delegate.onerror();
      }
    };

    socket.onmessage = function (event) {

      if (debug) {
        console.log('WebSocket: Received Message');
      }

      if (delegate && typeof delegate.onmessage === 'function') {
        delegate.onmessage(JSON.parse(event.data));
      }
    };

    socket.onclose = function () {
      clearInterval(keepAliveInterval);

      if (delegate && typeof delegate.onclose === 'function') {
        delegate.onclose();
      }
    };

    if (typeof delegate.onerror === 'function') {
      socket.onerror = delegate.onerror;
    }

    chatClient.sendClearText = function (clearText) {
      var json = {
        clearText: clearText
      };

      socket.send(JSON.stringify(json));
    };

    chatClient.sendCipherText = function (cipherText, settings) {
      var json = {
        cipherText: cipherText
      };

      if (settings) {
        json.settings = settings;
      }

      socket.send(JSON.stringify(json));
    };

    chatClient.sendSettings = function (settings) {
      var json = {
        settings: settings
      };

      socket.send(JSON.stringify(json));
    };

    var keepAliveInterval = setInterval(function () {
      socket.send('');
    }, 60000);
  };
}());
