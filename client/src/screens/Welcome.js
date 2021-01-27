import React , { useState, useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {forgotPassword} from "../actions/userActions";
import {activeAccount} from '../actions/userActions';
import './Welcome.css'

 
 function Welcome(props) {

  const [message , setMessage] = useState()
  
  const id = props.match.params.id;
  
  const dispatch = useDispatch();
  
  const activeAccountReducer = useSelector(state => state.activeAccountReducer);
  const {loading , error , user} = activeAccountReducer;
// after register you get link and when you press you get to this page
  useEffect(() =>  {
  
   if(!user){
    dispatch(activeAccount(id))
   }
  }, [dispatch]);
    
  return (
     <div>
       {user &&
        <h1>wellcome to shipping cart website now you can add to cart</h1>
       }
    </div>
   );
}

export default Welcome;