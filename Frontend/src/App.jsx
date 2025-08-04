import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MapView from './pages/MapView'
import PredictionForm from './pages/PredictionForm'
import PredictionResult from './pages/PredictionResult'
import Navbar from './components/Navbar'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'

const App = () => {
  return (
    <>
      <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/result" element={<PredictionResult />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
    </Routes>
    
    </>
  )
}

export default App