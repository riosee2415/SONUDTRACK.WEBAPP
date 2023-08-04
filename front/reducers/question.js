import produce from "../util/produce";

export const initailState = {
  questions: [],
  types: null,

  createTypeModal: false, // 문의 유형 create 모달 실행
  updateModal: false, // 문의 update 모달 실행

  //
  st_questionLoading: false, // 문의 정보 가져오기
  st_questionDone: false,
  st_questionError: null,
  //
  st_questionCreateLoading: false, // 문의 정보 추가하기
  st_questionCreateDone: false,
  st_questionCreateError: null,
  //
  st_questionUpdateLoading: false, // 문의 정보 승인하기
  st_questionUpdateDone: false,
  st_questionUpdateError: null,
  ////////////////////////////////////////////////////////////////////////
  st_questionTypeLoading: false, // 문의 유형 정보 가져오기
  st_questionTypeDone: false,
  st_questionTypeError: null,
  //
  st_questionTypeCreateLoading: false, // 문의 유형 정보 추가하기
  st_questionTypeCreateDone: false,
  st_questionTypeCreateError: null,
  //
  st_questionTypeDeleteLoading: false, // 문의 유형 정보 삭제하기
  st_questionTypeDeleteDone: false,
  st_questionTypeDeleteError: null,
  //
  st_questionTypeUpdateLoading: false, // 문의 유형 정보 수정하기
  st_questionTypeUpdateDone: false,
  st_questionTypeUpdateError: null,
  //
  st_inquiryLoading: false, // 제작문의하기
  st_inquiryDone: false,
  st_inquiryError: null,
};

export const QUESTION_GET_REQUEST = "QUESTION_GET_REQUEST";
export const QUESTION_GET_SUCCESS = "QUESTION_GET_SUCCESS";
export const QUESTION_GET_FAILURE = "QUESTION_GET_FAILURE";

export const QUESTION_UPDATE_REQUEST = "QUESTION_UPDATE_REQUEST";
export const QUESTION_UPDATE_SUCCESS = "QUESTION_UPDATE_SUCCESS";
export const QUESTION_UPDATE_FAILURE = "QUESTION_UPDATE_FAILURE";

export const QUESTION_CREATE_REQUEST = "QUESTION_CREATE_REQUEST";
export const QUESTION_CREATE_SUCCESS = "QUESTION_CREATE_SUCCESS";
export const QUESTION_CREATE_FAILURE = "QUESTION_CREATE_FAILURE";

// ************************************************
export const QUESTION_TYPE_GET_REQUEST = "QUESTION_TYPE_GET_REQUEST";
export const QUESTION_TYPE_GET_SUCCESS = "QUESTION_TYPE_GET_SUCCESS";
export const QUESTION_TYPE_GET_FAILURE = "QUESTION_TYPE_GET_FAILURE";

export const QUESTION_TYPE_DELETE_REQUEST = "QUESTION_TYPE_DELETE_REQUEST";
export const QUESTION_TYPE_DELETE_SUCCESS = "QUESTION_TYPE_DELETE_SUCCESS";
export const QUESTION_TYPE_DELETE_FAILURE = "QUESTION_TYPE_DELETE_FAILURE";

export const QUESTION_TYPE_UPDATE_REQUEST = "QUESTION_TYPE_UPDATE_REQUEST";
export const QUESTION_TYPE_UPDATE_SUCCESS = "QUESTION_TYPE_UPDATE_SUCCESS";
export const QUESTION_TYPE_UPDATE_FAILURE = "QUESTION_TYPE_UPDATE_FAILURE";

export const QUESTION_TYPE_CREATE_REQUEST = "QUESTION_TYPE_CREATE_REQUEST";
export const QUESTION_TYPE_CREATE_SUCCESS = "QUESTION_TYPE_CREATE_SUCCESS";
export const QUESTION_TYPE_CREATE_FAILURE = "QUESTION_TYPE_CREATE_FAILURE";

export const INQUIRY_REQUEST = "INQUIRY_REQUEST";
export const INQUIRY_SUCCESS = "INQUIRY_SUCCESS";
export const INQUIRY_FAILURE = "INQUIRY_FAILURE";

export const CREATE_TYPE_MODAL_OPEN_REQUEST = "CREATE_TYPE_MODAL_OPEN_REQUEST";
export const CREATE_TYPE_MODAL_CLOSE_REQUEST =
  "CREATE_TYPE_MODAL_CLOSE_REQUEST";

