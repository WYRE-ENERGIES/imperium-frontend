import React from 'react'
import classes from './Layout.module.scss'
import FormHeader from '../../../Widgets/FormHeader'
import FormNavbar from '../../../Widgets/FormNavbar'

const Layout = ({ children, background = ' #f0f7ed', widgets }) => {
  return (
    <section style={{ background: background }} className={classes.Layout}>
      {widgets && <FormNavbar />}
      <div className={classes.Layout__FormContentDisplay}>
        <div className={classes.Layout__FormContent}>
          <h1 className={classes.Layout__LegendHeader}>{widgets?.header}</h1>
          <div className={classes.Layout__FormHeader}>
            <div>
              <img src={widgets?.icon} alt="" srcSet="" />
            </div>
            <div className={classes.Layout__FormHeaderText}>
              {' '}
              <FormHeader header={widgets?.header} tagline={widgets?.tag} />
            </div>
          </div>
          <div>{children}</div>
          <div>{widgets?.footer}</div>
        </div>
      </div>
    </section>
  )
}

export default Layout
