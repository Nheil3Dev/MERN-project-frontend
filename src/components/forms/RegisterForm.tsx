import { AxiosResponse } from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { register } from '../../services/authService'

// Define Schema of validation with Yup
const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
  confirm: Yup.string().when('password', {
    is: (password: string) => password && password.length > 0,
    then: schema => schema
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('You must confirm password')
  }),
  // confirm: Yup.string().when(['password'], (password, schema) => {
  //   return password
  //     ? schema
  //       .required('You must confirm your password')
  //       .oneOf([Yup.ref('password')], 'Passwords must match')
  //     : schema.notRequired()
  // }),
  age: Yup.number().required('Age is required')
})

export function RegisterForm () {
  const initialData = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    age: ''
  }
  return (
    <div>
      <h4>Register Form</h4>
        <Formik
          initialValues={initialData}
          validationSchema={registerSchema}
          onSubmit={async (values) => {
            register(values.name, values.email, values.password, Number(values.age))
              .then((response: AxiosResponse) => {
                if (response.status === 201) {
                  console.log(response.data)
                } else {
                  throw new Error('Error in server')
                }
              })
              .catch(err => console.error(`[REGISTER ERROR]: Somethig went wrong -> ${err.message}`))
          }}>
          {
            ({
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur
            }) => (
              <Form>
                <label htmlFor='name'>Name</label>
                <Field id='name' name='name' type='text' placeholder='Enter your name...' />
                {
                  errors.name && touched.name && <ErrorMessage name='name' component='div' />
                }
                <label htmlFor='email'>Email</label>
                <Field id='email' name='email' type='text' placeholder='Enter your email...' />
                {
                  errors.email && touched.email && <ErrorMessage name='email' component='div' />
                }
                <label htmlFor="password">Password</label>
                <Field id='password' name='password' type='password' placeholder='Enter your password...' />
                {
                  errors.password && touched.password && <ErrorMessage name='password' component='div' />
                }
                <label htmlFor="confirm">Confirm Password</label>
                <Field id='confirm' name='confirm' type='password' placeholder='Repeat your password...' />
                {
                  errors.confirm && touched.confirm && <ErrorMessage name='confirm' component='div' />
                }
                <label htmlFor='age'>Age</label>
                <Field id='age' name='age' type='number' placeholder='Enter your age...' />
                {
                  errors.age && touched.age && <ErrorMessage name='age' component='div' />
                }
                <button type='submit' disabled={isSubmitting}>Register</button>
                {
                  isSubmitting && <p>Registering user...</p>
                }
              </Form>
            )
          }
        </Formik>
      </div>
  )
}
