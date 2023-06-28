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
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { Checkbox, Form, Input, Modal, message } from "antd";
import Theme from "../../components/Theme";
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  ITEM_DELETE_REQUEST,
  ITEM_LIST_REQUEST,
  ITEM_UPDATE_REQUEST,
} from "../../reducers/bought";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const {
    wishItems,
    st_itemDeleteDone,
    st_itemDeleteError,
    st_itemUpdateDone,
    st_itemUpdateError,
  } = useSelector((state) => state.bought);

  const [currentData, setCurrentData] = useState([]);
  const [choicePrice, setChoicePrice] = useState(0);

  const [lModal, setLModal] = useState(false);
  const [lData, setLData] = useState(null);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [lForm] = Form.useForm();

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
    if (currentData && wishItems) {
      let tempPrice = 0;

      wishItems.map((data) => {
        if (currentData.includes(data.id)) {
          tempPrice += data.price;
        }
      });

      setChoicePrice(tempPrice);
    }
  }, [wishItems, currentData]);

  useEffect(() => {
    if (st_itemDeleteDone) {
      dispatch({
        type: ITEM_LIST_REQUEST,
      });

      setCurrentData([]);
      setChoicePrice(0);

      return message.success("트랙이 삭제되었습니다.");
    }
    if (st_itemDeleteError) {
      return message.error(st_itemDeleteError);
    }
  }, [st_itemDeleteDone, st_itemDeleteError]);

  useEffect(() => {
    if (st_itemUpdateDone) {
      dispatch({
        type: ITEM_LIST_REQUEST,
      });

      lForm.resetFields();
      licenceModalToggle(null);

      return message.success("라이센스가 변경되었습니다.");
    }
    if (st_itemUpdateError) {
      return message.error(st_itemUpdateError);
    }
  }, [st_itemUpdateDone, st_itemUpdateError]);

  ////// TOGGLE //////
  const licenceModalToggle = useCallback(
    (data) => {
      setLModal((prev) => !prev);

      if (data) {
        setLData(data);

        lForm.setFieldsValue({
          lisenceName: data.lisenceName,
        });
      } else {
        setLData(null);
      }
    },
    [lModal]
  );

  ////// HANDLER //////
  const choiceHandler = useCallback(
    (type) => {
      const index = currentData.indexOf(type.id);
      let tempArr = currentData.map((data) => data);

      if (index !== -1) {
        tempArr = tempArr.filter((data) => data !== type.id);
      } else {
        tempArr.push(type.id);
      }

      setCurrentData(tempArr);
    },
    [currentData]
  );

  const allChoiceHandler = useCallback(() => {
    if (wishItems) {
      let tempArr = [];
      wishItems.map((data) => {
        tempArr.push(data.id);
      });
      setCurrentData(tempArr);
    }
    if (wishItems.length === currentData.length) {
      setCurrentData([]);
    }
  }, [currentData, wishItems]);

  const choiceDeleteHandler = useCallback(() => {
    if (currentData.length !== 0) {
      dispatch({
        type: ITEM_DELETE_REQUEST,
        data: { itemId: currentData },
      });
    } else {
      message.error("트랙을 선택해주세요.");
    }
  }, [currentData]);

  const lisenceUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: ITEM_UPDATE_REQUEST,
        data: {
          id: lData.id,
          lisenceName: data.lisenceName,
          price: lData.price,
        },
      });
    },
    [lData]
  );

  const orderHandler = useCallback(() => {
    if (currentData.length !== 0) {
      let tempArr = [];
      wishItems.map((data) => {
        if (currentData.includes(data.id)) {
          tempArr.push(data);
        }
      });

      sessionStorage.setItem(
        "ORDER",
        JSON.stringify({
          items: tempArr,
          price: choicePrice,
        })
      );

      // dispatch({
      //   type: ITEM_DELETE_REQUEST,
      //   data: { itemId: currentData },
      // });

      router.push("/order");
    } else {
      message.error("트랙을 선택해주세요.");
    }
  }, [currentData, choicePrice, wishItems]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | 장바구니</title>
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
              장바구니
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Checkbox onClick={allChoiceHandler}>전체 선택</Checkbox>
              <SpanText
                fontSize={`10px`}
                margin={`0 10px`}
                color={Theme.lightGrey_C}
              >
                |
              </SpanText>
              <Text isHover onClick={choiceDeleteHandler}>
                삭제
              </Text>
            </Wrapper>
            <Wrapper
              borderTop={`1px solid ${Theme.lightGrey_C}`}
              margin={`16px 0 0`}
            >
              {wishItems && wishItems.length === 0 ? (
                <Wrapper
                  height={width < 900 ? `400px` : `630px`}
                  borderBottom={`1px solid ${Theme.lightGrey_C}`}
                >
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/blank.png`}
                    width={`76px`}
                  />
                  <Text
                    fontSize={width < 900 ? `18px` : `22px`}
                    color={Theme.grey2_C}
                    margin={`25px 0 0`}
                  >
                    관심 있는 음악을 미리 담아보세요!
                  </Text>
                </Wrapper>
              ) : (
                wishItems &&
                wishItems.map((data) => {
                  return (
                    <Wrapper
                      key={data.id}
                      dr={`row`}
                      padding={`40px 0`}
                      borderBottom={`1px solid ${Theme.lightGrey_C}`}
                    >
                      <Wrapper width={`5%`} al={`flex-start`}>
                        <Checkbox
                          checked={currentData.includes(data.id)}
                          onClick={() => {
                            choiceHandler(data);
                          }}
                        />
                      </Wrapper>
                      <Wrapper dr={`row`} ju={`flex-start`} width={`90%`}>
                        <Image
                          width={width < 900 ? `90px` : `160px`}
                          height={width < 900 ? `90px` : `160px`}
                          radius={`7px`}
                          src={data.thumbnail}
                        />
                        <Wrapper
                          width={`auto`}
                          al={`flex-start`}
                          ju={`space-between`}
                          padding={width < 900 ? `0 0 0 10px` : `0 0 0 32px`}
                          height={width < 900 ? `auto` : `160px`}
                        >
                          <Wrapper width={`auto`} al={`flex-start`}>
                            <Text
                              fontSize={width < 900 ? `14px` : `16px`}
                              fontWeight={`bold`}
                              color={Theme.darkGrey_C}
                            >
                              [{data.albumName}] {data.songName}
                            </Text>
                            <Text color={Theme.grey2_C}>
                              Album by {data.singerName}
                            </Text>
                            <Text
                              fontSize={width < 900 ? `16px` : `18px`}
                              margin={width < 900 ? `0` : `24px 0 0`}
                            >
                              [{data.lisenceName}]{" "}
                              {data.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              원
                            </Text>
                          </Wrapper>
                          <CommonButton
                            kindOf={`grey2`}
                            fontSize={width < 900 ? `14px` : `16px`}
                            width={`100px`}
                            padding={`0`}
                            height={`28px`}
                            onClick={() => licenceModalToggle(data)}
                          >
                            라이센스 변경
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        width={`5%`}
                        fontSize={width < 900 ? `20px` : `30px`}
                      >
                        <Text isHover>
                          <DownloadOutlined />
                        </Text>
                      </Wrapper>
                    </Wrapper>
                  );
                })
              )}
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-end`} margin={`40px 0 100px`}>
              <Text fontSize={`20px`} fontWeight={`bold`}>
                총 주문 금액
              </Text>
              <Text
                fontSize={`18px`}
                fontWeight={`bold`}
                margin={`0 20px 0 6px`}
                color={Theme.basicTheme_C}
              >
                {choicePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </Text>
              <CommonButton
                width={`265px`}
                height={`48px`}
                onClick={orderHandler}
              >
                총 {currentData.length}건 주문하기
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          <Modal
            onCancel={() => licenceModalToggle(null)}
            visible={lModal}
            footer={null}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                라이센스 변경
              </Text>
              <Form
                form={lForm}
                style={{ width: `100%` }}
                labelCol={{ span: 4 }}
                labelAlign={`left`}
                onFinish={lisenceUpdateHandler}
              >
                <Form.Item
                  label="라이센스"
                  name="lisenceName"
                  rules={[
                    {
                      required: true,
                      message: "라이센스는 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Wrapper dr={`row`} margin={`30px 0 0`}>
                  <CommonButton
                    width={`150px`}
                    height={`48px`}
                    fontSize={width < 800 ? `15px` : `18px`}
                    fontWeight={`bold`}
                    kindOf={`subTheme`}
                    margin={`0 4px 0 0`}
                    onClick={() => licenceModalToggle(null)}
                  >
                    취소
                  </CommonButton>
                  <CommonButton
                    width={`150px`}
                    height={`48px`}
                    fontSize={width < 800 ? `15px` : `18px`}
                    fontWeight={`bold`}
                    margin={`0 0 0 4px`}
                    htmlType="submit"
                  >
                    변경하기
                  </CommonButton>
                </Wrapper>
              </Form>
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

    context.store.dispatch({
      type: ITEM_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
