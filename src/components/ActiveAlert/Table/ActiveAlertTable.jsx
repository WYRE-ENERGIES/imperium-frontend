import { Table } from 'antd'
import React from 'react'
import classes from './ActiveAlertTable.module.scss'
import TableFooter from '../../TableFooter/TableFooter'

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

const ActiveAlertTable = ({ dataSource, columns, title, setPageNum }) => {
  return (
    <div>
      <Table
        title={title}
        columns={columns}
        dataSource={dataSource?.results}
        footer={() => (
          <TableFooter
            pageNo={dataSource?.page}
            totalPages={dataSource?.total_pages}
            handleClick={setPageNum}
            hasNext={dataSource?.page === dataSource?.total_pages}
            hasPrev={!dataSource?.total_pages || dataSource?.page === 1}
          />
        )}
        pagination={{
          position: ['none', 'none'],
        }}
      />
    </div>
  )
}

export default ActiveAlertTable
