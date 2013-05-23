/*jshint indent: 2, maxlen: 80, strict: true, bitwise: false*/

(function () {
  'use strict';

  /*
   * decodes a websocket frame and returns a Buffer
   */

  exports.getDecoder = function () {
    var opcode = 0;
    var decoded = null;
    var decodedIndex = 0;
    var mask = null;

    return function (data) {
      var length;
      var dataIndex;

      // if this is the first data for this frame
      if (decoded === null) {

        if (data.length < 2) {
          console.log('Frame too short');
        }

        opcode = data[0] & 0x0f;

        length = data[1] & 127;

        var maskIndex;

        if (length === 126) {
          maskIndex = 4;
          length = (data[2] << 8) | data[3];

        } else if (length === 127) {
          maskIndex = 10;

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
          maskIndex = 2;
        }

        dataIndex = maskIndex + 4;
        mask = data.slice(maskIndex, dataIndex);
        decoded = new Buffer(length);
        decodedIndex = 0;

      } else {
        dataIndex = 0;
      }

      for (; dataIndex < data.length; decodedIndex += 1, dataIndex += 1) {
        decoded[decodedIndex] = data[dataIndex] ^ mask[decodedIndex % 4];
      }

      if (decodedIndex < decoded.length) {
        return null;
      }

      var retVal = decoded;
      decoded = null;
      decodedIndex = 0;
      mask = null;

      switch (opcode) {
      // continuation frame
      case 0x00:
        return null;

      // text frame
      case 0x01:
        return retVal;

      // binary frame
      case 0x02:
        return null;

      // reserved for further non-control frames
      case 0x03:
      case 0x04:
      case 0x05:
      case 0x06:
      case 0x07:
        return null;

      // connection close
      case 0x08:
        return null;

      // ping
      case 0x09:
        // probably should send a pong back
        return null;

      // pong
      case 0x0a:
        return null;

      // reserved for further control frames
      case 0x0b:
      case 0x0c:
      case 0x0d:
      case 0x0f:
        return null;

      default:
        return null;
      }
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

