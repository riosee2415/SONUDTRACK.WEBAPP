import produce from "../util/produce";

export const initailState = {
  me: null,
  currentAdminMenu: [],
  users: null,
  updateModal: false,
  userHistory: [],
  adminUserRightHistory: [],
  buyStatus: [],
  findUserId: null, // 아이디 찾기

  userPath: null,
  //
  st_loginLoading: false,
  st_loginDone: false,
  st_loginError: null,
  //
  st_logoutLoading: false,
  st_logoutDone: false,
  st_logoutError: null,
  //
  st_loginAdminLoading: false,
  st_loginAdminDone: false,
  st_loginAdminError: null,
  //
  st_signUpLoading: false,
  st_signUpDone: false,
  st_signUpError: null,
  //
  st_userListLoading: false,
  st_userListDone: false,
  st_userListError: null,
  //
  st_userListUpdateLoading: false,
  st_userListUpdateDone: false,
  st_userListUpdateError: null,
  //
  st_loadMyInfoLoading: false, // 로그인 정보 가져오기 시도 중
  st_loadMyInfoDone: false,
  st_loadMyInfoError: null,
  //
  st_kakaoLoginLoading: false,
  st_kakaoLoginDone: false,
  st_kakaoLoginError: null,
  //
  st_userHistoryLoading: false, // 회원 이력
  st_userHistoryDone: false,
  st_userHistoryError: null,
  //
  st_menuRightUpdateLoading: false,
  st_menuRightUpdateDone: false,
  st_menuRightUpdateError: null,
  //
  st_adminUserRightHistoryLoading: false, // 포인트 환원 이력
  st_adminUserRightHistoryDone: false,
  st_adminUserRightHistoryError: null,
  //
  st_adminUserExitTrueLoading: false, // 탈퇴
  st_adminUserExitTrueDone: false,
  st_adminUserExitTrueError: null,
  //
  st_adminUserExitFalseLoading: false, // 재가입
  st_adminUserExitFalseDone: false,
  st_adminUserExitFalseError: null,
  //
  st_buyStatusLoading: false, // 회원 별 음원 구매 현황
  st_buyStatusDone: false,
  st_buyStatusError: null,
  //
  st_snsLoginLoading: false, // snsLogin
  st_snsLoginDone: false,
  st_snsLoginError: null,
  //
  st_modifyPassLoading: false, // 비밀번호 수정
  st_modifyPassDone: false,
  st_modifyPassError: null,
  //
  st_userInfoUpdateLoading: false, // 회원정보 수정
  st_userInfoUpdateDone: false,
  st_userInfoUpdateError: false,
  //
  st_findUserIdLoading: false, // 아이디 수정
  st_findUserIdDone: false,
  st_findUserIdError: false,
  //
  st_checkSecretLoading: false, // 코드 확인 - 비밀번호 재설정
  st_checkSecretDone: false,
  st_checkSecretError: false,
  //
  st_modifyPassUpdateLoading: false, // 비밀번호 재설정
  st_modifyPassUpdateDone: false,
  st_modifyPassUpdateError: false,
  //
  st_userInfoPassUpdateLoading: false, // 회원 비밀번호 수정
  st_userInfoPassUpdateDone: false,
  st_userInfoPassUpdateError: false,
  //
  st_userPassCompareLoading: false, // 회원 비밀번호 확인
  st_userPassCompareDone: false,
  st_userPassCompareError: false,
  //
  st_userImgUpdateLoading: false, // 회원 프로필 변경
  st_userImgUpdateDone: false,
  st_userImgUpdateError: false,
  //
  st_userUploadLoading: false, // user 이미지 등록
  st_userUploadDone: false,
  st_userUploadError: null,
  //
  st_meAccountUpdateLoading: false, // 계좌정보 등록
  st_meAccountUpdateDone: false,
  st_meAccountUpdateError: null,
};

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const LOGIN_ADMIN_REQUEST = "LOGIN_ADMIN_REQUEST";
export const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
export const LOGIN_ADMIN_FAILURE = "LOGIN_ADMIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const USERLIST_REQUEST = "USERLIST_REQUEST";
export const USERLIST_SUCCESS = "USERLIST_SUCCESS";
export const USERLIST_FAILURE = "USERLIST_FAILURE";

