import React, { Component } from 'react';
import Header from './components/Header';
import Team from './components/Team';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

import resumeData from './resumeData';
import ParticleComponent from "./ParticleComponent";

class App extends Component {
  render() {
    return (

      <div className="App">
        <Header resumeData={resumeData}/>
        <Team resumeData={resumeData}/>
        <Dashboard resumeData={resumeData}/>
        <Footer resumeData={resumeData}/>
        <ParticleComponent />
      </div>
    );
  }
}

export default App;
