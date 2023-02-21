import { Input, Modal, Divider, Form } from 'antd'
import React, { useState } from 'react'
import { BsPlus, BsBell } from 'react-icons/bs'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import classes from './ActiveAlert.module.scss'
import { SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import ActiveAlertTable from '../../../components/ActiveAlert/Table/ActiveAlertTable'
import activeAlertdata from '../../../components/ActiveAlert/Data/data'

const CreatedAlerts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const columns = [
    {
      key: '1',
      title: 'Active Alerts',
      dataIndex: 'shs',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {data[0]?.header}
        </span>
      ),
    },
    {
      key: '2',
      title: 'Event Description',
      dataIndex: 'shs',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {data[0]?.text}
        </span>
      ),
    },
  ]

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const ActiveAlertTableTitle = () => (
    <div className={classes.ActiveAlert__ActiveAlertTableHeader}>
      <p style={{ fontWeight: '500', fontSize: '18px' }}>Created Alert</p>
      <div className={classes.ActiveAlert__ActiveAlertTableHeaderFilter}>
        <div>
          <Input
            placeholder="Search"
            size="large"
            prefix={prefix}
            className={classes.ActiveAlert__SearchAndFilter}
          />
        </div>

        <div className={classes.ActiveAlert__ActiveAlertTableFilterExport}>
          <button>
            {' '}
            <CloudDownloadOutlined />
            <span style={{ marginLeft: '2px', color: '#C4C4C4' }}>Export</span>
          </button>
        </div>
      </div>
    </div>
  )
  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#808080',
      }}
    />
  )
  return (
    <AdminPageLayout>
      <section>
        {' '}
        <section className={classes.ActiveAlert__CreateActiveAlerts}>
          <div>
            <PageBreadcrumb
              title={'Active Alert'}
              items={['Active Alert/ Created Alerts']}
            />
          </div>
          <section
            className={classes.ActiveAlert__ActiveAlertNotificationHeader}
          >
            <button
              onClick={showModal}
              className={classes.ActiveAlert__ActiveAlertNotificationHeaderBtn}
            >
              {' '}
              <BsPlus size={30} />
              <span>Add Alert</span>
            </button>
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={688}
              footer={null}
            >
              <div className={classes.ActiveAlert__ModalContent}>
                <div>
                  <div
                    className={
                      classes.ActiveAlert__ActiveAlertAddAlertHeaderSection
                    }
                  >
                    <div
                      className={classes.ActiveAlert__ActiveAlertAddAlertHeader}
                    >
                      <BsBell />
                    </div>
                    <div>
                      <p>Create Active Alert</p>
                    </div>
                  </div>
                  <Divider />

                  <div className={classes.ActiveAlert__ModalContentForm}>
                    <Form
                      name="basic"
                      labelCol={{
                        span: 7,
                      }}
                      initialValues={{
                        remember: false,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                      layout="horizontal"
                      requiredMark="optional"
                      labelAlign="left"
                    >
                      <Form.Item label="Title" name="title" required>
                        <Input
                          className={classes.ActiveAlert__AddAlertInput}
                          style={{ marginBottom: '-5px' }}
                          placeholder="Enter active alert title "
                        />
                      </Form.Item>

                      <Form.Item
                        label="Event Description"
                        name="description"
                        required
                      >
                        <Input.TextArea
                          className={classes.ActiveAlert__AddAlertInput}
                          style={{ marginTop: '-1px' }}
                          placeholder="Write instruction to help resolve alert."
                          rows={5}
                        />
                      </Form.Item>
                      <Form.Item>
                        <div className={classes.ActiveAlert__AddAlertBtn}>
                          <button onClick={handleOk}>Cancel</button>
                          <button onClick={handleOk}>Submit</button>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </Modal>
          </section>
        </section>
        <section>
          {' '}
          <section className={classes.ActiveAlert__ActiveAlertCreateTable}>
            <ActiveAlertTable
              title={ActiveAlertTableTitle}
              columns={columns}
              dataSource={activeAlertdata}
            />
          </section>
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default CreatedAlerts
