import '../../styles/AuthStyling/Auth.css'

import React from 'react'

const FormButton = ({ type, action, icon }) => {
  return (
    <div className="FormButton">
      <button type={type}>
        {icon ? <img src={icon} alt="" /> : ''} <span> {action}</span>
      </button>
    </div>
  )
}

export default FormButton
