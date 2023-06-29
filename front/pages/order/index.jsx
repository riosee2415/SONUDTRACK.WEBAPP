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
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Checkbox, message, Radio } from "antd";
import { useRouter } from "next/router";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  BOUGHT_CREATE_REQUEST,
  ITEM_DELETE_REQUEST,
} from "../../reducers/bought";

const Intro = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { st_boughtCreateDone, st_boughtCreateError } = useSelector(
    (state) => state.bought
  );

  const [payType, setPayType] = useState("card");

  const [orderData, setOrderData] = useState(null); // 세션 저장값

  const [isTerms1, setIsTerms1] = useState(false); // 개인정보 수집·이용 및 처리 동의
  const [isTerms2, setIsTerms2] = useState(false); // 개인정보 제3자 제공 동의
  const [isTerms3, setIsTerms3] = useState(false); // 결제대행 서비스 약관 동의
  const [isTerms4, setIsTerms4] = useState(false); // 전자지급 결제대행 서비스 이용약관 동의

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const pointInput = useInput(0);

  // card
  // paypal
  // phone
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
    if (router && router.query) {
      window.scrollTo(0, 0);
    }
  }, [router.query]);

  useEffect(() => {
    const data = sessionStorage.getItem("ORDER")
      ? JSON.parse(sessionStorage.getItem("ORDER"))
      : null;

    if (data) {
      setOrderData(data);
    } else {
      setOrderData(data);
    }
  }, []);

  useEffect(() => {
    if (st_boughtCreateDone) {
      let tempArr = [];

      orderData &&
        orderData.items.map((data) => {
          tempArr.push(data.id);
        });

      dispatch({
        type: ITEM_DELETE_REQUEST,
        data: { itemId: tempArr },
      });

      sessionStorage.removeItem("ORDER");
      router.push("/mypage/purchase");

      return message.success("구매가 되었습니다.");
    }
    if (st_boughtCreateError) {
      return message.error(st_boughtCreateError);
    }
  }, [st_boughtCreateDone, st_boughtCreateError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const payTypeChangeHandler = useCallback(
    (type) => {
      setPayType(type);
    },
    [payType]
  );

  const buyHandler = useCallback(() => {
    if (!isTerms1) {
      return message.error("개인정보 수집·이용 및 처리 동의를 해주세요");
    }

    if (!isTerms2) {
      return message.error("개인정보 제3자 제공 동의를 해주세요");
    }

    if (!isTerms3) {
      return message.error("결제대행 서비스 약관 동의를 해주세요");
    }

    if (!isTerms4) {
      return message.error("전자지급 결제대행 서비스 이용약관 동의를 해주세요");
    }

    const d = new Date();

    let year = d.getFullYear() + "";
    let month = d.getMonth() + 1 + "";
    let date = d.getDate() + "";
    let hour = d.getHours() + "";
    let min = d.getMinutes() + "";
    let sec = d.getSeconds() + "";
    let mSec = d.getMilliseconds() + "";

    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    mSec = mSec < 10 ? "0" + mSec : mSec;

    let orderPK = "ORD" + year + month + date + hour + min + sec + mSec;

    const IMP = window.IMP;

    let tempArr = [];
    orderData &&
      orderData.items.map((data) => {
        tempArr.push(data.id);
      });

    if (payType === "paypal") {
      IMP.request_pay(
        {
          pg: "paypal",
          pay_method: "card",
          merchant_uid: orderPK,
          name:
            `[${
              orderData && orderData.items && orderData.items[0].albumName
            }]` + orderData &&
            orderData.items &&
            orderData.items[0].songName,
          amount: parseInt((orderData && orderData.price) - pointInput.value),
          buyer_name: me && me.username,
          buyer_tel: me && me.mobile,
          buyer_email: me && me.email,
          m_redirect_url: "http://localhost:3000",
        },
        async (rsp) => {
          if (rsp.success) {
            dispatch({
              type: BOUGHT_CREATE_REQUEST,
              data: {
                name: me.username,
                mobile: me.mobile,
                email: me.email,
                price: orderData && orderData.price,
                usePoint: pointInput.value,
                payWay: payType,
                mileagePrice: 0,
                wishItemIds: tempArr,
              },
            });
          } else {
            console.log(rsp);
            return message.error(rsp.error_msg);
          }
        }
      );
    } else {
      IMP.request_pay(
        {
          pg:
            payType === "phone"
              ? "danal"
              : payType === "card"
              ? "danal_tpay.9810030929"
              : "paypal",
          pay_method: payType,
          merchant_uid: orderPK,
          name:
            `[${
              orderData && orderData.items && orderData.items[0].albumName
            }]` + orderData &&
            orderData.items &&
            orderData.items[0].songName,
          amount: parseInt((orderData && orderData.price) - pointInput.value),
          buyer_name: me && me.username,
          buyer_tel: me && me.mobile,
          buyer_email: me && me.email,
        },
        async (rsp) => {
          if (rsp.success) {
            dispatch({
              type: BOUGHT_CREATE_REQUEST,
              data: {
                name: me.username,
                mobile: me.mobile,
                email: me.email,
                price: orderData && orderData.price,
                usePoint: pointInput.value,
                payWay: payType,
                mileagePrice: 0,
                wishItemIds: tempArr,
                impUid: rsp.imp_uid,
                merchantUid: rsp.merchant_uid,
                payCardInfo: rsp.card_name,
              },
            });
          } else {
            console.log(rsp);
            return message.error(rsp.error_msg);
          }
        }
      );
    }
  }, [
    payType,
    me,
    orderData,
    pointInput,
    isTerms1,
    isTerms2,
    isTerms3,
    isTerms4,
  ]);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 주문서</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`0 0 100px`}>
          <RsWrapper
            dr={`row`}
            ju={`space-between`}
            position={`relative`}
            al={`flex-start`}
          >
            <Wrapper
              width={
                width < 1400
                  ? width < 1200
                    ? `100%`
                    : `calc(100% - 500px)`
                  : `calc(100% - 570px)`
              }
            >
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
                margin={`0 0 30px`}
              >
                주문서
                <CommonButton
                  fontSize={`14px`}
                  padding={`0`}
                  height={`24px`}
                  kindOf={`grey2`}
                  margin={`0 0 0 12px`}
                  width={`105px`}
                  onClick={() => router.push("/mypage/cart")}
                >
                  장바구니 가기
                </CommonButton>
              </Wrapper>
              <Wrapper
                borderTop={`1px solid ${Theme.lightGrey_C}`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                padding={width < 900 ? `40px 10px` : `40px 32px`}
                dr={`row`}
                ju={`flex-start`}
              >
                <Image
                  alt="thumbnail"
                  src={
                    orderData &&
                    orderData.items &&
                    orderData.items[0] &&
                    orderData.items[0].thumbnail
                  }
                  width={width < 900 ? `100px` : `160px`}
                  height={width < 900 ? `100px` : `160px`}
                  radius={`7px`}
                  shadow={`3px 3px 10px rgba(0, 0, 0, 0.1)`}
                />
                <Wrapper
                  width={width < 1400 ? `100%` : `calc(100% - 160px)`}
                  padding={width < 1400 ? `20px 0 0` : `0 0 0 32px`}
                  al={`flex-start`}
                >
                  <Text
                    fontSize={`16px`}
                    fontWeight={`bold`}
                    color={Theme.darkGrey_C}
                  >
                    [
                    {orderData &&
                      orderData.items &&
                      orderData.items[0] &&
                      orderData.items[0].albumName}
                    ]{" "}
                    {orderData &&
                      orderData.items &&
                      orderData.items[0] &&
                      orderData.items[0].songName}
                  </Text>
                  <Text color={Theme.grey2_C} margin={`5px 0 20px`}>
                    Album by{" "}
                    {orderData &&
                      orderData.items &&
                      orderData.items[0] &&
                      orderData.items[0].singerName}
                  </Text>
                  <Text fontSize={`18px`} fontWeight={`500`}>
                    [
                    {orderData &&
                      orderData.items &&
                      orderData.items[0] &&
                      orderData.items[0].lisenceName}
                    ]{" "}
                    {orderData &&
                      orderData.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                    <SpanText color={Theme.grey_C} margin={`0 0 0 8px`}>
                      Semi-Pro
                    </SpanText>
                  </Text>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
                margin={`50px 0 20px`}
              >
                주문 정보
              </Wrapper>
              <Wrapper
                borderTop={`1px solid ${Theme.basicTheme_C}`}
                fontSize={`16px`}
              >
                <Wrapper dr={`row`} height={`80px`} ju={`flex-start`}>
                  <Text width={width < 900 ? `90px` : `133px`}>주문자명</Text>
                  <TextInput
                    type="text"
                    width={width < 900 ? `calc(100% - 90px)` : `50%`}
                    height={`50px`}
                    readOnly
                    placeholder="이름"
                    value={me && me.username}
                  />
                </Wrapper>
                <Wrapper dr={`row`} height={`80px`} ju={`flex-start`}>
                  <Text width={width < 900 ? `90px` : `133px`}>연락처</Text>
                  <TextInput
                    width={width < 900 ? `calc(100% - 90px)` : `50%`}
                    height={`50px`}
                    readOnly
                    placeholder="연락처"
                    value={me && me.mobile}
                  />
                </Wrapper>
                <Wrapper dr={`row`} height={`80px`} ju={`flex-start`}>
                  <Text width={width < 900 ? `90px` : `133px`}>이메일</Text>
                  <TextInput
                    type="text"
                    width={width < 900 ? `calc(100% - 90px)` : `50%`}
                    height={`50px`}
                    readOnly
                    placeholder="이메일"
                    value={me && me.email}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
                margin={`50px 0 20px`}
              >
                포인트
              </Wrapper>

              <Wrapper
                borderTop={`1px solid ${Theme.basicTheme_C}`}
                fontSize={`16px`}
              >
                <Wrapper dr={`row`} height={`80px`} ju={`flex-start`}>
                  <Text width={width < 900 ? `90px` : `133px`}>
                    보유 포인트
                  </Text>
                  <Text>
                    {me &&
                      me.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  padding={`15px 0`}
                  ju={`flex-start`}
                  al={`flex-start`}
                >
                  <Text
                    width={width < 900 ? `90px` : `133px`}
                    lineHeight={`50px`}
                  >
                    사용
                  </Text>
                  <Wrapper
                    width={width < 900 ? `calc(100% - 198px)` : `50%`}
                    al={`flex-start`}
                  >
                    <TextInput
                      type="number"
                      width={`100%`}
                      height={`50px`}
                      placeholder="사용금액을 입력해주세요."
                      border={`1px solid ${Theme.lightGrey_C}`}
                      {...pointInput}
                    />
                    <Text color={Theme.red_C} fontSize={`14px`}>
                      *포인트는 1,000원 부터 사용 가능합니다.
                    </Text>
                  </Wrapper>
                  <CommonButton
                    kindOf={`subTheme2`}
                    width={`100px`}
                    height={`50px`}
                    margin={`0 0 0 8px`}
                  >
                    전액사용
                  </CommonButton>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
                margin={`50px 0 20px`}
              >
                포인트 혜택
              </Wrapper>

              <Wrapper
                borderTop={`1px solid ${Theme.basicTheme_C}`}
                fontSize={`16px`}
              >
                <Wrapper dr={`row`} height={`80px`} ju={`flex-start`}>
                  <Text width={width < 900 ? `90px` : `133px`}>적립</Text>
                  <Text>0원</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
                margin={`50px 0 20px`}
              >
                결제 수단
              </Wrapper>

              <Wrapper
                borderTop={`1px solid ${Theme.basicTheme_C}`}
                fontSize={`16px`}
              >
                <Wrapper dr={`row`} height={`80px`} ju={`flex-start`}>
                  <Radio
                    checked={payType === "card"}
                    onClick={() => payTypeChangeHandler("card")}
                  >
                    신용카드
                  </Radio>
                  <Radio
                    checked={payType === "paypal"}
                    onClick={() => payTypeChangeHandler("paypal")}
                  >
                    paypal
                  </Radio>
                  <Radio
                    checked={payType === "phone"}
                    onClick={() => payTypeChangeHandler("phone")}
                  >
                    휴대폰
                  </Radio>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              width={width < 1200 ? `100%` : `470px`}
              margin={width < 1200 && `50px 0 0`}
              position={`sticky`}
              top={`80px`}
              right={`0`}
            >
              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `25px` : `30px`}
                fontWeight={`bold`}
                margin={`0 0 30px`}
              >
                결제 금액
              </Wrapper>
              <Wrapper
                bgColor={Theme.white_C}
                shadow={`3px 3px 20px rgba(0, 0, 0, 0.1)`}
                padding={`30px`}
                al={`flex-start`}
                radius={`7px`}
              >
                <Text fontSize={`20px`} fontWeight={`bold`} margin={`0 0 30px`}>
                  주문서 상세
                </Text>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    총 상품금액
                  </Text>
                  <Text
                    fontSize={`18px`}
                    color={Theme.darkGrey_C}
                    fontWeight={`bold`}
                  >
                    {orderData &&
                      orderData.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} margin={`20px 0`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    사용 포인트
                  </Text>
                  <Text
                    fontSize={`18px`}
                    color={Theme.darkGrey_C}
                    fontWeight={`bold`}
                  >
                    {pointInput.value}원
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text fontSize={`16px`} color={Theme.grey_C}>
                    배송비
                  </Text>
                  <Text
                    fontSize={`18px`}
                    color={Theme.darkGrey_C}
                    fontWeight={`bold`}
                  >
                    0원
                  </Text>
                </Wrapper>
                <Wrapper
                  borderTop={`1px solid ${Theme.lightGrey_C}`}
                  dr={`row`}
                  ju={`space-between`}
                  padding={`30px 0 0`}
                  margin={`18px 0 0`}
                >
                  <Text
                    fontSize={`16px`}
                    fontWeight={`bold`}
                    color={Theme.darkGrey_C}
                  >
                    총 결제 금액
                  </Text>
                  <Text
                    fontSize={`26px`}
                    color={Theme.basicTheme_C}
                    fontWeight={`bold`}
                  >
                    {parseInt((orderData && orderData.price) - pointInput.value)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`24px 0 10px`}>
                <Checkbox
                  checked={isTerms1}
                  onClick={() => setIsTerms1(!isTerms1)}
                >
                  (필수) 개인정보 수집·이용 및 처리 동의
                </Checkbox>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                <Checkbox
                  checked={isTerms2}
                  onClick={() => setIsTerms2(!isTerms2)}
                >
                  (필수) 개인정보 제3자 제공 동의
                </Checkbox>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                <Checkbox
                  checked={isTerms3}
                  onClick={() => setIsTerms3(!isTerms3)}
                >
                  (필수) 결제대행 서비스 약관 동의
                </Checkbox>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 40px`}>
                <Checkbox
                  checked={isTerms4}
                  onClick={() => setIsTerms4(!isTerms4)}
                >
                  (필수) 전자지급 결제대행 서비스 이용약관 동의
                </Checkbox>
              </Wrapper>
              <CommonButton
                width={`100%`}
                height={`48px`}
                fontSize={`18px`}
                onClick={buyHandler}
              >
                결제하기
              </CommonButton>
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

export default Intro;
