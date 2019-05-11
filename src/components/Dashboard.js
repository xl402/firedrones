import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapPinpoint from './MapPinpoint';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.setIncident = this.setIncident.bind(this);
    this.state = {
      incidents: [],
      drones: [],
      isIncidentsLoaded: false,
      isDronesLoaded: false,
      selectedIncident: '',
    }
  }

  componentDidMount() {
    // In future, need to filter out processed incidents
    fetch("https://us-central1-firedrones-19.cloudfunctions.net/getIncidents")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isIncidentsLoaded: true,
          incidents: json,
        })
      });
      fetch("https://us-central1-firedrones-19.cloudfunctions.net/getDrones")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isDronesLoaded: true,
          drones: json,
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

  setIncident(id) {
    this.setState({selectedIncident: id});
  }

  render() {

    var { incidents, drones, isIncidentsLoaded, isDronesLoaded } = this.state;
    if (!isIncidentsLoaded || !isDronesLoaded) {
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
      const selectedIncidentId = this.state.selectedIncident;
      const selectedIncidentInfo = incidents.find(incident => incident.id === selectedIncidentId);
      return (
        //Lets hack from here?
        //https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_main/main_map_block.jsx
        <section id="portfolio">
          <div className="row banner">

            <h1>Dashboard</h1>
            <div style={{ height: '60vh', width: '100%', display: 'flex' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={""}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    hoverDistance={10}
                  >
                  {incidents.map(incident => {
                    return (
                      <MapPinpoint
                        lat={incident.location._latitude}
                        lng={incident.location._longitude}
                        text={incident.severity}
                        key={incident.id}
                        imgcode={incident.image}
                        description={incident.description}
                        setIncident={() => this.setIncident(incident.id)}
                      />
                    )
                  })}
                  </GoogleMapReact> 
                <div style={{height: '100%', width: '30%', background: 'blue'}}>
                  <p>
                    Selected Incident:
                    {selectedIncidentInfo && ' '+selectedIncidentInfo.id} 
                  </p>
                  <p>
                    Description: 
                    {selectedIncidentInfo && ' '+selectedIncidentInfo.description}
                  </p>
                </div>
              </div>
          </div>
        </section>
      );
    }

  }
}
