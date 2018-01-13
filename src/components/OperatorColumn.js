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
} from '../constants';

const operators = [
  {
    operator: '÷',
    actionType: DIVIDE
  },
  {
    operator: 'x',
    actionType: MULTIPLY
  },
  {
    operator: '–',
    actionType: SUBTRACT
  },
  {
    operator: '+',
    actionType: ADD
  },
  {
    operator: '=',
    actionType: EQUALS
  }
];

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