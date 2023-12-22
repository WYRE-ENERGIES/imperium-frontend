import React from 'react';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { Modal } from 'antd';
import { logOutUser } from '../../../../features/slices/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import classes from './InstructionModal.module.scss';

const InstructionModal = ({ open, isAdmin, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailClick = (event) => {
    if (navigator.share) {
      navigator.share({
        title: 'Contact Support',
        text: 'Compose an email',
        url: 'mailto:imperiumbysterling@gmail.com',
      })
      .then(() => console.log('Share dialog opened'))
      .catch((error) => console.error('Error opening share dialog:', error));
    } else {
      window.location.href = event.target.href;
    }

    // Prevent the default click action
    event.preventDefault();
  };

  const onLogout = () => {
    const navigateTo = isAdmin ? '/admin/sign-in' : '/';
    dispatch(logOutUser());
    navigate(navigateTo);
  };

  return (
    <Modal centered open={open} footer={null} className={classes.ModalMain}>
      <div className={classes.InstructionModal}>
        <div
          className={classes.InstructionModal__CloseIcon}
          onClick={() => setOpen(!open)}
        >
          <CloseOutlined />
        </div>
        <h1>Welcome to Imperium Solar house system</h1>
        <h4>
          You do not have an active SHS connected to this account. Would you
          like to set up an SHS and enjoy all Imperium features?
          <div>You can contact support via email to imperiumbysterling@gmail.com</div>
        </h4>
        <div className={classes.InstructionModal__buttons}>
          <a
            href="https://www.imperiumng.com/"
            rel="noreferrer"
            target="_blank"
            className={classes.InstructionModal__buttonTop}
          >
            Visit Imperium Ecommerce to view all SHS offers
          </a>
          <a
            href="mailto:imperiumbysterling@gmail.com"
            rel="noreferrer"
            target="_blank"
            className={classes.InstructionModal__buttonBottom}
            onClick={handleEmailClick}
          >
            Contact Support
          </a>
          <div
            className={classes.InstructionModal__logoutBottom}
            onClick={onLogout}
          >
            <MdLogout />
            <span> Log Out</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InstructionModal;
