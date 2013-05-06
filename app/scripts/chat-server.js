/*jshint indent: 2, maxlen: 80, strict: true*/

(function () {
  'use strict';

  var serverUrl = 'http://localhost:9000';

  var https = require('https');
  var crypto = require('crypto');
  var querystring = require('querystring');
  var ws = require('./websocket.js');
  var sockets = [];

  var upgrade = function (req, res, next) {
    req.socket.server.on('upgrade', websocket);

    upgrade = function (req, res, next) {
      next();
    };

    next();
  };

  exports.middleware = function (req, res, next) {
    upgrade(req, res, next);
  };

  var websocket = function (request, socket) {
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

    var decode = ws.getDecoder();

    console.log('HTTP Upgraded to WebSocket');
    var email = null;
    var expires = null;
    var name = 'anonymous';
    sockets.push(socket);

    (function () {
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

    socket.on('data', function (socketData) {
      console.log('WebSocket: data');

      var jsonData = decode(socketData);

      if (jsonData === null || jsonData.length === 0) {
        return;
      }

      var json;

      try {
        json = JSON.parse(jsonData.toString());

      } catch (exception) {
        console.log('Exception parsing json string: ' + exception);
        console.log(jsonData.toString());
        return;
      }

      var broadcastMessage = null;

      if (typeof json.logout === 'boolean' && email) {
        // left message
        (function () {
          var encodedJsonString = ws.encode(JSON.stringify({
            server: name + ' left'
          }));

          sockets.forEach(function (socket) {
            socket.write(encodedJsonString);
          });
        }());

        email = null;
        expires = null;
        name = 'anonymous';

      } else if (typeof json.assertion === 'string') {

        var postQueryString = querystring.stringify({
          assertion: json.assertion,
          audience: serverUrl
        });

        var options = {
          hostname: 'verifier.login.persona.org',
          port: 443,
          path: '/verify',
          method: 'POST',

          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postQueryString.length
          }
        };

        var req = https.request(options, function (res) {

          res.on('data', function (personaJsonString) {

            if (res.statusCode !== 200) {
              console.log('statusCode: ', res.statusCode);
              console.log('headers: ', res.headers);
              process.stdout.write(personaJsonString);
              return;
            }

            var persona;

            try {
              persona = JSON.parse(personaJsonString);

            } catch (exception) {
              console.log('Exception parsing json string: ' + exception);
              console.log(jsonData.toString());
              return;
            }

            console.log(persona);

            if (typeof persona.status !== 'string' ||
                persona.status !== 'okay') {

              // send a failed attempt
              socket.write(ws.encode(JSON.stringify({
                authenticationFailed: true
              })));

              return;
            }

            email = persona.email;
            expires = persona.expires;
            var nameMatch = email.match(/^([^@]*)@/);
            name = nameMatch ? nameMatch[1] : '';
            console.log(name + ' logged in');
            var md5Hash = crypto.createHash('md5');
            md5Hash.update(new Buffer(email));

            // send authentication
            socket.write(ws.encode(JSON.stringify({
              persona: persona,
              emailHash: md5Hash.digest('hex')
            })));

            // send joined message
            (function () {
              var encodedJsonString = ws.encode(JSON.stringify({
                server: name + ' logged in'
              }));

              sockets.forEach(function (socket) {
                socket.write(encodedJsonString);
              });
            }());
          });
        });

        req.on('error', function(error) {
          console.error(error);
        });

        req.write(postQueryString);
        req.end();

      } else if (json.clearText) {

        broadcastMessage = ws.encode(JSON.stringify({
          from: name,
          clearText: json.clearText
        }));

      } else if (json.cipherText) {

        broadcastMessage = ws.encode(JSON.stringify({
          from: name,
          cipherText: json.cipherText
        }));

      } else if (json.settings) {

        broadcastMessage = ws.encode(JSON.stringify({
          from: name,
          settings: json.settings
        }));

      } else {
        console.log(name + ' send invalid message: ' +
          JSON.stringify(json));
      }

      if (broadcastMessage) {
        sockets.forEach(function (socket) {
          socket.write(broadcastMessage);
        });
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

      leave = function () {};
    };
  };
}());
