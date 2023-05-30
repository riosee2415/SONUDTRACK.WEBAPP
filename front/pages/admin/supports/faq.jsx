import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Popconfirm, Popover, Table } from "antd";
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
  SearchForm,
  SearchFormItem,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  ADMIN_FAQ_LIST_REQUEST,
  FAQ_CREATE_REQUEST,
  FAQ_DELETE_REQUEST,
  FAQ_UPDATE_REQUEST,
} from "../../../reducers/faq";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.basicTheme_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.basicTheme_C : props.theme.lightGrey_C};
`;

const Faq = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    adminFaqList,

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
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();

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

  const [searchForm] = Form.useForm();

  const [searchTitle, setSearchTitle] = useState("");

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
      type: ADMIN_FAQ_LIST_REQUEST,
      data: {
        question: searchTitle,
      },
    });
  }, [searchTitle]);

  // ********************** 자주묻는질문 생성 후처리 *************************

  useEffect(() => {
    if (st_faqCreateDone) {
      dispatch({
        type: ADMIN_FAQ_LIST_REQUEST,
        data: {
          question: searchTitle,
        },
      });

      return message.success("자주묻는질문이 생성되었습니다.");
    }

    if (st_faqCreateError) {
      return message.error(st_faqCreateError);
    }
  }, [st_faqCreateDone, st_faqCreateError]);

  // ********************** 자주묻는질문 수정 후처리 *************************

  useEffect(() => {
    if (st_faqUpdateDone) {
      dispatch({
        type: ADMIN_FAQ_LIST_REQUEST,
        data: {
          question: searchTitle,
        },
      });

      return message.success("자주묻는질문이 수정되었습니다.");
    }

    if (st_faqUpdateError) {
      return message.error(st_faqUpdateError);
    }
  }, [st_faqUpdateDone, st_faqUpdateError]);

  // ********************** 자주묻는질문 삭제 후처리 *************************

  useEffect(() => {
    if (st_faqDeleteDone) {
      message.success("자주묻는질문이 삭제되었습니다.");
      setCurrentData(null);
      dispatch({
        type: ADMIN_FAQ_LIST_REQUEST,
        data: {
          question: searchTitle,
        },
      });
    }
  }, [st_faqDeleteDone]);

  useEffect(() => {
    if (st_faqDeleteError) {
      return message.error(st_faqDeleteError);
    }
  }, [st_faqDeleteError]);

  ////// HANDLER //////

  const searchHandler = useCallback(
    (data) => {
      setSearchTitle(data.title);
    },
    [searchTitle]
  );

  const allSearchHandler = useCallback(() => {
    searchForm.resetFields();
    setSearchTitle("");
  }, [searchTitle]);

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        question: record.question,
        answer: record.answer,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });
    },
    [currentData, infoForm]
  );

  const createHandler = useCallback(() => {
    dispatch({
      type: FAQ_CREATE_REQUEST,
    });
  }, []);

  const updateHandler = useCallback(
    (data) => {
      if (
        data.question === currentData.question &&
        data.answer === currentData.answer
      ) {
        return message.info("변경할 데이터가 없습니다.");
      }

      dispatch({
        type: FAQ_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          question: data.question,
          answer: data.answer,
        },
      });
    },
    [currentData]
  );

  const deleteHnadler = useCallback((data) => {
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
          title="정말 삭제하시겠습니까?"
          onConfirm={() => deleteHnadler(data)}
          okText="삭제"
          cancelText="취소"
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
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
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
          <GuideLi isImpo={true}>
            자주묻는질문을 추가 / 수정 / 삭제 등 관리를 할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 자주묻는질문은 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="0px 20px">
        {/* SEARCH FORM */}
        <SearchForm
          layout="inline"
          style={{ width: "100%" }}
          form={searchForm}
          onFinish={searchHandler}
        >
          <SearchFormItem name="title" style={{ margin: `0px 0px 0px 5px` }}>
            <Input
              size="small"
              style={{ width: "200px" }}
              placeholder="질문으로 검색해주세요."
            />
          </SearchFormItem>

          <SearchFormItem>
            <Button size="small" type="primary" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>

          <SearchFormItem>
            <Button
              icon={<UnorderedListOutlined />}
              size="small"
              type="primary"
              onClick={allSearchHandler}
            >
              전체조회
            </Button>
          </SearchFormItem>
        </SearchForm>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper al="flex-end" margin={`0px 0px 5px 0px`}>
            <Button size="small" type="primary" onClick={createHandler}>
              자주묻는질문 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={adminFaqList}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>

        <Wrapper
          width={`calc(50% - 10px)`}
          padding="5px"
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
                    {
                      required: true,
                      message: "답변은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input.TextArea rows={10} size="small" />
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
      type: ADMIN_FAQ_LIST_REQUEST,
      data: {
        question: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Faq);
