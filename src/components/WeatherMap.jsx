import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const WeatherMap = () => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-104.9876, 39.7405],
      zoom: 12.5,
      dragPan: false,
    });
    new mapboxgl.Marker({ color: 'teal' })
      .setLngLat([-104.9876, 39.7405])
      .addTo(map);

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div
      className="absolute top-0 bottom-0 m-2 rounded shadow h-72"
      ref={mapContainerRef}
    ></div>
  );
};

export default WeatherMap;