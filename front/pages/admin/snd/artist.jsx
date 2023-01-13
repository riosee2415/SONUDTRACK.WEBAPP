import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popover, Drawer } from "antd";
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
import { PERMM_WAITING_LIST_REQUEST } from "../../../reducers/artist";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";

const CustomBtn = styled(Button)`
  font-size: 12px;
  height: 25px;

  padding-right: 30px;

  position: relative;
`;

const Count = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  line-height: 22px;
  top: 0px;
  right: 4px;
  background-color: red;
  border-radius: 50%;
`;

const Artist = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { permmCnt, permmWaiting, permmWaitingList } = useSelector(
    (state) => state.artist
  );

  console.log(permmCnt);
  // console.log(permmWaiting);
  console.log(permmWaitingList);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("음원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [waitingDr, setWaitingDr] = useState(false);

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

  ////// USEEFFECT //////

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

  ////// HANDLER //////

  const waitingToggle = useCallback(() => {
    setWaitingDr((p) => !p);
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
      dataIndex: "plan",
    },
    {
      title: "역할 및 장르",
      dataIndex: "gen",
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
            >
              akdlfa
            </Button>
            <Button
              size="small"
              type="default"
              style={{ fontSize: "12px", height: "20px" }}
            >
              akdlfa
            </Button>
            <Button
              size="small"
              type="default"
              style={{ fontSize: "12px", height: "20px" }}
            >
              akdlfa
            </Button>
            <Button
              size="small"
              type="default"
              style={{ fontSize: "12px", height: "20px" }}
            >
              akdlfa
            </Button>
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
        return (
          <Wrapper dr="row" ju="flex-start">
            <Button
              size="small"
              type="primary"
              style={{ fontSize: "12px", height: "20px" }}
            >
              승인
            </Button>
            <Button
              size="small"
              type="danger"
              style={{ fontSize: "12px", height: "20px" }}
            >
              거절
            </Button>
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
            관리자는 아티스트의 정보를 변경할 수 없습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" margin="0px 0px 10px 0px">
        <Wrapper width="50%" dr="row" ju="flex-start">
          뚜뚜
        </Wrapper>
        <Wrapper width="50%" dr="row" ju="flex-end">
          <CustomBtn type="primary" size="small" onClick={waitingToggle}>
            판매자전환 신청리스트
            <Count>{permmCnt}</Count>
          </CustomBtn>
        </Wrapper>
      </Wrapper>

      <Drawer
        visible={waitingDr}
        title="판매자전환 신청리스트"
        width="100%"
        onClose={waitingToggle}
      >
        <Wrapper margin="10px 0px" dr="row" ju="flex-start">
          <Text color={Theme.naver_C}>
            판매자전환 신청 리스트 총 {permmCnt}개
          </Text>
        </Wrapper>

        <CustomTable
          rowKey="id"
          columns={columns}
          dataSource={permmWaitingList}
          size="small"
        />
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
      type: PERMM_WAITING_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Artist);
