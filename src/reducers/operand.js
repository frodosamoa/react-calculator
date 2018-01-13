import {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  EQUALS,
  TYPE_NUMBER
} from '../constants';

const operandConverter = (operand) => {
  switch (operand) {
    case '+':
      return ADD;
    case '-':
      return SUBTRACT;
    case 'x':
      return MULTIPLY;
    case '/':
      return DIVIDE;
    case '=':
      return EQUALS;
    default:
      return null;
  }
}

export default function operand (state = null, action) {
  switch (action.type) {
    case ADD:
    case SUBTRACT:
    case MULTIPLY:
    case DIVIDE:
      return operandConverter(action.type);
    case EQUALS:
    case TYPE_NUMBER:
      return null;
    default:
      return state;
  }
}