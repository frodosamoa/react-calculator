/* @flow */

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SEARCH_COMPUTATIONS
} from '../actions/actionTypes';

const initialState = {
  isOpen: false,
  query: ''
};

type State = {
  +isOpen: boolean,
  +query: string
};

type Action = { type: string, query?: string };

export default function modal(
  state: State = initialState,
  action: Action
): State {
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
      };
    default:
      return state;
  }
}
