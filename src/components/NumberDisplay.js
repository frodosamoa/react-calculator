import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';

import { Row, Col } from 'react-flexbox-grid';

import { flexboxGridColumnWidth } from '../utils/grid';

import {
  getNumberDisplay,
  getOperatorDisplay,
} from '../reducers/calculator';

import { operators } from '../constants';

const NumberDisplay = ({ operator, numberDisplay }) => (
  <Row className={styles.row}>
    <Col {...flexboxGridColumnWidth(1 / 12)} className={classnames(styles.numberDisplay)}>
      {operator}
    </Col>
    <Col {...flexboxGridColumnWidth(11 / 12)} className={classnames(styles.numberDisplay)}>
      {numberDisplay}
    </Col>
  </Row>
);

export default connect(state => ({
  numberDisplay: getNumberDisplay(state),
  operator: getOperatorDisplay(state),
}))(NumberDisplay);
