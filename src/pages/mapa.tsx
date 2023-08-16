import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';
import { useEffect, useRef, useState } from 'react';

const mapPage = () => {

    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}

export default mapPage;