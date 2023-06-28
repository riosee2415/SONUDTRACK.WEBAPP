import produce from "../util/produce";

export const initailState = {
  myLikeList: [],

  //
  st_myLikeListLoading: false, // 회원별 음원 구매 현황 리스트
  st_myLikeListDone: false,
  st_myLikeListError: null,
};

export const MY_LIKE_LIST_REQUEST = "MY_LIKE_LIST_REQUEST";
export const MY_LIKE_LIST_SUCCESS = "MY_LIKE_LIST_SUCCESS";
export const MY_LIKE_LIST_FAILURE = "MY_LIKE_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_LIKE_LIST_REQUEST: {
        draft.st_myLikeListLoading = true;
        draft.st_myLikeListDone = false;
        draft.st_myLikeListError = null;
        break;
      }
      case MY_LIKE_LIST_SUCCESS: {
        draft.st_myLikeListLoading = false;
        draft.st_myLikeListDone = true;
        draft.st_myLikeListError = null;
        draft.myLikeList = action.data;
        break;
      }
      case MY_LIKE_LIST_FAILURE: {
        draft.st_myLikeListLoading = false;
        draft.st_myLikeListDone = false;
        draft.st_myLikeListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
