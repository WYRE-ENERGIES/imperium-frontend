import React from 'react'
import PageLayout from '../../../components/Layout/PageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'
import classes from './ActiveAlerts.module.scss'
const ActiveAlerts = () => {
  return (
    <PageLayout>
      <div className={classes.ActiveAlerts}>
        <section className={classes.ActiveAlerts__headerSection}>
          <PageBreadcrumb title="Active Alert" />
          <ShsCapacityDropdown />
        </section>
        <section className={classes.ActiveAlerts__Banner}>
          <div className={classes.ActiveAlerts__Status}>
            <div>
              <h1>
                You have <span>2</span> recent alerts
              </h1>
            </div>
            <div>
              <div className={classes.ActiveAlerts__Dot}></div>
              <p>Today</p>
            </div>
          </div>
          <div>
            <div className={classes.ActiveAlerts__Description}>
              <div className={classes.ActiveAlerts__Error}>
                <p>
                  <strong>Abnormal load </strong> Check that the load does not
                  exceed requirement
                </p>
                <span>12:37pm</span>
              </div>
              <div className={classes.ActiveAlerts__Success}>
                <p>
                  <strong>Low battery volage </strong> Check that the load does
                  not exceed requirement
                </p>
                <span>12:37pm</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default ActiveAlerts
