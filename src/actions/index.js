import {
  CLEAR,
  TYPE_NUMBER,
  TO_FIXED
} from './actionTypes';

export const clear = () => ({
  type: CLEAR
});

export const typeNumber = (value) => ({
  type: TYPE_NUMBER,
  value
});

export const toFixed = () => ({
  type: TO_FIXED
})

export const typeOperator = (operator) => ({
  type: operator
});
