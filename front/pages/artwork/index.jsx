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
  CustomPage,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { Checkbox, Modal, Radio, Slider } from "antd";
import { useRouter } from "next/router";

const ReactWaves = dynamic(() => import("@dschoon/react-waves"), {
  ssr: false,
});

const Btn = styled(Wrapper)`
  width: auto;
  color: ${Theme.grey_C};
  font-size: 22px;
  position: relative;
  margin: 0 10px;
  padding: 0 0 16px;

  &:before {
    content: "";
    width: 0;
    height: 1px;
    background: ${Theme.basicTheme_C};
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.3s;
  }

  ${(props) =>
    props.isActive &&
    `
   color: ${Theme.basicTheme_C};
    font-weight: bold;

    &:before {
      width: 100%;
    }
  `}

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
    font-weight: bold;

    &:before {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    font-size: 16px;
    width: 50%;
    margin: 0;
    padding: 0 10px;
  }
`;

const BoxBtn = styled(Wrapper)`
  width: calc(100% / 5 - 10px);
  height: 54px;
  background: ${Theme.lightGrey2_C};
  font-size: 18px;

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
    font-weight: bold;
    background: ${Theme.subTheme_C};
  }

  ${(props) =>
    props.isActive &&
    `
    color: ${Theme.basicTheme_C};
    font-weight: bold;
    background: ${Theme.subTheme_C};
  `}

  @media (max-width:900px) {
    font-size: 13px;
  }
`;

