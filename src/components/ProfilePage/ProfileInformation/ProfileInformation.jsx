import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import './ProfileInformation.css'

function ProfileInformation({ user }) {
  const { updateProfile } = useAuth()

  const [bio, setBio] = useState(user?.bio || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setBio(user?.bio || '')
  }, [user?.bio])

  const handleEdit = () => {
    setBio(user?.bio || '')
    setMessage('')
    setError('')
    setIsEditing(true)
  }

  const handleCancel = () => {
    setBio(user?.bio || '')
    setMessage('')
    setError('')
    setIsEditing(false)
  }

  const handleSave = async () => {
    setMessage('')
    setError('')

    try {
      setIsSaving(true)

      console.log('SAVING BIO:', bio)

      const updatedUser = await updateProfile({
        bio: bio.trim(),
      })

      console.log('UPDATED USER:', updatedUser)

      setIsEditing(false)
      setMessage('Профіль успішно оновлено')
    } catch (error) {
      console.error('BIO SAVE ERROR:', error)

      setError(
        error.response?.data?.error ||
        'Не вдалося зберегти біографію'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="profile-information">

      <h2>Інформація про вас</h2>

      <div className="profile-bio-card">

        {isEditing ? (
          <>
            <textarea
              value={bio}
              onChange={(event) => {
                setBio(event.target.value)
              }}
              placeholder="Напишіть щось веселе й неординарне."
              maxLength={500}
            />

            <div className="profile-bio-actions">

              <button
                type="button"
                className="profile-bio-cancel"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Скасувати
              </button>

              <button
                type="button"
                className="profile-bio-save"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving
                  ? 'Збереження...'
                  : 'Зберегти'}
              </button>

            </div>
          </>
        ) : (
          <>
            <div className="profile-bio-text">
              {user?.bio?.trim()
                ? user.bio
                : 'Напишіть щось веселе й неординарне.'}
            </div>

            <button
              type="button"
              className="profile-bio-add"
              onClick={handleEdit}
            >
              {user?.bio?.trim()
                ? 'Редагувати'
                : 'Додати вступ'}
            </button>
          </>
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

      <div className="profile-information-divider" />

    </section>
  )
}

export default ProfileInformation