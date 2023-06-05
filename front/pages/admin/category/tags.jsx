import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Popover,
  Input,
  Button,
  message,
  Popconfirm,
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
  CustomForm,
  CustomTable,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  COMMON_TAG_NEW_REQUEST,
  COMMON_TAG_LIST_REQUEST,
  COMMON_TAG_MODIFY_REQUEST,
  COMMON_TAG_DELETE_REQUEST,
} from "../../../reducers/product";

const Tags = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    commonTags,

    // 테그명 등록 후처리
    st_commonTagNewDone,
    st_commonTagNewError,
    //
    // 테그명 삭제 후처리
    st_commonTagDeleteDone,
    st_commonTagDeleteError,
  } = useSelector((state) => state.product);

  const router = useRouter();
  const dispatch = useDispatch();

  const [nForm] = Form.useForm();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("음원관리");
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

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  ////// USEEFFECT //////

  // 테그명 등록 후처리
  useEffect(() => {
    if (st_commonTagNewDone) {
      message.success("새로운 테그를 등록했습니다.");
      dispatch({
        type: COMMON_TAG_LIST_REQUEST,
      });
      nForm.resetFields();
    }

    if (st_commonTagNewError) {
      return message.error(st_commonTagNewError);
    }
  }, [st_commonTagNewDone, st_commonTagNewError]);

  // 테그명 삭제 후처리
  useEffect(() => {
    if (st_commonTagDeleteDone) {
      message.success("새로운 테그를 삭제했습니다.");
      dispatch({
        type: COMMON_TAG_LIST_REQUEST,
      });
      nForm.resetFields();
    }

    if (st_commonTagDeleteError) {
      return message.error(st_commonTagDeleteError);
    }
  }, [st_commonTagDeleteDone, st_commonTagDeleteError]);

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

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: COMMON_TAG_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  const newHandler = useCallback((data) => {
    dispatch({
      type: COMMON_TAG_NEW_REQUEST,
      data: {
        type: data.type,
        value: data.value,
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
      title: "테그유형",
      dataIndex: "type",
    },
    {
      title: "테그명",
      dataIndex: "value",
    },

    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },

    {
      title: "최근수정일",
      dataIndex: "viewUpdatedAt",
    },

    {
      title: "수정/삭제",
      render: (data) => (
        <Wrapper dr="row" ju="flex-start">
          <Button
            size="small"
            type="primary"
            style={{ fontSize: "12px", height: "20px" }}
            onClick={() => message.error("테그명은 수정이 불가능합니다.")}
          >
            수정
          </Button>
          <Popconfirm
            title="테그를 삭제하시겠습니까?"
            okText="삭제"
            cancelText="취소"
            onConfirm={() => deleteHandler(data)}
          >
            <Button
              size="small"
              type="danger"
              style={{ fontSize: "12px", height: "20px" }}
            >
              삭제
            </Button>
          </Popconfirm>
        </Wrapper>
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
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            뮤직탬, 아티스탬에 적용되는 공용 테그입니다. 이름 순 으로 정렬되어
            보여집니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            음원 또는 앨범에 등록된 테그는 삭제하더라도 남아있게 됩니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="0px 20px">
        <CustomForm
          colon={false}
          layout="inline"
          onFinish={newHandler}
          form={nForm}
        >
          <CustomForm.Item
            label="테그유형"
            name="type"
            rules={[
              { required: true, message: "테그유형은 필수입력사항 입니다." },
            ]}
          >
            <Select
              style={{ width: "250px", marginRight: `10px` }}
              size="small"
              placeholder="테그유형을 선택하세요."
              maxLength={35}
            >
              <Select.Option value={"카테고리"}>카테고리</Select.Option>
              <Select.Option value={"Mood"}>Mood</Select.Option>
              <Select.Option value={"Genre"}>Genre</Select.Option>
            </Select>
          </CustomForm.Item>

          <CustomForm.Item
            label="테그명"
            name="value"
            rules={[
              { required: true, message: "테그명은 필수입력사항 입니다." },
            ]}
          >
            <Input
              style={{ width: "250px" }}
              size="small"
              placeholder="테그명을 입력하세요."
              maxLength={35}
            />
          </CustomForm.Item>

          <CustomForm.Item>
            <Button size="small" type="primary" htmlType="submit">
              등록
            </Button>
          </CustomForm.Item>
        </CustomForm>
      </Wrapper>

      <Wrapper padding="0px 20px" margin="10px 0px 0px 0px">
        <CustomTable
          rowKey="id"
          columns={columns}
          dataSource={commonTags}
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
      type: COMMON_TAG_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Tags);
