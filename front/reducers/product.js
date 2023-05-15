import produce from "../util/produce";

export const initailState = {
  categorys: [],
  products: [],
  targetTags: [],
  targetGens: [],
  targetAllGens: [],
  trackList: [],
  trackAllList: [],
  trackRecentList: [],
  trackLength: 0,
  commonTags: [],
  trackDetail: null,
  myProducts: [],
  coverPath: null,
  agreementPath: null,
  trackThumbnailPath: null,
  trackUploadPath: null,
  trackTypeList: [],
  productDetail: null,
  productArtist: null,
  productAlbumList: [],
  productTrackList: [],
  productTrackSellDesc: [],

  st_categoryLoading: false,
  st_categoryDone: false,
  st_categoryError: null,
  //
  st_categoryNewLoading: false,
  st_categoryNewDone: false,
  st_categoryNewError: null,
  //
  st_categoryModifyLoading: false,
  st_categoryModifyDone: false,
  st_categoryModifyError: null,
  //
  st_categoryDeleteLoading: false,
  st_categoryDeleteDone: false,
  st_categoryDeleteError: null,
  //
  st_productMyListLoading: false,
  st_productMyListDone: false,
  st_productMyListError: null,
  //
  st_productListLoading: false,
  st_productListDone: false,
  st_productListError: null,
  //
  st_productCreateLoading: false,
  st_productCreateDone: false,
  st_productCreateError: null,
  //
  st_productIngLoading: false,
  st_productIngDone: false,
  st_productIngError: null,
  //
  st_productTopLoading: false,
  st_productTopDone: false,
  st_productTopError: null,
  //
  st_productTagLoading: false,
  st_productTagDone: false,
  st_productTagError: null,
  //
  st_productGenLoading: false,
  st_productGenDone: false,
  st_productGenError: null,
  //
  st_productTrackListLoading: false,
  st_productTrackListDone: false,
  st_productTrackListError: null,
  //
  st_productTrackAllListLoading: false,
  st_productTrackAllListDone: false,
  st_productTrackAllListError: null,
  //
  st_commonTagNewLoading: false,
  st_commonTagNewDone: false,
  st_commonTagNewError: null,
  //
  st_commonTagListLoading: false,
  st_commonTagListDone: false,
  st_commonTagListError: null,
  //
  st_commonTagModifyLoading: false,
  st_commonTagModifyDone: false,
  st_commonTagModifyError: null,
  //
  st_commonTagDeleteLoading: false,
  st_commonTagDeleteDone: false,
  st_commonTagDeleteError: null,
  //
  st_productTrackDetailLoading: false,
  st_productTrackDetailDone: false,
  st_productTrackDetailError: null,
  //
  st_productTrackRecentLoading: false,
  st_productTrackRecentDone: false,
  st_productTrackRecentError: null,
  //
  st_productCoverUploadLoading: false,
  st_productCoverUploadDone: false,
  st_productCoverUploadError: null,
  //
  st_productAgreementUploadLoading: false,
  st_productAgreementUploadDone: false,
  st_productAgreementUploadError: null,
  //
  st_productTrackCreateLoading: false,
  st_productTrackCreateDone: false,
  st_productTrackCreateError: null,
  //
  st_productTrackThumbnailUploadLoading: false,
  st_productTrackThumbnailUploadDone: false,
  st_productTrackThumbnailUploadError: null,
  //
  st_productTrackUploadLoading: false,
  st_productTrackUploadDone: false,
  st_productTrackUploadError: null,
  //
  st_productTrackTypeListLoading: false,
  st_productTrackTypeListDone: false,
  st_productTrackTypeListError: null,
  //
  st_productTrackIsOkLoading: false,
  st_productTrackIsOkDone: false,
  st_productTrackIsOkError: null,
  //
  st_productTrackIsRejectLoading: false,
  st_productTrackIsRejectDone: false,
  st_productTrackIsRejectError: null,
  //
  st_productDetailLoading: false,
  st_productDetailDone: false,
  st_productDetailError: null,
  //
  st_productAlbumDetailLoading: false,
  st_productAlbumDetailDone: false,
  st_productAlbumDetailError: null,
  //
  st_productTrackSellDescLoading: false,
  st_productTrackSellDescDone: false,
  st_productTrackSellDescError: null,
};

