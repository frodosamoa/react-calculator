import BigNumber from 'bignumber.js';
import { createSelector } from 'reselect';

import {
  TYPE_NUMBER,
  CLEAR,
  TYPE_OPERATOR,
  EQUALS,
  TO_FIXED,
} from '../actions/actionTypes';

import {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  operators,
} from '../constants';

export const initialState = {
  previousInput: null,
  currentInput: BigNumber(0),
  decimalPlaces: 0,
  operator: null,
  computations: [],
  displayDecimal: false,
};

const currentInputSelector = state => state.calculator.currentInput;
export const computationsSelector = state => state.calculator.computations;
const operatorSelector = state => state.calculator.operator;
const displayDecimalSelector = state => state.calculator.displayDecimal;

export const getNumberDisplay = createSelector(
  currentInputSelector,
  displayDecimalSelector,
  (currentInput, displayDecimal) =>
    `${currentInput.toString()}${displayDecimal ? '.' : ''}`,
);

export const getOperatorDisplay = createSelector(
  operatorSelector,
  (operator) => {
    const opDisplay = operators.find(op => op.constant === operator);

    return (opDisplay && opDisplay.display) || '';
  },
);

const compute = (state) => {
  const {
    operator,
    currentInput,
    previousInput,
  } = state;

  const firstNumber = previousInput || currentInput;
  const secondNumber = currentInput;

  if (firstNumber instanceof Error) {
    return firstNumber;
  }

  switch (operator) {
    case ADD:
      return firstNumber.plus(secondNumber);
    case SUBTRACT:
      return firstNumber.minus(secondNumber);
    case MULTIPLY:
      return firstNumber.times(secondNumber);
    case DIVIDE:
      if (secondNumber.equals(0)) {
        return new Error();
      }

      return firstNumber.dividedBy(secondNumber);
    default:
      return firstNumber; // no operator that we recognize, return first number
  }
};

const typeOperator = (state, action) => {
  const { previousInput } = state;
  const noPreviousInput = previousInput === null;

  if (noPreviousInput) {
    return {
      ...state,
      operator: action.operator,
    };
  }

  return {
    ...state,
    operator: action.operator,
    previousInput: null,
    currentInput: compute(state),
  };
};

const equals = (state) => {
  const {
    operator,
    currentInput,
    computations,
  } = state;

  const noOperator = operator === null;
  const nextCurrentInput = noOperator ? currentInput : compute(state);

  return {
    operator: null,
    previousInput: null,
    currentInput: nextCurrentInput,
    computations: [
      ...computations,
      nextCurrentInput,
    ],
  };
};

const typeNumber = (state, action) => {
  const {
    operator,
    previousInput,
    currentInput,
    displayDecimal,
    decimalPlaces,
  } = state;

  const noPreviousInput = previousInput === null;
  const noOperator = operator === null;

  if (!noOperator && noPreviousInput) {
    return {
      ...state,
      previousInput: currentInput,
      displayDecimal: false,
      currentInput: BigNumber(action.value),
    };
  }

  if (displayDecimal) {
    if (!currentInput.isInteger()) {
      return {
        ...state,
        displayDecimal: false,
        currentInput: currentInput.plus(action.value / (10 ** (decimalPlaces + 1))),
      };
    }
    return {
      ...state,
      decimalPlaces: decimalPlaces + 1,
    };
  }

  return {
    ...state,
    currentInput: currentInput.times(10).plus(action.value),
  };
};

const toFixed = (state) => {
  const {
    operator,
    previousInput,
    currentInput,
  } = state;

  const noOperator = operator === null;

  if (!noOperator) {
    return {
      ...state,
      previousInput: previousInput || currentInput,
      displayDecimal: true,
      currentInput: BigNumber(0),
    };
  }

  return {
    ...state,
    displayDecimal: currentInput.isInteger(),
  };
};

const clearCalculator = state => ({
  ...initialState,
  computations: state.computations,
});

export default function calculator(state = initialState, action) {
  switch (action.type) {
    case TYPE_OPERATOR: return typeOperator(state, action);
    case EQUALS: return equals(state, action);
    case TYPE_NUMBER: return typeNumber(state, action);
    case TO_FIXED: return toFixed(state, action);
    case CLEAR: return clearCalculator(state, action);
    default:
      return state;
  }
}
