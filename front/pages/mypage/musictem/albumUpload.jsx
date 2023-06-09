import React, { useEffect, useState, useCallback, useRef } from "react";
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
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import { Checkbox, message, Modal, Form, Select } from "antd";
import Theme from "../../../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  DownloadOutlined,
  LeftOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  PRODUCT_AGREEMENT_UPLOAD_REQUEST,
  PRODUCT_COVER_UPLOAD_REQUEST,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_GEN_ALL_REQUEST,
} from "../../../reducers/product";
import { TAG_TYPE_LIST_REQUEST } from "../../../reducers/tag";
import { CATEGORY_LIST_REQUEST } from "../../../reducers/category";
import {
  ALBUM_CREATE_REQUEST,
  ALBUM_IMAGE_REQUEST,
} from "../../../reducers/album";
import { SELLER_IMAGE_REQUEST } from "../../../reducers/seller";

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }

  &
    .ant-form-item-has-error
    .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: ${(props) => props.theme.lightGrey_C} !important;
  }
`;

const CustomSelect = styled(Select)`
  width: 100%;
  height: 50px;

  & .ant-select-selector,
  & .ant-select-selection-search-input {
    height: 100% !important;
  }

  & .ant-select-selection-placeholder,
  & .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
`;

const CloseButton = styled(CloseOutlined)`
  cursor: pointer;
  margin: 0 0 0 5px;
  &:hover {
    color: ${(props) => props.theme.basicTheme_C};
  }
