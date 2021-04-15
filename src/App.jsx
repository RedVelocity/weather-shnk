import React from 'react';
import { LocationProvider } from './context/locationProvider';
import { WeatherProvider } from './context/weatherProvider';
import WeatherPage from './pages/weather';

import './App.css';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
  return (
    <LocationProvider>
      <WeatherProvider>
        <Header />
        <div className="flex-1 w-full max-w-screen-lg mx-auto">
          <WeatherPage />
        </div>
        <Footer />
      </WeatherProvider>
    </LocationProvider>
  );
};

export default App;
