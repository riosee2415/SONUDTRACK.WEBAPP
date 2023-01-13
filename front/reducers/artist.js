import produce from "../util/produce";

export const initailState = {
  permmCnt: 0,
  artistList: [],
  permmWaitingList: [],

  //
  st_permmWaitingLoading: false,
  st_permmWaitingDone: false,
  st_permmWaitingError: null,
};

export const PERMM_WAITING_LIST_REQUEST = "PERMM_WAITING_LIST_REQUEST";
export const PERMM_WAITING_LIST_SUCCESS = "PERMM_WAITING_LIST_SUCCESS";
export const PERMM_WAITING_LIST_FAILURE = "PERMM_WAITING_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PERMM_WAITING_LIST_REQUEST: {
        draft.st_permmWaitingLoading = true;
        draft.st_permmWaitingDone = false;
        draft.st_permmWaitingError = null;
        break;
      }

      case PERMM_WAITING_LIST_SUCCESS: {
        draft.st_permmWaitingLoading = false;
        draft.st_permmWaitingDone = true;
        draft.st_permmWaitingError = null;
        draft.permmCnt = action.data.count[0].cnt;
        draft.artistList = action.data.list;
        draft.permmWaitingList = action.data.waitingList;
        break;
      }

      case PERMM_WAITING_LIST_FAILURE: {
        draft.st_permmWaitingLoading = false;
        draft.st_permmWaitingDone = false;
        draft.st_permmWaitingError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
