import React from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';

import { globalKeyPress, listenToWindowEvent } from '../actions';

import NumberDisplay from './NumberDisplay';
import NumberPad from './NumberPad';
import OperatorColumn from './OperatorColumn';
import ComputationsModal from './ComputationsModal';

const Calculator = () => (
  <Grid fluid style={{ paddingLeft: 8, paddingRight: 8 }}>
    <NumberDisplay />
    <Row>
      <NumberPad />
      <OperatorColumn />
    </Row>
    <ComputationsModal />
  </Grid>
);

const composedCalculator = lifecycle({
  componentDidMount() {
    const { dispatch } = this.props;
    this.unlistenKeyPress = dispatch(listenToWindowEvent('keypress', globalKeyPress));
  },
  componentWillUnmount() {
    this.unlistenKeyPress();
  }
})(Calculator);

export default connect()(composedCalculator);
