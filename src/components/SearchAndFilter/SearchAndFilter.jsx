import { Button, Input, Select } from 'antd'
import { CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons'
import React, { Suspense, lazy } from 'react'

import classes from './SearchAndFilter.module.scss'

const DropDownFilter = lazy(() => import('../DropDownFilter/DropDownFilter'))

const { Option } = Select
const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#808080',
    }}
  />
)

const SearchAndFilter = ({ filterOptions, isAdmin }) => {
  const options = filterOptions?.map((option, index) => (
    <Option key={index} value={option.value}>
      {option.name}
    </Option>
  ))

  return (
    <div className={classes.SearchAndFilter}>
      <Input
        placeholder="Search"
        size="large"
        prefix={prefix}
        className={classes.SearchAndFilter__search}
      />
      <Suspense fallback={<h4>loading</h4>}>
        {filterOptions && <DropDownFilter options={options} />}
      </Suspense>
      {isAdmin && (
        <Button className={classes.SearchAndFilter__exportBtn}>
          <CloudDownloadOutlined />
          Export
        </Button>
      )}
    </div>
  )
}

export default SearchAndFilter
