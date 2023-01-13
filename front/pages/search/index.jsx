import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  ArtWrapper,
  CommonButton,
  CustomPage,
  Image,
  RsWrapper,
  SquareBox,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { SearchOutlined, StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Modal, Select } from "antd";

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
        <title>NEW WAVE Sound | search</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              height={width < 900 ? `300px` : `400px`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/search.png")`}
              radius={`14px`}
              overflow={`hidden`}
              shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
              margin={`0 0 30px`}
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
                  Search
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                  margin={`0 0 28px`}
                >
                  다양한 뮤지션을 고용해서 멋진 음악을 완성하세요.
                </Text>
                <Wrapper width={width < 700 ? `90%` : `500px`}>
                  <Wrapper
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
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`15px 0 0`}>
                    <Text margin={`0 15px 0 0`}>#상큼발랄</Text>
                    <Text margin={`0 15px 0 0`}>#상큼발랄</Text>
                    <Text margin={`0 15px 0 0`}>#상큼발랄</Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`}>
              <Wrapper width={`auto`} al={`flex-start`} margin={`0 50px 0 0`}>
                <Text
                  fontSize={`20px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={`0 0 16px`}
                >
                  Category
                </Text>
                <CustomSelect>
                  <Select>
                    <Select.Option>ALL</Select.Option>
                  </Select>
                </CustomSelect>
              </Wrapper>
              <Wrapper width={`auto`} al={`flex-start`}>
                <Text
                  fontSize={`20px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={width < 700 ? `16px 0` : `0 0 16px`}
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
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`70px 0 40px`}>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/artisttem.png`}
                width={`18px`}
                margin={`0 6px 0 0`}
              />
              <Text fontWeight={`500`} fontSize={width < 900 ? `25px` : `30px`}>
                Artisttem
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              <ArtWrapper>
                <SquareBox>
                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png"
                    alt="thumbnail"
                  />
                </SquareBox>
                <Text
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`20px 0 7px`}
                >
                  이차미
                </Text>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Wrapper
                    width={`auto`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    radius={`30px`}
                    height={`27px`}
                    padding={`0 15px`}
                    margin={`0 7px 5px 0`}
                  >
                    Vocal
                  </Wrapper>
                  <Wrapper
                    width={`auto`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    radius={`30px`}
                    height={`27px`}
                    padding={`0 15px`}
                    margin={`0 7px 5px 0`}
                  >
                    Beat Maker
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 0`}>
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
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                    />
                    <Text fontSize={`14px`} color={Theme.grey_C}>
                      98
                    </Text>
                  </Wrapper>
                </Wrapper>
              </ArtWrapper>
            </Wrapper>
            <CustomPage />

            <Wrapper al={`flex-start`} margin={`80px 0 40px`}>
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
              <CustomPage />
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
