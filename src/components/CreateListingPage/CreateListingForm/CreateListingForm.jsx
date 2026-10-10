
import { useEffect, useState } from 'react'

import api from '../../../services/api'

import './CreateListingForm.css'

const INITIAL_FORM = {
  title: '',
  description: '',
  price_per_night: '',
  location_city: '',
  location_country: 'Україна',
  category_id: '',
  available_from: '',
  available_to: '',
  max_guests: '2',
  bedrooms: '1',
  beds: '1',
  bathrooms: '1',
  address: '',
  getting_around: '',
  latitude: '',
  longitude: '',
  images_text: '',
  amenities_text: '',
  rules_text: '',
}

function splitLines(value) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function CreateListingForm({ onCreated }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      try {
        const response = await api.get('/categories')

        if (cancelled) return

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.categories ??
            response.data?.data ??
            []

        setCategories(data)
      } catch (err) {
        if (cancelled) return

        console.error('CATEGORIES ERROR:', err)
        setError('Не вдалося завантажити категорії помешкань.')
      } finally {
        if (!cancelled) {
          setIsLoadingCategories(false)
        }
      }
    }

    loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (form.available_from >= form.available_to) {
      setError('Дата виїзду має бути пізніше за дату заїзду.')
      return
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      price_per_night: Number(form.price_per_night),
      location_city: form.location_city.trim(),
      location_country: form.location_country.trim(),
      category_id: Number(form.category_id),
      available_from: form.available_from,
      available_to: form.available_to,
      max_guests: Number(form.max_guests),
      bedrooms: Number(form.bedrooms),
      beds: Number(form.beds),
      bathrooms: Number(form.bathrooms),
      address: form.address.trim() || null,
      getting_around: form.getting_around.trim() || null,
      latitude: form.latitude.trim() ? Number(form.latitude) : null,
      longitude: form.longitude.trim() ? Number(form.longitude) : null,
      images: splitLines(form.images_text),
      amenities: splitLines(form.amenities_text),
      rules: splitLines(form.rules_text),
    }

    setIsSubmitting(true)

    try {
      const response = await api.post('/listings', payload)
      const listing = response.data?.listing ?? response.data

      if (!listing?.id) {
        throw new Error('Оголошення створено, але сервер не повернув його ID.')
      }

      onCreated(listing)
    } catch (err) {
      console.error('CREATE LISTING ERROR:', err)

      const serverError = err.response?.data?.error

      if (err.response?.status === 403) {
        setError(
          serverError === 'IDENTITY_VERIFICATION_REQUIRED'
            ? 'Спочатку потрібно додати посвідчення особи.'
            : err.response.data?.message || 'Недостатньо прав для дії.'
        )
      } else {
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Не вдалося створити оголошення.'
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="create-listing-form-page">
      <div className="create-listing-form-heading">
        <span>HomeFU · Для господарів</span>
        <h1>Запропонуйте своє помешкання</h1>
        <p>
          Заповніть інформацію про житло, умови проживання
          та період, коли воно доступне для гостей.
        </p>
      </div>

      <form
        className="create-listing-form"
        onSubmit={handleSubmit}
      >
        <section className="listing-form-section">
          <h2>Основна інформація</h2>

          <label>
            Назва помешкання *
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              maxLength={150}
              required
              placeholder="Наприклад, затишна квартира біля моря"
            />
          </label>

          <label>
            Опис
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Розкажіть гостям про своє помешкання"
            />
          </label>

          <label>
            Категорія *
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              disabled={isLoadingCategories || categories.length === 0}
              required
            >
              <option value="">
                {isLoadingCategories
                  ? 'Завантаження категорій...'
                  : 'Виберіть категорію'}
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className="listing-form-section">
          <h2>Розташування</h2>

          <div className="listing-form-grid">
            <label>
              Місто *
              <input
                name="location_city"
                value={form.location_city}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Країна *
              <input
                name="location_country"
                value={form.location_country}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Адреса
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Вулиця, номер будинку"
            />
          </label>

          <div className="listing-form-grid">
            <label>
              Широта (необов’язково)
              <input
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
              />
            </label>

            <label>
              Довгота (необов’язково)
              <input
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Як пересуватися районом
            <textarea
              name="getting_around"
              value={form.getting_around}
              onChange={handleChange}
              rows={3}
            />
          </label>
        </section>

        <section className="listing-form-section">
          <h2>Ціна та доступність</h2>

          <label>
            Ціна за ніч (USD) *
            <input
              type="number"
              name="price_per_night"
              value={form.price_per_night}
              onChange={handleChange}
              min="1"
              step="0.01"
              required
            />
          </label>

          <div className="listing-form-grid">
            <label>
              Доступне з *
              <input
                type="date"
                name="available_from"
                value={form.available_from}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Доступне до *
              <input
                type="date"
                name="available_to"
                value={form.available_to}
                min={form.available_from || undefined}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="listing-form-grid listing-form-grid-four">
            <label>
              Гостей
              <input
                type="number"
                name="max_guests"
                min="1"
                value={form.max_guests}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Спалень
              <input
                type="number"
                name="bedrooms"
                min="0"
                value={form.bedrooms}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Ліжок
              <input
                type="number"
                name="beds"
                min="1"
                value={form.beds}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Ванних
              <input
                type="number"
                name="bathrooms"
                min="1"
                value={form.bathrooms}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </section>

        <section className="listing-form-section">
          <h2>Фотографії та зручності</h2>

          <label>
            Посилання на фотографії
            <textarea
              name="images_text"
              value={form.images_text}
              onChange={handleChange}
              rows={4}
              placeholder={'https://example.com/photo1.jpg\nhttps://example.com/photo2.jpg'}
            />
            <small>
              Додайте URL зображень, кожен з нового рядка.
            </small>
          </label>

          <label>
            Зручності
            <textarea
              name="amenities_text"
              value={form.amenities_text}
              onChange={handleChange}
              rows={3}
              placeholder={'Wi-Fi\nКондиціонер\nКухня'}
            />
          </label>

          <label>
            Правила помешкання
            <textarea
              name="rules_text"
              value={form.rules_text}
              onChange={handleChange}
              rows={3}
              placeholder={'Без куріння\nНе можна влаштовувати вечірки'}
            />
          </label>
        </section>

        {error && (
          <p className="create-listing-form-error" role="alert">
            {error}
          </p>
        )}

        <button
          className="create-listing-submit"
          type="submit"
          disabled={isSubmitting || isLoadingCategories}
        >
          {isSubmitting
            ? 'Публікуємо...'
            : 'Створити оголошення'}
        </button>
      </form>
    </section>
  )
}

export default CreateListingForm
