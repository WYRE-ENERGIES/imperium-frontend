import { Table, Tag } from 'antd'

import React from 'react'
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import classes from '../SHSTable/SHSTable.module.scss'
import { tableData } from './data'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Energy Consumed',
    key: 'energyConsumed',
    dataIndex: 'energyConsumed',
    render: (value) => value.toLocaleString(),
  },
  {
    title: 'Energy Generated',
    key: 'energyGenerated',
    dataIndex: 'energyGenerated',
    render: (value) => value.toLocaleString(),
  },
]
const EnergyTable = () => {
  return (
    <div className={classes.SHSTable}>
      <section className={classes.SHSTable__shsTableTitle}>
        <h1>
          Energy Table
          <Tag
            style={{
              backgroundColor: '#f0f7ed',
              borderRadius: '16px',
              color: '#497A38',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '12px',
              lineHeight: '20px',
            }}
          >
            kWh
          </Tag>
        </h1>
        <SearchAndFilter />
      </section>
      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={tableData}
        className={classes.SHSTable__table}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </div>
  )
}

export default EnergyTable
