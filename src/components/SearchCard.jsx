import React, { useContext, useEffect, useState } from 'react';
import { getSuggestions, getWeather } from '../API';
import { LocationContext } from '../context/locationProvider';
import { WeatherContext } from '../context/weatherProvider';
import useDebounce from '../hooks/useDebounce';
const SearchCard = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { weatherData, setWeatherData } = useContext(WeatherContext);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const { setLocation } = useContext(LocationContext);
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  let theme;
  if (weatherData.currently.apparentTemperature <= 15) theme = 'cold';
  else if (weatherData.currently.apparentTemperature <= 28) theme = 'mild';
  else theme = 'hot';

  useEffect(
    () => {
      console.log(`debounce`);
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
    console.log(`handle`);
    const loc = suggestions.find((suggestion) => suggestion.id === e.target.id);
    setLocation({
      name: e.target.innerText,
      latitude: loc.geometry.coordinates[1],
      longitude: loc.geometry.coordinates[0],
    });
    setShowSuggestions(false);
    const weather = await getWeather(
      loc.geometry.coordinates[1],
      loc.geometry.coordinates[0]
    );
    weather !== 0 && setWeatherData(weather);
  };

  return (
    <div className="max-w-md p-4 bg-gray-600 rounded shadow">
      <h1 className="text-xl font-medium text-gray-100">Search</h1>
      <div className="relative mt-4">
        <input
          className="w-full px-2 py-1 bg-gray-100 rounded focus:outline-none focus:ring focus:ring-blue-400"
          type="text"
          placeholder="Place Name"
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
                  className={`hover-${theme} cursor-pointer px-2 py-1 rounded mx-1 text-sm`}
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
  );
};

export default SearchCard;
