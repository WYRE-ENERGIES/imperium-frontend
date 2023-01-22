import './App.css'
import 'antd/dist/reset.css'

import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Business from './pages/Customer/Auth/Business'
import Details from './pages/Customer/Auth/Details'
import Signup from './pages/Customer/Auth/Signup'
// import Overview from './pages/Customer/Overview/Overview'
import Verification from './pages/Customer/Auth/Verification'
function App() {
  return (
    <Router>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification/code" element={<Verification />} />
          <Route path="/details" element={<Details />} />
          <Route path="/business" element={<Business />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
