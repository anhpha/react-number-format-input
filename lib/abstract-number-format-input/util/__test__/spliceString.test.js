'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _spliceString = require('./../spliceString');

var _spliceString2 = _interopRequireDefault(_spliceString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var str = '0123456789';
var inserted = 'abcde';

describe('spliceString', function () {
  it('deletes characters', function () {
    (0, _expect2.default)((0, _spliceString2.default)(str, 0, 2)).toBe('23456789');
    (0, _expect2.default)((0, _spliceString2.default)(str, 8, 20)).toBe('01234567');
    (0, _expect2.default)((0, _spliceString2.default)(str, 8, 0)).toBe('0123456789');
  });

  it('inserts characters', function () {
    (0, _expect2.default)((0, _spliceString2.default)(str, 0, 0, inserted)).toBe('abcde0123456789');
    (0, _expect2.default)((0, _spliceString2.default)(str, 8, 0, inserted)).toBe('01234567abcde89');
  });

  it('inserts and deletes characters', function () {
    (0, _expect2.default)((0, _spliceString2.default)(str, 0, 2, inserted)).toBe('abcde23456789');
    (0, _expect2.default)((0, _spliceString2.default)(str, 8, 2, inserted)).toBe('01234567abcde');
    (0, _expect2.default)((0, _spliceString2.default)(str, 5, 2, inserted)).toBe('01234abcde789');
    (0, _expect2.default)((0, _spliceString2.default)(str, 0, str.length + 2, inserted)).toBe(inserted);
  });
});