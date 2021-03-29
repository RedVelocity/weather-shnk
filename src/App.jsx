import React from 'react';
import './App.css';
import WeatherChart from './components/WeatherChart';
import SearchCard from './components/SearchCard';
import WeatherCard from './components/WeatherCard';
import { LocationProvider } from './context/locationProvider';
import { WeatherProvider } from './context/weatherProvider';

const App = () => {
  return (
    <LocationProvider>
      <WeatherProvider>
        <header className="p-4 mb-4 text-xl font-bold text-gray-100 bg-gray-500 shadow">
          <a href="https://shnk.tech">SHNK.TECH</a>
        </header>
        <div className="flex-1 w-full max-w-screen-lg m-auto">
          <div className="grid gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
            <SearchCard />
            <WeatherCard />
            <div className="max-w-md p-4 bg-gray-300 rounded shadow md:col-start-2 md:row-span-2 md:col-span-2 md:row-start-1 lg:max-w-full">
              <WeatherChart />
            </div>
          </div>
        </div>
        <div className="p-4 mt-4 text-gray-100 bg-gray-500 shadow">
          <div className="flex justify-between text-xs">
            <span>
              Icons made by
              <a
                className="text-blue-300"
                href="https://www.freepik.com"
                title="Freepik"
              >
                {' '}
                Freepik{' '}
              </a>
              from
              <a
                className="text-blue-300"
                href="https://www.flaticon.com/"
                title="Flaticon"
              >
                {' '}
                www.flaticon.com
              </a>
            </span>
            <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
          </div>
        </div>
      </WeatherProvider>
    </LocationProvider>
  );
};

export default App;
