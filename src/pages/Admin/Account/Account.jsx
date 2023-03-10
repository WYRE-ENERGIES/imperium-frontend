import AccountProfile from '../../Customer/Account/AccountProfile'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import { React } from 'react'
import classes from './Account.module.scss'

const Account = ({ children, props }) => {
  const AccountData = {
    firstName: 'John',
    lastName: 'Kahan',
    email: 'JonniKahan@gmail.com',
  }

  return (
    <div className={classes.Account}>
      <AdminPageLayout>
        <PageBreadcrumb title="My Account" items={['My Account']} />
        <div>
          <AccountProfile AcctInfo={AccountData} type={props} />
        </div>
        {children}
      </AdminPageLayout>
    </div>
  )
}

export default Account
