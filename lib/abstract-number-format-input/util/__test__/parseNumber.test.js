'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _parseNumber = require('./../parseNumber');

var _parseNumber2 = _interopRequireDefault(_parseNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultDecimalChar = '.';

describe('parse', function () {
  it('throws for empty values', function () {
    ['', null, undefined].forEach(function (val) {
      (0, _expect2.default)(_parseNumber2.default.bind(null, val, defaultDecimalChar)).toThrow();
    });
  });

  it('handles commas', function () {
    ['110,000', '110,00,0', '110,00,0', '110,000'].forEach(function (val) {
      (0, _expect2.default)((0, _parseNumber2.default)(val, defaultDecimalChar)).toBe(110000);
    });
  });

  it('handles decimals', function () {
    var expected = [110000.1, 0.055, 0.1, 16.6];
    ['110,000.1', '.055', '0.1', '16.6'].forEach(function (val) {
      (0, _expect2.default)((0, _parseNumber2.default)(val, defaultDecimalChar)).toEqual(expected.shift());
    });
  });

  it('handles leading and trailing zeros', function () {
    var expected = [110000.1, 0.055, 0.01, 16.6];
    ['0110,000.10', '0.0550', '0.010', '016.60'].forEach(function (val) {
      (0, _expect2.default)((0, _parseNumber2.default)(val, defaultDecimalChar)).toEqual(expected.shift());
    });
  });

  it('handles prefix and suffix', function () {
    var expected = [110000.1, 0.055, 0.01, 16.6];
    ['$0110,000.10 USD', '$0.0550 USD', '$0.010 USD', '$016.60 USD'].forEach(function (val) {
      (0, _expect2.default)((0, _parseNumber2.default)(val, defaultDecimalChar)).toEqual(expected.shift());
    });
  });

  it('handles other decimal characters', function () {
    var expected = [110000.1, 0.055, 0.01, 16.6];
    ['0110.000,10', '0,0550', '0,010', '016,60'].forEach(function (val) {
      (0, _expect2.default)((0, _parseNumber2.default)(val, ',')).toEqual(expected.shift());
    });
  });

  it('handles percent', function () {
    (0, _expect2.default)((0, _parseNumber2.default)('10.0%', '.')).toBe(10);
  });

  it('throws when magnitude is unparsable', function () {
    // TODO: '2booya2' should throw.
    ['-', '.', '-.', '3-3', '3.3-'].forEach(function (val) {
      (0, _expect2.default)(_parseNumber2.default.bind(null, val, defaultDecimalChar)).toThrow();
    });
  });

  it('reads sign with and without prefix', function () {
    var expected = [-110000.1, -7.055, -2, -16.6];
    ['-110,000.10', '-$7.0550USD', '-$02 USD', '$-016.60'].forEach(function (val) {
      (0, _expect2.default)((0, _parseNumber2.default)(val, defaultDecimalChar)).toEqual(expected.shift());
    });
  });
});