'use client'
import { useEffect } from 'react'
import classes from './errorBoundary.module.scss'
const Fallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className={classes.Fallback}>
      <div>
        <div className={classes.Fallback__Content}>
          <p className={classes.Fallback__Header}>
            Something went wrong. Please check your network connection or Try
            again.
          </p>
          <div className={classes.Fallback__Button}>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fallback
