import React, { useCallback, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  CustomPage,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { Checkbox, message, Modal } from "antd";
import Theme from "../../components/Theme";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";

const Box = styled(Wrapper)`
  border-radius: 7px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  padding: 40px 32px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 30px;

  @media (max-width: 700px) {
    padding: 20px 15px;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  const [contactModal, setContactModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

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
  const contactToggle = useCallback(() => {
    setContactModal((prev) => !prev);
  }, [contactModal]);

  const rejectToggle = useCallback(() => {
    setRejectModal((prev) => !prev);
  }, [rejectModal]);

  const orderToggle = useCallback(() => {
    setOrderModal((prev) => !prev);
  }, [orderModal]);

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 컨택 내역</title>
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
              컨택 내역
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 16px`}>
              <Checkbox>전체 선택</Checkbox>
              <SpanText
                fontSize={`10px`}
                margin={`0 10px`}
                color={Theme.lightGrey_C}
              >
                |
              </SpanText>
              <Text isHover>삭제</Text>
            </Wrapper>

            <Box>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                width={width < 800 ? `100%` : `auto`}
              >
                <Checkbox />
                <Wrapper dr={`row`} width={width < 800 ? `92%` : `auto`}>
                  <Image
                    alt="thumbnail"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/my-page.png`}
                    width={width < 800 ? `60px` : `100px`}
                    height={width < 800 ? `60px` : `100px`}
                    radius={`100%`}
                    margin={width < 800 ? `0 10px` : `0 22px`}
                  />
                  <Wrapper
                    width={width < 800 ? `calc(100% - 90px)` : `auto`}
                    al={`flex-start`}
                  >
                    <Text
                      fontSize={width < 900 ? `18px` : `22px`}
                      fontWeight={`600`}
                    >
                      차참미
                    </Text>
                    <Text
                      fontSize={width < 900 ? `15px` : `18px`}
                      margin={`10px 0 15px`}
                    >
                      "아티스트를 소개하는 한 마디"
                    </Text>
                    <Text color={Theme.grey_C}>문의날짜 : 2022.11.25</Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                width={width < 800 ? `100%` : `auto`}
                margin={width < 800 ? `10px 0 0` : `0`}
              >
                <CommonButton
                  width={`83px`}
                  height={`35px`}
                  padding={`0`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  kindOf={`grey3`}
                  margin={`0 8px 0 0`}
                  onClick={contactToggle}
                >
                  문의 내역
                </CommonButton>

                {/* <CommonButton
                  width={`83px`}
                  height={`35px`}
                  padding={`0`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  kindOf={`grey4`}
                  margin={`0 8px 0 0`}
                  onClick={rejectToggle}
                >
                  거절 사유
                </CommonButton>
                  <CommonButton
                  width={`83px`}
                  height={`35px`}
                  padding={`0`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  kindOf={`subTheme2`}
                  margin={`0 8px 0 0`}
                  onClick={orderToggle}
                >
                  결제하기
                </CommonButton>
               
                <CommonButton
                  width={`175px`}
                  height={`35px`}
                  padding={`0`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  kindOf={`subTheme`}
                  margin={`0 8px 0 0`}
                >
                  리뷰 남기고 포인트 받기
                </CommonButton>
                <CommonButton
                  width={`83px`}
                  height={`35px`}
                  padding={`0`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  kindOf={`subTheme2`}
                  margin={`0 8px 0 0`}
                >
                  파일 확인
                </CommonButton>
                <CommonButton
                  width={`83px`}
                  height={`35px`}
                  padding={`0`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  kindOf={`grey3`}
                  margin={`0 8px 0 0`}
                >
                  결제내역
                </CommonButton> */}
                <Wrapper
                  width={`83px`}
                  height={`35px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  color={Theme.grey2_C}
                  fontSize={`16px`}
                >
                  문의 완료
                  {/* 문의 거절
                    문의 수락
                    결제 완료 
                    제작 완료
                    */}
                </Wrapper>
              </Wrapper>
            </Box>

            <CustomPage />
          </RsWrapper>

          <Modal
            onCancel={contactToggle}
            visible={contactModal}
            footer={null}
            width={`550px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text fontSize={`32px`} fontWeight={`bold`} margin={`0 0 24px`}>
                문의 내역
              </Text>

              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  제출 마감일
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  margin={`12px 0 30px`}
                >
                  <TextInput
                    type="text"
                    readOnly
                    width={`200px`}
                    height={`50px`}
                  />
                  &nbsp;까지
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  금액
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  margin={`12px 0 30px`}
                >
                  <TextInput
                    type="text"
                    readOnly
                    width={`200px`}
                    height={`50px`}
                  />
                  &nbsp;원
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  내용
                </Text>
                <TextArea
                  width={`100%`}
                  height={`75px`}
                  margin={`12px 0 30px`}
                  readOnly
                />
              </Wrapper>

              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  레퍼런스 첨부파일
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  padding={`16px 14px`}
                  bgColor={Theme.lightGrey2_C}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`12px 0 20px`}
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
                </Wrapper>

                <Text color={Theme.grey_C}>
                  제작할 음악의 용도를 반드시 미리 고지해야 하며, 작업 완료 후
                  정식 앨범 출판 및 정식 앨범 출판 및 상업적 사용을 할 때에
                  안전한 저작궈느 크레딧 협의를 위해 반드시 New Wave Sound를
                  통하여 전문가, 의뢰인 협의 후 진행하실 수
                  있습니다.(nws0901@nwsound1.com)
                </Text>
              </Wrapper>

              <CommonButton
                width={width < 900 ? `150px` : `180px`}
                height={`50px`}
                fontSize={width < 900 ? `15px` : `18px`}
                margin={`32px 0 0`}
                onClick={contactToggle}
              >
                컨택 내역
              </CommonButton>
            </Wrapper>
          </Modal>
          <Modal
            onCancel={rejectToggle}
            visible={rejectModal}
            footer={null}
            width={`550px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text fontSize={`32px`} fontWeight={`bold`} margin={`0 0 24px`}>
                거절사유
              </Text>

              <Wrapper dr={`row`} ju={`flex-start`}>
                <Image
                  alt="thumbnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/my-page.png`}
                  width={`100px`}
                  height={`100px`}
                  radius={`100%`}
                  margin={`0 22px 0 0`}
                />
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text
                    fontSize={width < 900 ? `18px` : `22px`}
                    fontWeight={`600`}
                  >
                    차참미
                  </Text>
                  <Text
                    fontSize={width < 900 ? `15px` : `18px`}
                    margin={`10px 0 15px`}
                  >
                    "아티스트를 소개하는 한 마디"
                  </Text>
                  <Text color={Theme.grey_C}>문의날짜 : 2022.11.25</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper al={`flex-start`} margin={`34px 0 0`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  제작자의 답변
                </Text>
                <TextArea
                  width={`100%`}
                  height={`75px`}
                  margin={`12px 0 20px`}
                  readOnly
                />
              </Wrapper>
              <Text color={Theme.grey_C}>
                문의하신 내용과 제작자의 의견이 맞지 않아 거절되는 경우 다시
                문의해주셔야 합니다. 다시 문의할 경우 이전의 문의 내용이
                옮겨가지 않으므로 원하는 문의 내용을 전부 적어주셔야 합니다.
              </Text>

              <Wrapper dr={`row`} margin={`34px 0 0`}>
                <CommonButton
                  width={width < 900 ? `150px` : `180px`}
                  height={`50px`}
                  fontSize={width < 900 ? `15px` : `18px`}
                  kindOf={`subTheme`}
                  margin={`0 8px 0 0`}
                >
                  다른 아티스트보기
                </CommonButton>
                <CommonButton
                  width={width < 900 ? `150px` : `180px`}
                  height={`50px`}
                  fontSize={width < 900 ? `15px` : `18px`}
                >
                  다시 컨택하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>

          <Modal
            onCancel={orderToggle}
            visible={orderModal}
            footer={null}
            width={`550px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text fontSize={`32px`} fontWeight={`bold`} margin={`0 0 24px`}>
                결제하기
              </Text>

              <Wrapper dr={`row`} ju={`flex-start`}>
                <Image
                  alt="thumbnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/my-page.png`}
                  width={`100px`}
                  height={`100px`}
                  radius={`100%`}
                  margin={`0 22px 0 0`}
                />
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text
                    fontSize={width < 900 ? `18px` : `22px`}
                    fontWeight={`600`}
                  >
                    차참미
                  </Text>
                  <Text
                    fontSize={width < 900 ? `15px` : `18px`}
                    margin={`10px 0 15px`}
                  >
                    "아티스트를 소개하는 한 마디"
                  </Text>
                  <Text color={Theme.grey_C}>문의날짜 : 2022.11.25</Text>
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  제출 마감일
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  margin={`12px 0 30px`}
                >
                  <TextInput
                    type="text"
                    readOnly
                    width={`200px`}
                    height={`50px`}
                  />
                  &nbsp;까지
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  금액
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  margin={`12px 0 30px`}
                >
                  <TextInput
                    type="text"
                    readOnly
                    width={`200px`}
                    height={`50px`}
                  />
                  &nbsp;원
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  제작자의 의견
                </Text>
                <TextArea
                  width={`100%`}
                  height={`75px`}
                  margin={`12px 0 30px`}
                  readOnly
                />

                <Text color={Theme.grey_C}>
                  제작할 음악의 용도를 반드시 미리 고지해야 하며, 작업 완료 후
                  정식 앨범 출판 및 정식 앨범 출판 및 상업적 사용을 할 때에
                  안전한 저작궈느 크레딧 협의를 위해 반드시 New Wave Sound를
                  통하여 전문가, 의뢰인 협의 후 진행하실 수
                  있습니다.(nws0901@nwsound1.com)
                </Text>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-between`} margin={`34px 0 0`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  결제금액
                </Text>
                <Text fontSize={`24px`}>
                  <SpanText fontWeight={`bold`} color={Theme.basicTheme_C}>
                    260,000
                  </SpanText>
                  원
                </Text>
              </Wrapper>

              <Wrapper dr={`row`} margin={`34px 0 0`}>
                <CommonButton
                  width={width < 900 ? `150px` : `180px`}
                  height={`50px`}
                  fontSize={width < 900 ? `15px` : `18px`}
                  kindOf={`subTheme`}
                  margin={`0 8px 0 0`}
                  onClick={orderToggle}
                >
                  컨택 내역
                </CommonButton>
                <CommonButton
                  width={width < 900 ? `150px` : `180px`}
                  height={`50px`}
                  fontSize={width < 900 ? `15px` : `18px`}
                >
                  결제하기
                </CommonButton>
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
