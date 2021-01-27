import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from '../components/Checkout';
import { detailsOrder , payOrder} from '../actions/orderActions';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'

import './Order.css';

function Order(props) {

  const [sdkReady, setSdkReady] = useState(false);

  const orderId = props.match.params.id;
  
  const orderDetails = useSelector(state => state.orderDetails)
  const {order , error , loading} = orderDetails;

 
  const orderPay = useSelector(state => state.orderPay)
  const {loading : loadingPay , error : errorPay, success: success} = orderPay;

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch();

  const thePrice = (num) => Number(num.toFixed(2));

  useEffect(() => {
  // to display paypal button
    const addPaypalSdk = async () => {
    const {data} = await axios.get("http://localhost:3334/config/paypal");
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    }
    document.body.appendChild(script);
  }
    if(!order || (order && order._id !== orderId)){
      dispatch({ type: "ORDER_PAY_RESET"})
      dispatch(detailsOrder(orderId));
    }else{
      if(!order.isPaid){
        if(!window.paypal){
          addPaypalSdk()
        }else{
          setSdkReady(true)
        }
      }
    }
   },[dispatch , order , sdkReady , orderId , success]);

// if pay success send data information of order 
  const successPayment = (paymentResult) => {

     dispatch(payOrder(order ,paymentResult))
     dispatch(detailsOrder(orderId));
  }

  return(
   <div>
   
     {loading && (<div>loading</div>)}
     {error && <div>{error}</div>}

     {order && 
     <div className="placeorder">
      <div className="placeorder-info">
      {/* show order id */}
        <h4>order : {order._id}</h4>
       <div>
        <h3>
            Shipping
        </h3>
          
        <div>
        {/* show information of order with address and final price */}
           <div><b>Name: </b> {order.shipping.fullName}</div>
           <b>Address: </b> 
            {order.shipping.address}, {order.shipping.city},
            {order.shipping.postalCode}, {order.shipping.country},
            {order.isDelivered ? (<div className="deliver">Delivered at {order.deliveredAt}</div>): (<div className ="notDeliver">Not Delivered</div>)}
        </div>
       </div>
        <div>
          <h3>Payment</h3>
          <div>
            Method: <strong>{order.payment.paymentMethod}</strong>
             {order.isPaid ? (<div className="deliver">paid at {order.paidAt}</div>): (<div className ="notDeliver">Not Paid</div>)}
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
              order.length === 0 ?
                <div>
                  Cart is empty
                </div>
              :
               order.orderItems.map(item =>
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
                        for: {item.gender}
                      </div>
                      <div>
                        Item Price: {item.price}
                      </div>
                    </div>
                    <div className="cart-price">
                        ${(thePrice(item.price * item.count))}
                    </div>
                  </li>
                 )
                }
            </ul>
          </div>
      </div>
      
      <div className="placeorder-action">
        <ul>
       
          <li className="Summary">
            <h3>Order Summary</h3>
          </li>
          <li>
            <div><b>Items</b></div>
            <div>${thePrice(order.itemsPrice)}</div>
          </li>
          <li>
            <div><b>Shipping</b></div>
            <div>${thePrice(order.shippingPrice)}</div>
          </li>
          <li>
            <div><b>Tax</b></div>
            <div>${thePrice(order.taxPrice)}</div>
          </li>
          <li className = "total">
            <div>Order Total</div>
            <div>${thePrice(order.totalPrice)}</div>
          </li>
          {!userInfo.isAdmin && 
          <>
             {!order.isPaid && (
          <li>
           
           {!sdkReady ? (<div>Loading...</div>) : (
             
            <div className ="pay">
                {errorPay && (<div>{errorPay}</div>)}
                {loadingPay && <div>loading...</div>}
              <PayPalButton
                 amount={order.totalPrice} 
                 onSuccess = {successPayment}>
              </PayPalButton>
             </div>
            )}
          </li>
          )}
        </>
        }
      </ul>
    </div>
  </div> 
}
</div>
)
}

export default Order;