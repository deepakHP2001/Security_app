import React, { Component } from 'react';
import Input from 'sushiweb/InputTypes/Input';

import './DispatchedAssets.scss';
import Accordian from './../../../Common/Accordian/Accordian';

class DispatchedAssets extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: -1
        }
    }

    changeActiveIndex = (index) => {
        let { activeIndex } = this.state;
        if (index === activeIndex) {
            this.setState({ activeIndex: -1 });
        } else {
            this.setState({ activeIndex: index });
        }
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <div className="dipatched-assets-wrapper">
                <Accordian
                    title="Assets Dispatched"
                    buttonText={false}
                    showActiveIndex={(index) => this.changeActiveIndex(index)}
                    showForm={activeIndex === 0}
                    index={0}
                    hasContent={true}
                >
                    <div className="assets-table">
                        <div className="rows">
                            <div>Asset Type</div>
                            <div>Qty. Dispatched</div>
                        </div>
                        <div className="rows">
                            <div>Totes</div>
                            <div>10</div>
                        </div>
                        <div className="rows">
                            <div>Large Tubs</div>
                            <div>20</div>
                        </div>
                        <div className="rows">
                            <div>Small Tubs</div>
                            <div>15</div>
                        </div>
                    </div>
                </Accordian>
                <Accordian
                    title="Truck Information"
                    buttonText={false}
                    showActiveIndex={(index) => this.changeActiveIndex(index)}
                    showForm={activeIndex === 1}
                    index={1}
                    hasContent={true}
                >
                    <div className="truck-info">
                        <div className="mb-1"><Input label="Odometer Reading (in Kms)" value={10} disabled={true} /></div>
                        <div className="mb-1"><Input label="Vehicle Number" value="AS1230FD" disabled={true} /></div>
                        <div className="fs-12 mt-1 w-600">Odometer Photo</div>
                    </div>
                </Accordian>
            </div>
        )
    }
}

export default DispatchedAssets;
