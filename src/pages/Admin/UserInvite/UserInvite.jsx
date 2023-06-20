import { Button, Space, Typography } from 'antd'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'

import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import classes from '../../Customer/UserInvite/UserInvite.module.scss'
import { useAcceptInviteMutation } from '../../../features/slices/users/usersSlice'

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
  const [searchParams] = useSearchParams()

  const email = searchParams.get('email')
  const role = searchParams.get('role')
  const name = searchParams.get('initiator-name')

  const [acceptInvite, { isLoading, isSuccess, isError, error }] =
    useAcceptInviteMutation()

  const handleAccept = () => {
    localStorage.clear();
    acceptInvite({ invitee_email: email, role })
  }

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate(`/admin/sign-up?email=${email}`)
    }

    if (isError) {
      toast.error('Internal Error', {
        hideProgressBar: true,
        autoClose: 3000,
        theme: 'colored',
      })
    }
  }, [isLoading, isSuccess, isError, email, navigate])

  return (
    <div className={classes.UserInvite}>
      <div className={classes.UserInvite__msgBox}>
        <Logo />
        <div className={classes.UserInvite__textBox}>
          <Title className={classes.UserInvite__title}>
            Monitor and collaborate with {name}
          </Title>
          <Text>{message(name, role)}</Text>
        </div>
        <Button onClick={handleAccept} className={classes.UserInvite__btn}>
          {isLoading ? <ButtonLoader color="#fff" /> : 'Accept Invitation'}
        </Button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserInvite
