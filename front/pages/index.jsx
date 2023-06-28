import React, { useCallback, useEffect, useState } from "react";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  WholeWrapper,
  Wrapper,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../components/popup/popup";
import MainSlider2 from "../components/slide/MainSlider2";
import dynamic from "next/dynamic";
import { message, Modal } from "antd";
import { useRouter } from "next/router";
import {
  ARTISTEM_LIST_REQUEST,
  ARTISTEM_SLIDE_LIST_REQUEST,
} from "../reducers/artist";
import { useDispatch, useSelector } from "react-redux";
import {
  PRODUCT_TRACK_ALL_LIST_REQUEST,
  PRODUCT_TRACK_RECENT_REQUEST,
} from "../reducers/product";
import moment from "moment";
import { MUSICTEM_LIST_REQUEST } from "../reducers/album";
import { TRACK_CREATE_REQUEST } from "../reducers/like";

const ReactWaves = dynamic(() => import("@dschoon/react-waves"), {
  ssr: false,
});

const Comment = styled(Wrapper)`
  position: absolute;
  bottom: -62px;
  width: auto;
  height: 40px;
  background: ${Theme.white_C};
  color: ${Theme.grey_C};
  padding: 0 16px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;

  &:hover {
    color: ${Theme.basicTheme_C};
  }

  &:before {
    content: "";
    position: absolute;
    top: -14px;
    width: 0px;
    height: 0px;
    border-bottom: 14px solid ${Theme.white_C};
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
  }

  @media (max-width: 900px) {
    font-size: 12px;
    padding: 0 10px;
  }
`;

