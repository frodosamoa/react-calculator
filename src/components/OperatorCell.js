import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.css';

import { Col } from 'react-flexbox-grid';

import { typeOperator } from '../actions';

import { fullRow } from '../utils/grid';

let operatorCell = ({ operator, onTypeOperator, isActive }) => (
  <Col
    className={classnames(styles.cell, styles.operatorCell, isActive ? styles.isActive : '')}
    {...fullRow}
    onClick={() => onTypeOperator(operator)}>
    {operator}
  </Col>
);

export default connect(
  (state, ownProps) => ({
    isActive: state.operator === ownProps.operator
  }),
  (dispatch) => ({
    onTypeOperator: (operator) => {
      dispatch(typeOperator(operator));
    }
  })
)(operatorCell);