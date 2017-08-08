import {Map, List} from 'immutable';
import {combineReducers} from 'redux';
import ActionTypes from '../Actions/ActionTypes'

//使用combineReducers合并 Reduer，生成最后state，将会根据reduer方法名做key

function counter(state = {count: 0}, action) {
    console.log("counter", action)
    const count = state.count
    switch (action.type) {
        case ActionTypes.COUNT_INCREMENT:
            return {count: count + 1};
        case ActionTypes.COUNT_DECREMENT:
            return {count: count - 1};
        default:
            return state;
    }
}

function todos(state = {}, action) {
    console.log("todos", action)
    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return {text: action.text}
        default:
            return state;
    }
}


function users(state = {}, action) {
    switch (action.type) {
        case "FIND_USER":
            return {user: action.user}
        default:
            return state;
    }
}
//这边可以使用expect 做单元测试
export default combineReducers({
    todos,
    counter,
    users
})