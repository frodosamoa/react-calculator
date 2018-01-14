import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';

import { Row, Col } from 'react-flexbox-grid';

import {
  threeFourthsRow,
  fourthRow
} from '../utils/grid';

import {
  getNumberDisplay,
  getOperatorDisplay
} from '../reducers/calculator';

import { operators } from '../constants';

let NumberDisplay = ({ operator, numberDisplay }) => (
  <Row className={styles.row}>
    <Col {...fourthRow} className={classnames(styles.numberDisplay)}>
      {operator}
    </Col>
    <Col {...threeFourthsRow} className={classnames(styles.numberDisplay)}>
      {numberDisplay}
    </Col>
  </Row>
);

export default connect(
  (state) => ({
    numberDisplay: getNumberDisplay(state),
    operator: getOperatorDisplay(state)
  })
)(NumberDisplay);