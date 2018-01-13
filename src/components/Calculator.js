import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {
  fullRow,
  halfRow,
  fourthRow
} from '../utils/grid';

import { clear } from '../actions';

import styles from './calculator.css'

import NumberDisplay from './NumberDisplay';
import NumberCell from './NumberCell';
import OperandCell from './OperandCell';


const Calculator = ({
  currentInput,
  onClear
}) => (
  <Grid fluid style={{paddingLeft: 8, paddingRight: 8}}>
    <NumberDisplay />
    <Row className={styles.row}>
      <Col {...fourthRow} className={classnames(styles.cell, styles.clearCell)} onClick={() => {
          onClear();
        }}>
          C
      </Col>
      <Col {...halfRow} className={classnames(styles.cell, styles.clearCell)}>admin</Col>
      <OperandCell operand={'/'} />
    </Row>
    <Row className={styles.row}>
      <NumberCell number={7} />
      <NumberCell number={8} />
      <NumberCell number={9} />
      <OperandCell operand={'x'} />
    </Row>
    <Row className={styles.row}>
      <NumberCell number={4} />
      <NumberCell number={5} />
      <NumberCell number={6} />
      <OperandCell operand={'-'} />
    </Row>
    <Row className={styles.row}>
      <NumberCell number={1} />
      <NumberCell number={2} />
      <NumberCell number={3} />
      <OperandCell operand={'+'} />
    </Row>
    <Row className={styles.row}>
      <NumberCell number={0} gridStyle={halfRow} />
      <NumberCell number={'.'} gridStyle={fourthRow} />
      <OperandCell operand={'='} />
    </Row>
  </Grid>
);

export default connect(
  null,
  (dispatch) => ({
    onClear: () => {
      dispatch(clear());
    }
  })
)(Calculator);
