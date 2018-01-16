import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { closeModal } from '../actions';
import { computationsSelector } from '../reducers/calculator';

const ComputationsModal = ({
  isOpen,
  onCloseModal,
  computations,
}) => (
  <Modal
    ariaHideApp={false}
    isOpen={isOpen}
    onRequestClose={onCloseModal}
  >
    <input type="text" />
    {computations.map((c, index) => (
      <li key={index}>{c.toString()}</li>
    ))}
    <button onClick={() => onCloseModal()}>
      Close me.
    </button>
  </Modal>
);

ComputationsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isOpen: state.modal.isOpen,
    computations: computationsSelector(state),
  }),
  dispatch => ({
    onCloseModal: () => {
      dispatch(closeModal());
    },
  }),
)(ComputationsModal);
