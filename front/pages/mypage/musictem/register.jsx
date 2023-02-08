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
              <Text fontSize={`24px`} fontWeight={`600`} isHover>
                <LeftOutlined style={{ margin: `0 15px 0 0` }} /> Musictem 등록
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
              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                color={Theme.grey_C}
                margin={`0 0 12px`}
              >
                앨범 이미지 <SpanText color={Theme.basicTheme_C}>*</SpanText>
              </Text>
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
                  placeholder="권장사이즈 : 300*300px"
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

              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                color={Theme.grey_C}
                margin={`0 0 12px`}
              >
                장르(중복선택가능)
                <SpanText color={Theme.basicTheme_C}>*</SpanText>
              </Text>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                width={width < 700 ? `100%` : `440px`}
              >
                <Checkbox>Pop</Checkbox>
                <Checkbox>Jazz</Checkbox>
                <Checkbox>장르</Checkbox>
              </Wrapper>

              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                color={Theme.grey_C}
                margin={`30px 0 12px`}
              >
                앨범 이미지 <SpanText color={Theme.basicTheme_C}>*</SpanText>
              </Text>
              <TextInput
                width={width < 700 ? `100%` : `440px`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                placeholder="ex) 32bit"
              />

              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                color={Theme.grey_C}
                margin={`30px 0 12px`}
              >
                Sample Rate <SpanText color={Theme.basicTheme_C}>*</SpanText>
              </Text>
              <TextInput
                width={width < 700 ? `100%` : `440px`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                placeholder="ex) 44.1khz"
              />

              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                margin={`40px 0 0`}
              >
                Track 업로드
              </Text>
              <Wrapper
                width={`auto`}
                padding={`20px`}
                radius={`5px`}
                fontSize={width < 700 ? `14px` : `16px`}
                al={`flex-start`}
                bgColor={Theme.lightGrey2_C}
                margin={`10px 0 30px`}
              >
                <Text fontWeight={`bold`}>
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
                <Text>
                  한 앨범의 곡은 앨범 테마에 맞게 같은 분위기로 등록하시면
                  좋습니다.
                </Text>
                <Text>
                  한 앨범에 등록 가능한 Track 수는 최소 1곡에서 최대 10곡
                  입니다.
                </Text>
                <Text
                  fontWeight={`600`}
                  color={Theme.red_C}
                  margin={`15px 0 0`}
                >
                  꼭! 확인해주세요
                </Text>
                <Text>처음 등록한 파일의 이름과 형식을 유지해 주세요!</Text>
                <Text>
                  New Wave Sound의 워터마크가 등록하실 음원에 10초에 한 번씩
                  재생되도록 작업하여 보내주세요!
                </Text>
              </Wrapper>

              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                fontSize={width < 700 ? `14px` : `16px`}
              >
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
                ju={`flex-start`}
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

              <Wrapper
                dr={`row`}
                ju={`space-between`}
                margin={`30px 0 10px`}
                width={width < 700 ? `100%` : `440px`}
              >
                <TextInput
                  width={`calc(100% - 110px)`}
                  height={`50px`}
                  readOnly
                  border={`1px solid ${Theme.lightGrey_C}`}
                  placeholder="음원을 업로드해주세요.(중복 가능)"
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

              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                margin={`40px 0 0`}
              >
                제작 참여 동의서 업로드
              </Text>
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
                  해당 음원 판매를 위하여 제작에 참여한 연주자, 보컬, 프로듀서
                  등의 판매 허가 동의서가 필요합니다.
                </Text>
                <Text>반드시 참여한 모든 인원에 서명을 받아 제출하세요.</Text>
              </Wrapper>

              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                fontSize={width < 700 ? `14px` : `16px`}
                margin={`5px 0 0`}
              >
                <Text td={`underline`} margin={`0 6px 0 0`}>
                  동의서 다운로드
                </Text>
                <DownloadOutlined />
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`space-between`}
                margin={`30px 0 10px`}
                width={width < 700 ? `100%` : `440px`}
              >
                <TextInput
                  width={`calc(100% - 110px)`}
                  height={`50px`}
                  readOnly
                  border={`1px solid ${Theme.lightGrey_C}`}
                  placeholder="동의서를 업로드해주세요.(중복 가능)"
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

              <CommonButton
                width={`180px`}
                height={`50px`}
                margin={`50px 0 100px`}
              >
                등록하기
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
