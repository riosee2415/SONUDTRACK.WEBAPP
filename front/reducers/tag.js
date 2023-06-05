import produce from "../util/produce";

export const initailState = {
  tagList: [], // 태그리스트
  tagTypeList: [], // 태그타입리스트

  //
  st_tagTypeListLoading: false, // tag 가져오기
  st_tagTypeListDone: false,
  st_tagTypeListError: null,
  //
  st_tagTypeCreateLoading: false, // tag 생성하기
  st_tagTypeCreateDone: false,
  st_tagTypeCreateError: null,
  //
  st_tagTypeUpdateLoading: false, // tag 수정하기
  st_tagTypeUpdateDone: false,
  st_tagTypeUpdateError: null,
  //
  st_tagTypeDeleteLoading: false, // tag 삭제하기
  st_tagTypeDeleteDone: false,
  st_tagTypeDeleteError: null,
  //
  st_tagListLoading: false, // tag 가져오기
  st_tagListDone: false,
  st_tagListError: null,
  //
  st_tagCreateLoading: false, // tag 생성하기
  st_tagCreateDone: false,
  st_tagCreateError: null,
  //
  st_tagUpdateLoading: false, // tag 수정하기
  st_tagUpdateDone: false,
  st_tagUpdateError: null,
  //
  st_tagDeleteLoading: false, // tag 삭제하기
  st_tagDeleteDone: false,
  st_tagDeleteError: null,
};

export const TAG_TYPE_LIST_REQUEST = "TAG_TYPE_LIST_REQUEST";
export const TAG_TYPE_LIST_SUCCESS = "TAG_TYPE_LIST_SUCCESS";
export const TAG_TYPE_LIST_FAILURE = "TAG_TYPE_LIST_FAILURE";

export const TAG_TYPE_CREATE_REQUEST = "TAG_TYPE_CREATE_REQUEST";
export const TAG_TYPE_CREATE_SUCCESS = "TAG_TYPE_CREATE_SUCCESS";
export const TAG_TYPE_CREATE_FAILURE = "TAG_TYPE_CREATE_FAILURE";

export const TAG_TYPE_UPDATE_REQUEST = "TAG_TYPE_UPDATE_REQUEST";
export const TAG_TYPE_UPDATE_SUCCESS = "TAG_TYPE_UPDATE_SUCCESS";
export const TAG_TYPE_UPDATE_FAILURE = "TAG_TYPE_UPDATE_FAILURE";

export const TAG_TYPE_DELETE_REQUEST = "TAG_TYPE_DELETE_REQUEST";
export const TAG_TYPE_DELETE_SUCCESS = "TAG_TYPE_DELETE_SUCCESS";
export const TAG_TYPE_DELETE_FAILURE = "TAG_TYPE_DELETE_FAILURE";

export const TAG_LIST_REQUEST = "TAG_LIST_REQUEST";
export const TAG_LIST_SUCCESS = "TAG_LIST_SUCCESS";
export const TAG_LIST_FAILURE = "TAG_LIST_FAILURE";

export const TAG_CREATE_REQUEST = "TAG_CREATE_REQUEST";
export const TAG_CREATE_SUCCESS = "TAG_CREATE_SUCCESS";
export const TAG_CREATE_FAILURE = "TAG_CREATE_FAILURE";

export const TAG_UPDATE_REQUEST = "TAG_UPDATE_REQUEST";
export const TAG_UPDATE_SUCCESS = "TAG_UPDATE_SUCCESS";
export const TAG_UPDATE_FAILURE = "TAG_UPDATE_FAILURE";

