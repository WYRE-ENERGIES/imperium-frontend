import { HiOutlineRefresh } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'
import React from 'react'
import ReactAvatar from 'react-avatar'
import { logOutUser } from '../../../features/slices/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Footer = ({ userName, toggleActivateShsModal, isAdmin }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    const navigateTo = isAdmin ? '/admin' : '/'
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
      {!isAdmin ? (
        <HiOutlineRefresh
          style={{ cursor: 'pointer' }}
          color="C4C4C4"
          onClick={toggleActivateShsModal}
        />
      ) : null}
      <MdLogout
        style={{ cursor: 'pointer', color: 'red' }}
        onClick={onLogout}
      />
    </div>
  )
}

export default Footer
