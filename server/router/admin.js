const express = require('express');
const router = express.Router();
const Product = require('../model/cartsItem');
const Order = require('../model/orders');

const {verify} = require('./verifyToken.js')
require('../data/database');

// for file
const multer = require('multer')


const storage = multer.diskStorage({
   destination:(req,file,cb) =>{
     cb(null,'./uploads/');

    }, 
  filename:(req,file,cb) =>{
     cb(null, Date.now() + file.originalname)
    }
})


 const fileFilter = (req,file,cb)=>{
     if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == "image/gif"){
         cb(null,true)
     }else{
         cb(null,false)
     }
 }

const upload = multer({storage: storage , limits:{fileSize:1024 * 1024 * 5}, fileFilter: fileFilter})


  // send all orders 
  router.get("/" , verify, async (req, res) => {

     const orders = await Order.find({});
     res.send(orders);
 })

 // for admin make a new product
router.post("/newProducts",upload.single('image'), async (req, res) => {
   console.log(req.body.title);
   console.log(req.body.category);
   console.log(req.body.description);
   console.log(req.body.price);

   const url = req.protocol + '://' + req.get('host') + '/' +  req.file.path;

   var size =[]
   var count = []
   var totalSizeAndQty = []
  //  get size and quantity
   size.push(req.body.availableSizes);
   count.push(req.body.count);
  // if i send just one size and one quantity
     if(req.body.availableSizes[0].length === 1) {
       
      var sizeAndQty =[{size: req.body.availableSizes , quantity: +req.body.count}]
         totalSizeAndQty.push(...sizeAndQty)
    }
    // if i send more than one size and one quantity
     else if(size[0].length > 1 && count[0].length > 1){

       for(let i = 0; i < size[0].length ; i++){
         
         var sizeAndQty =[{size: size[0][i] , quantity: count[0][i]}]
         totalSizeAndQty.push(...sizeAndQty)
     }
    }
    console.log(totalSizeAndQty);
  //  save and send
  const newProduct = new Product({
 
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    gender: req.body.gender,
    image: url ,
    price: req.body.price,
    availableSizes:  totalSizeAndQty
  })

   const savedProduct = await newProduct.save();
    res.send(savedProduct);
});


 
//  update product
 router.put("/updateProduct" , verify, async (req, res) => {

   const product = await Product.findOne({_id: req.body._id});

   if(product){
     product.title = req.body.title || product.title;
     product.description = req.body.description || product.description;
     product.gender = req.body.gender || product.gender;
     product.image = req.body.image || product.image;
     product.price = req.body.price || product.price;
     product.availableSizes = req.body.availableSizes || product.availableSizes;
     
   }
     const update = await product.save();
     res.send('your product has been updated')
 })
 
 // to change DB isDelivered to true and date after user paid
router.get("/:id/delivered" ,verify , async (req, res) => {

  const order = await Order.findOne({_id:req.params.id});
  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  
    const updated = await order.save();
    res.send({message: 'Order Delivered' , order: updated})
  }else{
    res.status(404).send({message: 'Order Not Found'})
  }
})




// delete product
 router.delete('/deleteProduct/:id',verify, async(req, res) => {

  const id = await Product.findOneAndDelete({_id: req.params.id});
  if(!id) return res.status(400).json('your id is not found')

   try {
      res.json('your product has been deleted');
  } catch (err) {
      res.status(401).send(err)
  }
 })


module.exports = router;