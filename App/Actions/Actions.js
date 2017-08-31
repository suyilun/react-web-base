import axios from 'axios';
import ActionTypes from './ActionTypes';
import Console from '../Console/Console';


export function resizeWindow() {
  return { type: ActionTypes.WINDOW_RESIZE_HEIGHT };
}

export function addTodo(text) {
  return { type: ActionTypes.ADD_TODO, text };
}

export function findUser(user) {
  return { type: 'FIND_USER', user };
}

export function fetchUser() {
  return (dispatch) => {
    axios.get('/json/test.json', { responseType: 'json' }).then((response) => {
      Console.log(response.data);
      dispatch(findUser(response.data));
    }).catch((error) => {
      Console.log(error);
    });
  };
}

export function removeTodo(id) {
  return { type: ActionTypes.REMOVE_TODO, id };
}

export function addCount() {
  return { type: ActionTypes.COUNT_INCREMENT };
}
