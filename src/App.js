import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import { ErrorBoundary } from 'react-error-boundary'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import PageLoader from './components/PageLoader/PageLoader'
import { Suspense } from 'react'
import { lazy } from 'react'
import Fallback from './components/ErrorBoundary/errorBoundary'

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
const ErroPage = lazy(() =>
  import('../src/components/Error/DisabledAccount/ErrorPage'),
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

const CustomerShsDetails = lazy(() =>
  import('./pages/Customer/CustomerShs/Shs'),
)
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
const AdminActiveAlert = lazy(() =>
  import('./pages/Admin/ActiveAlert/ActiveAlerts/ActiveAlert'),
)
const AdminActiveAlertCreated = lazy(() =>
  import('./pages/Admin/ActiveAlert/CreatedAlerts/CreatedAlerts'),
)
const AdminActiveAlertLocation = lazy(() =>
  import('./pages/Admin/ActiveAlert/LocationAlerts/LocationAlerts'),
)

const AdminForgotPassword = lazy(() =>
  import('./pages/Admin/Auth/ForgotPassword/AdminForgotPassword'),
)
const AdminOtp = lazy(() => import('./pages/Admin/Auth/Otp/AdminOtp'))
const AdminResetPassword = lazy(() =>
  import('./pages/Admin/Auth/ResetPassword/AdminResetPassword'),
)

const AdminSignIn = lazy(() => import('./pages/Admin/Auth/SignIn/AdminSignIn'))
const AdminSignUp = lazy(() => import('./pages/Admin/Auth/SignUp/AdminSignUp'))

const AdminAccount = lazy(() =>
  import('./pages/Admin/Account/AccountPassword/AccountPassword'),
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
const AdminCustomers = lazy(() => import('./pages/Admin/Customers/Customers'))
const AdminSupport = lazy(() => import('./pages/Admin/Support/Support'))
const AdminCustomer = lazy(() =>
  import('./pages/Admin/Customers/Customer/Customer'),
)
const AdminShsDetails = lazy(() => import('./pages/Admin/ShsDevice/ShsDevice'))
const AdminSHS = lazy(() => import('./pages/Admin/SHS/SHS'))
const AdminOverview = lazy(() => import('./pages/Admin/Overview/Overview'))
const AdminVoltageCurrent = lazy(() =>
  import('./pages/Admin/VoltageCurrent/VoltageCurrent'),
)

const AdminUsers = lazy(() => import('./pages/Admin/Users/Users'))
const AdminUserInvitePage = lazy(() =>
  import('./pages/Admin/UserInvite/UserInvite'),
)
const UserAuditLog = lazy(() => import('./pages/Admin/AuditLog/UserAuditLog'))

const PrivateRoute = lazy(() => import('./utils/PrivateRoute'))
const USER_ROLE = {
  accessOne: 'admin',
  accessTwo: 'client',
}
function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <ErrorBoundary
          FallbackComponent={Fallback}
          onReset={(details) => {
            window.location.reload()
          }}
        >
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

              <Route path="contact-error" element={<ContactError />} />
              <Route element={<PrivateRoute pathTo={USER_ROLE.accessTwo} />}>
                <Route path="account">
                  <Route path="business" element={<AccountBusiness />} />
                  <Route index path="details" element={<AccountDetails />} />
                  <Route path="password" element={<AccountPassword />} />
                </Route>
                <Route path="overview">
                  <Route index element={<Overview />} />
                  <Route path="shs/:id" element={<CustomerShsDetails />} />
                </Route>
                <Route path="support" element={<Support />} />
                <Route path="energy-analytic" element={<EnergyAnalytic />} />
                <Route path="panel-analytic" element={<PanelAnalytic />} />
                <Route path="battery-analytic" element={<Battery />} />
                <Route path="active-alerts" element={<ActiveAlerts />} />
                <Route path="users" element={<Users />} />
              </Route>
              <Route path="accept-user" element={<UserInvitePage />} />

              {/* Admin routes */}

              <Route path="admin">
                <Route path="/admin" element={<ErroPage status={404} />} />
                <Route path="sign-in" element={<AdminSignIn />} />
                <Route path="sign-up" element={<AdminSignUp />} />
                <Route
                  path="forgot-password"
                  element={<AdminForgotPassword />}
                />
                <Route path="new-password" element={<AdminResetPassword />} />
                <Route path="otp" element={<AdminOtp />} />
                <Route element={<PrivateRoute pathTo={USER_ROLE.accessOne} />}>
                  <Route path="account" element={<AdminAccount />} />
                  <Route path="active-alerts">
                    <Route index element={<AdminActiveAlert />} />
                    <Route
                      path="created-alerts"
                      element={<AdminActiveAlertCreated />}
                    />
                    <Route
                      path="location-alerts"
                      element={<AdminActiveAlertLocation />}
                    />
                  </Route>
                  <Route
                    path="panel-analytic"
                    element={<AdminPanelAnalytic />}
                  />
                  <Route path="battery-analytic" element={<AdminBattery />} />
                  <Route
                    path="energy-analytic"
                    element={<AdminEnergyAnalytic />}
                  />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="support" element={<AdminSupport />} />

                  <Route path="customers">
                    <Route index element={<AdminCustomers />} />
                    <Route path=":id" element={<AdminCustomer />} />
                  </Route>
                  <Route path="all-shs">
                    <Route index element={<AdminSHS />} />
                    <Route path="shs/:id" element={<AdminShsDetails />} />
                  </Route>
                  <Route path="overview">
                    <Route index element={<AdminOverview />} />
                    <Route path="shs/:id" element={<AdminShsDetails />} />
                  </Route>
                  <Route
                    path="voltage-current-analytics"
                    element={<AdminVoltageCurrent />}
                  />
                </Route>
                <Route path="accept-user" element={<AdminUserInvitePage />} />
                <Route path="audit-logs" element={<UserAuditLog />} />
                <Route />
              </Route>
            </Route>
            <Route path="*" element={<ErroPage status={404} />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </Router>
  )
}

export default App
