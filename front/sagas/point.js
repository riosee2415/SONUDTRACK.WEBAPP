import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MY_POINT_LIST_REQUEST,
  MY_POINT_LIST_SUCCESS,
  MY_POINT_LIST_FAILURE,
} from "../reducers/point";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function myPointListAPI(data) {
  return await axios.post(`/api/point/list`, data);
}

function* myPointList(action) {
  try {
    const result = yield call(myPointListAPI, action.data);

    yield put({
      type: MY_POINT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_POINT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchMyPointList() {
  yield takeLatest(MY_POINT_LIST_REQUEST, myPointList);
}

//////////////////////////////////////////////////////////////
export default function* pointSaga() {
  yield all([
    fork(watchMyPointList),

    //
  ]);
}
