import { 
    CLEAR_ORDER,
    FETCH_ORDERS,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
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

//  (with actions.orderActions.createorder)
 export const orderReducer = (state = {}, action) => {
  
   switch (action.type) {
    case ORDER_CREATE_REQUEST:
     return { loading: true }; 
    case ORDER_CREATE_SUCCESS:
     return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
     return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
     return {}; 
    default:
     return state;
  }
};
//  (with actions.orderActions.detailsOrder )
export const orderDetails = (state = {loading: true } , action) => {
  
   switch (action.type) {
    case ORDER_DETAILS_REQUEST:
     return { loading: true}
    case ORDER_DETAILS_SUCCESS:   
     return { loading : false , order: action.payload}
    case ORDER_DETAILS_FAIL:  
     return {loading : false , error: action.payload} 
    default: 
     return state;
   }
}
// (with actions.orderActions.payOrder)
export const orderPay = (state = {}, action) => {
  
   switch (action.type){
    case ORDER_PAY_REQUEST:
     return { loading: true};
    case ORDER_PAY_SUCCESS:
     return { loading: false , success: true};
    case ORDER_PAY_FAIL:
     return { loading: false , error: action.payload};
    case ORDER_PAY_RESET:
     return {}   
    default:
     return state;      
   }
}

// (with actions.orderActions.deliverOrder) for admin
export const orderDeliver = (state = {}, action) => {
   
   switch (action.type){
      case ORDER_DELIVER_REQUEST:
       return { loading: true};
      case ORDER_DELIVER_SUCCESS:
       return { loading: false , success: true};
      case ORDER_DELIVER_FAIL:
       return { loading: false , error: action.payload};
      case ORDER_DELIVER_RESET:
       return {}   
      default:
       return state;      
   }
}
// (with actions.orderActions./listOrders/adminListOrders) for admin or user
export const orderMineList = (state = {}, action) => {
   
   switch (action.type){
    case ORDER_MINE_LIST_REQUEST:
     return { loading: true};
    case ORDER_MINE_LIST_SUCCESS:
     return { loading: false , orders: action.payload};
    case ORDER_MINE_LIST_FAIL:
     return { loading: false , error: action.payload};
    default: 
     return state;      
   }
}
