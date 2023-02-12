import React from 'react'
import { BiPowerOff } from 'react-icons/bi'
import FormButton from '../Auth/Forms/Widgets/FormButton'
import classes from './PowerSwitch.module.scss'

const PowerSwitch = () => {
  return (
    <div className={classes.PowerSwitch}>
      <div className={classes.PowerSwitch__PowerBtn}>
        <BiPowerOff size={30} />
      </div>
      <div className={classes.PowerSwitch__ShutDownBtn}>
        <FormButton type={'submit'} action={'Schedule shutdown'} />
      </div>
    </div>
  )
}

export default PowerSwitch
