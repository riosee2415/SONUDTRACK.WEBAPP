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
  SquareBox,
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
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import useInput from "../../hooks/useInput";

const Box = styled(Wrapper)`
  width: calc(100% / 6 - 37px);
  margin: 0 44px 40px 0;
  border-radius: 7px;
  position: relative;
  overflow: hidden;

  &:nth-child(6n) {
    margin: 0 0 40px;
  }

  @media (max-width: 1400px) {
    width: calc(100% / 5 - 24px);
    margin: 0 30px 40px 0;

    &:nth-child(6n) {
      margin: 0 30px 40px 0;
    }

    &:nth-child(5n) {
      margin: 0 0 40px;
    }
  }

  @media (max-width: 700px) {
    width: calc(100% / 2 - 8px);
    margin: 0 10px 40px 0;

    &:nth-child(6n) {
      margin: 0 5px 40px 0;
    }

    &:nth-child(5n) {
      margin: 0 5px 40px 0;
    }

    &:nth-child(2n) {
      margin: 0 5px 40px 0;
    }
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  const comName = useInput("");
  const comNum = useInput("");

  const [filmo, setFilmo] = useState(false);
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
  const filmoToggle = useCallback(() => {
    setFilmo((prev) => !prev);
  }, [filmo]);

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | My Artisttem</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 50px`}>
              <Text
                al={`flex-start`}
                fontSize={width < 900 ? `20px` : `30px`}
                fontWeight={`bold`}
              >
                My Artisttem
              </Text>
              <CommonButton
                width={`160px`}
                height={`27px`}
                padding={`0`}
                margin={`0 20px 0 14px`}
              >
                My Artistem 보러가기
              </CommonButton>

              <Text fontSize={`16px`} margin={`0 8px 0 0`}>
                휴가중
              </Text>
              <Switch checkedChildren="on" unCheckedChildren="off" />
            </Wrapper>

            <Wrapper al={`flex-start`}>
              <Text fontSize={`24px`} fontWeight={`600`} margin={`0 0 30px`}>
                사업자번호 인증
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
                담당자명
              </Text>
              <TextInput
                width={`200px`}
                height={`50px`}
                placeholder="담당자 성함"
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
                사업자번호
              </Text>
              <Wrapper
                width={`440px`}
                dr={`row`}
                ju={`space-between`}
                margin={`0 0 60px`}
              >
                <TextInput
                  width={`calc(100% - 108px)`}
                  height={`50px`}
                  placeholder="사업자번호를 입력해주세요."
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
                  인증하기
                </CommonButton>
              </Wrapper>
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
                margin={`0 0 30px`}
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
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q3.
                </SpanText>
                아티스트를 소개하는 한 마디
                <SpanText
                  color={Theme.grey2_C}
                  fontWeight={`300`}
                  margin={`0 0 0 4px`}
                >
                  (50자 이내)
                </SpanText>
              </Text>
              <TextInput
                width={`60%`}
                height={`50px`}
                placeholder="예) 전자 음악을 실험하는 것을 좋아하고, 저의 사운드는 개성 있고 독특합니다!"
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
                  Q4.
                </SpanText>
                사용 가능한 언어/국가
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
                  placeholder="사용 가능한 언어를 작성해주세요."
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
                  추가하기
                </CommonButton>
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`} width={`440px`}>
                <Wrapper
                  width={`auto`}
                  height={`27px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  padding={`0 15px`}
                  radius={`25px`}
                  dr={`row`}
                  margin={`0 8px 0 0`}
                >
                  한국/대한민국
                  <CloseOutlined />
                </Wrapper>
                <Wrapper
                  width={`auto`}
                  height={`27px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  padding={`0 15px`}
                  radius={`25px`}
                  dr={`row`}
                  margin={`0 8px 0 0`}
                >
                  영어/미국
                  <CloseOutlined />
                </Wrapper>
              </Wrapper>
              <Text fontSize={`24px`} fontWeight={`600`} margin={`60px 0 30px`}>
                상세 프로필 수정
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
                주로 하는 역할(기술)과 장르는 무엇인가요?
              </Text>
              <TextArea
                width={`60%`}
                height={`86px`}
                placeholder="예) 주로 Pop을 하고 노래와 탑라인을 합니다"
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
                보통의 작업 시간은 몇일인가요?
              </Text>
              <TextArea
                width={`60%`}
                height={`86px`}
                placeholder="예) 간단한 데모 정도면 1~2일, 모든 하모니와 탑라인을 포함하면 보통 4~5일 걸립니다."
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
                  Q3.
                </SpanText>
                녹음 환경과 장비는 무엇을 사용하나요?
              </Text>
              <TextArea
                width={`60%`}
                height={`86px`}
                placeholder="예) 간단한 데모 정도는 집에서 작업하고, 정식 음원 작업은 녹음실을 대여하여 작업합니다. (SM58 마이크, 아폴로 오디오카드)"
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
                  Q4.
                </SpanText>
                평균 비용은 어떻게 되나요?
              </Text>
              <TextArea
                width={`60%`}
                height={`86px`}
                placeholder="예) 탑라인은 곡의 사용에 따라 50~100만원, 보컬은 데모는 25만원, 정식 음원 출판은 50만원 선입니다."
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
                  Q5.
                </SpanText>
                만약 작업한 프로젝트가 정식 음원이 출판되거나, 광고나
                라이브러리등의 상업적인 용도로 사용된다면 크레딧이 필요한가요?
              </Text>
              <TextArea
                width={`60%`}
                height={`86px`}
                placeholder="예) 광고나 라이브러리로 판매될 때는 상관이 없으나 정식 음원이 출판될 때에는 저작권 또는 실연협회에 등록되길 원합니다."
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
                  Q6.
                </SpanText>
                어떤 뮤지션을 좋아하고, 어떤 음악을 추구하나요?
              </Text>
              <TextArea
                width={`60%`}
                height={`86px`}
                placeholder="예) 아리아나 그란데와 태연을 좋아하고 팝스러운 음악을 추구합니다."
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
                  Q7.
                </SpanText>
                이 일을 한지는 얼마나 되었고, 보통 어떤 작업을 하나요?
              </Text>
              <TextArea
                width={`60%`}
                height={`86px`}
                placeholder="예) 5년 정도 이 일을 했고, 서울예술대학을 나와서 특정한 소속사 없이 프리랜서로 많은 작업을 했습니다."
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
                그 외 하고싶은 말이 있나요?
              </Text>
              <TextArea
                width={`60%`}
                height={`86px`}
                placeholder="예) 음악에 따라 작업 시간과 비용이 달라질 순 있습니다. 팝스러운 멋진 음악을 원하시면 저에게 문의하세요!"
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
              />

              <Wrapper dr={`row`} ju={`flex-start`} margin={`60px 0 30px`}>
                <Text
                  fontSize={`24px`}
                  fontWeight={`600`}
                  margin={`0 20px 0 0`}
                >
                  필모그래피 등록
                </Text>
                <CommonButton onClick={filmoToggle}>
                  추가하기 <PlusOutlined />
                </CommonButton>
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Box>
                  <SquareBox>
                    <Image
                      alt="thumbnail"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/art-goods/assets/images/main-page/img_4s_right_prod.png`}
                    />
                  </SquareBox>
                  <Wrapper
                    height={`100%`}
                    bgColor={`rgba(0, 0, 0, 0.6)`}
                    color={Theme.white_C}
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                  >
                    <Text fontSize={`20px`} fontWeight={`bold`}>
                      임창정
                    </Text>
                    <Text fontSize={`16px`}>기다리는 이유</Text>
                  </Wrapper>
                </Box>
              </Wrapper>

              <Text fontSize={`24px`} fontWeight={`600`} margin={`60px 0 30px`}>
                검색 관리(TAG)
              </Text>

              <Text
                fontSize={`16px`}
                fontWeight={`600`}
                color={Theme.grey_C}
                margin={`0 0 12px`}
              >
                카테고리
              </Text>
              <Wrapper
                border={`1px solid ${Theme.lightGrey_C}`}
                padding={`20px 10px`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={`0 0 30px`}
              >
                <CommonButton
                  kindOf={`grey`}
                  width={
                    width < 1100
                      ? width < 900
                        ? `calc(100% / 3 - 20px)`
                        : `calc(100% / 5 - 20px)`
                      : `calc(100% / 8 - 20px)`
                  }
                  margin={`0 10px`}
                  padding={`0`}
                  height={width < 900 ? `40px` : `54px`}
                >
                  Show All
                </CommonButton>
                <CommonButton
                  kindOf={`grey`}
                  width={
                    width < 1100
                      ? width < 900
                        ? `calc(100% / 3 - 20px)`
                        : `calc(100% / 5 - 20px)`
                      : `calc(100% / 8 - 20px)`
                  }
                  margin={`0 10px`}
                  padding={`0`}
                  height={width < 900 ? `40px` : `54px`}
                >
                  Popular
                </CommonButton>
              </Wrapper>
              <Text
                fontSize={`16px`}
                fontWeight={`600`}
                color={Theme.grey_C}
                margin={`0 0 12px`}
              >
                Mood
              </Text>
              <Wrapper
                border={`1px solid ${Theme.lightGrey_C}`}
                padding={`20px 10px`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={`0 0 30px`}
              >
                <CommonButton
                  kindOf={`grey`}
                  width={
                    width < 1100
                      ? width < 900
                        ? `calc(100% / 3 - 20px)`
                        : `calc(100% / 5 - 20px)`
                      : `calc(100% / 8 - 20px)`
                  }
                  margin={`0 10px`}
                  padding={`0`}
                  height={width < 900 ? `40px` : `54px`}
                >
                  Show All
                </CommonButton>
                <CommonButton
                  kindOf={`grey`}
                  width={
                    width < 1100
                      ? width < 900
                        ? `calc(100% / 3 - 20px)`
                        : `calc(100% / 5 - 20px)`
                      : `calc(100% / 8 - 20px)`
                  }
                  margin={`0 10px`}
                  padding={`0`}
                  height={width < 900 ? `40px` : `54px`}
                >
                  Popular
                </CommonButton>
              </Wrapper>
              <Text
                fontSize={`16px`}
                fontWeight={`600`}
                color={Theme.grey_C}
                margin={`0 0 12px`}
              >
                Genre
              </Text>
              <Wrapper
                border={`1px solid ${Theme.lightGrey_C}`}
                padding={`20px 10px`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={`0 0 30px`}
              >
                <CommonButton
                  kindOf={`grey`}
                  width={
                    width < 1100
                      ? width < 900
                        ? `calc(100% / 3 - 20px)`
                        : `calc(100% / 5 - 20px)`
                      : `calc(100% / 8 - 20px)`
                  }
                  margin={`0 10px`}
                  padding={`0`}
                  height={width < 900 ? `40px` : `54px`}
                >
                  Show All
                </CommonButton>
                <CommonButton
                  kindOf={`grey`}
                  width={
                    width < 1100
                      ? width < 900
                        ? `calc(100% / 3 - 20px)`
                        : `calc(100% / 5 - 20px)`
                      : `calc(100% / 8 - 20px)`
                  }
                  margin={`0 10px`}
                  padding={`0`}
                  height={width < 900 ? `40px` : `54px`}
                >
                  Popular
                </CommonButton>
              </Wrapper>

              <CommonButton
                width={`180px`}
                height={`50px`}
                margin={`10px 0 100px`}
                fontSize={`18px`}
              >
                저장하기
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          <Modal
            visible={filmo}
            onCancel={filmoToggle}
            footer={null}
            width={`645px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 35px`}
              >
                필모그래피 등록
              </Text>

              <Wrapper al={`flex-start`}>
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  역할
                </Text>
                <TextInput
                  type="text"
                  placeholder="예) Vocal"
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  Comment
                </Text>
                <TextInput
                  type="text"
                  placeholder="예) 저는 이 곡의 가이드 보컬을 담당했습니다."
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  가수명
                </Text>
                <TextInput
                  type="text"
                  placeholder="예) 이유정"
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  곡제목
                </Text>
                <TextInput
                  type="text"
                  placeholder="예) 구름 위에서"
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  음원 등록
                </Text>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="MP3로만 등록해주세요."
                    width={`calc(100% - 110px)`}
                    readOnly={true}
                    height={`50px`}
                  />

                  <CommonButton
                    kindOf={`subTheme2`}
                    width={`100px`}
                    height={`50px`}
                  >
                    파일등록
                  </CommonButton>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  padding={`16px 14px`}
                  bgColor={Theme.lightGrey2_C}
                  margin={`10px 0 0`}
                >
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/music-file.png`}
                      width={`14px`}
                      margin={`0 5px 0 0`}
                    />
                    파일이름
                  </Text>
                  <CloseOutlined />
                </Wrapper>

                {/* 음원파일 등록했을때 나옴 */}
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`30px 0 14px`}
                >
                  앨범 커버 이미지 등록
                </Text>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="이미지를 등록해주세요."
                    width={`calc(100% - 110px)`}
                    readOnly={true}
                    height={`50px`}
                  />

                  <CommonButton
                    kindOf={`subTheme2`}
                    width={`100px`}
                    height={`50px`}
                  >
                    파일등록
                  </CommonButton>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  padding={`16px 14px`}
                  bgColor={Theme.lightGrey2_C}
                  margin={`10px 0 0`}
                >
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/image-file.png`}
                      width={`14px`}
                      margin={`0 5px 0 0`}
                    />
                    파일이름
                  </Text>
                  <CloseOutlined />
                </Wrapper>
              </Wrapper>
              <CommonButton width={`180px`} height={`50px`} margin={`34px 0 0`}>
                신청하기
              </CommonButton>
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
