import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SEARCH_LIST_REQUEST,
  SEARCH_LIST_SUCCESS,
  SEARCH_LIST_FAILURE,
} from "../reducers/search";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function searchListAPI(data) {
  return await axios.post(`/api/search/list`, data);
}

function* searchList(action) {
  try {
    const result = yield call(searchListAPI, action.data);

    yield put({
      type: SEARCH_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchSearchList() {
  yield takeLatest(SEARCH_LIST_REQUEST, searchList);
}

//////////////////////////////////////////////////////////////
export default function* buySaga() {
  yield all([
    fork(watchSearchList),

    //
  ]);
}
