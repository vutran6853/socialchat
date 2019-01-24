import axios from "axios";

const SERVER_URL_ENDPOINT = 'http://localhost:3003';

////  Initial value
const GETUSERINFO = 'GETUSERINFO'
const GETURLIMAGE = 'GETURLIMAGE'
const EDITUSERNAME = 'EDITUSERNAME'
const POSTPROFILEPIRCTURE = 'POSTPROFILEPIRCTURE'

////  Initial state
const initialState = {
  id: 0,
  username: '',
  profile_picture: '',
  addUserIDErrorMsg: '',
  urlImage: '',
  error: [],
}

//// Initial Action Creator for Payload
export function getUserInfo(user_id, user_username, user_profile_pic) {
  let content = { id: user_id, username: user_username, profile_pic: user_profile_pic }
  // console.log(content);
  return {
    type: GETUSERINFO,
    payload: content
  }
}

export function getUrlImage(value) {
  // console.log(value);
  return {
    type: GETURLIMAGE,
    payload: value
  }
}

export function editUserName(id, name) {
  return {
    type: EDITUSERNAME,
    payload: axios.put('api/editUserAccount', { userID: id, userName: name })
  }
}

export function postUserProfileUrlImage(id, profilePicture) {
  return {
    type: POSTPROFILEPIRCTURE,
    payload: axios.put('/api/postNewprofilePic', { userID: id, photo: profilePicture })
  }
}

////  Handle state change
export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case GETUSERINFO:
    // console.log(`${ GETUSERINFO }_FULFILLED`);
    return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        profile_picture: action.payload.profile_pic
    }
    case GETUSERINFO:
    console.log(`${ GETUSERINFO }_REJECTED`);
    return {
        ...state,
        addUserIDErrorMsg: 'Failed To add user ID in Redux'
    }
    case GETURLIMAGE:
    // console.log(`${ GETURLIMAGE }_FULFILLED`);
    return {
        ...state,
        urlImage: action.payload
    }
    case EDITUSERNAME: 
    return {
      ...state,
      username: action.payload.data[0].user_username
    }
    case `${ EDITUSERNAME }_REJECTED`: 
    return {
      ...state,
      error: action.payload.data
    }
    case POSTPROFILEPIRCTURE:
    return {
      ...state,
      profile_picture: action.payload.data[0].profile_pic
    }

    default:
    return state;
  }
}