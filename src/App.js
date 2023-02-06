import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Suspense } from 'react'
import { lazy } from 'react'

const AccountDetails = lazy(() =>
  import('./pages/Customer/Account/AccountBusiness/AccountBusiness'),
)
const Battery = lazy(() => import('./pages/Customer/Battery/Battery'))
const Business = lazy(() => import('./pages/Customer/Auth/Business/Business'))
const Detail = lazy(() => import('./pages/Customer/Auth/Detail/Detail'))
const DisabledAccount = lazy(() =>
  import('./pages/Customer/Error/DisabledAccount/DisabledAccount'),
)
const ErrorContact = lazy(() =>
  import('./pages/Customer/Error/ErrorContact/ErrorContact'),
)
const EnergyAnalytic = lazy(() =>
  import('./pages/Customer/EnergyAnalytic/EnergyAnalytic'),
)
const ForgotPasswordPage = lazy(() =>
  import('./pages/Customer/Auth/ForgotPassword/ForgotPassword'),
)
const NewPasswordPage = lazy(() =>
  import('./pages/Customer/Auth/NewPassword/Newpassword'),
)
const OTP = lazy(() => import('./pages/Customer/Auth/Otp/Otp'))
const Overview = lazy(() => import('./pages/Customer/Overview/Overview'))
const PanelAnalytic = lazy(() =>
  import('./pages/Customer/PanelAnalytic/PanelAnalytic'),
)
const SignIn = lazy(() => import('./pages/Customer/Auth/SignIn/SignIn'))
const SignUp = lazy(() => import('./pages/Customer/Auth/SignUp/SignUp'))
const Support = lazy(() => import('./pages/Customer/Support/Support'))
const Verification = lazy(() =>
  import('./pages/Customer/Auth/Verification/Verification'),
)

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
              {/* <Route path="business" element={<AccountBusiness />} />
              <Route path="password" element={<AccountPassword />} /> */}
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
