import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import './PropertyMap.css';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const mapStyles = [
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
    }
];

function PropertyMap({ lat, lng, address }) {
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    const apiKey = "AIzaSyC4LUYDrnNLCFoXMu9SmgGisMeAbFtHSv0";

    const center = { lat, lng };

    if (!apiKey) {
        return (
            <div className="mapFallback">
                <div className="mapFallbackContent">
                    <img src="/icons/location.svg" alt="" className="mapFallbackIcon" aria-hidden="true" />
                    <h4>Map View</h4>
                    <p>{address}</p>
                    <p className="mapCoords">
                        Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
                    </p>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btnPrimary mapExternalLink"
                    >
                        View on Google Maps
                    </a>
                    <p className="mapNote">
                        <small>To display interactive map, add VITE_GOOGLE_MAPS_API_KEY to .env file</small>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={{
                    styles: mapStyles,
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: true,
                    fullscreenControl: true
                }}
            >
                <Marker
                    position={center}
                    onClick={() => setShowInfoWindow(true)}
                />

                {showInfoWindow && (
                    <InfoWindow
                        position={center}
                        onCloseClick={() => setShowInfoWindow(false)}
                    >
                        <div className="mapInfoWindow">
                            <p className="infoAddress">{address}</p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="infoLink"
                            >
                                Get Directions
                            </a>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default PropertyMap;
