import React, { useEffect, useState } from 'react';
import { getLocation, getSuggestions, getWeather } from './API';
import './App.css';
import weatherIcons from './assets/svg/weatherIcons';
import useDebounce from './hooks/useDebounce';

const App = () => {
  const [location, setLocation] = useState('-- Grant Location Access');
  const [weatherData, setWeatherData] = useState({
    currently: { apparentTemperature: 0, summary: '--', icon: 'clear-day' },
  });
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  let theme;
  if (weatherData.currently.apparentTemperature <= 10) theme = 'cold';
  else if (weatherData.currently.apparentTemperature <= 28) theme = 'mild';
  else theme = 'hot';

  const setWeatherState = async (latitude, longitude) => {
    const loc = await getLocation(latitude, longitude);
    const weather = await getWeather(latitude, longitude);
    setLocation(loc);
    setWeatherData(weather);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setWeatherState(latitude, longitude);
      });
    }
  }, []);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        const handleSearch = async () => {
          const features = await getSuggestions(
            null,
            null,
            debouncedSearchTerm
          );
          setSuggestions(features);
        };
        handleSearch();
      } else {
        setSuggestions([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleInputChange = async (e) => {
    setShowSuggestions(false);
    setLocation(e.target.innerText);
    const loc = suggestions.find((suggestion) => suggestion.id === e.target.id);
    const weather = await getWeather(
      loc.geometry.coordinates[1],
      loc.geometry.coordinates[0]
    );
    setWeatherData(weather);
  };

  return (
    <div className="grid gap-4 m-4 lg:grid-cols-3 items-center">
      <div className="max-w-md rounded p-4 bg-gray-700 shadow">
        <h1 className="text-xl font-medium text-gray-100">Search</h1>
        <div className="relative mt-4">
          <input
            className="rounded focus:outline-none focus:ring focus:ring-blue-400 w-full p-1"
            type="text"
            placeholder="Enter Place Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
          {suggestions.length > 0 && (
            <div
              className={`absolute transition duration-300 bg-white w-full rounded shadow p-4 mt-2 z-10 ${
                !showSuggestions && 'opacity-0 invisible'
              }`}
            >
              <ul className="overflow-x-hidden max-h-48">
                {suggestions.map((suggestion) => (
                  <li
                    className={`hover-${theme} cursor-pointer p-2 rounded`}
                    key={suggestion.id}
                    id={suggestion.id}
                    onClick={handleInputChange}
                  >
                    {suggestion.place_name_en}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div
        className={`max-w-md lg:col-start-1 rounded shadow p-4 text-lg font-medium transition-colors duration-1000 ease-in-out ${theme}`}
      >
        <div className="flex justify-between items-center gap-6 text-center border-b-2 border-black pb-4">
          <img
            className="h-20 w-20"
            alt="icon"
            src={weatherIcons[weatherData.currently.icon.replaceAll('-', '_')]}
          />
          <h1 className="text-2xl">{weatherData.currently.summary}</h1>
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
      <div className="rounded shadow overflow-hidden lg:col-start-2 lg:row-span-2 lg:col-span-2 lg:row-start-1 h-72 lg:max-w-full max-w-md">
        <img
          // className="h-full w-full"
          src="https://cdn.theatlantic.com/thumbor/XFmbOxPnb_Pmkbz5hwoBPzMmrNo=/900x599/media/img/photo/2016/10/2016-national-geographic-nature-pho/n01_479708-8955001/original.jpg"
          alt="hippo"
        />
      </div>
    </div>
  );
};

export default App;
