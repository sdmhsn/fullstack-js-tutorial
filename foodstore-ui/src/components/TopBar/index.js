import React from 'react';

import { StoreLogo } from '../StoreLogo';

import { useSelector } from 'react-redux';

import { Responsive, ButtonCircle } from 'upkit';

import { Link } from 'react-router-dom';

import FaUser from '@meronex/icons/fa/FaUser';

export const TopBar = () => {
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  /*
    auth example output:
    {
        "user": {
            "_id": "647efaa3ff1f75b1767f8dd2",
            "full_name": "Saddam",
            "email": "test@email.com",
            "role": "user",
            "customer_id": 12
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZmFhM2ZmMWY3NWIxNzY3ZjhkZDIiLCJmdWxsX25hbWUiOiJTYWRkYW0iLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwicm9sZSI6InVzZXIiLCJjdXN0b21lcl9pZCI6MTIsImlhdCI6MTY4ODQ0MDg2MH0.z10NMIE45ZAXctSIzSXOgSXBqVfZpkxcLbF1E4kOdSw"
    }
  */

  return (
    <div className="my-5">
      <Responsive desktop={2} justify="between" items="center">
        <div>
          <StoreLogo />
        </div>

        <div className="mr-5 text-right">
          <Link to={auth?.user ? '/account' : '/login'}>
            <div className="mr-2 inline-block text-red-600 font-bold">
              {auth?.user?.full_name}
            </div>

            <ButtonCircle icon={<FaUser />} />
          </Link>
        </div>
      </Responsive>
    </div>
  );
};
