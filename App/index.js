import React from 'react';
import ReactDOM from 'react-dom';
import {FrameRouter} from "./Router/AppRouters"
import {Provider} from 'react-redux'
import {createStore} from 'redux'

function counter(state = {count: 0}, action) {
    console.log("Action", action)
    const count = state.count
    switch (action.type) {
        case "INCREMENT":
            return {count: count + 1};
        case "DECREMENT":
            return {count: count - 1};
        default:
            return state;
    }
}

let store = createStore(counter);
// console.log(AppRouter)
ReactDOM.render(<Provider store={store}><FrameRouter/></Provider>, document.getElementById("app"))