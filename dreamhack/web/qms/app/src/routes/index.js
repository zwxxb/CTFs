const express = require('express');
const _ = require('lodash');
const router = express.Router();
const Quote = require('../models/Quote');
const getQuotes = require('../config/quotes');
const available_themes = require('../config/themes');

const config = {
  theme: available_themes[0].id
};

router.get('/', async (req, res) => {
  try {
    let quotes = await Quote.find({}).populate("author", "name").exec();
    return res.render('index', { theme: config.theme, available_themes, quotes });
  } catch (err) {
    return res.status(400).send('HACK DETECTED!');
  }
});

router.post('/config', (req, res) => {
  try {
    const { config_name, value } = req.body;
    if (Array.isArray(config_name) && Array.isArray(value)) {
      config_name.forEach((key, i) => _.set(config, key, value[i]));
    } else {
      _.set(config, config_name, value);
    }
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.post('/reset', async (req, res) => {
  try {
    await Quote.deleteMany({});
    const quotes = await Quote.insertMany(await getQuotes()); 
    return res.render('noti', { theme: config.theme, available_themes, quotes });
  } catch (err) {
    return res.sendStatus(500);
  }
})

router.post('/remove_quote', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || typeof id !== "string") throw new Error();
    await Quote.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
});

module.exports = router;
