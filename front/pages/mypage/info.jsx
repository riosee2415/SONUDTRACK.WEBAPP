import React, { useCallback, useState, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  USER_INFO_PASS_UPDATE_REQUEST,
  USER_INFO_UPDATE_REQUEST,
  USER_PASS_COMPARE_REQUEST,
} from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import useInput from "../../hooks/useInput";
import {
  CommonButton,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { Checkbox, message, Modal } from "antd";
import Theme from "../../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Index = () => {
  ////// GLOBAL STATE //////
  const {
    me,
    st_userInfoUpdateDone,
    st_userInfoUpdateError,

    st_userInfoPassUpdateDone,
    st_userInfoPassUpdateError,

    st_userPassCompareDone,
    st_userPassCompareError,
  } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const nickname = useInput(me && me.nickname);
  const email = useInput(me && me.email);
  const pass = useInput("");
  const newPass = useInput(""); // 새로운 비밀번호
  const [passCheck, setPassCheck] = useState(""); // 세로운 비밀번호 확인
  const mobile = useInput(me && me.mobile);
  const term1 = useInput(me && me.terms === 1 ? true : false); // 수신동의
  const term2 = useInput(me && me.terms2 === 1 ? true : false); // SMS 동의
  const term3 = useInput(me && me.terms3 === 1 ? true : false); // 카카오톡 동의
  const term4 = useInput(me && me.terms4 === 1 ? true : false); // 이메일 동의
  const term5 = useInput(me && me.terms5 === 1 ? true : false); // 카카오톡 알림
  const term6 = useInput(me && me.terms6 === 1 ? true : false); // 이메일 알림

  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return message.error(`로그인이 필요한 페이지입니다.`);
    }
  }, [me]);

  useEffect(() => {
    if (st_userInfoUpdateDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      return message.success("회원정보가 수정되었습니다.");
    }

    if (st_userInfoUpdateError) {
      return message.error(st_userInfoUpdateError);
    }
  }, [st_userInfoUpdateDone, st_userInfoUpdateError]);

  useEffect(() => {
    if (st_userPassCompareDone) {
      passwordChangeToggle();
    }
    if (st_userPassCompareError) {
      return message.error(st_userPassCompareError);
    }
  }, [st_userPassCompareDone, st_userPassCompareError]);

  useEffect(() => {
    if (st_userInfoPassUpdateDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      passwordChangeToggle();
      pass.setValue("");
      newPass.setValue("");
      setPassCheck("");

      return message.success("비밀번호가 변경되었습니다.");
    }

    if (st_userInfoPassUpdateError) {
      return message.error(st_userInfoPassUpdateError);
    }
  }, [st_userInfoPassUpdateDone, st_userInfoPassUpdateError]);

  ////// TOGGLE //////
  const modalOpenToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const passwordChangeToggle = useCallback(() => {
    setIsPassword((prev) => !prev);
  }, [isPassword]);

  ////// HANDLER //////

  // 정보수정
  const infoUpdateHandler = useCallback(() => {
    dispatch({
      type: USER_INFO_UPDATE_REQUEST,
      data: {
        nickname: nickname.value,
        email: email.value,
        mobile: mobile.value,
        terms: term1.value,
        terms2: term2.value,
        terms3: term3.value,
        terms4: term4.value,
        terms5: term5.value,
        terms6: term6.value,
      },
    });
  }, [
    nickname.value,
    email.value,
    mobile.value,
    term1.value,
    term2.value,
    term3.value,
    term4.value,
    term5.value,
    term6.value,
  ]);

  // 새로운 비번 재입력 확인
  const passCheckHandler = useCallback(
    (e) => {
      setPassCheck(e.target.value);
    },
    [passCheck]
  );

  // 비번 변경
  const infoPassUpdateHandler = useCallback(() => {
    const passwordReg =
      /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;

    if (!pass.value || pass.value.trim() === "") {
      return message.error("기존 비밀번호를 입력해주세요.");
    }

    if (!newPass.value || newPass.value.trim() === "") {
      return message.error("새 비밀번호를 입력해주세요.");
    }

    if (!passwordReg.test(newPass.value)) {
      return message.error(
        "영문 대/소문자, 특수문자, 숫자 중 2개 이상 포함, 8자 이상 입력해주세요."
      );
    }

    if (!passCheck) {
      return message.error("새로운 비밀번호를 재입력해주세요.");
    }

    if (newPass.value !== passCheck) {
      return message.error("새로운 비밀번호가 일치하지 않습니다.");
    }

    dispatch({
      type: USER_INFO_PASS_UPDATE_REQUEST,
      data: {
        beforePassword: pass.value,
        afterPassword: newPass.value,
      },
    });
  }, [pass, newPass, passCheck]);

  // 비번 확인
  const passCompareHandler = useCallback(() => {
    if (!pass.value || pass.value.trim() === "") {
      return message.error("기존 비밀번호를 입력해주세요.");
    }

    dispatch({
      type: USER_PASS_COMPARE_REQUEST,
      data: {
        password: pass.value,
      },
    });
  }, [pass]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 개인정보 관리</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper al={`flex-start`}>
            <Wrapper width={width < 700 ? `100%` : `440px`} al={`flex-start`}>
              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `20px` : `30px`}
                fontWeight={`bold`}
                margin={`0 0 30px`}
              >
                개인정보 관리
              </Wrapper>
              <Text
                fontSize={width < 900 ? `18px` : `24px`}
                fontWeight={`600`}
                margin={`0 0 30px`}
              >
                회원 정보 수정
              </Text>

              <Text fontSize={`16px`} color={Theme.grey_C}>
                아이디
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                readOnly
                value={me && me.userId}
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                비밀번호
              </Text>
              <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 30px`}>
                <TextInput
                  width={`calc(100% - 110px)`}
                  height={`50px`}
                  type="password"
                  border={`1px solid ${Theme.lightGrey_C}`}
                  placeholder="비밀번호를 입력해주세요."
                  {...pass}
                />
                <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme2`}
                  onClick={passCompareHandler}
                >
                  변경
                </CommonButton>
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-start`}>
                <Text
                  fontSize={`16px`}
                  color={Theme.grey_C}
                  margin={`0 6px 0 0`}
                >
                  이름 (실명)
                </Text>
                <CommonButton
                  width={`auto`}
                  height={`24px`}
                  padding={`0 7px`}
                  kindOf={`grey2`}
                  onClick={modalOpenToggle}
                  fontSize={`14px`}
                >
                  개명하셨다면?
                </CommonButton>
              </Wrapper>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                readOnly
                value={me && me.username}
              />

              <Text fontSize={`16px`} color={Theme.grey_C}>
                닉네임
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                {...nickname}
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                이메일
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                {...email}
              />

              <Text fontSize={`16px`} color={Theme.grey_C}>
                휴대폰 번호
              </Text>
              <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 30px`}>
                <TextInput
                  width={`calc(100% - 150px)`}
                  height={`50px`}
                  type="number"
                  border={`1px solid ${Theme.lightGrey_C}`}
                  placeholder="휴대폰 번호를 입력해주세요."
                  {...mobile}
                />
                <CommonButton
                  width={`136px`}
                  height={`50px`}
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme2`}
                >
                  다른번호 인증
                </CommonButton>
              </Wrapper>

              <Text fontSize={`16px`} color={Theme.grey_C} margin={`0 0 12px`}>
                정보 수신 동의
              </Text>
              <Checkbox
                checked={term1.value}
                onClick={() => term1.setValue(!term1.value)}
              >
                (선택)프로모션/혜택 등 광고성 정보 수신 동의
              </Checkbox>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0 30px`}>
                <Checkbox
                  checked={term2.value}
                  onClick={() => term2.setValue(!term2.value)}
                >
                  SMS
                </Checkbox>
                <Checkbox
                  checked={term3.value}
                  onClick={() => term3.setValue(!term3.value)}
                >
                  카카오톡
                </Checkbox>
                <Checkbox
                  checked={term4.value}
                  onClick={() => term4.setValue(!term4.value)}
                >
                  이메일
                </Checkbox>
              </Wrapper>
              <Text fontSize={`16px`} color={Theme.grey_C} margin={`0 0 12px`}>
                Contact 진행 상황 알림
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Checkbox
                  checked={term5.value}
                  onClick={() => term5.setValue(!term5.value)}
                >
                  카카오톡
                </Checkbox>
                <Checkbox
                  checked={term6.value}
                  onClick={() => term6.setValue(!term6.value)}
                >
                  이메일
                </Checkbox>
              </Wrapper>
            </Wrapper>
            <Text fontSize={`16px`} color={Theme.grey2_C} margin={`10px 0 0`}>
              카카오톡 계정이 없을 경우 카카오톡을 통한 알림 서비스 제공이
              어렵습니다.
            </Text>
            <CommonButton
              margin={`50px 0 100px`}
              width={`180px`}
              height={`50px`}
              fontSize={`18px`}
              onClick={infoUpdateHandler}
            >
              회원정보 수정
            </CommonButton>
          </RsWrapper>

          <Modal footer={null} onCancel={modalOpenToggle} visible={isModal}>
            <Wrapper padding={width < 900 ? `30px 0` : `30px`}>
              <Text
                fontSize={`28px`}
                fontWeight={`600`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                개명하셨다면?
              </Text>

              <Text fontSize={`16px`}>
                메일로 개명을 증명할 수 있는 서류를 보내주세요!
              </Text>
              <Text fontSize={`16px`}>
                확인이 완료되면 해당 이름으로 변경됩니다.
              </Text>
              <CommonButton
                width={`150px`}
                height={`50px`}
                fontSize={`18px`}
                margin={`30px 0 0`}
                onClick={() => modalOpenToggle()}
              >
                확인
              </CommonButton>
            </Wrapper>
          </Modal>

          <Modal
            footer={null}
            onCancel={passwordChangeToggle}
            visible={isPassword}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px`}>
              <Text
                fontSize={`28px`}
                fontWeight={`600`}
                color={Theme.basicTheme_C}
                margin={`0 0 35px`}
              >
                비밀번호 변경
              </Text>

              <Wrapper al={`flex-start`}>
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                >
                  현재 비밀번호
                </Text>
                <TextInput
                  margin={`12px 0 30px`}
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  type="password"
                  placeholder="기존 비밀번호를 입력해주세요."
                  {...pass}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                >
                  새 비밀번호
                </Text>
                <TextInput
                  margin={`12px 0 30px`}
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  type="password"
                  placeholder="영문 대/소문자, 특수문자, 숫자 중 2개 이상 포함, 8자 이상 입력"
                  {...newPass}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                >
                  새 비밀번호 확인
                </Text>
                <TextInput
                  margin={`12px 0 30px`}
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  type="password"
                  placeholder="비밀번호를 재 입력 해주세요."
                  value={passCheck}
                  onChange={passCheckHandler}
                />
              </Wrapper>
              <CommonButton
                width={`150px`}
                height={`50px`}
                fontSize={`18px`}
                margin={`30px 0 0`}
                onClick={infoPassUpdateHandler}
              >
                변경
              </CommonButton>
            </Wrapper>
          </Modal>
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
