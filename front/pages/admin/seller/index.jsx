import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popover, Popconfirm, message } from "antd";
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
  CustomTable,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";

import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  SELLER_ADMIN_PERMIT_REQUEST,
  SELLER_LIST_REQUEST,
} from "../../../reducers/seller";

const Artist = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const {
    sellerList,
    //
    st_adminPermitDone,
    st_adminPermitError,
  } = useSelector((state) => state.seller);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("판매자관리");
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

      if (!(me && me.menuRight8)) {
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

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  const [currentTab, setCurrentTab] = useState(1); // 1:승인대기중/2:승인/3:반려/4:전체

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_adminPermitDone) {
      message.info("판매자 전환이 승인되었습니다.");
      dispatch({
        type: SELLER_LIST_REQUEST,
        data: {
          status: currentTab,
        },
      });
    }

    if (st_adminPermitError) {
      return message.error(st_adminPermitError);
    }
  }, [st_adminPermitDone, st_adminPermitError]);

  ////// HANDLER //////

  // 검색
  const searchHandler = useCallback((data) => {
    setCurrentTab(data);

    dispatch({
      type: SELLER_LIST_REQUEST,
      data: {
        status: data,
      },
    });
  }, []);

  // 승인
  const okPermm = useCallback((data) => {
    dispatch({
      type: SELLER_ADMIN_PERMIT_REQUEST,
      data: {
        id: data.id,
        status: 2,
        UserId: data.UserId,
        userId: data.userId,
      },
    });
  }, []);

  // 반려
  const delPermm = useCallback((data) => {
    dispatch({
      type: SELLER_ADMIN_PERMIT_REQUEST,
      data: {
        id: data.id,
        status: 3,
        UserId: data.UserId,
        userId: data.userId,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "이름",
      dataIndex: "username",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "연락처",
      dataIndex: "mobile",
    },
    {
      title: "활동계획",
      dataIndex: "activity",
    },
    {
      title: "역할 및 장르",
      dataIndex: "genre",
    },
    {
      title: "첨부파일",
      render: (data) => {
        return (
          <Wrapper al="flex-start">
            <Button
              size="small"
              type="default"
              style={{ fontSize: "12px", height: "20px" }}
              download
              href={data.filepath}
            >
              {data.filename}
            </Button>
            {/* {data.filelist.map((item, idx) => {
              return (
                <Button
                  key={idx}
                  size="small"
                  type="default"
                  style={{ fontSize: "12px", height: "20px" }}
                >
                  {item.filename}
                </Button>
              );
            })} */}
          </Wrapper>
        );
      },
    },
    {
      title: "신청일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "승인/거절",
      render: (data) => {
        return data.viewStatus ? (
          data.viewStatus
        ) : (
          <Wrapper dr="row" ju="flex-start">
            <Popconfirm
              title="판매자로 승인하시겠습니까?"
              okText="승인"
              cancelText="취소"
              onConfirm={() => okPermm(data)}
            >
              <Button
                size="small"
                type="primary"
                style={{ fontSize: "12px", height: "20px" }}
              >
                승인
              </Button>
            </Popconfirm>

            <Popconfirm
              title="판매자 신청을 거절하시겠습니까?"
              okText="거절"
              cancelText="취소"
              onConfirm={() => delPermm(data)}
            >
              <Button
                size="small"
                type="danger"
                style={{ fontSize: "12px", height: "20px" }}
              >
                거절
              </Button>
            </Popconfirm>
          </Wrapper>
        );
      },
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
          <GuideLi>
            회원 중 판매자로 전환 된 회원 정보 및 판매관련 정보를 확인할 수
            있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            판매자 거절을 해도 사용자는 판매자 재신청이 가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}
      <Wrapper padding="0px 20px">
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
          <Button
            onClick={() => searchHandler(1)}
            style={{ margin: `0 5px 0 0` }}
            size="small"
            type={currentTab === 1 ? "primary" : "default"}
          >
            승인 대기중
          </Button>
          <Button
            onClick={() => searchHandler(2)}
            style={{ margin: `0 5px 0 0` }}
            size="small"
            type={currentTab === 2 ? "primary" : "default"}
          >
            승인
          </Button>
          <Button
            onClick={() => searchHandler(3)}
            style={{ margin: `0 5px 0 0` }}
            size="small"
            type={currentTab === 3 ? "primary" : "default"}
          >
            반려
          </Button>
          <Button
            onClick={() => searchHandler(4)}
            style={{ margin: `0 5px 0 0` }}
            size="small"
            type={currentTab === 4 ? "primary" : "default"}
          >
            전체
          </Button>
        </Wrapper>

        <CustomTable
          rowKey="id"
          columns={columns}
          dataSource={sellerList}
          size="small"
        />
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
      type: SELLER_LIST_REQUEST,
      data: {
        status: 1,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Artist);
