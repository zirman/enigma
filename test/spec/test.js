/*jshint
indent: 2
*/

/*global describe, it */
'use strict';
(function () {

  describe('ENIGMA.EnigmaMachine', function () {

    describe('#encipherString()', function () {

      it('should encipher "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" as "bdzgowcxltksbtmcdlpbmuqofxyhcxtgyjflinhnxshiuntheorxpqpkovhcbubtzszsoostgotfsodbbzzlxlcyzxifgwfdzeeqibmgfjbwzfckpfmgbxqc"', function () {
        var enigma = new ENIGMA.EnigmaMachine();

        assert.equal(enigma.encipherString(
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
          'bdzgowcxltksbtmcdlpbmuqofxyhcxtgyjflinhnxshiuntheorxpqpkovhcbubtzszsoostgotfsodbbzzlxlcyzxifgwfdzeeqibmgfjbwzfckpfmgbxqc');
      });
    });
  });
})();
