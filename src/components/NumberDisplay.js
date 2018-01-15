import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Row, Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { flexboxGridColumnWidth } from '../utils/grid';
import {
  getNumberDisplay,
  getOperatorDisplay,
} from '../reducers/calculator';

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

NumberDisplay.propTypes = {
  operator: PropTypes.string.isRequired,
  numberDisplay: PropTypes.string.isRequired,
};

export default connect(state => ({
  numberDisplay: getNumberDisplay(state),
  operator: getOperatorDisplay(state),
}))(NumberDisplay);
