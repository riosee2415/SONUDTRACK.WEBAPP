import React from "react";
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
import { Checkbox, Radio } from "antd";

const Intro = () => {
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
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/musictem1.png`}
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
                    [앨범명] Star Night
                  </Text>
                  <Text color={Theme.grey2_C} margin={`5px 0 20px`}>
                    Album by Pokerface
                  </Text>
                  <Text fontSize={`18px`} fontWeight={`500`}>
                    [비독점] 350,000원
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
                  />
                </Wrapper>
                <Wrapper dr={`row`} height={`80px`} ju={`flex-start`}>
                  <Text width={width < 900 ? `90px` : `133px`}>연락처</Text>
                  <TextInput
                    type="number"
                    width={width < 900 ? `calc(100% - 90px)` : `50%`}
                    height={`50px`}
                    readOnly
                    placeholder="연락처"
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
                  <Text>15,000원</Text>
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
                  <Text>1,000원</Text>
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
                  <Radio>신용카드</Radio>
                  <Radio>paypal</Radio>
                  <Radio>휴대폰</Radio>
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
                    130,000원
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
                    10,000원
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
                    120,000원
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`24px 0 10px`}>
                <Checkbox>(필수) 개인정보 수집·이용 및 처리 동</Checkbox>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                <Checkbox>(필수) 개인정보 제3자 제공 동의</Checkbox>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                <Checkbox>(필수) 결제대행 서비스 약관 동의</Checkbox>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 40px`}>
                <Checkbox>
                  (필수) 전자지급 결제대행 서비스 이용약관 동의
                </Checkbox>
              </Wrapper>
              <CommonButton width={`100%`} height={`48px`} fontSize={`18px`}>
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
