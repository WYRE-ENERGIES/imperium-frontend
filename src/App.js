import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Detail from './pages/Customer/Auth/Detail/Detail'
import EnergyAnalytic from './pages/Customer/EnergyAnalytic/EnergyAnalytic'
import ForgotPasswordPage from './pages/Customer/Auth/ForgotPassword/ForgotPassword'
import Overview from './pages/Customer/Overview/Overview'
import SignIn from './pages/Customer/Auth/SignIn/SignIn'
import SignUp from './pages/Customer/Auth/SignUp/SignUp'
import { Support } from './pages/Customer/Support/Support'
import { Suspense } from 'react'
import Verification from './pages/Customer/Auth/Verification/Verification'

function App() {
  return (
    <Router>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/">
            <Route index element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="verification" element={<Verification />} />
            <Route path="details" element={<Detail />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="overview">
              <Route index element={<Overview />} />
              <Route path="shs/:id" element={<Support />} />
            </Route>
            <Route path="support" element={<Support />} />
            <Route path="energy-analytic" element={<EnergyAnalytic />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
