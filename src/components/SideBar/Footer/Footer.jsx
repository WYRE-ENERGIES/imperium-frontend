import { HiOutlineRefresh } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'
import React from 'react'
import ReactAvatar from 'react-avatar'

const Footer = ({ userName, toggleActivateShsModal }) => {
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
      <HiOutlineRefresh
        style={{ cursor: 'pointer' }}
        color="C4C4C4"
        onClick={toggleActivateShsModal}
      />
      <MdLogout />
    </div>
  )
}

export default Footer
