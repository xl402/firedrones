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
    height: '15px'
  }


// const popupStyle = {background: '#e25a09', position: 'absolute', transform: 'translate(0px, -110px)', height: '164px', padding: '5px', borderRadius: '7px', zIndex: 99  }

export default class IncidentPinpoint extends Component {
    static defaultProps = {};

    //To rerender when on/off hover
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    // const popupHoverStyle = this.props.$hover ? popupStyle : {display:'none', zIndex: 99  };
    let pinpointColor;
    if (this.props.capacity < 20) {
      pinpointColor={background: '#b3b3ff'}
    } else if (this.props.capacity < 40) {
      pinpointColor={background: '#8080ff'}
    } else if (this.props.capacity < 60) {
      pinpointColor={background: '#ffcc00'}
    } else if (this.props.capacity < 81) {
      pinpointColor={background: '#1a1aff'}
    } else {
      pinpointColor={background: '#1a1aff'}
    }
    const divHoverStyle = this.props.$hover ? {...pinpointStyle, ...pinpointColor, zIndex: 99} : {...pinpointStyle, ...pinpointColor};
    return (
       <div style={divHoverStyle} onClick={this.props.setDrone}>
          {this.props.text}
          {/* <div className='imgcontainer' style={popupHoverStyle}>
          <img style={imgStyle} className="mapImage" src={'data:image/png;base64,'.concat(this.props.imgcode)} alt=''/>
          {this.props.description}
          </div> */}
       </div>
    );
  }
}
