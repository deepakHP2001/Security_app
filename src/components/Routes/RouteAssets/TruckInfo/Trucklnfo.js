import React, { Component } from 'react';
import Input from "sushiweb/InputTypes/Input";
import CameraFill from 'sushiweb/Icons/all/CameraFill';
import CrossCircleFill from 'sushiweb/Icons/all/CrossCircleFill';

import './TruckInfo.scss';
import { TRUCK_INFO } from './../../../../operations/constants';

class TruckInfo extends Component {

    constructor() {
        super();
        this.state = {
            odometerImages: [],
            odometerReading: "",
            truckNumber: ""
        }
    }

    handleTruckInfo(value, field) {
        this.setState({ [field]: value })
    }

    handleSelectedDefaultImage(event) {
        let file = URL.createObjectURL(event.target.files[0]);
        let { odometerImages } = this.state;
        odometerImages = [...odometerImages, file];
        this.setState({ odometerImages: odometerImages });
        document.getElementById('takePicture').value = '';
    }

    handleImageInputClick() {
        document.getElementById("takePicture").click((e) => { })
    }

    deleteSelectedImage = (index) => {
        let {odometerImages} = this.state;
        odometerImages.splice(index, 1);
        this.setState({odometerImages: odometerImages})
    }

    render() {
        const { odometerImages, odometerReading, truckNumber } = this.state;
        return (
            <React.Fragment>
                <div className="light-line"></div>
                <div className="truck-info-wrapper">
                    <div className="fs-14 w-600 mb-05">Truck Information</div>
                    <div className="fs-12 mb-2">Please add the following truck info</div>
                    <div className="mb-1"><Input label="Odometer Reading (in Kms)" value={odometerReading ? `${odometerReading}` : ""} onChange={(value) => this.handleTruckInfo(value, TRUCK_INFO.ODOMETER_READING)} /></div>
                    <div className="mb-1"><Input label="Vehicle Number" value={`${truckNumber}`} onChange={(value) => this.handleTruckInfo(value, TRUCK_INFO.TRUCK_NUMBER)} /></div>

                    <div className="odometer-wrapper">
                        <div className="fs-12 w-600 mt-1 mb-1">Odometer Photo (Optional)</div>
                        <div className="odometer-photo-wrapper">
                            <div className="odometer-photo-icon">
                                <CameraFill onClick={() => this.handleImageInputClick()} />
                            </div>
                            {odometerImages.length !== 0 && odometerImages.map((image, index) => {
                                return <div key={index} className="selected-image">
                                    <img src={image} alt={""}/>
                                    <CrossCircleFill className="icon-medium icon-color-red" onClick={() => this.deleteSelectedImage(index)} />
                                </div>
                            })}
                        </div>
                        <input hidden type="file" accept="image/*" capture="camera" id="takePicture" onChange={(e) => this.handleSelectedDefaultImage(e)} />
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default TruckInfo;
