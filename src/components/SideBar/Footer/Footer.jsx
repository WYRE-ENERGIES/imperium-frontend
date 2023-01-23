import React from 'react'
import ReactAvatar from 'react-avatar'
import { HiOutlineRefresh } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'

const Footer = ({ userName }) => {
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
      <HiOutlineRefresh color="C4C4C4" />
      <MdLogout />
    </div>
  )
}

export default Footer
