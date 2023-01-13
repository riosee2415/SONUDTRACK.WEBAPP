import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  ArtWrapper,
  CommonButton,
  Image,
  RsWrapper,
  SquareBox,
  Text,
  TextArea,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { BellOutlined, StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import { Modal, Popover, Rate, Select } from "antd";

const Index = () => {
  ////// GLOBAL STATE //////
  const [isModal, setIsModal] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const detailToggle = useCallback(() => {
    setIsDetail((prev) => !prev);
  }, [isDetail]);
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Artist</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            position={`absolute`}
            top={`0`}
            left={`0`}
            height={`640px`}
            zIndex={`-1`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/example-img/artisttem.png")`}
          >
            <Wrapper
              height={`100%`}
              bgColor={`linear-gradient( rgba(255, 255, 255, 0),${Theme.white_C})`}
            ></Wrapper>
          </Wrapper>

          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`50px 0`}>
              <Wrapper width={width < 800 ? `100%` : `214px`}>
                <Image
                  width={`214px`}
                  height={`214px`}
                  radius={`100%`}
                  shadow={`3px 3px 15px rgba(0, 0, 0, 0.1)`}
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png"
                  alt="thumbnail"
                />
                <Wrapper
                  dr={`row`}
                  width={`auto`}
                  color={Theme.subTheme3_C}
                  fontSize={`16px`}
                  margin={`24px 0 0`}
                >
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <Text
                    color={Theme.darkGrey_C}
                    fontSize={`14px`}
                    margin={`0 0 0 5px`}
                  >
                    (00명)
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={width < 800 ? `100%` : `calc(100% - 214px)`}
                al={`flex-start`}
                padding={width < 800 ? `20px 0 0` : `0 0 0 56px`}
              >
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/artisttem.png`}
                    width={`18px`}
                    margin={`0 6px 0 0`}
                  />
                  <Text
                    fontWeight={`500`}
                    fontSize={`16px`}
                    color={Theme.basicTheme_C}
                  >
                    Artisttem
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`16px 0 24px`}>
                  <Text
                    fontSize={width < 900 ? `20px` : `28px`}
                    fontWeight={`bold`}
                    margin={`0 14px 0 0`}
                  >
                    이차미
                  </Text>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                    width={`26px`}
                    margin={`0 4px 0 0`}
                  />
                  <Text color={Theme.darkGrey_C} fontSize={`12px`}>
                    98
                  </Text>
                </Wrapper>
                <Text fontSize={width < 900 ? `16px` : `20px`}>
                  "아티스트를 소개하는 한 마디를 적어주세요."
                </Text>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`16px 0 20px`}>
                  <CommonButton
                    width={`146px`}
                    height={`46px`}
                    kindOf={`subTheme`}
                    margin={`0 10px 0 0`}
                    onClick={detailToggle}
                  >
                    상세 프로필
                  </CommonButton>
                  <CommonButton width={`146px`} height={`46px`}>
                    Contact
                  </CommonButton>
                </Wrapper>
                <Text color={Theme.darkGrey_C}>TAG</Text>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0 0`}>
                  <Wrapper
                    width={`auto`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    bgColor={Theme.white_C}
                    radius={`30px`}
                    height={`27px`}
                    padding={`0 15px`}
                    margin={`0 4px 0 0`}
                  >
                    Vocal
                  </Wrapper>
                  <Wrapper
                    width={`auto`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    bgColor={Theme.white_C}
                    radius={`30px`}
                    height={`27px`}
                    padding={`0 15px`}
                    margin={`0 4px 0 0`}
                  >
                    Beat Maker
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `25px` : `32px`}
              fontWeight={`bold`}
              margin={`60px 0 30px`}
            >
              필모그래피
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              <ArtWrapper>
                <SquareBox>
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png"
                    alt="thumbnail"
                  />
                </SquareBox>
                <Text
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`20px 0 7px`}
                >
                  성시경 / 영원히
                </Text>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Wrapper
                    width={`auto`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    radius={`30px`}
                    height={`27px`}
                    padding={`0 15px`}
                    margin={`0 7px 5px 0`}
                  >
                    Vocal
                  </Wrapper>
                </Wrapper>
                <Text color={Theme.grey_C}>
                  Comment : 저는 이곡의 가이드 보컬입니다!
                </Text>
              </ArtWrapper>
            </Wrapper>
            <Wrapper margin={`60px 0`}>
              <CommonButton kindOf={`grey`} width={`150px`} height={`48px`}>
                더보기 +
              </CommonButton>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `25px` : `32px`}
              fontWeight={`bold`}
              margin={`0 0 30px`}
            >
              리뷰(00)
            </Wrapper>
            <Wrapper
              bgColor={Theme.lightGrey2_C}
              padding={width < 900 ? `20px 10px` : `30px`}
              margin={`0 0 30px`}
            >
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Image
                  alt="thumbnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png`}
                  width={`36px`}
                  height={`36px`}
                  radius={`100%`}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={`0 0 0 8px`}
                >
                  작성자 : 게스트
                </Text>
              </Wrapper>
              <TextArea
                width={`100%`}
                height={`100px`}
                radius={`10px`}
                margin={`12px 0 15px`}
                maxLength={400}
                placeholder="이 아티스트 어때요? 한 마디 남겨주세요 :)"
              />
              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper dr={`row`} width={`auto`}>
                  <Rate />
                </Wrapper>
                <CommonButton
                  width={`100px`}
                  height={`40px`}
                  radius={`7px`}
                  fontSize={`18px`}
                  fontWeight={`600`}
                >
                  등록
                </CommonButton>
              </Wrapper>
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              <Wrapper
                padding={width < 900 ? `20px 10px` : `30px`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
                    <Image
                      alt="thumbnail"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png`}
                      width={`36px`}
                      height={`36px`}
                      radius={`100%`}
                    />
                    <Text
                      fontSize={`16px`}
                      color={Theme.grey_C}
                      margin={`0 0 0 8px`}
                    >
                      닉네임A • 2022.08.05 21:17 <BellOutlined />
                    </Text>
                  </Wrapper>
                  <Popover
                    placement="bottom"
                    content={
                      <Wrapper padding={`0 10px`}>
                        <Wrapper
                          cursor={`pointer`}
                          width={width < 900 ? `50px` : `auto`}
                          dr={`row`}
                          margin={`0 0 10px`}
                        >
                          <Image
                            alt="icon"
                            width={`12px`}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/edit.png`}
                          />
                          <Text
                            isHover
                            color={Theme.grey_C}
                            margin={`0 0 0 5px`}
                          >
                            수정
                          </Text>
                        </Wrapper>
                        <Wrapper
                          cursor={`pointer`}
                          width={width < 900 ? `50px` : `auto`}
                          dr={`row`}
                          onClick={modalToggle}
                        >
                          <Image
                            alt="icon"
                            width={`12px`}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/delete.png`}
                          />
                          <Text
                            isHover
                            color={Theme.grey_C}
                            margin={`0 0 0 5px`}
                          >
                            삭제
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    }
                  >
                    <Image
                      cursor={`pointer`}
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/....png`}
                      width={`18px`}
                    />
                  </Popover>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  color={Theme.subTheme3_C}
                  fontSize={`16px`}
                  padding={`8px 0 12px 46px`}
                >
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                </Wrapper>
                <Wrapper
                  padding={`0 0 0 46px`}
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-end`}
                >
                  <Text width={`calc(100% - 36px)`}>
                    잔잔한 노래에 딱 맞는 곡이예요! 추천드립니다 ㅎㅎ 잔잔한
                    노래에 딱 맞는 곡이예요! 추천드립니다 ㅎㅎ
                  </Text>
                  <Wrapper width={`auto`} dr={`row`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                      width={`14px`}
                      margin={`0 4px 0 0`}
                    />
                    <Text color={Theme.darkGrey_C}>98</Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper margin={`60px 0 100px`}>
              <CommonButton kindOf={`grey`} width={`150px`} height={`48px`}>
                더보기 +
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          <Modal onCancel={modalToggle} visible={isModal} footer={null}>
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                댓글 삭제
              </Text>
              <Text fontSize={`16px`}>댓글을 삭제하시겠습니까?</Text>
              <Text fontSize={`16px`}>
                삭제 이후 내용은 되돌릴 수 없습니다.
              </Text>

              <Wrapper dr={`row`} margin={`30px 0 0`}>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme`}
                  margin={`0 4px 0 0`}
                  onClick={modalToggle}
                >
                  취소
                </CommonButton>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`0 0 0 4px`}
                >
                  삭제하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
          <Modal
            onCancel={detailToggle}
            visible={isDetail}
            footer={null}
            width={`680px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                이차미는 어떤 아티스트인가요?
              </Text>
              <Wrapper
                overflow={`auto`}
                wrap={`nowrap`}
                bgColor={Theme.lightGrey2_C}
                padding={`32px 20px`}
                ju={`flex-start`}
                al={`flex-start`}
                maxHeight={`540px`}
              >
                <Text
                  fontSize={`18px`}
                  fontWeight={`600`}
                  color={Theme.grey_C}
                  margin={`0 0 12px`}
                >
                  Q. 주로 하는 역할(기술)과 장르는 무엇인가요?
                </Text>
                <Text fontSize={`16px`} margin={`0 0 28px`}>
                  A. 주로 Pop을 하고 노래와 탑라인을 합니다.
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
