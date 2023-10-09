import { AxiosResponse } from 'axios'
import { FormikValues } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Login } from '../components/forms/LoginMaterial'
import { login } from '../services/authService'

export default function LoginPage () {
  const navigate = useNavigate()
  const onSubmit = async (values: FormikValues) => {
    login(values.email, values.password)
      .then(async (response: AxiosResponse) => {
        if (response.status === 200) {
          if (response.data.token) {
            console.table(response.data.message)
            await sessionStorage.setItem('sessionToken', response.data.token)
            navigate('/')
          } else {
            throw new Error('Invalid credentials')
          }
        } else {
          throw new Error('Error in server')
        }
      })
      .catch(err => console.error(`[LOGIN ERROR]: Somethig went wrong -> ${err.message}`))
  }
  return (
    <>
      <Login onSubmit={onSubmit} />
    </>
  )
}
