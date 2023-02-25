import { Button, Modal, Radio, Spin, Typography } from 'antd'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import ReactAvatar from 'react-avatar'
import { ReactComponent as TicketIcon } from '../../assets/logout-modal-icon.svg'
import classes from './SwitchAccount.module.scss'
import { useGetUserClientListQuery } from '../../features/slices/clientUserSlice'

const { Text, Title } = Typography

const Options = ({ name, email, username, value, selected }) => (
  <Radio
    value={value}
    className={`${classes.SwitchAccount__option} ${
      selected === value && classes.SwitchAccount__selectedOption
    }`}
  >
    <div className={classes.SwitchAccount__left}>
      <ReactAvatar size={30} round={true} name={name} color="#C4C4C4" />
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
  const [selected, setSelected] = useState(null)

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const { isFetching, data, isError } = useGetUserClientListQuery()

  return (
    <div className={classes.SwitchAccount__content}>
      {isFetching ? (
        <Spin />
      ) : (
        <>
          <Radio.Group onChange={handleChange}>
            {data.map((option) => (
              <Options
                key={option.id}
                name={option.fullname}
                email={option.email}
                username={option.username}
                value={option}
                selected={selected}
              />
            ))}
          </Radio.Group>
          <div className={classes.SwitchAccount__btn}>
            <div>
              <Link className={classes.SwitchAccount__logoutBtn} to="/">
                <MdLogout /> Log Out
              </Link>
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

const SwitchAccount = ({ isOpen, toggleModal }) => {
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
      <SwitchAccountContent toggleModal={toggleModal} />
    </Modal>
  )
}

export default SwitchAccount
