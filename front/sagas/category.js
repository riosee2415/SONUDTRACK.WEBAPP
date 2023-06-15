import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  //
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAILURE,
  //
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
  //
  CATEGORY_ADMIN_LIST_REQUEST,
  CATEGORY_ADMIN_LIST_SUCCESS,
  CATEGORY_ADMIN_LIST_FAILURE,
  //
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILURE,
  //
  CATEGORY_TYPE_GET_REQUEST,
  CATEGORY_TYPE_GET_SUCCESS,
  CATEGORY_TYPE_GET_FAILURE,
  //
  CATEGORY_TYPE_UPDATE_REQUEST,
  CATEGORY_TYPE_UPDATE_SUCCESS,
  CATEGORY_TYPE_UPDATE_FAILURE,
  //
  CATE_ALL_LIST_REQUEST,
  CATE_ALL_LIST_SUCCESS,
  CATE_ALL_LIST_FAILURE,
} from "../reducers/category";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryListAPI(data) {
  return await axios.post(`/api/category/list`, data);
}

function* categoryList(action) {
  try {
    const result = yield call(categoryListAPI, action.data);

    yield put({
      type: CATEGORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryUpdateAPI(data) {
  return await axios.post(`/api/category/update`, data);
}

function* categoryUpdate(action) {
  try {
    const result = yield call(categoryUpdateAPI, action.data);

    yield put({
      type: CATEGORY_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryCreateAPI(data) {
  return await axios.post(`/api/category/create`, data);
}

function* categoryCreate(action) {
  try {
    const result = yield call(categoryCreateAPI, action.data);

    yield put({
      type: CATEGORY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryDeleteAPI(data) {
  return await axios.post(`/api/category/delete`, data);
}

function* categoryDelete(action) {
  try {
    const result = yield call(categoryDeleteAPI, action.data);

    yield put({
      type: CATEGORY_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryAdminListAPI(data) {
  return await axios.post(`/api/category/admin/list`, data);
}

function* categoryAdminList(action) {
  try {
    const result = yield call(categoryAdminListAPI, action.data);

    yield put({
      type: CATEGORY_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryTypeListAPI(data) {
  return await axios.post(`/api/category/type/list`, data);
}

function* categoryTypeList(action) {
  try {
    const result = yield call(categoryTypeListAPI, action.data);

    yield put({
      type: CATEGORY_TYPE_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_TYPE_GET_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryTypeUpdateAPI(data) {
  return await axios.post(`/api/category/type/update`, data);
}

function* categoryTypeUpdate(action) {
  try {
    const result = yield call(categoryTypeUpdateAPI, action.data);

    yield put({
      type: CATEGORY_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_TYPE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function cateAllListAPI(data) {
  return await axios.post(`/api/category/all/list`, data);
}

function* cateAllList(action) {
  try {
    const result = yield call(cateAllListAPI, action.data);

    yield put({
      type: CATE_ALL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATE_ALL_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchCategoryList() {
  yield takeLatest(CATEGORY_LIST_REQUEST, categoryList);
}
function* watchCategoryUpdate() {
  yield takeLatest(CATEGORY_UPDATE_REQUEST, categoryUpdate);
}
function* watchCategoryCreate() {
  yield takeLatest(CATEGORY_CREATE_REQUEST, categoryCreate);
}
function* watchCategoryDelete() {
  yield takeLatest(CATEGORY_DELETE_REQUEST, categoryDelete);
}
function* watchCategoryAdminList() {
  yield takeLatest(CATEGORY_ADMIN_LIST_REQUEST, categoryAdminList);
}
function* watchCategoryTypeList() {
  yield takeLatest(CATEGORY_TYPE_GET_REQUEST, categoryTypeList);
}
function* watchCategoryTypeUpdate() {
  yield takeLatest(CATEGORY_TYPE_UPDATE_REQUEST, categoryTypeUpdate);
}
function* watchCateAllList() {
  yield takeLatest(CATE_ALL_LIST_REQUEST, cateAllList);
}

//////////////////////////////////////////////////////////////
export default function* categorySaga() {
  yield all([
    fork(watchCategoryList),
    fork(watchCategoryUpdate),
    fork(watchCategoryCreate),
    fork(watchCategoryDelete),
    fork(watchCategoryAdminList),
    fork(watchCategoryTypeList),
    fork(watchCategoryTypeUpdate),
    fork(watchCateAllList),

    //
  ]);
}
