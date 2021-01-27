import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_CART,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT,
    CART_EMPTY
   }
    from "../constants/cartConstants";

// remove when i sending id
export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems
  .filter((x) => x._id !== product._id || x.sizes !== product.sizes );
   dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
   localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// (from product) adding to my cart
export const addToCart = (product , sizes , count) => (dispatch, getState) => {

  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
   cartItems.forEach((x) => {
    //  if the id and size its same so just change the quantity
    if (x._id === product._id && x.sizes === sizes) {
      alreadyExists = true;

      x.count = +x.count + +count;
    }
  });
  //  if the id not in cart so add it
    if (!alreadyExists) {
      cartItems.push({ ...product, count: count , sizes: sizes });
   }
     dispatch({
      type: ADD_TO_CART, payload: { cartItems},});
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };



// save shipping
export const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  localStorage.setItem("shipping", JSON.stringify(data));
}
// save payment
export const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}

// in final be4 pay you can change the cart 
export const changeCart = (size , sizes , count) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
   cartItems.forEach((x) => {
    //  here change just quantity cause you dont change the size
    if (x._id === size._id && x.id === size.id && x.sizes === sizes) {

      alreadyExists = true;
      x.count =  +count;
    }
  //  here you change size and quantity
      else if(x._id === size._id && x.sizes !== sizes && x.id !== size.id){

            x.count = +count;
            x.sizes = sizes;
            x.id = size.id

      }
    });
     dispatch({
      type: CHANGE_CART,
      payload: { cartItems},
   });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };









