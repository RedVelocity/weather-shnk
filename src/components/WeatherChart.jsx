import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { WeatherContext } from '../context/weatherProvider';
import dayjs from 'dayjs';

const options = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    display: false,
    labels: {
      // fontColor: 'black',
      fontFamily: ['Montserrat', 'sans-serif'],
    },
    position: 'bottom',
  },
  // title: {
  //   display: true,
  //   text: 'Through the Week',
  //   fontSize: 16,
  //   fontColor: 'black',
  // },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'lightgray',
          fontFamily: ['Montserrat', 'sans-serif'],
          fontSize: 13,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'lightgray',
          fontFamily: ['Montserrat', 'sans-serif'],
          fontSize: 13,
          stepSize: 5,
          callback: (tick, index, values) =>
            index === values.length - 1 ? '' : tick,
        },
      },
    ],
  },
};

const WeatherChart = () => {
  const { weatherData } = useContext(WeatherContext);
  const labels = [],
    low = [],
    average = [],
    high = [];
  weatherData.daily?.forEach((daily) => {
    labels.push(dayjs.unix(daily.dt).format('dd-DD'));
    low.push(Math.round(daily.feels_like.night));
    average.push(
      Math.round((daily.feels_like.day + daily.feels_like.night) / 2)
    );
    high.push(Math.round(daily.feels_like.day));
  });
  const data = {
    labels,
    datasets: [
      {
        label: 'Low',
        data: low,
        fill: false,
        borderColor: getComputedStyle(document.body).getPropertyValue('--cool'),
        // borderColor: 'rgba(60,60,60,1)',
        borderWidth: 3,
      },
      {
        label: 'Average',
        data: average,
        fill: false,
        borderColor: getComputedStyle(document.body).getPropertyValue('--mild'),
        // borderColor: 'rgba(60,60,60,1)',
        borderWidth: 3,
      },
      {
        label: 'High',
        data: high,
        fill: false,
        borderColor: getComputedStyle(document.body).getPropertyValue('--hot'),
        // borderColor: 'rgba(60,60,60,1)',
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-full px-6 py-4 text-gray-200 card justify-evenly bg-dark">
      <h1 className="mb-4 text-xl font-semibold tracking-wide capitalize">
        {weatherData.daily[0] &&
          weatherData.daily[0].weather[0].description +
            ' on ' +
            dayjs.unix(weatherData.daily[0].dt).format('dddd')}
      </h1>
      <Line height={100} data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
