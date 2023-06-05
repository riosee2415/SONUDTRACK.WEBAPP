import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
  TAG_LIST_FAILURE,
  //
  TAG_CREATE_REQUEST,
  TAG_CREATE_SUCCESS,
  TAG_CREATE_FAILURE,
  //
  TAG_UPDATE_REQUEST,
  TAG_UPDATE_SUCCESS,
  TAG_UPDATE_FAILURE,
  //
  TAG_DELETE_REQUEST,
  TAG_DELETE_SUCCESS,
  TAG_DELETE_FAILURE,
  //
  TAG_TYPE_LIST_REQUEST,
  TAG_TYPE_LIST_SUCCESS,
  TAG_TYPE_LIST_FAILURE,
  //
  TAG_TYPE_CREATE_REQUEST,
  TAG_TYPE_CREATE_SUCCESS,
  TAG_TYPE_CREATE_FAILURE,
  //
  TAG_TYPE_UPDATE_REQUEST,
  TAG_TYPE_UPDATE_SUCCESS,
  TAG_TYPE_UPDATE_FAILURE,
  //
  TAG_TYPE_DELETE_REQUEST,
  TAG_TYPE_DELETE_SUCCESS,
  TAG_TYPE_DELETE_FAILURE,
} from "../reducers/tag";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagListAPI(data) {
  return await axios.post(`/api/tag/under/list`, data);
}

function* tagList(action) {
  try {
    const result = yield call(tagListAPI, action.data);

    yield put({
      type: TAG_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagCreateAPI(data) {
  return await axios.post(`/api/tag/under/create`, data);
}

function* tagCreate(action) {
  try {
    const result = yield call(tagCreateAPI, action.data);

    yield put({
      type: TAG_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagUpdateAPI(data) {
  return await axios.post(`/api/tag/under/update`, data);
}

function* tagUpdate(action) {
  try {
    const result = yield call(tagUpdateAPI, action.data);

    yield put({
      type: TAG_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagDeleteAPI(data) {
  return await axios.post(`/api/tag/under/delete`, data);
}

function* tagDelete(action) {
  try {
    const result = yield call(tagDeleteAPI, action.data);

    yield put({
      type: TAG_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagTypeListAPI(data) {
  return await axios.post(`/api/tag/type/list`, data);
}

function* tagTypeList(action) {
  try {
    const result = yield call(tagTypeListAPI, action.data);

    yield put({
      type: TAG_TYPE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_TYPE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagTypeCreateAPI(data) {
  return await axios.post(`/api/tag/type/create`, data);
}

function* tagTypeCreate(action) {
  try {
    const result = yield call(tagTypeCreateAPI, action.data);

    yield put({
      type: TAG_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_TYPE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagTypeUpdateAPI(data) {
  return await axios.post(`/api/tag/type/update`, data);
}

function* tagTypeUpdate(action) {
  try {
    const result = yield call(tagTypeUpdateAPI, action.data);

    yield put({
      type: TAG_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_TYPE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagTypeDeleteAPI(data) {
  return await axios.post(`/api/tag/type/delete`, data);
}

function* tagTypeDelete(action) {
  try {
    const result = yield call(tagTypeDeleteAPI, action.data);

    yield put({
      type: TAG_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_TYPE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchTagList() {
  yield takeLatest(TAG_LIST_REQUEST, tagList);
}
function* watchTagCreate() {
  yield takeLatest(TAG_CREATE_REQUEST, tagCreate);
}
function* watchTagUpdate() {
  yield takeLatest(TAG_UPDATE_REQUEST, tagUpdate);
}
function* watchTagDelete() {
  yield takeLatest(TAG_DELETE_REQUEST, tagDelete);
}

function* watchTagTypeList() {
  yield takeLatest(TAG_TYPE_LIST_REQUEST, tagTypeList);
}
function* watchTagTypeCreate() {
  yield takeLatest(TAG_TYPE_CREATE_REQUEST, tagTypeCreate);
}
function* watchTagTypeUpdate() {
  yield takeLatest(TAG_TYPE_UPDATE_REQUEST, tagTypeUpdate);
}
function* watchTagTypeDelete() {
  yield takeLatest(TAG_TYPE_DELETE_REQUEST, tagTypeDelete);
}

//////////////////////////////////////////////////////////////
export default function* tagSaga() {
  yield all([
    fork(watchTagList),
    fork(watchTagCreate),
    fork(watchTagUpdate),
    fork(watchTagDelete),

    fork(watchTagTypeList),
    fork(watchTagTypeCreate),
    fork(watchTagTypeUpdate),
    fork(watchTagTypeDelete),

    //
  ]);
}
