import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from '../components/Checkout';
import { createOrder } from '../actions/orderActions';

import './PlaceOrder.css';

function PlaceOrder(props) {

  
  const orderCreate = useSelector(state => state.order);
  const { loading, success, error, order } = orderCreate;

  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, payment } = cart;

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

// check if you filld payment and Shopping
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }


  const thePrice = (num) => Number(num.toFixed(2));
  //  price
  const itemsPrice = thePrice(cartItems.reduce((a, c) => a + c.price * c.count, 0));
  // if the price over 100 dollars so deliver is free if not deliver is 10 
  const shippingPrice = itemsPrice > 100 ? thePrice(0) : thePrice(10);
  // tax is 15 percent
  const taxPrice = thePrice(0.15 * itemsPrice);
  const totalPrice = thePrice(itemsPrice + shippingPrice + taxPrice);

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({ ...cart , itemsPrice , shippingPrice , taxPrice ,
       totalPrice ,orderItems: cartItems
    }));
  }
  // if success create the order move to pay page
  useEffect(() => {
    if (success) {
       props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div>
    <Checkout step1 step2 step3 step4 ></Checkout>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
        <div>
           <div><b>Name: </b> {cart.shipping.fullName}</div>
             <b>Address: </b> 
              {cart.shipping.address}, {cart.shipping.city},
              {cart.shipping.postalCode}, {cart.shipping.country},
           </div>
        </div>
        <div>
          <h3>Payment</h3>
           <div>
             Method: <strong>{cart.payment.paymentMethod}</strong>
           </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                 Shopping Cart
              </h3>
              <div>
                 Price
              </div>
            </li>
            {
              cartItems.length === 0 ?
              <div>
                  Cart is empty
              </div>
              :
              cartItems.map(item =>
               <li>
                   <div className="cart-image">
                      <img src={item.image} alt="product" />
                   </div>
                   <div className="cart-name">
                   <div>
                     <Link to={"/product/" + item.product}>
                       {item.title}
                     </Link>
                   </div>
                   <div>
                        Qty: {item.count}
                   </div>
                   <div>
                        Size: {item.sizes}
                   </div>

                   <div>
                      For: {item.gender}
                   </div>
                   <div>
                        Item Price: {item.price}
                   </div>
                   </div>
                   <div className="cart-price">
                         ${thePrice(item.price * item.count)}
                   </div>
                 </li>
                )
               }
            </ul>
          </div>
        </div>
      <div className="placeorder-action">
        <ul>
        
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${taxPrice}</div>
          </li>
          <li className = "total">
            <div>Order Total</div>
            <div>${totalPrice}</div>
          </li>
            <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
}

export default PlaceOrder;