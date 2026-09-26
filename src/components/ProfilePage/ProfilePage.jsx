import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

import './ProfilePage.css'

import ProfileHeader from './ProfileHeader/ProfileHeader'
import ProfileIntro from './ProfileIntro/ProfileIntro'
import ProfileInformation from './ProfileInformation/ProfileInformation'
import ProfileInterests from './ProfileInterests/ProfileInterests'
import ProfileAvatar from './ProfileAvatar/ProfileAvatar'
import ProfileFooter from './ProfileFooter/ProfileFooter'

function ProfilePage() {
  const navigate = useNavigate()

  const {
    user,
    isAuthenticated,
    isLoading,
    updateProfile,
  } = useAuth()

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


  return (
    <main className="profile-page">

      <div className="profile-page-canvas">

        <ProfileHeader />

        <ProfileIntro />

        <ProfileInterests user={user} />

        <ProfileInformation user={user} />

        <ProfileAvatar user={user} />

        <ProfileFooter />

      </div>

    </main>
  )
}

export default ProfilePage