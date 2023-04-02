import React from 'react'
import ReactAvatar from 'react-avatar'
import { RightOutlined } from '@ant-design/icons'

const Footer = ({ userName, toggleActivateShsModal, isAdmin }) => {
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
      <RightOutlined
        style={{ color: '#808080' }}
        onClick={toggleActivateShsModal}
      />
    </div>
  )
}

export default Footer
