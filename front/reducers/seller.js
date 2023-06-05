import produce from "../util/produce";

export const initailState = {
  sellerList: [], // 관리자 판매자신청리스트
  sellerImage: null, // 판매자신청할때 이미지
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

export const SELLER_IMAGE_RESET = "SELLER_IMAGE_RESET";

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

      case SELLER_IMAGE_RESET: {
        draft.sellerImage = null;
      }

      default:
        break;
    }
  });

export default reducer;
