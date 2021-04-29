import React from 'react';
import WeatherChart from '../components/WeatherChart';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import SearchCard from '../components/SearchCard';

const WeatherPage = () => {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-3">
      <SearchCard />
      <WeatherCard />
      <div className="p-4 text-gray-200 shadow rounded-xl bg-dark md:col-start-2 md:row-span-2 md:col-span-2 md:row-start-1">
        <WeatherChart />
      </div>
      <div className="md:col-span-3">
        <WeatherMap />
      </div>
    </div>
  );
};

export default WeatherPage;