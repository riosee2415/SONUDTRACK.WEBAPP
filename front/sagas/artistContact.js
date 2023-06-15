import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ARTIST_CONTACT_FILE_REQUEST,
  ARTIST_CONTACT_FILE_SUCCESS,
  ARTIST_CONTACT_FILE_FAILURE,
  //
  ARTIST_CONTACT_ADMIN_LIST_REQUEST,
  ARTIST_CONTACT_ADMIN_LIST_SUCCESS,
  ARTIST_CONTACT_ADMIN_LIST_FAILURE,
  //
  ARTIST_CONTACT_MY_LIST_REQUEST,
  ARTIST_CONTACT_MY_LIST_SUCCESS,
  ARTIST_CONTACT_MY_LIST_FAILURE,
  //
  ARTIST_CONTACT_LIST_REQUEST,
  ARTIST_CONTACT_LIST_SUCCESS,
  ARTIST_CONTACT_LIST_FAILURE,
  //
  ARTIST_CONTACT_CREATE_REQUEST,
  ARTIST_CONTACT_CREATE_SUCCESS,
  ARTIST_CONTACT_CREATE_FAILURE,
  //
  ARTIST_CONTACT_PERMIT_REQUEST,
  ARTIST_CONTACT_PERMIT_SUCCESS,
  ARTIST_CONTACT_PERMIT_FAILURE,
  //
  ARTIST_CONTACT_REJECT_REQUEST,
  ARTIST_CONTACT_REJECT_SUCCESS,
  ARTIST_CONTACT_REJECT_FAILURE,
  //
  ARTIST_CONTACT_PAYMENT_REQUEST,
  ARTIST_CONTACT_PAYMENT_SUCCESS,
  ARTIST_CONTACT_PAYMENT_FAILURE,
  //
  ARTIST_CONTACT_SEND_REQUEST,
  ARTIST_CONTACT_SEND_SUCCESS,
  ARTIST_CONTACT_SEND_FAILURE,
  //
  ARTIST_CONTACT_DELETE_REQUEST,
  ARTIST_CONTACT_DELETE_SUCCESS,
  ARTIST_CONTACT_DELETE_FAILURE,
} from "../reducers/artistContact";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistContactFileAPI(data) {
  return await axios.post("/api/artistContact/file", data);
}

function* artistContactFile(action) {
  try {
    const result = yield call(artistContactFileAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_FILE_FAILURE,
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
async function artistContactAdminListAPI(data) {
  return await axios.post("/api/artistContact/list", data);
}

function* artistContactAdminList(action) {
  try {
    const result = yield call(artistContactAdminListAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_ADMIN_LIST_FAILURE,
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
async function artistContactMyListAPI(data) {
  return await axios.post("/api/artistContact/my/list", data);
}

function* artistContactMyList(action) {
  try {
    const result = yield call(artistContactMyListAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_MY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_MY_LIST_FAILURE,
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
async function artistContactListAPI(data) {
  return await axios.post("/api/artistContact/artist/list", data);
}

function* artistContactList(action) {
  try {
    const result = yield call(artistContactListAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_LIST_FAILURE,
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
async function artistContactCreateAPI(data) {
  return await axios.post("/api/artistContact/create", data);
}

function* artistContactCreate(action) {
  try {
    const result = yield call(artistContactCreateAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_CREATE_FAILURE,
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
async function artistContactPermitAPI(data) {
  return await axios.post("/api/artistContact/isOk", data);
}

function* artistContactPermit(action) {
  try {
    const result = yield call(artistContactPermitAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_PERMIT_FAILURE,
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
async function artistContactRejectAPI(data) {
  return await axios.post("/api/artistContact/isReject", data);
}

function* artistContactReject(action) {
  try {
    const result = yield call(artistContactRejectAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_REJECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_REJECT_FAILURE,
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
async function artistContactPaymentAPI(data) {
  return await axios.post("/api/artistContact/payment", data);
}

function* artistContactPayment(action) {
  try {
    const result = yield call(artistContactPaymentAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_PAYMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_PAYMENT_FAILURE,
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
async function artistContactSendAPI(data) {
  return await axios.post("/api/artistContact/sendCompleteFile", data);
}

function* artistContactSend(action) {
  try {
    const result = yield call(artistContactSendAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_SEND_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_SEND_FAILURE,
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
async function artistContactDeleteAPI(data) {
  return await axios.post("/api/artistContact/delete", data);
}

function* artistContactDelete(action) {
  try {
    const result = yield call(artistContactDeleteAPI, action.data);

    yield put({
      type: ARTIST_CONTACT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CONTACT_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchArtistContactFile() {
  yield takeLatest(ARTIST_CONTACT_FILE_REQUEST, artistContactFile);
}
function* watchArtistContactAdminList() {
  yield takeLatest(ARTIST_CONTACT_ADMIN_LIST_REQUEST, artistContactAdminList);
}
function* watchArtistContactMyList() {
  yield takeLatest(ARTIST_CONTACT_MY_LIST_REQUEST, artistContactMyList);
}
function* watchArtistContactList() {
  yield takeLatest(ARTIST_CONTACT_LIST_REQUEST, artistContactList);
}
function* watchArtistContactCreate() {
  yield takeLatest(ARTIST_CONTACT_CREATE_REQUEST, artistContactCreate);
}
function* watchArtistContactPermit() {
  yield takeLatest(ARTIST_CONTACT_PERMIT_REQUEST, artistContactPermit);
}
function* watchArtistContactReject() {
  yield takeLatest(ARTIST_CONTACT_REJECT_REQUEST, artistContactReject);
}
function* watchArtistContactPayment() {
  yield takeLatest(ARTIST_CONTACT_PAYMENT_REQUEST, artistContactPayment);
}
function* watchArtistContactSend() {
  yield takeLatest(ARTIST_CONTACT_SEND_REQUEST, artistContactSend);
}
function* watchArtistContactDelete() {
  yield takeLatest(ARTIST_CONTACT_DELETE_REQUEST, artistContactDelete);
}

//////////////////////////////////////////////////////////////
export default function* artistContactSaga() {
  yield all([
    fork(watchArtistContactFile),
    fork(watchArtistContactAdminList),
    fork(watchArtistContactMyList),
    fork(watchArtistContactList),
    fork(watchArtistContactCreate),
    fork(watchArtistContactPermit),
    fork(watchArtistContactReject),
    fork(watchArtistContactPayment),
    fork(watchArtistContactSend),
    fork(watchArtistContactDelete),
    //
  ]);
}
