import { combineReducers } from 'redux';

import computations from './computations';
import input from './input';
import operator from './operator';

export default combineReducers({
  computations,
  input,
  operator
});