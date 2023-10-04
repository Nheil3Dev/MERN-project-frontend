import axios from '../utils/config/axios.config'

/**
 * Method to login user
 * @param {string} email User email
 * @param {string} password User password
 * @returns
 */
export const login = (email: string, password: string) => {
  // Body of the Request
  const body = {
    email,
    password
  }

  // Send the request to login endpoint: http://localhost:8000/api/auth/login
  return axios.post('/auth/login', body)
}

/**
 * Method to register new user
 * @param {string} name User name
 * @param {string} email User email
 * @param {string} password User password
 * @param {number} age User age
 * @returns
 */
export const register = (name: string, email: string, password: string, age: number) => {
  // Body of the Request
  const body = {
    name,
    email,
    password,
    age
  }

  // Send Request to Register EndPoint: http://localhost:8000/api/auth/register
  return axios.post('/auth/register', body)
}
