import './ProfileFooter.css'

import ballIcon from '../../../assets/footer-icons/ball-icon.svg'
import facebookIcon from '../../../assets/footer-icons/facebook-icon.svg'
import instIcon from '../../../assets/footer-icons/inst-icon.svg'

function ProfileFooter() {
  return (
    <footer className="profile-page-footer">

      <div className="profile-footer-left">

        <span>2022 HomeFU, Inc.</span>

        <a href="#">
          Конфіденційність
        </a>

        <a href="#">
          Умови
        </a>

        <a href="#">
          Мапа сайту
        </a>

      </div>

      <div className="profile-footer-right">

        <div className="profile-footer-language">
          <img src={ballIcon} alt="" />
          <span>Українська (UA)</span>
        </div>

        <span className="profile-footer-currency">
          $ USD
        </span>

        <a href="#" className="profile-footer-social">
          <img src={facebookIcon} alt="Facebook" />
        </a>

        <a href="#" className="profile-footer-social">
          <img src={instIcon} alt="Instagram" />
        </a>

      </div>

    </footer>
  )
}

export default ProfileFooter