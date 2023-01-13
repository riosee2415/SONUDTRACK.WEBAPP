import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { CustomerServiceFilled } from "@ant-design/icons";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Modal } from "antd";

const ReactWaves = dynamic(() => import("@dschoon/react-waves"), {
  ssr: false,
});

const Index = () => {
  ////// GLOBAL STATE //////
  const [playing, setPlaying] = useState(false);
  const [down, setDown] = useState(false);
  const [cart, setCart] = useState(false);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const playingToggle = useCallback(() => {
    setPlaying((prev) => !prev);
  }, [playing]);

  const downToggle = useCallback(() => {
    setDown((prev) => !prev);
  }, [down]);

  const cartToggle = useCallback(() => {
    setCart((prev) => !prev);
  }, [cart]);
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Artworks Community</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            margin={`-84px 0 0`}
            padding={`100px 0`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/main.png")`}
          >
            <RsWrapper dr={`row`} ju={`space-between`}>
              <Wrapper
                al={`flex-start`}
                width={width < 800 ? `100%` : `30%`}
                fontSize={`16px`}
                color={Theme.white_C}
              >
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <CustomerServiceFilled />
                  <Text fontWeight={`500`} margin={`0 0 0 6px`}>
                    Artworks Community
                  </Text>
                </Wrapper>
                <Text
                  fontSize={`32px`}
                  fontWeight={`bold`}
                  margin={`28px 0 10px`}
                >
                  Star Night
                </Text>
                <Text fontSize={`18px`}>Pokerface</Text>
                <CommonButton
                  width={`148px`}
                  height={`46px`}
                  margin={`25px 0 4px`}
                >
                  구매하기
                </CommonButton>
                <Text fontSize={`12px`}>남은 다운로드(명) : 15,000</Text>
              </Wrapper>
              <Wrapper width={width < 800 ? `100%` : `70%`} dr={`row`}>
                {playing ? (
                  <Image
                    alt="pause icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/pause_white.png`}
                    width={width < 700 ? `20px` : `24px`}
                    margin={width < 700 ? `0 15px` : `0 30px`}
                    onClick={playingToggle}
                    cursor={`pointer`}
                  />
                ) : (
                  <Image
                    alt="play icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_white.png`}
                    width={width < 700 ? `20px` : `24px`}
                    onClick={playingToggle}
                    cursor={`pointer`}
                  />
                )}
                <Wrapper width={width < 800 ? `70%` : `80%`} margin={`0 20px`}>
                  <ReactWaves
                    options={{
                      barHeight: 1,
                      cursorWidth: 0,
                      height: 87,
                      hideScrollbar: true,
                      progressColor: Theme.basicTheme_C,
                      responsive: true,
                      waveColor: Theme.white_C,
                    }}
                    volume={1}
                    zoom={2}
                    playing={playing}
                    audioFile={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/mp3/mp3_sample.mp3`}
                  />
                </Wrapper>
                <Text fontSize={`16px`} color={Theme.white_C}>
                  3:04
                </Text>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
          <Wrapper
            padding={width < 900 ? `30px 10px` : `30px 70px`}
            bgColor={Theme.lightGrey2_C}
            dr={`row`}
            ju={`flex-start`}
          >
            <Wrapper
              width={`auto`}
              al={`flex-start`}
              margin={width < 800 ? `0 70px 10px 0` : `0 70px 0 0`}
            >
              <Text color={Theme.grey_C} fontWeight={`bold`}>
                Genre
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0 0`}>
                <Wrapper
                  width={`auto`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  bgColor={Theme.white_C}
                  radius={`30px`}
                  height={`27px`}
                  padding={`0 15px`}
                  margin={`0 4px 0 0`}
                >
                  Popular
                </Wrapper>
                <Wrapper
                  width={`auto`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  bgColor={Theme.white_C}
                  radius={`30px`}
                  height={`27px`}
                  padding={`0 15px`}
                  margin={`0 4px 0 0`}
                >
                  Pop
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              width={`auto`}
              al={`flex-start`}
              margin={width < 800 ? `0 70px 10px 0` : `0 70px 0 0`}
            >
              <Text color={Theme.grey_C} fontWeight={`bold`}>
                BPM
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0 0`}>
                <Wrapper
                  width={`auto`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  bgColor={Theme.white_C}
                  radius={`30px`}
                  height={`27px`}
                  padding={`0 15px`}
                  margin={`0 4px 0 0`}
                >
                  148
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper width={`auto`} al={`flex-start`} margin={`0 70px 0 0`}>
              <Text color={Theme.grey_C} fontWeight={`bold`}>
                Key
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0 0`}>
                <Wrapper
                  width={`auto`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  bgColor={Theme.white_C}
                  radius={`30px`}
                  height={`27px`}
                  padding={`0 15px`}
                  margin={`0 4px 0 0`}
                >
                  C min
                </Wrapper>
                <Wrapper
                  width={`auto`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  bgColor={Theme.white_C}
                  radius={`30px`}
                  height={`27px`}
                  padding={`0 15px`}
                  margin={`0 4px 0 0`}
                >
                  C maj
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper width={`auto`} al={`flex-start`}>
              <Text color={Theme.grey_C} fontWeight={`bold`}>
                License
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0 0`}>
                <Wrapper
                  width={`auto`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  bgColor={Theme.white_C}
                  radius={`30px`}
                  height={`27px`}
                  padding={`0 15px`}
                  margin={`0 4px 0 0`}
                >
                  비독점
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <RsWrapper>
            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `25px` : `32px`}
              fontWeight={`bold`}
              margin={`70px 0 30px`}
            >
              제작자의 다른 트랙
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              <Wrapper
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
                <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="thumbnail"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/musictem1.png`}
                    width={width < 700 ? `80px` : `100px`}
                    height={width < 700 ? `80px` : `100px`}
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
                      width={width < 1600 ? `200px` : `280px`}
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
                            15,000
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={`50px`}
                          onClick={cartToggle}
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
                    <Text width={`160px`} isEllipsis>
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
                        15,000
                      </Text>
                    </Wrapper>
                    <Wrapper
                      width={`50px`}
                      onClick={cartToggle}
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

            <Wrapper margin={`60px 0`}>
              <CommonButton kindOf={`grey`} width={`150px`} height={`48px`}>
                더보기 +
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          <Modal onCancel={downToggle} visible={down} footer={null}>
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                다운로드 결제 안내
              </Text>
              <Text fontSize={`16px`}>바로 구매하시겠습니까?</Text>
              <Text fontSize={`16px`}>
                1회 다운로드 되며, 결제 내역에서 확인할 수 있습니다.
              </Text>
              <Text fontSize={`16px`}>파일 유실 시 메일로 문의 바랍니다.</Text>

              <Wrapper dr={`row`} margin={`30px 0 0`}>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme`}
                  margin={`0 4px 0 0`}
                >
                  장바구니 담기
                </CommonButton>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`0 0 0 4px`}
                >
                  바로 구매하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
          <Modal onCancel={cartToggle} visible={cart} footer={null}>
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                Cart
              </Text>
              <Text fontSize={`16px`}>장바구니에 추가되었습니다.</Text>
              <Text fontSize={`16px`}>계속 둘러보시겠어요?</Text>

              <Wrapper dr={`row`} margin={`30px 0 0`}>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme`}
                  margin={`0 4px 0 0`}
                >
                  장바구니 이동
                </CommonButton>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`0 0 0 4px`}
                  onClick={cartToggle}
                >
                  계속 쇼핑하기
                </CommonButton>
              </Wrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
