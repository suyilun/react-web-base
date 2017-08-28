import ActionTypes from './ActionTypes'
import axios from 'axios'
export function addTodo(text) {
    return {
        type: ActionTypes.ADD_TODO,
        text
    };
}

export function findUser(user) {
    return {
        type: "FIND_USER",
        user
    }
}

export function fetchUser() {
    return function (dispatch) {
        return axios.get('/json/test.json', {responseType: "json"})
            .then(function (response) {
                console.log(response.data);
                dispatch(findUser(response.data))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export function removeTodo(id) {
    return {
        type: ActionTypes.REMOVE_TODO,
        id
    };
}


export function addCount() {
    return {type: ActionTypes.COUNT_INCREMENT}
}
