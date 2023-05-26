import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Button, Table, Form, Input, message, Popconfirm } from "antd";
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
import { saveAs } from "file-saver";
import {
  QUESTION_GET_REQUEST,
  QUESTION_UPDATE_REQUEST,
} from "../../../reducers/question";

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

const Contact = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const {
    questions,
    //
    st_questionUpdateDone,
    st_questionUpdateError,
  } = useSelector((state) => state.question);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("게시판관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [currentData, setCurrentData] = useState(null);
  const [currentTop, setCurrentTop] = useState(false);
  const [tab, setTab] = useState(0);

  const [infoForm] = Form.useForm();

  const fileRef = useRef();

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

  const [currentTab, setCurrentTab] = useState(0); // 3:전체, 2:승인, 1:미승인

  ////// USEEFFECT //////

  // 승인 후 처리
  useEffect(() => {
    if (st_questionUpdateDone) {
      dispatch({
        type: QUESTION_GET_REQUEST,
      });
      return message.success("승인되었습니다.");
    }
  }, [st_questionUpdateDone, st_questionUpdateError]);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight4)) {
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

  ////// TOGGLE //////

  // currentTAb Toggle
  const currentTabToggle = useCallback((data) => {
    setCurrentTab(data);

    dispatch({
      type: QUESTION_GET_REQUEST,
      data: {
        isConfirmed: data,
      },
    });
  }, []);
  ////// HANDLER //////

  // updateHandler
  const updateHandler = useCallback(() => {
    dispatch({
      type: QUESTION_UPDATE_REQUEST,
      data: {
        id: currentData && currentData.id,
      },
    });
  }, [currentData]);

  // 데이터불러오기
  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        name: record.name,
        email: record.email,
        title: record.title,
        content: record.content,
        isConfirmed: record.isConfirmed ? "승인" : "미승인",
        viewCreatedAt: record.viewCreatedAt,
        viewUpdatedAt: record.viewUpdatedAt,
      });
    },
    [currentData, infoForm, currentTop]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const noticeCol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "문의제목",
      dataIndex: "title",
      width: "50%",
    },
    {
      title: "작성일",
      dataIndex: "viewCreatedAt",
    },

    {
      title: "상태창",
      render: (data) => (
        <ViewStatusIcon
          active={
            parseInt(data.id) === (currentData && parseInt(currentData.id))
          }
        />
      ),
    },
    {
      title: "승인여부",
      render: (data) =>
        data.isConfirmed ? (
          "완료"
        ) : (
          <Popconfirm
            title="정말 승인하시겠습니까?"
            onConfirm={() => updateHandler(data)}
            okText="승인"
            cancelText="취소"
          >
            <Button type="primary" size="small">
              승인
            </Button>
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
          <GuideLi>사용자가 문의한 문의내역을 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            연락은 수기로 처리해주셔야 하며, 수기처리 이후 승인처리를 해주셔야
            합니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            승인 후 관리에서 확인만 가능할뿐 사용자는 확인할 수 없습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper margin={`0 0 20px`} dr={`row`} ju={`flex-start`}>
          <Button
            onClick={() => currentTabToggle(3)}
            type={currentTab === 3 ? "primary" : "default"}
            size="small"
          >
            전체
          </Button>
          <Button
            onClick={() => currentTabToggle(2)}
            type={currentTab === 2 ? "primary" : "default"}
            size="small"
          >
            승인
          </Button>
          <Button
            onClick={() => currentTabToggle(1)}
            type={currentTab === 1 ? "primary" : "default"}
            size="small"
          >
            미승인
          </Button>
        </Wrapper>
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Table
            size="small"
            dataSource={questions}
            columns={noticeCol}
            rowKey="id"
            style={{ width: "100%" }}
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          ></Table>
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
                  기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: "100%", paddingRight: "20px" }}
                onFinish={updateHandler}
              >
                <Form.Item label="이름" name="name">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="이메일" name="email">
                  <Input readOnly rows={10} />
                </Form.Item>

                <Form.Item label="제목" name="title">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="내용" name="content">
                  <Input.TextArea
                    size="small"
                    readOnly
                    style={{ height: `150px` }}
                  />
                </Form.Item>

                <Form.Item label="작성일" name="viewCreatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="viewUpdatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                {!currentData && currentData.isConfirmed && (
                  <Wrapper al="flex-end">
                    <Button type="primary" size="small" htmlType="submit">
                      승인
                    </Button>
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
      type: QUESTION_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Contact);
