import store from './store';
import { saveCart } from '../api/cart';

let currentAuth; // undefined
let currentCart;

const listener = () => {
  // auth
  let previousAuth = currentAuth; // previous auth
  // cart
  let previousCart = currentCart;

  // console.log(previousAuth);

  currentAuth = store.getState().auth; // update currentAuth using current state in authReducer {user, token}
  currentCart = store.getState().cart;

  // console.log(currentAuth);

  // console.log(previousAuth === currentAuth);

  let { token } = currentAuth;

  // auth
  if (currentAuth !== previousAuth) {
    localStorage.setItem('auth', JSON.stringify(currentAuth)); // currentAuth convert JS object into JSON
    // console.log('saved!');
    // console.log(JSON.parse(localStorage.getItem('auth')).token);

    saveCart(token, currentCart);
  }

  // cart
  if (currentCart !== previousCart) {
    localStorage.setItem('cart', JSON.stringify(currentCart));

    saveCart(token, currentCart);
  }
};

const listen = () => {
  store.subscribe(listener);
};

export { listen };
