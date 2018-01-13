import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Calculator from './components/Calculator';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers);

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
