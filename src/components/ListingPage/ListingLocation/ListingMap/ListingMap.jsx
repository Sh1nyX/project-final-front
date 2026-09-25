import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import './ListingMap.css'

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

function ListingMap({ listing }) {
  const latitude = Number(listing.latitude)
  const longitude = Number(listing.longitude)

  const hasCoordinates =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)

  const fallbackCenter = [48.5, 31]

  const center = hasCoordinates
    ? [latitude, longitude]
    : fallbackCenter

  const zoom = hasCoordinates ? 13 : 5

  return (
    <div className="listing-map">

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="listing-map-container"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hasCoordinates && (
          <Marker
            position={[latitude, longitude]}
            icon={defaultIcon}
          >
            <Popup>
              {listing.location_city},{' '}
              {listing.location_country}
            </Popup>
          </Marker>
        )}

      </MapContainer>

      {!hasCoordinates && (
        <div className="listing-map-overlay">
          <span>
            Координати помешкання ще не вказані
          </span>
        </div>
      )}

    </div>
  )
}

export default ListingMap