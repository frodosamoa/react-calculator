import {
  CLEAR,
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  TYPE_NUMBER
} from '../constants';

import operand from './operand';

export default function computations (state = [0], action) {
  switch (action.type) {
    case CLEAR:
      return [
        ...state,
        0
      ];
    case TYPE_NUMBER:
      return [
        ...state.slice(0, state.length - 2),
        (state[state.length - 1] * 10) + action.value
      ];
    case ADD:
    case SUBTRACT:
    case MULTIPLY:
    case DIVIDE:
      return [
        ...state,
        operand(state[state.length - 1], action)
      ];
    default:
      return state;
  }
}
