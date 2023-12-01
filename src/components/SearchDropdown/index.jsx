import React from 'react'
import { Select } from 'antd'
import classes from './SearchDropdown.module.scss'

const SearchDropdown = ({
  placeholder,
  value,
  data,
  handleChange,
  handleSearch,
  loading,
}) => {
  return (
    <Select
      loading={loading}
      className={classes.SearchDropdown}
      showSearch
      value={value}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onChange={handleChange}
      onSearch={handleSearch}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d?.email || d.name,
        label: d?.email || d.name,
      }))}
    />
  )
}

export default SearchDropdown
