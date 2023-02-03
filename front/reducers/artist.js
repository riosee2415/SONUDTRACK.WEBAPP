import produce from "../util/produce";

export const initailState = {
  permmCnt: 0,
  artistList: [],
  permmWaitingList: [],
  artistems: [],
  artistemDetail: null,
  allArtistemList: [], // 아티스트 전체조회
  artistPath: null, //
  artistemNearList: [],
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
  st_permmWaitingCreateLoading: false,
  st_permmWaitingCreateDone: false,
  st_permmWaitingCreateError: null,
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
  //
  st_artistemDetailLoading: false,
  st_artistemDetailDone: false,
  st_artistemDetailError: null,
  //
  st_allArtistemListLoading: false,
  st_allArtistemListDone: false,
  st_allArtistemListError: null,
  //
  st_artistUploadLoading: false, // artist 이미지 등록
  st_artistUploadDone: false,
  st_artistUploadError: null,
  //
  st_ArtistemNearListLoading: false, // 아티스트 최신 4개 불러오기
  st_ArtistemNearListDone: false,
  st_ArtistemNearListError: null,
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

export const PERMM_WAITING_CREATE_REQUEST = "PERMM_WAITING_CREATE_REQUEST";
export const PERMM_WAITING_CREATE_SUCCESS = "PERMM_WAITING_CREATE_SUCCESS";
export const PERMM_WAITING_CREATE_FAILURE = "PERMM_WAITING_CREATE_FAILURE";

export const ARTISTEM_LIST_REQUEST = "ARTISTEM_LIST_REQUEST";
export const ARTISTEM_LIST_SUCCESS = "ARTISTEM_LIST_SUCCESS";
export const ARTISTEM_LIST_FAILURE = "ARTISTEM_LIST_FAILURE";

export const ARTISTEM_ING_UP_REQUEST = "ARTISTEM_ING_UP_REQUEST";
export const ARTISTEM_ING_UP_SUCCESS = "ARTISTEM_ING_UP_SUCCESS";
export const ARTISTEM_ING_UP_FAILURE = "ARTISTEM_ING_UP_FAILURE";

export const ARTISTEM_TOP_UP_REQUEST = "ARTISTEM_TOP_UP_REQUEST";
export const ARTISTEM_TOP_UP_SUCCESS = "ARTISTEM_TOP_UP_SUCCESS";
export const ARTISTEM_TOP_UP_FAILURE = "ARTISTEM_TOP_UP_FAILURE";

export const ARTISTEM_DETAIL_REQUEST = "ARTISTEM_DETAIL_REQUEST";
export const ARTISTEM_DETAIL_SUCCESS = "ARTISTEM_DETAIL_SUCCESS";
export const ARTISTEM_DETAIL_FAILURE = "ARTISTEM_DETAIL_FAILURE";

export const ALL_ARTISTEM_LIST_REQUEST = "ALL_ARTISTEM_LIST_REQUEST";
export const ALL_ARTISTEM_LIST_SUCCESS = "ALL_ARTISTEM_LIST_SUCCESS";
export const ALL_ARTISTEM_LIST_FAILURE = "ALL_ARTISTEM_LIST_FAILURE";

export const ARTISTEM_NEAR_LIST_REQUEST = "ARTISTEM_NEAR_LIST_REQUEST";
export const ARTISTEM_NEAR_LIST_SUCCESS = "ARTISTEM_NEAR_LIST_SUCCESS";
export const ARTISTEM_NEAR_LIST_FAILURE = "ARTISTEM_NEAR_LIST_FAILURE";

export const ARTIST_UPLOAD_REQUEST = "ARTIST_UPLOAD_REQUEST";
export const ARTIST_UPLOAD_SUCCESS = "ARTIST_UPLOAD_SUCCESS";
export const ARTIST_UPLOAD_FAILURE = "ARTIST_UPLOAD_FAILURE";

export const ARTIST_IMAGE_RESET = "ARTIST_IMAGE_RESET";

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

      case PERMM_WAITING_CREATE_REQUEST: {
        draft.st_permmWaitingCreateLoading = true;
        draft.st_permmWaitingCreateDone = false;
        draft.st_permmWaitingCreateError = null;
        break;
      }

      case PERMM_WAITING_CREATE_SUCCESS: {
        draft.st_permmWaitingCreateLoading = false;
        draft.st_permmWaitingCreateDone = true;
        draft.st_permmWaitingCreateError = null;
        break;
      }

      case PERMM_WAITING_CREATE_FAILURE: {
        draft.st_permmWaitingCreateLoading = false;
        draft.st_permmWaitingCreateDone = false;
        draft.st_permmWaitingCreateError = action.error;
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
      case ARTISTEM_DETAIL_REQUEST: {
        draft.st_artistemDetailLoading = true;
        draft.st_artistemDetailDone = false;
        draft.st_artistemDetailError = null;
        break;
      }

      case ARTISTEM_DETAIL_SUCCESS: {
        draft.st_artistemDetailLoading = false;
        draft.st_artistemDetailDone = true;
        draft.st_artistemDetailError = null;
        draft.artistemDetail = action.data;
        break;
      }

      case ARTISTEM_DETAIL_FAILURE: {
        draft.st_artistemDetailLoading = false;
        draft.st_artistemDetailDone = false;
        draft.st_artistemDetailError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////

      case ALL_ARTISTEM_LIST_REQUEST: {
        draft.st_allArtistemListLoading = true;
        draft.st_allArtistemListDone = false;
        draft.st_allArtistemListError = null;
        break;
      }

      case ALL_ARTISTEM_LIST_SUCCESS: {
        draft.st_allArtistemListLoading = false;
        draft.st_allArtistemListDone = true;
        draft.st_allArtistemListError = null;
        draft.allArtistemList = action.data.artistemList;
        break;
      }

      case ALL_ARTISTEM_LIST_FAILURE: {
        draft.st_allArtistemListLoading = false;
        draft.st_allArtistemListDone = false;
        draft.st_allArtistemListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////

      case ARTISTEM_NEAR_LIST_REQUEST: {
        draft.st_ArtistemNearListLoading = true;
        draft.st_ArtistemNearListDone = false;
        draft.st_ArtistemNearListError = null;
        break;
      }

      case ARTISTEM_NEAR_LIST_SUCCESS: {
        draft.st_ArtistemNearListLoading = false;
        draft.st_ArtistemNearListDone = true;
        draft.st_ArtistemNearListError = null;
        draft.artistemNearList = action.data.artistemList;
        break;
      }

      case ARTISTEM_NEAR_LIST_FAILURE: {
        draft.st_ArtistemNearListLoading = false;
        draft.st_ArtistemNearListDone = false;
        draft.st_ArtistemNearListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////

      case ARTIST_UPLOAD_REQUEST: {
        draft.st_artistUploadLoading = true;
        draft.st_artistUploadDone = false;
        draft.st_artistUploadError = null;
        break;
      }
      case ARTIST_UPLOAD_SUCCESS: {
        draft.st_artistUploadLoading = false;
        draft.st_artistUploadDone = true;
        draft.st_artistUploadError = null;
        draft.artistPath = action.data.path;
        break;
      }
      case ARTIST_UPLOAD_FAILURE: {
        draft.st_artistUploadLoading = false;
        draft.st_artistUploadDone = false;
        draft.st_artistUploadError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ARTIST_IMAGE_RESET: {
        draft.artistPath = null;
        break;
      }

      //////////////////////////////////////////////
      ////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
