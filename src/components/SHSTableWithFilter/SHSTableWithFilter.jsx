import { Table, Tag } from 'antd'

import React from 'react'
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import classes from '../SHSTable/SHSTable.module.scss'

const SHSTableWithFilter = ({
  columns,
  data,
  tableTitle,
  tagValue,
  filterOptions,
}) => {
  return (
    <div className={classes.SHSTable}>
      <section className={classes.SHSTable__shsTableTitle}>
        <h1>
          {tableTitle}
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
            {tagValue}
          </Tag>
        </h1>
        <SearchAndFilter filterOptions={filterOptions} />
      </section>
      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={data}
        className={classes.SHSTable__table}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </div>
  )
}

export default SHSTableWithFilter