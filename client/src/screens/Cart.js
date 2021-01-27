import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { fetchDetailsProducts , fetchProducts } from "../actions/productActions";
import { changeCart , addToCart } from "../actions/cartActions";
import "./Cart.css";
import formatCurrency from "../util";
import { removeFromCart } from "../actions/cartActions";
import {fetchSizeProducts} from "../actions/productActions"


function Cart(props) {

  const productId = props.match.params.id;
  
  const [counts , setCounts] = useState(props.location.search ? props.location.search.split("=")[2] : 1)
 
  const [item , setItem] = useState()
 
  const productList = useSelector((state) => state.productDetails);
  const {product } = productList;

  const products = useSelector((state) => state.products);
  const {items } = products;

  const cartItem = useSelector((state) => state.cart);
  const { cartItems } = cartItem;

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const sizeItems = useSelector((state) => state.productSize)
  const {size} = sizeItems;

  const dispatch = useDispatch();


 if(userInfo.isAdmin){
     props.history.push('/')
 }


  var findProduct =[]
  var productAvailable =[]
  
    
   useEffect(() => {
     
      dispatch(fetchProducts());
          // find by id product from all products
         if(cartItems.length){
          for(let i = 0; i < cartItems.length;i++){ 
            if(items.length){
             findProduct.push(items.find(x => x._id === cartItems[i]._id));
                setItem(findProduct)
            }
           }
          if(findProduct.length){
           for(let i = 0; i < findProduct.length;i++){
            if(item){
              // after we know the id find the size and if the quantity is > from the cartItem
             item.map(o => o.availableSizes.map(y => y.size === cartItems.map(d => d.sizes) && y.quantity < cartItems.map(s => s.count)))
            }
            productAvailable.push({_id: findProduct[i]._id ,  category: findProduct[i].category , description: findProduct[i].description , image: findProduct[i].image , price: findProduct[i].price , title: findProduct[i].title ,availableSizes: findProduct[i].availableSizes.filter(s => s.size === cartItems[i].sizes && s.quantity < cartItems[i].count)}) 
           }
           if(productAvailable){

             var itemAvailable = productAvailable.find(x => x.availableSizes.length > 0);

            if(itemAvailable){
               
                const products = {_id:itemAvailable._id , title:itemAvailable.title ,description: itemAvailable.description ,price:itemAvailable.price , image:itemAvailable.image ,id: itemAvailable._id + itemAvailable.availableSizes[0].size }
                const quantity =   itemAvailable.availableSizes[0].quantity;
                const sizeItem = itemAvailable.availableSizes[0].size
              
            if(products){
              // if in data no more quantity or less then choose change to what have in data
                dispatch(changeCart(products , sizeItem ,+quantity))
             }
            }
           }
         }
        }
       },[dispatch , cartItems])
   
  //  in cart you can still change the size 
  const hand = (e) => {

      var totalQuantity = (+e.target.name + 1) - +e.target.name;
      
      dispatch(fetchSizeProducts(e.target.id , e.target.value , totalQuantity, e.target.id + e.target.value))
      props.history.push('/cart/' + e.target.id + '?size=' + e.target.value + '?count=' + totalQuantity );
      
      const finalProduct = {_id: e.target.id  ,id: e.target.id + e.target.value };
      dispatch(changeCart(finalProduct , e.target.value , totalQuantity ));
  
  }

  const plus = (e) => {
    //  when you press plus change the count 
     dispatch(fetchSizeProducts(e.target.id ,e.target.name , +e.target.value + 1  , e.target.id + e.target.name))
     
     const finalProduct = {_id:e.target.id  ,id: e.target.id + e.target.name }
     dispatch(changeCart(finalProduct , e.target.name , +e.target.value + 1));
     props.history.push('/cart/' + e.target.id + '?size=' + e.target.name + '?count=' + (+e.target.value + 1)  );

  }

 const minus = (e) => {
// when press minus change the cart until its 1 
    if(e.target.value > 1){
       dispatch(fetchSizeProducts(e.target.id ,e.target.name , +e.target.value - 1  , e.target.id + e.target.name))
       props.history.push('/cart/' + e.target.id + '?size=' + e.target.name + '?count=' + (+e.target.value - 1)  ); 
       const finalProduct = {_id:e.target.id  ,id: e.target.id + e.target.name }
       dispatch(changeCart(finalProduct , e.target.name , +e.target.value - 1));
   }
  }

//  final add to cart and move on  to address 
    const addToCarts = (e) =>{
      if(cartItems.length){
         props.history.push('/shipping' );
     }else{
         props.history.push('/')
    }
   }
  
  
  
  return (
   <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
           <h3>
              Shopping Cart
           </h3>
           <div>Price </div>
           <div>Gender</div>
           <div>Size</div>
           <div>Count</div>
           <div>Change Size</div> 
        </li>
           {/* check if have item in cart */}
           {cartItems.length === 0 ?
          <div>
              Cart is empty
          </div>
            :
            // display the cart items
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
                  {/* remove from cart */}
                <div>
                   <button type="button" className="buttonD" onClick={() => dispatch(removeFromCart(item))}>
                      Delete
                   </button>
                </div>
               
             </div>

                <div className="cart-price">
                   {formatCurrency(item.price * item.count)}
                </div>
                
                <div className="cart-size">
                   {item.gender}
                </div>
                <div className="cart-size">
                   {item.sizes}  
                </div>
               {/* check if have still quantity in this size and plus and minus */}
                <div className ="cart-count">
                    {item.count > 0 ? (
                   <p>
                       <button value={item.count} name ={item.sizes} id={item._id} className ="increment" onClick ={minus}> - </button> <b>{item.count}</b>  <button value={item.count} name ={item.sizes} id={item._id} className ="increment" onClick ={plus}> + </button>
                   </p>
                       ):('no more quantity available in this size')   }
                 </div>
                {/* change size in cart */}
               <div className="changeSize">
                 <select  name={item.count} id={item._id} onClick={hand}  >
                    {item.availableSizes.map(x => (  
                      <option  value = {x}>
                        {x}
                      </option>
                    ))} 
                </select>
              </div>
            </li>
           )
          }
        </ul> 
      </div>
       {/* total price */}
     <div className="cart-action">
      <h3>
          Subtotal { '(' + cartItems.length + " " + 'Items' + ')'}: {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0),
          cartItems.sizes  )} 
      </h3>
      
      <button  className="button primary full-width" onClick={ () =>(  addToCarts(size[0]) , console.log(size[0]))}>
        Proceed to Checkout
      </button>
    </div>
  </div>
 );
}

export default Cart;