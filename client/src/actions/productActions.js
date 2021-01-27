import axios from 'axios';

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



// (from products) gett from data all the products
export const fetchProducts = () => async (dispatch) => {
 
  dispatch({ type:FETCH_REQUEST});
try {
  const { data} = await axios.get("http://localhost:3334/products")
  dispatch({type: FETCH_PRODUCTS,payload: data});
  // dispatch({ type:FETCH_DETAILS_RESET})
}catch (error) {
    const message = error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
                    dispatch({ type: FETCH_FAIL, payload: message });
 }
};

// (from product) get from data products by id
export const fetchDetailsProducts = (pro) => async (dispatch) => {
   
  try {
      const {data} = await axios.get("http://localhost:3334/products/" + pro)
      dispatch({type:FETCH_DETAILS_PRODUCTS, payload: data});
      
   } catch (error){
      const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
              dispatch({ type: FETCH_DETAILS_FAIL, payload: message });
 }
}
  

// (from filter) filter by size
export const filterProducts = (products, size , category ,gender) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      gender: gender, 
      size: size,
      category: category,
      items:
         (size  === "" || !size) &&  (category === "" || !category)  &&  (!gender || gender === "") ? products
         : category && (!size || size === "") && (gender === "" || !gender) ? products.filter(x => x.category == category)
         : size && (!category || category === "") && (!gender || gender === "")  ? products.filter(x => x.availableSizes.find(x => x.size === size))
         : gender && (!category || category === "") && (!size || size === "") ? products.filter(x => x.gender === gender)
         : size && gender && (!category || category === "") ? products.filter(x => x.availableSizes.find(x => x.size === size) && x.gender === gender)
         : category && gender && (!size || size === "") ? products.filter(x => x.category == category && x.gender === gender)
         : category && size && (!gender || gender === "") ? products.filter(x => x.availableSizes.find(x => x.size === size) && x.category == category)
         : products.filter(x => x.availableSizes.find(x => x.size === size) && x.category == category && x.gender === gender),
    },
  });
};

// (from filter) filter by gender
export const filterGender = (products, size , category,gender) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_GENDER,
    payload: {
      gender: gender,
      size: size,
      category: category,
      items:
          (size  === "" || !size) && (category === "" || !category ) && (!gender || gender === "") ? products
         : gender && (!category || category === "") && (!size || size === "") ? products.filter(x => x.gender === gender)
         : gender && category && (!size || size === "") ? products.filter(x => x.category == category && x.gender === gender)
         : gender && (!category || category === "") && size  ? products.filter(x => x.availableSizes.find(x => x.size === size) && x.gender === gender)
         : (!gender || gender === "") && (!category || category === "") && size ? products.filter(x => x.availableSizes.find(x => x.size === size))
         : (!gender || gender === "") && (!size || size === "") && category  ? products.filter(x => x.category == category)
         : products.filter(x => x.availableSizes.find(x => x.size === size) && x.category == category && x.gender === gender),
    },
  });
};


// (from filter) filter by gender
export const filterSearch = (filteredProducts, word) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SEARCH,
    payload: {
     word: word,
      items:
        
       filteredProducts.filter(x => x.title.includes(word) || x.description.includes(word) || x.gender.includes(word) || x.category.includes(word)),
    },
  });
};


//  (from filter) filter by category
export const filterCategory = (products, category , size ,gender) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload: {
      gender: gender, 
      category: category,
      size:size,
      items:
         (category  === "" || !category)  && (size === "" || !size)  &&  (!gender || gender === "") ? products
         : size && (!category || category === "") && (!gender || gender === "") ? products.filter(x => x.availableSizes.find(x => x.size === size))
         : category && (!size || size === "") && (!gender || gender === "")  ? products.filter(x => x.category == category)
         : gender && (!category || category === "") && (!size || size === "") ? products.filter(x => x.gender === gender)
         : size && gender && (!category || category === "") ? products.filter(x => x.availableSizes.find(x => x.size === size) && x.gender === gender)
         : category && gender && (!size || size === "") ? products.filter(x => x.category == category && x.gender === gender)
         : category && size && (!gender || gender === "") ? products.filter(x => x.availableSizes.find(x => x.size === size) && x.category == category)
         : products.filter(x => x.category == category && x.availableSizes.find(x => x.size === size) && x.gender === gender),
          
    },
  });
};


//  (from filter) filter by price
export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  console.log(sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};



// (from addproduct) for admin to add product
export const addProducts = (product) => async (dispatch) => {
   dispatch({ type: PRODUCT_ADD_REQUEST, payload: product});
  try { 
    const { data } = await axios.post("http://localhost:3334/admin/newProducts" , product );
     dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
   } catch (error) {
       const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
              dispatch({ type: PRODUCT_ADD_FAIL, payload: message });
  }
};

// (from updateproduct) for update product by id
export const updateProduct = (product) => async (dispatch , getState) => {
   dispatch({ type: UPDATE_PRODUCT_REQUEST , payload: product});
   const { userSignin: { userInfo }} = getState();
 
   try {
    const { data } = await axios.put("http://localhost:3334/admin/updateProduct" , product,{
      headers :{
          authorization: ' Bearer ' + userInfo.token}
    }
  );
     dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
      const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
              dispatch({ type: UPDATE_PRODUCT_FAIL, payload: message });
  }
};




// (from productlist) delete product by id
export const deleteProduct = (product) => async (dispatch , getState) => {
   dispatch({ type: DELETE_PRODUCT_REQUEST , payload: product});
   const { userSignin: { userInfo }} = getState();
    try {
      const { data } = await axios.delete(`http://localhost:3334/admin/deleteProduct/${product}`,{
      headers :{
         authorization: ' Bearer ' + userInfo.token}
     }
    );
     dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
    
    }catch (error) {
      const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
              dispatch({ type:DELETE_PRODUCT_FAIL, payload: message });
  }
};


// (from cart) get the id and aize and quantity and after save in cart
export const fetchSizeProducts = (id , sizer , count , itemId) => async (dispatch) => {

  const {data} = await axios.get("http://localhost:3334/products/" + id + '/' + sizer + '/' + count + '/' + itemId)
   dispatch({type:FETCH_SIZE_PRODUCTS, payload: data} );
  
}