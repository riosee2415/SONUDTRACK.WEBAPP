import React, { useCallback, useEffect } from "react";
import {
  Wrapper,
  Text,
  Image,
  WholeWrapper,
  RsWrapper,
  ATag,
  SpanText,
} from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useSelector, useDispatch } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { message } from "antd";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { UpOutlined } from "@ant-design/icons";

const AppFooter = () => {
  const width = useWidth();

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    companys,
    //
    st_companyDone,
    st_companyError,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);

  const moveScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <WholeWrapper>
      <RsWrapper
        dr={width < 800 ? `column` : `row`}
        ju={width < 800 ? `flex-start` : `space-between`}
        al={width < 800 ? `flex-start` : `flex-end`}
      >
        <Wrapper
          borderTop={`1px solid ${Theme.lightGrey_C}`}
          padding={`30px 0`}
        >
          <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 25px`}>
            <Wrapper
              width={`auto`}
              dr={`row`}
              ju={`flex-start`}
              color={Theme.grey_C}
              margin={width < 800 ? `15px 0 0 ` : `0`}
            >
              <Text fontWeight={`bold`} margin={`0 24px 0 0`} isHover>
                이용약관
              </Text>
              <Text fontWeight={`bold`} isHover>
                개인정보처리방침
              </Text>
            </Wrapper>

            <Wrapper
              width={`36px`}
              height={`36px`}
              fontSize={`15px`}
              cursor={`pointer`}
              onClick={() => moveScroll()}
              border={`1px solid ${Theme.grey2_C}`}
            >
              <UpOutlined />
            </Wrapper>
          </Wrapper>
          <Wrapper al={`flex-start`} color={Theme.grey2_C}>
            {companys && (
              <Wrapper ju={`flex-start`} dr={`row`} margin={`0 0 10px`}>
                {companys[0] && (
                  <Text>{`${companys[0].name} ${companys[0].value}`}</Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`10px`}
                >
                  |
                </SpanText>

                {companys[1] && (
                  <Text>{`${companys[1].name} ${companys[1].value}`}</Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`10px`}
                >
                  |
                </SpanText>
                {companys[2] && (
                  <Text>{`${companys[2].name} ${companys[2].value}`}</Text>
                )}
              </Wrapper>
            )}
            <Text>Copylight ⓒ Newwavesound rights reserved.</Text>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
