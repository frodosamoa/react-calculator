import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import {
  fullRow,
  halfRow,
  fourthRow
} from '../utils/grid';

import {
  typeNumber,
  clear
} from '../actions';

let NumberCell = ({ number, onTypeNumber }) => (
  <Col {...fourthRow} onClick={() => onTypeNumber(number)}>
    {number}
  </Col>
);

NumberCell = connect(
  null,
  (dispatch) => ({
    onTypeNumber: (value) => {
      dispatch(typeNumber(value));
    }
  })
)(NumberCell);

const Calculator = ({
  currentComputation,
  onClear
}) => (
  <Grid fluid>
    <Row>
      <Col {...fullRow}>
        {currentComputation}
      </Col>
    </Row>
    <Row>
      <Col {...fourthRow} onClick={() => {
          onClear();
        }}>
          C
      </Col>
      <Col {...fourthRow}>+/-</Col>
      <Col {...fourthRow}>%</Col>
      <Col {...fourthRow}>/</Col>
    </Row>
    <Row>
      <NumberCell number={7} />
      <NumberCell number={8} />
      <NumberCell number={9} />
      <Col {...fourthRow}>x</Col>
    </Row>
    <Row>
      <NumberCell number={4} />
      <NumberCell number={5} />
      <NumberCell number={6} />
      <Col {...fourthRow}>-</Col>
    </Row>
    <Row>
      <NumberCell number={1} />
      <NumberCell number={2} />
      <NumberCell number={3} />
      <Col {...fourthRow}>+</Col>
    </Row>
    <Row>
      <Col {...halfRow}>0</Col>
      <Col {...fourthRow}>.</Col>
      <Col {...fourthRow}>=</Col>
    </Row>
  </Grid>
);

export default connect(
  (state) => ({
    currentComputation: state.computations[state.computations.length - 1]
  }),
  (dispatch) => ({
    onClear: () => {
      dispatch(clear());
    }
  })
)(Calculator);