export const CATEGORY_LIST_REQUEST = "CATEGORY_LIST_REQUEST";
export const CATEGORY_LIST_SUCCESS = "CATEGORY_LIST_SUCCESS";
export const CATEGORY_LIST_FAILURE = "CATEGORY_LIST_FAILURE";

export const CATEGORY_NEW_REQUEST = "CATEGORY_NEW_REQUEST";
export const CATEGORY_NEW_SUCCESS = "CATEGORY_NEW_SUCCESS";
export const CATEGORY_NEW_FAILURE = "CATEGORY_NEW_FAILURE";

export const CATEGORY_MODIFY_REQUEST = "CATEGORY_MODIFY_REQUEST";
export const CATEGORY_MODIFY_SUCCESS = "CATEGORY_MODIFY_SUCCESS";
export const CATEGORY_MODIFY_FAILURE = "CATEGORY_MODIFY_FAILURE";

export const CATEGORY_DEL_REQUEST = "CATEGORY_DEL_REQUEST";
export const CATEGORY_DEL_SUCCESS = "CATEGORY_DEL_SUCCESS";
export const CATEGORY_DEL_FAILURE = "CATEGORY_DEL_FAILURE";

export const PRODUCT_MYLIST_REQUEST = "PRODUCT_MYLIST_REQUEST";
export const PRODUCT_MYLIST_SUCCESS = "PRODUCT_MYLIST_SUCCESS";
export const PRODUCT_MYLIST_FAILURE = "PRODUCT_MYLIST_FAILURE";

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";

export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAILURE = "PRODUCT_CREATE_FAILURE";

export const PRODUCT_ING_REQUEST = "PRODUCT_ING_REQUEST";
export const PRODUCT_ING_SUCCESS = "PRODUCT_ING_SUCCESS";
export const PRODUCT_ING_FAILURE = "PRODUCT_ING_FAILURE";

export const PRODUCT_TOP_REQUEST = "PRODUCT_TOP_REQUEST";
export const PRODUCT_TOP_SUCCESS = "PRODUCT_TOP_SUCCESS";
export const PRODUCT_TOP_FAILURE = "PRODUCT_TOP_FAILURE";

export const PRODUCT_TAG_REQUEST = "PRODUCT_TAG_REQUEST";
export const PRODUCT_TAG_SUCCESS = "PRODUCT_TAG_SUCCESS";
export const PRODUCT_TAG_FAILURE = "PRODUCT_TAG_FAILURE";

export const PRODUCT_GEN_REQUEST = "PRODUCT_GEN_REQUEST";
export const PRODUCT_GEN_SUCCESS = "PRODUCT_GEN_SUCCESS";
export const PRODUCT_GEN_FAILURE = "PRODUCT_GEN_FAILURE";

export const PRODUCT_GEN_ALL_REQUEST = "PRODUCT_GEN_ALL_REQUEST";
export const PRODUCT_GEN_ALL_SUCCESS = "PRODUCT_GEN_ALL_SUCCESS";
export const PRODUCT_GEN_ALL_FAILURE = "PRODUCT_GEN_ALL_FAILURE";

export const PRODUCT_TRACK_LIST_REQUEST = "PRODUCT_TRACK_LIST_REQUEST";
export const PRODUCT_TRACK_LIST_SUCCESS = "PRODUCT_TRACK_LIST_SUCCESS";
export const PRODUCT_TRACK_LIST_FAILURE = "PRODUCT_TRACK_LIST_FAILURE";

export const PRODUCT_TRACK_ALL_LIST_REQUEST = "PRODUCT_TRACK_ALL_LIST_REQUEST";
export const PRODUCT_TRACK_ALL_LIST_SUCCESS = "PRODUCT_TRACK_ALL_LIST_SUCCESS";
export const PRODUCT_TRACK_ALL_LIST_FAILURE = "PRODUCT_TRACK_ALL_LIST_FAILURE";

export const COMMON_TAG_NEW_REQUEST = "COMMON_TAG_NEW_REQUEST";
export const COMMON_TAG_NEW_SUCCESS = "COMMON_TAG_NEW_SUCCESS";
export const COMMON_TAG_NEW_FAILURE = "COMMON_TAG_NEW_FAILURE";

