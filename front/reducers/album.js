import produce from "../util/produce";

export const initailState = {
  albumImage: null,
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

export const ALBUM_IMAGE_RESET = "ALBUM_IMAGE_RESET";

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

      default:
        break;
    }
  });

export default reducer;
