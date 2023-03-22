import { Row, Form, Input } from 'antd'
import React, { useState } from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import classes from './Details.module.scss'
import imageDesc from '../../../../../src/assets/Auth/Site Stats-amico 1.svg'
import DetailForm from '../../../../components/Auth/Forms/Details/DetailsForm'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import { useCustomerUpdateDetailsMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { useNavigate } from 'react-router-dom'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import Error from '../../../../components/ErrorMessage/Error'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'

const Details = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Energy Analytics Dashboard',
    tagline:
      'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.',
    ImgHeight: '3px',
  }
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [customerUpdateDetails, { isLoading }] =
    useCustomerUpdateDetailsMutation()

  const onFinish = async (values) => {
    try {
      await customerUpdateDetails({
        credentials: values,
      }).unwrap()
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }
  return (
    <div className={classes.DetailsForm}>
      <Row>
        <LeftLayout>
          <div className={classes.DetailsForm__Form}>
            <div>
              <FormHeader
                header={'Details'}
                tagline={'Please fill in some details'}
              />
            </div>
            {errMsg && <Error Errormsg={errMsg} />}
            <Form
              name="details"
              labelCol={8}
              wrapperCol={32}
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              requiredMark="optional"
            >
              <Form.Item
                label={
                  <p style={{ marginBottom: '-10px', marginTop: '5px' }}>
                    First Name
                  </p>
                }
                name="first_name"
                required
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input
                  className={classes.DetailsForm__Input}
                  style={{ marginBottom: '-10px' }}
                  placeholder="Enter your first name"
                />
              </Form.Item>
              <Form.Item
                label={
                  <p style={{ marginBottom: '-10px', marginTop: '-5px' }}>
                    Last Name
                  </p>
                }
                name="last_name"
                required
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input
                  className={classes.DetailsForm__Input}
                  style={{ marginTop: '-4px' }}
                  placeholder="Enter your last name"
                />
              </Form.Item>
              <Form.Item
                label={
                  <p style={{ marginTop: '-7px', marginBottom: '-10px' }}>
                    Phone Number
                  </p>
                }
                name="phone"
                required
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input
                  className={classes.DetailsForm__Input}
                  style={{ marginBottom: '1px', marginTop: '-10xp' }}
                  placeholder="Enter your phone number"
                />
              </Form.Item>
              <Form.Item
                label={<p>Address</p>}
                name="address"
                required
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input.TextArea
                  className={classes.DetailsForm__Input}
                  style={{ marginTop: '-20px' }}
                  placeholder="Enter a Address..."
                />
              </Form.Item>
              <Form.Item>
                <FormButton action={'Continue'} isLoading={isLoading} />
              </Form.Item>
            </Form>
          </div>
        </LeftLayout>
        <RightLayout>
          <div className={classes.DetailsForm__Detail}>
            <FormDescription content={formDescription} />
          </div>
          <div className={classes.Detail__Indicator}>
            <PageIndicator pageNum={2} />
          </div>
        </RightLayout>
      </Row>
    </div>
  )
}

export default Details
