import { Row, Progress, Col, Typography } from 'antd'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import fileUploadIcon from '../../../../assets/Auth/fileUpload.svg'
import classes from './Widget.module.scss'

const FormFileUpload = ({ fileName, fileSize, fileUploadingProgress }) => {
  const { Text } = Typography
  return (
    <div className={classes.FormFileUpload}>
      <div className={classes.FormFileUpload__fileUploadStatus}>
        <div>
          <div className={classes.FormFileUpload__fileUploadIcon}>
            <img src={fileUploadIcon} alt="" srcSet="" />
          </div>
        </div>
        <div className={classes.FormFileUpload__Info}>
          <div className={classes.FormFileUpload__Text}>
            <Text
              ellipsis={{ rows: 1 }}
              className={classes.FormFileUpload__FileName}
            >
              {fileName}
            </Text>
            <p className={classes.FormFileUpload__FileSize}>{fileSize} kb</p>
            <div className={classes.FormFileUpload__FileUploadProgress}>
              <Progress percent={fileUploadingProgress} strokeColor="#385E2B" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.FormFileUpload__fileUploadDeleteIcon}>
        <div>
          {' '}
          <FaTrashAlt color="#808080" />
        </div>
      </div>
    </div>
  )
}

export default FormFileUpload
