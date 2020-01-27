import React, { Component } from 'react';
import Search from "sushiweb/Icons/all/Search";

import './SearchComponent.scss';

class SearchComponent extends Component {
    render() {
        const { handleSearchFilter, setSearchVal } = this.props;
        return (
            <React.Fragment>
                <form className="width-100" onSubmit={(e) => handleSearchFilter(e)}>
                    <div className="search-field-wrap">
                        <input
                            type="text"
                            className="search-field__input search-input"
                            placeholder="Search order number"
                            onChange={setSearchVal}
                        />
                        <button type="submit" className="search-icon">
                            <Search className="icon-color-gray icon-fs-15" />
                        </button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default SearchComponent;
