import { MdLogout } from 'react-icons/md'
import React from 'react'
import ReactAvatar from 'react-avatar'
import { RightOutlined } from '@ant-design/icons'
import { logOutUser } from '../../../features/slices/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Footer = ({ userName, toggleActivateShsModal, isAdmin }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    const navigateTo = isAdmin ? '/admin/sign-in' : '/'
    dispatch(logOutUser())
    navigate(navigateTo)
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 8px',
      }}
    >
      <ReactAvatar size={30} round={true} name={userName} color="#C4C4C4" />
      <span>{userName}</span>
      {isAdmin ? (
        <MdLogout
          style={{ cursor: 'pointer', color: 'red' }}
          onClick={onLogout}
        />
      ) : (
        <RightOutlined
          style={{ color: '#808080' }}
          onClick={toggleActivateShsModal}
        />
      )}
    </div>
  )
}

export default Footer
