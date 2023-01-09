import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Popover,
  Select,
  Button,
  Input,
  Switch,
  message,
  Drawer,
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
  CATEGORY_LIST_REQUEST,
  PRODUCT_LIST_REQUEST,
  PRODUCT_ING_REQUEST,
  PRODUCT_TOP_REQUEST,
} from "../../../reducers/product";

const CateBox = styled.span`
  padding: 2px 9px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.subTheme3_C};
  color: #fff;
`;

const List = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    categorys, //
    products, //
    //
    // 판매여부 수정
    st_productIngLoading,
    st_productIngDone,
    st_productIngError,
    //
    // 판매여부 수정
    st_productTopLoading,
    st_productTopDone,
    st_productTopError,
  } = useSelector((state) => state.product);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("음원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [imageDr, setImageDr] = useState(false);
  const [cd, setCd] = useState(null);

  const [sForm] = Form.useForm();

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

  // 판매여부 수정 후 처리
  useEffect(() => {
    if (st_productIngDone) {
      message.info("판매여부가 변경되었습니다.");

      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          CategoryId:
            sForm.getFieldValue("categoryId") === "---전체---"
              ? null
              : sForm.getFieldValue("categoryId"),
          isTop:
            sForm.getFieldValue("isTop") === "---전체---"
              ? null
              : sForm.getFieldValue("isTop"),
          isIng:
            sForm.getFieldValue("isIng") === "---전체---"
              ? null
              : sForm.getFieldValue("isIng"),
          title: sForm.getFieldValue("title"),
          username: sForm.getFieldValue("username"),
        },
      });
    }

    if (st_productIngError) {
      return message.error(st_productIngError);
    }
  }, [st_productIngDone, st_productIngError, sForm]);

  // 상단고정여부 수정 후 처리
  useEffect(() => {
    if (st_productTopDone) {
      message.info("상단고정 여부가 변경되었습니다.");

      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          CategoryId:
            sForm.getFieldValue("categoryId") === "---전체---"
              ? null
              : sForm.getFieldValue("categoryId"),
          isTop:
            sForm.getFieldValue("isTop") === "---전체---"
              ? null
              : sForm.getFieldValue("isTop"),
          isIng:
            sForm.getFieldValue("isIng") === "---전체---"
              ? null
              : sForm.getFieldValue("isIng"),
          title: sForm.getFieldValue("title"),
          username: sForm.getFieldValue("username"),
        },
      });
    }

    if (st_productTopError) {
      return message.error(st_productTopError);
    }
  }, [st_productTopDone, st_productTopError, sForm]);

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

  const imageDrToggle = useCallback(
    (data) => {
      if (data) {
        setCd(data);
      }

      setImageDr((p) => !p);
    },
    [imageDr]
  );

  const ingHandler = useCallback((data) => {
    const nextIng = !data.isIng ? 1 : 0;

    dispatch({
      type: PRODUCT_ING_REQUEST,
      data: {
        id: data.id,
        nextIng,
      },
    });
  }, []);

  const topHandler = useCallback((data) => {
    const nextTop = data.isTop === 1 ? 0 : 1;

    dispatch({
      type: PRODUCT_TOP_REQUEST,
      data: {
        id: data.id,
        nextTop,
      },
    });
  }, []);

  const allSearch = useCallback(() => {
    sForm.resetFields();

    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
  }, []);

  const searchHandler = useCallback((data) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
      data: {
        CategoryId: data.categoryId === "---전체---" ? null : data.categoryId,
        isTop: data.isTop === "---전체---" ? null : data.isTop,
        isIng: data.isIng === "---전체---" ? null : data.isIng,
        title: data.title,
        username: data.username,
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
      title: "음원(앨범)명",
      render: (data) => (
        <Text fontSize="12px" color="#000" fontWeight="bold">
          {data.title}
        </Text>
      ),
    },
    {
      title: "카테고리",
      render: (data) => <CateBox>{data.value}</CateBox>,
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
          loading={st_productIngLoading}
        />
      ),
    },
    {
      title: "판매중인 사용자",
      dataIndex: "username",
    },
    {
      title: "음원(앨범)등록일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상단고정여부",
      render: (data) => (
        <Switch
          checked={data.isTop}
          onClick={() => topHandler(data)}
          loading={st_productTopLoading}
        />
      ),
    },
    {
      title: "이미지 정보",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          style={{ fontSize: "12px", height: "19px" }}
          onClick={() => imageDrToggle(data)}
        >
          이미지정보
        </Button>
      ),
    },
    {
      title: "테그 정보",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          style={{ fontSize: "12px", height: "19px" }}
        >
          테그정보
        </Button>
      ),
    },
    {
      title: "음원리스트",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          style={{ fontSize: "12px", height: "19px" }}
        >
          음원리스트
        </Button>
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
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            판매자 별 등록된 음원을 탐색할 수 있으며, 등록된 음원의 정보는
            관리자가 변경할 수 없습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            초기 데이터는 모든 데이터가 조회됩니다. 삭제처리는 불가능하며 판매
            중단처리가 가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px">
        <CustomForm
          form={sForm}
          layout="inline"
          colon={false}
          onFinish={searchHandler}
        >
          <Form.Item name="categoryId">
            <Select
              size="small"
              placeholder="카테고리를 선택하세요."
              style={{ width: "200px", marginRight: "10px" }}
            >
              <Select.Option value="---전체---">---전체---</Select.Option>
              {categorys.map((data) => {
                return (
                  <Select.Option key={data.id} value={data.id}>
                    {data.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name="isTop">
            <Select
              size="small"
              placeholder="상단고정 여부를 선택하세요."
              style={{ width: "220px", marginRight: "10px" }}
            >
              <Select.Option value="---전체---">---전체---</Select.Option>
              <Select.Option value={-1}>미고정</Select.Option>
              <Select.Option value={1}>고정</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="isIng">
            <Select
              size="small"
              placeholder="판매 여부를 선택하세요."
              style={{ width: "220px", marginRight: "10px" }}
            >
              <Select.Option value="---전체---">---전체---</Select.Option>
              <Select.Option value={-1}>판매중</Select.Option>
              <Select.Option value={1}>판매중단</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="title">
            <Input
              size="small"
              allowClear
              style={{ width: "220px", marginRight: "10px" }}
              placeholder="타이틀을 입력하세요."
            />
          </Form.Item>

          <Form.Item name="username">
            <Input
              size="small"
              allowClear
              style={{ width: "220px", marginRight: "10px" }}
              placeholder="사용자이름을 입력하세요."
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="small" htmlType="submit">
              조회
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" size="small" onClick={allSearch}>
              전체조회
            </Button>
          </Form.Item>
        </CustomForm>
      </Wrapper>

      <Wrapper padding="0px 20px">
        <CustomTable
          rowKey="id"
          columns={columns}
          dataSource={products}
          size="small"
        />
      </Wrapper>

      <Drawer
        width="100%"
        visible={imageDr}
        title={`[${cd && cd.title}] 이미지 정보`}
        onClose={() => imageDrToggle(null)}
      ></Drawer>
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

    context.store.dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(List);
