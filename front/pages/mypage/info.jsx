import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
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
import { useEffect } from "react";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);

  console.log(me);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const nickname = useInput(me && me.nickname);
  const email = useInput(me && me.email);
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return message.error(`로그인이 필요한 페이지입니다.`);
    }
  }, [me]);
  ////// TOGGLE //////
  const modalOpenToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const passwordChangeToggle = useCallback(() => {
    setIsPassword((prev) => !prev);
  }, [isPassword]);

  ////// HANDLER //////
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
                />
                <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme2`}
                  onClick={passwordChangeToggle}
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
                value={me && me.name}
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
              <Checkbox>(선택)프로모션/혜택 등 광고성 정보 수신 동의</Checkbox>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0 30px`}>
                <Checkbox>SMS</Checkbox>
                <Checkbox>카카오톡</Checkbox>
                <Checkbox>이메일</Checkbox>
              </Wrapper>
              <Text fontSize={`16px`} color={Theme.grey_C} margin={`0 0 12px`}>
                Contact 진행 상황 알림
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Checkbox>카카오톡</Checkbox>
                <Checkbox>이메일</Checkbox>
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
                />
              </Wrapper>
              <CommonButton
                width={`150px`}
                height={`50px`}
                fontSize={`18px`}
                margin={`30px 0 0`}
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
