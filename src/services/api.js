import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export const getListings = async ({
  check_in = '',
  check_out = '',
  flexible_days = 0,
  category_id = '',
  guests = 0,
  limit = 100,
  page = 1,
} = {}) => {
  const response = await api.get('/listings', {
    params: {
      check_in,
      check_out,
      flexible_days,
      category_id,
      guests,
      limit,
      page,
    },
  })

  return response.data
}

export default api