import axios from 'axios';

import { 
    CLEAR_ORDER,
    FETCH_ORDERS,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    CART_EMPTY,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL, 
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET, 
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_MINE_LIST_FAIL   
 } 
 from "../constants/orderConstants";

// (with placeorder) create order with check jwt
export const createOrder = (order) => async (dispatch , getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try{
     
      const { userSignin: { userInfo } } = getState();
      const { data} = await axios.post("http://localhost:3334/orders",  order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type:CART_EMPTY});
      dispatch({ type:ORDER_CREATE_RESET})
      localStorage.removeItem('cartItems');
  } catch (error) {

      const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
              dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

  // (from order) information of order be4 pay and information of delivered
    export const detailsOrder = (orderId) => async (dispatch, getState) => {

       dispatch({ type:ORDER_DETAILS_REQUEST , payload: orderId});
       const { userSignin: { userInfo } } = getState();
       try{   
         const {data} = await axios.get(`http://localhost:3334/orders/${orderId}` ,{
           headers: {
              Authorization: ' Bearer ' + userInfo.token
            },
          })
            dispatch({ type:ORDER_DETAILS_SUCCESS , payload: data})
            
          }catch (error) {
             const message = error.response && error.response.data.message
             ? error.response.data.message
             : error.message
             dispatch({ type:ORDER_DETAILS_FAIL , payload: message})
           }
          
       }

    // (from order) after pay  send data with  all information
      export const payOrder = (order, paymentResult) => async (dispatch, getState) =>{

         dispatch({ type:ORDER_PAY_REQUEST , payload: {order ,paymentResult}})
           const {userSignin: {userInfo }}= getState();
           try{
             const { data} = await axios.put(`http://localhost:3334/orders/${order._id}/pay` , paymentResult , { 
               headers :{
                  authorization: ' Bearer ' + userInfo.token}
               });
               
               dispatch({ type: ORDER_PAY_SUCCESS , payload: data})
           }
            catch(error){
              
             const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
              dispatch({ type:ORDER_PAY_FAIL , payload: message})

           }
      }

      // (from ordersmine) when admin want to accept to send the orders 
       export const deliverOrder = (order) => async (dispatch , getState) =>{
               dispatch({ type:ORDER_DELIVER_REQUEST })
               const { userSignin: { userInfo } } = getState();
             try{
             
               const {data} = await axios.get(`http://localhost:3334/admin/${order}/delivered `,{ 
                headers :{ authorization: ' Bearer ' + userInfo.token}}
               );
           
               dispatch({ type: ORDER_DELIVER_SUCCESS , payload: data})
             }
             catch(error){
              
               const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message
               dispatch({ type:ORDER_DELIVER_FAIL , payload: message})
           }
      }

      // (from ordersmine) information of order for user 
      export const listOrders = () => async (dispatch , getState) =>{

            dispatch({ type:ORDER_MINE_LIST_REQUEST})
           const {userSignin: {userInfo }}= getState();
           try{
             const { data} = await axios.get(`http://localhost:3334/orders` , { 
               
               headers :{ authorization: ' Bearer ' + userInfo.token}
               });
               
               dispatch({ type: ORDER_MINE_LIST_SUCCESS , payload: data})
           }
            catch(error){
              
             const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
              dispatch({ type:ORDER_MINE_LIST_FAIL , payload: message})

           }

      }


     
     // (from ordersmine) information of order for admin with possibility to send the order
       export const adminListOrders = () => async (dispatch , getState) =>{

            dispatch({ type:ORDER_MINE_LIST_REQUEST , payload: ''})
           const {userSignin: {userInfo }}= getState();
           try{
             const { data} = await axios.get(`http://localhost:3334/admin` , { 
               
               headers :{ authorization: ' Bearer ' + userInfo.token}
               });
               
               dispatch({ type: ORDER_MINE_LIST_SUCCESS , payload: data})
           }
            catch(error){
              
             const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
              dispatch({ type:ORDER_MINE_LIST_FAIL , payload: message})

           }

      }