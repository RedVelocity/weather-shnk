import React, { useEffect, useState } from 'react';
import { getLocation, getWeather } from './API';
import './App.css';

const App = () => {
  const [location, setlocation] = useState('-- Grant Location Access');
  const [weatherData, setweatherData] = useState({
    currently: { apparentTemperature: 0, summary: '--' },
  });
  let theme;
  if (weatherData.currently.apparentTemperature <= 10) theme = 'cold';
  else if (weatherData.currently.apparentTemperature <= 28) theme = 'mild';
  else theme = 'hot';
  const setWeatherState = async (latitude, longitude) => {
    const loc = await getLocation(latitude, longitude);
    const weather = await getWeather(latitude, longitude);
    setlocation(loc);
    setweatherData(weather);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setWeatherState(latitude, longitude);
      });
    }
  }, []);

  return (
    <div
      className={`max-w-md rounded p-4 text-lg font-medium m-auto transition-colors duration-1000 ease-in-out ${theme}`}
    >
      <div className="flex justify-evenly items-center border-b-2 border-black pb-4">
        <img
          alt="icon"
          src="https://img.icons8.com/material-outlined/50/000000/summer.png"
        />
        <h1>{weatherData.currently.summary}</h1>
        <div className="flex flex-col items-center justify-center">
          <h1 className="">Currently</h1>
          <h1 className="text-4xl">
            {Math.round(weatherData.currently.apparentTemperature)}°C
          </h1>
        </div>
      </div>
      <div className="flex items-center pt-4">
        <img
          alt="location"
          src="https://img.icons8.com/material-outlined/24/000000/marker.png"
        />
        <h5 className="text-xs">{location}</h5>
      </div>
    </div>
  );
};

export default App;
