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
  //
  BOUGHT_ALL_REQUEST,
  BOUGHT_ALL_SUCCESS,
  BOUGHT_ALL_FAILURE,
  //
  BOUGHT_ALL_ADMIN_REQUEST,
  BOUGHT_ALL_ADMIN_SUCCESS,
  BOUGHT_ALL_ADMIN_FAILURE,
  //
  BOUGHT_LIST_REQUEST,
  BOUGHT_LIST_SUCCESS,
  BOUGHT_LIST_FAILURE,
  //
  BOUGHT_DETAIL_REQUEST,
  BOUGHT_DETAIL_SUCCESS,
  BOUGHT_DETAIL_FAILURE,
  //
  BOUGHT_ADMIN_LIST_REQUEST,
  BOUGHT_ADMIN_LIST_SUCCESS,
  BOUGHT_ADMIN_LIST_FAILURE,
  //
  SALESSLIP_REQUEST,
  SALESSLIP_SUCCESS,
  SALESSLIP_FAILURE,
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

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtAllAPI(data) {
  return await axios.post(`/api/bought/all`, data);
}

function* boughtAll(action) {
  try {
    const result = yield call(boughtAllAPI, action.data);

    yield put({
      type: BOUGHT_ALL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ALL_FAILURE,
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
async function boughtAllAdminAPI(data) {
  return await axios.post(`/api/bought/all/admin`, data);
}

function* boughtAllAdmin(action) {
  try {
    const result = yield call(boughtAllAdminAPI, action.data);

    yield put({
      type: BOUGHT_ALL_ADMIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ALL_ADMIN_FAILURE,
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
async function boughtListAPI(data) {
  return await axios.post(`/api/bought/track/list`, data);
}

function* boughtList(action) {
  try {
    const result = yield call(boughtListAPI, action.data);

    yield put({
      type: BOUGHT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_LIST_FAILURE,
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
async function boughtDetailAPI(data) {
  return await axios.post(`/api/bought/detail`, data);
}

function* boughtDetail(action) {
  try {
    const result = yield call(boughtDetailAPI, action.data);

    yield put({
      type: BOUGHT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_DETAIL_FAILURE,
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
async function boughtAdminListAPI(data) {
  return await axios.post(`/api/bought/admin/list`, data);
}

function* boughtAdminList(action) {
  try {
    const result = yield call(boughtAdminListAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_LIST_FAILURE,
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
async function salesSlipAPI(data) {
  return await axios.post(`/api/bought/salesSlip`, data);
}

function* salesSlip(action) {
  try {
    const result = yield call(salesSlipAPI, action.data);

    yield put({
      type: SALESSLIP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SALESSLIP_FAILURE,
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
function* watchBoughtAll() {
  yield takeLatest(BOUGHT_ALL_REQUEST, boughtAll);
}
function* watchBoughtAllAdmin() {
  yield takeLatest(BOUGHT_ALL_ADMIN_REQUEST, boughtAllAdmin);
}
function* watchBoughtList() {
  yield takeLatest(BOUGHT_LIST_REQUEST, boughtList);
}
function* watchBoughtDetail() {
  yield takeLatest(BOUGHT_DETAIL_REQUEST, boughtDetail);
}
function* watchBoughtAdminList() {
  yield takeLatest(BOUGHT_ADMIN_LIST_REQUEST, boughtAdminList);
}
function* watchSalesSlip() {
  yield takeLatest(SALESSLIP_REQUEST, salesSlip);
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
    fork(watchBoughtAll),
    fork(watchBoughtAllAdmin),
    fork(watchBoughtList),
    fork(watchBoughtDetail),
    fork(watchBoughtAdminList),
    fork(watchSalesSlip),

    //
  ]);
}
