import React, { useEffect } from "react";
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
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import { Checkbox, DatePicker, message, Select } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ClientLayout from "../../components/ClientLayout";

const CustomSelect = styled(Wrapper)`
  width: 180px;
  height: ${(props) => props.height || `40px`};

  .ant-select {
    width: 100%;

    @media (max-width: 700px) {
      width: 180px;
    }
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    width: 100%;
    height: ${(props) => props.height || `40px`};
  }

  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    width: 100%;
    line-height: ${(props) => props.height || `40px`};
  }

  @media (max-width: 700px) {
    width: 100%;
    margin: 10px 0 0;
    align-items: flex-end;
  }
`;

const Box = styled(Wrapper)`
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  border-bottom: 1px solid ${Theme.lightGrey_C};

  &:hover {
    cursor: pointer;
    background: ${Theme.lightGrey2_C};

    & ${Wrapper}:last-child {
      color: ${Theme.basicTheme_C};
    }
  }

  @media (max-width: 700px) {
    height: auto;
    padding: 10px 0;
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
        <title>NEW WAVE Sound | 포인트 관리</title>
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
              포인트 관리
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`0px 0 30px`}>
              <Wrapper width={`auto`} dr={`row`}>
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
              <CustomSelect>
                <Select>
                  <Select.Option>적립</Select.Option>
                  <Select.Option>사용</Select.Option>
                </Select>
              </CustomSelect>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              borderBottom={`1px solid ${Theme.lightGrey_C}`}
              height={`66px`}
              color={Theme.subTheme4_C}
              fontSize={`16px`}
              display={width < 700 ? `none` : `flex`}
            >
              <Wrapper width={`15%`}>일자</Wrapper>
              <Wrapper width={`10%`}>분야</Wrapper>
              <Wrapper width={`60%`}>아티스트명/앨범명/곡명</Wrapper>
              <Wrapper width={`15%`}>적립금</Wrapper>
            </Wrapper>

            <Box>
              <Wrapper
                width={width < 700 ? `100%` : `15%`}
                ju={width < 700 ? `flex-start` : `center`}
                dr={`row`}
              >
                <Text color={Theme.darkGrey_C} margin={`0 8px 0 0`}>
                  2022.10.01
                </Text>
                <Text color={Theme.grey_C}>00:00</Text>
              </Wrapper>

              <Wrapper
                width={width < 700 ? `100%` : `10%`}
                al={width < 700 ? `flex-start` : `center`}
              >
                <CommonButton height={`35px`}>Artisttem</CommonButton>
                {/* <CommonButton height={`35px`} kindOf={`subTheme`}>
                  Musictem
                </CommonButton> */}
              </Wrapper>
              <Wrapper
                width={width < 700 ? `100%` : `60%`}
                fontSize={`18px`}
                padding={width < 700 ? `5px 0` : `0 40px`}
                al={`flex-start`}
              >
                아티스트명/앨범명/곡명
              </Wrapper>
              <Wrapper
                width={width < 700 ? `100%` : `15%`}
                fontSize={width < 700 ? `18px` : `20px`}
                fontWeight={`600`}
                al={width < 700 ? `flex-start` : `center`}
              >
                +620원
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
