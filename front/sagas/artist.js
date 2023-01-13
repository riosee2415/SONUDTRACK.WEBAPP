import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PERMM_WAITING_LIST_REQUEST,
  PERMM_WAITING_LIST_SUCCESS,
  PERMM_WAITING_LIST_FAILURE,
  //
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

//////////////////////////////////////////////////////////////
function* watchFaqTypeList() {
  yield takeLatest(PERMM_WAITING_LIST_REQUEST, permmWaitingList);
}

//////////////////////////////////////////////////////////////
export default function* artistSaga() {
  yield all([
    fork(watchFaqTypeList),
    //
  ]);
}
