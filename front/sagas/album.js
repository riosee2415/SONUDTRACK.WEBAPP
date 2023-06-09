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

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
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

//////////////////////////////////////////////////////////////
export default function* albumSaga() {
  yield all([
    fork(watchAlbumImage),
    fork(watchAlbumCreate),
    fork(watchAlbumPremiumCreate),
    fork(watchAlbumTrackCreate),
    fork(watchAlbumTrackPermit),
    fork(watchMusictemDetail),

    //
  ]);
}
