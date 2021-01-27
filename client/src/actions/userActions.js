import axios from "axios";

import { 
 USER_SIGNIN_REQUEST,
 USER_SIGNIN_SUCCESS,
 USER_SIGNIN_FAIL,
 USER_REGISTER_REQUEST,
 USER_REGISTER_SUCCESS, 
 USER_REGISTER_FAIL,
 USER_LOGOUT,
 USER_DETAILS_REQUEST,
 USER_DETAILS_SUCCESS,
 USER_DETAILS_FAIL,
 USER_UPDATE_PROFILE_REQUEST,
 USER_UPDATE_PROFILE_SUCCESS,
 USER_UPDATE_PROFILE_FAIL,
 USER_UPDATE_PROFILE_RESET,
 USER_DELETE_PROFILE_REQUEST,
 USER_DELETE_PROFILE_SUCCESS,
 USER_DELETE_PROFILE_FAIL,
 NEW_PASSWORD_REQUEST,
 NEW_PASSWORD_SUCCESS,
 NEW_PASSWORD_FAIL,
 SEND_EMAIL_REQUEST,
 SEND_EMAIL_SUCCESS,
 SEND_EMAIL_FAIL,
 SEND_EMAIL_RESET,
 ACTIVE_REQUEST,
 ACTIVE_SUCCESS,
 ACTIVE_FAIL,
 ACTIVE_RESET,
} 
 from "../constants/userConstants";


// (from userregister) register
export const register = (name, email,  password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email , password } });
  try {
    const { data } = await axios.post('http://localhost:3334/user/register', { name, email,password });
     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
     const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
     dispatch({ type: USER_REGISTER_FAIL, payload: message });
    
  }
}

// (from userlogin) login
export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('http://localhost:3334/user/login', { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo' , JSON.stringify(data))
  } catch (error) {
      const message = error.response && error.response.data.message
              ? error.response.data.message
              : error.message
      dispatch({ type: USER_SIGNIN_FAIL, payload: message });
  }
}


// (from app) logout
export const logout = () => (dispatch) => {
   
   localStorage.removeItem('userInfo')
   localStorage.removeItem('cartItems')
   localStorage.removeItem('shipping')
   dispatch({ type: USER_LOGOUT })

}

// (userprofile) get the information about the user when i send id
export const detailsUser = (userId) => async (dispatch, getState) => {

  dispatch({ type: USER_DETAILS_REQUEST, payload: userId});
  const {userSignin: {userInfo }}= getState();
  try{
    const { data } = await axios.get(`http://localhost:3334/user/${userId}` , {

      headers :{ authorization: ' Bearer ' + userInfo.token}
    })
    
    dispatch({ type: USER_DETAILS_SUCCESS , payload: data})

  }catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({ type:USER_DETAILS_FAIL , payload: message})
  }


}

// (from userprofile) update user
export const updateUser = (user) => async (dispatch , getState) => {

      dispatch({ type:USER_UPDATE_PROFILE_REQUEST , payload: user})
      const {userSignin: {userInfo }}= getState();
     try{
      const { data } = await axios.put('http://localhost:3334/user/profile' , user ,{
        headers :{authorization: ' Bearer ' + userInfo.token }
      })
       dispatch({ type:USER_UPDATE_PROFILE_SUCCESS , payload: data})
       dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
       
      
       localStorage.setItem('userInfo' , JSON.stringify(data))
    }catch (error) {
        const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
       dispatch({ type:USER_UPDATE_PROFILE_FAIL , payload: message})
    }

}

// (from userprofile) delete profile
 export const deleteUser = (user) => async (dispatch , getState) => {

      dispatch({ type:USER_DELETE_PROFILE_REQUEST , payload: user})
      const {userSignin: {userInfo }}= getState();
      try{
       const { data } = await axios.delete(`http://localhost:3334/user/${user}` ,{
         headers :{authorization: ' Bearer ' + userInfo.token }
      })
      dispatch({ type:USER_DELETE_PROFILE_SUCCESS , payload: data})
      localStorage.removeItem('userInfo')
      dispatch({ type: USER_LOGOUT })

    }catch (error) {
      const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      dispatch({ type:USER_DELETE_PROFILE_FAIL , payload: message})
    }
}


// (from changePassword)  to change your password
export const newPassword = ({id , password}) => async (dispatch , getState) => {
  
     const {sendEmailReducer: {userInf }}= getState();
       dispatch({ type:NEW_PASSWORD_REQUEST , payload: id})
  
    try{
     const { data } = await axios.post(`http://localhost:3334/user/changePassword/${id}`, {password} ,{
         headers :{
           authorization: ' Bearer ' + userInf.token }
      }
     )
       dispatch({ type:NEW_PASSWORD_SUCCESS , payload: data})
     
       localStorage.removeItem('userInf')
       dispatch({ type:SEND_EMAIL_RESET})
       dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
       localStorage.setItem('userInfo' , JSON.stringify(data))
      
    }catch (error) {
      const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      dispatch({ type:NEW_PASSWORD_FAIL , payload: message})
    }
}


// (from forgotPassword) to send the email and then get email to change password
export const forgotPassword = (email) => async (dispatch) => {
    
      dispatch({ type:SEND_EMAIL_REQUEST , payload: email})
    try{
      const {data}  = await axios.post(`http://localhost:3334/user/forgot`, {email} )
      dispatch({ type:SEND_EMAIL_SUCCESS , payload: data});
      localStorage.setItem('userInf' , JSON.stringify(data))
    
    }catch (error) {
      const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      dispatch({ type:SEND_EMAIL_FAIL , payload: message})
    }
}

// (from welcome) when user press on link he activated his account 
export const activeAccount = (id) => async (dispatch) => {
   
      dispatch({ type:ACTIVE_REQUEST , payload: id})
     try{

      const {data}  = await axios.get(`http://localhost:3334/user/confirim/${id}`)
      dispatch({ type:ACTIVE_SUCCESS , payload: data});
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo' , JSON.stringify(data))
    }catch (error) {
      const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      dispatch({ type:ACTIVE_FAIL , payload: message})
    }
}




