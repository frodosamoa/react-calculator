import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { typeOperator } from '../actions';
import { flexboxGridColumnWidth } from '../utils/grid';

const OperatorCell = ({ operator, onTypeOperator }) => (
  <Col
    className={classnames(styles.operatorCell)}
    {...flexboxGridColumnWidth(1)}
    onClick={() => onTypeOperator()}
  >
    {operator}
  </Col>
);

OperatorCell.propTypes = {
  operator: PropTypes.string.isRequired,
  onTypeOperator: PropTypes.func.isRequired,
};

export default connect(
  null,
  (dispatch, ownProps) => ({
    onTypeOperator: () => {
      dispatch(typeOperator(ownProps.actionType));
    },
  }),
)(OperatorCell);
