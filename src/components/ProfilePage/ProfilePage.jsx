import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './ProfilePage.css'

function ProfilePage() {
  const navigate = useNavigate()
  const {
    user,
    isAuthenticated,
    isLoading,
    updateProfile,
  } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [bio, setBio] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return

    setFirstName(user.first_name || '')
    setLastName(user.last_name || '')
    setPhone(user.phone || '')
    setBio(user.bio || '')
  }, [user])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/')
    }
  }, [isLoading, isAuthenticated, navigate])

  if (isLoading || !user) {
    return (
      <main className="profile-page profile-page-loading">
        <p>Завантаження профілю...</p>
      </main>
    )
  }

  const handleSave = async () => {
    setMessage('')
    setError('')

    try {
      setIsSaving(true)

      await updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
      })

      setIsEditing(false)
      setMessage('Профіль успішно оновлено')
    } catch (error) {
      console.error(error)
      setError(
        error.response?.data?.error ||
        'Не вдалося оновити профіль'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFirstName(user.first_name || '')
    setLastName(user.last_name || '')
    setPhone(user.phone || '')
    setBio(user.bio || '')

    setMessage('')
    setError('')
    setIsEditing(false)
  }

  return (
    <main className="profile-page">
      <header className="profile-page-header">
        <button
          type="button"
          className="profile-logo"
          onClick={() => navigate('/')}
        >
          HomeFU
        </button>

        <button
          type="button"
          className="profile-host-link"
          onClick={() => navigate('/create-listing')}
        >
          Запропонувати помешкання на HomeFU
        </button>
      </header>

      <section className="profile-container">
        <div className="profile-main">
          <h1>Ваш профіль</h1>

          <p className="profile-description">
            Інформацію, яку ви надаєте, буде використано на HomeFU,
            щоб інші гості й господарі мали змогу познайомитися з вами.
          </p>

          <section className="profile-info-section">
            <h2>Інформація про вас</h2>

            <div className="profile-fields-grid">
              <div className="profile-field">
                <label>Ім'я</label>

                {isEditing ? (
                  <input
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.target.value)
                    }
                  />
                ) : (
                  <span>{user.first_name || 'Не вказано'}</span>
                )}
              </div>

              <div className="profile-field">
                <label>Прізвище</label>

                {isEditing ? (
                  <input
                    value={lastName}
                    onChange={(event) =>
                      setLastName(event.target.value)
                    }
                  />
                ) : (
                  <span>{user.last_name || 'Не вказано'}</span>
                )}
              </div>

              <div className="profile-field">
                <label>Email</label>
                <span>{user.email}</span>
              </div>

              <div className="profile-field">
                <label>Номер телефону</label>

                {isEditing ? (
                  <input
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="Не вказано"
                  />
                ) : (
                  <span>{user.phone || 'Не вказано'}</span>
                )}
              </div>
            </div>

            <div className="profile-bio-section">
              <label>Про мене</label>

              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(event) =>
                    setBio(event.target.value)
                  }
                  placeholder="Напишіть щось про себе"
                  maxLength={500}
                />
              ) : (
                <div className="profile-bio-value">
                  {user.bio || 'Напишіть щось веселе й неординарне.'}
                </div>
              )}
            </div>

            {message && (
              <div className="profile-success">
                {message}
              </div>
            )}

            {error && (
              <div className="profile-error">
                {error}
              </div>
            )}

            <div className="profile-actions">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => {
                    setMessage('')
                    setError('')
                    setIsEditing(true)
                  }}
                >
                  Редагувати профіль
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="profile-save-button"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Збереження...' : 'Зберегти'}
                  </button>

                  <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Скасувати
                  </button>
                </>
              )}
            </div>
          </section>

          <section className="profile-interests-section">
            <h2>Що ви найбільше любите?</h2>

            <p>
              Спілкуйтеся на ґрунті спільних зацікавлень з іншими
              гостями та господарями, вказавши свої інтереси в профілі.
            </p>

            <div className="profile-placeholder-fields">
              <div>Навчальний заклад</div>
              <div>Моя професія</div>
              <div>Місце проживання</div>
              <div>Мови, якими я володію</div>
              <div>Найбільше захоплення</div>
              <div>Домашні тварини</div>
            </div>
          </section>
        </div>

        <aside className="profile-sidebar">
          <div className="profile-avatar-wrapper">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={`${user.first_name} ${user.last_name}`}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar profile-avatar-placeholder">
                {user.first_name?.[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>

          <button
            type="button"
            className="profile-avatar-button"
          >
            Додати
          </button>
        </aside>
      </section>

      <footer className="profile-page-footer">
        <span>2022 HomeFU, Inc.</span>
        <a href="#">Конфіденційність</a>
        <a href="#">Умови</a>
        <a href="#">Мапа сайту</a>

        <div className="profile-footer-right">
          <span>Українська (UA)</span>
          <span>$ USD</span>
        </div>
      </footer>
    </main>
  )
}

export default ProfilePage