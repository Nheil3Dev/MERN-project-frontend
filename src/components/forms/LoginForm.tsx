import { AxiosResponse } from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { login } from '../../services/authService'

// Define Schema of validation with Yup
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 caracters').required('Password is required')
})

export function LoginForm () {
  const initialCredentials = {
    email: '',
    password: ''
  }
  return (
    <div>
      <h4>Login Form</h4>
        <Formik
          initialValues={initialCredentials}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            login(values.email, values.password)
              .then((response: AxiosResponse) => {
                if (response.status === 200) {
                  if (response.data.token) {
                    console.table(response.data.message)
                    sessionStorage.setItem('sessionToken', response.data.sessionToken)
                  } else {
                    throw new Error('Invalid credentials')
                  }
                } else {
                  throw new Error('Error in server')
                }
              })
              .catch(err => console.error(`[LOGIN ERROR]: Somethig went wrong -> ${err.message}`))
          }}>
          {
            ({ values,
               touched, 
               errors,
               isSubmitting,
               handleChange, 
               handleBlur }) => (
              <Form>
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
                <button type='submit' disabled={isSubmitting}>Login</button>
                {
                  isSubmitting && <p>Checking credentials...</p>
                }
              </Form>
            )
          }
        </Formik>
      </div>
    )
}