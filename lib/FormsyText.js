'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyText = _react2.default.createClass({
  displayName: 'FormsyText',

  mixins: [_formsyReact2.default.Mixin],

  propTypes: {
    name: _react2.default.PropTypes.string.isRequired,
    value: _react2.default.PropTypes.any,
    onFocus: _react2.default.PropTypes.func,
    onBlur: _react2.default.PropTypes.func
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleKeyDown: function handleKeyDown(event) {
    if ((0, _keycode2.default)(event) === 'enter') this.handleEnterKeyDown(event);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  handleEnterKeyDown: function handleEnterKeyDown(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onEnterKeyDown) this.props.onEnterKeyDown(event, event.currentTarget.value);
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {
    // value must not be passed in, because it makes the field value unchangeable.
    var _props = this.props;
    var value = _props.value;

    var props = _objectWithoutProperties(_props, ['value']);

    return _react2.default.createElement(_TextField2.default, _extends({}, props, {
      ref: this._setMuiComponentAndMaybeFocus,
      defaultValue: value,
      onBlur: this.handleBlur,
      onFocus: this.props.onFocus,
      onKeyDown: this.handleKeyDown,
      errorText: this.getErrorMessage()
    }));
  }
});

exports.default = FormsyText;