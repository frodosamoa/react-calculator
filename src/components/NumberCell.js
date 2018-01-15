import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';

import { Col } from 'react-flexbox-grid';

import { typeNumber } from '../actions';

import { flexboxGridColumnWidth } from '../utils/grid';

let NumberCell = ({ number, onTypeNumber, gridStyle = flexboxGridColumnWidth(1/3)}) => (
  <Col
    className={classnames(styles.numberCell)}
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
