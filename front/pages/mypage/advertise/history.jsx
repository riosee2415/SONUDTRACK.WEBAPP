import React, { useEffect } from "react";
import Head from "next/head";
import ClientLayout from "../../../components/ClientLayout";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { Checkbox, message } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
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
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 광고 신청 내역</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `20px` : `30px`}
              fontWeight={`bold`}
              margin={`0 0 30px`}
            >
              광고 신청 내역
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <CommonButton
                width={`246px`}
                height={`54px`}
                kindOf={`subTheme2`}
              >
                Artisttem
              </CommonButton>
              <CommonButton
                kindOf={`grey3`}
                width={`246px`}
                height={`54px`}
                margin={`0 20px`}
              >
                Musictem
              </CommonButton>
              <CommonButton kindOf={`grey3`} width={`246px`} height={`54px`}>
                Artworks
              </CommonButton>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              margin={`20px 0 30px`}
            ></Wrapper>
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

export default Index;
