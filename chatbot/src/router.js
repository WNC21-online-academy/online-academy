const express = require('express');
const router = express.Router();
const handler = require('./repositories/handler');
const contants = require('./constants/index');

router.get('/', function (req, res) {
  res.json({
    message: 'Hello from Online Academy Chatbot'
  });
})

/* Intergrate facebook webhook */
router.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === contants.verifyToken) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

/* Handle Messaging */
router.post('/webhook', (req, res) => {
  const entries = req.body.entry;
  handler.handleMessage(entries);
  res.status(200).send("OK");
});

module.exports = router;
