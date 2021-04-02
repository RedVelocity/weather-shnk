import React, { useContext, useEffect } from 'react';
// import weatherIcons from '../assets/svg/weatherIcons';
import { WeatherContext } from '../context/weatherProvider';
import { getLocation, getWeather } from '../API';
import { LocationContext } from '../context/locationProvider';

const WeatherCard = () => {
  const { weatherData, setWeatherData } = useContext(WeatherContext);

  let theme;
  if (weatherData.current.feels_like <= 15) theme = 'cold';
  else if (weatherData.current.feels_like <= 28) theme = 'mild';
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
      className={`grid md:col-start-1 text-sm rounded shadow p-4 font-semibold transition-colors duration-1000 ease-in-out ${theme}`}
    >
      <div className="flex items-center gap-6 pb-2 text-center border-b-2 border-black justify-evenly">
        <img
          className="w-16 h-16"
          alt="icon"
          src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`}
        />
        <h1 className="text-2xl font-bold capitalize md:text-xl">
          {weatherData.current.weather[0].description}
        </h1>
        <div className="flex flex-col items-center justify-center">
          <h1 className="">Currently</h1>
          <h1 className="text-4xl">
            {Math.round(weatherData.current.feels_like)}°C
          </h1>
        </div>
      </div>
      <div className="flex items-center pt-2 space-x-1">
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
