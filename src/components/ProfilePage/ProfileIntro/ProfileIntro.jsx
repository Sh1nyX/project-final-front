import './ProfileIntro.css'

function ProfileIntro() {
  return (
    <section className="profile-intro">

      <h1>Ваш профіль</h1>

      <p>
        Інформацію, яку ви надаєте, буде використано на HomeFU,
        щоб інші гості й господарі мали змогу познайомитися з вами.
        {' '}
        <a href="#">Докладніше</a>
      </p>

    </section>
  )
}

export default ProfileIntro