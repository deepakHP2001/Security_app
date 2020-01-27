import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { startsWith } from 'ramda';
import qs from 'query-string';
import moment from 'moment';

import env from '../env';

function getAuthHeader() {
  return `${window.localStorage.getItem('token')}`;
}

function createAxios(auth) {

  const headers = {};

  if (auth) {
    headers['Authorization'] = getAuthHeader();
    headers['X-Client'] = 'da';
  }
  // headers['Accept-Encoding']='gzip';

  return axios.create({
    baseURL: `${env.urls.podHost}/`,
    withCredentials: true,
    headers,
    paramsSerializer: qs.stringify,
  });
}

function requestInterceptor(config) {
  const token = window.localStorage.getItem('token');

  // TODO: need a better way to handle token refresh
  if (startsWith('/login', window.location.pathname)) {
    return config;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return config;
  }
  // Token has expired
  if (moment.unix(decoded.exp) < (moment().add(5, 'seconds'))) {
    return new Promise((resolve) => {
      // createAxios().post('auth/refresh_token/')
      //   .then(({data}) => {  // Token refresh successful
      //     window.localStorage.setItem('token', data.token);
      //     config.headers.Authorization = getAuthHeader();
      //     resolve(config);
      //   })
      //   .catch(err => {  // Session expired; user needs to login again
      //     window.location = '/login';
      //   });
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      alert('Session Expired! Please login again');
      window.location.href = '/';
    });
  }
  return config;
};

export default (auth = true) => {
  const instance = createAxios(auth);
  if (auth) {
    instance.interceptors.request.use(requestInterceptor);
  }
  return instance;
};
