import {
  CLEAR,
  EQUALS,
  TYPE_NUMBER,
  TYPE_OPERATOR,
  TO_FIXED,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './actionTypes';

import { operators } from '../constants';

export const clear = () => ({
  type: CLEAR,
});

export const equals = () => ({
  type: EQUALS,
});

export const typeNumber = value => ({
  type: TYPE_NUMBER,
  value,
});

export const toFixed = () => ({
  type: TO_FIXED,
});

export const typeOperator = operator => ({
  type: TYPE_OPERATOR,
  operator,
});

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

// following action taken from link below, but modified for my use case:
// https://github.com/reactjs/redux/issues/787
export const listenToWindowEvent = (name, mapEventToAction, filter = (e) => true) => {
  return function (dispatch, getState) {
    function handleEvent(e) {
      const isModalOpen = getState().modal.isOpen;

      if (filter(e) && !isModalOpen) {
        dispatch(mapEventToAction(e));
      }
    }

    window.addEventListener(name, handleEvent);
    return () => window.removeEventListener(name, handleEvent);
  };
}

export const globalKeyPress = (e) => {
  switch (e.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return typeNumber(Number(e.key));
    case '+':
    case '-':
    case '*':
    case '/':
      const operator = operators.find(op => op.key === e.key);
      return typeOperator(operator.constant);
    case '=':
    case 'Enter':
      return equals();
    case '.':
      return toFixed();
    case 'c':
    case 'C':
      return clear();
    case ' ':
      return {};
    default:
      return {
        type: 'GLOBAL_KEY_PRESS',
        key: e.key,
      };
  }
};
