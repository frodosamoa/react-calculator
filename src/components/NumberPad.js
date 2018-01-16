import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { flexboxGridColumnWidth } from '../utils/grid';
import { clear, toFixed, openModal } from '../actions';
import NumberCell from './NumberCell';
import { numberPad } from '../constants';

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
      admin
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
    <NumberCell number={0} gridStyle={flexboxGridColumnWidth(2 / 3)} />
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
    {numberPad.map(row => (
      <Row key={row[0]} className={styles.row}>
        {row.map(number => (
          <NumberCell key={number} number={number} />
        ))}
      </Row>
    ))}
    <BottomRow />
  </Col>
);

export default NumberPad;
