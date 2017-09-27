//  import { Map, List } from 'immutable';
import { combineReducers } from 'redux';
import ActionTypes from '../Actions/ActionTypes';
import Console from '../Console/Console';

//  使用combineReducers合并 Reduer，生成最后state，将会根据reduer方法名做key

function mainWindow(state = {}, action) {
  // Console.log('reduce  resizeWindow');
  switch (action.type) {
    case ActionTypes.WINDOW_RESIZE_HEIGHT:
      return { height: action.height };
    default: return state;
  }
}


function counter(state = { count: 0 }, action) {
  // Console.log('counter', action);
  const count = state.count;
  switch (action.type) {
    case ActionTypes.COUNT_INCREMENT:
      return { count: count + 1 };
    case ActionTypes.COUNT_DECREMENT:
      return { count: count - 1 };
    default:
      return state;
  }
}

function todos(state = {}, action) {
  // Console.log('todos', action);
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return { text: action.text };
    default:
      return state;
  }
}


function users(state = {}, action) {
  switch (action.type) {
    case 'FIND_USER': return { user: action.user };
    default:
      return state;
  }
}

function taskJob(state = { searchText: '',
  filtered: false,
  colDropFilter: false,
  loading: true,
  pageData: { list: [] } }, action) {
  Console.log("taskJob's action:%o,state:%o", action, state);
  switch (action.type) {
    case ActionTypes.PAGE_TASKJOB:
    case ActionTypes.OPEN_TASKJOB:
    case ActionTypes.CANCEL_TASKJOB:
    case ActionTypes.OPEN_SEARCH_COLUMN_TASKJOB:
      return {
        ...state,
        ...action.actionData,
      };
    default:
      return { ...state };
  }
}

//  这边可以使用expect 做单元测试
export default combineReducers({ todos, counter, users, mainWindow, taskJob });
