import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageDashbord from './pages/imageupload'
import IdCard from './pages/idcard'

function App() {


  return (
    <>
     <Router>
      <div className="App">
        <Routes>
          <Route path="/image-upload" element={<ImageDashbord />} />
          <Route path="/id-card" element={<IdCard />} />
        </Routes>
      </div>
    </Router>
     
    </>
  )
}

export default App
