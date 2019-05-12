const functions = require('firebase-functions');
const admin = require('firebase-admin');

const cors = require('cors')({
  // These two lines of code took me two hours to find out.... something to do
  // with some bullshit cors security issues, fuck me whyyyy
  origin: true
});

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    response.send("Hello world!");
  });
 });

// get request used to retrieve incidents
// URL: https://us-central1-firedrones-19.cloudfunctions.net/getIncidents
exports.getIncidents = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin.firestore().collection('incidents').get().then(data => {
      let incidents = [];
      data.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        incidents.push(data);
      });
      return res.json(incidents);
    })
    .catch(err => console.error(err));
  });
})

exports.getDrones = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin.firestore().collection('drones').get().then(data => {
      let drones = [];
      data.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        drones.push(data);
      });
      return res.json(drones);
    })
    .catch(err => console.error(err));
  });
})

/* post request used to post incident
   URL: https://us-central1-firedrones-19.cloudfunctions.net/createIncident
   Example: {
  	"description": "test point 1",
  	"image": "ASDSAD5675DF",
  	"lon": 52.0123,
  	"lat": 0.1234,
  	"processed": 0,
  	"severity": 1
}
*/
exports.createIncident = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method != 'POST') {
      return res.status(400).json({ error: 'Method not allowed'});
    }
    const newIncident = {
      description: req.body.description,
      image: req.body.image,
      location: new admin.firestore.GeoPoint(req.body.lat,req.body.lon),
      processed: req.body.processed,
      severity: req.body.severity,
      time: admin.firestore.Timestamp.fromDate(new Date()),
    }
    admin
      .firestore()
      .collection('incidents')
      .add(newIncident)
      .then(doc => {
        res.json({ message: `Incident ${doc.id} created successfully`});
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong'});
        console.error(err);
      });
  });
})

exports.spawnDrone = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
  if(req.method != 'POST') {
    return res.status(400).json({ error: 'Method not allowed'});
  }
  const newDrone = {
    current_pos: new admin.firestore.GeoPoint(req.body.d_lon, req.body.d_lat),
    event_id: req.body.event_id,
    speed: req.body.speed,
    isRecall: req.body.isRecall,
    capacity: req.body.capacity
  }
  admin
    .firestore()
    .collection('drones')
    .add(newDrone)
    .then(doc => {
      res.json({ message: `Drone ${doc.id} created successfully`});
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong'});
      console.error(err);
    });
  });
})

exports.changeDrones = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method != 'PUT') {
      return res.status(400).json({ error: 'Method not allowed'});
    }
    const drone = {
      current_pos: new admin.firestore.GeoPoint(req.body.d_lat, req.body.d_lon),
      event_id: req.body.event_id,
      isRecall: req.body.isRecall,
      speed: req.body.speed,
      capacity: req.body.capacity
    }
    admin
      .firestore()
      .collection('drones')
      .doc(req.body.drone_id)
      .set(drone)
      .then(doc => {
        res.json({ message: `Drone ${doc.id} updated successfully`});
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong'});
        console.error(err);
      });
  });
})

exports.changeIncident = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method != 'PUT') {
      return res.status(400).json({ error: 'Method not allowed'});
    }
    const incident = {
      description: req.body.description,
      image: req.body.image,
      location: new admin.firestore.GeoPoint(req.body.lat,req.body.lon),
      processed: req.body.processed,
      severity: req.body.severity,
      time: admin.firestore.Timestamp.fromDate(new Date()),
    }
    admin
      .firestore()
      .collection('incidents')
      .doc(req.body.incident_id)
      .set(incident)
      .then(doc => {
        res.json({ message: `Incident ${doc.id} updated successfully`});
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong'});
        console.error(err);
      });
  });
})
