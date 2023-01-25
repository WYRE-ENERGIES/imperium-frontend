import React from 'react'

import FormHeader from './FormHeader'
import classes from './Widget.module.scss'
const FormDescription = ({ content }) => {
  const { image, header, tagline, ImgHeight } = content
  return (
    <div className={classes.desc}>
      <div className={classes.desc__image}>
        <img src={image} alt="" style={{ height: { ImgHeight } }} />
      </div>
      <div className={classes.desc__text}>
        <FormHeader header={header} tagline={tagline} />
      </div>
    </div>
  )
}

export default FormDescription