const CommentWrapper = styled(Wrapper)`
  &:hover ${Comment} {
    opacity: 1;
    visibility: visible;
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////

  const { artistemSlideList } = useSelector((state) => state.artist);
  const { musictemList } = useSelector((state) => state.album);
  const { me } = useSelector((state) => state.user);
  const { st_trackCreateDone, st_trackCreateError } = useSelector(
    (state) => state.like
  );

  const [playing1, setPlaying1] = useState(null);
  const [down, setDown] = useState(false);
  const [type, setType] = useState(1);

  const [newAudioTime, setNewAudioTime] = useState([]);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  ///////////////////////// 좋아요 후처리 /////////////////////////////
  useEffect(() => {
    if (st_trackCreateDone) {
      dispatch({
        type: MUSICTEM_LIST_REQUEST,
        data: {
          orderType: type,
        },
      });

      return message.success("찜목록에 추가되었습니다.");
    }

    if (st_trackCreateError) {
      return message.error(st_trackCreateError);
    }
  }, [st_trackCreateDone, st_trackCreateError]);

  useEffect(() => {
    if (musictemList) {
      setTimeout(() => {
        let allAudioTimeArr = newAudioTime
          ? newAudioTime.map((data) => data)
          : [];

        for (let i = 0; i < musictemList.length; i++) {
          const trackId = document.getElementById(`audioTeg_recent_${i}`);

          if (trackId) {
            allAudioTimeArr.push(
              moment(trackId.duration * 1000).format("mm:ss")
            );
          }
        }
        setNewAudioTime(allAudioTimeArr);
      }, 2000);
    }
  }, [musictemList]);

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

  const downToggle = useCallback(() => {
    setDown((prev) => !prev);
  }, [down]);

  const typeHandler = useCallback(
    (data) => {
      setType(data);

      dispatch({
        type: MUSICTEM_LIST_REQUEST,
        data: {
          orderType: data,
        },
      });
    },
    [type]
  );

  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const likeHandler = useCallback(
    (data) => {
      if (me) {
        dispatch({
          type: TRACK_CREATE_REQUEST,
          data: {
            TrackId: data.id,
          },
        });
      } else {
        return message.error("로그인이 필요합니다.");
      }
    },
    [me]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              height={width < 900 ? `300px` : `400px`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/main.png")`}
              radius={`14px`}
              overflow={`hidden`}
              shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
              margin={`0 0 60px`}
            >
              <Wrapper
                height={`100%`}
                bgColor={`rgba(0, 0, 0, 0.4)`}
                color={Theme.white_C}
              >
                <Text
                  fontSize={width < 900 ? `25px` : `32px`}
                  fontWeight={`500`}
                  margin={`0 0 22px`}
                >
                  NEW WAVE SOUND
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                >
                  {width < 900 ? (
                    <>
                      <Text>다양한 사람들의 음악의 파도를 타고</Text>
                      <Text>당신의 음악을 완성하세요!</Text>
                    </>
                  ) : (
                    `다양한 사람들의 음악의 파도를 타고 당신의 음악을 완성하세요!`
                  )}
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                >
                  전 세계에 판매할 수 있는 글로벌 Aritist
                </Text>
                <Wrapper dr={`row`} margin={`20px 0 0`}>
                  <CommentWrapper width={`auto`} position={`relative`}>
                    <CommonButton
                      width={width < 900 ? `150px` : `220px`}
                      height={`54px`}
                      kindOf={`white`}
                      fontSize={`18px`}
                      fontWeight={`500`}
                      margin={width < 900 ? `0 5px` : `0 15px 0 0`}
                      onClick={() => movelinkHandler(`/artisttem`)}
                    >
                      Artisttem
                    </CommonButton>
                    <Comment>내 음악을 완성할 Artist 찾기</Comment>
                  </CommentWrapper>
                  <CommonButton
                    width={width < 900 ? `150px` : `220px`}
                    height={`54px`}
                    kindOf={`white`}
                    fontSize={`18px`}
                    fontWeight={`500`}
                    margin={width < 900 ? `0 5px` : `0 0 0 15px`}
                    onClick={() => movelinkHandler(`/musictem`)}
                  >
                    Musictem
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            {artistemSlideList && <MainSlider2 datum={artistemSlideList} />}

            <Wrapper dr={`row`} ju={`space-between`} margin={`80px 0 40px`}>
              <Wrapper
                dr={`row`}
                width={`auto`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/musictem.png`}
                  width={`18px`}
                  margin={`0 6px 0 0`}
                />
                Musictem
              </Wrapper>
              <Wrapper dr={`row`} width={`auto`} fontSize={`16px`}>
                <Text
                  color={type === 1 ? Theme.basicTheme_C : Theme.grey_C}
                  isHover
                  onClick={() => typeHandler(1)}
                >
                  최신순
                </Text>
                <SpanText
                  fontSize={`10px`}
                  margin={`0 10px`}
                  color={Theme.lightGrey_C}
                >
                  |
                </SpanText>
                <Text
                  color={type === 2 ? Theme.basicTheme_C : Theme.grey_C}
                  isHover
                  onClick={() => typeHandler(2)}
                >
                  추천순
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              margin={`0 0 100px`}
            >
              {musictemList &&
                (musictemList.length === 0 ? (
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
                  musictemList.map((data, idx) => {
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
                          src={data.filepath}
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
                          {playing1 === data.id ? (
                            <Image
                              alt="pause icon"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/pause_purple.png`}
                              width={width < 700 ? `20px` : `24px`}
                              margin={width < 700 ? `0 15px` : `0 30px`}
                              onClick={() => playing1Toggle(data.id)}
                              cursor={`pointer`}
                            />
                          ) : (
                            <Image
                              alt="play icon"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png`}
                              width={width < 700 ? `20px` : `24px`}
                              margin={width < 700 ? `0 15px` : `0 30px`}
                              onClick={() => playing1Toggle(data.id)}
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
                                <Wrapper
                                  width={`50px`}
                                  onClick={downToggle}
                                  cursor={`pointer`}
                                >
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
                                    onClick={() => likeHandler(data)}
                                    cursor={`pointer`}
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
                              audioFile={data.filepath}
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
                            <Wrapper
                              width={`60px`}
                              onClick={downToggle}
                              cursor={`pointer`}
                            >
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
                                onClick={() => likeHandler(data)}
                                cursor={`pointer`}
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
          </RsWrapper>
          <Popup />

          <Modal onCancel={downToggle} visible={down} footer={null}>
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                다운로드 안내
              </Text>

              <Text fontSize={width < 900 ? `14px` : `16px`}>
                1회 다운로드 되며, 결제 내역에서 확인할 수 있습니다.
              </Text>
              <Text fontSize={width < 900 ? `14px` : `16px`}>
                파일 유실 시 메일로 문의 바랍니다.
              </Text>

              <CommonButton
                width={`150px`}
                height={`48px`}
                fontSize={`18px`}
                fontWeight={`bold`}
                margin={`30px 0 0`}
              >
                다운로드
              </CommonButton>
            </Wrapper>
          </Modal>
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
      type: ARTISTEM_SLIDE_LIST_REQUEST,
    });

    context.store.dispatch({
      type: PRODUCT_TRACK_ALL_LIST_REQUEST,
    });

    context.store.dispatch({
      type: MUSICTEM_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
