import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col } from 'react-flexbox-grid'
import classnames from 'classnames'

import styles from './calculator.scss'
import { typeOperator } from '../actions'
import { flexboxGridColumnWidth } from '../utils/grid'

const OperatorCell = ({ display, onTypeOperator, isActiveOperator }) => (
  <Col
    className={classnames(styles.operatorCell, {
      [styles.activeOperator]: isActiveOperator,
    })}
    {...flexboxGridColumnWidth(1)}
    onClick={() => onTypeOperator()}
  >
    {display}
  </Col>
)

OperatorCell.propTypes = {
  display: PropTypes.string.isRequired,
  onTypeOperator: PropTypes.func.isRequired,
  isActiveOperator: PropTypes.bool.isRequired,
}

export default connect(
  (state, ownProps) => ({
    isActiveOperator: state.calculator.operator === ownProps.constant,
  }),
  (dispatch, ownProps) => ({
    onTypeOperator: () => {
      dispatch(typeOperator(ownProps.constant))
    },
  }),
)(OperatorCell)
