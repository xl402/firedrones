import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapPinpoint from './MapPinpoint';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    // In future, need to filter out processed incidents
    fetch("https://us-central1-firedrones-19.cloudfunctions.net/getIncidents")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded:true,
          incidents: json,
        })
      });
  }

  // Google Maps default view point centered at London
  static defaultProps = {
    center: {
      lat: 51.5,
      lng: -0.12
    },
    zoom: 8
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {

    var { isLoaded, incidents } = this.state;
    if (!isLoaded) {
      return (
        // Show loading screen
        <section id="portfolio">
          <div className="row banner">
            <h1>Loading Incidents</h1>
          </div>
        </section>
      )
    }
    else{
      return (
        //Lets hack from here?
        //https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_main/main_map_block.jsx
        <section id="portfolio">
          <div className="row banner">

            <h1>Dashboard</h1>
            <div style={{ height: '60vh', width: '100%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={""}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    hoverDistance='5'
                  >
                  {incidents.map(incident => {
                    return (
                      <MapPinpoint
                        lat={incident.location._latitude}
                        lng={incident.location._longitude}
                        text={incident.severity}
                        key={incident.description}
                        imgcode={incident.image}
                        description={incident.description}
                      />
                    )
                  })}
                  </GoogleMapReact> 
                </div>



          </div>
        </section>
      );
    }

  }
}
