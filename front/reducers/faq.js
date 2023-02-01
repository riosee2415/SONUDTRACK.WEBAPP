import produce from "../util/produce";

export const initailState = {
  faqList: [], // 화면 리스트
  faqPage: 1,
  adminFaqList: [], // 화면 리스트
  faqHistoryList: [],
  //
  st_faqListLoading: false, // faq 가져오기
  st_faqListDone: false,
  st_faqListError: null,
  //
  st_adminFaqListLoading: false, // faq 관리자 가져오기
  st_adminFaqListDone: false,
  st_adminFaqListError: null,
  //
  st_faqCreateLoading: false, // faq 생성하기
  st_faqCreateDone: false,
  st_faqCreateError: null,
  //
  st_faqUpdateLoading: false, // faq 수정하기
  st_faqUpdateDone: false,
  st_faqUpdateError: null,
  //
  st_faqDeleteLoading: false, // faq 삭제하기
  st_faqDeleteDone: false,
  st_faqDeleteError: null,
  //
  st_faqHistoryListLoading: false, // faq 이력
  st_faqHistoryListDone: false,
  st_faqHistoryListError: null,
};

export const FAQ_LIST_REQUEST = "FAQ_LIST_REQUEST";
export const FAQ_LIST_SUCCESS = "FAQ_LIST_SUCCESS";
export const FAQ_LIST_FAILURE = "FAQ_LIST_FAILURE";

export const ADMIN_FAQ_LIST_REQUEST = "ADMIN_FAQ_LIST_REQUEST";
export const ADMIN_FAQ_LIST_SUCCESS = "ADMIN_FAQ_LIST_SUCCESS";
export const ADMIN_FAQ_LIST_FAILURE = "ADMIN_FAQ_LIST_FAILURE";

export const FAQ_CREATE_REQUEST = "FAQ_CREATE_REQUEST";
export const FAQ_CREATE_SUCCESS = "FAQ_CREATE_SUCCESS";
export const FAQ_CREATE_FAILURE = "FAQ_CREATE_FAILURE";

export const FAQ_UPDATE_REQUEST = "FAQ_UPDATE_REQUEST";
export const FAQ_UPDATE_SUCCESS = "FAQ_UPDATE_SUCCESS";
export const FAQ_UPDATE_FAILURE = "FAQ_UPDATE_FAILURE";

export const FAQ_DELETE_REQUEST = "FAQ_DELETE_REQUEST";
export const FAQ_DELETE_SUCCESS = "FAQ_DELETE_SUCCESS";
export const FAQ_DELETE_FAILURE = "FAQ_DELETE_FAILURE";

export const FAQ_HISTORY_LIST_REQUEST = "FAQ_HISTORY_LIST_REQUEST";
export const FAQ_HISTORY_LIST_SUCCESS = "FAQ_HISTORY_LIST_SUCCESS";
export const FAQ_HISTORY_LIST_FAILURE = "FAQ_HISTORY_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FAQ_LIST_REQUEST: {
        draft.st_faqListLoading = true;
        draft.st_faqListDone = false;
        draft.st_faqListError = null;
        break;
      }
      case FAQ_LIST_SUCCESS: {
        draft.st_faqListLoading = false;
        draft.st_faqListDone = true;
        draft.st_faqListError = null;
        draft.faqList = action.data.faqs;
        draft.faqPage = action.data.lastPage;
        break;
      }
      case FAQ_LIST_FAILURE: {
        draft.st_faqListLoading = false;
        draft.st_faqListDone = false;
        draft.st_faqListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ADMIN_FAQ_LIST_REQUEST: {
        draft.st_adminFaqListLoading = true;
        draft.st_adminFaqListDone = false;
        draft.st_adminFaqListError = null;
        break;
      }
      case ADMIN_FAQ_LIST_SUCCESS: {
        draft.st_adminFaqListLoading = false;
        draft.st_adminFaqListDone = true;
        draft.st_adminFaqListError = null;
        draft.adminFaqList = action.data;
        break;
      }
      case ADMIN_FAQ_LIST_FAILURE: {
        draft.st_adminFaqListLoading = false;
        draft.st_adminFaqListDone = false;
        draft.st_adminFaqListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case FAQ_CREATE_REQUEST: {
        draft.st_faqCreateLoading = true;
        draft.st_faqCreateDone = false;
        draft.st_faqCreateError = null;
        break;
      }
      case FAQ_CREATE_SUCCESS: {
        draft.st_faqCreateLoading = false;
        draft.st_faqCreateDone = true;
        draft.st_faqCreateError = null;
        break;
      }
      case FAQ_CREATE_FAILURE: {
        draft.st_faqCreateLoading = false;
        draft.st_faqCreateDone = false;
        draft.st_faqCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case FAQ_UPDATE_REQUEST: {
        draft.st_faqUpdateLoading = true;
        draft.st_faqUpdateDone = false;
        draft.st_faqUpdateError = null;
        break;
      }
      case FAQ_UPDATE_SUCCESS: {
        draft.st_faqUpdateLoading = false;
        draft.st_faqUpdateDone = true;
        draft.st_faqUpdateError = null;
        break;
      }
      case FAQ_UPDATE_FAILURE: {
        draft.st_faqUpdateLoading = false;
        draft.st_faqUpdateDone = false;
        draft.st_faqUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case FAQ_DELETE_REQUEST: {
        draft.st_faqDeleteLoading = true;
        draft.st_faqDeleteDone = false;
        draft.st_faqDeleteError = null;
        break;
      }
      case FAQ_DELETE_SUCCESS: {
        draft.st_faqDeleteLoading = false;
        draft.st_faqDeleteDone = true;
        draft.st_faqDeleteError = null;
        break;
      }
      case FAQ_DELETE_FAILURE: {
        draft.st_faqDeleteLoading = false;
        draft.st_faqDeleteDone = false;
        draft.st_faqDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case FAQ_HISTORY_LIST_REQUEST: {
        draft.st_faqHistoryListLoading = true;
        draft.st_faqHistoryListDone = false;
        draft.st_faqHistoryListError = null;
        break;
      }
      case FAQ_HISTORY_LIST_SUCCESS: {
        draft.st_faqHistoryListLoading = false;
        draft.st_faqHistoryListDone = true;
        draft.st_faqHistoryListError = null;
        draft.faqHistoryList = action.data;
        break;
      }
      case FAQ_HISTORY_LIST_FAILURE: {
        draft.st_faqHistoryListLoading = false;
        draft.st_faqHistoryListDone = false;
        draft.st_faqHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
