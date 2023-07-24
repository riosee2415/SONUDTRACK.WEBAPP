import React, { useCallback, useEffect, useState } from "react";
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
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { FAQTYPE_LIST_REQUEST, FAQ_LIST_REQUEST } from "../../reducers/faq";

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
  const { typeList, faqList, faqPage } = useSelector((state) => state.faq);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  const search = useInput("");

  const [visible, setvisible] = useState(false);
  const [visibleId, setVisibleId] = useState(null);

  const [typeId, setTypeId] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션

  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: FAQ_LIST_REQUEST,
      data: {
        question: search.value,
        FaqTypeId: typeId,
        page: currentPage,
      },
    });
  }, [search.value, typeId, currentPage]);

  ////// TOGGLE //////
  const faqToggle = useCallback(
    (data) => {
      if (data.id === visibleId) {
        setvisible(false);
        setVisibleId(null);

        return;
      }

      if (data) {
        setVisibleId(data.id);
        setvisible(true);
      }
    },
    [visible, visibleId]
  );

  ////// HANDLER //////

  const typeHandler = useCallback(
    (data) => {
      if (data) {
        setTypeId(data.id);
      } else {
        setTypeId("");
      }
    },
    [typeId]
  );

  // 페이지네이션
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

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
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/cs-center.png")`}
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
                  {...search}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 20px`}>
              <CommonButton
                margin={`0 10px 0 0`}
                onClick={() => typeHandler("")}
                kindOf={typeId === "" ? "" : `subTheme`}
              >
                전체
              </CommonButton>
              {typeList &&
                typeList.map((data) => {
                  return (
                    <CommonButton
                      key={data.id}
                      margin={`0 10px 0 0`}
                      kindOf={typeId === data.id ? "" : `subTheme`}
                      onClick={() => typeHandler(data)}
                    >
                      {data.value}
                    </CommonButton>
                  );
                })}
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              {faqList && faqList.length === 0 ? (
                <Wrapper
                  height={`300px`}
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
                    등록된 FAQ가 존재하지 않습니다.
                  </Text>
                </Wrapper>
              ) : (
                faqList &&
                faqList.map((data) => {
                  return (
                    <>
                      <List onClick={() => faqToggle(data)}>
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
                          {data.question}
                        </Wrapper>
                        <Wrapper width={`40px`} al={`flex-end`}>
                          {visibleId === data.id && visible ? (
                            <UpOutlined />
                          ) : (
                            <DownOutlined />
                          )}
                        </Wrapper>
                      </List>
                      {visibleId === data.id && visible && (
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
                            {data.answer}
                          </Wrapper>
                        </Wrapper>
                      )}
                    </>
                  );
                })
              )}
            </Wrapper>
            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={faqPage * 10}
              pageSize={10}
              onChange={(page) => otherPageCall(page)}
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

    context.store.dispatch({
      type: FAQ_LIST_REQUEST,
    });

    context.store.dispatch({
      type: FAQTYPE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
