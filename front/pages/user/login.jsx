import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";

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

const Login = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE //////
  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Login</title>
      </Head>

      <ClientLayout>
        <WholeWrapper
          bgColor={Theme.lightGrey3_C}
          minHeight={`100vh`}
          padding={`100px 0`}
        >
          <Wrapper
            width={width < 700 ? `100%` : `560px`}
            bgColor={Theme.white_C}
            radius={`20px`}
            shadow={`0 3px 15px rgba(179, 169, 190, 0.1)`}
            padding={width < 700 ? `80px 20px` : `100px 60px`}
          >
            <Text fontSize={`30px`} fontWeight={`600`} margin={`0 0 50px`}>
              로그인
            </Text>
            <Wrapper al={`flex-start`}>
              <Text fontSize={`16px`} color={Theme.grey_C}>
                아이디
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                placeholder="아이디를 입력해주세요."
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                비밀번호
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="password"
                placeholder="비밀번호를 입력해주세요."
              />
              <CommonButton width={`100%`} height={`50px`} fontSize={`18px`}>
                로그인
              </CommonButton>

              <Wrapper dr={`row`} fontSize={`16px`} margin={`34px 0 40px`}>
                <Text
                  color={Theme.grey_C}
                  onClick={() => movelinkHandler(`/user/signup`)}
                  isHover
                >
                  회원가입
                </Text>
                <SpanText
                  fontSize={`10px`}
                  margin={`0 10px`}
                  color={Theme.lightGrey_C}
                >
                  |
                </SpanText>
                <Text color={Theme.grey_C} isHover>
                  아이디/비밀번호 찾기
                </Text>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  cursor={`pointer`}
                  width={`auto`}
                  margin={`0 20px 0 0`}
                >
                  <Btn>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/login-icon/kakao.png`}
                    />
                    <Image
                      className="hoverimg"
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/login-icon/kakao_h.png`}
                    />
                  </Btn>
                  <Text margin={`10px 0 0`} color={Theme.grey_C}>
                    카카오
                  </Text>
                </Wrapper>
                <Wrapper cursor={`pointer`} width={`auto`}>
                  <Btn>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/login-icon/google.png`}
                    />
                    <Image
                      className="hoverimg"
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/login-icon/google_h.png`}
                    />
                  </Btn>
                  <Text margin={`10px 0 0`} color={Theme.grey_C}>
                    구글
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
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

export default Login;
