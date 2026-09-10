import './Footer.css'
import ballIcon from '../../assets/footer-icons/ball-icon.svg'
import facebookIcon from '../../assets/footer-icons/facebook-icon.svg'
import instIcon from '../../assets/footer-icons/inst-icon.svg'

function Footer() {
  return (
    <footer className="footer">

  <div className="footer-inner">

    <section className="footer-ideas">

      <h2>Ідеї для майбутніх поїздок</h2>

      <div className="footer-tabs">
        <button className="active">Популярні</button>
        <button>Мистецтво й культура</button>
        <button>Відпочинок на відкритому повітрі</button>
        <button>Гори</button>
        <button>Пляж</button>
        <button>Категорії</button>
        <button>Чим займатися</button>
      </div>

      <div className="footer-destinations">

        <div>
          <strong>Санморе</strong>
          <span>Оренда квартир</span>
        </div>

        <div>
          <strong>Беналмадена</strong>
          <span>Оренда будинків</span>
        </div>

        <div>
          <strong>Марбелья</strong>
          <span>Оренда будинків</span>
        </div>

        <div>
          <strong>Міхас</strong>
          <span>Оренда квартир</span>
        </div>

        <div>
          <strong>Prescott</strong>
          <span>Оренда зрубів</span>
        </div>

        <div>
          <strong>Скоттсдейл</strong>
          <span>Оренда помешкань із бас...</span>
        </div>

        <div>
          <strong>Тусон</strong>
          <span>Оренда кондомініумів</span>
        </div>

        <div>
          <strong>Яспер</strong>
          <span>Помешкання для відпоч...</span>
        </div>

        <div>
          <strong>Маунтін-Вʼю</strong>
          <span>Оренда будинків</span>
        </div>

        <div>
          <strong>Devonport</strong>
          <span>Помешкання для відпоч...</span>
        </div>

        <div>
          <strong>Массачусетс</strong>
          <span>Помешкання для відпоч...</span>
        </div>

        <div>
          <strong>Ейвіса</strong>
          <span>Помешкання для відпоч...</span>
        </div>

        <div>
          <strong>Анахайм</strong>
          <span>Оренда помешкань для...</span>
        </div>

        <div>
          <strong>Монтерей</strong>
          <span>Помешкання для відпоч...</span>
        </div>

        <div>
          <strong>Paso Robles</strong>
          <span>Помешкання для відпоч...</span>
        </div>

        <div>
          <strong>Санта-Барбара</strong>
          <span>Оренда заміських буд...</span>
        </div>

        <div>
          <strong>Сонома</strong>
          <span>Помешкання для відпоч...</span>
        </div>

        <div>
          <strong>Показати більше</strong>
          <span></span>
        </div>

      </div>

    </section>


    <section className="footer-links">

      <div className="footer-column">
        <h3>Підтримка</h3>

        <a href="#">Довідковий центр</a>
        <a href="#">AirCover</a>
        <a href="#">Протидія дискримінації</a>
        <a href="#">Підтримка людей з інвалідністю</a>
        <a href="#">Варіанти скасування бронювань</a>
        <a href="#">Надіслати скаргу від сусідів</a>
      </div>

      <div className="footer-column">
        <h3>Прийом гостей</h3>

        <a href="#">Перетворити помешкання на HomeFU</a>
        <a href="#">AirCover для господарів</a>
        <a href="#">Ресурси про прийом гостей</a>
        <a href="#">Форум спільноти</a>
        <a href="#">Відповідальний прийом гостей</a>
      </div>

      <div className="footer-column">
        <h3>HomeFU</h3>

        <a href="#">Новини</a>
        <a href="#">Нові функції</a>
        <a href="#">Вакансії</a>
        <a href="#">Інвестори</a>
        <a href="#">Тимчасове житло від HomeFU</a>
      </div>

    </section>


    <section className="footer-bottom">

      <div className="footer-copyright">
        <span>2022 HomeFU, Inc.</span>
        <a href="#">Конфіденційність</a>
        <a href="#">Умови</a>
        <a href="#">Мапа сайту</a>
      </div>

      <div className="footer-settings">

        <div className="footer-language">
            <img src={ballIcon} alt="" />
            <span>Українська (UA)</span>
        </div>

        <span className="footer-currency">
            $ USD
        </span>

        <a href="#" className="footer-social">
            <img src={facebookIcon} alt="Facebook" />
        </a>

        <a href="#" className="footer-social">
            <img src={instIcon} alt="Instagram" />
        </a>

        </div>

    </section>

  </div>

</footer>
  )
}

export default Footer