import { Input, Select } from 'antd'

import { MdFilterList } from 'react-icons/md'
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

const SearchAndFilter = () => {
  return (
    <div className={classes.SearchAndFilter}>
      <Input
        placeholder="Search"
        size="large"
        prefix={prefix}
        className={classes.SearchAndFilter__search}
      />

      <section className={classes.SearchAndFilter__filterSection}>
        <MdFilterList />
        <Select
          placeholder="Filter by"
          onChange={() => {}}
          size="large"
          allowClear
          dropdownStyle={{
            border: 'none',
            ':hover': {
              backgroundColor: 'green',
            },
          }}
          className={classes.SearchAndFilter__select}
        >
          <Option value="solar">Solar house System</Option>
          <Option value="recently">Recently added</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="monthly">Monthly</Option>
          <Option value="yearly">Yearly</Option>
        </Select>
      </section>
    </div>
  )
}

export default SearchAndFilter
