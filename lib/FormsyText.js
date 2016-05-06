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

var _utils2 = require('formsy-react/src/utils.js');

var _utils3 = _interopRequireDefault(_utils2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Override mixin methods directly,
// as doing this on the class would cause an invariant error.
var _Formsy$Mixin = _formsyReact2.default.Mixin;
var resetValue = _Formsy$Mixin.resetValue;
var componentWillReceiveProps = _Formsy$Mixin.componentWillReceiveProps;

var MixinFixed = _objectWithoutProperties(_Formsy$Mixin, ['resetValue', 'componentWillReceiveProps']);

function txt(v) {
  return v !== undefined ? v : '';
}

var FormsyText = _react2.default.createClass({
  displayName: 'FormsyText',

  mixins: [MixinFixed],

  propTypes: {
    name: _react2.default.PropTypes.string.isRequired,
    value: _react2.default.PropTypes.any,
    onFocus: _react2.default.PropTypes.func,
    onBlur: _react2.default.PropTypes.func
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {
    var _this = this;

    // Replace undefined with empty string for defaultValue.
    // The default value must not be undefined, or the field comes
    // up in an inconsistent state.
    // This may be a mui issue, but fixable here.
    return _react2.default.createElement(_TextField2.default, _extends({}, this.props, {
      ref: this._setMuiComponentAndMaybeFocus,
      defaultValue: txt(this.props.defaultValue),
      value: this.getControlledValue(),
      errorText: this.getErrorMessage(),
      onChange: function onChange(evt) {
        return _this.handleChange(evt);
      }
    }));
  },

  isControlledByCaller: function isControlledByCaller() {
    return this.props.value !== undefined;
  },

  getControlledValue: function getControlledValue() {
    if (this.isControlledByCaller()) {
      // Controlled by caller: use the specified value.
      // For the same reason as above: replace undefined.
      return txt(this.props.value);
    } else {
      var value = this.getValue();
      console.log('controlledValue', this.isPristine(), value);
      if (value === undefined) {
        // When pristine: duplicate defaultValue as value.
        // (Do not actually use isPristine here, because
        // it will be set to false during the submit.)
        // For the same reason as above: replace undefined.
        return txt(this.props.defaultValue);
      } else {
        // value changed: do not set the value then.
        return value;
      }
    }
  },

  handleChange: function handleChange(evt) {
    var value = evt.target.value;
    this.setValue(value);
    if (this.props.onChange) {
      this.props.onChange(evt);
    }
  },

  // The next methods are to make sure that defaultValue can be changed.

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    var nextDefaultValue = nextProps.defaultValue;
    if (nextDefaultValue !== undefined && nextDefaultValue !== this.props.defaultValue && this.isPristine()) {
      // A defaultValue has changed and we are pristine.
      // Save this as the new pristine state.
      console.log('XXX set');
      this.setState({
        _pristineValue: nextDefaultValue,
        _value: nextDefaultValue
      });
    }
    // Do the original validation setting
    this.setValidations(nextProps.validations, nextProps.required);
  },

  resetValue: function resetValue() {
    var _this2 = this;

    console.log('resetValue');
    // Must set it to the default value, instead of the pristine.
    var defaultValue = this.props.defaultValue;
    var pristineValue = defaultValue !== undefined ? defaultValue : this.state._pristineValue;
    this.setState({
      _value: pristineValue,
      _pristineValue: pristineValue,
      _isPristine: true
    }, function () {
      _this2.context.formsy.validate(_this2);
    });
  }

});

exports.default = FormsyText;