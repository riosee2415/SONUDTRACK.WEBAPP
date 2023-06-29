import React, { useCallback, useEffect, useRef, useState } from "react";
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
import moment from "moment";
import { saveAs } from "file-saver";
import {
  ARTIST_CONTACT_DELETE_REQUEST,
  ARTIST_CONTACT_FILE_REQUEST,
  ARTIST_CONTACT_LIST_REQUEST,
  ARTIST_CONTACT_MY_LIST_REQUEST,
  ARTIST_CONTACT_PAYMENT_REQUEST,
  ARTIST_CONTACT_PERMIT_REQUEST,
  ARTIST_CONTACT_REJECT_REQUEST,
  ARTIST_CONTACT_RESET,
  ARTIST_CONTACT_SEND_REQUEST,
} from "../../reducers/artistContact";
import { CloseOutlined } from "@ant-design/icons";

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
    artistContactMyList,
    artistContactMyPage,

    artistContactList,
    artistContactPage,

    st_artistContactPermitLoading,
    st_artistContactPermitDone,
    st_artistContactPermitError,

    st_artistContactRejectLoading,
    st_artistContactRejectDone,
    st_artistContactRejectError,

    st_artistContactDeleteLoading,
    st_artistContactDeleteDone,
    st_artistContactDeleteError,

    st_artistContactPaymentDone,
    st_artistContactPaymentError,

    artistContactFile,
    st_artistContactFileLoading,

    st_artistContactSendDone,
    st_artistContactSendError,
  } = useSelector((state) => state.artistContact);

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

  // 작업물
  const [sendForm] = Form.useForm();

  const [myCurrentPage, setMyCurrentPage] = useState(1); // 내가 보낸거
  const [currentPage, setCurrentPage] = useState(1); // 내가 받은거

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

  // 작업물 모달
  const [sData, setSData] = useState(null);
  const [sendModal, setSendModal] = useState(false);
  const [fileName, setFileName] = useState(``); // 파일이름
  const [terms, setTerms] = useState(false); // 동의

  const fileRef = useRef();

  const [mySelectContact, setMySelectContact] = useState([]); //내가 보낸 문의 선택
  const [selectContact, setSelectContact] = useState([]); //내가 받은 문의 선택

  const [currentTab, setCurrentTab] = useState(1); // 1:구매 2:판매
  const [myAllCehck, setMyAllCheck] = useState(false); // 내가 보낸 문의 전체 삭제 체크
  const [allCehck, setAllCheck] = useState(false); // 내가 받은 문의 전체 삭제 체크

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
    if (me) {
      // 문의 받은 내역
      dispatch({
        type: ARTIST_CONTACT_LIST_REQUEST,
        data: {
          page: currentPage,
        },
      });
      // 문의 보낸 내역
      dispatch({
        type: ARTIST_CONTACT_MY_LIST_REQUEST,
        data: {
          page: myCurrentPage,
        },
      });
    }
  }, [me, currentPage, myCurrentPage]);

  // 삭제 후처리
  useEffect(() => {
    if (st_artistContactDeleteDone) {
      dispatch({
        type: ARTIST_CONTACT_LIST_REQUEST,
        data: {
          page: currentPage,
        },
      });

      dispatch({
        type: ARTIST_CONTACT_MY_LIST_REQUEST,
        data: {
          page: myCurrentPage,
        },
      });

      setMySelectContact([]);
      setSelectContact([]);

      return message.success("삭제되었습니다.");
    }
    if (st_artistContactDeleteError) {
      return message.error(st_artistContactDeleteError);
    }
  }, [st_artistContactDeleteDone, st_artistContactDeleteError]);

  // 수락 후 처리
  useEffect(() => {
    if (st_artistContactPermitDone) {
      dispatch({
        type: ARTIST_CONTACT_LIST_REQUEST,
        data: {
          page: currentPage,
        },
      });

      contactToggle(null);
      okToggle(null);

      return message.success("수락되었습니다.");
    }
    if (st_artistContactPermitError) {
      return message.error(st_artistContactPermitError);
    }
  }, [st_artistContactPermitDone, st_artistContactPermitError]);

  // 거절 후 처리
  useEffect(() => {
    if (st_artistContactRejectDone) {
      dispatch({
        type: ARTIST_CONTACT_LIST_REQUEST,
        data: {
          page: currentPage,
        },
      });

      contactToggle(null);
      rejectToggle(null);

      return message.success("거절되었습니다.");
    }
    if (st_artistContactRejectError) {
      return message.error(st_artistContactRejectError);
    }
  }, [st_artistContactRejectDone, st_artistContactRejectError]);

  // 결제 후처리
  useEffect(() => {
    if (st_artistContactPaymentDone) {
      dispatch({
        type: ARTIST_CONTACT_MY_LIST_REQUEST,
        data: {
          page: myCurrentPage,
        },
      });

      orderToggle(null);

      return message.success("결제완료 되었습니다.");
    }
    if (st_artistContactPaymentError) {
      return message.error(st_artistContactPaymentError);
    }
  }, [st_artistContactPaymentDone, st_artistContactPaymentError]);

  // 작업물 전송 후처리
  useEffect(() => {
    if (st_artistContactSendDone) {
      dispatch({
        type: ARTIST_CONTACT_LIST_REQUEST,
        data: {
          page: currentPage,
        },
      });

      dispatch({
        type: ARTIST_CONTACT_RESET,
      });

      sendToggle(null);

      return message.success("작업물 전송이 완료되었습니다.");
    }
    if (st_artistContactSendError) {
      return message.error(st_artistContactSendError);
    }
  }, [st_artistContactSendDone, st_artistContactSendError]);

  useEffect(() => {
    if (artistContactMyList.length === 0) {
      setMyAllCheck(false);
    }

    if (artistContactMyList.length !== 0) {
      if (artistContactMyList.length === mySelectContact.length) {
        setMyAllCheck(true);
      }
    }

    if (artistContactList.length === 0) {
      setAllCheck(false);
    }
    if (artistContactList.length !== 0) {
      if (artistContactList.length === selectContact.length) {
        setAllCheck(true);
      }
    }
  }, [artistContactMyList, artistContactList, mySelectContact, selectContact]);

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
          endDate: moment(data.endDate),
          totalPrice: data.totalPrice,
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

  // 작업물 모달
  const sendToggle = useCallback(
    (data) => {
      if (data) {
        setSData(data);
        sendForm.setFieldsValue({
          endDate: moment(data.endDate),
        });
      } else {
        setSData(null);
        sendForm.resetFields();
      }
      setSendModal((prev) => !prev);
    },
    [sendModal]
  );

  ////// HANDLER //////

  // 내가 받은거 페이지 변경
  const pageChangeHandler = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  // 내가 보낸거 페이지 변경
  const myPageChangeHandler = useCallback(
    (page) => {
      setMyCurrentPage(page);
    },
    [myCurrentPage]
  );

  // 파일 다운로드
  const fileDownloadHandler = useCallback(async (filepath, filename) => {
    let blob = await fetch(filepath).then((r) => r.blob());

    const file = new Blob([blob]);

    const originName = `${filename}`;

    saveAs(file, originName);
  }, []);

  // 삭제하기 내역 선택
  const selectContactHandler = useCallback(
    (type) => {
      if (currentTab === 1) {
        const index = mySelectContact.indexOf(type.id);
        let tempArr = mySelectContact.map((data) => data);

        if (index !== -1) {
          tempArr = tempArr.filter((data) => data !== type.id);
        } else {
          tempArr.push(type.id);
        }

        setMySelectContact(tempArr);
      }

      if (currentTab === 2) {
        const index = selectContact.indexOf(type.id);
        let tempArr = selectContact.map((data) => data);

        if (index !== -1) {
          tempArr = tempArr.filter((data) => data !== type.id);
        } else {
          tempArr.push(type.id);
        }

        setSelectContact(tempArr);
      }
    },
    [selectContact, mySelectContact, currentTab]
  );

  // 삭제하기 내역 전체 선택
  const selectContactAllHandler = useCallback(() => {
    if (currentTab === 1) {
      if (artistContactMyList) {
        let tempArr = [];
        artistContactMyList.map((data) => {
          tempArr.push(data.id);
        });
        setMySelectContact(tempArr);
      }
      if (artistContactMyList.length === mySelectContact.length) {
        setMySelectContact([]);
      }
    }

    if (currentTab === 2) {
      if (artistContactList) {
        let tempArr = [];
        artistContactList.map((data) => {
          tempArr.push(data.id);
        });
        setSelectContact(tempArr);
      }
      if (artistContactList.length === selectContact.length) {
        setSelectContact([]);
      }
    }
  }, [
    artistContactMyList,
    mySelectContact,
    artistContactList,
    selectContact,
    currentTab,
  ]);

  // 삭제하기
  const deleteContactHandler = useCallback(() => {
    if (currentTab === 1) {
      if (st_artistContactDeleteLoading) {
        return message.error("삭제중입니다...");
      }

      if (mySelectContact.length === 0) {
        return message.error("문의를 하나이상 선택해주세요.");
      }

      dispatch({
        type: ARTIST_CONTACT_DELETE_REQUEST,
        data: {
          idArr: mySelectContact,
        },
      });
    }

    if (currentTab === 2) {
      if (st_artistContactDeleteLoading) {
        return message.error("삭제중입니다...");
      }

      if (selectContact.length === 0) {
        return message.error("문의를 하나이상 선택해주세요.");
      }

      dispatch({
        type: ARTIST_CONTACT_DELETE_REQUEST,
        data: {
          idArr: selectContact,
        },
      });
    }
  }, [
    st_artistContactDeleteLoading,
    selectContact,
    mySelectContact,
    currentTab,
  ]);

  // 수락하기
  const isOkHandler = useCallback(
    (data) => {
      dispatch({
        type: ARTIST_CONTACT_PERMIT_REQUEST,
        data: {
          id: oData.id,
          isOk: 1,
          okMessage: data.okMessage ? data.okMessage : "",
        },
      });
    },
    [oData]
  );

  // 거절하기
  const isRejectHandler = useCallback(
    (data) => {
      dispatch({
        type: ARTIST_CONTACT_REJECT_REQUEST,
        data: {
          id: rData.id,
          isReject: 1,
          rejectMessage: data.rejectMessage,
        },
      });
    },
    [rData]
  );

  // 결제하기
  const buyHandler = useCallback(() => {
    if (!orderData) {
      return message.error("잠시후 다시 시도해주세요.");
    }

    const orderPK = "ORD" + moment().format("YYYYMMDDHHmmssms");

    IMP.init("imp61303582");

    IMP.request_pay(
      {
        pg: `danal_tpay.9810030929`,
        pay_method: "card",
        merchant_uid: orderPK,
        name: "컨택결제",
        buyer_name: me.username,
        biz_num: me.mobile,
        amount: orderData.totalPrice,
      },
      async (rsp) => {
        if (rsp.success) {
          dispatch({
            type: ARTIST_CONTACT_PAYMENT_REQUEST,
            data: {
              id: orderData.id,
              payPrice: rsp.paid_amount,
              payWay: "신용카드",
              impUid: rsp.imp_uid,
              merchantUid: rsp.merchant_uid,
              payCardInfo: rsp.card_name,
              usePointPrice: orderData.usePointPrice,
            },
          });
        } else {
          return message.error(rsp.error_msg);
        }
      }
    );
  }, [orderData, me]);

  // 파일 리셋
  const fileResetHandler = useCallback(() => {
    dispatch({
      type: ARTIST_CONTACT_RESET,
    });
  }, []);

  // 파일 선택
  const fileClickHandler = useCallback(() => {
    fileRef.current.click();
  }, [fileRef]);

  // 파일 업로드
  const onChangeImages = useCallback((e) => {
    if (e.target.files.length < 1) {
      return;
    }

    setFileName(e.target.files[0].name);
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("file", file);
    });

    dispatch({
      type: ARTIST_CONTACT_FILE_REQUEST,
      data: formData,
    });
  }, []);

  const sendHandler = useCallback(() => {
    if (!artistContactFile) {
      return message.error("작업물을 첨부해주세요.");
    }

    if (!terms) {
      return message.error("개인정보 처리방침에 동의해주세요.");
    }

    dispatch({
      type: ARTIST_CONTACT_SEND_REQUEST,
      data: {
        id: sData.id,
        completedFilename: fileName,
        completedFilepath: artistContactFile,
      },
    });
  }, [artistContactFile, fileName, terms, sData]);

  ////// DATAVIEW //////
  console.log(me);

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
            >
              컨택 내역
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`40px 0 30px`}>
              <CommonButton
                width={"250px"}
                height={`55px`}
                fontSize={`18px`}
                margin={`0 20px 0 0`}
                kindOf={currentTab === 1 ? `subTheme2` : `grey3`}
                onClick={() => {
                  setCurrentTab(1);
                  setSelectContact([]);
                  setAllCheck(false);
                }}
              >
                구매
              </CommonButton>
              {me && me.type === 2 && (
                <CommonButton
                  width={"250px"}
                  height={`55px`}
                  fontSize={`18px`}
                  kindOf={currentTab === 2 ? `subTheme2` : `grey3`}
                  onClick={() => {
                    setCurrentTab(2);
                    setMySelectContact([]);
                    setMyAllCheck(false);
                  }}
                >
                  판매
                </CommonButton>
              )}
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 16px`}>
              <Checkbox
                checked={
                  currentTab === 1
                    ? (artistContactMyList && artistContactMyList.length) ===
                        (mySelectContact && mySelectContact.length) &&
                      myAllCehck
                    : (artistContactList && artistContactList.length) ===
                        (selectContact && selectContact.length) && allCehck
                }
                onClick={selectContactAllHandler}
              >
                전체 선택
              </Checkbox>
              <SpanText
                fontSize={`10px`}
                margin={`0 10px`}
                color={Theme.lightGrey_C}
              >
                |
              </SpanText>

              <Text isHover onClick={deleteContactHandler}>
                삭제
              </Text>
            </Wrapper>

            {/* 구매 */}
            {currentTab === 1 && (
              <>
                {artistContactMyList &&
                  (artistContactMyList.length === 0 ? (
                    <Wrapper>
                      <Empty description="컨택 내역이 없습니다." />
                    </Wrapper>
                  ) : (
                    artistContactMyList.map((data) => {
                      return (
                        <Box key={data.id}>
                          <Wrapper
                            dr={`row`}
                            ju={`flex-start`}
                            width={width < 800 ? `100%` : `auto`}
                          >
                            <Checkbox
                              checked={mySelectContact.includes(data.id)}
                              onClick={() => selectContactHandler(data)}
                            />
                            <Wrapper
                              dr={`row`}
                              width={width < 800 ? `92%` : `auto`}
                            >
                              <Image
                                alt="thumbnail"
                                src={data.artistProfileImage}
                                width={width < 800 ? `60px` : `100px`}
                                height={width < 800 ? `60px` : `100px`}
                                radius={`100%`}
                                margin={width < 800 ? `0 10px` : `0 22px`}
                              />
                              <Wrapper
                                width={
                                  width < 800 ? `calc(100% - 90px)` : `auto`
                                }
                                al={`flex-start`}
                              >
                                <Text
                                  fontSize={width < 900 ? `18px` : `22px`}
                                  fontWeight={`600`}
                                >
                                  {data.artistName}
                                </Text>
                                <Text
                                  fontSize={width < 900 ? `15px` : `18px`}
                                  margin={`10px 0 15px`}
                                >
                                  "{data.artistInfo}"
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
                                kindOf={`grey3`}
                                margin={`0 8px 0 0`}
                                onClick={() => contactToggle(data)}
                              >
                                문의 내역
                              </CommonButton>
                            ) : data.type === 2 ? (
                              // 문의수락
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
                            ) : data.type === 3 ? (
                              // 결제완료
                              <CommonButton
                                width={`83px`}
                                height={`35px`}
                                padding={`0`}
                                fontSize={`16px`}
                                kindOf={`grey3`}
                                margin={`0 8px 0 0`}
                                onClick={() => router.push("/mypage/order")}
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
                                  onClick={() =>
                                    fileDownloadHandler(
                                      data.completedFilepath,
                                      data.completedFilename
                                    )
                                  }
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
                  current={parseInt(myCurrentPage)}
                  total={artistContactMyPage * 10}
                  pageSize={10}
                  onChange={(page) => myPageChangeHandler(page)}
                />
              </>
            )}

            {/* 판매 */}
            {currentTab === 2 && (
              <>
                {artistContactList &&
                  (artistContactList.length === 0 ? (
                    <Wrapper>
                      <Empty description="나에게 온 컨택 내역이 없습니다." />
                    </Wrapper>
                  ) : (
                    artistContactList.map((data) => {
                      return (
                        <Box key={data.id}>
                          <Wrapper
                            dr={`row`}
                            ju={`flex-start`}
                            width={width < 800 ? `100%` : `auto`}
                          >
                            <Checkbox
                              checked={selectContact.includes(data.id)}
                              onClick={() => selectContactHandler(data)}
                            />
                            <Wrapper
                              dr={`row`}
                              width={width < 800 ? `92%` : `auto`}
                            >
                              <Wrapper
                                width={
                                  width < 800 ? `calc(100% - 90px)` : `auto`
                                }
                                margin={width < 800 ? `0 10px` : `0 22px`}
                                al={`flex-start`}
                              >
                                <Text fontSize={width < 900 ? `18px` : `22px`}>
                                  <SpanText fontWeight={`600`}>
                                    '{data.requestUsername}'
                                  </SpanText>
                                  님이 신청한 문의
                                </Text>
                                <Text color={Theme.grey_C}>
                                  문의날짜 : {data.viewFrontCreatedAt}
                                </Text>
                                {data.type === 1 && (
                                  <Text
                                    fontSize={width < 900 ? `15px` : `18px`}
                                    margin={`10px 0 15px`}
                                  >
                                    답변마감일 :&nbsp;
                                    <SpanText color={Theme.basicTheme_C}>
                                      {data.dateCnt > 0 ? data.dateCnt : 0}
                                      일&nbsp;
                                    </SpanText>
                                    안에 답변을 보내주세요.
                                  </Text>
                                )}
                                {data.type === 3 && (
                                  <Text
                                    fontSize={width < 900 ? `15px` : `18px`}
                                    margin={`10px 0 15px`}
                                  >
                                    제출마감일 :&nbsp;
                                    <SpanText color={Theme.basicTheme_C}>
                                      {data.dateCnt}일&nbsp;
                                    </SpanText>
                                    안에 작업물을 보내주세요!
                                  </Text>
                                )}
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
                                kindOf={`subTheme2`}
                                margin={`0 8px 0 0`}
                                onClick={() => contactToggle(data)}
                              >
                                문의 확인
                              </CommonButton>
                            ) : data.type === 2 ? (
                              // 문의수락

                              <Wrapper
                                width={`83px`}
                                height={`35px`}
                                border={`1px solid ${Theme.lightGrey2_C}`}
                                bgColor={Theme.lightGrey2_C}
                                color={Theme.grey_C}
                                fontSize={`16px`}
                                margin={`0 8px 0 0`}
                              >
                                결제 대기
                              </Wrapper>
                            ) : data.type === 3 ? (
                              // 결제완료
                              <>
                                <CommonButton
                                  width={`100px`}
                                  height={`35px`}
                                  padding={`0`}
                                  fontSize={`16px`}
                                  fontWeight={`600`}
                                  kindOf={`subTheme`}
                                  margin={`0 8px 0 0`}
                                  onClick={() => sendToggle(data)}
                                >
                                  작업물 전송
                                </CommonButton>
                                <CommonButton
                                  width={`83px`}
                                  height={`35px`}
                                  padding={`0`}
                                  fontSize={`16px`}
                                  fontWeight={`600`}
                                  kindOf={`subTheme2`}
                                  margin={`0 8px 0 0`}
                                  onClick={() => contactToggle(data)}
                                >
                                  문의 상세
                                </CommonButton>
                              </>
                            ) : data.type === 4 ? (
                              // 제작완료
                              <>
                                <CommonButton
                                  width={`100px`}
                                  height={`35px`}
                                  padding={`0`}
                                  fontSize={`16px`}
                                  kindOf={`grey3`}
                                  margin={`0 8px 0 0`}
                                  onClick={() => sendToggle(data)}
                                >
                                  작업물 확인
                                </CommonButton>
                                <CommonButton
                                  width={`83px`}
                                  height={`35px`}
                                  padding={`0`}
                                  fontSize={`16px`}
                                  fontWeight={`600`}
                                  kindOf={`subTheme2`}
                                  margin={`0 8px 0 0`}
                                  onClick={() => contactToggle(data)}
                                >
                                  문의 상세
                                </CommonButton>
                              </>
                            ) : (
                              // 문의거절
                              <CommonButton
                                width={`83px`}
                                height={`35px`}
                                padding={`0`}
                                fontSize={`16px`}
                                kindOf={`grey3`}
                                margin={`0 8px 0 0`}
                                onClick={() => rejectToggle(data)}
                              >
                                사유 상세
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
                  total={artistContactPage * 10}
                  pageSize={10}
                  onChange={(page) => pageChangeHandler(page)}
                />
              </>
            )}
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
                    onClick={() =>
                      fileDownloadHandler(
                        dData && dData.filepath,
                        dData && dData.filename
                      )
                    }
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

                {(me && me.username) !== (dData && dData.requestUsername) &&
                  dData &&
                  dData.type === 1 && (
                    <Wrapper dr={`row`}>
                      <CommonButton
                        width={width < 900 ? `150px` : `180px`}
                        height={`50px`}
                        fontSize={width < 900 ? `15px` : `18px`}
                        margin={`32px 8px 0 0`}
                        onClick={() => okToggle(dData && dData)}
                      >
                        수락
                      </CommonButton>
                      <CommonButton
                        kindOf={`subTheme`}
                        width={width < 900 ? `150px` : `180px`}
                        height={`50px`}
                        fontSize={width < 900 ? `15px` : `18px`}
                        margin={`32px 0 0`}
                        onClick={() => rejectToggle(dData && dData)}
                      >
                        거절
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
                <Text
                  fontSize={`32px`}
                  fontWeight={`bold`}
                  color={Theme.basicTheme_C}
                >
                  수락하기
                </Text>

                <Wrapper
                  bgColor={Theme.subTheme_C}
                  height={`50px`}
                  margin={`25px 0`}
                  fontSize={`16px`}
                >
                  문의 제작을 수락 이후 취소는 불가능합니다.
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="thumbnail"
                    src={oData && oData.requestUserProfileImage}
                    width={`100px`}
                    height={`100px`}
                    radius={`100%`}
                    margin={`0 22px 0 0`}
                  />
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text fontSize={width < 900 ? `18px` : `22px`}>
                      <SpanText fontWeight={`600`}>
                        '{oData && oData.requestUsername}'
                      </SpanText>
                      님이 신청한 문의
                    </Text>
                    <Text color={Theme.grey_C}>
                      문의날짜 : {oData && oData.viewFrontCreatedAt}
                    </Text>
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
                    margin={`12px 0 20px`}
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
                    margin={`12px 0 20px`}
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
                    loading={st_artistContactPermitLoading}
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
                <Text
                  fontSize={`32px`}
                  fontWeight={`bold`}
                  color={Theme.basicTheme_C}
                >
                  거절사유
                </Text>

                <Wrapper
                  bgColor={Theme.subTheme_C}
                  height={`50px`}
                  margin={`25px 0`}
                  fontSize={`16px`}
                >
                  문의를 거절한 이후 문의자는 다시 문의를 작성해야합니다.
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="thumbnail"
                    src={rData && rData.requestUserProfileImage}
                    width={`100px`}
                    height={`100px`}
                    radius={`100%`}
                    margin={`0 22px 0 0`}
                  />
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text fontSize={width < 900 ? `18px` : `22px`}>
                      <SpanText fontWeight={`600`}>
                        '{rData && rData.requestUsername}'
                      </SpanText>
                      님이 신청한 문의
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
                    <>
                      {/* <CommonButton
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
                      </CommonButton> */}
                    </>
                  ) : (
                    <>
                      <CommonButton
                        width={width < 900 ? `150px` : `180px`}
                        height={`50px`}
                        fontSize={width < 900 ? `15px` : `18px`}
                        kindOf={`subTheme`}
                        margin={`0 8px 0 0`}
                        htmlType="submit"
                        loading={st_artistContactRejectLoading}
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
                    src={orderData && orderData.artistProfileImage}
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
                      {orderData && orderData.artistName}
                    </Text>
                    <Text
                      fontSize={width < 900 ? `15px` : `18px`}
                      margin={`10px 0 15px`}
                    >
                      "{orderData && orderData.artistInfo}"
                    </Text>
                    <Text color={Theme.grey_C}>
                      문의날짜 : {orderData && orderData.viewFrontCreatedAt}
                    </Text>
                  </Wrapper>
                </Wrapper>

                <Wrapper al={`flex-start`} margin={`34px 0 0`}>
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
                    onClick={buyHandler}
                  >
                    결제하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Form>
          </Modal>

          {/* SEND MODAL */}
          <Modal
            visible={sendModal}
            onCancel={() => sendToggle(null)}
            footer={null}
            width={`550px`}
          >
            <Form form={sendForm} onFinish={sendHandler}>
              <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
                <Text
                  fontSize={`32px`}
                  fontWeight={`bold`}
                  color={Theme.basicTheme_C}
                >
                  작업물 전송
                </Text>

                <Wrapper
                  bgColor={Theme.subTheme_C}
                  height={`50px`}
                  margin={`25px 0`}
                  fontSize={`16px`}
                >
                  작업물 전송 후 다시 작업물을 보낼 수 없습니다.
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Image
                    alt="thumbnail"
                    src={sData && sData.requestUserProfileImage}
                    width={`100px`}
                    height={`100px`}
                    radius={`100%`}
                    margin={`0 22px 0 0`}
                  />
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text fontSize={width < 900 ? `18px` : `22px`}>
                      <SpanText fontWeight={`600`}>
                        '{sData && sData.requestUsername}'
                      </SpanText>
                      님이 신청한 문의
                    </Text>
                    <Text color={Theme.grey_C}>
                      문의날짜 : {sData && sData.viewFrontCreatedAt}
                    </Text>
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
                    margin={`12px 0 20px`}
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
                    결과물 첨부
                  </Text>

                  {sData && sData.completedFilepath ? (
                    <FileWrapper
                      margin={`12px 0 10px`}
                      onClick={() =>
                        fileDownloadHandler(
                          sData.completedFilepath,
                          sData.completedFilename
                        )
                      }
                    >
                      <Text fontSize={`16px`} isEllipsis>
                        <Image
                          alt="icon"
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/music-file.png`}
                          width={`14px`}
                          margin={`0 5px 0 0`}
                        />
                        {sData && sData.completedFilename}
                      </Text>
                    </FileWrapper>
                  ) : (
                    <>
                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`12px 0 10px`}
                      >
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
                          fontWeight={`600`}
                          onClick={fileClickHandler}
                        >
                          파일등록
                        </CommonButton>
                      </Wrapper>

                      {artistContactFile && fileName && (
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
                    </>
                  )}

                  {sData && sData.type === 3 && (
                    <Checkbox
                      style={{ marginTop: `20px` }}
                      checked={terms}
                      onChange={() => setTerms(!terms)}
                    >
                      (필수)개인정보 처리방침에 동의합니다.
                    </Checkbox>
                  )}
                </Wrapper>

                {sData && sData.type === 3 && (
                  <Wrapper dr={`row`} margin={`34px 0 0`}>
                    <CommonButton
                      width={width < 900 ? `150px` : `180px`}
                      height={`50px`}
                      fontSize={width < 900 ? `15px` : `18px`}
                      loading={st_artistContactFileLoading}
                      htmlType="submit"
                    >
                      전송하기
                    </CommonButton>
                  </Wrapper>
                )}
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
