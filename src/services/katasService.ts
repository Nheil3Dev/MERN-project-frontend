import { AxiosRequestConfig } from 'axios'
import axios from '../utils/config/axios.config'

/**
 * Method to obtain all katas
 * @param {string} token JWT
 * @param {number} page Pagination
 * @param {number} limit Limit of katas to obtain
 * @returns List of Katas
 */
export const getAllKatas = (token: string, page?: number, limit?: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token
    },
    params: {
      limit,
      page
    }
  }
  // http://localhost:8000/api/katas?page=1&limit=10
  return axios.get('/katas', options)
}

export const getKataById = (token: string, id: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token
    },
    params: {
      id
    }
  }

  return axios.get('/katas', options)
}
