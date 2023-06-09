import produce from "../util/produce";

export const initailState = {
  albumImage: null,
  albumFile: null,
  albumTrackFile: null,
  //   뮤직템디테일
  detailData: null,
  albums: null,
  //

  st_albumImageLoading: false, // album image
  st_albumImageDone: false,
  st_albumImageError: null,
  //
  st_albumCreateLoading: false, // album 생성하기
  st_albumCreateDone: false,
  st_albumCreateError: null,
  //
  st_albumPremiumCreateLoading: false, // album 프리미엄생성하기
  st_albumPremiumCreateDone: false,
  st_albumPremiumCreateError: null,
  //
  st_albumTrackCreateLoading: false, // album 수정하기
  st_albumTrackCreateDone: false,
  st_albumTrackCreateError: null,
  //
  st_albumTrackPermitLoading: false, // album 삭제하기
  st_albumTrackPermitDone: false,
  st_albumTrackPermitError: null,
  //
  st_musictemDetailLoading: false, // 뮤직템 디테일
  st_musictemDetailDone: false,
  st_musictemDetailError: null,
  //
  st_albumFileLoading: false, // 앨범 파일
  st_albumFileDone: false,
  st_albumFileError: null,
  //
  st_albumTrackFileLoading: false, // 앨범 트랙 파일
  st_albumTrackFileDone: false,
  st_albumTrackFileError: null,
};

export const ALBUM_IMAGE_REQUEST = "ALBUM_IMAGE_REQUEST";
export const ALBUM_IMAGE_SUCCESS = "ALBUM_IMAGE_SUCCESS";
export const ALBUM_IMAGE_FAILURE = "ALBUM_IMAGE_FAILURE";

export const ALBUM_CREATE_REQUEST = "ALBUM_CREATE_REQUEST";
export const ALBUM_CREATE_SUCCESS = "ALBUM_CREATE_SUCCESS";
export const ALBUM_CREATE_FAILURE = "ALBUM_CREATE_FAILURE";

export const ALBUM_PREMIUM_CREATE_REQUEST = "ALBUM_PREMIUM_CREATE_REQUEST";
export const ALBUM_PREMIUM_CREATE_SUCCESS = "ALBUM_PREMIUM_CREATE_SUCCESS";
export const ALBUM_PREMIUM_CREATE_FAILURE = "ALBUM_PREMIUM_CREATE_FAILURE";

export const ALBUM_TRACK_CREATE_REQUEST = "ALBUM_TRACK_CREATE_REQUEST";
export const ALBUM_TRACK_CREATE_SUCCESS = "ALBUM_TRACK_CREATE_SUCCESS";
export const ALBUM_TRACK_CREATE_FAILURE = "ALBUM_TRACK_CREATE_FAILURE";

export const ALBUM_TRACK_PERMIT_REQUEST = "ALBUM_TRACK_PERMIT_REQUEST";
export const ALBUM_TRACK_PERMIT_SUCCESS = "ALBUM_TRACK_PERMIT_SUCCESS";
export const ALBUM_TRACK_PERMIT_FAILURE = "ALBUM_TRACK_PERMIT_FAILURE";

export const MUSICTEM_DETAIL_REQUEST = "MUSICTEM_DETAIL_REQUEST";
export const MUSICTEM_DETAIL_SUCCESS = "MUSICTEM_DETAIL_SUCCESS";
export const MUSICTEM_DETAIL_FAILURE = "MUSICTEM_DETAIL_FAILURE";

export const ALBUM_FILE_REQUEST = "ALBUM_FILE_REQUEST";
export const ALBUM_FILE_SUCCESS = "ALBUM_FILE_SUCCESS";
export const ALBUM_FILE_FAILURE = "ALBUM_FILE_FAILURE";

export const ALBUM_TRACK_FILE_REQUEST = "ALBUM_TRACK_FILE_REQUEST";
export const ALBUM_TRACK_FILE_SUCCESS = "ALBUM_TRACK_FILE_SUCCESS";
export const ALBUM_TRACK_FILE_FAILURE = "ALBUM_TRACK_FILE_FAILURE";

