import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';

import { Col } from 'react-flexbox-grid';

import { typeOperator } from '../actions/index';

import { fullRow } from '../utils/grid';

let operatorCell = ({ operator, onTypeOperator }) => (
  <Col
    className={classnames(styles.operatorCell)}
    {...fullRow}
    onClick={() => onTypeOperator()}>
    {operator}
  </Col>
);

export default connect(
  (state, ownProps) => ({
    isActive: state.operator === ownProps.actionType
  }),
  (dispatch, ownProps) => ({
    onTypeOperator: () => {
      dispatch(typeOperator(ownProps.actionType));
    }
  })
)(operatorCell);