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
  previousValue: null,
  currentValue: '0',
  operator: null,
  computations: [],
};

const operatorSelector = state => state.calculator.operator;
export const getOperatorDisplay = createSelector(
  operatorSelector,
  (operator) => {
    const opDisplay = operators.find(op => op.constant === operator);

    return (opDisplay && opDisplay.display) || '';
  },
);

const compute = (operator, firstNumber, secondNumber) => {
  if (firstNumber instanceof Error) {
    return firstNumber;
  }

  const firstOperand = new BigNumber(firstNumber);
  const secondOperand = new BigNumber(secondNumber);

  switch (operator) {
    case ADD:
      return firstOperand.plus(secondOperand).toString();
    case SUBTRACT:
      return firstOperand.minus(secondOperand).toString();
    case MULTIPLY:
      return firstOperand.times(secondOperand).toString();
    case DIVIDE:
      if (secondOperand.equals(0)) {
        return new Error();
      }

      return firstOperand.dividedBy(secondOperand).toString();
    default:
      return firstOperand; // no operator that we recognize, return first number
  }
};

const typeOperator = (state, action) => {
  const {
    operator,
    previousValue,
    currentValue,
  } = state;

  const inputOperator = action.operator;

  if (operator) {
    const nextCurrentValue = compute(
      operator,
      previousValue || 0,
      currentValue,
    );

    return {
      ...state,
      operator: inputOperator,
      previousValue: null,
      currentValue: nextCurrentValue,
    };
  }

  return {
    ...state,
    operator: inputOperator,
  };
};

const equals = (state) => {
  const {
    operator,
    currentValue,
    previousValue,
    computations,
  } = state;

  const noOperator = operator === null;

  let nextCurrentValue;
  if (noOperator) {
    nextCurrentValue = currentValue;
  } else {
    nextCurrentValue = compute(
      operator,
      previousValue || currentValue,
      currentValue,
    );
  }

  return {
    ...initialState,
    currentValue: nextCurrentValue,
    computations: [
      ...computations,
      nextCurrentValue,
    ],
  };
};

const getNextCurrentValue = (state, action) => {
  const { currentValue } = state;
  const isCurrentValueZero = currentValue === '0';
  const inputNumber = action.value;

  return isCurrentValueZero ? String(inputNumber) : `${currentValue}${inputNumber}`;
};

const typeNumber = (state, action) => {
  const {
    previousValue,
    currentValue,
    operator,
  } = state;

  let nextCurrentValue;
  let nextPreviousValue = null;

  if (operator) {
    if (previousValue) {
      nextPreviousValue = previousValue;
      nextCurrentValue = getNextCurrentValue(state, action);
    } else {
      nextPreviousValue = currentValue;
      nextCurrentValue = String(action.value);
    }
  } else {
    nextCurrentValue = getNextCurrentValue(state, action);
  }

  return {
    ...state,
    currentValue: nextCurrentValue,
    previousValue: nextPreviousValue,
  };
};

const toFixed = (state) => {
  const {
    currentValue,
    previousValue,
    operator,
  } = state;

  const isCurrentValueFloat = currentValue.match(/\./);

  if (operator) {
    if (!previousValue) {
      return {
        ...state,
        previousValue: currentValue,
        currentValue: '0.',
      };
    }

    if (!isCurrentValueFloat) {
      return {
        ...state,
        previousValue,
        currentValue: `${currentValue}.`,
      };
    }
  }

  if (!isCurrentValueFloat) {
    return {
      ...state,
      currentValue: `${currentValue}.`,
    };
  }

  return state;
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
