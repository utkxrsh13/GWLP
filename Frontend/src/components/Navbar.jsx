import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <div className="font-bold text-lg">Groundwater App</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/map" className="hover:underline">Map</Link>
        <Link to="/predict" className="hover:underline">Predict</Link>
      </div>
    </nav>
  );
};


export default Navbar