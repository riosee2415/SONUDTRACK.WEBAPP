import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
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
import { Checkbox } from "antd";

const Join = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const dispatch = useDispatch();
  const width = useWidth();
  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE //////
  ////// HANDLER //////

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
                type="text"
                placeholder="아이디를 입력해주세요."
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                비밀번호
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                type="password"
                placeholder="비밀번호를 입력해주세요."
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                비밀번호 확인
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                type="password"
                placeholder="비밀번호를 재입력해주세요"
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                이름 (실명)
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                type="text"
                placeholder="이름을 입력해주세요."
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                닉네임
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                type="text"
                placeholder="닉네임을 입력해주세요."
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                이메일
              </Text>
              <TextInput
                margin={`12px 0 30px`}
                width={`100%`}
                height={`50px`}
                type="text"
                placeholder="이메일을 입력해주세요."
              />
              <Text fontSize={`16px`} color={Theme.grey_C}>
                휴대폰 번호
              </Text>
              <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 30px`}>
                <TextInput
                  width={`calc(100% - 110px)`}
                  height={`50px`}
                  type="number"
                  placeholder="휴대폰 번호를 입력해주세요."
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
              <Checkbox>(선택)프로모션/혜택 등 광고성 정보 수신 동의</Checkbox>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0`}>
                <Checkbox>SMS</Checkbox>
                <Checkbox>카카오톡</Checkbox>
                <Checkbox>이메일</Checkbox>
              </Wrapper>
              <Text fontSize={`16px`} color={Theme.grey_C} margin={`0 0 12px`}>
                Contact 진행 상황 알림
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`12px 0`}>
                <Checkbox>카카오톡</Checkbox>
                <Checkbox>이메일</Checkbox>
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
