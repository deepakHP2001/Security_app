import React, { Component } from 'react';
import Call from 'sushiweb/Icons/all/Call';

import './OrderCard.scss';

class OrderCard extends Component {

    changeRoute = () => {
        const { changeRoute } = this.props;
        changeRoute({routeId: 1});
    }
    render() {
        return(
            <div className="order-card">
                <div className="order-card-head">
                    <span className="fs-14">Route 1a</span>
                    <div className="btn btn-info btn-smallest nohover">Not Dispatched </div>
                </div>
                <div className="light-line"></div>
                <div className="order-card-info">
                    <div className="info">
                        <div className="w-600">DA Name</div>
                        <div>Swati Jain</div>
                    </div>
                    <div className="info flex flex-vertical-align"><Call className="icon-medium icon-color-blue mr-05" /> <span>7985679481</span></div>
                    <div className="info">
                        <div className="w-600">Delivery Partner</div>
                        <div>Porter</div>
                    </div>
                </div>
                <div className="btn btn-green btn-expand btn-medium mb-2" onClick={() => this.changeRoute()}>Start Dispatch</div>
            </div>
        )
    }
}

export default OrderCard;
