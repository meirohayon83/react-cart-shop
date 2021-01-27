import React , { useEffect, useState } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {newPassword} from '../actions/userActions';

 function ChangePassword(props) {

     const [password , setPassword] = useState()
     const [confirmPassword , setConfirmPassword] = useState()
     const [message ,setMessage] = useState()
    
     
     const sendEmailReducer = useSelector(state => state.sendEmailReducer)
     const {loading , error , userInf} = sendEmailReducer;

     const dispatch = useDispatch();
     
     var id = props.match.params.id;
        
     const submit = (e) => {
          // check if password and confirmPassword match
      e.preventDefault();   
       if(password !== confirmPassword){
          alert('Password And Confirm Password Are Not Match')
       }else{
          //  new password
          dispatch(newPassword({id:id , password:password}))
          setMessage('your password changed successfully')
          setTimeout( () => props.history.push('/'),4000)
      }
    }

    return (
        <div>
          <form className = "form" >
             <ul className="form-container">
             <li>Change your password</li>
             <li>
                <label htmlFor="password">Password</label>
                <input type="password" 
                      id="password" 
                      placeorder = "Enter Your Password"
                      onChange={(e) => setPassword(e.target.value)}
                      />
              </li>

              <li>
                <label htmlFor="confirmPassword">confirm Password</label>
                <input type="password" 
                      id="confirmPassword" 
                      placeorder = "Enter Your Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      />
              </li>
                {message && 
              <li>
                {message}
              </li>
             }
              <li>
                 <button type="submit"   onClick ={submit} className ="primary">submit</button>
              </li>
           </ul>
          </form>
        </div>
    );
}

export default ChangePassword;