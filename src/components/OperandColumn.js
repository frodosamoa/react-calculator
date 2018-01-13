import React from 'react';
import classnames from 'classnames';
import styles from './calculator.css';
import { Row, Col } from 'react-flexbox-grid';

import {
  fourthRow
} from '../utils/grid';

import OperandCell from './OperandCell';

const OperandColumn = () => (
  <Col {...fourthRow}>
    <Row className={styles.row}>
      <OperandCell operand={'÷'} />
    </Row>
    <Row className={styles.row}>
      <OperandCell operand={'x'} />
    </Row>
    <Row className={styles.row}>
      <OperandCell operand={'–'} />
    </Row>
    <Row className={styles.row}>
      <OperandCell operand={'+'} />
    </Row>
    <Row className={styles.row}>
      <OperandCell operand={'='} />
    </Row>
  </Col>
)

export default OperandColumn;