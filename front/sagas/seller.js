import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SELLER_LIST_REQUEST,
  SELLER_LIST_SUCCESS,
  SELLER_LIST_FAILURE,
  //
  SELLER_CREATE_REQUEST,
  SELLER_CREATE_SUCCESS,
  SELLER_CREATE_FAILURE,
  //
  SELLER_ADMIN_PERMIT_REQUEST,
  SELLER_ADMIN_PERMIT_SUCCESS,
  SELLER_ADMIN_PERMIT_FAILURE,
  //
  ARTISTEM_MY_DATA_REQUEST,
  ARTISTEM_MY_DATA_SUCCESS,
  ARTISTEM_MY_DATA_FAILURE,
  //
  ARTISTEM_INFO_UPDATE_REQUEST,
  ARTISTEM_INFO_UPDATE_SUCCESS,
  ARTISTEM_INFO_UPDATE_FAILURE,
  //
  SELLER_IMAGE_REQUEST,
  SELLER_IMAGE_SUCCESS,
  SELLER_IMAGE_FAILURE,
  //
  ARTISTEM_FILE_REQUEST,
  ARTISTEM_FILE_SUCCESS,
  ARTISTEM_FILE_FAILURE,
  //
  FILMO_COVER_IMAGE_REQUEST,
  FILMO_COVER_IMAGE_SUCCESS,
  FILMO_COVER_IMAGE_FAILURE,
  //
  FILMO_MUSIC_REQUEST,
  FILMO_MUSIC_SUCCESS,
  FILMO_MUSIC_FAILURE,
  //
  ARTISTEM_LIST_REQUEST,
  ARTISTEM_LIST_SUCCESS,
  ARTISTEM_LIST_FAILURE,
  //
  ARTISTEM_DETAIL_REQUEST,
  ARTISTEM_DETAIL_SUCCESS,
  ARTISTEM_DETAIL_FAILURE,
  //
  MUSICTEM_INFO_UPDATE_REQUEST,
  MUSICTEM_INFO_UPDATE_SUCCESS,
  MUSICTEM_INFO_UPDATE_FAILURE,
  //
  ARTISTEM_TOP_SELL_LIST_REQUEST,
  ARTISTEM_TOP_SELL_LIST_SUCCESS,
  ARTISTEM_TOP_SELL_LIST_FAILURE,
  //
  ARTISTEM_VACATION_UPDATE_REQUEST,
  ARTISTEM_VACATION_UPDATE_SUCCESS,
  ARTISTEM_VACATION_UPDATE_FAILURE,
  //
  MY_FILMO_REQUEST,
  MY_FILMO_SUCCESS,
  MY_FILMO_FAILURE,
} from "../reducers/seller";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function sellerListAPI(data) {
  return await axios.post(`/api/seller/list`, data);
}

