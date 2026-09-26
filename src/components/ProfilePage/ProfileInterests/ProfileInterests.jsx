import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import './ProfileInterests.css'

import plusIcon from '../../../assets/profilepageicons/plus-icon.svg'

const profileFields = [
  {
    key: 'education',
    label: 'Навчальний заклад',
  },
  {
    key: 'profession',
    label: 'Моя професія',
  },
  {
    key: 'residence',
    label: 'Місце проживання',
  },
  {
    key: 'languages',
    label: 'Мови, якими я володію',
  },
  {
    key: 'birth_decade',
    label: 'Десятиліття, коли я народився/-лась',
  },
  {
    key: 'favorite_song',
    label: 'Улюблена пісня в старших класах',
  },
  {
    key: 'biggest_hobby',
    label: 'Найбільше захоплення',
  },
  {
    key: 'interesting_fact',
    label: 'Цікавий факт про мене',
  },
  {
    key: 'useless_skills',
    label: 'Найбільш марні навички',
  },
  {
    key: 'bio_title',
    label: 'Бажаний заголовок біографії',
  },
  {
    key: 'time_spent',
    label: 'На що я витрачаю багато часу',
  },
  {
    key: 'pets',
    label: 'Домашні тварини',
  },
]

function ProfileInterests({ user }) {
  const { updateProfile } = useAuth()

  const [values, setValues] = useState({})
  const [favoriteInterests, setFavoriteInterests] = useState([
    '',
    '',
    '',
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [isFavoriteEditing, setIsFavoriteEditing] = useState(false)

  const [isSaving, setIsSaving] = useState(false)
  const [isFavoriteSaving, setIsFavoriteSaving] = useState(false)

  const [error, setError] = useState('')
  const [favoriteError, setFavoriteError] = useState('')

  useEffect(() => {
    const initialValues = {}

    profileFields.forEach(({ key }) => {
      initialValues[key] = user?.[key] || ''
    })

    setValues(initialValues)

    const interests = Array.isArray(user?.favorite_interests)
      ? user.favorite_interests
      : []

    setFavoriteInterests([
      interests[0] || '',
      interests[1] || '',
      interests[2] || '',
    ])
  }, [user])

  const handleChange = (key, value) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleFavoriteChange = (index, value) => {
    setFavoriteInterests((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    )
  }

  const handleCancel = () => {
    const resetValues = {}

    profileFields.forEach(({ key }) => {
      resetValues[key] = user?.[key] || ''
    })

    setValues(resetValues)
    setError('')
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError('')

      await updateProfile(values)

      setIsEditing(false)
    } catch (error) {
      console.error(error)

      setError(
        error.response?.data?.error ||
        'Не вдалося зберегти інформацію'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleFavoriteCancel = () => {
    const interests = Array.isArray(user?.favorite_interests)
      ? user.favorite_interests
      : []

    setFavoriteInterests([
      interests[0] || '',
      interests[1] || '',
      interests[2] || '',
    ])

    setFavoriteError('')
    setIsFavoriteEditing(false)
  }

  const handleFavoriteSave = async () => {
    try {
      setIsFavoriteSaving(true)
      setFavoriteError('')

      const preparedInterests = favoriteInterests
        .map((item) => item.trim())
        .filter(Boolean)

      await updateProfile({
        favorite_interests: preparedInterests,
      })

      setIsFavoriteEditing(false)
    } catch (error) {
      console.error(error)

      setFavoriteError(
        error.response?.data?.error ||
        'Не вдалося зберегти улюблені інтереси'
      )
    } finally {
      setIsFavoriteSaving(false)
    }
  }

  return (
    <section className="profile-interests">

      <div className="profile-interest-header">

        {!isEditing ? (
          <button
            type="button"
            className="profile-interest-edit"
            onClick={() => {
              setError('')
              setIsEditing(true)
            }}
          >
            Редагувати
          </button>
        ) : (
          <div className="profile-interest-actions">

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Скасувати
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Збереження...' : 'Зберегти'}
            </button>

          </div>
        )}

      </div>

      <div className="profile-interest-grid">

        {profileFields.map(({ key, label }) => (
          <div
            key={key}
            className="profile-interest-item"
          >
            {isEditing ? (
              <input
                type="text"
                value={values[key] || ''}
                placeholder={label}
                onChange={(event) =>
                  handleChange(key, event.target.value)
                }
              />
            ) : (
              <button type="button">
                {values[key] || label}
              </button>
            )}
          </div>
        ))}

      </div>

      {error && (
        <div className="profile-interests-error">
          {error}
        </div>
      )}


      <section className="profile-favorite-section">

        <div className="profile-favorite-header">

          <h2>Що ви найбільше любите?</h2>

          {!isFavoriteEditing ? (
            <button
              type="button"
              className="profile-favorite-edit"
              onClick={() => {
                setFavoriteError('')
                setIsFavoriteEditing(true)
              }}
            >
              Редагувати
            </button>
          ) : (
            <div className="profile-favorite-actions">

              <button
                type="button"
                onClick={handleFavoriteCancel}
                disabled={isFavoriteSaving}
              >
                Скасувати
              </button>

              <button
                type="button"
                onClick={handleFavoriteSave}
                disabled={isFavoriteSaving}
              >
                {isFavoriteSaving
                  ? 'Збереження...'
                  : 'Зберегти'}
              </button>

            </div>
          )}

        </div>

        <p>
          Спілкуйтеся на грунті спільний зацікавлень з іншими
          гостями та господарями, вказавши свої інтереси в профілі.
        </p>


        <div className="profile-favorite-buttons">

          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="profile-favorite-item"
            >

              {isFavoriteEditing ? (
                <input
                  type="text"
                  value={favoriteInterests[index]}
                  placeholder="Ваш інтерес"
                  onChange={(event) =>
                    handleFavoriteChange(
                      index,
                      event.target.value
                    )
                  }
                />
              ) : (
                <button type="button">
                  {favoriteInterests[index] ? (
                    favoriteInterests[index]
                  ) : (
                    <img src={plusIcon} alt="" />
                  )}
                </button>
              )}

            </div>
          ))}

        </div>

        {favoriteError && (
          <div className="profile-interests-error">
            {favoriteError}
          </div>
        )}

      </section>

    </section>
  )
}

export default ProfileInterests