const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for user 

const User = new Schema({

   email:String,
   name:String,
   password:String,

   active: { type: Boolean, required: true, default: false },
   isAdmin: { type: Boolean, required: true, default: false },
   date:{
     type:Date,
     default:Date.now
 }
})

 module.exports = mongoose.model('users', User)

