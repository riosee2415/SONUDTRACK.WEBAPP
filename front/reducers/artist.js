import produce from "../util/produce";

export const initailState = {
  permmCnt: 0,
  artistList: [],
  permmWaitingList: [],
  artistems: [],

  //
  st_permmWaitingLoading: false,
  st_permmWaitingDone: false,
  st_permmWaitingError: null,
  //
  st_permmWaitingOkLoading: false,
  st_permmWaitingOkDone: false,
  st_permmWaitingOkError: null,
  //
  st_permmWaitingDelLoading: false,
  st_permmWaitingDelDone: false,
  st_permmWaitingDelError: null,
  //
  st_artistemListLoading: false,
  st_artistemListDone: false,
  st_artistemListError: null,
  //
  st_artistemIngUpLoading: false,
  st_artistemIngUpDone: false,
  st_artistemIngUpError: null,
  //
  st_artistemUpUpLoading: false,
  st_artistemUpUpDone: false,
  st_artistemUpUpError: null,
};

export const PERMM_WAITING_LIST_REQUEST = "PERMM_WAITING_LIST_REQUEST";
export const PERMM_WAITING_LIST_SUCCESS = "PERMM_WAITING_LIST_SUCCESS";
export const PERMM_WAITING_LIST_FAILURE = "PERMM_WAITING_LIST_FAILURE";

export const PERMM_WAITING_OK_REQUEST = "PERMM_WAITING_OK_REQUEST";
export const PERMM_WAITING_OK_SUCCESS = "PERMM_WAITING_OK_SUCCESS";
export const PERMM_WAITING_OK_FAILURE = "PERMM_WAITING_OK_FAILURE";

export const PERMM_WAITING_DEL_REQUEST = "PERMM_WAITING_DEL_REQUEST";
export const PERMM_WAITING_DEL_SUCCESS = "PERMM_WAITING_DEL_SUCCESS";
export const PERMM_WAITING_DEL_FAILURE = "PERMM_WAITING_DEL_FAILURE";

export const ARTISTEM_LIST_REQUEST = "ARTISTEM_LIST_REQUEST";
export const ARTISTEM_LIST_SUCCESS = "ARTISTEM_LIST_SUCCESS";
export const ARTISTEM_LIST_FAILURE = "ARTISTEM_LIST_FAILURE";

export const ARTISTEM_ING_UP_REQUEST = "ARTISTEM_ING_UP_REQUEST";
export const ARTISTEM_ING_UP_SUCCESS = "ARTISTEM_ING_UP_SUCCESS";
export const ARTISTEM_ING_UP_FAILURE = "ARTISTEM_ING_UP_FAILURE";

export const ARTISTEM_TOP_UP_REQUEST = "ARTISTEM_TOP_UP_REQUEST";
export const ARTISTEM_TOP_UP_SUCCESS = "ARTISTEM_TOP_UP_SUCCESS";
export const ARTISTEM_TOP_UP_FAILURE = "ARTISTEM_TOP_UP_FAILURE";

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
      case PERMM_WAITING_OK_REQUEST: {
        draft.st_permmWaitingOkLoading = true;
        draft.st_permmWaitingOkDone = false;
        draft.st_permmWaitingOkError = null;
        break;
      }

      case PERMM_WAITING_OK_SUCCESS: {
        draft.st_permmWaitingOkLoading = false;
        draft.st_permmWaitingOkDone = true;
        draft.st_permmWaitingOkError = null;
        break;
      }

      case PERMM_WAITING_OK_FAILURE: {
        draft.st_permmWaitingOkLoading = false;
        draft.st_permmWaitingOkDone = false;
        draft.st_permmWaitingOkError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PERMM_WAITING_DEL_REQUEST: {
        draft.st_permmWaitingDelLoading = true;
        draft.st_permmWaitingDelDone = false;
        draft.st_permmWaitingDelError = null;
        break;
      }

      case PERMM_WAITING_DEL_SUCCESS: {
        draft.st_permmWaitingDelLoading = false;
        draft.st_permmWaitingDelDone = true;
        draft.st_permmWaitingDelError = null;
        break;
      }

      case PERMM_WAITING_DEL_FAILURE: {
        draft.st_permmWaitingDelLoading = false;
        draft.st_permmWaitingDelDone = false;
        draft.st_permmWaitingDelError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case ARTISTEM_LIST_REQUEST: {
        draft.st_artistemListLoading = true;
        draft.st_artistemListDone = false;
        draft.st_artistemListError = null;
        break;
      }

      case ARTISTEM_LIST_SUCCESS: {
        draft.st_artistemListLoading = false;
        draft.st_artistemListDone = true;
        draft.st_artistemListError = null;
        draft.artistems = action.data.artistemList;
        break;
      }

      case ARTISTEM_LIST_FAILURE: {
        draft.st_artistemListLoading = false;
        draft.st_artistemListDone = false;
        draft.st_artistemListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case ARTISTEM_ING_UP_REQUEST: {
        draft.st_artistemIngUpLoading = true;
        draft.st_artistemIngUpDone = false;
        draft.st_artistemIngUpError = null;
        break;
      }

      case ARTISTEM_ING_UP_SUCCESS: {
        draft.st_artistemIngUpLoading = false;
        draft.st_artistemIngUpDone = true;
        draft.st_artistemIngUpError = null;
        break;
      }

      case ARTISTEM_ING_UP_FAILURE: {
        draft.st_artistemIngUpLoading = false;
        draft.st_artistemIngUpDone = false;
        draft.st_artistemIngUpError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case ARTISTEM_TOP_UP_REQUEST: {
        draft.st_artistemUpUpLoading = true;
        draft.st_artistemUpUpDone = false;
        draft.st_artistemUpUpError = null;
        break;
      }

      case ARTISTEM_TOP_UP_SUCCESS: {
        draft.st_artistemUpUpLoading = false;
        draft.st_artistemUpUpDone = true;
        draft.st_artistemUpUpError = null;
        break;
      }

      case ARTISTEM_TOP_UP_FAILURE: {
        draft.st_artistemUpUpLoading = false;
        draft.st_artistemUpUpDone = false;
        draft.st_artistemUpUpError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
