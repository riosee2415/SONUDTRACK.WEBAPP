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

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);

  const [currentTab, setCurrentTab] = useState(0);
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
  const playingToggle = useCallback(() => {
    setPlaying((prev) => !prev);
  }, [playing]);
  ////// HANDLER //////

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 찜 보관함</title>
      </Head>

      <WholeWrapper>
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 40px`}>
          <CommonButton
            kindOf={currentTab === 0 ? `subTheme2` : `grey`}
            onClick={() => setCurrentTab(0)}
            width={`73px`}
            height={`54px`}
            radius={`50px`}
            margin={`0 14px 0 0`}
          >
            앨범
          </CommonButton>
          <CommonButton
            kindOf={currentTab === 1 ? `subTheme2` : `grey`}
            onClick={() => setCurrentTab(1)}
            width={`73px`}
            height={`54px`}
            radius={`50px`}
          >
            곡
          </CommonButton>
        </Wrapper>

        {currentTab === 0 && (
          <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
            {/* <Wrapper
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
            </Wrapper> */}

            <Box>
              <CdWrapper>
                <Image
                  position={`absolute`}
                  top={`0`}
                  left={`0`}
                  height={`100%`}
                  radius={`100%`}
                  src={
                    "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/new_big.png"
                  }
                  alt="thumbnail"
                />
                <Image
                  className="playicon"
                  width={`21px`}
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
                Star Night
              </Text>
              <Text
                fontSize={`16px`}
                color={Theme.subTheme4_C}
                margin={`0 0 20px`}
              >
                Pokerface
              </Text>
              <Wrapper dr={`row`}>
                <Wrapper width={`60px`} cursor={`pointer`}>
                  <Image
                    alt="icon"
                    width={`22px`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                  />
                  <Text fontSize={`12px`} color={Theme.grey_C}>
                    15,000
                  </Text>
                </Wrapper>

                <Wrapper width={`60px`}>
                  <Image
                    alt="icon"
                    width={`22px`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                  />
                  <Text fontSize={`12px`} color={Theme.grey_C}>
                    98
                  </Text>
                </Wrapper>
              </Wrapper>
            </Box>
          </Wrapper>
        )}

        {currentTab === 1 && (
          <Wrapper>
            <Wrapper
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              margin={`0 0 100px`}
            >
              <Wrapper
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                dr={`row`}
                ju={`space-between`}
                padding={
                  width < 1360 ? (width < 700 ? ` 5px 0` : `30px 0`) : `40px 0`
                }
              >
                <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
                  <Checkbox />
                  <Image
                    alt="thumbnail"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/musictem1.png`}
                    width={width < 700 ? `80px` : `100px`}
                    height={width < 700 ? `80px` : `100px`}
                    margin={`0 0 0 14px`}
                    radius={`7px`}
                    shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
                  />
                  {playing ? (
                    <Image
                      alt="pause icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/pause_purple.png`}
                      width={width < 700 ? `20px` : `24px`}
                      margin={width < 700 ? `0 15px` : `0 30px`}
                      onClick={playingToggle}
                      cursor={`pointer`}
                    />
                  ) : (
                    <Image
                      alt="play icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png`}
                      width={width < 700 ? `20px` : `24px`}
                      margin={width < 700 ? `0 15px` : `0 30px`}
                      onClick={playingToggle}
                      cursor={`pointer`}
                    />
                  )}

                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text
                      fontSize={width < 700 ? `18px` : `22px`}
                      color={Theme.darkGrey_C}
                      margin={width < 700 ? `0` : `0 0 8px`}
                      width={
                        width < 1600
                          ? width < 700
                            ? `180px`
                            : `200px`
                          : `280px`
                      }
                      isEllipsis
                    >
                      Star Night
                    </Text>
                    <Text
                      fontSize={width < 700 ? `14px` : `16px`}
                      color={Theme.subTheme4_C}
                    >
                      Pokerface
                    </Text>
                    {width < 1520 ? (
                      <Text
                        width={`160px`}
                        fontSize={width < 700 ? `14px` : `18px`}
                        color={Theme.grey2_C}
                        isEllipsis
                      >
                        Pop, Funk, Rock, L...
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
                            15,000
                          </Text>
                        </Wrapper>

                        <Wrapper width={`50px`}>
                          <Image
                            alt="icon"
                            width={`22px`}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                          />
                          <Text fontSize={`12px`} color={Theme.grey_C}>
                            98
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
                    <Text width={width < 900 ? `120px` : `160px`} isEllipsis>
                      Pop, Funk, Rock, L...
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
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 20px 0 0`}
                  >
                    3:04
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
                      playing={playing}
                      audioFile={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/mp3/mp3_sample.mp3`}
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
                        15,000
                      </Text>
                    </Wrapper>

                    <Wrapper width={`60px`}>
                      <Image
                        alt="icon"
                        width={`22px`}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                      />
                      <Text fontSize={`12px`} color={Theme.grey_C}>
                        98
                      </Text>
                    </Wrapper>
                  </Wrapper>
                )}
              </Wrapper>
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
