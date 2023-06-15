import produce from "../util/produce";

export const initailState = {
  artistContactFile: null, // 파일 첨부

  artistContactAdminList: [], // 제작요청 조회(관리자용)

  artistContactMyList: [], // 내가 작성한 컨택 내역 불러오기
  artistContactMyPage: 1,

  artistContactList: [], // 나에게 작성된 컨택 내역 불러오기
  artistContactPage: 1,

  // 파일 첨부
  st_artistContactFileLoading: false,
  st_artistContactFileDone: false,
  st_artistContactFileError: null,

  // 제작요청 조회(관리자용)
  st_artistContactAdminListLoading: false,
  st_artistContactAdminListDone: false,
  st_artistContactAdminListError: null,

  // 내가 작성한 컨택 내역 불러오기
  st_artistContactMyListLoading: false,
  st_artistContactMyListDone: false,
  st_artistContactMyListError: null,

  // 나에게 작성된 컨택 내역 불러오기
  st_artistContactListLoading: false,
  st_artistContactListDone: false,
  st_artistContactListError: null,

  // 제작요청 생성
  st_artistContactCreateLoading: false,
  st_artistContactCreateDone: false,
  st_artistContactCreateError: null,

  // 제작요청 승인
  st_artistContactPermitLoading: false,
  st_artistContactPermitDone: false,
  st_artistContactPermitError: null,

  // 제작요청 거절
  st_artistContactRejectLoading: false,
  st_artistContactRejectDone: false,
  st_artistContactRejectError: null,

  // 구매
  st_artistContactPaymentLoading: false,
  st_artistContactPaymentDone: false,
  st_artistContactPaymentError: null,

  // 제작물 전송
  st_artistContactSendLoading: false,
  st_artistContactSendDone: false,
  st_artistContactSendError: null,

  // 문의내역 삭제
  st_artistContactDeleteLoading: false,
  st_artistContactDeleteDone: false,
  st_artistContactDeleteError: null,
};

export const ARTIST_CONTACT_FILE_REQUEST = "ARTIST_CONTACT_FILE_REQUEST";
export const ARTIST_CONTACT_FILE_SUCCESS = "ARTIST_CONTACT_FILE_SUCCESS";
export const ARTIST_CONTACT_FILE_FAILURE = "ARTIST_CONTACT_FILE_FAILURE";

export const ARTIST_CONTACT_ADMIN_LIST_REQUEST =
  "ARTIST_CONTACT_ADMIN_LIST_REQUEST";
export const ARTIST_CONTACT_ADMIN_LIST_SUCCESS =
  "ARTIST_CONTACT_ADMIN_LIST_SUCCESS";
export const ARTIST_CONTACT_ADMIN_LIST_FAILURE =
  "ARTIST_CONTACT_ADMIN_LIST_FAILURE";

export const ARTIST_CONTACT_MY_LIST_REQUEST = "ARTIST_CONTACT_MY_LIST_REQUEST";
export const ARTIST_CONTACT_MY_LIST_SUCCESS = "ARTIST_CONTACT_MY_LIST_SUCCESS";
export const ARTIST_CONTACT_MY_LIST_FAILURE = "ARTIST_CONTACT_MY_LIST_FAILURE";

export const ARTIST_CONTACT_LIST_REQUEST = "ARTIST_CONTACT_LIST_REQUEST";
export const ARTIST_CONTACT_LIST_SUCCESS = "ARTIST_CONTACT_LIST_SUCCESS";
export const ARTIST_CONTACT_LIST_FAILURE = "ARTIST_CONTACT_LIST_FAILURE";

export const ARTIST_CONTACT_CREATE_REQUEST = "ARTIST_CONTACT_CREATE_REQUEST";
export const ARTIST_CONTACT_CREATE_SUCCESS = "ARTIST_CONTACT_CREATE_SUCCESS";
export const ARTIST_CONTACT_CREATE_FAILURE = "ARTIST_CONTACT_CREATE_FAILURE";

export const ARTIST_CONTACT_PERMIT_REQUEST = "ARTIST_CONTACT_PERMIT_REQUEST";
export const ARTIST_CONTACT_PERMIT_SUCCESS = "ARTIST_CONTACT_PERMIT_SUCCESS";
export const ARTIST_CONTACT_PERMIT_FAILURE = "ARTIST_CONTACT_PERMIT_FAILURE";

