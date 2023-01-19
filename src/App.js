import './App.css'
import 'antd/dist/reset.css'

import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Overview from './pages/Customer/Overview/Overview'

function App() {
  return (
    <Router>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
