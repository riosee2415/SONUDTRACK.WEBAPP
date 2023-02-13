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
  SpanText,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { Empty, Modal, Popover, Rate, Select } from "antd";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_DETAIL_REQUEST } from "../../../reducers/product";
import router, { useRouter } from "next/router";
import moment from "moment";
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

const Index = () => {
  ////// GLOBAL STATE //////
  const { productDetail } = useSelector((state) => state.product);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [down, setDown] = useState(false);

  const [rModal, setRModal] = useState(false);
  const [rData, setRData] = useState(null);

  const [allAudioTime, setAllAudioTime] = useState([]);

  const [sliceCnt, setSliceCnt] = useState(5);
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: PRODUCT_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (productDetail) {
      setTimeout(() => {
        let allAudioTimeArr = allAudioTime
          ? allAudioTime.map((data) => data)
          : [];

        for (let i = 0; i < productDetail.trackList.length; i++) {
          const trackId = document.getElementById(`audioTeg_${i}`);

          allAudioTimeArr.push(moment(trackId.duration * 1000).format("mm:ss"));
        }
        setAllAudioTime(allAudioTimeArr);
      }, 2000);
    }
  }, [productDetail]);

  ////// TOGGLE //////
  // 프리미엄일때 나오는 모달
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const playingToggle = useCallback(() => {
    setPlaying((prev) => !prev);
  }, [playing]);

  const downToggle = useCallback(() => {
    setDown((prev) => !prev);
  }, [down]);

  const rModalToggle = useCallback(
    (data) => {
      if (data) {
        setRData(data);
      } else {
        setRData(null);
      }
      setRModal((prev) => !prev);
    },
    [rModal]
  );

  ////// HANDLER //////

  const sliceCntHandler = useCallback(
    (cnt) => {
      setSliceCnt(cnt);
    },
    [sliceCnt]
  );

  ////// DATAVIEW //////

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
                    <Image
                      height={`100%`}
                      radius={`100%`}
                      src={productDetail && productDetail.coverImage}
                      alt="thumbnail"
                    />
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
                        15,000
                      </Text>
                    </Wrapper>
                    <Wrapper width={`65px`}>
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
                </Wrapper>
                <Wrapper
                  width={width < 800 ? `100%` : `calc(100% - 240px)`}
                  al={`flex-start`}
                  padding={width < 800 ? `20px 0 0` : `0 0 0 56px`}
                >
                  <Text fontSize={`30px`} fontWeight={`bold`}>
                    {productDetail && productDetail.title}
                  </Text>

                  <Wrapper dr={`row`} ju={`flex-start`} margin={`18px 0 30px`}>
                    {productDetail &&
                      productDetail.genList.length > 0 &&
                      productDetail.genList.map((data) => {
                        return (
                          <Wrapper
                            width={`auto`}
                            border={`1px solid ${Theme.lightGrey_C}`}
                            bgColor={Theme.white_C}
                            radius={`30px`}
                            height={`27px`}
                            padding={`0 15px`}
                            margin={`0 4px 0 0`}
                          >
                            {data.value}
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
                    Track :&nbsp;
                    {productDetail &&
                      productDetail.trackList &&
                      productDetail.trackList.length}
                    곡
                  </Text>
                  <Text color={Theme.grey_C} margin={`0 0 5px`}>
                    Audio Files Included : MP3, WAV
                  </Text>
                  <Text color={Theme.grey_C} margin={`0 0 5px`}>
                    Bit Rate : {productDetail && productDetail.bitRate}
                  </Text>
                  <Text color={Theme.grey_C}>
                    Sample Rate : {productDetail && productDetail.sampleRate}
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
              REQUESTED LIST
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              {productDetail &&
                productDetail.trackList &&
                (productDetail.trackList.length === 0 ? (
                  <Wrapper margin={`20px 0`}>
                    <Empty description="등록된 음원이 없습니다." />
                  </Wrapper>
                ) : (
                  productDetail.trackList
                    .slice(0, sliceCnt)
                    .map((data, idx) => {
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
                            preload="metadata"
                            id={`audioTeg_${idx}`}
                            src={data.filepath}
                            hidden
                          />
                          <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
                            <Image
                              alt="thumbnail"
                              src={data.thumbnail}
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
                                {data.title}
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
                            </Wrapper>
                          </Wrapper>
                          {width < 1520 ? null : (
                            <Wrapper
                              width={`auto`}
                              fontSize={`18px`}
                              color={Theme.grey2_C}
                            >
                              <Text width={`160px`} isEllipsis>
                                {productDetail &&
                                  productDetail.genList &&
                                  productDetail.genList.map((value, idx) => {
                                    return (
                                      value.value +
                                      (productDetail.genList.length === idx + 1
                                        ? ""
                                        : ",")
                                    );
                                  })}
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
                              {allAudioTime[0] && allAudioTime[0]}
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

                          {width < 900 ? (
                            <Wrapper
                              width={`auto`}
                              margin={`0`}
                              dr={`row`}
                              al={`flex-start`}
                              ju={`center`}
                            >
                              {!data.isOk && !data.isReject ? (
                                <CommonButton kindOf={`grey4`}>
                                  승인대기
                                </CommonButton>
                              ) : data.isOk ? (
                                <CommonButton>승인완료</CommonButton>
                              ) : (
                                data.isReject && (
                                  <CommonButton
                                    kindOf={`delete`}
                                    onClick={() => rModalToggle(data)}
                                  >
                                    거절사유
                                  </CommonButton>
                                )
                              )}
                            </Wrapper>
                          ) : (
                            <Wrapper
                              width={`auto`}
                              margin={`0`}
                              dr={`row`}
                              al={`flex-start`}
                              ju={`center`}
                            >
                              {!data.isOk && !data.isReject ? (
                                <CommonButton kindOf={`grey4`}>
                                  승인대기
                                </CommonButton>
                              ) : data.isOk ? (
                                <CommonButton>승인완료</CommonButton>
                              ) : (
                                data.isReject && (
                                  <CommonButton
                                    kindOf={`delete`}
                                    onClick={() => rModalToggle(data)}
                                  >
                                    거절사유
                                  </CommonButton>
                                )
                              )}
                            </Wrapper>
                          )}
                        </Wrapper>
                      );
                    })
                ))}
            </Wrapper>
            <Wrapper margin={`60px 0 100px`}>
              {productDetail &&
              productDetail.trackList &&
              productDetail.trackList.length > 5 ? (
                <CommonButton
                  kindOf={`grey`}
                  width={`150px`}
                  height={`48px`}
                  onClick={() =>
                    sliceCntHandler(
                      productDetail &&
                        productDetail.trackList &&
                        productDetail.trackList.length
                    )
                  }
                >
                  더보기 +
                </CommonButton>
              ) : (
                ""
              )}
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

          {/* REJECT MODAL */}

          <Modal
            visible={rModal}
            onCancel={() => rModalToggle(null)}
            footer={null}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                거절사유
              </Text>

              <Wrapper
                al={`flex-start`}
                ju={`flex-start`}
                padding={`10px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                radius={`5px`}
                minHeight={`200px`}
              >
                <Text fontSize={width < 900 ? `14px` : `16px`}>
                  {rData && rData.rejectContent}
                </Text>
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
