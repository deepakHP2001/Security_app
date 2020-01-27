import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router";

import CommonHeaderComponent from '../headers/CommonHeaderComponent';
import { changeRouteComponent } from '../../actions/routeActions';
import { ROUTE_COMPONENT } from '../../operations/constants';
import RouteListing from './RouteListing/RouteListing';
import RouteAssets from './RouteAssets/RouteAssets';
import './Routes.scss';

class Routes extends Component {

    renderComponent = () => {
        const {componentName} = this.props;
        switch(componentName) {
            case ROUTE_COMPONENT.ROUTE_LISTING:
              return < RouteListing />
            case ROUTE_COMPONENT.ROUTE_ASSETS:
              return < RouteAssets />
            default:
              break;
        }
    }

    changeComponent = (value) => {
      const { changeRouteComponent } = this.props.actions;
      changeRouteComponent(value);
    }

    render() { 
        const componentToRender = this.renderComponent();
        const { componentName } = this.props;
        return (
            <div>
                { componentName === ROUTE_COMPONENT.ROUTE_LISTING ?
                  <CommonHeaderComponent title="Route List"/> :
                  <CommonHeaderComponent enableBack={true} goBack={() => this.changeComponent(ROUTE_COMPONENT.ROUTE_LISTING)} title={'Route 1a'}/>
                }
                <div className="route-container">
                { componentToRender }
                </div>
            </div>
        )
    }
}

const actions = { changeRouteComponent }
export default withRouter(connect(
  state => ({
    componentName: state.route.componentName
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Routes));
