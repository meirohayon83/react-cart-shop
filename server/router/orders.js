const express = require('express');
const router = express.Router();
const Order = require('../model/orders');
const Product = require('../model/cartsItem');

const {verify} = require('./verifyToken.js')

require('../data/database');

// get order by id
router.get("/:id",verify, async (req, res) => {
  
 const order = await Order.findOne({_id:req.params.id});
   if(order){
       res.send(order);
   }else{
       res.status(404).send({message: 'Order not found'});
   }
})

// pay and updated quantity in stock and isPaid true and paidAt with date
router.put("/:id/pay" , verify, async (req, res) => {
  // find order id
  const order = await Order.findOne({_id:req.params.id});

  if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
   
    order.paymentResult = {
      id:req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    //  get the count
      const count = order.orderItems.count;
      const updated = await order.save();
    
      res.send({message: 'Order Paid' , order: updated})
      // find all  id of users order
      const id = order.orderItems.map(item => item._id);
      const size = order.orderItems.map(x => x.sizes);
      // find the id of product from buyer order
      const product = await Product.find({_id: {$in: id}});

      var sameSize =[]
      var notSameSize =[]
         
       for(let i = 0; i < size.length; i++){
          //  get from product just the availableSizes == size of order
          sameSize.push(product[i].availableSizes.filter(x =>   x.size == size[i]));
          //  get from product just the availableSizes !== size of order
          notSameSize.push(product[i].availableSizes.filter(x =>  x.size !== size[i]));
        //  change in product DB the quantity after product invitation
          var totalQty = sameSize[i].map(x => ({size:x.size , quantity:x.quantity -= order.orderItems[i].count}));
        }
          var final =[]
           for(let i = 0; i < size.length; i++){
                // push in final the size and quantity after paid order
                final.push(sameSize[i].map(x => ({size:x.size ,quantity:x.quantity})));
                final[i].push(...notSameSize[i])
            }
             
          for(let i = 0; i < size.length; i++){
            //  change thr DB
                const products = await Product.updateOne({_id :id[i] , availableSizes: { $elemMatch: { size: {$eq :size[i]} }}} ,{$set:{
                    availableSizes:  final[i]
                 }}
               )
             }
        }else{
          res.status(404).send({message: 'Order Not Found'})
       }
     })


// find all orders by user id
 router.get("/" , verify, async (req, res) => {

  const orders = await Order.find({user: req.user._id});
  res.send(orders);

})

// create order with information
router.post("/", verify, async (req, res) => {

  if(req.body.orderItems.length === 0){
      res.status(400).send({message: 'Cart is empty'})
  }else{
    
    const order = new Order({
       
        user: req.user._id,
        orderItems: req.body.orderItems,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
       
    });
    
      const createOrder = await order.save();
      res.status(200).send({message:'New order created' , order: createOrder})
  }
});


module.exports = router;