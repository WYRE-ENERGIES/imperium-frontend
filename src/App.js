import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Overview from './pages/Customer/Overview/Overview'
import { Support } from './pages/Customer/Support/Support'
import { Suspense } from 'react'

// Auth dirs
import SignUp from './pages/Customer/Auth/SignUp/SignUp'
import SignIn from './pages/Customer/Auth/SignIn/SignIn'
import Verification from './pages/Customer/Auth/Verification/Verification'
import Detail from './pages/Customer/Auth/Detail/Detail'
import ForgotPasswordPage from './pages/Customer/Auth/ForgotPassword/ForgotPassword'

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
          <Route path="/" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="verification/code" element={<Verification />} />
          <Route path="details" element={<Detail />} />
          <Route path="forgot/password/" element={<ForgotPasswordPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
