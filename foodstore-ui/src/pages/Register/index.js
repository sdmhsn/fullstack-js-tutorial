import React from 'react';

import {
  LayoutOne,
  Card,
  FormControl,
  InputText,
  InputPassword,
  Button,
} from 'upkit';

import { useForm } from 'react-hook-form';

import { rules } from './validation';
import { registerUser } from '../../api/auth';
import { StoreLogo } from '../../components/StoreLogo';

import { useNavigate, Link } from 'react-router-dom';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

//  Use export default for normal function. This <Register> component is writing by normal function.
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [status, setStatus] = React.useState(statusList.idle);

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    // alert(JSON.stringify(formData));
    // console.log(formData);

    let { password, password_confirmation } = formData;

    if (password !== password_confirmation) {
      return setError('password_confirmation', {
        type: 'equality',
        message: 'The password confirmation does not match',
      });
    }

    setStatus(statusList.process);

    let { data } = await registerUser(formData);

    // console.log(data);

    if (data.error) {
      let fields = Object.keys(data.fields);

      // console.log(fields); // ['email'] : email registered in backend. not realtime email validation in frontend

      fields.forEach((field) => {
        // console.log(field);
        setError(field, {
          type: 'server',
          message: data.fields[field]?.properties?.message,
        });
      });

      setStatus(statusList.error);
      return;
    }

    setStatus(statusList.success);
    navigate('/register/success');
  };

  // console.log(status);

  return (
    <LayoutOne size="small">
      <Card color="white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-0">
            <StoreLogo />
          </div>

          <FormControl errorMessage={errors.full_name?.message}>
            <InputText
              name="full_name"
              placeholder="Full Name"
              fitContainer
              {...register('full_name', rules.full_name)}
            />
          </FormControl>

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

          <FormControl errorMessage={errors.password_confirmation?.message}>
            <InputPassword
              name="password_confirmation"
              placeholder="Password Confirmation"
              fitContainer
              autoComplete="off"
              {...register(
                'password_confirmation',
                rules.password_confirmation
              )}
            />
          </FormControl>

          <Button
            size="large"
            fitContainer
            disabled={status === statusList.process}
          >
            {status === statusList.process ? 'Processing' : 'Register'}
          </Button>

          <div className="text-center mt-2">
            Already have an account?{' '}
            <Link to="/login">
              <b> Login. </b>
            </Link>
          </div>
        </form>
      </Card>
    </LayoutOne>
  );
}
