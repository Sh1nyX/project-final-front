import { useRef, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import './ProfileAvatar.css'

import photoIcon from '../../../assets/profilepageicons/photo-icon.svg'

function ProfileAvatar({ user }) {
  const { updateAvatar } = useAuth()

  const fileInputRef = useRef(null)

  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setError('')

    if (!file.type.startsWith('image/')) {
      setError('Можна вибрати лише зображення')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Розмір фотографії не повинен перевищувати 5 МБ')
      return
    }

    try {
      setIsUploading(true)

      await updateAvatar(file)
    } catch (error) {
      console.error(error)

      setError(
        error.response?.data?.error ||
        'Не вдалося завантажити фотографію'
      )
    } finally {
      setIsUploading(false)

      event.target.value = ''
    }
  }

  return (
    <aside className="profile-avatar-section">

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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        hidden
      />

      <button
        type="button"
        className="profile-avatar-button"
        onClick={handleButtonClick}
        disabled={isUploading}
      >
        <img
          src={photoIcon}
          alt=""
        />

        <span>
          {isUploading ? 'Завантаження...' : 'Додати'}
        </span>
      </button>

      {error && (
        <div className="profile-avatar-error">
          {error}
        </div>
      )}

    </aside>
  )
}

export default ProfileAvatar