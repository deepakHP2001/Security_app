import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendOtp } from '../../actions/authAction';
import Input from "sushiweb/InputTypes/Input";
import * as symbols from '../../operations/symbols';
import { validateLogin } from '../../operations/form-validation/formValidation';

class LoginComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      error: '',
      allValidated: false
    }
  }

  handleChange(value) {
    const { error } = this.state;
    if(isNaN(value) || value.length > 10) {
      return;
    } 
    if(value.length === 10) {
      this.beginValidation(value);
    } 
    if(error) {
      this.setState({phoneNumber: value, error: '', allValidated: false});
    } else {
      this.setState({phoneNumber: value });
    }
  }

  beginValidation(phoneNumber) {
    this.validatePhoneNumber(phoneNumber);
  }

  validatePhoneNumber(phone) {
    var errors = validateLogin(phone);
    const { phoneNumber, isValidated } = errors;
    if(isValidated) {
      this.setState({error: phoneNumber, allValidated: true});
    } else {
      this.setState({isValidated: false});
    }
  }

  onLogin(e) {
    const { phoneNumber } = this.state;
    e.preventDefault();
    let loginValidatedData = validateLogin(phoneNumber);
    if (!loginValidatedData.isValidated) {
      this.setState({error: loginValidatedData.erro, isValidated: false});
    } else {
        this.props.sendOtp({phoneNumber: phoneNumber});
    }
  }

  componentDidUpdate = (prevProps) => {
    const { sendOtpStatus } = this.props;
    const { phoneNumber } = this.state;
    const prevStatuses = prevProps.sendOtpStatus;
    if (
      sendOtpStatus !== prevStatuses &&
      sendOtpStatus === symbols.STATUS_DONE
    ) {
      this.props.sendOtpDone(phoneNumber);
    }
  }

  render() {
    const { phoneNumber, error, allValidated } = this.state;
    return (
      <form onSubmit={(e) => this.onLogin(e)}>
        <div className="input-field-wrap">
          <Input
            label="Phone number"
            type="text"
            name="phone"
            key={'login1'}
            iconColor="green"
            value={phoneNumber}
            onBlur={(value) => this.beginValidation(value)}
            errorMsg={error ? error : null}
            onChange={(value) => this.handleChange(value)}
          />
        </div>
        <div className="btn-wrapper">
          <button type="submit" className={allValidated ? "btn btn-green" : "btn btn-disabled"}>
          {
            this.props.sendOtpStatus === symbols.STATUS_BEGIN ?
            'Sending...' : 'Send OTP'
          }
          </button>
        </div>
          {
            this.props.sendOtpStatus === symbols.STATUS_FAIL && <div className="mt-2 red-text">{this.props.sendOtpError && this.props.sendOtpError.error.message} </div>
          }
          {
            this.props.errors &&  this.props.errors.error ?
            <div className="error mt-1">{this.props.errors.error.message}</div> : null
          }
      </form>
    )
  }
}

export default connect(
  state => ({
    errors: state.statuses.login.errors,
    status: state.statuses.login.status,
    sendOtpStatus: state.statuses.sendOtp.status,
    sendOtpError: state.statuses.sendOtp.errors,
  }),
  dispatch => ({
    sendOtp: bindActionCreators(sendOtp, dispatch),
  }),
)(LoginComponent);
