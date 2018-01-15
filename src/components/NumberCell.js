import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { typeNumber } from '../actions';
import { flexboxGridColumnWidth } from '../utils/grid';

const NumberCell = ({ number, onTypeNumber, gridStyle }) => (
  <Col
    className={classnames(styles.numberCell)}
    {...gridStyle}
    onClick={() => onTypeNumber(number)}
  >
    {number}
  </Col>
);

NumberCell.defaultProps = {
  gridStyle: flexboxGridColumnWidth(1 / 3),
};

NumberCell.propTypes = {
  number: PropTypes.number.isRequired,
  onTypeNumber: PropTypes.func.isRequired,
  gridStyle: PropTypes.objectOf(PropTypes.number),
};

export default connect(
  null,
  dispatch => ({
    onTypeNumber: (value) => {
      dispatch(typeNumber(value));
    },
  }),
)(NumberCell);