export const USERLIST_UPDATE_REQUEST = "USERLIST_UPDATE_REQUEST";
export const USERLIST_UPDATE_SUCCESS = "USERLIST_UPDATE_SUCCESS";
export const USERLIST_UPDATE_FAILURE = "USERLIST_UPDATE_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const KAKAO_LOGIN_REQUEST = "KAKAO_LOGIN_REQUEST";
export const KAKAO_LOGIN_SUCCESS = "KAKAO_LOGIN_SUCCESS";
export const KAKAO_LOGIN_FAILURE = "KAKAO_LOGIN_FAILURE";

export const USER_HISTORY_REQUEST = "USER_HISTORY_REQUEST";
export const USER_HISTORY_SUCCESS = "USER_HISTORY_SUCCESS";
export const USER_HISTORY_FAILURE = "USER_HISTORY_FAILURE";

export const MENURIGHT_UPDATE_REQUEST = "MENURIGHT_UPDATE_REQUEST";
export const MENURIGHT_UPDATE_SUCCESS = "MENURIGHT_UPDATE_SUCCESS";
export const MENURIGHT_UPDATE_FAILURE = "MENURIGHT_UPDATE_FAILURE";

export const ADMINUSERLIST_REQUEST = "ADMINUSERLIST_REQUEST";
export const ADMINUSERLIST_SUCCESS = "ADMINUSERLIST_SUCCESS";
export const ADMINUSERLIST_FAILURE = "ADMINUSERLIST_FAILURE";

