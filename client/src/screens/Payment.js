import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import Checkout from '../components/Checkout';

function Payment(props) {
  
  const [paymentMethod, setPaymentMethod] = useState('');

  const shippingInfo = useSelector(state => state.cart);
  const {shipping} = shippingInfo;

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo } = userSignin;
  
  if(userInfo && userInfo.isAdmin){
     props.history.push('/')
  }
  //  If you did not fill out the page address return back 
   if (!shipping.address) {
    props.history.push("/shipping");
   }

  const dispatch = useDispatch();

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePayment({ paymentMethod }));
      props.history.push('placeorder');
  };
 
  return (
    <div>
      <Checkout step1 step2 step3></Checkout>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
   {/*Select a payment option  */}
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="paymentMethod">Paypal</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default Payment;