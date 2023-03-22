import { Link } from 'react-router-dom'
import { message, Form, Input, Upload } from 'antd'

import uploadImg from '../../../../assets/Auth/Featured icon.svg'
import classes from './BusinessForm.module.scss'
import { useState } from 'react'
import FormFileUpload from '../Widgets/FormFileUpload'
import UserForm from '../AuthForm/UserForm'

const BusinessForm = () => {
  const [fileUpload, setFileUpload] = useState(false)
  const [fileUploadingProgress, setfileUploadingProgress] = useState(0)
  const [fileName, setfileName] = useState('')
  const [fileSize, setfileSize] = useState(0)
  const { Dragger } = Upload
  const fileUploadProps = {
    name: 'file',
    multiple: false,
    progress: { showInfo: false },
    showUploadList: false,
    maxCount: 1,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file
      if (status == 'uploading') {
        setFileUpload(true)
        setfileName(info.file.name)
        setfileSize(info.file.size)
        setfileUploadingProgress(info.file.percent)
      }
      if (status === 'done') {
        setFileUpload(true)
        message.success(`${info.file.name} 
                               file uploaded successfully`)
      } else if (status === 'error') {
        setFileUpload(true)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <div className={classes.BusinessForm}>
      <UserForm
        formContent={{
          header: 'Do you have a business',
          tag: 'Please fill in your company details',
          btnText: 'Continue',
        }}
        labelCol={16}
        wrapperCol={32}
        name={'business'}
        extras={
          <div style={{ fontSize: '18px', textAlign: 'center' }}>
            <Link style={{ color: '#808080', fontWeight: '600' }}>Skip</Link>
          </div>
        }
      >
        <div className={classes.BusinessForm__form}></div>
      </UserForm>
    </div>
  )
}
export default BusinessForm
