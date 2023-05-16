import { MdFilterList } from 'react-icons/md'
import React from 'react'
import { Select } from 'antd'
import classes from './DropDownFilter.module.scss'

const DropDownFilter = ({ options, onFilterChanged, value, cancelValue }) => {
  return (
    <section className={classes.DropDownFilter}>
      <MdFilterList />
      <Select
        value={value}
        placeholder="Filter by"
        onChange={(e) => onFilterChanged(e || cancelValue)}
        size="large"
        allowClear
        className={classes.DropDownFilter__select}
      >
        {options}
      </Select>
    </section>
  )
}

export default DropDownFilter
