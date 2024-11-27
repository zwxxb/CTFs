const express = require('express');
var cors = require('cors');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const crypto = require('crypto');
const _ = require('lodash');
const connectDB = require('./config/database');
const defaultRouter = require('./routes/index');
const Author = require('./models/Author');
const genkey = () => crypto.randomBytes(32).toString('hex');
const initDB = require('./initdb.js')
let previousKey = null;

connectDB();

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    let authors = await Author.find().distinct("_id");
    const bulk = [];
    const secrets = [];
    authors.forEach((author) => {
      const key = genkey();
      secrets.push(key)
      bulk.push({
        updateOne: {
          filter: { _id: author._id },
          update: { $set: { secret: key } }
        }
      });
    });
    await Author.bulkWrite(bulk);
    let flag = fs.readFileSync('/flag');
    if (previousKey !== null) {
      flag = flag.map((b, i) => b ^ previousKey[i % previousKey.length]);
    }
    const realKey = Buffer.from(_.sample(secrets), 'hex');
    const enc = flag.map((b, i) => b ^ realKey[i % realKey.length]);
    fs.writeFileSync('/flag', enc);
    previousKey = realKey;
    return next();
  } catch (err) {
    return res.status(400).send("HACK DETECTED!");
  }
});

app.use('/', defaultRouter);

mongoose.connection.once('open', async () => {
  console.log('Connected to DB');
  await initDB();
  app.listen(process.env.PORT || 50000, () => {
    console.log('Listening on port', process.env.PORT || 50000);
  });
});
