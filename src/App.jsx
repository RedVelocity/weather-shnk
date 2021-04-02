import React from 'react';
import WeatherChart from './components/WeatherChart';
import SearchCard from './components/SearchCard';
import WeatherCard from './components/WeatherCard';
import WeatherMap from './components/WeatherMap';
import { LocationProvider } from './context/locationProvider';
import { WeatherProvider } from './context/weatherProvider';

import './App.css';

const App = () => {
  return (
    <LocationProvider>
      <WeatherProvider>
        <header className="p-4 text-2xl font-bold bg-blue-300 shadow">
          <div className="max-w-screen-lg m-auto">
            <a href="https://shnk.tech">SHNK.TECH</a>
          </div>
        </header>
        <div className="flex-1 w-full max-w-screen-lg mx-auto">
          <div className="grid gap-4 p-4 md:grid-cols-3">
            <SearchCard />
            <WeatherCard />
            <div className="p-4 bg-gray-300 rounded shadow md:col-start-2 md:row-span-2 md:col-span-2 md:row-start-1">
              <WeatherChart />
            </div>
            <div className="md:col-span-3">
              <WeatherMap />
            </div>
          </div>
        </div>
        <footer className="p-4 font-semibold bg-blue-300 shadow ">
          <div className="max-w-screen-lg m-auto">
            <a href="https://openweathermap.org/">Powered by OpenWeather</a>
          </div>
        </footer>
      </WeatherProvider>
    </LocationProvider>
  );
};

export default App;
