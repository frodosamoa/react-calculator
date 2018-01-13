import { combineReducers } from 'redux';

import computations from './computations';
import input from './input';
import operand from './operand';

export default combineReducers({
  computations,
  input,
  operand
});