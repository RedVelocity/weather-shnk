import React from 'react';
import './App.css';

function App() {
  return (
    <div className="max-w-md rounded bg-gradient-to-r from-yellow-400 to-red-500 p-4 text-lg font-medium">
      <div className="flex justify-around items-center border-b-2 border-black pb-4">
        <img
          alt="icon"
          src="https://img.icons8.com/material-outlined/50/000000/summer.png"
        />
        <h1>Sunny</h1>
        <div className="flex flex-col">
          <h1 className="text-gray-800">Currently</h1>
          <h1 className="text-4xl">30°C</h1>
        </div>
      </div>
      <div className="flex pt-4">
        <img
          alt="location"
          src="https://img.icons8.com/material-outlined/24/000000/marker.png"
        />
        <h5 className="text-sm">Bangalore, Karnataka</h5>
      </div>
    </div>
  );
}

export default App;
