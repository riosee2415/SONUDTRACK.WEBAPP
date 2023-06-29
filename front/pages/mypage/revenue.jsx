import React, { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BOUGHT_ALL_REQUEST } from "../../reducers/bought";
import moment from "moment";

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
  const { lastPage, boughtHistorys } = useSelector((state) => state.bought);

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션
  const [boughtType, setBoughtType] = useState(1); // 유형 type:1(아티스템) type:2(뮤직템) type:3(아트윅스)
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
      type: BOUGHT_ALL_REQUEST,
      data: {
        type: boughtType,
        page: currentPage,
      },
    });
  }, [currentPage, boughtType]);
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
  const boughtTypehandler = useCallback(
    (data) => {
      setBoughtType(data);
      setStartDate("");
      setEndDate("");
    },
    [boughtType, startDate, endDate]
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
      type: BOUGHT_ALL_REQUEST,
      data: {
        type: boughtType,
        page: currentPage,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      },
    });
  }, [boughtType, currentPage, startDate, endDate]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 수익 관리</title>
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
              수익 관리
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <CommonButton
                width={
                  width < 1000 ? (width < 700 ? `105px` : `200px`) : `246px`
                }
                height={`54px`}
                fontWeight={`bold`}
                kindOf={boughtType === 1 ? `subTheme2` : `grey3`}
                onClick={() => boughtTypehandler(1)}
              >
                Artisttem
              </CommonButton>
              <CommonButton
                width={
                  width < 1000 ? (width < 700 ? `105px` : `200px`) : `246px`
                }
                height={`54px`}
                fontWeight={`bold`}
                margin={width < 700 ? `0 10px` : `0 20px`}
                kindOf={boughtType === 2 ? `subTheme2` : `grey3`}
                onClick={() => boughtTypehandler(2)}
              >
                Musictem
              </CommonButton>
              <CommonButton
                width={
                  width < 1000 ? (width < 700 ? `105px` : `200px`) : `246px`
                }
                height={`54px`}
                fontWeight={`bold`}
                kindOf={boughtType === 3 ? `subTheme2` : `grey3`}
                onClick={() => boughtTypehandler(3)}
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

            <Wrapper
              radius={`5px`}
              bgColor={Theme.subTheme_C}
              padding={`18px 0`}
              fontSize={width < 900 ? `12px` : `16px`}
              margin={`0 0 30px`}
            >
              판매자의 수익금은 구매자의 거래 완료일 기준 7일 이내 정산됩니다.
            </Wrapper>

            {boughtHistorys && boughtHistorys.length === 0 ? (
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
                  수익 관리 내역이 존재하지 않습니다.
                </Text>
              </Wrapper>
            ) : (
              boughtHistorys &&
              boughtHistorys.map((data) => {
                return (
                  <Box key={data.id}>
                    <Wrapper width={`auto`} al={`flex-start`}>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        fontSize={`16px`}
                        color={Theme.grey_C}
                        margin={`0 0 18px`}
                      >
                        <Text fontWeight={`bold`} margin={`0 32px 0 0`}>
                          {data.viewFrontCreatedAt}
                        </Text>
                        <Text>
                          주문번호 :&nbsp;
                          {boughtType === 1
                            ? data.merchantUid
                            : `ORD${moment(data.createdAt).format(
                                "YYYYMMDDHHmmss"
                              )}`}
                        </Text>
                      </Wrapper>
                      <Text fontSize={`18px`} fontWeight={`600`}>
                        {boughtType === 1
                          ? data.artistName
                          : `[${
                              data.boughtItems && data.boughtItems[0].albumName
                            }] ${
                              data.boughtItems && data.boughtItems[0].songName
                            } ${
                              data.boughtItems && data.boughtItems.length === 1
                                ? ""
                                : `외 ${
                                    data.boughtItems && data.boughtItems.length
                                  }개`
                            } `}
                      </Text>
                      <Text
                        fontWeight={`600`}
                        color={Theme.darkGrey_C}
                        margin={`5px 0 0`}
                      >
                        {boughtType === 1
                          ? data.artistInfo
                          : `Album by ${
                              data.boughtItems && data.boughtItems[0].singerName
                            }`}
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
                        신용카드 결제 (
                        {boughtType === 1 ? data.viewPayPrice : data.viewPrice})
                      </Text>
                      <Text padding={`0 0 0 14px`} color={Theme.grey_C}>
                        적립포인트 사용&nbsp;(
                        {boughtType === 1
                          ? data.viewUsePointPrice
                          : data.viewUsePoint}
                        )
                      </Text>
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `100%` : `auto`}
                      al={`flex-end`}
                    >
                      <Text
                        fontSize={`18px`}
                        fontWeight={`bold`}
                        color={Theme.basicTheme_C}
                        margin={`0 0 8px`}
                      >
                        {boughtType === 1
                          ? data.viewTotalPrice
                          : data.viewPrice}
                      </Text>

                      {/* <CommonButton
                        padding={`0`}
                        width={`83px`}
                        height={`45px`}
                        kindOf={`grey`}
                        margin={width < 700 ? `10px 0 0` : `54px 0 0`}
                      >
                        전표 출력
                      </CommonButton> */}
                    </Wrapper>
                  </Box>
                );
              })
            )}

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={lastPage * 10}
              pageSize={10}
              onChange={(page) => pageChangeHandler(page)}
            />

            <Wrapper
              radius={`5px`}
              padding={`20px`}
              bgColor={Theme.lightGrey2_C}
              margin={`0 0 100px`}
              al={`flex-start`}
              fontSize={width < 900 ? `14px` : `16px`}
            >
              <Text margin={`0 0 5px`} fontWeight={`600`}>
                Artisttem 판매 금액에 따라 수수료가 부가되어 개별 정산됩니다.
              </Text>
              <Text margin={`0 0 5px`} color={Theme.adminTheme_1}>
                - 1원 ~ 100만 원 구간은 20%
              </Text>
              <Text margin={`0 0 5px`} color={Theme.adminTheme_1}>
                - 100만 원 초과 ~ 200만 원 구간은 10%
              </Text>
              <Text margin={`0 0 5px`} color={Theme.adminTheme_1}>
                - 200만 원 초과 ~ 300만 원 구간은 10%
              </Text>
              <Text color={Theme.adminTheme_1}>- 300만 원 초과 구간은 3%</Text>
              <Text margin={`30px 0 0`} color={Theme.grey_C}>
                EX&#41; 판매 금액이 180만 원일 때 100만원 대해서는 수수료 20%인
                20만 원 부과, 80만 원에대 서는 수수료 10%인 8만 원이 부과되어 총
                수수료 28만 원이 부과됩니다.
              </Text>
              <Text color={Theme.grey_C}>(총 금액 내 구간 별 수수료 적용)</Text>
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