`;

const CdWrapper = styled(Wrapper)`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  position: relative;
  cursor: pointer;
  margin: 0 0 10px;

  &:before {
    content: "";
    width: 60px;
    height: 60px;
    background: ${(props) => props.theme.white_C};
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 700px) {
    height: 150px;
  }

  &:hover {
    transition: 0.9s;
    transform: rotate(20deg);
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const {
    coverPath,
    agreementPath,
    //
    st_productCreateLoading,
    st_productCreateDone,
    st_productCreateError,
    //
    st_productCoverUploadLoading,
    st_productCoverUploadError,
    //
    st_productAgreementUploadLoading,
    st_productAgreementUploadError,
  } = useSelector((state) => state.product);
  const { tagTypeList } = useSelector((state) => state.tag);
  const { categoryList } = useSelector((state) => state.category);
  const {
    albumImage,
    //
    st_albumCreateDone,
    st_albumCreateError,
  } = useSelector((state) => state.album);
  const { sellerImage } = useSelector((state) => state.seller);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);

  // 장르 선택
  const [selectGen, setSelectGen] = useState([]);

  const [covertName, setCovertName] = useState(null);
  const [agreementName, setAgreementName] = useState(null);

  const coverImageRef = useRef();
  const agreementRef = useRef();

  const [tagArr, setTagArr] = useState([]); // 검색 태그
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (st_albumCreateDone) {
      router.push(`/mypage/musictem`);

      return message.success("앨범을 등록했습니다.");
    }

    if (st_albumCreateError) {
      return message.error(st_albumCreateError);
    }
  }, [st_albumCreateDone, st_albumCreateError]);

  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return message.error(`로그인이 필요한 페이지입니다.`);
    }
  }, [me]);

  // 엘범 등록

  useEffect(() => {
    if (st_productCreateDone) {
      router.push("/mypage/musictem");

      return message.success("엘범이 등록되었습니다.");
    }

    if (st_productCreateError) {
      return message.error(st_productCreateError);
    }
  }, [st_productCreateDone, st_productCreateError]);

  // 커버이미지 업로드
  useEffect(() => {
    if (st_productCoverUploadError) {
      return message.error(st_productCoverUploadError);
    }
  }, [st_productCoverUploadError]);

  // 동의서 업로드
  useEffect(() => {
    if (st_productAgreementUploadError) {
      return message.error(st_productAgreementUploadError);
    }
  }, [st_productAgreementUploadError]);

  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  ////// HANDLER //////

  // 앨범등록
  const createHandler = useCallback(
    (data) => {
      if (!albumImage) {
        return message.error("앨범 이미지를 업로드해주세요.");
      }

      if (tagArr.length === 0) {
        return message.error("태그를 하나 이상 선택해주세요.");
      }

      let cateArr = [];

      cateArr.push({
        CateTypeId: 2,
        CategoryId: data.categorys[2],
        sort: 1,
      });

      let resultTag = [];

      tagArr.map((value) => {
        console.log(value);
        resultTag.push({
          TagTypeId: value.TagTypeId,
          TagId: value.TagId,
          sort: value.sort,
        });
      });

      dispatch({
        type: ALBUM_CREATE_REQUEST,
        data: {
          albumImage: albumImage,
          albumImageName: covertName,
          bitRate: data.bitRate,
          sampleRate: data.sampleRate,
          fileName: agreementName,
          filePath: sellerImage,
          categorys: cateArr,
          tags: resultTag,
          MusictemId: me && me.musictemId,
        },
      });
    },
    [me, albumImage, covertName, agreementName, sellerImage, tagArr]
  );

  // 태그 삭제
  const tagDeleteHandler = useCallback(
    (data) => {
      let arr = tagArr ? tagArr.map((data) => data) : [];
      const currentId = arr.findIndex(
        (value) => value.TagId === data.TagId && value.value === data.value
      );

      arr.splice(currentId, 1);
      setTagArr(arr);
    },
    [tagArr]
  );

  // 커버이미지 업로드
  const coverImageRefClick = useCallback(() => {
    coverImageRef.current.click();
  }, []);

  const coverImageUploadHandler = useCallback(
    (e) => {
      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        setCovertName(file.name);
        formData.append("image", file);
      });

      dispatch({
        type: ALBUM_IMAGE_REQUEST,
        data: formData,
      });
    },
    [covertName]
  );

  // 동의서 업로드
  const agreementRefClick = useCallback(() => {
    agreementRef.current.click();
  }, []);

  const agreementHandler = useCallback(
    (e) => {
      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        setAgreementName(file.name);
        formData.append("image", file);
      });

      dispatch({
        type: SELLER_IMAGE_REQUEST,
        data: formData,
      });
    },
    [agreementName]
  );

  // 검색태그 아이디 추가
  const tagHandler = useCallback(
    (type) => {
      const index = tagArr.indexOf(type.id);
      let tempArr = tagArr.map((data) => data);

      if (index !== -1) {
        tempArr = tempArr.filter((data) => data !== type.id);
      } else {
        tempArr.push({
          value: type[0],
          TagTypeId: type[2],
          TagId: type[1],
          sort: tempArr.length + 1,
        });
      }

      setTagArr(tempArr);
    },
    [tagArr]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | My Musictem</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 50px`}>
              <Text
                fontSize={width < 900 ? `20px` : `30px`}
                fontWeight={`bold`}
              >
                My Musictem
              </Text>
              <CommonButton
                height={`27px`}
                padding={`0 10px`}
                margin={`0 14px`}
              >
                My Musictem 보러가기
              </CommonButton>

              <CommonButton
                kindOf={`subTheme`}
                height={`27px`}
                padding={`0 10px`}
              >
                White
              </CommonButton>
              <CommonButton
                kindOf={`grey`}
                height={`27px`}
                margin={`0 0 0 8px`}
                padding={`0 10px`}
                onClick={modalToggle}
              >
                등급 안내
              </CommonButton>
            </Wrapper>

            {/* ------------------ CUSTOM FORM ------------------ */}
            <CustomForm onFinish={createHandler}>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`24px`} fontWeight={`600`} isHover>
                  <LeftOutlined style={{ margin: `0 15px 0 0` }} /> Musictem
                  앨범 등록
                </Text>

                <Wrapper
                  width={width < 700 ? `100%` : `440px`}
                  bgColor={Theme.subTheme_C}
                  height={`55px`}
                  fontSize={width < 700 ? `14px` : `16px`}
                  radius={`5px`}
                  margin={`18px 0 30px`}
                >
                  제출은 앨범으로만 가능하며, 모두 같은 형식이어야 합니다.
                </Wrapper>

                <Text>
                  엘범 이미지
                  <SpanText>*</SpanText>
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`12px 0 33px`}
                  width={width < 700 ? `100%` : `440px`}
                >
                  {coverPath && (
                    <CdWrapper>
                      <Image
                        radius={`100%`}
                        width={`100%`}
                        height={`100%`}
                        src={coverPath}
                        alt="corverImage"
                      />
                    </CdWrapper>
                  )}

                  <TextInput
                    value={covertName}
                    width={`calc(100% - 110px)`}
                    height={`50px`}
                    readOnly
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="권장사이즈 : 300px*300px"
                  />

                  <input
                    type="file"
                    hidden
                    ref={coverImageRef}
                    accept=".jpg, .png"
                    onChange={coverImageUploadHandler}
                  />

                  <CommonButton
                    width={`100px`}
                    height={`50px`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    fontWeight={`bold`}
                    kindOf={`subTheme2`}
                    onClick={coverImageRefClick}
                    loading={st_productCoverUploadLoading}
                  >
                    파일등록
                  </CommonButton>
                </Wrapper>

                <Text>
                  카테고리
                  <SpanText>*</SpanText>
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`12px 0 10px`}
                  width={width < 700 ? `100%` : `440px`}
                >
                  <Wrapper>
                    <Form.Item
                      name="categorys"
                      rules={[
                        { required: true, message: "카테고리는 필수 입니다." },
                      ]}
                    >
                      <CustomSelect placeholder="카테고리를 선택해주세요.">
                        {categoryList &&
                          categoryList.map((data) => {
                            return (
                              <Select.Option
                                key={data.id}
                                value={[data.value, data.CateTypeId, data.id]}
                              >
                                {data.value}
                              </Select.Option>
                            );
                          })}
                      </CustomSelect>
                    </Form.Item>
                  </Wrapper>
                </Wrapper>

                <Text>
                  장르(중복선택가능)
                  <SpanText>*</SpanText>
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`12px 0 33px`}
                  width={width < 700 ? `100%` : `440px`}
                >
                  <CustomSelect
                    placeholder="장르를 선택해주세요."
                    onChange={tagHandler}
                  >
                    {tagTypeList.map((data) => {
                      return (
                        data.value === "Genre" &&
                        data.underValues.map((value) => {
                          return (
                            <Select.Option
                              value={[
                                value.tagValue,
                                value.id,
                                value.TagTypeId,
                              ]}
                              key={value.id}
                            >
                              {value.tagValue}
                            </Select.Option>
                          );
                        })
                      );
                    })}
                  </CustomSelect>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`10px 0 0`}>
                    {tagArr &&
                      tagArr.map((data) => {
                        return (
                          <Wrapper
                            width={`auto`}
                            dr={`row`}
                            padding={`5px 15px`}
                            margin={`0 5px 5px 0`}
                            radius={`30px`}
                            border={`1px solid ${Theme.lightGrey_C}`}
                          >
                            <Text>{data.value}</Text>
                            <CloseButton
                              onClick={() => tagDeleteHandler(data)}
                            />
                          </Wrapper>
                        );
                      })}
                  </Wrapper>
                </Wrapper>

                <Text>
                  Bit Rate
                  <SpanText>*</SpanText>
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`12px 0 10px`}
                  width={width < 700 ? `100%` : `440px`}
                >
                  <Form.Item
                    name="bitRate"
                    rules={[
                      { required: true, message: "Bit Rate는 필수 입니다." },
                    ]}
                  >
                    <TextInput
                      width={`100%`}
                      height={`50px`}
                      border={`1px solid ${Theme.lightGrey_C}`}
                      placeholder="ex) 32bit"
                    />
                  </Form.Item>
                </Wrapper>

                <Text>
                  Sample Rate
                  <SpanText>*</SpanText>
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`12px 0 10px`}
                  width={width < 700 ? `100%` : `440px`}
                >
                  <Form.Item
                    name="sampleRate"
                    rules={[
                      { required: true, message: "Sample Rate는 필수 입니다." },
                    ]}
                  >
                    <TextInput
                      width={`100%`}
                      height={`50px`}
                      border={`1px solid ${Theme.lightGrey_C}`}
                      placeholder="ex) 44.1khz"
                    />
                  </Form.Item>
                </Wrapper>

                <Text>제작 참여 동의서 업로드</Text>
                <Wrapper
                  width={width < 700 ? `100%` : `684px`}
                  padding={`20px`}
                  radius={`5px`}
                  fontSize={width < 700 ? `14px` : `16px`}
                  al={`flex-start`}
                  bgColor={Theme.lightGrey2_C}
                  // margin={`12px 0 20px`}
                  margin={`12px 0 0`}
                >
                  <Text>
                    해당 음원 판매를 위하여 제작에 참여한 연주자, 보컬, 프로듀서
                    등의 판매 허가 동의서가 필요합니다.
                  </Text>
                  <Text>반드시 참여한 모든 인원에 서명을 받아 제출하세요.</Text>
                </Wrapper>

                {/* <Text isHover td={`underLine`}>
                  동의서 다운로드
                  <DownloadOutlined />
                </Text> */}

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`30px 0 33px`}
                  width={width < 700 ? `100%` : `440px`}
                >
                  <TextInput
                    value={agreementName}
                    readOnly
                    width={`calc(100% - 110px)`}
                    height={`50px`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="동의서를 압축해서 업로드해주세요."
                  />

                  <input
                    type="file"
                    hidden
                    ref={agreementRef}
                    accept=".zip"
                    onChange={agreementHandler}
                  />
                  <CommonButton
                    width={`100px`}
                    height={`50px`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    fontWeight={`bold`}
                    kindOf={`subTheme2`}
                    onClick={agreementRefClick}
                    loading={st_productAgreementUploadLoading}
                  >
                    파일등록
                  </CommonButton>
                </Wrapper>

                <CommonButton
                  width={`180px`}
                  height={`50px`}
                  margin={`40px 0 100px`}
                  htmlType="submit"
                  loading={st_productCreateLoading}
                >
                  등록하기
                </CommonButton>
              </Wrapper>
            </CustomForm>
          </RsWrapper>

          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            width={`640px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={width < 900 ? `20px` : `28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                등급 안내
              </Text>

              <Wrapper
                bgColor={Theme.subTheme_C}
                padding={`17px 10px`}
                margin={`0 0 24px`}
                fontWeight={`600`}
              >
                <Text>누적 판매 금액과 상관없이</Text>
                <Text>누적 판매 건 수에 따라 등급이 업데이트 됩니다!</Text>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                color={Theme.darkGrey_C}
                fontSize={width < 700 ? `14px` : `16px`}
              >
                <Text>- white : 누적 건 수 100건 미만의 판매자 회원</Text>
                <Text>
                  - Blue : 누적 건 수 100건 이상 300건 미만의 판매자 회원
                </Text>
                <Text>- Purple : 누적 건 수 300건 이상의 판매자 회원</Text>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                color={Theme.grey_C}
                fontSize={width < 700 ? `14px` : `16px`}
                margin={`30px 0 0`}
              >
                <Text>
                  ※ 등급 심사일은 매월 1일에 결정되며, 등급 심사일로부터 3개월
                  이내 패널티 상태였다면 White 등급이 적용됩니다.
                </Text>
                <Text>
                  ※ 누적 판매 건수 조건을 만족하였더라도 그 외 조건을 미 충족한
                  판매자는 White 등급이 적용됩니다.
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

    context.store.dispatch({
      type: PRODUCT_GEN_ALL_REQUEST,
    });

    context.store.dispatch({
      type: CATEGORY_LIST_REQUEST,
      data: {
        CateTypeId: 2,
      },
    });

    context.store.dispatch({
      type: TAG_TYPE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
