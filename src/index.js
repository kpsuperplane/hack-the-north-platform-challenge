import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {fetchData} from './actions';
import appStore from './store';


import 'bootstrap/dist/css/bootstrap.css';


let store = createStore(appStore, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

store.dispatch(fetchData());