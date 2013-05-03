/*jshint indent: 2, maxlen: 80, strict: true, bitwise: false*/

(function () {
  'use strict';

  /*
   * decodes a websocket frame and returns a Buffer
   */

  exports.decode = function (frame) {
    var type, length, firstMaskByte, firstDataByte, maskBytes, dataBytes,
      decoded, i;

    type = frame[0];
    length = frame[1] & 127;

    if (length === 126) {
      firstMaskByte = 4;

    } else if (length === 127) {
      firstMaskByte = 10;

    } else {
      firstMaskByte = 2;
    }

    firstDataByte = firstMaskByte + 4;
    maskBytes = frame.slice(firstMaskByte, firstMaskByte + 4);
    dataBytes = frame.slice(firstDataByte);
    length = dataBytes.length;

    decoded = new Buffer(length);

    for (i = 0; i < length; i += 1) {
      decoded[i] = dataBytes[i] ^ maskBytes[i % 4];
    }

    return decoded;
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

