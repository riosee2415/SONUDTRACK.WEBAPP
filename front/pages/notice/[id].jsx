import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/dist/client/link";

const Index = () => {
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
        <title>NEW WAVE Sound | Notice</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              height={`260px`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/search.png")`}
              radius={`14px`}
              overflow={`hidden`}
              shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
            >
              <Wrapper
                height={`100%`}
                bgColor={`rgba(0, 0, 0, 0.4)`}
                color={Theme.white_C}
              >
                <Text
                  fontSize={width < 900 ? `25px` : `32px`}
                  fontWeight={`500`}
                  margin={`0 0 16px`}
                >
                  C/S Center
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                  margin={`0 0 28px`}
                >
                  뉴웨이브사운드에 대한 궁금하신 점을 해결해드립니다.
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`50px 0`}
              fontSize={`18px`}
              fontWeight={`bold`}
            >
              <Link href={`/notice`}>
                <a>
                  <Text isHover>
                    <LeftOutlined /> 뒤로
                  </Text>
                </a>
              </Link>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `25px` : `30px`}
              fontWeight={`bold`}
            >
              공지사항에 대한 제목이 들어올 곳입니다.
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              height={`65px`}
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              borderBottom={`1px solid ${Theme.lightGrey_C}`}
              margin={`26px 0 40px`}
              fontSize={`16px`}
            >
              <Text color={Theme.grey2_C} margin={`0 24px 0 0`}>
                조회수
              </Text>
              <Text margin={width < 900 ? `0 50px 0 0` : `0 100px 0 0`}>
                123
              </Text>
              <Text color={Theme.grey2_C} margin={`0 24px 0 0`}>
                작성일자
              </Text>
              <Text>23.01.05</Text>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey_C}`}
            >
              <Image
                alt="thumbnail"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/art-goods/assets/images/main-page/img_4s_right_prod.png`}
                width={width < 800 ? `100%` : `60%`}
              />

              <Text fontSize={`18px`} margin={`30px 0 70px`}>
                공지사항에 대한 내용이 들어올 곳입니다. 공지사항에 대한 내용이
                들어올 곳입니다. 공지사항에 대한 내용이 들어올 곳입니다.
              </Text>
            </Wrapper>

            <Link href={`/notice`}>
              <a>
                <CommonButton
                  width={`180px`}
                  height={`50px`}
                  kindOf={`subTheme`}
                  fontSize={`18px`}
                  margin={`40px 0 100px`}
                >
                  이전으로
                </CommonButton>
              </a>
            </Link>
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
