import React, { Component } from "react";

import "./OTPFieldComponent.scss";

class OTPFieldComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      otp: 0,
      enableIndex: 0,
      fieldValue: Array(props).fill(""),
      showError: false
    };
    this.otpTextInput = [];
  }

  componentDidMount() {
    document.addEventListener("click", this.onBlur);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onBlur);
  }

  focusPrevious = index => {
    const { digits } = this.props;
    if (index < digits && index >= 0) {
      this.otpTextInput[index].focus();
    }
  };

  onInputFieldClick = (value, index) => {
    const { digits, onChange } = this.props;
    let { fieldValue } = this.state;
    const isValueValid = value >= 0 && value <= 9;
    if (index !== digits && isValueValid) {
      fieldValue[index] = value;
      const otp = fieldValue.join("").toString();
      onChange(otp);
      if(value!== "") {
        this.focusPrevious(index+1);
      }
      
        }
    this.setState({ fieldValue: fieldValue, enableIndex: index });
  };

  onFieldClick = i => {
    this.setState({ enableIndex: i });
  };

  onBlur = event => {
    if (!this.node.contains(event.target)) {
      const { fieldValue } = this.state;
      const { validateOTP } = this.props;
      const value = fieldValue.join("").toString();
      validateOTP(value);
      this.setState({ showError: true });
    }
  };

  handleKeyPress = (event, index) => {
    const key = event.which;
    const { fieldValue } = this.state;
    if (key === 8 || key === 46) {
      if(!fieldValue[index]) {
        this.focusPrevious(index - 1);
      }
    } 
  };

  renderDigits() {
    let { digits } = this.props;
    let { enableIndex, fieldValue } = this.state;
    let inputFields = [],
      i = 0;
    while (i < digits) {
      let index = i;
      inputFields.push(
        <input
          className={
            enableIndex === i || fieldValue[index]
              ? "input-field focus-field"
              : "input-field"
          }
          type="tel"
          onKeyDown={event => this.handleKeyPress(event, index)}
          onChange={(event) => this.onInputFieldClick(event.target.value, index)}
          onFocus={() => this.onFieldClick(index)}
          value={fieldValue[i] || ""}
          key={`input-${i}`}
          id={`input-${i}`}
          ref={ref => (this.otpTextInput[index] = ref)}
          autoFocus={enableIndex === i}
          autoComplete="off"
        ></input>
      );
      i++;
    }
    return inputFields;
  }

  render() {
    const inputFields = this.renderDigits();
    const { errorMsg } = this.props;
    const { showError } = this.state;
    return (
      <div className="otp-container">
        <span className="otp-heading">Enter OTP</span>
        <div className="input-container" ref={node => (this.node = node)}>
          {inputFields.map(inputField => {
            return inputField;
          })}
        </div>
        {showError || errorMsg ? (
          <span className="mt-2 red-text">{errorMsg}</span>
        ) : null}
      </div>
    );
  }
}

export default OTPFieldComponent;
