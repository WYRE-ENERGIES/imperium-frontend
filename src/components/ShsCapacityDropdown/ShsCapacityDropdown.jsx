import { Dropdown, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import { BsSunset } from 'react-icons/bs'
import { FaAngleDoubleDown } from 'react-icons/fa'
import { RiHome6Line } from 'react-icons/ri'
import { ThunderboltOutlined } from '@ant-design/icons'
import classes from './ShsCapacityDropdown.module.scss'
import { useGetClientDeviceListQuery } from '../../features/slices/clientUserApiSlice'

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
    setSelectedDevice(items.find((item) => item.key === Number(key)))
    setDeviceId(Number(key))
  }

  const { isFetching, isError, data } = useGetClientDeviceListQuery()

  useEffect(() => {
    if (isFetching) return

    if (isError) {
      setItems([
        {
          key: 'SHS-Panel-Capacity-1',
          icon: <RiHome6Line color="#66ab4f" />,
          label: 'SHS, Panel, Capacity',
          disabled: true,
        },
      ])
      return
    }

    const deviceList = data?.map((device) => ({
      key: device.id,
      name: device.device_name || 'Device',
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
      setSelectedDevice({
        ...data[0],
        name: data[0].device_name || 'Device',
        capacity: parseFloat(Number(data[0].capacity)?.toFixed(1)),
      })
      setItems([...items, ...deviceList])
      setDeviceId(data[0].id)
    }
  }, [isFetching])

  return (
    <section className={classes.ShsCapacityDropdown}>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={classes.ShsCapacityDropdown__left}>
            <h2>{selectedDevice && selectedDevice.capacity}</h2>
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
              <h3>{selectedDevice?.name || 'No Device Available'}</h3>
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