export const ARTIST_CONTACT_REJECT_REQUEST = "ARTIST_CONTACT_REJECT_REQUEST";
export const ARTIST_CONTACT_REJECT_SUCCESS = "ARTIST_CONTACT_REJECT_SUCCESS";
export const ARTIST_CONTACT_REJECT_FAILURE = "ARTIST_CONTACT_REJECT_FAILURE";

export const ARTIST_CONTACT_PAYMENT_REQUEST = "ARTIST_CONTACT_PAYMENT_REQUEST";
export const ARTIST_CONTACT_PAYMENT_SUCCESS = "ARTIST_CONTACT_PAYMENT_SUCCESS";
export const ARTIST_CONTACT_PAYMENT_FAILURE = "ARTIST_CONTACT_PAYMENT_FAILURE";

export const ARTIST_CONTACT_SEND_REQUEST = "ARTIST_CONTACT_SEND_REQUEST";
export const ARTIST_CONTACT_SEND_SUCCESS = "ARTIST_CONTACT_SEND_SUCCESS";
export const ARTIST_CONTACT_SEND_FAILURE = "ARTIST_CONTACT_SEND_FAILURE";

export const ARTIST_CONTACT_DELETE_REQUEST = "ARTIST_CONTACT_DELETE_REQUEST";
export const ARTIST_CONTACT_DELETE_SUCCESS = "ARTIST_CONTACT_DELETE_SUCCESS";
export const ARTIST_CONTACT_DELETE_FAILURE = "ARTIST_CONTACT_DELETE_FAILURE";

