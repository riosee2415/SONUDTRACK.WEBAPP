import React, { useEffect } from "react";
import Head from "next/head";
import ClientLayout from "../../components/ClientLayout";
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
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import { Checkbox, DatePicker, message, Select } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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
        <title>NEW WAVE Sound | 결제 내역</title>
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
              결제 내역
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <CommonButton
                width={
                  width < 1000 ? (width < 700 ? `105px` : `200px`) : `246px`
                }
                height={`54px`}
                fontWeight={`bold`}
                kindOf={`subTheme2`}
              >
                Artisttem
              </CommonButton>
              <CommonButton
                kindOf={`grey3`}
                width={
                  width < 1000 ? (width < 700 ? `105px` : `200px`) : `246px`
                }
                height={`54px`}
                fontWeight={`bold`}
                margin={width < 700 ? `0 10px` : `0 20px`}
              >
                Musictem
              </CommonButton>
              <CommonButton
                kindOf={`grey3`}
                width={
                  width < 1000 ? (width < 700 ? `105px` : `200px`) : `246px`
                }
                height={`54px`}
                fontWeight={`bold`}
              >
                Artworks
              </CommonButton>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`20px 0 30px`}>
              <DatePicker
                style={{
                  width: width < 1000 ? (width < 700 ? 120 : 180) : 218,
                  height: 42,
                }}
              />
              <SpanText margin={`0 6px`} fontSize={`16px`}>
                ~
              </SpanText>
              <DatePicker
                style={{
                  width: width < 1000 ? (width < 700 ? 120 : 180) : 218,
                  height: 42,
                }}
              />
              <CommonButton
                width={width < 700 ? `70px` : `100px`}
                height={`42px`}
                fontSize={`18px`}
                margin={`0 0 0 12px`}
              >
                조회
              </CommonButton>
            </Wrapper>

            <Box>
              <Wrapper width={`auto`} al={`flex-start`}>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  color={Theme.grey_C}
                  margin={`0 0 18px`}
                >
                  <Text fontWeight={`bold`} margin={`0 32px 0 0`}>
                    2022.10.01
                  </Text>
                  <Text>주문번호 : 20221116-00000000</Text>
                </Wrapper>
                <Text fontSize={`18px`} fontWeight={`600`}>
                  아티스트명
                  {/* musictem, artworks일때 
                  [앨범명] 곡 제목 */}
                </Text>
                <Text
                  fontWeight={`600`}
                  color={Theme.darkGrey_C}
                  margin={`5px 0 0`}
                >
                  아티스트의 한마디가 들어올 곳입니다.
                  {/* musictem, artworks일때 
                  Album by 판매자 */}
                </Text>

                <Text
                  fontWeight={`600`}
                  color={Theme.grey_C}
                  margin={`23px 0 5px`}
                >
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                    width={`10px`}
                    margin={`0 4px 0 0`}
                  />
                  결제방법
                </Text>
                <Text padding={`0 0 0 14px`} color={Theme.grey_C}>
                  신용카드 결제 (120,000원)
                </Text>
                <Text padding={`0 0 0 14px`} color={Theme.grey_C}>
                  적립포인트 사용 (10,000원)
                </Text>
              </Wrapper>
              <Wrapper width={width < 700 ? `100%` : `auto`} al={`flex-end`}>
                <Text
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 8px`}
                >
                  130,000원
                </Text>

                <CommonButton
                  padding={`0`}
                  width={`83px`}
                  height={`45px`}
                  kindOf={`grey`}
                  margin={width < 700 ? `10px 0 0` : `54px 0 0`}
                >
                  전표 출력
                </CommonButton>
              </Wrapper>
            </Box>

            <CustomPage />
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
