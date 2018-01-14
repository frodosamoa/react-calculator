import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';

import { Row, Col } from 'react-flexbox-grid';

import { fullRow } from '../utils/grid';

import { getNumberDisplay } from '../reducers/input';

let NumberDisplay = ({ currentInput }) => (
  <Row className={styles.row}>
    <Col {...fullRow} className={classnames(styles.numberDisplay)}>
      {currentInput}
    </Col>
  </Row>
);

export default connect(
  (state) => ({
    currentInput: getNumberDisplay(state)
  })
)(NumberDisplay);