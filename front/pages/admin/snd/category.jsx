import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Button, Form, Input, message, Modal, Popconfirm } from "antd";
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
  CustomForm,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_NEW_REQUEST,
  CATEGORY_MODIFY_REQUEST,
  CATEGORY_DEL_REQUEST,
} from "../../../reducers/product";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";

const Category = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    categorys, //
    /////////////
    st_categoryNewDone,
    st_categoryNewError,
    //
    st_categoryModifyDone,
    st_categoryModifyError,
    //
    st_categoryDeleteDone,
    st_categoryDeleteError,
  } = useSelector((state) => state.product);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("음원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [modifyModal, setModifyModal] = useState(false);

  const [nForm] = Form.useForm();
  const [mForm] = Form.useForm();

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

  // 카테고리 생성 후처리
  useEffect(() => {
    if (st_categoryNewDone) {
      message.info("새로운 카테고리가 추가되었습니다.");
      nForm.resetFields();

      dispatch({
        type: CATEGORY_LIST_REQUEST,
      });
    }

    if (st_categoryNewError) {
      return message.error(st_categoryNewError);
    }
  }, [st_categoryNewDone, st_categoryNewError]);

  // 카테고리 삭제 후처리
  useEffect(() => {
    if (st_categoryDeleteDone) {
      message.info("카테고리가 삭제되었습니다.");
      nForm.resetFields();

      dispatch({
        type: CATEGORY_LIST_REQUEST,
      });
    }

    if (st_categoryDeleteError) {
      return message.error(st_categoryDeleteError);
    }
  }, [st_categoryDeleteDone, st_categoryDeleteError]);

  // 카테고리 수정 후처리
  useEffect(() => {
    if (st_categoryModifyDone) {
      message.info("카테고리 정보가 변경 되었습니다.");
      nForm.resetFields();
      modifyToggle();

      dispatch({
        type: CATEGORY_LIST_REQUEST,
      });
    }

    if (st_categoryModifyError) {
      return message.error(st_categoryModifyError);
    }
  }, [st_categoryModifyDone, , st_categoryModifyError]);

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

  ////// HANDLER //////

  const modifyToggle = useCallback(
    (data) => {
      if (data) {
        mForm.setFieldsValue({
          id: data.id,
          value: data.value,
          viewCreatedAt: data.viewCreatedAt,
          viewUpdatedAt: data.viewUpdatedAt,
        });
      }

      setModifyModal((p) => !p);
    },
    [modifyModal]
  );

  const modifyHandler = useCallback((data) => {
    dispatch({
      type: CATEGORY_MODIFY_REQUEST,
      data: {
        id: data.id,
        nextValue: data.value,
      },
    });
  }, []);

  const newHandler = useCallback((data) => {
    dispatch({
      type: CATEGORY_NEW_REQUEST,
      data: {
        value: data.newValue,
      },
    });
  }, []);

  const deleteHandler = useCallback((data) => {
    if (parseInt(data.sndCnt) > 0) {
      return message.error(
        "해당 카테고리 내 등록된 데이터가 있습니다. 삭제가 불가능합니다."
      );
    }

    dispatch({
      type: CATEGORY_DEL_REQUEST,
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
      title: "카테고리 명",
      dataIndex: "value",
    },

    {
      title: "카테고리 생성일",
      dataIndex: "viewCreatedAt",
    },

    {
      title: "등록된 음원 수",
      dataIndex: "sndCnt",
    },

    {
      title: "데이터 제어",
      render: (data) => (
        <Wrapper dr="row" ju="flex-start">
          <Button
            size="small"
            type="primary"
            style={{ fontSize: "12px" }}
            onClick={() => modifyToggle(data)}
          >
            데이터 수정
          </Button>

          <Popconfirm
            title="카테고리를 삭제하시겠습니까?"
            okText="삭제"
            cancelText="취소"
            onConfirm={() => deleteHandler(data)}
          >
            <Button size="small" type="danger" style={{ fontSize: "12px" }}>
              데이터 삭제
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
            삭제된 카테고리는 복구할 수 없으며, 조회가 불가능하니 신중한 처리가
            필요합니다. 카테고리는 이름 순 으로 정렬됩니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            중복된 이름의 카테고리는 사용자에게 혼선을 줄 수 있으니 카테고리등록
            시 참고해주세요.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="0px 20px">
        <Wrapper margin="0px 0px 10px 0px" dr="row" ju="flex-start">
          <CustomForm
            colon={false}
            layout="inline"
            onFinish={newHandler}
            form={nForm}
          >
            <Form.Item label="신규 카테고리 이름" name="newValue">
              <Input size="small" style={{ width: "300px" }} />
            </Form.Item>

            <Form.Item>
              <Button size="small" type="primary" htmlType="submit">
                등록
              </Button>
            </Form.Item>
          </CustomForm>
        </Wrapper>

        <CustomTable
          rowKey="id"
          columns={columns}
          dataSource={categorys}
          size="small"
        />
      </Wrapper>

      <Modal
        visible={modifyModal}
        footer={null}
        width="800px"
        onCancel={() => modifyToggle(null)}
      >
        <GuideUl>
          <GuideLi isImpo={true}>
            카테고리 명을 변경하더라고 해당 카테고리에 소속된 음원은 유지됩니다.
          </GuideLi>
        </GuideUl>
        <CustomForm
          onFinish={modifyHandler}
          form={mForm}
          colon={false}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
        >
          <Form.Item name="id" hidden>
            <Input size="small" />
          </Form.Item>

          <Form.Item name="value" label="카테고리 명">
            <Input size="small" />
          </Form.Item>

          <Form.Item name="viewCreatedAt" label="생성일">
            <Input size="small" readOnly style={{ background: "#d7d7d7" }} />
          </Form.Item>

          <Form.Item name="viewUpdatedAt" label="최근수정일">
            <Input size="small" readOnly style={{ background: "#d7d7d7" }} />
          </Form.Item>

          <Wrapper dr="row" ju="flex-end">
            <Button size="small" type="primary" htmlType="submit">
              데이터 수정
            </Button>
          </Wrapper>
        </CustomForm>
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
      type: CATEGORY_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Category);
