'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _domElementSelection = require('./domElementSelection');

var _index = require('./abstract-number-format-input/index');

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