import React from "react";
import Head from "next/head";
import ClientLayout from "../../../components/ClientLayout";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";

const Cicle = styled.div`
  width: 6px;
  min-width: 6px;
  height: 6px;
  border-radius: 100%;
  background: ${Theme.grey_C};
  margin: 0 12px 0 0;
`;

const Index = () => {
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
        <title>NEW WAVE Sound | 광고 신청</title>
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
              광고 신청
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={width < 900 ? `100%` : `31%`}>
                <Wrapper
                  height={`200px`}
                  shadow={`3px 3px 10px rgba(0, 0, 0, 0.1)`}
                  radius={`10px`}
                  color={Theme.grey_C}
                >
                  <Text
                    fontSize={`34px`}
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                  >
                    STARTER
                  </Text>
                  <Text fontSize={`18px`}>5만원</Text>
                </Wrapper>
                <Wrapper
                  height={`65px`}
                  radius={`10px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  dr={`row`}
                  color={Theme.grey2_C}
                  fontSize={`18px`}
                  margin={`20px 0 12px`}
                >
                  <ClockCircleOutlined />
                  <Text color={Theme.adminTheme_1} margin={`0 0 0 8px`}>
                    2주
                  </Text>
                </Wrapper>
                <Wrapper
                  radius={`10px`}
                  bgColor={Theme.lightGrey2_C}
                  minHeight={`236px`}
                  ju={`flex-start`}
                  padding={`25px`}
                  fontSize={`16px`}
                  color={Theme.grey_C}
                >
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    margin={`0 0 12px`}
                  >
                    <Cicle />
                    <Text>BASIC 다음순으로 노출</Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    al={`flex-start`}
                    margin={`0 0 12px`}
                  >
                    <Text margin={`10px 0 0`}>
                      <Cicle />
                    </Text>
                    <Text>
                      Jump up 기능 : 광고 기간 내 1일 3회 당 30분씩 상단에
                      노출(PRO 광고 다음순으로 노출)
                    </Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    margin={`0 0 12px`}
                  >
                    <Cicle />
                    <Text>STARTER 광고 간 노출 순서 랜덤</Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    al={`flex-start`}
                  >
                    <Text margin={`10px 0 0`}>
                      <Cicle />
                    </Text>
                    <Text>
                      검색 페이지의 검색어, Tag 겹치는 내에서 연관도순, 인기순에
                      적용됩니다.
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`24px 24px 14px`}>
                  <Checkbox>Artisttem</Checkbox>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`0 24px`}>
                  <Checkbox>Musictem</Checkbox>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`14px 24px 24px`}>
                  <Checkbox>Artworks</Checkbox>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`48px`}
                  fontSize={`18px`}
                  radius={`7px`}
                >
                  신청하기
                </CommonButton>
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `31%`}
                margin={width < 900 && `20px 0`}
              >
                <Wrapper
                  height={`200px`}
                  shadow={`3px 3px 10px rgba(0, 0, 0, 0.1)`}
                  radius={`10px`}
                >
                  <Text
                    fontSize={`34px`}
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                  >
                    MASTER
                  </Text>
                  <Text fontSize={`18px`}>30만원</Text>
                </Wrapper>
                <Wrapper
                  height={`65px`}
                  radius={`10px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  dr={`row`}
                  color={Theme.grey2_C}
                  fontSize={`18px`}
                  margin={`20px 0 12px`}
                >
                  <ClockCircleOutlined />
                  <Text color={Theme.adminTheme_1} margin={`0 0 0 8px`}>
                    1주
                  </Text>
                </Wrapper>
                <Wrapper
                  radius={`10px`}
                  bgColor={Theme.lightGrey2_C}
                  minHeight={`236px`}
                  ju={`flex-start`}
                  padding={`25px`}
                  fontSize={`16px`}
                  color={Theme.grey_C}
                >
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    margin={`0 0 12px`}
                  >
                    <Cicle />
                    <Text>PRO 광고 다음순으로 노출</Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    al={`flex-start`}
                    margin={`0 0 12px`}
                  >
                    <Text margin={`10px 0 0`}>
                      <Cicle />
                    </Text>
                    <Text>Jump up 광고 노출 시 순서 변동</Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    margin={`0 0 12px`}
                  >
                    <Cicle />
                    <Text>MASTER 광고 간 노출 순서 랜덤</Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    al={`flex-start`}
                  >
                    <Text margin={`10px 0 0`}>
                      <Cicle />
                    </Text>
                    <Text>
                      검색 페이지의 검색어, Tag 겹치는 내에서 연관도순, 인기순에
                      적용됩니다.
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`24px 24px 14px`}>
                  <Checkbox>Artisttem</Checkbox>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`0 24px`}>
                  <Checkbox>Musictem</Checkbox>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`14px 24px 24px`}>
                  <Checkbox>Artworks</Checkbox>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`48px`}
                  fontSize={`18px`}
                  radius={`7px`}
                >
                  신청하기
                </CommonButton>
              </Wrapper>
              <Wrapper width={width < 900 ? `100%` : `31%`}>
                <Wrapper
                  height={`200px`}
                  shadow={`3px 3px 10px rgba(0, 0, 0, 0.1)`}
                  radius={`10px`}
                >
                  <Text
                    fontSize={`34px`}
                    fontWeight={`bold`}
                    margin={`0 0 14px`}
                    color={Theme.basicTheme_C}
                  >
                    PRO
                  </Text>
                  <Text fontSize={`18px`}>50만원</Text>
                </Wrapper>
                <Wrapper
                  height={`65px`}
                  radius={`10px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  dr={`row`}
                  color={Theme.grey2_C}
                  fontSize={`18px`}
                  margin={`20px 0 12px`}
                >
                  <ClockCircleOutlined />
                  <Text color={Theme.adminTheme_1} margin={`0 0 0 8px`}>
                    1주
                  </Text>
                </Wrapper>
                <Wrapper
                  radius={`10px`}
                  bgColor={Theme.lightGrey2_C}
                  minHeight={`236px`}
                  ju={`flex-start`}
                  padding={`25px`}
                  fontSize={`16px`}
                  color={Theme.grey_C}
                >
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    margin={`0 0 12px`}
                  >
                    <Cicle />
                    <Text>1Page 최상단에 고정 노출</Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    al={`flex-start`}
                    margin={`0 0 12px`}
                  >
                    <Text margin={`10px 0 0`}>
                      <Cicle />
                    </Text>
                    <Text>PRO 광고 간 노출 순서 랜덤</Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wrap={`nowrap`}
                    al={`flex-start`}
                  >
                    <Text margin={`10px 0 0`}>
                      <Cicle />
                    </Text>
                    <Text>
                      검색 페이지의 검색어, Tag 겹치는 내에서 연관도순, 인기순에
                      적용됩니다.
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`24px 24px 14px`}>
                  <Checkbox>Artisttem</Checkbox>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`0 24px`}>
                  <Checkbox>Musictem</Checkbox>
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`14px 24px 24px`}>
                  <Checkbox>Artworks</Checkbox>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`48px`}
                  fontSize={`18px`}
                  radius={`7px`}
                >
                  신청하기
                </CommonButton>
              </Wrapper>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              fontSize={width < 900 ? `20px` : `30px`}
              fontWeight={`bold`}
              margin={`70px 0 20px`}
            >
              주의사항
            </Wrapper>
            <Wrapper
              padding={`26px`}
              al={`flex-start`}
              bgColor={Theme.subTheme_C}
              radius={`10px`}
              margin={`0 0 100px`}
            >
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                wrap={`nowrap`}
                al={`flex-start`}
              >
                <Text margin={`10px 0 0`}>
                  <Cicle />
                </Text>
                <Text>광고가 적용된 이후 서비스를 변경할 수 없습니다.</Text>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                wrap={`nowrap`}
                al={`flex-start`}
              >
                <Text margin={`10px 0 0`}>
                  <Cicle />
                </Text>
                <Text>
                  휴가모드, 또는 자발적 판매 중단 시 광고를 일시 정지하거나
                  기간을 연장할 수 없습니다.
                </Text>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                wrap={`nowrap`}
                al={`flex-start`}
              >
                <Text margin={`10px 0 0`}>
                  <Cicle />
                </Text>
                <Text>
                  광고는 구매 완료 시 즉시 서비스에 적용되며, 적용된 이후 중도
                  해지 시 환불이 불가합니다.
                </Text>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                wrap={`nowrap`}
                al={`flex-start`}
              >
                <Text margin={`10px 0 0`}>
                  <Cicle />
                </Text>
                <Text>
                  회원이 이용 약관 및 운영 정책을 위반하여 판매 중단 서비스,
                  이용 제한 및 기타 조치를 받을 경우 광고 기간은 연장되지
                  않으며, 환불이 불가합니다.
                </Text>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
