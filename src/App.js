import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import EnergyAnalytic from './pages/Customer/EnergyAnalytic/EnergyAnalytic'
import Overview from './pages/Customer/Overview/Overview'
import { Support } from './pages/Customer/Support/Support'
import { Suspense } from 'react'

function App() {
  return (
    <Router>
      <Suspense fallback="loading">
        <Routes>
          <Route path="overview">
            <Route index element={<Overview />} />
            <Route path="shs/:id" element={<Support />} />
          </Route>
          <Route path="/support" element={<Support />} />
          <Route path="/energy-analytic" element={<EnergyAnalytic />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
