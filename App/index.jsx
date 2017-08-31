import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AdminRouter } from './Router/AppRouters';
import Reducers from './Reducers/Reduers';


ReactDOM.render(
  <Provider store={createStore(Reducers, applyMiddleware(thunkMiddleware))}>
    <AdminRouter />
  </Provider>, window.document.getElementById('app'));
