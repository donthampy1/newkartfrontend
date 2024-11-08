import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Linechart = ({ data , category }) => {


console.log(data)
let linedata = {};

(data && data.length) ? data.reduce((result, order) => {
    const date = new Date(order.createdAt);

    if (isNaN(date.getTime())) {
        return result; 
    }

    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const weekKey = startOfWeek.toISOString().split('T')[0];

    if (!linedata[weekKey]) {
        linedata[weekKey] = 0;
    }

    const orderTotalPrice = order.products.reduce((sum, product) => {
        return sum + (product.productPrice * product.quantity);
    }, 0);

    linedata[weekKey] += orderTotalPrice;

   
},null): {}

console.log(Object.values(linedata));

console.log(Object.keys(linedata));





const lineChartData = {
    labels: Object.keys(linedata),
    datasets: [
      {
        label: '',
        data: Object.values(linedata),
        
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4, 
        pointRadius: 5, 
        pointHoverRadius: 7, 
        borderWidth: 2, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false 
      }
    },
   
    scales: {
      x: {
        grid: {
          color: 'rgba(75,192,192,0.2)', 
        },
      },
      y: {
        grid: {
          color: 'rgba(75,192,192,0.2)',
        },
      },
    },
  };

  return (
    
      <Line data={lineChartData} options={options} />
   
  );
};

export default Linechart;
