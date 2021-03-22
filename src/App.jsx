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
        <div className="grid gap-4 m-4 md:grid-cols-2 lg:grid-cols-3">
          <SearchCard />
          <WeatherCard />
          <div className="max-w-md p-4 bg-pink-400 rounded shadow md:col-start-2 md:row-span-2 md:col-span-2 md:row-start-1 lg:max-w-full">
            <WeatherChart />
          </div>
        </div>
      </WeatherProvider>
    </LocationProvider>
  );
};

export default App;
