import React , { useState, useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {forgotPassword} from "../actions/userActions";

function ForgotPassword(props) {

     const [email , setEmail] = useState()
     const [message , setMessage] = useState()
    
     const sendEmailReducer = useSelector(state => state.sendEmailReducer)
     const {loading , error , userInf} = sendEmailReducer;
    
     const dispatch = useDispatch();

    
     const submit = (e) => {
   
       e.preventDefault(); 
        // press email and get email change password
       const send = dispatch(forgotPassword(email))
  
       if(send){
         setMessage('go to your email to get new password')
         setTimeout( () => props.history.push('/'),4000)
       }
    }

    
    return (
        <div>
          <form className = "form" >
             <ul className="form-container">
              <li>User Profile</li>
          
               <li>
                <label htmlFor="email">Email</label>
                 <input type="email" 
                      id="email" 
                      placeorder = "Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
                      />
                 </li>
                   {message && 
                 <li>
                   {message} 
                </li>
              }

                <li>
                  <button type="submit"   onClick ={submit} className ="primary">Get New Password</button>
                </li>
             </ul>
          </form>
        </div>
    );
}

export default ForgotPassword;