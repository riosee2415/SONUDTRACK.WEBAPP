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
  CustomPage,
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { message, Modal, Popover } from "antd";
import dynamic from "next/dynamic";
import { BOUGHT_LIST_REQUEST } from "../../reducers/bought";
import moment from "moment";

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

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { boughtList, lastPage } = useSelector((state) => state.bought);

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [playing, setPlaying] = useState(null);
  const [premium, setPremium] = useState(false);
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
      type: BOUGHT_LIST_REQUEST,
      data: {
        page: currentPage,
      },
    });
  }, [currentPage]);

  ////// TOGGLE //////
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

  const premiumToggle = useCallback(() => {
    setPremium((prev) => !prev);
  }, [premium]);

  ////// HANDLER //////
  // 페이지네이션
  const pageChangeHandler = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

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
        <title>NEW WAVE Sound | 구매내역</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `20px` : `30px`}
              fontWeight={`bold`}
              margin={`0 0 30px`}
            >
              구매 내역
            </Wrapper>
            {/* <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `18px` : `24px`}
              margin={`0 0 40px`}
            >
              구매 앨범 List
            </Wrapper>

            <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
              {albums.map((data) => {
                return (
                  <Box key={data.id}>
                    <CdWrapper>
                      <Image
                        position={`absolute`}
                        top={`0`}
                        left={`0`}
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

                      <Wrapper
                        position={`absolute`}
                        bottom={`0`}
                        right={`0`}
                        width={`40px`}
                        height={`40px`}
                        radius={`100%`}
                        bgColor={`rgba(0, 0, 0, 0.6)`}
                        color={Theme.white_C}
                        fontSize={`20px`}
                        zIndex={`10`}
                      >
                        <DownloadOutlined />
                      </Wrapper>
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
                  </Box>
                );
              })}
            </Wrapper> */}

            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `18px` : `24px`}
              margin={`80px 0 30px`}
            >
              구매 곡 List
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.lightGrey_C}`}>
              {boughtList && boughtList.length === 0 ? (
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
                    구매 내역이 존재하지 않습니다.
                  </Text>
                </Wrapper>
              ) : (
                boughtList &&
                boughtList.map((data, idx) => {
                  const now = moment();

                  const addDate = moment(data.viewCreatedAt)
                    .add(30, "day")
                    .format("YYYY-MM-DD HH:mm:ss");

                  const vDay = Math.floor(
                    Math.abs(moment.duration(now.diff(addDate)).asDays())
                  );
                  const vHour = Math.abs(
                    moment.duration(now.diff(addDate)).hours()
                  );
                  const vMin = Math.abs(
                    moment.duration(now.diff(addDate)).minutes()
                  );
                  const vSec = Math.abs(
                    moment.duration(now.diff(addDate)).seconds()
                  );

                  return (
                    <Wrapper
                      key={data.id}
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
                        src={data.songFile}
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
                        />
                        {playing === data.id ? (
                          <Image
                            alt="pause icon"
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/pause_purple.png`}
                            width={width < 700 ? `20px` : `24px`}
                            margin={width < 700 ? `0 15px` : `0 30px`}
                            onClick={() => playingToggle(data.id)}
                            cursor={`pointer`}
                          />
                        ) : (
                          <Image
                            alt="play icon"
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png`}
                            width={width < 700 ? `20px` : `24px`}
                            margin={width < 700 ? `0 15px` : `0 30px`}
                            onClick={() => playingToggle(data.id)}
                            cursor={`pointer`}
                          />
                        )}

                        <Wrapper width={`auto`} al={`flex-start`}>
                          <Text
                            fontSize={width < 700 ? `18px` : `22px`}
                            color={Theme.darkGrey_C}
                            margin={width < 700 ? `0` : `0 0 8px`}
                            width={width < 1600 ? `200px` : `230px`}
                            isEllipsis
                          >
                            {data.songName}
                          </Text>
                          <Text
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
                              <CommonButton
                                height={`37px`}
                                kindOf={`subTheme2`}
                                fontSize={width < 900 ? `16px` : `18px`}
                                fontWeight={`bold`}
                              >
                                {data.lisenceName}
                              </CommonButton>
                              <Wrapper
                                width={`50px`}
                                cursor={`pointer`}
                                onClick={premiumToggle}
                              >
                                <Image
                                  alt="icon"
                                  width={`22px`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/premium_mypage.png`}
                                />
                                <Text
                                  fontSize={`12px`}
                                  color={Theme.grey_C}
                                  margin={`4px 0 0`}
                                >
                                  프리미엄
                                </Text>
                              </Wrapper>
                              <Wrapper width={`50px`} cursor={`pointer`}>
                                <Image
                                  alt="icon"
                                  width={`22px`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                                />
                                <Text
                                  fontSize={`12px`}
                                  color={Theme.grey_C}
                                  margin={`4px 0 0`}
                                >
                                  {data.viewDownLoadCnt}
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
                          {/* {data.genList.map(
                                  (value, idx) =>
                                    value.value +
                                    (data.genList.length === idx + 1 ? "" : ",")
                                )} */}
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
                          {data.fileLength}
                        </Text>
                        <Wrapper width={width < 1360 ? `120px` : `236px`}>
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
                            playing={playing === data.id}
                            audioFile={data.songFile}
                          />
                        </Wrapper>
                      </Wrapper>
                      {width < 900 ? null : (
                        <>
                          <CommonButton
                            height={`37px`}
                            kindOf={`subTheme2`}
                            fontSize={`18px`}
                            fontWeight={`bold`}
                          >
                            {data.lisenceName}
                          </CommonButton>

                          <Wrapper
                            width={`auto`}
                            margin={`0`}
                            dr={`row`}
                            al={`flex-start`}
                            ju={`center`}
                          >
                            <Wrapper
                              width={`56px`}
                              cursor={`pointer`}
                              onClick={premiumToggle}
                            >
                              <Image
                                alt="icon"
                                width={`22px`}
                                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/premium_mypage.png`}
                              />
                              <Text
                                fontSize={`12px`}
                                color={Theme.grey_C}
                                margin={`4px 0 0`}
                              >
                                프리미엄
                              </Text>
                            </Wrapper>
                            <Popover
                              placement="bottom"
                              content={
                                <Wrapper al={`flex-start`}>
                                  <Text
                                    fontSize={`12px`}
                                    fontWeight={`bold`}
                                    color={Theme.grey2_C}
                                  >
                                    잔여기간
                                  </Text>
                                  <Text>
                                    {vDay}일 {vHour}시 {vMin}분 {vSec}초 남음
                                  </Text>
                                </Wrapper>
                              }
                            >
                              <Wrapper width={`56px`} cursor={`pointer`}>
                                <Image
                                  alt="icon"
                                  width={`22px`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                                />
                                <Text
                                  fontSize={`12px`}
                                  color={Theme.grey_C}
                                  margin={`4px 0 0`}
                                >
                                  {data.viewDownLoadCnt}
                                </Text>
                              </Wrapper>
                            </Popover>
                          </Wrapper>
                        </>
                      )}
                    </Wrapper>
                  );
                })
              )}
            </Wrapper>

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={lastPage * 10}
              pageSize={10}
              onChange={(page) => pageChangeHandler(page)}
            />
          </RsWrapper>

          <Modal
            visible={premium}
            onCancel={premiumToggle}
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
