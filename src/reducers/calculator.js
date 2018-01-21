import BigNumber from 'bignumber.js';
import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';

import {
  TYPE_NUMBER,
  CLEAR,
  TYPE_OPERATOR,
  EQUALS,
  TO_FIXED
} from '../actions/actionTypes';

import { ADD, SUBTRACT, MULTIPLY, DIVIDE, operators } from '../constants';

export const initialState = {
  previousValue: null,
  currentValue: '0',
  operator: null,
  computations: []
};

const operatorSelector = state => state.calculator.operator;
export const getOperatorDisplay = createSelector(operatorSelector, operator => {
  const opDisplay = operators.find(op => op.constant === operator);

  return (opDisplay && opDisplay.display) || '';
});

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
  console.log(action);
  const { operator, previousValue, currentValue } = state;

  const inputOperator = action.payload.operator;

  if (operator) {
    const nextCurrentValue = compute(
      operator,
      previousValue || 0,
      currentValue
    );

    return {
      ...state,
      operator: inputOperator,
      previousValue: null,
      currentValue: nextCurrentValue
    };
  }

  return {
    ...state,
    operator: inputOperator
  };
};

const equals = state => {
  const { operator, currentValue, previousValue, computations } = state;

  const noOperator = operator === null;

  let nextCurrentValue;
  if (noOperator) {
    nextCurrentValue = currentValue;
  } else {
    nextCurrentValue = compute(
      operator,
      previousValue || currentValue,
      currentValue
    );
  }

  return {
    ...initialState,
    currentValue: nextCurrentValue,
    computations: [...computations, nextCurrentValue]
  };
};

const getNextCurrentValue = (state, action) => {
  const { currentValue } = state;
  const isCurrentValueZero = currentValue === '0';
  const inputNumber = action.payload.value;

  return isCurrentValueZero
    ? String(inputNumber)
    : `${currentValue}${inputNumber}`;
};

const typeNumber = (state, action) => {
  const { previousValue, currentValue, operator } = state;

  let nextCurrentValue;
  let nextPreviousValue = null;

  if (operator) {
    if (previousValue) {
      nextPreviousValue = previousValue;
      nextCurrentValue = getNextCurrentValue(state, action);
    } else {
      nextPreviousValue = currentValue;
      nextCurrentValue = String(action.payload.value);
    }
  } else {
    nextCurrentValue = getNextCurrentValue(state, action);
  }

  return {
    ...state,
    currentValue: nextCurrentValue,
    previousValue: nextPreviousValue
  };
};

const toFixed = state => {
  const { currentValue, previousValue, operator } = state;

  const isCurrentValueFloat = currentValue.match(/\./);

  if (operator) {
    if (!previousValue) {
      return {
        ...state,
        previousValue: currentValue,
        currentValue: '0.'
      };
    }

    if (!isCurrentValueFloat) {
      return {
        ...state,
        previousValue,
        currentValue: `${currentValue}.`
      };
    }
  }

  if (!isCurrentValueFloat) {
    return {
      ...state,
      currentValue: `${currentValue}.`
    };
  }

  return state;
};

const clearCalculator = state => ({
  ...initialState,
  computations: state.computations
});

export default handleActions(
  {
    [TYPE_OPERATOR]: (state, action) => typeOperator(state, action),
    [EQUALS]: (state, action) => equals(state, action),
    [TYPE_NUMBER]: (state, action) => typeNumber(state, action),
    [TO_FIXED]: (state, action) => toFixed(state, action),
    [CLEAR]: (state, action) => clearCalculator(state, action)
  },
  initialState
);
