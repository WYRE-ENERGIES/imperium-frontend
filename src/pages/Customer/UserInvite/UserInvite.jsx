import { Button, Space, Typography } from 'antd'

import { ReactComponent as Logo } from '../../../assets/logo.svg'
import React from 'react'
import classes from './UserInvite.module.scss'
import { useNavigate } from 'react-router-dom'

const { Text, Title } = Typography

const message = (username, role) => {
  return (
    <Space direction="vertical" className={classes.UserInvite__txt}>
      <Text>Hello 👋🏻,</Text>
      <Text>
        {`${username} has invited you to join ${username}'s imperium SHS monitoring system as a ${role}.`}
      </Text>
      <Text>
        {role === 'admin'
          ? "You can view all the statistics has well has shutdown SHS's if needed."
          : 'You will have the ability to view all statistics and all the SHS systems.'}
      </Text>
      <Text>Ready? It only takes a minute to set up.</Text>
    </Space>
  )
}

const UserInvite = () => {
  const navigate = useNavigate()

  const handleAccept = () => {
    navigate('/signup')
  }

  return (
    <div className={classes.UserInvite}>
      <div className={classes.UserInvite__msgBox}>
        <Logo />
        <div className={classes.UserInvite__textBox}>
          <Title className={classes.UserInvite__title}>
            Monitor and collaborate with Emeka
          </Title>
          <Text>{message('Emeka', 'admin')}</Text>
        </div>
        <Button onClick={handleAccept} className={classes.UserInvite__btn}>
          Accept Invitation
        </Button>
      </div>
    </div>
  )
}

export default UserInvite
