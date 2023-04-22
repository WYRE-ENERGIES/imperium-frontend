import React, { useState } from 'react'
import axios from 'axios'
import { getItemFromLocalStorage } from '../utils/helpers'
import { useEffect } from 'react'
const useExPort = (url) => {
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/${url}`,
      responseType: 'blob',
      headers: {
        'Content-Type': 'text/csv',
        Accept: 'application/json',
        Authorization: `Bearer ${getItemFromLocalStorage('access')}`,
      },
    })
      .then((response) => {
        const blobData = response?.data
        setLoading(false)
        const downloadUrl = window.URL.createObjectURL(
          new Blob([blobData], {
            type: 'text/csv',
          }),
        )

        setDownloadUrl(downloadUrl)
      })
      .catch((error) => {
        setError(error)
      })
  }, [url])
  return {
    downloadUrl: downloadUrl,
    loading: loading,
    error: error,
  }
}

export default useExPort
