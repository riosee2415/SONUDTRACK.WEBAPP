import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  Text,
  TextArea,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import { BellOutlined, StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import { Modal, Popover, Rate, Select } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_ALBUM_DETAIL_REQUEST } from "../../../reducers/product";

const ReactWaves = dynamic(() => import("@dschoon/react-waves"), {
  ssr: false,
});

const CdWrapper = styled(Wrapper)`
  width: 180px;
  height: 180px;
  border-radius: 100%;
  position: relative;
  cursor: pointer;

  &:before {
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

    transform: translate(-50%, -50%);
  }

  &:hover .playicon {
    opacity: 1;
    visibility: visible;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { productAlbumList, productTrackList } = useSelector(
    (state) => state.product
  );
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [down, setDown] = useState(false);
  ////// REDUX //////
  ////// USEEFFECT //////

  console.log(productAlbumList);
  console.log(productTrackList);

  useEffect(() => {
    dispatch({
      type: PRODUCT_ALBUM_DETAIL_REQUEST,
      data: {
        id: router.query.id,
        orderType: 1,
      },
    });
  }, [router.qeury]);

  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const playingToggle = useCallback(() => {
    setPlaying((prev) => !prev);
  }, [playing]);

  const downToggle = useCallback(() => {
    setDown((prev) => !prev);
  }, [down]);

  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  ////// DATAVIEW //////

  const albums = [
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      name: "이차미",
      likeCnt: "90",
    },
  ];

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Artist</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              al={`flex-start`}
              margin={`50px 0`}
            >
              <Wrapper
                width={width < 800 ? `100%` : `254px`}
                shadow={`3px 3px 10px rgba(0, 0, 0, 0.1)`}
                radius={`12px`}
              >
                <Wrapper dr={`row`} margin={`21px 0 12px`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/musictem_b.png`}
                    width={`18px`}
                    margin={`0 6px 0 0`}
                  />
                  <Text fontWeight={`bold`} fontSize={`16px`}>
                    Musictem
                  </Text>
                </Wrapper>
                <Image
                  width={`180px`}
                  height={`180px`}
                  radius={`100%`}
                  margin={`0 0 20px`}
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png"
                  alt="thumbnail"
                />
                <Wrapper bgColor={Theme.lightGrey2_C} padding={`20px 0`}>
                  <Text
                    fontSize={`26px`}
                    fontWeight={`bold`}
                    color={Theme.darkGrey_C}
                  >
                    이차미
                  </Text>
                  <Wrapper
                    dr={`row`}
                    width={`auto`}
                    color={Theme.subTheme3_C}
                    fontSize={`16px`}
                    margin={`6px 0 0`}
                  >
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <Text
                      color={Theme.darkGrey_C}
                      fontSize={`14px`}
                      margin={`0 0 0 5px`}
                    >
                      (00명)
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={width < 800 ? `100%` : `calc(100% - 254px)`}
                al={`flex-start`}
                padding={width < 800 ? `20px 0 0` : `0 0 0 56px`}
              >
                <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 20px`}>
                  <Text
                    fontSize={`24px`}
                    fontWeight={`bold`}
                    margin={`0 20px 0 0`}
                  >
                    Albums
                  </Text>
                  <Select style={{ width: 138 }} placeholder="---선택---">
                    <Select.Option>관련높은순</Select.Option>
                  </Select>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  overflow={`auto`}
                  wrap={`nowrap`}
                  al={`flex-start`}
                  ju={`flex-start`}
                  padding={`0 0 10px`}
                >
                  {albums.map((data) => {
                    return (
                      <Wrapper
                        key={data.id}
                        width={`180px`}
                        margin={`0 34px 0 0`}
                        onClick={() => movelinkHandler(`/album/1`)}
                      >
                        <CdWrapper>
                          <Image
                            height={`100%`}
                            radius={`100%`}
                            src={data.img}
                            alt="thumbnail"
                          />
                          <Image
                            className="playicon"
                            width={`21px`}
                            src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png"
                            alt="play icon"
                          />
                        </CdWrapper>
                        <Text
                          fontSize={`18px`}
                          color={Theme.darkGrey_C}
                          margin={`20px 0 8px`}
                        >
                          {data.name}
                        </Text>
                        <Wrapper dr={`row`}>
                          <Image
                            alt="icon"
                            width={`18px`}
                            margin={`0 6px 0 0`}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                          />
                          <Text fontSize={`12px`} color={Theme.grey_C}>
                            {data.likeCnt}
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    );
                  })}
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`60px 0 30px`}>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/musictem.png`}
                width={`18px`}
                margin={`0 6px 0 0`}
              />
              <Text
                fontWeight={`bold`}
                fontSize={width < 900 ? `25px` : `30px`}
              >
                BEST Musictem
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
                    onClick={() => movelinkHandler(`/album/1`)}
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
                      onClick={() => movelinkHandler(`/musictem/artist/1`)}
                      isHover
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

            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `25px` : `32px`}
              fontWeight={`bold`}
              margin={`0 0 30px`}
            >
              리뷰(00)
            </Wrapper>
            <Wrapper
              bgColor={Theme.lightGrey2_C}
              padding={width < 900 ? `20px 10px` : `30px`}
              margin={`0 0 30px`}
            >
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Image
                  alt="thumbnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png`}
                  width={`36px`}
                  height={`36px`}
                  radius={`100%`}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={`0 0 0 8px`}
                >
                  작성자 : 게스트
                </Text>
              </Wrapper>
              <TextArea
                width={`100%`}
                height={`100px`}
                radius={`10px`}
                margin={`12px 0 15px`}
                maxLength={400}
                placeholder="이 아티스트 어때요? 한 마디 남겨주세요 :)"
              />
              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper dr={`row`} width={`auto`}>
                  <Rate />
                </Wrapper>
                <CommonButton
                  width={`100px`}
                  height={`40px`}
                  radius={`7px`}
                  fontSize={`18px`}
                  fontWeight={`600`}
                >
                  등록
                </CommonButton>
              </Wrapper>
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              <Wrapper
                padding={width < 900 ? `20px 10px` : `30px`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
                    <Image
                      alt="thumbnail"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png`}
                      width={`36px`}
                      height={`36px`}
                      radius={`100%`}
                    />
                    <Text
                      fontSize={`16px`}
                      color={Theme.grey_C}
                      margin={`0 0 0 8px`}
                    >
                      닉네임A • 2022.08.05 21:17 <BellOutlined />
                    </Text>
                  </Wrapper>
                  <Popover
                    placement="bottom"
                    content={
                      <Wrapper padding={`0 10px`}>
                        <Wrapper
                          cursor={`pointer`}
                          width={width < 900 ? `50px` : `auto`}
                          dr={`row`}
                          margin={`0 0 10px`}
                        >
                          <Image
                            alt="icon"
                            width={`12px`}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/edit.png`}
                          />
                          <Text
                            isHover
                            color={Theme.grey_C}
                            margin={`0 0 0 5px`}
                          >
                            수정
                          </Text>
                        </Wrapper>
                        <Wrapper
                          cursor={`pointer`}
                          width={width < 900 ? `50px` : `auto`}
                          dr={`row`}
                          onClick={modalToggle}
                        >
                          <Image
                            alt="icon"
                            width={`12px`}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/delete.png`}
                          />
                          <Text
                            isHover
                            color={Theme.grey_C}
                            margin={`0 0 0 5px`}
                          >
                            삭제
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    }
                  >
                    <Image
                      cursor={`pointer`}
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/....png`}
                      width={`18px`}
                    />
                  </Popover>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  color={Theme.subTheme3_C}
                  fontSize={`16px`}
                  padding={`8px 0 12px 46px`}
                >
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                </Wrapper>
                <Wrapper
                  padding={`0 0 0 46px`}
                  dr={`row`}
                  ju={`space-between`}
                  al={`flex-end`}
                >
                  <Text width={`calc(100% - 36px)`}>
                    잔잔한 노래에 딱 맞는 곡이예요! 추천드립니다 ㅎㅎ 잔잔한
                    노래에 딱 맞는 곡이예요! 추천드립니다 ㅎㅎ
                  </Text>
                  <Wrapper width={`auto`} dr={`row`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                      width={`14px`}
                      margin={`0 4px 0 0`}
                    />
                    <Text color={Theme.darkGrey_C}>98</Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper margin={`60px 0 100px`}>
              <CommonButton kindOf={`grey`} width={`150px`} height={`48px`}>
                더보기 +
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          <Modal onCancel={modalToggle} visible={isModal} footer={null}>
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                댓글 삭제
              </Text>
              <Text fontSize={`16px`}>댓글을 삭제하시겠습니까?</Text>
              <Text fontSize={`16px`}>
                삭제 이후 내용은 되돌릴 수 없습니다.
              </Text>

              <Wrapper dr={`row`} margin={`30px 0 0`}>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme`}
                  margin={`0 4px 0 0`}
                  onClick={modalToggle}
                >
                  취소
                </CommonButton>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={`0 0 0 4px`}
                >
                  삭제하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
