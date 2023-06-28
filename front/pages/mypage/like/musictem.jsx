import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  Image,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Checkbox, Empty, message } from "antd";
import dynamic from "next/dynamic";
import { MY_LIKE_LIST_REQUEST } from "../../../reducers/like";
const ReactWaves = dynamic(() => import("@dschoon/react-waves"), {
  ssr: false,
});

const Box = styled(Wrapper)`
  width: calc(100% / 6 - 37px);
  margin: 0 44px 40px 0;

  &:nth-child(6n) {
    margin: 0 0 40px;
  }

  @media (max-width: 1400px) {
    width: calc(100% / 5 - 24px);
    margin: 0 30px 40px 0;

    &:nth-child(6n) {
      margin: 0 30px 40px 0;
    }

    &:nth-child(5n) {
      margin: 0 0 40px;
    }
  }

  @media (max-width: 700px) {
    width: calc(100% / 2 - 8px);
    margin: 0 10px 40px 0;

    &:nth-child(6n) {
      margin: 0 5px 40px 0;
    }

    &:nth-child(5n) {
      margin: 0 5px 40px 0;
    }

    &:nth-child(2n) {
      margin: 0 5px 40px 0;
    }
  }
`;

const CdWrapper = styled(Wrapper)`
  width: 100%;
  border-radius: 100%;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  &:after {
    content: "";
    width: 54px;
    height: 54px;
    background: ${Theme.white_C};
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .playicon {
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
  }

  &:hover .playicon {
    opacity: 1;
    visibility: visible;
  }
`;

