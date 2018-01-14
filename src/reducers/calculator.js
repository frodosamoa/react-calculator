import {
  TYPE_NUMBER,
  CLEAR,
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  EQUALS,
  TO_FIXED
} from '../actions/actionTypes';

import { createSelector } from 'reselect';

import { operators } from '../constants';

export const initialState = {
  previousInput: null,
  currentInput: 0,
  operator: null,
  computations: []
};

const currentInputSelector = state => state.currentInput;
const computationsSelector = state => state.computations;
const operatorSelector = state => state.operator;

export const getNumberDisplay = createSelector(
  currentInputSelector,
  computationsSelector,
  (currentInput, computations) => {
    if (currentInput !== null) {
      return currentInput;
    }

    return computations[computations.length - 1];
  }
);

export const getOperatorDisplay = createSelector(
  operatorSelector,
  (operator) => {
      const opDisplay = operators.find((op) => op.actionType === operator);

      return (opDisplay && opDisplay.operator) || '';
  }
);

const compute = (operator, previousInput, currentInput) => {
  switch (operator) {
    case ADD:
      return previousInput + currentInput;
    case SUBTRACT:
      return previousInput - currentInput;
    case MULTIPLY:
      return previousInput * currentInput;
    case DIVIDE:
      return previousInput / currentInput;
  }
}

export default function input (state = initialState, action) {
  switch (action.type) {
    case ADD:
    case SUBTRACT:
    case MULTIPLY:
    case DIVIDE:
      if (state.previousInput === null && state.currentInput === null) {
        return {
          ...state,
          operator: action.type,
          previousInput: state.computations[state.computations.length - 1],
        };
      } else if (state.previousInput === null && state.currentInput !== null) {
        return {
          ...state,
          operator: action.type
        };
      } else if (state.previousInput && state.currentInput) {
        return {
          ...state,
          operator: action.type,
          previousInput: null,
          currentInput: compute(state.operator, state.previousInput, state.currentInput)
        };
      }

      return state;
    case EQUALS:
      if (!state.operator && !state.previousInput) {
        return state;
      }

      if (state.operator && state.previousInput) {
        const computed = compute(state.operator, state.previousInput, state.currentInput);
        return {
          operator: null,
          previousInput: null,
          currentInput: null,
          computations: [
            ...state.computations,
            computed
          ]
        }
      }
    case TYPE_NUMBER:
      if (state.operator && state.previousInput === null) {
        return {
          ...state,
          previousInput: state.currentInput,
          currentInput: action.value
        }
      }

      return {
        ...state,
        currentInput: (state.currentInput * 10) + action.value
      }
    case TO_FIXED:
      return {
        ...state
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
