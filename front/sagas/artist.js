import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PERMM_WAITING_LIST_REQUEST,
  PERMM_WAITING_LIST_SUCCESS,
  PERMM_WAITING_LIST_FAILURE,
  //
  PERMM_WAITING_OK_REQUEST,
  PERMM_WAITING_OK_SUCCESS,
  PERMM_WAITING_OK_FAILURE,
  //
  PERMM_WAITING_DEL_REQUEST,
  PERMM_WAITING_DEL_SUCCESS,
  PERMM_WAITING_DEL_FAILURE,
  //
  ARTISTEM_LIST_REQUEST,
  ARTISTEM_LIST_SUCCESS,
  ARTISTEM_LIST_FAILURE,
  //
  ARTISTEM_ING_UP_REQUEST,
  ARTISTEM_ING_UP_SUCCESS,
  ARTISTEM_ING_UP_FAILURE,
  //
  ARTISTEM_TOP_UP_REQUEST,
  ARTISTEM_TOP_UP_SUCCESS,
  ARTISTEM_TOP_UP_FAILURE,
} from "../reducers/artist";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function permmWaitingListAPI(data) {
  return await axios.post("/api/artist/permm/list", data);
}

function* permmWaitingList(action) {
  try {
    const result = yield call(permmWaitingListAPI, action.data);

    yield put({
      type: PERMM_WAITING_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERMM_WAITING_LIST_FAILURE,
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
async function permmWaitingOkAPI(data) {
  return await axios.post("/api/artist/permm/ok", data);
}

function* permmWaitingOk(action) {
  try {
    const result = yield call(permmWaitingOkAPI, action.data);

    yield put({
      type: PERMM_WAITING_OK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERMM_WAITING_OK_FAILURE,
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
async function permmWaitingDelAPI(data) {
  return await axios.post("/api/artist/permm/del", data);
}

function* permmWaitingDel(action) {
  try {
    const result = yield call(permmWaitingDelAPI, action.data);

    yield put({
      type: PERMM_WAITING_DEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERMM_WAITING_DEL_FAILURE,
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
async function artistemListAPI(data) {
  return await axios.post("/api/artist/target/list", data);
}

function* artistemList(action) {
  try {
    const result = yield call(artistemListAPI, action.data);

    yield put({
      type: ARTISTEM_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_LIST_FAILURE,
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
async function artistemIngUpAPI(data) {
  return await axios.post("/api/artist/artistem/isIng", data);
}

function* artistemIngUp(action) {
  try {
    const result = yield call(artistemIngUpAPI, action.data);

    yield put({
      type: ARTISTEM_ING_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_ING_UP_FAILURE,
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
async function artistemTopUpAPI(data) {
  return await axios.post("/api/artist/artistem/top", data);
}

function* artistemTopUp(action) {
  try {
    const result = yield call(artistemTopUpAPI, action.data);

    yield put({
      type: ARTISTEM_TOP_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_TOP_UP_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchFaqTypeList() {
  yield takeLatest(PERMM_WAITING_LIST_REQUEST, permmWaitingList);
}
function* watchFaqTypeOk() {
  yield takeLatest(PERMM_WAITING_OK_REQUEST, permmWaitingOk);
}
function* watchFaqTypeDel() {
  yield takeLatest(PERMM_WAITING_DEL_REQUEST, permmWaitingDel);
}
function* watchArtistemList() {
  yield takeLatest(ARTISTEM_LIST_REQUEST, artistemList);
}
function* watchArtistemIngUp() {
  yield takeLatest(ARTISTEM_ING_UP_REQUEST, artistemIngUp);
}
function* watchArtistemTopUp() {
  yield takeLatest(ARTISTEM_TOP_UP_REQUEST, artistemTopUp);
}

//////////////////////////////////////////////////////////////
export default function* artistSaga() {
  yield all([
    fork(watchFaqTypeList),
    fork(watchFaqTypeOk),
    fork(watchFaqTypeDel),
    fork(watchArtistemList),
    fork(watchArtistemIngUp),
    fork(watchArtistemTopUp),
    //
  ]);
}
