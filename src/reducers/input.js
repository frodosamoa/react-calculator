import {
  TYPE_NUMBER,
  CLEAR
} from '../constants';

export default function input (state = 0, action) {
  switch (action.type) {
    case TYPE_NUMBER:
      return (state * 10) + action.value;
    case CLEAR:
      return 0;
    default:
      return state;
  }
}