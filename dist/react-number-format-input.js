(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["NumberFormatInput"] = factory(require("react"));
	else
		root["NumberFormatInput"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(17);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(16);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _domElementSelection = __webpack_require__(13);

	var _index = __webpack_require__(8);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NumberFormatInput = function (_Component) {
	  _inherits(NumberFormatInput, _Component);

	  function NumberFormatInput() {
	    _classCallCheck(this, NumberFormatInput);

	    return _possibleConstructorReturn(this, (NumberFormatInput.__proto__ || Object.getPrototypeOf(NumberFormatInput)).apply(this, arguments));
	  }

	  _createClass(NumberFormatInput, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.nextSelection) (0, _domElementSelection.setSelection)(this.refs.input, this.nextSelection);
	      delete this.nextSelection;
	    }
	  }, {
	    key: 'getAbstractNumInput',
	    value: function getAbstractNumInput() {
	      return (0, _index2.default)(this.props.numberFormat);
	    }
	  }, {
	    key: 'handleKeyEvent',
	    value: function handleKeyEvent(handlerName, e) {
	      var charCode = e.which || e.charCode || e.keyCode;
	      var pasteText = e.clipboardData && e.clipboardData.getData('text') || '';
	      var inputValue = this.refs.input.value;

	      var selection = (0, _domElementSelection.getSelection)(this.refs.input);
	      var metaKey = e.metaKey,
	          altKey = e.altKey,
	          ctrlKey = e.ctrlKey;
	      var _props = this.props,
	          maxLength = _props.maxLength,
	          value = _props.value,
	          onChange = _props.onChange;


	      var next = this.getAbstractNumInput()[handlerName]({ charCode: charCode, metaKey: metaKey, altKey: altKey, ctrlKey: ctrlKey, value: inputValue, selection: selection, maxLength: maxLength, pasteText: pasteText });

	      if (next.value !== value) onChange(next.value);
	      this.nextSelection = next.selection;
	      if (next.preventDefault) e.preventDefault();
	      if (next.stopPropagation) e.stopPropagation();
	      if (next.clipboardText) e.clipboardData.setData('text', next.clipboardText);

	      return e;
	    }
	  }, {
	    key: 'eventHandlers',
	    value: function eventHandlers() {
	      var _this2 = this;

	      if (!this._eventHandlers) {
	        this._eventHandlers = {
	          onKeyPress: this.handleKeyEvent.bind(this, 'handleKeyPress'),
	          onKeyDown: this.handleKeyEvent.bind(this, 'handleKeyDown'),
	          onCut: this.handleKeyEvent.bind(this, 'handleCut'),
	          onPaste: this.handleKeyEvent.bind(this, 'handlePaste'),
	          onBlur: function onBlur() {
	            return (
	              // Some libraries like redux-form (v3.0.2) grab the value from the blur event.
	              // Intercept and pass the numeric value and not the input's string value.
	              _this2.props.value
	            );
	          },
	          onChange: function onChange() {
	            return (
	              // Changes are detected and bubbled up via key event handlers.
	              null
	            );
	          }
	        };

	        Object.keys(this._eventHandlers).forEach(function (key) {
	          var handler = _this2._eventHandlers[key];
	          _this2._eventHandlers[key] = function (e) {
	            var result = handler(e);
	            if (result && _this2.props[key]) _this2.props[key](result);
	          };
	        });
	      }
	      return this._eventHandlers;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          value = _props2.value,
	          inputProps = _objectWithoutProperties(_props2, ['value']);

	      delete inputProps.numberFormat;
	      inputProps.value = this.getAbstractNumInput().format(value);
	      return _react2.default.createElement('input', _extends({ ref: 'input', type: 'text' }, inputProps, this.eventHandlers()));
	    }
	  }]);

	  return NumberFormatInput;
	}(_react.Component);

	exports.default = NumberFormatInput;


	NumberFormatInput.PropTypes = {
	  value: _propTypes2.default.number,
	  numberFormat: _propTypes2.default.shape({
	    format: _propTypes2.default.func.isRequired,
	    resolvedOptions: _propTypes2.default.func.isRequired
	  }),
	  onChange: _propTypes2.default.func,
	  maxLength: _propTypes2.default.number
	};

	NumberFormatInput.defaultProps = {
	  maxLength: undefined,
	  numberFormat: new Intl.NumberFormat('en-US', {}),
	  onChange: function onChange() {}
	};

	NumberFormatInput.propTypes = {
	  maxLength: _propTypes2.default.number,
	  // An instance of Intl.NumberFormat.
	  numberFormat: _propTypes2.default.shape({
	    format: _propTypes2.default.func.isRequired,
	    resolvedOptions: _propTypes2.default.func.isRequired
	  }),
	  onChange: _propTypes2.default.func,
	  onBlur: _propTypes2.default.func,
	  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = escapeRegExp;
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (true) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(2);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (true) {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsFinite = root.isFinite;

	/**
	 * Checks if `value` is a finite primitive number.
	 *
	 * **Note:** This method is based on
	 * [`Number.isFinite`](https://mdn.io/Number/isFinite).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a finite number,
	 *  else `false`.
	 * @example
	 *
	 * _.isFinite(3);
	 * // => true
	 *
	 * _.isFinite(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isFinite(Infinity);
	 * // => false
	 *
	 * _.isFinite('3');
	 * // => false
	 */
	function isFinite(value) {
	  return typeof value == 'number' && nativeIsFinite(value);
	}

	module.exports = isFinite;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createAbstractNumberFormatInput;

	var _spliceString = __webpack_require__(12);

	var _spliceString2 = _interopRequireDefault(_spliceString);

	var _parseNumber = __webpack_require__(11);

	var _parseNumber2 = _interopRequireDefault(_parseNumber);

	var _escapeRegExp = __webpack_require__(1);

	var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

	var _indexOfLastDigit = __webpack_require__(10);

	var _indexOfLastDigit2 = _interopRequireDefault(_indexOfLastDigit);

	var _invariant = __webpack_require__(5);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _nextPosition = __webpack_require__(9);

	var _nextPosition2 = _interopRequireDefault(_nextPosition);

	var _lodash = __webpack_require__(6);

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

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = nextPosition;
	function nextPosition(_ref, value, nextValue) {
	  var start = _ref.start,
	      end = _ref.end;

	  var expectedShrinkage = end - start;
	  var actualShrinkage = value.length - nextValue.length;
	  return Math.max(0, start + (expectedShrinkage - actualShrinkage));
	}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = indexOfLastDigit;
	function indexOfLastDigit(str) {
	  var match = /\d\D*$/.exec(str);
	  return match ? match.index : -1;
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parseNumber;

	var _escapeRegExp = __webpack_require__(1);

	var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

	var _invariant = __webpack_require__(5);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _lodash = __webpack_require__(6);

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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = spliceString;
	/**
	 * String equivalent of Array::splice.
	 * Deletes characters from a string and inserts a second string where those
	 * characters were deleted.
	 * @param {string} str The string to splice into.
	 * @param {number} start The position of the deletion and insertion in the above string.
	 * @param {number} deleteCount The number of characters to delete.
	 * @param {string} insertString The string to insert.
	 * @returns {string} The spliced string.
	 */
	function spliceString(str, start, deleteCount) {
	  var insertString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	  return str.slice(0, start) + insertString + str.slice(start + deleteCount);
	}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSelection = getSelection;
	exports.setSelection = setSelection;
	function getSelection(elem) {
	  return { start: elem.selectionStart, end: elem.selectionEnd };
	}

	function setSelection(elem, _ref) {
	  var start = _ref.start,
	      _ref$end = _ref.end,
	      end = _ref$end === undefined ? start : _ref$end;

	  elem.setSelectionRange(start, end);
	}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	if (true) {
	  var invariant = __webpack_require__(3);
	  var warning = __webpack_require__(4);
	  var ReactPropTypesSecret = __webpack_require__(7);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (true) {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(2);
	var invariant = __webpack_require__(3);
	var warning = __webpack_require__(4);

	var ReactPropTypesSecret = __webpack_require__(7);
	var checkPropTypes = __webpack_require__(14);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (true) {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (("development") !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (true) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(15)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = require('./factoryWithThrowingShims')();
	}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ })
/******/ ])
});
;