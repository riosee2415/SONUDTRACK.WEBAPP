import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Popover,
  Drawer,
  Switch,
  Popconfirm,
  message,
  Modal,
  Image,
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
  CustomTable,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  PERMM_WAITING_LIST_REQUEST,
  PERMM_WAITING_OK_REQUEST,
  PERMM_WAITING_DEL_REQUEST,
  ARTISTEM_LIST_REQUEST,
  ARTISTEM_ING_UP_REQUEST,
  ARTISTEM_TOP_UP_REQUEST,
} from "../../../reducers/artist";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";

const InfoTab = styled.span`
  padding: 1px 3px;
  border-radius: 7px;

  background-color: ${(props) =>
    props.tag ? props.theme.subTheme3_C : props.theme.adminTheme_4};
  color: #fff;
  margin-right: 5px;
`;

const CateBox = styled.span`
  padding: 2px 9px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.subTheme3_C};
  color: #fff;
`;

const CustomBtn = styled(Button)`
  font-size: 12px;
  height: 25px;

  padding-right: 30px;

  position: relative;
`;

const ContentView = styled(Text)`
  width: 100%;
  padding: 15px;

  box-shadow: 3px 3px 10px #d6d6d6;
  border-radius: 5px;
  margin-top: 10px;
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

const ViewTitle = styled.span`
  display: inline-block;
  font-size: 17px;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    bottom: -2px;
    right: -15px;
    width: 30px;
    height: 15px;
    background-color: #2b17c8;
    border-radius: 6px;
    opacity: 0.3;
  }