export const TAG_DELETE_REQUEST = "TAG_DELETE_REQUEST";
export const TAG_DELETE_SUCCESS = "TAG_DELETE_SUCCESS";
export const TAG_DELETE_FAILURE = "TAG_DELETE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TAG_LIST_REQUEST: {
        draft.st_tagListLoading = true;
        draft.st_tagListDone = false;
        draft.st_tagListError = null;
        break;
      }
      case TAG_LIST_SUCCESS: {
        draft.st_tagListLoading = false;
        draft.st_tagListDone = true;
        draft.st_tagListError = null;
        draft.tagList = action.data;
        break;
      }
      case TAG_LIST_FAILURE: {
        draft.st_tagListLoading = false;
        draft.st_tagListDone = false;
        draft.st_tagListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TAG_CREATE_REQUEST: {
        draft.st_tagCreateLoading = true;
        draft.st_tagCreateDone = false;
        draft.st_tagCreateError = null;
        break;
      }
      case TAG_CREATE_SUCCESS: {
        draft.st_tagCreateLoading = false;
        draft.st_tagCreateDone = true;
        draft.st_tagCreateError = null;
        break;
      }
      case TAG_CREATE_FAILURE: {
        draft.st_tagCreateLoading = false;
        draft.st_tagCreateDone = false;
        draft.st_tagCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TAG_UPDATE_REQUEST: {
        draft.st_tagUpdateLoading = true;
        draft.st_tagUpdateDone = false;
        draft.st_tagUpdateError = null;
        break;
      }
      case TAG_UPDATE_SUCCESS: {
        draft.st_tagUpdateLoading = false;
        draft.st_tagUpdateDone = true;
        draft.st_tagUpdateError = null;
        break;
      }
      case TAG_UPDATE_FAILURE: {
        draft.st_tagUpdateLoading = false;
        draft.st_tagUpdateDone = false;
        draft.st_tagUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TAG_DELETE_REQUEST: {
        draft.st_tagDeleteLoading = true;
        draft.st_tagDeleteDone = false;
        draft.st_tagDeleteError = null;
        break;
      }
      case TAG_DELETE_SUCCESS: {
        draft.st_tagDeleteLoading = false;
        draft.st_tagDeleteDone = true;
        draft.st_tagDeleteError = null;
        break;
      }
      case TAG_DELETE_FAILURE: {
        draft.st_tagDeleteLoading = false;
        draft.st_tagDeleteDone = false;
        draft.st_tagDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TAG_TYPE_LIST_REQUEST: {
        draft.st_tagTypeListLoading = true;
        draft.st_tagTypeListDone = false;
        draft.st_tagTypeListError = null;
        break;
      }
      case TAG_TYPE_LIST_SUCCESS: {
        draft.st_tagTypeListLoading = false;
        draft.st_tagTypeListDone = true;
        draft.st_tagTypeListError = null;
        draft.tagTypeList = action.data;
        break;
      }
      case TAG_TYPE_LIST_FAILURE: {
        draft.st_tagTypeListLoading = false;
        draft.st_tagTypeListDone = false;
        draft.st_tagTypeListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TAG_TYPE_CREATE_REQUEST: {
        draft.st_tagTypeCreateLoading = true;
        draft.st_tagTypeCreateDone = false;
        draft.st_tagTypeCreateError = null;
        break;
      }
      case TAG_TYPE_CREATE_SUCCESS: {
        draft.st_tagTypeCreateLoading = false;
        draft.st_tagTypeCreateDone = true;
        draft.st_tagTypeCreateError = null;
        break;
      }
      case TAG_TYPE_CREATE_FAILURE: {
        draft.st_tagTypeCreateLoading = false;
        draft.st_tagTypeCreateDone = false;
        draft.st_tagTypeCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TAG_TYPE_UPDATE_REQUEST: {
        draft.st_tagTypeUpdateLoading = true;
        draft.st_tagTypeUpdateDone = false;
        draft.st_tagTypeUpdateError = null;
        break;
      }
      case TAG_TYPE_UPDATE_SUCCESS: {
        draft.st_tagTypeUpdateLoading = false;
        draft.st_tagTypeUpdateDone = true;
        draft.st_tagTypeUpdateError = null;
        break;
      }
      case TAG_TYPE_UPDATE_FAILURE: {
        draft.st_tagTypeUpdateLoading = false;
        draft.st_tagTypeUpdateDone = false;
        draft.st_tagTypeUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TAG_TYPE_DELETE_REQUEST: {
        draft.st_tagTypeDeleteLoading = true;
        draft.st_tagTypeDeleteDone = false;
        draft.st_tagTypeDeleteError = null;
        break;
      }
      case TAG_TYPE_DELETE_SUCCESS: {
        draft.st_tagTypeDeleteLoading = false;
        draft.st_tagTypeDeleteDone = true;
        draft.st_tagTypeDeleteError = null;
        break;
      }
      case TAG_TYPE_DELETE_FAILURE: {
        draft.st_tagTypeDeleteLoading = false;
        draft.st_tagTypeDeleteDone = false;
        draft.st_tagTypeDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
