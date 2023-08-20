export const rules = {
  full_name: {
    required: { value: true, message: 'Full Name is required!' },
    maxLength: {
      value: 500,
      message: 'Full Name must has at most 500 characters',
    },
  },
  email: {
    required: { value: true, message: 'Email is required!' },
    maxLength: { value: 255, message: 'Email must has at most 255 characters' },
    pattern: {
      value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
      message: 'Email is not valid',
    },
  },
  password: {
    required: { value: true, message: 'Password is required!' },
    maxLength: {
      value: 255,
      message: 'Password length must has at most 255 characters',
    },
  },
  password_confirmation: {
    required: {
      value: true,
      message: 'The password confirmation is required!',
    },
  },
};
