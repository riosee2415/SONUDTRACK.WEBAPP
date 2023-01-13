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
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Modal, Select } from "antd";
import dynamic from "next/dynamic";

const ReactWaves = dynamic(() => import("@dschoon/react-waves"), {
  ssr: false,
});

const CustomSelect = styled(Wrapper)`
  width: 240px;
  height: ${(props) => props.height || `54px`};
  border-radius: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

  .ant-select {
    width: 100%;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    width: 100%;
    height: ${(props) => props.height || `54px`};
    border-radius: 30px;
    border: none;
  }

  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    width: 100%;
    line-height: ${(props) => props.height || `54px`};
  }

  @media (max-width: 700px) {
    width: 160px;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const [playing, setPlaying] = useState(false);
  const [down, setDown] = useState(false);
  const [cart, setCart] = useState(false);
  const [contact, setContact] = useState(false);

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

  const contactToggle = useCallback(() => {
    setContact((prev) => !prev);
  }, [contact]);
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Musictem</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 40px`}>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/musictem.png`}
                width={`18px`}
                margin={`0 6px 0 0`}
              />
              <Text fontWeight={`500`} fontSize={width < 900 ? `25px` : `30px`}>
                Musictem
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`}>
              <Wrapper width={`auto`} al={`flex-start`}>
                <Text
                  fontSize={width < 900 ? `16px` : `20px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={`10px 0 16px`}
                >
                  Category
                </Text>
                <CustomSelect>
                  <Select>
                    <Select.Option>ALL</Select.Option>
                  </Select>
                </CustomSelect>
              </Wrapper>
              <Wrapper
                width={`auto`}
                al={`flex-start`}
                margin={width < 900 ? `10px 0` : `0 50px`}
              >
                <Text
                  fontSize={width < 900 ? `16px` : `20px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={`10px 0 16px`}
                >
                  Tag
                </Text>
                <Wrapper dr={`row`} width={`auto`}>
                  <CustomSelect margin={`0 14px 0 0`}>
                    <Select>
                      <Select.Option>ALL</Select.Option>
                    </Select>
                  </CustomSelect>
                  <CustomSelect>
                    <Select>
                      <Select.Option>ALL</Select.Option>
                    </Select>
                  </CustomSelect>
                </Wrapper>
              </Wrapper>
              <Wrapper width={width < 700 ? `100%` : `auto`} al={`flex-start`}>
                <Text
                  fontSize={width < 900 ? `16px` : `20px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={`10px 0 16px`}
                >
                  Search
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
                  />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-end`} margin={`18px 0 0`}>
              <Text
                fontSize={width < 900 ? `14px` : `16px`}
                color={Theme.darkGrey_C}
              >
                원하는 음악을 찾기가 어려우신가요?
              </Text>
              <CommonButton
                height={`35px`}
                radius={`30px`}
                margin={`0 0 0 15px`}
                onClick={contactToggle}
              >
                Music Director에 문의
              </CommonButton>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`2px 0 40px`}>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/new-icon.png`}
                width={`18px`}
                margin={`0 6px 0 0`}
              />
              <Text fontWeight={`500`} fontSize={width < 900 ? `25px` : `30px`}>
                New Artisttem
              </Text>
            </Wrapper>

            <Wrapper
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              margin={`0 0 100px`}
            >
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
                    fontSize={width < 900 ? `14px` : `16px`}
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

            <Wrapper dr={`row`} ju={`flex-start`} margin={`2px 0 40px`}>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/title_top5.png`}
                width={`18px`}
                margin={`0 6px 0 0`}
              />
              <Text fontWeight={`500`} fontSize={width < 900 ? `25px` : `30px`}>
                TOP5 Musictem
              </Text>
            </Wrapper>

            <Wrapper
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              margin={`0 0 100px`}
            >
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
                    fontSize={width < 900 ? `14px` : `16px`}
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

            <Wrapper margin={`60px 0 45px`}>
              <Text
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
              >
                How to Use Musictem
              </Text>
              <Text
                fontSize={width < 900 ? `14px` : `16px`}
                margin={`14px 0 50px`}
              >
                다양한 작품을 완성하는 음악, Musictem
              </Text>

              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={width < 700 ? `100%` : `32%`}
                  padding={`30px 10px`}
                  bgColor={Theme.subTheme_C}
                  radius={`7px`}
                >
                  <Text
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    Find
                  </Text>
                  <Wrapper
                    width={`103px`}
                    height={`103px`}
                    radius={`100%`}
                    bgColor={Theme.white_C}
                    margin={`14px 0 24px`}
                  >
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/icon_find.png`}
                      width={`48px`}
                    />
                  </Wrapper>
                  <Text fontSize={`18px`}>100% 로열티 무료입니다.</Text>
                  <Text fontSize={`18px`}>마음껏 다운로드하여</Text>
                  <Text fontSize={`18px`}>사용하세요!</Text>
                </Wrapper>
                <Wrapper
                  width={width < 700 ? `100%` : `32%`}
                  padding={`30px 10px`}
                  bgColor={Theme.subTheme_C}
                  radius={`7px`}
                  margin={width < 700 ? `20px 0` : `0`}
                >
                  <Text
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    Contact
                  </Text>
                  <Wrapper
                    width={`103px`}
                    height={`103px`}
                    radius={`100%`}
                    bgColor={Theme.white_C}
                    margin={`14px 0 24px`}
                  >
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/icon_contact.png`}
                      width={`48px`}
                    />
                  </Wrapper>
                  <Text fontSize={`18px`}>투명하고 안전하게</Text>
                  <Text fontSize={`18px`}>저작권을 보호하고</Text>
                  <Text fontSize={`18px`}>정산합니다!</Text>
                </Wrapper>
                <Wrapper
                  width={width < 700 ? `100%` : `32%`}
                  padding={`30px 10px`}
                  bgColor={Theme.subTheme_C}
                  radius={`7px`}
                >
                  <Text
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    Making up
                  </Text>
                  <Wrapper
                    width={`103px`}
                    height={`103px`}
                    radius={`100%`}
                    bgColor={Theme.white_C}
                    margin={`14px 0 24px`}
                  >
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/icon_making-up.png`}
                      width={`48px`}
                    />
                  </Wrapper>
                  <Text fontSize={`18px`}>한 번 구매한 음원은</Text>
                  <Text fontSize={`18px`}>영원히 재다운로드가</Text>
                  <Text fontSize={`18px`}>가능합니다!</Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
              <Text fontSize={`24px`} fontWeight={`bold`}>
                더보기
              </Text>
              <Wrapper
                dr={`row`}
                width={`auto`}
                fontSize={width < 900 ? `14px` : `16px`}
              >
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
                    fontSize={width < 900 ? `14px` : `16px`}
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

            <CustomPage />
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
              <Text fontSize={width < 900 ? `14px` : `16px`}>
                바로 구매하시겠습니까?
              </Text>
              <Text fontSize={width < 900 ? `14px` : `16px`}>
                1회 다운로드 되며, 결제 내역에서 확인할 수 있습니다.
              </Text>
              <Text fontSize={width < 900 ? `14px` : `16px`}>
                파일 유실 시 메일로 문의 바랍니다.
              </Text>

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
              <Text fontSize={width < 900 ? `14px` : `16px`}>
                장바구니에 추가되었습니다.
              </Text>
              <Text fontSize={width < 900 ? `14px` : `16px`}>
                계속 둘러보시겠어요?
              </Text>

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
          <Modal
            width={width < 700 ? `100%` : `680px`}
            onCancel={contactToggle}
            visible={contact}
            footer={null}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={width < 900 ? `22px` : `28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                Music Director에 문의하기
              </Text>
              <Wrapper
                bgColor={Theme.lightGrey2_C}
                padding={`30px 20px`}
                al={`flex-start`}
              >
                <Text
                  fontSize={width < 900 ? `16px` : `20px`}
                  fontWeight={`bold`}
                  margin={`0 0 12px`}
                >
                  찾으시는 음악이 없나요?
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  color={Theme.darkGrey_C}
                >
                  걱정하지 마세요! 찾는 음악의 레퍼런스만 첨부해 주시면 수많은
                  최고의 작곡가들이 당신이 원하는 음악을 만들어 업로드하게
                  될거예요!
                </Text>
                <Text
                  fontSize={width < 900 ? `16px` : `20px`}
                  fontWeight={`bold`}
                  margin={`30px 0 12px`}
                >
                  영상에 어울리는 선곡이 어려우신가요?
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  color={Theme.darkGrey_C}
                >
                  음악을 찾는게 버거우시다면 도움을 받아보세요.
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  color={Theme.darkGrey_C}
                >
                  스토리보드, 영상물 파일을 첨부하고 원하는 방향의 내용을 기재해
                  이메일로 전송해주세요. 해당 작품과 어울리는 음악을 New Wave
                  Sound의 Musictem에서 최상의 음악들로 선곡해드립니다.
                </Text>
                <Text
                  fontSize={width < 900 ? `16px` : `20px`}
                  fontWeight={`bold`}
                  margin={`30px 0 12px`}
                >
                  요청 메일 형식
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  color={Theme.darkGrey_C}
                >
                  요청자 ID :
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  color={Theme.darkGrey_C}
                >
                  요청 내용 :
                </Text>

                <Wrapper>
                  <CommonButton
                    width={`180px`}
                    height={`48px`}
                    margin={`30px 0 0`}
                    fontSize={width < 900 ? `16px` : `18px`}
                    fontWeight={`500`}
                  >
                    메일로 요청하기
                  </CommonButton>
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
