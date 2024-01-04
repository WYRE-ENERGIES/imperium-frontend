import { Button, DatePicker, Input, Select } from 'antd'
import dayjs from 'dayjs'
import { CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons'
import React, { Suspense, lazy } from 'react'

import classes from './SearchAndFilter.module.scss'
import ExportFileButton from '../ExportButton/ExportFileButton'

const DropDownFilter = lazy(() => import('../DropDownFilter/DropDownFilter'))

const dateFormat = 'DD/MM/YYYY'

const { Option } = Select
const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#808080',
    }}
  />
)

const SearchAndFilter = ({
  filterOptions,
  isAdmin,
  hasBtn,
  btnText,
  BtnIcon,
  btnAction,
  handleSearch,
  onFilterChanged,
  showSearch,
  url,
  tableName,
  cancelValue,
  removeDate,
}) => {
  const options = filterOptions?.map((option, index) => (
    <Option key={index} value={option.value}>
      {option.name}
    </Option>
  ))

  return (
    <div className={classes.SearchAndFilter}>
      {showSearch && !removeDate && (
        <DatePicker
          format={dateFormat}
          onChange={(value) => {
            handleSearch({ target: { value: value?.format('DD/MM/YYYY') } })
          }}
        />
      )}
      {showSearch && (
        <Input
          placeholder="Search"
          size="large"
          prefix={prefix}
          className={classes.SearchAndFilter__search}
          onChange={handleSearch}
        />
      )}
      <Suspense fallback={<h4>loading</h4>}>
        {filterOptions?.length ? (
          <DropDownFilter
            onFilterChanged={onFilterChanged}
            options={options}
            cancelValue={cancelValue}
          />
        ) : null}
      </Suspense>
      {isAdmin && <ExportFileButton url={url} tableName={tableName} />}
      {hasBtn && (
        <Button
          onClick={btnAction}
          className={classes.SearchAndFilter__additionalBtn}
        >
          <BtnIcon />
          {btnText}
        </Button>
      )}
    </div>
  )
}

export default SearchAndFilter
