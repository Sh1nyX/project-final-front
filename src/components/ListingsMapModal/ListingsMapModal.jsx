import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'

import { getListings } from '../../services/api'

import './ListingsMapModal.css'

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'


const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})


function FitMapToMarkers({ listings }) {
  const map = useMap()

  const positions = useMemo(() => {
    return listings
      .map((listing) => {
        const latitude = Number(listing.latitude)
        const longitude = Number(listing.longitude)

        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude)
        ) {
          return null
        }

        return [latitude, longitude]
      })
      .filter(Boolean)
  }, [listings])

  useEffect(() => {
    if (positions.length === 0) {
      map.setView([48.5, 31], 5)
      return
    }

    if (positions.length === 1) {
      map.setView(positions[0], 13)
      return
    }

    const bounds = L.latLngBounds(positions)

    map.fitBounds(bounds, {
      padding: [60, 60],
      maxZoom: 13,
    })
  }, [map, positions])

  return null
}


function ListingsMapModal({
  isOpen,
  onClose,
  searchParams = {},
}) {
  const navigate = useNavigate()

  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  /*
    Делаем стабильный ключ для searchParams.

    Сам объект searchParams может пересоздаваться
    при каждом рендере родительского компонента.

    JSON.stringify позволяет запускать загрузку
    только тогда, когда реально изменились параметры поиска.
  */
  const searchParamsKey = JSON.stringify(searchParams)


  useEffect(() => {
    if (!isOpen) {
      return
    }

    let cancelled = false

    const loadMapListings = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data = await getListings({
          check_in: searchParams.check_in || '',
          check_out: searchParams.check_out || '',
          flexible_days: Number(searchParams.flexible_days) || 0,

          region: searchParams.region || '',
          category_id: searchParams.category_id || '',
          guests: Number(searchParams.guests) || 0,

          min_price: searchParams.min_price || '',
          max_price: searchParams.max_price || '',

          property_type: searchParams.property_type || '',
          min_bedrooms: searchParams.min_bedrooms || '',
          min_beds: searchParams.min_beds || '',
          amenities: searchParams.amenities || '',

          sort: searchParams.sort || 'recommended',

          limit: 1000,
          page: 1,
        })

        /*
          Если компонент уже успели закрыть
          или параметры поиска изменились —
          старый запрос больше ничего не меняет.
        */
        if (cancelled) {
          return
        }

        setListings(data.listings || [])
      } catch (error) {
        if (cancelled) {
          return
        }

        console.error('MAP LISTINGS ERROR:', error)

        setError(
          'Не вдалося завантажити оголошення'
        )

        setListings([])
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadMapListings()

    return () => {
      cancelled = true
    }
  }, [isOpen, searchParamsKey])


  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [isOpen, onClose])


  if (!isOpen) {
    return null
  }


  const listingsWithCoordinates = listings.filter(
    (listing) => {
      const latitude = Number(listing.latitude)
      const longitude = Number(listing.longitude)

      return (
        Number.isFinite(latitude) &&
        Number.isFinite(longitude)
      )
    }
  )


  return (
    <div className="listings-map-modal">

      <div className="listings-map-modal-top">

        <button
          type="button"
          className="listings-map-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="listings-map-counter">
          {isLoading
            ? 'Завантаження...'
            : `${listingsWithCoordinates.length} помешкань на мапі`}
        </div>

      </div>


      <MapContainer
        center={[48.5, 31]}
        zoom={5}
        scrollWheelZoom={true}
        zoomControl={true}
        className="listings-map-modal-container"
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        <FitMapToMarkers
          listings={listingsWithCoordinates}
        />


        {listingsWithCoordinates.map(
          (listing) => {
            const latitude = Number(
              listing.latitude
            )

            const longitude = Number(
              listing.longitude
            )

            return (
              <Marker
                key={listing.id}
                position={[
                  latitude,
                  longitude,
                ]}
                icon={defaultIcon}
              >

                <Popup>

                  <div className="listings-map-popup">

                    {listing.images?.[0] && (
                      <img
                        src={listing.images[0]}
                        alt=""
                        className="listings-map-popup-image"
                      />
                    )}


                    <strong>
                      {listing.title ||
                        'Помешкання'}
                    </strong>


                    <span>
                      {Number(
                        listing.price_per_night || 0
                      )}
                      {' '}
                      $ / ніч
                    </span>


                    <button
                      type="button"
                      onClick={() => {
                        onClose()

                        navigate(
                          `/listing/${listing.id}`
                        )
                      }}
                    >
                      Переглянути
                    </button>

                  </div>

                </Popup>

              </Marker>
            )
          }
        )}

      </MapContainer>


      {error && (
        <div className="listings-map-error">
          {error}
        </div>
      )}

    </div>
  )
}


export default ListingsMapModal