import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateRegisterOTP } from '../../operations/form-validation/formValidation';
import { bindActionCreators } from 'redux';
import { otpVerifyAction, resendOtp } from '../../actions/authAction';
import LeftTriangle from "sushiweb/Icons/all/LeftTriangle";
import * as symbols from '../../operations/symbols';
import OTPFieldComponent from '../Common/OTPFieldComponent/OTPFieldComponent';

class OTPComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      otp: '',
      error: '',
      allValidated: false,
      resetSetTimeout: false
    }
  }


  handleChange(value) {
    const { error } = this.state;
    if(isNaN(value)) {
      return;
    } 
    if(value.length === 6) {
      this.beginValidation(value);
    }
    if(error) {
      this.setState({otp: value, error: '', allValidated: false});
    } else {
      this.setState({otp: value });
    }
  }

  beginValidation(phoneNumber) {
    this.validatePhoneNumber(phoneNumber);
  }

  validatePhoneNumber(phone) {
    var errors = validateRegisterOTP(phone);
    const { phoneNumber, isValidated } = errors;
    if(isValidated) {
      this.setState({error: phoneNumber, allValidated: true});
    } else {
      this.setState({isValidated: false});
    }
  }

  resendOtp(onCall) {
    let otpFields = {};
    otpFields.phoneNumber = this.props.phoneNumber
    this.setState({resetSetTimeout: true});
    setTimeout(() => {
      this.setState({resetSetTimeout: false});
    }, 15000);
    this.props.actions.resendOtp(otpFields)
  }

  onSubmitOTP(e) {
    const { otp }  = this.state;
    const { phoneNumber } = this.props;
    e.preventDefault();
    let otpValidatedData = validateRegisterOTP(otp);
    if (!otpValidatedData.isValidated) {
      this.setState({error: otpValidatedData.otp, isValidated: false})
    } else {
      let params = { phoneNumber: phoneNumber, otp: otp} ;
      this.props.actions.otpVerifyAction(params);
    }
  }

  render() {
    const { verifyOtpStatus, verifyOtpError, resendOtpStatus, resendOtpError } = this.props;
    const { error, allValidated} = this.state;
    return (
      <form onSubmit={(e) => this.onSubmitOTP(e)}>
        <div className="input-field-wrap">
          <OTPFieldComponent 
                digits={6} 
                onChange={(value) => this.handleChange(value)} 
                validateOTP={(value) => this.beginValidation(value)}
                errorMsg={error ? error : null}
          />
        </div>
        <div className="btn-wrapper">
          <button type="submit" className={allValidated ? "btn btn-green" : "btn btn-disabled"}>
            Verify OTP
          </button>
          {
            verifyOtpStatus === symbols.STATUS_FAIL && <div className="mt-2 red-text">{verifyOtpError.error.message}</div>
          }
        </div>

        <div className="btn-wrapper mt-4">
          Didn't receive OTP?
          <br />
          {
            resendOtpStatus === symbols.STATUS_BEGIN ? 
            <span className="green-link">Sending...</span> :
            <React.Fragment>
            <span className={this.state.resetSetTimeout ? `green-link disabled` : `green-link pointer` } onClick={() => this.resendOtp()}>Resend OTP</span>
              {
                resendOtpStatus === symbols.STATUS_FAIL && <div className="mt-2 red-text">{resendOtpError.error.message}</div>
              }
            </React.Fragment>
          }
          <br />
          {
            resendOtpStatus === symbols.STATUS_DONE && <div className="mt-1">OTP has been sent to your phone</div>
          }
        </div>

        <div className="mt-7">
          <div className="light-line" />
          <span className="green-link" onClick={this.props.backToLogin}><LeftTriangle className="icon-color-green sushi-icon sushi-icon-align-neg icon-fs-14 vertical-align-top"/> &nbsp;Go Back</span>
        </div>
        {
          this.props.errors &&  this.props.errors.error ?
          <div className="error mt-1">{this.props.errors.error.message}</div> : null
        }
      </form>
    )
  }
}

const actions = { resendOtp, otpVerifyAction }
export default connect(
  state => ({
    verifyOtpError: state.statuses.verifyOtp.errors,
    verifyOtpStatus: state.statuses.verifyOtp.status,
    resendOtpError: state.statuses.resendOtp.errors,
    resendOtpStatus: state.statuses.resendOtp.status,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(OTPComponent);
