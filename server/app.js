const express = require('express')
const path = require('path');
const cart = require('./router/items')
const usersRoute = require('./router/users')
const order = require('./router/orders')
const admin = require('./router/admin')
const cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use(express.urlencoded());
app.use( '/uploads' , express.static('uploads'))

const dotenv = require('dotenv')
dotenv.config();

app.get('/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use('/',cart );
app.use('/user',usersRoute );
app.use('/orders', order)
app.use('/admin' , admin)


app.listen(3334 ,() => console.log("server up"))