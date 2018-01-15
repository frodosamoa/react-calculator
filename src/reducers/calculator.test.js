import calculator, { initialState } from './calculator';

import {
  clear,
  typeNumber,
} from '../actions';

import {
  MULTIPLY,
} from '../actions/actionTypes';

describe('calculator reducer', () => {
  it('should return the initial state', () => {
    expect(calculator(undefined, {})).toEqual(initialState);
  });

  it('should clear by only preserving the computations', () => {
    const firstState = {
      previousInput: 12344567,
      currentInput: 980759234,
      computations: [6453, 5432134, 43, 234342],
      operator: MULTIPLY,
    };

    const nextState = calculator(firstState, clear());

    expect(nextState.previousInput).toEqual(initialState.previousInput);
    expect(nextState.currentInput).toEqual(initialState.currentInput);
    expect(nextState.operator).toEqual(initialState.operator);

    expect(nextState.computations).toEqual(firstState.computations);
  });

  describe('should type numbers', () => {
    it('when we have initial state', () => {
      expect(calculator(undefined, typeNumber(5)).currentInput).toEqual(5);
    });

    it('when we have a current input', () => {
      const firstState = {
        previousInput: null,
        currentInput: 58,
        computations: [],
        operator: null,
      };
      expect(calculator(firstState, typeNumber(5)).currentInput).toEqual((firstState.currentInput * 10) + 5);
    });

    it('when we have an operator and no previous iqnput', () => {
      const firstState = {
        previousInput: null,
        currentInput: 58,
        computations: [],
        operator: MULTIPLY,
      };

      const nextState = calculator(firstState, typeNumber(5));
      expect(nextState.currentInput).toEqual(5);
      expect(nextState.previousInput).toEqual(firstState.currentInput);
    });
  });
});
