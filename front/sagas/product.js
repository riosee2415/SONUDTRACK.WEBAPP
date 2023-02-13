import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  //
  CATEGORY_NEW_REQUEST,
  CATEGORY_NEW_SUCCESS,
  CATEGORY_NEW_FAILURE,
  //
  CATEGORY_MODIFY_REQUEST,
  CATEGORY_MODIFY_SUCCESS,
  CATEGORY_MODIFY_FAILURE,
  //
  CATEGORY_DEL_REQUEST,
  CATEGORY_DEL_SUCCESS,
  CATEGORY_DEL_FAILURE,
  //
  PRODUCT_MYLIST_REQUEST,
  PRODUCT_MYLIST_SUCCESS,
  PRODUCT_MYLIST_FAILURE,
  //
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  //
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  //
  PRODUCT_ING_REQUEST,
  PRODUCT_ING_SUCCESS,
  PRODUCT_ING_FAILURE,
  //
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAILURE,
  //
  PRODUCT_TAG_REQUEST,
  PRODUCT_TAG_SUCCESS,
  PRODUCT_TAG_FAILURE,
  //
  PRODUCT_GEN_REQUEST,
  PRODUCT_GEN_SUCCESS,
  PRODUCT_GEN_FAILURE,
  //
  PRODUCT_GEN_ALL_REQUEST,
  PRODUCT_GEN_ALL_SUCCESS,
  PRODUCT_GEN_ALL_FAILURE,
  //
  PRODUCT_TRACK_LIST_REQUEST,
  PRODUCT_TRACK_LIST_SUCCESS,
  PRODUCT_TRACK_LIST_FAILURE,
  //
  PRODUCT_TRACK_ALL_LIST_REQUEST,
  PRODUCT_TRACK_ALL_LIST_SUCCESS,
  PRODUCT_TRACK_ALL_LIST_FAILURE,
  //
  COMMON_TAG_NEW_REQUEST,
  COMMON_TAG_NEW_SUCCESS,
  COMMON_TAG_NEW_FAILURE,
  //
  COMMON_TAG_LIST_REQUEST,
  COMMON_TAG_LIST_SUCCESS,
  COMMON_TAG_LIST_FAILURE,
  //
  COMMON_TAG_MODIFY_REQUEST,
  COMMON_TAG_MODIFY_SUCCESS,
  COMMON_TAG_MODIFY_FAILURE,
  //
  COMMON_TAG_DELETE_REQUEST,
  COMMON_TAG_DELETE_SUCCESS,
  COMMON_TAG_DELETE_FAILURE,
  //
  PRODUCT_TRACK_DETAIL_REQUEST,
  PRODUCT_TRACK_DETAIL_SUCCESS,
  PRODUCT_TRACK_DETAIL_FAILURE,
  //
  PRODUCT_TRACK_RECENT_REQUEST,
  PRODUCT_TRACK_RECENT_SUCCESS,
  PRODUCT_TRACK_RECENT_FAILURE,
  //
  PRODUCT_TRACK_CREATE_REQUEST,
  PRODUCT_TRACK_CREATE_SUCCESS,
  PRODUCT_TRACK_CREATE_FAILURE,
  //
  PRODUCT_COVER_UPLOAD_REQUEST,
  PRODUCT_COVER_UPLOAD_SUCCESS,
  PRODUCT_COVER_UPLOAD_FAILURE,
  //
  PRODUCT_AGREEMENT_UPLOAD_REQUEST,
  PRODUCT_AGREEMENT_UPLOAD_SUCCESS,
  PRODUCT_AGREEMENT_UPLOAD_FAILURE,
  //
  PRODUCT_TRACK_THUMBNAIL_UPLOAD_REQUEST,
  PRODUCT_TRACK_THUMBNAIL_UPLOAD_SUCCESS,
  PRODUCT_TRACK_THUMBNAIL_UPLOAD_FAILURE,
  //
  PRODUCT_TRACK_UPLOAD_REQUEST,
  PRODUCT_TRACK_UPLOAD_SUCCESS,
  PRODUCT_TRACK_UPLOAD_FAILURE,
  //
  PRODUCT_TRACK_TYPELIST_REQUEST,
  PRODUCT_TRACK_TYPELIST_SUCCESS,
  PRODUCT_TRACK_TYPELIST_FAILURE,
  //
  PRODUCT_TRACK_ISOK_REQUEST,
  PRODUCT_TRACK_ISOK_SUCCESS,
  PRODUCT_TRACK_ISOK_FAILURE,
  //
  PRODUCT_TRACK_ISREJECT_REQUEST,
  PRODUCT_TRACK_ISREJECT_SUCCESS,
  PRODUCT_TRACK_ISREJECT_FAILURE,
  //
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
} from "../reducers/product";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function categoryListAPI(data) {
  return await axios.post("/api/product/ca/list", data);
}

