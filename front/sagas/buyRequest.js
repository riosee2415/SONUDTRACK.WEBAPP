import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BUYREQUEST_LIST_REQUEST,
  BUYREQUEST_LIST_SUCCESS,
  BUYREQUEST_LIST_FAILURE,
  //
  BUYREQUEST_CREATE_REQUEST,
  BUYREQUEST_CREATE_SUCCESS,
  BUYREQUEST_CREATE_FAILURE,
  //
  BUYREQUEST_ISOK_REQUEST,
  BUYREQUEST_ISOK_SUCCESS,
  BUYREQUEST_ISOK_FAILURE,
  //
  BUYREQUEST_ISREJECT_REQUEST,
  BUYREQUEST_ISREJECT_SUCCESS,
  BUYREQUEST_ISREJECT_FAILURE,
  //
  BUYREQUEST_FILE_REQUEST,
  BUYREQUEST_FILE_SUCCESS,
  BUYREQUEST_FILE_FAILURE,
} from "../reducers/buyRequest";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function buyRequestListAPI(data) {
  return await axios.post("/api/buyRequest/list", data);
}

function* buyRequestList(action) {
  try {
    const result = yield call(buyRequestListAPI, action.data);

    yield put({
      type: BUYREQUEST_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BUYREQUEST_LIST_FAILURE,
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
async function buyRequestCreateAPI(data) {
  return await axios.post("/api/buyRequest/create", data);
}

function* buyRequestCreate(action) {
  try {
    const result = yield call(buyRequestCreateAPI, action.data);

    yield put({
      type: BUYREQUEST_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BUYREQUEST_CREATE_FAILURE,
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
async function buyRequestIsOkAPI(data) {
  return await axios.post("/api/buyRequest/isOk", data);
}

function* buyRequestIsOk(action) {
  try {
    const result = yield call(buyRequestIsOkAPI, action.data);

    yield put({
      type: BUYREQUEST_ISOK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BUYREQUEST_ISOK_FAILURE,
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
async function buyRequestIsRejectAPI(data) {
  return await axios.post("/api/buyRequest/isReject", data);
}

function* buyRequestIsReject(action) {
  try {
    const result = yield call(buyRequestIsRejectAPI, action.data);

    yield put({
      type: BUYREQUEST_ISREJECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BUYREQUEST_ISREJECT_FAILURE,
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
async function buyRequestFileAPI(data) {
  return await axios.post("/api/buyRequest/file", data);
}

function* buyRequestFile(action) {
  try {
    const result = yield call(buyRequestFileAPI, action.data);

    yield put({
      type: BUYREQUEST_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BUYREQUEST_FILE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchBuyRequestList() {
  yield takeLatest(BUYREQUEST_LIST_REQUEST, buyRequestList);
}
function* watchBuyRequestCreate() {
  yield takeLatest(BUYREQUEST_CREATE_REQUEST, buyRequestCreate);
}
function* watchBuyRequestIsOk() {
  yield takeLatest(BUYREQUEST_ISOK_REQUEST, buyRequestIsOk);
}
function* watchBuyRequestIsReject() {
  yield takeLatest(BUYREQUEST_ISREJECT_REQUEST, buyRequestIsReject);
}
function* watchBuyRequestFile() {
  yield takeLatest(BUYREQUEST_FILE_REQUEST, buyRequestFile);
}

//////////////////////////////////////////////////////////////
export default function* buyRequestSaga() {
  yield all([
    fork(watchBuyRequestList),
    fork(watchBuyRequestCreate),
    fork(watchBuyRequestIsOk),
    fork(watchBuyRequestIsReject),
    fork(watchBuyRequestFile),
    //
  ]);
}
