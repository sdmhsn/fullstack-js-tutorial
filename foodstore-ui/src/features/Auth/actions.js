// action creator. this actions object will synchronize to dispatch (not directly to reducer). it used to pass action object onto dispatch() function in Login or Logout
// sample of dispatch in Login page: dispatch(userLogin(user, token))
// output:
/* 
userLogin:
dispatch({
  type: USER_LOGIN, // USER_LOGIN: using constant
  user,
  token,
})

userLogout:
dispatch({
  type: USER_LOGOUT,
})
*/

import { USER_LOGIN, USER_LOGOUT } from './constants';

const userLogin = (user, token) => {
  return {
    type: USER_LOGIN,
    user,
    token,
  };
};

const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export { userLogin, userLogout };
