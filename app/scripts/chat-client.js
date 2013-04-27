/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

(function () {
  'use strict';

  var chatClient = window.ENIGMA.chatClient = {};
  var socket;

  chatClient.connect = function (delegate) {
    socket = new WebSocket('ws://' + location.host, ['enigmaChat']);

    console.log('WebSocket Connecting...');

    socket.onopen = function () {
      console.log('WebSocket: Opened');

      if (delegate && typeof delegate.onopen === 'function') {
        delegate.onopen();
      }
    };

    socket.onerror = function (error) {
      console.log('WebSocket: Error ' + error);
      clearInterval(keepAliveInterval);

      if (delegate && typeof delegate.onerror === 'function') {
        delegate.onerror();
      }
    };

    socket.onmessage = function (event) {
      console.log('WebSocket: Received Message');

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

    chatClient.sendCipherText = function (cipherText) {
      var json = {
        cipherText: cipherText
      };

      socket.send(JSON.stringify(json));
    };

    var keepAliveInterval = setInterval(function () {
      socket.send('');
    }, 60000);
  };
}());
