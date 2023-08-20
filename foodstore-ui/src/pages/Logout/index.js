import React from 'react';

import { useNavigate } from 'react-router-dom';

import { LayoutOne } from 'upkit';

import { useDispatch } from 'react-redux';

import BounceLoader from 'react-spinners/BounceLoader';

import { userLogout } from '../../features/Auth/actions';
import { logout } from '../../api/auth';

export const Logout = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  React.useEffect(() => {
    logout()
      .then(() => dispatch(userLogout()))
      .then(() => navigate('/'));
  }, [navigate, dispatch]);

  return (
    <LayoutOne size="small">
      <div className="text-center flex flex-col justify-center itemscenter">
        <BounceLoader color="red" />;
        <br />
        Logging out ...
      </div>
    </LayoutOne>
  );
};
