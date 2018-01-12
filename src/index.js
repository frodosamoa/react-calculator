import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import calculatorReducer from './reducers/calculatorReducer';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore(calculatorReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
