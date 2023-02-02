import React, { useEffect } from "react";
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
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { Checkbox, message, Modal, Switch } from "antd";
import Theme from "../../components/Theme";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import { CloseOutlined } from "@ant-design/icons";

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
        <title>NEW WAVE Sound | My Musictem</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 50px`}>
              <Text
                fontSize={width < 900 ? `20px` : `30px`}
                fontWeight={`bold`}
              >
                My Musictem
              </Text>
              <CommonButton
                height={`27px`}
                padding={`0 10px`}
                margin={`0 14px`}
              >
                My Musictem 보러가기
              </CommonButton>

              <CommonButton
                kindOf={`subTheme`}
                height={`27px`}
                padding={`0 10px`}
              >
                White
              </CommonButton>
              <CommonButton
                kindOf={`grey`}
                height={`27px`}
                margin={`0 0 0 8px`}
                padding={`0 10px`}
              >
                등급 안내
              </CommonButton>
            </Wrapper>

            <Wrapper al={`flex-start`}>
              <Text fontSize={`24px`} fontWeight={`600`} margin={`0 0 30px`}>
                프로필 수정
              </Text>
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q1.
                </SpanText>
                아티스트명
                <SpanText
                  color={Theme.grey2_C}
                  fontWeight={`300`}
                  margin={`0 0 0 4px`}
                >
                  (한 번 설정하면 변경이 어려우니 신중하게 등록해주세요!)
                </SpanText>
              </Text>
              <TextInput
                width={`200px`}
                height={`50px`}
                placeholder="아티스트명"
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q2.
                </SpanText>
                프로필 이미지
              </Text>
              <Wrapper
                width={`440px`}
                dr={`row`}
                ju={`space-between`}
                margin={`0 0 10px`}
              >
                <TextInput
                  width={`calc(100% - 108px)`}
                  height={`50px`}
                  placeholder="프로필 이미지를 등록해주세요."
                  tyoe="text"
                  border={`1px solid ${Theme.lightGrey_C}`}
                />
                <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={`18px`}
                  fontWeight={`600`}
                  kindOf={`subTheme2`}
                >
                  파일등록
                </CommonButton>
              </Wrapper>
              <Wrapper
                width={`440px`}
                dr={`row`}
                ju={`space-between`}
                padding={`16px 14px`}
                bgColor={Theme.lightGrey2_C}
                margin={`0 0 60px`}
              >
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/music-file.png`}
                    width={`14px`}
                    margin={`0 5px 0 0`}
                  />
                  K-Pop.jpg
                </Text>
                <CloseOutlined />
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
                <Text
                  fontSize={`24px`}
                  fontWeight={`600`}
                  margin={`0 10px 0 0`}
                >
                  Musictem 업로드 신청
                </Text>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  새로운 음원을 등록해주세요!
                </Text>
              </Wrapper>

              <CommonButton
                kindOf={`subTheme`}
                width={`142px`}
                height={`48px`}
                margin={`0 0 20px`}
              >
                승인 전 등록하기
              </CommonButton>

              <Wrapper
                width={`60%`}
                dr={`row`}
                borderTop={`1px solid ${Theme.lightGrey_C}`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                height={`66px`}
                color={Theme.subTheme4_C}
                fontSize={`16px`}
              >
                <Wrapper width={`30%`}>앨범명</Wrapper>
                <Wrapper width={`40%`}>승인 여부</Wrapper>
                <Wrapper width={`30%`}>등록</Wrapper>
              </Wrapper>
              <Wrapper
                width={`60%`}
                dr={`row`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                height={`66px`}
                color={Theme.darkGrey_C}
                fontSize={`16px`}
              >
                <Wrapper width={`30%`}>앨범명</Wrapper>
                <Wrapper width={`40%`}>승인 대기 중</Wrapper>
                <Wrapper width={`30%`}>
                  <CommonButton width={`80px`} height={`35px`} kindOf={`grey`}>
                    등록하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={`60%`}
                dr={`row`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                height={`66px`}
                color={Theme.darkGrey_C}
                fontSize={`16px`}
              >
                <Wrapper width={`30%`}>앨범명</Wrapper>
                <Wrapper width={`40%`}>승인 완료</Wrapper>
                <Wrapper width={`30%`}>
                  <CommonButton
                    width={`80px`}
                    height={`35px`}
                    kindOf={`subTheme2`}
                  >
                    등록하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>

              <CommonButton
                width={`180px`}
                height={`50px`}
                margin={`50px 0 100px`}
                fontSize={`18px`}
              >
                저장하기
              </CommonButton>
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
