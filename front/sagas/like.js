import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MY_LIKE_LIST_REQUEST,
  MY_LIKE_LIST_SUCCESS,
  MY_LIKE_LIST_FAILURE,
  //
  ARTIST_CREATE_REQUEST,
  ARTIST_CREATE_SUCCESS,
  ARTIST_CREATE_FAILURE,
  //
  ARTIST_DELETE_REQUEST,
  ARTIST_DELETE_SUCCESS,
  ARTIST_DELETE_FAILURE,
  //
  ALBUM_CREATE_REQUEST,
  ALBUM_CREATE_SUCCESS,
  ALBUM_CREATE_FAILURE,
  //
  ALBUM_DELETE_REQUEST,
  ALBUM_DELETE_SUCCESS,
  ALBUM_DELETE_FAILURE,
  //
  TRACK_CREATE_REQUEST,
  TRACK_CREATE_SUCCESS,
  TRACK_CREATE_FAILURE,
  //
  TRACK_DELETE_REQUEST,
  TRACK_DELETE_SUCCESS,
  TRACK_DELETE_FAILURE,
} from "../reducers/like";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function myLikeListAPI(data) {
  return await axios.post(`/api/like/list`, data);
}

function* myLikeList(action) {
  try {
    const result = yield call(myLikeListAPI, action.data);

    yield put({
      type: MY_LIKE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_LIKE_LIST_FAILURE,
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
async function artistCreateAPI(data) {
  return await axios.post(`/api/like/artist/create`, data);
}

function* artistCreate(action) {
  try {
    const result = yield call(artistCreateAPI, action.data);

    yield put({
      type: ARTIST_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_CREATE_FAILURE,
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
async function artistDeleteAPI(data) {
  return await axios.post(`/api/like/artist/delete`, data);
}

function* artistDelete(action) {
  try {
    const result = yield call(artistDeleteAPI, action.data);

    yield put({
      type: ARTIST_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTIST_DELETE_FAILURE,
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
async function albumCreateAPI(data) {
  return await axios.post(`/api/like/album/create`, data);
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
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function albumDeleteAPI(data) {
  return await axios.post(`/api/like/album/delete`, data);
}

function* albumDelete(action) {
  try {
    const result = yield call(albumDeleteAPI, action.data);

    yield put({
      type: ALBUM_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALBUM_DELETE_FAILURE,
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
async function trackCreateAPI(data) {
  return await axios.post(`/api/like/track/create`, data);
}

function* trackCreate(action) {
  try {
    const result = yield call(trackCreateAPI, action.data);

    yield put({
      type: TRACK_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TRACK_CREATE_FAILURE,
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
async function trackDeleteAPI(data) {
  return await axios.post(`/api/like/track/delete`, data);
}

function* trackDelete(action) {
  try {
    const result = yield call(trackDeleteAPI, action.data);

    yield put({
      type: TRACK_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TRACK_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchMyLikeList() {
  yield takeLatest(MY_LIKE_LIST_REQUEST, myLikeList);
}

function* watchArtistCreate() {
  yield takeLatest(ARTIST_CREATE_REQUEST, artistCreate);
}

function* watchArtistDelete() {
  yield takeLatest(ARTIST_DELETE_REQUEST, artistDelete);
}

function* watchAlbumCreate() {
  yield takeLatest(ALBUM_CREATE_REQUEST, albumCreate);
}

function* watchAlbumDelete() {
  yield takeLatest(ALBUM_DELETE_REQUEST, albumDelete);
}

function* watchTrackCreate() {
  yield takeLatest(TRACK_CREATE_REQUEST, trackCreate);
}

function* watchTrackDelete() {
  yield takeLatest(TRACK_DELETE_REQUEST, trackDelete);
}

//////////////////////////////////////////////////////////////
export default function* likeSaga() {
  yield all([
    fork(watchMyLikeList),
    fork(watchArtistCreate),
    fork(watchArtistDelete),
    fork(watchAlbumCreate),
    fork(watchAlbumDelete),
    fork(watchTrackCreate),
    fork(watchTrackDelete),

    //
  ]);
}
