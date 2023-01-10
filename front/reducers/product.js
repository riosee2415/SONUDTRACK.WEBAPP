import produce from "../util/produce";

export const initailState = {
  categorys: [],
  products: [],
  targetTags: [],
  targetGens: [],

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
  st_productListLoading: false,
  st_productListDone: false,
  st_productListError: null,
  //
  st_productIngLoading: false,
  st_productIngDone: false,
  st_productIngError: null,
  //
  st_productTopLoading: false,
  st_productTopDone: false,
  st_productTopError: null,
  //
  st_productTagLoading: false,
  st_productTagDone: false,
  st_productTagError: null,
  //
  st_productGenLoading: false,
  st_productGenDone: false,
  st_productGenError: null,
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

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";

export const PRODUCT_ING_REQUEST = "PRODUCT_ING_REQUEST";
export const PRODUCT_ING_SUCCESS = "PRODUCT_ING_SUCCESS";
export const PRODUCT_ING_FAILURE = "PRODUCT_ING_FAILURE";

export const PRODUCT_TOP_REQUEST = "PRODUCT_TOP_REQUEST";
export const PRODUCT_TOP_SUCCESS = "PRODUCT_TOP_SUCCESS";
export const PRODUCT_TOP_FAILURE = "PRODUCT_TOP_FAILURE";

export const PRODUCT_TAG_REQUEST = "PRODUCT_TAG_REQUEST";
export const PRODUCT_TAG_SUCCESS = "PRODUCT_TAG_SUCCESS";
export const PRODUCT_TAG_FAILURE = "PRODUCT_TAG_FAILURE";

export const PRODUCT_GEN_REQUEST = "PRODUCT_GEN_REQUEST";
export const PRODUCT_GEN_SUCCESS = "PRODUCT_GEN_SUCCESS";
export const PRODUCT_GEN_FAILURE = "PRODUCT_TAG_FAILURE";

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
      case PRODUCT_LIST_REQUEST: {
        draft.st_productListLoading = true;
        draft.st_productListDone = false;
        draft.st_productListError = null;
        break;
      }
      case PRODUCT_LIST_SUCCESS: {
        draft.st_productListLoading = false;
        draft.st_productListDone = true;
        draft.st_productListError = null;
        draft.products = action.data;
        break;
      }
      case PRODUCT_LIST_FAILURE: {
        draft.st_productListLoading = false;
        draft.st_productListDone = false;
        draft.st_productListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_ING_REQUEST: {
        draft.st_productIngLoading = true;
        draft.st_productIngDone = false;
        draft.st_productIngError = null;
        break;
      }
      case PRODUCT_ING_SUCCESS: {
        draft.st_productIngLoading = false;
        draft.st_productIngDone = true;
        draft.st_productIngError = null;
        break;
      }
      case PRODUCT_ING_FAILURE: {
        draft.st_productIngLoading = false;
        draft.st_productIngDone = false;
        draft.st_productIngError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TOP_REQUEST: {
        draft.st_productTopLoading = true;
        draft.st_productTopDone = false;
        draft.st_productTopError = null;
        break;
      }
      case PRODUCT_TOP_SUCCESS: {
        draft.st_productTopLoading = false;
        draft.st_productTopDone = true;
        draft.st_productTopError = null;
        break;
      }
      case PRODUCT_TOP_FAILURE: {
        draft.st_productTopLoading = false;
        draft.st_productTopDone = false;
        draft.st_productTopError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TAG_REQUEST: {
        draft.st_productTagLoading = true;
        draft.st_productTagDone = false;
        draft.st_productTagError = null;
        break;
      }
      case PRODUCT_TAG_SUCCESS: {
        draft.st_productTagLoading = false;
        draft.st_productTagDone = true;
        draft.st_productTagError = null;
        draft.targetTags = action.data;
        break;
      }
      case PRODUCT_TAG_FAILURE: {
        draft.st_productTagLoading = false;
        draft.st_productTagDone = false;
        draft.st_productTagError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_GEN_REQUEST: {
        draft.st_productGenLoading = true;
        draft.st_productGenDone = false;
        draft.st_productGenError = null;
        break;
      }
      case PRODUCT_GEN_SUCCESS: {
        draft.st_productGenLoading = false;
        draft.st_productGenDone = true;
        draft.st_productGenError = null;
        draft.targetGens = action.data;
        break;
      }
      case PRODUCT_GEN_FAILURE: {
        draft.st_productGenLoading = false;
        draft.st_productGenDone = false;
        draft.st_productGenError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
