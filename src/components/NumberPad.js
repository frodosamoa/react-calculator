import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './calculator.scss';
import { Row, Col } from 'react-flexbox-grid';

import {
  threeFourthsRow,
  twoThirdsRow,
  halfRow,
  thirdRow,
  fourthRow
} from '../utils/grid';

import NumberCell from './NumberCell';

const numberPad = [[7, 8, 9], [4, 5, 6], [1, 2, 3]];

const NumberPad = () => (
  <Col {...threeFourthsRow}>
    <Row className={styles.row}>
      <Col {...thirdRow} className={classnames(styles.cell, styles.clearCell)} onClick={() => {
        onClear();
      }}>
        C
      </Col>
      <Col {...twoThirdsRow} className={classnames(styles.cell, styles.clearCell)}>
        admin
      </Col>
    </Row>
    {numberPad.map((row, index) => (
      <Row key={index} className={styles.row}>
        {row.map((number) => (
          <NumberCell key={number} number={number} />
        ))}
      </Row>
    ))}
    <Row className={styles.row}>
      <NumberCell number={0} gridStyle={twoThirdsRow} />
      <NumberCell number={'.'} gridStyle={thirdRow} />
    </Row>
  </Col>
);
 
export default connect(
  null,
  (dispatch) => ({
    onClear: () => {
      dispatch(clear());
    }
  })
)(NumberPad);