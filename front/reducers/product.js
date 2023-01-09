import produce from "../util/produce";

export const initailState = {
  categorys: [],

  st_categoryLoading: false,
  st_categoryDone: false,
  st_categoryError: null,
  //
  st_categoryNewLoading: false,
  st_categoryNewDone: false,
  st_categoryNewError: null,
  //
  st_categoryModifyLoading: false,
  st_categoryModifyDone: false,
  st_categoryModifyError: null,
  //
  st_categoryDeleteLoading: false,
  st_categoryDeleteDone: false,
  st_categoryDeleteError: null,
  //
};

export const CATEGORY_LIST_REQUEST = "CATEGORY_LIST_REQUEST";
export const CATEGORY_LIST_SUCCESS = "CATEGORY_LIST_SUCCESS";
export const CATEGORY_LIST_FAILURE = "CATEGORY_LIST_FAILURE";

export const CATEGORY_NEW_REQUEST = "CATEGORY_NEW_REQUEST";
export const CATEGORY_NEW_SUCCESS = "CATEGORY_NEW_SUCCESS";
export const CATEGORY_NEW_FAILURE = "CATEGORY_NEW_FAILURE";

export const CATEGORY_MODIFY_REQUEST = "CATEGORY_MODIFY_REQUEST";
export const CATEGORY_MODIFY_SUCCESS = "CATEGORY_MODIFY_SUCCESS";
export const CATEGORY_MODIFY_FAILURE = "CATEGORY_MODIFY_FAILURE";

export const CATEGORY_DEL_REQUEST = "CATEGORY_DEL_REQUEST";
export const CATEGORY_DEL_SUCCESS = "CATEGORY_DEL_SUCCESS";
export const CATEGORY_DEL_FAILURE = "CATEGORY_DEL_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST: {
        draft.st_categQoryLoading = true;
        draft.st_categoryDone = false;
        draft.st_categoryError = null;
        break;
      }
      case CATEGORY_LIST_SUCCESS: {
        draft.st_categQoryLoading = false;
        draft.st_categoryDone = true;
        draft.st_categoryError = null;
        draft.categorys = action.data;
        break;
      }
      case CATEGORY_LIST_FAILURE: {
        draft.st_categQoryLoading = false;
        draft.st_categoryDone = false;
        draft.st_categoryError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case CATEGORY_NEW_REQUEST: {
        draft.st_categoryNewLoading = true;
        draft.st_categoryNewDone = false;
        draft.st_categoryNewError = null;
        break;
      }
      case CATEGORY_NEW_SUCCESS: {
        draft.st_categoryNewLoading = false;
        draft.st_categoryNewDone = true;
        draft.st_categoryNewError = null;
        break;
      }
      case CATEGORY_NEW_FAILURE: {
        draft.st_categoryNewLoading = false;
        draft.st_categoryNewDone = false;
        draft.st_categoryNewError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case CATEGORY_MODIFY_REQUEST: {
        draft.st_categoryModifyLoading = true;
        draft.st_categoryModifyDone = false;
        draft.st_categoryModifyError = null;
        break;
      }
      case CATEGORY_MODIFY_SUCCESS: {
        draft.st_categoryModifyLoading = false;
        draft.st_categoryModifyDone = true;
        draft.st_categoryModifyError = null;
        break;
      }
      case CATEGORY_MODIFY_FAILURE: {
        draft.st_categoryModifyLoading = false;
        draft.st_categoryModifyDone = false;
        draft.st_categoryModifyError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case CATEGORY_DEL_REQUEST: {
        draft.st_categoryDeleteLoading = true;
        draft.st_categoryDeleteDone = false;
        draft.st_categoryDeleteError = null;
        break;
      }
      case CATEGORY_DEL_SUCCESS: {
        draft.st_categoryDeleteLoading = false;
        draft.st_categoryDeleteDone = true;
        draft.st_categoryDeleteError = null;
        break;
      }
      case CATEGORY_DEL_FAILURE: {
        draft.st_categoryDeleteLoading = false;
        draft.st_categoryDeleteDone = false;
        draft.st_categoryDeleteError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
