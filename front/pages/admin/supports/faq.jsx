import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Select,
} from "antd";
import { useRouter, withRouter } from "next/router";
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
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
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
  FAQTYPE_DELETE_REQUEST,
  FAQTYPE_LIST_REQUEST,
  FAQTYPE_ADD_REQUEST,
  FAQ_ADMIN_LIST_REQUEST,
  FAQ_CREATE_REQUEST,
  FAQ_UPDATE_REQUEST,
  FAQ_DELETE_REQUEST,
} from "../../../reducers/faq";

const Faqbtn = styled(Button)`
  margin: 0px 5px 5px 0px;
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const TypeTable = styled(Table)`
  width: 100%;
  margin: 5px !important;
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
  color: ${(props) => props.theme.subTheme5_C};
`;

const Faq = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    typeList,
    faqAdminList,

    st_faqTypeAddDone,
    st_faqTypeAddError,

    st_faqTypeDeleteDone,
    st_faqTypeDeleteError,

    st_faqCreateDone,
    st_faqCreateError,

    st_faqUpdateDone,
    st_faqUpdateError,

    st_faqDeleteDone,
    st_faqDeleteError,
  } = useSelector((state) => state.faq);

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
        if (!data.useYn) return;

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

  const [typeForm] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [createForm] = Form.useForm();

  const [typeModal, setTypeModal] = useState(false); // 유형 모달
  const [cModal, setCModal] = useState(false); // 생성 모달

  const [tab, setTab] = useState(false); // 유형 아이디

  ////// USEEFFECT //////

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

  useEffect(() => {
    dispatch({
      type: FAQ_ADMIN_LIST_REQUEST,
      data: {
        FaqTypeId: tab,
      },
    });
  }, [tab]);

  // *************** FAQ TYPE 생성 후처리 ***************
  useEffect(() => {
    if (st_faqTypeAddDone) {
      dispatch({
        type: FAQTYPE_LIST_REQUEST,
      });

      typeForm.resetFields();

      return message.success("자주묻는질문 유형데이터가 추가되었습니다.");
    }
    if (st_faqTypeAddError) {
      return message.error(st_faqTypeAddError);
    }
  }, [st_faqTypeAddDone, st_faqTypeAddError]);

  // *************** FAQ TYPE 삭제 후처리 ***************
  useEffect(() => {
    if (st_faqTypeDeleteDone) {
      dispatch({
        type: FAQTYPE_LIST_REQUEST,
      });

      return message.success("자주묻는질문 유형데이터가 삭제되었습니다.");
    }
    if (st_faqTypeDeleteError) {
      return message.error(st_faqTypeDeleteError);
    }
  }, [st_faqTypeDeleteDone, st_faqTypeDeleteError]);

  // *************** FAQ 생성 후처리 ***************
  useEffect(() => {
    if (st_faqCreateDone) {
      dispatch({
        type: FAQ_ADMIN_LIST_REQUEST,
        data: {
          FaqTypeId: tab,
        },
      });

      createForm.resetFields();
      createToggleHandler();

      return message.success("자주묻는질이 생성되었습니다.");
    }
    if (st_faqCreateError) {
      return message.error(st_faqCreateError);
    }
  }, [st_faqCreateDone, st_faqCreateError]);

  // *************** FAQ 수정 후처리 ***************
  useEffect(() => {
    if (st_faqUpdateDone) {
      dispatch({
        type: FAQ_ADMIN_LIST_REQUEST,
        data: {
          FaqTypeId: tab,
        },
      });

      return message.success("자주묻는질이 수정되었습니다.");
    }
    if (st_faqUpdateError) {
      return message.error(st_faqUpdateError);
    }
  }, [st_faqUpdateDone, st_faqUpdateError]);

  // *************** FAQ 삭제 후처리 ***************
  useEffect(() => {
    if (st_faqDeleteDone) {
      dispatch({
        type: FAQ_ADMIN_LIST_REQUEST,
        data: {
          FaqTypeId: tab,
        },
      });

      setCurrentData(null);

      return message.success("자주묻는질이 삭제되었습니다.");
    }
    if (st_faqDeleteError) {
      return message.error(st_faqDeleteError);
    }
  }, [st_faqDeleteDone, st_faqDeleteError]);

  ////// TOGGLE //////

  const typeModalToggleHandler = useCallback(() => {
    setTypeModal((prev) => !prev);
  }, [typeModal]);

  const createToggleHandler = useCallback(() => {
    setCModal((prev) => !prev);
  }, [cModal]);

  ////// HANDLER //////

  const tabClickHandler = useCallback(
    (v) => {
      setTab(v);
    },
    [tab]
  );

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        type: record.FaqTypeId,
        question: record.question,
        answer: record.answer,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });
    },
    [currentData, infoForm]
  );

  const typeListAddHandler = useCallback((data) => {
    dispatch({
      type: FAQTYPE_ADD_REQUEST,
      data: {
        value: data.type,
      },
    });
  }, []);

  const typeDeleteClickHandler = useCallback((data) => {
    dispatch({
      type: FAQTYPE_DELETE_REQUEST,
      data: {
        value: data.value,
        id: data.id,
      },
    });
  }, []);

  const createHandler = useCallback((data) => {
    dispatch({
      type: FAQ_CREATE_REQUEST,
      data: {
        FaqTypeId: data.type,
      },
    });
  }, []);

  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: FAQ_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          question: data.question,
          answer: data.answer,
          FaqTypeId: data.type,
        },
      });
    },
    [currentData]
  );

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: FAQ_DELETE_REQUEST,
      data: {
        id: data.id,
        question: data.question,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형명",
      dataIndex: "value",
    },
    {
      title: "질문",
      dataIndex: "question",
    },
    {
      title: "생성일",
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
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title={"정말 삭제하시겠습니까?"}
          okText="삭제"
          cancelText="취소"
          onConfirm={() => deleteHandler(data)}
        >
          <DelBtn />
        </Popconfirm>
      ),
    },
  ];

  const modalcol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형명",
      dataIndex: "value",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "업데이터",
      dataIndex: "username",
    },
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title={"정말 삭제하시겠습니까?"}
          okText="삭제"
          cancelText="취소"
          onConfirm={() => typeDeleteClickHandler(data)}
        >
          <DelBtn />
        </Popconfirm>
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
          <GuideLi>자주묻는 질문의 유형과 데이터를 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            해당 페이지의 데이터는 화면에 즉시 적용되오니, 신중한 처리가
            필요합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper dr={`row`} ju={`flex-end`} margin={`0px 0px 5px 0px`}>
            <Button size="small" type="primary" onClick={createToggleHandler}>
              자주묻는질문 생성
            </Button>

            <Button
              size="small"
              type="primary"
              style={{ marginLeft: `5px` }}
              onClick={() => typeModalToggleHandler()}
            >
              유형관리
            </Button>
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 10px 0px`}>
            <Faqbtn
              size="small"
              onClick={() => tabClickHandler(false)}
              type={tab === false ? "primary" : "default"}
            >
              전체
            </Faqbtn>

            {typeList &&
              typeList.map((data) => {
                return (
                  <Faqbtn
                    size="small"
                    onClick={() => tabClickHandler(data.id)}
                    type={tab === data.id ? "primary" : "default"}
                  >
                    {data.value}
                  </Faqbtn>
                );
              })}
          </Wrapper>

          <Table
            size="small"
            rowKey="num"
            columns={col}
            style={{ width: "100%" }}
            dataSource={faqAdminList}
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>

        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <Wrapper>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  자주묻는질문 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                onFinish={updateHandler}
              >
                <Form.Item
                  label="유형"
                  name="type"
                  rules={[
                    { required: true, message: "유형은 선택은 필수입니다." },
                  ]}
                >
                  <Select size="small">
                    {typeList &&
                      typeList.map((data) => {
                        return (
                          <Select.Option key={data.id} value={data.id}>
                            {data.value}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="질문"
                  name="question"
                  rules={[
                    { required: true, message: "질문은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="답변"
                  name="answer"
                  rules={[
                    { required: true, message: "답변은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input.TextArea rows={10} />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="최근작업자" name="updator">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper al="flex-end">
                  <Button type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </Button>
                </Wrapper>
              </Form>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>
            </Wrapper>
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

      {/* CREATE FORM */}

      <Modal
        width={`680px`}
        footer={null}
        title={`유형관리`}
        visible={typeModal}
        onCancel={() => typeModalToggleHandler()}
      >
        <GuideUl>
          <GuideLi>자주묻는질문의 유형을 추가 / 삭제 할 수 있습니다.</GuideLi>
        </GuideUl>

        <Form
          form={typeForm}
          wrapperCol={{ span: 21 }}
          labelCol={{ span: 3 }}
          onFinish={typeListAddHandler}
        >
          <Form.Item
            label="유형"
            name="type"
            rules={[{ required: true, message: "유형은 필수입니다." }]}
          >
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Input style={{ width: "90%" }} size="small" allowClear />

              <Button size="small" type="primary" htmlType="submit">
                등록
              </Button>
            </Wrapper>
          </Form.Item>
        </Form>

        <TypeTable
          size="small"
          rowKey="id"
          columns={modalcol}
          style={{ width: "100%", margin: "0px" }}
          dataSource={typeList}
        />
      </Modal>

      <Modal
        footer={null}
        visible={cModal}
        width={`500px`}
        title={"자주묻는질문 생성"}
        onCancel={createToggleHandler}
      >
        <GuideUl>
          <GuideLi>자주묻는질문을 추가 할 수 있습니다.</GuideLi>
        </GuideUl>

        <Form
          form={createForm}
          wrapperCol={{ span: 21 }}
          labelCol={{ span: 3 }}
          onFinish={createHandler}
        >
          <Form.Item
            label="유형"
            name="type"
            rules={[{ required: true, message: "유형은 선택은 필수입니다." }]}
          >
            <Select size="small">
              {typeList &&
                typeList.map((data) => {
                  return (
                    <Select.Option key={data.id} value={data.id}>
                      {data.value}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Wrapper dr={`row`} ju={`flex-end`}>
            <Button size="small" type="primary" htmlType="submit">
              생성
            </Button>
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
      type: FAQTYPE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Faq);
