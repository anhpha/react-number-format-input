'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAbstractNumberFormatInput;

var _spliceString = require('./util/spliceString');

var _spliceString2 = _interopRequireDefault(_spliceString);

var _parseNumber = require('./util/parseNumber');

var _parseNumber2 = _interopRequireDefault(_parseNumber);

var _escapeRegExp = require('./util/escapeRegExp');

var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

var _indexOfLastDigit = require('./util/indexOfLastDigit');

var _indexOfLastDigit2 = _interopRequireDefault(_indexOfLastDigit);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _nextPosition = require('./nextPosition');

var _nextPosition2 = _interopRequireDefault(_nextPosition);

var _lodash = require('lodash.isfinite');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function indexOfDigit(str, start, direction) {
  var pos = start;
  while (str.charAt(pos).match(/\D/)) {
    pos += direction;
  }return pos;
}

var BACKSPACE = 8;
var TAB = 9;
var ENTER = 13;
var DELETE = 46;

function justDigits(str) {
  return str.replace(/\D/g, '');
}

function isNegative(formattedNumber) {
  return !!formattedNumber.match(/-/);
}

function createAbstractNumberFormatInput(numberFormat) {
  var _numberFormat$resolve = numberFormat.resolvedOptions(),
      maximumFractionDigits = _numberFormat$resolve.maximumFractionDigits,
      style = _numberFormat$resolve.style;

  var allowsFractionDigits = maximumFractionDigits > 0;
  var isPercent = style === 'percent';
  var decimalChar = allowsFractionDigits ? numberFormat.format(0.1).match(/\d(\D+)\d/)[1] : null;

  var fractionRegExp = allowsFractionDigits ? new RegExp((0, _escapeRegExp2.default)(decimalChar) + '\\d*\\b') : null;
  var fractionPlaceholder = allowsFractionDigits ? decimalChar + Array(maximumFractionDigits + 1).join('0') : null;

  function parse(formattedNumber) {
    if (formattedNumber === '') return null;
    var number = (0, _parseNumber2.default)(formattedNumber, decimalChar);
    return isPercent ? number / 100 : number;
  }

  function addTrailingZeros(formattedNumber) {
    if (!allowsFractionDigits) return formattedNumber;

    var match = fractionRegExp.exec(formattedNumber);
    var existingFractionLength = match ? match[0].length : 0;
    var placeholder = fractionPlaceholder.slice(existingFractionLength);
    return (0, _spliceString2.default)(formattedNumber, (0, _indexOfLastDigit2.default)(formattedNumber) + 1, 0, placeholder);
  }

  function format(number) {
    if (number === null || number === undefined) return '';
    if (typeof number === 'string') return format(parse(number));
    (0, _invariant2.default)((0, _lodash2.default)(number), 'Illegal number value: ' + JSON.stringify(number));
    return addTrailingZeros(numberFormat.format(number));
  }

  function placeDecimalInDigits(digits) {
    if (!allowsFractionDigits) return digits;

    var extraDigits = digits.length - maximumFractionDigits;
    var leadingFractionZerosNeeded = Math.max(0, -extraDigits);
    var integerDigits = Math.max(0, extraDigits);
    var decimalAndLeadingZeros = fractionPlaceholder.slice(0, 1 + leadingFractionZerosNeeded);

    return (0, _spliceString2.default)(digits, integerDigits, 0, decimalAndLeadingZeros);
  }

  function fixupSplice(editedStr) {
    var _temp = justDigits(editedStr);
    if (!_temp.length) return null;
    var digits = _temp.length ? _temp : '0';
    var digitsWithDecimal = placeDecimalInDigits(digits);
    var sign = isNegative(editedStr) ? '-' : '';
    return parse(sign + digitsWithDecimal);
  }

  function splice(formattedNumber, position, deleteCount) {
    var insertDigits = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    return fixupSplice((0, _spliceString2.default)(formattedNumber, position, deleteCount, justDigits(insertDigits)));
  }

  function flipSign(formattedNumber) {
    return -parse(formattedNumber);
  }

  function ensureLength(nextValue, oldValue, maxLength) {
    // Revert to oldValue if nextValue does not fit in input's maxLength.
    // We force nextValue to be negative to ensure there's always room for a minus sign.
    return format(-Math.abs(nextValue)).length > maxLength ? oldValue : nextValue;
  }

  // TODO(dbrans): Needs tests.
  function handlePaste(_ref) {
    var pasteText = _ref.pasteText,
        selection = _ref.selection,
        value = _ref.value,
        maxLength = _ref.maxLength;
    var start = selection.start,
        end = selection.end;
    var preventDefault = true,
        stopPropagation = true;

    var nextValue = ensureLength(splice(value, start, end - start, pasteText), parse(value), maxLength);
    var position = (0, _nextPosition2.default)({ start: start, end: end }, value, format(nextValue));
    return { selection: { start: position, end: position }, value: nextValue, preventDefault: preventDefault, stopPropagation: stopPropagation };
  }

  // TODO(dbrans): Needs tests.
  function handleCut(_ref2) {
    var selection = _ref2.selection,
        value = _ref2.value;
    var start = selection.start,
        end = selection.end;
    var preventDefault = true,
        stopPropagation = false;

    var nextValue = splice(value, start, end - start);
    var position = (0, _nextPosition2.default)({ start: start, end: end }, value, format(nextValue));
    var clipboardText = value.slice(start, end);
    return { selection: { start: position, end: position }, value: nextValue, preventDefault: preventDefault, stopPropagation: stopPropagation, clipboardText: clipboardText };
  }

  function handleKeyPress(_ref3) {
    var charCode = _ref3.charCode,
        metaKey = _ref3.metaKey,
        altKey = _ref3.altKey,
        ctrlKey = _ref3.ctrlKey,
        selection = _ref3.selection,
        value = _ref3.value,
        maxLength = _ref3.maxLength;
    var start = selection.start,
        end = selection.end;

    var char = String.fromCharCode(charCode);
    var oldValue = parse(value);
    var nextValue = oldValue;
    var preventDefault = false,
        stopPropagation = false;


    if (char === '-' || char === '+') {
      if (char === '-' || char === '+' && isNegative(value)) nextValue = flipSign(value);
      preventDefault = true;
      stopPropagation = true;
    } else if (char.match(/\d/)) {
      // DIGIT
      nextValue = ensureLength(splice(value, start, end - start, char), oldValue, maxLength);
      preventDefault = true;
      stopPropagation = true;
    } else if (charCode === ENTER || charCode === TAB || metaKey || altKey || ctrlKey) {
      preventDefault = false;
      // Allow ENTER and TAB event to do its thing on a form (submit and change focus).

      stopPropagation = false;
    } else {
      preventDefault = true;
      // Any other key preventDefault but don't stopPropagation.

      stopPropagation = false;
    }
    var position = (0, _nextPosition2.default)({ start: start, end: end }, value, format(nextValue));

    return { selection: { start: position, end: position }, value: nextValue, preventDefault: preventDefault, stopPropagation: stopPropagation };
  }

  function handleKeyDown(_ref4) {
    var charCode = _ref4.charCode,
        selection = _ref4.selection,
        value = _ref4.value;

    var passThrough = { selection: selection, value: parse(value), preventDefault: false, stopPropagation: false };
    if (charCode !== DELETE && charCode !== BACKSPACE) return passThrough;

    var start = selection.start,
        end = selection.end;

    if (start === end) {
      // No significant digits, when user presses DELETE or backspace we clear the input.
      if (parse(value) === 0) return { selection: { start: 0, end: 0 }, value: null };
      // No selection: backspace and delete behave differently.
      var pos = charCode === DELETE ? indexOfDigit(value, start, 1) : indexOfDigit(value, start - 1, -1);
      if (pos >= 0 && pos < value.length) {
        ;
        start = pos;
        end = pos + 1;
      }
    }

    var nextValue = splice(value, start, end - start);
    var position = (0, _nextPosition2.default)({ start: start, end: end }, value, format(nextValue));

    return {
      selection: { start: position, end: position },
      value: nextValue,
      stopPropagation: true,
      preventDefault: true
    };
  }

  return { parse: parse, format: format, splice: splice, flipSign: flipSign, isNegative: isNegative, handleKeyDown: handleKeyDown, handleKeyPress: handleKeyPress, handleCut: handleCut, handlePaste: handlePaste };
}