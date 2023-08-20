import React from 'react';

import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const GuardRoute = ({ children }) => {
  let { user } = useSelector((state) => state.auth);
  //   return <Route {...rest}>{user ? children : <Navigate to="/login" />}</Route>;

  return user ? children : <Navigate to="/login" />;
};

export default GuardRoute; // we can write export default on arrow function, but not directly before the const statement of arrow function above
