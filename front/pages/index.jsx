import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  Text,
  WholeWrapper,
  Wrapper,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../components/popup/popup";

const Comment = styled(Wrapper)`
  position: absolute;
  bottom: -62px;
  width: auto;
  height: 40px;
  background: ${Theme.white_C};
  color: ${Theme.grey_C};
  padding: 0 16px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;

  &:hover {
    color: ${Theme.basicTheme_C};
  }

  &:before {
    content: "";
    position: absolute;
    top: -14px;
    width: 0px;
    height: 0px;
    border-bottom: 14px solid ${Theme.white_C};
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
  }
`;

const CommentWrapper = styled(Wrapper)`
  &:hover ${Comment} {
    opacity: 1;
    visibility: visible;
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            height={`400px`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/main.png")`}
            radius={`14px`}
            overflow={`hidden`}
            shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
            margin={`0 0 60px`}
          >
            <Wrapper
              height={`100%`}
              bgColor={`rgba(0, 0, 0, 0.4)`}
              color={Theme.white_C}
            >
              <Text fontSize={`32px`} fontWeight={`500`} margin={`0 0 22px`}>
                NEW WAVE SOUND
              </Text>
              <Text fontSize={`16px`} lineHeight={`26px`}>
                다양한 사람들의 음악의 파도를 타고 당신의 음악을 완성하세요!
              </Text>
              <Text fontSize={`16px`} lineHeight={`26px`}>
                전 세계에 판매할 수 있는 글로벌 Aritist
              </Text>
              <Wrapper dr={`row`} margin={`20px 0 0`}>
                <CommentWrapper width={`auto`} position={`relative`}>
                  <CommonButton
                    width={`220px`}
                    height={`54px`}
                    kindOf={`white`}
                    fontSize={`18px`}
                    fontWeight={`500`}
                    margin={`0 15px 0 0`}
                  >
                    Artisttem
                  </CommonButton>
                  <Comment>내 음악을 완성할 Artist 찾기</Comment>
                </CommentWrapper>
                <CommonButton
                  width={`220px`}
                  height={`54px`}
                  kindOf={`white`}
                  fontSize={`18px`}
                  fontWeight={`500`}
                  margin={`0 0 0 15px`}
                >
                  Musictem
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Popup />
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
export default Home;
