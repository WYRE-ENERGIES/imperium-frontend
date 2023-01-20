import './App.css'
import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Overview from './pages/Customer/Overview/Overview'
import { Support } from './pages/Customer/Support/Support'

function App() {
  return (
    <Router>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
