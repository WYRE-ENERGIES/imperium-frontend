import React, { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const PhoneNumInput = (props, ref) => {
  return (
    <div>
      <input ref={ref} {...props} />
    </div>
  )
}

export default PhoneNumInput
