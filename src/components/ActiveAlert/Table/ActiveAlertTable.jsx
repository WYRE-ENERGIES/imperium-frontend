import { Table } from 'antd'
import React from 'react'
import classes from './ActiveAlertTable.module.scss'

const Footer = () => {
  return (
    <section className={classes.ActiveAlertTable__Footer}>
      <div className={classes.ActiveAlertTable__NavBtn}>
        {' '}
        <button>Previous</button>
        <button>Next</button>
      </div>
      <div className={classes.ActiveAlertTable__Pagination}>Page 1 of 10</div>
    </section>
  )
}

const ActiveAlertTable = ({ dataSource, columns, title }) => {
  return (
    <div>
      <Table
        title={title}
        columns={columns}
        dataSource={dataSource}
        footer={Footer}
        pagination={{
          position: ['none', 'none'],
        }}
      />
    </div>
  )
}

export default ActiveAlertTable
