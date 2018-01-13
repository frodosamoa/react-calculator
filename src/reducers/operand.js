import {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE
} from '../constants';

export function operand (state, action) {
  switch (action.type) {
    case ADD:
      return state + action.nextComputation;
    case SUBTRACT:
      return state - action.nextComputation;
    case MULTIPLY:
      return state * action.nextComputation;
    case DIVIDE:
      return state / action.nextComputation;
    default:
      return state;
  }
}