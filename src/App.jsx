import React, { useEffect, useState } from 'react';
import { getLocation, getSuggestions, getWeather } from './API';
import './App.css';
import useDebounce from './hooks/useDebounce';

const App = () => {
  const [location, setLocation] = useState('-- Grant Location Access');
  const [weatherData, setWeatherData] = useState({
    currently: { apparentTemperature: 0, summary: '--' },
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
        setShowSuggestions(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleInputChange = async (e) => {
    setLocation(e.target.innerText);
    setShowSuggestions(false);
    const loc = suggestions.find((suggestion) => suggestion.id === e.target.id);
    const weather = await getWeather(
      loc.geometry.coordinates[1],
      loc.geometry.coordinates[0]
    );
    setWeatherData(weather);
  };

  return (
    <>
      <div className="max-w-md rounded p-4 bg-gray-300 mb-4 shadow">
        <h1 className="text-xl font-medium">Search</h1>
        <div className="relative mt-4">
          <input
            className="rounded focus:outline-none focus:ring w-full p-1"
            type="text"
            placeholder="Enter Place Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            // onBlur={() => setShowSuggestions(false)}
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
        className={`max-w-md rounded shadow p-4 text-lg font-medium transition-colors duration-1000 ease-in-out ${theme}`}
      >
        <div className="flex justify-evenly items-center border-b-2 border-black pb-4">
          <img
            alt="icon"
            src="https://img.icons8.com/material-outlined/50/000000/summer.png"
          />
          <h1 className="text-xl">{weatherData.currently.summary}</h1>
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
    </>
  );
};

export default App;
