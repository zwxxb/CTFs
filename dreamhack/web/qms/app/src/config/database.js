const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connect() {
  try {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
    mongoose.connection.on("connecting", () => {
      console.log("Connecting to DB...");
    });
    mongoose.connect(uri);
  } catch(err) {
    console.log(err)
  }
}

module.exports = connect