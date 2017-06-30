'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

var simpleFormatted = (0, _index2.default)(numberFormat);
var simpleAllowNull = (0, _index2.default)(numberFormat, true);

describe('format', function () {
  it('formats null, undefined, empty string as empty string', function () {
    [undefined, null, '', undefined].forEach(function (value) {
      return (0, _expect2.default)(simpleAllowNull.format(value)).toBe('');
    });
  });

  it('parses strings before formatting them', function () {
    (0, _expect2.default)(simpleAllowNull.format('123')).toBe('123.00');
  });

  it('Throws if value is not a finite number or string number', function () {
    // TODO: '2booya2' should throw.
    [false, '2-2', true].forEach(function (value) {
      (0, _expect2.default)(simpleAllowNull.format.bind(null, value)).toThrow();
    });
  });

  it('Formats a finite number to a string using numberFormat', function () {
    (0, _expect2.default)(simpleFormatted.format(3000.21)).toBe('3,000.21');
  });
});

describe('splice', function () {
  describe('deletion', function () {
    it('works', function () {
      (0, _expect2.default)(simpleFormatted.splice('1.23', 0, 1)).toBe(0.23);
    });
    it('works 2', function () {
      (0, _expect2.default)(simpleFormatted.splice('1.23', 0, 3)).toBe(0.03);
    });
    it('works 3', function () {
      (0, _expect2.default)(simpleFormatted.splice('1.23', 0, 4)).toBe(null);
    });
    it('works 3b', function () {
      (0, _expect2.default)(simpleFormatted.splice('11.23', 0, 1)).toBe(1.23);
    });
    it('works 4', function () {
      (0, _expect2.default)(simpleFormatted.splice('-1.23', 1, 2)).toBe(-0.23);
    });
    it('converts no digits to null', function () {
      (0, _expect2.default)(simpleAllowNull.splice('$1.23', 1, 5)).toBe(null);
    });
  });

  describe('insertion', function () {
    it('works', function () {
      (0, _expect2.default)(simpleFormatted.splice('1.23', 0, 0, '2')).toBe(21.23);
    });

    it('works', function () {
      (0, _expect2.default)(simpleFormatted.splice('1.23', 2, 0, '4')).toBe(14.23);
    });
    it('works', function () {
      (0, _expect2.default)(simpleFormatted.splice('1.23', 3, 0, '4')).toBe(12.43);
    });
    it('works', function () {
      (0, _expect2.default)(simpleFormatted.splice('4,561.23', 2, 0, '2')).toBe(42561.23);
    });
  });
});

/*
TODO: Fix on phantomJS. Works on chrome.
describe('parse', () => {
  const percentFormatted = abstractNumberInput(new Intl.NumberFormat('en-US', {
    style: 'percent',
  }));

  describe('percent', () => {
    it('works', () => {
      expect(percentFormatted.parse('10.0 %')).toBe(0.1)
    });
  });
});
*/

describe('flipSign', function () {
  it('works', function () {
    (0, _expect2.default)(simpleFormatted.flipSign('1.23')).toBe(-1.23);
  });
  it('works', function () {
    (0, _expect2.default)(simpleFormatted.flipSign('-1.23')).toBe(1.23);
  });
});