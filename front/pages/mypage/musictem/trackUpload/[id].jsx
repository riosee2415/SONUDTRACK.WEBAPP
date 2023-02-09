import React, { useEffect } from "react";
import ClientLayout from "../../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../../hooks/useWidth";
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
} from "../../../../components/commonComponents";
import { Checkbox, message, Modal, Switch } from "antd";
import Theme from "../../../../components/Theme";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import {
  CloseOutlined,
  DownloadOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import Link from "next/dist/client/link";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);

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

  const modalToggle2 = useCallback(() => {
    setIsModal2((prev) => !prev);
  }, [isModal2]);
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
              <Text fontSize={`24px`} fontWeight={`600`} isHover>
                <LeftOutlined style={{ margin: `0 15px 0 0` }} /> Musictem
                업로드 신청
              </Text>

              <Wrapper
                width={width < 700 ? `100%` : `440px`}
                bgColor={Theme.subTheme_C}
                height={`55px`}
                fontSize={width < 700 ? `14px` : `16px`}
                radius={`5px`}
                margin={`18px 0 30px`}
              >
                제출은 앨범으로만 가능하며, 모두 같은 형식이어야 합니다.
              </Wrapper>
              <Text fontSize={width < 700 ? `14px` : `16px`}>Track 업로드</Text>

              <Wrapper
                width={`auto`}
                padding={`20px`}
                radius={`5px`}
                fontSize={width < 700 ? `14px` : `16px`}
                al={`flex-start`}
                bgColor={Theme.lightGrey2_C}
                margin={`10px 0 30px`}
              >
                <Text>
                  모든 track은 곡제목과 함께 MP3, WAV 파일 모두 등록해주세요.
                </Text>
                <Text>타이틀 곡이 앨범명이 됩니다.</Text>
                <Text>
                  예) 봄이 와(타이틀곡).mp3, 봄이 와(타이틀곡).wav, 벚꽃.mp3,
                  벚꽃.wav
                </Text>
                <Text
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`15px 0 0`}
                >
                  Tip!
                </Text>
                <Text fontWeight={`500`}>
                  한 앨범의 곡은 앨범 테마에 맞게 같은 분위기로 등록하시면
                  좋습니다.
                </Text>
                <Text fontWeight={`500`}>
                  한 앨범에 등록 가능한 Track 수는 최소 1곡에서 최대 10곡
                  입니다.
                </Text>
                <Text fontWeight={`500`}>
                  모든 참여 인원의 동의서가 있어야 음원 판매가 가능합니다.
                </Text>
                <Text color={Theme.darkGrey_C}>
                  (추후 뮤직템 등록시 동의서를 다운받을 수 있습니다.)
                </Text>
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`space-between`}
                margin={`0 0 30px`}
                width={width < 700 ? `100%` : `440px`}
              >
                <TextInput
                  width={`calc(100% - 110px)`}
                  height={`50px`}
                  readOnly
                  border={`1px solid ${Theme.lightGrey_C}`}
                  placeholder="Track을 업로드해주세요."
                />
                <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={width < 700 ? `14px` : `16px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme2`}
                >
                  파일등록
                </CommonButton>
              </Wrapper>

              <Text color={Theme.grey2_C}>
                ※다른 곳에서 유통 및 스트리밍한 내역이 있을 경우
              </Text>
              <Text color={Theme.grey2_C} margin={`0 0 20px`}>
                New Wave Sound에서 판매가 불가합니다.
              </Text>

              <Checkbox>
                <Text fontSize={width < 700 ? `14px` : `16px`}>
                  (필수)네, 없습니다.
                </Text>
              </Checkbox>

              <CommonButton
                width={`180px`}
                height={`50px`}
                margin={`50px 0 100px`}
                onClick={modalToggle2}
              >
                신청하기
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          <Modal
            onCancel={modalToggle2}
            visible={isModal2}
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
                정상적으로 신청되었습니다!
              </Text>

              <Wrapper
                bgColor={Theme.subTheme_C}
                color={Theme.red_C}
                padding={`17px 10px`}
                margin={`0 0 24px`}
                fontWeight={`600`}
              >
                잠깐! 판매자님의 음원 보호를 위해 다음을 확인해주세요!
              </Wrapper>

              <Text fontSize={width < 700 ? `14px` : `16px`}>
                등록하신 Musictem이 승인되면&nbsp;
                <SpanText fontWeight={`600`}>
                  New Wave Sound의 로고 사운드
                </SpanText>
                가
              </Text>
              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                margin={`0 0 30px`}
              >
                등록하신 음원에 &nbsp;
                <SpanText fontWeight={`600`}>
                  10초에 한 번씩 재생되도록 작업
                </SpanText>
                하여 보내주세요!
              </Text>

              <Wrapper dr={`row`} fontSize={width < 700 ? `14px` : `16px`}>
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/musictem.png`}
                  width={`10px`}
                />
                <Text td={`underline`} margin={`0 6px`}>
                  New Wave Sound Water Mark
                </Text>
                <DownloadOutlined />
              </Wrapper>
              <Wrapper
                dr={`row`}
                fontSize={width < 700 ? `14px` : `16px`}
                margin={`5px 0 0`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/musictem.png`}
                  width={`10px`}
                />
                <Text td={`underline`} margin={`0 6px`}>
                  Sample
                </Text>
                <DownloadOutlined />
              </Wrapper>
            </Wrapper>
          </Modal>

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
                fontSize={width < 700 ? `14px` : `16px`}
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
                fontSize={width < 700 ? `14px` : `16px`}
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
