import React, { useState, useEffect } from 'react';
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link ,useHistory} from "react-router-dom";
import './App.css';

import Home from "./components/Home";
import UserRegister from "./screens/UserRegister";
import UserLogin from "./screens/UserLogin";
import AddProduct from "./screens/AddProduct";
import Product from "./screens/Product";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/PlaceOrder";
import OrdersMine from "./screens/OrdersMine";
import ProductList from "./screens/ProductList";
import UpdateProduct from "./screens/UpdateProduct";
import ForgotPassword from "./screens/ForgotPassword";
import ChangePassword from "./screens/ChangePassword";
import UserProfile from "./screens/UserProfile";
import Welcome from "./screens/Welcome";
import Cart from "./screens/Cart";
import Order from "./screens/Order";

import Products from "./screens/Products";

import { signin } from './actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from './actions/userActions';

// material for make a number on dashboard of cartItem
import Badge from '@material-ui/core/Badge';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -9.5,
      top: -8,
      border: `-3px solid ${theme.palette.background.paper}`,
      padding: '0 2px',
      fontSize: '12px',
    },
  }),
)(Badge);


  export default function App()  {
   
   
   const cartItem = useSelector((state) => state.cart);
   const { cartItems } = cartItem;

   const userSignin = useSelector(state => state.userSignin);
   const {userInfo} = userSignin;

   const dispatch = useDispatch();

  //  signout and remove from local storage
   const signout = () =>{
      dispatch(logout())
    }

    return (
      
        <BrowserRouter>
          <div className="grid-container">
          {/* dashboard */}
            <header className="row">
            {/* link to home */}
            <div>
              <Link className ="brand" to="/">React Shopping Cart</Link>
            </div>
           {/* if not admin show cart  items link to see cart items*/}
            <div>
              {userInfo ? (
                !userInfo.isAdmin &&  
               <Link to="/cart/:id?:count?">cart
                 <StyledBadge badgeContent={cartItems.length} color="primary"></StyledBadge>
               </Link>
               ): ""}
            </div>
               {/* if logged and admin show this option */}
             {userInfo ? (
                userInfo.isAdmin ? (
             <div className="dropdown">
              <Link  to="#">
                {userInfo.name} <i className="dropdown-down"></i>
              </Link>
             <ul className="dropdown-content">
             
               <li>
                 <Link to="/orderhistory"> Order</Link>
               </li>
              
               <li>
                 <Link to="/addProduct"> addProduct</Link>
               </li>
              
               <li>
                 <Link to="/ProductList"> You'r Product</Link>
               </li>
              
               <li>
                 <Link to="/profile">profile</Link>
               </li>
                
               <li>
                 <Link to="/" onClick={signout}>Sign Out</Link>   
               </li>
             
              </ul>
             </div>
                ): (
            // if logged and not admin show this option
            <div className="dropdown">
               <Link to="#">
                 {userInfo.name}  <i className="dropdown-down"></i>
               </Link> 
              <ul className="dropdown-content">
               
                <li>
                  <Link to="/orderhistory"> Order</Link>
                </li>
               
                <li>
                  <Link to="/profile">profile</Link>
                </li>

                <li>
                  <Link to="/" onClick={signout}>Sign Out</Link>   
                </li>
              </ul>
            </div>
              )
              ):(
                // if not logged in
              <Link to="/login">login</Link>
              )} 

            </header>
         
            <main>
            
              <Route exact path= "/" component = {Home}/>
              <Route path="/register" component={UserRegister}/>
              <Route path="/login" component= {UserLogin}/>
              <Route path="/addProduct" component={AddProduct}/>
              <Route path="/product/:id" component={Product}/>
              <Route path="/cart/:id?:count?" component={Cart}/>
              <Route path="/order/:id" component={Order}/> 
              <Route path="/shipping" component={Shipping} />
              <Route path="/payment" component={Payment}/>
              <Route path="/placeorder" component={PlaceOrder}/>
              <Route path="/orderhistory" component={OrdersMine}/>
              <Route path="/productlist" component={ProductList}/>
              <Route path="/updateproduct/:id" component={UpdateProduct}/>
              <Route path="/profile" component={UserProfile}/>
              <Route path="/forgotpassword" component={ForgotPassword}/>
              <Route path="/changepassword/:id" component={ChangePassword}/>
              <Route path="/welcome/:id" component={Welcome}/>
            </main>
         
            <footer>All right is reserved.</footer>
          </div>
        </BrowserRouter>
    
    );
  }


