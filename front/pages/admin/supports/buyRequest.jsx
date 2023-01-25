import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { ModalBtn } from "../../../components/commonComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Table,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Button,
} from "antd";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
  DelBtn,
  SearchForm,
  SearchFormItem,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { useRouter } from "next/router";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  EyeOutlined,
  AlertOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  BUYREQUEST_ISOK_REQUEST,
  BUYREQUEST_ISREJECT_REQUEST,
  BUYREQUEST_LIST_REQUEST,
} from "../../../reducers/buyRequest";
import styled from "styled-components";

const TypeButton = styled(Button)`
  margin-right: 5px;
`;

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.adminTheme_1};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.adminTheme_1 : props.theme.lightGrey_C};
`;

const BuyRequest = () => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    buyRequests,
    //
    st_buyRequestIsOkLoading,
    st_buyRequestIsOkDone,
    st_buyRequestIsOkError,
    //
    st_buyRequestIsRejectLoading,
    st_buyRequestIsRejectDone,
    st_buyRequestIsRejectError,
  } = useSelector((state) => state.buyRequest);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("고객지원관리");
  const [level2, setLevel2] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [sameDepth, setSameDepth] = useState([]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const [infoForm] = Form.useForm();
  const [rForm] = Form.useForm();
  const [sForm] = Form.useForm();

  // 거절 모달
  const [rModal, setRModal] = useState(false);

  // 검색
  const [sData, setSData] = useState(null);
  const [sStatus, setSStatus] = useState(3);

  ////// USEEFFECT //////
  // 기본

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight6)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  // 검색
  useEffect(() => {
    dispatch({
      type: BUYREQUEST_LIST_REQUEST,
      data: {
        searchStatus: sStatus,
        searchSendUsername: sData ? sData.searchSendUsername : null,
        searchReceptionUsername: sData ? sData.searchReceptionUsername : null,
      },
    });
  }, [sData, sStatus]);

  // 승인 후 처리
  useEffect(() => {
    if (st_buyRequestIsOkDone) {
      dispatch({
        type: BUYREQUEST_LIST_REQUEST,
      });

      setCurrentData(null);

      return message.success("승인되었습니다.");
    }

    if (st_buyRequestIsOkError) {
      return message.error(st_buyRequestIsOkError);
    }
  }, [st_buyRequestIsOkDone || st_buyRequestIsOkError]);

  // 거절 후 처리
  useEffect(() => {
    if (st_buyRequestIsRejectDone) {
      dispatch({
        type: BUYREQUEST_LIST_REQUEST,
      });

      setCurrentData(null);

      rModalToggle();

      return message.success("거절되었습니다.");
    }

    if (st_buyRequestIsRejectError) {
      return message.error(st_buyRequestIsRejectError);
    }
  }, [st_buyRequestIsRejectDone || st_buyRequestIsRejectError]);

  ////// TOGGLE //////
  const rModalToggle = useCallback(() => {
    if (rModal) {
      rForm.resetFields();
    }

    setRModal((prev) => !prev);
  }, [rModal]);

  ////// HANDLER //////

  // 검색하기
  const searchHandler = useCallback(
    (data) => {
      setSData(data);
    },
    [sForm, sData]
  );

  const sStatusChangeHandler = useCallback(
    (status) => {
      setSStatus(status);
    },
    [sStatus]
  );

  // 선택하기
  const beforeSetDataHandler = useCallback(
    (data) => {
      if (currentData && data.id === currentData.id) {
        setCurrentData(null);
      } else {
        setCurrentData(data);
        infoForm.setFieldsValue({
          sendNickname: data.sendNickname,
          sendName: data.sendUsername,
          sendMobile: data.sendMobile,
          sendEmail: data.sendEmail,
          receptionNickname: data.receptionNickname,
          receptionName: data.receptionUsername,
          receptionMobile: data.receptionMobile,
          receptionEmail: data.receptionEmail,
          sendMessage: data.sendMessage,
          totalPrice: data.viewTotalPrice,
          rejectMessage: data.rejectMessage,
        });
      }
    },
    [currentData]
  );

  // 승인
  const okHandler = useCallback(() => {
    if (!currentData) {
      return message.error("잠시 후 다시 시용해주세요.");
    }
    dispatch({
      type: BUYREQUEST_ISOK_REQUEST,
      data: {
        id: currentData.id,
        isOk: 1,
      },
    });
  }, [currentData]);

  // 거절
  const rejectFinish = useCallback(
    (data) => {
      if (!currentData) {
        return message.error("잠시 후 다시 시용해주세요.");
      }
      dispatch({
        type: BUYREQUEST_ISREJECT_REQUEST,
        data: {
          id: currentData.id,
          isReject: 1,
          rejectMessage: data.rejectMessage,
        },
      });
    },
    [currentData]
  );

  ////// DATAVIEW /////

  const col = [
    {
      align: "center",
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "발신자이름",
      dataIndex: "sendUsername",
    },
    {
      title: "수신자이름",
      dataIndex: "receptionUsername",
    },
    {
      align: "end",
      title: "구매금액",
      dataIndex: "viewTotalPrice",
    },
    {
      title: "구매요청일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
      ),
    },
  ];
  return (
    <AdminLayout>
      {/* MENU TAB */}
      <Wrapper
        height={`30px`}
        bgColor={Theme.lightGrey_C}
        dr={`row`}
        ju={`flex-start`}
        al={`center`}
        padding={`0px 15px`}
        color={Theme.grey_C}
        shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
      >
        <HomeText
          margin={`3px 20px 0px 20px`}
          onClick={() => moveLinkHandler("/admin")}
        >
          <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
          메인
        </HomeText>
        <RightOutlined />
        <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
        <RightOutlined />
        <Popover content={content}>
          <HomeText cur={true} margin={`3px 20px 0px 20px`}>
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>구매요청된 데이터를 관리할 수 있습니다.</GuideLi>
          <GuideLi>발신자 이름과 수신자이름으로 검색할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            해당 페이지의 데이터는 화면에 즉시 적용되오니, 신중한 처리가
            필요합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper padding="0px 20px">
            {/* SEARCH FORM */}
            <SearchForm
              layout="inline"
              style={{ width: "100%" }}
              form={sForm}
              onFinish={searchHandler}
            >
              <SearchFormItem
                name="searchSendUsername"
                style={{ margin: `0px 0px 0px 5px` }}
              >
                <Input
                  size="small"
                  style={{ width: "185px" }}
                  placeholder={`발신자이름을 입력해주세요.`}
                />
              </SearchFormItem>
              <SearchFormItem
                name="searchReceptionUsername"
                style={{ margin: `0px 0px 0px 5px` }}
              >
                <Input
                  size="small"
                  style={{ width: "185px" }}
                  placeholder={`수신자이름을 입력해주세요.`}
                />
              </SearchFormItem>

              <SearchFormItem>
                <Button size="small" type="primary" htmlType="submit">
                  검색
                </Button>
              </SearchFormItem>
            </SearchForm>
          </Wrapper>

          <Wrapper
            padding="0px 20px"
            dr="row"
            ju="flex-start"
            margin="0px 0px 5px 0px"
          >
            <TypeButton
              type={sStatus === 3 ? "primary" : "default"}
              size="small"
              onClick={() => sStatusChangeHandler(3)}
            >
              전체
            </TypeButton>
            <TypeButton
              type={sStatus === 1 ? "primary" : "default"}
              size="small"
              onClick={() => sStatusChangeHandler(1)}
            >
              승인
            </TypeButton>
            <TypeButton
              type={sStatus === 2 ? "primary" : "default"}
              size="small"
              onClick={() => sStatusChangeHandler(2)}
            >
              거절
            </TypeButton>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            size="small"
            dataSource={buyRequests}
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  구매요청 정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: "100%", paddingRight: "20px" }}
              >
                {/* 발신자 정보 */}

                <Form.Item label="발신자 닉네임" name="sendNickname">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="발신자 이름" name="sendName">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="발신자 연락처" name="sendMobile">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="발신자 이메일" name="sendEmail">
                  <Input size="small" readOnly />
                </Form.Item>

                {/* 수신자 정보 */}

                <Form.Item label="수신자 닉네임" name="receptionNickname">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="수신자 이름" name="receptionName">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="수신자 연락처" name="receptionMobile">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="수신자 이메일" name="receptionEmail">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="요청내용" name="sendMessage">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="구매금액" name="totalPrice">
                  <Input size="small" readOnly />
                </Form.Item>

                {currentData && currentData.isReject ? (
                  <Form.Item label="거절사유" name="rejectMessage">
                    <Input.TextArea
                      size="small"
                      readOnly
                      autoSize={{
                        minRows: 5,
                        maxRows: 8,
                      }}
                    />
                  </Form.Item>
                ) : (
                  ""
                )}

                {currentData && (currentData.isOk || currentData.isReject) ? (
                  ""
                ) : (
                  <Wrapper dr={`row`} ju={`flex-end`}>
                    <ModalBtn
                      size="small"
                      type="danger"
                      onClick={rModalToggle}
                      loading={
                        st_buyRequestIsOkLoading || st_buyRequestIsRejectLoading
                      }
                    >
                      거절
                    </ModalBtn>
                    <Popconfirm
                      title="승인하시겠습니까?"
                      onConfirm={okHandler}
                      okText="승인"
                      cancelText="취소"
                      placement="topLeft"
                    >
                      <ModalBtn
                        size="small"
                        type="primary"
                        htmlType="submit"
                        loading={
                          st_buyRequestIsOkLoading ||
                          st_buyRequestIsRejectLoading
                        }
                      >
                        승인
                      </ModalBtn>
                    </Popconfirm>
                  </Wrapper>
                )}
              </Form>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>
            </>
          ) : (
            <Wrapper padding={`50px 0px`} dr="row">
              <AlertOutlined
                style={{
                  fontSize: "20px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              좌측 데이터를 선택하여 상세정보를 확인하세요.
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>

      <Modal
        width={`700px`}
        title="구매요청 거절"
        visible={rModal}
        onCancel={rModalToggle}
        footer={null}
      >
        <Form form={rForm} onFinish={rejectFinish}>
          <Form.Item
            name="rejectMessage"
            label="거절 사유"
            rules={[{ required: true, message: "거절사유는 필수입니다." }]}
          >
            <Input.TextArea
              placeholder="거절사유를 입력해주세요."
              autoSize={{
                minRows: 5,
                maxRows: 8,
              }}
            />
          </Form.Item>

          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onClick={rModalToggle}>
              취소
            </ModalBtn>
            <ModalBtn
              size="small"
              type="primary"
              htmlType="submit"
              loading={st_buyRequestIsOkLoading || st_buyRequestIsRejectLoading}
            >
              거절
            </ModalBtn>
          </Wrapper>
        </Form>
      </Modal>
    </AdminLayout>
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
      type: BUYREQUEST_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default BuyRequest;
