import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { typeOperator } from '../actions';
import { flexboxGridColumnWidth } from '../utils/grid';

const OperatorCell = ({ display, onTypeOperator }) => (
  <Col
    className={styles.operatorCell}
    {...flexboxGridColumnWidth(1)}
    onClick={() => onTypeOperator()}
  >
    {display}
  </Col>
);

OperatorCell.propTypes = {
  display: PropTypes.string.isRequired,
  onTypeOperator: PropTypes.func.isRequired,
};

export default connect(
  null,
  (dispatch, ownProps) => ({
    onTypeOperator: () => {
      dispatch(typeOperator(ownProps.constant));
    },
  }),
)(OperatorCell);