`;

const Artist = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    permmCnt,
    artistList,
    permmWaitingList,
    artistems,
    //
    // 신청자 승인 후 처리
    st_permmWaitingOkDone,
    st_permmWaitingOkError,
    //
    // 신청자 승인 후 처리
    st_permmWaitingDelDone,
    st_permmWaitingDelError,
    //
    // 판매여부 수정 후 처리
    st_artistemIngUpLoading,
    st_artistemIngUpDone,
    st_artistemIngUpError,
    //
    // 상단고정 수정 후 처리
    st_artistemUpUpLoading,
    st_artistemUpUpDone,
    st_artistemUpUpError,
  } = useSelector((state) => state.artist);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("음원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [waitingDr, setWaitingDr] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [cd, setCd] = useState(null);

  const [artistemDr, setArtistemDr] = useState(false);

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

  // 상단고정 수정 후 처리
  useEffect(() => {
    if (st_artistemUpUpDone) {
      message.info("상단고정 여부가 수정되었습니다.");

      dispatch({
        type: ARTISTEM_LIST_REQUEST,
        data: {
          ArtistId: cd.id,
        },
      });
    }

    if (st_artistemUpUpError) {
      return message.error(st_artistemUpUpError);
    }
  }, [st_artistemUpUpDone, st_artistemUpUpError]);

  // 판매여부 수정 후 처리
  useEffect(() => {
    if (st_artistemIngUpDone) {
      message.info("판매여부가 수정되었습니다.");

      dispatch({
        type: ARTISTEM_LIST_REQUEST,
        data: {
          ArtistId: cd.id,
        },
      });
    }

    if (st_artistemIngUpError) {
      return message.error(st_artistemIngUpError);
    }
  }, [st_artistemIngUpDone, st_artistemIngUpError]);

  useEffect(() => {
    if (st_permmWaitingDelDone) {
      message.info("데이터가 변경되었습니다.");
      dispatch({
        type: PERMM_WAITING_LIST_REQUEST,
      });
    }

    if (st_permmWaitingDelError) {
      return message.error(st_permmWaitingDelError);
    }
  }, [st_permmWaitingDelDone, st_permmWaitingDelError]);

  useEffect(() => {
    if (st_permmWaitingOkDone) {
      message.info("판매자 전환이 승인되었습니다.");
      dispatch({
        type: PERMM_WAITING_LIST_REQUEST,
      });
    }

    if (st_permmWaitingOkError) {
      return message.error(st_permmWaitingOkError);
    }
  }, [st_permmWaitingOkDone, st_permmWaitingOkError]);

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

  const topHandler = useCallback((data) => {
    const nextFlag = data.isTop === 1 ? 0 : 1;

    dispatch({
      type: ARTISTEM_TOP_UP_REQUEST,
      data: {
        id: data.id,
        nextFlag,
      },
    });
  }, []);

  const ingHandler = useCallback((data) => {
    const nextFlag = !data.isIng ? 1 : 0;

    dispatch({
      type: ARTISTEM_ING_UP_REQUEST,
      data: {
        id: data.id,
        nextFlag,
      },
    });
  }, []);

  const artistemToggle = useCallback((data) => {
    if (data) {
      dispatch({
        type: ARTISTEM_LIST_REQUEST,
        data: {
          ArtistId: data.id,
        },
      });

      setCd(data);
    }

    setArtistemDr((p) => !p);
  }, []);

  const infoModalToggle = useCallback((data) => {
    if (data) {
      setCd(data);
    }

    setInfoModal((p) => !p);
  }, []);

  const waitingToggle = useCallback(() => {
    setWaitingDr((p) => !p);
  }, []);

  const okPermm = useCallback((data) => {
    dispatch({
      type: PERMM_WAITING_OK_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  const delPermm = useCallback((data) => {
    dispatch({
      type: PERMM_WAITING_DEL_REQUEST,
      data: {
        id: data.id,
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
            {data.filelist.map((item, idx) => {
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
            })}
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

  const columns2 = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "이름",
      dataIndex: "username",
    },
    {
      title: "닉네임",
      dataIndex: "nickname",
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
      title: "회원가입일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "판매자전환일",
      dataIndex: "viewPermmAt",
    },
    {
      title: "판매자정보",
      render: (data) => (
        <Button
          size="small"
          style={{ fontSize: "12px", height: "20px" }}
          onClick={() => infoModalToggle(data)}
        >
          정보확인
        </Button>
      ),
    },
    {
      title: "아티스탬",
      render: (data) => (
        <Button
          size="small"
          style={{ fontSize: "12px", height: "20px" }}
          type="primary"
          onClick={() => artistemToggle(data)}
        >
          아티스탬
        </Button>
      ),
    },
    {
      title: "판매자제거",
      render: (data) => (
        <Popconfirm
          title="삭제된 판매자는 복구할 수 없습니다. 정말 삭제하시겠습니까?"
          okText="삭제"
          cancelText="취소"
          onConfirm={() => delPermm(data)}
        >
          <Button
            size="small"
            style={{ fontSize: "12px", height: "20px" }}
            type="danger"
          >
            판매자제거
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const columns3 = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "음원명",
      render: (data) => (
        <Text fontSize="12px" color="#000" fontWeight="bold">
          {data.title}
        </Text>
      ),
    },
    {
      title: "카테고리",
      render: (data) => <CateBox>{data.caValue}</CateBox>,
    },
    {
      title: "부제",
      render: (data) => (
        <Text fontSize="10px" color="#999">
          {data.subTitle}
        </Text>
      ),
    },
    {
      title: "판매여부",
      render: (data) => (
        <Switch
          checked={!data.isIng}
          onChange={() => ingHandler(data)}
          loading={st_artistemIngUpLoading}
        />
      ),
    },
    {
      title: "스텐다드 금액",
      dataIndex: "viewsPrice",
    },
    {
      title: "디럭스 금액",
      dataIndex: "viewdPrice",
    },
    {
      title: "플레티넘 금액",
      dataIndex: "viewpPrice",
    },
    {
      title: "음원등록일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "비트주파수",
      dataIndex: "bitRate",
    },
    {
      title: "샘플링주파수",
      dataIndex: "sampleRate",
    },
    {
      title: "상단고정여부",
      render: (data) => (
        <Switch
          checked={data.isTop}
          onChange={() => topHandler(data)}
          loading={st_artistemUpUpLoading}
        />
      ),
    },
    {
      title: "커버이미지",
      render: (data) => (
        <Image
          src={data.coverImage}
          style={{ width: "40px", height: "40px" }}
        />
      ),
    },
    {
      title: "테그 정보",
      render: (data) =>
        data.tags.map((data, idx) => {
          return (
            <InfoTab key={idx} tag={true}>
              {data}
            </InfoTab>
          );
        }),
    },
    {
      title: "장르 정보",
      render: (data) =>
        data.gens.map((data, idx) => {
          return <InfoTab key={idx}>{data}</InfoTab>;
        }),
    },
    {
      title: "다운로드",
      render: (data) => "ddd",
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
        <Wrapper width="50%" dr="row" ju="flex-start"></Wrapper>
        <Wrapper width="50%" dr="row" ju="flex-end">
          <CustomBtn type="primary" size="small" onClick={waitingToggle}>
            판매자전환 신청리스트
            <Count>{permmCnt}</Count>
          </CustomBtn>
        </Wrapper>
      </Wrapper>

      {/* CONTENT */}
      <Wrapper padding="0px 20px">
        <CustomTable
          rowKey="id"
          columns={columns2}
          dataSource={artistList}
          size="small"
        />
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

      <Modal
        visible={infoModal}
        title={`${cd && cd.username}님의 판매자 정보`}
        width="1000px"
        footer={null}
        onCancel={() => infoModalToggle(null)}
      >
        <ViewTitle>활동계획</ViewTitle>
        <ContentView>
          {cd ? cd.plan : "등록된 활동계획이 없습니다."}
        </ContentView>

        <br />
        <br />

        <ViewTitle>역할 및 장르</ViewTitle>
        <ContentView>
          {cd ? cd.gen : "등록된 역할 및 장르가 없습니다."}
        </ContentView>
      </Modal>

      <Drawer
        visible={artistemDr}
        title={`${cd && cd.username} 의 Artistem List`}
        width="100%"
        onClose={() => artistemToggle(null)}
      >
        <CustomTable
          rowKey="id"
          columns={columns3}
          dataSource={artistems}
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