export const ADMINUSERRIGHT_HISTORY_REQUEST = "ADMINUSERRIGHT_HISTORY_REQUEST";
export const ADMINUSERRIGHT_HISTORY_SUCCESS = "ADMINUSERRIGHT_HISTORY_SUCCESS";
export const ADMINUSERRIGHT_HISTORY_FAILURE = "ADMINUSERRIGHT_HISTORY_FAILURE";
//
export const ADMINUSER_EXITTRUE_REQUEST = "ADMINUSER_EXITTRUE_REQUEST";
export const ADMINUSER_EXITTRUE_SUCCESS = "ADMINUSER_EXITTRUE_SUCCESS";
export const ADMINUSER_EXITTRUE_FAILURE = "ADMINUSER_EXITTRUE_FAILURE";
//
export const ADMINUSER_EXITFALSE_REQUEST = "ADMINUSER_EXITFALSE_REQUEST";
export const ADMINUSER_EXITFALSE_SUCCESS = "ADMINUSER_EXITFALSE_SUCCESS";
export const ADMINUSER_EXITFALSE_FAILURE = "ADMINUSER_EXITFALSE_FAILURE";
//
export const USER_BUYSTATUS_REQUEST = "USER_BUYSTATUS_REQUEST";
export const USER_BUYSTATUS_SUCCESS = "USER_BUYSTATUS_SUCCESS";
export const USER_BUYSTATUS_FAILURE = "USER_BUYSTATUS_FAILURE";
//
export const SNS_LOGIN_REQUEST = "SNS_LOGIN_REQUEST";
export const SNS_LOGIN_SUCCESS = "SNS_LOGIN_SUCCESS";
export const SNS_LOGIN_FAILURE = "SNS_LOGIN_FAILURE";
//
export const MODIFY_PASS_REQUEST = "MODIFY_PASS_REQUEST";
export const MODIFY_PASS_SUCCESS = "MODIFY_PASS_SUCCESS";
export const MODIFY_PASS_FAILURE = "MODIFY_PASS_FAILURE";
//
export const USER_INFO_UPDATE_REQUEST = "USER_INFO_UPDATE_REQUEST";
export const USER_INFO_UPDATE_SUCCESS = "USER_INFO_UPDATE_SUCCESS";
export const USER_INFO_UPDATE_FAILURE = "USER_INFO_UPDATE_FAILURE";
//
export const FIND_USER_ID_REQUEST = "FIND_USER_ID_REQUEST";
export const FIND_USER_ID_SUCCESS = "FIND_USER_ID_SUCCESS";
export const FIND_USER_ID_FAILURE = "FIND_USER_ID_FAILURE";
//
export const CHECK_SECRET_REQUEST = "CHECK_SECRET_REQUEST";
export const CHECK_SECRET_SUCCESS = "CHECK_SECRET_SUCCESS";
export const CHECK_SECRET_FAILURE = "CHECK_SECRET_FAILURE";
//
export const MODIFY_PASS_UPDATE_REQUEST = "MODIFY_PASS_UPDATE_REQUEST";
export const MODIFY_PASS_UPDATE_SUCCESS = "MODIFY_PASS_UPDATE_SUCCESS";
export const MODIFY_PASS_UPDATE_FAILURE = "MODIFY_PASS_UPDATE_FAILURE";
//
export const USER_INFO_PASS_UPDATE_REQUEST = "USER_INFO_PASS_UPDATE_REQUEST";
export const USER_INFO_PASS_UPDATE_SUCCESS = "USER_INFO_PASS_UPDATE_SUCCESS";
export const USER_INFO_PASS_UPDATE_FAILURE = "USER_INFO_PASS_UPDATE_FAILURE";
//
export const USER_PASS_COMPARE_REQUEST = "USER_PASS_COMPARE_REQUEST";
export const USER_PASS_COMPARE_SUCCESS = "USER_PASS_COMPARE_SUCCESS";
export const USER_PASS_COMPARE_FAILURE = "USER_PASS_COMPARE_FAILURE";
//
export const USER_IMG_UPDATE_REQUEST = "USER_IMG_UPDATE_REQUEST";
export const USER_IMG_UPDATE_SUCCESS = "USER_IMG_UPDATE_SUCCESS";
export const USER_IMG_UPDATE_FAILURE = "USER_IMG_UPDATE_FAILURE";

export const USER_UPLOAD_REQUEST = "USER_UPLOAD_REQUEST";
export const USER_UPLOAD_SUCCESS = "USER_UPLOAD_SUCCESS";
export const USER_UPLOAD_FAILURE = "USER_UPLOAD_FAILURE";

export const ME_ACCOUNT_UPDATE_REQUEST = "ME_ACCOUNT_UPDATE_REQUEST";
export const ME_ACCOUNT_UPDATE_SUCCESS = "ME_ACCOUNT_UPDATE_SUCCESS";
export const ME_ACCOUNT_UPDATE_FAILURE = "ME_ACCOUNT_UPDATE_FAILURE";

export const UPDATE_MODAL_OPEN_REQUEST = "UPDATE_MODAL_OPEN_REQUEST";
export const UPDATE_MODAL_CLOSE_REQUEST = "UPDATE_MODAL_CLOSE_REQUEST";

export const CURRENT_ADMINMENU_STATUS = "CURRENT_ADMINMENU_STATUS";

