import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import Reducers  from './Reducers/Reduers'
import {FrameRouter} from "./Router/AppRouters"
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'


// console.log(AppRouter)
ReactDOM.render(
    <Provider store={createStore(Reducers, applyMiddleware(thunkMiddleware))}>
        <FrameRouter/>
    </Provider>,
    document.getElementById("app")
);