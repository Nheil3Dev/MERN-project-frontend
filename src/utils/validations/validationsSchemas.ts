import * as Yup from 'yup'

// Define Schema of validation with Yup
export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 caracters').required('Password is required')
})

// Define Schema of validation with Yup
export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
  confirm: Yup.string().when('password', {
    is: (password: string) => password && password.length > 0,
    then: schema => schema
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('You must confirm password')
  }),
  age: Yup.number().required('Age is required')
})
