import produce from "../util/produce";

export const initailState = {
  albumImage: null,
  albumFile: null,
  albumTrackFile: null,
  musictemList: [], // 뮤직템 리스트
  musictemPremiumAdminList: [], // 프리미엄 뮤직템 관리자 리스트
  musictemAdminList: [], // 뮤직템 관리자 리스트
  newMusictemList: [], // new 뮤직템 리스트
  trackAdminList: [], // 관리자 트랙 리스트
  topMusictemList: [], // top5 뮤직템 리스트
  myMusictemList: [], // 뮤직탬 판매량 많은순 리스트

  //   뮤직템디테일
  detailData: null,
  albums: null,
  //
  albumDetail: null, // 앨범 상세(정보)
  albumTrack: null, // 앨범 상세(트랙)
  albumCate: null, // 앨범 상세(카테고리)
  albumTag: null, // 앨범 상세(태그)

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
  //
  st_musictemListLoading: false, // 뮤직템 리스트
  st_musictemListDone: false,
  st_musictemListError: null,
  //
  st_musictemPremiumAdminListLoading: false, // 프리미엄 뮤직템 관리자 리스트
  st_musictemPremiumAdminListDone: false,
  st_musictemPremiumAdminListError: null,
  //
  st_musictemAdminListLoading: false, // 뮤직템 관리자 리스트
  st_musictemAdminListDone: false,
  st_musictemAdminListError: null,
  //
  st_newMusictemListLoading: false, // new 뮤직템 리스트
  st_newMusictemListDone: false,
  st_newMusictemListError: null,
  //
  st_albumDetailLoading: false, // 앨범 디테일
  st_albumDetailDone: false,
  st_albumDetailError: null,
  //
  st_trackAdminListLoading: false, // 트랙 관리자 리스트
  st_trackAdminListDone: false,
  st_trackAdminListError: null,
  //
  st_topMusictemListLoading: false, // top5 뮤직템 리스트
  st_topMusictemListDone: false,
  st_topMusictemListError: null,
  //
  st_albumDeleteLoading: false, // 앨범 삭제
  st_albumDeleteDone: false,
  st_albumDeleteError: null,
  //
  st_myMusictemTopSellListLoading: false, // 나의 뮤직템 판매량 많은순 리스트
  st_myMusictemTopSellListDone: false,
  st_myMusictemTopSellListError: null,
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

export const MUSICTEM_LIST_REQUEST = "MUSICTEM_LIST_REQUEST";
export const MUSICTEM_LIST_SUCCESS = "MUSICTEM_LIST_SUCCESS";
export const MUSICTEM_LIST_FAILURE = "MUSICTEM_LIST_FAILURE";

export const MUSICTEM_PREMIUM_ADMIN_LIST_REQUEST =
  "MUSICTEM_PREMIUM_ADMIN_LIST_REQUEST";
export const MUSICTEM_PREMIUM_ADMIN_LIST_SUCCESS =
  "MUSICTEM_PREMIUM_ADMIN_LIST_SUCCESS";
export const MUSICTEM_PREMIUM_ADMIN_LIST_FAILURE =
  "MUSICTEM_PREMIUM_ADMIN_LIST_FAILURE";

export const MUSICTEM_ADMIN_LIST_REQUEST = "MUSICTEM_ADMIN_LIST_REQUEST";
export const MUSICTEM_ADMIN_LIST_SUCCESS = "MUSICTEM_ADMIN_LIST_SUCCESS";
export const MUSICTEM_ADMIN_LIST_FAILURE = "MUSICTEM_ADMIN_LIST_FAILURE";

export const NEW_MUSICTEM_LIST_REQUEST = "NEW_MUSICTEM_LIST_REQUEST";
export const NEW_MUSICTEM_LIST_SUCCESS = "NEW_MUSICTEM_LIST_SUCCESS";
export const NEW_MUSICTEM_LIST_FAILURE = "NEW_MUSICTEM_LIST_FAILURE";

export const ALBUM_DETAIL_REQUEST = "ALBUM_DETAIL_REQUEST";
export const ALBUM_DETAIL_SUCCESS = "ALBUM_DETAIL_SUCCESS";
export const ALBUM_DETAIL_FAILURE = "ALBUM_DETAIL_FAILURE";

export const TRACK_ADMIN_LIST_REQUEST = "TRACK_ADMIN_LIST_REQUEST";
export const TRACK_ADMIN_LIST_SUCCESS = "TRACK_ADMIN_LIST_SUCCESS";
export const TRACK_ADMIN_LIST_FAILURE = "TRACK_ADMIN_LIST_FAILURE";

export const TOP_MUSICTEM_LIST_REQUEST = "TOP_MUSICTEM_LIST_REQUEST";
export const TOP_MUSICTEM_LIST_SUCCESS = "TOP_MUSICTEM_LIST_SUCCESS";
export const TOP_MUSICTEM_LIST_FAILURE = "TOP_MUSICTEM_LIST_FAILURE";

export const ALBUM_TRACK_DELETE_REQUEST = "ALBUM_TRACK_DELETE_REQUEST";
export const ALBUM_TRACK_DELETE_SUCCESS = "ALBUM_TRACK_DELETE_SUCCESS";
export const ALBUM_TRACK_DELETE_FAILURE = "ALBUM_TRACK_DELETE_FAILURE";

export const MY_MUSICTEM_TOP_SELL_LIST_REQUEST =
  "MY_MUSICTEM_TOP_SELL_LIST_REQUEST";
export const MY_MUSICTEM_TOP_SELL_LIST_SUCCESS =
  "MY_MUSICTEM_TOP_SELL_LIST_SUCCESS";
export const MY_MUSICTEM_TOP_SELL_LIST_FAILURE =
  "MY_MUSICTEM_TOP_SELL_LIST_FAILURE";

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
      case MUSICTEM_LIST_REQUEST: {
        draft.st_musictemListLoading = true;
        draft.st_musictemListDone = false;
        draft.st_musictemListError = null;
        break;
      }
      case MUSICTEM_LIST_SUCCESS: {
        draft.st_musictemListLoading = false;
        draft.st_musictemListDone = true;
        draft.st_musictemListError = null;
        draft.musictemList = action.data.musictems;
        break;
      }
      case MUSICTEM_LIST_FAILURE: {
        draft.st_musictemListLoading = false;
        draft.st_musictemListDone = false;
        draft.st_musictemListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case NEW_MUSICTEM_LIST_REQUEST: {
        draft.st_newMusictemListLoading = true;
        draft.st_newMusictemListDone = false;
        draft.st_newMusictemListError = null;
        break;
      }
      case NEW_MUSICTEM_LIST_SUCCESS: {
        draft.st_newMusictemListLoading = false;
        draft.st_newMusictemListDone = true;
        draft.st_newMusictemListError = null;
        draft.newMusictemList = action.data;
        break;
      }
      case NEW_MUSICTEM_LIST_FAILURE: {
        draft.st_newMusictemListLoading = false;
        draft.st_newMusictemListDone = false;
        draft.st_newMusictemListError = action.error;
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

      case ALBUM_DETAIL_REQUEST: {
        draft.st_albumDetailLoading = true;
        draft.st_albumDetailDone = false;
        draft.st_albumDetailError = null;
        break;
      }
      case ALBUM_DETAIL_SUCCESS: {
        draft.st_albumDetailLoading = false;
        draft.st_albumDetailDone = true;
        draft.st_albumDetailError = null;
        draft.albumDetail = action.data.detailData;
        draft.albumTrack = action.data.tracks;
        draft.albumCate = action.data.cates;
        draft.albumTag = action.data.tags;

        break;
      }
      case ALBUM_DETAIL_FAILURE: {
        draft.st_albumDetailLoading = false;
        draft.st_albumDetailDone = false;
        draft.st_albumDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case TRACK_ADMIN_LIST_REQUEST: {
        draft.st_trackAdminListLoading = true;
        draft.st_trackAdminListDone = false;
        draft.st_trackAdminListError = null;
        break;
      }
      case TRACK_ADMIN_LIST_SUCCESS: {
        draft.st_trackAdminListLoading = false;
        draft.st_trackAdminListDone = true;
        draft.st_trackAdminListError = null;
        draft.trackAdminList = action.data;

        break;
      }
      case TRACK_ADMIN_LIST_FAILURE: {
        draft.st_trackAdminListLoading = false;
        draft.st_trackAdminListDone = false;
        draft.st_trackAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case MUSICTEM_PREMIUM_ADMIN_LIST_REQUEST: {
        draft.st_musictemPremiumAdminListLoading = true;
        draft.st_musictemPremiumAdminListDone = false;
        draft.st_musictemPremiumAdminListError = null;
        break;
      }
      case MUSICTEM_PREMIUM_ADMIN_LIST_SUCCESS: {
        draft.st_musictemPremiumAdminListLoading = false;
        draft.st_musictemPremiumAdminListDone = true;
        draft.st_musictemPremiumAdminListError = null;
        draft.musictemPremiumAdminList = action.data;

        break;
      }
      case MUSICTEM_PREMIUM_ADMIN_LIST_FAILURE: {
        draft.st_musictemPremiumAdminListLoading = false;
        draft.st_musictemPremiumAdminListDone = false;
        draft.st_musictemPremiumAdminListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MUSICTEM_ADMIN_LIST_REQUEST: {
        draft.st_musictemAdminListLoading = true;
        draft.st_musictemAdminListDone = false;
        draft.st_musictemAdminListError = null;
        break;
      }
      case MUSICTEM_ADMIN_LIST_SUCCESS: {
        draft.st_musictemAdminListLoading = false;
        draft.st_musictemAdminListDone = true;
        draft.st_musictemAdminListError = null;
        draft.musictemAdminList = action.data;

        break;
      }
      case MUSICTEM_ADMIN_LIST_FAILURE: {
        draft.st_musictemAdminListLoading = false;
        draft.st_musictemAdminListDone = false;
        draft.st_musictemAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case TOP_MUSICTEM_LIST_REQUEST: {
        draft.st_topMusictemListLoading = true;
        draft.st_topMusictemListDone = false;
        draft.st_topMusictemListError = null;
        break;
      }
      case TOP_MUSICTEM_LIST_SUCCESS: {
        draft.st_topMusictemListLoading = false;
        draft.st_topMusictemListDone = true;
        draft.st_topMusictemListError = null;
        draft.topMusictemList = action.data;

        break;
      }
      case TOP_MUSICTEM_LIST_FAILURE: {
        draft.st_topMusictemListLoading = false;
        draft.st_topMusictemListDone = false;
        draft.st_topMusictemListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ALBUM_TRACK_DELETE_REQUEST: {
        draft.st_albumDeleteLoading = true;
        draft.st_albumDeleteDone = false;
        draft.st_albumDeleteError = null;
        break;
      }
      case ALBUM_TRACK_DELETE_SUCCESS: {
        draft.st_albumDeleteLoading = false;
        draft.st_albumDeleteDone = true;
        draft.st_albumDeleteError = null;

        break;
      }
      case ALBUM_TRACK_DELETE_FAILURE: {
        draft.st_albumDeleteLoading = false;
        draft.st_albumDeleteDone = false;
        draft.st_albumDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case MY_MUSICTEM_TOP_SELL_LIST_REQUEST: {
        draft.st_myMusictemTopSellListLoading = true;
        draft.st_myMusictemTopSellListDone = false;
        draft.st_myMusictemTopSellListError = null;
        break;
      }
      case MY_MUSICTEM_TOP_SELL_LIST_SUCCESS: {
        draft.st_myMusictemTopSellListLoading = false;
        draft.st_myMusictemTopSellListDone = true;
        draft.st_myMusictemTopSellListError = null;
        draft.myMusictemList = action.data;

        break;
      }
      case MY_MUSICTEM_TOP_SELL_LIST_FAILURE: {
        draft.st_myMusictemTopSellListLoading = false;
        draft.st_myMusictemTopSellListDone = false;
        draft.st_myMusictemTopSellListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
