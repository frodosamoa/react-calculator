import { handleActions } from 'redux-actions';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SEARCH_COMPUTATIONS
} from '../actions/actionTypes';

const initialState = {
  isOpen: false,
  query: ''
};

export default handleActions(
  {
    [OPEN_MODAL]: state => ({
      ...state,
      isOpen: true
    }),
    [CLOSE_MODAL]: state => ({
      ...state,
      isOpen: false
    }),
    [SEARCH_COMPUTATIONS]: (state, action) => ({
      ...state,
      query: action.query
    })
  },
  initialState
);
