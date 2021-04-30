import React, { useContext, useEffect } from 'react';
import weatherIcons from '../assets/svg/weatherIcons';
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
        setLocation({
          name: locationName,
          latitude,
          longitude,
          curLat: latitude,
          curLon: longitude,
        });
        weather !== 0 && setWeatherData(weather);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(`weatherData`, weatherData);

  return (
    <div
      className={`grid md:col-start-1 rounded-xl shadow p-4 font-semibold transition-colors duration-1000 ease-in-out ${theme}`}
    >
      <div className="flex items-center gap-6 p-4 text-center justify-evenly">
        <img
          className="w-20 h-20"
          alt="icon"
          src={weatherIcons[weatherData.current.weather[0].icon]}
        />
        <h1 className="text-2xl font-bold capitalize">
          {weatherData.current.weather[0].description}
        </h1>
        <div>
          Currently
          <h1 className="text-4xl">{Math.round(weatherData.current.temp)}°C</h1>
        </div>
      </div>{' '}
      <span className="p-2 tracking-widest border-b-2 border-black">
        Feels Like: {Math.round(weatherData.current.feels_like)}°C | Humidity:{' '}
        {weatherData.current.humidity} | UV: {weatherData.current.uvi}
      </span>
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
