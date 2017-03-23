import express from 'express';
import bodyParser from 'body-parser';
import firebase from 'firebase';

import router from './routes';

const app = express();
const port = 8000;

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBZbhkf1tu5gjmhra9xpE3aCYMZDsGggSQ",
  authDomain: "manager-ab3a6.firebaseapp.com",
  databaseURL: "https://manager-ab3a6.firebaseio.com",
  storageBucket: "manager-ab3a6.appspot.com",
  messagingSenderId: "950598348794"
};
firebase.initializeApp(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