export const COMMON_TAG_LIST_REQUEST = "COMMON_TAG_LIST_REQUEST";
export const COMMON_TAG_LIST_SUCCESS = "COMMON_TAG_LIST_SUCCESS";
export const COMMON_TAG_LIST_FAILURE = "COMMON_TAG_LIST_FAILURE";

export const COMMON_TAG_MODIFY_REQUEST = "COMMON_TAG_MODIFY_REQUEST";
export const COMMON_TAG_MODIFY_SUCCESS = "COMMON_TAG_MODIFY_SUCCESS";
export const COMMON_TAG_MODIFY_FAILURE = "COMMON_TAG_MODIFY_FAILURE";

export const COMMON_TAG_DELETE_REQUEST = "COMMON_TAG_DELETE_REQUEST";
export const COMMON_TAG_DELETE_SUCCESS = "COMMON_TAG_DELETE_SUCCESS";
export const COMMON_TAG_DELETE_FAILURE = "COMMON_TAG_DELETE_FAILURE";

export const PRODUCT_TRACK_DETAIL_REQUEST = "PRODUCT_TRACK_DETAIL_REQUEST";
export const PRODUCT_TRACK_DETAIL_SUCCESS = "PRODUCT_TRACK_DETAIL_SUCCESS";
export const PRODUCT_TRACK_DETAIL_FAILURE = "PRODUCT_TRACK_DETAIL_FAILURE";

export const PRODUCT_TRACK_RECENT_REQUEST = "PRODUCT_TRACK_RECENT_REQUEST";
export const PRODUCT_TRACK_RECENT_SUCCESS = "PRODUCT_TRACK_RECENT_SUCCESS";
export const PRODUCT_TRACK_RECENT_FAILURE = "PRODUCT_TRACK_RECENT_FAILURE";

export const PRODUCT_TRACK_CREATE_REQUEST = "PRODUCT_TRACK_CREATE_REQUEST";
export const PRODUCT_TRACK_CREATE_SUCCESS = "PRODUCT_TRACK_CREATE_SUCCESS";
export const PRODUCT_TRACK_CREATE_FAILURE = "PRODUCT_TRACK_CREATE_FAILURE";

export const PRODUCT_COVER_UPLOAD_REQUEST = "PRODUCT_COVER_UPLOAD_REQUEST";
export const PRODUCT_COVER_UPLOAD_SUCCESS = "PRODUCT_COVER_UPLOAD_SUCCESS";
export const PRODUCT_COVER_UPLOAD_FAILURE = "PRODUCT_COVER_UPLOAD_FAILURE";

export const PRODUCT_AGREEMENT_UPLOAD_REQUEST =
  "PRODUCT_AGREEMENT_UPLOAD_REQUEST";
export const PRODUCT_AGREEMENT_UPLOAD_SUCCESS =
  "PRODUCT_AGREEMENT_UPLOAD_SUCCESS";
export const PRODUCT_AGREEMENT_UPLOAD_FAILURE =
  "PRODUCT_AGREEMENT_UPLOAD_FAILURE";

export const PRODUCT_TRACK_THUMBNAIL_UPLOAD_REQUEST =
  "PRODUCT_TRACK_THUMBNAIL_UPLOAD_REQUEST";
export const PRODUCT_TRACK_THUMBNAIL_UPLOAD_SUCCESS =
  "PRODUCT_TRACK_THUMBNAIL_UPLOAD_SUCCESS";
export const PRODUCT_TRACK_THUMBNAIL_UPLOAD_FAILURE =
  "PRODUCT_TRACK_THUMBNAIL_UPLOAD_FAILURE";

export const PRODUCT_TRACK_UPLOAD_REQUEST = "PRODUCT_TRACK_UPLOAD_REQUEST";
export const PRODUCT_TRACK_UPLOAD_SUCCESS = "PRODUCT_TRACK_UPLOAD_SUCCESS";
export const PRODUCT_TRACK_UPLOAD_FAILURE = "PRODUCT_TRACK_UPLOAD_FAILURE";

export const PRODUCT_TRACK_TYPELIST_REQUEST = "PRODUCT_TRACK_TYPELIST_REQUEST";
export const PRODUCT_TRACK_TYPELIST_SUCCESS = "PRODUCT_TRACK_TYPELIST_SUCCESS";
export const PRODUCT_TRACK_TYPELIST_FAILURE = "PRODUCT_TRACK_TYPELIST_FAILURE";

