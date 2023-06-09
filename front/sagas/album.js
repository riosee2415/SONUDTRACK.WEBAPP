import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ALBUM_IMAGE_REQUEST,
  ALBUM_IMAGE_SUCCESS,
  ALBUM_IMAGE_FAILURE,
  //
  ALBUM_CREATE_REQUEST,
  ALBUM_CREATE_SUCCESS,
  ALBUM_CREATE_FAILURE,
  //
  ALBUM_PREMIUM_CREATE_REQUEST,
  ALBUM_PREMIUM_CREATE_SUCCESS,
  ALBUM_PREMIUM_CREATE_FAILURE,
  //
  ALBUM_TRACK_CREATE_REQUEST,
  ALBUM_TRACK_CREATE_SUCCESS,
  ALBUM_TRACK_CREATE_FAILURE,
  //
  ALBUM_TRACK_PERMIT_REQUEST,
  ALBUM_TRACK_PERMIT_SUCCESS,
  ALBUM_TRACK_PERMIT_FAILURE,
  //
  MUSICTEM_DETAIL_REQUEST,
  MUSICTEM_DETAIL_SUCCESS,
  MUSICTEM_DETAIL_FAILURE,
  //
  ALBUM_FILE_REQUEST,
  ALBUM_FILE_SUCCESS,
  ALBUM_FILE_FAILURE,
  //
  ALBUM_TRACK_FILE_REQUEST,
  ALBUM_TRACK_FILE_SUCCESS,
  ALBUM_TRACK_FILE_FAILURE,
  //
  MUSICTEM_LIST_REQUEST,
  MUSICTEM_LIST_SUCCESS,
  MUSICTEM_LIST_FAILURE,
  //
  NEW_MUSICTEM_LIST_REQUEST,
  NEW_MUSICTEM_LIST_SUCCESS,
  NEW_MUSICTEM_LIST_FAILURE,
} from "../reducers/album";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function albumImageAPI(data) {
  return await axios.post(`/api/album/image`, data);
}

function* albumImage(action) {
  try {
    const result = yield call(albumImageAPI, action.data);

    yield put({
      type: ALBUM_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALBUM_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function albumCreateAPI(data) {
  return await axios.post(`/api/album/create`, data);
}

function* albumCreate(action) {
  try {
    const result = yield call(albumCreateAPI, action.data);

    yield put({
      type: ALBUM_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALBUM_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function albumPremiumCreateAPI(data) {
  return await axios.post(`/api/album/premium/create`, data);
}

function* albumPremiumCreate(action) {
  try {
    const result = yield call(albumPremiumCreateAPI, action.data);

    yield put({
      type: ALBUM_PREMIUM_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALBUM_PREMIUM_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function albumTrackCreateAPI(data) {
  return await axios.post(`/api/album/track/create`, data);
}

function* albumTrackCreate(action) {
  try {
    const result = yield call(albumTrackCreateAPI, action.data);

    yield put({
      type: ALBUM_TRACK_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALBUM_TRACK_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function albumTrackPermitAPI(data) {
  return await axios.post(`/api/album/track/permit`, data);
}

function* albumTrackPermit(action) {
  try {
    const result = yield call(albumTrackPermitAPI, action.data);

    yield put({
      type: ALBUM_TRACK_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALBUM_TRACK_PERMIT_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function musictemDetailAPI(data) {
  return await axios.post(`/api/album/musictem/detail`, data);
}

function* musictemDetail(action) {
  try {
    const result = yield call(musictemDetailAPI, action.data);

    yield put({
      type: MUSICTEM_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MUSICTEM_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function albumFileAPI(data) {
  return await axios.post(`/api/album/file`, data);
}

function* albumFile(action) {
  try {
    const result = yield call(albumFileAPI, action.data);

    yield put({
      type: ALBUM_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALBUM_FILE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function albumTrackFileAPI(data) {
  return await axios.post(`/api/album/file`, data);
}

function* albumTrackFile(action) {
  try {
    const result = yield call(albumTrackFileAPI, action.data);

    yield put({
      type: ALBUM_TRACK_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALBUM_TRACK_FILE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function musictemListAPI(data) {
  return await axios.post(`/api/album/musictem/list`, data);
}

function* musictemList(action) {
  try {
    const result = yield call(musictemListAPI, action.data);

    yield put({
      type: MUSICTEM_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MUSICTEM_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function newMusictemListAPI(data) {
  return await axios.post(`/api/album/new/list`, data);
}

function* newMusictemList(action) {
  try {
    const result = yield call(newMusictemListAPI, action.data);

    yield put({
      type: NEW_MUSICTEM_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NEW_MUSICTEM_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchAlbumImage() {
  yield takeLatest(ALBUM_IMAGE_REQUEST, albumImage);
}
function* watchAlbumCreate() {
  yield takeLatest(ALBUM_CREATE_REQUEST, albumCreate);
}
function* watchAlbumPremiumCreate() {
  yield takeLatest(ALBUM_PREMIUM_CREATE_REQUEST, albumPremiumCreate);
}
function* watchAlbumTrackCreate() {
  yield takeLatest(ALBUM_TRACK_CREATE_REQUEST, albumTrackCreate);
}
function* watchAlbumTrackPermit() {
  yield takeLatest(ALBUM_TRACK_PERMIT_REQUEST, albumTrackPermit);
}
function* watchMusictemDetail() {
  yield takeLatest(MUSICTEM_DETAIL_REQUEST, musictemDetail);
}
function* watchAlbumFile() {
  yield takeLatest(ALBUM_FILE_REQUEST, albumFile);
}
function* watchAlbumTrackFile() {
  yield takeLatest(ALBUM_TRACK_FILE_REQUEST, albumTrackFile);
}
function* watchMusictemList() {
  yield takeLatest(MUSICTEM_LIST_REQUEST, musictemList);
}
function* watchNewMusictemList() {
  yield takeLatest(NEW_MUSICTEM_LIST_REQUEST, newMusictemList);
}

//////////////////////////////////////////////////////////////
export default function* albumSaga() {
  yield all([
    fork(watchAlbumImage),
    fork(watchAlbumCreate),
    fork(watchAlbumPremiumCreate),
    fork(watchAlbumTrackCreate),
    fork(watchAlbumTrackPermit),
    fork(watchMusictemDetail),
    fork(watchAlbumFile),
    fork(watchAlbumTrackFile),
    fork(watchMusictemList),
    fork(watchNewMusictemList),

    //
  ]);
}
