import { Input, Select } from 'antd'

import DropDownFilter from '../DropDownFilter/DropDownFilter'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import classes from './SearchAndFilter.module.scss'

const { Option } = Select
const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#808080',
    }}
  />
)

const SearchAndFilter = ({ filterOptions }) => {
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

      <DropDownFilter options={options} />
    </div>
  )
}

export default SearchAndFilter
