/*jshint indent: 2, maxlen: 80, strict: true, bitwise: false*/

(function () {
  'use strict';

  /*
   * decodes a websocket frame and returns a Buffer
   */

  exports.getDecoder = function () {
    var length = 0; // websocket frame length
    var maskBytes;
    var decoded;
    var decodedIndex;

    return function (data) {
      var dataBytes;

      // if this is the first data for this frame
      if (length === 0) {

        var type = data[0];

        if (type !== 0x81) {
          console.log('type is not text (0x81): ' + type);
          return;
        }

        length = data[1] & 127;

        var firstMaskByte;

        if (length === 126) {
          firstMaskByte = 4;
          length = (data[2] << 8) | data[3];

        } else if (length === 127) {
          firstMaskByte = 10;

          length =
            (data[2] << 56) |
            (data[3] << 48) |
            (data[4] << 40) |
            (data[5] << 32) |
            (data[6] << 24) |
            (data[7] << 16) |
            (data[8] <<  8) |
            data[9];

        } else {
          firstMaskByte = 2;
        }

        var firstDataByte = firstMaskByte + 4;
        maskBytes = data.slice(firstMaskByte, firstMaskByte + 4);
        dataBytes = data.slice(firstDataByte);
        decoded = new Buffer(length);
        decodedIndex = 0;

      } else {
        dataBytes = data;
      }

      for (var i = 0; i < dataBytes.length; decodedIndex += 1, i += 1) {
        decoded[decodedIndex] = dataBytes[i] ^ maskBytes[decodedIndex % 4];
      }

      if (decodedIndex < length) {
        return null;
      }

      length = 0;
      return decoded;
    };
  };

  /*
   * encodes a string into a websocket frame and returns a Buffer
   */

  exports.encode = function (message) {
    var frame, length, firstDataByte;

    length = Buffer.byteLength(message);

    if (length <= 125) {
      firstDataByte = 2;

      frame = new Buffer(length + firstDataByte);

      frame[1] = length;

    } else if (length <= 65535) {
      firstDataByte = 4;

      frame = new Buffer(length + firstDataByte);

      frame[1] = 126;
      frame[2] = (length & 0x000000000000ff00) >> 8;
      frame[3] = (length & 0x00000000000000ff);

    } else {
      firstDataByte = 10;

      frame = new Buffer(length + firstDataByte);

      frame[1] = 127;
      frame[2] = (length & 0xff00000000000000) >> 56;
      frame[3] = (length & 0x00ff000000000000) >> 48;
      frame[4] = (length & 0x0000ff0000000000) >> 40;
      frame[5] = (length & 0x000000ff00000000) >> 32;
      frame[6] = (length & 0x00000000ff000000) >> 24;
      frame[7] = (length & 0x0000000000ff0000) >> 16;
      frame[8] = (length & 0x000000000000ff00) >>  8;
      frame[9] = (length & 0x00000000000000ff);
    }

    // type: text frame
    frame[0] = 129;

    frame.write(message, firstDataByte);

    return frame;
  };
}());

