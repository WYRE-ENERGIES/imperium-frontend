import React, { useState } from 'react'

export const ErrorMessage = (error) => {
  let errorMsg = 'Unable to connect to server. Please try again later.'
  if (error) {
    return (errorMsg = error)
  }

  return errorMsg
}
