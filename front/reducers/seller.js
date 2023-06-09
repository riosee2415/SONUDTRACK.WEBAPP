import produce from "../util/produce";

export const initailState = {
  sellerList: [], // 관리자 판매자신청리스트
  sellerImage: null, // 판매자신청할때 이미지, 아티스템 프로필 등록
  artistemFile: null, // 아티스템 대표음원
  filmoImage: null, // 필모그래피 커버이미지
  filmoFile: null, // 필모그래피 파일
  artistemList: [], // 아티스템 리스트
  artistemDetail: [], // 아티스템 디테일
  //   아티스템 상세 조회
  artistemData: null,
  findCountryInfoData: [],
  findFilmInfoData: [],
  findCateInfoData: [],
  findTagInfoData: [],

  // 관리자 판매신청리스트
  st_sellerListLoading: false,
  st_sellerListDone: false,
  st_sellerListError: null,
  // 판매자 신청하기
  st_sellerCreateLoading: false,
  st_sellerCreateDone: false,
  st_sellerCreateError: null,
  // 판매자 승인하기
  st_sellerAdminPermitLoading: false,
  st_sellerAdminPermitDone: false,
  st_sellerAdminPermitError: null,
  // 아티스템 정보 조회하기
  st_artistemMyDataLoading: false,
  st_artistemMyDataDone: false,
  st_artistemMyDataError: null,
  // 아티스템 정보 수정하기
  st_artistemInfoUpdateLoading: false,
  st_artistemInfoUpdateDone: false,
  st_artistemInfoUpdateError: null,
  // 판매자 신청할때 이미지 업로드
  st_sellerImageLoading: false,
  st_sellerImageDone: false,
  st_sellerImageError: null,
  // 아티스템 대표음원
  st_artistemFileLoading: false,
  st_artistemFileDone: false,
  st_artistemFileError: null,
  // 필모그래피 커버이미지
  st_filmoCoverImageLoading: false,
  st_filmoCoverImageDone: false,
  st_filmoCoverImageError: null,
  // 필모그래피 음원
  st_filmoMusicLoading: false,
  st_filmoMusicDone: false,
  st_filmoMusicError: null,
  // 아티스템 리스트
  st_artistemListLoading: false,
  st_artistemListDone: false,
  st_artistemListError: null,
  // 아티스템 디테일
  st_artistemDetailLoading: false,
  st_artistemDetailDone: false,
  st_artistemDetailError: null,
  // 뮤직템 정보수정
  st_musicTemInfoUpdateLoading: false,
  st_musicTemInfoUpdateDone: false,
  st_musicTemInfoUpdateError: null,
};

export const SELLER_LIST_REQUEST = "SELLER_LIST_REQUEST";
export const SELLER_LIST_SUCCESS = "SELLER_LIST_SUCCESS";
export const SELLER_LIST_FAILURE = "SELLER_LIST_FAILURE";

export const SELLER_CREATE_REQUEST = "SELLER_CREATE_REQUEST";
export const SELLER_CREATE_SUCCESS = "SELLER_CREATE_SUCCESS";
export const SELLER_CREATE_FAILURE = "SELLER_CREATE_FAILURE";

export const SELLER_ADMIN_PERMIT_REQUEST = "SELLER_ADMIN_PERMIT_REQUEST";
export const SELLER_ADMIN_PERMIT_SUCCESS = "SELLER_ADMIN_PERMIT_SUCCESS";
export const SELLER_ADMIN_PERMIT_FAILURE = "SELLER_ADMIN_PERMIT_FAILURE";

export const ARTISTEM_MY_DATA_REQUEST = "ARTISTEM_MY_DATA_REQUEST";
export const ARTISTEM_MY_DATA_SUCCESS = "ARTISTEM_MY_DATA_SUCCESS";
export const ARTISTEM_MY_DATA_FAILURE = "ARTISTEM_MY_DATA_FAILURE";

export const ARTISTEM_INFO_UPDATE_REQUEST = "ARTISTEM_INFO_UPDATE_REQUEST";
export const ARTISTEM_INFO_UPDATE_SUCCESS = "ARTISTEM_INFO_UPDATE_SUCCESS";
export const ARTISTEM_INFO_UPDATE_FAILURE = "ARTISTEM_INFO_UPDATE_FAILURE";

export const SELLER_IMAGE_REQUEST = "SELLER_IMAGE_REQUEST";
export const SELLER_IMAGE_SUCCESS = "SELLER_IMAGE_SUCCESS";
export const SELLER_IMAGE_FAILURE = "SELLER_IMAGE_FAILURE";

export const ARTISTEM_FILE_REQUEST = "ARTISTEM_FILE_REQUEST";
export const ARTISTEM_FILE_SUCCESS = "ARTISTEM_FILE_SUCCESS";
export const ARTISTEM_FILE_FAILURE = "ARTISTEM_FILE_FAILURE";

