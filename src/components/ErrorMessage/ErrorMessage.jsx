import React, { useState } from 'react'

export const ErrorMessage = (error) => {
  let errorMsg = ''
  switch (error.status) {
    case 401:
      errorMsg = error?.data?.detail
      break
    case 400:
      errorMsg = error?.data?.message
      break
    case 500:
      errorMsg = 'Cannot connect to server.'
      break
  }

  return errorMsg
}
