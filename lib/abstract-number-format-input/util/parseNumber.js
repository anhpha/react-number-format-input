'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseNumber;

var _escapeRegExp = require('./escapeRegExp');

var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _lodash = require('lodash.isfinite');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertZeroOrOneDecimalChar(str, decimalChar) {
  if (!decimalChar) return;
  var decimalRegExp = new RegExp((0, _escapeRegExp2.default)(decimalChar), 'g');
  var decimalMatches = str.match(decimalRegExp);
  var matchCount = decimalMatches ? decimalMatches.length : 0;
  (0, _invariant2.default)(matchCount <= 1, 'Expected 0 or 1 decimal matches but got ' + matchCount + '.\n      Decimal: \'' + decimalChar + '\' String: \'' + str + '\'');
}

function parseNumber(formattedNumber, decimalChar) {
  (0, _invariant2.default)(formattedNumber, 'Unable to parse: ' + JSON.stringify(formattedNumber));
  assertZeroOrOneDecimalChar(formattedNumber, decimalChar);

  var numberStr = formattedNumber.split(decimalChar).map(function (x) {
    return x.replace(/[^-\d]/g, '');
  }) // Remove all non-essential characters.
  .join('.'); // Join with decimal point.
  (0, _invariant2.default)(numberStr.lastIndexOf('-') <= 0, 'Misplaced minus sign in \'' + numberStr + '\'');

  var number = parseFloat(numberStr);
  (0, _invariant2.default)((0, _lodash2.default)(number), 'parseFloat was unable to parse \'' + numberStr + '\'');

  return number;
}