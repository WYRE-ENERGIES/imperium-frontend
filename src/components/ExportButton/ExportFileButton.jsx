import { CloudDownloadOutlined } from '@ant-design/icons'
import React from 'react'
import useExPort from '../../hooks/useExport'

const ExportFileButton = ({ url }) => {
  const timeStamp = new Date()
  const fileName = timeStamp.toISOString().substring(0, 10)
  const { downloadUrl, loading, error } = useExPort(url)

  const handleExportFileDownLoad = () => {
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `export_shs_active_alerts_${fileName}.csv`

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
  }
  return (
    <div>
      <button onClick={() => handleExportFileDownLoad()}>
        {' '}
        <CloudDownloadOutlined />
        <span> {loading ? 'Loading...' : 'Export'}</span>
      </button>
    </div>
  )
}

export default ExportFileButton
