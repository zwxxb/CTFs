const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    content: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    collection: 'quotes',
  }
);

//Export the model
module.exports = mongoose.model('Quote', quoteSchema);