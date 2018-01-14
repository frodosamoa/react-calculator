import {
  DIVIDE,
  MULTIPLY,
  SUBTRACT,
  ADD,
  EQUALS
} from './actions/actionTypes';

export const operators = [
  {
    operator: '÷',
    actionType: DIVIDE
  },
  {
    operator: 'x',
    actionType: MULTIPLY
  },
  {
    operator: '–',
    actionType: SUBTRACT
  },
  {
    operator: '+',
    actionType: ADD
  },
  {
    operator: '=',
    actionType: EQUALS
  }
];