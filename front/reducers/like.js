import produce from "../util/produce";

export const initailState = {
  myLikeList: [],
  lastPage: null,

  //
  st_myLikeListLoading: false, // 마이페이지 찜목록
  st_myLikeListDone: false,
  st_myLikeListError: null,
  //
  st_artistCreateLoading: false, // 아티스템찜 추가
  st_artistCreateDone: false,
  st_artistCreateError: null,
  //
  st_artistDeleteLoading: false, // 아티스템찜 삭제
  st_artistDeleteDone: false,
  st_artistDeleteError: null,
  //
  st_albumCreateLoading: false, // 앨범 추가
  st_albumCreateDone: false,
  st_albumCreateError: null,
  //
  st_albumDeleteLoading: false, // 앨범 삭제
  st_albumDeleteDone: false,
  st_albumDeleteError: null,
  //
  st_trackCreateLoading: false, // track 추가
  st_trackCreateDone: false,
  st_trackCreateError: null,
  //
  st_trackDeleteLoading: false, // track 삭제
  st_trackDeleteDone: false,
  st_trackDeleteError: null,
};

export const MY_LIKE_LIST_REQUEST = "MY_LIKE_LIST_REQUEST";
export const MY_LIKE_LIST_SUCCESS = "MY_LIKE_LIST_SUCCESS";
export const MY_LIKE_LIST_FAILURE = "MY_LIKE_LIST_FAILURE";

export const ARTIST_CREATE_REQUEST = "ARTIST_CREATE_REQUEST";
export const ARTIST_CREATE_SUCCESS = "ARTIST_CREATE_SUCCESS";
export const ARTIST_CREATE_FAILURE = "ARTIST_CREATE_FAILURE";

export const ARTIST_DELETE_REQUEST = "ARTIST_DELETE_REQUEST";
export const ARTIST_DELETE_SUCCESS = "ARTIST_DELETE_SUCCESS";
export const ARTIST_DELETE_FAILURE = "ARTIST_DELETE_FAILURE";

export const ALBUM_CREATE_REQUEST = "ALBUM_CREATE_REQUEST";
export const ALBUM_CREATE_SUCCESS = "ALBUM_CREATE_SUCCESS";
export const ALBUM_CREATE_FAILURE = "ALBUM_CREATE_FAILURE";

export const ALBUM_DELETE_REQUEST = "ALBUM_DELETE_REQUEST";
export const ALBUM_DELETE_SUCCESS = "ALBUM_DELETE_SUCCESS";
export const ALBUM_DELETE_FAILURE = "ALBUM_DELETE_FAILURE";

export const TRACK_CREATE_REQUEST = "TRACK_CREATE_REQUEST";
export const TRACK_CREATE_SUCCESS = "TRACK_CREATE_SUCCESS";
export const TRACK_CREATE_FAILURE = "TRACK_CREATE_FAILURE";

export const TRACK_DELETE_REQUEST = "TRACK_DELETE_REQUEST";
export const TRACK_DELETE_SUCCESS = "TRACK_DELETE_SUCCESS";
export const TRACK_DELETE_FAILURE = "TRACK_DELETE_FAILURE";

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
        draft.lastPage = action.data.lastPage;
        break;
      }
      case MY_LIKE_LIST_FAILURE: {
        draft.st_myLikeListLoading = false;
        draft.st_myLikeListDone = false;
        draft.st_myLikeListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ARTIST_CREATE_REQUEST: {
        draft.st_artistCreateLoading = true;
        draft.st_artistCreateDone = false;
        draft.st_artistCreateError = null;
        break;
      }
      case ARTIST_CREATE_SUCCESS: {
        draft.st_artistCreateLoading = false;
        draft.st_artistCreateDone = true;
        draft.st_artistCreateError = null;

        break;
      }
      case ARTIST_CREATE_FAILURE: {
        draft.st_artistCreateLoading = false;
        draft.st_artistCreateDone = false;
        draft.st_artistCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ARTIST_DELETE_REQUEST: {
        draft.st_artistDeleteLoading = true;
        draft.st_artistDeleteDone = false;
        draft.st_artistDeleteError = null;
        break;
      }
      case ARTIST_DELETE_SUCCESS: {
        draft.st_artistDeleteLoading = false;
        draft.st_artistDeleteDone = true;
        draft.st_artistDeleteError = null;

        break;
      }
      case ARTIST_DELETE_FAILURE: {
        draft.st_artistDeleteLoading = false;
        draft.st_artistDeleteDone = false;
        draft.st_artistDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ALBUM_CREATE_REQUEST: {
        draft.st_albumCreateLoading = true;
        draft.st_albumCreateDone = false;
        draft.st_albumCreateError = null;
        break;
      }
      case ALBUM_CREATE_SUCCESS: {
        draft.st_albumCreateLoading = false;
        draft.st_albumCreateDone = true;
        draft.st_albumCreateError = null;

        break;
      }
      case ALBUM_CREATE_FAILURE: {
        draft.st_albumCreateLoading = false;
        draft.st_albumCreateDone = false;
        draft.st_albumCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ALBUM_DELETE_REQUEST: {
        draft.st_albumDeleteLoading = true;
        draft.st_albumDeleteDone = false;
        draft.st_albumDeleteError = null;
        break;
      }
      case ALBUM_DELETE_SUCCESS: {
        draft.st_albumDeleteLoading = false;
        draft.st_albumDeleteDone = true;
        draft.st_albumDeleteError = null;

        break;
      }
      case ALBUM_DELETE_FAILURE: {
        draft.st_albumDeleteLoading = false;
        draft.st_albumDeleteDone = false;
        draft.st_albumDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TRACK_CREATE_REQUEST: {
        draft.st_trackCreateLoading = true;
        draft.st_trackCreateDone = false;
        draft.st_trackCreateError = null;
        break;
      }
      case TRACK_CREATE_SUCCESS: {
        draft.st_trackCreateLoading = false;
        draft.st_trackCreateDone = true;
        draft.st_trackCreateError = null;

        break;
      }
      case TRACK_CREATE_FAILURE: {
        draft.st_trackCreateLoading = false;
        draft.st_trackCreateDone = false;
        draft.st_trackCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case TRACK_DELETE_REQUEST: {
        draft.st_trackDeleteLoading = true;
        draft.st_trackDeleteDone = false;
        draft.st_trackDeleteError = null;
        break;
      }
      case TRACK_DELETE_SUCCESS: {
        draft.st_trackDeleteLoading = false;
        draft.st_trackDeleteDone = true;
        draft.st_trackDeleteError = null;

        break;
      }
      case TRACK_DELETE_FAILURE: {
        draft.st_trackDeleteLoading = false;
        draft.st_trackDeleteDone = false;
        draft.st_trackDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
