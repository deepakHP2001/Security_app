import React, { Component } from 'react';
import Filter  from "sushiweb/Icons/all/Filter";
import Cross from "sushiweb/Icons/all/Cross";

import './FilterTabComponent.scss';

class FilterTabComponent extends Component {
    render() {
        const { filterId, tabs, clearFilter, handelFilterChange } = this.props;
        return (
            <React.Fragment>
                <div className="filter-wrapper">
                        <span className="filter-head">FILTER</span>
                        <Filter className="inline-block light-text fs-10 icon-medium" />
                        <div className="tabs-wrapper">
                        {tabs.map((tab, index) => {
                            return (
                                <div  className="tab flex" key={index} onClick={() => handelFilterChange(tab.id , tab.name)}>
                                    <span>{tab.name}</span>
                                    {
                                        tab.id === filterId
                                        && <Cross className="icon-medium ml-05" onClick={(e) => clearFilter(e)} />
                                    }
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default FilterTabComponent;
