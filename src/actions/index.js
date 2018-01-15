import {
  CLEAR,
  EQUALS,
  TYPE_NUMBER,
  TYPE_OPERATOR,
  TO_FIXED,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './actionTypes';

export const clear = () => ({
  type: CLEAR,
});

export const equals = () => ({
  type: EQUALS,
});

export const typeNumber = value => ({
  type: TYPE_NUMBER,
  value,
});

export const toFixed = () => ({
  type: TO_FIXED,
});

export const typeOperator = operator => ({
  type: TYPE_OPERATOR,
  operator,
});

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
