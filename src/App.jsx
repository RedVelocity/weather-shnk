import React, { useEffect, useState } from 'react';
import { getLocation, getWeather } from './API';
import './App.css';

const App = () => {
  const [location, setlocation] = useState('-- Grant Location Access');
  const [weatherData, setweatherData] = useState({
    currently: { apparentTemperature: 0, summary: '--' },
  });
  const setWeatherState = async (latitude, longitude) => {
    const loc = await getLocation(latitude, longitude);
    const weather = await getWeather(latitude, longitude);
    setlocation(loc);
    setweatherData(weather);
  };
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setWeatherState(latitude, longitude);
      });
    } else {
      setWeatherState(47.6062, 122.3321);
    }
  }, []);

  const cold = weatherData.currently.apparentTemperature <= 10;
  let theme;
  if (cold) {
    theme = 'bg-gradient-to-r from-indigo-300 to-pink-300 text-indigo-900';
  } else {
    theme = 'bg-gradient-to-r from-yellow-400 to-red-500';
  }

  return (
    <div className={`max-w-md rounded ${theme} p-4 text-lg font-medium m-auto`}>
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
      <div className="flex pt-4 items-center">
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
