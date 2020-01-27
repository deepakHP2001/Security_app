import { mergeDeepRight as merge } from 'ramda';

import actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case actionTypes.VERIFY_OTP_DONE:
      return merge(state, {
        user: action.user,
        isAuthenticated: true,
        token: window.localStorage.getItem('token')
      });

    case actionTypes.SIGNUP_DONE:
      return merge(state, {
        user: action.user,
        isAuthenticated: true,
        token: window.localStorage.getItem('token')
      });

    case actionTypes.LOGOUT_DONE:
      return merge(state, {
        user: null,
        isAuthenticated: false,
        token: null
      });

    default:
      return state;
  }
};

export default auth;
