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
  PERMM_WAITING_CREATE_REQUEST,
  PERMM_WAITING_CREATE_SUCCESS,
  PERMM_WAITING_CREATE_FAILURE,
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
  //
  ARTISTEM_DETAIL_REQUEST,
  ARTISTEM_DETAIL_SUCCESS,
  ARTISTEM_DETAIL_FAILURE,
  //
  ALL_ARTISTEM_LIST_REQUEST,
  ALL_ARTISTEM_LIST_SUCCESS,
  ALL_ARTISTEM_LIST_FAILURE,
  //
  ARTISTEM_NEAR_LIST_REQUEST,
  ARTISTEM_NEAR_LIST_SUCCESS,
  ARTISTEM_NEAR_LIST_FAILURE,
  //
  ARTIST_UPLOAD_REQUEST,
  ARTIST_UPLOAD_SUCCESS,
  ARTIST_UPLOAD_FAILURE,
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
async function permmWaitingCreateAPI(data) {
  return await axios.post("/api/artist/permm/create", data);
}

function* permmWaitingCreate(action) {
  try {
    const result = yield call(permmWaitingCreateAPI, action.data);

    yield put({
      type: PERMM_WAITING_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERMM_WAITING_CREATE_FAILURE,
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

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistemDetailAPI(data) {
  return await axios.post("/api/artist/target/detail", data);
}

function* artistemDetail(action) {
  try {
    const result = yield call(artistemDetailAPI, action.data);

    yield put({
      type: ARTISTEM_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_DETAIL_FAILURE,
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
async function allArtistemListAPI(data) {
  return await axios.post("/api/artist/artistem/allList", data);
}

function* allArtistemList(action) {
  try {
    const result = yield call(allArtistemListAPI, action.data);

    yield put({
      type: ALL_ARTISTEM_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALL_ARTISTEM_LIST_FAILURE,
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
async function artistemNaerListAPI(data) {
  return await axios.post("/api/artist/artistem/nearList", data);
}

function* artistemNaerList(action) {
  try {
    const result = yield call(artistemNaerListAPI, action.data);

    yield put({
      type: ARTISTEM_NEAR_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_NEAR_LIST_FAILURE,
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
async function artistImgAPI(data) {
  return await axios.post(`/api/artist/image`, data);
}

function* artistImg(action) {
  try {
    const result = yield call(artistImgAPI, action.data);

    yield put({
      type: ARTIST_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_UPLOAD_FAILURE,
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
function* watchFaqTypeCreate() {
  yield takeLatest(PERMM_WAITING_CREATE_REQUEST, permmWaitingCreate);
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
function* watchArtistemDetail() {
  yield takeLatest(ARTISTEM_DETAIL_REQUEST, artistemDetail);
}
function* watchAllArtistemList() {
  yield takeLatest(ALL_ARTISTEM_LIST_REQUEST, allArtistemList);
}
function* watchArtistNearList() {
  yield takeLatest(ARTISTEM_NEAR_LIST_REQUEST, artistemNaerList);
}

function* watchArtistUpload() {
  yield takeLatest(ARTIST_UPLOAD_REQUEST, artistImg);
}

//////////////////////////////////////////////////////////////
export default function* artistSaga() {
  yield all([
    fork(watchFaqTypeList),
    fork(watchFaqTypeOk),
    fork(watchFaqTypeDel),
    fork(watchFaqTypeCreate),
    fork(watchArtistemList),
    fork(watchArtistemIngUp),
    fork(watchArtistemTopUp),
    fork(watchArtistemDetail),
    fork(watchAllArtistemList),
    fork(watchArtistNearList),
    fork(watchArtistUpload),
    //
  ]);
}
