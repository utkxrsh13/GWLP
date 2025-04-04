import React from 'react'
import { Link } from 'react-router-dom';
// import {Button} from '@mui/material';\
import Button from '../components/ui/Button';
import Button2 from '../components/ui/Button2';
import Charts from '../components/Charts';

const chartData = [
  { date: "2024-01", groundwater_level: 12.5 },
  { date: "2024-02", groundwater_level: 12.2 },
  { date: "2024-03", groundwater_level: 11.9 },
  // ...
];

const HomePage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Groundwater Level Monitoring</h1>
      <p className="mb-6 text-lg max-w-2xl mx-auto">
        Analyze and forecast groundwater levels across India using historical data and AI models. 
        Select a location on the map, input environmental factors, and get precise groundwater predictions.
      </p>
      <div className="space-x-4">
        <Link to="/map"><Button name={"Select Location"}/></Link>
        <Link to="/predict"><Button2 /></Link>
      </div>
      <Charts data={chartData} />
    </div>
  );
};


export default HomePage