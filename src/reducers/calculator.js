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
    default:
      return firstNumber; // no operator that we recognize, return first number
  }
};

// taken from: https://stackoverflow.com/a/27865285
const precision = (a) => {
  if (!Number.isFinite(a)) {
    return 0;
  }

  let e = 1;
  let p = 0;
  while (Math.round(a * e) / e !== a) {
    e *= 10;
    p += 1;
  }
  return p;
};

export default function input(state = initialState, action) {
  const noPreviousInput = state.previousInput === null;
  const noOperator = state.operator === null;

  const {
    operator,
    previousInput,
    currentInput,
    displayDecimal,
    computations,
  } = state;

  switch (action.type) {
    case TYPE_OPERATOR:
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
        currentInput: compute(operator, previousInput, currentInput),
      };
    case EQUALS: {
      let nextCurrentInput;

      if (noOperator) {
        nextCurrentInput = currentInput;
      } else if (noPreviousInput) {
        nextCurrentInput = compute(operator, currentInput, currentInput);
      } else {
        nextCurrentInput = compute(operator, previousInput, currentInput);
      }

      return {
        operator: null,
        previousInput: null,
        currentInput: nextCurrentInput,
        computations: [
          ...computations,
          nextCurrentInput,
        ],
      };
    }
    case TYPE_NUMBER:
      if (!noOperator) {
        if (noPreviousInput) {
          return {
            ...state,
            previousInput: currentInput,
            displayDecimal: false,
            currentInput: BigNumber(action.value),
          };
        }
      }

      if (displayDecimal || !currentInput.isInteger()) {
        const p = precision(currentInput.toNumber());

        return {
          ...state,
          displayDecimal: false,
          currentInput: currentInput.plus(action.value / (10 ** (p + 1))),
        };
      }
      return {
        ...state,
        currentInput: currentInput.times(10).plus(action.value),
      };

    case TO_FIXED:
      return {
        ...state,
        displayDecimal: currentInput.isInteger(),
      };
    case CLEAR:
      return {
        ...initialState,
        computations,
      };
    default:
      return state;
  }
}
