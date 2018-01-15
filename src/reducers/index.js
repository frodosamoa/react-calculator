import { combineReducers } from 'redux';

import calculator from './calculator';
import modal from './modal';

export default combineReducers({
  calculator,
  modal,
});
