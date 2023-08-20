import axios from 'axios';

import { config } from '../config';
import store from '../app/store';
import { setItems } from '../features/Cart/actions';

const saveCart = async (token, cart) => {
  return await axios.put(
    `${config.api_host}/api/carts`,
    { items: cart }, // req.body in backend
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

const getCart = async () => {
  let { token } = localStorage.getItem('auth') // auth data in localStorage available?
    ? JSON.parse(localStorage.getItem('auth')) // if true: get the auth key in localStorage, then set into { token } variable
    : {}; // when token doesn't available: set to {} --> false

  // let { token } =
  //   localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth'));

  // console.log(token);

  if (!token) return;

  let { data } = await axios.get(`${config.api_host}/api/carts`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!data.error) {
    store.dispatch(setItems(data));
  }
};

export { saveCart, getCart };
