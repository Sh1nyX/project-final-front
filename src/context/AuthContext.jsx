import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
} from '../services/auth'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = Boolean(user)

  useEffect(() => {
    const restoreSession = async () => {
      const token =
        localStorage.getItem('auth_token')

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const currentUser =
          await getCurrentUser()

        setUser(currentUser)
      } catch (error) {
        console.error(
          'Не удалось восстановить сессию:',
          error
        )

        localStorage.removeItem('auth_token')
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  const login = async (
    email,
    password
  ) => {
    const result = await loginUser(
      email,
      password
    )

    localStorage.setItem(
      'auth_token',
      result.token
    )

    setUser(result.user)

    return result.user
  }

  const register = async (data) => {
    const result = await registerUser(data)

    localStorage.setItem(
      'auth_token',
      result.token
    )

    setUser(result.user)

    return result.user
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  const refreshUser = async () => {
    const currentUser =
      await getCurrentUser()

    setUser(currentUser)

    return currentUser
  }

  const updateProfile = async (data) => {
    const updatedUser =
      await updateUserProfile(data)

    setUser(updatedUser)

    return updatedUser
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth должен использоваться внутри AuthProvider'
    )
  }

  return context
}

export default AuthProvider