import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

const pinpointStyle = {
    color: 'white',
    background: '#e25a09',
    padding: '6px 9px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    position: 'relative',
  }

const imgStyle = {maxWidth: '150px', maxHeight: '130px'}

const popupStyle = {background: '#e25a09', position: 'absolute', transform: 'translate(0px, -110px)', height: '164px', padding: '5px', borderRadius: '7px', zIndex: 99  }

export default class MyGreatPlaceWithHover extends Component {
    static defaultProps = {};

    //To rerender when on/off hover
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const popupHoverStyle = this.props.$hover ? popupStyle : {display:'none', zIndex: 99  };
    const divHoverStyle = this.props.$hover ? {...pinpointStyle, zIndex: 99} : pinpointStyle;
    return (
       <div style={divHoverStyle} onClick={this.props.setIncident}>
          {this.props.text}
          <div className='imgcontainer' style={popupHoverStyle}>
          <img style={imgStyle} className="mapImage" src={'data:image/png;base64,'.concat(this.props.imgcode)} alt=''/>
          {this.props.description}
          </div>
       </div>
    );
  }
}
