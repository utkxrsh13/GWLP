import React from 'react'
import { Link } from 'react-router-dom';
// import {Button} from '@mui/material';\
import Button from '../components/ui/Button';
import Button2 from '../components/ui/Button2';
import Charts from '../components/Charts';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Pattern from '../components/ui/Pattern';
import { lime, purple } from '@mui/material/colors';

const chartData = [
  { date: "2024-01", groundwater_level: 12.5 },
  { date: "2024-02", groundwater_level: 12.2 },
  { date: "2024-03", groundwater_level: 11.9 },
  // ...
];

const HomePage = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden">

  {/* Background Pattern */}
  <div className="absolute inset-0 z-0">
    <Pattern />
  </div>

  {/* Lottie Animation - Positioned on the right */}
  <div className=''>
  <div className="absolute right-0 ml-20 top-10 h-[80%] z-10 -mr-64">
    <DotLottieReact
      src="https://lottie.host/d93fcd7a-59ec-4f9a-931e-6d55c1f22476/IaQtMVOV3I.lottie"
      loop
      autoplay
    />
  </div>

  {/* Foreground Content */}
  <div className="relative z-20 mt-20 ml-10 text-left">
    <h1 className="text-8xl font-bold mb-4 max-w-xl leading-[1.2]">
      Groundwater <span className='text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.9)] animate-pulse'>Level</span> Monitoring
    </h1>
    <p className="mb-6 mt-8 text-lg max-w-2xl">
      Analyze and forecast groundwater levels across India using historical data and AI models. 
      Select a location on the map, input environmental factors, and get precise groundwater predictions.
    </p>
    <div className="space-x-4 flex">
      <Link to="/map"><Button /></Link>
      <Link to="/predict"><Button2 name="Make Prediction" /></Link>
    </div>
  </div>
  </div>
</div>

  );
};


export default HomePage