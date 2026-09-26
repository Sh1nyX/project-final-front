import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const getListingById = async (id) => {
  const response = await api.get(`/listings/${id}`)
  return response.data
}

export const getListings = async ({
  check_in = '',
  check_out = '',
  flexible_days = 0,

  region = '',

  category_id = '',
  guests = 0,

  min_price = '',
  max_price = '',
  property_type = '',
  min_bedrooms = '',
  min_beds = '',
  amenities = '',

  sort = 'recommended',

  limit = 12,
  page = 1,
} = {}) => {
  const response = await api.get('/listings', {
    params: {
      check_in,
      check_out,
      flexible_days,

      region,

      category_id,
      guests,

      min_price,
      max_price,
      property_type,
      min_bedrooms,
      min_beds,
      amenities,

      sort,

      limit,
      page,
    },
  })

  return response.data
}

export default api