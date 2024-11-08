import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js"


ChartJS.register( Tooltip, Legend, ArcElement )

const Piechart = ({ data }) => {


  console.log(data[0],data)
  const pieChartData = {
    labels: [ 'Mobile', 'Laptop', 'Tablet', 'Television' ],
    datasets: [
      {
        label: 'Sales Numbers',
        data: data || [0, 0, 0, 0]  ,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",   
          "rgba(54, 162, 235, 0.8)",   
          "rgba(255, 206, 86, 0.8)",   
          "rgba(124, 188, 75, 0.8)",   
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",     
          "rgba(54, 162, 235, 1)",     
          "rgba(255, 206, 86, 1)",     
          "#5bc04b",    
        ],
        borderWidth: 1.5,
        hoverOffset: 6,                
      },
    ],
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',            
        labels: {
          boxWidth: 20,
          font: {
            size: 14,                 
            weight: 'bold',
          },
          color: '#333',
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const label = pieChartData.labels[tooltipItem.dataIndex];
            const value = pieChartData.datasets[0].data[tooltipItem.dataIndex];
            const total = pieChartData.datasets[0].data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            return `${label}: ${value} (${percentage})`;
          },
        },
        backgroundColor: 'rgba(7, 7, 7, 0.8)',  
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
        padding: 10,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    elements: {
      arc: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
    },
  };
  





  return (

    <Pie data={pieChartData} options={pieChartOptions} />
  )
}

export default Piechart