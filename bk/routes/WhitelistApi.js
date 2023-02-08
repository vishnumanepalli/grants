const express = require('express');
const router = express.Router();
const Whitelist = require('../models/whitelist');

router.post('/whitelist', (req, res) => {
  const { email } = req.body;
  const whitelist = new Whitelist({ email });
  whitelist.save((err) => {
    if (err) {
      return res.status(500).send({ message: 'Internal server error' });
    }
    res.status(200).send({ message: 'Email added to whitelist' });
  });
});

router.delete('/whitelist/:email', (req, res) => {
  const { email } = req.params;
  Whitelist.findOneAndDelete({ email }, (err) => {
    if (err) {
      return res.status(500).send({ message: 'Internal server error' });
    }
    res.status(200).send({ message: 'Email removed from whitelist' });
  });
});

router.get('/whitelist', (req, res) => {
  Whitelist.find({ active: true }, (err, whitelist) => {
    if (err) {
      return res.status(500).send({ message: 'Internal server error' });
    }
    res.status(200).send(whitelist);
  });
});

module.exports = router;
