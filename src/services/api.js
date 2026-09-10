import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export const getListings = async () => {
  const response = await api.get('/listings?limit=18&page=1')
  return response.data
}

export default api