function* sellerList(action) {
  try {
    const result = yield call(sellerListAPI, action.data);

    yield put({
      type: SELLER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELLER_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function sellerCreateAPI(data) {
  return await axios.post(`/api/seller/create`, data);
}

function* sellerCreate(action) {
  try {
    const result = yield call(sellerCreateAPI, action.data);

    yield put({
      type: SELLER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELLER_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function sellerAdminPermitAPI(data) {
  return await axios.post(`/api/seller/admin/permit`, data);
}

function* sellerAdminPermit(action) {
  try {
    const result = yield call(sellerAdminPermitAPI, action.data);

    yield put({
      type: SELLER_ADMIN_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELLER_ADMIN_PERMIT_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistemMyDataAPI(data) {
  return await axios.post(`/api/seller/artistem/myData`, data);
}

function* artistemMyData(action) {
  try {
    const result = yield call(artistemMyDataAPI, action.data);

    yield put({
      type: ARTISTEM_MY_DATA_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_MY_DATA_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistemInfoUpdateAPI(data) {
  return await axios.post(`/api/seller/artistem/info/update`, data);
}

function* artistemInfoUpdate(action) {
  try {
    const result = yield call(artistemInfoUpdateAPI, action.data);

    yield put({
      type: ARTISTEM_INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_INFO_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function sellerImageAPI(data) {
  return await axios.post(`/api/seller/image`, data);
}

function* sellerImage(action) {
  try {
    const result = yield call(sellerImageAPI, action.data);

    yield put({
      type: SELLER_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELLER_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistemFileAPI(data) {
  return await axios.post(`/api/seller/image`, data);
}

function* artistemFile(action) {
  try {
    const result = yield call(artistemFileAPI, action.data);

    yield put({
      type: ARTISTEM_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_FILE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function filmoCoverImageAPI(data) {
  return await axios.post(`/api/seller/image`, data);
}

function* filmoCoverImage(action) {
  try {
    const result = yield call(filmoCoverImageAPI, action.data);

    yield put({
      type: FILMO_COVER_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FILMO_COVER_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function filmoMusicAPI(data) {
  return await axios.post(`/api/seller/image`, data);
}

function* filmoMusic(action) {
  try {
    const result = yield call(filmoMusicAPI, action.data);

    yield put({
      type: FILMO_MUSIC_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FILMO_MUSIC_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistemListAPI(data) {
  return await axios.post(`/api/seller/artistem/list`, data);
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistemDetailAPI(data) {
  return await axios.post(`/api/seller/artistem/detail`, data);
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function musictemInfoUpdateAPI(data) {
  return await axios.post(`/api/seller/musictem/info/update`, data);
}

function* musictemInfoUpdate(action) {
  try {
    const result = yield call(musictemInfoUpdateAPI, action.data);

    yield put({
      type: MUSICTEM_INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MUSICTEM_INFO_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistemTopSellListAPI(data) {
  return await axios.post(`/api/seller/artistem/topSell/list`, data);
}

function* artistemTopSellList(action) {
  try {
    const result = yield call(artistemTopSellListAPI, action.data);

    yield put({
      type: ARTISTEM_TOP_SELL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_TOP_SELL_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function artistemVacationUpdateAPI(data) {
  return await axios.post(`/api/seller/vacation/update`, data);
}

function* artistemVacationUpdate(action) {
  try {
    const result = yield call(artistemVacationUpdateAPI, action.data);

    yield put({
      type: ARTISTEM_VACATION_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ARTISTEM_VACATION_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function myFilmoAPI(data) {
  return await axios.post(`/api/seller/vacation/update`, data);
}

function* myFilmo(action) {
  try {
    const result = yield call(myFilmoAPI, action.data);

    yield put({
      type: MY_FILMO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_FILMO_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchSellerList() {
  yield takeLatest(SELLER_LIST_REQUEST, sellerList);
}
function* watchSellerCreate() {
  yield takeLatest(SELLER_CREATE_REQUEST, sellerCreate);
}
function* watchSellerAdminPermit() {
  yield takeLatest(SELLER_ADMIN_PERMIT_REQUEST, sellerAdminPermit);
}
function* watchSellerImage() {
  yield takeLatest(SELLER_IMAGE_REQUEST, sellerImage);
}

function* watchArtistemMyData() {
  yield takeLatest(ARTISTEM_MY_DATA_REQUEST, artistemMyData);
}
function* watchArtistemInfoUpdate() {
  yield takeLatest(ARTISTEM_INFO_UPDATE_REQUEST, artistemInfoUpdate);
}
function* watchArtistemFile() {
  yield takeLatest(ARTISTEM_FILE_REQUEST, artistemFile);
}
function* watchFilmoCoverImage() {
  yield takeLatest(FILMO_COVER_IMAGE_REQUEST, filmoCoverImage);
}
function* watchFilmoMusic() {
  yield takeLatest(FILMO_MUSIC_REQUEST, filmoMusic);
}

function* watchArtistemList() {
  yield takeLatest(ARTISTEM_LIST_REQUEST, artistemList);
}
function* watchArtistemDetail() {
  yield takeLatest(ARTISTEM_DETAIL_REQUEST, artistemDetail);
}
function* watchMusictemInfoUpdate() {
  yield takeLatest(MUSICTEM_INFO_UPDATE_REQUEST, musictemInfoUpdate);
}

function* watchArtistemTopSellList() {
  yield takeLatest(ARTISTEM_TOP_SELL_LIST_REQUEST, artistemTopSellList);
}

function* watchArtistemVacationUpdate() {
  yield takeLatest(ARTISTEM_VACATION_UPDATE_REQUEST, artistemVacationUpdate);
}
function* watchMyFilmo() {
  yield takeLatest(MY_FILMO_REQUEST, myFilmo);
}

//////////////////////////////////////////////////////////////
export default function* sellerSaga() {
  yield all([
    fork(watchSellerList),
    fork(watchSellerCreate),
    fork(watchSellerAdminPermit),
    fork(watchSellerImage),
    //
    fork(watchArtistemMyData),
    fork(watchArtistemInfoUpdate),
    fork(watchArtistemFile),
    fork(watchFilmoCoverImage),
    fork(watchFilmoMusic),
    //
    fork(watchArtistemList),
    fork(watchArtistemDetail),
    fork(watchMusictemInfoUpdate),
    //
    fork(watchArtistemTopSellList),
    fork(watchArtistemVacationUpdate),
    fork(watchMyFilmo),

    //
  ]);
}
