import React, { Component } from 'react';
import ChevronDown from 'sushiweb/Icons/all/ChevronDown';
import ChevronUp from 'sushiweb/Icons/all/ChevronUp';
import Delete from 'sushiweb/Icons/all/Delete';

import './Accordian.scss';

class Accordian extends Component {

    handleToggler = () => {
        const { index, showActiveIndex } = this.props;
        showActiveIndex(index)
    }

    deleteItem = () => {
        const { index, onDelete } = this.props;
        onDelete(index);
    }

    render() {
        const { title, description, children, hasContent, showForm, showDelete, buttonText } = this.props;
        return (
            <div>
                <div className="head">
                    <div className="title">
                        <span className="fs-14">{title}</span>
                        <span className="fs-12 ml-1">{description}</span>
                    </div>
                    <div className="flex">
                        {showDelete && <Delete onClick={() => this.deleteItem()} className="mr-2 icon-color-red icon-medium" />}
                        <div className={hasContent ? "toggler green-text" : (showForm ? "toggler gray-text disabled" : "toggler gray-text")} onClick={() => this.handleToggler()}>
                            {buttonText ? <span className="pd-right-05 fs-14">{showForm ? 'DONE' : 'EDIT'}</span> : null}
                            {showForm ?
                                <ChevronUp className={hasContent ? "icon-color-green " : "icon-color-gray"} />
                                : <ChevronDown className={hasContent ? "icon-color-green" : "icon-color-gray "} />}
                        </div>
                    </div>
                </div>
                {showForm ? children : null}
            </div>
        )
    }
}

export default Accordian; 