import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';

import './index.scss';
import reducers from './reducers';
import Calculator from './components/Calculator';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  enableBatching(reducers),
  applyMiddleware(thunk),
);

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Calculator />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
