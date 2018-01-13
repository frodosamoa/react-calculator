import {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  EQUALS,
  TYPE_NUMBER
} from '../constants';

export default function operator (state = null, action) {
  switch (action.type) {
    case ADD:
    case SUBTRACT:
    case MULTIPLY:
    case DIVIDE:
      return action.type;
    case EQUALS:
    case TYPE_NUMBER:
      return null;
    default:
      return state;
  }
}