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

//////////////////////////////////////////////////////////////
export default function* artistSaga() {
  yield all([
    fork(watchFaqTypeList),
    fork(watchFaqTypeOk),
    fork(watchFaqTypeDel),
    //
  ]);
}
