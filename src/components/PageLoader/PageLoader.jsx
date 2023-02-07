import React from 'react'
import classes from './PageLoader.module.scss'

const PageLoader = () => {
  return (
    <div className={classes.PageLoader}>
      <div className={classes.PageLoader__ring}>
        imperium
        <span></span>
      </div>
    </div>
  )
}

export default PageLoader
