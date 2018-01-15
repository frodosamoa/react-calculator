import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';
import { Row, Col } from 'react-flexbox-grid';

import { flexboxGridColumnWidth } from '../utils/grid';

import OperatorCell from './OperatorCell';

import { operators } from '../constants';

import { equals } from '../actions';

const OperatorColumn = ({ onEquals }) => (
  <Col {...flexboxGridColumnWidth(1/4)}>
    {operators.map((operator) => (
      <Row key={operator.actionType} className={styles.row}>
        <OperatorCell {...operator} />
      </Row>
    ))}
      <Row className={styles.row}>
        <Col
          className={classnames(styles.operatorCell)}
          {...flexboxGridColumnWidth(1)}
          onClick={() => {
            onEquals();
          }}>
          {'='}
        </Col>
      </Row>
  </Col>
)

export default connect(
  null,
  (dispatch) => ({
    onEquals: () => {
      dispatch(equals());
    }
  })
)(OperatorColumn);
