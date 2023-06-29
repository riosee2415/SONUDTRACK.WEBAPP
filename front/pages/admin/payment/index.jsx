import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, DatePicker, Form, Input, Popover, Select, Table } from "antd";
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
import {
  ADMINUSERLIST_REQUEST,
  LOAD_MY_INFO_REQUEST,
} from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { REVENUE_ADMIN_LIST_REQUEST } from "../../../reducers/revenue";

const Index = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("결제관리");
  const [level2, setLevel2] = useState("");
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

  const { revenueAdminList } = useSelector((state) => state.revenue);
  const { users } = useSelector((state) => state.user);

  ////// HOOKS //////

  //   STATE
  const [isType, setIsType] = useState(1); // 1:artistem 2:musictem 3:artworks

  //   FORM
  const [searchForm] = Form.useForm();

  ////// USEEFFECT //////

  ////// HANDLER //////

  //   초기화
  const resetHandler = useCallback(() => {
    searchForm.resetFields();

    dispatch({
      type: REVENUE_ADMIN_LIST_REQUEST,
      data: {
        type: isType,
      },
    });
  }, [isType]);

  //   검색
  const searchHandler = useCallback(
    (data) => {
      dispatch({
        type: REVENUE_ADMIN_LIST_REQUEST,
        data: {
          startDate: data.startDate && data.startDate.format("YYYY/MM/DD"),
          endDate: data.endDate && data.endDate.format("YYYY/MM/DD"),
          type: isType,
          UserId: data.UserId,
          artistName: data.artistName,
        },
      });
    },
    [isType]
  );

  //   typeHandler
  const typeHandler = useCallback((data) => {
    setIsType(data);

    dispatch({
      type: REVENUE_ADMIN_LIST_REQUEST,
      data: {
        type: data,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
      width: `5%`,
    },
    {
      title: "아티스트명",
      render: (data) => <div>{isType === 1 ? data.artistName : data.name}</div>,
      width: `10%`,
    },
    {
      title: "구매품목",
      render: (data) => {
        if (isType === 1) {
          return <div>{data.viewType}</div>;
        } else {
          return <div>{data.songName}</div>;
        }
      },
      width: `10%`,
    },
    {
      title: "사용포인트",
      dataIndex: "viewUsePointPrice",
      width: `10%`,
    },
    {
      title: "결제수단",
      dataIndex: "payWay",
      width: `10%`,
    },
    {
      title: "총 결제금액",
      dataIndex: "viewTotalPrice",
    },
    {
      title: "판매자 은행명",
      dataIndex: "artistBankname",
    },
    {
      title: "판매자 계좌정보",
      dataIndex: "artistAcconuntNum",
    },
    {
      title: "결제일",
      dataIndex: "viewCreatedAt",
      width: `10%`,
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
          <GuideLi>판매자 회원의 수익관리를 확인할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            판매자 회원의 수익관리를 확인할 수 있을 뿐, 다른 기능은 사용할 수
            없습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            검색시에는 artistem/musictem/artworks 먼저 선택 후 진행해주세요.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju="space-between">
        <Wrapper
          padding={`5px 10px`}
          bgColor={Theme.lightGrey_C}
          margin={`0 0 10px`}
          dr={`row`}
          ju={`flex-start`}
        >
          <Form
            size="small"
            style={{ flexDirection: `row`, display: `flex` }}
            form={searchForm}
            onFinish={searchHandler}
          >
            <Form.Item style={{ margin: `0 5px 0 0` }} name="startDate">
              <DatePicker
                placeholder="날짜를 선택해주세요."
                style={{ width: `200px` }}
              />
            </Form.Item>
            <Text margin={`0 5px 0 0`}>~</Text>
            <Form.Item style={{ margin: `0 5px 0 0` }} name="endDate">
              <DatePicker
                placeholder="날짜를 선택해주세요."
                style={{ width: `200px` }}
              />
            </Form.Item>

            <Form.Item style={{ margin: `0 5px 0 0` }} name="UserId">
              <Select
                style={{ width: `200px` }}
                placeholder="회원을 선택해주세요."
              >
                {users &&
                  users.map((data) => {
                    return (
                      <Select.Option key={data.id} value={data.id}>
                        {data.username}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>

            <Form.Item style={{ margin: `0 5px 0 0` }} name="artistName">
              <Input
                style={{ width: `200px` }}
                placeholder="아티스트명을 입력해주세요."
              />
            </Form.Item>
            <Button
              style={{ margin: `0 5px 0 0` }}
              type="primary"
              htmlType="submit"
            >
              검색
            </Button>
            <Button onClick={resetHandler}>초기화</Button>
          </Form>
          <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0 0`}>
            <Button
              type={isType === 1 ? `primary` : `default`}
              onClick={() => typeHandler(1)}
              style={{ margin: `0 5px 0 0` }}
              size="small"
            >
              artistem
            </Button>
            <Button
              type={isType === 2 ? `primary` : `default`}
              onClick={() => typeHandler(2)}
              style={{ margin: `0 5px 0 0` }}
              size="small"
            >
              musictem
            </Button>
            {/* <Button
              type={isType === 3 ? `primary` : `default`}
              onClick={() => typeHandler(3)}
              style={{ margin: `0 5px 0 0` }}
              size="small"
            >
              artworks
            </Button> */}
          </Wrapper>
        </Wrapper>
        <Wrapper shadow={`3px 3px 6px ${Theme.lightGrey_C}`}>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={revenueAdminList}
            size="small"
          />
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
      type: REVENUE_ADMIN_LIST_REQUEST,
      data: {
        type: 1,
      },
    });

    context.store.dispatch({
      type: ADMINUSERLIST_REQUEST,
      data: {
        type: 1,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Index);
