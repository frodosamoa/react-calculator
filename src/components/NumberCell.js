import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.css';

import { Col } from 'react-flexbox-grid';

import { typeNumber } from '../actions';

import { fourthRow } from '../utils/grid';

let NumberCell = ({ number, onTypeNumber, gridStyle = fourthRow }) => (
  <Col
    className={classnames(styles.cell, styles.numberCell)} 
    {...gridStyle}
    onClick={() => onTypeNumber(number)}>
    {number}
  </Col>
);

NumberCell = connect(
  null,
  (dispatch) => ({
    onTypeNumber: (value) => {
      dispatch(typeNumber(value));
    }
  })
)(NumberCell);

export default NumberCell;