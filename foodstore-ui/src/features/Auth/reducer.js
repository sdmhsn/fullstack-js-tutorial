import { USER_LOGIN, USER_LOGOUT } from './constants';

// let initialState = { user: null, token: null };

let initialState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth')) // if auth data available, get 'auth' data (JSON valud for user and token), then parsing the JSON data into JS object
  : { user: null, token: null }; // when else: set user and token to null

// Sample 1 (we can set different name in store):
// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case USER_LOGIN:
//       return {
//         user: action.user,
//         token: action.token,
//       };
//     case USER_LOGOUT:
//       return {
//         user: null,
//         token: null,
//       };
//     default:
//       return state;
//   }
// }

// Sample 2:
// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_LOGIN:
//       return {
//         user: action.user,
//         token: action.token,
//       };
//     case USER_LOGOUT:
//       return {
//         user: null,
//         token: null,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;

// Sample 3 *can't used export default in arrow function):
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        user: action.user,
        token: action.token,
      };
    /* USER_Login example output:
        {
          "user": {
              "_id": "647efaa3ff1f75b1767f8dd2",
              "full_name": "Saddam",
              "email": "test@email.com",
              "role": "user",
              "customer_id": 12
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZmFhM2ZmMWY3NWIxNzY3ZjhkZDIiLCJmdWxsX25hbWUiOiJTYWRkYW0iLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwicm9sZSI6InVzZXIiLCJjdXN0b21lcl9pZCI6MTIsImlhdCI6MTY4ODM1NTY1Mn0.a54WaOUc84qr2Hp53TX439OiSS68-aqmm2Vk5WFRa3w"
        }
    */
    case USER_LOGOUT:
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
