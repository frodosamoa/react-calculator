import {
  CLEAR,
  TYPE_NUMBER
} from './constants';

export const clear = () => ({
  type: CLEAR
});

export const typeNumber = (value) => ({
  type: TYPE_NUMBER,
  value
});

export const typeOperator = (operator) => ({
  type: operator
});