export const USER_IMAGE_RESET = "USER_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        console.log("GET SERVER SIDE PROPS ACTION");

        draft.st_loadMyInfoLoading = true;
        draft.st_loadMyInfoError = null;
        draft.st_loadMyInfoDone = false;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = true;
        draft.me = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case LOGOUT_REQUEST: {
        draft.st_logoutLoading = true;
        draft.st_logoutDone = false;
        draft.st_logoutError = null;
        break;
      }
      case LOGOUT_SUCCESS: {
        draft.st_logoutLoading = false;
        draft.st_logoutDone = true;
        draft.st_logoutError = null;
        break;
      }
      case LOGOUT_FAILURE: {
        draft.st_logoutLoading = false;
        draft.st_logoutDone = false;
        draft.st_logoutError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case LOGIN_REQUEST: {
        draft.st_loginLoading = true;
        draft.st_loginDone = false;
        draft.st_loginError = null;
        break;
      }
      case LOGIN_SUCCESS: {
        draft.st_loginLoading = false;
        draft.st_loginDone = true;
        draft.me = action.data;
        break;
      }
      case LOGIN_FAILURE: {
        draft.st_loginLoading = false;
        draft.st_loginDone = false;
        draft.st_loginError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case LOGIN_ADMIN_REQUEST: {
        draft.st_loginAdminLoading = true;
        draft.st_loginAdminDone = false;
        draft.st_loginAdminError = null;
        break;
      }
      case LOGIN_ADMIN_SUCCESS: {
        draft.st_loginAdminLoading = false;
        draft.st_loginAdminDone = true;
        draft.me = action.data;
        break;
      }
      case LOGIN_ADMIN_FAILURE: {
        draft.st_loginAdminLoading = false;
        draft.st_loginAdminDone = false;
        draft.st_loginAdminError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case SIGNUP_REQUEST: {
        draft.st_signUpLoading = true;
        draft.st_signUpDone = false;
        draft.st_signUpError = null;
        break;
      }
      case SIGNUP_SUCCESS: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = true;
        draft.st_signUpError = null;
        break;
      }
      case SIGNUP_FAILURE: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = false;
        draft.st_signUpError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USERLIST_REQUEST: {
        draft.st_userListLoading = true;
        draft.st_userListDone = false;
        draft.st_userListError = null;
        break;
      }
      case USERLIST_SUCCESS: {
        draft.st_userListLoading = false;
        draft.st_userListDone = true;
        draft.users = action.data;
        break;
      }
      case USERLIST_FAILURE: {
        draft.st_userListLoading = false;
        draft.st_userListDone = false;
        draft.st_userListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ADMINUSERLIST_REQUEST: {
        draft.st_adminUserListLoading = true;
        draft.st_adminUserListDone = false;
        draft.st_adminUserListError = null;
        break;
      }
      case ADMINUSERLIST_SUCCESS: {
        draft.st_adminUserListLoading = false;
        draft.st_adminUserListDone = true;
        draft.users = action.data;
        break;
      }
      case ADMINUSERLIST_FAILURE: {
        draft.st_adminUserListLoading = false;
        draft.st_adminUserListDone = false;
        draft.st_adminUserListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USERLIST_UPDATE_REQUEST: {
        draft.st_userListUpdateLoading = true;
        draft.st_userListUpdateDone = false;
        draft.st_userListUpdateError = null;
        break;
      }
      case USERLIST_UPDATE_SUCCESS: {
        draft.st_userListUpdateLoading = false;
        draft.st_userListUpdateDone = true;
        break;
      }
      case USERLIST_UPDATE_FAILURE: {
        draft.st_userListUpdateLoading = false;
        draft.st_userListUpdateDone = false;
        draft.st_userListUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case KAKAO_LOGIN_REQUEST: {
        draft.st_kakaoLoginLoading = true;
        draft.st_kakaoLoginDone = false;
        draft.st_kakaoLoginError = null;
        break;
      }
      case KAKAO_LOGIN_SUCCESS: {
        draft.st_kakaoLoginLoading = false;
        draft.st_kakaoLoginDone = true;
        draft.st_kakaoLoginError = null;
        break;
      }
      case KAKAO_LOGIN_FAILURE: {
        draft.st_kakaoLoginLoading = false;
        draft.st_kakaoLoginDone = false;
        draft.st_kakaoLoginError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case USER_HISTORY_REQUEST: {
        draft.st_userHistoryLoading = true;
        draft.st_userHistoryDone = false;
        draft.st_userHistoryError = null;
        break;
      }
      case USER_HISTORY_SUCCESS: {
        draft.st_userHistoryLoading = false;
        draft.st_userHistoryDone = true;
        draft.st_userHistoryError = null;
        draft.userHistory = action.data;
        break;
      }
      case USER_HISTORY_FAILURE: {
        draft.st_userHistoryLoading = false;
        draft.st_userHistoryDone = false;
        draft.st_userHistoryError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case MENURIGHT_UPDATE_REQUEST: {
        draft.st_menuRightUpdateLoading = true;
        draft.st_menuRightUpdateDone = false;
        draft.st_menuRightUpdateError = null;
        break;
      }
      case MENURIGHT_UPDATE_SUCCESS: {
        draft.st_menuRightUpdateLoading = false;
        draft.st_menuRightUpdateDone = true;
        draft.st_menuRightUpdateError = null;
        break;
      }
      case MENURIGHT_UPDATE_FAILURE: {
        draft.st_menuRightUpdateLoading = false;
        draft.st_menuRightUpdateDone = false;
        draft.st_menuRightUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case ADMINUSERRIGHT_HISTORY_REQUEST: {
        draft.st_adminUserRightHistoryLoading = true;
        draft.st_adminUserRightHistoryDone = false;
        draft.st_adminUserRightHistoryError = null;
        break;
      }
      case ADMINUSERRIGHT_HISTORY_SUCCESS: {
        draft.st_adminUserRightHistoryLoading = false;
        draft.st_adminUserRightHistoryDone = true;
        draft.st_adminUserRightHistoryError = null;
        draft.adminUserRightHistory = action.data;
        break;
      }
      case ADMINUSERRIGHT_HISTORY_FAILURE: {
        draft.st_adminUserRightHistoryLoading = false;
        draft.st_adminUserRightHistoryDone = false;
        draft.st_adminUserRightHistoryError = action.error;
        break;
      }
      //////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case ADMINUSER_EXITTRUE_REQUEST: {
        draft.st_adminUserExitTrueLoading = true;
        draft.st_adminUserExitTrueDone = false;
        draft.st_adminUserExitTrueError = null;
        break;
      }
      case ADMINUSER_EXITTRUE_SUCCESS: {
        draft.st_adminUserExitTrueLoading = false;
        draft.st_adminUserExitTrueDone = true;
        draft.st_adminUserExitTrueError = null;
        draft.adminUserExitTrue = action.data;
        break;
      }
      case ADMINUSER_EXITTRUE_FAILURE: {
        draft.st_adminUserExitTrueLoading = false;
        draft.st_adminUserExitTrueDone = false;
        draft.st_adminUserExitTrueError = action.error;
        break;
      }
      //////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case ADMINUSER_EXITFALSE_REQUEST: {
        draft.st_adminUserExitFalseLoading = true;
        draft.st_adminUserExitFalseDone = false;
        draft.st_adminUserExitFalseError = null;
        break;
      }
      case ADMINUSER_EXITFALSE_SUCCESS: {
        draft.st_adminUserExitFalseLoading = false;
        draft.st_adminUserExitFalseDone = true;
        draft.st_adminUserExitFalseError = null;
        draft.adminUserExitFalse = action.data;
        break;
      }
      case ADMINUSER_EXITFALSE_FAILURE: {
        draft.st_adminUserExitFalseLoading = false;
        draft.st_adminUserExitFalseDone = false;
        draft.st_adminUserExitFalseError = action.error;
        break;
      }
      //////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case USER_BUYSTATUS_REQUEST: {
        draft.st_buyStatusLoading = true;
        draft.st_buyStatusDone = false;
        draft.st_buyStatusError = null;
        break;
      }
      case USER_BUYSTATUS_SUCCESS: {
        draft.st_buyStatusLoading = false;
        draft.st_buyStatusDone = true;
        draft.st_buyStatusError = null;
        draft.buyStatus = action.data;
        break;
      }
      case USER_BUYSTATUS_FAILURE: {
        draft.st_buyStatusLoading = false;
        draft.st_buyStatusDone = false;
        draft.st_buyStatusError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case SNS_LOGIN_REQUEST: {
        draft.st_snsLoginLoading = true;
        draft.st_snsLoginDone = false;
        draft.st_snsLoginError = null;
        break;
      }
      case SNS_LOGIN_SUCCESS: {
        draft.st_snsLoginLoading = false;
        draft.st_snsLoginDone = true;
        draft.st_snsLoginError = null;
        break;
      }
      case SNS_LOGIN_FAILURE: {
        draft.st_snsLoginLoading = false;
        draft.st_snsLoginDone = false;
        draft.st_snsLoginError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case MODIFY_PASS_REQUEST: {
        draft.st_modifyPassLoading = true;
        draft.st_modifyPassDone = false;
        draft.st_modifyPassError = null;
        break;
      }
      case MODIFY_PASS_SUCCESS: {
        draft.st_modifyPassLoading = false;
        draft.st_modifyPassDone = true;
        draft.st_modifyPassError = null;
        break;
      }
      case MODIFY_PASS_FAILURE: {
        draft.st_modifyPassLoading = false;
        draft.st_modifyPassDone = false;
        draft.st_modifyPassError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case USER_INFO_UPDATE_REQUEST: {
        draft.st_userInfoUpdateLoading = true;
        draft.st_userInfoUpdateDone = false;
        draft.st_userInfoUpdateError = null;
        break;
      }
      case USER_INFO_UPDATE_SUCCESS: {
        draft.st_userInfoUpdateLoading = false;
        draft.st_userInfoUpdateDone = true;
        draft.st_userInfoUpdateError = null;
        break;
      }
      case USER_INFO_UPDATE_FAILURE: {
        draft.st_userInfoUpdateLoading = false;
        draft.st_userInfoUpdateDone = false;
        draft.st_userInfoUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case FIND_USER_ID_REQUEST: {
        draft.st_findUserIdLoading = true;
        draft.st_findUserIdDone = false;
        draft.st_findUserIdError = null;
        break;
      }
      case FIND_USER_ID_SUCCESS: {
        draft.st_findUserIdLoading = false;
        draft.st_findUserIdDone = true;
        draft.st_findUserIdError = null;
        draft.findUserId = action.data.userId;
        break;
      }
      case FIND_USER_ID_FAILURE: {
        draft.st_findUserIdLoading = false;
        draft.st_findUserIdDone = false;
        draft.st_findUserIdError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case CHECK_SECRET_REQUEST: {
        draft.st_checkSecretLoading = true;
        draft.st_checkSecretDone = false;
        draft.st_checkSecretError = null;
        break;
      }
      case CHECK_SECRET_SUCCESS: {
        draft.st_checkSecretLoading = false;
        draft.st_checkSecretDone = true;
        draft.st_checkSecretError = null;
        break;
      }
      case CHECK_SECRET_FAILURE: {
        draft.st_checkSecretLoading = false;
        draft.st_checkSecretDone = false;
        draft.st_checkSecretError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MODIFY_PASS_UPDATE_REQUEST: {
        draft.st_modifyPassUpdateLoading = true;
        draft.st_modifyPassUpdateDone = false;
        draft.st_modifyPassUpdateError = null;
        break;
      }
      case MODIFY_PASS_UPDATE_SUCCESS: {
        draft.st_modifyPassUpdateLoading = false;
        draft.st_modifyPassUpdateDone = true;
        draft.st_modifyPassUpdateError = null;
        break;
      }
      case MODIFY_PASS_UPDATE_FAILURE: {
        draft.st_modifyPassUpdateLoading = false;
        draft.st_modifyPassUpdateDone = false;
        draft.st_modifyPassUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case USER_INFO_PASS_UPDATE_REQUEST: {
        draft.st_userInfoPassUpdateLoading = true;
        draft.st_userInfoPassUpdateDone = false;
        draft.st_userInfoPassUpdateError = null;
        break;
      }
      case USER_INFO_PASS_UPDATE_SUCCESS: {
        draft.st_userInfoPassUpdateLoading = false;
        draft.st_userInfoPassUpdateDone = true;
        draft.st_userInfoPassUpdateError = null;
        break;
      }
      case USER_INFO_PASS_UPDATE_FAILURE: {
        draft.st_userInfoPassUpdateLoading = false;
        draft.st_userInfoPassUpdateDone = false;
        draft.st_userInfoPassUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case USER_PASS_COMPARE_REQUEST: {
        draft.st_userPassCompareLoading = true;
        draft.st_userPassCompareDone = false;
        draft.st_userPassCompareError = null;
        break;
      }
      case USER_PASS_COMPARE_SUCCESS: {
        draft.st_userPassCompareLoading = false;
        draft.st_userPassCompareDone = true;
        draft.st_userPassCompareError = null;
        break;
      }
      case USER_PASS_COMPARE_FAILURE: {
        draft.st_userPassCompareLoading = false;
        draft.st_userPassCompareDone = false;
        draft.st_userPassCompareError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case USER_IMG_UPDATE_REQUEST: {
        draft.st_userImgUpdateLoading = true;
        draft.st_userImgUpdateDone = false;
        draft.st_userImgUpdateError = null;
        break;
      }
      case USER_IMG_UPDATE_SUCCESS: {
        draft.st_userImgUpdateLoading = false;
        draft.st_userImgUpdateDone = true;
        draft.st_userImgUpdateError = null;
        break;
      }
      case USER_IMG_UPDATE_FAILURE: {
        draft.st_userImgUpdateLoading = false;
        draft.st_userImgUpdateDone = false;
        draft.st_userImgUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case USER_UPLOAD_REQUEST: {
        draft.st_userUploadLoading = true;
        draft.st_userUploadDone = false;
        draft.st_userUploadError = null;
        break;
      }
      case USER_UPLOAD_SUCCESS: {
        draft.st_userUploadLoading = false;
        draft.st_userUploadDone = true;
        draft.st_userUploadError = null;
        draft.userPath = action.data.path;
        break;
      }
      case USER_UPLOAD_FAILURE: {
        draft.st_userUploadLoading = false;
        draft.st_userUploadDone = false;
        draft.st_userUploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ME_ACCOUNT_UPDATE_REQUEST: {
        draft.st_meAccountUpdateLoading = true;
        draft.st_meAccountUpdateDone = false;
        draft.st_meAccountUpdateError = null;
        break;
      }
      case ME_ACCOUNT_UPDATE_SUCCESS: {
        draft.st_meAccountUpdateLoading = false;
        draft.st_meAccountUpdateDone = true;
        draft.st_meAccountUpdateError = null;
        break;
      }
      case ME_ACCOUNT_UPDATE_FAILURE: {
        draft.st_meAccountUpdateLoading = false;
        draft.st_meAccountUpdateDone = false;
        draft.st_meAccountUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case CURRENT_ADMINMENU_STATUS: {
        const exist = draft.currentAdminMenu.filter(
          (data) => data === action.data.key
        );

        if (exist.length > 0) {
          draft.currentAdminMenu = draft.currentAdminMenu.filter(
            (data) => data !== action.data.key
          );
        } else {
          draft.currentAdminMenu = [...draft.currentAdminMenu, action.data.key];
        }

        break;
      }

      //////////////////////////////////////////////

      case UPDATE_MODAL_OPEN_REQUEST:
        draft.updateModal = true;
        break;

      case UPDATE_MODAL_CLOSE_REQUEST:
        draft.updateModal = false;
        break;

      //////////////////////////////////////////////

      case USER_IMAGE_RESET: {
        draft.userPath = null;
        draft.st_userUploadLoading = false;
        draft.st_userUploadDone = false;
        draft.st_userUploadError = null;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
