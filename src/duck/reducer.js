////  Initial value
const GETUSERINFO = 'GETUSERINFO'


////  Initial state
const initialState = {
  id: 0,
  username: '',
  profile_picture: '',
  addUserIDErrorMsg: ''
}

//// Initial Action Creator for Payload
export function getUserInfo(user_id, user_username, user_profile_picture) {
  return{
    type: GETUSERINFO,
    payload: {
      id: user_id,
      username: user_username,
      profile_picture: user_profile_picture
    }
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
        profile_picture: action.payload.profile_picture
    }
    case GETUSERINFO:
    console.log(`${ GETUSERINFO }_REJECTED`);
    return {
        ...state,
        addUserIDErrorMsg: 'Failed To add user ID in Redux'
    }

    default:
    console.log(state)
    return state;
  }
}