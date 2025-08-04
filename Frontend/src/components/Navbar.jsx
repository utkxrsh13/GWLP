import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-6 h-20 flex justify-between items-center">
      <div className="font-bold text-3xl">Aqua<span className='text-green-400'>vision</span></div>
      
      <div className="space-x-10 text-xl font-semibold flex items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/map" className="hover:underline">Map</Link>
        <Link to="/predict" className="hover:underline">Predict</Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="hover:underline text-red-300">Logout</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
