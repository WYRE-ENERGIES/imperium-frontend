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
  isAdmin = false,
  hasBtn = false,
  btnText,
  BtnIcon,
}) => {
  return (
    <div className={classes.SHSTable}>
      <section className={classes.SHSTable__shsTableTitle}>
        {tagValue ? (
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
        ) : (
          <h1>{tableTitle}</h1>
        )}
        <SearchAndFilter
          filterOptions={filterOptions}
          isAdmin={isAdmin}
          hasBtn={hasBtn}
          btnText={btnText}
          BtnIcon={BtnIcon}
        />
      </section>
      <Table
        style={{ width: '100%', overflow: 'scroll' }}
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
