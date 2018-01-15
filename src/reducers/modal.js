import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/actionTypes';

export default function modal (state = false, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return true;
    case CLOSE_MODAL:
      return false;
    default:
      return state;
  }
}