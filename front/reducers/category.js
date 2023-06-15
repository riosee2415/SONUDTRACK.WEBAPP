import produce from "../util/produce";

export const initailState = {
  categoryList: [], // 카테고리 리스트
  categoryAdminList: [], // 카테고리 관리자 리스트
  categoryTypeList: [], // 카테고리 타입 리스트
  cateAllList: [], // 카테고리 전체 리스트

  //
  st_categoryListLoading: false, // 카테고리 정보 가져오기
  st_categoryListDone: false,
  st_categoryListError: null,
  //
  st_categoryAdminListLoading: false, // 카테고리 정보 추가하기
  st_categoryAdminListDone: false,
  st_categoryAdminListError: null,
  //
  st_categoryCreateLoading: false, // 카테고리 정보 승인하기
  st_categoryCreateDone: false,
  st_categoryCreateError: null,
  //
  st_categoryUpdateLoading: false, // 카테고리 정보 승인하기
  st_categoryUpdateDone: false,
  st_categoryUpdateError: null,
  //
  st_categoryDeleteLoading: false, // 카테고리 정보 승인하기
  st_categoryDeleteDone: false,
  st_categoryDeleteError: null,
  ////////////////////////////////////////////////////////////////////////
  st_categoryTypeLoading: false, // 카테고리 유형 정보 가져오기
  st_categoryTypeDone: false,
  st_categoryTypeError: null,
  //
  st_categoryTypeUpdateLoading: false, // 카테고리 유형 정보 수정하기
  st_categoryTypeUpdateDone: false,
  st_categoryTypeUpdateError: null,
  //
  st_cateAllListLoading: false, // 카테고리 전체 리스트
  st_cateAllListDone: false,
  st_cateAllListError: null,
};

export const CATEGORY_LIST_REQUEST = "CATEGORY_LIST_REQUEST";
export const CATEGORY_LIST_SUCCESS = "CATEGORY_LIST_SUCCESS";
export const CATEGORY_LIST_FAILURE = "CATEGORY_LIST_FAILURE";

export const CATEGORY_UPDATE_REQUEST = "CATEGORY_UPDATE_REQUEST";
export const CATEGORY_UPDATE_SUCCESS = "CATEGORY_UPDATE_SUCCESS";
export const CATEGORY_UPDATE_FAILURE = "CATEGORY_UPDATE_FAILURE";

export const CATEGORY_CREATE_REQUEST = "CATEGORY_CREATE_REQUEST";
export const CATEGORY_CREATE_SUCCESS = "CATEGORY_CREATE_SUCCESS";
export const CATEGORY_CREATE_FAILURE = "CATEGORY_CREATE_FAILURE";

export const CATEGORY_ADMIN_LIST_REQUEST = "CATEGORY_ADMIN_LIST_REQUEST";
export const CATEGORY_ADMIN_LIST_SUCCESS = "CATEGORY_ADMIN_LIST_SUCCESS";
export const CATEGORY_ADMIN_LIST_FAILURE = "CATEGORY_ADMIN_LIST_FAILURE";

export const CATEGORY_DELETE_REQUEST = "CATEGORY_DELETE_REQUEST";
export const CATEGORY_DELETE_SUCCESS = "CATEGORY_DELETE_SUCCESS";
export const CATEGORY_DELETE_FAILURE = "CATEGORY_DELETE_FAILURE";

// ************************************************
export const CATEGORY_TYPE_GET_REQUEST = "CATEGORY_TYPE_GET_REQUEST";
export const CATEGORY_TYPE_GET_SUCCESS = "CATEGORY_TYPE_GET_SUCCESS";
export const CATEGORY_TYPE_GET_FAILURE = "CATEGORY_TYPE_GET_FAILURE";

export const CATEGORY_TYPE_UPDATE_REQUEST = "CATEGORY_TYPE_UPDATE_REQUEST";
export const CATEGORY_TYPE_UPDATE_SUCCESS = "CATEGORY_TYPE_UPDATE_SUCCESS";
export const CATEGORY_TYPE_UPDATE_FAILURE = "CATEGORY_TYPE_UPDATE_FAILURE";

