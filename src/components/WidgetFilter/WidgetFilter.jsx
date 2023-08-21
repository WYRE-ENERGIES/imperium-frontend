import { DatePicker, Radio, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  useListShsRegionsQuery,
  useListShsSectorsQuery,
} from '../../features/slices/customersSlice'

import { CloudDownloadOutlined } from '@ant-design/icons'
import DropDownFilter from '../DropDownFilter/DropDownFilter'
import classes from './WidgetFilter.module.scss'

const { Option } = Select
const { Group, Button } = Radio

const optionData = [
  { name: '12 months', value: 'yearly' },
  { name: '30 days', value: 'monthly' },
  { name: '7 days', value: 'weekly' },
  { name: '24 hours', value: 'daily' },
]

const options = optionData.map((option, index) => (
  <Option key={index} value={option.value}>
    {option.name}
  </Option>
))

const radioButtonOptions = optionData.map((option, index) => (
  <Button key={index} value={option.value}>
    {option.name}
  </Button>
))

const WidgetFilter = ({
  hasExportButton = false,
  selectFilterBy,
  filterBy,
  setSectorName,
  hasSectorFilter = false,
  setRegionId,
  setSectorId,
  setRegionName,
  show = true,
  showDate = true,
}) => {
  let sectors = []
  let regions = []

  const {
    isFetching: fetchingRegion,
    isError: regionError,
    data: regionData,
  } = useListShsRegionsQuery()
  const {
    isFetching: fetchingSector,
    isError: sectorError,
    data: sectorData,
  } = useListShsSectorsQuery()

  if (!fetchingRegion && !regionError && regionData.results) {
    regions = regionData.results.map((region, index) => (
      <Option value={region.id} key={index}>
        {region.name}
      </Option>
    ))
  }

  if (!fetchingSector && !sectorError && sectorData.results) {
    sectors = sectorData.results.map((region, index) => (
      <Option value={region.id} key={index}>
        {region.name}
      </Option>
    ))
  }
  const handleSectorChange = (val, { children }) => {
    setSectorId(val)
    setSectorName(children)
  }
  const handleRegionChange = (val, { children }) => {
    setRegionId(val)
    setRegionName(children)
  }

  return (
    <div className={classes.WidgetFilter}>
      <section className={classes.WidgetFilter__leftSection}>
        {show && (
          <>
            <div className={classes.WidgetFilter__btnSection}>
              <Group
                value={filterBy}
                onChange={(e) => selectFilterBy(e.target.value)}
                className={classes.WidgetFilter__btn}
              >
                {radioButtonOptions}
              </Group>
            </div>
            <div className={classes.WidgetFilter__btnSectionMobile}>
              <DropDownFilter
                options={options}
                onFilterChanged={selectFilterBy}
                value={filterBy}
              />
            </div>
          </>
        )}

        <Space>
          {showDate && (
            <DatePicker
              className={classes.WidgetFilter__date}
              onChange={(d, ds) => selectFilterBy(ds || 'yearly')}
              showToday={false}
              disabledDate={(current) => {
                return current.isAfter(new Date(), 'day')
              }}
              dateRender={(current) => {
                const style = {
                  height: '100%',
                  width: '100%',
                  padding: '5px',
                }
                if (current.isSame(new Date(), 'day')) {
                  style.color = 'white'
                  style.background = '#385E2B'
                  style.border = '1px solid #385E2B'
                  style.borderRadius = '50%'
                }
                return (
                  <div
                    className={classes.WidgetFilter__DateDisplay}
                    style={style}
                  >
                    <span>{current.date()}</span>
                  </div>
                )
              }}
            />
          )}
        </Space>
      </section>
      {hasSectorFilter ? (
        <>
          <div className={classes.WidgetFilter__divider}></div>

          <section className={classes.WidgetFilter__selectSection}>
            <Select
              className={classes.WidgetFilter__select}
              placeholder="Select Region"
              // onChange={(val, region) => {
              //   console.log('this is thw and no technology', val, region)
              //   setRegionId
              //   setRegionName(region?.children)
              // }}
              onChange={(val, region) => handleRegionChange(val, region)}
              allowClear
            >
              {regions}
            </Select>

            <Select
              className={classes.WidgetFilter__select}
              placeholder="Select Sector"
              onChange={(val, sector) => handleSectorChange(val, sector)}
              allowClear
            >
              {sectors}
            </Select>
          </section>
        </>
      ) : null}
    </div>
  )
}

export default WidgetFilter
