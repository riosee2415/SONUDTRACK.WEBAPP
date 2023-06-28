import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MY_LIKE_LIST_REQUEST,
  MY_LIKE_LIST_SUCCESS,
  MY_LIKE_LIST_FAILURE,
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

//////////////////////////////////////////////////////////////
function* watchMyLikeList() {
  yield takeLatest(MY_LIKE_LIST_REQUEST, myLikeList);
}

//////////////////////////////////////////////////////////////
export default function* likeSaga() {
  yield all([
    fork(watchMyLikeList),

    //
  ]);
}
