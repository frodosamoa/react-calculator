import React from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';

import { closeModal } from '../actions';

const ComputationsModal = ({
  isOpen,
  onCloseModal,
}) => (
  <Modal
    ariaHideApp={false}
    isOpen={isOpen}
    onRequestClose={onCloseModal}
  >

    <button onClick={() => {
      onCloseModal();
    }}
    >
      Close me.
    </button>
  </Modal>
);

export default connect(
  state => ({
    isOpen: state.modal,
  }),
  dispatch => ({
    onCloseModal: () => {
      dispatch(closeModal());
    },
  }),
)(ComputationsModal);