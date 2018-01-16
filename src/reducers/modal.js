import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions/actionTypes';

const initialState = {
  isOpen: false
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpen: true
      };
    case CLOSE_MODAL:
      return {
        isOpen: false
      };
    default:
      return state;
  }
}
