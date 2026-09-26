import { useNavigate } from 'react-router-dom'
import './ProfileHeader.css'

import menuIcon from '../../../assets/menu-icon.svg'
import profileIcon from '../../../assets/profile-icon.svg'

function ProfileHeader() {
  const navigate = useNavigate()

  return (
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

      <button
        type="button"
        className="profile-account-button"
        onClick={() => navigate('/')}
      >
        <img src={menuIcon} alt="" />
        <img src={profileIcon} alt="" />
      </button>

    </header>
  )
}

export default ProfileHeader