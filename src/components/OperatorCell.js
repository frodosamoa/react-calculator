import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';

import { Col } from 'react-flexbox-grid';

import { typeOperator } from '../actions';

import { fullRow } from '../utils/grid';

let operatorCell = ({ operator, onTypeOperator, isActive }) => (
  <Col
    className={classnames(styles.operatorCell, isActive ? styles.active : '')}
    {...fullRow}
    onClick={() => onTypeOperator()}>
    {operator}
  </Col>
);

export default connect(
  (state, ownProps) => ({
    isActive: state.input.operator === ownProps.actionType
  }),
  (dispatch, ownProps) => ({
    onTypeOperator: () => {
      dispatch(typeOperator(ownProps.actionType));
    }
  })
)(operatorCell);