const List = styled(Wrapper)`
  &:hover {
    cursor: pointer;
    background: ${Theme.lightGrey2_C};

    ${CommonButton} {
      border: 1px solid ${Theme.white_C};
      background: ${Theme.white_C};
      box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
    }
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const [down, setDown] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const playingToggle = useCallback(() => {
    setPlaying((prev) => !prev);
  }, [playing]);

  const downToggle = useCallback(() => {
    setDown((prev) => !prev);
  }, [down]);

  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const orderModalToggle = useCallback(() => {
    setIsOrderModal((prev) => !prev);
  }, [isOrderModal]);

  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Artworks Community</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              height={`260px`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/artworks.png")`}
              radius={`14px`}
              overflow={`hidden`}
              position={`relative`}
              shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
              color={Theme.white_C}
            >
              <Text
                fontSize={`16px`}
                fontWeight={`bold`}
                isHover
                position={`absolute`}
                top={`30px`}
                right={`30px`}
                td={`underline`}
                onClick={modalToggle}
              >
                How to use
              </Text>
              <Wrapper height={`100%`} bgColor={`rgba(0, 0, 0, 0.4)`}>
                <Text
                  fontSize={width < 900 ? `25px` : `32px`}
                  fontWeight={`500`}
                  margin={`0 0 16px`}
                >
                  Artwork Community
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                  margin={`0 0 28px`}
                >
                  Tracker, Top Liner가 필요할 때 이용하세요!
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`40px 0 20px`}
            >
              <Btn isActive>Track (for Singer, Top Liner)</Btn>
              <Btn>Top Line (for Tracker)</Btn>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              borderBottom={`3px solid ${Theme.lightGrey2_C}`}
              padding={`0 0 20px`}
            >
              <Wrapper width={`auto`} dr={`row`}>
                <CommonButton
                  height={width < 900 ? `40px` : `54px`}
                  fontSize={width < 900 ? `16px` : `18px`}
                  radius={`50px`}
                  margin={`0 14px 0 0`}
                  width={`180px`}
                  kindOf={`subTheme2`}
                >
                  내가 만든 음악 보기
                </CommonButton>
                <CommonButton
                  height={width < 900 ? `40px` : `54px`}
                  fontSize={width < 900 ? `16px` : `18px`}
                  radius={`50px`}
                  kindOf={`grey`}
                  width={`102px`}
                >
                  업로드
                </CommonButton>
              </Wrapper>
              <Wrapper
                width={width < 700 ? `100%` : `400px`}
                position={`relative`}
                height={`54px`}
                color={Theme.black_C}
                margin={width < 700 && `15px 0 0`}
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
                  border={`1px solid ${Theme.lightGrey_C}`}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0`}>
              <BoxBtn
                onClick={() => setCurrentTab(0)}
                isActive={currentTab === 0}
              >
                Genre
              </BoxBtn>
              <BoxBtn
                onClick={() => setCurrentTab(1)}
                isActive={currentTab === 1}
              >
                BPM
              </BoxBtn>
              <BoxBtn
                onClick={() => setCurrentTab(2)}
                isActive={currentTab === 2}
              >
                Key
              </BoxBtn>
              <BoxBtn
                onClick={() => setCurrentTab(3)}
                isActive={currentTab === 3}
              >
                Gender
              </BoxBtn>
              <BoxBtn
                onClick={() => setCurrentTab(4)}
                isActive={currentTab === 4}
              >
                License
              </BoxBtn>
            </Wrapper>

            {currentTab === 0 && (
              <>
                <Wrapper
                  border={`1px solid ${Theme.lightGrey_C}`}
                  padding={`20px 10px`}
                  dr={`row`}
                  ju={`flex-start`}
                  al={`flex-start`}
                >
                  <CommonButton
                    kindOf={`grey`}
                    width={
                      width < 1100
                        ? width < 900
                          ? `calc(100% / 3 - 20px)`
                          : `calc(100% / 5 - 20px)`
                        : `calc(100% / 8 - 20px)`
                    }
                    margin={`0 10px`}
                    padding={`0`}
                    height={width < 900 ? `40px` : `54px`}
                  >
                    Show All
                  </CommonButton>
                  <CommonButton
                    kindOf={`grey`}
                    width={
                      width < 1100
                        ? width < 900
                          ? `calc(100% / 3 - 20px)`
                          : `calc(100% / 5 - 20px)`
                        : `calc(100% / 8 - 20px)`
                    }
                    margin={`0 10px`}
                    padding={`0`}
                    height={width < 900 ? `40px` : `54px`}
                  >
                    Popular
                  </CommonButton>
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0 16px`}>
                  <CommonButton
                    width={`66px`}
                    height={`24px`}
                    fontSize={`14px`}
                    padding={`0`}
                    kindOf={`grey2`}
                    margin={`0 6px 0 0`}
                  >
                    초기화
                  </CommonButton>
                  <CommonButton
                    width={`66px`}
                    height={`24px`}
                    fontSize={`14px`}
                    padding={`0`}
                    kindOf={`grey2`}
                  >
                    전체 선택
                  </CommonButton>
                </Wrapper>
              </>
            )}

            {currentTab === 1 && (
              <Wrapper
                border={`1px solid ${Theme.lightGrey_C}`}
                padding={`20px 50px`}
                margin={`0 0 20px`}
              >
                <Slider
                  style={{ width: `100%` }}
                  range={{
                    draggableTrack: true,
                  }}
                  marks={{ 0: `80`, 100: `180` }}
                />
              </Wrapper>
            )}

            {currentTab === 2 && (
              <>
                <Wrapper
                  border={`1px solid ${Theme.lightGrey_C}`}
                  padding={`20px 10px`}
                  dr={`row`}
                  ju={`flex-start`}
                  al={`flex-start`}
                >
                  <CommonButton
                    kindOf={`grey`}
                    width={
                      width < 1100
                        ? width < 900
                          ? `calc(100% / 3 - 20px)`
                          : `calc(100% / 5 - 20px)`
                        : `calc(100% / 8 - 20px)`
                    }
                    margin={`0 10px`}
                    padding={`0`}
                    height={width < 900 ? `40px` : `54px`}
                  >
                    C min
                  </CommonButton>
                  <CommonButton
                    kindOf={`grey`}
                    width={
                      width < 1100
                        ? width < 900
                          ? `calc(100% / 3 - 20px)`
                          : `calc(100% / 5 - 20px)`
                        : `calc(100% / 8 - 20px)`
                    }
                    margin={`0 10px`}
                    padding={`0`}
                    height={width < 900 ? `40px` : `54px`}
                  >
                    Popular
                  </CommonButton>
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0 16px`}>
                  <CommonButton
                    width={`66px`}
                    height={`24px`}
                    fontSize={`14px`}
                    padding={`0`}
                    kindOf={`grey2`}
                    margin={`0 6px 0 0`}
                  >
                    C maj
                  </CommonButton>
                  <CommonButton
                    width={`66px`}
                    height={`24px`}
                    fontSize={`14px`}
                    padding={`0`}
                    kindOf={`grey2`}
                  >
                    전체 선택
                  </CommonButton>
                </Wrapper>
              </>
            )}
            {currentTab === 3 && (
              <>
                <Wrapper
                  border={`1px solid ${Theme.lightGrey_C}`}
                  padding={`20px 10px`}
                  dr={`row`}
                  ju={`flex-start`}
                  al={`flex-start`}
                >
                  <CommonButton
                    kindOf={`grey`}
                    width={
                      width < 1100
                        ? width < 900
                          ? `calc(100% / 2 - 20px)`
                          : `calc(100% / 5 - 20px)`
                        : `calc(100% / 8 - 20px)`
                    }
                    margin={`0 10px`}
                    padding={`0`}
                    height={width < 900 ? `40px` : `54px`}
                  >
                    male
                  </CommonButton>
                  <CommonButton
                    kindOf={`grey`}
                    width={
                      width < 1100
                        ? width < 900
                          ? `calc(100% / 2 - 20px)`
                          : `calc(100% / 5 - 20px)`
                        : `calc(100% / 8 - 20px)`
                    }
                    margin={`0 10px`}
                    padding={`0`}
                    height={width < 900 ? `40px` : `54px`}
                  >
                    Female
                  </CommonButton>
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0 16px`}>
                  <CommonButton
                    width={`66px`}
                    height={`24px`}
                    fontSize={`14px`}
                    padding={`0`}
                    kindOf={`grey2`}
                    margin={`0 6px 0 0`}
                  >
                    C maj
                  </CommonButton>
                  <CommonButton
                    width={`66px`}
                    height={`24px`}
                    fontSize={`14px`}
                    padding={`0`}
                    kindOf={`grey2`}
                  >
                    전체 선택
                  </CommonButton>
                </Wrapper>
              </>
            )}
            {currentTab === 4 && (
              <>
                <Wrapper
                  border={`1px solid ${Theme.lightGrey_C}`}
                  padding={`20px 10px`}
                  dr={`row`}
                  ju={`flex-start`}
                  al={`flex-start`}
                >
                  <CommonButton
                    kindOf={`grey`}
                    width={
                      width < 1100
                        ? width < 900
                          ? `calc(100% / 2 - 20px)`
                          : `calc(100% / 5 - 20px)`
                        : `calc(100% / 8 - 20px)`
                    }
                    margin={`0 10px`}
                    padding={`0`}
                    height={width < 900 ? `40px` : `54px`}
                  >
                    독점
                  </CommonButton>
                  <CommonButton
                    kindOf={`grey`}
                    width={
                      width < 1100
                        ? width < 900
                          ? `calc(100% / 2 - 20px)`
                          : `calc(100% / 5 - 20px)`
                        : `calc(100% / 8 - 20px)`
                    }
                    margin={`0 10px`}
                    padding={`0`}
                    height={width < 900 ? `40px` : `54px`}
                  >
                    비독점
                  </CommonButton>
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0 16px`}>
                  <CommonButton
                    width={`66px`}
                    height={`24px`}
                    fontSize={`14px`}
                    padding={`0`}
                    kindOf={`grey2`}
                    margin={`0 6px 0 0`}
                  >
                    C maj
                  </CommonButton>
                  <CommonButton
                    width={`66px`}
                    height={`24px`}
                    fontSize={`14px`}
                    padding={`0`}
                    kindOf={`grey2`}
                  >
                    전체 선택
                  </CommonButton>
                </Wrapper>
              </>
            )}

            <CommonButton
              width={`150px`}
              height={`48px`}
              fontSize={width < 900 ? `16px` : `18px`}
            >
              검색
            </CommonButton>

            <Wrapper dr={`row`} ju={`space-between`} margin={`60px 0 40px`}>
              <Wrapper
                dr={`row`}
                width={`auto`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/artworks.png`}
                  width={`18px`}
                  margin={`0 6px 0 0`}
                />
                Track
              </Wrapper>
              <Wrapper dr={`row`} width={`auto`} fontSize={`16px`}>
                <Text color={Theme.grey_C} isHover>
                  추천순
                </Text>
                <SpanText
                  fontSize={`10px`}
                  margin={`0 10px`}
                  color={Theme.lightGrey_C}
                >
                  |
                </SpanText>
                <Text color={Theme.grey_C} isHover>
                  최신순
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              <List
                onClick={() => movelinkHandler(`/artwork/1`)}
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
                  <CommonButton
                    width={`54px`}
                    height={width < 900 ? `40px` : `54px`}
                    padding={`0`}
                    radius={`100%`}
                    kindOf={`subTheme`}
                    margin={`0 30px 0 0`}
                  >
                    {playing ? (
                      <Image
                        alt="pause icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/pause_purple.png`}
                        width={`16px`}
                        onClick={playingToggle}
                        cursor={`pointer`}
                      />
                    ) : (
                      <Image
                        alt="play icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png`}
                        width={`16px`}
                        onClick={playingToggle}
                        cursor={`pointer`}
                      />
                    )}
                  </CommonButton>
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text
                      fontSize={width < 700 ? `18px` : `22px`}
                      color={Theme.darkGrey_C}
                      margin={width < 700 ? `0` : `0 0 8px`}
                      width={width < 1600 ? `200px` : `280px`}
                      isEllipsis
                    >
                      Star Night
                      <SpanText
                        fontSize={`16px`}
                        margin={`0 0 0 10px`}
                        color={Theme.basicTheme_C}
                      >
                        NEW!
                      </SpanText>
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
                        <Wrapper width={`65px`} fontSize={`16px`}>
                          150bpm
                        </Wrapper>
                        <Wrapper width={`65px`} fontSize={`16px`}>
                          독점
                        </Wrapper>

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
                      </Wrapper>
                    ) : null}
                  </Wrapper>
                </Wrapper>
                {width < 1520 ? null : (
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 900 ? `16px` : `18px`}
                    color={Theme.grey2_C}
                  >
                    <Text width={`160px`} isEllipsis>
                      Pop, Funk, Rock, L...
                    </Text>
                    <Text
                      width={`160px`}
                      fontSize={`14px`}
                      color={Theme.grey_C}
                      isEllipsis
                    >
                      C min, C maj, C# min, D...
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
                    <Wrapper width={`65px`} fontSize={`16px`}>
                      150bpm
                    </Wrapper>
                    <Wrapper width={`65px`} fontSize={`16px`}>
                      독점
                    </Wrapper>
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
                  </Wrapper>
                )}
              </List>
            </Wrapper>

            <CustomPage />
          </RsWrapper>

          <Modal onCancel={downToggle} visible={down} footer={null}>
            <Wrapper
              padding={width < 900 ? `30px 0` : `30px 25px`}
              fontSize={`16px`}
            >
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                Artworks Community 결제 안내
              </Text>
              <Text>Artworks Community에서는 재다운로드가 불가합니다.</Text>
              <Text>1회 다운로드 되며, 결제 내역에서 확인할 수 있습니다.</Text>
              <Text>모든 회수의 판매 완료 시 </Text>
              <Text>Artworks Community 페이지에서 삭제됩니다.</Text>
              <Text>(독점 1회, 비독점 10회)</Text>
              <Text margin={`0 0 30px`}>
                파일 유실 시 메일로 문의 바랍니다.
              </Text>

              <Checkbox>안내 팝업 다시 보지 않기</Checkbox>
              <CommonButton
                width={`150px`}
                height={`48px`}
                fontSize={width < 900 ? `16px` : `18px`}
                fontWeight={`bold`}
                margin={`16px 0 0`}
                onClick={() => {
                  downToggle(), orderModalToggle();
                }}
              >
                확인
              </CommonButton>
            </Wrapper>
          </Modal>

          {/* track일때 이용권모달 */}
          <Modal
            onCancel={orderModalToggle}
            visible={isOrderModal}
            footer={null}
          >
            <Wrapper
              padding={width < 900 ? `30px 0` : `30px 25px`}
              fontSize={`16px`}
            >
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                이용권 선택
              </Text>

              <Wrapper dr={`row`} margin={`35px 0 30px`}>
                <Wrapper
                  width={width < 900 ? `130px` : `156px`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`35px 0`}
                >
                  <Text
                    fontSize={`22px`}
                    margin={`0 0 10px`}
                    fontWeight={`bold`}
                  >
                    Semi-Pro
                  </Text>
                  <Text>Track</Text>
                  <Text>Only</Text>
                  <Text
                    fontSize={`16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={`26px 0 0`}
                  >
                    350,000원
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`1px`}
                  height={`215px`}
                  margin={`0 20px`}
                  border={`1px dashed ${Theme.lightGrey_C}`}
                ></Wrapper>
                <Wrapper
                  width={width < 900 ? `130px` : `156px`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`35px 0`}
                >
                  <Text
                    fontSize={`22px`}
                    margin={`0 0 10px`}
                    fontWeight={`bold`}
                  >
                    Pro
                  </Text>
                  <Text>Track</Text>
                  <Text>Multi</Text>
                  <Text
                    fontSize={`16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={`26px 0 0`}
                  >
                    750,000원
                  </Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Radio>Semi-Pro</Radio>
                <Radio>Pro</Radio>
              </Wrapper>
              <CommonButton
                width={`150px`}
                height={`48px`}
                fontSize={width < 900 ? `16px` : `18px`}
                fontWeight={`bold`}
                margin={`16px 0 0`}
                onClick={downToggle}
              >
                구매하기
              </CommonButton>
            </Wrapper>
          </Modal>

          {/* top line일때 이용권모달 */}
          <Modal
            onCancel={orderModalToggle}
            visible={isOrderModal}
            footer={null}
          >
            <Wrapper
              padding={width < 900 ? `30px 0` : `30px 25px`}
              fontSize={`16px`}
            >
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                이용권 선택
              </Text>

              <Wrapper dr={`row`} margin={`35px 0 30px`}>
                <Wrapper
                  width={width < 900 ? `130px` : `156px`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`35px 0`}
                  height={`341px`}
                  ju={`flex-start`}
                >
                  <Text
                    fontSize={`22px`}
                    margin={`0 0 10px`}
                    fontWeight={`bold`}
                  >
                    Semi-Pro
                  </Text>
                  <Text>Wet Main Vocal</Text>
                  <Text>3X DRY Main Vocal</Text>
                  <Text>Instruments</Text>

                  <Text
                    fontSize={`16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={`26px 0 0`}
                  >
                    550,000원
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`1px`}
                  height={`341px`}
                  margin={`0 20px`}
                  border={`1px dashed ${Theme.lightGrey_C}`}
                ></Wrapper>
                <Wrapper
                  width={width < 900 ? `130px` : `156px`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`35px 0`}
                >
                  <Text
                    fontSize={`22px`}
                    margin={`0 0 10px`}
                    fontWeight={`bold`}
                  >
                    Pro
                  </Text>
                  <Text>Wet Main Vocal</Text>
                  <Text>3X DRY Main Vocal</Text>
                  <Text>Harmony Vocal</Text>
                  <Text>Pad Vocl</Text>
                  <Text>Ad-lip Vocal</Text>
                  <Text>Instruments</Text>
                  <Text>Instruments Multi</Text>
                  <Text
                    fontSize={`16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={`26px 0 0`}
                  >
                    1,000,000원
                  </Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Radio>Semi-Pro</Radio>
                <Radio>Pro</Radio>
              </Wrapper>
              <CommonButton
                width={`150px`}
                height={`48px`}
                fontSize={width < 900 ? `16px` : `18px`}
                fontWeight={`bold`}
                margin={`16px 0 0`}
                onClick={downToggle}
              >
                구매하기
              </CommonButton>
            </Wrapper>
          </Modal>

          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            width={`650px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={width < 900 ? `18px` : `28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                How to Use Artworks Community
              </Text>
              <Wrapper
                bgColor={Theme.subTheme_C}
                radius={`5px`}
                padding={`17px 10px`}
                margin={`0 0 30px`}
              >
                <Text>
                  Multu Track의 경우 새로운 창작물을 만들 때 그대로 사용하실 수
                  없습니다.
                </Text>
                <Text>
                  조금의 편집과 새로운 구성이 필요합니다. 아이디어를 발휘해
                  보세요!
                </Text>
                <Text color={Theme.red_C} fontWeight={`500`}>
                  모든 Track은 다른 사람에게 재 판매를 하거나 라이센스를 부여할
                  수 없습니다.
                </Text>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={width < 900 ? `100%` : `40%`}
                  dr={`row`}
                  ju={`space-between`}
                >
                  <Wrapper
                    width={width < 900 ? `75px` : `100px`}
                    height={width < 900 ? `75px` : `100px`}
                    radius={`100%`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={width < 900 ? `0` : `0 0 20px`}
                  >
                    <Text>Royalty</Text>
                    <Text>free</Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 900 ? `75px` : `100px`}
                    height={width < 900 ? `75px` : `100px`}
                    radius={`100%`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={width < 900 ? `0` : `0 0 20px`}
                  >
                    <Text>High</Text>
                    <Text>Quality</Text>
                    <Text>WAV</Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 900 ? `75px` : `100px`}
                    height={width < 900 ? `75px` : `100px`}
                    radius={`100%`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    <Text>무제한</Text>
                    <Text>스트림</Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 900 ? `75px` : `100px`}
                    height={width < 900 ? `75px` : `100px`}
                    radius={`100%`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    <Text>전체</Text>
                    <Text>상업</Text>
                    <Text>사용</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `45%`}
                  al={`flex-start`}
                  fontSize={`16px`}
                  margin={width < 900 && `20px 0 0`}
                >
                  <Text fontWeight={`bold`} color={Theme.basicTheme_C}>
                    독점
                  </Text>
                  <Text>모든 Royalty는 당신에게 귀속됩니다.</Text>
                  <Text>가장 먼저 획득하세요!</Text>
                  <Text
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={`40px 0 0`}
                  >
                    비독점
                  </Text>
                  <Text>총 10개까지만 구매 가능하며,</Text>
                  <Text>소진 시 삭제됩니다.</Text>
                  <Text>품절되기 전에 구매하세요!</Text>
                </Wrapper>
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
