import React, { createContext, useState } from 'react';

const WeatherContext = createContext(undefined);

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({
    daily: [],
  });

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };
