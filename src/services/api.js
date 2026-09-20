import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

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

  limit = 100,
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

      limit,
      page,
    },
  })

  return response.data
}

export default api