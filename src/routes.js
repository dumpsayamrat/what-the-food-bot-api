import express from 'express';

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

export default router;
