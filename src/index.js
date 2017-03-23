import express from 'express';
import bodyParser from 'body-parser';
import firebase from 'firebase';

import router from './routes';

const app = express();
const port = (process.env.PORT || 8000);
const config = {
  apiKey: "AIzaSyBPpB-eMr1HYjjTwjCCSOS6dNd9cacJl2o",
  authDomain: "whatthefood-c0c35.firebaseapp.com",
  databaseURL: "https://whatthefood-c0c35.firebaseio.com",
  storageBucket: "whatthefood-c0c35.appspot.com",
  messagingSenderId: "531442847040"
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
	limit : '100kb'
}));

firebase.initializeApp(config);

app.use('/api', router);

app.listen(port, () => {
  console.log('Node app is running on port', port);
});
