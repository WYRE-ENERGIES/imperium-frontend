import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  useAssignShsMutation,
  useListShsRegionsQuery,
  useListShsSectorsQuery,
  useListShsStatesQuery,
  useListShsVendorsQuery,
} from '../../../../features/slices/customersSlice'

import ButtonLoader from '../../../../components/ButtonLoader/ButtonLoader'
import SearchDropdown from '../../../../components/SearchDropdown'
import { ReactComponent as TicketIcon } from '../../../../assets/widget-icons/home-icon.svg'
import classes from './SHSForm.module.scss'
import { useAdminGetClientListQuery } from '../../../../features/slices/clientUserApiSlice'
import useDebounce from '../../../../hooks/useDebounce'
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

const { Text, Title } = Typography
const { Option } = Select

const AddSHSForm = ({ toggleModal }) => {
  const [form] = Form.useForm()
  const [purchaseDate, setPurchaseDate] = useState('')
  const [regionState, setRegionState] = useState('')
  const [vendors, setVendors] = useState('')
  const [sectors, setSectors] = useState('')
  const [regions, setRegion] = useState('')
  const [search, setSearch] = useState('')
  const [err, setErr] = useState('')
  const handleChange = (value) => setSearch(value)
  const handleSearch = (value) => {
    setSearch(value)
  }

  const debounceValue = useDebounce(search, 200)

  const {
    data: clientList,
    isFetching: isFetchingClientList,
    isError: isErrorClientList,
  } = useAdminGetClientListQuery(debounceValue, {
    skip: debounceValue == '',
  })

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

  const {
    isFetching: fetchingState,
    isError: stateError,
    data: stateData,
  } = useListShsStatesQuery()

  const {
    isFetching: fetchingVendor,
    isError: vendorError,
    data: vendorData,
  } = useListShsVendorsQuery()

  const [assignShs, { isLoading, isSuccess, isError, error }] =
    useAssignShsMutation()

  const onFinish = async (values) => {
    try {
      await assignShs({
        ...values,
        purchased_date: purchaseDate,
        client_email: search,
      }).unwrap()

      toggleModal()
    } catch (error) {
      const { data } = error

      if (data) {
        setErr(
          `${Object.keys(data)[0]} : ${
            data[Object.keys(data)[0]]?.message || data[Object.keys(data)[0]]
          } `,
        )
      } else {
        setErr('An Error occurred')
      }
    }
  }

  useEffect(() => {
    if (regionData && regionData.results) {
      const regionsData = regionData.results.map((region, index) => (
        <Option value={region.id} key={index}>
          {region.name}
        </Option>
      ))
      setRegion(regionsData)
    }
  }, [regionData])

  useEffect(() => {
    if (!fetchingSector && !sectorError && sectorData.results) {
      const sectors = sectorData.results.map((sector, index) => (
        <Option value={sector.id} key={index}>
          {sector.name}
        </Option>
      ))
      setSectors(sectors)
    }
  }, [sectorData])

  const statePicker = (region) => {
    if (!fetchingState && !stateError && stateData) {
      const states = stateData
        .filter((aState) => aState.region_id === region)
        .map((state, index) => (
          <Option value={state.id} key={index}>
            {state.name}
          </Option>
        ))
      setRegionState(states)
    }
  }

  useEffect(() => {
    if (!fetchingVendor && !vendorError && vendorData.results) {
      const vendors = vendorData.results.map((region, index) => (
        <Option value={region.id} key={index}>
          {region.name}
        </Option>
      ))
      setVendors(vendors)
    }
  }, [vendorData])

  const loadingIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, marginRight: 10, color: '#66ab4f' }}
    />
  )

  useEffect(() => {
    if (isSuccess) {
      toast.success('SHS Added', {
        hideProgressBar: true,
        autoClose: 3000,
        theme: 'colored',
      })
    }
  }, [isSuccess])

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength,
      )
    }
  }

  return (
    <Form
      name="newUser"
      className={classes.AddSHSForm}
      form={form}
      onFinish={onFinish}
      requiredMark={false}
      layout="vertical"
      labelCol={{
        span: 32,
      }}
      wrapperCol={{
        span: 32,
      }}
    >
      <div className="inputGroupField">
        <Form.Item
          name="client_email"
          label="Customer Email"
          style={{ marginBottom: '12px', flex: 1 }}
        >
          <div className={classes.AddSHSForm__EmailField}>
            <div className={classes.AddSHSForm__SelectInput}>
              <SearchDropdown
                value={search}
                placeholder="Enter users email"
                data={clientList}
                handleChange={handleChange}
                handleSearch={handleSearch}
                loading={isFetchingClientList}
              />
              {err && err.client_email && (
                <Text type="danger">{err.client_email}</Text>
              )}
            </div>
            {debounceValue.length === 0 ? (
              ''
            ) : (
              <div>
                {' '}
                {isFetchingClientList ? (
                  <div className={classes.AddSHSForm__Loader}>
                    {' '}
                    <Spin indicator={loadingIcon} />
                  </div>
                ) : clientList?.length === 0 ? (
                  <div className={classes.AddSHSForm__Closed}>
                    {' '}
                    <ExclamationCircleOutlined />
                  </div>
                ) : clientList?.length != 0 ? (
                  <div className={classes.AddSHSForm__Check}>
                    {' '}
                    <CheckCircleOutlined />
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item
          name="device_name"
          label="Device Name"
          style={{ marginBottom: '12px', flex: 1 }}
          rules={[{ required: true, message: 'Enter a device name' }]}
        >
          <Input
            placeholder="Enter a device name"
            className={classes.AddSHSForm__input}
          />
        </Form.Item>
      </div>
      <div className="inputGroupField">
        <Form.Item
          name="region_id"
          label="Select Region"
          rules={[
            {
              required: true,
              message: 'Please select a region',
            },
          ]}
          style={{ marginBottom: '8px', flex: 1 }}
        >
          <Select
            className={classes.AddSHSForm__select}
            placeholder="Select Region"
            onChange={() => {}}
            onSelect={statePicker}
            allowClear
          >
            {regions}
          </Select>
        </Form.Item>

        <Form.Item
          name="state_id"
          label="Select State"
          rules={[
            {
              required: true,
              message: 'Please select a state',
            },
          ]}
          style={{ marginBottom: '8px', flex: 1 }}
        >
          <Select
            className={classes.AddSHSForm__select}
            placeholder="Select State"
            onChange={() => {}}
            allowClear
          >
            {regionState}
          </Select>
        </Form.Item>
      </div>
      <div className="inputGroupField">
        <Form.Item
          name="vendor_id"
          label="Select Vendor"
          rules={[
            {
              required: true,
              message: 'Please select a vendor',
            },
          ]}
          style={{ marginBottom: '8px', flex: 1 }}
        >
          <Select
            className={classes.AddSHSForm__select}
            placeholder="Select Vendor"
            onChange={() => {}}
            allowClear
          >
            {vendors}
          </Select>
        </Form.Item>

        <Form.Item
          name="sector_id"
          label="Select Sector"
          rules={[
            {
              required: true,
              message: 'Please select a sector',
            },
          ]}
          style={{ marginBottom: '8px', flex: 1 }}
        >
          <Select
            className={classes.AddSHSForm__select}
            placeholder="Select Sector"
            onChange={() => {}}
            allowClear
          >
            {sectors}
          </Select>
        </Form.Item>
      </div>
      <div className="inputGroupField">
        <Form.Item
          name="device_id"
          label="Unique Equipment Identifier"
          style={{ marginBottom: '12px', flex: 1 }}
          rules={[
            {
              required: true,
              message: 'Please enter Unique Equipment Identifier',
            },
          ]}
        >
          <Input
            placeholder={`Enter your unique identifier`}
            className={classes.AddSHSForm__input}
          />
        </Form.Item>

        <Form.Item
          name="capacity"
          label="Capacity"
          style={{ marginBottom: '12px', flex: 1 }}
          rules={[{ required: true, message: 'Please enter device capacity' }]}
        >
          <Input
            placeholder={`Device capacity(not more than 3 digits)`}
            className={classes.AddSHSForm__input}
            type="number"
            min="0"
            maxLength="3"
            onInput={maxLengthCheck}
            onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
            oninput="validity.valid||(value='')"
          />
        </Form.Item>
      </div>
      <div className="inputGroupField">
        <Form.Item
          name="serial_number"
          label="Serial number"
          style={{ marginBottom: '12px', flex: 1 }}
          rules={[{ required: true, message: 'Please enter serial number' }]}
        >
          <Input
            placeholder={`Enter Serial number`}
            className={classes.AddSHSForm__input}
            type="number"
            min="0"
            onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
            oninput="validity.valid||(value='')"
          />
        </Form.Item>

        <Form.Item
          name="purchaseDate"
          label="Purchase Date"
          style={{ marginBottom: '12px', flex: 1 }}
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker
            size="large"
            className={classes.AddSHSForm__datePicker}
            showToday={false}
            onChange={(d, ds) => setPurchaseDate(ds)}
            disabledDate={(current) =>
              current && current.toDate() >= new Date()
            }
          />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="address"
          label="Customer Address"
          style={{ marginBottom: '12px', flex: 1 }}
          rules={[{ required: true, message: 'Please enter a valid address' }]}
        >
          <Input.TextArea
            placeholder="Enter Address"
            className={classes.AddSHSForm__inputTextArea}
          />
        </Form.Item>
      </div>

      {err && (
        <Text type="danger" style={{ textTransform: 'capitalize' }}>
          {err}
        </Text>
      )}
      <div className={classes.AddSHSForm__btn}>
        <Button
          className={classes.AddSHSForm__cancelBtn}
          type="default"
          onClick={toggleModal}
        >
          Cancel
        </Button>
        <Button className={classes.AddSHSForm__submitBtn} htmlType="submit">
          {isLoading ? <ButtonLoader color="#fff" /> : 'Proceed'}
        </Button>
      </div>
      <ToastContainer />
    </Form>
  )
}

const SHSForm = ({ isOpen, toggleModal }) => {
  return (
    <Modal
      title={
        <div className={classes.SHSForm__header}>
          <TicketIcon style={{ marginBottom: '15px' }} />
          <Title
            level={5}
            className={classes.SHSForm__title}
            style={{ marginTop: 4 }}
          >
            Add SHS
          </Title>
          <Text type="secondary" className={classes.SHSForm__subTitle}>
            Please enter email and customer unique equipment identifier to
            assign a SHS to a customer &trade;
          </Text>
        </div>
      }
      centered
      open={isOpen}
      onOk={toggleModal}
      onCancel={toggleModal}
      width={705}
      footer={null}
    >
      <AddSHSForm toggleModal={toggleModal} />
    </Modal>
  )
}

export default SHSForm
