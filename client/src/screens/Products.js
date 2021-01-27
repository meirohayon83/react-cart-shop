import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import "./Products.css"

 function Products(props) {

    const [produc , setProduc] = useState(null)
    const [sizes , setSizes] = useState()
   
    const productList = useSelector((state) => state.products);
    const {loading, error , filteredItems } = productList;
   
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
     
    const dispatch = useDispatch();
  // show all products
   useEffect(() => {
     dispatch(fetchProducts());
     
  }, []);

 
    return (
      <div>
        <Fade bottom cascade>
       {
          !filteredItems ? (
            <div>{loading  && <div>Loading...</div>} {error  && <div>{error}</div>}</div>
          ) : (
          
            <ul className="products">
              {filteredItems.map((product) => (
                <li key={product._id}>
                  <div className="product">
                   {/* link to page with product id */}
                    <Link to={'product/' + product._id}> <img src={product.image}></img></Link>
                     <div className="size"> 
                        <span>sizes: </span>
                        {/* show size just if have quantity */}
                         {product.availableSizes.map(x => (
                           x.quantity > 0 ? 
                        <span>
                           <i className="size" value = {x}  >{x.size}</i> 
                        </span>
                       :(<span className = "nosize"><b>{x.size}</b> No In Stock</span>)))
                       }  
                     </div> 
                   
                    <div className="product-price">
                       <div>{formatCurrency(product.price)}</div> 
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
      </div>
     );
    }

 export default Products;
 