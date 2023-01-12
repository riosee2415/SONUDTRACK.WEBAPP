import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CustomPage,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import styled from "styled-components";

const List = styled(Wrapper)`
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey_C};
  padding: 16px 40px;

  &:hover {
    cursor: pointer;
    background: ${Theme.lightGrey2_C};
  }

  @media (max-width: 900px) {
    padding: 15px 0;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const [visible, isVisible] = useState(false);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const faqToggle = useCallback(() => {
    isVisible((prev) => !prev);
  }, [visible]);
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | FAQ</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              height={`260px`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/search.png")`}
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
                  C/S Center
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                  margin={`0 0 28px`}
                >
                  뉴웨이브사운드에 대한 궁금하신 점을 해결해드립니다.
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`50px 0 40px`}>
              <Text
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
              >
                FAQ
              </Text>
              <Wrapper
                width={width < 700 ? `100%` : `430px`}
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
                  shadow={`0 3px 10px rgba(0, 0, 0, 0.1)`}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              <List onClick={faqToggle}>
                <Wrapper
                  width={`40px`}
                  height={`40px`}
                  radius={`100%`}
                  border={`1px solid ${Theme.basicTheme_C}`}
                  color={Theme.basicTheme_C}
                  fontSize={`16px`}
                  fontWeight={`bold`}
                >
                  Q
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={`calc(100% - 80px)`}
                  padding={`0 24px`}
                  fontSize={width < 900 ? `14px` : `18px`}
                >
                  자주묻는 질문이 들어올 곳입니다.
                </Wrapper>
                <Wrapper width={`40px`} al={`flex-end`}>
                  {visible ? <UpOutlined /> : <DownOutlined />}
                </Wrapper>
              </List>
              {visible && (
                <Wrapper
                  dr={`row`}
                  padding={width < 900 ? `15px 0` : `16px 40px`}
                  bgColor={Theme.lightGrey2_C}
                >
                  <Wrapper
                    width={`40px`}
                    height={`40px`}
                    radius={`100%`}
                    bgColor={Theme.basicTheme_C}
                    color={Theme.white_C}
                    fontSize={`16px`}
                    fontWeight={`bold`}
                  >
                    A
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    width={`calc(100% - 40px)`}
                    padding={`0 24px`}
                    fontSize={width < 900 ? `14px` : `18px`}
                    color={Theme.grey_C}
                  >
                    질문에 대한 답변이 들어옵니다. 답변이 매우 길어질 경우에는
                    이렇게 나타나게 됩니다. 질문에 대한 답변이 들어옵니다.
                    답변이 매우 길어질 경우에는 이렇게 나타나게 됩니다. 질문에
                    대한 답변이 들어옵니다. 답변이 매우 길어질 경우에는 이렇게
                    나타나게 됩니다. 질문에 대한 답변이 들어옵니다. 답변이 매우
                    길어질 경우에는 이렇게 나타나게 됩니다. 질문에 대한 답변이
                    들어옵니다. 답변이 매우 길어질 경우에는 이렇게 나타나게
                    됩니다.
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>
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
