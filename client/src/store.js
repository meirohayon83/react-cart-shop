import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import { productsReducer , productDetailsReducer , productSizeReducer , 
 updateProductsReducer , deleteProductsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import  {orderReducer , orderDetails , orderPay , orderDeliver,  orderMineList } from "./reducers/orderReducers";
import {userRegisterReducer , userDetails , userSigninReducer , userUpdateProfile ,
 userDeleteProfile , newPasswordReducer , sendEmailReducer , activeAccountReducer}  from "./reducers/userReducers";


 const initialState = {

   userSignin:{ userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null,},
   sendEmailReducer:{ userInf:localStorage.getItem('userInf')? JSON.parse(localStorage.getItem('userInf')): null,},
   cart:{cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[],
         shipping: localStorage.getItem('shipping')? JSON.parse(localStorage.getItem('shipping')):{},
          payment: {}
   },
    
 } 



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    order: orderReducer,
    orderDetails: orderDetails,
    orderPay: orderPay,
    orderDeliver: orderDeliver,
    orderMineList: orderMineList,
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    userDetails: userDetails,
    userUpdateProfile: userUpdateProfile,
    newPasswordReducer: newPasswordReducer,
    userDeleteProfile: userDeleteProfile,
    productSize: productSizeReducer,
    updateProductsReducer: updateProductsReducer,
    deleteProductsReducer: deleteProductsReducer,
    sendEmailReducer:sendEmailReducer,
    activeAccountReducer: activeAccountReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;