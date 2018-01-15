import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import NumberDisplay from './NumberDisplay';
import NumberPad from './NumberPad';
import OperatorColumn from './OperatorColumn';
import ComputationsModal from './ComputationsModal';

const Calculator = () => (
  <Grid fluid style={{paddingLeft: 8, paddingRight: 8}}>
    <NumberDisplay />
    <Row>
      <NumberPad />
      <OperatorColumn />
    </Row>
    <ComputationsModal />
  </Grid>
);

export default Calculator;
