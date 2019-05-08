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
        incidents.push(doc.data());
      });
      return res.json(incidents);
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
  if(req.method != 'POST') {
    return res.status(400).json({ error: 'Method not allowed'});
  }
  const newIncident = {
    description: req.body.description,
    image: req.body.image,
    location: new admin.firestore.GeoPoint(req.body.lon, req.body.lat),
    processed: req.body.processed,
    severity: req.body.severity,
    time: admin.firestore.Timestamp.fromDate(new Date())
  }
  admin
    .firestore()
    .collection('incidents')
    .add(newIncident)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully`});
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong'});
      console.error(err);
    })
})
