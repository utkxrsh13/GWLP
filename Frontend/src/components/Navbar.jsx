import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-6 h-20 flex justify-between">
      <div className="font-bold text-3xl">Aqua<span className='text-green-400'>vision</span></div>
      <div className="space-x-20 etxt2xl font-semibold mt-2 mx-2">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/map" className="hover:underline">Map</Link>
        <Link to="/predict" className="hover:underline">Predict</Link>
      </div>
    </nav>
  );
};


export default Navbar