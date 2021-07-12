import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { formatNumberLength } from "../Utils";

const genericOptions = {
  fill: false,
  interaction: {
    intersect: false,
  },
  radius: 0,
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        minRotation: 0,
        callback: function(val, index) {
          let date = this.getLabelForValue(val);

          let hours = date.getHours();
          let minutes = date.getMinutes();
        
          
          let prevDate = this.getLabelForValue(Math.max(0, val - 24));
          let datef = `${formatNumberLength(hours, 2)}:${formatNumberLength(minutes, 2)}`;
          if (prevDate.getDay() !== date.getDay()) {
            datef = date.toLocaleDateString();
          }

          return datef;
        }
      }
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: function(tooltipItems, data) {
          let label = tooltipItems[0].label;
          let date = new Date(Date.parse(label));
          return date.toLocaleString();
        }
      }
    }
  }
};

const state = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "$",
      backgroundColor: "rgba(100,0,255,1)",
      borderColor: "rgba(100,0,255,1)",
      borderWidth: 3,
      tension: 0.5,
      data: [36680, 30436, 46035, 46234, 47543],
    },
  ],
};

const CoinGraph = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coinstats.app/public/v1/charts?period=24h&coinId=bitcoin"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(data);

    if (data.chart) {
      state.labels = [];
      state.datasets[0].data = [];

      let step = 1;
      for (let i = data.chart.length % step; i < data.chart.length; i += step) {
        let point = data.chart[i];

        let price = point[1];

        let date = new Date(point[0] * 1000);
        // let datef = `${date.toLocaleString()}`;

        state.datasets[0].data.push(price);
        state.labels.push(date);
      }

      return (
        <div>
          <Line data={state} options={genericOptions} />
        </div>
      );
    }
    return <div>no data...</div>;
  }
};

export default CoinGraph;
