import { Input, Select, Space, Spin, Table } from 'antd'
import React from 'react'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import TableFooter from '../TableFooter/TableFooter'
import classes from './Table.module.scss'
import { MdFilterList } from 'react-icons/md'
import ExportFileButton from '../ExportButton/ExportFileButton'

const DataTable = ({
  dataSource,
  columns,
  title,
  setPageNum,
  isLoading,
  sortTable,
  searchTable,
  url,
  tableName,
}) => {
  const loadingIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, marginRight: 10, color: '#66ab4f' }}
    />
  )
  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#808080',
      }}
    />
  )
  const ativeAlertTableTitle = () => (
    <section className={classes.DataTable__Header}>
      <div className={classes.DataTable__TableHeader}>
        <div className={classes.DataTable__TableHeaderAndUnit}>
          {' '}
          <p style={{ fontWeight: '500', fontSize: '18px' }}>
            {title?.title ? title?.title : title}
          </p>
          {title?.unit ? (
            <p style={{ fontWeight: '500', fontSize: '18px' }}>{title?.unit}</p>
          ) : (
            ''
          )}
        </div>
        <div className={classes.DataTable__TableHeaderFilter}>
          {/* <div>
            <Input
              placeholder="Search"
              size="large"
              onChange={(e) => searchTable(e.target.value)}
              prefix={prefix}
              className={classes.DataTable__SearchAndFilter}
            />
          </div> */}
          {sortTable ? (
            <div className={classes.DataTable__TableFilter}>
              <Space className={classes.DataTable__TableFilterInput}>
                <div className={classes.DataTable__TablePrefixFilter}>
                  <MdFilterList size={20} />
                  <p>Sort by</p>
                </div>
                <Select
                  className={classes.DataTable__FormSelect}
                  defaultValue=""
                  style={{
                    width: 100,
                    border: 'none',
                    color: 'white',
                  }}
                  options={[
                    {
                      value: '',
                      label: 'All',
                    },
                    {
                      value: 'RESOLVED',
                      label: 'RESOLVED',
                      style: {
                        color: '#497A38',
                      },
                    },
                    {
                      value: 'UNRESOLVED',
                      label: 'UNRESOLVED',
                      style: {
                        color: 'rgb(180, 35, 24)',
                      },
                    },
                  ]}
                  dropdownStyle={{ background: 'white' }}
                  showArrow={false}
                  onChange={(value) => {
                    sortTable(value)
                  }}
                />
              </Space>
            </div>
          ) : (
            ''
          )}
          {url && (
            <div>
              <ExportFileButton url={url} tableName={tableName} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
  return (
    <div className={classes.DataTable}>
      <Table
        scroll={{ x: '100%' }}
        title={ativeAlertTableTitle}
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
