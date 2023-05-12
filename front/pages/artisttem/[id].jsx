import React, { useCallback, useRef, useState } from "react";
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
  Image,
  RsWrapper,
  SquareBox,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { BellOutlined, CloseOutlined, StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import {
  Checkbox,
  DatePicker,
  message,
  Modal,
  Popover,
  Rate,
  Select,
} from "antd";
import useInput from "../../hooks/useInput";
import moment from "moment";
import {
  BUYREQUEST_CREATE_REQUEST,
  BUYREQUEST_FILE_REQUEST,
  BUYREQUEST_RESET,
} from "../../reducers/buyRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ARTISTEM_DETAIL_REQUEST } from "../../reducers/artist";

const Index = () => {
  ////// GLOBAL STATE //////
  const { buyRequestFile, st_buyRequestCreateDone } = useSelector(
    (state) => state.buyRequest
  );
  const { me } = useSelector((state) => state.user);
  const { artistemDetail } = useSelector((state) => state.artist);
  console.log(artistemDetail);

  ////// HOOKS //////
  const width = useWidth();

  const [isModal, setIsModal] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isContact, setIsContact] = useState(false);

  const [selectDate, setSelectDate] = useState(``);
  const [fileName, setFileName] = useState(``);
  const [terms, setTerms] = useState(false);
  const totalPriceInput = useInput(``);
  const contentInput = useInput(``);

  const fileRef = useRef();
  ////// REDUX //////
  const dispatch = useDispatch();
  const router = useRouter();
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_buyRequestCreateDone) {
      setIsContact(false);
      setSelectDate(null);
      setFileName(null);
      setTerms(false);
      totalPriceInput.setValue(``);
      contentInput.setValue(``);
      dispatch({
        type: BUYREQUEST_RESET,
      });

      return message.success("문의가 접수되었습니다.");
    }
  }, [st_buyRequestCreateDone]);

  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: ARTISTEM_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router.query.id]);
  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const detailToggle = useCallback(() => {
    setIsDetail((prev) => !prev);
  }, [isDetail]);

  const contactToggle = useCallback(() => {
    if (!me) {
      return message.error("로그인 후 이용가능합니다.");
    }
    setIsContact((prev) => !prev);
  }, [isContact]);
  ////// HANDLER //////

  // 문의하기
  const createHandler = useCallback(() => {
    if (!contentInput.value) {
      return message.error("내용을 입력해주세요.");
    }

    if (!totalPriceInput.value) {
      return message.error("금액을 입력해주세요.");
    }

    if (!selectDate) {
      return message.error("제출 마감일을 선택해주세요.");
    }

    if (!buyRequestFile) {
      return message.error("파일을 업로드해주세요.");
    }

    if (!terms) {
      return message.error("동의하기를 눌러주세요.");
    }

    dispatch({
      type: BUYREQUEST_CREATE_REQUEST,
      data: {
        sendMessage: contentInput.value,
        totalPrice: totalPriceInput.value,
        endDate: selectDate.format("YYYY-MM-DD "),
        filename: fileName,
        filepath: buyRequestFile,
        sendUserId: me && me.id,
        artistemId: router.query.id,
      },
    });
  }, [
    me,
    router,
    contentInput,
    totalPriceInput,
    selectDate,
    fileName,
    buyRequestFile,
    terms,
  ]);

  // 파일 리셋
  const fileResetHandler = useCallback(() => {
    dispatch({
      type: BUYREQUEST_RESET,
    });
  }, []);

  // 파일 선택
  const fileClickHandler = useCallback(() => {
    fileRef.current.click();
  }, [fileRef]);

  // 파일 업로드
  const onChangeImages = useCallback((e) => {
    setFileName(e.target.files[0].name);
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("file", file);
    });

    dispatch({
      type: BUYREQUEST_FILE_REQUEST,
      data: formData,
    });
  });

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Artisttem</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            position={`absolute`}
            top={`0`}
            left={`0`}
            height={`640px`}
            zIndex={`-1`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/example-img/artisttem.png")`}
          >
            <Wrapper
              height={`100%`}
              bgColor={`linear-gradient( rgba(255, 255, 255, 0),${Theme.white_C})`}
            ></Wrapper>
          </Wrapper>

          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`50px 0`}>
              <Wrapper width={width < 800 ? `100%` : `214px`}>
                <Image
                  width={`214px`}
                  height={`214px`}
                  radius={`100%`}
                  shadow={`3px 3px 15px rgba(0, 0, 0, 0.1)`}
                  src={artistemDetail && artistemDetail.artistImage}
                  alt="thumbnail"
                />
                <Wrapper
                  dr={`row`}
                  width={`auto`}
                  color={Theme.subTheme3_C}
                  fontSize={`16px`}
                  margin={`24px 0 0`}
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
              <Wrapper
                width={width < 800 ? `100%` : `calc(100% - 214px)`}
                al={`flex-start`}
                padding={width < 800 ? `20px 0 0` : `0 0 0 56px`}
              >
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/artisttem.png`}
                    width={`18px`}
                    margin={`0 6px 0 0`}
                  />
                  <Text
                    fontWeight={`500`}
                    fontSize={`16px`}
                    color={Theme.basicTheme_C}
                  >
                    Artisttem
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`16px 0 24px`}>
                  <Text
                    fontSize={width < 900 ? `20px` : `28px`}
                    fontWeight={`bold`}
                    margin={`0 14px 0 0`}
                  >
                    {artistemDetail && artistemDetail.artistName}
                  </Text>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                    width={`26px`}
                    margin={`0 4px 0 0`}
                  />
                  <Text color={Theme.darkGrey_C} fontSize={`12px`}>
                    00
                  </Text>
                </Wrapper>
                <Text fontSize={width < 900 ? `16px` : `20px`}>
                  {/* {artistemDetail && artistemDetail} */}
                </Text>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`16px 0 20px`}>
                  <CommonButton
                    width={`146px`}
                    height={`46px`}
                    kindOf={`subTheme`}
                    margin={`0 10px 0 0`}
                    onClick={detailToggle}
                  >
                    상세 프로필
                  </CommonButton>
                  <CommonButton
                    width={`146px`}
                    height={`46px`}
                    onClick={contactToggle}
                  >
                    Contact
                  </CommonButton>
                </Wrapper>
                <Text color={Theme.darkGrey_C}>TAG</Text>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0 0`}>
                  <Wrapper
                    width={`auto`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    bgColor={Theme.white_C}
                    radius={`30px`}
                    height={`27px`}
                    padding={`0 15px`}
                    margin={`0 4px 0 0`}
                  >
                    Vocal
                  </Wrapper>
                  <Wrapper
                    width={`auto`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    bgColor={Theme.white_C}
                    radius={`30px`}
                    height={`27px`}
                    padding={`0 15px`}
                    margin={`0 4px 0 0`}
                  >
                    Beat Maker
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `25px` : `32px`}
              fontWeight={`bold`}
              margin={`60px 0 30px`}
            >
              필모그래피
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
                  성시경 / 영원히
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
                </Wrapper>
                <Text color={Theme.grey_C}>
                  Comment : 저는 이곡의 가이드 보컬입니다!
                </Text>
              </ArtWrapper>
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
          <Modal
            onCancel={detailToggle}
            visible={isDetail}
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
                이차미는 어떤 아티스트인가요?
              </Text>
              <Wrapper
                overflow={`auto`}
                wrap={`nowrap`}
                bgColor={Theme.lightGrey2_C}
                padding={`32px 20px`}
                ju={`flex-start`}
                al={`flex-start`}
                maxHeight={`540px`}
              >
                <Text
                  fontSize={`18px`}
                  fontWeight={`600`}
                  color={Theme.grey_C}
                  margin={`0 0 12px`}
                >
                  Q. 주로 하는 역할(기술)과 장르는 무엇인가요?
                </Text>
                <Text fontSize={`16px`} margin={`0 0 28px`}>
                  A. 주로 Pop을 하고 노래와 탑라인을 합니다.
                </Text>
              </Wrapper>
            </Wrapper>
          </Modal>
          <Modal
            onCancel={contactToggle}
            visible={isContact}
            footer={null}
            width={`550px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text fontSize={`32px`} fontWeight={`bold`} margin={`0 0 24px`}>
                CONTACT
              </Text>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  제출 마감일
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  margin={`12px 0 30px`}
                >
                  <DatePicker
                    style={{ width: 200, height: 50 }}
                    value={selectDate}
                    onChange={(e) => setSelectDate(e)}
                  />
                  &nbsp;까지
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  금액
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  margin={`12px 0 30px`}
                >
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="최소 20만원"
                    width={`200px`}
                    height={`50px`}
                    {...totalPriceInput}
                    type="number"
                  />
                  &nbsp;원
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  내용
                </Text>
                <TextArea
                  width={`100%`}
                  height={`75px`}
                  margin={`12px 0 30px`}
                  placeholder="내용을 입력해주세요."
                  {...contentInput}
                />
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  레퍼런스 음악을 첨부해 주세요.
                </Text>
                <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 10px`}>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="파일을 업로드해주세요."
                    width={`calc(100% - 110px)`}
                    readOnly={true}
                    height={`50px`}
                    // value={fileName}
                  />

                  <input
                    type="file"
                    name="image"
                    accept=".mp3, .wav, .mp4"
                    // multiple
                    hidden
                    ref={fileRef}
                    onChange={onChangeImages}
                  />
                  <CommonButton
                    kindOf={`subTheme2`}
                    width={`100px`}
                    height={`50px`}
                    onClick={fileClickHandler}
                  >
                    파일등록
                  </CommonButton>
                </Wrapper>

                {buyRequestFile && fileName && (
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    padding={`16px 14px`}
                    bgColor={Theme.lightGrey2_C}
                  >
                    <Text fontSize={`16px`} color={Theme.grey_C}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/music-file.png`}
                        width={`14px`}
                        margin={`0 5px 0 0`}
                      />
                      {fileName}
                    </Text>
                    <CloseOutlined onClick={fileResetHandler} />
                  </Wrapper>
                )}
                <Text color={Theme.grey_C} margin={`20px 0`}>
                  제작할 음악의 용도를 반드시 미리 고지해야 하며, 작업 완료 후
                  정식 앨범 출판 및 정식 앨범 출판 및 상업적 사용을 할 때에
                  안전한 저작궈느 크레딧 협의를 위해 반드시 New Wave Sound를
                  통하여 전문가, 의뢰인 협의 후 진행하실 수
                  있습니다.(nws0901@nwsound1.com)
                </Text>
                <Checkbox checked={terms} onChange={() => setTerms(!terms)}>
                  네, 동의합니다.
                </Checkbox>
              </Wrapper>
              <Wrapper dr={`row`} margin={`34px 0 0`}>
                <CommonButton
                  width={width < 900 ? `150px` : `180px`}
                  height={`50px`}
                  fontSize={`18px`}
                  kindOf={`subTheme`}
                  margin={`0 8px 0 0`}
                  onClick={contactToggle}
                >
                  이전으로
                </CommonButton>
                <CommonButton
                  width={width < 900 ? `150px` : `180px`}
                  height={`50px`}
                  fontSize={`18px`}
                  onClick={createHandler}
                >
                  문의하기
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
