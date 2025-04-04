import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MapView from './pages/MapView'
import PredictionForm from './pages/PredictionForm'
import PredictionResult from './pages/PredictionResult'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/result" element={<PredictionResult />} />
    </Routes>
    
    </>
  )
}

export default App