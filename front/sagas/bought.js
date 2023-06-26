import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAILURE,
  //
  ITEM_CART_CREATE_REQUEST,
  ITEM_CART_CREATE_SUCCESS,
  ITEM_CART_CREATE_FAILURE,
  //
  ITEM_BUY_CREATE_REQUEST,
  ITEM_BUY_CREATE_SUCCESS,
  ITEM_BUY_CREATE_FAILURE,
  //
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAILURE,
  //
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAILURE,
  //
  BOUGHT_CREATE_REQUEST,
  BOUGHT_CREATE_SUCCESS,
  BOUGHT_CREATE_FAILURE,
} from "../reducers/bought";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function itemListAPI(data) {
  return await axios.post(`/api/bought/list/view`, data);
}

function* itemList(action) {
  try {
    const result = yield call(itemListAPI, action.data);

    yield put({
      type: ITEM_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_LIST_FAILURE,
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
async function itemCartCreateAPI(data) {
  return await axios.post(`/api/bought/item/create`, data);
}

function* itemCartCreate(action) {
  try {
    const result = yield call(itemCartCreateAPI, action.data);

    yield put({
      type: ITEM_CART_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_CART_CREATE_FAILURE,
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
async function itemBuyCreateAPI(data) {
  return await axios.post(`/api/bought/item/create`, data);
}

function* itemBuyCreate(action) {
  try {
    const result = yield call(itemBuyCreateAPI, action.data);

    yield put({
      type: ITEM_BUY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_BUY_CREATE_FAILURE,
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
async function itemUpdateAPI(data) {
  return await axios.post(`/api/bought/item/update`, data);
}

function* itemUpdate(action) {
  try {
    const result = yield call(itemUpdateAPI, action.data);

    yield put({
      type: ITEM_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_UPDATE_FAILURE,
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
async function itemDeleteAPI(data) {
  return await axios.post(`/api/bought/item/delete`, data);
}

function* itemDelete(action) {
  try {
    const result = yield call(itemDeleteAPI, action.data);

    yield put({
      type: ITEM_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_DELETE_FAILURE,
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
async function boughtCreateAPI(data) {
  return await axios.post(`/api/bought/create`, data);
}

function* boughtCreate(action) {
  try {
    const result = yield call(boughtCreateAPI, action.data);

    yield put({
      type: BOUGHT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchItemList() {
  yield takeLatest(ITEM_LIST_REQUEST, itemList);
}
function* watchItemCartCreate() {
  yield takeLatest(ITEM_CART_CREATE_REQUEST, itemCartCreate);
}
function* watchItemBuyCreate() {
  yield takeLatest(ITEM_BUY_CREATE_REQUEST, itemBuyCreate);
}

function* watchItemUpdate() {
  yield takeLatest(ITEM_UPDATE_REQUEST, itemUpdate);
}
function* watchItemDelete() {
  yield takeLatest(ITEM_DELETE_REQUEST, itemDelete);
}
function* watchBoughtCreate() {
  yield takeLatest(BOUGHT_CREATE_REQUEST, boughtCreate);
}

//////////////////////////////////////////////////////////////
export default function* boughtSaga() {
  yield all([
    fork(watchItemList),
    fork(watchItemCartCreate),
    fork(watchItemBuyCreate),
    fork(watchItemUpdate),
    fork(watchItemDelete),
    fork(watchBoughtCreate),

    //
  ]);
}
