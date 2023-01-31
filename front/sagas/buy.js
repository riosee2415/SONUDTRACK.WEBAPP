import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  USER_BUY_LIST_REQUEST,
  USER_BUY_LIST_SUCCESS,
  USER_BUY_LIST_FAILURE,
} from "../reducers/buy";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userBuyListAPI(data) {
  return await axios.post(`/api/status/list`, data);
}

function* userBuyList(action) {
  try {
    const result = yield call(userBuyListAPI, action.data);

    yield put({
      type: USER_BUY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_BUY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchUserBuyList() {
  yield takeLatest(USER_BUY_LIST_REQUEST, userBuyList);
}

//////////////////////////////////////////////////////////////
export default function* buySaga() {
  yield all([
    fork(watchUserBuyList),

    //
  ]);
}
