import React, { useCallback, useEffect } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  CustomPage,
  Image,
  RsWrapper,
  SpanText,
  SquareBox,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import { Checkbox, message } from "antd";
import Theme from "../../../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";
import Musictem from "./musictem";
import {
  ALBUM_DELETE_REQUEST,
  ARTIST_DELETE_REQUEST,
  MY_LIKE_LIST_REQUEST,
  TRACK_DELETE_REQUEST,
} from "../../../reducers/like";

const Box = styled(Wrapper)`
  align-items: flex-start;
  width: calc(100% / 4 - 23px);
  margin: 0 30px 50px 0;
  cursor: pointer;

  &:nth-child(4n) {
    margin: 0 0 50px;
  }

  @media (max-width: 1100px) {
    width: calc(100% / 3 - 20px);
    margin: 0 30px 30px 0;

    &:nth-child(4n) {
      margin: 0 30px 30px 0;
    }

    &:nth-child(3n) {
      margin: 0 0 30px;
    }
  }
  @media (max-width: 900px) {
    width: calc(100% / 2 - 5px);
    margin: 0 10px 20px 0;

    &:nth-child(4n) {
      margin: 0 10px 20px 0;
    }

    &:nth-child(3n) {
      margin: 0 10px 20px 0;
    }

    &:nth-child(2n) {
      margin: 0 0 20px;
    }
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const {
    myLikeList,
    lastPage,
    st_artistDeleteDone,
    st_artistDeleteError,
    st_albumDeleteDone,
    st_albumDeleteError,
    st_trackDeleteDone,
    st_trackDeleteError,
  } = useSelector((state) => state.like);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션
  const [type, setType] = useState(1); // 1 - 아티스템
  const [selectList, setSelectList] = useState([]);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    setSelectList([]);
  }, [type]);

  useEffect(() => {
    if (st_artistDeleteDone) {
      dispatch({
        type: MY_LIKE_LIST_REQUEST,
        data: {
          type,
          page: currentPage,
        },
      });
      setSelectList([]);
      return message.success("찜목록에서 삭제되었씁니다.");
    }

    if (st_artistDeleteError) {
      return message.error(st_artistDeleteError);
    }

    if (st_albumDeleteDone) {
      dispatch({
        type: MY_LIKE_LIST_REQUEST,
        data: {
          type,
          page: currentPage,
        },
      });
      setSelectList([]);
      return message.success("찜목록에서 삭제되었습니다.");
    }

    if (st_albumDeleteError) {
      return message.error(st_albumDeleteError);
    }

    if (st_trackDeleteDone) {
      dispatch({
        type: MY_LIKE_LIST_REQUEST,
        data: {
          type,
          page: currentPage,
        },
      });
      setSelectList([]);
      return message.success("찜목록에서 삭제되었습니다.");
    }

    if (st_trackDeleteError) {
      return message.error(st_trackDeleteError);
    }
  }, [
    type,
    st_artistDeleteDone,
    st_artistDeleteError,
    st_albumDeleteDone,
    st_albumDeleteError,
    st_trackDeleteDone,
    st_trackDeleteError,
  ]);

  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return message.error(`로그인이 필요한 페이지입니다.`);
    }
  }, [me]);

  useEffect(() => {
    dispatch({
      type: MY_LIKE_LIST_REQUEST,
      data: {
        type,
        page: currentPage,
      },
    });
  }, [type, currentPage]);
  ////// TOGGLE //////
  ////// HANDLER //////
  // 페이지네이션
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

  const deleteclickHandler = useCallback(() => {
    switch (parseInt(type)) {
      case 1: {
        dispatch({
          type: ARTIST_DELETE_REQUEST,
          data: {
            likeIds: selectList,
          },
        });
        break;
      }
      case 2: {
        dispatch({
          type: ALBUM_DELETE_REQUEST,
          data: {
            likeIds: selectList,
          },
        });
        break;
      }
      case 3: {
        dispatch({
          type: TRACK_DELETE_REQUEST,
          data: {
            likeIds: selectList,
          },
        });
        break;
      }

      default:
        break;
    }
  }, [type, selectList]);

  const checkHandler = useCallback(
    (snap) => {
      const existFlag = selectList.indexOf(snap);

      if (existFlag === -1) {
        const arr = selectList;
        arr.push(snap.id);
        setSelectList(arr);
      } else {
        const nextArr = selectList.filter(
          (item) => parseInt(item.id) !== parseInt(snap.id)
        );
        setSelectList(nextArr);
      }
    },
    [selectList]
  );

  // 페이지 이동
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 찜 보관함</title>
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
              찜 보관함
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-end`}
              borderBottom={`1px solid ${Theme.lightGrey_C}`}
              padding={`0 0 16px`}
            >
              <Text isHover onClick={() => deleteclickHandler()}>
                삭제
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`22px 0 30px`}>
              <CommonButton
                width={
                  width < 1000 ? (width < 700 ? `140px` : `200px`) : `246px`
                }
                height={`54px`}
                fontWeight={`bold`}
                kindOf={type === 1 ? `subTheme2` : `grey3`}
                onClick={() => setType(1)}
              >
                Artisttem
              </CommonButton>
              <CommonButton
                kindOf={type === 2 ? `subTheme2` : `grey3`}
                width={
                  width < 1000 ? (width < 700 ? `140px` : `200px`) : `246px`
                }
                height={`54px`}
                fontWeight={`bold`}
                margin={width < 700 ? `0 0 0 10px` : `0 0 0 20px`}
                onClick={() => setType(2)}
              >
                Musictem
              </CommonButton>
            </Wrapper>

            {type === 1 && (
              <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                {myLikeList &&
                myLikeList.artistemData &&
                myLikeList.artistemData.length === 0 ? (
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
                      관심 있는 아티스트를 미리 찜해두세요!
                    </Text>
                  </Wrapper>
                ) : (
                  myLikeList.artistemData &&
                  myLikeList.artistemData.map((data) => {
                    return (
                      <Box key={data.id}>
                        <SquareBox>
                          <Image
                            src={data.artistProfileImage}
                            alt="thumbnail"
                          />

                          <Wrapper
                            position={`absolute`}
                            top={`16px`}
                            left={`16px`}
                            width={`auto`}
                          >
                            <Checkbox onClick={() => checkHandler(data)} />
                          </Wrapper>
                        </SquareBox>
                        <Text
                          fontSize={`18px`}
                          fontWeight={`bold`}
                          margin={`20px 0 7px`}
                          onClick={() =>
                            movelinkHandler(`/artisttem/${data.artistemId}`)
                          }
                        >
                          {data.artistName}
                        </Text>
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          {data.tags.map((v) => {
                            return (
                              <Wrapper
                                key={v.id}
                                width={`auto`}
                                border={`1px solid ${Theme.lightGrey_C}`}
                                radius={`30px`}
                                height={`27px`}
                                padding={`0 15px`}
                                margin={`0 7px 5px 0`}
                              >
                                {v.tagValue}
                              </Wrapper>
                            );
                          })}
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`space-between`}
                          margin={`12px 0 0`}
                        >
                          <Wrapper
                            dr={`row`}
                            width={`auto`}
                            color={Theme.subTheme3_C}
                            fontSize={`16px`}
                          >
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                          </Wrapper>
                          <Wrapper width={`auto`} dr={`row`}>
                            <Image
                              alt="icon"
                              width={`14px`}
                              margin={`0 4px 0 0`}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                            />

                            <Text fontSize={`14px`} color={Theme.grey_C}>
                              {data.likeCnt}
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      </Box>
                    );
                  })
                )}
              </Wrapper>
            )}

            {type === 2 && (
              <Musictem
                type={type}
                setType={setType}
                selectList={selectList}
                setSelectList={setSelectList}
                deleteclickHandler={deleteclickHandler}
                checkHandler={checkHandler}
              />
            )}
            {type === 3 && (
              <Musictem
                type={type}
                setType={setType}
                selectList={selectList}
                setSelectList={setSelectList}
                deleteclickHandler={deleteclickHandler}
                checkHandler={checkHandler}
              />
            )}

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={lastPage * 10}
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
