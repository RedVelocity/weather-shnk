import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Low',
      data: [13, 15, 18, 11, 14, 15, 13],
      fill: true,
      backgroundColor: '#BFDBFE',
      borderColor: '#312E81',
    },
    {
      label: 'Average',
      data: [33, 25, 35, 31, 34, 26, 25],
      fill: true,
      backgroundColor: '#FBBF24',
      //   borderColor: '#00000',
    },
    {
      label: 'High',
      data: [43, 53, 85, 41, 44, 65, 63],
      fill: true,
      backgroundColor: '#EF4444',
      //   borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    labels: {
      fontColor: 'white',
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          fontColor: 'white',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'white',
        },
      },
    ],
  },
};

const MultiAxisLine = () => (
  <>
    <Line className="h-full" height={125} data={data} options={options} />
  </>
);

export default MultiAxisLine;
