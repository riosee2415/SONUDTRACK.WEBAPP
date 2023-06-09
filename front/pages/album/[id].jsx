import React, { useCallback, useEffect, useState } from "react";
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
import styled from "styled-components";
import { Modal, Popover, Rate, Select } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { PRODUCT_ALBUM_DETAIL_REQUEST } from "../../reducers/product";
import { ALBUM_DETAIL_REQUEST } from "../../reducers/album";
const ReactWaves = dynamic(() => import("@dschoon/react-waves"), {
  ssr: false,
});

const CdWrapper = styled(Wrapper)`
  width: 240px;
  height: 240px;
  border-radius: 100%;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    width: 80px;
    height: 80px;
    background: ${Theme.white_C};
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const AlbumWrapper = styled(Wrapper)`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    width: 60px;
    height: 60px;
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

  @media (max-width: 900px) {
    width: 150px;
    height: 150px;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////

  const { trackdetail } = useSelector((state) => state.product);
  const { albumDetail, albumTrack, albumCate, albumTag } = useSelector(
    (state) => state.album
  );

  console.log(albumDetail);
  console.log(albumTrack);
  console.log(albumCate);
  console.log(albumTag);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [down, setDown] = useState(false);
  const [newAudioTime, setNewAudioTime] = useState([]);
  const [moreType, setMoreType] = useState(5);
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: ALBUM_DETAIL_REQUEST,
        data: {
          AlbumId: router.query.id,
        },
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (albumDetail && albumDetail.trackList) {
      setTimeout(() => {
        let allAudioTimeArr = newAudioTime
          ? newAudioTime.map((data) => data)
          : [];

        for (let i = 0; i < albumDetail.trackList.length; i++) {
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
  }, [albumDetail]);

  ////// TOGGLE //////
  // 프리미엄일때 나오는 모달
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const downToggle = useCallback(() => {
    setDown((prev) => !prev);
  }, [down]);

  // 재생 버튼
  const playingToggle = useCallback(
    (id) => {
      if (playing && playing === id) {
        setPlaying(null);
      } else {
        setPlaying(id);
      }
    },
    [playing]
  );

  const movelinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const moreTypeChangeHandler = useCallback((data) => {
    setMoreType(data);
  }, []);

  ////// HANDLER //////
  ////// DATAVIEW //////
  const albums = [
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      title: "Star Night",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      title: "Star Night",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      title: "Star Night",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      title: "Star Night",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      title: "Star Night",
      name: "이차미",
      likeCnt: "90",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      title: "Star Night",
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
          <Wrapper
            bgColor={Theme.lightGrey2_C}
            margin={`-84px 0 0`}
            padding={`84px 0`}
          >
            <RsWrapper>
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Wrapper width={width < 800 ? `100%` : `240px`}>
                  <CdWrapper>
                    {albumDetail && (
                      <Image
                        height={`100%`}
                        radius={`100%`}
                        src={albumDetail.albumImage}
                        alt="thumbnail"
                      />
                    )}
                    {/* 프리미엄일때 나타나는 아이콘*/}
                    {albumDetail && albumDetail.isPremium === 1 && (
                      <Popover
                        placement="bottom"
                        content={
                          <Wrapper>
                            <Text color={Theme.grey_C}>
                              간단한 템포, 길이 등의 편집
                            </Text>
                            <Text color={Theme.grey_C}>이 가능합니다.</Text>
                          </Wrapper>
                        }
                      >
                        <Image
                          width={`56px`}
                          position={`absolute`}
                          top={`10px`}
                          right={`10px`}
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/premium.png"
                        />
                      </Popover>
                    )}
                  </CdWrapper>
                  <Wrapper
                    width={`auto`}
                    dr={`row`}
                    al={`flex-start`}
                    ju={`center`}
                    margin={`24px 0 0`}
                  >
                    <Wrapper width={`65px`} cursor={`pointer`}>
                      <Image
                        alt="icon"
                        width={`22px`}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                      />
                      <Text fontSize={`12px`} color={Theme.grey_C}>
                        55
                      </Text>
                    </Wrapper>
                    <Wrapper width={`65px`} cursor={`pointer`}>
                      <Popover content={<Text>앨범 내 전 곡 구매</Text>}>
                        <Image
                          alt="icon"
                          width={`22px`}
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/cart.png`}
                        />
                      </Popover>
                    </Wrapper>
                    <Wrapper width={`65px`}>
                      <Image
                        alt="icon"
                        width={`22px`}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                      />
                      <Text fontSize={`12px`} color={Theme.grey_C}>
                        121
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  width={width < 800 ? `100%` : `calc(100% - 240px)`}
                  al={`flex-start`}
                  padding={width < 800 ? `20px 0 0` : `0 0 0 56px`}
                >
                  <Text fontSize={`30px`} fontWeight={`bold`}>
                    {albumDetail && albumDetail.fileName}
                  </Text>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={`16px`}
                    margin={`18px 0 12px`}
                  >
                    <SpanText color={Theme.grey_C}>Album by</SpanText>
                    <Text margin={`0 0 0 6px`} td={`underline`}>
                      {albumDetail && albumDetail.artistName}
                    </Text>
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
                    {albumTag &&
                      albumTag.map((data) => {
                        return (
                          <Wrapper
                            key={data.id}
                            width={`auto`}
                            border={`1px solid ${Theme.lightGrey_C}`}
                            bgColor={Theme.white_C}
                            radius={`30px`}
                            height={`27px`}
                            padding={`0 15px`}
                            margin={`0 4px 0 0`}
                          >
                            {data.tagValue}
                          </Wrapper>
                        );
                      })}
                  </Wrapper>
                  <Text
                    color={Theme.grey2_C}
                    fontWeight={`bold`}
                    margin={`0 0 20px`}
                  >
                    Information
                  </Text>
                  <Text color={Theme.grey_C} margin={`0 0 5px`}>
                    Track : {albumTrack && albumTrack.length}곡
                  </Text>
                  <Text color={Theme.grey_C} margin={`0 0 5px`}>
                    Audio Files Included : MP3, WAV
                  </Text>
                  <Text color={Theme.grey_C} margin={`0 0 5px`}>
                    Bit Rate : {albumDetail && albumDetail.bitRate}
                  </Text>
                  <Text color={Theme.grey_C}>
                    Sample Rate : {albumDetail && albumDetail.sampleRate}
                  </Text>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
          <RsWrapper>
            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `25px` : `32px`}
              fontWeight={`bold`}
              margin={`60px 0 30px`}
            >
              Song List
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              {albumTrack &&
                (albumTrack.length === 0 ? (
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
                  albumTrack.slice(0, moreType).map((data, idx) => {
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
                          {playing === data.num ? (
                            <Image
                              alt="pause icon"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/pause_purple.png`}
                              width={width < 700 ? `20px` : `24px`}
                              margin={width < 700 ? `0 15px` : `0 30px`}
                              onClick={() => playingToggle(data.num)}
                              cursor={`pointer`}
                            />
                          ) : (
                            <Image
                              alt="play icon"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png`}
                              width={width < 700 ? `20px` : `24px`}
                              margin={width < 700 ? `0 15px` : `0 30px`}
                              onClick={() => playingToggle(data.num)}
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
                                  `/musictem/artist/${
                                    albumDetail && albumDetail.MusictemId
                                  }`
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
                                {albumTag &&
                                  albumTag.map(
                                    (value, idx) =>
                                      value.tagValue +
                                      (albumTag && albumTag.length === idx + 1
                                        ? ""
                                        : ",")
                                  )}
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
                                    1351
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
                                    123
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
                              {albumTag &&
                                albumTag.map(
                                  (value, idx) =>
                                    value.tagValue +
                                    (albumTag && albumTag.length === idx + 1
                                      ? ""
                                      : ",")
                                )}
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
                            {newAudioTime[idx]}
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
                              playing={playing === data.num}
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
                                1234
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
                                124
                              </Text>
                            </Wrapper>
                          </Wrapper>
                        )}
                      </Wrapper>
                    );
                  })
                ))}
            </Wrapper>
            <Wrapper margin={`60px 0 100px`}>
              {albumTrack && albumTrack.length > moreType && (
                <CommonButton
                  kindOf={`grey`}
                  width={`150px`}
                  height={`48px`}
                  onClick={() => moreTypeChangeHandler(albumTrack.length)}
                >
                  더보기 +
                </CommonButton>
              )}
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `25px` : `32px`}
              fontWeight={`bold`}
              margin={`0 0 30px`}
            >
              Similar Albums
            </Wrapper>

            <Wrapper
              dr={`row`}
              overflow={`auto`}
              wrap={`nowrap`}
              al={`flex-start`}
              ju={`flex-start`}
              padding={`0 0 10px`}
              margin={`0 0 120px`}
            >
              {trackdetail &&
                (trackdetail.similarList.length === 0 ? (
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
                  trackdetail.similarList.map((data) => {
                    return (
                      <Wrapper
                        key={data.id}
                        width={width < 900 ? `150px` : `200px`}
                        margin={width < 900 ? `0 20px 0 0` : `0 44px 0 0`}
                        onClick={() => movelinkHandler(`/album/${data.id}`)}
                      >
                        <AlbumWrapper>
                          <Image
                            height={`100%`}
                            radius={`100%`}
                            src={data.coverImage}
                            alt="thumbnail"
                          />
                          <Image
                            className="playicon"
                            width={`21px`}
                            src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png"
                            alt="play icon"
                          />
                        </AlbumWrapper>
                        <Text
                          fontSize={`20px`}
                          fontWeight={`bold`}
                          color={Theme.darkGrey_C}
                          margin={`20px 0 4px`}
                        >
                          {data.title}
                        </Text>
                        <Text fontSize={`16px`} color={Theme.subTheme4_C}>
                          {data.nickname}
                        </Text>
                        <Wrapper
                          width={`auto`}
                          dr={`row`}
                          al={`flex-start`}
                          ju={`center`}
                          margin={`20px 0 0`}
                        >
                          <Wrapper
                            width={width < 900 ? `50px` : `65px`}
                            cursor={`pointer`}
                          >
                            <Image
                              alt="icon"
                              width={`22px`}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                            />
                            <Text fontSize={`12px`} color={Theme.grey_C}>
                              {data.downloadCnt}
                            </Text>
                          </Wrapper>
                          <Wrapper
                            width={width < 900 ? `50px` : `65px`}
                            cursor={`pointer`}
                          >
                            <Image
                              alt="icon"
                              width={`22px`}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/cart.png`}
                            />
                          </Wrapper>
                          <Wrapper width={width < 900 ? `50px` : `65px`}>
                            <Image
                              alt="icon"
                              width={`22px`}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                            />
                            <Text fontSize={`12px`} color={Theme.grey_C}>
                              {data.likeCnt}
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                ))}
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

          {/* 프리미엄일때 나오는 모달 */}
          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            width={`680px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                프리미엄 이용 안내
              </Text>

              <Wrapper
                bgColor={Theme.lightGrey2_C}
                padding={`30px 20px`}
                al={`flex-start`}
              >
                <Text fontSize={`20px`} fontWeight={`bold`} margin={`0 0 12px`}>
                  Guide
                </Text>
                <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                  프리미엄 서비스 이용 시 간단한 템포, 길이 등의 편집이
                  가능합니다.
                </Text>
                <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                  요청사항은 요청일 기준 3일~7일 정도 소요됩니다.
                </Text>
                <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                  레퍼런스 파일을 함께 첨부해주면 좀 더 정확한 편집이
                  가능합니다.
                </Text>
                <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                  수정은 구매일 기준 한 달 동안 무제한으로 가능합니다.
                </Text>
                <Text
                  fontSize={`20px`}
                  fontWeight={`bold`}
                  margin={`30px 0 12px`}
                >
                  요청 메일 형식
                </Text>
                <Text>요청자 ID :</Text>
                <Text>곡 제목 :</Text>
                <Text>요청 내용 :</Text>
                <Text>
                  - 현재 BPM에서 30초 ~ 1분 30초 구간을 삭제하고 자연스럽게
                  이어주세요.
                </Text>
                <Text>- 구간 삭제 편집 후 BPM을 125로 늘려주세요.</Text>
                <Wrapper margin={`30px 0 0`}>
                  <CommonButton
                    width={`180px`}
                    height={`48px`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
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
