import React, { useCallback, useState } from "react";
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
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import { Modal } from "antd";
import router from "next/router";

const Index = () => {
  ////// GLOBAL STATE //////
  const [cart, setCart] = useState(false);
  const [contact, setContact] = useState(false);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const cartToggle = useCallback(() => {
    setCart((prev) => !prev);
  }, [cart]);

  const contactToggle = useCallback(() => {
    setContact((prev) => !prev);
  }, [contact]);
  ////// HANDLER //////

  const selHandler = useCallback((type) => {
    if (type === 1) {
      sessionStorage.setItem(
        "ORDER",
        JSON.stringify({
          title: "standard",
          price: 15000,
        })
      );
    } else if ((type = 2)) {
      sessionStorage.setItem(
        "ORDER",
        JSON.stringify({
          title: "Deluxe",
          price: 15000,
        })
      );
    } else if ((type = 3)) {
      sessionStorage.setItem(
        "ORDER",
        JSON.stringify({
          title: "Platinum",
          price: 15000,
        })
      );
    }
    router.push("/order");
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 라이선스</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/license.png")`}
            height={`274px`}
            margin={`-84px 0 0`}
          >
            <RsWrapper al={`flex-start`}>
              <Image
                alt="logo"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/license/logo.png`}
                width={`40px`}
                margin={`0 0 12px`}
              />
              <Text fontSize={`32px`} color={Theme.white_C} fontWeight={`600`}>
                라이선스 선택
              </Text>
            </RsWrapper>
          </Wrapper>
          <RsWrapper margin={`70px 0`}>
            <Text fontSize={width < 800 ? `22px` : `30px`} fontWeight={`bold`}>
              다양한 라이센스 종류를 선택해보세요!
            </Text>
            <Text
              fontSize={width < 800 ? `15px` : `18px`}
              margin={`10px 0 40px`}
              textAlign={`center`}
            >
              뉴웨이브사운드에서만 만나실 수 있는 가격별 다양한 라이센스로
              부담없이 음원을 가져보세요.
            </Text>
            <Wrapper
              dr={`row`}
              ju={width < 800 ? `space-around` : `center`}
              fontSize={width < 800 ? `15px` : `18px`}
            >
              <Wrapper width={`auto`}>
                <Image
                  alt="image"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/license/img1.png`}
                  width={width < 800 ? `140px` : `168px`}
                  height={width < 800 ? `140px` : `168px`}
                  radius={`100%`}
                  margin={`0 0 12px`}
                />
                <Text>내가 원하는 음악을</Text>
                <Text>비교해보세요!</Text>
              </Wrapper>
              <Wrapper width={`auto`} margin={width < 800 ? `0` : `0 80px`}>
                <Image
                  alt="image"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/license/img2.png`}
                  width={width < 800 ? `140px` : `168px`}
                  height={width < 800 ? `140px` : `168px`}
                  radius={`100%`}
                  margin={`0 0 12px`}
                />
                <Text>라이센스 소유로</Text>
                <Text>나를 위한 음악으로!</Text>
              </Wrapper>
              <Wrapper width={`auto`}>
                <Image
                  alt="image"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/license/img3.png`}
                  width={width < 800 ? `140px` : `168px`}
                  height={width < 800 ? `140px` : `168px`}
                  radius={`100%`}
                  margin={`0 0 12px`}
                />
                <Text>한 번 다운로드한</Text>
                <Text>음원은 영원히 보장!</Text>
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          <Wrapper
            bgColor={Theme.subTheme5_C}
            padding={`55px 0`}
            dr={`row`}
            al={`flex-start`}
          >
            <Wrapper
              width={width < 1000 ? (width < 800 ? `95%` : `45%`) : `420px`}
              bgColor={Theme.white_C}
              padding={width < 800 ? `40px 20px` : `50px 40px`}
              minHeight={`555px`}
              ju={`flex-start`}
              margin={width < 800 ? `0 0 10px` : `0 20px 0 0`}
            >
              <Text fontSize={`32px`} fontWeight={`bold`}>
                Standard
              </Text>
              <Text fontSize={`20px`} color={Theme.basicTheme_C}>
                15,000원
              </Text>
              <Wrapper al={`flex-start`}>
                <Text margin={`0 0 5px`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                    width={`10px`}
                    margin={`0 5px 0 0`}
                  />
                  사용 제한 범위
                </Text>
                <Text
                  fontSize={`16px`}
                  fontWeight={`500`}
                  padding={`0 0 0 15px`}
                >
                  10만명 미만
                </Text>
                <Text margin={`20px 0 5px`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                    width={`10px`}
                    margin={`0 5px 0 0`}
                  />
                  사용 제한 범위
                </Text>
                <Text
                  fontSize={`16px`}
                  fontWeight={`500`}
                  padding={`0 0 0 15px`}
                >
                  웹사이트/소셜미디어/온라인 스트리밍(개인크리에이터, 개인방송
                  한정)/인디영화(학생 프로젝트 전용)/축제/웨딩/사내영상/팟캐스트
                </Text>
                <Text margin={`20px 0 5px`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                    width={`10px`}
                    margin={`0 5px 0 0`}
                  />
                  제약 조건
                </Text>
                <Text
                  fontSize={`16px`}
                  fontWeight={`500`}
                  padding={`0 0 0 15px`}
                >
                  1000번 이내
                </Text>
              </Wrapper>
              <CommonButton
                width={`100%`}
                height={`48px`}
                fontSize={width < 800 ? `15px` : `18px`}
                margin={`20px 0 8px`}
                onClick={() => selHandler(1)}
              >
                구매하기
              </CommonButton>
              <CommonButton
                width={`100%`}
                height={`48px`}
                fontSize={width < 800 ? `15px` : `18px`}
                kindOf={`subTheme`}
                onClick={cartToggle}
              >
                장바구니 담기
              </CommonButton>
            </Wrapper>
            <Wrapper
              width={width < 1000 ? (width < 800 ? `95%` : `45%`) : `420px`}
              bgColor={Theme.white_C}
              padding={width < 800 ? `40px 20px` : `50px 40px`}
              minHeight={`555px`}
              ju={`flex-start`}
              margin={width < 800 ? `0 0 10px` : `0 0 0 20px`}
            >
              <Text fontSize={`32px`} fontWeight={`bold`}>
                Deluxe
              </Text>
              <Text fontSize={`20px`} color={Theme.basicTheme_C}>
                15,000원
              </Text>
              <Wrapper al={`flex-start`}>
                <Text margin={`0 0 5px`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                    width={`10px`}
                    margin={`0 5px 0 0`}
                  />
                  사용 제한 범위
                </Text>
                <Text
                  fontSize={`16px`}
                  fontWeight={`500`}
                  padding={`0 0 0 15px`}
                >
                  100만명 미만
                </Text>
                <Text margin={`20px 0 5px`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                    width={`10px`}
                    margin={`0 5px 0 0`}
                  />
                  사용 제한 범위
                </Text>
                <Text
                  fontSize={`16px`}
                  fontWeight={`500`}
                  padding={`0 0 0 15px`}
                >
                  웹사이트/소셜미디어/온라인 스트리밍(개인크리에이터, 개인방송
                  한정)/인디영화(학생 프로젝트 전용)/축제/웨딩/사내영상/팟캐스트
                </Text>
                <Text margin={`20px 0 5px`}>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                    width={`10px`}
                    margin={`0 5px 0 0`}
                  />
                  제약 조건
                </Text>
                <Text
                  fontSize={`16px`}
                  fontWeight={`500`}
                  padding={`0 0 0 15px`}
                >
                  무제한 사용
                </Text>
              </Wrapper>
              <CommonButton
                width={`100%`}
                height={`48px`}
                fontSize={width < 800 ? `15px` : `18px`}
                margin={`20px 0 8px`}
                onClick={() => selHandler(2)}
              >
                구매하기
              </CommonButton>
              <CommonButton
                width={`100%`}
                height={`48px`}
                fontSize={width < 800 ? `15px` : `18px`}
                kindOf={`subTheme`}
                onClick={cartToggle}
              >
                장바구니 담기
              </CommonButton>
            </Wrapper>

            <Wrapper dr={`row`} al={`flex-start`} margin={`40px 0 0`}>
              <Wrapper
                width={width < 1000 ? (width < 800 ? `95%` : `45%`) : `420px`}
                bgColor={Theme.white_C}
                padding={width < 800 ? `40px 20px` : `50px 40px`}
                minHeight={`578px`}
                ju={`flex-start`}
                margin={width < 800 ? `0 0 10px` : `0 20px 0 0`}
              >
                <Text fontSize={`32px`} fontWeight={`bold`}>
                  Platinum
                </Text>
                <Text fontSize={`20px`} color={Theme.basicTheme_C}>
                  15,000원
                </Text>
                <Wrapper al={`flex-start`}>
                  <Text margin={`0 0 5px`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                      width={`10px`}
                      margin={`0 5px 0 0`}
                    />
                    사용 제한 범위
                  </Text>
                  <Text
                    fontSize={`16px`}
                    fontWeight={`500`}
                    padding={`0 0 0 15px`}
                  >
                    1000만명 미만
                  </Text>
                  <Text margin={`20px 0 5px`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                      width={`10px`}
                      margin={`0 5px 0 0`}
                    />
                    사용 제한 범위
                  </Text>
                  <Text
                    fontSize={`16px`}
                    fontWeight={`500`}
                    padding={`0 0 0 15px`}
                  >
                    웹사이트/소셜미디어/온라인 스트리밍(광고 비용이 미화
                    5000달러 미만인
                    경우)/축제/웨딩/사내영상/팟캐스트/오디오북/단일 지역내의
                    업계 행사 무역 박람회 및 매장 내 디스플레이
                  </Text>
                  <Text margin={`20px 0 5px`}>
                    <Image
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                      width={`10px`}
                      margin={`0 5px 0 0`}
                    />
                    제약 조건
                  </Text>
                  <Text
                    fontSize={`16px`}
                    fontWeight={`500`}
                    padding={`0 0 0 15px`}
                  >
                    대량 재생산
                  </Text>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`48px`}
                  fontSize={width < 800 ? `15px` : `18px`}
                  margin={`20px 0 8px`}
                  onClick={() => selHandler(3)}
                >
                  구매하기
                </CommonButton>
                <CommonButton
                  width={`100%`}
                  height={`48px`}
                  fontSize={width < 800 ? `15px` : `18px`}
                  kindOf={`subTheme`}
                  onClick={cartToggle}
                >
                  장바구니 담기
                </CommonButton>
              </Wrapper>
              <Wrapper
                width={width < 1000 ? (width < 800 ? `95%` : `45%`) : `420px`}
                bgColor={Theme.white_C}
                padding={width < 800 ? `40px 20px` : `50px 40px`}
                minHeight={`578px`}
                ju={`space-between`}
                margin={width < 800 ? `0 0 10px` : `0 0 0 20px`}
              >
                <Wrapper>
                  <Text fontSize={`32px`} fontWeight={`bold`}>
                    Commercial
                  </Text>
                  <Text fontSize={`20px`} color={Theme.basicTheme_C}>
                    문의하기
                  </Text>
                  <Wrapper al={`flex-start`}>
                    <Text margin={`0 0 5px`}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                        width={`10px`}
                        margin={`0 5px 0 0`}
                      />
                      사용 제한 범위
                    </Text>
                    <Text
                      fontSize={`16px`}
                      fontWeight={`500`}
                      padding={`0 0 0 15px`}
                    >
                      무제한
                    </Text>
                    <Text margin={`20px 0 5px`}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                        width={`10px`}
                        margin={`0 5px 0 0`}
                      />
                      사용 제한 범위
                    </Text>
                    <Text
                      fontSize={`16px`}
                      fontWeight={`500`}
                      padding={`0 0 0 15px`}
                    >
                      대부분의 모든 범위
                    </Text>
                    <Text margin={`20px 0 5px`}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/head.png`}
                        width={`10px`}
                        margin={`0 5px 0 0`}
                      />
                      제약 조건
                    </Text>
                    <Text
                      fontSize={`16px`}
                      fontWeight={`500`}
                      padding={`0 0 0 15px`}
                    >
                      건 별 기간 제한 / 정식 계약
                    </Text>
                  </Wrapper>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`48px`}
                  fontSize={width < 800 ? `15px` : `18px`}
                  margin={`20px 0 0`}
                  onClick={contactToggle}
                >
                  문의하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <RsWrapper margin={`73px 0 100px`}>
            <Wrapper width={`auto`} al={`flex-start`}>
              <Text
                fontSize={width < 800 ? `25px` : `30px`}
                fontWeight={`bold`}
                margin={`0 0 26px`}
              >
                이용권 구매시 참고하세요!
              </Text>
              <Text fontSize={`16px`} color={Theme.grey_C}>
                • 모든 이용권은 부가가치세(10%)가 별도로? 포함되어? 부과됩니다.
              </Text>
              <Text fontSize={`16px`} color={Theme.grey_C}>
                • 이용권의 결제방법 변경 및 해지 신청은 마이페이지 &#62;
                구매관리 &#62; 구매내역에서 확인하실 수 있습니다.
              </Text>
            </Wrapper>
          </RsWrapper>

          <Modal onCancel={cartToggle} visible={cart} footer={null}>
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                Cart
              </Text>
              <Text fontSize={`16px`}>장바구니에 추가되었습니다.</Text>
              <Text fontSize={`16px`}>계속 둘러보시겠어요?</Text>

              <Wrapper dr={`row`} margin={`30px 0 0`}>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={width < 800 ? `15px` : `18px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme`}
                  margin={`0 4px 0 0`}
                >
                  장바구니 이동
                </CommonButton>
                <CommonButton
                  width={`150px`}
                  height={`48px`}
                  fontSize={width < 800 ? `15px` : `18px`}
                  fontWeight={`bold`}
                  margin={`0 0 0 4px`}
                  onClick={cartToggle}
                >
                  계속 쇼핑하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
          <Modal onCancel={contactToggle} visible={contact} footer={null}>
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                문의하기
              </Text>
              <Text fontSize={`16px`}>Commercial 이용권을 구매하시려면</Text>
              <Text fontSize={`16px`} margin={`0 0 10px`}>
                해당 연락처로 문의해주시길 바랍니다.
              </Text>

              <Text fontWeight={`500`} color={Theme.grey_C}>
                연락처 : 010-7323-1955
              </Text>
              <Text fontWeight={`500`} color={Theme.grey_C}>
                이메일 : nws0901@nwsound1.com
              </Text>

              <CommonButton
                width={`150px`}
                height={`48px`}
                fontSize={width < 800 ? `15px` : `18px`}
                fontWeight={`bold`}
                margin={`30px 0 0`}
                kindOf={`subTheme`}
                onClick={contactToggle}
              >
                이전으로
              </CommonButton>
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
