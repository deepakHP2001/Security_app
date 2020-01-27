import React, { Component } from 'react';
import DownTriangleSmall from 'sushiweb/Icons/all/DownTriangleSmall'

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }
  }

  //ele pattern = { id: --- , name: ---, value: ---}

  handleSelect(ele) {
    this.setState({showMenu: false});
    this.props.handleClick(ele);
  }

  listenEvent = (e) => {
    let isEnableClick = (e.target.matches('.dropdown-wrapper') || e.target.matches('.dropdown-custom') || e.target.matches('.dropdown-head'));
    if (!isEnableClick) {
      this.setState({ showMenu: false });
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.listenEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.listenEvent)
  }

  handleMenuState = (event) => {
    event.stopPropagation();
    const { showMenu } = this.state;
    this.setState({showMenu: !showMenu})
  }

  render() {
    const { menu, selectedValue, disable } = this.props;
    const { showMenu } = this.state;
    return (
      <React.Fragment>
        <div className={`dropdown-wrapper dropdown-wrapper-primary ${this.props.className}`} onClick={(event) => this.handleMenuState(event) }>
          <div className="dropdown-custom">
            <div className="dropdown-head">{selectedValue.name}</div>
            {
              showMenu && 
              <div className="dropdown-content">
                {menu.map((ele, index) => {
                    return(
                      <div 
                        className={ele.value === selectedValue.value ? "dropdown-ele active" : "dropdown-ele"} 
                        onMouseDown={() => this.handleSelect(ele)}
                        key={index}
                      >{ ele.name}</div>
                    )
                  })
                }
              </div>
            }
            { disable !== true &&  <DownTriangleSmall />}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dropdown;
