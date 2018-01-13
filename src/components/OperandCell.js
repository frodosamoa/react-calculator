import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.css';

import { Col } from 'react-flexbox-grid';

import { typeOperand } from '../actions';

import { fullRow } from '../utils/grid';

let OperandCell = ({ operand, onTypeOperand, isActive, gridStyle = fullRow }) => (
  <Col
    className={classnames(styles.cell, styles.operandCell, isActive ? styles.isActive : '')}
    {...gridStyle}
    onClick={() => onTypeOperand(operand)}>
    {operand}
  </Col>
);

export default connect(
  (state, ownProps) => ({
    isActive: state.operand === ownProps.operand
  }),
  (dispatch) => ({
    onTypeOperand: (operand) => {
      dispatch(typeOperand(operand));
    }
  })
)(OperandCell);