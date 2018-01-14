import {
  TYPE_NUMBER,
  CLEAR,
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  EQUALS,
  TO_FIXED
} from '../constants';

import { createSelector } from 'reselect';

const initialState = {
  previousInput: null,
  currentInput: 0,
  operator: null,
  computations: []
};

const currentInputSelector = state => state.input.currentInput;
const computationsSelector = state => state.input.computations;

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
      if (state.previousInput === null) {
        return {
          ...state,
          operator: action.type
        };
      } else if (state.previousInput && state.currentInput) {
        return {
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
      if (state.operator) {
        if (state.previousInput === null) {
          return {
            ...state,
            previousInput: state.currentInput,
            currentInput: action.value
          }
        } else {
          return {
            ...state,
            currentInput: (state.currentInput * 10) + action.value
          }
        }
      }

      return {
        ...state,
        currentInput: (state.currentInput * 10) + action.value
      }
    case TO_FIXED:

      return {
        ...state,
        currentInput
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
