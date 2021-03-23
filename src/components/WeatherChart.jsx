import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { WeatherContext } from '../context/weatherProvider';
import dayjs from 'dayjs';

const options = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    labels: {
      fontColor: 'black',
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
          fontColor: 'black',
          fontFamily: ['Montserrat', 'sans-serif'],
          fontSize: 14,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'black',
          fontFamily: ['Montserrat', 'sans-serif'],
          fontSize: 14,
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
  weatherData.daily?.data.forEach((daily) => {
    labels.push(dayjs.unix(daily.time).format('dd-DD'));
    low.push(Math.round(daily.apparentTemperatureLow));
    average.push(
      Math.round(
        (daily.apparentTemperatureHigh + daily.apparentTemperatureLow) / 2
      )
    );
    high.push(Math.round(daily.apparentTemperatureHigh));
  });
  const data = {
    labels,
    datasets: [
      {
        label: 'Low',
        data: low,
        fill: true,
        backgroundColor: '#BFDBFE',
        borderColor: 'rgba(60,60,60,1)',
        borderWidth: 1,
      },
      {
        label: 'Average',
        data: average,
        fill: true,
        backgroundColor: '#FBBF24',
        borderColor: 'rgba(60,60,60,1)',
        borderWidth: 1,
      },
      {
        label: 'High',
        data: high,
        fill: true,
        backgroundColor: '#B8000D',
        borderColor: 'rgba(60,60,60,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h1 className="mb-4 text-xl font-medium">{weatherData.daily?.summary}</h1>
      <Line height={120} data={data} options={options} />
    </>
  );
};

export default WeatherChart;
