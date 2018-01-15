import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';

import { Col } from 'react-flexbox-grid';

import { typeOperator } from '../actions';

import { flexboxGridColumnWidth } from '../utils/grid';

let OperatorCell = ({ operator, onTypeOperator }) => (
  <Col
    className={classnames(styles.operatorCell)}
    {...flexboxGridColumnWidth(1)}
    onClick={() => onTypeOperator()}>
    {operator}
  </Col>
);

export default connect(
  null,
  (dispatch, ownProps) => ({
    onTypeOperator: () => {
      dispatch(typeOperator(ownProps.actionType));
    }
  })
)(OperatorCell);
