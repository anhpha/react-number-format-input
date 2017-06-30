'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TAB = 9;
var ENTER = 13;
var MINUS = 45;
var PLUS = 43;

function digit(zeroToNine) {
  return 48 + zeroToNine;
}

var abstractNumInput = (0, _index2.default)(new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
}));

describe('handleKeyPress', function () {
  function position(idx) {
    return { start: idx, end: idx };
  }

  describe('stopPropagation and preventDefault', function () {
    it('both falsy for ENTER and TAB', function () {
      [ENTER, TAB].forEach(function (charCode) {
        var _abstractNumInput$han = abstractNumInput.handleKeyPress({ charCode: charCode, selection: position(2), value: '1.34' }),
            stopPropagation = _abstractNumInput$han.stopPropagation,
            preventDefault = _abstractNumInput$han.preventDefault;

        (0, _expect2.default)(stopPropagation).toBeFalsy();
        (0, _expect2.default)(preventDefault).toBeFalsy();
      });
    });

    it('both true for MINUS, PLUS, and digit', function () {
      [MINUS, PLUS, digit(2)].forEach(function (charCode) {
        var _abstractNumInput$han2 = abstractNumInput.handleKeyPress({ charCode: charCode, selection: position(2), value: '1.34' }),
            stopPropagation = _abstractNumInput$han2.stopPropagation,
            preventDefault = _abstractNumInput$han2.preventDefault;

        (0, _expect2.default)(stopPropagation).toBe(true);
        (0, _expect2.default)(preventDefault).toBe(true);
      });
    });
  });
  describe('MINUS', function () {
    var charCode = MINUS;

    it('returns negative when input is positive', function () {
      var _abstractNumInput$han3 = abstractNumInput.handleKeyPress({ charCode: charCode, selection: position(2), value: '1.34' }),
          value = _abstractNumInput$han3.value,
          selection = _abstractNumInput$han3.selection;

      (0, _expect2.default)(value).toBe(-1.34);
      (0, _expect2.default)(selection).toEqual(position(3));
    });

    it('returns positive when input is negative', function () {
      var pos = position(3);

      var _abstractNumInput$han4 = abstractNumInput.handleKeyPress({ charCode: charCode, selection: pos, value: '-1.34' }),
          value = _abstractNumInput$han4.value,
          selection = _abstractNumInput$han4.selection;

      (0, _expect2.default)(value).toBe(1.34);
      (0, _expect2.default)(selection).toEqual(position(2));
    });
  });

  describe('PLUS', function () {
    var charCode = PLUS;

    it('returns positive when input is positive', function () {
      var _abstractNumInput$han5 = abstractNumInput.handleKeyPress({ charCode: charCode, selection: position(0), value: '1.34' }),
          value = _abstractNumInput$han5.value;

      (0, _expect2.default)(value).toBe(1.34);
    });

    it('returns positive when input is negative', function () {
      var _abstractNumInput$han6 = abstractNumInput.handleKeyPress({ charCode: charCode, selection: position(0), value: '-1.34' }),
          value = _abstractNumInput$han6.value;

      (0, _expect2.default)(value).toBe(1.34);
    });
  });

  it('handles a digit', function () {
    var _abstractNumInput$han7 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: position(0), value: '-1.34' }),
        value = _abstractNumInput$han7.value;

    (0, _expect2.default)(value).toBe(-21.34);
  });

  it('handles a fraction digit', function () {
    var _abstractNumInput$han8 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: position(2), value: '1.34' }),
        value = _abstractNumInput$han8.value;

    (0, _expect2.default)(value).toBe(12.34);
  });

  it('handles a fraction digit breaks a thousand', function () {
    var _abstractNumInput$han9 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: position(5), value: '163.45' }),
        value = _abstractNumInput$han9.value,
        selection = _abstractNumInput$han9.selection;

    (0, _expect2.default)(value).toBe(1634.25);
    (0, _expect2.default)(selection).toEqual(position(7));
  });

  it('handles a fraction digit 2', function () {
    var _abstractNumInput$han10 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: position(4), value: '1.63' }),
        value = _abstractNumInput$han10.value,
        selection = _abstractNumInput$han10.selection;

    (0, _expect2.default)(value).toBe(16.32);
    (0, _expect2.default)(selection).toEqual(position(5));
  });

  describe('range selection', function () {
    it('handles a digit', function () {
      var _abstractNumInput$han11 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: { start: 0, end: 4 }, value: '1.34' }),
          value = _abstractNumInput$han11.value,
          selection = _abstractNumInput$han11.selection;

      (0, _expect2.default)(value).toBe(0.02);
      (0, _expect2.default)(selection).toEqual(position(4));
    });
  });

  describe('maxLength', function () {
    it('enough room', function () {
      var _abstractNumInput$han12 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: position(0), value: '1.34',
        maxLength: 6 }),
          value = _abstractNumInput$han12.value; // Leave extra character for a negative.

      (0, _expect2.default)(value).toBe(21.34);
    });

    it('not enough room if you leave room for a negative sign', function () {
      var _abstractNumInput$han13 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: position(0), value: '1.34',
        maxLength: 5 }),
          value = _abstractNumInput$han13.value;

      (0, _expect2.default)(value).toBe(1.34);
    });

    it('not enough room but leading zero', function () {
      var _abstractNumInput$han14 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: position(2),
        value: '-0.34', maxLength: 5 }),
          value = _abstractNumInput$han14.value;

      (0, _expect2.default)(value).toBe(-2.34);
    });

    it('not enough room but selection has digit', function () {
      var mySelection = { start: 1, end: 2 };

      var _abstractNumInput$han15 = abstractNumInput.handleKeyPress({ charCode: digit(2), selection: mySelection, value: '-1.34',
        maxLength: 5 }),
          value = _abstractNumInput$han15.value;

      (0, _expect2.default)(value).toBe(-2.34);
    });
  });
});