import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SEARCH_COMPUTATIONS
} from '../actions/actionTypes';

const initialState = {
  isOpen: false,
  query: '',
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false
      };
    case SEARCH_COMPUTATIONS:
      return {
        ...state,
        query: action.query
      }
    default:
      return state;
  }
}
