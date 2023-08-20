import React from 'react';

import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';

export const GuestOnlyRoute = ({ children }) => {
  let { user } = useSelector((state) => state.auth);
  //   return <Route {...rest}>{!user ? children : <Navigate to="/" />}</Route>;

  return !user ? children : <Navigate to="/" />;
};
