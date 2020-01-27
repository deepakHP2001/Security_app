import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router";

import SearchComponent from './../../Common/SearchComponent/SearchComponent';
import FilterTabComponent from './../../Common/FilterTabComponent/FilterTabComponent';
import OrderCard from './../OrderCard/OrderCard';
import './RouteListing.scss';
import { changeRouteComponent } from '../../../actions/routeActions';
import { ROUTE_COMPONENT } from '../../../operations/constants';

const FILTERING_TABS = [
    { name: "Not Dispatched", id: 1 },
    { name: "Dispatched", id: 2 }
]

class RouteListing extends Component {

    changeRoute = (routeId) => {
        const { changeRouteComponent } = this.props.actions;
        changeRouteComponent(ROUTE_COMPONENT.ROUTE_ASSETS);
    }

    render() {
        return (
            <div className="route-list">
                <SearchComponent />
                <FilterTabComponent filterId={1} tabs={FILTERING_TABS} />
                <OrderCard changeRoute={this.changeRoute}/>
                <OrderCard changeRoute={this.changeRoute}/>
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
)(RouteListing));
