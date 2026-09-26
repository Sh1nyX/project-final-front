import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

import menuIcon from '../../assets/menu-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'

import './AccountMenu.css'

function AccountMenu({ buttonClassName }) {
  const navigate = useNavigate()

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const openLogin = () => {
    setIsOpen(false)
    setIsLoginModalOpen(true)
  }

  const openRegister = () => {
    setIsOpen(false)
    setIsRegisterModalOpen(true)
  }

  return (
    <>
      <div className="shared-account-wrapper">

        <button
          type="button"
          className={buttonClassName}
          onClick={() => setIsOpen((current) => !current)}
        >
          <img src={menuIcon} alt="" />
          <img src={profileIcon} alt="" />
        </button>

        {isOpen && (
          <div className="shared-account-menu">

            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={openLogin}
                >
                  Увійти
                </button>

                <button
                  type="button"
                  onClick={openRegister}
                >
                  Зареєструватися
                </button>
              </>
            ) : (
              <>
                <div className="shared-account-menu-user">
                  <strong>
                    {user?.first_name} {user?.last_name}
                  </strong>

                  <span>
                    {user?.email}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    navigate('/profile')
                  }}
                >
                  Профіль
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    navigate('/bookings')
                  }}
                >
                  Мої бронювання
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    navigate('/my-listings')
                  }}
                >
                  Мої оголошення
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    navigate('/create-listing')
                  }}
                >
                  Запропонувати помешкання
                </button>

                <div className="shared-account-menu-divider" />

                <button
                  type="button"
                  className="shared-account-menu-logout"
                  onClick={handleLogout}
                >
                  Вийти
                </button>
              </>
            )}

          </div>
        )}

      </div>

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onRegisterClick={() => {
            setIsLoginModalOpen(false)
            setIsRegisterModalOpen(true)
          }}
        />
      )}

      {isRegisterModalOpen && (
        <RegisterModal
          onClose={() => setIsRegisterModalOpen(false)}
          onLoginClick={() => {
            setIsRegisterModalOpen(false)
            setIsLoginModalOpen(true)
          }}
        />
      )}
    </>
  )
}

export default AccountMenu