export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const MULTIPLY = 'MULTIPLY';
export const DIVIDE = 'DIVIDE';

export const numberPad = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']];

export const operators = [
  {
    key: '/',
    display: '÷',
    constant: DIVIDE,
  },
  {
    key: '*',
    display: 'x',
    constant: MULTIPLY,
  },
  {
    key: '-',
    display: '–',
    constant: SUBTRACT,
  },
  {
    key: '+',
    display: '+',
    constant: ADD,
  },
];
