import React , { useState, useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {detailsUser , updateUser , deleteUser} from '../actions/userActions';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

import './UserProfile.css'

function UserProfile(props) {

     const [name , setName] = useState()
     const [password, setPassword] = useState()

     const [open , setOpen] = useState(false)
     const [confirmPassword , setConfirmPassword] = useState()

     const userSignin = useSelector(state => state.userSignin);
     const {userInfo} = userSignin;

     const userDetails = useSelector(state => state.userDetails)
     const {loading , error , user} = userDetails;

     const userDeleteProfile = useSelector(state => state.userDeleteProfile)
     const {loading:loadingDelete , error:errorDelete, success:successDelete} = userDeleteProfile;

     const userUpdateProfile = useSelector(state => state.userUpdateProfile)
     const {success , error:errorUpdate , loading:loadingUpdate} = userUpdateProfile;

     const dispatch = useDispatch();
  //  zoom style css
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

const openModal = () => {

    setOpen(true);

  };
  const closeModal = () => {
       setOpen(false);
  };

    useEffect(() => {
    //  upload the user profile
       
          dispatch({type: 'USER_UPDATE_PROFILE_RESET'})
          dispatch(detailsUser(userInfo._id))
    
      },[dispatch , userInfo._id])

    const submit = (e) => {
      e.preventDefault();
      //  check if confirm
       if(password !== confirmPassword){
           alert('Password And ConfirmPassword Are Not Matched')
       }else{
        //  update
          dispatch(updateUser({userId: user._id , name ,email:user.email , password}))
          setTimeout(() => {
              props.history.push('/')
          }, 3000); 
       }
    }
   
  //  delete user profile and return to register 
    const deleteProfile =(e) => {
       
        dispatch(deleteUser(userInfo._id))
         closeModal()
        props.history.push('./register')
    }
    
    return (
        <div>
          <form className = "form" >
             <ul className="form-container">
              <li>User Profile</li>
                {loading  ?  <div>Loading...</div>
                : error ? <div>{error}</div> 
                : 
                <>
                {loadingUpdate && <div>loading...</div>}
                {errorUpdate && <div>{errorUpdate}</div>}
                {success && <div>Profile Update Successfully</div>}
              <li>
               <label htmlFor="name">Name</label>
               <input type="text" 
                      id="name"
                      placeorder = "Enter name" 
                      value = {name} 
                      onChange = {(e) => setName(e.target.value)}/>
              </li>

              <li>
               <label htmlFor="email">Email</label>
               <input type="email" 
                      id="email" 
                      placeorder = "Enter email" 
                      value = {user.email}/>
              </li>

              <li>
               <label htmlFor="password">Password</label>
               <input type="password" 
                      id="password" 
                      placeorder = "Enter password"
                      onChange={(e) => setPassword(e.target.value)} />
              </li>

              <li>
               <label htmlFor="confirmPassword">confirm Password</label>
               <input type="password" 
                      id="confirmPassword" 
                      placeorder = "Enter confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}  />
              </li>
             {/* update button */}
              <li>
                 <button type="submit" onClick={submit} className ="primary">Update</button>
              </li>
             {/* open  window for delete */}
              <li>
                 <button type="button"   onClick ={openModal} className ="primary">DELETE</button>
              </li>
             </>
            }
           </ul>
          </form>
           {/* if press on delete button  */}
           {open && 
           
             <Modal style={customStyles}  isOpen={true} onRequestClose={closeModal}>
              <Zoom>
              
               <button className="close"  onClick={closeModal}>
                 x
               </button>
              
               <div>
                 Are You Sure want to delete You're Profile?
               <div >
                   
               <button
                 className="button"
                 onClick ={deleteProfile}>
                 DELETE
              </button>
             </div>
            </div>
          
           </Zoom>
          </Modal>
          } 
        </div>
      );
     }
   export default UserProfile;