export const ARTIST_CONTACT_RESET = "ARTIST_CONTACT_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_FILE_REQUEST: {
        draft.st_artistContactFileLoading = true;
        draft.st_artistContactFileDone = false;
        draft.st_artistContactFileError = null;
        break;
      }
      case ARTIST_CONTACT_FILE_SUCCESS: {
        draft.st_artistContactFileLoading = false;
        draft.st_artistContactFileDone = true;
        draft.st_artistContactFileError = null;
        draft.artistContactFile = action.data.path;
        break;
      }
      case ARTIST_CONTACT_FILE_FAILURE: {
        draft.st_artistContactFileLoading = false;
        draft.st_artistContactFileDone = false;
        draft.st_artistContactFileError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_ADMIN_LIST_REQUEST: {
        draft.st_artistContactAdminListLoading = true;
        draft.st_artistContactAdminListDone = false;
        draft.st_artistContactAdminListError = null;
        break;
      }
      case ARTIST_CONTACT_ADMIN_LIST_SUCCESS: {
        draft.st_artistContactAdminListLoading = false;
        draft.st_artistContactAdminListDone = true;
        draft.st_artistContactAdminListError = null;
        draft.artistContactAdminList = action.data;
        break;
      }
      case ARTIST_CONTACT_ADMIN_LIST_FAILURE: {
        draft.st_artistContactAdminListLoading = false;
        draft.st_artistContactAdminListDone = false;
        draft.st_artistContactAdminListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_MY_LIST_REQUEST: {
        draft.st_artistContactMyListLoading = true;
        draft.st_artistContactMyListDone = false;
        draft.st_artistContactMyListError = null;
        break;
      }
      case ARTIST_CONTACT_MY_LIST_SUCCESS: {
        draft.st_artistContactMyListLoading = false;
        draft.st_artistContactMyListDone = true;
        draft.st_artistContactMyListError = null;
        draft.artistContactMyList = action.data.contacts;
        draft.artistContactMyPage = action.data.lastPage;
        break;
      }
      case ARTIST_CONTACT_MY_LIST_FAILURE: {
        draft.st_artistContactMyListLoading = false;
        draft.st_artistContactMyListDone = false;
        draft.st_artistContactMyListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_LIST_REQUEST: {
        draft.st_artistContactListLoading = true;
        draft.st_artistContactListDone = false;
        draft.st_artistContactListError = null;
        break;
      }
      case ARTIST_CONTACT_LIST_SUCCESS: {
        draft.st_artistContactListLoading = false;
        draft.st_artistContactListDone = true;
        draft.st_artistContactListError = null;
        draft.artistContactList = action.data.contacts;
        draft.artistContactPage = action.data.lastPage;
        break;
      }
      case ARTIST_CONTACT_LIST_FAILURE: {
        draft.st_artistContactListLoading = false;
        draft.st_artistContactListDone = false;
        draft.st_artistContactListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_CREATE_REQUEST: {
        draft.st_artistContactCreateLoading = true;
        draft.st_artistContactCreateDone = false;
        draft.st_artistContactCreateError = null;
        break;
      }
      case ARTIST_CONTACT_CREATE_SUCCESS: {
        draft.st_artistContactCreateLoading = false;
        draft.st_artistContactCreateDone = true;
        draft.st_artistContactCreateError = null;
        break;
      }
      case ARTIST_CONTACT_CREATE_FAILURE: {
        draft.st_artistContactCreateLoading = false;
        draft.st_artistContactCreateDone = false;
        draft.st_artistContactCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_PERMIT_REQUEST: {
        draft.st_artistContactPermitLoading = true;
        draft.st_artistContactPermitDone = false;
        draft.st_artistContactPermitError = null;
        break;
      }
      case ARTIST_CONTACT_PERMIT_SUCCESS: {
        draft.st_artistContactPermitLoading = false;
        draft.st_artistContactPermitDone = true;
        draft.st_artistContactPermitError = null;
        break;
      }
      case ARTIST_CONTACT_PERMIT_FAILURE: {
        draft.st_artistContactPermitLoading = false;
        draft.st_artistContactPermitDone = false;
        draft.st_artistContactPermitError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_REJECT_REQUEST: {
        draft.st_artistContactRejectLoading = true;
        draft.st_artistContactRejectDone = false;
        draft.st_artistContactRejectError = null;
        break;
      }
      case ARTIST_CONTACT_REJECT_SUCCESS: {
        draft.st_artistContactRejectLoading = false;
        draft.st_artistContactRejectDone = true;
        draft.st_artistContactRejectError = null;
        break;
      }
      case ARTIST_CONTACT_REJECT_FAILURE: {
        draft.st_artistContactRejectLoading = false;
        draft.st_artistContactRejectDone = false;
        draft.st_artistContactRejectError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_PAYMENT_REQUEST: {
        draft.st_artistContactPaymentLoading = true;
        draft.st_artistContactPaymentDone = false;
        draft.st_artistContactPaymentError = null;
        break;
      }
      case ARTIST_CONTACT_PAYMENT_SUCCESS: {
        draft.st_artistContactPaymentLoading = false;
        draft.st_artistContactPaymentDone = true;
        draft.st_artistContactPaymentError = null;
        break;
      }
      case ARTIST_CONTACT_PAYMENT_FAILURE: {
        draft.st_artistContactPaymentLoading = false;
        draft.st_artistContactPaymentDone = false;
        draft.st_artistContactPaymentError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_SEND_REQUEST: {
        draft.st_artistContactSendLoading = true;
        draft.st_artistContactSendDone = false;
        draft.st_artistContactSendError = null;
        break;
      }
      case ARTIST_CONTACT_SEND_SUCCESS: {
        draft.st_artistContactSendLoading = false;
        draft.st_artistContactSendDone = true;
        draft.st_artistContactSendError = null;
        break;
      }
      case ARTIST_CONTACT_SEND_FAILURE: {
        draft.st_artistContactSendLoading = false;
        draft.st_artistContactSendDone = false;
        draft.st_artistContactSendError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_CONTACT_DELETE_REQUEST: {
        draft.st_artistContactDeleteLoading = true;
        draft.st_artistContactDeleteDone = false;
        draft.st_artistContactDeleteError = null;
        break;
      }
      case ARTIST_CONTACT_DELETE_SUCCESS: {
        draft.st_artistContactDeleteLoading = false;
        draft.st_artistContactDeleteDone = true;
        draft.st_artistContactDeleteError = null;
        break;
      }
      case ARTIST_CONTACT_DELETE_FAILURE: {
        draft.st_artistContactDeleteLoading = false;
        draft.st_artistContactDeleteDone = false;
        draft.st_artistContactDeleteError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////
      case ARTIST_CONTACT_RESET: {
        draft.artistContactFile = null;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
