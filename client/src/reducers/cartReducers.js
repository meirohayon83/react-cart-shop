import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_CART,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT,
    CART_EMPTY
   }
    from "../constants/cartConstants";

//  (with action.cartActions) to add to cart or remove be4 sending
   export const cartReducer = (
    state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),shipping: {} ,  payment: {}  },
    action
   ) => {
      switch (action.type) {
       case ADD_TO_CART:
        return { cartItems: action.payload.cartItems };
       case REMOVE_FROM_CART:
        return { cartItems: action.payload.cartItems };
       case CHANGE_CART:
        return { cartItems: action.payload.cartItems}
       case CART_SAVE_SHIPPING:
        return { ...state, shipping: action.payload };
       case CART_SAVE_PAYMENT:
        return { ...state, payment: action.payload };  
       case CART_EMPTY:
        return { ...state, cartItems: []}     
       default:
        return state;
  }
};

