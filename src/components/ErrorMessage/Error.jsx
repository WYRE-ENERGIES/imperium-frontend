import React from 'react'

const Error = ({ Errormsg }) => {
  return (
    <div style={{ color: 'red' }}>
      <small>{Errormsg}</small>
    </div>
  )
}

export default Error
