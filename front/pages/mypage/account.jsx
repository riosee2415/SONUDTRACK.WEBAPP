import React, { useCallback, useState, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  ME_ACCOUNT_UPDATE_REQUEST,
  USER_INFO_PASS_UPDATE_REQUEST,
  USER_INFO_UPDATE_REQUEST,
  USER_PASS_COMPARE_REQUEST,
} from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import useInput from "../../hooks/useInput";
import {
  CommonButton,
  CustomSelect,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { Checkbox, message, Modal, Select } from "antd";
import Theme from "../../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Account = () => {
  ////// GLOBAL STATE //////
  const {
    me,
    //
    st_meAccountUpdateDone,
    st_meAccountUpdateError,
  } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  //   INPUT
  const accountInput = useInput(``);
  const [bankName, setBankName] = useState(null);

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_meAccountUpdateDone) {
      return message.success("계좌정보가 수정되었습니다.");
    }
    if (st_meAccountUpdateError) {
      return message.error(st_meAccountUpdateError);
    }
  }, [st_meAccountUpdateDone, st_meAccountUpdateError]);

  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return message.error(`로그인이 필요한 페이지입니다.`);
    }

    if (me) {
      setBankName(me.bankName);
      accountInput.setValue(me.acconuntNum);
    }
  }, [me]);

  console.log(me);

  ////// TOGGLE //////

  ////// HANDLER //////

  //   계좌 등록하기
  const accountUpdateHandler = useCallback(() => {
    if (!bankName) {
      return message.error("은행명을 선택해주세요.");
    }

    if (!accountInput.value) {
      return message.error("계좌번호를 입력해주세요.");
    }

    dispatch({
      type: ME_ACCOUNT_UPDATE_REQUEST,
      data: {
        bankName,
        acconuntNum: accountInput.value,
      },
    });
  }, [bankName, accountInput]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 개인정보 관리</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper al={`flex-start`}>
            <Wrapper width={width < 700 ? `100%` : `440px`} al={`flex-start`}>
              <Wrapper
                al={`flex-start`}
                fontSize={width < 900 ? `20px` : `30px`}
                fontWeight={`bold`}
                margin={`0 0 30px`}
              >
                개인정보 관리
              </Wrapper>
              <Text
                fontSize={width < 900 ? `18px` : `24px`}
                fontWeight={`600`}
                margin={`0 0 30px`}
              >
                판매 금액 수령 계좌 관리
              </Text>

              <Text fontSize={`16px`} color={Theme.grey_C} margin={`0 0 5px`}>
                은행명
              </Text>
              <CustomSelect margin={`0 0 30px`}>
                <Select
                  placeholder="선택"
                  onChange={(data) => setBankName(data)}
                  value={bankName}
                >
                  <Select.Option value="하나은행">하나은행</Select.Option>
                  <Select.Option value="국민은행">국민은행</Select.Option>
                  <Select.Option value="신한은행">신한은행</Select.Option>
                  <Select.Option value="농협은행">농협은행</Select.Option>
                </Select>
              </CustomSelect>

              <Text fontSize={`16px`} color={Theme.grey_C} margin={`0 0 10px`}>
                계좌번호
              </Text>
              <Wrapper dr={`row`} ju={`space-between`}>
                <TextInput
                  width={`calc(100% - 110px)`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  placeholder="`-`를 제외한 계좌번호를 입력해주세요."
                  {...accountInput}
                  type="number"
                />
                {/* <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  kindOf={`subTheme2`}
                >
                  계좌확인
                </CommonButton> */}
              </Wrapper>
            </Wrapper>

            <CommonButton
              margin={`50px 0 100px`}
              width={`180px`}
              height={`50px`}
              fontSize={`18px`}
              onClick={accountUpdateHandler}
            >
              계좌 정보 등록
            </CommonButton>
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

export default Account;
