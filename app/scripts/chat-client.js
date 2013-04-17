/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

(function () {
  'use strict';
  var ns = window.ENIGMA;
  var socket = new WebSocket('ws://' + location.host, ['enigmaChat']);

  console.log('WebSocket Connecting...');

  socket.onopen = function () {
    console.log('WebSocket: Opened');
  };

  socket.onerror = function (error) {
    console.log('WebSocket: Error ' + error);
  };

  socket.onmessage = function (event) {
    console.log('WebSocket: Received Message');
    console.log(JSON.parse(event.data));
  };

  socket.onclose = function () {
    console.log('WebSocket: Closed');
  };

  ns.sendMessage = function (message) {

    var json = {
      message: message
    };

    socket.send(JSON.stringify(json));
  };

  // keep alive
  setInterval(function () {

    socket.send('');
  }, 60000);
}());