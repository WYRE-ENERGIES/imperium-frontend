import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AccountBusiness from './pages/Customer/Account/AccountBusiness/AccountBusiness'
import AccountDetails from './pages/Customer/Account/AccountDetails/AccountDetails'
import AccountPassword from './pages/Customer/Account/AccountPassword/AccountPassword'
import Battery from './pages/Customer/Battery/Battery'
import Business from './pages/Customer/Auth/Business/Business'
import Detail from './pages/Customer/Auth/Detail/Detail'
import DisabledAccount from './pages/Customer/Error/DisabledAccount/DisabledAccount'
import ErrorContact from './pages/Customer/Error/ErrorContact/ErrorContact'
import EnergyAnalytic from './pages/Customer/EnergyAnalytic/EnergyAnalytic'
import ForgotPasswordPage from './pages/Customer/Auth/ForgotPassword/ForgotPassword'
import NewPasswordPage from './pages/Customer/Auth/NewPassword/Newpassword'
import OTP from './pages/Customer/Auth/Otp/Otp'
import Overview from './pages/Customer/Overview/Overview'
import PanelAnalytic from './pages/Customer/PanelAnalytic/PanelAnalytic'
import SignIn from './pages/Customer/Auth/SignIn/SignIn'
import SignUp from './pages/Customer/Auth/SignUp/SignUp'
import Support from './pages/Customer/Support/Support'
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
            <Route path="business" element={<Business />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="otp" element={<OTP />} />
            <Route path="new-password" element={<NewPasswordPage />} />
            <Route path="disabled-account" element={<DisabledAccount />} />
            <Route path="contact-error" element={<ErrorContact />} />
            <Route path="account">
              <Route index path="details" element={<AccountDetails />} />
              <Route path="password" element={<AccountPassword />} />
              <Route path="business" element={<AccountBusiness />} />
            </Route>
            <Route path="overview">
              <Route index element={<Overview />} />
              <Route path="shs/:id" element={<Support />} />
            </Route>
            <Route path="support" element={<Support />} />
            <Route path="energy-analytic" element={<EnergyAnalytic />} />
            <Route path="panel-analytic" element={<PanelAnalytic />} />
            <Route path="battery" element={<Battery />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
