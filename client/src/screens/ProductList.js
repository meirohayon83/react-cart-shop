import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { fetchProducts } from "../actions/productActions";
import {deleteProduct} from "../actions/productActions";

import "./ProductList.css"

function ProductList(props) {

   const [open , setOpen] = useState(false)
   const [id , setId] = useState()

   const productList = useSelector((state) => state.products);
   const {loading , error, items } = productList;

   const userSignin = useSelector(state => state.userSignin);
   const {userInfo} = userSignin;

   const dispatch = useDispatch();
    //  this page just for admin
    if(!userInfo.isAdmin){
       props.history.push('/')
     }

// get all products
   useEffect(() => {
     dispatch({type: 'FETCH_DETAILS_RESET'})
  //  if(!filteredItems){
    dispatch(fetchProducts());
  //  }
  }, [dispatch]);


//  delete with send id
  const deleteItem = () => {
       
      dispatch(deleteProduct(id))
      closeModal()
      //  after delete return home and refresh all the product
      setTimeout(() => {
           dispatch(fetchProducts());
      }, 20);
      
  }
//  modal css
  const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '40rem',
    height                : '10rem'
  }
};

// open window to delete
const openModal = (e) => {
    
    setOpen(true);
    setId(e.target.value)
    
  };
  const closeModal = () => {
       setOpen(false);
  };
 

    return (
       <div>
         {loading && (<div>loading</div>)}
         {error && <div>{error}</div>}   
        <h1>LIST PRODUCTS</h1>
        {/* item length */}
        <> {items && 
        <h2>{items.length} items</h2>
           }
        </>
             {items  && 
             <table className="table">
              <thead>
                <tr>
               
                  <th>TITLE</th>
                  <th>IMAGE</th>
                  <th>DESCRIPTION</th>
                  <th>PRICE</th>
                  <th>SIZES && COUNT</th>
                  <th>UPDATE</th>
                  <th>DELETE</th>
               
                </tr>
              </thead>
               <tbody>
                    {items.map(order =>
                 <tr key={order._id}>
                        
                  <td  className = "info">{order.title}</td> 
                  <td  className = "info"><img className="pic" src={order.image} alt={order.title}></img></td>  
                  <td  className = "info">{order.description}</td>
                  <td >$ {order.price}</td>
                  <td>
                      {order.availableSizes.map(x =>
                           
                    <li>{x.size + ' - '+ x.quantity}</li>
                            
                      )}
                  </td>
                  {/* to update product */}
                  <td>
                     <button
                         type="button" 
                         className="small" 
                         onClick={() => props.history.push('/updateproduct/' + order._id)}
                        >
                       UPDATE
                     </button>
                  </td>
                 {/* to open window to delete item */}
                   <td>
                       <button
                           type="button" 
                           className="small" 
                           value ={order._id}
                           onClick ={openModal}
                        >
                         DELETE
                       </button>
                    </td>
          {/*  window to make sure to delete */}
            {open && 
            <Modal style={customStyles}  isOpen={true} onRequestClose={closeModal}>
             <Zoom>
                 <button className="close"   onClick={closeModal}>
                   x
                 </button>
               <div>
                    Are you sure want to delete this product?<br />
                    Click here and go back home to see your all products.
                   <div>
                     <button className="button"  onClick ={deleteItem}>
                      DELETE
                     </button>
                   </div>
               </div>
             </Zoom>
            </Modal>
            }  
                      
            </tr>
            )}       
           </tbody>
          </table>          
          }
      </div>   
    )}

export default ProductList;