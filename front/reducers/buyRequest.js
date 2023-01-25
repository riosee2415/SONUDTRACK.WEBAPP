import produce from "../util/produce";

export const initailState = {
  buyRequests: [],

  //
  st_buyRequestListLoading: false, // 구매요청 생성
  st_buyRequestListDone: false,
  st_buyRequestListError: null,
  //
  st_buyRequestIsOkLoading: false, // 구매요청 승인
  st_buyRequestIsOkDone: false,
  st_buyRequestIsOkError: null,
  //
  st_buyRequestIsRejectLoading: false, // 구매요청 거절
  st_buyRequestIsRejectDone: false,
  st_buyRequestIsRejectError: null,
};

export const BUYREQUEST_LIST_REQUEST = "BUYREQUEST_LIST_REQUEST";
export const BUYREQUEST_LIST_SUCCESS = "BUYREQUEST_LIST_SUCCESS";
export const BUYREQUEST_LIST_FAILURE = "BUYREQUEST_LIST_FAILURE";
