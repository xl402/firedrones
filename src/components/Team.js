import React, { Component } from 'react';
export default class Team extends Component {
  render() {
    return (
      <section id="about">
         <div className="row">

            <div className="three columns">

               <img className="profile-pic"  src="images/rory.png" alt="" />

            </div>

            <div className="nine columns main-col">

               <h2>Rory Xiao - Machine Learning Research</h2>
               <p>
               {
                 "Illumina Bioinfomatics Intern, Innotech Research Intern"
               }
               <br/>
               {
                 "Third year Information and Control Engineer. Familiar with Python and C++, specialised in information, robotics and control, with R&D experience and strong mathematical literacy. Always gets a first."
               }
               </p>
               <div className="row">
               </div>


            </div>
         </div>

         <div className="row">
            <div className="three columns">
               <img className="profile-pic"  src="images/jonty.png" alt="" />
            </div>
            <div className="nine columns main-col">
               <h2>Jonty Page - Machine Learning Engineer</h2>
               <p>
               {
                 "Klydo Machine Learning Intern, BT Data Science Intern"
               }
               <br/>
               {
                 "Third year Information and Computer Engineer, experienced in Machine Learning reasearch. Proficient in Python, experienced in C++, Tensorflow, Scarla and MATLAB. Built linke a tank, rows for Cambridge."
               }
               </p>
               <div className="row">
               </div>
            </div>
         </div>

         <div className="row">
            <div className="three columns">
               <img className="profile-pic"  src="images/ellen.png" alt="" />
            </div>
            <div className="nine columns main-col">
               <h2>Ellen Skipper - Front End Developer</h2>
               <p>
               {
                 "Softwire DevOps"
               }
               <br/>
               {
                 "Natural Sciences (Biological) Finalist and software developer at Softwire. Experienced in web development using React framework. Can pretty much fulfill all your wishes, an all round genius."
               }
               </p>
               <div className="row">
               </div>
            </div>
         </div>



         <div className="row">
            <div className="three columns">
               <img className="profile-pic"  src="images/adian.png" alt="" />
            </div>
            <div className="nine columns main-col">
               <h2>Adian Liusie - Algorithm Research</h2>
               <p>
               {
                 "Metaswitch Backend Intern, Sensor Coating Systems Intern"
               }
               <br/>
               {
                 "Third year Information and Electronics Engineer,  proficient in Python, shell and Java, have created configurable scripts to improve security of cirtificates used by Metaswitch product as an intern. Loves food above all."
               }
               </p>
               <div className="row">
               </div>
            </div>
         </div>

         <div className="row">
            <div className="three columns">
               <img className="profile-pic"  src="images/vyas.png" alt="" />
            </div>
            <div className="nine columns main-col">
               <h2>Vyas Raina - Backend Developer</h2>
               <p>
               {
                 "PwC Tech Risk Intern, Emotech Sofware Intern"
               }
               <br/>
               {
                 "Third year Electronics and Information Engineering. With a particular interest in robotics, AI and Machine Learning. Previously worked as a Tech Risk Intern at PwC and Data Analyst at BT. So gassed he turned down Deutsche Bank."
               }
               </p>
               <div className="row">
               </div>
            </div>
         </div>

         <div className="row">
            <div className="three columns">
               <img className="profile-pic"  src="images/tomlu.png" alt="" />
            </div>
            <div className="nine columns main-col">
               <h2>Tom Lu - System Architect</h2>
               <p>
               {
                 "ARM Data Science Intern, Onfido Machine Learning Research Intern"
               }
               <br/>
               {
                 "Third year Computer, Information and Bio Engineering. Experienced in Tensorflow, Google Cloud Compute, Probabilistic Machine Learning Methods and Embbeded systems design using VHDL and SystemVerilog. Pretty meh, attempts to make the team happy."
               }
               </p>
               <div className="row">
               </div>
            </div>
         </div>
      </section>
    );
  }
}
