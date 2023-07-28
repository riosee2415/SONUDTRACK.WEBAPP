import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MY_INFO_REQUEST,
  UPDATE_MODAL_CLOSE_REQUEST,
  UPDATE_MODAL_OPEN_REQUEST,
  USERLIST_REQUEST,
  USERLIST_UPDATE_REQUEST,
} from "../../../reducers/user";
import {
  Table,
  Button,
  Popover,
  message,
  Modal,
  Select,
  notification,
  Input,
  Form,
  Switch,
  Drawer,
  Checkbox,
  Image,
  Popconfirm,
} from "antd";
import {
  HomeText,
  OtherMenu,
  GuideUl,
  GuideLi,
  SearchForm,
  SearchFormItem,
  SettingBtn,
  DelBtn,
} from "../../../components/commonComponents";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import { items } from "../../../components/AdminLayout";
import axios from "axios";
import {
  Text,
  Wrapper,
  PopWrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import {
  CheckOutlined,
  CloseOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";

import {
  ALBUM_ADMIN_DELETE_REQUEST,
  MUSICTEM_ADMIN_LIST_REQUEST,
} from "../../../reducers/album";

const List = ({}) => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const [sameDepth, setSameDepth] = useState([]);
  const [level1, setLevel1] = useState("음원관리");
  const [level2, setLevel2] = useState("");

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight5)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

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

  const {
    musictemAdminList,
    st_albumAdminDeleteDone,
    st_albumAdminDeleteError,
  } = useSelector((state) => state.album);

  ////// HOOKS //////
  const dispatch = useDispatch();

  // FORM
  const [sForm] = Form.useForm();

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_albumAdminDeleteDone) {
      dispatch({
        type: MUSICTEM_ADMIN_LIST_REQUEST,
      });
      return message.success("삭제되었습니다.");
    }

    if (st_albumAdminDeleteError) {
      return message.error(st_albumAdminDeleteError);
    }
  }, [st_albumAdminDeleteDone, st_albumAdminDeleteError]);

  ////// TOGGLE //////

  ////// HANDLER //////

  const searchHandler = useCallback((data) => {
    dispatch({
      type: MUSICTEM_ADMIN_LIST_REQUEST,
      data: {
        songName: data.sData,
      },
    });
  }, []);

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: ALBUM_ADMIN_DELETE_REQUEST,
      data: {
        AlbumId: data.AlbumId,
      },
    });
  }, []);

  ////// DATAVIEW //////

  const columns = [
    {
      align: "center",
      width: "5%",
      title: "번호",
      dataIndex: "num",
    },

    {
      title: "앨범이미지",
      render: (data) => <Image width={`80px`} src={data.albumImage} />,
    },
    {
      width: "10%",
      title: "앨범명",
      dataIndex: "albumName",
    },
    {
      title: "타이틀여부",
      width: "9%",
      render: (data) => {
        return (
          <div>
            {data.isTitle ? (
              <CheckOutlined style={{ color: Theme.naver_C }} />
            ) : (
              <CloseOutlined style={{ color: Theme.red_C }} />
            )}
          </div>
        );
      },
    },
    {
      width: "15%",
      title: "트랙곡",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          download={true}
          href={data.filePath}
        >
          {data.fileName}
        </Button>
      ),
    },
    {
      width: "10%",
      title: "곡 길이",
      dataIndex: "fileLength",
    },
    {
      width: "8%",
      title: "좋아요수",
      dataIndex: "likeCnt",
    },
    {
      width: "15%",
      title: "아티스트명",
      dataIndex: "singerName",
    },

    {
      width: "15%",
      title: "등록일",
      dataIndex: "viewCreatedAt",
    },
    {
      width: "8%",
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={() => deleteHandler(data)}
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
      <Wrapper margin={`10px 0px 0px 10px`}>
        <GuideUl>
          <GuideLi>모든 뮤직템을 확인할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            삭제 후 복구가 어려우니 신중하게 처리해주세요.
          </GuideLi>
          <GuideLi isImpo={true}>
            앨범이 같은 경우 전부 삭제되니 신중하게 처리해주세요.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* SEARCH FORM */}
      <Wrapper padding="0px 20px">
        <SearchForm
          layout="inline"
          style={{ width: "100%" }}
          form={sForm}
          onFinish={searchHandler}
        >
          <SearchFormItem name="sData" style={{ margin: `0px 0px 0px 5px` }}>
            <Input
              size="small"
              style={{ width: "320px" }}
              placeholder={`검색할 곡명을 입력해주세요.`}
              allowClear
            />
          </SearchFormItem>

          <SearchFormItem>
            <Button size="small" type="primary" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>
        </SearchForm>
      </Wrapper>

      <Wrapper padding={`0px 20px`}>
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={columns}
          dataSource={musictemAdminList}
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
      type: MUSICTEM_ADMIN_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(List);
