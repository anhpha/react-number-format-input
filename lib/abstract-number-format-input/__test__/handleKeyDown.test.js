'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DELETE = 46;
var BACKSPACE = 8;
var ENTER = 13;
var LEFT_ARROW = 37;
function digit(zeroToNine) {
  return 48 + zeroToNine;
}

var numberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
});

var abstractNumInput = (0, _index2.default)(numberFormat, true);

describe('handleKeyDown', function () {
  function position(idx) {
    return { start: idx, end: idx };
  }

  describe('preventDefault and stopPropagation', function () {
    var selection = position(2);
    var value = '14.23';

    it('returns true values for BACKSPACE or DELETE', function () {
      [BACKSPACE, DELETE].forEach(function (charCode) {
        var _abstractNumInput$han = abstractNumInput.handleKeyDown({ charCode: charCode, selection: selection, value: value }),
            stopPropagation = _abstractNumInput$han.stopPropagation,
            preventDefault = _abstractNumInput$han.preventDefault;

        (0, _expect2.default)(stopPropagation).toBe(true);
        (0, _expect2.default)(preventDefault).toBe(true);
      });
    });

    it('returns false for other keys', function () {
      [ENTER, LEFT_ARROW, digit(3)].forEach(function (charCode) {
        var _abstractNumInput$han2 = abstractNumInput.handleKeyDown({ charCode: charCode, selection: selection, value: value }),
            stopPropagation = _abstractNumInput$han2.stopPropagation,
            preventDefault = _abstractNumInput$han2.preventDefault;

        (0, _expect2.default)(stopPropagation).toBeFalsy();
        (0, _expect2.default)(preventDefault).toBeFalsy();
      });
    });
  });

  describe('point selection', function () {
    it('handles BACKSPACE at start', function () {
      var _abstractNumInput$han3 = abstractNumInput.handleKeyDown({
        charCode: BACKSPACE,
        selection: position(0),
        value: '12.23'
      }),
          value = _abstractNumInput$han3.value;

      (0, _expect2.default)(value).toBe(12.23);
    });

    describe('BACKSPACE', function () {
      it('handles BACKSPACE across a comma', function () {
        var _abstractNumInput$han4 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(2),
          value: '1,234.00'
        }),
            value = _abstractNumInput$han4.value,
            selection = _abstractNumInput$han4.selection;

        (0, _expect2.default)(value).toBe(234.00);
        (0, _expect2.default)(selection).toEqual(position(0));
      });

      it('handles BACKSPACE across a decimal', function () {
        var _abstractNumInput$han5 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(2),
          value: '14.23'
        }),
            value = _abstractNumInput$han5.value,
            selection = _abstractNumInput$han5.selection;

        (0, _expect2.default)(value).toBe(1.23);
        (0, _expect2.default)(selection).toEqual(position(1));
      });

      it('handles BACKSPACE across a decimal with single integer digit', function () {
        var _abstractNumInput$han6 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(2),
          value: '1.23'
        }),
            value = _abstractNumInput$han6.value,
            selection = _abstractNumInput$han6.selection;

        (0, _expect2.default)(value).toBe(0.23);
        (0, _expect2.default)(selection).toEqual(position(1));
      });

      it('handles BACKSPACE across a decimal with no integer digit', function () {
        var _abstractNumInput$han7 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(1),
          value: '0.23'
        }),
            value = _abstractNumInput$han7.value,
            selection = _abstractNumInput$han7.selection;

        (0, _expect2.default)(value).toBe(0.23);
        (0, _expect2.default)(selection).toEqual(position(1));
      });

      it('handles BACKSPACE in the middle', function () {
        var _abstractNumInput$han8 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(2),
          value: '123.45'
        }),
            value = _abstractNumInput$han8.value,
            selection = _abstractNumInput$han8.selection;

        (0, _expect2.default)(value).toBe(13.45);
        (0, _expect2.default)(selection).toEqual(position(1));
      });

      it('handles BACKSPACE at the end no fractions', function () {
        var _abstractNumInput$han9 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(4),
          value: '1.00'
        }),
            value = _abstractNumInput$han9.value,
            selection = _abstractNumInput$han9.selection;

        (0, _expect2.default)(value).toBe(0.10);
        (0, _expect2.default)(selection).toEqual(position(4));
      });

      it('handles BACKSPACE at the end no integers', function () {
        var _abstractNumInput$han10 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(4),
          value: '1.23'
        }),
            value = _abstractNumInput$han10.value,
            selection = _abstractNumInput$han10.selection;

        (0, _expect2.default)(value).toBe(0.12);
        (0, _expect2.default)(selection).toEqual(position(4));
      });

      it('handles BACKSPACE at the end but multiple integers', function () {
        var _abstractNumInput$han11 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(5),
          value: '14.23'
        }),
            value = _abstractNumInput$han11.value,
            selection = _abstractNumInput$han11.selection;

        (0, _expect2.default)(value).toBe(1.42);
        (0, _expect2.default)(selection).toEqual(position(4));
      });

      it('BACKSPACE with value of zero clears the input', function () {
        var _abstractNumInput$han12 = abstractNumInput.handleKeyDown({
          charCode: BACKSPACE,
          selection: position(5),
          value: '0.00'
        }),
            value = _abstractNumInput$han12.value,
            selection = _abstractNumInput$han12.selection;

        (0, _expect2.default)(value).toBe(null);
        (0, _expect2.default)(selection).toEqual(position(0));
      });
    });

    describe('DELETE', function () {
      it('handles DELETE at start with no integers', function () {
        var _abstractNumInput$han13 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: position(0),
          value: '0.45'
        }),
            value = _abstractNumInput$han13.value,
            selection = _abstractNumInput$han13.selection;

        (0, _expect2.default)(value).toBe(0.45);
        (0, _expect2.default)(selection).toEqual(position(1));
      });

      it('handles DELETE in the middle', function () {
        var _abstractNumInput$han14 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: position(1),
          value: '123.45'
        }),
            value = _abstractNumInput$han14.value,
            selection = _abstractNumInput$han14.selection;

        (0, _expect2.default)(value).toBe(13.45);
        (0, _expect2.default)(selection).toEqual(position(1));
      });

      it('handles DELETE at the end', function () {
        var _abstractNumInput$han15 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: position(5),
          value: '12.34'
        }),
            value = _abstractNumInput$han15.value,
            selection = _abstractNumInput$han15.selection;

        (0, _expect2.default)(value).toBe(12.34);
        (0, _expect2.default)(selection).toEqual(position(5));
      });

      it('handles DELETE across a comma', function () {
        var _abstractNumInput$han16 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: position(1),
          value: '1,234.00'
        }),
            value = _abstractNumInput$han16.value,
            selection = _abstractNumInput$han16.selection;

        (0, _expect2.default)(value).toBe(134.00);
        (0, _expect2.default)(selection).toEqual(position(1));
      });

      it('handles DELETE across a decimal', function () {
        var _abstractNumInput$han17 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: position(1),
          value: '1.23'
        }),
            value = _abstractNumInput$han17.value,
            selection = _abstractNumInput$han17.selection;

        (0, _expect2.default)(value).toBe(0.13);
        (0, _expect2.default)(selection).toEqual(position(3));
      });

      it('handles DELETE across a decimal with no integers', function () {
        var _abstractNumInput$han18 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: position(0),
          value: '0.23'
        }),
            value = _abstractNumInput$han18.value,
            selection = _abstractNumInput$han18.selection;

        (0, _expect2.default)(value).toBe(0.23);
        (0, _expect2.default)(selection).toEqual(position(1));
      });

      it('DELETE with value of zero clears the input', function () {
        var _abstractNumInput$han19 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: position(0),
          value: '0.00'
        }),
            value = _abstractNumInput$han19.value,
            selection = _abstractNumInput$han19.selection;

        (0, _expect2.default)(value).toBe(null);
        (0, _expect2.default)(selection).toEqual(position(0));
      });
    });

    describe('range selection', function () {
      it('removes characters', function () {
        var _abstractNumInput$han20 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: { start: 1, end: 4 },
          value: '12.34'
        }),
            value = _abstractNumInput$han20.value;

        (0, _expect2.default)(value).toBe(0.14);
      });

      it('removes all characters', function () {
        var _abstractNumInput$han21 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: { start: 0, end: 5 },
          value: '12.34'
        }),
            value = _abstractNumInput$han21.value;

        (0, _expect2.default)(value).toBe(null);
      });

      it('keeps decimal', function () {
        var _abstractNumInput$han22 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: { start: 1, end: 3 },
          value: '1.23'
        }),
            value = _abstractNumInput$han22.value;

        (0, _expect2.default)(value).toBe(0.13);
      });

      it('keeps decimal 2', function () {
        var _abstractNumInput$han23 = abstractNumInput.handleKeyDown({
          charCode: DELETE,
          selection: { start: 0, end: 3 },
          value: '1.23'
        }),
            value = _abstractNumInput$han23.value;

        (0, _expect2.default)(value).toBe(0.03);
      });
    });
  });
});