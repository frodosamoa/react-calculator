import React from 'react';
import classnames from 'classnames';
import styles from './calculator.scss';
import { Row, Col } from 'react-flexbox-grid';

import {
  fourthRow
} from '../utils/grid';

import OperatorCell from './OperatorCell';

import {
  ADD,
  SUBTRACT,
  DIVIDE,
  MULTIPLY,
  EQUALS
} from '../actions/actionTypes';

import { operators } from '../constants';

const OperatorColumn = () => (
  <Col {...fourthRow}>
    {operators.map((operator) => (
      <Row key={operator.actionType} className={styles.row}>
        <OperatorCell {...operator} />
      </Row>
    ))}
  </Col>
)

export default OperatorColumn;