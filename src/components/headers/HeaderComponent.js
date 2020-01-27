import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as symbols from '../../operations/symbols';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '../../actions/authAction';

class HeaderComponent extends Component {

  toggleSideBar = (action) => {
    let menuEle = document.getElementById('sidebar');
    if (action === 'open')
      menuEle.classList.add('drag-menu-visible');
    else
      menuEle.classList.remove('drag-menu-visible');
  }

  componentDidUpdate(prevProps) {
    const { history, logoutStatus } = this.props;

    if (logoutStatus !== prevProps.logoutStatus && logoutStatus === symbols.STATUS_DONE) {
      history.push('/auth');
    }
  }

  render() {
    const { auth, logoutAction } = this.props;
    return (
      <React.Fragment>
        <header id="header">
          <ul className="header-list">
            <li className=" nav-menu__logo left nav-menu__logo--desktop">
              <NavLink to="/"><img src="../images/hyperpure-logo-top.svg" alt="logo" /></NavLink>
            </li>
            <li className="mobile-only bars left"></li>
            {
              auth.isAuthenticated ? 
              <React.Fragment>
                <li className="list-ele pointer green-link"><span className="gray-text">Hi</span> {auth.user && auth.user.name}</li>
                <li className="list-ele pointer green-text" onClick={logoutAction}>Logout</li>
              </React.Fragment> :
            
              null
            }
          </ul>
          <div className="menu-drag__wrapper" id="sidebar" onClick={() => this.toggleSideBar('close')}>
            <div className="menu-drag__inner-wrapper">
              <ul className="nav-menu-list">
                <li className="list-ele nav-menu__logo">
                  <img src="../images/hyperpure-logo-top.svg" alt="logo" />
                </li>
                <li className="list-ele">About </li>
                <li className="list-ele">Pricing </li>
                <li className="list-ele">FAQs </li>
                <li className="list-ele">Contact</li>
              </ul>
            </div>
          </div>
        </header>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    logoutStatus: state.statuses.logout.status,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => {
      return dispatch(logoutAction());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));
