import React from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';
import {_setMuiComponentAndMaybeFocus} from './utils';
import utils from 'formsy-react/src/utils.js';

// Override mixin methods directly,
// as doing this on the class would cause an invariant error.
const { resetValue, componentWillReceiveProps, ...MixinFixed } = Formsy.Mixin;

function txt(v) {
  return v !== undefined ? v : '';
}

let FormsyText = React.createClass({
  mixins: [MixinFixed],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    // Replace undefined with empty string for defaultValue.
    // The default value must not be undefined, or the field comes
    // up in an inconsistent state.
    // This may be a mui issue, but fixable here.
    return (
      <TextField
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        defaultValue={txt(this.props.defaultValue)}
        value={this.getControlledValue()}
        errorText={this.getErrorMessage()}
        onChange={evt => this.handleChange(evt)}
      />
    );
  },

  isControlledByCaller: function() {
    return this.props.value !== undefined;
  },

  getControlledValue: function() {
    if (this.isControlledByCaller()) {
      // Controlled by caller: use the specified value.
      // For the same reason as above: replace undefined.
      return txt(this.props.value);
    } else {
      const value = this.getValue();
      if (this.isPristine()) {
        // When pristine: duplicate defaultValue as value.
        // For the same reason as above: replace undefined.
        return txt(this.props.defaultValue);
      } else {
        // value changed: do not set the value then.
        return txt(value);
      }
    }
  },

  handleChange: function(evt) {
    const value = evt.target.value;
    this.setValue(value);
    if (this.props.onChange) {
      this.props.onChange(evt);
    }
  },

  // The next methods are to make sure that defaultValue can be changed.

  componentWillReceiveProps: function (nextProps) {
    const nextDefaultValue = nextProps.defaultValue;
    if (nextDefaultValue !== undefined &&
        nextDefaultValue !== this.props.defaultValue &&
        this.isPristine()) {
      // A defaultValue has changed and we are pristine.
      // Save this as the new pristine state.
      this.setState({
        _pristineValue: nextDefaultValue,
        _value: nextDefaultValue
      });
    }
    // Do the original validation setting
    this.setValidations(nextProps.validations, nextProps.required);
  },

  resetValue: function () {
    // Must set it to the default value, instead of the pristine.
    const defaultValue = this.props.defaultValue;
    const pristineValue = defaultValue !== undefined ? defaultValue : this.state._pristineValue;
    this.setState({
      _value: pristineValue,
      _pristineValue: pristineValue,
      _isPristine: true
    }, () => {
      this.context.formsy.validate(this);
    });
  }

});

export default  FormsyText;
