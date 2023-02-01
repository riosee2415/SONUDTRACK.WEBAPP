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
  RsWrapper,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";

import styled from "styled-components";
import { Checkbox } from "antd";
import Link from "next/dist/client/link";
import useInput from "../../hooks/useInput";
import { FAQ_LIST_REQUEST } from "../../reducers/faq";
import { useSelector } from "react-redux";

const Index = () => {
  ////// GLOBAL STATE //////
  const { faqList } = useSelector((state) => state.faq);

  ////// HOOKS //////
  const width = useWidth();

  const nameInput = useInput(``);
  const emailInput = useInput(``);
  const titleInput = useInput(``);
  const contentInput = useInput(``);
  const [terms, setTerms] = useState(false);
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////

  // 문의하기
  const contactHandler = useCallback(() => {}, [
    nameInput,
    emailInput,
    titleInput,
    contentInput,
    terms,
  ]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Contact Us</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              height={`260px`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/cs-center.png")`}
              radius={`14px`}
              overflow={`hidden`}
              shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
            >
              <Wrapper
                height={`100%`}
                bgColor={`rgba(0, 0, 0, 0.4)`}
                color={Theme.white_C}
              >
                <Text
                  fontSize={width < 900 ? `25px` : `32px`}
                  fontWeight={`500`}
                  margin={`0 0 16px`}
                >
                  C/S Center
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                  margin={`0 0 28px`}
                >
                  뉴웨이브사운드에 대한 궁금하신 점을 해결해드립니다.
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              al={`flex-start`}
              margin={`58px 0 100px`}
            >
              <Wrapper
                width={width < 900 ? `100%` : `60%`}
                al={`flex-start`}
                margin={`0 0 40px`}
              >
                <Text
                  fontSize={width < 900 ? `25px` : `30px`}
                  fontWeight={`bold`}
                >
                  Contact Us
                </Text>
                <Text
                  color={Theme.grey_C}
                  fontSize={`16px`}
                  margin={`14px 0 40px`}
                >
                  무엇이든 물어보세요
                </Text>

                <Text fontSize={`16px`}>성함</Text>
                <TextInput
                  type="text"
                  width={`200px`}
                  height={`50px`}
                  placeholder="성함을 입력해주세요."
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`12px 0 30px`}
                  {...nameInput}
                />
                <Text fontSize={`16px`}>이메일</Text>
                <TextInput
                  type="text"
                  width={`70%`}
                  height={`50px`}
                  placeholder="답장을 받으실 이메일 주소를 입력해주세요."
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`12px 0 30px`}
                  {...emailInput}
                />
                <Text fontSize={`16px`}>제목</Text>
                <TextInput
                  type="text"
                  width={`100%`}
                  height={`50px`}
                  placeholder="문의 제목을 입력해주세요."
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`12px 0 30px`}
                  {...titleInput}
                />
                <Text fontSize={`16px`}>내용</Text>
                <TextArea
                  type="text"
                  width={`100%`}
                  height={`75px`}
                  placeholder="문의할 내용을 입력해주세요."
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`12px 0 30px`}
                  {...contentInput}
                />
                <Checkbox checked={terms} onChange={() => setTerms(!terms)}>
                  개인정보 처리방침에 동의합니다.
                </Checkbox>
                <CommonButton
                  width={`180px`}
                  height={`50px`}
                  fontSize={`18px`}
                  margin={`20px 0 0`}
                >
                  문의하기
                </CommonButton>
              </Wrapper>
              <Wrapper width={width < 900 ? `100%` : `30%`} al={`flex-start`}>
                <Text fontSize={`18px`} fontWeight={`bold`} margin={`0 0 50px`}>
                  TOP FAQS
                </Text>

                {faqList &&
                  faqList.slice(0, 2).map((data) => {
                    return (
                      <Text
                        key={data.id}
                        fontSize={`24px`}
                        color={Theme.grey_C}
                        fontWeight={`bold`}
                        isHover
                        isEllipsis
                        margin={`0 0 24px`}
                      >
                        {data.question}
                      </Text>
                    );
                  })}

                <Link href={`/faq`}>
                  <a>
                    <Text
                      color={Theme.basicTheme_C}
                      fontWeight={`bold`}
                      margin={`25px 0 0`}
                      isHover
                    >
                      VIEW MORE
                    </Text>
                  </a>
                </Link>
              </Wrapper>
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
      type: FAQ_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
