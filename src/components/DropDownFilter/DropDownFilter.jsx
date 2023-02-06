import { MdFilterList } from 'react-icons/md'
import React from 'react'
import { Select } from 'antd'
import classes from './DropDownFilter.module.scss'

const DropDownFilter = ({ options }) => {
  return (
    <section className={classes.DropDownFilter}>
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
        className={classes.DropDownFilter__select}
      >
        {options}
      </Select>
    </section>
  )
}

export default DropDownFilter
