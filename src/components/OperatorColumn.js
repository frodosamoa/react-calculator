import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Row, Col } from 'react-flexbox-grid';

import styles from './calculator.scss';
import { flexboxGridColumnWidth } from '../utils/grid';
import { operators } from '../constants';
import { equals } from '../actions';
import OperatorCell from './OperatorCell';

const OperatorColumn = ({ onEquals }) => (
  <Col {...flexboxGridColumnWidth(1 / 4)}>
    {operators.map(operator => (
      <Row key={operator.actionType} className={styles.row}>
        <OperatorCell {...operator} />
      </Row>
    ))}
    <Row className={styles.row}>
      <Col
        className={classnames(styles.operatorCell)}
        {...flexboxGridColumnWidth(1)}
        onClick={() => {
            onEquals();
          }}
      >
        {'='}
      </Col>
    </Row>
  </Col>
);

OperatorColumn.propTypes = {
  onEquals: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    onEquals: () => {
      dispatch(equals());
    },
  }),
)(OperatorColumn);
