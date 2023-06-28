import React, { useCallback, useState, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  ArtWrapper,
  Image,
  RsWrapper,
  SpanText,
  SquareBox,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { SearchOutlined, StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import { Empty, Modal, Select } from "antd";
import MainSlider2 from "../../components/slide/MainSlider2";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { NEW_ARTIST_LIST_REQUEST } from "../../reducers/artist";
import {
  ARTISTEM_LIST_REQUEST,
  ARTISTEM_TOP_SELL_LIST_REQUEST,
} from "../../reducers/seller";
import { CATE_ALL_LIST_REQUEST } from "../../reducers/category";
import { TAG_LIST_REQUEST } from "../../reducers/tag";
import useInput from "../../hooks/useInput";

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

const Box = styled(Wrapper)`
  cursor: pointer;
  overflow: hidden;

  & .thumb {
    transition: 0.5s;
  }

  &:hover {
    & .thumb {
      transform: scale(1.1);
    }
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { newArtistList } = useSelector((state) => state.artist);
  const { artistemList, artistemTopSell } = useSelector(
    (state) => state.seller
  );
  const { tagList, tagTypeList } = useSelector((state) => state.tag);

  const { cateAllList } = useSelector((state) => state.category);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const searchInput = useInput();

  const [orderType, setOrderType] = useState(1); // 더보기 정렬 1.추천 2.최신

  const [selectArtist, setSelectArtist] = useState(null);
  const [tagData, setTagData] = useState(null); // 태그 아이디
  const [cateData, setCateData] = useState(null); // 카테고리 아이디

  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: NEW_ARTIST_LIST_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (newArtistList && newArtistList.length > 0) {
      setSelectArtist(newArtistList[0]);
    }
  }, [newArtistList]);

  useEffect(() => {
    dispatch({
      type: NEW_ARTIST_LIST_REQUEST,
      data: {
        orderType,
      },
    });
  }, [orderType]);

  useEffect(() => {
    dispatch({
      type: ARTISTEM_LIST_REQUEST,
      data: {
        searchName: searchInput.value,
        TagId: tagData,
        CategoryId: cateData === 15 ? null : cateData,
        orderType,
      },
    });
  }, [searchInput.value, tagData, cateData, orderType]);

  ////// TOGGLE //////

  ////// HANDLER //////

  // 아티스트 선택
  const selectArtistHandler = useCallback(
    (data) => {
      setSelectArtist(data);
    },
    [selectArtist]
  );

  // 순서 변경
  const orderTypeHandler = useCallback(
    (data) => {
      setOrderType(data);
    },
    [orderType]
  );

  // 페이지 이동
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 카테고리 선택
  const categoryTypeHandler = useCallback(
    (data) => {
      setCateData(data);
    },
    [cateData]
  );

  const tagTypeHandler = useCallback((data) => {
    dispatch({
      type: TAG_LIST_REQUEST,
      data: {
        TagTypeId: data,
      },
    });
  }, []);

  const tagIdHandler = useCallback(
    (data) => {
      setTagData(data);
    },
    [tagData]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Artisttem</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`0 0 100px`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 40px`}>
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
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Wrapper width={`auto`} al={`flex-start`}>
                <Text
                  fontSize={`20px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={`10px 0 16px`}
                >
                  Category
                </Text>
                <CustomSelect>
                  <Select
                    onChange={categoryTypeHandler}
                    placeholder={"Category"}
                  >
                    {cateAllList &&
                      cateAllList.map((data) => {
                        if (data.label === "아티스탬")
                          return data.options.map((value, idx) => {
                            return (
                              <Select.Option key={idx} value={value.value}>
                                {value.label}
                              </Select.Option>
                            );
                          });
                      })}
                  </Select>
                </CustomSelect>
              </Wrapper>
              <Wrapper
                width={`auto`}
                al={`flex-start`}
                margin={width < 900 ? `10px 0` : `0 50px`}
              >
                <Text
                  fontSize={`20px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                  margin={`10px 0 16px`}
                >
                  Tag
                </Text>
                <Wrapper dr={`row`} width={`auto`}>
                  <CustomSelect margin={`0 14px 0 0`}>
                    <Select placeholder={"Tag"} onChange={tagTypeHandler}>
                      <Select.Option>ALL</Select.Option>
                      {tagTypeList &&
                        tagTypeList.map((data) => {
                          return (
                            <Select.Option key={data.id} value={data.id}>
                              {data.value}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </CustomSelect>
                  <CustomSelect>
                    <Select placeholder={"Tag"} onChange={tagIdHandler}>
                      {tagList &&
                        tagList.map((data) => {
                          return (
                            <Select.Option key={data.id} value={data.id}>
                              {data.tagValue}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </CustomSelect>
                </Wrapper>
              </Wrapper>
              <Wrapper width={width < 700 ? `100%` : `auto`} al={`flex-start`}>
                <Text
                  fontSize={`20px`}
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
                    {...searchInput}
                  />
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`70px 0 40px`}>
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
              dr={`row`}
              ju={`space-between`}
              margin={`0 0 120px`}
              al={`flex-start`}
            >
              {newArtistList &&
                (newArtistList.length === 0 ? (
                  <Wrapper height={`300px`}>
                    <Empty description="새로운 아티스트가 없습니다." />
                  </Wrapper>
                ) : (
                  <>
                    <Wrapper
                      width={width < 900 ? `100%` : `49%`}
                      dr={`row`}
                      ju={`space-between`}
                    >
                      {newArtistList.map((data, idx) => {
                        return (
                          <Box width={`48%`} key={data.id}>
                            <Wrapper
                              height={width < 700 ? `120px` : `236px`}
                              overflow={`hidden`}
                              margin={`0 0 20px`}
                              radius={`7px`}
                            >
                              <Image
                                className="thumb"
                                key={idx}
                                onClick={() => selectArtistHandler(data)}
                                alt="image"
                                src={data.artistProfileImage}
                                width={`100%`}
                                height={`100%`}
                              />
                            </Wrapper>
                          </Box>
                        );
                      })}
                    </Wrapper>
                  </>
                ))}

              {newArtistList && newArtistList.length !== 0 && (
                <Box
                  width={width < 900 ? `100%` : `49%`}
                  margin={width < 900 ? `20px 0 0` : `0`}
                  onClick={() =>
                    movelinkHandler(
                      `/artisttem/${selectArtist && selectArtist.id}`
                    )
                  }
                >
                  <Wrapper position={`relative`}>
                    <Wrapper
                      position={`absolute`}
                      bottom={`0`}
                      left={`0`}
                      bgColor={`rgba(0, 0, 0, 0.5)`}
                      color={Theme.white_C}
                      radius={`7px`}
                      padding={`20px`}
                      al={`flex-start`}
                      zIndex={`2`}
                    >
                      <Wrapper dr={`row`} ju={`flex-start`}>
                        <Text fontSize={`18px`} fontWeight={`bold`}>
                          {selectArtist && selectArtist.name}
                        </Text>
                        <Wrapper
                          width={`auto`}
                          dr={`row`}
                          margin={`0 0 0 14px`}
                        >
                          <Image
                            alt="icon"
                            width={`14px`}
                            margin={`0 4px 0 0`}
                            src={
                              selectArtist && selectArtist.isLike
                                ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`
                                : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`
                            }
                          />
                          <Text>{selectArtist && selectArtist.likeCnt}</Text>
                        </Wrapper>
                      </Wrapper>
                      <Text fontSize={`16px`} margin={`12px 0 18px`}>
                        {selectArtist && selectArtist.artistInfo}
                      </Text>
                      <Wrapper dr={`row`} ju={`flex-start`}>
                        {selectArtist &&
                          selectArtist.tags.map((data, idx) => {
                            return (
                              <Wrapper
                                key={idx}
                                width={`auto`}
                                bgColor={Theme.white_C}
                                color={Theme.darkGrey_C}
                                radius={`30px`}
                                height={`27px`}
                                padding={`0 15px`}
                                margin={`0 7px 5px 0`}
                              >
                                {data.tagValue}
                              </Wrapper>
                            );
                          })}
                      </Wrapper>
                    </Wrapper>
                    <Image
                      height={width < 700 ? `240px` : `495px`}
                      alt="image"
                      radius={`7px`}
                      src={selectArtist && selectArtist.artistProfileImage}
                      className="thumb"
                    />
                  </Wrapper>
                </Box>
              )}
            </Wrapper>

            {/* 아티스트탬 슬라이드 */}
            {artistemTopSell.length !== 0 && (
              <MainSlider2 datum={artistemTopSell} />
            )}

            <Wrapper margin={`100px 0 45px`}>
              <Text
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
              >
                How to Use Artisttem
              </Text>
              <Text fontSize={`16px`} margin={`14px 0 50px`}>
                다양한 뮤지션과 음악을 완성하는 Artisttem
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
                  <Text fontSize={`18px`}>원하는 Artist를 찾아</Text>
                  <Text fontSize={`18px`}>Audio Sample과 Review를</Text>
                  <Text fontSize={`18px`}>탐색해보세요!</Text>
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
                  <Text fontSize={`18px`}>Artist에게 직접</Text>
                  <Text fontSize={`18px`}>예산과 기한을</Text>
                  <Text fontSize={`18px`}>제안해보세요!</Text>
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
                  <Text fontSize={`18px`}>보안 플랫폼을 통해</Text>
                  <Text fontSize={`18px`}>결제를 완료하고</Text>
                  <Text fontSize={`18px`}>놀라운 음악을 받아보세요!</Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
              <Text fontSize={`24px`} fontWeight={`bold`}>
                더보기
              </Text>
              <Wrapper dr={`row`} width={`auto`} fontSize={`16px`}>
                <Text
                  color={orderType === 1 ? Theme.basicTheme_C : Theme.grey_C}
                  isHover
                  onClick={() => orderTypeHandler(1)}
                >
                  최신순
                </Text>
                <SpanText
                  fontSize={`10px`}
                  margin={`0 10px`}
                  color={Theme.lightGrey_C}
                >
                  |
                </SpanText>
                <Text
                  color={orderType === 2 ? Theme.basicTheme_C : Theme.grey_C}
                  isHover
                  onClick={() => orderTypeHandler(2)}
                >
                  추천순
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {artistemList && artistemList.length === 0 ? (
                <Wrapper
                  height={`300px`}
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
                    등록된 아티스트가 존재하지 않습니다.
                  </Text>
                </Wrapper>
              ) : (
                artistemList.map((data) => {
                  return (
                    <ArtWrapper
                      key={data.id}
                      onClick={() =>
                        movelinkHandler(`/artisttem/${data.artistemId}`)
                      }
                    >
                      <SquareBox>
                        <Image src={data.artistProfileImage} alt="thumbnail" />
                      </SquareBox>
                      <Text
                        fontSize={`18px`}
                        fontWeight={`bold`}
                        margin={`20px 0 7px`}
                      >
                        {data.name}
                      </Text>
                      <Wrapper dr={`row`} ju={`flex-start`}>
                        {data.tags.map((v, idx) => {
                          return (
                            <Wrapper
                              key={idx}
                              width={`auto`}
                              border={`1px solid ${Theme.lightGrey_C}`}
                              radius={`30px`}
                              height={`27px`}
                              padding={`0 15px`}
                              margin={`0 7px 5px 0`}
                            >
                              {v.tagValue}
                            </Wrapper>
                          );
                        })}
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`12px 0 0`}
                      >
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
                          {data.isLike ? (
                            <Image
                              alt="icon"
                              width={`14px`}
                              margin={`0 4px 0 0`}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`}
                            />
                          ) : (
                            <Image
                              alt="icon"
                              width={`14px`}
                              margin={`0 4px 0 0`}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                            />
                          )}
                          <Text fontSize={`14px`} color={Theme.grey_C}>
                            {data.likeCnt}
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    </ArtWrapper>
                  );
                })
              )}
            </Wrapper>
          </RsWrapper>
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
      type: NEW_ARTIST_LIST_REQUEST,
    });

    context.store.dispatch({
      type: ARTISTEM_LIST_REQUEST,
    });

    context.store.dispatch({
      type: CATE_ALL_LIST_REQUEST,
    });

    context.store.dispatch({
      type: ARTISTEM_TOP_SELL_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
