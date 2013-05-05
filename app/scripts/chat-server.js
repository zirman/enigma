/*jshint indent: 2, maxlen: 80, strict: true*/

(function () {
  'use strict';

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

    console.log('HTTP Upgraded to WebSocket');
    var email = null;
    var expires = null;
    var name = 'anonymous-' + Math.floor(Math.random() * 1000);
    sockets.push(socket);

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

        //console.log(name + ': ' + inputObject);
        var encodedMessage = null;

        if (typeof inputObject.logout === 'boolean' && email) {
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
          name = 'anonymous-' + Math.floor(Math.random() * 1000);

        } else if (typeof inputObject.assertion === 'string') {

          var postQueryString = querystring.stringify({
            assertion: inputObject.assertion,
            audience: 'http://localhost:9000' // read this from a config file
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
                process.stdout.write(data);
                return;
              }

              var persona = JSON.parse(personaJsonString);
              email = persona.email;
              expires = persona.expires;
              var nameMatch = email.match(/^([^@]*)@/);
              name = nameMatch ? nameMatch[1] : '';
              console.log(name + ' logged in');
              var md5Hash = crypto.createHash('md5');
              md5Hash.update(new Buffer(email));

              // send authenticated email
              socket.write(ws.encode(JSON.stringify({
                email: persona.email,
                expires: persona.expires,
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

        } else if (inputObject.clearText) {

          encodedMessage = ws.encode(JSON.stringify({
            from: name,
            clearText: inputObject.clearText
          }));

        } else if (inputObject.cipherText) {

          encodedMessage = ws.encode(JSON.stringify({
            from: name,
            cipherText: inputObject.cipherText
          }));

        } else if (inputObject.settings) {

          encodedMessage = ws.encode(JSON.stringify({
            from: name,
            settings: inputObject.settings
          }));

        } else {
          console.log(name + ' send invalid message: ' +
            JSON.stringify(inputObject));
        }

        if (encodedMessage) {
          sockets.forEach(function (socket) {
            socket.write(encodedMessage);
          });
        }

      } catch (e) {
        console.log(name + ' caused and exception: ' +
          JSON.stringify(inputObject));

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

      leave = function () {};
    };
  };
}());
