import axios from 'axios';
import _ from 'lodash';
import Promise from 'Promise';
import ActionTypes from './ActionTypes';
import Console from '../Console/Console';

const ctxPath = '/api';

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

export function findTaskJobs(data) {
  return { type: ActionTypes.PAGE_TASKJOB, ...data };
}

export function catchError(data) {
  return { type: ActionTypes.CATCH_ERROR, ...data };
}

export function listTaskJob(pageWeb = {}) {
  return (dispatch) => {
    axios.post(`${ctxPath}/job/TaskJobs/page`, { responseType: 'json', params: { ...pageWeb } })
      .then((response) => {
        dispatch(findTaskJobs({ data: response.data, loading: true }));
      }).catch((error) => {
        dispatch(catchError({ loading: false, error }));
      });
  };
}

// 关闭窗口action
export function cancelModelAction(modelName, actionData) {
  const key = `CANCEL_${modelName.toUpperCase()}`;
  try {
    const actionKey = ActionTypes[key];
    return { type: actionKey, actionData };
  } catch (error) {
    throw new Error('ActionTypes 中 key为%o,不存在', key);
  }
}

// 关闭窗口
export function createCancelModelAction(modelName) {
  return (dispatch) => {
    dispatch(cancelModelAction(modelName, {
      formData: {}, showForm: false }));
  };
}
// 打开窗口 action
export function openModelAction(modelName, actionData) {
  const key = `OPEN_${modelName.toUpperCase()}`;
  try {
    const actionKey = ActionTypes[key];
    return { type: actionKey, actionData };
  } catch (error) {
    throw new Error('ActionTypes 中 key为%o,不存在', key);
  }
}


// 打开窗口
export function createOpenModelAction(modelName, params = null) {
  return (dispatch) => {
    if (_.isNull(params)) {
      dispatch(openModelAction(modelName, {
        formData: {}, showForm: true }));
      return;
    }
    axios.get(`${ctxPath}/job/${modelName}/get`, { responseType: 'json', params: { ...params } })
      .then((response) => {
        // try {
        dispatch(openModelAction(modelName, {
          formData: response.data, showForm: true }));
        // } catch (error) {
        //   dispatch(catchError({ error }));
        // }
      }).catch((error) => {
        dispatch(catchError({ error }));
      });
  };
}

function openSearchColumnAction(modelName, actionData) {
  const key = `OPEN_SEARCH_COLUMN_${modelName.toUpperCase()}`;
  try {
    const actionKey = ActionTypes[key];
    console.log("$$$$$$ openSearchColumnAction");
    return { type: actionKey, actionData };
  } catch (error) {
    throw new Error('ActionTypes 中 key为%o,不存在', key);
  }
}


export function createOpenSearchColumnAction(modelName, visible) {
  return (dispatch) => {
    console.log("openSearchColumn dispatch")
    dispatch(openSearchColumnAction(modelName, {
      colDropFilter: visible }));
    return Promise.resolve();
  };
}

// 分页action
export function pageModelAction(modelName, actionData) {
  const key = `PAGE_${modelName.toUpperCase()}`;
  try {
    const actionKey = ActionTypes[key];
    return { type: actionKey, actionData };
  } catch (error) {
    throw new Error('ActionTypes 中 key为%o,不存在', key);
  }
}

// 分页
export function createPageModelAction(modelName, pageWeb = {}) {
  return (dispatch) => {
    axios.post(`${ctxPath}/job/${modelName}/page`, { responseType: 'json', params: { ...pageWeb } })
      .then((response) => {
        try {
          // const actionMethod =eval(`page${modelName}Action`);
          // dispatch(actionMethod.call(this,{ data: response.data, loading: true }));
          dispatch(pageModelAction(modelName, { pageData: response.data, loading: false }));
        } catch (error) {
          // actionMethod 可能没有定义
          dispatch(catchError({ loading: false, error }));
        }
      }).catch((error) => {
        dispatch(catchError({ loading: false, error }));
      });
  };
}


export function defauleDispatcher() {
  Console.error('默认dispatch');
}
