import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST, SIGNUP_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { Checkbox, message } from "antd";
import useInput from "../../hooks/useInput";

const Join = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const dispatch = useDispatch();
  const width = useWidth();

  const [terms1, setTerms1] = useState(false); // 프로모션/혜택 등
  const [terms2, setTerms2] = useState(false); // SMS
  const [terms3, setTerms3] = useState(false); // 카카오톡
  const [terms4, setTerms4] = useState(false); // 이메일
  const [terms5, setTerms5] = useState(false); // 진행알림상황 - 카카오톡
  const [terms6, setTerms6] = useState(false); // 진행알림상황 - 이메일

  const idInput = useInput(``);
  const pwInput = useInput(``);
  const pwCheckInput = useInput(``);
  const nameInput = useInput(``);
  const nicknameInput = useInput(``);
  const emailInput = useInput(``);
  const mobileInput = useInput(``);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE //////
  ////// HANDLER //////

  // 회원가입
  const signUpHandler = useCallback(() => {
    if (!idInput.value) {
      return message.error("아이디를 입력해주세요.");
    }
    if (!pwInput.value) {
      return message.error("비밀번호를 입력해주세요.");
    }
    if (!pwCheckInput.value) {
      return message.error("비밀번호를 재입력해주세요.");
    }
    if (pwInput.value !== pwCheckInput.value) {
      return message.error("비밀번호가 일치하지 않습니다.");
    }
    if (!nameInput.value) {
      return message.error("이름을 입력해주세요.");
    }
    if (!nicknameInput.value) {
      return message.error("닉네임을 입력해주세요.");
    }
    if (!emailInput.value) {
      return message.error("이메일을 입력해주세요.");
    }
    if (!mobileInput.value) {
      return message.error("휴대폰 번호를 입력해주세요.");
    }
    if (!terms2 && !terms3 && !terms4 && (!terms5 || !terms6)) {
      return message.error("정보 수신 동의를 확인해주세요.");
    }

    // dispatch({
    //   type : SIGNUP_REQUEST,
    //   data : {

    //   }
    // })
  }, [
    terms1,
    terms2,
    terms3,
    terms4,
    terms5,
    terms6,
    idInput,
    pwInput,
    pwCheckInput,
    nameInput,
    nicknameInput,
    emailInput,
    mobileInput,
  ]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 회원가입</title>
      </Head>

      <ClientLayout>
        <WholeWrapper
          bgColor={Theme.lightGrey3_C}
          minHeight={`100vh`}
          padding={`100px 0`}
        >
          <Wrapper
            width={width < 700 ? `100%` : `560px`}
            bgColor={Theme.white_C}
            radius={`20px`}
            shadow={`0 3px 15px rgba(179, 169, 190, 0.1)`}
            padding={width < 700 ? `80px 20px` : `100px 60px`}
          >
            <Text fontSize={`30px`} fontWeight={`600`} margin={`0 0 50px`}>
              회원가입
            </Text>
            <Wrapper al={`flex-start`}>
              <Text fontSize={`16px`} color={Theme.grey_C}>
                아이디
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                placeholder="아이디를 입력해주세요."
                {...idInput}
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                비밀번호
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...pwInput}
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                비밀번호 확인
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="password"
                placeholder="비밀번호를 재입력해주세요"
                {...pwCheckInput}
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                이름 (실명)
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                placeholder="이름을 입력해주세요."
                {...nameInput}
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                닉네임
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                placeholder="닉네임을 입력해주세요."
                {...nicknameInput}
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                이메일
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                border={`1px solid ${Theme.lightGrey_C}`}
                type="text"
                placeholder="이메일을 입력해주세요."
                {...emailInput}
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                휴대폰 번호
              </Text>
              <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 30px`}>
                <TextInput
                  width={`calc(100% - 110px)`}
                  height={`50px`}
                  type="number"
                  border={`1px solid ${Theme.lightGrey_C}`}
                  placeholder="휴대폰 번호를 입력해주세요."
                  {...mobileInput}
                />
                <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme2`}
                >
                  인증번호
                </CommonButton>
              </Wrapper>

              <Text fontSize={`16px`} color={Theme.grey_C} margin={`0 0 12px`}>
                정보 수신 동의
              </Text>
              <Checkbox checked={terms1} onChange={() => setTerms1(!terms1)}>
                (선택)프로모션/혜택 등 광고성 정보 수신 동의
              </Checkbox>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0`}>
                <Checkbox checked={terms2} onChange={() => setTerms2(!terms2)}>
                  SMS
                </Checkbox>
                <Checkbox checked={terms3} onChange={() => setTerms3(!terms3)}>
                  카카오톡
                </Checkbox>
                <Checkbox checked={terms4} onChange={() => setTerms4(!terms4)}>
                  이메일
                </Checkbox>
              </Wrapper>
              <Text fontSize={`16px`} color={Theme.grey_C} margin={`0 0 12px`}>
                Contact 진행 상황 알림
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0`}>
                <Checkbox checked={terms5} onChange={() => setTerms5(!terms5)}>
                  카카오톡
                </Checkbox>
                <Checkbox checked={terms6} onChange={() => setTerms6(!terms6)}>
                  이메일
                </Checkbox>
              </Wrapper>
              <Wrapper margin={`50px 0 0`}>
                <CommonButton width={`180px`} height={`50px`} fontSize={`18px`}>
                  회원가입
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>
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

export default Join;
