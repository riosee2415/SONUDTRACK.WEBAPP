import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  //
  CATEGORY_NEW_REQUEST,
  CATEGORY_NEW_SUCCESS,
  CATEGORY_NEW_FAILURE,
  //
  CATEGORY_MODIFY_REQUEST,
  CATEGORY_MODIFY_SUCCESS,
  CATEGORY_MODIFY_FAILURE,
  //
  CATEGORY_DEL_REQUEST,
  CATEGORY_DEL_SUCCESS,
  CATEGORY_DEL_FAILURE,
} from "../reducers/product";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryListAPI(data) {
  return await axios.post("/api/product/ca/list", data);
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
async function categoryNewAPI(data) {
  return await axios.post("/api/product/ca/new", data);
}

function* categoryNew(action) {
  try {
    const result = yield call(categoryNewAPI, action.data);

    yield put({
      type: CATEGORY_NEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_NEW_FAILURE,
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
async function categoryModifyAPI(data) {
  return await axios.post("/api/product/ca/modify", data);
}

function* categoryModify(action) {
  try {
    const result = yield call(categoryModifyAPI, action.data);

    yield put({
      type: CATEGORY_MODIFY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_MODIFY_FAILURE,
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
  return await axios.post("/api/product/ca/delete", data);
}

function* categoryDelete(action) {
  try {
    const result = yield call(categoryDeleteAPI, action.data);

    yield put({
      type: CATEGORY_DEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_DEL_FAILURE,
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
function* watchCategoryNew() {
  yield takeLatest(CATEGORY_NEW_REQUEST, categoryNew);
}
function* watchCategoryModify() {
  yield takeLatest(CATEGORY_MODIFY_REQUEST, categoryModify);
}
function* watchCategoryDelete() {
  yield takeLatest(CATEGORY_DEL_REQUEST, categoryDelete);
}

//////////////////////////////////////////////////////////////
export default function* productSaga() {
  yield all([
    fork(watchCategoryList),
    fork(watchCategoryNew),
    fork(watchCategoryModify),
    fork(watchCategoryDelete),
    //
  ]);
}