export const PRODUCT_TRACK_ISOK_REQUEST = "PRODUCT_TRACK_ISOK_REQUEST";
export const PRODUCT_TRACK_ISOK_SUCCESS = "PRODUCT_TRACK_ISOK_SUCCESS";
export const PRODUCT_TRACK_ISOK_FAILURE = "PRODUCT_TRACK_ISOK_FAILURE";

export const PRODUCT_TRACK_ISREJECT_REQUEST = "PRODUCT_TRACK_ISREJECT_REQUEST";
export const PRODUCT_TRACK_ISREJECT_SUCCESS = "PRODUCT_TRACK_ISREJECT_SUCCESS";
export const PRODUCT_TRACK_ISREJECT_FAILURE = "PRODUCT_TRACK_ISREJECT_FAILURE";

export const PRODUCT_ALBUM_DETAIL_REQUEST = "PRODUCT_ALBUM_DETAIL_REQUEST";
export const PRODUCT_ALBUM_DETAIL_SUCCESS = "PRODUCT_ALBUM_DETAIL_SUCCESS";
export const PRODUCT_ALBUM_DETAIL_FAILURE = "PRODUCT_ALBUM_DETAIL_FAILURE";

export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAILURE = "PRODUCT_DETAIL_FAILURE";

export const PRODUCT_TRACK_SELLDESC_REQUEST = "PRODUCT_TRACK_SELLDESC_REQUEST";
export const PRODUCT_TRACK_SELLDESC_SUCCESS = "PRODUCT_TRACK_SELLDESC_SUCCESS";
export const PRODUCT_TRACK_SELLDESC_FAILURE = "PRODUCT_TRACK_SELLDESC_FAILURE";