const Musictem = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { myLikeList } = useSelector((state) => state.like);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [playing1, setPlaying1] = useState(null);
  const [playing2, setPlaying2] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션
  const [type, setType] = useState(2); // 2 - 뮤직템
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
      type: MY_LIKE_LIST_REQUEST,
      data: {
        type,
        page: currentPage,
      },
    });
  }, [type, currentPage]);

  ////// TOGGLE //////

  // 재생 버튼 1
  const playing1Toggle = useCallback(
    (id) => {
      if (playing1 && playing1 === id) {
        setPlaying1(null);
      } else {
        setPlaying1(id);
      }
    },
    [playing1]
  );

  // 재생 버튼 2
  const playing2Toggle = useCallback(
    (id) => {
      if (playing2 && playing2 === id) {
        setPlaying2(null);
      } else {
        setPlaying2(id);
      }
    },
    [playing2]
  );
  ////// HANDLER //////
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
        <title>NEW WAVE Sound | 찜 보관함</title>
      </Head>

      <WholeWrapper>
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 40px`}>
          <CommonButton
            kindOf={type === 2 ? `subTheme2` : `grey`}
            onClick={() => setType(2)}
            width={`73px`}
            height={`54px`}
            radius={`50px`}
            margin={`0 14px 0 0`}
          >
            앨범
          </CommonButton>
          <CommonButton
            kindOf={type === 3 ? `subTheme2` : `grey`}
            onClick={() => setType(3)}
            width={`73px`}
            height={`54px`}
            radius={`50px`}
          >
            곡
          </CommonButton>
        </Wrapper>

        {type === 2 && (
          <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
            {myLikeList &&
            myLikeList.albums &&
            myLikeList.albums.length === 0 ? (
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
                  관심 있는 음악을 미리 찜해두세요!
                </Text>
              </Wrapper>
            ) : (
              myLikeList.albums &&
              myLikeList.albums.map((data, idx) => {
                return (
                  <Box key={data.id}>
                    <audio
                      id={`audioTeg_recent_${idx}`}
                      src={data.filePath}
                      hidden
                    />
                    <CdWrapper>
                      <Image
                        position={`absolute`}
                        top={`0`}
                        left={`0`}
                        height={`100%`}
                        radius={`100%`}
                        src={data.albumImage}
                        alt="thumbnail"
                      />
                      <Image
                        className="playicon"
                        width={`21px`}
                        onClick={() => playing1Toggle(data.id)}
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png"
                        alt="play icon"
                      />

                      <Wrapper
                        position={`absolute`}
                        top={`0`}
                        left={`0`}
                        width={`auto`}
                      >
                        <Checkbox />
                      </Wrapper>
                    </CdWrapper>
                    <Text
                      fontSize={`20px`}
                      color={Theme.darkGrey_C}
                      margin={`20px 0 0`}
                    >
                      {data.albumName}
                    </Text>
                    {/* <Text
                      fontSize={`16px`}
                      color={Theme.subTheme4_C}
                      margin={`0 0 20px`}
                    >
                      {data.bitRate}
                    </Text> */}
                    <Wrapper dr={`row`}>
                      <Wrapper width={`60px`} cursor={`pointer`}>
                        <Image
                          alt="icon"
                          width={`22px`}
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                        />
                        <Text fontSize={`12px`} color={Theme.grey_C}>
                          0
                        </Text>
                      </Wrapper>

                      <Wrapper width={`60px`}>
                        <Image
                          alt="icon"
                          width={`22px`}
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                        />
                        <Text fontSize={`12px`} color={Theme.grey_C}>
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

        {type === 3 && (
          <Wrapper>
            <Wrapper
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              margin={`0 0 100px`}
            >
              {myLikeList &&
                myLikeList.tracks &&
                (myLikeList.tracks.length === 0 ? (
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
                      음원이 존재하지 않습니다.
                    </Text>
                  </Wrapper>
                ) : (
                  myLikeList.tracks &&
                  myLikeList.tracks.map((data, idx) => {
                    return (
                      <Wrapper
                        key={idx}
                        borderBottom={`1px solid ${Theme.lightGrey_C}`}
                        dr={`row`}
                        ju={`space-between`}
                        padding={
                          width < 1360
                            ? width < 700
                              ? ` 5px 0`
                              : `30px 15px`
                            : `40px 32px`
                        }
                      >
                        <audio
                          id={`audioTeg_recent_${idx}`}
                          src={data.filePath}
                          hidden
                        />
                        <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
                          <Image
                            alt="thumbnail"
                            src={data.albumImage}
                            width={width < 700 ? `80px` : `100px`}
                            height={width < 700 ? `80px` : `100px`}
                            radius={`7px`}
                            shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
                          />
                          {playing2 === data.id ? (
                            <Image
                              alt="pause icon"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/pause_purple.png`}
                              width={width < 700 ? `20px` : `24px`}
                              margin={width < 700 ? `0 15px` : `0 30px`}
                              onClick={() => playing2Toggle(data.id)}
                              cursor={`pointer`}
                            />
                          ) : (
                            <Image
                              alt="play icon"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png`}
                              width={width < 700 ? `20px` : `24px`}
                              margin={width < 700 ? `0 15px` : `0 30px`}
                              onClick={() => playing2Toggle(data.id)}
                              cursor={`pointer`}
                            />
                          )}

                          <Wrapper width={`auto`} al={`flex-start`}>
                            <Text
                              fontSize={width < 700 ? `18px` : `22px`}
                              color={Theme.darkGrey_C}
                              margin={width < 700 ? `0` : `0 0 8px`}
                              width={width < 1600 ? `200px` : `280px`}
                              isEllipsis
                            >
                              {data.songName}
                            </Text>
                            <Text
                              onClick={() =>
                                movelinkHandler(
                                  `/musictem/artist/${data.ProductId}`
                                )
                              }
                              isHover
                              fontSize={width < 700 ? `14px` : `16px`}
                              color={Theme.subTheme4_C}
                            >
                              {data.singerName}
                            </Text>
                            {width < 1520 ? (
                              <Text
                                width={`160px`}
                                fontSize={width < 700 ? `14px` : `18px`}
                                color={Theme.grey2_C}
                                isEllipsis
                              >
                                {/* {data.genList.map(
                                  (value, idx) =>
                                    value.value +
                                    (data.genList.length === idx + 1 ? "" : ",")
                                )} */}
                              </Text>
                            ) : null}

                            {width < 900 ? (
                              <Wrapper
                                width={`auto`}
                                dr={`row`}
                                al={`flex-start`}
                                ju={`center`}
                                margin={`10px 0 0`}
                              >
                                <Wrapper width={`50px`} cursor={`pointer`}>
                                  <Image
                                    alt="icon"
                                    width={`22px`}
                                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                                  />
                                  <Text fontSize={`12px`} color={Theme.grey_C}>
                                    {data.viewDownLoadCnt}
                                  </Text>
                                </Wrapper>
                                <Wrapper
                                  width={`50px`}
                                  onClick={() => movelinkHandler(`/license`)}
                                  cursor={`pointer`}
                                >
                                  <Image
                                    alt="icon"
                                    width={`22px`}
                                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/cart.png`}
                                  />
                                </Wrapper>
                                <Wrapper width={`50px`}>
                                  <Image
                                    alt="icon"
                                    width={`22px`}
                                    src={
                                      data.isLike
                                        ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`
                                        : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`
                                    }
                                  />
                                  <Text fontSize={`12px`} color={Theme.grey_C}>
                                    {data.likeCnt}
                                  </Text>
                                </Wrapper>
                              </Wrapper>
                            ) : null}
                          </Wrapper>
                        </Wrapper>
                        {width < 1520 ? null : (
                          <Wrapper
                            width={`auto`}
                            fontSize={`18px`}
                            color={Theme.grey2_C}
                          >
                            <Text width={`160px`} isEllipsis>
                              {/* {data.genList.map(
                                (value, idx) =>
                                  value.value +
                                  (data.genList.length === idx + 1 ? "" : ",")
                              )} */}
                            </Text>
                          </Wrapper>
                        )}

                        <Wrapper
                          visibility={width < 1360 ? `hidden` : ``}
                          opacity={width < 1360 ? `0` : ``}
                          height={width < 1360 ? `0` : ``}
                          width={`auto`}
                          dr={`row`}
                        >
                          <Text
                            fontSize={width < 900 ? `14px` : `16px`}
                            color={Theme.darkGrey_C}
                            margin={`0 20px 0 0`}
                          >
                            {data.fileLength}
                          </Text>
                          <Wrapper width={width < 1360 ? `180px` : `236px`}>
                            <ReactWaves
                              options={{
                                barHeight: 1,
                                cursorWidth: 0,
                                height: width < 1360 ? 0 : 53,
                                hideScrollbar: true,
                                progressColor: Theme.basicTheme_C,
                                responsive: true,
                                waveColor: Theme.lightGrey_C,
                              }}
                              volume={1}
                              zoom={2}
                              playing={playing1 === data.id}
                              audioFile={data.filePath}
                            />
                          </Wrapper>
                        </Wrapper>

                        {width < 900 ? null : (
                          <Wrapper
                            width={`auto`}
                            margin={`0`}
                            dr={`row`}
                            al={`flex-start`}
                            ju={`center`}
                          >
                            <Wrapper width={`60px`} cursor={`pointer`}>
                              <Image
                                alt="icon"
                                width={`22px`}
                                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                              />
                              <Text fontSize={`12px`} color={Theme.grey_C}>
                                {data.viewDownLoadCnt}
                              </Text>
                            </Wrapper>
                            <Wrapper
                              width={`50px`}
                              onClick={() => movelinkHandler(`/license`)}
                              cursor={`pointer`}
                            >
                              <Image
                                alt="icon"
                                width={`22px`}
                                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/cart.png`}
                              />
                            </Wrapper>
                            <Wrapper width={`60px`}>
                              <Image
                                alt="icon"
                                width={`22px`}
                                src={
                                  data.isLike
                                    ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`
                                    : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`
                                }
                              />
                              <Text fontSize={`12px`} color={Theme.grey_C}>
                                {data.likeCnt}
                              </Text>
                            </Wrapper>
                          </Wrapper>
                        )}
                      </Wrapper>
                    );
                  })
                ))}
            </Wrapper>
          </Wrapper>
        )}
      </WholeWrapper>
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

export default Musictem;
