import React from 'react'
import { Select } from 'antd'
import classes from './SearchDropdown.module.scss'
import useDebounce from '../../hooks/useDebounce'
import { useState } from 'react'

const SearchDropdown = ({ placeholder, data }) => {
  const [value, setValue] = useState()
  const debounceValue = useDebounce(value, 1000)

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <Select
      className={classes.SearchDropdown}
      showSearch
      value={value}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  )
}

export default SearchDropdown
