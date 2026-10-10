
import { useState } from 'react'

import api from '../../../services/api'

import './IdentityVerificationFlow.css'

const DOCUMENT_TYPES = [
  { value: 'driver_license', label: 'Посвідчення водія' },
  { value: 'passport', label: 'Паспорт' },
  { value: 'identity_card', label: 'Посвідчення особи' },
]

function IdentityVerificationFlow({ onComplete }) {
  const [step, setStep] = useState(0)
  const [method, setMethod] = useState('upload')
  const [documentType, setDocumentType] = useState('driver_license')

  const [frontFile, setFrontFile] = useState(null)
  const [backFile, setBackFile] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const requiresBack = documentType !== 'passport'

  async function handleSubmit() {
    setError('')

    if (!frontFile) {
      setError('Завантажте лицьовий бік документа.')
      return
    }

    if (requiresBack && !backFile) {
      setError('Завантажте також зворотний бік документа.')
      return
    }

    const formData = new FormData()
    formData.append('document_type', documentType)
    formData.append('front_image', frontFile)

    if (backFile) {
      formData.append('back_image', backFile)
    }

    setIsSubmitting(true)

    try {
      await api.post('/verification', formData)

      onComplete()
    } catch (err) {
      console.error('DOCUMENT UPLOAD ERROR:', err)

      setError(
        err.response?.data?.error ||
          'Не вдалося зберегти документ. Спробуйте ще раз.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="identity-flow-layout">
      <section className="identity-flow-content">
        {step === 0 && (
          <>
            <h1>Додайте посвідчення особи державного зразка</h1>

            <p className="identity-flow-description">
              Вам потрібно буде додати посвідчення особи державного
              зразка. Цей крок допоможе переконатися, що це справді ви.
            </p>

            <div className="identity-choice-list">
              <label className="identity-choice">
                <span>
                  <strong>Завантажити наявну фотографію</strong>
                  <small>Рекомендовано</small>
                </span>

                <input
                  type="radio"
                  name="upload-method"
                  value="upload"
                  checked={method === 'upload'}
                  onChange={() => setMethod('upload')}
                />
              </label>

              <label className="identity-choice">
                <span>
                  <strong>
                    Зробити фотографію камерою пристрою
                  </strong>
                  <small>Використайте камеру, якщо вона доступна</small>
                </span>

                <input
                  type="radio"
                  name="upload-method"
                  value="camera"
                  checked={method === 'camera'}
                  onChange={() => setMethod('camera')}
                />
              </label>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1>Виберіть відповідний тип посвідчення особи</h1>

            <label className="identity-select-label">
              Країна видачі
              <select defaultValue="UA">
                <option value="UA">Україна</option>
                <option value="PL">Польща</option>
                <option value="DE">Німеччина</option>
                <option value="OTHER">Інша країна</option>
              </select>
            </label>

            <div className="identity-choice-list">
              {DOCUMENT_TYPES.map((document) => (
                <label
                  className="identity-choice"
                  key={document.value}
                >
                  <span>
                    <strong>{document.label}</strong>
                  </span>

                  <input
                    type="radio"
                    name="document-type"
                    value={document.value}
                    checked={documentType === document.value}
                    onChange={() => setDocumentType(document.value)}
                  />
                </label>
              ))}
            </div>

            <p className="identity-flow-description">
              Документ зберігатиметься приватно. У цьому навчальному
              проєкті верифікація імітується після збереження файлів.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h1>
              Завантажте зображення свого{' '}
              {DOCUMENT_TYPES.find(
                (item) => item.value === documentType
              )?.label.toLowerCase()}
            </h1>

            <p className="identity-flow-description">
              Фотографії не мають бути розмиті. Документ повинен бути
              добре освітлений, а його текст — чітко видимий.
            </p>

            <div className="identity-upload-grid">
              <label className="identity-upload-box">
                <span className="identity-upload-icon">▣</span>
                <strong>Завантажте лицьовий бік</strong>
                <small>
                  {frontFile?.name || 'Лише JPEG або PNG · до 5 МБ'}
                </small>

                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  capture={method === 'camera' ? 'environment' : undefined}
                  onChange={(event) => {
                    setFrontFile(event.target.files?.[0] || null)
                    setError('')
                  }}
                />
              </label>

              <label
                className={`identity-upload-box ${
                  !requiresBack ? 'identity-upload-optional' : ''
                }`}
              >
                <span className="identity-upload-icon">▤</span>
                <strong>Завантажте зворотний бік</strong>
                <small>
                  {backFile?.name ||
                    (requiresBack
                      ? 'Лише JPEG або PNG · до 5 МБ'
                      : 'Необов’язково')}
                </small>

                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  capture={method === 'camera' ? 'environment' : undefined}
                  onChange={(event) => {
                    setBackFile(event.target.files?.[0] || null)
                    setError('')
                  }}
                />
              </label>
            </div>
          </>
        )}

        {error && (
          <p className="identity-flow-error" role="alert">
            {error}
          </p>
        )}

        <div className="identity-flow-actions">
          {step > 0 && (
            <button
              type="button"
              className="identity-back-button"
              onClick={() => {
                setError('')
                setStep((value) => value - 1)
              }}
              disabled={isSubmitting}
            >
              ← Назад
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              className="identity-primary-button"
              onClick={() => setStep((value) => value + 1)}
            >
              Продовжити
            </button>
          ) : (
            <button
              type="button"
              className="identity-primary-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Збереження...' : 'Продовжити'}
            </button>
          )}
        </div>
      </section>

      <aside className="identity-privacy-card">
        <h2>Ваша приватність</h2>

        <p>
          Ми докладаємо зусиль для захисту даних, якими ви
          ділитеся під час цієї процедури. Фотографії документа
          не розміщуються в публічній папці оголошень.
        </p>

        <p>
          Після збереження документа ви зможете перейти до
          створення оголошення без повторного завантаження.
        </p>
      </aside>
    </div>
  )
}

export default IdentityVerificationFlow
