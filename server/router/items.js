const express = require('express');
const router = express.Router();
const Product = require('../model/cartsItem');
const Order = require('../model/orders');
const {verify} = require('./verifyToken.js')

require('../data/database');
const path = require('path');


// send all products
router.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
// send all products by id
router.get("/products/:id", async (req, res) => {
  const products = await Product.findOne({_id: req.params.id});
  res.send(products);
});
// send the product with one size and count and id
router.get("/products/:id?/:sizes?/:count?/:itemId?", async (req, res) => {

   const product = await Product.find({_id: req.params.id}, { availableSizes: { $elemMatch: { size: {$eq :req.params.sizes} } }});
  
   const productId = await Product.find({_id: req.params.id})
      
   const allSizes = productId[0].availableSizes
   const qty = product[0].availableSizes[0].quantity;
   const size = product[0].availableSizes[0].size;
   const count = req.params.count
   const ans = [{_id:productId[0].id ,title:productId[0].title ,price:productId[0].price, description:productId[0].description ,  image: productId[0].image , size: size , quantity: qty , availableSizes:  allSizes, count: count ,id: req.params.itemId}]
  
   res.json(ans);
  
});


module.exports = router;