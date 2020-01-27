import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...props }) => {
  // For authenticated user
  if (props.auth.isAuthenticated) {
    if (props.reverse) {
      return <Redirect  to = {
        {
          pathname: '/routes'
        }
      } />
    } else {
      return <Route { ...props } component = { Component } />
    }
  } 
  // For non signed user
  else {
    if (props.reverse) {
      return <Route { ...props } component = { Component } />
    } else {
      return <Redirect to = {
        {
          pathname: '/auth',
          state: { from: props.location }
        }
      } />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
