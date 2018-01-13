import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';

import { Col } from 'react-flexbox-grid';

import { typeNumber } from '../actions';

import { thirdRow } from '../utils/grid';

let NumberCell = ({ number, onTypeNumber, gridStyle = thirdRow }) => (
  <Col
    className={classnames(styles.cell, styles.numberCell)} 
    {...gridStyle}
    onClick={() => onTypeNumber(number)}>
    {number}
  </Col>
);

export default connect(
  null,
  (dispatch) => ({
    onTypeNumber: (value) => {
      dispatch(typeNumber(value));
    }
  })
)(NumberCell);
