import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { flexboxGridColumnWidth } from '../utils/grid';
import { clear, toFixed, openModal } from '../actions';
import NumberCell from './NumberCell';

let TopRow = ({ onClear, onOpenModal }) => (
  <Row className={styles.row}>
    <Col
      {...flexboxGridColumnWidth(1 / 3)}
      className={styles.clearCell}
      onClick={() => onClear()}
    >
      C
    </Col>
    <Col
      {...flexboxGridColumnWidth(2 / 3)}
      className={styles.clearCell}
      onClick={() => onOpenModal()}
    >
      list
    </Col>
  </Row>
);

TopRow.propTypes = {
  onClear: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

TopRow = connect(
  null,
  dispatch => ({
    onClear: () => {
      dispatch(clear());
    },
    onOpenModal: () => {
      dispatch(openModal());
    },
  }),
)(TopRow);

let BottomRow = ({ onToFixed }) => (
  <Row className={styles.row}>
    <NumberCell number={'0'} gridStyle={flexboxGridColumnWidth(2 / 3)} />
    <Col
      className={styles.numberCell}
      {...flexboxGridColumnWidth(1 / 3)}
      onClick={() => onToFixed()}
    >
      {'.'}
    </Col>
  </Row>
);

BottomRow.propTypes = {
  onToFixed: PropTypes.func.isRequired,
};

BottomRow = connect(
  null,
  dispatch => ({
    onToFixed: () => {
      dispatch(toFixed());
    },
  }),
)(BottomRow);

const NumberPad = () => (
  <Col {...flexboxGridColumnWidth(3 / 4)}>
    <TopRow />
    <Row className={styles.row}>
      <NumberCell number={'7'} />
      <NumberCell number={'8'} />
      <NumberCell number={'9'} />
    </Row>
    <Row className={styles.row}>
      <NumberCell number={'4'} />
      <NumberCell number={'5'} />
      <NumberCell number={'6'} />
    </Row>
    <Row className={styles.row}>
      <NumberCell number={'1'} />
      <NumberCell number={'2'} />
      <NumberCell number={'3'} />
    </Row>
    <BottomRow />
  </Col>
);

export default NumberPad;
