import { EQUALS } from '../constants';

import operator from './operator';

export default function computations (state = [], action) {
  switch (action.type) {
    case EQUALS:
      return [
        ...state,
        operator(state[state.length - 1], action)
      ];
    default:
      return state;
  }
}
