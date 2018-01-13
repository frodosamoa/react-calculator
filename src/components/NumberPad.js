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
    <Row className={styles.row}>
      <NumberCell number={7} />
      <NumberCell number={8} />
      <NumberCell number={9} />
    </Row>
    <Row className={styles.row}>
      <NumberCell number={4} />
      <NumberCell number={5} />
      <NumberCell number={6} />
    </Row>
    <Row className={styles.row}>
      <NumberCell number={1} />
      <NumberCell number={2} />
      <NumberCell number={3} />
    </Row>
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