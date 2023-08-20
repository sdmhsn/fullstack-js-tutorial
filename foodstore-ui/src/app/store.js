import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

// import authReducer from '../features/Auth/reducer'; // no need curly braces because we use export default in reducer componet
import { authReducer } from '../features/Auth/reducer'; // using curly braces { authReducer } because we use direct export arrow function (export const authReducer = () => {}) in reducer component
import productReducer from '../features/Products/reducers';
import cartReducer from '../features/Cart/reducer';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // redux debugging tool (compose)

// combine all reducers
const rootReducers = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});

// create store
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
