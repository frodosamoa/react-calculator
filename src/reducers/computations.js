import { EQUALS } from '../constants';

import operand from './operand';

export default function computations (state = [], action) {
  switch (action.type) {
    case EQUALS:
      return [
        ...state,
        operand(state[state.length - 1], action)
      ];
    default:
      return state;
  }
}