export const FILMO_COVER_IMAGE_REQUEST = "FILMO_COVER_IMAGE_REQUEST";
export const FILMO_COVER_IMAGE_SUCCESS = "FILMO_COVER_IMAGE_SUCCESS";
export const FILMO_COVER_IMAGE_FAILURE = "FILMO_COVER_IMAGE_FAILURE";

export const FILMO_MUSIC_REQUEST = "FILMO_MUSIC_REQUEST";
export const FILMO_MUSIC_SUCCESS = "FILMO_MUSIC_SUCCESS";
export const FILMO_MUSIC_FAILURE = "FILMO_MUSIC_FAILURE";

export const ARTISTEM_LIST_REQUEST = "ARTISTEM_LIST_REQUEST";
export const ARTISTEM_LIST_SUCCESS = "ARTISTEM_LIST_SUCCESS";
export const ARTISTEM_LIST_FAILURE = "ARTISTEM_LIST_FAILURE";

export const ARTISTEM_DETAIL_REQUEST = "ARTISTEM_DETAIL_REQUEST";
export const ARTISTEM_DETAIL_SUCCESS = "ARTISTEM_DETAIL_SUCCESS";
export const ARTISTEM_DETAIL_FAILURE = "ARTISTEM_DETAIL_FAILURE";

export const MUSICTEM_INFO_UPDATE_REQUEST = "MUSICTEM_INFO_UPDATE_REQUEST";
export const MUSICTEM_INFO_UPDATE_SUCCESS = "MUSICTEM_INFO_UPDATE_SUCCESS";
export const MUSICTEM_INFO_UPDATE_FAILURE = "MUSICTEM_INFO_UPDATE_FAILURE";

