import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './LoginModal.css'

function LoginModal({ onClose, onRegisterClick }) {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Заповніть усі поля')
      return
    }

    try {
      setIsLoading(true)

      await login(email, password)

      onClose()
    } catch (error) {
      console.error(error)

      if (error.response?.status === 401) {
        setError('Невірний email або пароль')
      } else {
        setError('Не вдалося виконати вхід')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="auth-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="login-modal">
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Закрити"
        >
          ×
        </button>

        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && (
            <div className="auth-form-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Завантаження...' : 'Continue'}
          </button>
        </form>

        <div className="auth-register-switch">
          <span>Do not have an account?</span>

          <button
            type="button"
            onClick={onRegisterClick}
          >
            Register
          </button>
        </div>

        <div className="auth-divider">
          <span>або</span>
        </div>

        <button type="button" className="auth-social-button">
          Continue with Google
        </button>

        <button type="button" className="auth-social-button">
          Continue with Facebook
        </button>

        <button type="button" className="auth-social-button">
          Continue with Apple
        </button>

        <div className="auth-modal-info">
          <div>
            <strong>Secure payment</strong>
            <span>Ваші дані захищені</span>
          </div>

          <div>
            <strong>Relevant information</strong>
            <span>Ми використовуємо ваші дані лише за призначенням</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal