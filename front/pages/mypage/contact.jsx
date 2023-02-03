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
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import {
  Checkbox,
  DatePicker,
  Empty,
  Form,
  message,
  Modal,
  Popconfirm,
} from "antd";
import Theme from "../../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  BUYREQUEST_DELETE_REQUEST,
  BUYREQUEST_ISOK_REQUEST,
  BUYREQUEST_ISREJECT_REQUEST,
  BUYREQUEST_MY_LIST_REQUEST,
} from "../../reducers/buyRequest";
import moment from "moment";
import { saveAs } from "file-saver";

const FileWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: flex-start;
  padding: 16px 14px;
  background-color: ${(props) => props.theme.lightGrey2_C};
  border: 1px solid ${(props) => props.theme.lightGrey_C};
  margin: 12px 0 20px;
  cursor: pointer;
  color: ${(props) => props.theme.grey_C};

  &:hover {
    border: 1px solid ${(props) => props.theme.basicTheme_C};
    background-color: ${(props) => props.theme.subTheme_C};
    color: ${(props) => props.theme.basicTheme_C};
  }
`;

const Box = styled(Wrapper)`
  border-radius: 7px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  padding: 40px 32px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 30px;

  @media (max-width: 700px) {
    padding: 20px 15px;
  }
`;

const CustomDatePicker = styled(DatePicker)`
  background: ${Theme.lightGrey2_C} !important;
  border: 1px solid ${Theme.lightGrey_C} !important;

  & .ant-picker-input > input[disabled] {
    color: ${Theme.black_C} !important;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const {
    myBuyRequests,
    myBuyRequestLastPage,
    //
    st_buyRequestDeleteLoading,
    st_buyRequestDeleteDone,
    st_buyRequestDeleteError,
    //
    st_buyRequestIsOkLoading,
    st_buyRequestIsOkDone,
    st_buyRequestIsOkError,
    //
    st_buyRequestIsRejectLoading,
    st_buyRequestIsRejectDone,
    st_buyRequestIsRejectError,
  } = useSelector((state) => state.buyRequest);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  // 문의 내역
  const [dForm] = Form.useForm();

  // 수락
  const [oForm] = Form.useForm();

  // 거절
  const [rForm] = Form.useForm();

  // 결제
  const [orderForm] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);

  // 문의 내역 모달
  const [dData, setDData] = useState(null);
  const [contactModal, setContactModal] = useState(false);

  // 결제 모달
  const [orderModal, setOrderModal] = useState(false);
  const [orderData, setOrderData] = useState(false);

  // 수락 모달
  const [oData, setOData] = useState(null);
  const [okModal, setOkModal] = useState(false);

  // 거절 모달
  const [rData, setRData] = useState(null);
  const [rejectModal, setRejectModal] = useState(false);

  const [selectContact, setSelectContact] = useState([]);

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
    if (router.query) {
      dispatch({
        type: BUYREQUEST_MY_LIST_REQUEST,
        data: {
          page: currentPage,
          type: me && me.isArtist,
        },
      });
    }
  }, [router.query, currentPage]);

  // 삭제 후처리
  useEffect(() => {
    if (st_buyRequestDeleteDone) {
      dispatch({
        type: BUYREQUEST_MY_LIST_REQUEST,
        data: {
          page: currentPage,
          type: me && me.isArtist,
        },
      });

      setSelectContact([]);

      return message.success("삭제되었습니다.");
    }
  }, [st_buyRequestDeleteDone]);

  useEffect(() => {
    if (st_buyRequestDeleteError) {
      return message.error(st_buyRequestDeleteError);
    }
  }, [st_buyRequestDeleteError]);

  // 수락 후 처리
  useEffect(() => {
    if (st_buyRequestIsOkDone) {
      dispatch({
        type: BUYREQUEST_MY_LIST_REQUEST,
        data: {
          page: currentPage,
          type: me && me.isArtist,
        },
      });

      contactToggle(null);
      okToggle(null);

      return message.success("수락되었습니다.");
    }
    if (st_buyRequestIsOkError) {
      return message.error(st_buyRequestIsOkError);
    }
  }, [st_buyRequestIsOkDone, st_buyRequestIsOkError]);

  // 거절 후 처리
  useEffect(() => {
    if (st_buyRequestIsRejectDone) {
      dispatch({
        type: BUYREQUEST_MY_LIST_REQUEST,
        data: {
          page: currentPage,
          type: me && me.isArtist,
        },
      });

      contactToggle(null);
      rejectToggle(null);

      return message.success("거절되었습니다.");
    }
    if (st_buyRequestIsRejectError) {
      return message.error(st_buyRequestIsRejectError);
    }
  }, [st_buyRequestIsRejectDone, st_buyRequestIsRejectError]);

  ////// TOGGLE //////
  // 내역 모달
  const contactToggle = useCallback(
    (data) => {
      if (data) {
        dForm.setFieldsValue({
          endDate: moment(data.endDate),
          totalPrice: data.totalPrice,
          sendMessage: data.sendMessage,
        });
        setDData(data);
      } else {
        dForm.resetFields();
        setDData(null);
      }
      setContactModal((prev) => !prev);
    },
    [contactModal, dData]
  );

  // 거절 모달
  const rejectToggle = useCallback(
    (data) => {
      if (data) {
        rForm.setFieldsValue({
          rejectMessage: data.rejectMessage,
        });
        setRData(data);
      } else {
        rForm.resetFields();
        setRData(null);
      }
      setRejectModal((prev) => !prev);
    },
    [rejectModal]
  );

  // 결제 모달
  const orderToggle = useCallback(
    (data) => {
      if (data) {
        setOrderData(data);
        console.log(data);

        orderForm.setFieldsValue({
          endDate: moment(data.endDate),
          totalPrice: data.totalPrice,
          okMessage: data.okMessage,
        });
      } else {
        setOrderData(null);

        orderForm.resetFields();
      }
      setOrderModal((prev) => !prev);
    },
    [orderModal]
  );

  // 수락 모달
  const okToggle = useCallback(
    (data) => {
      if (data) {
        setOData(data);
        oForm.setFieldsValue({
          okMessage: data.okMessage,
        });
      } else {
        setOData(null);
        oForm.resetFields();
      }
      setOkModal((prev) => !prev);
    },
    [okModal]
  );

  ////// HANDLER //////

  // 페이지 변경
  const pageChangeHandler = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  // 파일 다운로드
  const fileDownloadHandler = useCallback(async (data) => {
    let blob = await fetch(data.filepath).then((r) => r.blob());

    const file = new Blob([blob]);

    // 파일 확장자 구하기
    // const ext = data.filepath.substring(
    //   data.filepath.lastIndexOf(".") + 1,
    //   data.filepath.length
    // );

    const originName = `${data.filename}`;

    saveAs(file, originName);
  }, []);

  // 삭제하기 내역 선택
  const selectContactHandler = useCallback(
    (data) => {
      let selectContactArr = selectContact
        ? selectContact.map((value) => value)
        : [];

      if (selectContactArr.find((value) => value.id === data.id)) {
        setSelectContact(
          selectContactArr.filter((value) => value.id !== data.id)
        );
        return;
      }

      selectContactArr.push(data);
      setSelectContact(selectContactArr);
    },
    [selectContact]
  );

  // 삭제하기 내역 전체 선택
  const selectContactAllHandler = useCallback(() => {
    if (selectContact && selectContact.length > 0) {
      setSelectContact([]);
      return;
    }

    setSelectContact(
      myBuyRequests.filter((data) => data.type !== 2 || data.type !== 3)
    );
  }, [myBuyRequests, selectContact]);

  // 삭제하기
  const deleteContactHandler = useCallback(() => {
    if (st_buyRequestDeleteLoading) {
      return message.error("삭제중입니다...");
    }

    if (selectContact.length === 0) {
      return message.error("내역을 선택해주세요.");
    }

    dispatch({
      type: BUYREQUEST_DELETE_REQUEST,
      data: {
        idArr: selectContact.map((data) => data.id),
      },
    });
  }, [st_buyRequestDeleteLoading, selectContact]);

  // 수락하기
  const isOkHandler = useCallback(
    (data) => {
      dispatch({
        type: BUYREQUEST_ISOK_REQUEST,
        data: {
          id: oData.id,
          isOk: 1,
          okMessage: data.okMessage,
        },
      });
    },
    [oData]
  );

  // 거절하기
  const isRejectHandler = useCallback(
    (data) => {
      dispatch({
        type: BUYREQUEST_ISREJECT_REQUEST,
        data: {
          id: rData.id,
          isReject: 1,
          rejectMessage: data.rejectMessage,
        },
      });
    },
    [rData]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 컨택 내역</title>
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
              컨택 내역
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 16px`}>
              <Checkbox onClick={selectContactAllHandler}>전체 선택</Checkbox>
              <SpanText
                fontSize={`10px`}
                margin={`0 10px`}
                color={Theme.lightGrey_C}
              >
                |
              </SpanText>
              <Popconfirm
                title="삭제하시겠습니까?"
                okText="삭제"
                cancelText="취소"
                onConfirm={deleteContactHandler}
              >
                <Text isHover>삭제</Text>
              </Popconfirm>
            </Wrapper>
            {myBuyRequests &&
              (myBuyRequests.length === 0 ? (
                <Wrapper>
                  <Empty description="컨택 내역이 없습니다." />
                </Wrapper>
              ) : (
                myBuyRequests.map((data) => {
                  return (
                    <Box>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={width < 800 ? `100%` : `auto`}
                      >
                        {(data.type === 1 ||
                          data.type === 4 ||
                          data.type === 5) && (
                          <Checkbox
                            checked={selectContact.find(
                              (value) => value.id === data.id
                            )}
                            onClick={() => selectContactHandler(data)}
                          />
                        )}
                        <Wrapper
                          dr={`row`}
                          width={width < 800 ? `92%` : `auto`}
                        >
                          <Image
                            alt="thumbnail"
                            src={data.receptionProfileImage}
                            width={width < 800 ? `60px` : `100px`}
                            height={width < 800 ? `60px` : `100px`}
                            radius={`100%`}
                            margin={width < 800 ? `0 10px` : `0 22px`}
                          />
                          <Wrapper
                            width={width < 800 ? `calc(100% - 90px)` : `auto`}
                            al={`flex-start`}
                          >
                            <Text
                              fontSize={width < 900 ? `18px` : `22px`}
                              fontWeight={`600`}
                            >
                              {data.receptionNickname}
                            </Text>
                            <Text
                              fontSize={width < 900 ? `15px` : `18px`}
                              margin={`10px 0 15px`}
                            >
                              {data.subTitle}
                            </Text>
                            <Text color={Theme.grey_C}>
                              문의날짜 : {data.viewFrontCreatedAt}
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        width={width < 800 ? `100%` : `auto`}
                        margin={width < 800 ? `10px 0 0` : `0`}
                      >
                        {/**
                         *
                         * ---------------------- 조건 ------------------------- 내용 -- 타입 -- 회원타입
                         * isOk = 0, isReject = 0, isPay = 0, isCompleted = 0, 문의 완료  1      일반
                         * isOk = 1, isReject = 0, isPay = 0, isCompleted = 0, 문의 수락  2     아티스트
                         * isOk = 1, isReject = 0, isPay = 1, isCompleted = 0, 결제 완료  3      일반
                         * isOk = 1, isReject = 0, isPay = 1, isCompleted = 1, 제작 완료  4      일반
                         * isOk = 0, isReject = 1, isPay = 0, isCompleted = 0, 문의 거절  5     아티스트
                         *
                         */}

                        {data.type === 1 ? (
                          // 문의완료
                          <CommonButton
                            width={`83px`}
                            height={`35px`}
                            padding={`0`}
                            fontSize={`16px`}
                            fontWeight={`600`}
                            kindOf={`grey3`}
                            margin={`0 8px 0 0`}
                            onClick={() => contactToggle(data)}
                          >
                            문의 내역
                          </CommonButton>
                        ) : data.type === 2 ? (
                          // 문의수락
                          me && me.isArtist === "아티스트" ? (
                            <Wrapper
                              width={`83px`}
                              height={`35px`}
                              border={`1px solid ${Theme.lightGrey_C}`}
                              color={Theme.grey2_C}
                              fontSize={`16px`}
                              margin={`0 8px 0 0`}
                            >
                              결제 대기
                            </Wrapper>
                          ) : (
                            <CommonButton
                              width={`83px`}
                              height={`35px`}
                              padding={`0`}
                              fontSize={`16px`}
                              fontWeight={`600`}
                              kindOf={`subTheme2`}
                              margin={`0 8px 0 0`}
                              onClick={() => orderToggle(data)}
                            >
                              결제하기
                            </CommonButton>
                          )
                        ) : data.type === 3 ? (
                          // 결제완료
                          <CommonButton
                            width={`83px`}
                            height={`35px`}
                            padding={`0`}
                            fontSize={`16px`}
                            fontWeight={`600`}
                            kindOf={`grey3`}
                            margin={`0 8px 0 0`}
                          >
                            결제내역
                          </CommonButton>
                        ) : data.type === 4 ? (
                          // 제작완료
                          <>
                            <CommonButton
                              width={`175px`}
                              height={`35px`}
                              padding={`0`}
                              fontSize={`16px`}
                              fontWeight={`600`}
                              kindOf={`subTheme`}
                              margin={`0 8px 0 0`}
                            >
                              리뷰 남기고 포인트 받기
                            </CommonButton>
                            <CommonButton
                              width={`83px`}
                              height={`35px`}
                              padding={`0`}
                              fontSize={`16px`}
                              fontWeight={`600`}
                              kindOf={`subTheme2`}
                              margin={`0 8px 0 0`}
                            >
                              파일 확인
                            </CommonButton>
                          </>
                        ) : (
                          // 문의거절
                          <CommonButton
                            width={`83px`}
                            height={`35px`}
                            padding={`0`}
                            fontSize={`16px`}
                            fontWeight={`600`}
                            kindOf={`grey4`}
                            margin={`0 8px 0 0`}
                            onClick={() => rejectToggle(data)}
                          >
                            거절 사유
                          </CommonButton>
                        )}

                        <Wrapper
                          width={`83px`}
                          height={`35px`}
                          border={`1px solid ${Theme.lightGrey_C}`}
                          color={Theme.grey2_C}
                          fontSize={`16px`}
                        >
                          {data.viewType}
                        </Wrapper>
                      </Wrapper>
                    </Box>
                  );
                })
              ))}

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={myBuyRequestLastPage * 10}
              pageSize={10}
              onChange={(page) => pageChangeHandler(page)}
            />
          </RsWrapper>

          {/* 문의내역 상세 */}
          <Modal
            onCancel={() => contactToggle(null)}
            visible={contactModal}
            footer={null}
            width={`550px`}
          >
            <Form layout="inline" form={dForm}>
              <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
                <Text fontSize={`32px`} fontWeight={`bold`} margin={`0 0 24px`}>
                  문의 내역
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
                    <Form.Item name="endDate">
                      <CustomDatePicker
                        style={{ width: 200, height: 50 }}
                        disabled
                      />
                    </Form.Item>
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
                    <Form.Item name="totalPrice">
                      <TextInput
                        border={`1px solid ${Theme.lightGrey_C}`}
                        placeholder="최소 20만원"
                        width={`200px`}
                        height={`50px`}
                        type="number"
                        readOnly
                      />
                    </Form.Item>
                    &nbsp;원
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    내용
                  </Text>
                  <Form.Item style={{ width: `100%` }} name="sendMessage">
                    <TextArea
                      width={`100%`}
                      height={`75px`}
                      margin={`12px 0 30px`}
                      readOnly
                      placeholder="내용을 입력해주세요."
                    />
                  </Form.Item>
                </Wrapper>

                <Wrapper al={`flex-start`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    레퍼런스 첨부파일
                  </Text>
                  <FileWrapper
                    onClick={() => fileDownloadHandler(dData && dData)}
                  >
                    <Text fontSize={`16px`} isEllipsis>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/music-file.png`}
                        width={`14px`}
                        margin={`0 5px 0 0`}
                      />
                      {dData && dData.filename}
                    </Text>
                  </FileWrapper>

                  <Text color={Theme.grey_C}>
                    제작할 음악의 용도를 반드시 미리 고지해야 하며, 작업 완료 후
                    정식 앨범 출판 및 정식 앨범 출판 및 상업적 사용을 할 때에
                    안전한 저작궈느 크레딧 협의를 위해 반드시 New Wave Sound를
                    통하여 전문가, 의뢰인 협의 후 진행하실 수
                    있습니다.(nws0901@nwsound1.com)
                  </Text>
                </Wrapper>

                {me && me.isArtist === "아티스트" && (
                  <Wrapper dr={`row`}>
                    <CommonButton
                      width={width < 900 ? `150px` : `180px`}
                      height={`50px`}
                      fontSize={width < 900 ? `15px` : `18px`}
                      margin={`32px 8px 0 0`}
                      onClick={() => okToggle(dData && dData)}
                    >
                      컨택 수락
                    </CommonButton>
                    <CommonButton
                      kindOf={`subTheme`}
                      width={width < 900 ? `150px` : `180px`}
                      height={`50px`}
                      fontSize={width < 900 ? `15px` : `18px`}
                      margin={`32px 0 0`}
                      onClick={() => rejectToggle(dData && dData)}
                    >
                      컨택 거절
                    </CommonButton>
                  </Wrapper>
                )}
              </Wrapper>
            </Form>
          </Modal>

          {/* ISOK MODAL */}
          <Modal
            visible={okModal}
            onCancel={okToggle}
            footer={null}
            width={`550px`}
          >
            <Form form={oForm} onFinish={isOkHandler}>
              <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
                <Text fontSize={`32px`} fontWeight={`bold`} margin={`0 0 24px`}>
                  수락하기
                </Text>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="thumbnail"
                    src={oData && oData.receptionProfileImage}
                    width={`100px`}
                    height={`100px`}
                    radius={`100%`}
                    margin={`0 22px 0 0`}
                  />
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text
                      fontSize={width < 900 ? `18px` : `22px`}
                      fontWeight={`600`}
                    >
                      {oData && oData.receptionNickname}
                    </Text>
                    <Text
                      fontSize={width < 900 ? `15px` : `18px`}
                      margin={`10px 0 15px`}
                    >
                      {oData && oData.subTitle}
                    </Text>
                    <Text color={Theme.grey_C}>
                      문의날짜 : {oData && oData.viewFrontCreatedAt}
                    </Text>
                  </Wrapper>
                </Wrapper>

                <Wrapper al={`flex-start`} margin={`34px 0 0`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    제작자의 의견
                  </Text>
                  <Form.Item style={{ width: `100%` }} name="okMessage">
                    <TextArea
                      width={`100%`}
                      height={`75px`}
                      margin={`12px 0 0`}
                      readOnly={dData && dData.isReject}
                      placeholder="제작자의 의견을 입력해주세요."
                    />
                  </Form.Item>
                </Wrapper>

                <Wrapper dr={`row`} margin={`34px 0 0`}>
                  <CommonButton
                    width={width < 900 ? `150px` : `180px`}
                    height={`50px`}
                    fontSize={width < 900 ? `15px` : `18px`}
                    kindOf={`subTheme`}
                    margin={`0 8px 0 0`}
                    htmlType="submit"
                    loading={st_buyRequestIsOkLoading}
                  >
                    수락
                  </CommonButton>
                  <CommonButton
                    width={width < 900 ? `150px` : `180px`}
                    height={`50px`}
                    fontSize={width < 900 ? `15px` : `18px`}
                    onClick={() => okToggle(null)}
                  >
                    취소
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Form>
          </Modal>

          {/* REJECT MODAL */}
          <Modal
            onCancel={() => rejectToggle(null)}
            visible={rejectModal}
            footer={null}
            width={`550px`}
          >
            <Form form={rForm} onFinish={isRejectHandler}>
              <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
                <Text fontSize={`32px`} fontWeight={`bold`} margin={`0 0 24px`}>
                  거절사유
                </Text>

                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="thumbnail"
                    src={rData && rData.receptionProfileImage}
                    width={`100px`}
                    height={`100px`}
                    radius={`100%`}
                    margin={`0 22px 0 0`}
                  />
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text
                      fontSize={width < 900 ? `18px` : `22px`}
                      fontWeight={`600`}
                    >
                      {rData && rData.receptionNickname}
                    </Text>
                    <Text
                      fontSize={width < 900 ? `15px` : `18px`}
                      margin={`10px 0 15px`}
                    >
                      {rData && rData.subTitle}
                    </Text>
                    <Text color={Theme.grey_C}>
                      문의날짜 : {rData && rData.viewFrontCreatedAt}
                    </Text>
                  </Wrapper>
                </Wrapper>

                <Wrapper al={`flex-start`} margin={`34px 0 0`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    제작자의 답변
                  </Text>
                  <Form.Item
                    style={{ width: `100%` }}
                    name="rejectMessage"
                    rules={[
                      { required: true, message: "답변을 입력해주세요." },
                    ]}
                  >
                    <TextArea
                      width={`100%`}
                      height={`75px`}
                      margin={`12px 0 0`}
                      readOnly={rData && rData.isReject}
                      placeholder="제작자의 답변을 입력해주세요."
                    />
                  </Form.Item>
                </Wrapper>
                <Text color={Theme.grey_C}>
                  문의하신 내용과 제작자의 의견이 맞지 않아 거절되는 경우 다시
                  문의해주셔야 합니다. 다시 문의할 경우 이전의 문의 내용이
                  옮겨가지 않으므로 원하는 문의 내용을 전부 적어주셔야 합니다.
                </Text>

                <Wrapper dr={`row`} margin={`34px 0 0`}>
                  {rData && rData.isReject ? (
                    me &&
                    me.isArtist === "일반" && (
                      <>
                        <CommonButton
                          width={width < 900 ? `150px` : `180px`}
                          height={`50px`}
                          fontSize={width < 900 ? `15px` : `18px`}
                          kindOf={`subTheme`}
                          margin={`0 8px 0 0`}
                        >
                          다른 아티스트보기
                        </CommonButton>
                        <CommonButton
                          width={width < 900 ? `150px` : `180px`}
                          height={`50px`}
                          fontSize={width < 900 ? `15px` : `18px`}
                        >
                          다시 컨택하기
                        </CommonButton>
                      </>
                    )
                  ) : (
                    <>
                      <CommonButton
                        width={width < 900 ? `150px` : `180px`}
                        height={`50px`}
                        fontSize={width < 900 ? `15px` : `18px`}
                        kindOf={`subTheme`}
                        margin={`0 8px 0 0`}
                        htmlType="submit"
                        loading={st_buyRequestIsRejectLoading}
                      >
                        거절
                      </CommonButton>
                      <CommonButton
                        width={width < 900 ? `150px` : `180px`}
                        height={`50px`}
                        fontSize={width < 900 ? `15px` : `18px`}
                        onClick={() => rejectToggle(null)}
                      >
                        취소
                      </CommonButton>
                    </>
                  )}
                </Wrapper>
              </Wrapper>
            </Form>
          </Modal>

          <Modal
            onCancel={orderToggle}
            visible={orderModal}
            footer={null}
            width={`550px`}
          >
            <Form form={orderForm} layout="inline">
              <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
                <Text fontSize={`32px`} fontWeight={`bold`} margin={`0 0 24px`}>
                  결제하기
                </Text>

                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="thumbnail"
                    src={orderData && orderData.receptionProfileImage}
                    width={`100px`}
                    height={`100px`}
                    radius={`100%`}
                    margin={`0 22px 0 0`}
                  />
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text
                      fontSize={width < 900 ? `18px` : `22px`}
                      fontWeight={`600`}
                    >
                      {orderData && orderData.receptionNickname}
                    </Text>
                    <Text
                      fontSize={width < 900 ? `15px` : `18px`}
                      margin={`10px 0 15px`}
                    >
                      "아티스트를 소개하는 한 마디"
                    </Text>
                    <Text color={Theme.grey_C}>문의날짜 : 2022.11.25</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`} margin={`34px 0 0`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    제출 마감일
                  </Text>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={`16px`}
                    margin={`12px 0 30px`}
                  >
                    <Form.Item name="endDate">
                      <CustomDatePicker
                        disabled
                        style={{ width: 200, height: 50 }}
                      />
                    </Form.Item>
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
                    <Form.Item name="totalPrice">
                      <TextInput
                        type="text"
                        readOnly
                        width={`200px`}
                        height={`50px`}
                      />
                    </Form.Item>
                    &nbsp;원
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    제작자의 의견
                  </Text>
                  <Form.Item name="okMessage" style={{ width: `100%` }}>
                    <TextArea
                      width={`100%`}
                      height={`75px`}
                      margin={`12px 0 30px`}
                      readOnly
                    />
                  </Form.Item>

                  <Text color={Theme.grey_C}>
                    제작할 음악의 용도를 반드시 미리 고지해야 하며, 작업 완료 후
                    정식 앨범 출판 및 정식 앨범 출판 및 상업적 사용을 할 때에
                    안전한 저작궈느 크레딧 협의를 위해 반드시 New Wave Sound를
                    통하여 전문가, 의뢰인 협의 후 진행하실 수
                    있습니다.(nws0901@nwsound1.com)
                  </Text>
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-between`} margin={`34px 0 0`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    결제금액
                  </Text>
                  <Text fontSize={`24px`}>
                    <SpanText fontWeight={`bold`} color={Theme.basicTheme_C}>
                      {orderData && orderData.viewTotalPrice}
                    </SpanText>
                  </Text>
                </Wrapper>

                <Wrapper dr={`row`} margin={`34px 0 0`}>
                  <CommonButton
                    width={width < 900 ? `150px` : `180px`}
                    height={`50px`}
                    fontSize={width < 900 ? `15px` : `18px`}
                    kindOf={`subTheme`}
                    margin={`0 8px 0 0`}
                    onClick={orderToggle}
                  >
                    컨택 내역
                  </CommonButton>
                  <CommonButton
                    width={width < 900 ? `150px` : `180px`}
                    height={`50px`}
                    fontSize={width < 900 ? `15px` : `18px`}
                  >
                    결제하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Form>
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
