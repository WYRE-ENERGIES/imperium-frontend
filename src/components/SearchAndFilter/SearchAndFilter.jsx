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

const SearchAndFilter = ({ filterOptions }) => {
  console.log(filterOptions)
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
          {options}
        </Select>
      </section>
    </div>
  )
}

export default SearchAndFilter
