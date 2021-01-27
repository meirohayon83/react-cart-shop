import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import Checkout from '../components/Checkout';
import './Shipping.css';

function Shipping(props) {

  const [fullName,setFullName] = useState()
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const shippingInfo = useSelector(state => state.cart);
  const {shipping} = shippingInfo;

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo } = userSignin;

  const dispatch = useDispatch();


  // if not login move login
   if(!userInfo){
      props.history.push('login')
    }
  //  if admin return to home
    if(userInfo.isAdmin){
      props.history.push('/')
    }
  // if cart is empty return home
    if(!cartItems.length){
      props.history.push('/')
    }

// save shipping address
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({fullName, address, city, postalCode, country }));
    props.history.push('payment');
      
  }
  return <div>
  {/* form shipping info  */}
    <Checkout step1 step2 ></Checkout>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
           <li>
            <h2>Shipping</h2>
           </li>
           <li>
            <label htmlFor="address">
                Full Name
            </label>
            <input
                type="text"
                name="fullName"
                id="address"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                >
            </input>
           </li>

           <li>
            <label htmlFor="address">
               Address
            </label>
            <input
               type="text" 
               name="address" 
               id="address" 
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               required
              >
            </input>
           </li>
           <li>
            <label htmlFor="city">
              City
            </label>
            <input
               type="text"
               name="city" 
               id="city" 
               value={city}
               onChange={(e) => setCity(e.target.value)}
               required
              >
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
            </label>
            <input 
              type="text" 
              name="postalCode" 
              id="postalCode" 
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
             >
            </input>
          </li>
          <li>
            <label htmlFor="country">
               Country
            </label>
            <input 
              type="text" 
              name="country" 
              id="country" 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
             >
            </input>
          </li>
         
          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>
        </ul>
      </form>
    </div>
  </div>

}
export default Shipping;
