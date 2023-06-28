import produce from "../util/produce";

export const initailState = {
  wishItems: [], // 장바구니 상품 목록

  st_itemListLoading: false, // 장바구니 상품 목록
  st_itemListDone: false,
  st_itemListError: null,

  st_itemCartCreateLoading: false, // 장바구니 상품 추가(장바구니 추가용)
  st_itemCartCreateDone: false,
  st_itemCartCreateError: null,

  st_itemBuyCreateLoading: false, // 장바구니 상품 추가(바로구매용)
  st_itemBuyCreateDone: false,
  st_itemBuyCreateError: null,

  st_itemUpdateLoading: false, // 장바구니 상품 라이센스 변경
  st_itemUpdateDone: false,
  st_itemUpdateError: null,

  st_itemDeleteLoading: false, // 장바구니 상품 삭제
  st_itemDeleteDone: false,
  st_itemDeleteError: null,

  st_boughtCreateLoading: false, // 음원 구매
  st_boughtCreateDone: false,
  st_boughtCreateError: null,
};

export const ITEM_LIST_REQUEST = "ITEM_LIST_REQUEST";
export const ITEM_LIST_SUCCESS = "ITEM_LIST_SUCCESS";
export const ITEM_LIST_FAILURE = "ITEM_LIST_FAILURE";

export const ITEM_CART_CREATE_REQUEST = "ITEM_CART_CREATE_REQUEST";
export const ITEM_CART_CREATE_SUCCESS = "ITEM_CART_CREATE_SUCCESS";
export const ITEM_CART_CREATE_FAILURE = "ITEM_CART_CREATE_FAILURE";

export const ITEM_BUY_CREATE_REQUEST = "ITEM_BUY_CREATE_REQUEST";
export const ITEM_BUY_CREATE_SUCCESS = "ITEM_BUY_CREATE_SUCCESS";
export const ITEM_BUY_CREATE_FAILURE = "ITEM_BUY_CREATE_FAILURE";

export const ITEM_UPDATE_REQUEST = "ITEM_UPDATE_REQUEST";
export const ITEM_UPDATE_SUCCESS = "ITEM_UPDATE_SUCCESS";
export const ITEM_UPDATE_FAILURE = "ITEM_UPDATE_FAILURE";

export const ITEM_DELETE_REQUEST = "ITEM_DELETE_REQUEST";
export const ITEM_DELETE_SUCCESS = "ITEM_DELETE_SUCCESS";
export const ITEM_DELETE_FAILURE = "ITEM_DELETE_FAILURE";

export const BOUGHT_CREATE_REQUEST = "BOUGHT_CREATE_REQUEST";
export const BOUGHT_CREATE_SUCCESS = "BOUGHT_CREATE_SUCCESS";
export const BOUGHT_CREATE_FAILURE = "BOUGHT_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ITEM_LIST_REQUEST: {
        draft.st_itemListLoading = true;
        draft.st_itemListDone = false;
        draft.st_itemListError = null;
        break;
      }
      case ITEM_LIST_SUCCESS: {
        draft.st_itemListLoading = false;
        draft.st_itemListDone = true;
        draft.st_itemListError = null;
        draft.wishItems = action.data;
        break;
      }
      case ITEM_LIST_FAILURE: {
        draft.st_itemListLoading = false;
        draft.st_itemListDone = false;
        draft.st_itemListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ITEM_CART_CREATE_REQUEST: {
        draft.st_itemCartCreateLoading = true;
        draft.st_itemCartCreateDone = false;
        draft.st_itemCartCreateError = null;
        break;
      }
      case ITEM_CART_CREATE_SUCCESS: {
        draft.st_itemCartCreateLoading = false;
        draft.st_itemCartCreateDone = true;
        draft.st_itemCartCreateError = null;
        break;
      }
      case ITEM_CART_CREATE_FAILURE: {
        draft.st_itemCartCreateLoading = false;
        draft.st_itemCartCreateDone = false;
        draft.st_itemCartCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ITEM_BUY_CREATE_REQUEST: {
        draft.st_itemBuyCreateLoading = true;
        draft.st_itemBuyCreateDone = false;
        draft.st_itemBuyCreateError = null;
        break;
      }
      case ITEM_BUY_CREATE_SUCCESS: {
        draft.st_itemBuyCreateLoading = false;
        draft.st_itemBuyCreateDone = true;
        draft.st_itemBuyCreateError = null;
        break;
      }
      case ITEM_BUY_CREATE_FAILURE: {
        draft.st_itemBuyCreateLoading = false;
        draft.st_itemBuyCreateDone = false;
        draft.st_itemBuyCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ITEM_UPDATE_REQUEST: {
        draft.st_itemUpdateLoading = true;
        draft.st_itemUpdateDone = false;
        draft.st_itemUpdateError = null;
        break;
      }
      case ITEM_UPDATE_SUCCESS: {
        draft.st_itemUpdateLoading = false;
        draft.st_itemUpdateDone = true;
        draft.st_itemUpdateError = null;
        break;
      }
      case ITEM_UPDATE_FAILURE: {
        draft.st_itemUpdateLoading = false;
        draft.st_itemUpdateDone = false;
        draft.st_itemUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ITEM_DELETE_REQUEST: {
        draft.st_itemDeleteLoading = true;
        draft.st_itemDeleteDone = false;
        draft.st_itemDeleteError = null;
        break;
      }
      case ITEM_DELETE_SUCCESS: {
        draft.st_itemDeleteLoading = false;
        draft.st_itemDeleteDone = true;
        draft.st_itemDeleteError = null;
        break;
      }
      case ITEM_DELETE_FAILURE: {
        draft.st_itemDeleteLoading = false;
        draft.st_itemDeleteDone = false;
        draft.st_itemDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BOUGHT_CREATE_REQUEST: {
        draft.st_boughtCreateLoading = true;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = null;
        break;
      }
      case BOUGHT_CREATE_SUCCESS: {
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = true;
        draft.st_boughtCreateError = null;
        break;
      }
      case BOUGHT_CREATE_FAILURE: {
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
