import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS, SET_ITEMS } from './constants';

let initialState = localStorage.getItem('cart') // cart data in localStorage available?
  ? JSON.parse(localStorage.getItem('cart')) // if true: get 'cart' data (JSON value for cart) in local storage, then parsing that JSON data into JS object
  : []; // when else: set initialState as [] (empty array)

const cartReducer = (state = initialState, action) => {
  // console.log(state); // e.g. for 3 data: [{ "_id": "63fafa800404b0cedbecfa2c", "product": { "tags": [], "_id": "63fafa800404b0cedbecfa2c", "name": "Product 1", "description": "a product description", "price": 5000, "image_url": "369b09c6765c42b61ce4f1887ba4cc04.jpg", "createdAt": "2023-03-07T04:16:18.277Z", "updatedAt": "2023-03-07T04:16:18.277Z", "__v": 0 }, "user": "647efaa3ff1f75b1767f8dd2", "image_url": "369b09c6765c42b61ce4f1887ba4cc04.jpg", "name": "Product 1", "price": 5000, "qty": 1 }, { "_id": "5f08d5b9a9c6cd7146ea8039", "price": 11000, "discount": 0, "tags": [], "name": "Chips", "category": { "_id": "5f083558e0495436721eeb67", "name": "Snack", "__v": 0 }, "image_url": "b20ecb0cfd685ec3b8eba6a090d2394f.png", "__v": 0, "qty": 1 }, { "_id": "5f08d5f6a9c6cd7146ea803c", "price": 8000, "discount": 0, "tags": [], "name": "Ice Tea", "category": { "_id": "5f083551e0495436721eeb66", "name": "Minuman", "__v": 0 }, "image_url": "8dad3a4c4395dc9203efe40160ddb7fd.png", "__v": 0, "qty": 1 }]
  switch (action.type) {
    case ADD_ITEM:
      if (state.find((item) => item._id === action.item._id)) {
        // using find() inside if condition parenthesis, is item available? (true/false)
        // true
        return state.map((data) => ({
          ...data,
          // qty: data.qty + 1, // add qty with 1 (wrong!)
          qty: data._id === action.item._id ? data.qty + 1 : data.qty, // qty = if data._id === action.item._id (increase only for triggered id) add data.qty with 1, else  data.qty
        }));
      } else {
        //false
        return [...state, { ...action.item, qty: 1 }];
      }
    case REMOVE_ITEM:
      return state
        .map((item) => ({
          ...item,
          qty: item._id === action.item._id ? item.qty - 1 : item.qty,
        }))
        .filter((item) => item.qty > 0);
    case CLEAR_ITEMS:
      return [];
    case SET_ITEMS:
      return action.items;
    default:
      return state;
  }
};

export default cartReducer;
