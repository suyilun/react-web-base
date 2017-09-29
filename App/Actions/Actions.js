import axios from 'axios';
import _ from 'lodash';
import Promise from 'Promise';
import ActionTypes from './ActionTypes';
import Console from '../Console/Console';

const ctxPath = '/api';


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

export function catchError(data) {
  return { type: ActionTypes.CATCH_ERROR, ...data };
}


export function createLayoutToggleSideMenuAct(collapsed) {
  return { type: ActionTypes.LAYOUT_TOGGLE_SIDE_MENU, actionData: { collapsed } };
}

export function resizeWindow() {
  return { type: ActionTypes.WINDOW_RESIZE_HEIGHT };
}


export function createLayoutChgHeightAct() {
  return { type: ActionTypes.LAYOUT_RESIZE_HEIGHT };
}


export function createResetModelAction(modelName) {
  return (dispatch) => {
    const actionData = { formData: {}, showForm: false };
    const key = `RESET_${modelName.toUpperCase()}`;
    const type = ActionTypes[key];
    dispatch({ type, actionData });
  };
}

// 关闭窗口
export function createCancelModelAction(modelName) {
  return (dispatch) => {
    const actionData = { formData: {}, showForm: false };
    const key = `CANCEL_${modelName.toUpperCase()}`;
    const type = ActionTypes[key];
    dispatch({ type, actionData });
  };
}

// 打开窗口
export function createOpenModelAction(modelName, params = null) {
  return (dispatch) => {
    const key = `OPEN_${modelName.toUpperCase()}`;
    const type = ActionTypes[key];
    if (_.isNull(params)) {
      const actionData = { formData: {}, showForm: true };
      dispatch({ type, actionData });
      return;
    }
    axios.get(`${ctxPath}/job/${modelName}/get`, { responseType: 'json', params: { ...params } })
      .then((response) => {
        const actionData = { formData: response.data, showForm: true };
        dispatch({ type, actionData });
      }).catch((error) => {
        dispatch(catchError({ error }));
      });
  };
}

export function createOpenShColAction(modelName, colDropFilter) {
  try {
    const key = `OPEN_SEARCH_COL_${modelName.toUpperCase()}`;
    const type = ActionTypes[key];
    const actionData = { colDropFilter };
    return { type, actionData };
  } catch (error) {
    throw error;
  }
}

export function createChgShColAction(modelName, searchText) {
  try {
    const key = `CHANGE_SEARCH_COL_${modelName.toUpperCase()}`;
    const type = ActionTypes[key];
    const actionData = { searchText };
    return { type, actionData };
  } catch (error) {
    throw error;
  }
}

// 分页
export function createPageModelAction(modelName, pageWeb = {}) {
  return (dispatch) => {
    axios.post(`${ctxPath}/job/${modelName}/page`, { responseType: 'json', params: { ...pageWeb } })
      .then((response) => {
        const key = `PAGE_${modelName.toUpperCase()}`;
        const type = ActionTypes[key];
        const actionData = { pageData: response.data, loading: false };
        dispatch({ type, actionData });
      }).catch((error) => {
        throw error;
        // dispatch(catchError({ loading: false, error }));
      });
  };
}

export function createShowEditModelAction(modelName, param = {}) {
  return (dispatch) => {
    // return Promise.resolve(
    return axios.get(`${ctxPath}/job/${modelName}/get`, { responseType: 'json', params: { ...param } })
      .then((response) => {
        const key = `GET_${modelName.toUpperCase()}`;
        const type = ActionTypes[key];
        const actionData = { formData: response.data, showForm: true };
        dispatch(dispatch({ type, actionData }));
        // dispatch({ type, actionData });
        // return Promise.reslove();
        // return Promise.resolve();
      }).catch((error) => {
        throw error;
        // dispatch(catchError({ loading: false, error }));
      })
      //);

  };
}

export function defauleDispatcher() {
  Console.error('默认dispatch');
}
