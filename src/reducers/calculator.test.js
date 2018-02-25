import calculator, { initialState } from './calculator'

import { clear, typeNumber, toFixed, equals, typeOperator } from '../actions'

import { MULTIPLY, ADD } from '../constants'

describe('calculator reducer', () => {
  it('should return the initial state', () => {
    expect(calculator(undefined, {})).toEqual(initialState)
  })

  it('should clear the state', () => {
    const firstState = {
      previousValue: '12344567',
      currentValue: '980759234',
      operator: MULTIPLY,
    }

    const nextState = calculator(firstState, clear())

    expect(nextState.previousValue).toEqual(initialState.previousValue)
    expect(nextState.currentValue).toEqual(initialState.currentValue)
    expect(nextState.operator).toEqual(initialState.operator)
  })

  describe('should type numbers', () => {
    it('when we have initial state', () => {
      expect(calculator(undefined, typeNumber('5')).currentValue).toEqual('5')
    })

    it("doesn't add unnecessary zeroes", () => {
      expect(calculator(undefined, typeNumber('0')).currentValue).toEqual('0')
    })

    it("doesn't add unnecessary zeroes", () => {
      expect(calculator(undefined, typeNumber('0')).currentValue).toEqual('0')
    })

    it('when we have no operator, add to the current number', () => {
      const firstState = {
        currentValue: '300',
      }
      const nextState = calculator(firstState, typeNumber('5'))

      expect(nextState.currentValue).toEqual(`${firstState.currentValue}5`)
    })

    describe('when we have an operator', () => {
      it('when we have a previousValue, keep the previousValue and add to the current number', () => {
        const firstState = {
          previousValue: '500',
          currentValue: '300',
          operator: ADD,
        }
        const nextState = calculator(firstState, typeNumber('5'))

        expect(nextState.previousValue).toEqual(firstState.previousValue)
        expect(nextState.currentValue).toEqual(`${firstState.currentValue}5`)
      })

      it("when we have a previousValue, keep the previousValue but doesn't add 0 to the current number", () => {
        const firstState = {
          previousValue: '500',
          currentValue: '0',
          operator: ADD,
        }
        const nextState = calculator(firstState, typeNumber('0'))

        expect(nextState.previousValue).toEqual(firstState.previousValue)
        expect(nextState.currentValue).toEqual('0')
      })

      it('when we have no previousValue, set the currentValue to the previousValue and inserts the current input', () => {
        const firstState = {
          previousValue: null,
          currentValue: '300',
          operator: ADD,
        }
        const nextState = calculator(firstState, typeNumber('5'))

        expect(nextState.previousValue).toEqual(firstState.currentValue)
        expect(nextState.currentValue).toEqual('5')
      })
    })
  })

  describe('should type .', () => {
    it('when we have initial state', () => {
      expect(calculator(undefined, toFixed()).currentValue).toEqual('0.')
    })

    it("doesn't add unnecessary zeroes", () => {
      const firstState = {
        currentValue: '444',
      }
      const expectedCurrentValue = `${firstState.currentValue}.`
      const nextState = calculator(firstState, toFixed())

      expect(nextState.currentValue).toEqual(expectedCurrentValue)
    })

    it("doesn't add . when there is one present", () => {
      const currentValue = '444.'
      const nextState = calculator({ currentValue }, toFixed())
      expect(nextState.currentValue).toEqual(currentValue)
    })

    describe('when we have an operator', () => {
      it('when we have no previousValue, makes the currentValue 0.', () => {
        const firstState = {
          previousValue: null,
          currentValue: '300',
          operator: MULTIPLY,
        }
        const nextState = calculator(firstState, toFixed())

        expect(nextState.previousValue).toEqual(firstState.currentValue)
        expect(nextState.currentValue).toEqual('0.')
      })

      it('when we have a previousValue, adds a . to the end of the currentValue', () => {
        const firstState = {
          previousValue: '666',
          currentValue: '300',
          operator: MULTIPLY,
        }
        const nextState = calculator(firstState, toFixed())

        expect(nextState.previousValue).toEqual(firstState.previousValue)
        expect(nextState.currentValue).toEqual(`${firstState.currentValue}.`)
      })
    })
  })

  describe('should take equals as input', () => {
    it('clears operator and previousValue', () => {
      const firstState = {
        ...initialState,
        currentValue: '300',
        previousValue: '400',
        operator: ADD,
      }
      const nextState = calculator(firstState, equals())

      expect(nextState.previousValue).toEqual(null)
      expect(nextState.operator).toEqual(null)
    })

    it('when we have no operator and no previousValue, the current value remains the same', () => {
      const firstState = {
        ...initialState,
        currentValue: '300',
      }
      const nextState = calculator(firstState, equals())

      expect(nextState.currentValue).toEqual(firstState.currentValue)
    })

    describe('when we have an operator', () => {
      it('when we have no previousValue, performs the operation on itself', () => {
        const firstState = {
          ...initialState,
          currentValue: '300',
          operator: ADD,
        }
        const nextState = calculator(firstState, equals())
        const expectedCurrentValue = String(firstState.currentValue * 2)

        expect(nextState.currentValue).toBe(expectedCurrentValue)
      })

      it('when we have a previousValue, perform the operation', () => {
        const firstState = {
          ...initialState,
          currentValue: '300',
          previousValue: '400',
          operator: ADD,
        }
        const nextState = calculator(firstState, equals())
        const expectedCurrentValue = String(700)

        expect(nextState.currentValue).toBe(expectedCurrentValue)
      })
    })
  })

  describe('should take operators as input', () => {
    it('when we have inital state', () => {
      const nextState = calculator(initialState, typeOperator(ADD))

      expect(nextState.operator).toEqual(ADD)
    })

    it('when we input an operator, performs the operation', () => {
      const firstState = {
        ...initialState,
        currentValue: '300',
        previousValue: '200',
        operator: ADD,
      }

      const nextState = calculator(firstState, typeOperator(MULTIPLY))
      const expectedCurrentValue = String(500)

      expect(nextState.currentValue).toEqual(expectedCurrentValue)
      expect(nextState.operator).toEqual(MULTIPLY)
    })
  })
})
