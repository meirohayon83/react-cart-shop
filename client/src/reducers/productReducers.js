import {
  FETCH_REQUEST,
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCTS_BY_GENDER,
  FILTER_PRODUCTS_BY_SEARCH,
  ORDER_PRODUCTS_BY_PRICE,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  FETCH_DETAILS_PRODUCTS,
  FETCH_DETAILS_RESET,
  FETCH_SIZE_PRODUCTS,
  FETCH_SIZE_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  FETCH_FAIL,
  FETCH_DETAILS_FAIL,
  FETCH_RESET
} 
 from "../constants/productConstants";

//  (with actions.productActions.fetchProducts and  filterProducts 
//   and filterCategory and sortProducts ) filter and products
export const productsReducer = (state = {} , action) => {
  switch (action.type) {
    case FETCH_REQUEST:
     return {loading: true}
    case FETCH_PRODUCTS:
     return {loading: false , items: action.payload, filteredItems: action.payload };
    case FETCH_RESET:
     return {filteredItems:{}}  
    case FETCH_FAIL:
     return { loading: false, error: action.payload }; 
    case FILTER_PRODUCTS_BY_SIZE:
     return {
        ...state,
        size: action.payload.size,
        filteredItems: action.payload.items,
      };
    case FILTER_PRODUCTS_BY_CATEGORY:
     return {
        ...state,
        category: action.payload.category,
        filteredItems: action.payload.items,
      };
    case FILTER_PRODUCTS_BY_GENDER:
     return {
        ...state,
        gender: action.payload.gender,
        filteredItems: action.payload.items,
      };
    case FILTER_PRODUCTS_BY_SEARCH:
     return {
        ...state,
        word: action.payload.gender,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_PRICE:
     return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    default:
      return state;
   };
};

// (with actions.productActions.fetchDetailsProducts)  product by id
export const productDetailsReducer = (state = {product: []}, action) => {
  switch (action.type) {
    case FETCH_DETAILS_PRODUCTS:
     return {product: action.payload };
    case FETCH_DETAILS_FAIL:
     return {error: action.payload} ;
    case FETCH_DETAILS_RESET:
     return {product:[]};
    default:
     return state;
  }
}

// (with actions.productActions.addProducts) for admin
export const addProductsReducer = (state = {} , action) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
     return {loading: true};
    case PRODUCT_ADD_SUCCESS:
     return {loading: false , item: action.payload }; 
    case PRODUCT_ADD_FAIL:
     return { loading: false, error: action.payload };
    default:
     return state;
  }
};

// (with actions.productActions.updateProduct)
export const updateProductsReducer = (state = {} , action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
     return {loading: true}; 
    case UPDATE_PRODUCT_SUCCESS:
     return {loading: false , item: action.payload };   
    case UPDATE_PRODUCT_FAIL:
     return { loading: false, error: action.payload };
    default:
     return state;
  }
};

// (with actions.productActions.deleteProduct)
export const deleteProductsReducer = (state = {} , action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
     return {loading: true}; 
    case DELETE_PRODUCT_SUCCESS:
     return {loading: false , item: action.payload };  
    case DELETE_PRODUCT_FAIL:
     return { loading: false, error: action.payload };
    default:
     return state;
  }
};

// (with actions.productActions.fetchSizeProducts)
export const productSizeReducer = (state = {size: []}, action) => {
  switch (action.type) {
    case FETCH_SIZE_PRODUCTS:
     return {size: action.payload };
    case FETCH_SIZE_RESET:
     return {}
    default:
     return state;
  }
}
