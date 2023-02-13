import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import React from 'react'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from '../../Customer/EnergyAnalytic/EnergyAnalytic.module.scss'

const EnergyAnalytic = () => {
  return (
    <AdminPageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.EnergyAnalytic}
      >
        <section className={classes.EnergyAnalytic__headerSection}>
          <PageBreadcrumb title="Energy Analytic" />
        </section>
        <section className={classes.EnergyAnalytic__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.EnergyAnalytic__widgets}>widgets</div>
      </div>
    </AdminPageLayout>
  )
}

export default EnergyAnalytic
