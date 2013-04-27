/*jshint
indent: 2,
maxlen: 80,
strict: true
*/

(function () {
  'use strict';

  var ws = require('./websocket.js');
  var sockets = [];

  var names = [
    'alice',
    'bob',
    'dawn',
    'earl',
    'fay',
    'gene',
    'hope',
    'ian',
    'jade',
    'ken',
    'liz',
    'mack',
    'nell',
    'omar',
    'pam',
    'quinn',
    'rae',
    'sam',
    'tess',
    'uriel',
    'violet',
    'will',
    'xena',
    'york',
    'zoe',
  ];

  var upgrade = function (req, res, next) {
    req.socket.server.on('upgrade', websocket);

    upgrade = function (req, res, next) {
      next();
    };

    next();
  };

  exports.upgrade = function (req, res, next) {
    upgrade(req, res, next);
  };

  var websocket = function (request, socket) {
    var crypto = require('crypto');

    // initialize connection with objects
    if (request.headers['sec-websocket-protocol'] !== 'enigmaChat') {
      console.log('incompatible protocol ' + request.
        headers['sec-websocket-protocol']);

      return;
    }

    var magicString = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    var secWsKey = request.headers['sec-websocket-key'];

    var hash = crypto.createHash('SHA1').update(secWsKey + magicString).
      digest('base64');

    var handshake = 'HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
                    'Upgrade: WebSocket\r\n' +
                    'Connection: Upgrade\r\n' +
                    'Sec-WebSocket-Protocol: enigmaChat\r\n' +
                    'Sec-WebSocket-Accept: ' + hash + '\r\n' +
                    '\r\n';

    socket.write(handshake);

    console.log('HTTP Upgraded to WebSocket');
    // choose a randome name from the list
    var name = names[Math.floor(Math.random() * names.length)];
    sockets.push(socket);

    // send join message to all sockets
    (function () {
      console.log(name + ' joined');

      var encodedJsonString = ws.encode(JSON.stringify({
        server: name + ' joined'
      }));

      sockets.forEach(function (socket) {
        socket.write(encodedJsonString);
      });
    }());

    socket.on('error', function (error) {
      console.log('WebSocket: error ' + error);
      leave();
    });

    socket.on('close', function (hadError) {

      if (hadError) {
        console.log('transmission error');

      } else {
        console.log('WebSocket: closed');
      }

      leave();
    });

    socket.on('end', function () {
      console.log('WebSocket: end');
      leave();
    });

    socket.on('data', function (data) {
      try {
        console.log('WebSocket: data');

        var jsonString = ws.decode(data).toString();

        if (jsonString.length === 0) {
          console.log('ping from ' + name);
          return;
        }

        var inputObject = JSON.parse(jsonString);

        if (typeof inputObject.clearText !== 'string' &&
            typeof inputObject.cipherText !== 'string' &&
            typeof inputObject.settings !== 'string') {
          console.log('strange message from ' + name);
          return;
        }

        var outputObject = {
          from: name
        };

        if (inputObject.clearText) {
          outputObject.clearText = inputObject.clearText;
        }

        if (inputObject.cipherText) {
          outputObject.cipherText = inputObject.cipherText;
        }

        if (inputObject.settings) {
          outputObject.settings = inputObject.settings;
        }

        console.log(outputObject);

        var encodedOutputString = ws.encode(JSON.stringify(outputObject));

        sockets.forEach(function (socket) {
          socket.write(encodedOutputString);
        });

      } catch (e) {
        console.log('bad data from ' + name);
        return;
      }
    });

    var leave = function () {
      sockets.splice(sockets.indexOf(socket), 1);

      console.log(name + ' left');

      var encodedJsonString = ws.encode(JSON.stringify({
        server: name + ' left'
      }));

      sockets.forEach(function (socket) {
        socket.write(encodedJsonString);
      });
    };
  };
}());