export const SELLER_IMAGE_RESET = "SELLER_IMAGE_RESET";
export const ARTISTEM_FILE_RESET = "ARTISTEM_FILE_RESET";
export const FILMO_COVER_IMAGE_RESET = "FILMO_COVER_IMAGE_RESET";
export const FIMO_MUSIC_RESET = "FIMO_MUSIC_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SELLER_LIST_REQUEST: {
        draft.st_sellerListLoading = true;
        draft.st_sellerListDone = false;
        draft.st_sellerListError = null;
        break;
      }
      case SELLER_LIST_SUCCESS: {
        draft.st_sellerListLoading = false;
        draft.st_sellerListDone = true;
        draft.st_sellerListError = null;
        draft.sellerList = action.data;
        break;
      }
      case SELLER_LIST_FAILURE: {
        draft.st_sellerListLoading = false;
        draft.st_sellerListDone = false;
        draft.st_sellerListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case SELLER_CREATE_REQUEST: {
        draft.st_sellerCreateLoading = true;
        draft.st_sellerCreateDone = false;
        draft.st_sellerCreateError = null;
        break;
      }
      case SELLER_CREATE_SUCCESS: {
        draft.st_sellerCreateLoading = false;
        draft.st_sellerCreateDone = true;
        draft.st_sellerCreateError = null;
        break;
      }
      case SELLER_CREATE_FAILURE: {
        draft.st_sellerCreateLoading = false;
        draft.st_sellerCreateDone = false;
        draft.st_sellerCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case SELLER_ADMIN_PERMIT_REQUEST: {
        draft.st_adminPermitLoading = true;
        draft.st_adminPermitDone = false;
        draft.st_adminPermitError = null;
        break;
      }
      case SELLER_ADMIN_PERMIT_SUCCESS: {
        draft.st_adminPermitLoading = false;
        draft.st_adminPermitDone = true;
        draft.st_adminPermitError = null;
        draft.artistemData = action.data.artistemData;
        draft.findCountryInfoData = action.data.findCountryInfoData;
        draft.findFilmInfoData = action.data.findFilmInfoData;
        draft.findCateInfoData = action.data.findCateInfoData;
        draft.findTagInfoData = action.data.findTagInfoData;
        break;
      }
      case SELLER_ADMIN_PERMIT_FAILURE: {
        draft.st_adminPermitLoading = false;
        draft.st_adminPermitDone = false;
        draft.st_adminPermitError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case ARTISTEM_MY_DATA_REQUEST: {
        draft.st_artistemMyDataLoading = true;
        draft.st_artistemMyDataDone = false;
        draft.st_artistemMyDataError = null;
        break;
      }
      case ARTISTEM_MY_DATA_SUCCESS: {
        draft.st_artistemMyDataLoading = false;
        draft.st_artistemMyDataDone = true;
        draft.st_artistemMyDataError = null;
        draft.artistemData = action.data.artistemData;
        draft.findCountryInfoData = action.data.findCountryInfoData;
        draft.findFilmInfoData = action.data.findFilmInfoData;
        draft.findCateInfoData = action.data.findCateInfoData;
        draft.findTagInfoData = action.data.findTagInfoData;
        break;
      }
      case ARTISTEM_MY_DATA_FAILURE: {
        draft.st_artistemMyDataLoading = false;
        draft.st_artistemMyDataDone = false;
        draft.st_artistemMyDataError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case ARTISTEM_INFO_UPDATE_REQUEST: {
        draft.st_artistemInfoUpdateLoading = true;
        draft.st_artistemInfoUpdateDone = false;
        draft.st_artistemInfoUpdateError = null;
        break;
      }
      case ARTISTEM_INFO_UPDATE_SUCCESS: {
        draft.st_artistemInfoUpdateLoading = false;
        draft.st_artistemInfoUpdateDone = true;
        draft.st_artistemInfoUpdateError = null;
        break;
      }
      case ARTISTEM_INFO_UPDATE_FAILURE: {
        draft.st_artistemInfoUpdateLoading = false;
        draft.st_artistemInfoUpdateDone = false;
        draft.st_artistemInfoUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case SELLER_IMAGE_REQUEST: {
        draft.st_sellerImageLoading = true;
        draft.st_sellerImageDone = false;
        draft.st_sellerImageError = null;
        break;
      }
      case SELLER_IMAGE_SUCCESS: {
        draft.st_sellerImageLoading = false;
        draft.st_sellerImageDone = true;
        draft.st_sellerImageError = null;
        draft.sellerImage = action.data.path;
        break;
      }
      case SELLER_IMAGE_FAILURE: {
        draft.st_sellerImageLoading = false;
        draft.st_sellerImageDone = false;
        draft.st_sellerImageError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case ARTISTEM_FILE_REQUEST: {
        draft.st_artistemFileLoading = true;
        draft.st_artistemFileDone = false;
        draft.st_artistemFileError = null;
        break;
      }
      case ARTISTEM_FILE_SUCCESS: {
        draft.st_artistemFileLoading = false;
        draft.st_artistemFileDone = true;
        draft.st_artistemFileError = null;
        draft.artistemFile = action.data.path;
        break;
      }
      case ARTISTEM_FILE_FAILURE: {
        draft.st_artistemFileLoading = false;
        draft.st_artistemFileDone = false;
        draft.st_artistemFileError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case FILMO_COVER_IMAGE_REQUEST: {
        draft.st_filemoCoverImageLoading = true;
        draft.st_filemoCoverImageDone = false;
        draft.st_filemoCoverImageError = null;
        break;
      }
      case FILMO_COVER_IMAGE_SUCCESS: {
        draft.st_filemoCoverImageLoading = false;
        draft.st_filemoCoverImageDone = true;
        draft.st_filemoCoverImageError = null;
        draft.filmoImage = action.data.path;
        break;
      }
      case FILMO_COVER_IMAGE_FAILURE: {
        draft.st_filemoCoverImageLoading = false;
        draft.st_filemoCoverImageDone = false;
        draft.st_filemoCoverImageError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case FILMO_MUSIC_REQUEST: {
        draft.st_filmoMusicLoading = true;
        draft.st_filmoMusicDone = false;
        draft.st_filmoMusicError = null;
        break;
      }
      case FILMO_MUSIC_SUCCESS: {
        draft.st_filmoMusicLoading = false;
        draft.st_filmoMusicDone = true;
        draft.st_filmoMusicError = null;
        draft.filmoFile = action.data.path;
        break;
      }
      case FILMO_MUSIC_FAILURE: {
        draft.st_filmoMusicLoading = false;
        draft.st_filmoMusicDone = false;
        draft.st_filmoMusicError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
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
        draft.artistemList = action.data;
        break;
      }
      case ARTISTEM_LIST_FAILURE: {
        draft.st_artistemListLoading = false;
        draft.st_artistemListDone = false;
        draft.st_artistemListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
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
        draft.artistemData = action.data.artistemData;
        break;
      }
      case ARTISTEM_DETAIL_FAILURE: {
        draft.st_artistemDetailLoading = false;
        draft.st_artistemDetailDone = false;
        draft.st_artistemDetailError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MUSICTEM_INFO_UPDATE_REQUEST: {
        draft.st_musictemInfoUpdateLoading = true;
        draft.st_musictemInfoUpdateDone = false;
        draft.st_musictemInfoUpdateError = null;
        break;
      }
      case MUSICTEM_INFO_UPDATE_SUCCESS: {
        draft.st_musictemInfoUpdateLoading = false;
        draft.st_musictemInfoUpdateDone = true;
        draft.st_musictemInfoUpdateError = null;
        break;
      }
      case MUSICTEM_INFO_UPDATE_FAILURE: {
        draft.st_musictemInfoUpdateLoading = false;
        draft.st_musictemInfoUpdateDone = false;
        draft.st_musictemInfoUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case SELLER_IMAGE_RESET: {
        draft.sellerImage = null;
      }

      case ARTISTEM_FILE_RESET: {
        draft.artistemFile = null;
      }

      case FILMO_COVER_IMAGE_RESET: {
        draft.filmoImage = null;
      }

      case FIMO_MUSIC_RESET: {
        draft.filmoFile = null;
      }

      default:
        break;
    }
  });

export default reducer;
