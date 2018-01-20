import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { flexboxGridColumnWidth } from '../utils/grid';
import { getOperatorDisplay } from '../reducers/calculator';

const NumberDisplay = ({ operator, currentValue }) => (
  <Row className={styles.row}>
    <Col {...flexboxGridColumnWidth(1 / 12)} className={styles.numberDisplay}>
      {operator}
    </Col>
    <Col {...flexboxGridColumnWidth(11 / 12)} className={styles.numberDisplay}>
      {currentValue}
    </Col>
  </Row>
);

NumberDisplay.propTypes = {
  operator: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired
};

export default connect(state => ({
  currentValue: state.calculator.currentValue,
  operator: getOperatorDisplay(state)
}))(NumberDisplay);