export const UPDATE_MODAL_OPEN_REQUEST = "UPDATE_MODAL_OPEN_REQUEST";
export const UPDATE_MODAL_CLOSE_REQUEST = "UPDATE_MODAL_CLOSE_REQUEST";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QUESTION_GET_REQUEST: {
        draft.st_questionLoading = true;
        draft.st_questionDone = false;
        draft.st_questionError = null;
        break;
      }
      case QUESTION_GET_SUCCESS: {
        draft.st_questionLoading = false;
        draft.st_questionDone = true;
        draft.st_questionError = null;
        draft.questions = action.data;

        break;
      }
      case QUESTION_GET_FAILURE: {
        draft.st_questionLoading = false;
        draft.st_questionDone = false;
        draft.st_questionError = action.error;
        break;
      }
      //
      case QUESTION_UPDATE_REQUEST: {
        draft.st_questionUpdateLoading = true;
        draft.st_questionUpdateDone = false;
        draft.st_questionUpdateError = null;
        break;
      }
      case QUESTION_UPDATE_SUCCESS: {
        draft.st_questionUpdateLoading = false;
        draft.st_questionUpdateDone = true;
        draft.st_questionUpdateError = null;

        break;
      }
      case QUESTION_UPDATE_FAILURE: {
        draft.st_questionUpdateLoading = false;
        draft.st_questionUpdateDone = false;
        draft.st_questionUpdateError = action.error;
        break;
      }
      //
      case QUESTION_CREATE_REQUEST: {
        draft.st_questionCreateLoading = true;
        draft.st_questionCreateDone = null;
        draft.st_questionCreateError = false;
        break;
      }
      case QUESTION_CREATE_SUCCESS: {
        draft.st_questionCreateLoading = false;
        draft.st_questionCreateDone = true;
        draft.questions = action.data;
        break;
      }
      case QUESTION_CREATE_FAILURE: {
        draft.st_questionCreateLoading = false;
        draft.st_questionCreateDone = false;
        draft.st_questionCreateError = action.error;
        break;
      }
      // ************************************************
      case QUESTION_TYPE_GET_REQUEST: {
        draft.st_questionTypeLoading = true;
        draft.st_questionTypeDone = null;
        draft.st_questionTypeError = false;
        break;
      }
      case QUESTION_TYPE_GET_SUCCESS: {
        draft.st_questionTypeLoading = false;
        draft.st_questionTypeDone = true;
        draft.types = action.data;
        break;
      }
      case QUESTION_TYPE_GET_FAILURE: {
        draft.st_questionTypeLoading = false;
        draft.st_questionTypeDone = false;
        draft.st_questionTypeError = action.error;
        break;
      }
      case QUESTION_TYPE_DELETE_REQUEST: {
        draft.st_questionTypeDeleteLoading = true;
        draft.st_questionTypeDeleteDone = null;
        draft.st_questionTypeDeleteError = false;
        break;
      }
      case QUESTION_TYPE_DELETE_SUCCESS: {
        draft.st_questionTypeDeleteLoading = false;
        draft.st_questionTypeDeleteDone = true;
        break;
      }
      case QUESTION_TYPE_DELETE_FAILURE: {
        draft.st_questionTypeDeleteLoading = false;
        draft.st_questionTypeDeleteDone = false;
        draft.st_questionTypeDeleteError = action.error;
        break;
      }
      case QUESTION_TYPE_UPDATE_REQUEST: {
        draft.st_questionTypeUpdateLoading = true;
        draft.st_questionTypeUpdateDone = null;
        draft.st_questionTypeUpdateError = false;
        break;
      }
      case QUESTION_TYPE_UPDATE_SUCCESS: {
        draft.st_questionTypeUpdateLoading = false;
        draft.st_questionTypeUpdateDone = true;
        break;
      }
      case QUESTION_TYPE_UPDATE_FAILURE: {
        draft.st_questionTypeUpdateLoading = false;
        draft.st_questionTypeUpdateDone = false;
        draft.st_questionTypeUpdateError = action.error;
        break;
      }
      case QUESTION_TYPE_CREATE_REQUEST: {
        draft.st_questionTypeCreateLoading = true;
        draft.st_questionTypeCreateDone = null;
        draft.st_questionTypeCreateError = false;
        break;
      }
      case QUESTION_TYPE_CREATE_SUCCESS: {
        draft.st_questionTypeCreateLoading = false;
        draft.st_questionTypeCreateDone = true;
        break;
      }
      case QUESTION_TYPE_CREATE_FAILURE: {
        draft.st_questionTypeCreateLoading = false;
        draft.st_questionTypeCreateDone = false;
        draft.st_questionTypeCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case INQUIRY_REQUEST: {
        draft.st_inquiryLoading = true;
        draft.st_inquiryDone = false;
        draft.st_inquiryError = null;
        break;
      }
      case INQUIRY_SUCCESS: {
        draft.st_inquiryLoading = false;
        draft.st_inquiryDone = true;
        draft.st_inquiryError = null;
        break;
      }
      case INQUIRY_FAILURE: {
        draft.st_inquiryLoading = false;
        draft.st_inquiryDone = false;
        draft.st_inquiryError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case CREATE_TYPE_MODAL_OPEN_REQUEST:
        draft.createTypeModal = true;
        break;

      case CREATE_TYPE_MODAL_CLOSE_REQUEST:
        draft.createTypeModal = false;
        break;

      case UPDATE_MODAL_OPEN_REQUEST:
        draft.updateModal = true;
        break;

      case UPDATE_MODAL_CLOSE_REQUEST:
        draft.updateModal = false;
        break;

      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
