import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';
import { Row, Col } from 'react-flexbox-grid';

import { flexboxGridColumnWidth } from '../utils/grid';

import { clear, toFixed, openModal } from '../actions';

import NumberCell from './NumberCell';

const numberPad = [[7, 8, 9], [4, 5, 6], [1, 2, 3]];

const NumberPad = ({ onClear, onToFixed, onOpenModal }) => (
  <Col {...flexboxGridColumnWidth(3 / 4)}>
    <Row className={styles.row}>
      <Col
        {...flexboxGridColumnWidth(1 / 3)}
        className={classnames(styles.clearCell)}
        onClick={() => {
        onClear();
      }}
      >
        C
      </Col>
      <Col
        {...flexboxGridColumnWidth(2 / 3)}
        className={classnames(styles.clearCell)}
        onClick={() => {
        onOpenModal();
      }}
      >
        admin
      </Col>
    </Row>
    {numberPad.map((row, index) => (
      <Row key={index} className={styles.row}>
        {row.map(number => (
          <NumberCell key={number} number={number} />
        ))}
      </Row>
    ))}
    <Row className={styles.row}>
      <NumberCell number={0} gridStyle={flexboxGridColumnWidth(2 / 3)} />
      <Col
        className={classnames(styles.numberCell)}
        {...flexboxGridColumnWidth(1 / 3)}
        onClick={() => onToFixed()}
      >
        {'.'}
      </Col>
    </Row>
  </Col>
);

export default connect(
  null,
  dispatch => ({
    onClear: () => {
      dispatch(clear());
    },
    onToFixed: () => {
      dispatch(toFixed());
    },
    onOpenModal: () => {
      dispatch(openModal());
    },
  }),
)(NumberPad);
