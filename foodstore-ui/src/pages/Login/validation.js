export const rules = {
  email: {
    required: { value: true, message: 'Email is required!' },
    maxLength: { value: 255, message: 'Email must has at most 255 characters' },
    pattern: {
      value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
      message: 'Email is not valid!!',
    },
  },
  password: {
    required: { value: true, message: 'Password is required!' },
    maxLength: {
      value: 255,
      message: 'Password must has at most 255 characters',
    },
  },
};
