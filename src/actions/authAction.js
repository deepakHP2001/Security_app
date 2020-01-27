import { path } from 'ramda';
import actionTypes from './actionTypes';
import api from '../operations/api/api';
import { ApiAddresses } from '../operations/apiAddresses';

export const otpVerifyAction = function(payload) {
  return dispatch => {
    dispatch({ type: actionTypes.VERIFY_OTP_BEGIN });
    payload.countryCode = '91';
    api(false)
      .post(ApiAddresses.verifyOtp, payload)
      .then(({ data, headers }) => {
        if (headers) {
          let token = headers.authorization;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify({ phone: payload.phoneNumber }));
        }
        dispatch({ type: actionTypes.VERIFY_OTP_DONE, user: { phone: payload.phoneNumber } });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.VERIFY_OTP_FAIL,
          errors: path(['response', 'data'], err),
        });
      })
  };
};


export const resendOtp = function(payload) {
  return dispatch => {
    dispatch({ type: actionTypes.RESEND_OTP_BEGIN });
    payload.countryCode = '91';
    api(false)
      .post(ApiAddresses.sendOtp, payload)
      .then(({ data, headers }) => {
        dispatch({ type: actionTypes.RESEND_OTP_DONE });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.RESEND_OTP_FAIL,
          errors: path(['response', 'data'], err),
        });
      })
  };
};

export const sendOtp = function(payload) {
  return dispatch => {
    dispatch({ type: actionTypes.SEND_OTP_BEGIN });
    payload.countryCode = '91';
    api(false)
      .post(ApiAddresses.sendOtp, payload)
      .then(({ data, headers }) => {
        dispatch({ type: actionTypes.SEND_OTP_DONE });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.SEND_OTP_FAIL,
          errors: path(['response', 'data'], err),
        });
      })
  };
};

export const logoutAction = function() {
  return dispatch => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    dispatch({ type: actionTypes.LOGOUT_DONE });
  };
};
