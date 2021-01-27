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

// (with actions.userActions.register  )
function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
     return { loading: true };
    case USER_REGISTER_SUCCESS:
     return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
     return { loading: false, error: action.payload };
    default:
     return state;
  }
}


// (with actions.userActions.signin )
function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
     return { loading: true };
    case USER_SIGNIN_SUCCESS:
     return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
     return { loading: false, error: action.payload };
    case USER_LOGOUT:
     return {};
    default: return state;
  }
}

// (with actions.userActions.detailsUser ) information about user
 export const userDetails = (state ={loading : true} , action) =>{
  switch (action.type) {
    case USER_DETAILS_REQUEST:
     return { loading: true}
    case USER_DETAILS_SUCCESS:
     return { loading: false ,user: action.payload}
    case USER_DETAILS_FAIL:
     return { loading: false ,error: action.payload} 
    default:
     return state;
  }
 }
// (with actions.userActions.updateUser ) for updateUser
 export const userUpdateProfile = (state = {} , action )=>{
   switch (action.type) {
     case USER_UPDATE_PROFILE_REQUEST:
      return { loading:true}
     case USER_UPDATE_PROFILE_SUCCESS:  
      return { loading:false , success: true}
     case USER_UPDATE_PROFILE_FAIL:
      return { loading:false , error:action.payload}  
     case USER_UPDATE_PROFILE_RESET :
      return {} 
     default:
      return state;  
   }
 }

// (with actions.userActions.deleteUser ) deleteUser
 export const userDeleteProfile = (state = {} , action )=>{
   switch (action.type) {
     case USER_DELETE_PROFILE_REQUEST:
      return { loading:true}
     case USER_DELETE_PROFILE_SUCCESS:  
      return { loading:false , success: true}
     case USER_DELETE_PROFILE_FAIL:
      return { loading:false , error:action.payload}  
     default:
      return state;  
   }
 }
// (with actions.userActions.newPassword )  changes password
 export const newPasswordReducer = (state = {} , action )=>{
   switch (action.type) {
     case NEW_PASSWORD_REQUEST:
      return { loading:true}
     case NEW_PASSWORD_SUCCESS:  
      return { loading:false , user: action.payload}
     case NEW_PASSWORD_FAIL:
      return { loading:false , error:action.payload}  
     default:
      return state;  
   }
 }

// (with actions.userActions.forgotPassword ) user get email to change password
 export const sendEmailReducer = (state = {} , action ) => {
   switch (action.type) {
     case SEND_EMAIL_REQUEST:
      return { loading:true}
     case SEND_EMAIL_SUCCESS:  
      return { loading:false , userInf: action.payload}
     case SEND_EMAIL_FAIL:
      return { loading:false , error:action.payload}
     case SEND_EMAIL_RESET:
      return {}    
     default: 
      return state;  
   }
 }

// (with actions.userActions.activeAccount ) to activeAccount
 export const activeAccountReducer = (state = {} , action ) => {
   switch (action.type) {
     case ACTIVE_REQUEST:
      return { loading:true}
     case ACTIVE_SUCCESS:  
      return { loading:false , user: action.payload}
     case ACTIVE_FAIL:
      return { loading:false , error:action.payload}
     case ACTIVE_RESET:  
      return {}
     default:
      return state;  

   }
 }


export {
  userSigninReducer, userRegisterReducer
}