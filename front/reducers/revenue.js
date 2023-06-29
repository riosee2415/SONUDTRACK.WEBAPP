import produce from "../util/produce";

export const initailState = {
  revenueList: [], // 사용자 수익관리 리스트
  lastPage: 1,
  revenueAdminList: [], // 관리자 수익관리 리스트

  //
  st_revenueListLoading: false, // revenue 가져오기
  st_revenueListDone: false,
  st_revenueListError: null,
  //
  st_revenueAdminListLoading: false, // revenue Admin list
  st_revenueAdminListDone: false,
  st_revenueAdminListError: null,
  //
};

export const REVENUE_LIST_REQUEST = "REVENUE_LIST_REQUEST";
export const REVENUE_LIST_SUCCESS = "REVENUE_LIST_SUCCESS";
export const REVENUE_LIST_FAILURE = "REVENUE_LIST_FAILURE";
//
export const REVENUE_ADMIN_LIST_REQUEST = "REVENUE_ADMIN_LIST_REQUEST";
export const REVENUE_ADMIN_LIST_SUCCESS = "REVENUE_ADMIN_LIST_SUCCESS";
export const REVENUE_ADMIN_LIST_FAILURE = "REVENUE_ADMIN_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REVENUE_LIST_REQUEST: {
        draft.st_revenueListLoading = true;
        draft.st_revenueListDone = false;
        draft.st_revenueListError = null;
        break;
      }
      case REVENUE_LIST_SUCCESS: {
        draft.st_revenueListLoading = false;
        draft.st_revenueListDone = true;
        draft.st_revenueListError = null;
        draft.revenueList = action.data.contacts;
        draft.lastPage = action.data.lastPage;
        break;
      }
      case REVENUE_LIST_FAILURE: {
        draft.st_revenueListLoading = false;
        draft.st_revenueListDone = false;
        draft.st_revenueListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case REVENUE_ADMIN_LIST_REQUEST: {
        draft.st_revenueAdminListLoading = true;
        draft.st_revenueAdminListDone = false;
        draft.st_revenueAdminListError = null;
        break;
      }
      case REVENUE_ADMIN_LIST_SUCCESS: {
        draft.st_revenueAdminListLoading = false;
        draft.st_revenueAdminListDone = true;
        draft.st_revenueAdminListError = null;
        draft.revenueAdminList = action.data;
        break;
      }
      case REVENUE_ADMIN_LIST_FAILURE: {
        draft.st_revenueAdminListLoading = false;
        draft.st_revenueAdminListDone = false;
        draft.st_revenueAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
