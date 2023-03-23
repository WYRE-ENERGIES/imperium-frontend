import React from 'react'
import classes from './Layout.module.scss'
import FormHeader from '../../../Widgets/FormHeader'
import FormNavbar from '../../../Widgets/FormNavbar'

const Layout = ({
  children,
  background = ' #f0f7ed',
  widgets,
  admin,
  footer,
}) => {
  const btnColor1 = admin ? '#CEE5C8' : '#FFFF'
  const btnColor2 = admin ? '#FFFF' : '#385E2B'
  const txtColor1 = '#385E2B'
  const txtColor2 = admin ? '#385E2B' : '#FFFF'
  return (
    <section style={{ background: background }} className={classes.Layout}>
      {widgets?.icon ? (
        <FormNavbar
          btnColor1={btnColor1}
          btnColor2={btnColor2}
          txtColor1={txtColor1}
          txtColor2={txtColor2}
        />
      ) : (
        ''
      )}
      <div className={classes.Layout__FormContentDisplay}>
        <div className={classes.Layout__FormContent}>
          {widgets?.icon ? (
            <h1 className={classes.Layout__LegendHeader}>{widgets?.header}</h1>
          ) : (
            ''
          )}
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
      <div style={{ marginTop: '85px' }}>{footer}</div>
    </section>
  )
}

export default Layout
