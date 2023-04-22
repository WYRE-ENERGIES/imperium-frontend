import React, { useState, useEffect } from 'react'
import { useGetShsDetailsQuery } from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import classes from './ActiveAlertShsDetails.module.scss'
import { Modal, Select, Space } from 'antd'
import { BsHouse } from 'react-icons/bs'
import { MdFilterList } from 'react-icons/md'
import { dateTimeConverter } from '../../../../utils/helpers'
const ActiveAlertShsDetails = (data) => {
  const { data: shsdata } = data

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shsDropDown, setShsDropDown] = useState()
  const { data: shsDetails, isLoading: isLoadingshsDetails } =
    useGetShsDetailsQuery({
      shs_id: shsdata.shs_id,
    })

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  useEffect(() => {
    if (shsDetails) {
      setShsDropDown(shsDetails)
    }
  }, [shsDetails])

  return (
    <div className={classes.ActiveAlertShsDetails}>
      <div onClick={showModal}>
        <span className={classes.ActiveAlertShsDetails__DetailView}>View</span>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        className={classes.ActiveAlertShsDetails__NotificationListModal}
        width={400}
        footer={null}
      >
        <div className={classes.ActiveAlertShsDetails__ModalContent}>
          <div className={classes.ActiveAlertShsDetails__ModalContentInit}>
            <div>
              {' '}
              <span>{shsdata?.shs_name[0]}</span>
              <span>{shsdata?.shs_name[1]}</span>
            </div>
          </div>
          <h1>{shsdata?.shs_name}</h1>
          <p>{'Ikogbafav@gmail.com'}</p>
          <div>
            <div className={classes.ActiveAlertShsDetails__ModalFilterStatus}>
              <div>
                <Space
                  className={classes.ActiveAlertShsDetails__ModalFilterInput}
                >
                  <div
                    className={
                      classes.ActiveAlertShsDetails__ModalFormSelectPrefix
                    }
                  >
                    <BsHouse size={20} color="#5C9D48" />
                  </div>
                  {isLoadingshsDetails ? (
                    'loading... '
                  ) : (
                    <Select
                      className={classes.ActiveAlertShsDetails__ModalFormSelect}
                      defaultValue={shsDropDown?.[0]?.active_alert}
                      style={{
                        width: 150,
                        border: 'none',
                        color: 'white',
                      }}
                      options={
                        shsDropDown
                          ? shsDropDown.map((data) => {
                              return {
                                value: data?.active_alert,
                                label: data?.active_alert,
                              }
                            })
                          : ''
                      }
                      dropdownStyle={{ background: 'white', width: '20px' }}
                      showArrow={true}
                    />
                  )}
                </Space>
              </div>
              <div className={classes.ActiveAlertShsDetails__ModalStatus}>
                <span>{shsdata?.status}</span>{' '}
                <span>
                  <MdFilterList size={20} color="#5C9D48" />
                </span>
              </div>
            </div>

            <div>
              {shsDropDown
                ? shsDropDown.map((data, key) => (
                    <div
                      key={key}
                      className={classes.ActiveAlertShsDetails__ModalShsInfo}
                    >
                      <div>
                        {' '}
                        <span>{data?.active_alert}</span>
                        <span>{dateTimeConverter(data?.time)}</span>
                        <span
                          style={{
                            color:
                              data?.status === 'UNRESOLVED'
                                ? '#B42318'
                                : '#5C9D48',
                          }}
                        >
                          {data?.status}
                        </span>
                      </div>
                    </div>
                  ))
                : ''}
            </div>
          </div>
          <div className={classes.ActiveAlertShsDetails__ModalClose}>
            <button onClick={handleOk}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ActiveAlertShsDetails
