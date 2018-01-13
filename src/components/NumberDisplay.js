import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.css';

import { Row, Col } from 'react-flexbox-grid';

import { fullRow } from '../utils/grid';

let NumberDisplay = ({ currentInput }) => (
  <Row className={styles.row}>
    <Col {...fullRow} className={classnames(styles.cell, styles.numberDisplay)}>
      {currentInput}
    </Col>
  </Row>
);


export default connect(
  (state) => ({
    currentInput: state.input
  })
)(NumberDisplay);