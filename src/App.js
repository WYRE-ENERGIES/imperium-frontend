import './App.css'
import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Overview from './pages/Customer/Overview/Overview'
import { Support } from './pages/Customer/Support/Support'
import { Suspense } from 'react'

function App() {
  return (
    <Router>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
