import { Button, Modal, Radio, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { logOutUser, switchClient } from '../../features/slices/auth/authSlice'

import { Link } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import ReactAvatar from 'react-avatar'
import { ReactComponent as TicketIcon } from '../../assets/logout-modal-icon.svg'
import classes from './SwitchAccount.module.scss'
import { useDispatch } from 'react-redux'
import { useGetUserClientListQuery } from '../../features/slices/clientUserApiSlice'
import { useNavigate } from 'react-router'

const { Text, Title } = Typography

const Options = ({ name, email, username, value, selected }) => (
  <Radio
    value={value}
    className={`${classes.SwitchAccount__option} ${
      selected === value && classes.SwitchAccount__selectedOption
    }`}
  >
    <div className={classes.SwitchAccount__left}>
      <ReactAvatar
        size={30}
        round={true}
        name={name}
        color={selected === value ? '#385E2B' : '#C4C4C4'}
        fgColor={selected === value ? '#C4C4C4' : '#385E2B'}
      />
      <div className={classes.SwitchAccount__names}>
        <h3
          className={`${classes.SwitchAccount__name} ${
            selected === value && classes.SwitchAccount__selectedName
          }`}
        >
          {name}{' '}
          <span
            style={{
              color: selected === value ? '#66ab4f' : '',
            }}
          >
            @{username}
          </span>
        </h3>
        <h4
          className={`${classes.SwitchAccount__email} ${
            selected === value && classes.SwitchAccount__selectedEmail
          }`}
        >
          {email}
        </h4>
      </div>
    </div>
  </Radio>
)

const SwitchAccountContent = ({ toggleModal, isAdmin }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [list, setList] = useState([])

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const onProceed = () => {
    dispatch(switchClient(selected))
    navigate(0)
  }

  const onLogout = () => {
    const navigateTo = isAdmin ? '/admin/sign-in' : '/'
    dispatch(logOutUser())
    navigate(navigateTo)
  }

  const { isFetching, data, isError } = useGetUserClientListQuery()

  useEffect(() => {
    if (isFetching) return
    if (isError) {
      setList([])
      return
    }

    if (data?.current) {
      setSelected(data?.current)
    }
    setList(data.response)
  }, [isFetching, isError])

  return (
    <div className={classes.SwitchAccount__content}>
      {isFetching ? (
        <Spin />
      ) : isError ? (
        <h1 style={{ textAlign: 'center' }}>An Error Occurred</h1>
      ) : (
        <>
          <Radio.Group onChange={handleChange} defaultValue={selected}>
            {list?.map((option) => (
              <Options
                key={option.id}
                name={option.name}
                email={option.email}
                username={option.username}
                value={option.id}
                selected={selected}
              />
            ))}
          </Radio.Group>
          <div className={classes.SwitchAccount__btn}>
            <div>
              <Button
                className={classes.SwitchAccount__logoutBtn}
                onClick={onLogout}
              >
                <MdLogout /> Log Out
              </Button>
            </div>
            <div className={classes.SwitchAccount__actionBtn}>
              <Button
                className={classes.SwitchAccount__cancelBtn}
                type="default"
                onClick={toggleModal}
              >
                Cancel
              </Button>
              <Button
                className={classes.SwitchAccount__submitBtn}
                htmlType="submit"
                onClick={onProceed}
                disabled={isError}
              >
                Proceed
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const SwitchAccount = ({ isOpen, toggleModal, isAdmin }) => {
  return (
    <Modal
      centered
      open={isOpen}
      onOk={toggleModal}
      onCancel={toggleModal}
      width={528}
      footer={null}
      title={
        <div className={classes.SwitchAccount__header}>
          <TicketIcon style={{ marginBottom: '15px' }} />
          <Title
            level={5}
            className={classes.SwitchAccount__title}
            style={{ marginTop: 4 }}
          >
            Manage Accounts
          </Title>
          <Text type="secondary" className={classes.SwitchAccount__subTitle}>
            Switch and manage Client accounts
          </Text>
        </div>
      }
    >
      <SwitchAccountContent toggleModal={toggleModal} isAdmin={isAdmin} />
    </Modal>
  )
}

export default SwitchAccount
