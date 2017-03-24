import express from 'express';
import firebase from 'firebase';

import { toQuickReply } from './functional';

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
    res.json({
      messages: [
        {
          text:  'testRedirectInQuickReply',
          quick_replies: Object.keys(snapshot.val())
            .map(toQuickReply(['Food selecting'], 'type_of_food'))
        }
      ]
    });
  });
});

router.get('/text', ({ body }, res) => {
  res.json({
    messages: [
      { text:  'test text 12121' },
      { text: 'test text 111'}
    ]
  });
});

router.get('/real', ({ body }, res) => {
  res.json({
    messages: [
      {
        text:  'testRedirectInQuickReply 555',
        quick_replies: [
          {
            title: "อาหารน้ำ",
            block_names: [
              "Food selecting"
            ],
            set_attributes: {
              type_of_food: "อาหารน้ำ"
            }
          },
          {
            title: "อาหารเส้น",
            block_names: [
              "Food selecting"
            ],
            set_attributes: {
              "type_of_food": "อาหารเส้น"
            }
          }
        ]
      }
    ]
  });
});

router.get('/quick', ({ body }, res) => {
  res.json({
    messages: [
      {
        text:  'test text 12121',
        quick_replies: [
          {
            title:'DUMMY',
            block_names:["dummy"]
          },
          {
            title:'DUMMY2',
            block_names:["dummy"]
          }
        ]
      }
    ]
  });
});

export default router;
