import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.css';

import { Col } from 'react-flexbox-grid';

import { typeOperand } from '../actions';

import { fourthRow } from '../utils/grid';

let OperandCell = ({ operand, onTypeOperand, isActive }) => (
  <Col
    className={classnames(styles.cell, styles.operandCell, isActive ? styles.isActive : '')}
    {...fourthRow}
    onClick={() => onTypeOperand(operand)}>
    {operand}
  </Col>
);

OperandCell = connect(
  (state, ownProps) => ({
    isActive: state.operand === ownProps.operand
  }),
  (dispatch) => ({
    onTypeOperand: (operand) => {
      dispatch(typeOperand(operand));
    }
  })
)(OperandCell);

export default OperandCell;