const React = require('react');
const Formsy = require('formsy-react');
const TextField = require('material-ui/TextField').default;

let FormsyText = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
  },

  handleChange: function handleChange(event) {
    if(this.getErrorMessage() != null){
      this.setValue(event.currentTarget.value);
    }
    else{
      if (this.isValidValue(event.target.value)) {
        this.setValue(event.target.value);
      }
      else{
        this.setState({
          _value: event.currentTarget.value,
          _isPristine: false
        });
      }
    }
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
  },

  handleEnterKeyDown: function handleEnterKeyDown(event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    return (
      <TextField
        {...this.props}
        defaultValue={this.props.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onEnterKeyDown={this.handleEnterKeyDown}
        errorText={this.getErrorMessage()}
        value={this.getValue()} />
    );
  }
});

module.exports = FormsyText;
