import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import IncidentPinpoint from './IncidentPinpoint';
import DronePinpoint from './DronePinpoint';
import shouldPureComponentUpdate from 'react-pure-render/function';

const controlPanelStyle = {height: '100%', width: '30%', lineHeight: '17px', padding: '15px'}
export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.setIncident = this.setIncident.bind(this);
    this.setDrone = this.setDrone.bind(this);
    this.recallDrone = this.recallDrone.bind(this);
    this.deleteIncident = this.deleteIncident.bind(this);
    this.changeSeverity = this.changeSeverity.bind(this);

    this.state = {
      incidents: [],
      drones: [],
      isIncidentsLoaded: false,
      isDronesLoaded: false,
      selectedIncident: '',
      selectedDrone: '',
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
    this.setState({selectedIncident: id, selectedDrone: ''});
  }

  setDrone(id) {
    this.setState({selectedIncident: '', selectedDrone: id});
  }

  recallDrone(id) {
    console.log('Recall Drone '+id)
  }

  deleteIncident(id) {
    console.log('Delete Incident '+id)
  }

  changeSeverity(id, severity) {
    console.log('Set severity of incident '+id+' to '+severity)
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
      const selectedDroneId = this.state.selectedDrone;
      const selectedDroneInfo = drones.find(drone => drone.id === selectedDroneId);
      const assignedDrone = drones.find(drone => drone.event_id === selectedIncidentId);

      var controlPanel;
      if (selectedIncidentId) {
        controlPanel =
        <div style={controlPanelStyle}>
          <b>Selected Incident:</b><br/>
          {selectedIncidentInfo && selectedIncidentInfo.id} 
        <br/>
          <b>Description:</b> <br/>
          {selectedIncidentInfo && selectedIncidentInfo.description} 
        <br/>
          <b>Assigned drones:</b> <br/>
          {assignedDrone ? assignedDrone : 'Currently none assigned'}
          <button onClick={() => this.deleteIncident(selectedIncidentId)}>
            Delete Incident
          </button>
          Set incident severity: 
          <button onClick={() => this.changeSeverity(selectedIncidentId, 1)}>
            1
          </button> 
          <button onClick={() => this.changeSeverity(selectedIncidentId, 2)}>
            2
          </button> 
          <button onClick={() => this.changeSeverity(selectedIncidentId, 3)}>
            3
          </button> 
          <button onClick={() => this.changeSeverity(selectedIncidentId, 4)}>
            4
          </button> 
          <button onClick={() => this.changeSeverity(selectedIncidentId, 5)}>
            5
          </button> 
        </div>
      }
      else if (selectedDroneId) {
        controlPanel =
        <div style={controlPanelStyle}>
          <b>Selected Drone:</b><br/>
          {selectedDroneInfo && selectedDroneInfo.id} 
          <br/>
          <b>Capacity:</b> <br/> 
          {selectedDroneInfo && selectedDroneInfo.capacity}
          <br/>
          <b>Speed:</b> <br/> 
          {selectedDroneInfo && selectedDroneInfo.speed}
          <br/>
        <b>Assigned to incident:</b><br/> 
          {selectedDroneInfo.event_id ? selectedDroneInfo.event_id : 'Currently unassigned'}
          <button onClick={() => this.recallDrone(selectedDroneId)}>
            Recall Drone
          </button>
        </div>
      }
      else {
        controlPanel =
        <div style={controlPanelStyle}>
        <p>
          <b>Select an incident or a drone for options.</b>
        </p>
        </div>
      }

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
                      <IncidentPinpoint
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
                  {drones.map(drone => {
                    return (
                      <DronePinpoint
                        lat={drone.current_pos._latitude}
                        lng={drone.current_pos._longitude}
                        key={drone.id}
                        eventId={drone.event_id}
                        setDrone={() => this.setDrone(drone.id)}
                      />
                    )
                  })}
                  </GoogleMapReact> 
                {controlPanel}
              </div>
          </div>
        </section>
      );
    }

  }
}
