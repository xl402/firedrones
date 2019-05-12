import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import IncidentPinpoint from './IncidentPinpoint';
import DronePinpoint from './DronePinpoint';
import shouldPureComponentUpdate from 'react-pure-render/function';
import $ from "jquery";

const controlPanelStyle = {height: '100%', width: '30%', lineHeight: '17px', paddingLeft: '15px'}

const buttonStyle = {background: '#e25a09'}
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
    const drones = this.state.drones;
    const recalledDrone = drones.find(drone => drone.id === id);
    
    const insertData = "{\n\t\"drone_id\" : \"" +recalledDrone.id+"\",\n\t\"d_lon\":"+recalledDrone.current_pos._longitude+",\n\t\"d_lat\": "+recalledDrone.current_pos._latitude+",\n\t\"event_id\" : \""+recalledDrone.event_id+"\" ,\n\t\"speed\": "+recalledDrone.speed+",\n\t\"capacity\": "+recalledDrone.capacity+",\n\t\"isRecall\" : true\n}"
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://us-central1-firedrones-19.cloudfunctions.net/changeDrones",
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.11.0",
        "Accept": "/",
        "Cache-Control": "no-cache",
        "Postman-Token": "3875e849-0131-4a1b-96d6-d90fe068f216,26cb8b72-4f33-4f51-87cf-d2c46de03975",
        "Host": "us-central1-firedrones-19.cloudfunctions.net",
        "accept-encoding": "gzip, deflate",
        "content-length": "146",
        "Connection": "keep-alive",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": insertData
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }
  deleteIncident(id) {
    console.log('Delete Incident '+id)
  }
 
  changeSeverity(id, severity) {
    const incidents = this.state.incidents;
    const selectedIncident = incidents.find(incident => incident.id === id);
    const insertData = "{\n\t\"description\": \""+selectedIncident.description+"\",\n\t\"image\": \""+selectedIncident.image+"\",\n\t\"lon\": "+selectedIncident.location._longitude+",\n\t\"lat\": "+selectedIncident.location._latitude+",\n\t\"processed\": "+selectedIncident.processed+",\n\t\"severity\": "+severity+",\n\t\"incident_id\": \""+selectedIncident.id+"\" \n}"
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://us-central1-firedrones-19.cloudfunctions.net/changeIncident",
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.11.0",
        "Accept": "/",
        "Cache-Control": "no-cache",
        "Postman-Token": "eda556e1-b331-41ae-bab8-b5098032a6c7,a7772c80-09bc-4796-9e09-05eabe786227",
        "Host": "us-central1-firedrones-19.cloudfunctions.net",
        "accept-encoding": "gzip, deflate",
        "content-length": "165",
        "Connection": "keep-alive",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": insertData
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  changeProcessing(id, processing) {
    const incidents = this.state.incidents;
    const selectedIncident = incidents.find(incident => incident.id === id);
    const insertData = "{\n\t\"description\": \""+selectedIncident.description+"\",\n\t\"image\": \""+selectedIncident.image+"\",\n\t\"lon\": "+selectedIncident.location._longitude+",\n\t\"lat\": "+selectedIncident.location._latitude+",\n\t\"processed\": "+processing+",\n\t\"severity\": "+selectedIncident.severity+",\n\t\"incident_id\": \""+selectedIncident.id+"\" \n}"
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://us-central1-firedrones-19.cloudfunctions.net/changeIncident",
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.11.0",
        "Accept": "/",
        "Cache-Control": "no-cache",
        "Postman-Token": "eda556e1-b331-41ae-bab8-b5098032a6c7,a7772c80-09bc-4796-9e09-05eabe786227",
        "Host": "us-central1-firedrones-19.cloudfunctions.net",
        "accept-encoding": "gzip, deflate",
        "content-length": "165",
        "Connection": "keep-alive",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": insertData
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
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

      let processingState;
      switch(selectedIncidentInfo && selectedIncidentInfo.processed) {
        case 0:
          processingState='Awaiting rating'
        break;
        case 1:
          processingState='Awaiting drone response'
        break;
        case 2:
          processingState='Drones deployed'
        break;
        case 3:
          processingState='Incident resolved'
        break;
        default:
          processingState='Unknown'
      }

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
        <b>Processing state:</b> <br/>
          {processingState} 
        <br/>
          <b>Assigned drones:</b> <br/>
          {assignedDrone ? assignedDrone : 'Currently none assigned'}<br/>
          <button style={{marginTop: '12px'}} onClick={() => this.deleteIncident(selectedIncidentId)}>
            Delete Incident
          </button><br/>
          <b>Set incident severity:</b> <br/>
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
          </button> <br/>
          <b>Set incident processing:</b> <br/>
          <button onClick={() => this.changeProcessing(selectedIncidentId, 0)}>
            0
          </button> 
          <button onClick={() => this.changeProcessing(selectedIncidentId, 1)}>
            1
          </button> 
          <button onClick={() => this.changeProcessing(selectedIncidentId, 2)}>
            2
          </button> 
          <button onClick={() => this.changeProcessing(selectedIncidentId, 3)}>
            3
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
          <b>Recalled:</b> <br/> 
          {selectedDroneInfo.isRecall ? 'Yes' : 'No'}
          <br/>
        <b>Assigned to incident:</b><br/> 
          {selectedDroneInfo.event_id ? selectedDroneInfo.event_id : 'Currently unassigned'}<br/>
          <button className='drone-button' onClick={() => this.recallDrone(selectedDroneId)}>
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
                        processed={incident.processed}
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
                        capacity={drone.capacity}
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
