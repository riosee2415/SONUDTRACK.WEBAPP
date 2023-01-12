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
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const Btn = styled(Wrapper)`
  width: auto;
  color: ${Theme.grey_C};
  font-size: 22px;
  position: relative;
  margin: 0 10px;
  padding: 0 0 16px;

  &:before {
    content: "";
    width: 0;
    height: 1px;
    background: ${Theme.basicTheme_C};
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.3s;
  }

  ${(props) =>
    props.isActive &&
    `
   color: ${Theme.basicTheme_C};
    font-weight: bold;

    &:before {
      width: 100%;
    }
  `}

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
    font-weight: bold;

    &:before {
      width: 100%;
    }
  }
`;

const BoxBtn = styled(Wrapper)`
  width: calc(100% / 5 - 10px);
  height: 54px;
  background: ${Theme.lightGrey2_C};
  font-size: 18px;

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
    font-weight: bold;
    background: ${Theme.subTheme_C};
  }
`;

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
        <title>NEW WAVE Sound | Artworks Community</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`0 0 100px`}>
          <RsWrapper>
            <Wrapper
              height={`260px`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/artworks.png")`}
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
                  Artwork Community
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                  margin={`0 0 28px`}
                >
                  Tracker, Top Liner가 필요할 때 이용하세요!
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`40px 0 20px`}
            >
              <Btn isActive>Track (for Singer, Top Liner)</Btn>
              <Btn>Top Line (for Tracker)</Btn>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              borderBottom={`3px solid ${Theme.lightGrey2_C}`}
              padding={`0 0 20px`}
            >
              <Wrapper width={`auto`} dr={`row`}>
                <CommonButton
                  height={`54px`}
                  fontSize={`18px`}
                  radius={`50px`}
                  margin={`0 14px 0 0`}
                  width={`180px`}
                  kindOf={`subTheme2`}
                >
                  내가 만든 음악 보기
                </CommonButton>
                <CommonButton
                  height={`54px`}
                  fontSize={`18px`}
                  radius={`50px`}
                  kindOf={`grey`}
                  width={`102px`}
                >
                  업로드
                </CommonButton>
              </Wrapper>
              <Wrapper
                width={width < 700 ? `100%` : `400px`}
                position={`relative`}
                height={`54px`}
                color={Theme.black_C}
              >
                <Wrapper
                  position={`absolute`}
                  top={`0`}
                  left={`14px`}
                  height={`100%`}
                  width={`auto`}
                  fontSize={`25px`}
                  color={Theme.basicTheme_C}
                >
                  <SearchOutlined />
                </Wrapper>
                <TextInput
                  width={`100%`}
                  height={`100%`}
                  placeholder="검색어를 입력해주세요."
                  radius={`30px`}
                  padding={`0 10px 0 50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0`}>
              <BoxBtn>Genre</BoxBtn>
              <BoxBtn>BPM</BoxBtn>
              <BoxBtn>Key</BoxBtn>
              <BoxBtn>Gender</BoxBtn>
              <BoxBtn>License</BoxBtn>
            </Wrapper>

            <Wrapper
              border={`1px solid ${Theme.lightGrey_C}`}
              padding={`20px 10px`}
              dr={`row`}
              ju={`flex-start`}
              al={`flex-start`}
            >
              <CommonButton
                kindOf={`grey`}
                width={`calc(100% / 8 - 20px)`}
                margin={`0 10px`}
                height={`54px`}
              >
                Show All
              </CommonButton>
              <CommonButton
                kindOf={`grey`}
                width={`calc(100% / 8 - 20px)`}
                margin={`0 10px`}
                height={`54px`}
              >
                Popular
              </CommonButton>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0 16px`}>
              <CommonButton
                width={`66px`}
                height={`24px`}
                padding={`0`}
                kindOf={`grey2`}
                margin={`0 6px 0 0`}
              >
                초기화
              </CommonButton>
              <CommonButton
                width={`66px`}
                height={`24px`}
                padding={`0`}
                kindOf={`grey2`}
              >
                전체 선택
              </CommonButton>
            </Wrapper>

            <CommonButton width={`150px`} height={`48px`} fontSize={`18px`}>
              검색
            </CommonButton>

            <Wrapper dr={`row`} ju={`space-between`} margin={`60px 0 40px`}>
              <Wrapper
                dr={`row`}
                width={`auto`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/artworks.png`}
                  width={`18px`}
                  margin={`0 6px 0 0`}
                />
                Track
              </Wrapper>
              <Wrapper dr={`row`} width={`auto`} fontSize={`16px`}>
                <Text color={Theme.grey_C} isHover>
                  추천순
                </Text>
                <SpanText
                  fontSize={`10px`}
                  margin={`0 10px`}
                  color={Theme.lightGrey_C}
                >
                  |
                </SpanText>
                <Text color={Theme.grey_C} isHover>
                  최신순
                </Text>
              </Wrapper>
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

export default Index;
