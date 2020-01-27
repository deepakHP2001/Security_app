import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './core/PrivateRoute';

import AuthComponent from './auth/AuthComponent';
import Routes from './Routes/Routes';

class AppComponent extends Component {

  state = {
    offline: !navigator.onLine
  }

  setOfflineStatus = () => {
    this.setState({ offline: !navigator.onLine });
  }

  componentDidMount = () => {
    window.addEventListener('online', this.setOfflineStatus)
    window.addEventListener('offline', this.setOfflineStatus)
  }

  componentWillUnmount = () => {
    window.removeEventListener('online', this.setOfflineStatus)
    window.removeEventListener('offline', this.setOfflineStatus)
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.offline && <div className="offline-msg fs-14">Please connect to internet!</div>
        }
        <Switch>
          <PrivateRoute path="/routes" render={() => <Routes />} />
          <PrivateRoute reverse={true} path="/" render={() => <AuthComponent />} />
        </Switch>
      </React.Fragment>
    )
  }

}

export default AppComponent;
