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
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { Checkbox, message } from "antd";
import Theme from "../../components/Theme";
import { DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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
        <title>NEW WAVE Sound | 장바구니</title>
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
              장바구니
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
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
            <Wrapper
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              margin={`16px 0 0`}
            >
              {/* 
                Empty 대신 사용
              <Wrapper
                height={width < 900 ? `400px` : `630px`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/blank.png`}
                  width={`76px`}
                />
                <Text
                  fontSize={width < 900 ? `18px` : `22px`}
                  color={Theme.grey2_C}
                  margin={`25px 0 0`}
                >
                  관심 있는 음악을 미리 담아보세요!
                </Text>
              </Wrapper> */}
              <Wrapper
                dr={`row`}
                padding={`40px 0`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
              >
                <Wrapper width={`5%`} al={`flex-start`}>
                  <Checkbox />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} width={`90%`}>
                  <Image
                    width={width < 900 ? `90px` : `160px`}
                    height={width < 900 ? `90px` : `160px`}
                    radius={`7px`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png`}
                  />
                  <Wrapper
                    width={`auto`}
                    al={`flex-start`}
                    ju={`space-between`}
                    padding={width < 900 ? `0 0 0 10px` : `0 0 0 32px`}
                    height={width < 900 ? `auto` : `160px`}
                  >
                    <Wrapper width={`auto`} al={`flex-start`}>
                      <Text
                        fontSize={width < 900 ? `14px` : `16px`}
                        fontWeight={`bold`}
                        color={Theme.darkGrey_C}
                      >
                        [앨범명] Star Night
                      </Text>
                      <Text color={Theme.grey2_C}>Album by Pokerface</Text>
                      <Text
                        fontSize={width < 900 ? `16px` : `18px`}
                        margin={width < 900 ? `0` : `24px 0 0`}
                      >
                        [라이센스 명] 15,000원
                      </Text>
                    </Wrapper>
                    <CommonButton
                      kindOf={`grey2`}
                      fontSize={width < 900 ? `14px` : `16px`}
                      width={`100px`}
                      padding={`0`}
                      height={`28px`}
                    >
                      라이센스 변경
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  width={`5%`}
                  fontSize={width < 900 ? `20px` : `30px`}
                >
                  <Text isHover>
                    <DownloadOutlined />
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-end`} margin={`40px 0 100px`}>
              <Text fontSize={`20px`} fontWeight={`bold`}>
                총 주문 금액
              </Text>
              <Text
                fontSize={`18px`}
                fontWeight={`bold`}
                margin={`0 20px 0 6px`}
                color={Theme.basicTheme_C}
              >
                130,000원
              </Text>
              <CommonButton width={`265px`} height={`48px`}>
                총 3건 주문하기
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
