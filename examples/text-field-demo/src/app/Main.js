import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';


export default class Form extends Formsy.Form {

  constructor() {
    super();
    this.getPristineValues = function getPristineValues() {
      return this.inputs.reduce((data, component) => {
        const name = component.props.name;
        // try both defaltValue, and value.
        data[name] = component.props.defaultValue || component.props.value;
        return data;
      }, {});
    };

  }

}


const Main = React.createClass({

  /**
   * As an alternative to `MuiThemeProvider` you can add a theme directly into context.
   * See the [Material-UI themes](http://www.material-ui.com/#/customization/themes) docs for details.
   *
   * childContextTypes: {
   *   muiTheme: React.PropTypes.object,
   * },
   * getChildContext(){
   *   return {
   *     muiTheme: getMuiTheme(),
   *   }
   * },
   */

  getInitialState() {
    return {
      canSubmit: false,
      defaultValue: 'Default value',
      value: '',
      contentJson: '',
      formEnabled: true
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
  },

  styles: {
    paperStyle: {
      width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
  },

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  updateForm(formValues, isChanged) {
    if (! isChanged) {
      return;
    }
    this.setState(formValues);
  },

  resetForm() {
    this.refs.form.reset()
  },

  recreateForm() {
    this.setState({ formEnabled: false });
    setTimeout(() => {
      this.setState({ formEnabled: true });
    }, 1000);
  },

  renderForm () {
    if (! this.state.formEnabled) {
      return null;
    }
    let { submitStyle } = this.styles;

    return (
      <Form ref="form"
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
        onInvalidSubmit={this.notifyFormError}
        >
        <FormsyText
          name="name"
          defaultValue={ this.state.defaultValue }
          value={ this.state.value }
          hintText="What is your name?"
          floatingLabelText="Name"
        />
        <RaisedButton
          style={submitStyle}
          type="submit"
          label="Submit"
          disabled={!this.state.canSubmit}
        />
      </Form>
    );
  },

  render() {
    let { paperStyle, switchStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          Updating props:
          <Form
            autoComplete="off"
            onValidSubmit={ (formValues, isChanged) => this.updateForm(formValues, isChanged) } >
            <FormsyText name="defaultValue"
              defaultValue={ this.state.defaultValue }
              fullWidth={ true }
              floatingLabelText="props.defaultValue"
              hintText="Type the defaultValue..."
              />
            <FormsyText name="value"
              defaultValue={ this.state.value }
              fullWidth={ true }
              floatingLabelText="props.value"
              hintText="Type the value..."
              />
            <div>
              <RaisedButton label="Update" primary={ true }
                type="submit"
                />
              <RaisedButton label="Reset" primary={ true }
                onClick={ () => this.resetForm() }
                />
              <RaisedButton label="Recreate" primary={ true }
                onClick={ () => this.recreateForm() }
                />
            </div>
          </Form>
          <pre>
            &lt;FormsyText<br/>
              &nbsp;&nbsp;defaultValue="{ this.state.defaultValue }"<br/>
              &nbsp;&nbsp;value="{ this.state.value }"<br/>
            /&gt;
          </pre>
          The form to test:
          { this.renderForm() }
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Main;
