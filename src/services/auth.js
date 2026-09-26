import api from './api'

export const registerUser = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  const response = await api.post('/auth/register', {
    first_name,
    last_name,
    email,
    password,
  })

  return response.data
}

export const loginUser = async (
  email,
  password
) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  })

  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const updateUserProfile = async (data) => {
  const response = await api.put('/auth/me', data)
  return response.data
}