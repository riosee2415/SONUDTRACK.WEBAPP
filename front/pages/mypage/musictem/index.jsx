import React, { useEffect } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
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
} from "../../../components/commonComponents";
import { Checkbox, message, Modal, Switch } from "antd";
import Theme from "../../../components/Theme";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Link from "next/dist/client/link";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  const [isModal, setIsModal] = useState(false);

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
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);
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
                onClick={modalToggle}
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
                width={width < 700 ? `100%` : `440px`}
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
                width={width < 700 ? `100%` : `440px`}
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

              <Link href={`/mypage/musictem/upload`}>
                <a>
                  <CommonButton
                    kindOf={`subTheme`}
                    width={`142px`}
                    height={`48px`}
                    margin={`0 0 20px`}
                  >
                    승인 전 등록하기
                  </CommonButton>
                </a>
              </Link>
              <Wrapper
                width={width < 900 ? `100%` : `60%`}
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
                width={width < 900 ? `100%` : `60%`}
                dr={`row`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                height={`66px`}
                color={Theme.darkGrey_C}
                fontSize={`16px`}
              >
                <Wrapper width={`30%`}>앨범명</Wrapper>
                <Wrapper width={`40%`}>승인 대기 중</Wrapper>
                <Wrapper width={`30%`}>
                  <CommonButton height={`35px`} kindOf={`grey`}>
                    등록하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `60%`}
                dr={`row`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                height={`66px`}
                color={Theme.darkGrey_C}
                fontSize={`16px`}
              >
                <Wrapper width={`30%`}>앨범명</Wrapper>
                <Wrapper width={`40%`}>승인 완료</Wrapper>
                <Wrapper width={`30%`}>
                  <CommonButton height={`35px`} kindOf={`subTheme2`}>
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

          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            width={`640px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={width < 900 ? `20px` : `28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                등급 안내
              </Text>

              <Wrapper
                bgColor={Theme.subTheme_C}
                padding={`17px 10px`}
                margin={`0 0 24px`}
                fontWeight={`600`}
              >
                <Text>누적 판매 금액과 상관없이</Text>
                <Text>누적 판매 건 수에 따라 등급이 업데이트 됩니다!</Text>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                color={Theme.darkGrey_C}
                fontSize={`16px`}
              >
                <Text>- white : 누적 건 수 100건 미만의 판매자 회원</Text>
                <Text>
                  - Blue : 누적 건 수 100건 이상 300건 미만의 판매자 회원
                </Text>
                <Text>- Purple : 누적 건 수 300건 이상의 판매자 회원</Text>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                color={Theme.grey_C}
                fontSize={`16px`}
                margin={`30px 0 0`}
              >
                <Text>
                  ※ 등급 심사일은 매월 1일에 결정되며, 등급 심사일로부터 3개월
                  이내 패널티 상태였다면 White 등급이 적용됩니다.
                </Text>
                <Text>
                  ※ 누적 판매 건수 조건을 만족하였더라도 그 외 조건을 미 충족한
                  판매자는 White 등급이 적용됩니다.
                </Text>
              </Wrapper>
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
