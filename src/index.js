import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store'
import './index.scss';
import ScrollToTop from './operations/scroll/ScrollToTop';
import * as serviceWorker from './serviceWorker';
import AppComponent from './components/AppComponent';
import {
  BreadcrumbsProvider
} from 'react-breadcrumbs-dynamic'

// Adding intial state for authentication
let initialState = {
  auth: {
    token: null,
    isAuthenticated: false,
    user: null,
    locationEnabled: ""
  },
};

if (window.localStorage.getItem('token')) {
  initialState.auth.isAuthenticated = true;
  initialState.auth.token = window.localStorage.getItem('token');
  if (window.localStorage.getItem('user')) {
    initialState.auth.user = JSON.parse(window.localStorage.getItem('user'));
  }
}
let store = configureStore(initialState);
render(
  <Provider store={store}>
		<Router basename="/">
		  <ScrollToTop>
		  	<BreadcrumbsProvider>
				<AppComponent />
			</BreadcrumbsProvider>
		  </ScrollToTop>
		</Router>
	</Provider>, document.getElementById('root')
);

// Register service worker
serviceWorker.unregister();
