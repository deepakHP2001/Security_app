import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Back from "sushiweb/Icons/all/Back";
import Call from 'sushiweb/Icons/all/Call';
import Logout from 'sushiweb/Icons/all/Logout';

import './header.scss';
import { logoutAction } from '../../actions/authAction';

class CommonHeaderComponent extends Component {
  
  state = {
    showMenu: false
  }

  componentDidMount() {
    document.addEventListener('click', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick);
  }

  onOutsideClick = event => {
    if (this.node && !this.node.contains(event.target)) {
      this.setState({showMenu: false});
    }
  };

  showMenu = () => {
    let {showMenu} = this.state;
    this.setState({showMenu: !showMenu});
  }

  render() {
    const { enableBack, actionText, disableActionText } = this.props;
    const {showMenu} = this.state;
    return (
      <React.Fragment>
         <header id="header" className="common-header">
          <ul className="header-list">
            <li className="left nav-menu__logo--desktop">
              { enableBack &&
                  <React.Fragment>
                    <Back className="sushi-icon sushi-icon-align" onClick={() => this.props.goBack()}/> 
                    &nbsp;&nbsp;
                  </React.Fragment>
              }
            </li>
            <li className="nav-menu__logo left nav-menu__logo--desktop align-left">
              <Link to={`/`}>{this.props.title}</Link> {this.props.routeId}
            </li>
            {/* <li className="flex-margin"> */}
            { actionText && <li className={disableActionText ? " gray-text fs-14 w-600 disabled": "flex-margin green-text fs-14 w-600" } onClick={this.props.textAction}>{actionText}</li> }
            <li className="absolute" ref={node => (this.node = node)}>
              <img src={'../../images/threeDotVertical.png'} alt={''} onClick={this.showMenu} />
              {showMenu && <div className="menu-bar">
                <a className="menu-item call-link" href={`tel:+911171565093`}><Call className="icon-size-small"/>&nbsp;Call us</a>
                <div className="menu-item" onClick={this.props.logoutAction}><Logout className="icon-size-small" />&nbsp;Logout</div>
              </div>}
            {/* </li> */}
            </li>
          </ul>
        </header>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logoutStatus: state.statuses.logout.status
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => {
      return dispatch(logoutAction());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommonHeaderComponent));
