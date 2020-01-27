import React, { Component } from 'react';

import HeaderComponent from '../headers/HeaderComponent';
import LoginComponent from './LoginComponent';
import OTPComponent from './OTPComponent';
import './auth.scss'

class AuthComponent extends Component{

	constructor(props){
		super(props);

		this.state = {
			hasSentOTP: false,
			phoneNo: null
		}
	}


	sendOtpDone(phoneNo){
		this.setState({hasSentOTP: true, phoneNo: phoneNo})
	}

	backToLogin(){
		this.setState({hasSentOTP: false, phoneNo: null})
	}

	render(){
		return (
			<React.Fragment>
				<HeaderComponent />
				<div className="auth-container pd-top-global">
					<div className="auth-head">
		                {
		                    !this.state.hasSentOTP ?
		                    <span className={"auth-head__title fs-28"}>
		                        Login
		                    </span> :
		                    <span className={"auth-head__title fs-28"}>
		                        OTP
		                    </span>
		                }
		                {
		                    !this.state.hasSentOTP ?
		                    <div className="auth-head__subhead">Enter phone number to proceed</div> :
		                    <div className="auth-head__subhead">We have sent the OTP to {this.state.phoneNo}</div>
		                }
		            
		                
	                </div>
	                { !this.state.hasSentOTP ? 
	                	<LoginComponent 
	                		sendOtpDone={(phoneNo) => this.sendOtpDone(phoneNo)}
	                	/> : 
	                	<OTPComponent
	                		backToLogin={() => this.backToLogin()}
	                		phoneNumber={this.state.phoneNo}
	                	/> 
	                }
    			</div>
			</React.Fragment>
		)
	}
}

export default AuthComponent;
