import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export const getListings = async () => {
  const response = await api.get('/listings')
  return response.data
}

export default api