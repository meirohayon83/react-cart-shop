const express = require('express')
const router = express.Router();
const User = require('../model/users')
require('../data/database')
const { registerValidation , loginValidation } = require ('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const {getToken , verify} = require('./verifyToken');

// delete the user account
router.delete('/:id',verify, async(req, res) => {

  const id = await User.findOneAndDelete({_id: req.params.id});
  if(!id) return res.status(400).json('your id is not found')
  
    try {
      res.json('User Deleted Successfully');  
   }catch (error) {
       res.status(404).send({message: 'User Not Found'})
  }
})



//  get all users 
router.get('/all', function (req, res, next) {
  User.find({}, function (err, data) {
      if (err) {
         res.send(err)
     }else {
         res.send(data)
      }
    })
  })

// check when user try to reg if his email already in
router.post('/checkEmail', async (req, res)=>{
 
   const user = await User.findOne({email:req.body.email});
   if(user) return res.json("Email already been taken")
 
   return res.json('')
})



// register 
router.post('/register', async (req, res) => {

// send mail after reg to sign
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        }
      });

    //LETS VALIDATE THE DATA BEFORE WE A USER
     const {error} = registerValidation(req.body)
     if(error) return res.status(401).json(error.details[0].message) 

    // Encrypts the password
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(req.body.password, salt)

     // check if the user already reg with his email
     const emailExists = await User.findOne({email:req.body.email});
     if(emailExists)  res.status(400).json("email already exists")
         
     var newUser = new User({
       name: req.body.name,
       email: req.body.email,
       password: hash,   
     })
       try{
         const data = await newUser.save();
           if(data){
            res.send({
                _id: data._id,
                token: getToken(data),
            })
           }
           
           const mailOptions = {
             from: process.env.USER_EMAIL,
             to: req.body.email,
             subject: 'Subject of your email',
             html: '<a href = "http://localhost:3000/welcome/' + data._id + '">Click here to active your account.</a>'
           };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
       }catch(error){
        res.status(401).json({ message: 'Invalid User Data.' })
    }
})



// after register you got email with this url to change active false to true to login

    router.get('/confirim/:id', async (req, res , next) => {

      const user = await User.findOne({_id: req.params.id });
      if(!user) return res.status(401).json('Not Have Account')
      
      user.active = true;
      const data = await user.save();

         res.send({
                _id: data._id,
                name: data.name,
                email: data.email,
                active: data.active,
                isAdmin: data.isAdmin,
                token: getToken(data),
      })     
    })
      
  //  find user by _id
    router.get('/:id' ,verify, async(req, res) =>{
     const user = await User.findById(req.params.id)
        if(user){
          res.send(user)
       }else{
          res.status(404).send({message: 'User Not Found'})
      }
    })

  // update user profile
    router.put('/profile' , verify , async(req, res) =>{

      const user = await User.findById(req.user._id)
      if(user){
          user.name = req.body.name || user.name
          user.email = req.body.email || user.email
        
         if(req.body.password){
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(req.body.password, salt)
        }

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
           user: process.env.USER_EMAIL,
           pass: process.env.USER_PASSWORD,
         }
       });

      const mailOptions = {
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: 'changeed success',
            text: `your password and  name got change`
          };
      const updateUser = await user.save();

          try {
             res.json({
               _id: updateUser._id,
               name: updateUser.name,
               email: updateUser.email,
               active: updateUser.active,
               token: getToken(updateUser),
               isAdmin:updateUser.isAdmin,
        })
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
       } catch (err) {
    
        res.send(err)
      } 
     }
    })


// login 
 router.post('/login',  async (req, res) => {

    //  check data validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(401).json(error.details[0].message) ;

    // check if its right email
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(401).json('Invalid Email.');
    // check if the user active
    if(!user.active) return res.status(401).json('You Have To Activate Your Account')

    // check if its right password
    const validPass = await  bcrypt.compare(req.body.password , user.password);
    if(!validPass) return res.status(401).json('Invalid Password.' );
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      active: user.active,
      isAdmin: user.isAdmin,
      token: getToken(user)
    })
 });

// if you forget the password enter the email and get email with link to make new password
router.post('/forgot' , async (req,res) => {

  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).json('email is not found');

      res.send({
       
        _id: user._id,
        name: user.name,
        email: user.email,
        active: user.active,
        isAdmin: user.isAdmin,
        token: getToken(user)
    })
  
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        }
      });
      try{

           let id = user._id
            const mailOptions = {
               from: process.env.USER_EMAIL,
               to: req.body.email,
               subject: 'Subject of your email',
               html: '<a href = "http://localhost:3000/changePassword/' + id + '">Click here to get new link to make a new password.</a>'
            };
              transporter.sendMail(mailOptions, function(error, info){
               if (error) {
                console.log(error);
             } else {
                console.log('Email sent: ' + info.response);
             }
           });
           }catch (error) {
             console.log(error);
          }
        })

  // change the password
   router.post('/changePassword/:id', verify, async (req,res)=> {

      const user = await User.findOne({_id:req.params.id})
      if(!user) return res.status(401).json('token is not found');

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt)

      user.password = hash;
      user.save() 
     
      res.send({
        
         _id: user._id,
         name: user.name,
         email: user.email,
         active: user.active,
         isAdmin: user.isAdmin,
         token: getToken(user)
    })
   }
  )
  module.exports = router;