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

const Login = () => {
  ////// GLOBAL STATE //////

  const { st_loginLoading, st_loginDone, st_loginError, st_snsLoginError } =
    useSelector((state) => state.user);

  ////// HOOKS //////
  // 구글 로그인
  const { data: session } = useSession();

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  ////// REDUX //////

  ////// USEEFFECT //////

  // 구글로그인
  useEffect(() => {
    if (session) {
      dispatch({
        type: SNS_LOGIN_REQUEST,
        data: {
          userId: session.user.email,
          password: session.user.email,
          nickname: session.user.email,
          email: session.user.email,
          usename: session.user.email,
          mobile: "",
        },
      });
    }
  }, [session]);

  // 로그인 후 처리
  useEffect(() => {
    if (st_loginDone) {
      router.push("/");
      return message.success("로그인되었습니다.");
    }

    if (st_loginError) {
      return message.error(st_loginError);
    }
  }, [st_loginDone, st_loginError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 로그인
  const loginFinish = useCallback((data) => {
    dispatch({
      type: LOGIN_REQUEST,
      data: {
        userId: data.userId,
        password: data.password,
      },
    });
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
              <CustomForm onFinish={loginFinish}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  아이디
                </Text>
                <Form.Item
                  name="userId"
                  rules={[{ required: true, message: "아이디는 필수입니다." }]}
                >
                  <TextInput
                    margin={`12px 0 5px`}
                    width={`100%`}
                    height={`50px`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    type="text"
                    placeholder="아이디를 입력해주세요."
                  />
                </Form.Item>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  비밀번호
                </Text>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "비밀번호는 필수입니다." },
                  ]}
                >
                  <TextInput
                    margin={`12px 0 5px`}
                    width={`100%`}
                    height={`50px`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                  />
                </Form.Item>
                <CommonButton
                  width={`100%`}
                  height={`50px`}
                  fontSize={`18px`}
                  htmlType="submit"
                  loading={st_loginLoading}
                >
                  로그인
                </CommonButton>
              </CustomForm>

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
                  <KakaoLogin
                    token={"94eedd94982737c1f4ac8eaaaee6fa14"}
                    onSuccess={(data) => {
                      // setSnsData(data.profile.kakao_account);
                      dispatch({
                        type: SNS_LOGIN_REQUEST,
                        data: {
                          userId: data.profile.kakao_account.email,
                          password: data.profile.kakao_account.email,
                          nickname: data.profile.kakao_account.email,
                          mobile: "1",
                          email: data.profile.kakao_account.email,
                          username: data.profile.kakao_account.email,
                        },
                      });
                    }}
                    onFailure={(data) => {
                      console.log(data);
                    }}
                    className="KakaoLogin"
                    getProfile="true"
                    render={({ onClick }) => {
                      return (
                        <>
                          <Btn
                            onClick={(e) => {
                              e.preventDefault();
                              onClick();
                            }}
                          >
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
                        </>
                      );
                    }}
                  ></KakaoLogin>
                </Wrapper>

                <Wrapper cursor={`pointer`} width={`auto`}>
                  <Btn onClick={() => signIn("google")}>
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
