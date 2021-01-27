import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchDetailsProducts} from "../actions/productActions";
import {updateProduct} from "../actions/productActions";
import './UpdateProduct.css'

function UpdateProduct(props) {

    const id = props.match.params.id

    const [price , setPrice] = useState()
    //  update product until 6 sizes 
    const [availableSizes,setAvailableSizes] = useState()
    const [count , setCount] = useState()

    const [availableSizes2,setAvailableSizes2] = useState()
    const [count2 , setCount2] = useState()

    const [availableSizes3,setAvailableSizes3] = useState()
    const [count3 , setCount3] = useState()

    const [availableSizes4,setAvailableSizes4] = useState()
    const [count4 , setCount4] = useState()

    const [availableSizes5,setAvailableSizes5] = useState()
    const [count5 , setCount5] = useState()

    const [availableSizes6,setAvailableSizes6] = useState()
    const [count6 , setCount6] = useState()

    
    const productList = useSelector((state) => state.productDetails);
    const { product } = productList;

    const updateProducts = useSelector((state) => state.updateProductsReducer)
    const {loading ,error ,item} = updateProducts

    const dispatch = useDispatch();

      useEffect(() => {
        // get product
       if(product.length === 0){
         dispatch(fetchDetailsProducts(id));

       }
        else {
          
          // if uploaded fill all input with the info
         setPrice(product.price);
         
         let size = product.availableSizes.map(x => x.size )
         let count = product.availableSizes.map(x => x.quantity)

         setAvailableSizes(size[0])
         setCount(count[0])
         
         setAvailableSizes2(size[1])
         setCount2(count[1])

         setAvailableSizes3(size[2])
         setCount3(count[2])
         
         setAvailableSizes4(size[3])
         setCount4(count[3])

         setAvailableSizes5(size[4])
         setCount5(count[4])
        
         setAvailableSizes6(size[5])
         setCount6(count[5])
        
       }
     
     }, [product , dispatch , id ]);

     const submit = (e) => {
      // update just what is fill
         e.preventDefault();
         if(availableSizes){
             var sizeAndCount = [{size: availableSizes , quantity: +count}]
          }
      
         if(availableSizes && availableSizes2){
             var sizeAndCount = [{size: availableSizes , quantity: +count} ,  {size: availableSizes2 , quantity: +count2}]
        
          }
         if(availableSizes && availableSizes2 && availableSizes3){
             var sizeAndCount = [{size: availableSizes , quantity: +count} ,
               {size: availableSizes2 , quantity: +count2},
               {size: availableSizes3 , quantity: +count3}
               ]
          }
         if(availableSizes && availableSizes2 && availableSizes3 && availableSizes4){
             var sizeAndCount = [{size: availableSizes , quantity: +count} ,
               {size: availableSizes2 , quantity: +count2},
               {size: availableSizes3 , quantity: +count3},
               {size: availableSizes4 , quantity: +count4}
               ]
          }
         if(availableSizes && availableSizes2 && availableSizes3 && availableSizes4 && availableSizes5){
             var sizeAndCount = [{size: availableSizes , quantity: +count} ,
               {size: availableSizes2 , quantity: +count2},
               {size: availableSizes3 , quantity: +count3},
               {size: availableSizes4 , quantity: +count4},
               {size: availableSizes5 , quantity: +count5}
               ]
         }

          if(availableSizes && availableSizes2 && availableSizes3 && availableSizes4 && availableSizes5 && availableSizes6){
             var sizeAndCount = [{size: availableSizes , quantity: +count} ,
               {size: availableSizes2 , quantity: +count2},
               {size: availableSizes3 , quantity: +count3},
               {size: availableSizes4 , quantity: +count4},
               {size: availableSizes5 , quantity: +count5},
               {size: availableSizes6 , quantity: +count6}
               ]
         }
        // update
         dispatch(updateProduct({_id: product._id ,title: product.title , description:product.description ,
             image:product.image, price: price ,availableSizes: sizeAndCount
            }))

         setTimeout( () => props.history.push('/productList'),3000)
     }

    return <div className="form" >
    
       <form>
          <ul className="form-container">
             <li className = "update">Update Product</li>
             {/* title category description image cant be changed */}
             <li>
                <div id="title">{product.title}</div>
             </li>
             <li>
                <div id="category">Category: {product.category}</div>
             </li>
             <li>
                <div id="gender">Gender: {product.gender}</div>
             </li>
            
             <li>
                 <div id ="description">{product.description}</div> 
             </li>
             <li>
                <label htmlFor="image"></label>
                <img id="image" src={product.image} />
             </li> 
            
             <li>
             <i>size and quantity </i>
        {/* if you fill size and count its open another option of size and count */}
           {availableSizes &&  
             <div>
                <input className ="sizeandcount" type="text"  value ={availableSizes}/> 
                <input className ="sizeandcount" type="text" onChange ={(e) => setCount(e.target.value)}   value ={count}/> 
             </div>
           }
           {availableSizes2 ? (
              <div>
                <input className ="sizeandcount" type="text" onChange ={(e) => setAvailableSizes2(e.target.value)}  value ={availableSizes2}/> 
                <input className ="sizeandcount" type="text" onChange ={(e) => setCount2(e.target.value)}   value ={count2}/> 
              </div>):(
              <div>
                <input className ="sizeandcount" type="text" onChange ={(e) => setAvailableSizes2(e.target.value)}    value ={availableSizes2}/> 
                <input className ="sizeandcount" type="text" onChange ={(e) => setCount2(e.target.value)}   value ={count2}/> 
              </div>
             )
            }

            {availableSizes2 && count2 ? (
             availableSizes3 ?
             (
             <div>
                <input className ="sizeandcount" type="text" onChange ={(e) => setAvailableSizes3(e.target.value)}   value ={availableSizes3}/> 
                <input className ="sizeandcount" type="text"  onChange ={(e) => setCount3(e.target.value)}  value ={count3}/> 
             </div>
              )
             :(
             <div>
                <input className ="sizeandcount" type="text" onChange ={(e) => setAvailableSizes3(e.target.value)}   value ={availableSizes3}/> 
                <input className ="sizeandcount" type="text"  onChange ={(e) => setCount3(e.target.value)}  value ={count3}/> 
             </div>
              )
             ):('')
            }

           {availableSizes3 && count3 ? (
            availableSizes4 ? (
            <div>
                <input className ="sizeandcount" type="text" onChange = {(e) => setAvailableSizes4(e.target.value)}  value ={availableSizes4}/> 
                <input className ="sizeandcount" type="text" onChange ={(e) => setCount4(e.target.value)}   value ={count4}/> 
            </div>):(
            <div>
                <input className ="sizeandcount" type="text" onChange = {(e) => setAvailableSizes4(e.target.value)}  value ={availableSizes4}/> 
                <input className ="sizeandcount" type="text" onChange ={(e) => setCount4(e.target.value)}   value ={count4}/> 
            </div>    
             )
            ):('')
            }

            {availableSizes4 && count4 ? 
               availableSizes5 ? (
             <div>
                 <input className ="sizeandcount" type="text" onChange ={(e) => setAvailableSizes5(e.target.value)}  value ={availableSizes5}/> 
                 <input className ="sizeandcount" type="text" onChange ={(e) => setCount5(e.target.value)}  value ={count5}/> 
             </div>):(
             <div>
                 <input className ="sizeandcount" type="text" onChange ={(e) => setAvailableSizes5(e.target.value)}   value ={availableSizes5}/> 
                 <input className ="sizeandcount" type="text" onChange ={(e) => setCount5(e.target.value)}  value ={count5}/>
             </div>
             ):
             ('')
             }    
            
            {availableSizes5 && count5 ? 
              availableSizes6 ? (
             <div>
                 <input className ="sizeandcount" type="text"  onChange = {(e) => setAvailableSizes6(e.target.value)}   value ={availableSizes5}value ={availableSizes6}/> 
                 <input className ="sizeandcount" type="text" onChange ={(e) => setCount6(e.target.value)}  value ={count6}/>
             </div>):(
             <div>
                 <input className ="sizeandcount" type="text" onChange ={(e) => setAvailableSizes6(e.target.value)}   value ={availableSizes6}/> 
                 <input className ="sizeandcount" type="text" onChange ={(e) => setCount6(e.target.value)}  value ={count6}/>
             </div>
             )
             :('')
             }      
           </li> 
 
            <li>
                <label htmlFor="price"></label>
                <input type="text" id ="price" onChange ={ (e) => setPrice(e.target.value)}  value ={price}/>
            </li>
            <li>
                <button type="submit" onClick ={submit} className="primary" >Update</button>
            </li>
          
            {item && <i>{item}</i> }
          </ul>
        </form>
      </div>
}

export default UpdateProduct;