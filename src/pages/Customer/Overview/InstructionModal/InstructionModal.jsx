import React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'

import classes from './InstructionModal.module.scss'

const InstructionModal = ({ open }) => {
  return (
    <Modal centered open={open} footer={null} className={classes.ModalMain}>
      <div className={classes.InstructionModal}>
        <h1>Welcome to Imperium Solar house system</h1>
        <h4>
          You do not have an active SHS connected to this account. How would you
          like to set up an SHS and enjoy all Imperium features?
        </h4>
        <div className={classes.InstructionModal__buttons}>
          <a
            href="#"
            target="_blank"
            className={classes.InstructionModal__buttonTop}
          >
            Visit Imperium Ecommerce to view all SHS offers
          </a>
          <Link
            to="/support"
            className={classes.InstructionModal__buttonBottom}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </Modal>
  )
}

export default InstructionModal
