import produce from "../util/produce";

export const initailState = {
  userBuyList: [],

  //
  st_userBuyListLoading: false, // 회원별 음원 구매 현황 리스트
  st_userBuyListDone: false,
  st_userBuyListError: null,
};

export const USER_BUY_LIST_REQUEST = "USER_BUY_LIST_REQUEST";
export const USER_BUY_LIST_SUCCESS = "USER_BUY_LIST_SUCCESS";
export const USER_BUY_LIST_FAILURE = "USER_BUY_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case USER_BUY_LIST_REQUEST: {
        draft.st_userBuyListLoading = true;
        draft.st_userBuyListDone = false;
        draft.st_userBuyListError = null;
        break;
      }
      case USER_BUY_LIST_SUCCESS: {
        draft.st_userBuyListLoading = false;
        draft.st_userBuyListDone = true;
        draft.st_userBuyListError = null;
        draft.userBuyList = action.data;
        break;
      }
      case USER_BUY_LIST_FAILURE: {
        draft.st_userBuyListLoading = false;
        draft.st_userBuyListDone = false;
        draft.st_userBuyListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
