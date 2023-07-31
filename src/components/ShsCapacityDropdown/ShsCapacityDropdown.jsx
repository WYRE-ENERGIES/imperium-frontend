import { Dropdown, Space, Typography } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { BsSunset } from 'react-icons/bs'
import { FaAngleDoubleDown } from 'react-icons/fa'
import { RiHome6Line } from 'react-icons/ri'
import { ThunderboltOutlined } from '@ant-design/icons'
import classes from './ShsCapacityDropdown.module.scss'
import { useGetClientDeviceListQuery } from '../../features/slices/clientUserApiSlice'
import {
  clientDeviceSelectedGetter,
  saveToLocalStorage,
} from '../../utils/helpers'

const { Text } = Typography

const MenuItemLabel = ({ shsName, panelNo, capacity }) => (
  <div className={classes.ShsCapacityDropdown__label}>
    <Text color="#363636">{shsName}</Text>
    <div className={classes.ShsCapacityDropdown__labelPanel}>
      {panelNo}
      <BsSunset />
    </div>
    <div>
      <Text>{capacity}</Text>
      <ThunderboltOutlined
        className={classes.ShsCapacityDropdown__labelThunderIcon}
      />
    </div>
  </div>
)

function ShsCapacityDropdown({ setDeviceId }) {
  const [items, setItems] = useState([
    {
      key: 'SHS-Panel-Capacity-1',
      icon: <RiHome6Line color="#66ab4f" />,
      label: 'SHS, Panel, Capacity',
      disabled: true,
    },
  ])
  const [selectedDevice, setSelectedDevice] = useState()
  const onClick = ({ key }) => {
    const selectedDeviceData = items.find((item) => item.key === Number(key))
    // filter all unselected item
    const unselectedItem = items.filter((item) => item.key !== Number(key))
    saveToLocalStorage('c_device', selectedDeviceData)
    setSelectedDevice(items.find((item) => item.key === Number(key)))
    // reorder items
    setItems([selectedDeviceData, ...unselectedItem])
    setDeviceId(Number(key))
  }

  const { isFetching, isError, data } = useGetClientDeviceListQuery()
  const setDeviceID = useCallback(() => {
    setDeviceId(data[0].id)
  }, [setDeviceId, data])
  useEffect(() => {
    if (isFetching) return

    const deviceList = data?.map((device) => ({
      key: device.id,
      id: device.id,
      name: device.device_name || 'No device name',
      capacity: parseFloat(Number(device.capacity)?.toFixed(1)),
      label: (
        <MenuItemLabel
          shsName={device.device_name || 'Device'}
          panelNo={1}
          capacity={parseFloat(Number(device.capacity)?.toFixed(1)) || 0}
        />
      ),
    }))

    if (data.length) {
      // check for data in localstorage

      const currentDevice = clientDeviceSelectedGetter(deviceList)

      setSelectedDevice(currentDevice)
      saveToLocalStorage('c_device', currentDevice)
      // setItems((prev) => [{ ...prev, ...deviceList }])
      const unselectedItem = deviceList.filter(
        (item) => item.key !== Number(currentDevice.key),
      )
      setItems([currentDevice, ...unselectedItem])
      setDeviceID()
    }
  }, [isFetching, data, setDeviceID])

  return (
    <section className={classes.ShsCapacityDropdown}>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={classes.ShsCapacityDropdown__left}>
            <h2>{selectedDevice && selectedDevice.capacity}kVA</h2>
            <h3>
              <ThunderboltOutlined
                style={{ color: '#66AB4F', marginRight: '5px' }}
              />
              SHS Capacity
            </h3>
          </div>
          <div className={classes.ShsCapacityDropdown__right}>
            <Space
              style={{
                background: '#18181B',
                opacity: '0.35',
                borderRadius: '8px',
                padding: '0 5px',
              }}
            >
              <RiHome6Line />
              <h3>{selectedDevice?.name}</h3>
            </Space>
            <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <a className={classes.ShsCapacityDropdown__dropdown}>
                <FaAngleDoubleDown />
              </a>
            </Dropdown>
          </div>
        </>
      )}
    </section>
  )
}

export default ShsCapacityDropdown
