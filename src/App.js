import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import PageLoader from './components/PageLoader/PageLoader'
import { Suspense } from 'react'
import { lazy } from 'react'

const AccountBusiness = lazy(() =>
  import('./pages/Customer/Account/AccountBusiness/AccountBusiness'),
)
const AccountDetails = lazy(() =>
  import('./pages/Customer/Account/AccountDetails/AccountDetails'),
)
const AccountPassword = lazy(() =>
  import('./pages/Customer/Account/AccountPassword/AccountPassword'),
)
const ActiveAlerts = lazy(() =>
  import('./pages/Customer/ActiveAlerts/ActiveAlerts'),
)
const Battery = lazy(() => import('./pages/Customer/Battery/Battery'))
const Business = lazy(() => import('./pages/Customer/Auth/Business/Business'))
const Detail = lazy(() => import('./pages/Customer/Auth/Detail/Detail'))
const DisabledAccount = lazy(() =>
  import('./pages/Customer/Error/DisabledAccount/DisabledAccount'),
)
const ContactError = lazy(() =>
  import('./pages/Customer/Error/ContactError/ContactError'),
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

const Shs = lazy(() => import('./pages/Customer/Shs/Shs'))
const SignIn = lazy(() => import('./pages/Customer/Auth/SignIn/SignIn'))
const SignUp = lazy(() => import('./pages/Customer/Auth/SignUp/SignUp'))
const Support = lazy(() => import('./pages/Customer/Support/Support'))
const Verification = lazy(() =>
  import('./pages/Customer/Auth/Verification/Verification'),
)
const Users = lazy(() => import('./pages/Customer/Users/Users'))
const UserInvitePage = lazy(() =>
  import('./pages/Customer/UserInvite/UserInvite'),
)

// Admin Routes
const AdminAccount = lazy(() =>
  import('./pages/Admin/Account/AccountPassword/AccountPassword'),
)
const AdminActiveAlerts = lazy(() =>
  import('./pages/Admin/ActiveAlert/ActiveAlert'),
)
const AdminPanelAnalytic = lazy(() =>
  import('./pages/Admin/PanelAnalytic/PanelAnalytic'),
)
const AdminBattery = lazy(() =>
  import('./pages/Admin/BatteryAnalytic/BatteryAnalytic'),
)
const AdminEnergyAnalytic = lazy(() =>
  import('./pages/Admin/EnergyAnalytic/EnergyAnalytic'),
)
const AdminCustomer = lazy(() => import('./pages/Admin/Customers/Customers'))
const AdminSupport = lazy(() => import('./pages/Admin/Support/Support'))

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/">
            <Route index element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="verification" element={<Verification />} />
            <Route path="details" element={<Detail />} />
            <Route path="business" element={<Business />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="otp" element={<OTP />} />
            <Route path="new-password" element={<NewPasswordPage />} />
            <Route path="disabled-account" element={<DisabledAccount />} />
            <Route path="contact-error" element={<ContactError />} />
            <Route path="account">
              <Route path="business" element={<AccountBusiness />} />
              <Route index path="details" element={<AccountDetails />} />
              <Route path="password" element={<AccountPassword />} />
            </Route>
            <Route path="overview">
              <Route index element={<Overview />} />
              <Route path="shs/:id" element={<Shs />} />
            </Route>
            <Route path="support" element={<Support />} />
            <Route path="energy-analytic" element={<EnergyAnalytic />} />
            <Route path="panel-analytic" element={<PanelAnalytic />} />
            <Route path="battery-analytic" element={<Battery />} />
            <Route path="active-alerts" element={<ActiveAlerts />} />
            <Route path="users" element={<Users />} />
            <Route path="user-invite" element={<UserInvitePage />} />

            {/* Admin routes */}
            <Route path="admin">
              <Route path="account" element={<AdminAccount />} />
              <Route path="active-alerts" element={<AdminActiveAlerts />} />
              <Route path="panel-analytic" element={<AdminPanelAnalytic />} />
              <Route path="battery-analytic" element={<AdminBattery />} />
              <Route path="energy-analytic" element={<AdminEnergyAnalytic />} />
              <Route path="users" element={<Users />} />
              <Route path="customers" element={<AdminCustomer />} />
              <Route path="support" element={<AdminSupport />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
