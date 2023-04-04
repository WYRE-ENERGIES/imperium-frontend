import { Table } from 'antd'
import React from 'react'
import classes from './ActiveAlertTable.module.scss'
import TableFooter from '../../TableFooter/TableFooter'

const ActiveAlertTable = ({ dataSource, columns, title, setPageNum }) => {
  return (
    <div>
      <Table
        scroll={{ x: '100%' }}
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
