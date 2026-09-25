import { useEffect, useState } from 'react'
import './ListingGallery.css'

import arrowIcon from '../../../assets/bookingpage/arrow-icon.svg'

function ListingGallery({ listing }) {
  const sourceImages = listing.images || []

    const images =
    sourceImages.length > 0
        ? Array.from(
            { length: Math.max(5, sourceImages.length) },
            (_, index) =>
            sourceImages[index] || sourceImages[0]
        )
        : []

  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const mainImage = images[0]

  const secondaryImages = [
    images[1] || mainImage,
    images[2] || mainImage,
    images[3] || mainImage,
    images[4] || mainImage,
  ]

  const openViewer = (index) => {
    setCurrentImageIndex(index)
    setIsViewerOpen(true)
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
  }

  const showPrevious = (event) => {
    event.stopPropagation()

    setCurrentImageIndex((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    )
  }

  const showNext = (event) => {
    event.stopPropagation()

    setCurrentImageIndex((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    )
  }

  useEffect(() => {
    if (!isViewerOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeViewer()
      }

      if (event.key === 'ArrowLeft') {
        setCurrentImageIndex((current) =>
          current === 0
            ? images.length - 1
            : current - 1
        )
      }

      if (event.key === 'ArrowRight') {
        setCurrentImageIndex((current) =>
          current === images.length - 1
            ? 0
            : current + 1
        )
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isViewerOpen, images.length])

  return (
    <>
      <section className="listing-gallery">

        <button
          type="button"
          className="listing-gallery-main"
          onClick={() => openViewer(0)}
        >
          {mainImage && (
            <img
              src={mainImage}
              alt={listing.title}
            />
          )}
        </button>

        <div className="listing-gallery-column">

          <button
            type="button"
            className="listing-gallery-image"
            onClick={() => openViewer(1)}
          >
            {secondaryImages[0] && (
              <img
                src={secondaryImages[0]}
                alt=""
              />
            )}
          </button>

          <button
            type="button"
            className="listing-gallery-image"
            onClick={() => openViewer(2)}
          >
            {secondaryImages[1] && (
              <img
                src={secondaryImages[1]}
                alt=""
              />
            )}
          </button>

        </div>

        <div className="listing-gallery-column">

          <button
            type="button"
            className="listing-gallery-image"
            onClick={() => openViewer(3)}
          >
            {secondaryImages[2] && (
              <img
                src={secondaryImages[2]}
                alt=""
              />
            )}
          </button>

          <button
            type="button"
            className="listing-gallery-image"
            onClick={() => openViewer(4)}
          >
            {secondaryImages[3] && (
              <img
                src={secondaryImages[3]}
                alt=""
              />
            )}
          </button>

        </div>

      </section>

      {isViewerOpen && images.length > 0 && (
        <div
          className="listing-gallery-viewer"
          onClick={closeViewer}
        >

          <button
            type="button"
            className="listing-gallery-viewer-close"
            onClick={closeViewer}
            aria-label="Закрити"
          >
            ×
          </button>

          <button
            type="button"
            className="listing-gallery-viewer-arrow listing-gallery-viewer-arrow-left"
            onClick={showPrevious}
            aria-label="Попереднє фото"
          >
            <img
              src={arrowIcon}
              alt=""
            />
          </button>

          <img
            className="listing-gallery-viewer-image"
            src={images[currentImageIndex]}
            alt={`${listing.title} — фото ${currentImageIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="listing-gallery-viewer-arrow listing-gallery-viewer-arrow-right"
            onClick={showNext}
            aria-label="Наступне фото"
          >
            <img
              src={arrowIcon}
              alt=""
            />
          </button>

          <div
            className="listing-gallery-viewer-counter"
            onClick={(event) => event.stopPropagation()}
          >
            {currentImageIndex + 1} / {images.length}
          </div>

        </div>
      )}
    </>
  )
}

export default ListingGallery