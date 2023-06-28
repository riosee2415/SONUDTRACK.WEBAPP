import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  REVENUE_LIST_REQUEST,
  REVENUE_LIST_SUCCESS,
  REVENUE_LIST_FAILURE,
  //
  REVENUE_ADMIN_LIST_REQUEST,
  REVENUE_ADMIN_LIST_SUCCESS,
  REVENUE_ADMIN_LIST_FAILURE,
} from "../reducers/revenue";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function revenueListAPI(data) {
  return await axios.post(`/api/revenue/list`, data);
}

function* revenueList(action) {
  try {
    const result = yield call(revenueListAPI, action.data);

    yield put({
      type: REVENUE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVENUE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function revenueAdminListAPI(data) {
  return await axios.post(`/api/revenue/admin/list`, data);
}

function* revenueAdminList(action) {
  try {
    const result = yield call(revenueAdminListAPI, action.data);

    yield put({
      type: REVENUE_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVENUE_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchRevenueList() {
  yield takeLatest(REVENUE_LIST_REQUEST, revenueList);
}
function* watchRevenueAdminList() {
  yield takeLatest(REVENUE_ADMIN_LIST_REQUEST, revenueAdminList);
}

//////////////////////////////////////////////////////////////
export default function* revenueSaga() {
  yield all([
    fork(watchRevenueList),
    fork(watchRevenueAdminList),

    //
  ]);
}
