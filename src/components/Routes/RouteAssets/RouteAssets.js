import React, { Component } from 'react';
import Call from 'sushiweb/Icons/all/Call';

import './RouteAssets.scss';
import TruckInfo from './TruckInfo/Trucklnfo';
import AssetInfo from './AssetInfo/AssetInfo';
import DispatchedAssets from './DispatchedAssets/DispatchedAssets';

class RouteAssets extends Component {
    render() {
        return(
            <div className="route-detail-wrapper">
                <div className="route-detail-header">
                    <div className="mr-2 w-600 fs-14">Status</div>
                    <div className="btn btn-yellow btn-smallest nohover">Not Dispatched </div>
                </div>
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
                <AssetInfo />
                <TruckInfo />
                <DispatchedAssets />
                <div className="action-button">
                    <div className={"btn btn-expand btn-green "}> Dispatch</div>
                </div>
            </div>
        )
    }
}

export default RouteAssets;
