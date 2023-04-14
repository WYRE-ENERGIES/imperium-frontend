import { Spin, Table } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

import TableFooter from '../TableFooter/TableFooter'
import Loading from '../Loading/Loading'

const DataTable = ({ dataSource, columns, title, setPageNum, isLoading }) => {
  const loadingIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, marginRight: 10, color: '#66ab4f' }}
    />
  )
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
        loading={{
          indicator: <Spin indicator={loadingIcon} />,
          spinning: isLoading,
        }}
      />
    </div>
  )
}

export default DataTable
