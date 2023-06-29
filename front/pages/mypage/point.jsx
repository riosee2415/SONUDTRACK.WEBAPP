import React, { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ClientLayout from "../../components/ClientLayout";
import { MY_POINT_LIST_REQUEST } from "../../reducers/point";

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
  const { myPointList, myPointPage } = useSelector((state) => state.point);

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션
  const [pointType, setPointType] = useState(3); // 유형 type:1(적립) type:2(사용) type:3(전체)
  const [startDate, setStartDate] = useState(""); // 시작날짜
  const [endDate, setEndDate] = useState(""); // 끝날짜

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return message.error(`로그인이 필요한 페이지입니다.`);
    }
  }, [me]);

  useEffect(() => {
    dispatch({
      type: MY_POINT_LIST_REQUEST,
      data: {
        pointType,
        page: currentPage,
      },
    });
  }, [currentPage, pointType]);

  ////// TOGGLE //////
  ////// HANDLER //////
  // 페이지네이션
  const pageChangeHandler = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  // 유형선택
  const pointTypehandler = useCallback(
    (data) => {
      setPointType(data);
      setStartDate("");
      setEndDate("");
    },
    [pointType, startDate, endDate]
  );

  // 시작날짜
  const startDateHandler = useCallback(
    (data) => {
      setStartDate(data);
    },
    [startDate]
  );

  // 끝날짜
  const endDateHandler = useCallback(
    (data) => {
      setEndDate(data);
    },
    [endDate]
  );

  // 날짜 조회
  const dateSearchHandler = useCallback(() => {
    dispatch({
      type: MY_POINT_LIST_REQUEST,
      data: {
        pointType,
        page: currentPage,
        startDate: startDate ? startDate.format("YYYY-MM-DD") : "",
        endDate: endDate ? endDate.format("YYYY-MM-DD") : "",
      },
    });
  }, [pointType, currentPage, startDate, endDate]);

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
                  onChange={startDateHandler}
                  value={startDate}
                />
                <SpanText margin={`0 6px`} fontSize={`16px`}>
                  ~
                </SpanText>
                <DatePicker
                  style={{
                    width: width < 1000 ? (width < 700 ? 120 : 180) : 218,
                    height: 42,
                  }}
                  onChange={endDateHandler}
                  value={endDate}
                />
                <CommonButton
                  width={width < 700 ? `70px` : `100px`}
                  height={`42px`}
                  fontSize={`18px`}
                  margin={`0 0 0 12px`}
                  onClick={dateSearchHandler}
                >
                  조회
                </CommonButton>
              </Wrapper>
              <CustomSelect>
                <Select onChange={pointTypehandler} value={pointType}>
                  <Select.Option value={3}>전체</Select.Option>
                  <Select.Option value={1}>적립</Select.Option>
                  <Select.Option value={2}>사용</Select.Option>
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

            {myPointList && myPointList.length === 0 ? (
              <Wrapper
                height={`400px`}
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
                  포인트 내역이 존재하지 않습니다.
                </Text>
              </Wrapper>
            ) : (
              myPointList &&
              myPointList.map((data) => {
                return (
                  <Box key={data.id}>
                    <Wrapper
                      width={width < 700 ? `100%` : `15%`}
                      ju={width < 700 ? `flex-start` : `center`}
                      dr={`row`}
                    >
                      <Text color={Theme.darkGrey_C} margin={`0 8px 0 0`}>
                        {data.viewFrontDateAt}
                      </Text>
                      <Text color={Theme.grey_C}>{data.viewFrontHourAt}</Text>
                    </Wrapper>

                    <Wrapper
                      width={width < 700 ? `100%` : `10%`}
                      al={width < 700 ? `flex-start` : `center`}
                    >
                      <CommonButton
                        height={`35px`}
                        kindOf={data.type === "Artisttem" ? "" : `subTheme`}
                      >
                        {data.type}
                      </CommonButton>
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `100%` : `60%`}
                      fontSize={`18px`}
                      padding={width < 700 ? `5px 0` : `0 40px`}
                      al={`flex-start`}
                    >
                      {data.content}
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `100%` : `15%`}
                      fontSize={width < 700 ? `18px` : `20px`}
                      fontWeight={`600`}
                      al={width < 700 ? `flex-start` : `center`}
                    >
                      {data.pointType === "적립"
                        ? `+${data.viewPrice}`
                        : `-${data.viewPrice}`}
                    </Wrapper>
                  </Box>
                );
              })
            )}

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={myPointPage * 10}
              pageSize={10}
              onChange={(page) => pageChangeHandler(page)}
            />
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
