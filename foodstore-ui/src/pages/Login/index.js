import React, { useState } from 'react';

import {
  InputText,
  InputPassword,
  Button,
  FormControl,
  Card,
  LayoutOne,
} from 'upkit';

import { useForm } from 'react-hook-form';

import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { StoreLogo } from '../../components/StoreLogo';
import { userLogin } from '../../features/Auth/actions';
import { rules } from './validation';
import { login } from '../../api/auth';
// import { USER_LOGIN } from '../../features/Auth/constants';  // constant

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

export default function Login() {
  const [status, setStatus] = useState(statusList);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async ({ email, password }) => {
    setStatus(statusList.process);

    let { data } = await login(email, password);
    // console.log(data);
    /*
      data output:
      {
        "message": "Logged in successfully",
        "user": {
            "_id": "647efaa3ff1f75b1767f8dd2",
            "full_name": "Saddam",
            "email": "test@email.com",
            "role": "user",
            "customer_id": 12
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlZmFhM2ZmMWY3NWIxNzY3ZjhkZDIiLCJmdWxsX25hbWUiOiJTYWRkYW0iLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwicm9sZSI6InVzZXIiLCJjdXN0b21lcl9pZCI6MTIsImlhdCI6MTY4ODYzNDMyNX0.wdKLymo63k68Pkuyx2O6vXgocN2fhM9BKEsC9kisxtE"
      }
    */

    // a. ebook
    // if (data.error) {
    //   setError('password', {
    //     type: 'invalidCredential',
    //     message: data.message,
    //   });

    //   setStatus(statusList.error);
    // } else {
    //   let { user, token } = data;

    //   dispatch(userLogin(user, token));
    //   navigate('/');
    // }

    // b. my code
    try {
      if (data.error) {
        throw Error(data.error);
      } else {
        let { user, token } = data;

        // console.log(user);
        // console.log(token);

        // synchronize to userLogin actions:
        dispatch(userLogin(user, token)); // userLogin output is object ({type: USER_LOGIN, user, token})

        // unsynchronize to userLogin actions:
        // dispatch({
        //   type: USER_LOGIN, // constant
        //   user,
        //   token,
        // });

        navigate('/');
      }
    } catch (error) {
      // console.log(error.message);

      setError('password', {
        type: 'invalidCredential',
        message: data.message,
      });

      setStatus(statusList.error);
    }

    setStatus(statusList.success);
  };

  return (
    <LayoutOne size="small">
      <Card color="white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-0">
            <StoreLogo />
          </div>

          <FormControl errorMessage={errors.email?.message}>
            <InputText
              name="email"
              placeholder="Email"
              fitContainer
              {...register('email', rules.email)}
              className="mb-0"
            />
          </FormControl>

          <FormControl errorMessage={errors.password?.message}>
            <InputPassword
              name="password"
              placeholder="Password"
              fitContainer
              autoComplete="off"
              {...register('password', rules.password)}
            />
          </FormControl>

          <Button
            size="large"
            fitContainer
            disabled={status === statusList.process}
          >
            {status === statusList.process ? 'Processing' : 'Login'}
          </Button>

          <div className="text-center mt-2">
            Don't have an account?{' '}
            <Link to="/register">
              <b>Register now.</b>
            </Link>
          </div>
        </form>
      </Card>
    </LayoutOne>
  );
}
