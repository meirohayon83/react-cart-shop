const mongoose = require('mongoose');
const shortid = require("shortid");
const Schema = mongoose.Schema;



 const paymentSchema = {
   paymentMethod: { type: String, required: true }
 };

// order information schema
const Order = new Schema({
  
  orderItems: [
       {
         _id : { type : String},
         title: { type: String, required: true },
         count: { type: Number, required: true },
         image: { type: String, required: true },
         price: { type: Number, required: true },
         gender: { type: String, required: true},
         sizes: { type: String, required: true },
       },
  ],
  shipping:{ 
       
         fullName:{ type : String, required: true},
         address: { type: String, required: true },
         city: { type: String, required: true },
         postalCode: { type: String, required: true },
         country: { type: String, required: true },
  },
         payment: paymentSchema,
         paymentResult:{
     
         id: String,
         status: String,
         update_time: String,
         email_address: String,
  },
 
        itemsPrice: { type: Number },
        taxPrice: { type: Number },
        shippingPrice: { type: Number },
        totalPrice: { type: Number },
        user: { type: Schema.Types.ObjectId , ref: "users" , required: true},
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },

  },
  {
     timestamps: true,
  }
)

module.exports = mongoose.model('orders', Order)
