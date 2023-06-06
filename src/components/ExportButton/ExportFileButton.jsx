import { CloudDownloadOutlined } from '@ant-design/icons'
import React from 'react'
import useExPort from '../../hooks/useExport'
import classes from './ExportButton.module.scss'
const ExportFileButton = ({ url, tableName }) => {
  const timeStamp = new Date()
  const fileName = timeStamp.toISOString().substring(0, 10)
  const { downloadUrl, loading, error } = useExPort(url)

  const handleExportFileDownLoad = () => {
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `export_${tableName}_${fileName}.csv`

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
  }

  const handleDownload = () => {
    if (error) {
      window.location.reload()
    } else if (downloadUrl) {
      handleExportFileDownLoad()
    }
  }
  return (
    <div className={classes.ExportFileButton}>
      <button onClick={() => handleDownload()} disabled={loading}>
        {' '}
        <CloudDownloadOutlined />
        <span>
          {' '}
          {loading ? 'Loading...' : error ? 'Refresh Page' : 'Export'}
        </span>
      </button>
    </div>
  )
}

export default ExportFileButton
