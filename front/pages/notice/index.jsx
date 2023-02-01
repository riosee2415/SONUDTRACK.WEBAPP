import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CustomPage,
  Image,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { FileImageOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { FRONT_NOTICE_LIST_REQUEST } from "../../reducers/notice";

const List = styled(Wrapper)`
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey_C};
  height: 80px;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background: ${Theme.lightGrey2_C};
  }

  @media (max-width: 900px) {
    font-size: 14px;
    height: 60px;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { noticeList, noticePage } = useSelector((state) => state.notice);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const search = useInput("");

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션

  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: FRONT_NOTICE_LIST_REQUEST,
      data: {
        title: search.value,
        page: currentPage,
      },
    });
  }, [currentPage, search.value]);

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        <title>NEW WAVE Sound | Notice</title>
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
                공지사항
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
            <Wrapper>
              <Wrapper
                dr={`row`}
                height={`66px`}
                borderTop={`1px solid ${Theme.lightGrey_C}`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                fontSize={`16px`}
                color={Theme.subTheme4_C}
              >
                <Wrapper width={`15%`} display={width < 900 ? `none` : `flex`}>
                  번호
                </Wrapper>
                <Wrapper width={width < 900 ? `55%` : `50%`}>제목</Wrapper>
                <Wrapper width={width < 900 ? `20%` : `15%`}>조회수</Wrapper>
                <Wrapper width={width < 900 ? `25%` : `20%`}>작성일자</Wrapper>
              </Wrapper>

              {noticeList && noticeList.length === 0 ? (
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
                    등록된 공지사항이 존재하지 않습니다.
                  </Text>
                </Wrapper>
              ) : (
                noticeList &&
                noticeList.map((data) => {
                  return (
                    <List
                      key={data.id}
                      onClick={() => moveLinkHandler(`/notice/${data.id}`)}
                    >
                      <Wrapper
                        width={`15%`}
                        display={width < 900 ? `none` : `flex`}
                      >
                        {data.num}
                      </Wrapper>
                      <Wrapper
                        width={width < 900 ? `55%` : `50%`}
                        fontSize={width < 900 ? `15px` : `18px`}
                        dr={`row`}
                        ju={`flex-start`}
                      >
                        <Text maxWidth={`90%`} isEllipsis>
                          {data.title}
                        </Text>
                        {data.file && <FileImageOutlined />}
                      </Wrapper>
                      <Wrapper width={width < 900 ? `20%` : `15%`}>
                        {data.hit}
                      </Wrapper>
                      <Wrapper width={width < 900 ? `25%` : `20%`}>
                        {data.viewCreatedAt}
                      </Wrapper>
                    </List>
                  );
                })
              )}
              <CustomPage
                defaultCurrent={1}
                current={parseInt(currentPage)}
                total={noticePage * 10}
                pageSize={10}
                onChange={(page) => otherPageCall(page)}
              />
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
