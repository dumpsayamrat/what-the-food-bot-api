import express from 'express';
import firebase from 'firebase';

import { toQuickReply, shuffle, foodToGalleryElements } from './functional';

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

router.post('/categories/food/add', ({ query }, res) => {
  const { category, foodName, image } = query;
  firebase.database().ref(`categories/${category}`).push({
    name: foodName,
    image
  }).then((response) => {
    res.json(`ADDED food ${foodName} in ${category} category`);
  });
});

router.get('/categories', (req, res) => {
  firebase.database().ref('/categories').on('value', snapshot => {
    res.json({
      messages: [
        {
          text: 'ไหนลองเลือกประเภทอาหารดูก่อนละกัน',
          quick_replies: Object.keys(snapshot.val())
            .map(toQuickReply(['Food selecting'], 'type_of_food'))
        }
      ]
    });
  });
});

router.get('/foods', ({ query }, res) => {
  const { category, limit = 3 } = query;
  firebase.database().ref(`/categories/${category}`).on('value', snapshot => {
    const obj = snapshot.val();
    const foods= shuffle(Object.keys(obj))
      .filter(k => obj[k].name != null)
      .map(k => obj[k]);

    res.json({
      messages: [
        {
          attachment:{
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: foods
                .slice(0, limit)
                .map(foodToGalleryElements)
            }
          }
        }
      ]
    });
  });
});

export default router;
