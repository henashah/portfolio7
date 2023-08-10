import React, { useState } from 'react';
import './App.css';
import './generateChart.css';
import Axios from 'axios';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AgChartsReact } from 'ag-charts-react';

export default function GenerateChart() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({
    autoSize: true,
    title: {
      text: 'Time Allocation  ',
    },
    subtitle: {
      text: "by urgency and importance of tasks",
    },
    series: [
      {
        type: 'scatter',
        title: 'Task',
        xKey: 'urgency',
        yKey: 'importance',
        sizeKey: 'urgency',
        marker: {
          size: 6,
          maxSize: 30,
          fill: 'rgba(123,145,222,0.71)',
          stroke: '#56659b',
        }
      },
    ],
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: {
          text: 'Urgency',
        },
        label: {
          rotation: 45,
          formatter: (params) => {
            return params.value + ' points';
          },
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Importance',
        },
        label: {
          formatter: (params) => {
            return params.value + ' points';
          },
        },
      },
    ],
    scales: {
        y: {
          beginAtZero: true,
        },
      },
    data: data,
  });

  const getChart = () => {
    Axios.get("/api/chart").then((results) => {
      alert("succesfully retrieved inside getChart function");
      setData(results.data); //not sure if this line of code makes sense
      options.data = results.data;
    });
    return <div classname="chart">
        <AgChartsReact classname='chart' options={options}></AgChartsReact>
        </div>
  }

  return (
    <div className="chart-grid">
      <div>
        <Button variant="contained" sx = {{backgroundColor : '#00A897' }} startIcon={<RefreshIcon/> } onClick={getChart}>Refresh Chart</Button>
      </div>
      {console.log(options.data)}
      {/* <AgChartsReact classname='chart' options={options}></AgChartsReact> */}
    </div>
  );
}
