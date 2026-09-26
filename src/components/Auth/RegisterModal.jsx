import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './RegisterModal.css'

function RegisterModal({ onClose, onLoginClick }) {
  const { register } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !repeatPassword
    ) {
      setError('Заповніть усі поля')
      return
    }

    if (password.length < 6) {
      setError('Пароль має містити щонайменше 6 символів')
      return
    }

    if (password !== repeatPassword) {
      setError('Паролі не збігаються')
      return
    }

    try {
      setIsLoading(true)

      await register({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
      })

      onClose()
    } catch (error) {
      console.error(error)

      if (error.response?.status === 409) {
        setError('Користувач із таким email вже існує')
      } else {
        setError(
          error.response?.data?.error ||
          'Не вдалося зареєструвати користувача'
        )
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
      <div className="register-modal">
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Закрити"
        >
          ×
        </button>

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ім'я"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />

          <input
            type="text"
            placeholder="Прізвище"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />

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
            maxLength={50}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="register-password-field">
            <input
              type="password"
              placeholder="Repeat password"
              value={repeatPassword}
              maxLength={50}
              onChange={(event) => setRepeatPassword(event.target.value)}
            />

            <span>
              {repeatPassword.length}/50
            </span>
          </div>

          {error && (
            <div className="auth-form-error">
              {error}
            </div>
          )}

          <div className="register-privacy">
            Натискаючи «Продовжити», ви погоджуєтеся з умовами
            використання HomeFU та політикою конфіденційності.
          </div>

          <button
            type="submit"
            className="auth-submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Завантаження...' : 'Continue'}
          </button>
        </form>

        <div className="auth-register-switch">
          <span>Already have an account?</span>

          <button
            type="button"
            onClick={onLoginClick}
          >
            Sign In
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
      </div>
    </div>
  )
}

export default RegisterModal