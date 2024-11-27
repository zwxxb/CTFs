const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Quote',
    //   trim: true
    // },
    name: {
      type: String,
      trim: true,
      required: true
    },
    secret: {
      type: String,
      trim: true
    }
  },
  {
    collection: 'authors'
  }
);

//Export the model
module.exports = mongoose.model('Author', authorSchema);
