import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

const createRowSizeObject = (sizes, width, partition) =>
  sizes.reduce((acc, size) => {
      acc[size] = width * partition;
      return acc;
    }, {});

export default class Calculator extends Component {
  render () {
    const width = 12;
    const sizes = ['xs', 'sm', 'md', 'lg'];
    const fullRow = createRowSizeObject(sizes, width, 1);
    const fourthRow = createRowSizeObject(sizes, width, 1/4);
    const halfRow = createRowSizeObject(sizes, width, 1/2);

    return (
      <Grid fluid>
        <Row>
          <Col {...fullRow}>
            Display for calculators result
          </Col>
        </Row>
        <Row>
          <Col {...fourthRow}>C</Col>
          <Col {...fourthRow}>+/-</Col>
          <Col {...fourthRow}>%</Col>
          <Col {...fourthRow}>/</Col>
        </Row>
        <Row>
          <Col {...fourthRow}>7</Col>
          <Col {...fourthRow}>8</Col>
          <Col {...fourthRow}>9</Col>
          <Col {...fourthRow}>x</Col>
        </Row>
        <Row>
          <Col {...fourthRow}>4</Col>
          <Col {...fourthRow}>5</Col>
          <Col {...fourthRow}>6</Col>
          <Col {...fourthRow}>-</Col>
        </Row>
        <Row>
          <Col {...fourthRow}>1</Col>
          <Col {...fourthRow}>2</Col>
          <Col {...fourthRow}>3</Col>
          <Col {...fourthRow}>+</Col>
        </Row>
        <Row>
          <Col {...halfRow}>0</Col>
          <Col {...fourthRow}>.</Col>
          <Col {...fourthRow}>=</Col>
        </Row>
      </Grid>
    );
  }
}
