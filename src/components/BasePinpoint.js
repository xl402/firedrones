import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

const pinpointStyle = {
    color: 'white',
    padding: '6px 6px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    position: 'relative',
    width: '15px',
    height: '15px',
    background: 'purple',
  }


// const popupStyle = {background: '#e25a09', position: 'absolute', transform: 'translate(0px, -110px)', height: '164px', padding: '5px', borderRadius: '7px', zIndex: 99  }

export default class BasePinpoint extends Component {
    static defaultProps = {};

    //To rerender when on/off hover
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const divHoverStyle = this.props.$hover ? {...pinpointStyle, zIndex: 99} : pinpointStyle;
    return (
       <div className="house" style={divHoverStyle}>
          {this.props.text}
       </div>
    );
  }
}
