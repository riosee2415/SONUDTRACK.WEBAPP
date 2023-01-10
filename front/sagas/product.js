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
  //
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  //
  PRODUCT_ING_REQUEST,
  PRODUCT_ING_SUCCESS,
  PRODUCT_ING_FAILURE,
  //
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAILURE,
  //
  PRODUCT_TAG_REQUEST,
  PRODUCT_TAG_SUCCESS,
  PRODUCT_TAG_FAILURE,
  //
  PRODUCT_GEN_REQUEST,
  PRODUCT_GEN_SUCCESS,
  PRODUCT_GEN_FAILURE,
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

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productListAPI(data) {
  return await axios.post("/api/product/pro/list", data);
}

function* productList(action) {
  try {
    const result = yield call(productListAPI, action.data);

    yield put({
      type: PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_LIST_FAILURE,
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
async function productIngAPI(data) {
  return await axios.post("/api/product/pro/ing", data);
}

function* productIng(action) {
  try {
    const result = yield call(productIngAPI, action.data);

    yield put({
      type: PRODUCT_ING_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_ING_FAILURE,
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
async function productTopAPI(data) {
  return await axios.post("/api/product/pro/top", data);
}

function* productTop(action) {
  try {
    const result = yield call(productTopAPI, action.data);

    yield put({
      type: PRODUCT_TOP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TOP_FAILURE,
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
async function productTagAPI(data) {
  return await axios.post("/api/product/tag/list", data);
}

function* productTag(action) {
  try {
    const result = yield call(productTagAPI, action.data);

    yield put({
      type: PRODUCT_TAG_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TAG_FAILURE,
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
async function productGenAPI(data) {
  return await axios.post("/api/product/gen/list", data);
}

function* productGen(action) {
  try {
    const result = yield call(productGenAPI, action.data);

    yield put({
      type: PRODUCT_GEN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_GEN_FAILURE,
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
function* watchProductList() {
  yield takeLatest(PRODUCT_LIST_REQUEST, productList);
}
function* watchProductIng() {
  yield takeLatest(PRODUCT_ING_REQUEST, productIng);
}
function* watchProductTop() {
  yield takeLatest(PRODUCT_TOP_REQUEST, productTop);
}
function* watchProductTag() {
  yield takeLatest(PRODUCT_TAG_REQUEST, productTag);
}
function* watchProductGen() {
  yield takeLatest(PRODUCT_GEN_REQUEST, productGen);
}

//////////////////////////////////////////////////////////////
export default function* productSaga() {
  yield all([
    fork(watchCategoryList),
    fork(watchCategoryNew),
    fork(watchCategoryModify),
    fork(watchCategoryDelete),
    fork(watchProductList),
    fork(watchProductIng),
    fork(watchProductTop),
    fork(watchProductTag),
    fork(watchProductGen),
    //
  ]);
}
