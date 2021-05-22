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
      style: 'mapbox://styles/redvelocity/ckozcqbwp16v017qip75tam5d',
      center: [longitude, latitude],
      zoom: 10,
      interactive: false,
    });
    // add marker
    new mapboxgl.Marker({ color: '#EF4444' })
      .setLngLat([longitude, latitude])
      .addTo(map);
    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    // add weather layer
    map.on('load', () => {
      const layers = map.getStyle().layers;
      console.log(layers);
      map.addSource('owm', {
        type: 'raster',
        tiles: [
          `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OWM_KEY}`,
        ],
      });
      map.addLayer(
        {
          id: 'owm-layer',
          type: 'raster',
          source: 'owm',
        }
        // 'road-label'
      );
    });
    // clean up on unmount
    return () => map.remove();
  }, [longitude, latitude]);

  return <div className="card h-96" ref={mapContainerRef}></div>;
};

export default WeatherMap;
