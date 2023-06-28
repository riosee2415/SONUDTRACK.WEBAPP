import produce from "../util/produce";

export const initailState = {
  myPointList: [], // myPoint 가져오기
  myPointPage: 1, // myPoint 페이지

  st_myPointListLoading: false, // myPoint 가져오기
  st_myPointListDone: false,
  st_myPointListError: null,
};

export const MY_POINT_LIST_REQUEST = "MY_POINT_LIST_REQUEST";
export const MY_POINT_LIST_SUCCESS = "MY_POINT_LIST_SUCCESS";
export const MY_POINT_LIST_FAILURE = "MY_POINT_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_POINT_LIST_REQUEST: {
        draft.st_myPointListLoading = true;
        draft.st_myPointListDone = false;
        draft.st_myPointListError = null;
        break;
      }
      case MY_POINT_LIST_SUCCESS: {
        draft.st_myPointListLoading = false;
        draft.st_myPointListDone = true;
        draft.st_myPointListError = null;
        draft.myPointList = action.data.points;
        draft.myPointPage = action.data.lastPage;
        break;
      }
      case MY_POINT_LIST_FAILURE: {
        draft.st_myPointListLoading = false;
        draft.st_myPointListDone = false;
        draft.st_myPointListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
