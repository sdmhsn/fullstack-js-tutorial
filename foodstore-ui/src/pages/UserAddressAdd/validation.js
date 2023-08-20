export const rules = {
  address_name: {
    required: { value: true, message: 'Address Name is required!' },
    maxLength: {
      value: 500,
      message: 'Password must has at most 255 characters',
    },
    minLength: {
      value: 5,
      message: 'Name address must has at least 3 characters',
    },
  },
  province: { required: { value: true, message: 'Province is required' } },
  regency: { required: { value: true, message: 'Regency is required' } },
  district: { required: { value: true, message: 'District is required' } },
  village: { required: { value: true, message: 'Village is required' } },
  detail: {
    required: { value: true, message: 'Detail address is required' },
    maxLength: {
      value: 1000,
      message: 'Detail address must has at most 1000 characters',
    },
  },
};
