import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  NEW_ARTIST_LIST_REQUEST,
  NEW_ARTIST_LIST_SUCCESS,
  NEW_ARTIST_LIST_FAILURE,
  //
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
  ARTISTEM_ING_UP_REQUEST,
  ARTISTEM_ING_UP_SUCCESS,
  ARTISTEM_ING_UP_FAILURE,
  //
  ARTISTEM_TOP_UP_REQUEST,
  ARTISTEM_TOP_UP_SUCCESS,
  ARTISTEM_TOP_UP_FAILURE,

  //
  ALL_ARTISTEM_LIST_REQUEST,
  ALL_ARTISTEM_LIST_SUCCESS,
  ALL_ARTISTEM_LIST_FAILURE,
  //
  ARTISTEM_NEAR_LIST_REQUEST,
  ARTISTEM_NEAR_LIST_SUCCESS,
  ARTISTEM_NEAR_LIST_FAILURE,
  //
  ARTISTEM_SLIDE_LIST_REQUEST,
  ARTISTEM_SLIDE_LIST_SUCCESS,
  ARTISTEM_SLIDE_LIST_FAILURE,
  //
  ARTIST_UPLOAD_REQUEST,
  ARTIST_UPLOAD_SUCCESS,
  ARTIST_UPLOAD_FAILURE,
  //
  ARTIST_INFO_UPDATE_REQUEST,
  ARTIST_INFO_UPDATE_SUCCESS,
  ARTIST_INFO_UPDATE_FAILURE,
  //
  FILMO_FILE_UPLOAD_REQUEST,
  FILMO_FILE_UPLOAD_SUCCESS,
  FILMO_FILE_UPLOAD_FAILURE,
  //
  FILMO_IMG_UPLOAD_REQUEST,
  FILMO_IMG_UPLOAD_SUCCESS,
  FILMO_IMG_UPLOAD_FAILURE,
  //
  ARTIST_VACA_UPDATE_REQUEST,
  ARTIST_VACA_UPDATE_SUCCESS,
  ARTIST_VACA_UPDATE_FAILURE,
  //
  REP_SONG_FILE_UPLOAD_REQUEST,
  REP_SONG_FILE_UPLOAD_SUCCESS,
  REP_SONG_FILE_UPLOAD_FAILURE,
} from "../reducers/artist";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function newArtistListAPI(data) {
  return await axios.post("/api/artist/new", data);
}

function* newArtistList(action) {
  try {
    const result = yield call(newArtistListAPI, action.data);

    yield put({
      type: NEW_ARTIST_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NEW_ARTIST_LIST_FAILURE,
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
async function artistemSlideListAPI(data) {
  return await axios.post("/api/artist/new/main", data);
}

function* artistemSlideList(action) {
  try {
    const result = yield call(artistemSlideListAPI, action.data);

    yield put({
      type: ARTISTEM_SLIDE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_SLIDE_LIST_FAILURE,
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

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistInfoUpdateAPI(data) {
  return await axios.post(`/api/artist/info/update`, data);
}

function* artistInfoUpdate(action) {
  try {
    const result = yield call(artistInfoUpdateAPI, action.data);

    yield put({
      type: ARTIST_INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_INFO_UPDATE_FAILURE,
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
async function filmoFileAPI(data) {
  return await axios.post(`/api/artist/image`, data);
}

function* filmoFile(action) {
  try {
    const result = yield call(filmoFileAPI, action.data);

    yield put({
      type: FILMO_FILE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FILMO_FILE_UPLOAD_FAILURE,
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
async function filmoImgAPI(data) {
  return await axios.post(`/api/artist/image`, data);
}

function* filmoImg(action) {
  try {
    const result = yield call(filmoImgAPI, action.data);

    yield put({
      type: FILMO_IMG_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FILMO_IMG_UPLOAD_FAILURE,
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
async function artistVacaUpdateAPI(data) {
  return await axios.post(`/api/artist/info/vacation/update`, data);
}

function* artistVacaUpdate(action) {
  try {
    const result = yield call(artistVacaUpdateAPI, action.data);

    yield put({
      type: ARTIST_VACA_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_VACA_UPDATE_FAILURE,
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
async function repSongFileAPI(data) {
  return await axios.post(`/api/artist/image`, data);
}

function* repSongFile(action) {
  try {
    const result = yield call(repSongFileAPI, action.data);

    yield put({
      type: REP_SONG_FILE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REP_SONG_FILE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchNewArtistList() {
  yield takeLatest(NEW_ARTIST_LIST_REQUEST, newArtistList);
}
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

function* watchArtistemIngUp() {
  yield takeLatest(ARTISTEM_ING_UP_REQUEST, artistemIngUp);
}
function* watchArtistemTopUp() {
  yield takeLatest(ARTISTEM_TOP_UP_REQUEST, artistemTopUp);
}

function* watchAllArtistemList() {
  yield takeLatest(ALL_ARTISTEM_LIST_REQUEST, allArtistemList);
}
function* watchArtistNearList() {
  yield takeLatest(ARTISTEM_NEAR_LIST_REQUEST, artistemNaerList);
}
function* watchArtistSlideList() {
  yield takeLatest(ARTISTEM_SLIDE_LIST_REQUEST, artistemSlideList);
}
function* watchArtistUpload() {
  yield takeLatest(ARTIST_UPLOAD_REQUEST, artistImg);
}
function* watchArtistInfoUpdate() {
  yield takeLatest(ARTIST_INFO_UPDATE_REQUEST, artistInfoUpdate);
}
function* watchFilmoFileUpload() {
  yield takeLatest(FILMO_FILE_UPLOAD_REQUEST, filmoFile);
}
function* watchFilmoImgUpload() {
  yield takeLatest(FILMO_IMG_UPLOAD_REQUEST, filmoImg);
}
function* watchArtistVacaUpdate() {
  yield takeLatest(ARTIST_VACA_UPDATE_REQUEST, artistVacaUpdate);
}
function* watchRepSongFileUpload() {
  yield takeLatest(REP_SONG_FILE_UPLOAD_REQUEST, repSongFile);
}

//////////////////////////////////////////////////////////////
export default function* artistSaga() {
  yield all([
    fork(watchNewArtistList),
    fork(watchFaqTypeList),
    fork(watchFaqTypeOk),
    fork(watchFaqTypeDel),
    fork(watchFaqTypeCreate),
    fork(watchArtistemIngUp),
    fork(watchArtistemTopUp),
    fork(watchAllArtistemList),
    fork(watchArtistNearList),
    fork(watchArtistSlideList),
    fork(watchArtistUpload),
    fork(watchArtistInfoUpdate),
    fork(watchFilmoFileUpload),
    fork(watchFilmoImgUpload),
    fork(watchArtistVacaUpdate),
    fork(watchRepSongFileUpload),
    //
  ]);
}