export const CATE_ALL_LIST_REQUEST = "CATE_ALL_LIST_REQUEST";
export const CATE_ALL_LIST_SUCCESS = "CATE_ALL_LIST_SUCCESS";
export const CATE_ALL_LIST_FAILURE = "CATE_ALL_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST: {
        draft.st_categoryListLoading = true;
        draft.st_categoryListDone = false;
        draft.st_categoryListError = null;
        break;
      }
      case CATEGORY_LIST_SUCCESS: {
        draft.st_categoryListLoading = false;
        draft.st_categoryListDone = true;
        draft.st_categoryListError = null;
        draft.categoryList = action.data;

        break;
      }
      case CATEGORY_LIST_FAILURE: {
        draft.st_categoryListLoading = false;
        draft.st_categoryListDone = false;
        draft.st_categoryListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case CATEGORY_ADMIN_LIST_REQUEST: {
        draft.st_categoryAdminListLoading = true;
        draft.st_categoryAdminListDone = false;
        draft.st_categoryAdminListError = null;
        break;
      }
      case CATEGORY_ADMIN_LIST_SUCCESS: {
        draft.st_categoryAdminListLoading = false;
        draft.st_categoryAdminListDone = true;
        draft.st_categoryAdminListError = null;
        draft.categoryAdminList = action.data;

        break;
      }
      case CATEGORY_ADMIN_LIST_FAILURE: {
        draft.st_categoryAdminListLoading = false;
        draft.st_categoryAdminListDone = false;
        draft.st_categoryAdminListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case CATEGORY_UPDATE_REQUEST: {
        draft.st_categoryUpdateLoading = true;
        draft.st_categoryUpdateDone = false;
        draft.st_categoryUpdateError = null;
        break;
      }
      case CATEGORY_UPDATE_SUCCESS: {
        draft.st_categoryUpdateLoading = false;
        draft.st_categoryUpdateDone = true;
        draft.st_categoryUpdateError = null;

        break;
      }
      case CATEGORY_UPDATE_FAILURE: {
        draft.st_categoryUpdateLoading = false;
        draft.st_categoryUpdateDone = false;
        draft.st_categoryUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case CATEGORY_CREATE_REQUEST: {
        draft.st_categoryCreateLoading = true;
        draft.st_categoryCreateDone = false;
        draft.st_categoryCreateError = null;
        break;
      }
      case CATEGORY_CREATE_SUCCESS: {
        draft.st_categoryCreateLoading = false;
        draft.st_categoryCreateDone = true;
        draft.st_categoryCreateError = null;
        break;
      }
      case CATEGORY_CREATE_FAILURE: {
        draft.st_categoryCreateLoading = false;
        draft.st_categoryCreateDone = false;
        draft.st_categoryCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case CATEGORY_DELETE_REQUEST: {
        draft.st_categoryDeleteLoading = true;
        draft.st_categoryDeleteDone = false;
        draft.st_categoryDeleteError = null;
        break;
      }
      case CATEGORY_DELETE_SUCCESS: {
        draft.st_categoryDeleteLoading = false;
        draft.st_categoryDeleteDone = true;
        draft.st_categoryDeleteError = null;
        break;
      }
      case CATEGORY_DELETE_FAILURE: {
        draft.st_categoryDeleteLoading = false;
        draft.st_categoryDeleteDone = false;
        draft.st_categoryDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case CATEGORY_TYPE_GET_REQUEST: {
        draft.st_categoryTypeLoading = true;
        draft.st_categoryTypeDone = false;
        draft.st_categoryTypeError = null;
        break;
      }
      case CATEGORY_TYPE_GET_SUCCESS: {
        draft.st_categoryTypeLoading = false;
        draft.st_categoryTypeDone = true;
        draft.st_categoryTypeError = null;
        draft.categoryTypeList = action.data;
        break;
      }
      case CATEGORY_TYPE_GET_FAILURE: {
        draft.st_categoryTypeLoading = false;
        draft.st_categoryTypeDone = false;
        draft.st_categoryTypeError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case CATEGORY_TYPE_UPDATE_REQUEST: {
        draft.st_categoryTypeUpdateLoading = true;
        draft.st_categoryTypeUpdateDone = false;
        draft.st_categoryTypeUpdateError = null;
        break;
      }
      case CATEGORY_TYPE_UPDATE_SUCCESS: {
        draft.st_categoryTypeUpdateLoading = false;
        draft.st_categoryTypeUpdateDone = true;
        draft.st_categoryTypeUpdateError = null;
        break;
      }
      case CATEGORY_TYPE_UPDATE_FAILURE: {
        draft.st_categoryTypeUpdateLoading = false;
        draft.st_categoryTypeUpdateDone = false;
        draft.st_categoryTypeUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case CATE_ALL_LIST_REQUEST: {
        draft.st_cateAllListLoading = true;
        draft.st_cateAllListDone = false;
        draft.st_cateAllListError = null;
        break;
      }
      case CATE_ALL_LIST_SUCCESS: {
        draft.st_cateAllListLoading = false;
        draft.st_cateAllListDone = true;
        draft.st_cateAllListError = null;
        draft.cateAllList = action.data;

        break;
      }
      case CATE_ALL_LIST_FAILURE: {
        draft.st_cateAllListLoading = false;
        draft.st_cateAllListDone = false;
        draft.st_cateAllListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
