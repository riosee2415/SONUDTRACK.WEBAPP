import React, { useCallback, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  ATag,
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
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Empty, message } from "antd";
import { useState } from "react";
import { MY_FILMO_REQUEST } from "../../reducers/seller";

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
  const { userBuyList } = useSelector((state) => state.buy);
  const { myFilmo } = useSelector((state) => state.seller);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [currnetTab, setCurrentTab] = useState(0);
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
  ////// HANDLER //////

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 마이페이지</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          {me && me.type === 1 ? (
            <RsWrapper>
              <Wrapper
                height={`260px`}
                bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/my-page.png")`}
                radius={`14px`}
                overflow={`hidden`}
                position={`relative`}
                shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
                color={Theme.white_C}
              >
                <Wrapper height={`100%`} bgColor={`rgba(0, 0, 0, 0.4)`}>
                  <Text
                    fontSize={width < 900 ? `25px` : `32px`}
                    fontWeight={`500`}
                    margin={`0 0 16px`}
                  >
                    MY PAGE
                  </Text>
                  <Text
                    fontSize={width < 900 ? `14px` : `16px`}
                    lineHeight={`26px`}
                    textAlign={`center`}
                  >
                    뉴웨이브사운드에 오신 걸 환영합니다.
                  </Text>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `20px` : `30px`}
                fontWeight={`bold`}
                margin={`50px 0 30px`}
              >
                최근 구매 내역
              </Wrapper>

              <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
                {userBuyList && userBuyList.length === 0 ? (
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
                      구매한 음원이 존재하지 않습니다.
                    </Text>
                  </Wrapper>
                ) : (
                  userBuyList &&
                  userBuyList.map((data) => {
                    return (
                      <Box key={data.num}>
                        <CdWrapper>
                          <Image
                            position={`absolute`}
                            top={`0`}
                            left={`0`}
                            height={`100%`}
                            radius={`100%`}
                            src={
                              data.artisTemCoverImage
                                ? data.artisTemCoverImage
                                : data.musicTemThumbnail
                            }
                            alt="thumbnail"
                          />
                          <Image
                            className="playicon"
                            width={`21px`}
                            src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png"
                            alt="play icon"
                          />

                          <ATag
                            href={
                              data.buyType === "artisTem"
                                ? data.artisTemFilepath
                                : data.musicTemFilepath
                            }
                            download
                            width={`auto`}
                          >
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
                          </ATag>
                        </CdWrapper>
                        <Text
                          fontSize={`18px`}
                          color={Theme.darkGrey_C}
                          margin={`20px 0 8px`}
                        >
                          {data.artisTemTitle
                            ? data.artisTemTitle
                            : data.musicTemTitle}
                        </Text>
                        <Wrapper dr={`row`}>
                          {data.buyType === "artisTem" &&
                            (data.artisTemIsLike ? (
                              <Image
                                alt="icon"
                                width={`18px`}
                                margin={`0 6px 0 0`}
                                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                              />
                            ) : (
                              <Image
                                alt="icon"
                                width={`18px`}
                                margin={`0 6px 0 0`}
                                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                              />
                            ))}
                          {data.buyType === "musicTem" &&
                            (data.musicTemIsLike ? (
                              <Image
                                alt="icon"
                                width={`18px`}
                                margin={`0 6px 0 0`}
                                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                              />
                            ) : (
                              <Image
                                alt="icon"
                                width={`18px`}
                                margin={`0 6px 0 0`}
                                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                              />
                            ))}
                          <Text fontSize={`12px`} color={Theme.grey_C}>
                            {data.buyType === "artisTem"
                              ? data.artisTemLikeCnt
                              : data.musicTemLikeCnt}
                          </Text>
                        </Wrapper>
                      </Box>
                    );
                  })
                )}
              </Wrapper>
            </RsWrapper>
          ) : (
            <RsWrapper>
              <Wrapper
                height={`260px`}
                bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/my-page_seller.png")`}
                radius={`14px`}
                overflow={`hidden`}
                position={`relative`}
                shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
                color={Theme.white_C}
              >
                <Wrapper height={`100%`} bgColor={`rgba(0, 0, 0, 0.4)`}>
                  <Text
                    fontSize={width < 900 ? `25px` : `32px`}
                    fontWeight={`500`}
                    margin={`0 0 16px`}
                  >
                    판매자 마이페이지
                  </Text>
                  <Text
                    fontSize={width < 900 ? `14px` : `16px`}
                    lineHeight={`26px`}
                    textAlign={`center`}
                  >
                    뉴웨이브사운드에 오신 걸 환영합니다.
                  </Text>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `20px` : `30px`}
                fontWeight={`bold`}
                margin={`50px 0 30px`}
              >
                판매자 유형
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 100px`}>
                <CommonButton
                  width={`49%`}
                  fontSize={width < 900 ? `16px` : `22px`}
                  radius={`7px`}
                  height={width < 900 ? `50px` : `80px`}
                  kindOf={currnetTab === 0 ? `` : `subTheme`}
                  onClick={() => router.push(`/mypage/artisttem`)}
                >
                  My Artisttem
                </CommonButton>
                <CommonButton
                  width={`49%`}
                  fontSize={width < 900 ? `16px` : `22px`}
                  radius={`7px`}
                  height={width < 900 ? `50px` : `80px`}
                  kindOf={currnetTab === 1 ? `` : `subTheme`}
                  onClick={() => router.push(`/mypage/musictem`)}
                >
                  My Musictem
                </CommonButton>
              </Wrapper>

              {/* {currnetTab === 0 && (
                <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 900 ? `18px` : `30px`}
                    fontWeight={`bold`}
                    margin={width < 900 ? `40px 0 20px` : `80px 0 30px`}
                  >
                    Artisttem 앨범 내역
                  </Wrapper>
                  {myFilmo && myFilmo.length === 0 ? (
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
                        Artisttem 앨범 내역이 존재하지 않습니다.
                      </Text>
                    </Wrapper>
                  ) : (
                    myFilmo &&
                    myFilmo.map((data) => {
                      console.log(data);
                      return (
                        <Box key={data.num}>
                          <CdWrapper>
                            <Image
                              position={`absolute`}
                              top={`0`}
                              left={`0`}
                              height={`100%`}
                              radius={`100%`}
                              src={
                                data.artisTemCoverImage
                                  ? data.artisTemCoverImage
                                  : data.musicTemThumbnail
                              }
                              alt="thumbnail"
                            />
                            <Image
                              className="playicon"
                              width={`21px`}
                              src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png"
                              alt="play icon"
                            />

                            <ATag
                              href={
                                data.buyType === "artisTem"
                                  ? data.artisTemFilepath
                                  : data.musicTemFilepath
                              }
                              download
                              width={`auto`}
                            >
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
                            </ATag>
                          </CdWrapper>
                          <Text
                            fontSize={`18px`}
                            color={Theme.darkGrey_C}
                            margin={`20px 0 8px`}
                          >
                            {data.artisTemTitle
                              ? data.artisTemTitle
                              : data.musicTemTitle}
                          </Text>
                          <Wrapper dr={`row`}>
                            {data.buyType === "artisTem" &&
                              (data.artisTemIsLike ? (
                                <Image
                                  alt="icon"
                                  width={`18px`}
                                  margin={`0 6px 0 0`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                                />
                              ) : (
                                <Image
                                  alt="icon"
                                  width={`18px`}
                                  margin={`0 6px 0 0`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                                />
                              ))}
                            {data.buyType === "musicTem" &&
                              (data.musicTemIsLike ? (
                                <Image
                                  alt="icon"
                                  width={`18px`}
                                  margin={`0 6px 0 0`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                                />
                              ) : (
                                <Image
                                  alt="icon"
                                  width={`18px`}
                                  margin={`0 6px 0 0`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                                />
                              ))}
                            <Text fontSize={`12px`} color={Theme.grey_C}>
                              {data.buyType === "artisTem"
                                ? data.artisTemLikeCnt
                                : data.musicTemLikeCnt}
                            </Text>
                          </Wrapper>
                        </Box>
                      );
                    })
                  )}
                </Wrapper>
              )}
              {currnetTab === 1 && (
                <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 900 ? `18px` : `30px`}
                    fontWeight={`bold`}
                    margin={width < 900 ? `40px 0 20px` : `80px 0 30px`}
                  >
                    Musictem 앨범 내역
                  </Wrapper>
                  {userBuyList && userBuyList.length === 0 ? (
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
                        Musictem 앨범 내역이 존재하지 않습니다.
                      </Text>
                    </Wrapper>
                  ) : (
                    userBuyList &&
                    userBuyList.map((data) => {
                      return (
                        <Box key={data.num}>
                          <CdWrapper>
                            <Image
                              position={`absolute`}
                              top={`0`}
                              left={`0`}
                              height={`100%`}
                              radius={`100%`}
                              src={
                                data.artisTemCoverImage
                                  ? data.artisTemCoverImage
                                  : data.musicTemThumbnail
                              }
                              alt="thumbnail"
                            />
                            <Image
                              className="playicon"
                              width={`21px`}
                              src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_purple.png"
                              alt="play icon"
                            />

                            <ATag
                              href={
                                data.buyType === "artisTem"
                                  ? data.artisTemFilepath
                                  : data.musicTemFilepath
                              }
                              download
                              width={`auto`}
                            >
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
                            </ATag>
                          </CdWrapper>
                          <Text
                            fontSize={`18px`}
                            color={Theme.darkGrey_C}
                            margin={`20px 0 8px`}
                          >
                            {data.artisTemTitle
                              ? data.artisTemTitle
                              : data.musicTemTitle}
                          </Text>
                          <Wrapper dr={`row`}>
                            {data.buyType === "artisTem" &&
                              (data.artisTemIsLike ? (
                                <Image
                                  alt="icon"
                                  width={`18px`}
                                  margin={`0 6px 0 0`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                                />
                              ) : (
                                <Image
                                  alt="icon"
                                  width={`18px`}
                                  margin={`0 6px 0 0`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                                />
                              ))}
                            {data.buyType === "musicTem" &&
                              (data.musicTemIsLike ? (
                                <Image
                                  alt="icon"
                                  width={`18px`}
                                  margin={`0 6px 0 0`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                                />
                              ) : (
                                <Image
                                  alt="icon"
                                  width={`18px`}
                                  margin={`0 6px 0 0`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                                />
                              ))}
                            <Text fontSize={`12px`} color={Theme.grey_C}>
                              {data.buyType === "artisTem"
                                ? data.artisTemLikeCnt
                                : data.musicTemLikeCnt}
                            </Text>
                          </Wrapper>
                        </Box>
                      );
                    })
                  )}
                </Wrapper>
              )} */}
            </RsWrapper>
          )}
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
      type: MY_FILMO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
