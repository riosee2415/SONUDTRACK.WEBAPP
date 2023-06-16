import produce from "../util/produce";

export const initailState = {
  searchArtistList: [], // 아티스템 리스트
  searchArtistPage: 0, // 아티스템 페이지
  searchArtistLeng: 0, // 아티스템 총 개수

  searchMusicList: [], // 뮤작탬 리스트
  searchMusicPage: 0, // 뮤작탬 페이지
  searchMusicLeng: 0, // 뮤작탬 총 개수

  //
  st_searchListLoading: false, // 검색 리스트
  st_searchListDone: false,
  st_searchListError: null,
};

export const SEARCH_LIST_REQUEST = "SEARCH_LIST_REQUEST";
export const SEARCH_LIST_SUCCESS = "SEARCH_LIST_SUCCESS";
export const SEARCH_LIST_FAILURE = "SEARCH_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SEARCH_LIST_REQUEST: {
        draft.st_searchListLoading = true;
        draft.st_searchListDone = false;
        draft.st_searchListError = null;
        break;
      }
      case SEARCH_LIST_SUCCESS: {
        draft.st_searchListLoading = false;
        draft.st_searchListDone = true;
        draft.st_searchListError = null;
        draft.searchArtistList = action.data.artistem;
        draft.searchArtistPage = action.data.artistemLastPage;
        draft.searchArtistLeng = action.data.artisttemLen;
        draft.searchMusicList = action.data.musictem;
        draft.searchMusicPage = action.data.musictemLastPage;
        draft.searchMusicLeng = action.data.musictemLen;
        break;
      }
      case SEARCH_LIST_FAILURE: {
        draft.st_searchListLoading = false;
        draft.st_searchListDone = false;
        draft.st_searchListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
