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
import { Modal, Select } from "antd";
import MainSlider2 from "../../components/slide/MainSlider2";

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

  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////
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
                  fontSize={`20px`}
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

            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 120px`}>
              <Wrapper
                width={width < 900 ? `100%` : `49%`}
                dr={`row`}
                ju={`space-between`}
              >
                <Image
                  alt="image"
                  radius={`7px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/new_small1.png`}
                  width={`48%`}
                  margin={`0 0 20px`}
                />
                <Image
                  alt="image"
                  radius={`7px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/new_small2.png`}
                  width={`48%`}
                  margin={`0 0 20px`}
                />
                <Image
                  alt="image"
                  radius={`7px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/new_small1.png`}
                  width={`48%`}
                />
                <Image
                  alt="image"
                  radius={`7px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/new_small2.png`}
                  width={`48%`}
                />
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `49%`}
                margin={width < 900 ? `20px 0 0` : `0`}
                position={`relative`}
              >
                <Wrapper
                  position={`absolute`}
                  bottom={`0`}
                  left={`0`}
                  bgColor={`rgba(0, 0, 0, 0.5)`}
                  color={Theme.white_C}
                  radius={`7px`}
                  padding={`20px`}
                  al={`flex-start`}
                >
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <Text fontSize={`18px`} fontWeight={`bold`}>
                      이차미
                    </Text>
                    <Wrapper width={`auto`} dr={`row`} margin={`0 0 0 14px`}>
                      <Image
                        alt="icon"
                        width={`14px`}
                        margin={`0 4px 0 0`}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                      />
                      <Text>98</Text>
                    </Wrapper>
                  </Wrapper>
                  <Text fontSize={`16px`} margin={`12px 0 18px`}>
                    "아티스트를 소개하는 한 마디를 적어주세요."
                  </Text>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <Wrapper
                      width={`auto`}
                      bgColor={Theme.white_C}
                      color={Theme.darkGrey_C}
                      radius={`30px`}
                      height={`27px`}
                      padding={`0 15px`}
                      margin={`0 7px 5px 0`}
                    >
                      Vocal
                    </Wrapper>
                    <Wrapper
                      width={`auto`}
                      bgColor={Theme.white_C}
                      color={Theme.darkGrey_C}
                      radius={`30px`}
                      height={`27px`}
                      padding={`0 15px`}
                      margin={`0 7px 5px 0`}
                    >
                      Beat Maker
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Image
                  alt="image"
                  radius={`7px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/artisttem/new_big.png`}
                />
              </Wrapper>
            </Wrapper>

            <MainSlider2 />

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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
