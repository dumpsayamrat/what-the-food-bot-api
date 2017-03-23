import express from 'express';
import firebase from 'firebase';

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/hello', (req, res) => {
  console.log('Request: ', res);
  res.json({
      message: 'Hello WHAT THE FOOD!!!'
  });
});

router.post('/categories/add', ({ body }, res) => {
  const { name } = body;
  firebase.database().ref('categories/').child(body.name).set({
    name
  }).then((response) => {
    res.json(`ADDED category: ${name}`);
  });
});

router.post('/categories/food/add', ({ body, query }, res) => {
  const { category, foodName } = query;
  firebase.database().ref(`categories/${category}`).push({
    name: foodName
  }).then((response) => {
    res.json(`ADDED food ${foodName} in ${category} category`);
  });
});

router.get('/categories', ({ body }, res) => {
  firebase.database().ref('/categories').on('value', snapshot => {
    res.json(snapshot.val());
  });
});

export default router;
