import React, { useState, useEffect } from 'react';
import { Link ,  useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {addProducts} from "../actions/productActions";
import "./AddProduct.css";


function AddProduct(props){
    
    const [success , setSuccess] = useState()
    const [title , setTitle] = useState()
    const [category , setCategory] = useState()
    const [description , setDescription] = useState()
    const [image , setImage] = useState()
    const [price , setPrice] = useState()
    const [gender , setGender] = useState()
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

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
 
   // just for admin if not return to home
   if(!userInfo.isAdmin){
    props.history.push('/')
   }

   
   const dispatch = useDispatch();

   
    function submit(e){

         e.preventDefault();
        
          const formData = new FormData()
            formData.append('title', title)
            formData.append('category', category)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('gender' , gender)
            formData.append('availableSizes', availableSizes)
            formData.append('count' , +count)
           if(availableSizes2 && count2){
                formData.append('availableSizes',availableSizes2)
                formData.append('count' ,+count2)
            }
           if(availableSizes3 && count3){
               formData.append('availableSizes',availableSizes3)
               formData.append('count' ,+count3)
            }
           if(availableSizes4 && count4){
               formData.append('availableSizes',availableSizes4)
               formData.append('count' ,+count4)
            }
           if(availableSizes5 && count5){
               formData.append('availableSizes',availableSizes5)
               formData.append('count' ,+count5)
           }
           if(availableSizes6 && count6){
               formData.append('availableSizes',availableSizes6)
               formData.append('count' ,+count6)
           }
               formData.append('image', image) 
         // adding product
          dispatch(addProducts(formData))
          setSuccess('new product adding Succeeded')
          setTimeout(() => {props.history.push('/ProductList')},4000 ) 
      }

// for file
   const uploadFileHandler = (e) => {
     const file = e.target.files[0];
     setImage(file);
  };

  return (

   <div className="product-header">
    <form onSubmit={submit}>
      <ul>

         <li className="title">create a new product</li>
          <div>{success ? success : ''}</div>
         <li>
           <label htmlFor="title">title</label>
           <input type="text"  name="title"  id="title" onChange={(e) => setTitle(e.target.value)}></input>
         </li>

         <li>
           <label htmlFor="category">category</label>
           <input type="text"  name="category"  id="category" onChange={(e) => setCategory(e.target.value)}></input>
         </li>

          <li>
          
           <label>
        <input
          type="radio"
          name="test"
          value="man"
          checked={gender === 'man'}
          onChange={() => setGender("man")}
        />
        man
      </label>
      <label>
        <input
          type="radio"
          name="test"
          value="woman"
          checked={gender === 'woman'}
          onChange={() => setGender("woman")}
        />
        woman
      </label>
        </li>
         <li>
           <label htmlFor="description">description</label>
           <textarea type="text"  name="description"  id="description"  onChange={(e) => setDescription(e.target.value)}></textarea>
         </li>


     <div className="row">
    
      <div className = "inRow">
         <li>
            <label htmlFor="image">Image</label>
            <input type="file"  name ="image"  onChange={uploadFileHandler}></input>
         </li>
      </div>
   
      <div className = "inRow">
        <li>
           <label htmlFor="price">price</label>
           <input type="text"  name="price"  id="price"  onChange={(e) => setPrice(e.target.value)}></input>
        </li>
      </div>
  
  </div>

  <div className="row">
   
    <div className = "inRow">
      <li>
           <label htmlFor="availableSizes">size</label>
           <input type="text"  name="availableSizes"  id="availableSizes"  onChange={(e) => setAvailableSizes(e.target.value)}></input>
      </li>  
    </div>
   
   <div className = "inRow">
      <li>
           <label htmlFor="count">Count</label>
           <input type="text"  name="count"  id="count"  onChange={(e) => setCount(e.target.value)}></input>
      </li>    
  </div>
 
 </div>
      
 {availableSizes && count &&
   <div className="row">
   
     <div className = "inRow"> 
       <li>
           <label htmlFor="availableSizes2">size2</label>
           <input type="text"  name="availableSizes2"  id="availableSizes2"  onChange={(e) => setAvailableSizes2(e.target.value)}></input>
       </li>
     </div>
  
     <div className = "inRow">
       <li>
           <label htmlFor="count2">Count2</label>
           <input type="text"  name="count2"  id="count2"  onChange={(e) => setCount2(e.target.value)}></input>
       </li>  
     </div>
 
 </div>
}
    
{availableSizes2 && count2 &&
 <div className="row">
    
    <div className = "inRow"> 
       <li>
           <label htmlFor="availableSizes3">size3</label>
           <input type="text"  name="availableSizes3"  id="availableSizes3"  onChange={(e) => setAvailableSizes3(e.target.value)}></input>
        </li>
    </div>
    <div className = "inRow">
        <li>
           <label htmlFor="count2">Count3</label>
           <input type="text"  name="count3"  id="count3"  onChange={(e) => setCount3(e.target.value)}></input>
        </li>  
    </div>
  
  </div>
}

{availableSizes3 && count3 &&
  <div className="row">
    
    <div className = "inRow"> 
       <li>
           <label htmlFor="availableSizes4">size4</label>
           <input type="text"  name="availableSizes4"  id="availableSizes4"  onChange={(e) => setAvailableSizes4(e.target.value)}></input>
       </li>
    </div>
    
    <div className = "inRow">
       <li>
           <label htmlFor="count4">Count4</label>
           <input type="text"  name="count4"  id="count4"  onChange={(e) => setCount4(e.target.value)}></input>
       </li>  
   </div>

 </div>
}
{availableSizes4 && count4 &&
 <div className="row">
    
    <div className = "inRow"> 
       <li>
           <label htmlFor="availableSizes5">size5</label>
           <input type="text"  name="availableSizes5"  id="availableSizes5"  onChange={(e) => setAvailableSizes5(e.target.value)}></input>
       </li>
    </div>
   
    <div className = "inRow">
      <li>
           <label htmlFor="count5">Count5</label>
           <input type="text"  name="count5"  id="count5"  onChange={(e) => setCount5(e.target.value)}></input>
       </li>  
   </div>
  
 </div>
}
{availableSizes5 && count5 &&
   <div className="row">
   
    <div className = "inRow"> 
       <li>
           <label htmlFor="availableSizes6">size6</label>
           <input type="text"  name="availableSizes6"  id="availableSizes6"  onChange={(e) => setAvailableSizes6(e.target.value)}></input>
       </li>
    </div>
    
    <div className = "inRow">
       <li>
           <label htmlFor="count6">Count6</label>
           <input type="text"  name="count6"  id="count6"  onChange={(e) => setCount6(e.target.value)}></input>
       </li>  
   </div>
  
  </div>
}

       <li>
         <button  type="submit" className="button secondary"> create</button>
       </li>
      
  </ul> 
 </form>
</div>
)}

 export default AddProduct;
 