export const PRODUCT_TRACK_FILE_RESET = "PRODUCT_TRACK_FILE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST: {
        draft.st_categQoryLoading = true;
        draft.st_categoryDone = false;
        draft.st_categoryError = null;
        break;
      }
      case CATEGORY_LIST_SUCCESS: {
        draft.st_categQoryLoading = false;
        draft.st_categoryDone = true;
        draft.st_categoryError = null;
        draft.categorys = action.data;
        break;
      }
      case CATEGORY_LIST_FAILURE: {
        draft.st_categQoryLoading = false;
        draft.st_categoryDone = false;
        draft.st_categoryError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case CATEGORY_NEW_REQUEST: {
        draft.st_categoryNewLoading = true;
        draft.st_categoryNewDone = false;
        draft.st_categoryNewError = null;
        break;
      }
      case CATEGORY_NEW_SUCCESS: {
        draft.st_categoryNewLoading = false;
        draft.st_categoryNewDone = true;
        draft.st_categoryNewError = null;
        break;
      }
      case CATEGORY_NEW_FAILURE: {
        draft.st_categoryNewLoading = false;
        draft.st_categoryNewDone = false;
        draft.st_categoryNewError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case CATEGORY_MODIFY_REQUEST: {
        draft.st_categoryModifyLoading = true;
        draft.st_categoryModifyDone = false;
        draft.st_categoryModifyError = null;
        break;
      }
      case CATEGORY_MODIFY_SUCCESS: {
        draft.st_categoryModifyLoading = false;
        draft.st_categoryModifyDone = true;
        draft.st_categoryModifyError = null;
        break;
      }
      case CATEGORY_MODIFY_FAILURE: {
        draft.st_categoryModifyLoading = false;
        draft.st_categoryModifyDone = false;
        draft.st_categoryModifyError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case CATEGORY_DEL_REQUEST: {
        draft.st_categoryDeleteLoading = true;
        draft.st_categoryDeleteDone = false;
        draft.st_categoryDeleteError = null;
        break;
      }
      case CATEGORY_DEL_SUCCESS: {
        draft.st_categoryDeleteLoading = false;
        draft.st_categoryDeleteDone = true;
        draft.st_categoryDeleteError = null;
        break;
      }
      case CATEGORY_DEL_FAILURE: {
        draft.st_categoryDeleteLoading = false;
        draft.st_categoryDeleteDone = false;
        draft.st_categoryDeleteError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_MYLIST_REQUEST: {
        draft.st_productMyListLoading = true;
        draft.st_productMyListDone = false;
        draft.st_productMyListError = null;
        break;
      }
      case PRODUCT_MYLIST_SUCCESS: {
        draft.st_productMyListLoading = false;
        draft.st_productMyListDone = true;
        draft.st_productMyListError = null;
        draft.myProducts = action.data;
        break;
      }
      case PRODUCT_MYLIST_FAILURE: {
        draft.st_productMyListLoading = false;
        draft.st_productMyListDone = false;
        draft.st_productMyListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_LIST_REQUEST: {
        draft.st_productListLoading = true;
        draft.st_productListDone = false;
        draft.st_productListError = null;
        break;
      }
      case PRODUCT_LIST_SUCCESS: {
        draft.st_productListLoading = false;
        draft.st_productListDone = true;
        draft.st_productListError = null;
        draft.products = action.data;
        break;
      }
      case PRODUCT_LIST_FAILURE: {
        draft.st_productListLoading = false;
        draft.st_productListDone = false;
        draft.st_productListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_CREATE_REQUEST: {
        draft.st_productCreateLoading = true;
        draft.st_productCreateDone = false;
        draft.st_productCreateError = null;
        break;
      }
      case PRODUCT_CREATE_SUCCESS: {
        draft.st_productCreateLoading = false;
        draft.st_productCreateDone = true;
        draft.st_productCreateError = null;
        break;
      }
      case PRODUCT_CREATE_FAILURE: {
        draft.st_productCreateLoading = false;
        draft.st_productCreateDone = false;
        draft.st_productCreateError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_ING_REQUEST: {
        draft.st_productIngLoading = true;
        draft.st_productIngDone = false;
        draft.st_productIngError = null;
        break;
      }
      case PRODUCT_ING_SUCCESS: {
        draft.st_productIngLoading = false;
        draft.st_productIngDone = true;
        draft.st_productIngError = null;
        break;
      }
      case PRODUCT_ING_FAILURE: {
        draft.st_productIngLoading = false;
        draft.st_productIngDone = false;
        draft.st_productIngError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TOP_REQUEST: {
        draft.st_productTopLoading = true;
        draft.st_productTopDone = false;
        draft.st_productTopError = null;
        break;
      }
      case PRODUCT_TOP_SUCCESS: {
        draft.st_productTopLoading = false;
        draft.st_productTopDone = true;
        draft.st_productTopError = null;
        break;
      }
      case PRODUCT_TOP_FAILURE: {
        draft.st_productTopLoading = false;
        draft.st_productTopDone = false;
        draft.st_productTopError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TAG_REQUEST: {
        draft.st_productTagLoading = true;
        draft.st_productTagDone = false;
        draft.st_productTagError = null;
        break;
      }
      case PRODUCT_TAG_SUCCESS: {
        draft.st_productTagLoading = false;
        draft.st_productTagDone = true;
        draft.st_productTagError = null;
        draft.targetTags = action.data;
        break;
      }
      case PRODUCT_TAG_FAILURE: {
        draft.st_productTagLoading = false;
        draft.st_productTagDone = false;
        draft.st_productTagError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_GEN_REQUEST: {
        draft.st_productGenLoading = true;
        draft.st_productGenDone = false;
        draft.st_productGenError = null;
        break;
      }
      case PRODUCT_GEN_SUCCESS: {
        draft.st_productGenLoading = false;
        draft.st_productGenDone = true;
        draft.st_productGenError = null;
        draft.targetGens = action.data;
        break;
      }
      case PRODUCT_GEN_FAILURE: {
        draft.st_productGenLoading = false;
        draft.st_productGenDone = false;
        draft.st_productGenError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_GEN_ALL_REQUEST: {
        draft.st_productGenAllLoading = true;
        draft.st_productGenAllDone = false;
        draft.st_productGenAllError = null;
        break;
      }
      case PRODUCT_GEN_ALL_SUCCESS: {
        draft.st_productGenAllLoading = false;
        draft.st_productGenAllDone = true;
        draft.st_productGenAllError = null;
        draft.targetAllGens = action.data;
        break;
      }
      case PRODUCT_GEN_ALL_FAILURE: {
        draft.st_productGenAllLoading = false;
        draft.st_productGenAllDone = false;
        draft.st_productGenAllError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_LIST_REQUEST: {
        draft.st_productTrackListLoading = true;
        draft.st_productTrackListDone = false;
        draft.st_productTrackListError = null;
        break;
      }
      case PRODUCT_TRACK_LIST_SUCCESS: {
        draft.st_productTrackListLoading = false;
        draft.st_productTrackListDone = true;
        draft.st_productTrackListError = null;
        draft.trackList = action.data;
        break;
      }
      case PRODUCT_TRACK_LIST_FAILURE: {
        draft.st_productTrackListLoading = false;
        draft.st_productTrackListDone = false;
        draft.st_productTrackListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_ALL_LIST_REQUEST: {
        draft.st_productTrackAllListLoading = true;
        draft.st_productTrackAllListDone = false;
        draft.st_productTrackAllListError = null;
        break;
      }
      case PRODUCT_TRACK_ALL_LIST_SUCCESS: {
        draft.st_productTrackAllListLoading = false;
        draft.st_productTrackAllListDone = true;
        draft.st_productTrackAllListError = null;
        draft.trackAllList = action.data.list;
        draft.trackLength = action.data.length;
        break;
      }
      case PRODUCT_TRACK_ALL_LIST_FAILURE: {
        draft.st_productTrackAllListLoading = false;
        draft.st_productTrackAllListDone = false;
        draft.st_productTrackAllListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case COMMON_TAG_NEW_REQUEST: {
        draft.st_commonTagNewLoading = true;
        draft.st_commonTagNewDone = false;
        draft.st_commonTagNewError = null;
        break;
      }
      case COMMON_TAG_NEW_SUCCESS: {
        draft.st_commonTagNewLoading = false;
        draft.st_commonTagNewDone = true;
        draft.st_commonTagNewError = null;

        break;
      }
      case COMMON_TAG_NEW_FAILURE: {
        draft.st_commonTagNewLoading = false;
        draft.st_commonTagNewDone = false;
        draft.st_commonTagNewError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case COMMON_TAG_LIST_REQUEST: {
        draft.st_commonTagListLoading = true;
        draft.st_commonTagListDone = false;
        draft.st_commonTagListError = null;
        break;
      }
      case COMMON_TAG_LIST_SUCCESS: {
        draft.st_commonTagListLoading = false;
        draft.st_commonTagListDone = true;
        draft.st_commonTagListError = null;
        draft.commonTags = action.data;
        break;
      }
      case COMMON_TAG_LIST_FAILURE: {
        draft.st_commonTagListLoading = false;
        draft.st_commonTagListDone = false;
        draft.st_commonTagListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case COMMON_TAG_MODIFY_REQUEST: {
        draft.st_commonTagModifyLoading = true;
        draft.st_commonTagModifyDone = false;
        draft.st_commonTagModifyError = null;
        break;
      }
      case COMMON_TAG_MODIFY_SUCCESS: {
        draft.st_commonTagModifyLoading = false;
        draft.st_commonTagModifyDone = true;
        draft.st_commonTagModifyError = null;
        break;
      }
      case COMMON_TAG_MODIFY_FAILURE: {
        draft.st_commonTagModifyLoading = false;
        draft.st_commonTagModifyDone = false;
        draft.st_commonTagModifyError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case COMMON_TAG_DELETE_REQUEST: {
        draft.st_commonTagDeleteLoading = true;
        draft.st_commonTagDeleteDone = false;
        draft.st_commonTagDeleteError = null;
        break;
      }
      case COMMON_TAG_DELETE_SUCCESS: {
        draft.st_commonTagDeleteLoading = false;
        draft.st_commonTagDeleteDone = true;
        draft.st_commonTagDeleteError = null;
        break;
      }
      case COMMON_TAG_DELETE_FAILURE: {
        draft.st_commonTagDeleteLoading = false;
        draft.st_commonTagDeleteDone = false;
        draft.st_commonTagDeleteError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_DETAIL_REQUEST: {
        draft.st_productTrackDetailLoading = true;
        draft.st_productTrackDetailDone = false;
        draft.st_productTrackDetailError = null;
        break;
      }
      case PRODUCT_TRACK_DETAIL_SUCCESS: {
        draft.st_productTrackDetailLoading = false;
        draft.st_productTrackDetailDone = true;
        draft.st_productTrackDetailError = null;
        draft.trackDetail = action.data;
        break;
      }
      case PRODUCT_TRACK_DETAIL_FAILURE: {
        draft.st_productTrackDetailLoading = false;
        draft.st_productTrackDetailDone = false;
        draft.st_productTrackDetailError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_RECENT_REQUEST: {
        draft.st_productTrackRecentLoading = true;
        draft.st_productTrackRecentDone = false;
        draft.st_productTrackRecentError = null;
        break;
      }
      case PRODUCT_TRACK_RECENT_SUCCESS: {
        draft.st_productTrackRecentLoading = false;
        draft.st_productTrackRecentDone = true;
        draft.st_productTrackRecentError = null;
        draft.trackRecentList = action.data;
        break;
      }
      case PRODUCT_TRACK_RECENT_FAILURE: {
        draft.st_productTrackRecentLoading = false;
        draft.st_productTrackRecentDone = false;
        draft.st_productTrackRecentError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_CREATE_REQUEST: {
        draft.st_productTrackCreateLoading = true;
        draft.st_productTrackCreateDone = false;
        draft.st_productTrackCreateError = null;
        break;
      }
      case PRODUCT_TRACK_CREATE_SUCCESS: {
        draft.st_productTrackCreateLoading = false;
        draft.st_productTrackCreateDone = true;
        draft.st_productTrackCreateError = null;
        break;
      }
      case PRODUCT_TRACK_CREATE_FAILURE: {
        draft.st_productTrackCreateLoading = false;
        draft.st_productTrackCreateDone = false;
        draft.st_productTrackCreateError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_COVER_UPLOAD_REQUEST: {
        draft.st_productCoverUploadLoading = true;
        draft.st_productCoverUploadDone = false;
        draft.st_productCoverUploadError = null;
        break;
      }
      case PRODUCT_COVER_UPLOAD_SUCCESS: {
        draft.st_productCoverUploadLoading = false;
        draft.st_productCoverUploadDone = true;
        draft.st_productCoverUploadError = null;
        draft.coverPath = action.data.path;
        break;
      }
      case PRODUCT_COVER_UPLOAD_FAILURE: {
        draft.st_productCoverUploadLoading = false;
        draft.st_productCoverUploadDone = false;
        draft.st_productCoverUploadError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_AGREEMENT_UPLOAD_REQUEST: {
        draft.st_productAgreementUploadLoading = true;
        draft.st_productAgreementUploadDone = false;
        draft.st_productAgreementUploadError = null;
        break;
      }
      case PRODUCT_AGREEMENT_UPLOAD_SUCCESS: {
        draft.st_productAgreementUploadLoading = false;
        draft.st_productAgreementUploadDone = true;
        draft.st_productAgreementUploadError = null;
        draft.agreementPath = action.data.path;
        break;
      }
      case PRODUCT_AGREEMENT_UPLOAD_FAILURE: {
        draft.st_productAgreementUploadLoading = false;
        draft.st_productAgreementUploadDone = false;
        draft.st_productAgreementUploadError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_THUMBNAIL_UPLOAD_REQUEST: {
        draft.st_productTrackThumbnailUploadLoading = true;
        draft.st_productTrackThumbnailUploadDone = false;
        draft.st_productTrackThumbnailUploadError = null;
        break;
      }
      case PRODUCT_TRACK_THUMBNAIL_UPLOAD_SUCCESS: {
        draft.st_productTrackThumbnailUploadLoading = false;
        draft.st_productTrackThumbnailUploadDone = true;
        draft.st_productTrackThumbnailUploadError = null;
        draft.trackThumbnailPath = action.data.path;
        break;
      }
      case PRODUCT_TRACK_THUMBNAIL_UPLOAD_FAILURE: {
        draft.st_productTrackThumbnailUploadLoading = false;
        draft.st_productTrackThumbnailUploadDone = false;
        draft.st_productTrackThumbnailUploadError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_UPLOAD_REQUEST: {
        draft.st_productTrackUploadLoading = true;
        draft.st_productTrackUploadDone = false;
        draft.st_productTrackUploadError = null;
        break;
      }
      case PRODUCT_TRACK_UPLOAD_SUCCESS: {
        draft.st_productTrackUploadLoading = false;
        draft.st_productTrackUploadDone = true;
        draft.st_productTrackUploadError = null;
        draft.trackUploadPath = action.data.path;
        break;
      }
      case PRODUCT_TRACK_UPLOAD_FAILURE: {
        draft.st_productTrackUploadLoading = false;
        draft.st_productTrackUploadDone = false;
        draft.st_productTrackUploadError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_TYPELIST_REQUEST: {
        draft.st_productTrackTypeListLoading = true;
        draft.st_productTrackTypeListDone = false;
        draft.st_productTrackTypeListError = null;
        break;
      }
      case PRODUCT_TRACK_TYPELIST_SUCCESS: {
        draft.st_productTrackTypeListLoading = false;
        draft.st_productTrackTypeListDone = true;
        draft.st_productTrackTypeListError = null;
        draft.trackTypeList = action.data.list;
        break;
      }
      case PRODUCT_TRACK_TYPELIST_FAILURE: {
        draft.st_productTrackTypeListLoading = false;
        draft.st_productTrackTypeListDone = false;
        draft.st_productTrackTypeListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_ISOK_REQUEST: {
        draft.st_productTrackIsOkLoading = true;
        draft.st_productTrackIsOkDone = false;
        draft.st_productTrackIsOkError = null;
        break;
      }
      case PRODUCT_TRACK_ISOK_SUCCESS: {
        draft.st_productTrackIsOkLoading = false;
        draft.st_productTrackIsOkDone = true;
        draft.st_productTrackIsOkError = null;
        break;
      }
      case PRODUCT_TRACK_ISOK_FAILURE: {
        draft.st_productTrackIsOkLoading = false;
        draft.st_productTrackIsOkDone = false;
        draft.st_productTrackIsOkError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_ISREJECT_REQUEST: {
        draft.st_productTrackIsRejectLoading = true;
        draft.st_productTrackIsRejectDone = false;
        draft.st_productTrackIsRejectError = null;
        break;
      }
      case PRODUCT_TRACK_ISREJECT_SUCCESS: {
        draft.st_productTrackIsRejectLoading = false;
        draft.st_productTrackIsRejectDone = true;
        draft.st_productTrackIsRejectError = null;
        break;
      }
      case PRODUCT_TRACK_ISREJECT_FAILURE: {
        draft.st_productTrackIsRejectLoading = false;
        draft.st_productTrackIsRejectDone = false;
        draft.st_productTrackIsRejectError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_ALBUM_DETAIL_REQUEST: {
        draft.st_productAlbumDetailLoading = true;
        draft.st_productAlbumDetailDone = false;
        draft.st_productAlbumDetailError = null;
        break;
      }
      case PRODUCT_ALBUM_DETAIL_SUCCESS: {
        draft.st_productAlbumDetailLoading = false;
        draft.st_productAlbumDetailDone = true;
        draft.st_productAlbumDetailError = null;
        draft.productArtist = action.data;
        draft.productAlbumList = action.data.albumList;
        draft.productTrackList = action.data.findProductTrack;
        break;
      }
      case PRODUCT_ALBUM_DETAIL_FAILURE: {
        draft.st_productAlbumDetailLoading = false;
        draft.st_productAlbumDetailDone = false;
        draft.st_productAlbumDetailError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_DETAIL_REQUEST: {
        draft.st_productDetailLoading = true;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = null;
        break;
      }
      case PRODUCT_DETAIL_SUCCESS: {
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = true;
        draft.st_productDetailError = null;
        draft.productDetail = action.data;
        break;
      }
      case PRODUCT_DETAIL_FAILURE: {
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      case PRODUCT_TRACK_SELLDESC_REQUEST: {
        draft.st_productTrackSellDescLoading = true;
        draft.st_productTrackSellDescDone = false;
        draft.st_productTrackSellDescError = null;
        break;
      }
      case PRODUCT_TRACK_SELLDESC_SUCCESS: {
        draft.st_productTrackSellDescLoading = false;
        draft.st_productTrackSellDescDone = true;
        draft.st_productTrackSellDescError = null;
        draft.productTrackSellDesc = action.data;
        break;
      }
      case PRODUCT_TRACK_SELLDESC_FAILURE: {
        draft.st_productTrackSellDescLoading = false;
        draft.st_productTrackSellDescDone = false;
        draft.st_productTrackSellDescError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////

      case PRODUCT_TRACK_FILE_RESET: {
        draft.trackThumbnailPath = action.data.trackThumbnailPath;
        draft.trackUploadPath = action.data.trackUploadPath;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
