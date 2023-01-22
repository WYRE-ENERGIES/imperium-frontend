import React from 'react'

const FormHeader = ({ header, tagline }) => {
  return (
    <div className="FormHeader">
      <div>
        <h1>{header}</h1>
        <p>{tagline}</p>
      </div>
    </div>
  )
}

export default FormHeader
