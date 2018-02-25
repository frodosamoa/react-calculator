import _ from 'lodash'
import { batchActions } from 'redux-batched-actions'
import { createAction } from 'redux-actions'

import {
  CLEAR,
  EQUALS,
  TYPE_NUMBER,
  TYPE_OPERATOR,
  TO_FIXED,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './actionTypes'

import { operators } from '../constants'

export const clear = createAction(CLEAR)
export const equals = createAction(EQUALS)
export const toFixed = createAction(TO_FIXED)
export const openModal = createAction(OPEN_MODAL)
export const closeModal = createAction(CLOSE_MODAL)

export const typeNumber = createAction(TYPE_NUMBER, value => ({ value }))
export const typeOperator = createAction(TYPE_OPERATOR, operator => ({
  operator,
}))

const random = int => Math.floor(Math.random() * int)

const monkeysTyping = () => {
  const operatorConstants = operators.map(op => op.constant)

  const actions = []
  let amountOfDigits

  _.times(100, operation => {
    amountOfDigits = random(15) + 1

    _.times(amountOfDigits, () => {
      actions.push(typeNumber(random(9) + 1))
    })

    if (operation % 4 === 0) {
      actions.push(equals())
      actions.push(clear())
    } else {
      const randomOperator = operatorConstants[random(operatorConstants.length)]
      actions.push(typeOperator(randomOperator))
    }
  })

  return batchActions(actions)
}

// following action taken from link below, but modified for my use case:
// https://github.com/reactjs/redux/issues/787
export const listenToWindowEvent = (name, mapEventToAction) =>
  function thunk(dispatch) {
    function handleEvent(e) {
      dispatch(mapEventToAction(e))
    }

    window.addEventListener(name, handleEvent)
    return () => window.removeEventListener(name, handleEvent)
  }

export const globalKeyPress = e => {
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
      return typeNumber(Number(e.key))
    case '+':
    case '-':
    case '*':
    case '/': {
      const operator = operators.find(op => op.key === e.key)
      return typeOperator(operator.constant)
    }
    case '=':
    case 'Enter':
      return equals()
    case '.':
      return toFixed()
    case 'c':
    case 'C':
      return clear()
    case ' ':
      return monkeysTyping()
    default:
      return {
        type: 'GLOBAL_KEY_PRESS',
        key: e.key,
      }
  }
}
