import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Popover,
  Table,
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
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  CATEGORY_ADMIN_LIST_REQUEST,
  CATEGORY_TYPE_GET_REQUEST,
  CATEGORY_TYPE_UPDATE_REQUEST,
} from "../../../reducers/category";

const Category = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("공용관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [infoForm] = Form.useForm();

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

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
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
  /////////////////////////////////////////////////////////////////////////

  const {
    categoryTypeList,
    //
    st_categoryTypeUpdateDone,
    st_categoryTypeUpdateError,
  } = useSelector((state) => state.category);
  console.log(categoryTypeList);

  ////// HOOKS //////

  // DATA
  const [isTypeModal, setIsTypeModal] = useState(false);
  const [currentData, setCurrentData] = useState(null); // 현재 데이터

  // FORM
  const [typeForm] = Form.useForm();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_categoryTypeUpdateDone) {
      setIsTypeModal(false);
      dispatch({
        type: CATEGORY_TYPE_GET_REQUEST,
      });

      return message.success("카테고리 타입명이 수정되었습니다.");
    }

    if (st_categoryTypeUpdateError) {
      return message.error(st_categoryTypeUpdateError);
    }
  }, [st_categoryTypeUpdateDone, st_categoryTypeUpdateError]);

  ////// TOGGLE //////

  // 카테고리 타입명 토글
  const categoryTypeToggle = useCallback(
    (data) => {
      if (data) {
        setCurrentData(data);
        typeForm.setFieldsValue({
          category: data.category,
        });
      }
      setIsTypeModal(!isTypeModal);
    },
    [isTypeModal]
  );

  ////// HANDLER //////

  // 카테고리 타입명 수정
  const categoryTypeUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: CATEGORY_TYPE_UPDATE_REQUEST,
        data: {
          id: currentData && currentData.id,
          category: data.category,
        },
      });
    },
    [currentData]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const cateCol = [
    {
      title: "번호",
      dataIndex: "num",
      width: `5%`,
    },
  ];

  const col = [
    {
      title: "번호",
      dataIndex: "num",
      width: `5%`,
    },
    {
      title: "카테고리 타입명",
      dataIndex: "category",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
      width: `15%`,
    },
    {
      title: "상세보기",
      render: (data) => (
        <Button size="small" type="primary">
          상세보기
        </Button>
      ),
      width: `10%`,
    },
    {
      title: "수정",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => categoryTypeToggle(data)}
        >
          수정
        </Button>
      ),
      width: `5%`,
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
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>카테고리를 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            카테고리 타입을 선택한 후 카테고리를 관리할 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju="space-between">
        <Wrapper shadow={`3px 3px 6px ${Theme.lightGrey_C}`}>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={categoryTypeList}
            size="small"
            // onRow={(record, index) => {
            //   return {
            //     onClick: (e) => beforeSetDataHandler(record),
            //   };
            // }}
          />
        </Wrapper>
      </Wrapper>

      <Drawer
        title="카테고리 타입 수정"
        visible={isTypeModal}
        width="600px"
        onClose={categoryTypeToggle}
      >
        <Form size="small" form={typeForm} onFinish={categoryTypeUpdateHandler}>
          <Form.Item
            label="카테고리 타입명"
            name="category"
            rules={[
              {
                required: true,
                message: "카테고리 타입명을 입력해주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Wrapper al={`flex-end`}>
            <Button size="small" type="primary" htmlType="submit">
              수정
            </Button>
          </Wrapper>
        </Form>
      </Drawer>

      <Drawer visible={true} title="카테고리 상세보기" width="900px">
        <Table />
      </Drawer>
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
      type: CATEGORY_TYPE_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Category);
