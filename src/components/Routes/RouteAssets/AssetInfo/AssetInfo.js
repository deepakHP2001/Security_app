import React, { Component } from 'react';
import Input from "sushiweb/InputTypes/Input";
import Plus from 'sushiweb/Icons/all/Plus';
import { clone } from 'ramda';

import './AssetInfo.scss';
import Accordian from './../../../Common/Accordian/Accordian';
import Dropdown from './../../../Common/Dropdown/Dropdown';
import { ASSET_PROTO } from './../../../../operations/constants';


const ASSET_TYPES = [
    { id: 1, name: 'Totes', value: 'TOTE' },
    { id: 1, name: 'Small Tubs', value: 'TUB_SM' },
    { id: 1, name: 'Large Tubs', value: 'TUB_LG' }
];

class AssetInfo extends Component {

    constructor() {
        super();
        this.state = {
            assetDetails: [clone(ASSET_PROTO)],
            activeIndex: 0
        }
    }

    showActiveIndex = (index) => {
        let {activeIndex} = this.state;
        if(activeIndex === index) {
            this.setState({activeIndex: -1})
        } else {
            this.setState({ activeIndex: index })
        }
    }

    addAnotherAsset = () => {
        let { assetDetails } = this.state;
        assetDetails.push(clone(ASSET_PROTO));
        const activeIndex = assetDetails.length - 1;
        this.setState({assetDetails: assetDetails, activeIndex: activeIndex});
    }

    disableAddAnother = () => {
        const { assetDetails } = this.state;
        let disableAddAnother = false;
        assetDetails.forEach(assetDetail => {
            if((!assetDetail.assetName.id && assetDetail.deliveredQuantity) || 
                (assetDetail.assetName && !assetDetail.deliveredQuantity) ) {
                    disableAddAnother = true;
            }
        });
        return disableAddAnother;
    }

    changeAssetDetail = (ele, index, field) => {
        let { assetDetails } = this.state;
        assetDetails[index][field] = ele;
        this.setState({assetDetails: assetDetails});
    }

    deleteAsset = (index) => {
        let { assetDetails } = this.state;
        assetDetails.splice(index, 1);
        this.setState({assetDetails: assetDetails});
    }

    render() {
        const { assetDetails, activeIndex } = this.state;
        const disableAddAnother = this.disableAddAnother();
        return (
            <React.Fragment>
                <div className="light-line"></div>
                <div className="asset-info-wrapper">
                    <div className="fs-14 w-600 mb-05">Asset Information</div>
                    <div className="fs-12 mb-2">Please add count for all assets</div>
                    {
                        assetDetails.map((assetDetail, index) => {
                            return (
                            <div key={index}>
                                <Accordian
                                    title={`Asset ${index+1}`}
                                    showDelete={assetDetails.length !== 1 } buttonText={true}
                                    hasContent={assetDetail.assetName.id && assetDetail.deliveredQuantity}
                                    showForm={index===activeIndex}
                                    showActiveIndex={(index) => this.showActiveIndex(index)}
                                    index={index}
                                    description={assetDetail.assetName.name === "Select Asset Type" ? "" : assetDetail.assetName.name }
                                    onDelete={(index) => this.deleteAsset(index) }
                                >
                                    <Dropdown
                                        menu={ASSET_TYPES}
                                        selectedValue={assetDetail.assetName}
                                        disable={false}
                                        className={false ? "flex-margin small-content gray-text disabled" : "flex-margin small-content gray-text"}
                                        handleClick={(ele) =>  this.changeAssetDetail(ele, index, 'assetName')}
                                    />
                                    <div className="mt-1">
                                        <Input label="Qty Delivered" value={`${assetDetail.deliveredQuantity}`} onChange={(value) => this.changeAssetDetail(value, index, 'deliveredQuantity')} />
                                    </div>
                                </Accordian>
                            </div>)
                        })
                    }
                    { ASSET_TYPES.length !== assetDetails.length &&  <div className={disableAddAnother ? "flex gray-text fs-14 disabled" : "green-text flex fs-14" } onClick={() => this.addAnotherAsset()}>
                        <Plus className={disableAddAnother ? "icon-medium icon-color-gray mr-05": "icon-medium icon-color-green mr-05" }/> Add another text</div>}
                </div>
            </React.Fragment>
        )
    }
}

export default AssetInfo;
