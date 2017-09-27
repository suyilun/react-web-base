//  import { Map, List } from 'immutable';
import { combineReducers } from 'redux';
import ActionTypes from '../Actions/ActionTypes';
import Console from '../Console/Console';

//  使用combineReducers合并 Reduer，生成最后state，将会根据reduer方法名做key

const baseState = { tblSize: 'middle', btnSize: 'default' };

function AdminLayout(state = { collapsed: false, height: '500px' }, action) {
  // Console.log('reduce  resizeWindow');
  switch (action.type) {
    case ActionTypes.LAYOUT_TOGGLE_SIDE_MENU:
      return { ...state, ...action.actionData };
    case ActionTypes.LAYOUT_RESIZE_HEIGHT:
      return { ...state, height: `${window.innerHeight - 64}px` };
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

function taskJob(state = {
  ...baseState,
  searchText: '',
  filtered: false,
  colDropFilter: false,
  loading: true,
  pageData: { list: [] } }, action) {
  Console.log("taskJob's action:%o,state:%o", action, state);
  switch (action.type) {
    case ActionTypes.PAGE_TASKJOB:
    case ActionTypes.OPEN_TASKJOB:
    case ActionTypes.CANCEL_TASKJOB:
    case ActionTypes.OPEN_SEARCH_COL_TASKJOB:
    case ActionTypes.CHANGE_SEARCH_COL_TASKJOB:
      return {
        ...state,
        ...action.actionData,
      };
    default:
      return { ...state };
  }
}

//  这边可以使用expect 做单元测试
export default combineReducers({ todos, counter, users, AdminLayout, taskJob });
