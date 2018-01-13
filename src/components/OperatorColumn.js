import React from 'react';
import classnames from 'classnames';
import styles from './calculator.css';
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
    display: '÷',
    actionType: DIVIDE
  },
  {
    display: 'x',
    actionType: MULTIPLY
  },
  {
    display: '–',
    actionType: SUBTRACT
  },
  {
    display: '+',
    actionType: ADD
  },
  {
    display: '=',
    actionType: EQUALS
  }
];

const OperatorColumn = () => (
  <Col {...fourthRow}>
    {operators.map((operator) => (
      <Row key={operator.actionType} className={styles.row}>
        <OperatorCell
          actionType={operator.actionType}
          operator={operator.display} />
      </Row>
    ))}
  </Col>
)

export default OperatorColumn;