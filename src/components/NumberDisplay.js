import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'

import styles from './calculator.scss'
import { flexboxGridColumnWidth } from '../utils/grid'

const NumberDisplay = ({ currentValue }) => (
  <Row className={styles.row}>
    <Col {...flexboxGridColumnWidth(1)} className={styles.numberDisplay}>
      {currentValue}
    </Col>
  </Row>
)

NumberDisplay.propTypes = {
  currentValue: PropTypes.string.isRequired,
}

export default connect(state => ({
  currentValue: state.calculator.currentValue,
}))(NumberDisplay)
