import * as yup from 'yup'

const registerSchema = yup.object().shape({
  login: yup
    .string()
    .required('Login is required')
    .min(6, 'Login must be at least 6 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  email: yup
  .string()
  .required('Email is required')
  .email('Invalid email format'),
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Last name must contain only letters'),
  phoneNumber: yup
    .string()
    .required('phoneNumber is required')
    .min(9, 'Number must be at least 6 characters long')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits'),
})

export default registerSchema;
