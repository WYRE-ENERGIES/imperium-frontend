import React, { useState } from 'react'

export const ErrorMessage = (error) => {
  let errorMsg = 'Unable to connect to server. Please try again later.'
  switch (error.status) {
    case 401:
      errorMsg = 'Invalid credentials. Please provide valid authentication.'
      break
    case 403:
      errorMsg = 'Unauthorized. You do not have permission to view this page.'
      break
    case 422:
      errorMsg = 'Invalid data: Please check your input and try again.'
      break
    case 400:
      errorMsg = 'Invalid credentials. Please provide valid authentication.'
      break
    case 500:
      errorMsg = 'Oops! Something went wrong. Please try again later.'
      break
  }

  return errorMsg
}
