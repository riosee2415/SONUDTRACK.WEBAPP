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

export const BUYREQUEST_ISOK_REQUEST = "BUYREQUEST_ISOK_REQUEST";
export const BUYREQUEST_ISOK_SUCCESS = "BUYREQUEST_ISOK_SUCCESS";
export const BUYREQUEST_ISOK_FAILURE = "BUYREQUEST_ISOK_FAILURE";

export const BUYREQUEST_ISREJECT_REQUEST = "BUYREQUEST_ISREJECT_REQUEST";
export const BUYREQUEST_ISREJECT_SUCCESS = "BUYREQUEST_ISREJECT_SUCCESS";
export const BUYREQUEST_ISREJECT_FAILURE = "BUYREQUEST_ISREJECT_FAILURE";
