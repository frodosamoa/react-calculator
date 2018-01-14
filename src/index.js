import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import Calculator from './components/Calculator';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/calculator';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Calculator />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
