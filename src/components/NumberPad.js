import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { flexboxGridColumnWidth } from '../utils/grid';
import { clear, toFixed, openModal } from '../actions';
import NumberCell from './NumberCell';
import { numberPad } from '../constants';

const NumberPad = ({ onClear, onToFixed, onOpenModal }) => (
  <Col {...flexboxGridColumnWidth(3 / 4)}>
    <Row className={styles.row}>
      <Col
        {...flexboxGridColumnWidth(1 / 3)}
        className={styles.clearCell}
        onClick={() => {
        onClear();
      }}
      >
        C
      </Col>
      <Col
        {...flexboxGridColumnWidth(2 / 3)}
        className={styles.clearCell}
        onClick={() => {
        onOpenModal();
      }}
      >
        admin
      </Col>
    </Row>
    {numberPad.map(row => (
      <Row key={row[0]} className={styles.row}>
        {row.map(number => (
          <NumberCell key={number} number={number} />
        ))}
      </Row>
    ))}
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
  </Col>
);

NumberPad.propTypes = {
  onClear: PropTypes.func.isRequired,
  onToFixed: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

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
