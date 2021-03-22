import React, { useContext, useEffect } from 'react';
import weatherIcons from '../assets/svg/weatherIcons';
import { WeatherContext } from '../context/weatherProvider';
import { getLocation, getWeather } from '../API';
import { LocationContext } from '../context/locationProvider';

const WeatherCard = () => {
  const { weatherData, setWeatherData } = useContext(WeatherContext);

  let theme;
  if (weatherData.currently.apparentTemperature <= 15) theme = 'cold';
  else if (weatherData.currently.apparentTemperature <= 28) theme = 'mild';
  else theme = 'hot';

  const { location, setLocation } = useContext(LocationContext);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const weather = await getWeather(latitude, longitude);
        const locationName = await getLocation(latitude, longitude);
        setLocation({ name: locationName, latitude, longitude });
        weather !== 0 && setWeatherData(weather);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`grid max-w-md md:col-start-1 rounded shadow p-4 font-semibold transition-colors duration-1000 ease-in-out ${theme}`}
    >
      <div className="flex items-center justify-between gap-6 pb-4 text-center border-b-2 border-black">
        <img
          className="w-16 h-16"
          alt="icon"
          src={weatherIcons[weatherData.currently.icon.replaceAll('-', '_')]}
        />
        <h1 className="text-2xl md:text-xl">{weatherData.currently.summary}</h1>
        <div className="flex flex-col items-center justify-center">
          <h1 className="">Currently</h1>
          <h1 className="text-4xl">
            {Math.round(weatherData.currently.apparentTemperature)}°C
          </h1>
        </div>
      </div>
      <div className="flex items-center pt-4 space-x-1">
        <img
          alt="location"
          src="https://img.icons8.com/material-outlined/24/000000/marker.png"
        />
        <h5 className="text-sm">{location.name}</h5>
      </div>
    </div>
  );
};

export default WeatherCard;
