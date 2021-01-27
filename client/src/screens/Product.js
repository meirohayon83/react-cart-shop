import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetailsProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import "./Product.css";

function Product(props) {
  
     const [count , setCount] = useState(0)
     const [sizeAndQty , setSizeAndQty] = useState()
     const [sizes ,setSizes] = useState()
     const [interestingProduct ,setInterestingProduct] = useState({})
     const [quantitys , setQuantitys] = useState()
     
     const productList = useSelector((state) => state.productDetails);
     const {loading ,error, product } = productList;
    
     const userSignin = useSelector(state => state.userSignin);
     const {userInfo} = userSignin;
  
     const dispatch = useDispatch();

     const orderId = props.match.params.id;

    
   useEffect(() => {

     console.log(orderId);
      // show the product select by id
      if (product._id !== orderId){
       dispatch(fetchDetailsProducts(props.match.params.id));
      }
      else if(product.length !== 0){
       setInterestingProduct(product.availableSizes)
       setQuantitys(product.availableSizes.map(x => x.quantity));
     }
    }, [dispatch,product]);

     const addToCarts = (e) =>{
      
       if(!userInfo.isAdmin){
        
        const yourProduct = {_id:e._id , title:e.title ,description: e.description ,gender: e.gender,price: e.price , image:e.image ,id:e._id + sizes ,availableSizes:e.availableSizes.map(x => x.size)}
      //  check if have size and count and then add to cart 
         if(sizes && count){
          
           if(count > 0){
            dispatch(addToCart(yourProduct , sizes , count));
            props.history.push('/cart/' + props.match.params.id + '?size=' + sizes + '?count=' + count  );
           }else{
            //  if no count select
            alert('you have to select number of item')
         
           }
         }else{
          alert('choose quantity')
        }
       }else{
        //  if user admin 
         props.history.push('/productlist')
       }
    }

    // check if have quantity in this size if yes setCount ++
    const plus = () =>{
     if(sizeAndQty.quantity > count){
       setCount(count + 1)
     }else{
       setCount(count)
     }
   }
  //  if count !== 0 minus 1
    const minus = () =>{
     if(count > 0){
       setCount(count - 1)
     }
   }
  //  press on size and if quantity is greater than 0 so setSizeAndQty and open the select count
     const ChooseAsize = (e) => {
        e.preventDefault();
        setSizes(e.target.value)
         setCount(0)
           
        if(e.target.name !== 0){
           setSizeAndQty({size:e.target.value , quantity: Number(e.target.name)})
        }
     }


    return (
    
    <div>
    {!product ? (
    <div><div>Loading...</div> {error  && <div>{error}</div>}</div> 
    ):(<>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
       
       <div className = "details">
         <div className = "details-img">
           <img src ={product.image}></img>
         </div>
      <div className = "details-info">
        <ul>
           <li><h4>{product.title}</h4></li>
            <li><h4>for: {product.gender}</h4></li>
           <li> <b>price:{product.price}</b> </li>
         <div> 
           Description:
             <li>{product.description}</li>
         </div>     
        </ul>
      </div>
      
    <div className="details-action">
      
        <ul>

           <li><b>price:${product.price}</b></li>
             
               {interestingProduct.length &&
                   interestingProduct.map(x => 
                      // return just if the size in cart 
                    x.quantity > 0 ? (
                     <button className="button"  value = {x.size} name = {x.quantity} onClick={ChooseAsize} > {x.size}</button>
                    ):(<div className = "nomore"><i>{x.size}</i> No More sizes</div>)
                   )}
 
                {sizes && 
                  <li>size: {sizes}</li>
                }
                <li>
                  {sizeAndQty && (
                    <div>
                      <p>
                         <button className ="increment" onClick={minus}> - </button> <b>{count}</b>  <button className ="increment" onClick={plus}> + </button>
                      </p>
                    </div>
                  )}
                </li> 
         </ul>

            {userInfo  ? (
               <button
                      className="button primary"
                      onClick={() => {
                      addToCarts(product);
                 
                    }}>
                      Add To Cart
                    </button>
             ):(<div className="back-to-result">signin for shop this product</div>)}
         </div>
        </div>
    </>)}
       </div>
    );
}

export default Product;