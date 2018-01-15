import {
  TYPE_NUMBER,
  CLEAR,
  TYPE_OPERATOR,
  EQUALS,
  TO_FIXED
} from '../actions/actionTypes';

import {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE
} from '../constants';

import { createSelector } from 'reselect';

import { operators } from '../constants';

import BigNumber from 'bignumber.js';

export const initialState = {
  previousInput: null,
  currentInput: BigNumber(0),
  operator: null,
  computations: [],
  isFloat: false
};

const currentInputSelector = state => state.calculator.currentInput;
const computationsSelector = state => state.calculator.computations;
const operatorSelector = state => state.calculator.operator;
const lastComputationSelector = state => state.calculator.computations[state.calculator.computations.length - 1];
const isFloatSelector = state => state.calculator.isFloat;

export const getNumberDisplay = createSelector(
  currentInputSelector,
  lastComputationSelector,
  isFloatSelector,
  (currentInput, lastComputation, isFloat) => {
    return `${currentInput.toString()}${isFloat ? '.' : ''}`;
  }
);

export const getOperatorDisplay = createSelector(
  operatorSelector,
  (operator) => {
      const opDisplay = operators.find((op) => op.actionType === operator);

      return (opDisplay && opDisplay.operator) || '';
  }
);

const compute = (operator, firstNumber, secondNumber) => {
  switch (operator) {
    case ADD:
      return firstNumber.plus(secondNumber);
    case SUBTRACT:
      return firstNumber.minus(secondNumber);
    case MULTIPLY:
      return firstNumber.times(secondNumber);
    case DIVIDE:
      return firstNumber.dividedBy(secondNumber);
  }
}

// taken from: https://stackoverflow.com/a/27865285
const precision = (a) => {
  if (!isFinite(a)) {
    return 0;
  }

  let e = 1;
  let p = 0;
  while (Math.round(a * e) / e !== a) {
    e *= 10;
    p++;
  }
  return p;
}

export default function input (state = initialState, action) {
  const noPreviousInput = state.previousInput === null;
  const noOperator = state.operator === null;

  const {
    operator,
    previousInput,
    currentInput,
    isFloat
  } = state;

  switch (action.type) {
    case TYPE_OPERATOR:
      if (noPreviousInput) {
        return {
          ...state,
          operator: action.operator
        };
      }

      return {
        ...state,
        operator: action.operator,
        previousInput: null,
        currentInput: compute(operator, previousInput, currentInput)
      };
    case EQUALS:
      let nextCurrentInput;

      if (noOperator) {
        nextCurrentInput = currentInput;
      } else {
        if (noPreviousInput) {
          nextCurrentInput = compute(operator, currentInput, currentInput);
        } else {
          nextCurrentInput = compute(operator, previousInput, currentInput);
        }
      }

      return {
        operator: null,
        previousInput: null,
        currentInput: nextCurrentInput,
        computations: [
          ...state.computations,
          nextCurrentInput
        ]
      };
    case TYPE_NUMBER:
      if (!noOperator) {
        if (noPreviousInput) {
          return {
            ...state,
            previousInput: currentInput,
            isFloat: false,
            currentInput: BigNumber(action.value)
          }
        }
      }

      if (isFloat || !currentInput.isInteger()) {
        const p = precision(currentInput.toNumber());

        return {
          ...state,
          isFloat: false,
          currentInput: currentInput.plus(action.value / (10 ** (p + 1)))
        }
      } else {
        return {
          ...state,
          currentInput: currentInput.times(10).plus(action.value)
        }
      }
    case TO_FIXED:
      return {
        ...state,
        isFloat: true
      }
    case CLEAR:
      return {
        ...initialState,
        computations: state.computations
      };
    default:
      return state;
  }
}
