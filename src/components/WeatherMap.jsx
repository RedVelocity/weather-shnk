import React, { useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationContext } from '../context/locationProvider';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const WeatherMap = () => {
  const {
    location: { longitude, latitude },
  } = useContext(LocationContext);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/redvelocity/ckmw0p18z11yi17ntonzq7yfd',
      center: [longitude, latitude],
      zoom: 10,
      interactive: false,
    });
    new mapboxgl.Marker({ color: '#EF4444' })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // clean up on unmount
    return () => map.remove();
  }, [longitude, latitude]);

  return <div className="h-72" ref={mapContainerRef}></div>;
};

export default WeatherMap;
