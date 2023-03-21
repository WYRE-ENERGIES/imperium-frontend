import { React, useState } from 'react'
import { Row, Col } from 'antd'
import classes from './Account.module.scss'
import { message, Form, Upload } from 'antd'
import uploadImg from '../../../assets/widget-icons/bussinessuploadIcon.svg'
import { getItemFromLocalStorage } from '../../../utils/helpers'
const AccountInfo = ({ type }) => {
  const [fileUpload, setFileUpload] = useState(false)
  const { first_name, last_name, email } = getItemFromLocalStorage('userInfo')
  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

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
      console.log('info ', info)
      if (status == 'uploading') {
        setFileUpload(true)
      }
      if (status === 'done') {
        setFileUpload(true)
        message.success(`${info.file.name} 
                               file uploaded successfully`)
      } else if (status === 'error') {
        setFileUpload(true)
        message.success(`${info.file.name} 
                               file uploaded successfully`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <div className={classes.AccountInfo}>
      <Row>
        <Col>
          {type === 'business' ? (
            <Form.Item>
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <div className={classes.Account__FileUpload}>
                  <Dragger
                    {...fileUploadProps}
                    name="files"
                    action=""
                    style={{
                      border: 'none',
                      borderRadius: '100%',
                      background: '#f0f7ed',
                    }}
                  >
                    <div className={classes.Account__FileUploadIcon}>
                      <div>
                        {' '}
                        <div style={{ marginTop: '-9px', marginBottom: '2px' }}>
                          <img
                            src={uploadImg}
                            alt=""
                            srcSet=""
                            style={{ width: '40px' }}
                          />
                          {fileUpload}
                        </div>
                      </div>
                    </div>
                  </Dragger>
                </div>
              </Form.Item>
            </Form.Item>
          ) : (
            <div className={classes.AccountInfo__Init}>
              <p>
                {first_name[0]}
                {last_name[0]}
              </p>
            </div>
          )}
        </Col>
        <Col>
          <div className={classes.AccountInfo__Info}>
            {' '}
            <div>
              <p>
                {first_name} {last_name}
              </p>
              <p>{email}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AccountInfo
