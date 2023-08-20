import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; // the Home import name is not using curly braces, because the <Home> component is writing by normal function (e.g: export default function Home())
import Register from './pages/Register';
import { RegisterSuccess } from './pages/RegisterSuccess'; // the { RegisterSuccess } import name is using curly braces, because the <RegisterSuccess> component is writing by arrow function (e.g: export const RegisterSuccess = () => {})
import Login from './pages/Login';
import { getCart } from './api/cart';
import { UserAddressAdd } from './pages/UserAddressAdd';
import { UserAddress } from './pages/UserAddress';
import { Checkout } from './pages/Checkout';
import { Invoice } from './pages/Invoice';
import { UserAccount } from './pages/UserAccount';
import { UserOrders } from './pages/UserOrders';
import { Logout } from './pages/Logout';
import GuardRoute from './components/GuardRoute'; // imported name didn't write inside curly braces because the GuardRoute component is writing by using export default on arrow function
import { GuestOnlyRoute } from './components/GuestOnlyRoute';

import 'upkit/dist/style.min.css';

import { Provider } from 'react-redux';
import store from './app/store';
import { listen } from './app/listener';

export default function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/order"
            element={
              <GuardRoute>
                <UserOrders />
              </GuardRoute>
            }
          />
          <Route
            path="/account"
            element={
              <GuardRoute>
                <UserAccount />
              </GuardRoute>
            }
          />
          <Route
            path="/invoice/:order_id"
            element={
              <GuardRoute>
                <Invoice />
              </GuardRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              // <GuardRoute>
              <Checkout />
              // </GuardRoute>
            }
          />
          <Route
            path="/delivery-addresses/add"
            element={
              <GuardRoute>
                <UserAddressAdd />
              </GuardRoute>
            }
          />
          <Route
            path="/delivery-addresses"
            element={
              <GuardRoute>
                <UserAddress />
              </GuardRoute>
            }
          />
          <Route
            path="/register/success"
            element={
              <GuestOnlyRoute>
                <RegisterSuccess />
              </GuestOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestOnlyRoute>
                <Register />
              </GuestOnlyRoute>
            }
          />

          <Route
            path="/login"
            element={
              <GuestOnlyRoute>
                <Login />
              </GuestOnlyRoute>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}
