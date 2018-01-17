/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { closeModal, searchComputations } from '../actions';

const ComputationsModal = ({
  isOpen,
  onCloseModal,
  onInputChange,
  visibleComputations,
  query,
}) => (
  <Modal
    ariaHideApp={false}
    isOpen={isOpen}
    onRequestClose={onCloseModal}
  >
    <input type="text" onChange={e => onInputChange(e)} value={query} />
    <button onClick={() => onCloseModal()}>
      Close
    </button>
    <ul>
      {visibleComputations.map((c, index) => (
        <li key={index}>{c}</li>
      ))}
    </ul>
  </Modal>
);

ComputationsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  visibleComputations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(
  state => ({
    isOpen: state.modal.isOpen,
    visibleComputations: state.calculator.computations.map(c => c.toString()).filter(c =>
      c.includes(state.modal.query)),
    query: state.modal.query,
  }),
  dispatch => ({
    onCloseModal: () => {
      dispatch(closeModal());
    },
    onInputChange: (e) => {
      dispatch(searchComputations(e.target.value));
    },
  }),
)(ComputationsModal);
/* eslint-enable react/no-array-index-key */
