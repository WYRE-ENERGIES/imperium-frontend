import { Dropdown, Space, Typography } from 'antd'

import { BsSunset } from 'react-icons/bs'
import { FaAngleDoubleDown } from 'react-icons/fa'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { RiHome6Line } from 'react-icons/ri'
import { ThunderboltOutlined } from '@ant-design/icons'
import classes from './ShsCapacityDropdown.module.scss'

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

function ShsCapacityDropdown() {
  const nextPage = useNavigate()
  const onClick = () => {
    nextPage('/overview/shs/1')
  }
  const items = [
    {
      key: '1',
      icon: <RiHome6Line color="#66ab4f" />,
      label: 'SHS, Panel, Capacity',
      disabled: true,
    },
    {
      key: '2',
      label: (
        <MenuItemLabel
          shsName="Freddy zadox"
          panelNo={2}
          capacity="276 kVA/2.3 kW"
        />
      ),
    },
    {
      key: '3',
      label: (
        <MenuItemLabel
          shsName="Alday Banamex"
          panelNo={3}
          capacity="380 kVA/4.7 kW"
        />
      ),
    },
    {
      key: '4',
      label: (
        <MenuItemLabel
          shsName="Freddy zadox"
          panelNo={2}
          capacity="276 kVA/2.3 kW"
        />
      ),
    },
  ]

  return (
    <section className={classes.ShsCapacityDropdown}>
      <div className={classes.ShsCapacityDropdown__left}>
        <h2>380 kVA/4.7 kW</h2>
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
          <h3>Alday Banamex</h3>
        </Space>
        <Dropdown
          menu={{
            items,
            onClick,
          }}
        >
          <a
            onClick={(e) => e.defaultPrevented()}
            className={classes.ShsCapacityDropdown__dropdown}
          >
            <FaAngleDoubleDown />
          </a>
        </Dropdown>
      </div>
    </section>
  )
}

export default ShsCapacityDropdown
