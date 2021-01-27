const mongoose = require('mongoose');
 const shortid = require("shortid");
const Schema = mongoose.Schema;

// schema for router model

const Product = new Schema({

    _id: { type: String, default: shortid.generate },
    title: String,
    category: String,
    description: String,
    image: String,
    price: Number,
    gender: String,
    availableSizes: Array,
  })


module.exports = mongoose.model('products', Product)