function* categoryList(action) {
  try {
    const result = yield call(categoryListAPI, action.data);

    yield put({
      type: CATEGORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_LIST_FAILURE,
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
async function categoryNewAPI(data) {
  return await axios.post("/api/product/ca/new", data);
}

function* categoryNew(action) {
  try {
    const result = yield call(categoryNewAPI, action.data);

    yield put({
      type: CATEGORY_NEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_NEW_FAILURE,
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
async function categoryModifyAPI(data) {
  return await axios.post("/api/product/ca/modify", data);
}

function* categoryModify(action) {
  try {
    const result = yield call(categoryModifyAPI, action.data);

    yield put({
      type: CATEGORY_MODIFY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_MODIFY_FAILURE,
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
async function categoryDeleteAPI(data) {
  return await axios.post("/api/product/ca/delete", data);
}

function* categoryDelete(action) {
  try {
    const result = yield call(categoryDeleteAPI, action.data);

    yield put({
      type: CATEGORY_DEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_DEL_FAILURE,
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
async function productMyListAPI(data) {
  return await axios.post("/api/product/pro/myList", data);
}

function* productMyList(action) {
  try {
    const result = yield call(productMyListAPI, action.data);

    yield put({
      type: PRODUCT_MYLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_MYLIST_FAILURE,
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
async function productListAPI(data) {
  return await axios.post("/api/product/pro/list", data);
}

function* productList(action) {
  try {
    const result = yield call(productListAPI, action.data);

    yield put({
      type: PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_LIST_FAILURE,
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
async function productCreateAPI(data) {
  return await axios.post("/api/product/pro/create", data);
}

function* productCreate(action) {
  try {
    const result = yield call(productCreateAPI, action.data);

    yield put({
      type: PRODUCT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_CREATE_FAILURE,
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
async function productIngAPI(data) {
  return await axios.post("/api/product/pro/ing", data);
}

function* productIng(action) {
  try {
    const result = yield call(productIngAPI, action.data);

    yield put({
      type: PRODUCT_ING_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_ING_FAILURE,
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
async function productTopAPI(data) {
  return await axios.post("/api/product/pro/top", data);
}

function* productTop(action) {
  try {
    const result = yield call(productTopAPI, action.data);

    yield put({
      type: PRODUCT_TOP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TOP_FAILURE,
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
async function productTagAPI(data) {
  return await axios.post("/api/product/tag/list", data);
}

function* productTag(action) {
  try {
    const result = yield call(productTagAPI, action.data);

    yield put({
      type: PRODUCT_TAG_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TAG_FAILURE,
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
async function productGenAPI(data) {
  return await axios.post("/api/product/gen/list", data);
}

function* productGen(action) {
  try {
    const result = yield call(productGenAPI, action.data);

    yield put({
      type: PRODUCT_GEN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_GEN_FAILURE,
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
async function productGenAllAPI(data) {
  return await axios.post("/api/product/gen/allList", data);
}

function* productGenAll(action) {
  try {
    const result = yield call(productGenAllAPI, action.data);

    yield put({
      type: PRODUCT_GEN_ALL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_GEN_ALL_FAILURE,
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
async function productTrackListAPI(data) {
  return await axios.post("/api/product/track/list", data);
}

function* productTrackList(action) {
  try {
    const result = yield call(productTrackListAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_LIST_FAILURE,
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
async function productTrackAllListAPI(data) {
  return await axios.post("/api/product/track/allList", data);
}

function* productTrackAllList(action) {
  try {
    const result = yield call(productTrackAllListAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_ALL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_ALL_LIST_FAILURE,
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
async function commonTagNewAPI(data) {
  return await axios.post("/api/product/commontag/new", data);
}

function* commonTagNew(action) {
  try {
    const result = yield call(commonTagNewAPI, action.data);

    yield put({
      type: COMMON_TAG_NEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMMON_TAG_NEW_FAILURE,
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
async function commonTagListAPI(data) {
  return await axios.post("/api/product/commontag/list", data);
}

function* commonTagList(action) {
  try {
    const result = yield call(commonTagListAPI, action.data);

    yield put({
      type: COMMON_TAG_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMMON_TAG_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function commonTagModifyAPI(data) {
  return await axios.post("/api/product/commontag/modify", data);
}

function* commonTagModify(action) {
  try {
    const result = yield call(commonTagModifyAPI, action.data);

    yield put({
      type: COMMON_TAG_MODIFY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMMON_TAG_MODIFY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function commonTagDeleteAPI(data) {
  return await axios.post("/api/product/commontag/delete", data);
}

function* commonTagDelete(action) {
  try {
    const result = yield call(commonTagDeleteAPI, action.data);

    yield put({
      type: COMMON_TAG_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMMON_TAG_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTrackDetailAPI(data) {
  return await axios.post("/api/product/track/detail", data);
}

function* productTrackDetail(action) {
  try {
    const result = yield call(productTrackDetailAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTrackRecentListAPI(data) {
  return await axios.post("/api/product/track/recentList", data);
}

function* productTrackRecentList(action) {
  try {
    const result = yield call(productTrackRecentListAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_RECENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_RECENT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTrackCreateListAPI(data) {
  return await axios.post("/api/product/track/create", data);
}

function* productTrackCreateList(action) {
  try {
    const result = yield call(productTrackCreateListAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productCoverUploadAPI(data) {
  return await axios.post("/api/product/file", data);
}

function* productCoverUpload(action) {
  try {
    const result = yield call(productCoverUploadAPI, action.data);

    yield put({
      type: PRODUCT_COVER_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_COVER_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productAgreementUploadAPI(data) {
  return await axios.post("/api/product/file", data);
}

function* productAgreementUpload(action) {
  try {
    const result = yield call(productAgreementUploadAPI, action.data);

    yield put({
      type: PRODUCT_AGREEMENT_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_AGREEMENT_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTrackThumbnailUploadAPI(data) {
  return await axios.post("/api/product/file", data);
}

function* productTrackThumbnailUpload(action) {
  try {
    const result = yield call(productTrackThumbnailUploadAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_THUMBNAIL_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_THUMBNAIL_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTrackUploadAPI(data) {
  return await axios.post("/api/product/file", data);
}

function* productTrackUpload(action) {
  try {
    const result = yield call(productTrackUploadAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTrackTypeListAPI(data) {
  return await axios.post("/api/product/track/typeList", data);
}

function* productTrackTypeList(action) {
  try {
    const result = yield call(productTrackTypeListAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_TYPELIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_TYPELIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTrackIsOkAPI(data) {
  return await axios.post("/api/product/track/isOk", data);
}

function* productTrackIsOk(action) {
  try {
    const result = yield call(productTrackIsOkAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_ISOK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_ISOK_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTrackIsRejectAPI(data) {
  return await axios.post("/api/product/track/isReject", data);
}

function* productTrackIsReject(action) {
  try {
    const result = yield call(productTrackIsRejectAPI, action.data);

    yield put({
      type: PRODUCT_TRACK_ISREJECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TRACK_ISREJECT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productDetailAPI(data) {
  return await axios.post("/api/product/pro/detail", data);
}

function* productDetail(action) {
  try {
    const result = yield call(productDetailAPI, action.data);

    yield put({
      type: PRODUCT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchCategoryList() {
  yield takeLatest(CATEGORY_LIST_REQUEST, categoryList);
}
function* watchCategoryNew() {
  yield takeLatest(CATEGORY_NEW_REQUEST, categoryNew);
}
function* watchCategoryModify() {
  yield takeLatest(CATEGORY_MODIFY_REQUEST, categoryModify);
}
function* watchCategoryDelete() {
  yield takeLatest(CATEGORY_DEL_REQUEST, categoryDelete);
}
function* watchProductMyList() {
  yield takeLatest(PRODUCT_MYLIST_REQUEST, productMyList);
}
function* watchProductList() {
  yield takeLatest(PRODUCT_LIST_REQUEST, productList);
}
function* watchProductCreate() {
  yield takeLatest(PRODUCT_CREATE_REQUEST, productCreate);
}
function* watchProductIng() {
  yield takeLatest(PRODUCT_ING_REQUEST, productIng);
}
function* watchProductTop() {
  yield takeLatest(PRODUCT_TOP_REQUEST, productTop);
}
function* watchProductTag() {
  yield takeLatest(PRODUCT_TAG_REQUEST, productTag);
}
function* watchProductGen() {
  yield takeLatest(PRODUCT_GEN_REQUEST, productGen);
}
function* watchProductGenAll() {
  yield takeLatest(PRODUCT_GEN_ALL_REQUEST, productGenAll);
}
function* watchProductTrackList() {
  yield takeLatest(PRODUCT_TRACK_LIST_REQUEST, productTrackList);
}
function* watchProductTrackAllList() {
  yield takeLatest(PRODUCT_TRACK_ALL_LIST_REQUEST, productTrackAllList);
}
function* watchCommonTagNew() {
  yield takeLatest(COMMON_TAG_NEW_REQUEST, commonTagNew);
}
function* watchCommonTagList() {
  yield takeLatest(COMMON_TAG_LIST_REQUEST, commonTagList);
}
function* watchCommonTagModify() {
  yield takeLatest(COMMON_TAG_MODIFY_REQUEST, commonTagModify);
}
function* watchCommonTagDelete() {
  yield takeLatest(COMMON_TAG_DELETE_REQUEST, commonTagDelete);
}
function* watchProductTrackDetail() {
  yield takeLatest(PRODUCT_TRACK_DETAIL_REQUEST, productTrackDetail);
}
function* watchProductTrackRecentList() {
  yield takeLatest(PRODUCT_TRACK_RECENT_REQUEST, productTrackRecentList);
}
function* watchProductTrackCreateList() {
  yield takeLatest(PRODUCT_TRACK_CREATE_REQUEST, productTrackCreateList);
}
function* watchProductCoverUpload() {
  yield takeLatest(PRODUCT_COVER_UPLOAD_REQUEST, productCoverUpload);
}
function* watchProductAgreementUpload() {
  yield takeLatest(PRODUCT_AGREEMENT_UPLOAD_REQUEST, productAgreementUpload);
}
function* watchProductTrackThumbnailUpload() {
  yield takeLatest(
    PRODUCT_TRACK_THUMBNAIL_UPLOAD_REQUEST,
    productTrackThumbnailUpload
  );
}
function* watchProductTrackUpload() {
  yield takeLatest(PRODUCT_TRACK_UPLOAD_REQUEST, productTrackUpload);
}
function* watchProductTrackTypeList() {
  yield takeLatest(PRODUCT_TRACK_TYPELIST_REQUEST, productTrackTypeList);
}
function* watchProductTrackIsOk() {
  yield takeLatest(PRODUCT_TRACK_ISOK_REQUEST, productTrackIsOk);
}
function* watchProductTrackIsReject() {
  yield takeLatest(PRODUCT_TRACK_ISREJECT_REQUEST, productTrackIsReject);
}
function* watchProductDetail() {
  yield takeLatest(PRODUCT_DETAIL_REQUEST, productDetail);
}

//////////////////////////////////////////////////////////////
export default function* productSaga() {
  yield all([
    fork(watchCategoryList),
    fork(watchCategoryNew),
    fork(watchCategoryModify),
    fork(watchCategoryDelete),
    fork(watchProductMyList),
    fork(watchProductList),
    fork(watchProductCreate),
    fork(watchProductIng),
    fork(watchProductTop),
    fork(watchProductTag),
    fork(watchProductGen),
    fork(watchProductGenAll),
    fork(watchProductTrackAllList),
    fork(watchProductTrackList),
    fork(watchCommonTagNew),
    fork(watchCommonTagList),
    fork(watchCommonTagModify),
    fork(watchCommonTagDelete),
    fork(watchProductTrackDetail),
    fork(watchProductTrackRecentList),
    fork(watchProductTrackCreateList),
    fork(watchProductCoverUpload),
    fork(watchProductAgreementUpload),
    fork(watchProductTrackThumbnailUpload),
    fork(watchProductTrackUpload),
    fork(watchProductTrackTypeList),
    fork(watchProductTrackIsOk),
    fork(watchProductTrackIsReject),
    fork(watchProductDetail),
    //
  ]);
}
