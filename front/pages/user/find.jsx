import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
  SNS_LOGIN_REQUEST,
} from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { Form, message } from "antd";
import KakaoLogin from "react-kakao-login";
import { useSession, signIn, signOut } from "next-auth/react";
import useInput from "../../hooks/useInput";

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const Btn = styled(Wrapper)`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 1px solid ${Theme.lightGrey_C};

  & img {
    width: 28px;

    &.hoverimg {
      display: none;
    }
  }

  &:hover {
    .hoverimg {
      display: block;
    }

    img {
      display: none;
    }
  }
`;

const Find = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentIdTab, setCurrentIdTab] = useState(0);
  const [currentPwTab, setCurrentPwTab] = useState(0);

  const nameInput = useInput(``);
  const mobileInput = useInput(``);

  const idInput = useInput(``);
  const emailInput = useInput(``);
  const codeInput = useInput(``);
  const pwInput = useInput(``);
  const pwCheckInput = useInput(``);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE //////
  ////// HANDLER //////

  //   아이디 찾기
  const idHandler = useCallback(
    (data) => {
      setCurrentIdTab(data);

      if (currentIdTab === 0) {
        if (!nameInput.value) {
          return message.error("이름을 입력해주세요.");
        }
        if (!mobileInput.value) {
          return message.error("전화번호를 입력해주세요.");
        }

        //   dispatch({
        //     type: FIND_ID_REQUEST,
        //     data: {
        //       username: nameInput.value,
        //       mobile: mobileInput.value,
        //     },
        //   });
      }
    },
    [currentIdTab, nameInput, mobileInput]
  );

  //   비밀번호 재설정
  const pwHandler = useCallback(
    (data) => {
      setCurrentPwTab(data);

      if (currentPwTab === 0) {
        if (!idInput.vlaue) {
          return message.error("아이디를 입력해주세요.");
        }
        if (!emailInput.vlaue) {
          return message.error("이메일을 입력해주세요.");
        }

        //   dispatch({});
      }

      if (currentPwTab === 1) {
        if (!codeInput.vlaue) {
          return message.error("코드를 입력해주세요.");
        }

        //   dispatch({});
      }

      if (currentPwTab === 2) {
        if (!pwInput.vlaue) {
          return message.error("비밀번호를 입력해주세요.");
        }
        if (!pwCheckInput.vlaue) {
          return message.error("비밀번호를 재입력해주세요.");
        }
        if (pwCheckInput.vlaue !== pwInput.value) {
          return message.error("비밀번호가 일치하지 않습니다..");
        }

        //   dispatch({});
      }
    },
    [pwInput, pwCheckInput, currentPwTab, codeInput, idInput, emailInput]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 아이디/비밀번호 찾기</title>
      </Head>

      <ClientLayout>
        <WholeWrapper
          bgColor={Theme.lightGrey3_C}
          minHeight={`100vh`}
          padding={`100px 0`}
        >
          <RsWrapper>
            <Wrapper
              padding={width < 700 ? `60px 30px` : `60px`}
              bgColor={Theme.white_C}
              radius={`20px`}
              width={width < 700 ? `100%` : `auto`}
              margin={`0 0 100px`}
              al={`flex-start`}
            >
              <Text fontSize={`30px`} fontWeight={`600`}>
                아이디 찾기
              </Text>

              {currentIdTab === 0 && (
                <>
                  <Text
                    margin={`30px 0 10px`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    이름
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    placeholder="이름을 입력해주세요."
                    {...nameInput}
                  />

                  <Text
                    margin={`30px 0 10px`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    연락처
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    placeholder=" 연락처를 입력해주세요."
                    {...mobileInput}
                  />

                  <CommonButton
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    margin={`30px 0 0`}
                    fontSize={`18px`}
                    onClick={() => idHandler(1)}
                  >
                    아이디 찾기
                  </CommonButton>
                </>
              )}

              {currentIdTab === 1 && (
                <>
                  <Text
                    margin={`30px 0 10px`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    아이디
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    readOnly={true}
                    value=" dkdlel"
                  />

                  <CommonButton
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    margin={`30px 0 0`}
                    fontSize={`18px`}
                    onClick={() => router.push(`/user/login`)}
                  >
                    로그인 하러가기
                  </CommonButton>
                </>
              )}
            </Wrapper>

            <Wrapper
              padding={width < 700 ? `60px 30px` : `60px`}
              bgColor={Theme.white_C}
              radius={`20px`}
              width={width < 700 ? `100%` : `auto`}
              al={`flex-start`}
            >
              <Text fontSize={`30px`} fontWeight={`600`}>
                비밀번호 재설정
              </Text>

              {currentPwTab === 0 && (
                <>
                  <Text
                    margin={`30px 0 10px`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    아이디
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    placeholder="아이디를 입력해주세요."
                    {...idInput}
                  />

                  <Text
                    margin={`30px 0 10px`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    이메일
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    placeholder=" 이메일을 입력해주세요."
                    {...emailInput}
                  />

                  <CommonButton
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    margin={`30px 0 0`}
                    fontSize={`18px`}
                    onClick={() => pwHandler(1)}
                  >
                    비밀번호 찾기
                  </CommonButton>
                </>
              )}

              {currentPwTab === 1 && (
                <>
                  <Text
                    margin={`30px 0 10px`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    코드
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    placeholder=" 코드를 입력해주세요."
                    {...codeInput}
                  />

                  <CommonButton
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    margin={`30px 0 0`}
                    fontSize={`18px`}
                    onClick={() => pwHandler(2)}
                  >
                    코드 확인
                  </CommonButton>
                </>
              )}

              {currentPwTab === 2 && (
                <>
                  <Text
                    margin={`30px 0 10px`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    비밀번호
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    placeholder=" 비밀번호를 입력해주세요."
                    {...pwInput}
                  />
                  <Text
                    margin={`30px 0 10px`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    비밀번호 재입력
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    placeholder="비밀번호를 재입력해주세요."
                    {...pwCheckInput}
                  />

                  <CommonButton
                    width={width < 700 ? `100%` : `440px`}
                    height={`50px`}
                    margin={`30px 0 0`}
                    fontSize={`18px`}
                  >
                    변경하기
                  </CommonButton>
                </>
              )}
            </Wrapper>
          </RsWrapper>
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

export default Find;
