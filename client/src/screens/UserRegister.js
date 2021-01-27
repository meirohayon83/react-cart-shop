import React , {useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import axios from 'axios';
import UserLogin from './UserLogin';
import { Link } from 'react-router-dom';

function UserRegister(props) {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [message , setMessage] = useState('');

   const userRegister = useSelector(state => state.userRegister);
   const { loading, userInfo, error } = userRegister;
  
   const dispatch = useDispatch();


   const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
   
    //  if logged
     useEffect(() => {
       if (userInfo) {
         props.history.push(redirect);
       }
    }, [userInfo]);

  
    const emailChange = async (e) => {
    
     // set mail to send data and also check if the mail is already in use 
      setEmail(e.target.value)
      const  mail = await  axios.post('http://localhost:3334/user/checkEmail', {email:e.target.value})
    
      if(mail) {
       setMessage(mail.data)
       }
    }
  

   const submit = (e) => {
        //  send register information
        e.preventDefault();
          if(password === confirmPassword){

            dispatch(register(name, email,password));
          }else{
            alert('Password and Confirm Password are not match')
         }
        }


       return <div className="form">
        <form onSubmit={submit} >
         <ul className="form-container">
         
           <li>
             <h2>Sign-Up</h2>
           </li>
         
           <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
           </li>
          
           <li>
             <label htmlFor="name">
               Name
             </label>
             <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}>
             </input>
           </li>

           <li>
             <label htmlFor="email">
               Email
             </label>
             <input type="email" name="email" id="email" onChange={emailChange}></input>
           </li>
          
           <li>{message}</li>
          
           <li>
             <label htmlFor="password">Password</label>
             <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
           </li>
          
           <li>
             <label htmlFor="password">Confirm Password</label>
             <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></input>
           </li>
          
           <li>
             <button type="submit" className="button primary">SignUp</button>
           </li>
          
           <li>
            Have account ?
           </li>
          
           <li> 
             <Link to={redirect === "/" ? "login" : "login?redirect=" + redirect} className="button secondary text-center">
                   Sign In
             </Link>
           </li>
        
         </ul>
       </form>
      </div>
       }

export default UserRegister;