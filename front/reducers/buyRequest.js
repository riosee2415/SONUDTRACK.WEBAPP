import produce from "../util/produce";

export const initailState = {
  buyRequests: [],
  buyRequestFile: null,
  myBuyRequests: [],
  //
  st_buyRequestListLoading: false, // 구매요청 리스트
  st_buyRequestListDone: false,
  st_buyRequestListError: null,
  //
  st_buyRequestMyListLoading: false, // 내 구매요청 리스트
  st_buyRequestMyListDone: false,
  st_buyRequestMyListError: null,
  //
  st_buyRequestCreateLoading: false, // 구매요청 생성
  st_buyRequestCreateDone: false,
  st_buyRequestCreateError: null,
  //
  st_buyRequestIsOkLoading: false, // 구매요청 승인
  st_buyRequestIsOkDone: false,
  st_buyRequestIsOkError: null,
  //
  st_buyRequestIsRejectLoading: false, // 구매요청 거절
  st_buyRequestIsRejectDone: false,
  st_buyRequestIsRejectError: null,
  //
  st_buyRequestFileLoading: false, // 파일 올리기
  st_buyRequestFileDone: false,
  st_buyRequestFileError: null,
};

export const BUYREQUEST_LIST_REQUEST = "BUYREQUEST_LIST_REQUEST";
export const BUYREQUEST_LIST_SUCCESS = "BUYREQUEST_LIST_SUCCESS";
export const BUYREQUEST_LIST_FAILURE = "BUYREQUEST_LIST_FAILURE";

export const BUYREQUEST_MY_LIST_REQUEST = "BUYREQUEST_MY_LIST_REQUEST";
export const BUYREQUEST_MY_LIST_SUCCESS = "BUYREQUEST_MY_LIST_SUCCESS";
export const BUYREQUEST_MY_LIST_FAILURE = "BUYREQUEST_MY_LIST_FAILURE";

export const BUYREQUEST_CREATE_REQUEST = "BUYREQUEST_CREATE_REQUEST";
export const BUYREQUEST_CREATE_SUCCESS = "BUYREQUEST_CREATE_SUCCESS";
export const BUYREQUEST_CREATE_FAILURE = "BUYREQUEST_CREATE_FAILURE";

export const BUYREQUEST_ISOK_REQUEST = "BUYREQUEST_ISOK_REQUEST";
export const BUYREQUEST_ISOK_SUCCESS = "BUYREQUEST_ISOK_SUCCESS";
export const BUYREQUEST_ISOK_FAILURE = "BUYREQUEST_ISOK_FAILURE";

export const BUYREQUEST_ISREJECT_REQUEST = "BUYREQUEST_ISREJECT_REQUEST";
export const BUYREQUEST_ISREJECT_SUCCESS = "BUYREQUEST_ISREJECT_SUCCESS";
export const BUYREQUEST_ISREJECT_FAILURE = "BUYREQUEST_ISREJECT_FAILURE";

export const BUYREQUEST_FILE_REQUEST = "BUYREQUEST_FILE_REQUEST";
export const BUYREQUEST_FILE_SUCCESS = "BUYREQUEST_FILE_SUCCESS";
export const BUYREQUEST_FILE_FAILURE = "BUYREQUEST_FILE_FAILURE";

export const BUYREQUEST_RESET = "BUYREQUEST_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////

      case BUYREQUEST_LIST_REQUEST: {
        draft.st_buyRequestListLoading = true;
        draft.st_buyRequestListDone = false;
        draft.st_buyRequestListError = null;
        break;
      }
      case BUYREQUEST_LIST_SUCCESS: {
        draft.st_buyRequestListLoading = false;
        draft.st_buyRequestListDone = true;
        draft.st_buyRequestListError = null;
        draft.buyRequests = action.data;
        break;
      }
      case BUYREQUEST_LIST_FAILURE: {
        draft.st_buyRequestListLoading = false;
        draft.st_buyRequestListDone = false;
        draft.st_buyRequestListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case BUYREQUEST_MY_LIST_REQUEST: {
        draft.st_buyRequestMyListLoading = true;
        draft.st_buyRequestMyListDone = false;
        draft.st_buyRequestMyListError = null;
        break;
      }
      case BUYREQUEST_MY_LIST_SUCCESS: {
        draft.st_buyRequestMyListLoading = false;
        draft.st_buyRequestMyListDone = true;
        draft.st_buyRequestMyListError = null;
        draft.myBuyRequests = action.data;
        break;
      }
      case BUYREQUEST_MY_LIST_FAILURE: {
        draft.st_buyRequestMyListLoading = false;
        draft.st_buyRequestMyListDone = false;
        draft.st_buyRequestMyListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case BUYREQUEST_CREATE_REQUEST: {
        draft.st_buyRequestCreateLoading = true;
        draft.st_buyRequestCreateDone = false;
        draft.st_buyRequestCreateError = null;
        break;
      }
      case BUYREQUEST_CREATE_SUCCESS: {
        draft.st_buyRequestCreateLoading = false;
        draft.st_buyRequestCreateDone = true;
        draft.st_buyRequestCreateError = null;

        break;
      }
      case BUYREQUEST_CREATE_FAILURE: {
        draft.st_buyRequestCreateLoading = false;
        draft.st_buyRequestCreateDone = false;
        draft.st_buyRequestCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case BUYREQUEST_ISOK_REQUEST: {
        draft.st_buyRequestIsOkLoading = true;
        draft.st_buyRequestIsOkDone = false;
        draft.st_buyRequestIsOkError = null;
        break;
      }
      case BUYREQUEST_ISOK_SUCCESS: {
        draft.st_buyRequestIsOkLoading = false;
        draft.st_buyRequestIsOkDone = true;
        draft.st_buyRequestIsOkError = null;

        break;
      }
      case BUYREQUEST_ISOK_FAILURE: {
        draft.st_buyRequestIsOkLoading = false;
        draft.st_buyRequestIsOkDone = false;
        draft.st_buyRequestIsOkError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case BUYREQUEST_ISREJECT_REQUEST: {
        draft.st_buyRequestIsRejectLoading = true;
        draft.st_buyRequestIsRejectDone = false;
        draft.st_buyRequestIsRejectError = null;
        break;
      }
      case BUYREQUEST_ISREJECT_SUCCESS: {
        draft.st_buyRequestIsRejectLoading = false;
        draft.st_buyRequestIsRejectDone = true;
        draft.st_buyRequestIsRejectError = null;

        break;
      }
      case BUYREQUEST_ISREJECT_FAILURE: {
        draft.st_buyRequestIsRejectLoading = false;
        draft.st_buyRequestIsRejectDone = false;
        draft.st_buyRequestIsRejectError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case BUYREQUEST_FILE_REQUEST: {
        draft.st_buyRequestIsFileLoading = true;
        draft.st_buyRequestIsFileDone = false;
        draft.st_buyRequestIsFileError = null;
        break;
      }
      case BUYREQUEST_FILE_SUCCESS: {
        draft.st_buyRequestIsFileLoading = false;
        draft.st_buyRequestIsFileDone = true;
        draft.st_buyRequestIsFileError = null;
        draft.buyRequestFile = action.data.path;

        break;
      }
      case BUYREQUEST_FILE_FAILURE: {
        draft.st_buyRequestIsFileLoading = false;
        draft.st_buyRequestIsFileDone = false;
        draft.st_buyRequestIsFileError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case BUYREQUEST_RESET: {
        draft.buyRequestFile = null;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