export const ALBUM_IMAGE_RESET = "ALBUM_IMAGE_RESET";
export const ALBUM_FILE_RESET = "ALBUM_FILE_RESET";
export const ALBUM_TRACK_FILE_RESET = "ALBUM_TRACK_FILE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ALBUM_IMAGE_REQUEST: {
        draft.st_albumImageLoading = true;
        draft.st_albumImageDone = false;
        draft.st_albumImageError = null;
        break;
      }
      case ALBUM_IMAGE_SUCCESS: {
        draft.st_albumImageLoading = false;
        draft.st_albumImageDone = true;
        draft.st_albumImageError = null;
        draft.albumImage = action.data.path;
        break;
      }
      case ALBUM_IMAGE_FAILURE: {
        draft.st_albumImageLoading = false;
        draft.st_albumImageDone = false;
        draft.st_albumImageError = action.error;
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
      case ALBUM_PREMIUM_CREATE_REQUEST: {
        draft.st_albumPremiumCreateLoading = true;
        draft.st_albumPremiumCreateDone = false;
        draft.st_albumPremiumCreateError = null;
        break;
      }
      case ALBUM_PREMIUM_CREATE_SUCCESS: {
        draft.st_albumPremiumCreateLoading = false;
        draft.st_albumPremiumCreateDone = true;
        draft.st_albumPremiumCreateError = null;
        break;
      }
      case ALBUM_PREMIUM_CREATE_FAILURE: {
        draft.st_albumPremiumCreateLoading = false;
        draft.st_albumPremiumCreateDone = false;
        draft.st_albumPremiumCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ALBUM_TRACK_CREATE_REQUEST: {
        draft.st_albumTrackCreateLoading = true;
        draft.st_albumTrackCreateDone = false;
        draft.st_albumTrackCreateError = null;
        break;
      }
      case ALBUM_TRACK_CREATE_SUCCESS: {
        draft.st_albumTrackCreateLoading = false;
        draft.st_albumTrackCreateDone = true;
        draft.st_albumTrackCreateError = null;
        break;
      }
      case ALBUM_TRACK_CREATE_FAILURE: {
        draft.st_albumTrackCreateLoading = false;
        draft.st_albumTrackCreateDone = false;
        draft.st_albumTrackCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ALBUM_TRACK_PERMIT_REQUEST: {
        draft.st_albumTrackPermitLoading = true;
        draft.st_albumTrackPermitDone = false;
        draft.st_albumTrackPermitError = null;
        break;
      }
      case ALBUM_TRACK_PERMIT_SUCCESS: {
        draft.st_albumTrackPermitLoading = false;
        draft.st_albumTrackPermitDone = true;
        draft.st_albumTrackPermitError = null;
        break;
      }
      case ALBUM_TRACK_PERMIT_FAILURE: {
        draft.st_albumTrackPermitLoading = false;
        draft.st_albumTrackPermitDone = false;
        draft.st_albumTrackPermitError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case MUSICTEM_DETAIL_REQUEST: {
        draft.st_musictemDetailLoading = true;
        draft.st_musictemDetailDone = false;
        draft.st_musictemDetailError = null;
        break;
      }
      case MUSICTEM_DETAIL_SUCCESS: {
        draft.st_musictemDetailLoading = false;
        draft.st_musictemDetailDone = true;
        draft.st_musictemDetailError = null;
        draft.detailData = action.data.detailData;
        draft.albums = action.data.albums;
        break;
      }
      case MUSICTEM_DETAIL_FAILURE: {
        draft.st_musictemDetailLoading = false;
        draft.st_musictemDetailDone = false;
        draft.st_musictemDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ALBUM_FILE_REQUEST: {
        draft.st_albumFileLoading = true;
        draft.st_albumFileDone = false;
        draft.st_albumFileError = null;
        break;
      }
      case ALBUM_FILE_SUCCESS: {
        draft.st_albumFileLoading = false;
        draft.st_albumFileDone = true;
        draft.st_albumFileError = null;
        draft.albumFile = action.data.path;
        break;
      }
      case ALBUM_FILE_FAILURE: {
        draft.st_albumFileLoading = false;
        draft.st_albumFileDone = false;
        draft.st_albumFileError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ALBUM_TRACK_FILE_REQUEST: {
        draft.st_albumTrackFileLoading = true;
        draft.st_albumTrackFileDone = false;
        draft.st_albumTrackFileError = null;
        break;
      }
      case ALBUM_TRACK_FILE_SUCCESS: {
        draft.st_albumTrackFileLoading = false;
        draft.st_albumTrackFileDone = true;
        draft.st_albumTrackFileError = null;
        draft.albumTrackFile = action.data.path;
        break;
      }
      case ALBUM_TRACK_FILE_FAILURE: {
        draft.st_albumTrackFileLoading = false;
        draft.st_albumTrackFileDone = false;
        draft.st_albumTrackFileError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
